import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { useState } from 'react'

const useBlogMutations = () => {
  const [notificaton, setNotification] = useContext(NotificationContext)
  const [blogToDelete, setBlogToDelete] = useState(null)
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'], 
        blogs
          .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
          .sort((a, b) => b.likes - a.likes)
      )
    },
    onError: (error) => {
      setNotification(error.message, 'error')
    }
  })

  const likeBlog = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      setNotification(`Blog '${blogToDelete.title}' by '${blogToDelete.author}' successfully deleted`, 'success')
      setBlogToDelete(null)
    },
    onError: (error) => {
      setNotification(`Error deleting blog: '${error.message}'`, 'error')
      setBlogToDelete(null)
    }
  })

  const deleteBlog = (blog) => {
    const confirmationMsg = `Are you sure you want to delete blog '${blog.title}' by '${blog.author}'?`
    if (window.confirm(confirmationMsg)) {
      setBlogToDelete(blog)
      deleteBlogMutation.mutate(blog.id)
    }
  }

  return { likeBlog, deleteBlog }
}

export default useBlogMutations
