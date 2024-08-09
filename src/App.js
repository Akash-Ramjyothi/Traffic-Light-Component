import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // Initial colour of traffic light
  const [trafficLight, setTrafficLight] = useState("red");

  // Config file to derive values
  const config = {
    red: {
      backgroundColor: "red",
      duration: 4000,
      next: "green",
    },
    yellow: {
      backgroundColor: "yellow",
      duration: 500,
      next: "red",
    },
    green: {
      backgroundColor: "lime",
      duration: 3000,
      next: "yellow",
    },
  };

  // useEffect hook to create side-effect for timer
  useEffect(() => {
    const { duration, next } = config[trafficLight];
    const timerId = setTimeout(() => {
      setTrafficLight(next);
    }, duration);
    return () => {
      clearTimeout(timerId);
    };
  }, [trafficLight]);

  // Light Component to display the current color
  function Light({ backgroundColor }) {
    return <div className="traffic-light" style={{ backgroundColor }} />;
  }

  return (
    <div className="App">
      {/* Parent wrapper for alignment */}
      <div className="wrapper">
        {/* Traffic Light UI Component */}
        <div className={["traffic-light-container"]}>
          {Object.keys(config).map((color) => (
            <Light
              key={color}
              backgroundColor={
                color === trafficLight
                  ? config[color].backgroundColor
                  : undefined
              }
            />
          ))}
        </div>
        {/* Display the number based on the current traffic light color */}
        <div className="traffic-light-number">
          {trafficLight === "red" && "1"}
          {trafficLight === "green" && "2"}
          {trafficLight === "yellow" && "3"}
        </div>
      </div>
    </div>
  );
}

export default App;
