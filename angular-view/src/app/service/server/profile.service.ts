import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { UrlService } from './url.service';
import { HandleService } from './handle.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        private handleService: HandleService) { }

    get(errorCallback: () => void): Observable<any> {

        return this.http.get<any>(this.urlService.auth_profile)
            .pipe(
                tap(_ => this.handleService.log('fetched profile')),
                catchError(this.handleService.handleError<any>('profile get', null, errorCallback))
            );
    }
}
