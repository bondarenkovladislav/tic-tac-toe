import { WebSocketService, WsMessageType } from './WebSocketService'

export interface IGameStep {
  coords: number[]
}

export class GameService {
  public static MakeStep = (step: IGameStep) => {
    WebSocketService.sendJson({
      messageType: WsMessageType.Step,
      userId: localStorage.getItem('userId'),
      ...step,
    })
  }
}
