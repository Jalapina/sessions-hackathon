import React, {useState,useContext,useEffect} from 'react';
import Colors from '../../Config/ColorScheme';
import midiMap from '../../Config/midiMap';
import Pad from '../../components/Pad/Pad';
import "./sessions.css"
import placeholder from "../placeholder.png";
import {Context} from '../../contexts/SamplerContext';
import { useCookies } from 'react-cookie';
import {db} from '../../functions/firebase';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';

const Sessions = () =>{

    const [Sessions, setSessions] = useState()
    const array = ["",""]
    const context = useContext(Context);
    
    const getSessions = async() => {

        const response = db.firestore().collection('session').onSnapshot(snapshot => {
            const sessions = snapshot.docs.map(doc => ({
                id: doc.id,
              ...doc.data(),
            }));
        setSessions(sessions);
        
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
            return context.dispatch({type: types.UPDATE_SOURCES, payload: {gridPadsArr}});
            
        })
        .catch(err => {return console.error(err)});
                
    }
        
    const renderPad = (sourceId,id) => {
        // const source = setPad(sourceId);
        const midiNote = midiMap[id + 36].note;
        let backgroundColor = Colors.black
        if(id) backgroundColor = Colors.green;

        return <Pad
        midiNote={midiNote}
        key={id} 
        id={id} 
        backgroundColor={backgroundColor}
        />
        
    }   

    useEffect(()=>{
        if(db != undefined){
            getSessions();
        }
    },[])

    useEffect(()=>{
        return () => {
            console.log("unmounted")
        }
    },[])
        
    const rendercontent = () => {
        return <div className="previewSession">{array.map((item,key) => { return renderPad("",key) })} </div>
    }

    return(
        <div className="sessionsComponent">
            <h1>
                TOP SESSIONS
            </h1>

            <div className="sessionsContainer">
                {Sessions?(
                    Sessions.map((session,key)=>(
                        <div className="sessionHomeContainer">
                            
                            <div className="sessionSpecInfo">
                                <Link to={"/session/"+session.id} style={{textDecoration:"none",fontFamily:"Street"}}><h3 style={{fontSize:"2em"}}>{session.name}</h3></Link>
                                <p style={{display:"block"}} className="specs">Artist: {session.artist}</p>
                                <p style={{display:"block"}} className="specs">Tempo: 77</p>
                                <p style={{display:"block"}} className="specs">NEEDS: {session.needs}</p>
                            </div>
                            
                            <div className="sessionsItemArt">
                                <img style={{width:"100%"}} src={session.sessionArt? session.sessionArt:placeholder} />
                            </div>

                            {rendercontent()}

                            {/* {session.stems.length>1?(
                                session.stems.map((source,key)=>{
                                    <div style={{maxWidth: "400px",margin: "auto"}}>{renderPad(source,key)}</div>
                                })
                            ):
                                <div style={{maxWidth: "400px",margin: "auto"}}></div>
                            } */}
                            

                        </div>
                    ))
                    ):"Loading..."
                }
            </div>
        </div>
    )
}

export default Sessions
