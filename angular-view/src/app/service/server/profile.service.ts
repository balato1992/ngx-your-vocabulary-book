import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { URL } from 'src/app/app.global-variable';
import { HandleService } from './handle.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private http: HttpClient,
        private handleService: HandleService) { }

    get(errorCallback: () => void): Observable<any> {

        return this.http.get<any>(URL.AUTH_PROFILE)
            .pipe(
                tap(_ => this.handleService.log('fetched profile')),
                catchError(this.handleService.handleError<any>('profile get', null, errorCallback))
            );
    }
}
