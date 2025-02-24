import { useContext } from "react"
import UserContext from "../UserContext"

const LoggedInUserInfo = () => {
  const { user, logoutUser } = useContext(UserContext)
  if (user) {
    return (
      <div className='display-flex-gap margin-bottom-20'>
        <p>{`${user.name} logged in`}</p>
        <button onClick={logoutUser}>Logout</button>
      </div>
    )
  }
}

export default LoggedInUserInfo