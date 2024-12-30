import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const anecdote = asObject(action.payload)
      state.push(anecdote)
      state.sort((a, b) => b.votes - a.votes)
    },
    voteAnecdote(state, action) {
      const id = action.payload.id //Poimitaan oikea id
      const anecdote = state.find(n => n.id === id) //Etsitään sen perusteella anekdootti

      const changed = {
        ...anecdote,
        votes: anecdote.votes+1
      }
      console.log(JSON.parse(JSON.stringify(state)))
      return state.map(anec => //Mennään state läpi ja asetetaan muutettu nykyisen tilalle
        anec.id !== id ? anec : changed
      ).sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions

export const addAnecdoteWithNotification = (content) => {
  return (dispatch) => {
    dispatch(createAnecdote(content))
    dispatch(showNotification(`You added a new anecdote: "${content}"`, 5000))
  }
}

export const voteAnecdoteWithNotification = (anecdote) => {
  return (dispatch, getState) => {
    dispatch(voteAnecdote(anecdote))
    const votedAnecdote = getState().anecdotes.find((anec) => anec.id === anecdote.id)
    dispatch(showNotification(`You voted '${votedAnecdote.content}'`, 5000))
  }
}

export default anecdoteSlice.reducer

