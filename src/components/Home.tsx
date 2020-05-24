import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import { ApiClient } from '../services/ApiClient'
export const Home = () => {
  const [reqRes, setReqRes] = useState()
  return (
    <div>
      <Button
        onClick={async () => {
          setReqRes(await ApiClient.testReq())
        }}
      >
        Send test request
      </Button>
      <div dangerouslySetInnerHTML={{ __html: reqRes }} />
    </div>
  )
}
