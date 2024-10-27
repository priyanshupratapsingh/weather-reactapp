import { useState, useEffect, useRef } from 'react'
import './App.css'
import location from './assets/location.svg';
function App() {
  const searchRef = useRef()
  const [weatherData, setweatherData] = useState(null)

  const weatherFunc= async(city) => {
    try {
      const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APIKEY}&q=${city}&aqi=yes`)
      if (data.ok) {
        const datajson = await data.json()
        console.log(datajson) 
        setweatherData(datajson)
      } else {
        setweatherData(false)
      }
    } catch (err) {
      console.error("Error in API calling func: "+ err)
    }
  }
  const handleKey=(e)=>{
    if (e.key === "Enter") {
      weatherFunc(searchRef.current.value)
    }
  }
  useEffect(() => {
    weatherFunc("new-delhi")
  }, [])
  
  return (
    <>
      <div className="title">
        <h1>Weather App</h1>
      </div>
      <div className="search">
        <input onKeyDown={handleKey} ref={searchRef} type="text" />
        <button onClick={()=> weatherFunc(searchRef.current.value)}>Search</button>
      </div>

      <div className="data">
      {weatherData ? (
          <div className='data-2'>
            <div className="location">
              <img className='loc-img' src={location} alt="Location Icon" />
              <h2> {`${weatherData.location.name}, ${weatherData.location.country}`}</h2>
            </div>
            <div className="data-3">
              <div className="condition">
                <img className='condition-img' src={weatherData.current.condition.icon} alt="" />
                <p className='cond'>Condition: {weatherData.current.condition.text}</p>

              </div>
              <div className="temp">
                <div className="temp-feel">
                  <p className='temp-p'>{weatherData.current.temp_c}°</p>
                </div>
                <div className="humid">
                  <p>Feel like: {weatherData.current.feelslike_c}°C</p>
                  <p>Humidity: {weatherData.current.humidity}%</p>
                  <p>Wind: {weatherData.current.wind_kph}Km/h</p>

                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Please enter the correct name</p>
        )}
      </div>
    </>
  )
}

export default App
