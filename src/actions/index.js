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


//   export const updateSources = (context, file) => {
//     let reader = new FileReader();
//     reader.onload = e => {
//         context.ctx.decodeAudioData(e.target.result, (buffer) => {
//             let sources = {...context.sources}
//             let name = file.name.split('.')[0]
//             let waveformData = buffer.getChannelData(0)
//             sources[context.selectedPad] = {buffer: buffer, name, isPlaying: false, waveformData}
//             let gridPadsArr = context.gridPadsArr;
//             let newSource = context.ctx.createBufferSource();
//             newSource.buffer = buffer;
//             gridPadsArr[context.selectedPad].source = newSource;
//             gridPadsArr[context.selectedPad].source.start()
//             gridPadsArr[context.selectedPad].sampleEnd = buffer.duration;
//             gridPadsArr[context.selectedPad].gainNode = context.ctx.createGain();
//             gridPadsArr[context.selectedPad].gainNode.connect(context.ctx.destination);
//             context.dispatch({type: types.UPDATE_SOURCES, payload: {sources, gridPadsArr}});
//         })
//     }
//     reader.readAsArrayBuffer(file);
// }



export const updateSources = (context, file) => {
    // let fileSource = GetURI(file)
    // console.log(file)
    // let reader = new FileReader();
    // const buffer = file;
    // reader.onload = e => {
    //     context.ctx.decodeAudioData(e.target.result, (buffer) => {
    //         let sources = {...context.sources}
    //         // let name = file.name.split('.')[0]
    //         let waveformData = buffer.getChannelData(0)
    //         sources[context.selectedPad] = {buffer: buffer, name, isPlaying: false, waveformData}
    //         let gridPadsArr = context.gridPadsArr;
    //         let newSource = context.ctx.createBufferSource();
    //         newSource.buffer = buffer;
    //         gridPadsArr[context.selectedPad].source = newSource;
    //         gridPadsArr[context.selectedPad].source.start()
    //         gridPadsArr[context.selectedPad].sampleEnd = buffer.duration;
    //         gridPadsArr[context.selectedPad].gainNode = context.ctx.createGain();
    //         gridPadsArr[context.selectedPad].gainNode.connect(context.ctx.destination);
    //         context.dispatch({type: types.UPDATE_SOURCES, payload: {sources, gridPadsArr}});
    //     })
    // }
    // reader.readAsArrayBuffer(buffer);
}

