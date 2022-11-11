import React, {useState,useEffect,useRef} from 'react';
import Header from '../../components/Header/Header';
import "./profile.css"
import SessionsFeed from '../../components/SessionsFeed/SessionsFeed'





const profile = () =>{
    const profileComponents = ["sessions", "collabs", "comments", "settings"];
    const [profileComponentDisplay, setProfileComponentDisplay] = useState("sessions"); //setting sessions to be the deault component
    
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
                    <div className='profileOptions'>
                        <div 
                            className='btn-group'
                            role="group"
                        >
                            {profileComponents.map(profileComponent => (
                            <button
                                    type="button"
                                    key={profileComponent}
                                    className={"btn profileButton"}
                                    onClick={() => setProfileComponentDisplay(profileComponent)}
                                >
                                    {profileComponent}
                            </button> 
                            ))}
                            
                        </div>
                    </div>
                    <div className='componentArea'>
                    {profileComponentDisplay === "sessions" && <SessionsFeed />}

                    </div>

                    
                </div>
            </div>
        </div>

    )
}
    

export default profile
