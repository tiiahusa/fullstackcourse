import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useNotificationDispatch } from './NotificationContext'
import BlogList from './components/BlogList'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const notificationDispach = useNotificationDispatch()

  const blogFormRef = useRef()


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

  return (
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
          <BlogForm />
        </Toggable>
      )}
      <Notification />
      {user && <BlogList user={user}></BlogList>}
    </div>
  )
}

export default App
