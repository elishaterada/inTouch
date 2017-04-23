import { Component, Input, OnChanges } from '@angular/core';
import { Profile } from '../../models/profile.interface';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-profile-card',
  template: `
    <md-card
        *ngIf="editMode === false"
        class="mat-card--sm"
    >
      <md-card-content>
        <p>
          {{ profile?.firstName }} {{ profile?.lastName }}
        </p>
        <p>
          {{ profile?.title }}
        </p>
        <p>
          {{ profile?.company }}
        </p>
        <p>
          {{ profile?.email }}
        </p>
        <p>
          {{ profile?.phone }}
        </p>
        <p>
          {{ profile?.summary }}
        </p>
      </md-card-content>
      <md-card-actions>
        <button
            md-icon-button
            mdTooltip="Edit Profile"
            (click)="editMode = true"
        >
          <md-icon>edit</md-icon>
        </button>
      </md-card-actions>
    </md-card>
    <md-card
        *ngIf="editMode === true"
        class="mat-card--sm"
    >
      <md-card-content>
        <app-profile-edit-form
            [selectedProfile]="profile"
            (onUpdate)="editMode = false"
            (onCancel)="editMode = false"
        ></app-profile-edit-form>
      </md-card-content>
    </md-card>
    <md-card class="mat-card--sm">
      <md-card-content>
        <div class="input-group input-group--col-2">
          <div class="select-group">
            <label>Status</label>
            <md-select
                class="mat-select--full-width"
                [(ngModel)]="profile.status"
                (change)="update('status', $event)"
            >
              <md-option 
                  *ngFor="let status of statuses"
                  [value]="status.value">
                {{ status.viewValue }}
              </md-option>
            </md-select>
          </div>
          <div>
            <label>Candidate Vibe</label>
            <md-slider
                class="mat-slider--full-width"
                [max]="sliderMax"
                [min]="sliderMin"
                [step]="sliderStep"
                [tickInterval]="sliderTickInterval"
                thumbLabel
                [value]="profile?.candidateVibe"
                (change)="update('candidateVibe', $event)"
            >
            </md-slider>
          </div>
        </div>
        <div class="input-group input-group--col-2">
          <div>
            <label>Engagement Vibe</label>
            <md-slider
              class="mat-slider--full-width"
              [max]="sliderMax"
              [min]="sliderMin"
              [step]="sliderStep"
              [tickInterval]="sliderTickInterval"
              thumbLabel
              [value]="profile?.engagementVibe"
              (change)="update('engagementVibe', $event)"
            >
            </md-slider>
          </div>
          <div>
            <label>Team Vibe</label>
            <md-slider
              class="mat-slider--full-width"
              [max]="sliderMax"
              [min]="sliderMin"
              [step]="sliderStep"
              [tickInterval]="sliderTickInterval"
              thumbLabel
              [value]="profile?.teamVibe"
              (change)="update('teamVibe', $event)"
            >
            </md-slider>
          </div>
        </div>
      </md-card-content>
    </md-card>
  `,
  styles: []
})
export class ProfileCardComponent implements OnChanges {
  @Input()
  selectedProfile: Profile;

  // Observables
  profileObs: FirebaseObjectObservable<Profile>;
  profile: Profile;

  // Edit mode
  editMode = false;

  // Candidate Statuses
  statuses = [
    { value: 'poaching', viewValue: 'Poaching' },
    { value: 'interested', viewValue: 'Interested' },
    { value: 'active', viewValue: 'Active' }
  ];

  // md-slider settings
  sliderMin = 0;
  sliderMax = 10;
  sliderStep = 1;
  sliderTickInterval = 1;

  constructor(private af: AngularFire) {
  }

  ngOnChanges() {
    this.editMode = false;

    this.profileObs = this.af.database.object(`/profiles/${this.selectedProfile.$key}`);
    this.profileObs.subscribe((profile) => {
      this.profile = profile;
    });
  }

  update(key, event) {
    this.profileObs.update({ [key]: event.value });
  }
}
