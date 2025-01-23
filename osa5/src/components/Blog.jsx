import { useEffect, useState } from 'react'
import Togglable from './Toggable'

const Blog = ({ blog, update, remove, user }) => {
  const [likes, setLikes] = useState(blog.likes)

  useEffect(() => {
    setLikes(blog.likes)
  }, [blog.likes])

  const updateBlog = (event) => {
    event.preventDefault()
    setLikes(blog.likes+1)
    update(blog)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    remove(blog)
  }

  const userAdd = blog.user.username === user.username

  return (
    <div className="blog">
      <p>{blog.title}</p>
      <Togglable buttonLabelOn="view" buttonLabelOff="hide">
        <div>
          <p>{blog.url}</p>
          <p>
            Likes {blog.likes}
            <button onClick={updateBlog}>like</button>
          </p>
          <p>{blog.author}</p>
          {userAdd && (
            <button onClick={removeBlog} className="remove">
              remove
            </button>
          )}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
