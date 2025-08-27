import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserResponse } from '../interfaces/user-response.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    getUser(): Observable<UserResponse> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.get<UserResponse>(environment.API_URL + '/user/me', {
            headers,
        });
    }
}
