import { useState } from 'react'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import PropTypes from 'prop-types'
import { useQueryClient } from '@tanstack/react-query'

const BlogList = ({user, handleLogout, likeBlog, deleteBlog}) => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  if (blogs) {
    return (
      <div>
        <h2>Blogs</h2>
        <div className='display-flex-gap'>
          <p>{`${user.name} logged in`}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <NewBlogForm />
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
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogList