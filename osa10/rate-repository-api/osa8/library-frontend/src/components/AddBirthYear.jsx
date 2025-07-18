import { useState } from 'react'
import Select from 'react-select'
import { ALL_DATA, EDIT_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client'

const AddBirthYear = (props) => {

  const [name, setName] = useState(null)
  const [bornYear, setYear] = useState('')

  const options = []
  props.authors.forEach(author => {
    options.push({value: author.name, label: author.name})
  })

  const [ addBirthYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_DATA } ],
    onError: (error) => {

        const messages = error.graphQLErrors.map(e => e.message).join('\n')
        console.log(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    const year = parseInt(bornYear, 0)
    addBirthYear({variables: {name: name.value, setBornTo: year}})

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          year
          <input
            type="number"
            value={bornYear}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AddBirthYear