import React from 'react'
import ReactDOM from 'react-dom/client'

//import { createStore, combineReducers } from 'redux' //Reducereiden käyttöön
import { configureStore } from '@reduxjs/toolkit' //Redux-storen käyttöön parempi(=laajempi) kirjasto kuin ylempi
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

/*
Storen luontia ilman reduxjs toolkitiä
const reducer = combineReducers({ //Yhdistetään reducerit tämän avulla
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)*/App
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //Chromen Redux DevTools -lisäosaa varten
console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render( //sovellus on määritelty React Redux ‑kirjaston tarjoaman Provider-komponentin lapsena 
  //ja että sovelluksen käyttämä store on annettu Provider-komponentin attribuutiksi store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)