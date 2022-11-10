import React,{useState,useRef} from 'react';
import logo from "../../pages/record.svg";
import "./header.css";
import createButton from "./plus-sign.png";
import { Link } from 'react-router-dom';
import Modal from "../Modal/Modal.js";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";

export default ({title,button}) => {
    const modalRef = useRef
    const [isOpen, setIsOpen] = useState(false);
    const [loginOrSignIn, setLoginOrSignIn]=useState(false);

    return (
    <div className="header">
        <div className="logoWrapper">
            <h1>{title}</h1>
        </div>
        {button ?
         <div  className="buttonWrapepr">
            <div  onClick={() => setIsOpen(!isOpen)}>
                <img className="createButton" src={createButton}/>
            </div>
            <Modal
                isOpen={isOpen}
                onHide={() => setIsOpen(!isOpen)}
                headerCaption={loginOrSignIn? "Register":"Login"}
            >
                {!loginOrSignIn ? (
                        <Login/>
                    ):(
                        <Register/>
                    )
                }
                <button onClick={() => setLoginOrSignIn(!loginOrSignIn)}>
                    new
                </button>
            </Modal>
        </div>:
        <div className="buttonWrapepr">
            <Link to="/">
                <img style={{width:"150px"}} src={logo}/>
            </Link></div>}
        </div>
    );

}
