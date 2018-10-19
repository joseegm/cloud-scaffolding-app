import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { routing } from './app.routes';

import { HomeComponent } from './components/home/home.component';
import { SendAwaitComponent } from './components/send-await/send-await.component';
import { PushComponent } from './components/push/push.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
