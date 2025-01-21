const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username }) //Tarkistetaan onko käyttäjänimi kannassa
  const passwordCorrect =
    user === null //Jos löytyy, tarkistetaan salasanan oikeellisuus
      ? false
      : await bcrypt.compare(password, user.passwordHash)
  //Koska tietokantaan ei ole talletettu salasanaa, vaan salasanasta laskettu hash, tehdään vertailu metodilla bcrypt.compare

  if (!(user && passwordCorrect)) {
    //Jos käyttäjää ei ole olemassa tai salasana on väärä, vastataan statuskoodilla 401
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  }) //Jos kaikki ok, luodaan jwt.sign metodilla token joka salataan .env tiedostoon lisätyllä salaisella avaimella ja asetetaan sille 60*60 sekuntia voimassaoloaika, eli tunti

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
