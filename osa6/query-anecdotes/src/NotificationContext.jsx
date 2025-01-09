import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type){
        case "SET":
            return action.payload
        case "CLEAR":
            return ''
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}


const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    const showNotification = (message, timeout = 5000) => {
        notificationDispatch({ type: 'SET', payload: message });
        setTimeout(() => {
            notificationDispatch({ type: 'CLEAR' });
        }, timeout);
      };
  
    return (
      <NotificationContext.Provider value={{notification, showNotification}}>
        {children}
      </NotificationContext.Provider>
    )
  }

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch.notification
}

export const useNotificationDispatch = () => {
    const context = useContext(NotificationContext)
    return context.showNotification
}

export default NotificationContext


