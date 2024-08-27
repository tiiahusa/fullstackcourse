//import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  it('calls createBlog with correct details when a new blog is created', () => {
    const createBlog = vi.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const titleInput = component.container.querySelector('input[name="Title"]')
    const authorInput = component.container.querySelector('input[name="Author"]')
    const urlInput = component.container.querySelector('input[name="Url"]')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, { target: { value: 'Test Title' } })
    fireEvent.change(authorInput, { target: { value: 'Test Author' } })
    fireEvent.change(urlInput, { target: { value: 'http://testurl.com' } })
    fireEvent.submit(form)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://testurl.com'
    })
  })
})