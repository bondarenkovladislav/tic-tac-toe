import React, { Component } from 'react'

import Square from './Square'
import './style.scss'
import styles from './PlayingField.module.scss'
import { WebSocketService } from '../classes/services/WebSocketService'
import { Snackbar, Button, ThemeProvider } from '@material-ui/core'
import { dark } from '@material-ui/core/styles/createPalette'
import { AuthorisationForm_, ToolBar, theme } from './AuthorisationForm'
import { withRouter } from 'react-router-dom'

type State = {
  matrix: Array<Array<string>>
  turn: string
  winner: number
  restart: boolean
  notification: string
  restarting: boolean
}
type Props = {
  rows: number
  cols: number
  numToWin: number
  history: any
}

export class Board extends Component<Props, State> {
  state = {
    matrix: new Array(3).fill(null).map((item) => new Array(3).fill(null)),
    turn: 'X',
    winner: 0,
    restart: false,
    notification: '',
    restarting: false,
  }

  createBoard = () => {
    let board = []
    let matrix = this.state.matrix
    for (let r = 0; r < 3; r++) {
      let row = []
      for (let c = 0; c < 3; c++) {
        row.push(
          <Square
            row={r}
            col={c}
            key={r + c}
            setValue={this.handleSetValue}
            value={matrix[r][c]}
          />
        )
      }
      board.push(
        <div className={styles.row} key={'row' + 2}>
          {row}
        </div>
      )
    }
    return <div className="rows-holder">{board}</div>
  }

  handleSetValue = async (lastRow: number, lastCol: number) => {
    WebSocketService.sendStep({
      coords: [lastRow, lastCol],
    })
  }

  componentDidMount() {
    document.title='Игра'
    WebSocketService.subscribe((status, field, winner) => {
      if (!!winner) {
        this.setState({ winner, matrix: field })
      } else if (status !== 'OK') {
        switch (status) {
          case 'wrong_order':
            this.setState({
              matrix: field,
              notification: 'Ход другого игрока',
            })
            return
          case 'filled':
            this.setState({
              matrix: field,
              notification: 'Уже заполнено',
            })
        }
        this.setState({ matrix: field, notification: status })
      } else {
        this.setState({ matrix: field, winner: 0 })
      }
    })
  }

  render() {
    return (
      <div className={styles.board}>
        <ThemeProvider theme={theme}>
          <ToolBar />
        </ThemeProvider>
        {!!this.state.winner &&
          (this.state.winner === 3 ? (
            <div>Ходить</div>
          ) : (
              <div>{this.state.winner == 1 ? 'X' : 'O'} won</div>
            ))}
        {this.createBoard()}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={!!this.state.notification}
          autoHideDuration={6000}
          onClose={() => {
            this.setState({ notification: '' })
          }}
          message={this.state.notification}
        />
        {this.state.restarting && (
          <div className={styles.letter}>Ожидайте, когда другой игрок одобрит перезапуск</div>
        )}
        <br />
        <ThemeProvider theme={theme}>
          {!!this.state.winner && (
            <Button
              variant="contained"
              color="primary"
              size="medium"
              disabled={this.state.restarting}
              onClick={async () => {
                this.setState({ restarting: true })
                await WebSocketService.sendRestart()
                this.setState({ restarting: false })
              }}
            >
              Заново
            </Button>
          )}
        </ThemeProvider>
      </div>
    )
  }
}
