import React, {useState,useContext,useEffect,useRef} from 'react';
import {Context} from '../../contexts/SamplerContext';
import * as types from '../../reducers/types';
import GridPad from '../../contexts/Config/PadGrid';
import Colors from '../../Config/ColorScheme';
import Hud from '../../components/Hud/Hud';
import PadEditor from '../../components/PadEditor/PadEditor';
import Pad from '../../components/Pad/Pad';

import Header from '../../components/Header/Header';
import Placeholder from "./placeholder.png";
import "./session.css";
import createButton from "../../components/Header/plus-sign.png";
import midiMap from '../../Config/midiMap';

const Session = () =>{

    const context = useContext(Context);
    const gridArr = context.gridPadsArr;

    const renderPad = (item) => {
        let backgroundColor = Colors.black
        let source = context.sources[item.id];
        const midiNote = midiMap[item.id + 36].note;
        if(!context.editMode && source && source.buffer) backgroundColor = context.gridPadsArr[context.selectedPad].color;
        if(context.editMode && source && source.buffer) backgroundColor = Colors.green;

        return <Pad 
        midiNote={midiNote}
        key={item.id} 
        id={item.id} 
        name={item.name}
        backgroundColor={backgroundColor}
        />
        
    }   
    
    const rendercontent = () => {
        if(!context.editMode) return <div style={{maxWidth: "700px",margin: "auto"}}>{gridArr.map((item) => { return renderPad(item) })}</div>
        return <PadEditor />
    }
    const testForTouchDevice = () => {
        return 'ontouchstart' in window;
    }
    const testForMidiAPI = () => {
        return "requestMIDIAccess" in navigator;
    }
    const generateGrid = () => {
        let midiEnabled = testForMidiAPI();
        let touchEnabled = testForTouchDevice();
        let gridPadsArr = [];
        for(let i = 0; i < context.numPads; i++){
            let newPad = new GridPad({id: i})
            gridPadsArr.push(newPad)
        }
        let payload = {gridPadsArr, touchEnabled, midiEnabled}
        context.dispatch({ type: types.GENERATE_GRID, payload })
    }
    useEffect(() => { 
        if(context.gridPadsArr.length < 1) generateGrid();
    }, []);

    
    return(
        <div className="sessionComponent">
            <Header title={"Session"} button={false}/>

            <div className="sessionContentTop">

                <div className="sessionArt">
                    <img src={Placeholder} />
                </div>

                <div className="sessionOptions">

                    <div className="sessionSpecs">
                        <h3 className="sessionTitle">
                            ROCK ON
                        </h3>
                        <p>
                            version: 1.0.0
                        </p>
                        <p>
                            tempo: 125bpm
                        </p>

                    </div>

                    <div className="optionsWrapper">
                        <p>
                        A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs.
                        </p>
                    </div>
                    <div className="sessionNeedsWrapper">
                        <h3>
                            Needs
                        </h3>
                        <p>
                            guitar riff
                        </p>
                        <p>
                            bass
                        </p>
                        <p>
                            vocals
                        </p>
                    </div>

            </div>






            </div>

            <div className="grid">
                <Hud />
                {rendercontent()}
            </div>
           

        </div>
    )
}

export default Session
