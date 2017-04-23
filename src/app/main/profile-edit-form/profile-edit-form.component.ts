import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from '../../models/profile.interface';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-edit-form',
  template: `
    <form
        novalidate
        [formGroup]="form"
        (ngSubmit)="onSubmit()">
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
        <button
            md-raised-button
            type="button"
            (click)="cancel()"
        >
          Cancel
        </button>
      </div>
    </form>
  `,
  styles: []
})
export class ProfileEditFormComponent implements OnChanges, OnInit {
  @Input()
  selectedProfile: Profile;

  @Output()
  onUpdate = new EventEmitter();

  @Output()
  onCancel = new EventEmitter();

  // Observables
  selectedProfileObs: FirebaseObjectObservable<Profile>;

  profile: Profile;

  now: string;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    title: '',
    company: '',
    email: ['', [CustomValidators.email]],
    phone: '',
    avatar: '',
    summary: ''
  });

  constructor(
    private af: AngularFire,
    private fb: FormBuilder
  ) {
  }

  ngOnChanges() {
    this.selectedProfileObs = this.af.database.object(`/profiles/${this.selectedProfile.$key}`);

    this.selectedProfileObs.subscribe((profile) => {
      this.profile = profile;
    });

    this.form.patchValue(this.selectedProfile);
  }

  ngOnInit() {

  }

  onSubmit() {
    // Track timestamp
    this.now = moment().format();

    this.profile = this.form.value;
    this.profile.dateModified = this.now;

    this.selectedProfileObs.update(this.profile);

    this.onUpdate.emit();
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

  cancel() {
    this.onCancel.emit();
  }
}
