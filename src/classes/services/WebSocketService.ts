import io from 'socket.io-client'

export enum WsMessageType {
  Step = 'Step',
  Join = 'Join',
}

class WebSocketService {
  private socketClient: any
  private subscriberFn: (status: string, field: string[][]) => void = () => {}

  public init = (history: any) => {
    const token = localStorage.getItem('token')
    if (token) {
      this.socketClient = io('http://localhost:4433', { query: { token } })
      this.socketClient.open()
      this.socketClient.on('connect', function (data: any) {
        console.log('connected to socket', data)
      })
      this.socketClient.on('message', (data: any) => {
        console.log(data)
        if (data.joinStatus && data.joinStatus === 'game') {
          history.push('/game')
          this.subscriberFn('OK', data.field)
        }
        if (data.joinStatus && data.joinStatus === 'updateSession') {
          history.push('/game')
          this.subscriberFn('OK', data.field)
        }
      })
      this.socketClient.on(
        'step',
        (data: { status: string; field: string[][] }) => {
          console.log(data.status)
          this.subscriberFn(data.status, data.field)
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

  public subscribe = (fn: (status: string, field: string[][]) => void) => {
    this.subscriberFn = fn
  }
}

const webSocketService = new WebSocketService()
export { webSocketService as WebSocketService }
