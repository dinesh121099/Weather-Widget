import React, { useEffect, useState } from "react";

const Temp = ({hourly}) => {
  const [index, setIndex] = useState(-1);
  //console.log(hourly);

  useEffect(() => {
    if (hourly?.time) {
      const date = new Date();
      let today = date.toLocaleDateString().split("/")[1];
      let timeNow = date
        .toLocaleTimeString("en-US", { hour12: false })
        .split(":")[0];
      for (let i = 0; i < hourly.time.length; i++) {
        let dateVar = hourly.time[i].split("T")[0].split("-")[2];
        let timeVar = hourly.time[i].split("T")[1].split(":")[0];
        today = today.padStart(2,"0");
        //console.log(dateVar, today);
        if (today == dateVar && timeNow == timeVar) {
          setIndex(i);
          break;
        }
      }
    }
  }, [hourly]);

  //console.log(index)
  const currentTemperature = index !== -1 ? hourly?.temperature_2m[index] : null;
  //console.log(hourly?.temperature_2m[index])
  return (
    <>
      <div>{currentTemperature !== null ? currentTemperature : "Loading..."} °C
      </div>
    </>
  );
};

export default Temp;
