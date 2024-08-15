const bcrypt = require('bcrypt') //Salasanojen hashaaminen
const usersRouter = require('express').Router()  //Express reititys
const User = require('../models/user')  //Haetaan skeeman malli 

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds) //Tietokantaan ei tallenneta salasanaa vaan funktion bcrypt avulla laskettu hash

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter