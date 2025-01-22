import { useState, useEffect, useRef, useReducer, useContext } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'

import blogService from './services/blogs'
import loginService from './services/login'

import NotificationContext from './NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, notificationDispach] = useContext(NotificationContext)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispach({ type: 'error' })
      setTimeout(() => {
        notificationDispach({ type: null })
      }, 5000)
    }
  }
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog).sort((a, b) => b.likes - a.likes))
  }

  const updateBlog = async (blogObject) => {
    const returnedBlog = await blogService.update(blogObject)
    setBlogs(returnedBlog.sort((a, b) => b.likes - a.likes))
  }

  const removeBlog = async (blogObject) => {
    const result = confirm(
      `Remove blog ${blogObject.name} by ${blogObject.author}?`,
    )
    if (result) {
      const status = await blogService.remove(blogObject)
      if (status === 204) {
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
      }
    }
  }

  const loggedIn = () => (
    <div>
      <p>{user.name} logged in</p>
      <button
        onClick={() => {
          window.localStorage.clear()
          setUser(null)
        }}
      >
        Logout
      </button>
    </div>
  )

  const blogList = () => (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          update={updateBlog}
          remove={removeBlog}
          user={user}
        />
      ))}
    </div>
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispach]}>
      <div>
        <h1>Blogs</h1>
        {!user && (
          <Toggable buttonLabelOn="login" buttonLabelOff="cancel">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Toggable>
        )}
        {user && <div>{loggedIn()} </div>}
        {user && (
          <Toggable
            buttonLabelOn="new blog"
            buttonLabelOff="cancel"
            ref={blogFormRef}
          >
            <BlogForm createBlog={addBlog} />
          </Toggable>
        )}
        <Notification message={notification} />
        {user && <div>{blogList()}</div>}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
