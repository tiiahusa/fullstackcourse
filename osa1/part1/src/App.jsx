
//Komponentin määritys, voidaan käyttää ohjelmassa, AINA isolla  alkukirjaimella
const Hello = () => {

  return (
    <div>
      <p>Hello world xxx!</p>
    </div>
  )
}

//Toinen komponentti, jolle välitetään dataa
const Hello2 = (props) => {
  //Voidaan poimia propsit myös muuttujiin, jos niitä vaikka tarvitsee käyttää koodissa useamman kerran
  // Helppo poimia kaikki samalla kertaa
  const {name, age, day } = props
  //Komponentti komponentin sisällä, käytetty kompaktimpaa kirjoitustapaa, koska vain yksi komento
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello world {name}, {age} vuotta ja {day} päivää!</p>
      <p>Olet todennäköisesti syntynyt vuonna {bornYear()}</p>    
    </div>
  )
}

//Kolmas komponentti, jolle välitetään dataa
//Muuttujat nimetty jo komponentin luonnissa destruktoinnin avulla
const Hello3 = ({name, age, day }) => {
  //Komponentti komponentin sisällä, käytetty kompaktimpaa kirjoitustapaa, koska vain yksi komento
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello worldie {name}, {age} vuotta ja {day} päivää!</p>
      <p>Olet todennäköisesti syntynyt vuonna {bornYear()}</p>    
    </div>
  )
}

//Luodan komponentti Display
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

//Komponentti button
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

//Komponentin tila vaihtuu propsin tietojen perusteella
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

import { useState } from 'react'

//Sovelluksen juurikomponentti App
const App = () => {
  // älä määrittele komponenttia täällä APPin sisällä vaan ulkopuollella!
  //const Display = props => <div>{props.value}</div>


  // Tässä on hyvä tapa käyttää sivun päivittämistä
  //Huomaa ylempänä oleva import joka kuuluu tähän myös
  
  const [counter, setCounter] = useState(0)
  const [ counter2, setCounter2 ] = useState(0)

  //Buttonin funktiot voi määritellä joko buttonissa itsessään tai tällee erikseen App:in sisällä:
  const increaseByOne = () => setCounter2(counter2 + 1)
  const decreaseByOne = () => setCounter2(counter2 - 1)
  const setToZero = () => setCounter2(0)
  /*setTimeout(
    () => setCounter(counter+1), 1000
  )*/

  //Taulukko, joka muistaa näppäimen painallukset
  const [left, setLeft] = useState(0) //eli alkutila sulkujen sisään
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const now = new Date()
  const a = 5
  const b = 4
  const friends = [
    {name : "Martta", age: 10, day: 100},
    {name : "Kaapo", age: 50, day: b}
  ]
  //Seuraava komento toimii debuggaamisessa:
  //debugger
  console.log("päivä ", now, a+b) //tulostetaan selaimen konsoliin, elementit erotetana pilkulla

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <History allClicks={allClicks} />
      </div>

      <Display counter={counter}/>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
      <button onClick={() => setCounter(0)}> 
        zero
      </button>

      <Display counter={counter2}/>
      <Button
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />     
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />
      <Hello /> 
      <Hello2 name = "Tiia" age = {100+1} day={a}/>
      <Hello2 name = {friends[0].name} age = {friends[0].age} day = {friends[0].day} />
      <Hello3 name = {friends[1].name} age = {friends[1].age} day = {friends[1].day} />
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}

//Tää pitää aina olla alhaalla, älä poista
export default App