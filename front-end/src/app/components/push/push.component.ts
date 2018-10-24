import { Component, OnInit } from '@angular/core';

import { timer } from 'rxjs';

@Component({
  selector: 'push',
  templateUrl: './push.component.html'
})
export class PushComponent implements OnInit {

    receivedData: Array<any>;

    ngOnInit() {
        this.receivedData = new Array<any>();

        let timer0 = timer(0, 1200);

        timer0.subscribe(() => {
            this.receivedData.push(this.newElement());
        });
    }

    newElement():any {

        var currentElement = {
            id: Math.floor(Math.random() * 1e100),
            dateTime: Date.now(),
            value: Math.floor(Math.random() * 1000)
        }

        return currentElement;
    }

    clearReceivedData() {
        this.receivedData = new Array<any>();
    }

}
