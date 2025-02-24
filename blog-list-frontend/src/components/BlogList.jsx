import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import PropTypes from 'prop-types'
import { useQueryClient } from '@tanstack/react-query'

const BlogList = ({user, handleLogout}) => {
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
            username={user.username}
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
}

export default BlogList