import { Component } from '@angular/core';

import { SocketService  } from './components/socket/socket.service';
import { Broadcaster  } from './components/broadcaster/broadcaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    
    constructor(private socketService: SocketService, private broadcaster: Broadcaster) { }

}
