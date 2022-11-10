import React, {useState,useEffect,useRef} from 'react';
import Header from '../../components/Header/Header';
import "../Register/register.css"

const Create = () =>{
    return(
        <div className="Create">
        <div className="container">
            <form action="">
              <input type="text" className="ghost-input" placeholder="Name" required/> 
              <input type="text" className="ghost-input" placeholder="Genre" required/> 
              <input type="text" className="ghost-input" placeholder="Description" required/> 
              <input type="text" className="ghost-input" placeholder="needs" required/> 
              <input type="submit" className="ghost-button"/>
            </form>
        </div>
        </div>

    )
}
    

export default Create
