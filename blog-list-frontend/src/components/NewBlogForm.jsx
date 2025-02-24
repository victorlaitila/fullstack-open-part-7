import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const NewBlogForm = () => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [formVisible, setFormVisible] = useState(false)
  const [notificaton, setNotification] = useContext(NotificationContext)
  const queryClient =  useQueryClient()

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

  const addBlog = async (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title: blogTitle, author: blogAuthor, url: blogUrl })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    setFormVisible(false)
  }

  const showForm = { display: formVisible ? '' : 'none', marginTop: '-10px', marginBottom: '10px' }
  const hideForm = { display: formVisible ? 'none' : '' }

  return (
    <div>
      <div style={showForm}>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div className='display-flex-gap'>
            Title:
            <input
              data-testid='blog-title-input'
              type='text'
              value={blogTitle}
              name='BlogTitle'
              onChange={({target}) => setBlogTitle(target.value)}
            />
          </div>
          <div className='display-flex-gap'>
            Author:
            <input
              data-testid='blog-author-input'
              type='text'
              value={blogAuthor}
              name='BlogAuthor'
              onChange={({target}) => setBlogAuthor(target.value)}
            />
          </div>
          <div className='display-flex-gap'>
            Url:
            <input
              data-testid='blog-url-input'
              type='text'
              value={blogUrl}
              name='BlogUrl'
              onChange={({target}) => setBlogUrl(target.value)}
            />
          </div>
          <br />
          <button type='submit'>Create</button>
        </form>
        <button onClick={() => setFormVisible(false)}>Cancel</button>
      </div>
      <div style={hideForm}>
        <button onClick={() => setFormVisible(true)}>New blog</button>
      </div>
    </div>
  )
}

export default NewBlogForm