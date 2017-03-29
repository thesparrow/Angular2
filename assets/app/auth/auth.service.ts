import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";
import { ErrorService } from '../errors/error.service';

@Injectable()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService) { }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'text/plain' 
                           /* , 'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                            'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token'*/});
        return this.http.post('https://git.heroku.com/angular2-message.git/user', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
				this.errorService.handleError(error.json()); 
				return Observable.throw(error.json());
			});
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'text/plain' });
        return this.http.post('https://git.heroku.com/angular2-message.git/user/signin', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
				this.errorService.handleError(error.json()); 
				return Observable.throw(error.json());
			});
    }

    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return (localStorage.getItem('token') !== null); 
    }

}