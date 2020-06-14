import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import { Home } from './Home'
import { LeaderBoardPage } from './LeaderBoardPage'
import { TempPage } from './TempPage'

export const Main = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={TempPage} />
        <Route exact path="/settings" component={Home} />
        <Route exact path={'/leaderboard'} component={LeaderBoardPage} />
      </Switch>
    </Router>
  )
}
