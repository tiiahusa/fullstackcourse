import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addNew = (event) => {
        event.preventDefault()
        const anecdote = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(newAnecdote(anecdote))
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