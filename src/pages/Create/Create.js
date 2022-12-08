import React, {useState,useEffect,useRef} from 'react';
import Header from '../../components/Header/Header';
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import firebase from 'firebase/compat/app';
import {db} from '../../functions/firebase';
import { useCookies } from 'react-cookie';
import "../Register/register.css"
import { useAuthState } from "../../components/Auth/auth-context";

const Create = () =>{

    let navigate = useNavigate();    
    let initialState = {sessionName:"", sessionArtistName:"", sessionNeeds:[{instrument:""}], sessionDescription:"", sessionGenre:""};
    let sessionNeedsIndex = 0;
    const [sessionState, setSessionState] = useState(initialState);
    const [sessionNeed, setSessionNeed] = useState('');
    const [sessionArt, setSessionArt] = useState();
    const [cookies, setCookie] = useCookies(['user']);
    const userAddress = null;

    const authState = useAuthState()
    console.log(authState,cookies)

    const CreateSession = async(e) => {
        e.preventDefault();

        if (cookies.user == null) return alert("Not Singed In");

        const storage = db.storage();
        const storageRef = storage.ref();
        let sessionArtURL = null;

        try {
            
            const fileRef = await storageRef.child(sessionArt.file.name).put(sessionArt.file)
            sessionArtURL = await fileRef.ref.getDownloadURL();

            const response = db.firestore().collection('session')
            .add({
                name:  sessionState.sessionName,
                sessionArt: sessionArtURL,
                artist: sessionState.sessionArtistName,
                address:  cookies["user"].displayName,
                description: sessionState.sessionDescription,
                needs: sessionNeed,
                genre: sessionState.sessionGenre,
                stems: [],
                tempo: null,
                minted:false,
                public:true,
                createdAt : firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt : firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(data =>{
                    setSessionState(initialState);
                    navigate(`/session/${data.id}`);
                    }
                );

        }catch(e){console.log(e)}

    };

    const onFileHomeImageChange = async(e) => {

        const file = e.target.files[0]
        setSessionArt({
            url:URL.createObjectURL(file),
            file:file
        })
        
    }        

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
                {sessionArt?(
                    <img style={{width:"120px"}} src={sessionArt.url}/>
                ):
                    <input type="file" accept="image/*"  onChange={e => onFileHomeImageChange(e)} />
                }
                <input type="text" className="ghost-input" value={sessionState.sessionName} placeholder="Session Name" onChange={(e)=> setSessionState({...sessionState, sessionName:e.currentTarget.value})} required/> 
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
