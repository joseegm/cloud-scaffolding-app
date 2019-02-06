import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

import { Broadcaster } from '../broadcaster/broadcaster.service';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    public socket;

    constructor(private broadcaster: Broadcaster) {
        this.initSocket();
        this.initDataChannel();
    }

    public initSocket(): void {
        this.socket = socketIo('ws://127.0.0.1:8877');
        this.setMessages();

        this.send('test', // delete later
            { destination: "ORCHESTRA", status: "new", type: "action", command: "subscribe", identifier: "1234", data: { identifier: "1234" } }
        );

        this.socket.on('disconnect', () => {
            location.reload();
        });
    }

    public initDataChannel() {
        this.broadcaster.on('sendData').subscribe(d => {
            this.send('data', d);
        });
    }

    public send(messageId: string, data: any): void {
        data.datetime = data.datetime || Date.now;
        data.source = data.source || 'GUI'; // delete later

        this.socket.send(data);
    }

    setMessages() {
        this.socket.on('message', (data) => {
            if (typeof data == 'string')
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.log('Malformed JSON: ' + data);
                }
            this.broadcaster.broadcast(data.command, data);
        })
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('message', (data) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }

}
