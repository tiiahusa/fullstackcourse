import { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_DATA } from "./queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("books")
  const result = useQuery(ALL_DATA)

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
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
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
        <Books books={result.data.allBooks} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Authors show={page === "authors"} authors={result.data.allAuthors}/>

      <Books show={page === "books"} books={result.data.allBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
