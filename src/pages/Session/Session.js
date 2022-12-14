import React, {useState,useContext,useEffect,useRef} from 'react';
import {Context} from '../../contexts/SamplerContext';
import * as types from '../../reducers/types';
import GridPad from '../../contexts/Config/PadGrid';
import Colors from '../../Config/ColorScheme';
import Hud from '../../components/Hud/Hud';
import PadEditor from '../../components/PadEditor/PadEditor';
import Pad from '../../components/Pad/Pad';
import {updateSources} from '../../actions'
import {db} from '../../functions/firebase';
import { useLocation } from "react-router-dom";
import sessionContract from "../../contracts/Sessions.json"
import Header from '../../components/Header/Header';
import placeholder from "../placeholder.png";
import "./session.css";
import midiMap from '../../Config/midiMap';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { useCookies } from 'react-cookie';

const Session = () =>{

    const [session, setSession] = useState([]); //useState() hook, sets initial state to an empty array
    const [loops, setLoops] = useState(null); //useState() hook, sets initial state to an empty array
    const [isLoading, setIsLoading] = useState(true);
    const context = useContext(Context);
    const gridArr = context.gridPadsArr;
    let getLoops = loops ? true:false;
    let location =  useLocation();
    let sessionID = location.pathname.split("/").pop();
    const [user, setUser] = useCookies(['user']);
    const [isOwner, setIsOwner] = useState(false)
    console.log("session:",user)

    const getSessionData = async() => {

        const response = db.firestore().collection('session').doc(sessionID).get()
        .then(snapshot =>{
            const data = snapshot.data();
            setSession(data);
            setIsOwner(user.hasOwnProperty() && data.address ? true:false)
            setIsLoading(false);
            if(data.stems.length>0){
                data.stems.map((stemId)=>{
                    setPad(stemId);
                });
            }
        });
        
    };

    const setPad = (stemId) =>{

        const stems = db.firestore().collection('collaboration').doc(stemId.id).get()
        .then(snapshot => {
            
            let stem = snapshot.data()
            
            const padId = stem.padId

            let gridPadsArr = context.gridPadsArr;
            gridPadsArr[padId].source = stem.loop
            gridPadsArr[padId].isLoaded = true
            gridPadsArr[padId].isLooping = false
            context.dispatch({type: types.UPDATE_SOURCES, payload: {gridPadsArr}});
            
        })
        .catch(err => console.error(err));
        
    }

    useEffect(()=>{
        if(db != undefined){
            getSessionData();
        }
    },[context.gridPadsArr,sessionID])

    const renderPad = (item) => {
        let backgroundColor = Colors.black
        let source = context.sources[item.id];
        const midiNote = midiMap[item.id + 36].note;
        if(!context.editMode && source && source.buffer) backgroundColor = context.gridPadsArr[context.selectedPad].color;
        if(context.editMode && source && source.buffer) backgroundColor = Colors.green;

        return <Pad 
        midiNote={midiNote}
        key={item.id} 
        id={item.id} 
        name={item.name}
        backgroundColor={backgroundColor}
        />
        
    }   
    
    const rendercontent = () => {
        if(!context.editMode) return <div style={{maxWidth: "700px",margin: "auto"}}>{gridArr.map((item) => { return renderPad(item) })}</div>
        return <PadEditor />
    }
    const testForTouchDevice = () => {
        return 'ontouchstart' in window;
    }
    
    // const testForMidiAPI = () => {
        // return "requestMIDIAccess" in navigator;
    // }

    const generateGrid = () => {
        // let midiEnabled = testForMidiAPI();
        let touchEnabled = testForTouchDevice();
        let gridPadsArr = [];
        for(let i = 0; i < context.numPads; i++){
            let newPad = new GridPad({id: i})
            gridPadsArr.push(newPad)
        }
        let payload = {gridPadsArr, touchEnabled}
        context.dispatch({ type: types.GENERATE_GRID, payload })
    }

    const handleMint = async () =>{

        if(window.ethereum){
            
            let tokenPrice = ethers.BigNumber.from('10000000000000000');
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            
            let feeData = await signer.getFeeData();

            await provider.send('eth_requestAccounts', []); 

            const contract = new ethers.Contract(
                "0x24426a17f5DFCb9c65329776465Cf8c5e6D9DD80", //polygon smart contract address
                sessionContract.abi,
                signer,
            );

            try{
                const response = await contract.createNFT("https://sessions-e4f78.web.app/session/"+sessionID,tokenPrice,{value: ethers.utils.parseEther("0.01"),gasLimit: 5000000});

                const sessionResponse = db.firestore().collection("session").doc(sessionID).update({minted:true});

                setSession({...session,minted:true});

            }catch(e){console.log(e)}
        }

    }

    useEffect(() => { 
        if(context.gridPadsArr.length < 1) generateGrid();
    }, []);
    console.log(session)

    return(
        <div className="sessionComponent">

            <Header title={isLoading? "Loading...":session.artistName} button={false}/>

            <div className="sessionContentTop">

                <div className="sessionArt">
                    {session.sessionArt?
                        <img src={session.sessionArt}/>
                        :""
                    }
                </div>

                <div className="sessionOptions">

                    <div className="sessionSpecs">
                        <h3 className="sessionTitle">
                            {isLoading? "Loading...":session.name}
                        </h3>
                        <p>
                            version: 1.0.0
                        </p>
                        <p>
                            tempo: {isLoading? "loading...":session.tempo}bpm
                        </p>

                    </div>

                    <div className="optionsWrapper">
                    {isLoading?(
                        <p>
                            LOADING...
                        </p>
                        ):
                        <p>
                            {session.description}
                        </p>
                    }
                    </div>
                    <div className="sessionNeedsWrapper">

                    {isLoading?
            
                        "LOADING...":            
                        
                        <div className="sessionNeedsContainer">
                                                
                            <h3>
                                Needs
                            </h3>

                            {session.needs.length>0?(
                                session.needs.map(needItem =><p>{needItem}</p> )
                            ):""}
                            
                        </div>
                    }
                    </div>

            </div>

            </div>

            <div className="grid">
                <Hud sessionOwner={session.address} />

                {user.user && session ?(
                    user.user.displayName == session.address && !session.minted ? <button className="mintButton"  onClick={handleMint}>mint</button>:""
                ):""
                }
                
                {rendercontent()}
            </div>
           

        </div>
    )
}

export default Session
