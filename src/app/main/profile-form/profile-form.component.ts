import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Profile } from '../../models/profile.interface';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-profile-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div formGroupName="profile">
        <div>
          <md-input-container>
            <input
              mdInput
              placeholder="First Name"
              formControlName="firstName"
            >
          </md-input-container>
          <md-input-container>
            <input
              mdInput
              placeholder="Last Name"
              formControlName="lastName"
            >
          </md-input-container>
        </div>
        <div>
          <button
            md-raised-button
            color="primary"
            [disabled]="form.invalid"
          >
            Save
          </button>
        </div>
        <div>
          <pre>
            {{ form.value | json }}
          </pre>
        </div>
      </div>
    </form>
  `,
  styles: []
})
export class ProfileFormComponent implements OnInit {
  profiles: FirebaseListObservable<Profile[]>;
  form = new FormGroup({
    profile: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    })
  });

  constructor(af: AngularFire) {
    this.profiles = af.database.list('/profiles');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.profiles.push(this.form.value.profile);
  }
}
