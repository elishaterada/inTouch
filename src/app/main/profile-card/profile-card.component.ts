import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../models/profile.interface';

@Component({
  selector: 'app-profile-card',
  template: `
    <md-card>
      <md-card-content>
        <p>
          {{ profile.firstName }} {{ profile.lastName }}
        </p>
      </md-card-content>
    </md-card>
  `,
  styles: []
})
export class ProfileCardComponent implements OnInit {
  @Input()
  profile: Profile;

  constructor() { }

  ngOnInit() {
  }
}
