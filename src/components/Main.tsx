import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  withRouter,
} from 'react-router-dom'
import React, { useEffect } from 'react'
import { Home } from './Home'
import { LeaderBoardPage } from './LeaderBoardPage'
import { Board } from './PlayingField'
import { TempPage } from './TempPage'
import { AuthorisationForm } from './AuthorisationForm'
import { ResultsPage } from './ResultsPage'
import { WaitPage } from './WaitPage'
import { RouterController } from './RouterController'

export const Main_ = (props: any) => {
  return (
    <Router>
      <Switch>
        <RouterController>
          <Route exact path={'/'} component={TempPage} />
          <Route exact path="/settings" component={Home} />
          <Route exact path={'/leaderboard'} component={LeaderBoardPage} />
          <Route exact path={'/login'} component={AuthorisationForm} />
          <Route exact path={'/results'} component={ResultsPage} />
          <Route exact path={'/wait'} component={WaitPage} />
          <Route exact path={'/game'} component={Board} />
        </RouterController>
      </Switch>
    </Router>
  )
}

export const Main = withRouter(Main_)
