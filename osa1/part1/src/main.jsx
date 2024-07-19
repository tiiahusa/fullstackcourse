import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

/*
Annetaan mainissa muuttuja counter ja lähetetään se root:ille, jolloin const App(counter) tulee olla muuttuja sisällään
let counter = 1

const root = ReactDOM.createRoot(document.getElementById("root"))

// Tässä luodaan funktio, joka kutsuu sivun renderöintiä
const refresh = () => {
  root.render(<App counter={counter} />)
}
//Ja tässä itse kutsuminen
  refresh()
  counter += 1
  refresh()
  counter += 1
  refresh()*/

//Renderöidään (eli päivitetään) sivu 1000 ms välein ja counter arvo kasvaa aina yhdellä
//Ei hyvä tapa päivittää komponentteja
/*setInterval(() => {
    refresh()
    counter += 1
  }, 1000)*/

