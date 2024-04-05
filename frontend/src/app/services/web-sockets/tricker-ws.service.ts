import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrickerWsService {
  private socket: WebSocket;

  constructor() {
    // Establece la conexión WebSocket con el servidor
    this.socket = new WebSocket('ws://localhost:3001'); // Asegúrate de que la URL coincida con tu servidor
  }

  // Escucha los mensajes del servidor
  public listenForData(callback: (data: any) => void): void {
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      console.log(data) // Llama a la función de devolución de llamada con los datos recibidos
      callback(data);
    });
  }

  // Envía datos al servidor (si es necesario)
  public sendData(data: any): void {
    this.socket.send(JSON.stringify(data));
  }
  //
}
