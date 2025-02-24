import LoggedInUserInfo from "./LoggedInUserInfo"

const User = ({user}) => {
  if (user) {
    return (
      <div>
        <LoggedInUserInfo />
        <h2>{user.name}</h2>
        {user.blogs.length > 0 ?
          <div>
            <h3>Added blogs</h3>
            <ul>
              {user.blogs.map(blog => (
                <li key={blog.id}>
                  {blog.title}
                </li>
              ))}
            </ul>
          </div> :
          <p>User has no blogs</p>
        }
      </div>
    )
  }
}

export default User