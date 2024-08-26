import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
/*
  render(<Note note={note} />)
//Oliolla screen päästään käsiksi testin näkymään
  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()*/

  const { container } = render(<Note note={note} />)

  //screen.debug() //Screenin debuggausta terminaaliin

  const element = screen.getByText('Component testing is done with react-testing-library')

  screen.debug(element) //Screenin osan debuggaus konsoliin

  const div = container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', async () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }
  
    const mockHandler = vi.fn()
  
    render(
      <Note note={note} toggleImportance={mockHandler} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })