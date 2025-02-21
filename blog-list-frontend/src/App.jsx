import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificaton, setNotification] = useContext(NotificationContext)

  const initializeBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }

  useEffect(() => {
    initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      console.error(error)
      setNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createNewBlog = async (title, author, url) => {
    try {
      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url,
        user: user.id,
      })
      setBlogs(blogs.concat(newBlog).sort((a, b) => b.likes - a.likes))
      setNotification(`A new blog '${newBlog.title}' by '${newBlog.author}' added`, 'success')
    } catch (error) {
      console.error(error)
      setNotification('Failed to create blog', 'error')
    }
  }

  const deleteBlog = async (blog) => {
    const confirmationMsg = `Are you sure you want to delete blog '${blog.title}' by '${blog.author}'?`
    if (window.confirm(confirmationMsg)) {
      try {
        await blogService.deleteById(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        setNotification(`Blog '${blog.title}' by '${blog.author}' successfully deleted`, 'success')
      } catch {
        setNotification('Blog has already been deleted, refreshing list', 'error')
        initializeBlogs()
      }
    }
  }

  const likeBlog = async (id) => {
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === id)
      const newBlogObject = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      const updatedBlog = await blogService.updateById(id, newBlogObject)
      setBlogs(
        blogs
          .map((blog) => (blog.id === id ? updatedBlog : blog))
          .sort((a, b) => b.likes - a.likes),
      )
    } catch (error) {
      setNotification(error.message, 'error')
    }
  }

  return (
    <div>
      <Notification />
      {user ? (
        <BlogList
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          createNewBlog={createNewBlog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
        />
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
