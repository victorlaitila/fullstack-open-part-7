import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import NewBlogForm from '../src/components/NewBlogForm'

describe('NewBlogForm', () => {
  test('creating new blog calls createNewBlog function with the correct parameters', async () => {
    const createNewBlog = vi.fn()
    render(<NewBlogForm createNewBlog={createNewBlog} />)
    const user = userEvent.setup()
    const newBlogButton = screen.getByText('New blog')
    await user.click(newBlogButton)
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'Title')
    await user.type(inputs[1], 'Author')
    await user.type(inputs[2], 'Url')
    const submitButton = screen.getByText('Create')
    await user.click(submitButton)
    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0]).toBe('Title')
    expect(createNewBlog.mock.calls[0][1]).toBe('Author')
    expect(createNewBlog.mock.calls[0][2]).toBe('Url')
  })
})