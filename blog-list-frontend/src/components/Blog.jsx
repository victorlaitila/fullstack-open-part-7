import PropTypes from 'prop-types'
import { useState } from 'react'
import useBlogMutations from '../hooks/useBlogMutations'

const Blog = ({blog, username}) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)
  const { likeBlog, deleteBlog } = useBlogMutations()

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
          <button onClick={() => likeBlog(blog)}>like</button>
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
  username: PropTypes.string.isRequired,
}

export default Blog