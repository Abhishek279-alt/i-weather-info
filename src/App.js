import { useEffect, useState } from "react";
import "./App.css";
import Weather from "./components/Weather";
import { FaSearch, FaInfoCircle } from "react-icons/fa";

function App() {
  const dayBg =
    "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)";
  const nightBg = `linear-gradient(to right top, #0e073f, #10134a, #141d54, #18285f, #1c3269, #1e3572, #20397b, #223c84, #2a388c, #363193, #452898, #56189b)`;
  const curDate = new Date();
  let hour = curDate.getHours();

  const country = "";
  const [city, setCity] = useState("");
  const [val, setVal] = useState("");
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_API_KEY}`;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const currData = await response.json();
        setData(currData);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (hour >= 4 && hour <= 18) {
      document.body.style.background = `${dayBg}`;
    } else {
      document.body.style.background = `${nightBg}`;
    }
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";

    let timeDelay = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timeDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, country]);

  const getWeather = (e) => {
    e.preventDefault();
    if (val === "") {
      return;
    } else {
      setCity(val);
      setVal("");
    }
  };

  if (loading) {
    return <div className="load display-6 text-warning">Fetching data...</div>;
  }

  return (
    <div className="App d-flex flex-column justify-content-around my-3">
      <div
        className="text-center text-light my-3"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={`Name: Weather-Info
Type: Weather app
Created by: Abhishek Singh Rajput`}
      >
        <FaInfoCircle />
      </div>
      <h2 className="text-center" style={{ color: "turquoise" }}>
        Weather-Info
      </h2>

      <div className="select-panel my-4">
        <form action="#" onSubmit={getWeather}>
          <input
            id="search"
            type="text"
            placeholder="Search City"
            value={val}
            onChange={(event) => {
              setVal(event.target.value);
            }}
          />
          <button type="submit" className="btn  btn-outline-info pb-3 b-search">
            <FaSearch />
          </button>
        </form>
      </div>
      {typeof data.main != "undefined" || data.cod === "200" ? (
        <Weather weatherData={data} hour={hour} />
      ) : data.cod === "404" ? (
        <div className="oops display-6 text-warning">City not found</div>
      ) : (
        <div className="oops display-6 text-warning">Search a city</div>
      )}
    </div>
  );
}

export default App;
