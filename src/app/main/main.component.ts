import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Profile } from '../models/profile.interface';

@Component({
  selector: 'app-main',
  template: `
    <div id="main-container">
      <div>
        <button
          md-raised-button
          color="primary"
          (click)="addMode = true"
        >New</button>
        <md-card
          class="clickable"
          [ngClass]="{'mat-card--selected': profile === selectedProfile}"
          *ngFor="let profile of profiles | async"
          (click)="selectProfile(profile); addMode = false"
        >
          <md-card-content>
            <p>{{ profile.firstName }} {{ profile.lastName }}</p>
          </md-card-content>
        </md-card>
      </div>
      <div>
        <md-card
          *ngIf="addMode"
          class="mat-card--sm"
        >
          <md-card-content>
            <app-profile-form></app-profile-form>
          </md-card-content>
        </md-card>
        <md-card
          *ngIf="!addMode && selectedProfile"
          class="mat-card--sm"
        >
          <md-card-content>
            <app-profile-card
              [profile]="selectedProfile"
            ></app-profile-card>
          </md-card-content>
        </md-card>
      </div>
    </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  profiles: FirebaseListObservable<Profile[]>;
  selectedProfile: object = null;
  addMode = false;

  constructor(af: AngularFire) {
    this.profiles = af.database.list('/profiles');
  }

  ngOnInit() {
  }

  selectProfile(profile) {
    this.selectedProfile = profile;
  }

}
