import { ALL_BOOKS } from "../queries"
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  })

  if (!props.books || !props.show) {
    return null
  }

  const genres = ['all genres']
  for (let b of props.books) {
    for (let g of b.genres) {
      if (!genres.includes(g)) {
        genres.push(g)
      }
    }
  }

  const findBooks = (genre) => {
    if (genre === 'all genres') {
      setGenre(null)
    } else {
      setGenre(genre)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  if (genre) {
    return (
      <div>
        <h2>books, genre: <b>{genre}</b></h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {genres.map((g) => 
          <button key={g} onClick={() => findBooks(g)}>{g}</button>
        )}
        </div>
      )
  }
  return (
    <div>
      <h2>all books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {props.books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {genres.map((g) => 
          <button key={g} onClick={() => findBooks(g)}>{g}</button>
        )}
      </div>
    )

}

export default Books