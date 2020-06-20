import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

export const RouterController_ = (props: any) => {
  useEffect(() => {
    if (localStorage.getItem('key') != null) {
      props.history.push('/wait')
    } else {
      props.history.push('/login')
    }
  }, [])
  return props.children
}

export const RouterController = withRouter(RouterController_)
