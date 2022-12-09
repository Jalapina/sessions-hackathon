import React, {useState,useEffect,useContext,useRef,Fragment} from 'react';
import { signInWithMoralis as signInWithMoralisByEvm } from '@moralisweb3/client-firebase-evm-auth';
import Header from '../../components/Header/Header';
import "../Register/register.css"
// import { httpsCallable } from '@firebase/functions';
// import { User } from '@firebase/auth';
import { auth, functions, moralisAuth } from '../../functions/firebase.js';
import { useNavigate } from "react-router-dom";
import {db} from '../../functions/firebase';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3Provider } from '@ethersproject/providers';
import { useAuthState, useAuthDispatch } from "../../components/Auth/auth-context";
import firebase from 'firebase/compat/app';
import { useCookies } from 'react-cookie';

const Login = () =>{

  const { user: loggedUser, status, error } = useAuthState();
  const [cookies, setCookie] = useCookies(['user']);    
  const [isNewUser, setisNewUser] = useState(false);
  const dispatch = useAuthDispatch();
  let navigate = useNavigate();    
  
  const createNewUser = (userAddress) =>{

            try {
                
              const response = db.firestore().collection('user')
              .add({
                  address:  userAddress,
                  createdAt : firebase.firestore.FieldValue.serverTimestamp(),
                  updatedAt : firebase.firestore.FieldValue.serverTimestamp()
                  }).then(()=>{
                    navigate(`/profile/`+userAddress);
                  })
    
            }catch(e){console.log(e)}
    
  }

  const userExist = async(userAddress) =>{
        
      const getUser= db.firestore().collection('user');
      
      const userSnapshot = getUser.where("address","==",userAddress).get()
      .then(snapshot => {

        const userJSON = snapshot.docs.map(doc => ({
              id: doc.id,
            ...doc.data(),
          }));

          console.log("userJSON[0]",userJSON[0]);
          if (userJSON[0]==undefined){
            createNewUser(userAddress)
          }
          
        }).catch(err => {return console.error(err)});
        
  }

  const signInWithMetamask = async() =>{
        
        let result = null

        try {

          dispatch({ status: "pending" });
          result = await signInWithMoralisByEvm(moralisAuth);
          const user = await userExist(result.credentials.user.displayName);

          dispatch({
            status: "resolved",
            user: result.credentials.user,
            error: null
          });

          setCookie('user',result.credentials.user);
          
        } catch (error) {
          dispatch({ status: "rejected", error });
        }
        
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
