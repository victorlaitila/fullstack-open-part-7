import { useContext } from "react"
import useBlogMutations from "../hooks/useBlogMutations"
import UserContext from "../UserContext"

const BlogPage = ({blog}) => {
  const { likeBlog } = useBlogMutations()
  const { user } = useContext(UserContext)
  if (blog) {
    return (
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div className='display-flex-gap'>
          <p>{blog.likes} likes</p><button onClick={() => likeBlog(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        <br />
        {
          user.username === blog.user.username &&
          <div>
            <button className='delete-button' onClick={() => deleteBlog(blog)}>delete</button>
          </div>
        }
        <div>
          comments
        </div>
      </div>
    )
  }
}

export default BlogPage