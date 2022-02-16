import React, { useState, useEffect } from "react";
import Clock from "../media/clock.svg";
import Coins from "../media/coins.svg";
import Logo from "../media/logo.svg";
import { Link } from "react-router-dom";
import "../stylesheets/primaryNavbar.css";
import SubmitButtonHandle from "./questionBox.js";

let count = 0;
const CountDown = (props) => {
  const [[m, s], setTime] = useState([props.minutes, props.seconds]);
  props.setMin(m);
  props.setSec(s);
  const tick = () => {
    if (count == 0) {
      setTimeout(() => {
        if (props.over) return;
        if (m === 0 && s === 0) {
          props.setOver(true);
        } else if (s == 0) {
          setTime([m - 1, 59]);
        } else {
          setTime([m, s - 1]);
        }
        count += 1;
      }, 4000);
    } else {
      if (props.over) return;
      if (m === 0 && s === 0) {
        props.setOver(true);
      } else if (s == 0) {
        setTime([m - 1, 59]);
      } else {
        setTime([m, s - 1]);
      }
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <React.Fragment>
      {props.over
        ? "Time's up!"
        : `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`}
    </React.Fragment>
  );
};

const PrimaryNavbar = (props) => {
  return (
    <div className="PNNavbox">
      <div className="PNBox1">
        <div className="PNLogo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="PNQuestionnobox">
          <span className="PNPresentQuestion">
            {props.questionNumber + "/"}
          </span>
          <span className="PNTotalQuestions">10</span>
        </div>
      </div>

      <div className="PNBox2">
        <div className="PNTimer">
          <img src={Clock} alt="Timer" />
          <span className="detailtext">
            <CountDown
              minutes={20}
              seconds={0}
              setMin={props.setMin}
              setSec={props.setSec}
              over={props.over}
              setOver={props.setOver}
            />
          </span>
        </div>
        <button
          className="PNExitButton"
          onClick={() => {
            props.setIsExit(true);
          }}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default PrimaryNavbar;
