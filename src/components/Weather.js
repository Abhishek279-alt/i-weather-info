import React from "react";
import "./Weather.css";
import moment from "moment";

const Weather = ({ weatherData, hour }) => {
  let temp = Math.round(weatherData.main.temp - 273.15);
  let feel = Math.round(weatherData.main.feels_like - 273.15);
  let min = Math.round(weatherData.main.temp_min - 273.15);
  let max = Math.round(weatherData.main.temp_max - 273.15);
  return (
    <div className={`card text-${hour >= 4 && hour <= 18 ? "dark" : "light"}`}>
      <div className="card-header">
        <h3 className="text-start">
          {weatherData.name}({weatherData.sys.country})
        </h3>
        <h3 className="text-end">{temp}&deg;C</h3>
        <h6>
          {moment().format("dddd")},{moment().format("LL")}
        </h6>
        <h6 className="text-end">Feels like {feel}&deg;C</h6>
      </div>
      <div className="card-body">
        <h5 className="text-center">Description</h5>
        <h5
          className="text-center"
          style={
            hour >= 4 && hour <= 18 ? { color: "green" } : { color: "yellow" }
          }
        >
          {weatherData.weather[0].main}
        </h5>
        <h6 className="text-center">Min</h6>
        <h6 className="text-center">{min}&deg;C</h6>
        <h6 className="text-center">Max</h6>
        <h6 className="text-center">{max}&deg;C</h6>
        <h6 className="text-center">Sunrise</h6>
        <h6 className="text-center">
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US")}
        </h6>
        <h6 className="text-center">Sunset</h6>
        <h6 className="text-center">
          {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US")}
        </h6>
      </div>
      <div class="card-footer text-center footer-text">
        Created by : Abhishek Singh Rajput
      </div>
    </div>
  );
};

export default Weather;
