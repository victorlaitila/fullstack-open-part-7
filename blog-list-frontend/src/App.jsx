import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import UserContext from './UserContext'
import {
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'
import axios from 'axios'
import BlogPage from './components/BlogPage'
import LoggedInUserInfo from './components/LoggedInUserInfo'


const App = () => {
  const { user, userDispatch, allUsersDispatch, allUsers } = useContext(UserContext)

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
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
    axios.get('/api/users')
      .then(response => {
        const usersAndNumberOfBlogs = response.data.map(user => ({
          id: user.id,
          name: user.name,
          username: user.username,
          numberOfBlogs: user.blogs.length
        }))
        allUsersDispatch({ type: 'SET', payload: usersAndNumberOfBlogs })
      })
      .catch(error => console.error(error))
  }, [])

  // For opening some other user's info
  const userMatch = useMatch('/users/:id')
  const selectedUser = userMatch ? allUsers.find(user => user.id === userMatch.params.id) : null

  // For opening a blog page
  const blogMatch = useMatch('/blogs/:id')
  const selectedBlog = blogMatch ? blogs?.find(blog => blog.id === blogMatch.params.id) : null

  return (
    <div>
      {user && 
        <div className='navigation-menu'>
          <Link className='padding' to='/'>blogs</Link>
          <Link className='padding' to='/users'>users</Link>
          <LoggedInUserInfo />
        </div>
      }
      <Notification />
      <Routes>
        <Route path='/' element={user ? <BlogList /> : <LoginForm />} />
        <Route path='/users' element={user ? <UserList /> : <LoginForm />} />
        <Route path='/users/:id' element={user && <User user={selectedUser} />} />
        <Route path='/blogs/:id' element={user && <BlogPage blog={selectedBlog} />} />
      </Routes>
    </div>
  )
}

export default App
