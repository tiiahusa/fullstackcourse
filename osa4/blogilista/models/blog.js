// Tietokantaolioiden skeemojen luonti
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

  blogSchema.set('toJSON', { //Muutetaan toJSON-vastausta niin, että muutetaan id objektista stringiksi ja poistetaan turhat __v ja objekti-id vastauksesta
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  const Blog = mongoose.model('Blog', blogSchema)

  module.exports = mongoose.model('Blog', blogSchema)