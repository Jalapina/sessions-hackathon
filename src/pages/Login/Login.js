import React, {useState,useEffect,useContext,useRef,Fragment} from 'react';
import Header from '../../components/Header/Header';
import "../Register/register.css"

import { signInWithMoralis as signInWithMoralisByEvm } from '@moralisweb3/client-firebase-evm-auth';
import { signInWithMoralis as signInWithMoralisBySolana } from '@moralisweb3/client-firebase-sol-auth';
import { httpsCallable } from '@firebase/functions';
// import { User } from '@firebase/auth';
import { auth, functions, moralisAuth } from '../../functions/firebase.js';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Provider } from '@ethersproject/providers';
import { useAuthState, useAuthDispatch, doLogin } from "../../components/Auth/auth-context";

const Login = () =>{
    const { user: loggedUser, status, error } = useAuthState();
    const [user, setUser] = useState("");
    const dispatch = useAuthDispatch();
    console.log(loggedUser);
    const signInWithMetamask = async () => {
        doLogin(dispatch);
      }
      
    return(
          <div className="loginContainer">

            <div>
            {loggedUser ? (
              <div>
                address: {loggedUser.displayName}, uid: {loggedUser.uid}
              </div>
            ) : (
              <div className="signInContainer">
                <form>
                  <input type="text" className="ghost-input" placeholder="username" required/> 
                  <input type="password" className="ghost-input" placeholder="Password" required/>
                  <input type="submit" value="SIGN IN" className="ghost-button"/>
         
                </form>
              <div className="metamaskSignIn">
                <button onClick={signInWithMetamask}>MetaMask</button>
              </div>
                
              </div>
            )}
          </div>
        
        </div>

    )
}
    

export default Login
