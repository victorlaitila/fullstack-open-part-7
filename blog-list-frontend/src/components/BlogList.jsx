import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import UserContext from '../UserContext'

const BlogList = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  const { user, logoutUser } = useContext(UserContext)
  
  if (blogs) {
    return (
      <div>
        <h2>Blogs</h2>
        <div className='display-flex-gap'>
          <p>{`${user.name} logged in`}</p>
          <button onClick={logoutUser}>Logout</button>
        </div>
        <NewBlogForm />
        <br />
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
        <br />
      </div>
    )
  }
}

export default BlogList