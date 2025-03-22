import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { LoginResponse } from '../types/login-response.type';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) {


    }

    login (username: string, password: string) {
        return this.httpClient.post<LoginResponse>('/login', {username, password}).pipe(tap((value) => {
            sessionStorage.setItem('auth-token', value.token);
            sessionStorage.setItem('username', value.username);
        }));
    }
}
