import { useState } from 'react'

  // The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoteSelected, setMostVote] = useState(0)
  const nextAnecdotes=()=>{
    let i=selected
    while (i===selected) {
      i=getRandomInt(0,anecdotes.length)
    }
    console.log(i)
    setSelected(i)
  }
  const vote=()=>{
    const newVotes=[...votes]
    newVotes[selected]+=1
    setVotes(newVotes)
    if (newVotes[selected] > newVotes[mostVoteSelected]) {
      setMostVote(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes.</p>
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdotes}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoteSelected]}</p>
      <p>Has {votes[mostVoteSelected]} votes.</p>
    </div>
  )
}


export default App
