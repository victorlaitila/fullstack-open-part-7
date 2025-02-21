import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const [notification] = useContext(NotificationContext)
  if (notification) {
    if (notification.type === 'success') {
      return (
        <div data-testid='success-notification' className='notification success-notification-color'>{notification.message}</div>
      )
    } else {
      return (
        <div data-testid='error-notification' className='notification error-notification-color'>{notification.message}</div>
      )
    }
  }
}

export default Notification
