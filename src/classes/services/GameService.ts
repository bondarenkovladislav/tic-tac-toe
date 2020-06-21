import { WebSocketService, WsMessageType } from './WebSocketService'

export interface IGameStep {
  coords: number[]
}

export class GameService {
  public static MakeStep = (step: IGameStep) => {
    WebSocketService.sendStep({
      ...step,
    })
  }

  public static joinToTheGame = () => {
    WebSocketService.sendJson({
      messageType: WsMessageType.Join,
      token: localStorage.getItem('token'),
    })
  }

  public static getScoreBoard = () => {}
}
