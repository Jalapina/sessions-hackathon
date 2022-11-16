import React, {useState,useEffect,useRef} from 'react';
import "./ProfilePreview.css"

const ProfilePreview = () =>{


    

    return(
        <div className="ProfilePreview">
        <div className="container">
            <form action="">
              <input type="text" className="ghost-input" placeholder="Email" required/> 
              <input type="text" className="ghost-input" placeholder="Username" required/>
              <input type="submit" className="ghost-button"/>
            </form>
        </div>
        </div>

    )
}
    

export default ProfilePreview
