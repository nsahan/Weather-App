import React, { useEffect, useRef, useState } from 'react';
import './weather.css';
import search_icon from '../assets/search.png';
import day from '../assets/clear.png';
import cloudy from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import hum from '../assets/humidity.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);

    const allIcons = {
        "01d": day,
        "01n": day,
        "02d": cloudy,
        "02n": cloudy,
        "03d": cloudy,
        "03n": cloudy,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    };

    const search = async (city) => {
        if (city === "") {
            alert("Please Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            const icon = allIcons[data.weather[0].icon] || day;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            console.error("Error fetching the weather data:", error);
        }
    };

    useEffect(() => {
        search("New York");
    }, []);

    return (
        <div className='weather'>
            <div className='searchbar'>
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="search icon" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? (
                <>
                    <img src={weatherData.icon} alt="weather icon" className='dayicon' />
                    <p className='temp'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className="data">
                        <div className="col">
                            <img src={hum} alt="humidity icon" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind} alt="wind icon" />
                            <div>
                                <p>{weatherData.windSpeed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Weather;
