import React, {useState,useEffect,useRef} from 'react';
import TextTransition, { presets } from "react-text-transition";
import Sessions from "../Sessions/Sessions"
import "./Home.css";
import record from "../record.svg";
import padIntro from "../padIntro.png";
import soundwave from "../sound-wave.png";
import pad from "../pad.png";
import PurpleArrow from "./purple-arrow.png";
import PinkArrow from "./pink-arrow.png";
import GreenArrow from "./green-arrow.png";

const Home = () =>{

    const TEXTS = [
        "Collaborate",
        "CREATE",
        "INOVATE",
        "LISTEN"
      ];

    const [index, setIndex] = useState(0);
      
    useEffect(() => {
        const intervalId = setInterval(() =>
          setIndex(index => index + 1),
          3000 // every 3 seconds
        );
        return () => clearTimeout(intervalId);
      }, []);
    
      
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

                    </div>
                    
                    <div className="padIntroContainer">
                        <img className="record" src={padIntro}/>
                    </div>

                </div>

                <div className="element right">
                    <div className="textAnimation">
                    <h1>
                        <TextTransition springConfig={presets.wobbly}>
                            
                            {TEXTS[index % TEXTS.length]}

                        </TextTransition>
                    </h1>
                    </div>


                </div>

            </div>
            <Sessions/>
            
            <div className="about">
                <div className="aboutTextHomeContainer">
                    <h2>Find that sound in your head</h2>
                    <p>
                        Collaborate with others online, looking for some vocals | a bass or some cool drums for your track? start a session, upload your stems (mp3/wav) , and share with others to help you finish your track or create whatever!
                    </p>
                </div>

                <div className="imageHomeContainer">
                    <img src={soundwave}/>
                </div>
            </div>
            <div className="about">
            <div className="imageHomeContainer">
                    <img src={pad}/>
                </div>
                <div style={{padding:"0px 0px 0px 20px"}} className="aboutTextHomeContainer">
                    <h2>MINT YOUR COLLABS</h2>
                    <p>
                        When your track is finished you have the option of write royalties on the blockchain. Hit mint and anyone who collaborated on the final session will have solidified part on the track.
                    </p>
                </div>

         
            </div>

        </div>  
            
    )
}

export default Home