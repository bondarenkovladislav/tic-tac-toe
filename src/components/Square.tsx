import React, { Component } from 'react'
import './style.scss'

type State = { clicked: boolean }
type Props = {
  row: number
  col: number
  setValue: Function
  value: number
  color?: string
}

export class Square extends Component<Props, State> {
  state = {
    clicked: false,
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.disable === true) {
      this.setState({ clicked: true })
    }
  }

  handleClick = () => {
    if (!this.state.clicked) {
      this.setState({ clicked: true })
      this.props.setValue(this.props.row, this.props.col)
    }
  }

  render() {
    const { value, color } = this.props
    return (
      <div className={`square ${value}`} onClick={this.handleClick}>
        <span style={{ color: color ? `${color}` : '' }}>
          {value === 1 ? 'X' : value === 2 ? 'O' : ''}
        </span>
      </div>
    )
  }
}

export default Square
