import { useState, useContext } from "react";
import "./CountDown.css";
import "../GlitchText.css";
import { CountDownContext, ICountDownContext } from "./CountDownContext";
import { Button } from "@mui/material";

type CountDownProps = {
  children: React.ReactNode;
  // To improve user experience, 0timemargin is used to add a longer end period for that last second feeling, while a second in the count down is longer than a real world second
  timeMargin: number;
  simulatedSecond: number;
};

let countDownLoop: number;
// Repeat countdown, untill it passes the overflow state
function CountDown({ children, timeMargin, simulatedSecond }: CountDownProps) {
  function StartCountDown(value: number) {
    if (Math.round(value) > -timeMargin) {
      setTime(value);
      value = value - 1;
      countDownLoop = setTimeout(StartCountDown, simulatedSecond, value);
    }
    // count down finished
    else setTime(-timeMargin);
  }
  const [time, setTime] = useState(-timeMargin);

  const countDownCallbacks: ICountDownContext = {
    SetCountDown: (unixTime, highlight = true) => {
      const simulatedSecondsCount = (unixTime - Date.now()) / simulatedSecond;
      const marginedSimulatedCount = simulatedSecondsCount - timeMargin;
      
      // stop currently running countDown
      clearTimeout(countDownLoop);
      StartCountDown(marginedSimulatedCount);

      // animate the count down element to notify the user visually
      let countDownElement = document.getElementById("count-down");
      if (countDownElement && highlight) {
        countDownElement.classList.remove("animate-pop-out");
        // request browser reflow
        countDownElement.offsetWidth;
        countDownElement.classList.add("animate-pop-out");
      }
    },
  };

  return (
    <>
      <div id="count-down" className="count-down-number">
        {Math.floor(time) > -timeMargin && (
          <>
            {Math.round(time) <= 0 ? (
              <span title="0" className="highlight-count text-glitch">
                0
              </span>
            ) : (
              <span className="">{Math.round(time)}</span>
            )}
          </>
        )}
      </div>
      <CountDownContext.Provider value={countDownCallbacks}>
        {children}
      </CountDownContext.Provider>
    </>
  );
}

export default CountDown;
