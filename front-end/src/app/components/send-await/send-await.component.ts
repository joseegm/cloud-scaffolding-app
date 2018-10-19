import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'send-await',
  templateUrl: './send-await.component.html'
})
export class SendAwaitComponent implements OnInit {

    waiting: boolean;

    stringToSend: string;

    ngOnInit() {
        this.waiting = false;
        this.stringToSend = '';
    }

    send() {
        this.waiting = true;
        console.log(this.stringToSend);
    }

}
