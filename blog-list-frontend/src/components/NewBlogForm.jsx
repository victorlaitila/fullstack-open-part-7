import { useState } from 'react'
import useBlogMutations from '../hooks/useBlogMutations'
import '../styles/blogForm.css'

const NewBlogForm = () => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [formVisible, setFormVisible] = useState(false)
  const { newBlogMutation } = useBlogMutations()

  const addBlog = async (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title: blogTitle, author: blogAuthor, url: blogUrl })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    setFormVisible(false)
  }

  const showForm = { display: formVisible ? '' : 'none', marginTop: '20px', marginBottom: '10px' }
  const hideForm = { display: formVisible ? 'none' : '', marginTop: '14px' }

  return (
    <div>
      <div className='form-container' style={showForm}>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div className='display-block'>
            <div className='display-block'>
              <div>Title:</div>
              <input
                data-testid='blog-title-input'
                type='text'
                value={blogTitle}
                name='BlogTitle'
                onChange={({target}) => setBlogTitle(target.value)}
              />
            </div>
            <div className='display-block'>
              <div>Author:</div>
              <input
                data-testid='blog-author-input'
                type='text'
                value={blogAuthor}
                name='BlogAuthor'
                onChange={({target}) => setBlogAuthor(target.value)}
              />
            </div>
            <div className='display-block'>
              <div>Url:</div>
              <input
                data-testid='blog-url-input'
                type='text'
                value={blogUrl}
                name='BlogUrl'
                onChange={({target}) => setBlogUrl(target.value)}
              />
            </div>
          </div>
          <br />
          <div className='display-flex-gap'>
            <button className='create-button' type='submit'>Create</button>
            <button className='cancel-button' type='button' onClick={() => setFormVisible(false)}>Cancel</button>
          </div>
        </form>
      </div>
      <div style={hideForm}>
        <button onClick={() => setFormVisible(true)}>New blog</button>
      </div>
    </div>
  )
}

export default NewBlogForm