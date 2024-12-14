import axios from "axios"
const baseUrl='http://localhost:3001/persons'

const fetch=()=>{
    return axios.get(baseUrl)
        .then(response => response.data)
}

const add=(person)=>{
    console.log('phonebook.add',person)
    return axios.post(baseUrl, person)
        .then(response=>response.data)
}

const remove=(person)=>{
    console.log('phonebook.remove',person)
    const url=`${baseUrl}/${person.id}`
    return axios.delete(url)
}

const update=(person)=>{
    console.log('phonebook.update',person)
    const url=`${baseUrl}/${person.id}`
    return axios.put(url, person)
        .then(response=>response.data)
}

export default {fetch, add, remove, update}
