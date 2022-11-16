import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import {setCTX} from '../../actions'
import './StartScreen.css';
import Colors from '../../Config/ColorScheme';
import WorkerNotify from '../WorkerNotify/WorkerNotify'

export default () => {
    const context = useContext(Context);
    const displayContent = () => {
        if(!window.AudioContext){
            return (
                <div>
                    <div className="start-info">
                    <p>Sorry, Your browser doesn't support Web Audio :(</p>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <div className="start-info">
                    <p><strong>LOAD:</strong> WAV/MP3 files</p>
                </div>
                <button 
                className="btn"
                style={{color:"#fff"}}
                onClick={() => { setCTX(context)}}
                >START</button>
            </div>
        )
    }
    const renderInstallButton = () => {
        if(!window.matchMedia('("display-mode: standalone")').matches){
            return <WorkerNotify />
        }
        return null
    }
    return (
        <div className="start-wrapper" style={{backgroundColor: "#fff", color: Colors.black,position:"absolute", width:"250px", height:"250px",left:"0",top:"0",bottom:"0",right:"0",margin:"auto"}}>
        <div className="content-container">
            <div>
            <h1>SESSIONS</h1>
            {displayContent()}
            </div>
        </div>            
        </div>
    )
}
