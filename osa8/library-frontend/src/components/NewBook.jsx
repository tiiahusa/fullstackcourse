import { useState } from 'react'
import { ADD_BOOK, ALL_DATA, ALL_BOOKS } from '../queries'
import { useMutation } from '@apollo/client'

const NewBook = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_DATA } ],
    onError: (error) => {
        const messages = error.graphQLErrors.map(e => e.message).join('\n')
        console.log(messages)
    }, 
    update: (cache, respose) => {
      cache.updateQuery({ query: ALL_DATA }, ({ allBooks, allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(respose.data.addBook.author),
          allBooks: allBooks.concat(respose.data.addBook),
        }
      })
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    const year = parseInt(published, 0)

    addBook({variables: {title, author, published: year, genres}})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook