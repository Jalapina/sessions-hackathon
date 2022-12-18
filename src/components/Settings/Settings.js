import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import {db} from '../../functions/firebase';
import "./Settings.css"

const Settings = () => {
  const [artistName, setArtistName] = useState('');
  const [userData,setUserData,isOwner] = useOutletContext();  

  const handleUserUpdate = () => {

    db.firestore().collection('user').doc(userData.id).update({
      artistName: artistName
    }).then(()=>{
      
      setArtistName('')
      setUserData({...userData,artistName: artistName})

    }).catch(err => {return console.error(err)});

  };


  return (
    <div className="settings-container">

      <label>
        <h3>Update Artist Name</h3>
        <input type="text" value={artistName} onChange={(e)=>setArtistName(event.target.value)} />
      </label>

      {isOwner?
        <p>Your current artist name is: {userData.artistName}</p>
        :"YOU'RE NAMELESS"
      }

      <button disabled={artistName.length<1?true:false} onClick={handleUserUpdate}>
        update
      </button>

    </div>
  );
}

export default Settings;


