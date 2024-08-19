const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

//Testikannan alustus, poistetaan kaiki blogit ja lisätään uudet testejä varten
beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  
  await User.insertMany(helper.initialUsers)
  await Blog.insertMany(helper.initialBlogs)
  
})

describe('Open connect ', () => {
  //Testaa, että HTTP GET pyyntöön vastataan 200 statuskoodilla ja että data on JSON-muodossa
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200) //Status
      .expect('Content-Type', /application\/json/) //Data on jsonia, SISÄLTÄÄ application ja json sanat, tämä parmepi tapa kuin 'application/json', jossa pitäisi content typen olla täsmälleen tuo. Kutsutaan regrexiksi
  })

  test('there are four blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
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
})

describe('User tests', () => {
  test('a valid user can added', async () => {
    const usersBefore = await api.get('/api/users')

    const newUser = {
      username:"pekkis",
      name:"Pekka",
      password:"salis"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const usersAfter = await api.get('/api/users')

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length+1)
  })

  test('a user with unvalid username cannot added', async () => {
    const usersBefore = await api.get('/api/users')

    const newUser = {
      username:"ps",
      name:"Pekka",
      password:"salis"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAfter = await api.get('/api/users')

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length)
  })

  test('a user with unvalid password cannot added', async () => {
    const usersBefore = await api.get('/api/users')

    const newUser = {
      username:"pekka",
      name:"Pekka",
      password:"s"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAfter = await api.get('/api/users')

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length)
  })

  test('a user without username cannot added', async () => {
    const usersBefore = await api.get('/api/users')

    const newUser = {
      name:"Pekka",
      password:"salis"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAfter = await api.get('/api/users')

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length)
  })

  test('a user without password cannot added', async () => {
    const usersBefore = await api.get('/api/users')

    const newUser = {
      username:"peksu",
      name:"Pekka"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAfter = await api.get('/api/users')

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length)
    assert.strictEqual(true, response.body.error.includes('password missing or it is too short'))
  })

  
  test('a user with too short password cannot added', async () => {
    const usersBefore = await api.get('/api/users')

    const newUser = {
      username:"pekki",
      name:"Pekka",
      password:"ka"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAfter = await api.get('/api/users')

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length)
    assert.strictEqual(true, response.body.error.includes('password missing or it is too short'))
  })

  test('a user with too short username cannot added', async () => {
    const usersBefore = await api.get('/api/users')

    const newUser = {
      username:"ps",
      name:"Pekka",
      password:"passu"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAfter = await api.get('/api/users')

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length)
    assert.strictEqual(true, response.body.error.includes('User validation failed: username: Path `username` (`ps`) is shorter than the minimum allowed length (3).'))
  })
  
  test('a user without password cannot added', async () => {
    const usersBefore = await api.get('/api/users')

    const newUser = {
      name:"Pekka",
      password:"passu"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAfter = await api.get('/api/users')

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length)
    assert.strictEqual(true, response.body.error.includes('User validation failed: username: Path `username` is required.'))
  })

  test('same username cannot added', async () => {
    const usersBefore = await api.get('/api/users')

    const newUser = {
      username:"tiiaTestaa",
      name:"Pekka",
      password:"passu"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAfter = await api.get('/api/users')

    assert.strictEqual(usersAfter.body.length, usersBefore.body.length)
    assert.strictEqual(true, response.body.error.includes('expected `username` to be unique'))
  })

})

describe('User login', () => {
  test('user can login', async () => {
    const newUser = {
      username:"userLoginTest",
      name:"User",
      password:"userPassword"
    }

    const userReg = {
      username:"userLoginTest",
      password:"userPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = await api
      .post('/api/login')
      .send(userReg)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(true, user.body.token.length > 0)
    assert.strictEqual("userLoginTest", user.body.username)
    assert.strictEqual("User", user.body.name)
  })

  test('user cannot login with wrong password', async () => {
    const newUser = {
      username:"userLoginTest2",
      name:"User2",
      password:"userPassword"
    }

    const userReg = {
      username:"userLoginTest2",
      password:"userPas"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = await api
      .post('/api/login')
      .send(userReg)
      .expect(401)

    assert.strictEqual('invalid username or password', user.body.error)
  })
  test('user cannot login with wrong username', async () => {
    const newUser = {
      username:"userLoginTest3",
      name:"User3",
      password:"userPassword"
    }

    const userReg = {
      username:"userLoginTe",
      password:"userPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = await api
      .post('/api/login')
      .send(userReg)
      .expect(401)

    assert.strictEqual('invalid username or password', user.body.error)
  })

  test('user cannot login without username', async () => {
    const newUser = {
      username:"userLoginTest4",
      name:"User4",
      password:"userPassword"
    }

    const userReg = {
      password:"userPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = await api
      .post('/api/login')
      .send(userReg)
      .expect(401)

    assert.strictEqual('invalid username or password', user.body.error)
  })

  test('user cannot login without password', async () => {
    const newUser = {
      username:"userLoginTest5",
      name:"User5"
    }
    const user = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual('password missing or it is too short', user.body.error)
  })
}) 

describe('Blog adding', () => {
  //Blogin tallennus onnistuu
  test('a valid blog can be added ', async () => {
    //Luodaan testikäyttäjä ja kirjaudutaan sisälle
    const newUser = {
      username:"postingTest",
      name:"Poster",
      password:"userPassword"
    }

    const userReg = {
      username:"postingTest",
      password:"userPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = await api
      .post('/api/login')
      .send(userReg)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = `Bearer ${user.body.token}`

    const newBlog = {
        title: "Testi32",
        author: "tiia",
        url: "http://www.tiablogi.com",
        likes: 600
    };
    
    await api
      .post('/api/blogs')
      .set('Authorization', token)  // Lisää Authorization-otsikko
      .send(newBlog)  // Lähetä blogin tiedot
      .expect(201)  // Odota, että vastaus on 201 Created
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const title = response.body.map(r => r.title)
    const url = response.body.map(r => r.url)
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(url.includes('http://www.tiablogi.com'))
    assert(title.includes('Testi32'))
  })

  //Blogin tallennus onnistuu ilman likeä
  test('a valid blog can be added ', async () => {
    //Luodaan testikäyttäjä ja kirjaudutaan sisälle
    const newUser = {
      username:"postingTest2",
      name:"Poster2",
      password:"userPassword"
    }

    const userReg = {
      username:"postingTest2",
      password:"userPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = await api
      .post('/api/login')
      .send(userReg)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = `Bearer ${user.body.token}`

    const newBlog = {
      title:"Testi6",
      author:"tiia",
      url:"http://www.tiiantestia.com"
    }

    const addedBlog = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const title = response.body.map(r => r.title)
    const url = response.body.map(r => r.url)
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(url.includes('http://www.tiiantestia.com'))
    assert(title.includes('Testi6'))
    assert.strictEqual(addedBlog.body.likes, 0)
  }) 

  //Ei tallenneta ilman autentikointia
  test('blog without authorization failed', async () => {
    const newBlog = {
      title:"Testi7",
      url:"http://www.tiiantest.com",
      likes:0
  }

    const message = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
    assert.strictEqual(message.body.error, 'token missing')
  })

  test('unvalid blog cannot added', async () => {
    //Luodaan testikäyttäjä ja kirjaudutaan sisälle
    const newUser = {
      username:"postingTest3",
      name:"Poster3",
      password:"userPassword"
    }

    const userReg = {
      username:"postingTest3",
      password:"userPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = await api
      .post('/api/login')
      .send(userReg)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = `Bearer ${user.body.token}`
    const newBlog = {
      author:"tiia",
      url:"http://www.tiiantestia.com"
    }

    const message = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    const title = response.body.map(r => r.title)
    const url = response.body.map(r => r.url)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
    assert.strictEqual(message.body.error, 'Blog validation failed: title: Path `title` is required.')
  }) 

  //Ei tallenneta virheellistä blogia osa 2
  test('blog without url not added', async () => {
    const newUser = {
      username:"postingTest3",
      name:"Poster3",
      password:"userPassword"
    }

    const userReg = {
      username:"postingTest3",
      password:"userPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = await api
      .post('/api/login')
      .send(userReg)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = `Bearer ${user.body.token}`
    const newBlog = {
      title:"ilman url testausta",
      author:"tiia"
    }

    const message = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    const title = response.body.map(r => r.title)
    const url = response.body.map(r => r.url)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
    assert.strictEqual(message.body.error, 'Blog validation failed: url: Path `url` is required.')
  }) 


describe('Edit or delete specific blog', () => {
  //Voidaan poistaa yksittäinen blogi
  test('a blog can be deleted', async () => {
    
    const newUser = {
      username:"postingTest3",
      name:"Poster3",
      password:"userPassword"
    }

    const userReg = {
      username:"postingTest3",
      password:"userPassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = await api
      .post('/api/login')
      .send(userReg)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = `Bearer ${user.body.token}`
    const newBlog = {
      author:"tiia",
      url:"http://www.tiiantestia.com"
    }

    const message = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    const title = response.body.map(r => r.title)
    const url = response.body.map(r => r.url)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
    assert.strictEqual(message.body.error, 'Blog validation failed: title: Path `title` is required.')
  }) 


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.map(r => r.title)
    assert(!contents.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })

  test('a specific blog can updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const updatedBlog = await api
      .put(`/api/blogs/${blogToView.id}`)
      .send({likes: 999})
      .expect(202)
      .expect('Content-Type', /application\/json/)
  
  
    assert.notStrictEqual(resultBlog.body.likes, updatedBlog.body.likes)
    assert.strictEqual(999, updatedBlog.body.likes)
  })

  test('try update, but blog not found, return 400 bad request', async () => {
    const updatedBlog = await api
      .put(`/api/blogs/111`)
      .send({likes: 999})
  
    assert.strictEqual(400, updatedBlog.statusCode)
  })

})



after(async () => {
  await mongoose.connection.close()
})