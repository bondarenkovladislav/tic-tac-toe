import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Main } from './components/Main'
import { InitializationService } from './classes/services/InitializationService'
import './App.scss'

export const history = createBrowserHistory()
InitializationService.init()
ReactDOM.render(
  <Router history={history}>
    <Main />
  </Router>,
  document.getElementById('root')
)
