import { Component, Input, OnChanges } from '@angular/core';
import { Profile } from '../../models/profile.interface';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-profile-card',
  template: `
    <md-card class="mat-card--sm">
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
    </md-card>
    <md-card class="mat-card--sm">
      <md-card-content>
        <div>
          <label>Candidate Vibe</label>
          <md-slider
            class="full-width"
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
        <div>
          <label>Engagement Vibe</label>
          <md-slider
            class="full-width"
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
            class="full-width"
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
      </md-card-content>
    </md-card>
  `,
  styles: []
})
export class ProfileCardComponent implements OnChanges {
  @Input()
  selectedProfile: Profile;

  profileObs: FirebaseObjectObservable<Profile>;
  profile: Profile;

  // md-slider settings
  sliderMin = 0;
  sliderMax = 10;
  sliderStep = 1;
  sliderTickInterval = 1;

  constructor(private af: AngularFire) {
  }

  ngOnChanges() {
    this.profileObs = this.af.database.object(`/profiles/${this.selectedProfile.$key}`);
    this.profileObs.subscribe((profile) => {
      this.profile = Object.assign({}, profile);
    });
  }

  update(key, event) {
    this.profileObs.update({ [key]: event.value });
  }
}
