import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Animation from "../components/animation";
import QuestionBox from "../components/questionBox";
import PrimaryNavbar from "../components/primaryNavbar";
import Loading from "../components/loading";
import "../stylesheets/PrimaryGame.css";
import RedirectToHomePage from "../components/redirectToHomePage";

let qno = 0;
let count = 0;
let scores = [0, 0, 0, 0, 0];
const PrimaryGame = () => {
  let [trait, setTrait] = useState(5);
  let [timetaken, setTimetaken] = useState(0);
  let [score, setScore] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  let [questionNumber, setQuestionNumber] = useState(1);
  const navigate = useNavigate();
  const [isExit, setIsExit] = useState(false);
  let [loading, setLoading] = useState(false);
  let [animationLoading, setanimationLoading] = useState(true);

  setTimeout(() => {
    setanimationLoading(false);
  }, 12000);

  let submitButtonHandle = async () => {
    setLoading(true);
    await fetch(process.env.React_App_Backend_domain + "/newTestData", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        newTestData: scores,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setTimeout(() => {
          setLoading(false);
          navigate("/resultpage");
        }, 4001);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isExit && count == 0) {
    count++;
    submitButtonHandle();
  }
  if (trait < 5 && qno != questionNumber) {
    scores[trait] += timetaken;
    setTrait(5);
    qno = questionNumber;
  }
  const authenticate = async () => {
    let isAuthenticated = false;

    await fetch(process.env.React_App_Backend_domain + "/authenticate", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if ("status" in responseJson) {
          isAuthenticated = true;
        }
      })
      .catch((error) => {
        console.log("error");
        isAuthenticated = false;
        navigate("/login");
      });

    return isAuthenticated;
  };

  useEffect(() => {
    authenticate();
  }, []);

  let animate = () => {
    let frame = document.getElementById(
      "HomeAnimation" + popOut
    ).contentDocument;
    let newEvent = new KeyboardEvent("keydown", {
      key: "a",
      code: "KeyA",
      location: 0,
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: false,
      repeat: false,
      isComposing: false,
      charCode: 0,
      keyCode: 65,
      which: 65,
    });
    frame.dispatchEvent(newEvent);
  };
  let [popOut, setPopOut] = useState(1);
  const [over, setOver] = useState(false);
  return (
    <div className="PGOuterDiv">
      <PrimaryNavbar
        setIsExit={setIsExit}
        questionNumber={questionNumber}
        score={score}
        min={min}
        sec={sec}
        setMin={setMin}
        setSec={setSec}
        over={over}
        setOver={setOver}
      />
      <div className="PGMainDiv">
        {!over ? (
          <React.Fragment>
            <div className="PGLeftDiv">
              <iframe
                className="Butterflies"
                src="butterflies/index.html"
                height="150px"
                width="250px"
                frameBorder="0"
              ></iframe>
              <QuestionBox
                setIsExit={setIsExit}
                setTimetaken={setTimetaken}
                setTrait={setTrait}
                // exitHandle ={exitHandle}
                animate={animate}
                setPopOut={setPopOut}
                popOut={popOut}
                setQuestionNumber={setQuestionNumber}
                questionNumber={questionNumber}
                setMin={setMin}
                score={score}
                setScore={setScore}
                setSec={setSec}
                min={min}
                sec={sec}
              />
            </div>
            <Animation popOut={popOut} />
          </React.Fragment>
        ) : (
          <RedirectToHomePage />
        )}
      </div>
      {loading && <Loading />}
      {animationLoading && <Loading />}
    </div>
  );
};

export default PrimaryGame;
