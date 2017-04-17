import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Profile } from '../models/profile.interface';

@Component({
  selector: 'app-main',
  template: `
    <div>
      <app-profile-form></app-profile-form>
      <app-profile-card
          *ngFor="let profile of profiles | async"
          [profile]="profile"
      ></app-profile-card>
    </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  profiles: FirebaseListObservable<Profile[]>;
  constructor(af: AngularFire) {
    this.profiles = af.database.list('/profiles');
  }

  ngOnInit() {
  }

}
