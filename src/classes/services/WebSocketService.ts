import io from 'socket.io-client'

export enum WsMessageType {
  Step = 'Step',
  Join = 'Join',
}

class WebSocketService {
  private socketClient: any
  public init = () => {
    const token = localStorage.getItem('token')
    if (token) {
      this.socketClient = io('http://localhost:4433', { query: { token } })
      this.socketClient.open()
      this.socketClient.on('connect', function (data: any) {
        console.log('connected to socket', data)
      })
      this.socketClient.on('message', (data: any) => {
        console.log(data)
      })
    }
  }

  public sendMessage = (data: string) => {
    this.socketClient.emit('message', data)
  }

  public sendJson = (data: Object) => {
    this.socketClient.emit('json', data)
  }
}

const webSocketService = new WebSocketService()
export { webSocketService as WebSocketService }
