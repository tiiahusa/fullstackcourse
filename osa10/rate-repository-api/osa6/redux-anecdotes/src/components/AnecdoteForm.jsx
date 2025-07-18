import { useDispatch } from 'react-redux'
import { addAnecdoteWithNotification } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(addAnecdoteWithNotification(content))
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addNew}>
                <input name="newAnecdote" /> 
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm