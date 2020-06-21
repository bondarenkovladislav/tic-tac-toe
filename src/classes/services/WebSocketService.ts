import io from 'socket.io-client'

export enum WsMessageType {
  Step = 'Step',
  Join = 'Join',
}

class WebSocketService {
  private socketClient: any
  private subscriberFn: (
    status: string,
    field: string[][],
    winner?: number
  ) => void = () => {}

  private restartResolve = () => {}

  public init = (history: any) => {
    const token = localStorage.getItem('token')
    if (token) {
      this.socketClient = io('https://still-plateau-44878.herokuapp.com/', { query: { token } })
      this.socketClient.open()
      this.socketClient.on('connect', function (data: any) {
        console.log('connected to socket', data)
      })
      this.socketClient.on('message', (data: any) => {
        if (data.joinStatus && data.joinStatus === 'game') {
          history.push('/game')
          this.subscriberFn('OK', data.field, data.winner)
        }
        if (data.joinStatus && data.joinStatus === 'updateSession') {
          history.push('/game')
          this.subscriberFn('OK', data.field, data.winner)
        }
      })
      this.socketClient.on(
        'step',
        (data: { status: string; field: string[][] }) => {
          this.subscriberFn(data.status, data.field)
        }
      )
      this.socketClient.on(
        'victory',
        (data: { winner: number; field: string[][] }) => {
          this.subscriberFn('OK', data.field, data.winner)
        }
      )
      this.socketClient.on(
        'restart',
        (data: { status: string; field: string[][] }) => {
          this.restartResolve && this.restartResolve()
          this.subscriberFn('OK', data.field, 0)
        }
      )
    }
  }

  public sendMessage = (data: string) => {
    this.socketClient.emit('message', data)
  }

  public sendJson = (data: Object) => {
    this.socketClient.emit('json', data)
  }

  public sendStep = async (data: Object) => {
    this.socketClient.emit('step', data)
  }

  public sendRestart = async () => {
    this.socketClient.emit('restart')
    return new Promise((resolve) => (this.restartResolve = resolve))
  }

  public subscribe = (
    fn: (status: string, field: string[][], winner?: number) => void
  ) => {
    this.subscriberFn = fn
  }
}

const webSocketService = new WebSocketService()
export { webSocketService as WebSocketService }
