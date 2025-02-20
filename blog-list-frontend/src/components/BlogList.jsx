import { useState } from 'react'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import PropTypes from 'prop-types'

const BlogList = ({blogs, user, handleLogout, createNewBlog, likeBlog, deleteBlog}) => {
  return (
    <div>
      <h2>Blogs</h2>
      <div className='display-flex-gap'>
        <p>{`${user.name} logged in`}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <NewBlogForm
        createNewBlog={createNewBlog}
      />
      <br />
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          username={user.username}
          deleteBlog={deleteBlog}
        />
      )}
      <br />
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  createNewBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogList