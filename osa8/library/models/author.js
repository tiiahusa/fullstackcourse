const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  year: {
    type: Number
  },
})

module.exports = mongoose.model('Author', schema)


