import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createNote = vi.fn()

  render(<NoteForm createNote={createNote} />)
//Toimii jos o vaan yksi inputkenttä
  //const input = screen.getByRole('textbox')
  //Kannattaa määritellä placeholderit kentille jos useampi:
  const input = screen.getByPlaceholderText('write note content here')
  //Voidaan myös määritellä id komponentille ja hakea sen perusteella:
  //const input = container.querySelector('#note-input')
  
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  console.log(createNote.mock.calls)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})