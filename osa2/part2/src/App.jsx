import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'

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
  //Luodaan newNote, joka myöhemmin lisätään lomakkeen alkuarvoksi
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  const [errorMessage, setErrorMessage] = useState(null)

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

  //Tilatieto, että näytetäänkö kaikki muistiinpanot vai vaan tärkeät
  const [showAll, setShowAll] = useState(true)
  // Saa parametrikseen event-tapahtumaolion ja siihen voidaan viitata/tehdä toimenpiteitä 
  //tapahtumakäsittelijän sisällä
  const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    //Luodaan oliota vastaava komponentti noteObject, jolle poimitaan content-arvoksi 
    //Lomakkeeseen kirjoitettu arvo
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
  /*Lisätään uusi olio notes-taulukkoon concatia käyttämällä
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
      setNewNote('')
    })
  }

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
        setNotes(notes.filter(n => n.id !== id)) //Poistetaan virheen aiheuttanut note filteröimällä taulukko niin, että ko. id puuttuu siitä
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
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' /*Teksti sen mukaan, näytetäänkö kaikki vai vaan tärkeät*/ }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange /*Aina kun syötekomponentissa tapahtuu jotain*/}/>
        <button type="submit">save</button>
      </form>   
      <Footer />
    </div>
  )
}

export default App 