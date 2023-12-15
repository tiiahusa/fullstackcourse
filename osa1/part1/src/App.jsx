/*/import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App/*/
// Koodin yksinkertaistus

/*/
const App = //Sijoitetaan alempi komponentti muuttujaan App
() => ( // Ja tästä alkaa ko. komponentti
  <div>
    <p>Hello world</p>
  </div>
) // Ja tähän riviin se loppuu

export default App


const App = () => {
  console.log('Hello from komponentti') // Selaimen konsoliin tulee lisäteksti
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}




const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (
    <div> // Koodi näyttää HTML:ltä mutta on todellisuudessa JSX:ää
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
} 

const Hello = (props) => { // Määritetään Hello-funktiolle parametri name, eli "propsi"
  return (
    <div>
      <p>Hello {props.name}</p> 
    </div>
  )
}

const App = () => { // Voidaan käyttää Hello-funktiota "pääfunktio" Appissa
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Tiia"/>
      <Hello name="Jarkko"/>
      <Hello />
      <Hello />
    </div>
  )
} 

const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => { // Voidaan määritellä muuttujia myös pääfunktion alkuun
  const nimi = 'Pekka'
  const ika = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
    </div>
  )
} 



const App = () => { // Ilman DIV-elementtiä ei App-komponenttia saa toimimaan
  return (
    <h1>Greetings</h1>
    <Hello name="Maya" age={26 + 10} />
    <Footer />
  )
} 



const App = () => { // Mutta esim taulukollinen elementtejä ([&]) sopii
  return [
    <h1>Greetings</h1>,
    <Hello name="Maya" age={26 + 10} />,
  ]
} 

const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => { // Tai voidaan käyttää fragmentteja, eli ympäröidään
  //komponentit tyhjällä elementillä (<> & </>) ja tällöin sovelluksen
  //DOM-puuhun ei tule "ylimääräisiä elementtejä"
  const name = 'Pekka'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </>
  )
} 

const App = () => { // Kun ohjelmaa yrittää kääntää, konsoli sanoo seuraavaa:
  //react-dom.development.js:14887 Uncaught Error: Objects are not valid 
  //as a React child (found: object with keys {name, age}). If you meant
  // to render a collection of children, use an array instead.
  const friends = [
    { name: 'Leevi', age: 4 },
    { name: 'Venla', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0]}</p>
      <p>{friends[1]}</p>
    </div>
  )
} 

//Edellien ei kääntynyt, koska Reactissa yksittäisten aaltosulkeissa olevien
//renderöitävien asioiden tulee olla lukuja tai merkkijonoja

//Korjataan asia seuraavasti:
const App = () => {
  const friends = [
    { name: 'Leevi', age: 4 },
    { name: 'Venla', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </div>
  )
} // Eli renderöidään erikseen nimi {friends[0].name} {friends[0].age} ja ikä
//Ja nyt koodi toimii


/*/

// React sallii myös taulukon renderöimisen, jos taulukon sisältö on sallittua
// Mutta palataan sen hyödyntämiseen myöhemmin
const App = () => {
  const friends = [ 'Leevi', 'Venla']

  return (
    <div>
      <p>{friends}</p>
    </div>
  )
}



export default App