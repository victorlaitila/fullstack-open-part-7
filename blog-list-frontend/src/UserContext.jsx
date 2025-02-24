import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import loginService from './services/login'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'
import blogService from './services/blogs'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'RESET':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [notificaton, setNotification] = useContext(NotificationContext)
  const [user, userDispatch] = useReducer(userReducer, null)

  const loginUser = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET', payload: user })
    } catch (error) {
      console.error(error)
      setNotification('Wrong username or password', 'error')
    }
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'RESET' })
  }

  return (
    <UserContext.Provider value={{user, userDispatch, loginUser, logoutUser}}>
      {props.children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContext
