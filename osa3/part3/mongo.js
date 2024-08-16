//Mongoose käyttöön
const mongoose = require('mongoose')
const config = require('./utils/config')
//Tarkistetaan onko annettu salasana ja lopetetaan ohjelma jos ei
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

// Salasana poimitaan käynnistyskoodista node mongo.js *salasana*
const password = 'user'//process.argv[2]

// Url, johon otetaan yhteys, tämä osoite saadaan mongon kannasta, oikean tietokanna voi määritellä :mongodb.net/*TÄHÄN*?retryWrites=t
const url =
  `mongodb+srv://db_user:${password}@tiiantesti.tzjy0mg.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=TiianTesti`

// Avataan yhteys kantaan
mongoose.set('strictQuery', false)
mongoose.connect(url)

//Määritellään muistiinpanon skeema:
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

//Määritellään muistiinpanon model, eli miten oliot tulee kantaan tallettaa:
const Note = mongoose.model('Note', noteSchema)

//Luodaan modelin avulla skeemaa vastaava muistiinpano-olio
const note = new Note({
  content: 'Testi 1',
  important: true,
})
const note2 = new Note({
  content: 'Testi 2',
  important: false,
})

note2.save().then(result => { // Metodi palauttaa promisen, jolle lisätään then-tapahtumakäsittelijä
  console.log('note2 saved!')
})

//Tallennetaan metodilla save
note.save().then(result => { // Metodi palauttaa promisen, jolle lisätään then-tapahtumakäsittelijä
  console.log('note saved!')
  mongoose.connection.close() // Suljetaan tietokanta
})



//Näin voidaan tulostaa kantaan tallennetut muistiinpanot:
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})