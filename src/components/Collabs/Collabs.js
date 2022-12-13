import React, {useState,useEffect} from 'react';
import firebase from 'firebase/compat/app';
import {db} from '../../functions/firebase';

const Collabs = () =>{

    const [collabs, setCollabs] = useState()
    

    const getCollabs = async() => {
        
        // const count = locationPath == "Collabs" ? 10 : 6;
        const timeStamp = firebase.firestore.Timestamp.now();

        const snapshot = db.firestore().collection('collaborations').limit(count).where("updatedAt","<",timeStamp).get()
        
        const collabData = snapshot.then(snapshot => {
            const collabs = snapshot.docs.map(doc => ({
                id: doc.id,
              ...doc.data(),
            }));
        setCollabs(collabData);
        setIsLoading(false)
        
        });
    };

    // console.log(collabs);
    
    return(
        <div className="collabsContainer">
            
        </div>
    )
}