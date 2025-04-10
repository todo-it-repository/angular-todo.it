import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { LoginResponse } from '../types/login-response.type';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    API_URL: string = 'https://java-todolist-production.up.railway.app/auth';

    constructor(private httpClient: HttpClient) {


    }

    login(login: string, password: string) {
        return this.httpClient.post<LoginResponse>(this.API_URL + '/login', {login, password})
        .pipe(
            tap((value) => {
                sessionStorage.setItem('auth-token', value.token);
                sessionStorage.setItem('login', value.login);
            })
        );
    }

    register(name: string, login: string, password: string) {
        return this.httpClient.post<LoginResponse>(this.API_URL + '/register', {name, login, password})
        .pipe(
            tap((value) => {
                sessionStorage.setItem('auth-token', value.token);
                sessionStorage.setItem('login', value.login);
            })
        );
    }
}
