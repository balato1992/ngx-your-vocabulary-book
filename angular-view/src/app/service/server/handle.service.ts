import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from '../message.service';

@Injectable({
    providedIn: 'root'
})
export class HandleService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {
    }


    handleError<T>(operation: string, result?: T, callback?: () => void) {
        return (error: any): Observable<T> => {

            if (callback !== undefined) {
                try {
                    callback();
                }
                catch (err) {
                    console.error(`handleError callback error: ${err}`);
                }
            }

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }
    log(message: string) {
        this.messageService.add(`ProfileService: ${message}`);
    }


    testGet(url: string): Observable<any> {

        return this.http.get<any>(url)
            .pipe(
                tap(_ => this.log('fetched WordItems')),
                catchError(this.handleError<any>('WordItems get'))
            );
    }

    testPost(url: string, data: any): Observable<any> {

        return this.http.post<any>(url, data, this.httpOptions).pipe(
            tap((newData: any) => this.log(`added WordItems w/ id=${newData?.id}`)),
            catchError(this.handleError<any>('addHero'))
        );
    }
}
