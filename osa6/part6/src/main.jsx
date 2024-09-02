import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

ReactDOM.createRoot(document.getElementById('root')).render( //sovellus on määritelty React Redux ‑kirjaston tarjoaman Provider-komponentin lapsena 
  //ja että sovelluksen käyttämä store on annettu Provider-komponentin attribuutiksi store
  <Provider store={store}>
    <App />
  </Provider>
)