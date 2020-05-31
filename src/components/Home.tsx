import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import { ApiClient } from '../classes/services/ApiClient'
import { WebSocketService } from '../classes/services/WebSocketService'
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
          WebSocketService.sendJson({ test: 'Hellp' })
        }}
      >
        Send Ws JSON
      </Button>
      <div dangerouslySetInnerHTML={{ __html: reqRes }} />
    </div>
  )
}
