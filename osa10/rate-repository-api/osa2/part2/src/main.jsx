import ReactDOM from 'react-dom/client'
import App from './App'
//import axios from 'axios'
import './index.css'

/*axios
  .get('http://localhost:3001/api/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)

  })*/

//const promise2 = axios.get('http://localhost:3001/foobar')
//console.log(promise2)

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
