import { useSelector, useDispatch } from 'react-redux'
import anecdoteReducer, { createAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if ( state.filter === '' ) {
          return state.anecdotes
        }
        return state.anecdotes.filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase()))
      })
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch({ type: 'anecdotes/voteAnecdote', payload: id})
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}              
        </div>

    )
}

export default AnecdoteList