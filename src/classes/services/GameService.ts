import { WebSocketService, WsMessageType } from './WebSocketService'

export interface IGameStep {
  coords: number[]
}

export class GameService {
  public static MakeStep = (step: IGameStep) => {
    WebSocketService.sendJson({
      messageType: WsMessageType.Step,
      token: localStorage.getItem('token'),
      ...step,
    })
  }

  public static getScoreBoard = () => {

  }
}
