import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'error':
    return { type: action.type, msg:'wrong credentials' }
  case null:
    return { type: null, msg:null }
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispach] = useReducer(
    notificationReducer,
    null,
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispach]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const not = useContext(NotificationContext)
  return not[0]
}

export const useNotificationDispatch = () => {
  const not = useContext(NotificationContext)
  return not[1]
}

export default NotificationContext
