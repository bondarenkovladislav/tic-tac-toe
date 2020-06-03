import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import { ApiClient } from '../classes/services/ApiClient'
import {
  WebSocketService,
  WsMessageType,
} from '../classes/services/WebSocketService'
import { GameService } from '../classes/services/GameService'
export const Home = () => {
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
      <div dangerouslySetInnerHTML={{ __html: reqRes }} />
    </div>
  )
}
