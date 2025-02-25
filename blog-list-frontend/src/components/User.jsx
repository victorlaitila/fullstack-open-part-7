import { useQueryClient } from "@tanstack/react-query"

const User = ({user}) => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  const blogsByUser = blogs.filter(blog => blog.user.id === user.id)
  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        {user.numberOfBlogs > 0 ?
          <div>
            <h3>Added blogs</h3>
            <ul>
              {blogsByUser.map(blog => (
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