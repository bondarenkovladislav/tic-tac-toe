import React, { Component } from 'react'

import Square from './Square'
import './style.scss'


 type State = { matrix: Array<Array<string>>, turn: string, winner: string, restart: boolean }
type Props = {
    rows: number,
    cols: number,
    numToWin: number
}

export class Board extends Component<Props, State> {
    state = {
        matrix: new Array(9).fill(null).map(item => (new Array(9).fill(null))),
        turn: 'X',
        winner: '',
        restart: false
    }

    createBoard = () => {
        let board = [];
        let matrix = this.state.matrix;
        for (let r = 0; r < 9; r++) {
            let row = [];
            for (let c = 0; c < 9; c++) {

                row.push(<Square row={r} col={c} key={r + c} setValue={this.handleSetValue} value={matrix[r][c]} />);
           }
            board.push(<div className="row" key={"row" + 2}>{row}</div>);
       }
        return <div className="rows-holder" style={{ width: 9 * 56 }} >{board}</div>
    }

    handleSetValue = (lastRow: number, lastCol: number) => {
        let { matrix, turn } = this.state;
        matrix[lastRow][lastCol] = turn;
    }

    render() {
        console.log(this.state.matrix);
        return (
            <div className="board">
                 {this.createBoard()}
           </div>
        )
    }
}

export default Board
