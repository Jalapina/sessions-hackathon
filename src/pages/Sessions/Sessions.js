import React, {useState,useContext,useEffect} from 'react';
import "./sessions.css"
import placeholder from "../placeholder.png";
import {Context} from '../../contexts/SamplerContext';
import { useCookies } from 'react-cookie';
import {db} from '../../functions/firebase';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';

const Sessions = () =>{

    const [Sessions, setSessions] = useState()

    const getSessions = async() => {

        const response = db.firestore().collection('session').onSnapshot(snapshot => {
            const sessions = snapshot.docs.map(doc => ({
                id: doc.id,
              ...doc.data(),
            }));
        setSessions(sessions);
        
        });

        
    };

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
        

    return(
        <div className="sessionsComponent">
            <h1>
                TOP SESSIONS
            </h1>

            <div>
                {Sessions?(
                        Sessions.map((session)=>(
                            <div className="sessionHomeContainer">
                                <div className="sessionsItemArt">
                                    <img style={{width:"40%"}} src={session.sessionArt? session.sessionArt:placeholder} />
                                </div>

                                <Link to={"/session/"+session.id}>{session.name}</Link>
                            </div>
                        ))
                    ):"Loading..."
                }
            </div>
        </div>
    )
}

export default Sessions
