import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { routing } from './app.routes';

import { HomeComponent } from './components/home/home.component';
import { SendAwaitComponent } from './components/send-await/send-await.component';
import { PushComponent } from './components/push/push.component';
import { SocketService } from './components/socket/socket.service';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    SendAwaitComponent,
    PushComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    routing
  ],
  providers: [
      SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
