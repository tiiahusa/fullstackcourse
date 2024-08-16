const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true // username oltava yksikäsitteinen
      },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,  //Blogit tallennetaan mongo-id:llä notes taulukkoon
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User