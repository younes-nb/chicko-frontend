import { Injectable } from '@angular/core';
import { SupportService } from './support.service';

const WS_ENDPOINT = 'ws://127.0.0.1:8080/ws/';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  websocket: WebSocket = {} as WebSocket;

  constructor(private supportService: SupportService) {}

  public open(roomId: string, userId: string): void {
    this.websocket = new WebSocket(`${WS_ENDPOINT}${roomId}/${userId}/`);
    this.websocket.onmessage = (event) => {
      this.supportService.addMessage(JSON.parse(event.data));
    };
  }

  public close(): void {
    this.websocket.close();
  }

  public sendMessage(userId: string, roomId: string, content: string) {
    this.websocket.send(
      JSON.stringify({
        type: 'send',
        message: content,
        user_id: userId,
        room_id: roomId,
      })
    );
  }
}
