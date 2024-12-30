import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'


const NewNote = () => {
    const dispatch = useDispatch()

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value // poiimitaan note nimisen kentän arvo (eli alempana input kenttä)
        event.target.note.value = '' //Tyhjätään note-kentän arvo
        const newNote = await noteService.createNew(content)
        dispatch(createNote(newNote)) //Luodaan note reducerin avulla
    }

    return(
        <form onSubmit={addNote}>
            <input name="note" /> 
            <button type="submit">add</button>
        </form>
    )
}

export default NewNote