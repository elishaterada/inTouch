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
              <div class="mat-card-avatar  profile-card__avatar-wrapper">
                <div class="mat-card-avatar  profile-card__avatar"
                     [ngStyle]="{ 'background-image': 'url(' + profile.avatar + '?d=blank&s=160)' }"></div>
                <div class="profile-card__initials">
                  {{ profile.firstName | truncate : '1' }}{{ profile.lastName | truncate : '1' }}
                </div>
              </div>
              <div>
                <div class="profile-card__name">{{ profile.firstName }} {{ profile.lastName }}</div>
                <div class="profile-card__status">{{ getStatus(profile.status) }}</div>
              </div>
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
  // Observables
  profiles: FirebaseListObservable<Profile[]>;

  selectedProfile: Profile = null;

  // Modes
  addMode = false;

  // Candidate Statuses
  statuses = {
    'poaching': 'Poaching',
    'interested': 'Interested',
    'active': 'Active'
  };

  constructor(af: AngularFire) {
    this.profiles = af.database.list('/profiles');
  }

  ngOnInit() {
  }

  selectProfile(profile) {
    this.selectedProfile = profile;
  }

  getStatus(status) {
    return this.statuses[status];
  }
}
