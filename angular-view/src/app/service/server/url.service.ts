import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UrlService {
    //readonly baseUrl: string;
    readonly base: string;
    readonly auth_profile: string;
    readonly auth_google: string;
    
    readonly api_wordItems: string;

    constructor() {
        //this.baseUrl = window.location.origin + '/';
        this.base = '/';
        this.auth_profile = 'auth/profile';
        this.auth_google = 'auth/google';
        this.api_wordItems = 'api/word-items';
    }

}
