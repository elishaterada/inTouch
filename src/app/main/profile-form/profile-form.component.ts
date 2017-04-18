import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from '../../models/profile.interface';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-profile-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <md-input-container>
          <input
            mdInput
            placeholder="First Name"
            formControlName="firstName"
          >
          <md-error
              *ngIf="required('firstName')">
            This field is required
          </md-error>
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
        <md-input-container>
          <input
            mdInput
            placeholder="Title"
            formControlName="title"
          >
        </md-input-container>
        <md-input-container>
          <input
            mdInput
            placeholder="Company"
            formControlName="company"
          >
        </md-input-container>
      </div>
      <div>
          <md-input-container>
            <input
              mdInput
              placeholder="Email"
              formControlName="email"
            >
          </md-input-container>
          <md-input-container>
            <input
              mdInput
              placeholder="Phone"
              formControlName="phone"
            >
          </md-input-container>
      </div>
      <div>
          <md-input-container class="full-width">
            <textarea
              mdInput
              placeholder="Summary"
              formControlName="summary"
            ></textarea>
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
    </form>
  `,
  styles: []
})
export class ProfileFormComponent implements OnInit {
  profiles: FirebaseListObservable<Profile[]>;
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    title: '',
    company: '',
    email: '',
    phone: '',
    summary: ''
  });

  constructor(
    af: AngularFire,
    private fb: FormBuilder
  ) {
    this.profiles = af.database.list('/profiles');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.profiles.push(this.form.value);
    this.form.reset();
  }

  required(name: string) {
    return (
      this.form.controls[name].hasError('required') &&
      this.form.controls[name].touched
    );
  }
}
