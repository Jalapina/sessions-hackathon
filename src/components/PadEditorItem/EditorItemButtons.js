import React, {useContext} from 'react';
import {updateEditorData} from '../../actions'
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import './PadEditorButtons.css';

let style = { 
    background: Colors.gray, 
    color: Colors.white, 
    width: "90%", 
    textAlign: "center",
    display: "grid",
    gridTemplateRows: "1fr",
    justifyContent: "center",
    margin: "1vh auto"
}

export default ({cmd1, cmd2, content, val1, val2}) => {
    const context = useContext(Context)

    return (
        <div className="pad-item-wrapper" style={style}>
            <button
            className="editor-btn"
            id="prev"
            onClick={(e) => { updateEditorData({context, cmd: cmd1})}}>
            {content}
            </button>
        </div>
    )
}
