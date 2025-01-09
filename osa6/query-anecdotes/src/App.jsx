import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from './services/anecdoteService'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const showNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      showNotification(`Anecdote '${newAnecdote.content}' created`)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (err) => {
      showNotification('too short anecdote, must have length 5 or more')
    }
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (newAnecdote) => { 
      showNotification(`Anecdote '${newAnecdote.content}' voted`)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) // Invalidointi aiheuttaa sovelluksen datan päivityksen
    },
  })

  const handleVote = (anecdote) => {
    const changed = {
      ...anecdote,
      votes: anecdote.votes+1
    }
    voteAnecdoteMutation.mutate(changed)
  }

  const addAnecdote = (anecdote) => {
    const newAnecdote = {content:anecdote, votes:0}
    newAnecdoteMutation.mutate(newAnecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes, 
    retry: 1
  })
  //console.log(JSON.parse(JSON.stringify(result)))

  const anecdotes = result.data

  if(result.isError) {
    return (
      <div>anecdote service not available due to problems in server</div>
    )    
  } 

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }    

  return (
    <div>
      <h3>Anecdote app</h3>
      
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote}/>
      
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default App

