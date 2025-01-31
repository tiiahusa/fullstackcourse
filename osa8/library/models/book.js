const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  published: {
    type: Number,
    minlength: 2
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: Array,
})

module.exports = mongoose.model('Book', schema)

