// Note-malli siirrettynä omaan moduuliin
const mongoose = require('mongoose')

/* Tietokantayhteys siirretty 4 osassa app.js:än hoidettavaksi
require('dotenv').config()
mongoose.set('strictQuery', false)

 
const url = process.env.MONGODB_URI //Haetaan url ympäristömuuttujista .env tiedostosta
console.log(url)

console.log('connecting to', url)  ///Tietokantaan yhteyden otto
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })*/

const noteSchema = new mongoose.Schema({ //Luodaan skeema muistiinpanolle
  content: {
    type: String, //Vaatimusmäärittelyjä kentälle https://mongoosejs.com/docs/validation.html#built-in-validators
    minlength: 5,
    required: true
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', { //Muutetaan toJSON-vastausta niin, että muutetaan id objektista stringiksi ja poistetaan turhat __v ja objekti-id vastauksesta
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//Moduulin ulos näkyvä osa määritellään hieman eri tavalla kuin aiemmin.
module.exports = mongoose.model('Note', noteSchema)