import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { UrlService } from './url.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    
    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private urlService: UrlService,) { }

    get(): Observable<any> {

        return this.http.get<any>(this.urlService.auth_profile)
            .pipe(
                tap(_ => this.log('fetched profile')),
                catchError(this.handleError<any>('get', null))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }
    private log(message: string) {
        this.messageService.add(`ProfileService: ${message}`);
    }
}
