import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import UserContext from './UserContext'

const App = () => {
  const { user, userDispatch } = useContext(UserContext)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false
  })

  result.data ? result.data.sort((a, b) => b.likes - a.likes) : result.data

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification />
      {user ? (<BlogList />) : (<LoginForm />)}
    </div>
  )
}

export default App
