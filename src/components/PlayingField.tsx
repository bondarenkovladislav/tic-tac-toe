import React, { Component } from 'react'

import Square from './Square'
import './style.scss'
import styles from './PlayingField.module.scss'

type State = {
  matrix: Array<Array<string>>
  turn: string
  winner: string
  restart: boolean
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
    return (
      <div className="rows-holder">
        {board}
      </div>
    )
  }

  handleSetValue = (lastRow: number, lastCol: number) => {
    // let { matrix, turn } = this.state
    // matrix[lastRow][lastCol] = turn
    console.log(lastRow, lastCol)
  }

  render() {
    console.log(this.state.matrix)
    return <div className={styles.board}>{this.createBoard()}</div>
  }
}

export default Board
