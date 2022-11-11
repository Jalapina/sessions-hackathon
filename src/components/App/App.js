import React, {useContext,useState,useRef} from 'react';
import {Context} from '../../contexts/SamplerContext';
import {handlePadTrigger} from '../../actions'
import keyCTRL from '../../Config/keyboardControls';
import SamplerGrid from '../SamplerGrid/SamplerGrid';
import StartScreen from '../StartScreen/StartScreen';
import './App.css';
import Profile from "../../pages/Profile/Profile"
import Create from "../../pages/Create/Create"
import Session from "../../pages/Session/Session"
import Modal from "../Modal/Modal"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "../Auth/auth-context";

import "primereact/resources/themes/md-dark-deeppurple/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function App () {
    const [accountAddress, setAccountAddress] = useState();
    const [contractState, setContractState] = useState(undefined);
    const context = useContext(Context);
    
    const renderAppContent = () => {
        if(!context.ctx) return <StartScreen />
        return (
            <AuthProvider>
            <BrowserRouter>
                
                <div className="app-wrapper">
                    <Routes>
                        <Route path="/" element={<SamplerGrid />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/session" element={<Session />} />
                    </Routes>

                </div>

            </BrowserRouter>
        </AuthProvider>
        )
    }

    return(
        <div className="app-wrapper" 
        style={{height: "100vh"}}
        tabIndex="0">
            {renderAppContent()}
        </div>
    )
}
