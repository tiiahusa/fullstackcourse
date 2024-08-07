import { useState } from 'react'


//Komponentti Button, joka luo painonapin
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  let [votes, setVote] = useState(new Array(anecdotes.length-1).fill(0))
  const [selected, setSelected] = useState(0)
  const maxVal = (element) => element >= Math.max(...votes)
  console.log(Math.max(...votes))
  console.log(votes)
  console.log(votes.findIndex(maxVal))
 // console.log(votes.findIndex(votes.maxVal))
 //

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button text="vote" handleClick = {() => {
        let newTable = [...votes]
        newTable[selected] +=1
        setVote(votes = [...newTable])}} 
      />
      <Button text="next anecdote" handleClick = {() => setSelected(Math.floor(Math.random()*(anecdotes.length-1)))} />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[votes.findIndex(maxVal)]}</p>
    </div>
  )
}

export default App