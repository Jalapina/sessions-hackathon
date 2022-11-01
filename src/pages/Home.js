import React, {useState,useEffect,useRef} from 'react';
import "./home.css";
import record from "./record.svg";
import PurpleArrow from "./purple-arrow.png";
import PinkArrow from "./pink-arrow.png";
import GreenArrow from "./green-arrow.png";

const Home = () =>{
        
    // const elts = {
    //     text1: document.getElementById("text1"),
    //     text2: document.getElementById("text2")
    //     };

    // const texts = [
    //     "If",
    //     "You",
    //     "Like",
    //     "It",
    //     "Please",
    //     "Give",
    //     "a Love",
    //     ":)",
    //     "by @DotOnion"
    // ];
    
    // const morphTime = 1;
    // const cooldownTime = 0.25;
    
    // let textIndex = texts.length - 1;
    // let time = new Date();
    // let morph = 0;
    // let cooldown = cooldownTime;
    
    // const text1 = useRef(null);
    // const text2 = useRef(null);
    // text1.current = texts[textIndex % texts.length];
    // text2.current = texts[(textIndex + 1) % texts.length];

    // const doMorph = () =>{
    //     morph -= cooldown;
    //     cooldown = 0;
    
    //     let fraction = morph / morphTime;
    
    //     if (fraction > 1) {
    //         cooldown = cooldownTime;
    //         fraction = 1;
    //     }
    
    //     setMorph(fraction);
    // }
    
    // const setMorph  =(fraction) =>{
    //     text2.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    //     text2.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    
    //     fraction = 1 - fraction;
    //     text1.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    //     text1.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    
    //     text1.current.textContent = texts[textIndex % texts.length];
    //     text2.current.textContent = texts[(textIndex + 1) % texts.length];
    // }
    
    // const doCooldown = () =>{
    //     console.log(text1.current.style)
        
    //     morph = 0;

    //     text1.current.style.filter = "";        
    //     text2.current.style.opacity = "100%";
    
    //     text1.current.style.filter = "";
    //     text1.current.style.opacity = "0%";
    // }
    
    // const animate = () =>{
    //     requestAnimationFrame(animate);
    
    //     let newTime = new Date();
    //     let shouldIncrementIndex = cooldown > 0;
    //     let dt = (newTime - time) / 1000;
    //     time = newTime;
    
    //     cooldown -= dt;
    
    //     if (cooldown <= 0) {
    //         if (shouldIncrementIndex) {
    //             textIndex++;
    //         }
    
    //         doMorph();
    //     } else {
    //         doCooldown();
    //     }
    // }

    // useEffect(()=>{
    //     if(text1.current.style.filter){
    //         console.log("call")
    //         animate();
    //         console.log(text1.current.style)
    //     }
    // },[text1.current])

    return(
        <div className="home">

            <div className="intro">

                <div className="element left">

                    <div className="illustrationWrapper">
                        <div className="collaType">
                            <h2 className="nameOfInstrument">DRUMS</h2>
                        </div>
                        <img className="arrow green" src={GreenArrow}/>
                        <div className="collaType">
                            <h2 className="nameOfInstrument">VOCALS</h2>
                        </div>
                        <img className="arrow pink" src={PinkArrow}/>
                        <div className="collaType">
                            <h2 className="nameOfInstrument">SYNTHS</h2>
                        </div>
                        <img className="arrow purple" src={PurpleArrow}/>

                        <img className="record" src={record}/>
                    </div>

                </div>

                <div className="element right">
                    <h1>
                        Collaborate
                    </h1>
                    {/* <div id="container">
                        <div ref={text1} className="text1"></div>
                        <div ref={text2} className="text2"></div>
                    </div> */}

                </div>

            </div>

            <div className="about">]
                <h2>WELCOME TO SESSIONS</h2>
                <p>
                    Looking for free music loops, acapellas and vocals, want to hook up with like minded musicians from around the world or just looking to get some feedback on your music.
                    Well, you came to the right place. We have 1000s of free loops and other audio resources to keep you making music.
                </p>

                WAV/MP3
            </div>

        </div>  
            
    )
}

export default Home