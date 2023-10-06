import React, { useEffect } from "react";
import "./buttons.css";

function Buttons({ handleSelect, handleMenu }) {
  return (
    <div className="button-wheel" id="button-wheel">
      <span className="select" onClick={handleSelect}></span>
      <button className="backward">
        <i className="fa-solid fa-backward-fast "></i>
      </button>
      <button className="menu" onClick={handleMenu}>
        <i className="fa-solid fa-bars "></i>
      </button>
      <button className="forward">
        <i className="fa-solid fa-forward-fast "></i>
      </button>
      <button className="play-pause">
        <i className="fa-solid fa-play"></i>
        <i className="fa-solid fa-pause"></i>
      </button>
    </div>
  );
}

export default Buttons;
