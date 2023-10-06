import { useEffect, useState } from "react";
import "./App.css";
import "./components/screen.css";
import Buttons from "./components/Buttons";
import zingtouch from "zingtouch";
import Music from "./components/Music";

// global variables
let index = 0,
  range = 0,
  visibility = true,
  selectItem;

function App() {
  // state hooks
  const [menuOption, setmenuOption] = useState([
    { option: "Cover Flow", state: true, id: 0 },
    { option: "Settings", state: false, id: 1 },
    { option: "Music", state: false, id: 2 },
    { option: "Games", state: false, id: 3 },
  ]);

  const [angle, setAngle] = useState(0);

  const [active, setActive] = useState([]);

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
      setmenuOption((prevList) => {
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
      setmenuOption((prevList) => {
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
  }, [angle])

  // select button position at middle
  const handleSelect = () => {
    selectItem = menuOption.filter((item) => item.state === true);
    const title = selectItem[0].option;

    if (title === "Cover Flow") {
      setActive({
        ...selectItem,
        src: null,
      });
    } else if (title === "Settings") {
      setActive({
        ...selectItem,
        src: <img src="https://img.freepik.com/premium-photo/contours-gears-background_476363-6887.jpg" alt="none" />,
      });
    } else if (title === "Games") {
      setActive({
        ...selectItem,
        src: <img src="https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?cs=srgb&dl=pexels-lalesh-aldarwish-194511.jpg&fm=jpg" alt="none" />,
      });
    } else if (title === "Music") {
      setActive({
        ...selectItem,
        src: <Music menuOption={menuOption} selectItem={selectItem} />
      });
    }

    visibility = false;
  };

  const handleMenu = () => {
    visibility = true;
    setActive([]);
  };

  // render function
  return (
    <div className="App">
      <div className="screen">
        {/* side-menu section */}
        <div
          style={!visibility ? { display: "none" } : {}}
          className="side-menu"
        ><li>
          <b>iPod.js</b>
        </li>
          {menuOption.map((item) => (
            <li key={item.id} className={item.state ? "active" : ""}>
              {item.option}
            </li>
          ))}
        </div>

        {/* display section */}
        <div className="display">
          <h2>{visibility ? "" : active[0].option}</h2>
          {active.src}
          {/* {active.src || <img src={visibility ? "" : active.src} />} */}
        </div>
      {/* Button Component */}
      <Buttons handleSelect={handleSelect} handleMenu={handleMenu} />
      </div>

    </div>
  );
}

export default App;
