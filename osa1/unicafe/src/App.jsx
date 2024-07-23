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
  const all = props.good + props.neutral + props.bad;
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <table style={{ padding: 0 }}>
        <tbody>
          <tr style={{ lineHeight: '0.2' }}>
            <td>good</td>
            <td><StatisticLine text="" value={props.good} /></td>
          </tr>
          <tr style={{ lineHeight: '0.2' }}>
            <td>neutral</td>
            <td><StatisticLine text="" value={props.neutral} /></td>
          </tr>
          <tr style={{ lineHeight: '0.2' }}>
            <td>bad</td>
            <td><StatisticLine text="" value={props.bad} /></td>
          </tr>
          <tr style={{ lineHeight: '0.2' }}>
            <td>all</td>
            <td><StatisticLine text="" value={all} /></td>
          </tr>
          <tr style={{ lineHeight: '0.2' }}>
            <td>average</td>
            <td><StatisticLine text="" value={(props.good * 1 + props.bad * -1) / all} /></td>
          </tr>
          <tr style={{ lineHeight: '0.2' }}>
            <td>positive</td>
            <td><StatisticLine text="" value={[(props.good / all) * 100, '%'].join(' ')} /></td>
          </tr>
        </tbody>
      </table>
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