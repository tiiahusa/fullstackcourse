import { useState } from 'react'


const Person = ({person}) => {
  const name = person.name
  return (
    <p>{name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const addPerson = (event) => {
    setNewName(event.target.value)
  }

  const handleTb = (event) => {
    event.preventDefault()
    console.log('Löytyykö: ', persons.includes(newName), newName)
    if(persons.includes(newName)){
      alert('${newName} is already added to phonebook')
    } else {
      const person = {name : newName}
      setPersons(persons.concat(person))
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={addPerson}/>
        </div>
        <div>
          <button type="submit" onClick={handleTb}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul> {
        persons.map(person => 
          <Person key={person.name} person = {person} />
        )}
      </ul>

    </div>
  )

}

export default App