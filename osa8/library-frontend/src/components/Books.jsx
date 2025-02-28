import { ALL_BOOKS } from "../queries";
import { useState } from 'react';
import { useQuery } from '@apollo/client';

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const [searchType, setSearchType] = useState(null);

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  });

  if (!props.books) {
    return null;
  }

  const books = genre ? data?.allBooks : props.books;
  console.log(genre)
  console.log(books)
  console.log(data)

  if (!books) {
    return <p>Loading books...</p>;
  }

  const genres = ['all genres'];
  for (let b of books) {
    for (let g of b.genres) {
      if (!genres.includes(g)) {
        genres.push(g);
      }
    }
  }

  const findBooks = (genre) => {
    if (genre === 'all genres') {
      setGenre(null);
      setSearchType(null);
    } else {
      setGenre(genre);
      setSearchType('genre');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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
  );
};

export default Books;