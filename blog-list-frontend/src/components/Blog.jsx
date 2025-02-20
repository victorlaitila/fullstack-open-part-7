import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({blog, likeBlog, username, deleteBlog}) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const BlogDetails = () => {
    return (
      <div className='blog-item'>
        <div className='display-flex-gap'>
          {blog.title} - {blog.author}
          <button onClick={() => setBlogDetailsVisible(false)}>hide</button>
        </div>
        <a href={blog.url}>{blog.url}</a>
        <div className='display-flex-gap'>
          {`Likes: ${blog.likes}`}
          <button onClick={() => likeBlog(blog.id)}>like</button>
        </div>
        {blog.user.name}
        {
          username === blog.user.username &&
          <div>
            <button className='delete-button' onClick={() => deleteBlog(blog)}>delete</button>
          </div>
        }
      </div>
    )
  }

  return (
    <div>
      {
        blogDetailsVisible ?
          BlogDetails() :
          <div className='display-flex-gap blog-item'>
            {blog.title} - {blog.author}
            <button onClick={() => setBlogDetailsVisible(true)}>view</button>
          </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog