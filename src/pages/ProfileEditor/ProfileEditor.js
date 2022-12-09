import React, {useState,useEffect,useRef} from 'react';
import Header from '../../components/Header/Header';
import { useNavigate } from "react-router-dom";
import {db} from '../../functions/firebase';
import { useCookies } from 'react-cookie';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useAuthDispatch } from "../../components/Auth/auth-context";
import SessionsFeed from '../../components/SessionsFeed/SessionsFeed'
import placeholder from "../placeholder.png";
import "./profile.css"

const ProfileEditor = () =>{
    let navigate = useNavigate();    
    const [userData, setUserData] = useState([]); //useState() hook, sets initial state to an empty array    
    const [user, setUser,removeCookie] = useCookies(['user']);
    const [sessions, setSessions] = useState()
    const [isOwner, setIsOwner] = useState(false)
    const dispatch = useAuthDispatch();
    let location =  useLocation();
    let locationPath = location.pathname.split("/").pop();

    const sliptAddressText = (address) =>{
        return address.split("").splice(-10);
    }
    
    const initialState = {
        status: "idle",
        user: null,
        error: null
    };

    const getUserSessionsData = async() => {
        
        const response = db.firestore().collection('session')
        
            response.where("address","==",user.user.displayName).get()
            .then(snapshot => {
                
                const sessions = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setSessions(sessions);
                        
        });
        
    }

    const getUserData = async() => {

        const userData = db.firestore().collection('user')

        const userSnapshot = userData.where("address","==",locationPath).get().then(snapshot => {
            
            const userJSON = snapshot.docs.map(doc => ({
                id: doc.id,
              ...doc.data(),
            }));

            setIsOwner(userJSON[0].address == user.user.displayName? true:false)
                
            setUserData(userJSON[0]);
                
            }).catch(err => {return console.error(err)});
            
        };
        
        const signOut = () => {
            dispatch(initialState);
            removeCookie("user",{path:'/'});
            navigate(`/`);        
        }
        
        useEffect(()=>{  
            getUserData();
        },[])
        
    return(
        <div className="profile">
        
        <Header title={sliptAddressText(user.user.displayName)}/>

            <div className="container">
                <div className="leftSideBar">
                        <div className="profilePicture">
                            <img className="profilePicture" alt="profilePic" src={userData? userData.profileImage : placeholder}/>
                        </div>
                        <div className='specs'>
                            <h2>{userData ? userData.artistName: "Loading..."}</h2>
                            <h4>Sessions: {sessions?sessions.length:"None"}</h4>
                            <h4>collabs: 7</h4>
                            {isOwner? <button onClick={signOut}>sign out</button>:""}
                        </div>
                </div>
                <div className="mainContentArea">
                    <div className='bio'>
                        Welcome to the website. If you're here, you're likely looking to find random words. Random Word Generator is the perfect tool to help you do this. While this tool isn't a word creator, it is a word generator that will generate random words for a variety of activities or uses. 
                    </div>
                    <div className="profileNavigation">
                        
                      {isOwner?  <div>
                            <p>
                                SETTINGS
                            </p>
                        </div>:""}
                        <div>
                            <p>
                                SESSIONS
                            </p>
                        </div>
                        <div>
                            <p>
                                COLLABS
                            </p>
                        </div>
  
                    </div>
                </div>

            </div>
            {/* {newUser? <div style={{width:"100%",display:"inline-block",textAlign:"center"}}>Welcome</div>:""} */}
        </div>

    )
}
    

export default ProfileEditor
