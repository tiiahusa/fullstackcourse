import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong credentials')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  }
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }
  /*
  const createPost = async (event) => {  
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title: title,
        author: author,
        url: url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification(`a new blog ${blog.title} added`)
      setNotificationType('info')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    } catch (exception) {
      setNotification('blog creating failed')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    
  }

  const loginForm2 = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to the application</h1>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }*/

  const loggedIn = () => (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={() => {
        window.localStorage.clear()
        setUser(null)}}>Logout</button>
    </div>
  )

  const blogList = () => (
    <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )} 
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      {!user && <Toggable buttonLabelOn='login' buttonLabelOff="cancel">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Toggable>}
      {user && <div>
        {loggedIn()} </div>}
      {user &&<Toggable buttonLabelOn="new blog" buttonLabelOf="cancel" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Toggable>}
      <Notification message={notification} type={notificationType} />
      {user && <div>
         {blogList()}
      </div>}
      


    </div>
  )
}

export default App