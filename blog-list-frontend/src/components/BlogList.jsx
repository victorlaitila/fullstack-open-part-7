import NewBlogForm from './NewBlogForm'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  
  if (blogs) {
    return (
      <div>
        <h2>Blogs</h2>
        <NewBlogForm />
        <br />
        {blogs.map(blog =>
          <div key={blog.id} className='blog-item'>
            <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
          </div>
        )}
        <br />
      </div>
    )
  }
}

export default BlogList