import { Component, OnInit, OnDestroy } from '@angular/core';

import { Broadcaster } from '../broadcaster/broadcaster.service';

@Component({
  selector: 'send-await',
  templateUrl: './send-await.component.html'
})
export class SendAwaitComponent implements OnInit, OnDestroy {

    waiting: boolean;
    stringToSend: string;
    receivedData: Array<any>;

    subscription = null;

    constructor(private broadcaster: Broadcaster) {}

    ngOnInit() {
        this.waiting = false;
        this.stringToSend = '';
        this.receivedData = new Array<any>();

        this.subscription = this.broadcaster.on('sendData2').subscribe(
            d =>  {
                this.receivedData.push(d);
                this.waiting = false;
            }
        );
    }

    send() {
        this.waiting = false;
        this.broadcaster.broadcast('sendData', this.newReceivedData());
    }

    clearReceivedData() {
        this.receivedData = new Array<any>();
    }

    private newReceivedData():any {
        var currentData = {
            method: 'hash',
            id: Math.floor(Math.random() * 1e100),
            dateTime: Date.now(),
            originalString: this.stringToSend
        }
        this.stringToSend = '';
        return currentData;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
