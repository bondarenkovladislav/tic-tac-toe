import React, { Component } from 'react'

import Square from './Square'
import './style.scss'
import styles from './PlayingField.module.scss'
import { WebSocketService } from '../classes/services/WebSocketService'
import { Snackbar } from '@material-ui/core'

type State = {
  matrix: Array<Array<string>>
  turn: string
  winner: string
  restart: boolean
  notification: string
}
type Props = {
  rows: number
  cols: number
  numToWin: number
}

export class Board extends Component<Props, State> {
  state = {
    matrix: new Array(3).fill(null).map((item) => new Array(3).fill(null)),
    turn: 'X',
    winner: '',
    restart: false,
    notification: '',
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
    WebSocketService.subscribe((status, field) => {
      console.log('st', status)
      if (status !== 'OK') {
        switch (status) {
          case 'wrong_order':
            this.setState({
              matrix: field,
              notification: 'Another player order',
            })
            return
        }
        this.setState({ matrix: field, notification: status })
      } else {
        this.setState({ matrix: field })
      }
    })
  }

  render() {
    return (
      <div className={styles.board}>
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
      </div>
    )
  }
}

export default Board
