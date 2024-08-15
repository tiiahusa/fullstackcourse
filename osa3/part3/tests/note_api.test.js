const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const api = supertest(app)
const Note = require('../models/note')
const helper = require('./test_helper')

//Jaetaan testit omiin describe-lohkoihin selvyyden vuoksi
describe('when there is initially some notes saved', () => {
//Testikannan alustus, poistetaan kaiki muistiinpanot ja lisätään uudet testejä varten
/*beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes //Luodaan noteista Note-objectit
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save()) //Luodaan promiseArray notejen tallettamisesta tietokantaan
  await Promise.all(promiseArray) //Tämä on fullfilled, eli tehty, vasta kun kaikki edellisen rivin promiset on fulfilled tilassa, eli valmis vasta kun kaikki oliot tallennettu kantaan
})*/
//Helpoimmalla päästään käyttämällä mongoosen valmista insertAll metodia:
beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
})

//Testaa, että HTTP GET pyyntöön vastataan 200 statuskoodilla ja että data on JSON-muodossa
test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200) //Status
    .expect('Content-Type', /application\/json/) //Data on jsonia, SISÄLTÄÄ application ja json sanat, tämä parmepi tapa kuin 'application/json', jossa pitäisi content typen olla täsmälleen tuo. Kutsutaan regrexiksi
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'))
})
})

describe('viewing a specific note', () => {

  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})
describe('addition of a new note', () => {

//Ei tallenneta virheellistä muistiinpanoa
test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

//Muistiinpanon tallennus onnistuu
test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  assert.strictEqual(response.body.length, helper.initialNotes.length + 1)

  assert(contents.includes('async/await simplifies making async calls'))
})



})

describe('deletion of a note', () => {
//Voidaan poistaa yksittäinen muistiinpano
test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  const contents = notesAtEnd.map(r => r.content)
  assert(!contents.includes(noteToDelete.content))

  assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1)
})

})
after(async () => {
  await mongoose.connection.close()
})