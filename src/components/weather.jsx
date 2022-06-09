import React, { useState } from "react";
import "./weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Icon from "../images/icon.svg";
import Sunny from "../images/wb_sunny.svg";
import Foggy from "../images/fog3.svg";
import Thunder from "../images/thunder4.svg";
import Moony from "../images/dark_moon.svg";
import Rainy from "../images/rain1.svg";
import Snow from "../images/snow2.svg";
import Cloud from "../images/cloud6.svg";
import Backgroundmoon from "../components/moon.jpg";
import Backgroundsun from "../components/sun.jpg";

function Weather() {
  const [query, setQuery] = useState(""); /*States*/
  const [weathers, setWeather] = useState({});
  const [errors, setErrors] = useState(""); //for contact form error display
  console.log("hh", errors.length);
  const Api = {
    /*API*/ key: "4cb554d42e2bcd686d02435cf6db30ac",
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
  };

  const fetchProducts = async () => {
    const errorz = validateInfo();
    console.log("main", errorz);
    if (errorz === undefined) {
      console.log("no error");

      /*Function to fetch data from OpenWeather API*/
      const response = await fetch(
        Api.url + query + "&units=metric&appid=" + Api.key
      );
      const data = await response.json();
      setWeather(data);
      setErrors("");
    } else {
      console.log("error");
    }
  };
  const validateInfo = () => {
    let erroz;
    if (!query.trim()) {
      erroz = "City required";
      setErrors("City required");
    } else if (!/^[A-Za-z ]+$/.test(query.trim())) {
      erroz = "Enter a valid City";
      setErrors("Enter a valid City");
    }
    return erroz;
  };
  const handleChange = (e) => {
    /*Function to handle user input and set query state*/

    setQuery(e.target.value);
  };
  let handleIcon = (a, e) => {
    switch (a) {
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash": /*Function to handle different weather icons*/
      case "Squall":
      case "Tornado":
        return <img src={Foggy} alt="Foggy" id="foggy" />;
      case "Thunderstorm":
        return <img src={Thunder} alt="Thunder" id="thunder" />;
      case "Drizzle":
      case "Rain":
        return <img src={Rainy} alt="Rainy" id="rainy" />;
      case "Snow":
        return <img src={Snow} alt="Snow" id="snow" />;
      case "Clouds":
        return <img src={Cloud} alt="Cloud" id="cloud" />;
      case "Clear":
        return e === "d" ? (
          <img src={Sunny} alt="Sunny" id="sunny" />
        ) : (
          <img src={Moony} alt="Monny" id="monny" />
        );
      default:
        alert("Default Error case");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };
  const style = {
    backgroundImage:
      "url(" + Backgroundsun + ")" /*Functions to apply backgrounds*/,
  };
  const styles = {
    backgroundImage: "url(" + Backgroundmoon + ")",
  };
  return (
    <React.Fragment>
      <body>
        <div className="container">
          <div
            className="background"
            style={
              weathers.sys === undefined /*Handling Background change*/
                ? style
                : weathers.weather[0].icon.slice(2) === "d"
                ? style
                : styles
            }
          >
            <div className="icom">
              <img src={Icon} alt="Icon" className="icon" /> {/*App Icon*/}
            </div>
            <div className="search">
              <form onSubmit={handleSubmit}>
                {/*Search Bar*/}
                <input
                  id="searchQueryInput"
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={handleChange}
                />
                <button id="searchQuerySubmit" type="submit">
                  {/*Search Button*/}
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                {errors && <p className="error-response">{errors}</p>}
              </form>
            </div>
            <div className="break"></div>
            {weathers.sys === undefined ? (
              <div className="output-home">
                <ul className="output-home">Enter city in search</ul>
              </div>
            ) : (
              <div className="output-main">
                <div className="output-city">
                  {console.log("Log", weathers)} {/*Weather output*/}
                  <ul id="city">{weathers.name}</ul>
                </div>
                <div className="output-weather">
                  <ul>{weathers.weather[0].main}</ul>
                </div>
                <div className="weather-icon">
                  {handleIcon(
                    weathers.weather[0].main,
                    weathers.weather[0].icon.slice(2)
                  )}
                </div>
                <div className="weather">
                  <ul id="temp">{Math.round(weathers.main.temp)} °</ul>
                </div>
                <div className="output-temp">
                  <ul>Max:{Math.round(weathers.main.temp_max)}°</ul>
                  <ul>Min:{Math.round(weathers.main.temp_min)}°</ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </body>
    </React.Fragment>
  );
}

export default Weather;
