import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { Notify } from './components/Notify'
import PhoneForm from './components/PhoneForm'
import { ALL_PERSONS } from './assets/queries'
import { useState } from 'react'

const App = () => {
  const result = useQuery(ALL_PERSONS)
  const [errorMessage, setErrorMessage] = useState(null)

  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons}/>
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>

  )
}

export default App