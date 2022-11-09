import React, {useState,useEffect,useRef} from 'react';
import Header from '../../components/Header/Header';

const profile = () =>{
    return(
        <div className="profile">
        <Header title={"profile"}/>
        <div className="container">
            <form action="">
              <input type="text" className="ghost-input" placeholder="username" required/> 
              <input type="password" className="ghost-input" placeholder="Password" required/>
              <input type="submit" className="ghost-button"/>
            </form>
        </div>
        </div>

    )
}
    

export default profile
