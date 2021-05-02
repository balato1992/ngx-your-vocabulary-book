import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'your-vocabulary-book-angular-view';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

    console.log('app constructor');
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

        this.router.navigate(['/'], { replaceUrl: true });
      });
  }
}
