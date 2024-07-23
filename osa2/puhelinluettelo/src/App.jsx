import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Filter = (props) => {
  return (
    <div> 
    filter shown with <input value={props.value} onChange={props.onChange}></input>
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form>
      <div>
        name: <input value={props.newName} onChange={props.addPerson}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.addNumber}/>
      </div>
      <div>
        <button type="submit" onClick={props.handleTb}>add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return(
    <ul> {
      props.personsToShow.map(person => 
        <Person key={person.name} person = {person} />
      )}
    </ul>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

   //Haetaan data tietokannasta
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons') //Haetaan data
      .then(response => {  //Sijoitetaan vastaus 
        setPersons(response.data)
      })
  }, [])

  const personsToShow = search == ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) 

  //console.log(person.name.toLowerCase().includes(search.toLowerCase()))

  const handleTb = (event) => {
    event.preventDefault()
    if(persons.find(item => item.name.toLowerCase() == newName.toLowerCase())){
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {name : newName, number:newNumber}
      setPersons(persons.concat(person))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={(event) => setSearch(event.target.value)} value={search}/>
      <h1>add a new</h1>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={(event) => setNewName(event.target.value)} addNumber={(event) => setNewNumber(event.target.value)} handleTb={handleTb}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App