export const handlePadTrigger = async(context, padId, velocity = 127) => {
        let selectedSource =  context.gridPadsArr[padId].source;
        console.log(context.gridPadsArr[padId]);

        let selectedPad = padId;
        if(selectedSource && !context.gridPadsArr[padId].isPlaying){
            // if(context.gridPadsArr[padId].player && context.gridPadsArr[padId].selfMuted){
                //     let Player = context.gridPadsArr[padId].player
                //     // let Loop = context.gridPadsArr[padId].loop;

                
                //     Player.stop();
                //     // Loop.stop();
                // }
            console.log("click")
            let gridPadsArr = context.gridPadsArr;
            // let newSource = context.ctx.createBufferSource();
            // newSource.buffer = context.sources[padId].buffer;
            // gridPadsArr[padId].source = newSource;
            context.gridPadsArr[padId].isPlaying = true;
            context.gridPadsArr[padId].isLooping = true;
            // if(context.selectedPad !== padId){
                // context.dispatch({type: types.HANDLE_PAD_TRIGGER, payload: {gridPadsArr, selectedPad}});
            // }
            // newSource.connect(context.gridPadsArr[padId].gainNode);
            // newSource.detune.value = context.gridPadsArr[padId].detune;
    
            // let currentGain = velocity !== 127 ? Math.pow(velocity, 2) / Math.pow(127, 2) : context.gridPadsArr[padId].currentGain;
            let length = null;
            let loop = null;
            // let length = gridPadsArr[padId].source.buffer.duration;
    
            // console.log(context.ctx.decodeAudioData(gridPadsArr[padId].source.buffer));
            // console.log(gridPadsArr[padId].source);
            

            let Players = new Tone.Players({
                [gridPadsArr[padId].name]:gridPadsArr[padId].source
            }).toDestination();
            
            let Player = Players.player(gridPadsArr[padId].name);

            const getDuration = async() => {
                const buff0 = new Tone.ToneAudioBuffer(Player.buffer);
                await Tone.ToneAudioBuffer.loaded();
                length = buff0.duration;
            }

            const dur = await getDuration();
            console.log(length,dur,"***")
            loop = new Tone.Loop(function(){
                //triggered every eighth note.
                Player.start();
                
            },length).start(0);
            
            Tone.Transport.start();

            context.gridPadsArr[padId].loop = loop;
            context.gridPadsArr[padId].player = Player;
            context.gridPadsArr[padId].isPlaying = true;
            context.gridPadsArr[padId].isLooping = true;
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



// export const handlePadTrigger = (context, padId, velocity = 127) => {

//     const selectedPad = padId
//     let selectedSource =  context.sources[padId];
//     let gridPadsArr = context.gridPadsArr;    
//     // const osc = new Tone.Oscillator().toDestination();

//     if(gridPadsArr[selectedPad]){
        
//         // if(context.gridPadsArr[padId].source && context.Players && context[padId].isPlaying){
//         //     context.Players.player(gridPadsArr[selectedPad].name).stop()
//         //     gridPadsArr[padId].isPlaying = true;
//         // }
        
//         // const buffer = new Tone.ToneAudioBuffer("https://tonejs.github.io/audio/casio/A1.mp3", () => {
//             // console.log("loaded");
//         // });
//         // let length = gridPadsArr[selectedPad].source.buffer.duration;    

//         // gridPadsArr[padId].source = newSource;

//         // if(context.selectedPad !== padId){
//         //     context.dispatch({type: types.HANDLE_PAD_TRIGGER, payload: {gridPadsArr, selectedPad}});
//         // }

//         // newSource.connect(context.gridPadsArr[padId].gainNode);
//         // newSource.detune.value = context.gridPadsArr[padId].detune;
        
//         // let currentGain = velocity !== 127 ? Math.pow(velocity, 2) / Math.pow(127, 2) : context.gridPadsArr[padId].currentGain;
        
//         // context.gridPadsArr[padId].gainNode.gain.setValueAtTime(currentGain, context.ctx.currentTime)
//         // context.gridPadsArr[padId].source.loop = true
//         let Players = new Tone.Players({
//             [gridPadsArr[padId].name]:newSource
//         }).toDestination();
        
//         if(Players){
//             context.gridPadsArr[padId].source = Players.player(gridPadsArr[padId].name);
//         }
        
//         // Tone.Transport.scheduleRepeat((time) => {
//             // use the callback time to schedule events
//             // let player = Players.player(gridPadsArr[padId].name);
//             // player.start(context.ctx.currentTime, context.gridPadsArr[padId].sampleStart )
//             // }, length);
//             // transport must be started before it starts invoking events
//             // var loop = new Tone.Loop(function(length){
//             //     //triggered every eighth note. 
//             let player = Players.player(gridPadsArr[padId].name).start();
//             player.loop = true;            
//             player.autostart = true;
//             player.chain(Tone.Destination);
//             // },"4n").start(0);

            
//             context.gridPadsArr[padId].isLooping = true;
//             context.gridPadsArr[padId].isLoaded = true;
//             // Tone.Transport.start();
            
//     } else {
//         if(context.selectedPad !== padId){
//             context.dispatch({type: types.HANDLE_PAD_TRIGGER, payload: {selectedPad}});
//         }
//     }
// }

export const handlePadStop = (padId, gridPadsArr,context) => {
    if(context.gridPadsArr[padId].source && context.gridPadsArr[padId].isPlaying){

        let Player = context.gridPadsArr[padId].player;
        let Loop = context.gridPadsArr[padId].loop;
        context.gridPadsArr[padId].isPlaying = false;
        context.gridPadsArr[padId].isLooping = true;

        Player.stop();
        Loop.stop();
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