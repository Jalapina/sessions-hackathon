import React,{useState,useRef} from 'react';
import logo from "../../pages/record.svg";
import "./header.css";
import createButton from "./plus-sign.png";
import { Link } from 'react-router-dom';
import Modal from "../Modal/Modal.js";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import Create from "../../pages/Create/Create";
import { useAuthState } from "../../components/Auth/auth-context";

export default ({title,button}) => {
    const modalRef = useRef
    const [isOpen, setIsOpen] = useState(false);
    const [loginOrSignIn, setLoginOrSignIn]=useState(false);
    const { user: loggedUser, status, error } = useAuthState();

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
                headerCaption={loggedUser? "Create Session":"Sing In"}
            >
            {loggedUser != null ?(
                    <div>
                        <Create/>
                    </div>
                ):(
                    <div>
                        {!loginOrSignIn ? (
                        <Login/>
                    ):(
                        <Register/>
                        )
                        }
                    </div>
                )
            }
                
            </Modal>
        </div>:
        <div className="buttonWrapepr">
            <Link to="/">
                <img style={{width:"150px"}} src={logo}/>
            </Link></div>}
        </div>
    );

}
