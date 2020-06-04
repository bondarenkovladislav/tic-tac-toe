import React, { useEffect, useState } from 'react'
import { ApiClient } from '../classes/services/ApiClient'

interface IUserResult {
  userName: string
  winCount: number
}

export const LeaderBoardPage = () => {
  const [userScores, setUserScores] = useState<IUserResult[]>([])
  useEffect(() => {
    ApiClient.get('/get-score').then((res) => {
      setUserScores(res.result)
    })
  }, [])
  return (
    <div>
      <p>LeaderBoard</p>
      {userScores.map((item, index) => (
        <div key={index}>
          <span>
            {item.userName} - {item.winCount}
          </span>
        </div>
      ))}
    </div>
  )
}
