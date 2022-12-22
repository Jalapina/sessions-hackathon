import React, {useState,useContext,useEffect} from 'react';
import Colors from '../../Config/ColorScheme';
import midiMap from '../../Config/midiMap';
import Pad from '../Pad/Pad';
import "../../pages/Sessions/sessions.css"
import "./SessionsPreview.css"
import firebase from 'firebase/compat/app';
import {Context} from '../../contexts/SamplerContext';
import { useCookies } from 'react-cookie';
import { useLocation } from "react-router-dom";
import {db} from '../../functions/firebase';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

const CollabPreview = () =>{

    const [collabData, setCollabData] = useState()
    const array = ["",""]
    const context = useContext(Context);
    let location =  useLocation();
    let locationPath = location.pathname.split("/",3).pop();
    const [isLoading, setIsLoading] = useState(true);
    const sliptAddressText = (address) =>{
        return address.split("").splice(-10);
    }

    const getSessions = async() => {
        
        const timeStamp = firebase.firestore.Timestamp.now();

        const snapshot = db.firestore().collection('collaborations').limit(6).where("address","==",locationPath).get();
        
        const sessionsData = snapshot.then(snapshot => {
            const sessions = snapshot.docs.map(doc => ({
                id: doc.id,
              ...doc.data(),
            }));

            setCollabData(sessions);
            setIsLoading(false);
        
        });
    };

    useEffect(()=>{
        if(db != undefined){
            getSessions();
        }
    },[])
        
    const rendercontent = () => {
        return <div className="previewSession">{array.map((item,key) => { return renderPad("",key) })} </div>
    }

    return(
        <div className="sessionsComponent">

            <div className="sessionsContainer">
                {collabData?(
                    collabData.map((collab,key)=>(
                        <div className="sessionHomeContainer">
                            
                            <div className="sessionSpecInfo">
                                <div className="backgroundSpec">
                                </div>
                                <h3 style={{fontSize:"3em"}}>{collab.name}</h3>
                                <Link to={"/profile/"+session.address} style={{textDecoration:"none",fontSize:"1.2em"}}><p style={{display:"block",fontFamily:"'Beary'",order:"2"}} className="specs">ARTIST: {collab.artist?collab.artist:sliptAddressText(collab.address)}</p></Link>
                                <p style={{display:"block",fontFamily:"'Beary'",order:"3"}} className="specs">TEMPO: 77</p>
                                
                                {isLoading?
            
                                    "LOADING...":            
                                    
                                    <div style={{display:"inline-block",order:"4",textAlign:"left",width:"50%"}} >
                                                                        
                                        <p style={{fontFamily:"Beary", fontSize:"1em",display:"inline-block"}}>
                                            NEEDS: 
                                        </p>

                                        {collab.needs.length>0?(
                                            collab.needs.map(needItem =><p style={{display:"inline-block",margin:"10px",padding:"10px",background:"#5b00ba"}}>{needItem}</p> )
                                        ):" N/A"}
                                    
                                    </div>
                                }
                            </div>
                            
                            <div className="sessionsItemArt">
                                <Link to={"/session/"+session.id}><img style={{width:"100%"}} src={collab.sessionArt? collab.sessionArt:""} /></Link>
                            </div>

                        </div>
                    ))
                    ):"Loading..."
                }
            </div>
            

        </div>
    )
}

export default CollabPreview
