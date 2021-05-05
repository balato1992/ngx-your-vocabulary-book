import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { AuthService } from './service/auth.service';
import { ProfileService } from './service/profile.service';
import { UrlService } from './service/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'your-vocabulary-book-angular-view';

  hasProfile: boolean | undefined = undefined;
  userInfo: any = {};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService,
    private urlService: UrlService,

    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.setGoogleLogoSvg();
    this.saveAuthTokenFromParam();
    this.getProfile();
  }

  setGoogleLogoSvg() {
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Google_G_Logo.svg")
    );
  }

  redirectToAuth() {
    window.location.href = this.urlService.auth_google;
  }
  authLogout() {
    this.authService.logout();
    window.location.href = this.urlService.base;
  }

  saveAuthTokenFromParam() {
    this.route.queryParamMap
      .pipe(filter(params => params.get('authtoken') !== null))
      .subscribe((params: ParamMap) => {

        let success = false;
        try {
          const encodeToken: string = params.get('authtoken') ?? '';
          if (encodeToken !== '') {
            const decode = decodeURIComponent(encodeToken);
            const token = JSON.parse(decode);

            this.authService.setLocalStorage(token);
            success = true;
          }
        }
        catch {
          // TODO
        }

        if (!success) {
          this.authService.logout();
        }

        window.location.replace(this.urlService.base);
      });
  }

  getProfile() {
    const idToken = this.authService.getToken();
    if (idToken) {

      this.profileService.get(() => {
        this.hasProfile = false;
      }).subscribe((result) => {

        this.userInfo = { name: result.displayName };
        this.hasProfile = true;
      });
    }
    else {

      this.hasProfile = false;
    }
  }

}
