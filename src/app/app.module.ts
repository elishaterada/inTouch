import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdCardModule,
  MdSliderModule,
  MdTooltipModule,
  MdSelectModule,
  MdToolbarModule
} from '@angular/material';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProfileCardComponent } from './main/profile-card/profile-card.component';
import { ProfileCreateFormComponent } from './main/profile-create-form/profile-create-form.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ProfileEditFormComponent } from './main/profile-edit-form/profile-edit-form.component';

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
    MainComponent,
    ProfileCardComponent,
    ProfileCreateFormComponent,
    TruncatePipe,
    ProfileEditFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule,
    MdCardModule,
    MdInputModule,
    MdSliderModule,
    MdSelectModule,
    MdToolbarModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
