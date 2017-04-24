import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  template: `
  <md-toolbar color="primary">
    <span>inTouch</span>
  </md-toolbar>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {

  constructor(iconReg: MdIconRegistry, sanitizer: DomSanitizer) {
    iconReg
      .addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'))
      .addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg'))
      .addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg'));
  }

}
