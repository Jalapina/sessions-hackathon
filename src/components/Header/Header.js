import React,{useRef} from 'react';
import logo from "../../pages/record.svg";
import "./header.css";
import createButton from "./plus-sign.png";
import { Link } from 'react-router-dom';

export default ({title,button}) => {
    const modalRef = useRef
    
    return <div className="header"><div className="logoWrapper"><h1>{title}</h1></div>{button ? <div onclick={() => modalRef.current} className="buttonWrapepr"><img className="createButton" src={createButton}/></div>:<div className="buttonWrapepr"><Link to="/"><img style={{width:"150px"}} src={logo}/></Link></div>}</div>

}