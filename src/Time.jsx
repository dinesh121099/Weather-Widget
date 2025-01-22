import React, { useState } from "react";

const Time = () => {
  const [time, setTime] = useState("00:00:00");
 
  function timeStamp() {
    const date = new Date();
    const localTime = date.toLocaleTimeString();
    setTime(localTime);
  }
  setInterval(timeStamp, 1000);

  return <div>{time}</div>;
};

export default Time;
