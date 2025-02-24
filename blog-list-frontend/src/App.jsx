import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const [user, setUser] = useState(null)
  const [notificaton, setNotification] = useContext(NotificationContext)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false
  })

  const blogs = result.data ? result.data.sort((a, b) => b.likes - a.likes) : result.data

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
          user={user}
          handleLogout={handleLogout}
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
