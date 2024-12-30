import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

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
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

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

export const setting = (anecdotes) => {
  return (dispatch) => {
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer

