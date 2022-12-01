import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import './Hud.css';
import Colors from '../../Config/ColorScheme';
import WaveformDisplay from '../WaveformDisplay/WaveformDisplay';
import Controls from '../Controls/Controls';
import icon from "./settingsIcon.png";

export default () => {
    const context = useContext(Context);
    const currentPadId = context.selectedPad;

    let isLoaded = false

    if(context.gridPadsArr.length>0){
        isLoaded = context.gridPadsArr[currentPadId].source ? true : false;
    }
    
    let editToggleMode = context.editMode ? '◀️' : <img style={{width:"65px"}} src={icon}/>;
    
    return(
        <div className="hud-wrapper" style={{textAlign:"left", color: Colors.white}}>

            {isLoaded?(
                <WaveformDisplay />     
            ):""
            }
            <Controls editToggleText={editToggleMode}/>
            
        </div>
    )
}