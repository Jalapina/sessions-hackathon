import * as types from '../reducers/types'
import Colors from '../Config/ColorScheme';
import WAAClock from "waaclock";
import * as Tone from 'tone'

export const setCTX = async (context) => {
    let ctx = !context.ctx ? new (window.AudioContext || window.webkitAudioContext)() : null;
    createAnalyser(context, ctx)
}

export const createAnalyser = (context, ctx) =>{
    let analyser = ctx.createAnalyser();
    analyser.connect(ctx.destination);
    context.dispatch({type: types.CREATE_ANALYSER, payload: {ctx, analyser}})
}

export const updateSources = (context, file) => {
    let reader = new FileReader();
    reader.onload = e => {
        context.ctx.decodeAudioData(e.target.result, (buffer) => {
            let sources = {...context.sources}
            let name = file.name.split('.')[0]
            let waveformData = buffer.getChannelData(0)
            sources[context.selectedPad] = {buffer: buffer, name, isPlaying: false, waveformData}
            let gridPadsArr = context.gridPadsArr;
            let newSource = context.ctx.createBufferSource();
            newSource.buffer = buffer;
            gridPadsArr[context.selectedPad].source = newSource;
            gridPadsArr[context.selectedPad].source.start()
            gridPadsArr[context.selectedPad].sampleEnd = buffer.duration;
            gridPadsArr[context.selectedPad].gainNode = context.ctx.createGain();
            gridPadsArr[context.selectedPad].gainNode.connect(context.ctx.destination);
            context.dispatch({type: types.UPDATE_SOURCES, payload: {sources, gridPadsArr}});
        })
    }
    reader.readAsArrayBuffer(file);
}




export const handlePadTrigger = (context, padId, velocity = 127) => {

    const clock = new WAAClock(context.ctx);
    clock.start();

    let selectedSource =  context.sources[padId];
    let selectedPad = padId
    if(selectedSource && selectedSource.buffer){
        if(context.gridPadsArr[padId].source && context.gridPadsArr[padId].selfMuted){
            context.gridPadsArr[padId].source.stop();
        }
        let gridPadsArr = context.gridPadsArr;
        let newSource = context.ctx.createBufferSource();
        newSource.buffer = context.sources[padId].buffer;
        gridPadsArr[padId].source = newSource;
        gridPadsArr[padId].isPlaying = true;
        if(context.selectedPad !== padId){
            context.dispatch({type: types.HANDLE_PAD_TRIGGER, payload: {gridPadsArr, selectedPad}});
        }
        newSource.connect(context.gridPadsArr[padId].gainNode);
        newSource.detune.value = context.gridPadsArr[padId].detune;

        let currentGain = velocity !== 127 ? Math.pow(velocity, 2) / Math.pow(127, 2) : context.gridPadsArr[padId].currentGain;
        let length = gridPadsArr[padId].source.buffer.duration;

        // console.log(context.ctx.decodeAudioData(gridPadsArr[padId].source.buffer));
        // console.log(gridPadsArr[padId].source);
        
        context.gridPadsArr[padId].gainNode.gain.setValueAtTime(currentGain, context.ctx.currentTime)
        context.gridPadsArr[padId].source.loop = true
        context.gridPadsArr[padId].source.loopStart = context.gridPadsArr[padId].sampleStart
        context.gridPadsArr[padId].source.loopEnd = context.gridPadsArr[padId].sampleEnd
        
        console.log(gridPadsArr[padId]);


        let Players = new Tone.Players({
            [gridPadsArr[padId].name]:gridPadsArr[padId].source.buffer
        }).toDestination();

        let notation = Tone.Time(length).toNotation()

        var loop = new Tone.Loop(function(length){
            //triggered every eighth note. 
            Players.player(gridPadsArr[padId].name).start();
            
        }, length).start(0);


        Tone.Transport.start();






        // const event = clock.setTimeout(function() { 
        // context.gridPadsArr[padId].source.start(context.ctx.currentTime, context.gridPadsArr[padId].sampleStart);
        
        // const time = Tone.Time(length).toSeconds();
        // const time = Tone.Time(length).toTicks();
        // const time = Tone.Time(length).toNotation();
        // let time = Tone.Time(length).toSamples();
        // let time = Tone.Time(length).toBarsBeatsSixteenths();
        // const node = new Tone.Gain();
        // console.log(node.numberOfInputs);

        // console.log(time);

        // const loop = new Tone.Loop((time) => {
        //     // triggered every eighth note.
        //     const player = new Tone.Player(newSource.buffer).toDestination();
        //     Tone.loaded().then(() => {
                
        //         player.start();
    
        //     });

        // }, "0n").start(0);
        
        // Tone.Transport.start();
        // }, 2)
        // context.gridPadsArr[padId].source.stop(context.ctx.currentTime + context.gridPadsArr[padId].sampleEnd);
    } else {
        if(context.selectedPad !== padId){
            context.dispatch({type: types.HANDLE_PAD_TRIGGER, payload: {selectedPad}});
        }
    }
}

export const handlePadStop = (padId, gridPadsArr,context) => {
    
    if(context.gridPadsArr[padId].source && context.gridPadsArr[padId].selfMuted){
        context.gridPadsArr[padId].source.stop();
        context.gridPadsArr[padId].isPlaying = false
        context.dispatch({type: types.HANDLE_PAD_STOP, payload: {gridPadsArr}});
    }
}

export const updateEditorData = ({context, cmd, val}) => {
    
    let newPadsArr = context.gridPadsArr;
    let selectedPad = context.selectedPad;
    if(cmd === "start"){
        if(val >= newPadsArr[context.selectedPad].sampleEnd) return;
        newPadsArr[context.selectedPad].sampleStart = Number(val);
    }
    if(cmd === "end"){
        if(val <= newPadsArr[context.selectedPad].sampleStart) return;
        newPadsArr[context.selectedPad].sampleEnd = Number(val);
    }
    if(cmd === "gain"){
        newPadsArr[context.selectedPad].currentGain = val;
    }
    if(cmd === "detune" && val !== "Current"){
        newPadsArr[context.selectedPad].detune = val;
    }
    if(cmd === "play"){
        handlePadTrigger(context, context.selectedPad);
    }
    if(cmd === "stop"){
        handlePadStop(context.selectedPad, newPadsArr,context);
    }
    if(cmd === "color"){
        newPadsArr[context.selectedPad].color = Colors[val];
    }
    let payload = {gridPadsArr: newPadsArr, selectedPad}
    context.dispatch({type: types.UPDATE_EDITOR_DATA, payload });
}