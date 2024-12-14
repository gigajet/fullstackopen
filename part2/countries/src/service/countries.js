import axios from 'axios'

const baseUrl='https://studies.cs.helsinki.fi/restcountries/api/'

const getAll=()=>{
    const url=`${baseUrl}all`
    return axios.get(url).then(r=>{
        console.log('getAll request',r)
        return r.data
    })
}

const getByName=(name)=>{
    const url=`${baseUrl}name/${name}`
    return axios.get(url).then(r=>r.data)
}

export default {getAll, getByName}
