import { useContext } from "react"
import UserContext from "../UserContext"

const LoggedInUserInfo = () => {
  const { user, logoutUser } = useContext(UserContext)
  if (user) {
    return (
      <div className='display-flex-gap'>
        <div>{`${user.name} logged in`}</div>
        <button onClick={logoutUser}>Logout</button>
      </div>
    )
  }
}

export default LoggedInUserInfo