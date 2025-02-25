import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useBlogMutations = () => {
  const [notificaton, setNotification] = useContext(NotificationContext)
  const [blogToDelete, setBlogToDelete] = useState(null)
  const queryClient = useQueryClient()
  //const { allUsersDispatch } = useContext(UserContext)
  const navigate = useNavigate()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'], 
        blogs.concat(newBlog).sort((a, b) => b.likes - a.likes)
      )
      setNotification(`A new blog '${newBlog.title}' by '${newBlog.author}' added`, 'success')
    },
    onError: () => {
      setNotification('Failed to create blog', 'error')
    }
  })

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

  const newCommentMutation = useMutation({
    mutationFn: blogService.addComment,
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

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      setNotification(`Blog '${blogToDelete.title}' by '${blogToDelete.author}' successfully deleted`, 'success')
      setBlogToDelete(null)
      navigate('/')
    },
    onError: (error) => {
      setNotification(`Error deleting blog: '${error.message}'`, 'error')
      setBlogToDelete(null)
    }
  })

  const deleteBlog = (blog) => {
    setBlogToDelete(blog)
    deleteBlogMutation.mutate(blog.id)
  }

  return { newBlogMutation, updateBlogMutation, newCommentMutation, deleteBlog }
}

export default useBlogMutations
