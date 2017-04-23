import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Profile } from '../models/profile.interface';

@Component({
  selector: 'app-main',
  template: `
    <div id="main-container">
      <div>
        <md-card>
          <md-card-content>
            <button
                md-raised-button
                color="accent"
                (click)="addMode = true"
            >New</button>
          </md-card-content>
        </md-card>
        <md-card
          class="clickable"
          [ngClass]="{'mat-card--selected': profile.$key == selectedProfile?.$key}"
          *ngFor="let profile of profiles | async"
          (click)="selectProfile(profile); addMode = false"
        >
          <md-card-content>
            <div class="profile-card">
              <div
                class="mat-card-avatar profile-card__avatar"
                [ngStyle]="{ 'background-image': 'url(' + profile.avatar + ')' }">
                <span *ngIf="!profile.avatar">{{ profile.firstName | truncate : '1' }}{{ profile.lastName | truncate : '1' }}</span>
              </div>
              <p>{{ profile.firstName }} {{ profile.lastName }}</p>
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div>
        <md-card
          *ngIf="addMode"
          class="mat-card--sm"
        >
          <md-card-content>
            <app-profile-form
                (onCreate)="selectedProfile = null; addMode = false;"
            ></app-profile-form>
          </md-card-content>
        </md-card>
        <div *ngIf="!addMode && selectedProfile">
          <app-profile-card [selectedProfile]="selectedProfile"></app-profile-card>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  profiles: FirebaseListObservable<Profile[]>;
  selectedProfile: Profile = null;
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
