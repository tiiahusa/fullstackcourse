import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'



const NewNote = () => {
    const dispatch = useDispatch()

    const addNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value // poiimitaan note nimisen kentän arvo (eli alempana input kenttä)
        event.target.note.value = '' //Tyhjätään note-kentän arvo
        dispatch(createNote(content)) //Luodaan note reducerin avulla
    }

    return(
        <form onSubmit={addNote}>
            <input name="note" /> 
            <button type="submit">add</button>
        </form>
    )
}

export default NewNote