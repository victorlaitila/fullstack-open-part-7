import { useContext } from "react"
import UserContext from "../UserContext"

const LoggedInUserInfo = () => {
  const { user, logoutUser } = useContext(UserContext)
  if (user) {
    return (
      <div className='display-flex-gap'>
        <p>{`${user.name} logged in`}</p>
        <button onClick={logoutUser}>Logout</button>
      </div>
    )
  }
}

export default LoggedInUserInfo