import axios from "axios"

// For future reference https://vite.dev/guide/env-and-mode.
/*
"To prevent accidentally leaking env variables to the client, only variables prefixed with VITE_ 
are exposed to your Vite-processed code. e.g. for the following env variables:..."

So OPENWEATHER_API_KEY is not exposed, we will get undefined then.
*/
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const baseUrl="https://api.openweathermap.org/data/2.5/weather"

const getInfo=(country)=>{
    const latlng=country.capitalInfo.latlng
    const url=`${baseUrl}?lat=${latlng[0]}&lon=${latlng[1]}&appid=${API_KEY}&units=metric`
    return axios.get(url)
        .then(r=>r.data)
}

export default {getInfo}
