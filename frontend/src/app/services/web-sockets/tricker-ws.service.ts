import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrickerWsService {

  private socket: WebSocket;
  private messages: Subject<any>;

  constructor() {
    this.socket = new WebSocket('ws://localhost:3000');
    this.messages = new Subject();

    this.socket.onmessage = (event) => {
      this.messages.next(JSON.parse(event.data));
    };
  }

  public getMessages(): Observable<any> {
    return this.messages.asObservable();
  }
}
