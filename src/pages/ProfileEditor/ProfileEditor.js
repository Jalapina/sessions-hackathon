import React, {useState,useEffect,useRef} from 'react';
import Header from '../../components/Header/Header';
import { useNavigate } from "react-router-dom";
import {db} from '../../functions/firebase';
import { useCookies } from 'react-cookie';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthDispatch } from "../../components/Auth/auth-context";
import SessionsFeed from '../../components/SessionsFeed/SessionsFeed'
import "./profile.css"

const ProfileEditor = () =>{
    let navigate = useNavigate();    
    const [users, setUsers] = useState([]); //useState() hook, sets initial state to an empty array    
    const [user, setUser,removeCookie] = useCookies(['user']);
    const [sessions, setSessions] = useState()
    const dispatch = useAuthDispatch();
    
    const initialState = {
        status: "idle",
        user: null,
        error: null
    };

    const getUserData = async() => {

        // const response = db.firestore().collection('user')
        // .onSnapshot(snapshot => {
        //       const sessions = snapshot.docs.map(doc => ({
        //           id: doc.id,
        //         ...doc.data(),
        //       }));
        //     console.log(sessions)
        //       setUsers(sessions);
                
                const response = db.firestore().collection('session')

                response.where("address","==",user.user.displayName).get()
                .then(snapshot => {
                    const sessions = snapshot.docs.map(doc => ({
                        id: doc.id,
                      ...doc.data(),
                    }));
                    console.log(sessions)
                    setSessions(sessions);
                
                });
          
            // });
            // return () => unsubscribe();

    };

    const signOut = () => {
        dispatch(initialState);
        removeCookie("user",{path:'/'});
        navigate(`/`);        
      }
      
    console.log(sessions)    
      useEffect(()=>{
        getUserData();
      },[])
    
    return(
        <div className="profile">
        <Header title={user.user.displayName}/>
            <div className="container">
                <div className="leftSideBar">
                        <div className="profilePicture">
                            <img className="profilePicture" alt="profilePic" src="https://images.unsplash.com/photo-1662659512201-3f93560f1421?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
                            />
                        </div>
                        <div className='specs'>
                            <h2>SPECS</h2>
                            <h4>Sessions: 2</h4>
                            <h4>collabs: 7</h4>
                            <button onClick={signOut}>sign out</button>
                        </div>
                </div>
                <div className="mainContentArea">
                    <div className='bio'>
                        Welcome to the website. If you're here, you're likely looking to find random words. Random Word Generator is the perfect tool to help you do this. While this tool isn't a word creator, it is a word generator that will generate random words for a variety of activities or uses. 
                    </div>
                </div>


            </div>
        </div>

    )
}
    

export default ProfileEditor
