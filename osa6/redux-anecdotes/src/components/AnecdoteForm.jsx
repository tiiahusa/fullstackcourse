import { useDispatch } from 'react-redux'
import { addAnecdoteWithNotification } from '../reducers/anecdoteReducer'
import anecdoteService from '../../services/anecdoteService'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        const anecdote = await anecdoteService.createNew(content)
        dispatch(addAnecdoteWithNotification(anecdote))
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