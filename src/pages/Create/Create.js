import React, {useState,useEffect,useRef} from 'react';
import Header from '../../components/Header/Header';
import { useNavigate } from "react-router-dom";
import db from '../../functions/firebase';
import { useCookies } from 'react-cookie';
import "../Register/register.css"

const Create = () =>{
    let navigate = useNavigate();    
    let initialState = {sessionName:"", sessionArtistName:"", sessionNeeds:[{instrument:""}], sessionDescription:"", sessionGenre:""};
    let sessionNeedsIndex = 0;
    const [sessionState, setSessionState] = useState(initialState);
    const [sessionNeed, setSessionNeed] = useState('');
    const [cookies, setCookie] = useCookies(['user']);    
    
    const userAddress = null;
    const CreateSession = e => {

        e.preventDefault();   
        const response = db.collection('session')
        .add({
            name:  sessionState.sessionName,
            artist: sessionState.sessionArtistName,
            address:  cookies["user"].displayName,
            description: sessionState.sessionDescription,
            needs: sessionNeed,
            genre: sessionState.sessionGenre,
            stems: [],
            public:true
            })
            .then(data =>{
                console.log(data.id)
                // const id = sessions[0].stems[0].get().then(res => { 
                //     let data = res.data()
                //     setLoops(data);
        
                // })
                // .catch(err => console.error(err));
   
                //     setSession(sessions[1]);
                // });

                setSessionState(initialState);
                // navigate.push(`/session/${newInvoice.id}`);
                navigate(`/session/${data.id}`);
                }
            );

    };

    const addSessionNeeds = e => {
        
        const item = e;

        const sessionNeedsArrayCopy = sessionState.sessionNeeds
        
        sessionNeedsArrayCopy.push({eitem})
        setSessionState({...sessionNeeds,sessionNeedsArrayCopy}) 
      }
    
      const onAddSessionNeed = () => {
        
            const sessionNeedsArrayCopy = sessionState.sessionNeeds        
            
            sessionNeedsArrayCopy.push("")
            setSessionState({...sessionNeeds,sessionNeedsArrayCopy})
        };
        

    return(
        <div className="Create">
        <div className="container">
            <form onSubmit={CreateSession}>
                <input type="text" className="ghost-input" value={sessionState.sessionName} placeholder="Name" onChange={(e)=> setSessionState({...sessionState, sessionName:e.currentTarget.value})} required/> 
                <input type="text" className="ghost-input" value={sessionState.sessionArtistName} placeholder="Artist Name" onChange={(e)=> setSessionState({...sessionState, sessionArtistName:e.currentTarget.value})} required/> 
                <input type="text" className="ghost-input" value={sessionState.sessionGenre} placeholder="Genre" onChange={(e)=> setSessionState({...sessionState,sessionGenre:e.currentTarget.value})} required/> 
                <input type="text" className="ghost-input" value={sessionState.sessionDescription} placeholder="Description" onChange={(e)=> setSessionState({...sessionState, sessionDescription: e.currentTarget.value})} required/> 
                <input type="text" className="ghost-input" placeholder="needs" onChange={e => setSessionNeed(e.target.value)} required/>
                {/* <button onClick={() => {sessionNeed('');
                    sessionState.sessionNeeds.push({
                    id: sessionNeedsIndex++,
                    instrument: sessionNeed,
                });
                }}>Add</button>
                <ul>
                    {sessionState.sessionNeeds.map(needs => (
                    <li key={needs.id}>{needs.instrument}</li>
                    ))}
            </ul> */}
            <input type="submit" className="ghost-button"/>

            </form>
        </div>
        </div>

    )
}
    

export default Create
