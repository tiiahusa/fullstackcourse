const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id:"66aa520caf61d8026c19ab44",
        title:"Testi1",
        author:"tiia",
        url:"http://www.testi.com",
        likes:100,
        __v:0
    },
    {
        _id:"66aa521eaf61d8026c19ab46",
        title:"Testi2",
        author:"maija",
        url:"http://www.testi2.com",
        likes:10,
        __v:0
    },
    {
        _id:"66aa57f237c6919965afe857",
        title:"Testi3",
        author:"maija",
        url:"http://www.maikinblogi.com",
        likes:600,
        __v:0
    },
    {
        _id:"66aa59bac34579e66385b069",
        title:"Testi4",
        author:"petteri",
        url:"http://www.pekunblogi.com",
        likes:6,
        __v:0
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}