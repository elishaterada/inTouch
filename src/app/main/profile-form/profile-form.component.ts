import {Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from '../../models/profile.interface';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
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
export class ProfileFormComponent implements OnChanges {
  @Input()
  selectedProfile: Profile;

  // Observables
  selectedProfileObs: FirebaseObjectObservable<Profile>;
  profiles: FirebaseListObservable<Profile[]>;

  profile: Profile;

  now: string;

  form = this.fb.group({
    dateCreated: '',
    dateModified: '',
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    title: '',
    company: '',
    email: '',
    phone: '',
    avatar: '',
    summary: '',
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

  ngOnChanges() {
    this.selectedProfileObs = this.af.database.object(`/profiles/${this.selectedProfile.$key}`);
    this.selectedProfileObs.subscribe((profile) => {
      this.profile = Object.assign({}, profile);
    });
  }

  onSubmit() {
    // Track timestamp
    this.now = moment().format();

    this.form.value.dateCreated = this.now;
    this.form.value.dateModified = this.now;

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
