//Redux toolkit
import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

/*const initialState = [ Nämä siirretty omaan json tiedostoon, "tietokantaan"
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]*/
//Tarpeeton nyt kun service generoi id:n
//const generateId = () =>
//  Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes', //Määrittelee etuliitteen, jota käytetään actioneiden type-arvoissa => esim notes/createNote
  initialState: [], //Määrittelee alustavan tilan
  reducers: { //Määrittelee itse reducerin objektina, eli reducerin funktiot kirjoitetaan tähän
    //createNote(state, action) { Siirretty alas thunkiksi
    //  state.push(action.payload)
    //},
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      console.log(JSON.parse(JSON.stringify(state))) //Muista parsia JSONiksi että saat jotain ihmisluettavaa aikaiseksi
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )     
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

//Asynkroonisten funktioiden toteuttamiseen storessa
export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer
/* Ilman redux toolkitiä
const noteReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'NEW_NOTE':
        return [...state, action.payload]
      case 'TOGGLE_IMPORTANCE':
        const id = action.payload.id
        const noteToChange = state.find(n => n.id === id)
        const changedNote = { 
          ...noteToChange, 
          important: !noteToChange.important 
        }
        return state.map(note =>
          note.id !== id ? note : changedNote 
        )
      default:
        return state
      }
    } 
  

  
  export const createNote = (content) => {
    return {
      type: 'NEW_NOTE',
      payload: {
        content,
        important: false,
        id: generateId()
      }
    }
  }
  
  export const toggleImportanceOf = (id) => {
    return {
      type: 'TOGGLE_IMPORTANCE',
      payload: { id }
    }
  }  
  
  export default noteReducer*/