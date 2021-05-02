// reference: https://medium.com/swlh/everything-you-need-to-know-about-the-passport-jwt-passport-js-strategy-8b69f39014b0
import { Injectable } from '@angular/core';
//import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly tokenName: string = 'auth_token_';

    constructor() { }

    getToken() {
        return localStorage.getItem(this.tokenName);
    }

    setLocalStorage(responseObj: any) {

        // Adds the expiration time defined on the JWT to the current moment
        //const expiresAt = moment().add(Number.parseInt(responseObj.expiresIn), 'days');

        localStorage.setItem(this.tokenName, responseObj.token);
        //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem(this.tokenName);
        //localStorage.removeItem("expires_at");
    }
    /*
        public isLoggedIn() {
            return moment().isBefore(this.getExpiration(), "second");
        }
    
        isLoggedOut() {
            return !this.isLoggedIn();
        }
    
        getExpiration() {
            const expiration = localStorage.getItem("expires_at");
            if (expiration) {
                const expiresAt = JSON.parse(expiration);
                return moment(expiresAt);
            } else {
                return moment();
            }
        }
    */

}
