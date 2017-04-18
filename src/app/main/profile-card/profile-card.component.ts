import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../models/profile.interface';

@Component({
  selector: 'app-profile-card',
  template: `
    <div>
      <p>
        {{ profile?.firstName }} {{ profile?.lastName }}
      </p>
      <p>
        {{ profile?.title }} at {{ profile?.company }}
      </p>
      <p>
        {{ profile?.email }} {{ profile?.phone }}
      </p>
      <p>
        {{ profile?.summary }}
      </p>
    </div>
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
