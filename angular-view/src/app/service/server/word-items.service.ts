import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { UrlService } from './url.service';
import { HandleService } from './handle.service';

import { Word } from '../../../../../common-code/models/word';

@Injectable({
    providedIn: 'root'
})
export class WordItemsService {

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        private handleService: HandleService) {
    }

    get(): Observable<any> {

        return this.http.get<any>(this.urlService.api_wordItems)
            .pipe(
                tap(_ => this.handleService.log('fetched WordItems')),
                catchError(this.handleService.handleError<any>('WordItems get'))
            );
    }

    post(data: Array<Word>): Observable<any> {

        return this.http.post<any>(this.urlService.api_wordItems, data, this.handleService.httpOptions).pipe(
            tap((newData: any) => this.handleService.log(`added WordItems w/ id=${newData?.id}`)),
            catchError(this.handleService.handleError<any>('addHero'))
        );
    }
}
