import React,{useState,useRef} from 'react';
import logo from "../../pages/record.svg";
import "./header.css";
import createButton from "./plus-sign.png";
import { Link } from 'react-router-dom';
import Modal from "../Modal/Modal.js";

export default ({title,button}) => {
    const modalRef = useRef
    const [isOpen, setIsOpen] = useState(false);
    
    return (
    <div className="header">
        <div className="logoWrapper">
            <h1>{title}</h1>
        </div>
        {button ?
         <div  onClick={() => setIsOpen(!isOpen)}className="buttonWrapepr">
            <img className="createButton" src={createButton}/>
            <Modal
                isOpen={isOpen}
                onHide={() => setIsOpen(!isOpen)}
                headerCaption={"Search"}
            >
                <h1>Hello World Hello World Hello World</h1>
            </Modal>
        </div>:
        <div className="buttonWrapepr">
            <Link to="/">
                <img style={{width:"150px"}} src={logo}/>
            </Link></div>}
        </div>
    );

}