import { useEffect, useState } from "react"
import weather from "../service/weather"

const Weather=({info})=>{
    if (info !== null) {
        const iconUrl=`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`
        return (
            <>
            <h2>Weather in {info.name}</h2>
            <p>temperature {info.main.temp} degree Celcius</p>
            <img src={iconUrl} alt={info.weather[0].description}></img>
            <p>wind {info.wind.speed} m/s</p>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

const CountryDetail=({country})=>{
    console.log('CountryDetail',country)
    const [weatherInfo, setWeatherInfo] = useState(null)
    useEffect(()=>{
        weather.getInfo(country)
            .then(r=>{
                console.log('weatherApi response',r)
                setWeatherInfo(r)
            }).catch(e=>{
                console.log('weatherApi error',e)
                setWeatherInfo(null)
            })
    }, [])
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Official name: {country.name.official}</p>
        <p>Capital: {country.capital.map(cap=>cap)}</p>
        <p>Area: {country.area}</p>
        <div>
          <p>Languages:</p>
          <ul>
            {Object.values(country.languages).map(lang=><li key={lang}>{lang}</li>)}
          </ul>
        </div>
        <img src={country.flags.png} alt={country.flags.alt} />
        <Weather info={weatherInfo} />
      </>
    )
  }

export default CountryDetail
