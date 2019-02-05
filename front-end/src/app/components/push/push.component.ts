import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

import { Broadcaster } from '../broadcaster/broadcaster.service';

@Component({
  selector: 'push',
  templateUrl: './push.component.html'
})
export class PushComponent implements OnInit {

    receivedData: Array<any>;

    constructor(private broadcaster: Broadcaster) {}

    ngOnInit() {
        this.receivedData = new Array<any>();

        let t = timer(0, 1200);

        t.subscribe(() => {
            this.broadcaster.broadcast('newElement', this.newElement());
        });

        this.broadcaster.on('newElement').subscribe(
            newElement => this.receivedData.push(newElement)
        );
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
