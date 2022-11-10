import React, {useContext,useState,useRef} from 'react';
import {Context} from '../../contexts/SamplerContext';
import {handlePadTrigger} from '../../actions'
import keyCTRL from '../../Config/keyboardControls';
import SamplerGrid from '../SamplerGrid/SamplerGrid';
import StartScreen from '../StartScreen/StartScreen';
import './App.css';
import Register from "../../pages/Register/Register"
import Login from "../../pages/Login/Login"
import Profile from "../../pages/Profile/Profile"
import Create from "../../pages/Create/Create"
import Session from "../../pages/Session/Session"
import Modal from "../Modal/Modal"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const AppContext = React.createContext();

export default function App () {

    const [accountAddress, setAccountAddress] = useState();
    const [contractState, setContractState] = useState(undefined);
    const context = useContext(Context);
    
  const value = {
    accountAddress, 
    contractState
  }

    const renderAppContent = () => {
        if(!context.ctx) return <StartScreen />
        return (
            <AppContext.Provider value={value}>
            <BrowserRouter>
                
                <div className="app-wrapper">
                    {/* <Modal ref={modalRef}> */}
                        {/* <h1>Hello World</h1>  */}
                    {/* </Modal> */}
                    <Routes>
                        <Route path="/" element={<SamplerGrid />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/session" element={<Session />} />
                    </Routes>

                </div>

            </BrowserRouter>
        </AppContext.Provider>
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
