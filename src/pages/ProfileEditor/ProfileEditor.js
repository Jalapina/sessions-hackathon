import React, {useState,useEffect,useRef} from 'react';
import Header from '../../components/Header/Header';
import {db} from '../../functions/firebase';

import "./profile.css"
import SessionsFeed from '../../components/SessionsFeed/SessionsFeed'

const ProfileEditor = () =>{
    const [users, setUsers] = useState([]); //useState() hook, sets initial state to an empty array    

    const getUserData = async() => {

        const response = db.collection('user')
        .onSnapshot(snapshot => {
              const sessions = snapshot.docs.map(doc => ({
                  id: doc.id,
                ...doc.data(),
              }));
              
              setUsers(sessions);

            });
            return () => unsubscribe();

        console.log(users)
    };
    
      useEffect(()=>{
        getUserData();
      },[])
    
    return(
        <div className="profile">
        <Header title={"profile"}/>
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
