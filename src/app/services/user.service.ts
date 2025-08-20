import { Injectable } from '@angular/core';
import { GetUser } from '../types/get-user.type';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    getUser(): Observable<GetUser> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.get<GetUser>(environment.API_URL + '/user/me', {
            headers,
        });
    }
}
