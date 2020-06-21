import React, { useState, useEffect } from 'react'
import { TextField, Button, AppBar, Tabs, Tab, Link, createMuiTheme, ThemeProvider, styled, makeStyles } from '@material-ui/core'
import styles from './AuthorisationForm.module.scss'
import { ApiClient } from '../classes/services/ApiClient'
import { withRouter } from 'react-router-dom'
import { WebSocketService } from '../classes/services/WebSocketService'
import { orange} from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});


const ToolBar_ = (props: any) => {
  return (
    <div>
      <AppBar>
        <Tabs value={null}>
          <Tab
            onClick={() => props.history.push('/results')}
            label="Страница результатов"
          />
          {/* <Tab
            onClick={() => props.history.push('/wait')}
            label="Игра"
          /> */}
          <Tab
            onClick={() => {
              localStorage.clear()
              props.history.push('/login')
            }}
            label="Выход"
          />
        </Tabs>
      </AppBar>
    </div>
  )
}
export const ToolBar = withRouter(ToolBar_)

export const AuthorisationForm_ = (props: any) => {
  const [userName, setUserName] = useState('')
  document.title='Вход'
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.root}>
        <ToolBar />
        <div className={styles.block}>
          <TextField
            classes={props.classes}
            id="name"
            size="small"
            color='primary'
            margin="normal"
            className={styles.textField}
            label="Имя"
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <br />
          <Button
            className={styles.button}
            variant="contained"
            color="primary"
            size="medium"
            onClick={async () => {
              if (userName == '') alert('Ошибка! Неверные данные')
              else {
                await ApiClient.login(userName)
                WebSocketService.init(props.history)
                localStorage.setItem('key', 'token')
                props.history.push('/wait')
              }
            }}
          >
            Войти
        </Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export const AuthorisationForm = withRouter(AuthorisationForm_)
