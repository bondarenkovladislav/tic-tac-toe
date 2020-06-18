import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import { Home } from './Home'
import { LeaderBoardPage } from './LeaderBoardPage'
import { TempPage } from './TempPage'
import { AuthorisationForm } from './AuthorisationForm'
import {ResultsPage} from './ResultsPage'

export const Main = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={TempPage} />
        <Route exact path="/settings" component={Home} />
        <Route exact path={'/leaderboard'} component={LeaderBoardPage} />
        <Route exact path={'/login'} component={AuthorisationForm}/>
        <Route exact path={'/results'} component={ResultsPage}/>
      </Switch>
    </Router>
  )
}
