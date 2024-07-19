import { useState } from 'react'

// Yhden statistiikkarivin näytökomponentti
const StatisticLine = ({text, value}) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

// Komponentti statistics, joka näyttää tilastot
const Statistics = (props) => {
  const all = props.good+props.neutral+props.bad
  if (all === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <br></br>
      <StatisticLine text = 'good' value={props.good} />
      <StatisticLine text = 'neutral' value={props.neutral} />
      <StatisticLine text = 'bad' value={props.bad} />
      <StatisticLine text = 'all' value={all} />
      <StatisticLine text = 'average' value={(props.good*1+props.bad*-1)/all} />
      <StatisticLine text = 'positive' value={[(props.good/all), '%'].join(' ')}/>
    </div>
  )

}

//Komponentti Button, joka luo painonapin
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
      <h1> Give feedback</h1>
      <br></br>
      <Button handleClick ={() => setGood(good+1)} text='good' />
      <Button handleClick ={() => setNeutral(neutral+1)} text='neutral' />
      <Button handleClick ={() => setBad(bad+1)} text='bad' />
      <br></br>
      <Statistics good={good} bad={bad} neutral ={neutral} />
    </div>
  )
}

export default App