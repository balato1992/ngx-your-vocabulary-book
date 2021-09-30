import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { URL } from 'src/app/app.global-variable';
import { HandleService } from './handle.service';

import { Word } from '../../../../../common-code/models/word';

@Injectable({
    providedIn: 'root'
})
export class WordItemsService {

    constructor(
        private http: HttpClient,
        private handleService: HandleService) {
    }

    get(): Observable<any> {

        return this.http.get<any>(URL.API_WORDITEMS)
            .pipe(
                tap(_ => this.handleService.log('fetched WordItems')),
                catchError(this.handleService.handleError<any>('WordItems get'))
            );
    }

    post(data: Array<Word>): Observable<any> {

        return this.http.post<any>(URL.API_WORDITEMS, data, this.handleService.httpOptions).pipe(
            tap((newData: any) => this.handleService.log(`added WordItems w/ id=${newData?.id}`)),
            catchError(this.handleService.handleError<any>('addHero'))
        );
    }
}
