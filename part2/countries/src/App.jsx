import { useEffect, useState } from 'react'
import countriesApi from './service/countries'
import CountryDetail from './component/CountryDetail'

const SearchBar=({query, setQuery})=>{
  const onChange=(ev)=>{
    setQuery(ev.target.value)
  }
  return (
    <p>find countries <input onChange={onChange} value={query}/></p>
  )
}

const Countries=({countries, query, showDetail})=>{
  console.log('Countries',countries)
  if (query!=='' && countries.length>10) {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  } else if (countries.length===0) {
    if (query!=='') {
      return (
        <>
          <p>No match, specify another filter</p>
        </>
      )
    } else {
      return (
        <>
          <p>Loading data...</p>
        </>
      )
    }
  } else if (countries.length===1) {
    return (
      <>
        <CountryDetail country={countries[0]} />
      </>
    )
  } else {
    return (
      <>
        {countries.map((c)=>{
          const onClick=(ev)=>{
            showDetail(c)
          }
          return (
            <p key={c.name.common}>{c.name.common} {c.flag} <button onClick={onClick}>show</button>
            </p>
          )
        })}
      </>
    )
  }
}

function App() {
  const [countries, setCountries]=useState([])
  const [query, setQuery]=useState('')

  useEffect(
    ()=>{
      countriesApi.getAll()
        .then(c=>setCountries(c))
        .catch(e=>{
          console.log('getAll error',e)
        })
    }, [])

  const handleQueryChange=(q)=>{
    console.log('handleQueryChange',q)
    setQuery(q)
  }

  const showCountryDetail=(c)=>{
    console.log('showCountryDetail',c)
    setQuery(c.name.common)
  }

  const matchedCountries=query==='' ? countries : countries.filter((c)=>{
    const q=query.toLowerCase()
    return (c.name.common.toLowerCase().includes(q) || c.name.official.toLowerCase().includes(q))
  })

  return (
    <>
      <SearchBar query={query} setQuery={handleQueryChange} />
      <Countries countries={matchedCountries} query={query} showDetail={showCountryDetail} />
    </>
  )
}

export default App
