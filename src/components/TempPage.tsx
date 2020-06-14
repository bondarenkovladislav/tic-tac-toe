import React from 'react'
import styles from './TempPage.module.scss'
import { withRouter } from 'react-router-dom'
import { Button } from '@material-ui/core'

const TempPage_ = (props: any) => {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <div className={styles.label}>Coming soon</div>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={() => props.history.push('/settings')}
        >
          Открыть страницу разработки
        </Button>
      </div>
      <iframe
        width={'100%'}
        height={'100%'}
        src={
          'https://bondarenkovladislav.github.io/Assets/test-projects/tictactoe/tictactoe.html'
        }
      />
    </div>
  )
}

export const TempPage = withRouter(TempPage_)
