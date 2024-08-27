import { describe, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


// Mock Togglable component
vi.mock('./Toggable', () => {
  return {
    __esModule: true,
    default: ({ buttonLabelOn, buttonLabelOff, children }) => (
      <div>
        <button>{buttonLabelOn}</button>
        <div className="togglableContent" style={{ display: 'none' }}>
          <button>{buttonLabelOff}</button>
          {children}
        </div>
      </div>
    )
  }
})

describe('Blog component', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser'
    }
  }

  const user = {
    username: 'testuser'
  }

  const update = vi.fn()
  const remove = vi.fn()
screen.debug()
  test('renders title and author, but not url or likes by default', () => {
    render(<Blog blog={blog} update={update} remove={remove} user={user} />)
    expect(screen.getByText('Test Blog Title')).toBeDefined()

  })

  test('renders url, likes, and user when the view button is clicked', async () => {
    render(<Blog blog={blog} update={update} remove={remove} user={user} />)

    const button = screen.getByText('view')
    await userEvent.click(button)

    expect(screen.getByText('http://testurl.com')).toBeDefined()
    expect(screen.getByText('Likes 5')).toBeDefined()
    expect(screen.getByText('Test Author')).toBeDefined()
  })

  test('calls the update handler twice when the like button is clicked twice', async () => {
    render(<Blog blog={blog} update={update} remove={remove} user={user} />)

    const button = screen.getByText('view')
    await userEvent.click(button)

    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(update).toHaveBeenCalledTimes(2)
  })
})
