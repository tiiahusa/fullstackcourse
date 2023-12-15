/*/import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)/*/

// Koodin yksinkertaistus
import ReactDOM from 'react-dom/client'

import App from './App2'

// Renderöi komponentin sisällön tiedoston index.html määrittelemään div-elementtiin, jonka is:n arvona on root
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
