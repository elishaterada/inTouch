import {Component, Output, EventEmitter} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from '../../models/profile.interface';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-form',
  template: `
    <form novalidate [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="input-group input-group--col-2">
        <md-input-container>
          <input
            mdInput
            placeholder="First Name *"
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
            placeholder="Last Name *"
            formControlName="lastName"
          >
          <md-error
            *ngIf="required('lastName')">
            This field is required
          </md-error>
        </md-input-container>
      </div>
      <div class="input-group input-group--col-2">
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
      <div class="input-group input-group--col-2">
          <md-input-container>
            <input
              mdInput
              placeholder="Email"
              formControlName="email"
            >
            <md-error
                *ngIf="invalid('email')">
              Please enter a valid email address
            </md-error>
          </md-input-container>
          <md-input-container>
            <input
              mdInput
              placeholder="Phone"
              formControlName="phone"
            >
          </md-input-container>
      </div>
      <div class="input-group input-group--col-1">
          <md-input-container>
            <textarea
              mdInput
              mdTextareaAutosize
              placeholder="Summary"
              formControlName="summary"
            ></textarea>
          </md-input-container>
      </div>
      <div>
        <button
          md-raised-button
          color="accent"
          [disabled]="form.invalid"
        >
          Save
        </button>
      </div>
    </form>
  `,
  styles: []
})
export class ProfileCreateFormComponent {
  @Output()
  onCreate = new EventEmitter();

  // Observables
  profiles: FirebaseListObservable<Profile[]>;

  profile: Profile;
  now: string;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    title: '',
    company: '',
    email: ['', CustomValidators.email],
    phone: '',
    avatar: '',
    summary: '',
    status: '',
    candidateVibe: 0,
    engagementVibe: 0,
    teamVibe: 0
  });

  constructor(
    private af: AngularFire,
    private fb: FormBuilder
  ) {
    this.profiles = af.database.list('/profiles');
  }

  onSubmit() {
    // Track timestamp
    this.now = moment().format();

    this.profile = this.form.value;
    this.profile.dateCreated = this.now;
    this.profile.dateModified = this.now;

    this.profiles.push(this.profile);
    this.onCreate.emit();

    this.form.reset();
  }

  required(name: string) {
    return (
      this.form.controls[name].hasError('required') &&
      this.form.controls[name].touched
    );
  }

  invalid(name: string) {
    return (
      this.form.controls[name].hasError &&
      this.form.controls[name].touched
    );
  }
}
