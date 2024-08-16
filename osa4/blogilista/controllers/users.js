const bcrypt = require('bcrypt') //Salasanojen hashaaminen
const usersRouter = require('express').Router()  //Express reititys
const User = require('../models/user')  //Haetaan skeeman malli 

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(!password  || password.length < 3) {
    return response.status(400).json({ error: 'password missing or it is too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    //.populate('notes', { content: 1, important: 1 }) // Populate hakee notejen kaikki tiedot ID:n perusteella vastaukseen ja voidana myös määrätä mitä kenttiä otetaan mukaan

  response.json(users)
})

module.exports = usersRouter