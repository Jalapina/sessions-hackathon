import React, {useState,useEffect,useRef} from 'react';
import Header from '../../components/Header/Header';
import "./register.css"

const Register = () =>{
    return(
        <div className="register">
        <Header title={"Register"}/>
        <div className="container">
            <form action="">
              <input type="text" className="ghost-input" placeholder="Email" required/> 
              <input type="text" className="ghost-input" placeholder="Username" required/>
              <input type="password" className="ghost-input" placeholder="Password" required/>
              <input type="password" className="ghost-input" placeholder="Confirm Password" required/>
              <input type="submit" className="ghost-button"/>
            </form>
        </div>
        </div>

    )
}
    

export default Register
