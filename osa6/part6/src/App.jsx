import { useEffect } from 'react'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'
//import noteService from './services/notes'
//import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {

  /* Ennen Notes.jsx tekoa:
  const dispatch = useDispatch()
  const notes = useSelector(state => state) // storeen tallennettuihin muistiiinpanoihin pääsee käsiksi useSelector kirjaston kautta
  // Tärkeät muistiinpanot voisi hakea esim näin:
  //const importantNotes = useSelector(state => state.filter(note => note.important)) 

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value // poiimitaan note nimisen kentän arvo (eli alempana input kenttä)
    event.target.note.value = '' //Tyhjätään note-kentän arvo
    dispatch(createNote(content)) //Luodaan note reducerin avulla
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return(
    <div>

      <ul>
        {notes.map(note=>
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
        </ul>
    </div>
  )
}*/

/*Datan hakeminen palvelimelta effecthookia käyttäen
  const dispatch = useDispatch()
    useEffect(() => {
      noteService
        .getAll().then(notes => dispatch(setNotes(notes)))
    }, [])*/
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, []) 


  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App