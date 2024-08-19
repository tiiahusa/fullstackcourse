const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


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


  blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
  })

  blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (user.id.toString() === blog.user._id.toString()) {//blog.user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    }
    return response.status(401).json({ error: 'user cannot delete blog'})
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
      .catch(error => next(error))
  })

  module.exports = blogsRouter