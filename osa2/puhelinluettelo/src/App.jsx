import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({person, handleDelete}) => {
  return (
    <p>{person.name} {person.number} {' '}
    <button onClick={() => handleDelete(person)}>delete</button></p>
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

const Persons = ({personsToShow, handleDelete}) => {
  return(
    <ul> {
      personsToShow.map(person => 
        <Person key={person.name} person={person} handleDelete={handleDelete} />
      )}
    </ul>
  )
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [noteMessage, setNote] = useState(null)
  const [noteType, setNoteType] = useState(null)

   //Haetaan data tietokannasta
  useEffect(() => {
    personService
      .getAll()
      .then(data => {  //Sijoitetaan vastaus 
        setPersons(data)
      })
  }, [])

  const personsToShow = search == ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) 

  //console.log(person.name.toLowerCase().includes(search.toLowerCase()))

  const handleTb = (event) => {
    event.preventDefault()
    const addedPerson = persons.find(item => item.name.toLowerCase() === newName.toLowerCase())
    if(addedPerson){
      if(window.confirm(`${addedPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...addedPerson, number: newNumber }
        personService
          .update(addedPerson.id, updatedPerson)
          .then(returnedNotes => {
            setPersons(persons.filter(n => n.id !== addedPerson.id).concat(updatedPerson))
          })
      }
    } else {
      personService //Kutsutaan personServiceä 
        .create({name : newName, number:newNumber}) //Luodaan person
        .then(returnedNotes => { //Lisätään person listaan
          setPersons(persons.concat(returnedNotes))
          setNoteType("success")
          setNote(`Added ${newName}`)
          setTimeout(() => { //Timeout viestille 5 sekuntia
            setNote(null) //Tämän jälkeen viesti muutetaan null:iksi
            setNoteType(null)
          }, 5000)
        })
        
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => { 
    if(window.confirm(`Delete ${person.name} ?`)) { //Jos Confirmiin vastataan ok
      personService //Kutsutaan personServiceä 
      .remove(person.id) //pyydetään poistamaan person
      .then(returnedNotes => { //Poistetaan person listasta
        setPersons(persons.filter(n => n.id !== person.id))})
      .catch(error => {
        setNoteType("error")
        setNote(`Information of ${newName} is already been removed from server`)
        setTimeout(() => { //Timeout viestille 5 sekuntia
          setNote(null) //Tämän jälkeen viesti muutetaan null:iksi
          setNoteType(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={(event) => setSearch(event.target.value)} value={search}/>
      <h1>add a new</h1>
      <Notification message={noteMessage} type={noteType} />
      <PersonForm newName={newName} newNumber={newNumber} 
        addPerson={(event) => setNewName(event.target.value)} 
        addNumber={(event) => setNewNumber(event.target.value)} handleTb={handleTb}
        />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={deletePerson}/>
    </div>
  )

}

export default App