const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => { 
  const notes = await Note.find({})
  response.json(notes)
})
  
  // Mongo-db tietokannasta yksittäisen idn haku:
  notesRouter.get('/:id', async (request, response, next) => {
    try {
      const note = await Note.findById(request.params.id)
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    } catch(exception) {
      next(exception)
    }
  })

  // Resurssin poisto Mongo-DB tietokannasta:
  notesRouter.delete('/:id', async (request, response, next) => {
    try {
      await Note.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  })
  
  
  //Post pyyntö MongoDB-tietokantaan
  notesRouter.post('/', async (request, response, next) => {
    const body = request.body
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
    })
  
    try {
      const savedNote = await note.save()
      response.status(201).json(savedNote)
    } catch(exception) {
      next(exception)
    }
  
    note.save().then(savedNote => { //Tallennetaan note ja sitten vastataan se pyyntöön takaisin
      response.status(201).json(savedNote)  // Koska käytetään .then:iä siinä, saadaan vastaus vain silloin kun muistiinpano oikeasti tallentuntu
    })
      .catch(error => next(error))
  })
  
  //Muistiinpanon päivitys
  notesRouter.put('/:id', (request, response, next) => {
    const { content, important } = request.body
  
    Note.findByIdAndUpdate(
      request.params.id,
      { content, important }, //Validoidaan annettu arvo, että on skeeman mukainen
      { new: true, runValidators: true, context: 'query' })
  
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })


module.exports = notesRouter