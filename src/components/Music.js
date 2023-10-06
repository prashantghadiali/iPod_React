import React, { useEffect, useState } from 'react';
import './screen.css';
import Buttons from './Buttons';
import zingtouch from "zingtouch";
let visibility = true;
let index = 0;
let range = 0;

function Music(props) {
    const [music, setMusic] = useState([
        { id: 0, state: true, musicoption: "All Songs"}, 
        { id: 1, state: false, musicoption: "Artist"}, 
        { id: 2, state: false, musicoption: "Albums"}
    ]);
    const [angle, setAngle] = useState(0);
    const [activeMusic, setActiveMusic] = useState([]);
    const { menuOption, selectItem} = props;
    console.log( menuOption, selectItem);

    useEffect(() => {
      let buttonWheel = document.getElementById("button-wheel");
      let activeRegion = zingtouch.Region(buttonWheel);
      activeRegion.bind(buttonWheel, "rotate", function (event) {
        range += Math.floor(event.detail.distanceFromLast);
  
        setAngle(range)
      })
    }, []);

    useEffect(() => {
    
      if (angle > 70) {
        setMusic((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, state: true };
            } else {
              return { ...item, state: false };
            }
          });
        });
        index++;
  
        if (index === 5) {
          index = 0;
        }
      } else if (angle < -100) {
        index--;
  
        if (index < 0) {
          index = 4;
        }
        setMusic((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, state: true };
            } else {
              return { ...item, state: false };
            }
          });
        });
      }
      setAngle(0)
    }, [angle]);


    // select button position at middle
  const handleMusicSelect = () => {
    const selectMusicItem = music.filter((item) => item.state === true);
    const title = selectMusicItem[0].musicoption;

    if (title === "All Songs") {
      setActiveMusic({
        ...selectMusicItem,
        // src: "https://cdn-icons-png.flaticon.com/512/3844/3844724.png",
        src: "Cover Flow",
      });
    } else if (title === "Artist") {
      setActiveMusic({
        ...selectMusicItem,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLMsZY8fu9F1iaGeKoX8vdfNcScf0m6uDeXw&usqp=CAU",
      });
    } else if (title === "Albums") {
      setActiveMusic({
        ...selectMusicItem,
        src: "https://img.favpng.com/25/3/4/game-controllers-video-games-computer-icons-vector-graphics-png-favpng-jhTxBr0W68mwN70upENfiuWeX.jpg",
      });
    };

    visibility = false;
  };

    const handleMusicMenu = () => {
      visibility = true;
      setActiveMusic([]);
    };
  

  return (
    <div className="screen-music">
        {/* side-menu section */}
        <div
          style={!visibility ? { display: "none" } : {}}
          className="side-menu"
        ><li>
          <b>iPod.js</b>
        </li>
          {music.map((item) => (
            <li key={item.id} className={item.state ? "active" : ""}>
              {item.musicoption}
            </li>
          ))}
        </div>

        {/* display section */}
        <div className="display">
          <h2>{visibility ? "" : activeMusic[0].option}</h2>
          {activeMusic.src && <img src={visibility ? "" : activeMusic.src} />}
        </div>
        <Buttons handleMusicSelect={handleMusicSelect} handleMusicMenu={handleMusicMenu} />
      </div>
  )
}

export default Music
