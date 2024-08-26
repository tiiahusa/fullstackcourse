import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const Footer = () => { //Elementti, jolle tyypimäärittelyt tehty suoraan elementin sisälle
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
    </div>
  )
}


const App = () => {
  //Ensin tyhjä taulukko
  const [notes, setNotes] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  //Kirjautuista varten
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const noteFormRef = useRef()
  /* Effect, jolla haetaan data tietokannasta
  useEffect(() => {
   // console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        //console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  //console.log('render', notes.length, 'notes')*/

  //Effect niin, että itse toiminnot on omassa moduulissa (services/notes.js):
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  //Kirjautumistietojen muistamiseen selaimen uudelleenlataamisen yhteydessä
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  //Tilatieto, että näytetäänkö kaikki muistiinpanot vai vaan tärkeät
  const [showAll, setShowAll] = useState(true)
  // Saa parametrikseen event-tapahtumaolion ja siihen voidaan viitata/tehdä toimenpiteitä
  //tapahtumakäsittelijän sisällä
  /*const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }*/


  //Kirjautuminen
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    //event.preventDefault()
    //Luodaan oliota vastaava komponentti noteObject, jolle poimitaan content-arvoksi
    /*Lomakkeeseen kirjoitettu arvo
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
  Lisätään uusi olio notes-taulukkoon concatia käyttämällä
    setNotes(notes.concat(noteObject))
    //Tyhjennetään lomakekenttä
    setNewNote('')
    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })*/
    //Sama moduulin kautta:
    noteService
      .create(noteObject)
      .then(returnedNotes => {
        setNotes(notes.concat(returnedNotes))
      })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  /* Tämä siirretty omaan komponenttiin
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>
  )*/


  //Muistiinpanon tärkeyden vaihto
  const toggleImportanceOf = (id) => {

    /* Tärkeyden asetus ilman erillistä moduulia
    const url = `http://localhost:3001/notes/${id}` //Poimitaan oikea id käsiteltäväksi
    const note = notes.find(n => n.id === id)  //Etsitään sillä oikea muistiinpano
    const changedNote = { ...note, important: !note.important } //Luodaan uusi olio, joka on muuten samanlainen, mutta important kenttä muuttuu päinvastaiseksi
    //Operaatio siis luo uuden taulukon vanhan taulukon perusteella.
    //Jokainen uuden taulukon alkio luodaan ehdollisesti siten, että jos ehto note.id !== id on tosi,
    //otetaan uuteen taulukkoon suoraan vanhan taulukon kyseinen alkio.
    //Jos ehto on epätosi eli kyseessä on muutettu muistiinpano, otetaan uuteen taulukkoon
    //palvelimen palauttama olio. Tämä on PUT-metodin käyttöä, voidaan tehdä myös PATCH-metodilla niin
    //että korvataan ainoastaan muuttuvan id:n tiedot
    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })*/

    //Tärkeyden asetus moduulia käyttäen
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => { //Error tilanteessa asetettaan error-viesti
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => { //Timeout viestille 5 sekuntia
          setErrorMessage(null) //Tämän jälkeen viesti muutetaan null:iksi
        }, 5000)
        //Alla olevaa ei enää tarvita koska käytetään effectiä
        //setNotes(notes.filter(n => n.id !== id)) //Poistetaan virheen aiheuttanut note filteröimällä taulukko niin, että ko. id puuttuu siitä
      })
  }

  //Määrittää, mitkä notet näytetään, ehtolauseke showAll
  //Jos ehto tosi, valitaan ? notes, muuten : notes.filter(note => note.important === true)
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true) //filteröidään ne joiden important arvo = true

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <Togglable buttonLabel='new note' ref={noteFormRef}>
          <NoteForm
            createNote={addNote}
          />
        </Togglable>
      </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App