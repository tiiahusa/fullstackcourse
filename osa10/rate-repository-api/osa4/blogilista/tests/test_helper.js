const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Testi1',
    author: 'tiia',
    url: 'http://www.testi.com',
    likes: 100,
  },
  {
    title: 'Testi2',
    author: 'maija',
    url: 'http://www.testi2.com',
    likes: 10,
  },
  {
    title: 'Testi3',
    author: 'maija',
    url: 'http://www.maikinblogi.com',
    likes: 600,
  },
  {
    title: 'Testi4',
    author: 'petteri',
    url: 'http://www.pekunblogi.com',
    likes: 6,
  },
]

const initialUsers = [
  {
    username: 'tiiaTestaa',
    name: 'Tiia',
    password: 'salasana',
  },
  {
    username: 'tiiaTestaa1',
    name: 'Maija',
    password: 'salasana',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
