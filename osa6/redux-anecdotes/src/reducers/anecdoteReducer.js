import { createSlice } from '@reduxjs/toolkit'

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
      const anecdote = asObject(action.payload.anecdote)
      state.push(anecdote).sort((a, b) => b.votes - a.votes)
    },
    voteAnecdote(state, action) {
      const id = action.payload.id //Poimitaan oikea id
      const anecdote = state.find(n => n.id === id) //Etsitään sen perusteella anekdootti

      const changed = {
        ...anecdote,
        votes: anecdote.votes+1
      }
      return state.map(anec => //Mennään state läpi ja asetetaan muutettu nykyisen tilalle
        anec.id !== id ? anec : changed
      ).sort((a, b) => b.votes - a.votes)
    }
  }
}
)

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

/*
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADDNEW':
      return [...state, action.payload.anecdote].sort((a, b) => b.votes - a.votes)
    case 'VOTE':
      const id = action.payload.id //Poimitaan oikea id
      const anecdote = state.find(n => n.id === id) //Etsitään sen perusteella anekdootti

      const changed = {
        ...anecdote,
        votes: anecdote.votes+1
      }
      return state.map(anec => //Mennään state läpi ja asetetaan muutettu nykyisen tilalle
        anec.id !== id ? anec : changed
      ).sort((a, b) => b.votes - a.votes)
    default:
      return state.sort((a, b) => b.votes - a.votes)
  }
}

export const voteAnecdote = (id) => { 
  return {
    type: 'VOTE',
    payload: { id }
  }
}  

export const newAnecdote = (text) => {
  const anecdote = asObject(text) 
  return {
    type: 'ADDNEW',
    payload: { anecdote }
  }
}  

export default reducer*/