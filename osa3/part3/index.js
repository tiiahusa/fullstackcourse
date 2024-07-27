// Otetaan käyttöön Noden sisäänrakennettu web-palvelimen määrittelemä moduuli
// tämän voisi laittaa myös import http from 'http'
const http = require('http')
// Otetaan käyttöön express laajennus:
const express = require('express')
const app = express()

//Tämän avulla voidaan requestista poimia bodysta tarvittavia tietoja, esim post-pyynnön yhteydessä:
app.use(express.json())
app.use(express.static('dist'))
//Middlewaren käyttöönotto:
//app.use(requestLogger)

const cors = require('cors')

app.use(cors())

//Muistiinpanoja taulukko-muodossa:
let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    },
    {
      id: "4",
      content: "Tiian oma",
      important: false
    }
  ]

  //Middleware
  const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

  // Express laajennoksen kanssa:
// Määritellään 2 eri routea, eli osoitepolkua, ja mitä niistä tapahtuu:
//Tässä tapahtumakäsittelijällä on kaksi polkua, request sisältää kaikki pyynnön tiedot ja response määrittelee
//Miten pyyntöön vastataan
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
// HUOM, Expressiä käyttäessä JSON-muutos ei ole tarpeen, Express osaa parsia datan JSON-muotoon automaattisesti
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// Tämä käsittelee kaikki GEt-pyynnöt, joiden osoite on http://localhost:3001/api/notes/MITÄ_VAAN
app.get('/api/notes/:id', (request, response) => {
    //Poimitaan parametri id http get-pyynnöstä:
    const id = request.params.id
    // Etsitään oikea muistiinpano ja palautetaan se
    const note = notes.find(note => note.id === id)
    //Tarkistus vielä, että öytyykö note ja jos ei niin palautetaan virhe
    if (note) {
        response.json(note)
      } else {
        response.status(404).end() // End perässä ilmoittamassa, että mitään dataa ei tule
      }
  })

  // Resurssin poisto
app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
  //Palauttaa 204 koodin riippumatta siitä poistetaanko jotain vai ei. eikä ole suoraa sääntöä olemassa pitäiskö
  //käyttää 204 vai 404 koodia niissä tilanteissa 
    response.status(204).end()
  })

//Uudelle muistiinpanolle tarvitaan uniikki id ja se tehdään etsimällä suurin id ja lisäämällä siihen 1
  const generateId = () => {
    const maxId = notes.length > 0
    //taulukko ei kelpaa Math.maxille arcoksi, joten ... -avulla muutetaan taulukko yksittäisiksi luvuiksi, jotta voidaan käyttää komentoa
      ? Math.max(...notes.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }

  //POST-pyyntö
  app.post('/api/notes', (request, response) => {
    // Poimitaan body tiedot käsittelyyn
    const body = request.body
  
    // Tarkistetaan, että content-arvo löytyy
    if (!body.content) {
      return response.status(400).json({ //muista return, muuten kodi jatkaa loppuun ja muistiinpano tallentuu
        error: 'content missing' 
      })
    }
  // luodaan note ja jos important arvoa ei ole, se on oletusarvoisesti false
    const note = {
      content: body.content,
      important: body.important || false,
      id: generateId(), //generoidaan id ylemmän komponentin avulla
    }
  // Lisätään muistiinpano listaan
    notes = notes.concat(note)
  // vastataan muistiinpanon tiedoilla pyyntöön
    response.json(note)
  })


  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

/* NÄMÄ ILMAN EXPRESS-laajennusta! ja toimivat oli polku mikä tapahda, kunhan alun osoite on ok
Luodaan http-metodilla createServer web-palvelin ja sille annetaan tapahtumakäsittelijä
//Eli {} sulkeiden sisässä oleva koodi, joka suoritetaan aina kun http://localhost:3001/ 
//HTTP-pyyntö suoritetaan
const app = http.createServer((request, response) => {
    //vastataan statuskoodilla 200 "pyyntö ok"
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  //Sivun sisällöksi asetetaan yllä annetut muistiinpanot ja muutetaan ne JSON-muotoon:
  response.end(JSON.stringify(notes))
})

/ Luodaan http-metodilla createServer web-palvelin ja sille annetaan tapahtumakäsittelijä
//Eli {} sulkeiden sisässä oleva koodi, joka suoritetaan aina kun http://localhost:3001/ 
//HTTP-pyyntö suoritetaan
const app = http.createServer((request, response) => {
    //vastataan statuskoodilla 200 "pyyntö ok"
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  //Sivun sisällöksi merkkijono Hello World:
  response.end('Hello World')
})*/

/*Nämä rivit sitovat muuttujan app kuuntelemaan nimenomaan 3001 portin pyyntöjä
const PORT = 3001
app.listen(PORT)*/

//Uudet määrittelyt kun siirretään sovellus nettiin, eli porttitieto haetaan nyt ympäristömuuttujasta, jos se on annettu:
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


console.log(`Server running on port ${PORT}`)