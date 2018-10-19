import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'send-await',
  templateUrl: './send-await.component.html'
})
export class SendAwaitComponent implements OnInit {

    waiting: boolean;

    stringToSend: string;

    receivedData: Array<any>;

    ngOnInit() {
        this.waiting = false;
        this.stringToSend = '';

        this.receivedData = new Array<any>();
        this.receivedData.push(this.newReceivedData());
    }

    send() {
        this.waiting = true;

        // mocked
        this.receivedData.unshift(this.newReceivedData());
        this.waiting = false;
    }

    clearReceivedData() {
        this.receivedData = new Array<any>();
    }

    private newReceivedData():any {
        var currentData = {
            id: Math.floor(Math.random() * 1e100),
            dateTime: Date.now(),
            originalString: this.stringToSend,
            stringHash: this.stringToSend + 'hashed'
        }

        this.stringToSend = '';

        return currentData;
    }

}
