const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

//Testikannan alustus, poistetaan kaiki blogit ja lisätään uudet testejä varten
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

//Testaa, että HTTP GET pyyntöön vastataan 200 statuskoodilla ja että data on JSON-muodossa
test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200) //Status
    .expect('Content-Type', /application\/json/) //Data on jsonia, SISÄLTÄÄ application ja json sanat, tämä parmepi tapa kuin 'application/json', jossa pitäisi content typen olla täsmälleen tuo. Kutsutaan regrexiksi
})

test('there are four notes', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 4)
})

test('id includes in blogs', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const idInclude = true
  blogsAtStart.forEach(blog => {
    if(!blog.hasOwnProperty('id')){
        idInclude = false
    }
  })

  assert.strictEqual(true, idInclude)
})

//Blogin tallennus onnistuu
test('a valid blog can be added ', async () => {
  const newBlog = {
    title:"Testi5",
    author:"tiia",
    url:"http://www.tiiantest.com",
    likes:0
}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(contents.includes('Testi5'))
})

//Blogin tallennus onnistuu
test('a blog without likes can added and likes is 0 ', async () => {
    const newBlog = {
      title:"Testi6",
      author:"tarmo",
      url:"http://www.tiiantest4444.com"
  }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const blog = response.body[response.body.length-1]

    assert.strictEqual(blog.title, newBlog.title)
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert.strictEqual(blog.likes, 0)
  })

//Ei tallenneta virheellistä blogia
test('blog without title not added', async () => {
  const newBlog = {
    url:"http://www.tiiantest.com",
    likes:0
}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

//Ei tallenneta virheellistä blogia osa 2
test('blog without url not added', async () => {
    const newBlog = {
      title:"Testi7",
      likes:500
  }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
/*
//Voidaan katsella yksittäistä muistiinpanoa
test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = notesAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)
})

//Voidaan poistaa yksittäinen muistiinpano
test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const contents = blogsAtEnd.map(r => r.content)
  assert(!contents.includes(blogToDelete.content))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})
*/

after(async () => {
  await mongoose.connection.close()
})