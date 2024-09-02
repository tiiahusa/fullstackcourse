import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({ //Yhdistetään reducerit tämän avulla
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render( //sovellus on määritelty React Redux ‑kirjaston tarjoaman Provider-komponentin lapsena 
  //ja että sovelluksen käyttämä store on annettu Provider-komponentin attribuutiksi store
  <Provider store={store}>
    <App />
  </Provider>
)