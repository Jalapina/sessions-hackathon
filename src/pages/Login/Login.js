import React, {useState,useEffect,useContext,useRef,Fragment} from 'react';
import { signInWithMoralis as signInWithMoralisByEvm } from '@moralisweb3/client-firebase-evm-auth';
import Header from '../../components/Header/Header';
import "../Register/register.css"
// import { httpsCallable } from '@firebase/functions';
// import { User } from '@firebase/auth';
import { auth, functions, moralisAuth } from '../../functions/firebase.js';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Provider } from '@ethersproject/providers';
import { useAuthState, useAuthDispatch } from "../../components/Auth/auth-context";
import { useCookies } from 'react-cookie';

const Login = () =>{

  const { user: loggedUser, status, error } = useAuthState();
  const [cookies, setCookie] = useCookies(['user']);    
  const dispatch = useAuthDispatch();

  const signInWithMetamask = async() =>{
        
        let result = null
        try {
          dispatch({ status: "pending" });
          result = await signInWithMoralisByEvm(moralisAuth);
          dispatch({
            status: "resolved",
            user: result.credentials.user,
            error: null
          });
        } catch (error) {
        }
        dispatch({ status: "rejected", error });
        setCookie('user',result.credentials.user);

    }
    
    return(
          <div className="loginContainer">

              <div className="signInContainer">
      
                <div className="metamaskSignIn">
                  <button onClick={signInWithMetamask}>MetaMask</button>
                </div>
                
              </div>
        
        </div>

    )
}
    

export default Login
