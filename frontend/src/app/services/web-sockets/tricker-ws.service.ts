import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";


@Injectable({
  providedIn: 'root',
})
export class TrickerWsService {
  private socket: WebSocket;

  constructor() {
    // Establece la conexión WebSocket con el servidor
    this.socket = new WebSocket('ws://localhost:3030'); // Asegúrate de que la URL coincida con tu servidor
  }


  public listenForMessages(): void {
    this.socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(data);
    };
  }

  // public listenForMessages(callback: (data: any) => void): void {
  //   this.socket.onmessage = (message) => {
  //     const data = JSON.parse(message.data);
  //     callback(data);
  //   };
  // }

  public sendMessage(data: any): void {
    this.socket.send(JSON.stringify(data));
  }


}
