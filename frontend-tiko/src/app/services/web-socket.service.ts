import { Injectable } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';
import { StompConfig } from '@stomp/ng2-stompjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ticketUpdates = new BehaviorSubject<any>(null);

  constructor(private stompService: StompService) {
    const stompConfig: StompConfig = {
      url: 'ws://localhost:8080/ws',
      headers: {},
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: true
    };

    this.stompService.config = stompConfig;
    this.stompService.initAndConnect();

    this.stompService.subscribe('/topic/tickets').subscribe((message) => {
      this.ticketUpdates.next(JSON.parse(message.body));
    });
  }

  getTicketUpdates() {
    return this.ticketUpdates.asObservable();
  }
}