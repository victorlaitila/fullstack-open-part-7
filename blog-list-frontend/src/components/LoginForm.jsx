import { useState } from 'react'
import { useContext } from 'react'
import UserContext from '../UserContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { loginUser } = useContext(UserContext)

  const login = async (event) => {
    event.preventDefault()
    loginUser(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div data-testid='login-form'>
      <h2>Log in to application</h2>
      <form onSubmit={login}>
        <div className='display-flex-gap'>
          Username
          <input
            data-testid='username-input'
            type='text'
            value={username}
            name='Username'
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div className='display-flex-gap'>
          Password
          <input
            data-testid='password-input'
            type='password'
            value={password}
            name='Password'
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm