import * as types from '../reducers/types'
import Colors from '../Config/ColorScheme';
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
    console.log("context",context)
    const selectedPad = padId
    let selectedSource =  context.sources[padId];
    let gridPadsArr = context.gridPadsArr;    
    // const osc = new Tone.Oscillator().toDestination();

    if(selectedSource && selectedSource.buffer){
        
        if(context.gridPadsArr[padId].source && context.Players && context[padId].isPlaying){
            context.Players.player(gridPadsArr[selectedPad].name).stop()
            gridPadsArr[padId].isPlaying = true;
        }
        
        let newSource = context.ctx.createBufferSource();
        let length = gridPadsArr[selectedPad].source.buffer.duration;    

        newSource.buffer = context.sources[padId].buffer;
        gridPadsArr[padId].source = newSource;

        if(context.selectedPad !== padId){
            context.dispatch({type: types.HANDLE_PAD_TRIGGER, payload: {gridPadsArr, selectedPad}});
        }

        newSource.connect(context.gridPadsArr[padId].gainNode);
        newSource.detune.value = context.gridPadsArr[padId].detune;
        
        let currentGain = velocity !== 127 ? Math.pow(velocity, 2) / Math.pow(127, 2) : context.gridPadsArr[padId].currentGain;
        
        context.gridPadsArr[padId].gainNode.gain.setValueAtTime(currentGain, context.ctx.currentTime)
        context.gridPadsArr[padId].source.loop = true
        
        let Players = new Tone.Players({
            [gridPadsArr[padId].name]:gridPadsArr[padId].source.buffer
        }).toDestination();
        
        if(Players){
            context.gridPadsArr[padId].source = Players.player(gridPadsArr[padId].name);
        }
        
        // Tone.Transport.scheduleRepeat((time) => {
            // use the callback time to schedule events
            let player = Players.player(gridPadsArr[padId].name);
            console.log(player)        
            // player.start(context.ctx.currentTime, context.gridPadsArr[padId].sampleStart )
            // }, length);
            // transport must be started before it starts invoking events
            var loop = new Tone.Loop(function(length){
                //triggered every eighth note. 
                player.loop = true;            
                Players.player(gridPadsArr[padId].name).start();
                
            }, length).start(0);
            
            context.gridPadsArr[padId].isLooping = loop;
            context.gridPadsArr[padId].isLoaded = true;
            Tone.Transport.start();

    } else {
        if(context.selectedPad !== padId){
            context.dispatch({type: types.HANDLE_PAD_TRIGGER, payload: {selectedPad}});
        }
    }
}

export const handlePadStop = (padId, gridPadsArr,context) => {
    console.log(context)
    if(context.gridPadsArr[padId].source && context.gridPadsArr[padId].selfMuted){
        let Player = context.gridPadsArr[padId].source
        let Loop = context.gridPadsArr[padId].isLooping
        console.log(Loop)
        Player.stop()
        Loop.stop()
        gridPadsArr[padId].isPlaying = false;
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