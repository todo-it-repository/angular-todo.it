import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { LoginResponse } from '../types/login-response.type';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpClient: HttpClient) {}

    login(login: string, password: string) {
        return this.httpClient
            .post<LoginResponse>(environment.API_URL + '/auth/login', {
                login,
                password,
            })
            .pipe(
                tap((value) => {
                    sessionStorage.setItem('auth-token', value.token);
                    sessionStorage.setItem('login', value.login);
                })
            );
    }

    register(name: string, login: string, password: string) {
        return this.httpClient
            .post<LoginResponse>(environment.API_URL + '/auth/register', {
                name,
                login,
                password,
            })
            .pipe(
                tap((value) => {
                    sessionStorage.setItem('auth-token', value.token);
                    sessionStorage.setItem('login', value.login);
                })
            );
    }
}
