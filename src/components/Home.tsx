import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import { ApiClient } from '../classes/services/ApiClient'
import {
  WebSocketService,
  WsMessageType,
} from '../classes/services/WebSocketService'
import { GameService } from '../classes/services/GameService'
import { TextField } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

const Home_ = (props: any) => {
  const [userName, setUserName] = useState('')
  const [reqRes, setReqRes] = useState()
  return (
    <div>
      <Button
        onClick={async () => {
          setReqRes(await ApiClient.testReq2())
        }}
      >
        Send test request
      </Button>
      <Button
        onClick={() => {
          WebSocketService.sendMessage('hello')
        }}
      >
        Send Ws message
      </Button>
      <Button
        onClick={() => {
          GameService.MakeStep({ coords: [0, 0] })
        }}
      >
        Send 0,0 Player position
      </Button>
      <Button
        onClick={() => {
          GameService.MakeStep({ coords: [2, 2] })
        }}
      >
        Send 2,2 Player position
      </Button>
      <br />
      <TextField
        variant={'outlined'}
        value={userName}
        placeholder={'User Name'}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Button variant={'contained'} onClick={() => ApiClient.login(userName)}>
        Login
      </Button>
      <Button
        color={'primary'}
        variant={'outlined'}
        onClick={() => localStorage.removeItem('token')}
      >
        Logout
      </Button>
      <div dangerouslySetInnerHTML={{ __html: reqRes }} />
      <br />
      <Button
        variant={'outlined'}
        color={'secondary'}
        onClick={() => props.history.push('/leaderboard')}
      >
        Open Leaderboard
      </Button>
    </div>
  )
}

export const Home = withRouter(Home_)
