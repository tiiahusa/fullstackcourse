import { ALL_BOOKS } from "../queries"
import { useQuery } from '@apollo/client'

const Recommend = ({ show, genre }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  
  if (!data || !show) {
    return null
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  
  return (
    <div>
      <h2>recommendations</h2>
      <h3>books in your favorite genre <b>{genre}</b></h3>
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
    </div>
  )
}

export default Recommend