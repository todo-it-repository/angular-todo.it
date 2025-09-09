import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserResponse } from '../interfaces/user-response.interface';
import { UserRequest } from '../interfaces/user-request.interface';

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

    updateUser(user: UserRequest): Observable<UserRequest> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.put<UserRequest>(environment.API_URL + '/user/me', {
            headers,
        });
    }

    deleteUser(): Observable<any> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.delete<any>(environment.API_URL + '/user/me', {
            headers,
        });
    }
}
