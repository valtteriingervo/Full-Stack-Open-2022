import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weatherData, setWeatherData] = useState([])

    const api_key = process.env.REACT_APP_WEATHER_API_KEY

    const latitude = country.latlng[0]
    const longitude = country.latlng[1]

    const apiCallURL =
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`

    console.log(apiCallURL)

    // Fetch the weather data
    useEffect(() => {
        axios
            .get(apiCallURL)
            .then(response => {
                setWeatherData([response.data])
            })
    }, [])

    console.log('weatherData', weatherData)

    // This so that we can safely reference weatherData
    // (The variable is empty on first render)
    // Some might call this a purkkaratkaisu
    if (weatherData.length > 0) {
        const weatherObj = weatherData[0]

        const weatherIconCode = weatherObj.weather[0].icon
        const weatherDescription = weatherObj.weather[0].description

        const weatherIconUrl =
            `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`

        return (
            <div>
                <h2>Weather in {country.name.common}</h2>
                <p>temperature {weatherObj.main.temp} Celcius</p>
                <p>weather: {weatherDescription}</p>
                <img src={weatherIconUrl} alt={weatherDescription}></img>
                <p>wind {weatherObj.wind.speed} m/s</p>
            </div>
        )
    }

    return <div></div>

}

const DetailedCountry = ({ country }) => {
    // Store the values of the language object
    const languages = Object.values(country.languages)

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {languages.map(language => {
                    return <li key={language + country.area}>{language}</li>
                })}
            </ul>
            <img src={country.flags.png} alt={country.name.common}></img>
            <Weather country={country} />
        </div>
    )
}

const Country = ({ country, setCountryFilter }) => {
    const showDetailed = () => {
        setCountryFilter(country.name.common)
    }
    return (
        <li>
            {country.name.common}
            <button onClick={showDetailed}>show</button>
        </li>
    )
}

const Countries = ({ countriesToShow, setCountryFilter }) => {
    if (countriesToShow.length === 1) {
        return <DetailedCountry country={countriesToShow[0]} />
    }
    if (countriesToShow.length > 10) {
        const tooManyString = 'Too many matches, specify another filter'
        return <p>{tooManyString}</p>
    }
    return (
        <ul>
            {countriesToShow.map(country =>
                <Country key={country.name.common} country={country} setCountryFilter={setCountryFilter} />)}
        </ul>
    )
}

export default Countries