import LoggedInUserInfo from "./LoggedInUserInfo"
import { Link } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../UserContext"

const UserList = () => {
  const { allUsers } = useContext(UserContext)

  if (allUsers) {
    return (
      <div>
        <h2>Users</h2>
        <LoggedInUserInfo />
        <br />
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(user => (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    )
  }
}

export default UserList