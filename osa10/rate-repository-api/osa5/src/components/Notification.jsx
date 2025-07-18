import { useNotificationValue, useNotificationDispatch } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  if (notification === null) {
    return null
  }

  return <div className={notification.type}>{notification.msg}</div>
}

export default Notification
