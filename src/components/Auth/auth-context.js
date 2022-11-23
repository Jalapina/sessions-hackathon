import Moralis from 'moralis';
import React from "react";
import history from "./history";
import { signInWithMoralis as signInWithMoralisByEvm } from '@moralisweb3/client-firebase-evm-auth';
import { auth, functions, moralisAuth } from '../../functions/firebase.js';

const config = {
    domain: process.env.APP_DOMAIN,
    statement: 'Please sign this message to confirm your identity.',
    uri: process.env.NEXTAUTH_URL,
    timeout: 60,
};

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (!context) throw new Error("useAuthState must be used in AuthProvider");

  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (!context) throw new Error("useAuthDispatch must be used in AuthProvider");

  return context;
}

const initialState = {
  status: "idle",
  user: null,
  error: null
};

function AuthProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

async function handler(req, res) {
    const { address, chain, network } = req.body;
    console.log(address)
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

    try {
        const message = await Moralis.Auth.requestMessage({
            address,
            chain,
            network,
            ...config,
        });

        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ error });
        console.error(error);
    }
}

async function doLogin(dispatch,setCookie) {
  let result
  try {
    dispatch({ status: "pending" });

    result = await signInWithMoralisByEvm(moralisAuth);
    dispatch({
      status: "resolved",
      user: result.credentials.user,
      error: null
    });
  } catch (error) {
    dispatch({ status: "rejected", error });
  }


}

function doLogout(dispatch) {
  const [removeCookie] = useCookies(['user']);
  dispatch(initialState);
  removeCookie("user")
  history.push("/");
}

export { AuthProvider, useAuthState, useAuthDispatch, doLogin, doLogout, handler };

