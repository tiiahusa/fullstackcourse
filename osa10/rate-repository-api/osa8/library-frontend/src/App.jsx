import { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_DATA } from "./queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend"

const App = () => {
  const [page, setPage] = useState("books")
  const result = useQuery(ALL_DATA)

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const client = useApolloClient()

  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    setFavoriteGenre(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} setGenre={setFavoriteGenre}/>
        <Books books={result.data.allBooks} />
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommend")}>recommend</button>
        </div>
        <div>
          <Notify errorMessage={errorMessage} />
          <button onClick={logout}>logout</button>
          <Authors show={page === "authors"} authors={result.data.allAuthors}/>
          <Recommend show={page === "recommend" } genre={favoriteGenre} />
          <Books show={page === "books" || page === "add"} books={result.data.allBooks} />
          <NewBook show={page === "add"} />
        </div>

      </div>
    );
  }


};

export default App;
