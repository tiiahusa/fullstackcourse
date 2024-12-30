import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
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
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const addAnecdoteWithNotification = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(anecdote))
    dispatch(showNotification(`You added a new anecdote: "${content}"`, 5000))
  }
}

export const voteAnecdoteWithNotification = (anecdote) => {
  return async (dispatch, getState) => {
    dispatch(voteAnecdote(anecdote))
    const votedAnecdote = getState().anecdotes.find((anec) => anec.id === anecdote.id)
    await anecdoteService.update(votedAnecdote.id, votedAnecdote)
    dispatch(showNotification(`You voted '${votedAnecdote.content}'`, 5000))
  }
}

export const insertAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer

