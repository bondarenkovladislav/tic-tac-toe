import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import { Home } from './Home'
import { LeaderBoardPage } from './LeaderBoardPage'
import { Board } from './PlayingField'

export const Main = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path={'/leaderboard'} component={LeaderBoardPage} />
        <Route exact path={'/game'} component={Board} />
      </Switch>
    </Router>
  )
}
