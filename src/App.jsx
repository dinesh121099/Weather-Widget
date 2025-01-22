import { useEffect, useState } from "react";
import "./App.css";
import Time from "./Time";
import Temp from "./temp";

function App() {
  const [state, setState] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const location = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude)
      //console.log(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }
  const fetchWeather = () => {
    if(latitude && longitude){
      //console.log("Latt", latitude,"Longi", longitude);
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=auto`
      )
        .then((response) => response.json())
        .then((data) => {
          //console.log(data)
          setState(data)})
        .catch((error) => alert(error));
    }
  };

  useEffect(()=>{
    location();
  },[])

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  const now = new Date();
  const date = now.toLocaleDateString();
  return (
    <div className="widget">
      <div>
      <div className="place">Zone: {state.timezone}</div>
      <div className="temp"><Temp hourly = {state.hourly}/></div>
      </div>
      <div className="dateNtime">
      <div className="date">{date}</div>
      <div className="time"><Time/></div>
      <div className="elevation">Alt: {state.elevation}mt. asl</div>
      </div>
    </div>
  );
}

export default App;
