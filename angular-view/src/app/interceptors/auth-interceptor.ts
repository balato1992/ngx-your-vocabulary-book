// reference: https://medium.com/swlh/everything-you-need-to-know-about-the-passport-jwt-passport-js-strategy-8b69f39014b0
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = this.authService.getToken();

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", idToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}