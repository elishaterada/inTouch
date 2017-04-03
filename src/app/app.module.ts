import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

// Firebase Config
export const firebaseConfig = {
  apiKey: 'AIzaSyCvo5PllHQjwv8w9fboS3HHaeljCvDq6TI',
  authDomain: 'intouch-6d243.firebaseapp.com',
  databaseURL: 'https://intouch-6d243.firebaseio.com/',
  storageBucket: 'gs://intouch-6d243.appspot.com/',
  messagingSenderId: '738393417478'
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
