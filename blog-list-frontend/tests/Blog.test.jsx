import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import { expect } from 'vitest'

describe('Blog', () => {
  const testBlog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'blog.com',
    likes: 150,
    user: {
      id: 'userId',
      name: 'name',
      username: 'username'
    }
  }

  const likeBlog = vi.fn()
  const deleteBlog = vi.fn()
  
  let container

  beforeEach(() => {
    container = render(
      <Blog
        blog={testBlog}
        username='username'
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
      />
    ).container
  })

  test('only title and author shown for blog by default', () => {
    const titleText = screen.getByText(/Blog title/i)
    expect(titleText).toBeDefined()
    const authorText = screen.getByText(/Blog author/i)
    expect(authorText).toBeDefined()
    const urlText = screen.queryByText(/blog.com/i)
    expect(urlText).toBeNull()
    const likeText = screen.queryByText(/150/i)
    expect(likeText).toBeNull()
  })

  test('opening blog details shows url and number of likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const urlText = screen.getByText(/blog.com/i)
    expect(urlText).toBeDefined()
    const likeText = screen.getByText(/150/i)
    expect(likeText).toBeDefined()
  })

  test('clicking like button twice calls likeBlog twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})