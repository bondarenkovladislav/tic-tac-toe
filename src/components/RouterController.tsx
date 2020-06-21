import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { WebSocketService } from '../classes/services/WebSocketService'

export const RouterController_ = (props: any) => {
  useEffect(() => {
    if (window.location.pathname !== '/results') {
      if (localStorage.getItem('key') != null) {
        props.history.push('/wait')
        WebSocketService.init(props.history)
      } else {
        props.history.push('/login')
      }
    }
  }, [])
  return props.children
}

export const RouterController = withRouter(RouterController_)
