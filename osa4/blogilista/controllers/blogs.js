const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 }) //Yhdistetään käyttäjätietojen kanssa

  response.json(blogs)
})
  

  // Mongo-db tietokannasta yksittäisen idn haku:
  blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const users = await User.find({})
    const user = await User.findById(users[0]._id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
  })

  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const { likes } = request.body
    Blog.findByIdAndUpdate(
      request.params.id,
      {likes},
      { new: true, runValidators: true, context: 'query' })

      .then(updatedBlog => {
        response.status(202).json(updatedBlog)
      })
      .catch(error => next(error))
  })

  module.exports = blogsRouter