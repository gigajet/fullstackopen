import { useState } from 'react'

const Header=({head})=>{
  return (
    <h1>{head}</h1>
  )
}

const StatisticLine=(props)=>{
  const {text, value}=props
  return (
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
}

const Statistics=(props)=>{
  const {good, neutral, bad}=props
  const all=good+neutral+bad
  if (all>0) {
    const avg=(1*good+0*neutral+(-1)*bad)/all
    const posPercent=good/all*100
    return (
      <>
      <table>
        <tbody>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={avg} />
        <StatisticLine text='positive' value={`${posPercent}%`} />
        </tbody>
      </table>
      </> 
    )
  } else {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
}

const Button=(props)=>{
  const {onClick, text} = props
  return (
    <button onClick={onClick}>{text}</button>
  )
}

function App() {
  const [good, setGood]=useState(0)
  const [neutral, setNeutral]=useState(0)
  const [bad, setBad]=useState(0)

  console.log('good',good,'neutral',neutral,'bad',bad)

  return (
    <>
      <Header head="give feedback" />
      <Button onClick={()=>setGood(good+1)} text='good' />
      <Button onClick={()=>setNeutral(neutral+1)} text='neutral' />
      <Button onClick={()=>setBad(bad+1)} text='bad' />
      <Header head="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
