import React, {useState,useEffect,useRef,Fragment} from 'react';
import Header from '../../components/Header/Header';
import "../Register/register.css"

import { signInWithMoralis as signInWithMoralisByEvm } from '@moralisweb3/client-firebase-evm-auth';
import { signInWithMoralis as signInWithMoralisBySolana } from '@moralisweb3/client-firebase-sol-auth';
import { httpsCallable } from '@firebase/functions';
// import { User } from '@firebase/auth';
import { auth, functions, moralisAuth } from '../../functions/firebase.js';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Provider } from '@ethersproject/providers';

const Login = () =>{
    const [currentUser, setCurrentUser] = useState(null);    

    const signInWithMetamask = async () => {

        const result = await signInWithMoralisByEvm(moralisAuth);
        console.log("currentUser",result);
        
        setCurrentUser(result.credentials.user);
      }
      
    return(
          <div className="loginContainer">

            <div>
            {currentUser ? (
              <div>
                address: {currentUser.displayName}, uid: {currentUser.uid}
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
