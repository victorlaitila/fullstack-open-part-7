import { useContext, useState } from "react"
import useBlogMutations from "../hooks/useBlogMutations"
import UserContext from "../UserContext"

const BlogPage = ({blog}) => {
  const { updateBlogMutation, newCommentMutation, deleteBlog } = useBlogMutations()
  const { user } = useContext(UserContext)
  const [comment, setComment] = useState('')

  const likeBlog = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleBlogDelete = (blog) => {
    const confirmationMsg = `Are you sure you want to delete blog '${blog.title}' by '${blog.author}'?`
    if (window.confirm(confirmationMsg)) {
      deleteBlog(blog)
    }
  }

  const addComment = () => {
    newCommentMutation.mutate({ id: blog.id, content: comment })
    setComment('')
  }

  if (blog) {
    return (
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div className='display-flex-gap'>
          <div>{blog.likes} likes</div><button onClick={() => likeBlog(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {
          user.username === blog.user.username &&
          <div>
            <button className='delete-button' onClick={() => handleBlogDelete(blog)}>delete</button>
          </div>
        }
        <div>
          <br />
          <h4>Comments</h4>
          <div>
            <input
              type='text'
              value={comment}
              name='Comment'
              onChange={({target}) => setComment(target.value)}
            />
          </div>
          <button className='margin-bottom-30' onClick={addComment}>add comment</button>
          <br />
          {blog.comments && blog.comments.length > 0 ?
            <ul>
              {blog.comments.map(comment => (
                <li key={comment.id}>
                  {comment.content}
                </li>
              ))}
            </ul> :
            <div>Blog has no comments</div>
          }
        </div>
      </div>
    )
  }
}

export default BlogPage