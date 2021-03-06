import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Profile } from '../../models/profile.interface';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-profile-card',
  template: `
    <md-card
        *ngIf="editMode === false"
    >
      <md-card-content>
        <div class="profile-card">
          <div class="mat-card-avatar mat-card-avatar--lg  profile-card__avatar-wrapper">
            <div class="mat-card-avatar mat-card-avatar--lg  profile-card__avatar"
                 [ngStyle]="{ 'background-image': 'url(' + profile?.avatar + '?d=blank&s=160)' }"></div>
            <div class="profile-card__initials profile-card__initials--lg">
              {{ profile?.firstName | truncate : '1' }}{{ profile?.lastName | truncate : '1' }}
            </div>
          </div>
          <div>
            <div class="profile-card__name">{{ profile?.firstName }} {{ profile?.lastName }}</div>
            <div class="profile-card__work">
              <span *ngIf="profile?.title">{{ profile?.title }}</span>
              <span *ngIf="profile?.title && profile?.company">at</span>
              <span *ngIf="profile?.company">{{ profile?.company }}</span>
            </div>
            <div class="profile-card__contact">
              <span *ngIf="profile?.email" class="profile-card__contact__info">
                <md-icon class="mat-icon--xs">email</md-icon> {{ profile?.email }}
              </span>
              <span *ngIf="profile?.phone" class="profile-card__contact__info">
                <md-icon class="mat-icon--xs">phone</md-icon> {{ profile?.phone }}
              </span>
            </div>
          </div>
          <div class="profile-card__actions">
            <button
                md-icon-button
                [mdMenuTriggerFor]="menu">
              <md-icon>more_vert</md-icon>
            </button>
            <md-menu #menu="mdMenu">
              <button
                  md-menu-item
                  (click)="editMode = true"
              >
                <md-icon>edit</md-icon>
                <span>Edit</span>
              </button>
              <button
                  md-menu-item
                  (click)="confirmDelete()"
              >
                <md-icon>delete</md-icon>
                <span>Delete</span>
              </button>
            </md-menu>
          </div>
        </div>
        <div class="social-media">
          <div *ngIf="profile.twitter" class="social-media__item">
            <a [href]="profile.twitter" title="Twitter" target="_blank" mdTooltip="Twitter">
              <md-icon class="mat-icon--sm" svgIcon="twitter"></md-icon>
            </a>
          </div>
          <div *ngIf="profile.github" class="social-media__item">
            <a [href]="profile.github" title="GitHub" target="_blank" mdTooltip="GitHub">
              <md-icon class="mat-icon--sm" svgIcon="github"></md-icon>
            </a>
          </div>
          <div *ngIf="profile.linkedin" class="social-media__item">
            <a [href]="profile.linkedin" title="LinkedIn" target="_blank" mdTooltip="LinkedIn">
              <md-icon class="mat-icon--sm" svgIcon="linkedin"></md-icon>
            </a>
          </div>
        </div>
        <p *ngIf="profile.summary">
          {{ profile?.summary }}
        </p>
        <button
            md-button
            *ngIf="!profile.summary"
            (click)="editMode = true"
        >
          Add Summary
        </button>
      </md-card-content>
    </md-card>
    <md-card
        *ngIf="editMode === true"
    >
      <md-card-content>
        <app-profile-edit-form
            [selectedProfile]="profile"
            (onUpdate)="editMode = false"
            (onCancel)="editMode = false"
        ></app-profile-edit-form>
      </md-card-content>
    </md-card>
    <md-card>
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

  @Output()
  onDelete = new EventEmitter();

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

  constructor(
    private af: AngularFire,
    public dialog: MdDialog
  ) {
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

  confirmDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.onDelete.emit();
        this.profileObs.remove();
      }
    });
  }
}

@Component({
  selector: 'app-delete-confirmation-dialog',
  template: `
    <div>
      <h1 md-dialog-title>Confirmation</h1>
      <md-dialog-content>Are you sure? This action cannot be undone.</md-dialog-content>
      <md-dialog-actions>
        <button md-button color="warn" (click)="confirmDelete()">Delete</button>
        <button md-button (click)="cancelDelete()">Cancel</button>
      </md-dialog-actions>
    </div>
  `,
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MdDialogRef<DeleteConfirmationDialogComponent>
  ) {}

  confirmDelete() {
    this.dialogRef.close(true);
  }

  cancelDelete() {
    this.dialogRef.close(false);
  }
}
