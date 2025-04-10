import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../models/task';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    API_URL: string = 'http://localhost:8080/tasks';

    constructor(private http: HttpClient){
    }

    create(task: Task): Observable<Task> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        return this.http.post<Task>(this.API_URL, task, { headers });
    }

    list(page: number = 0, size: number = 10): Observable<Page<Task>> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        return this.http.get<Page<Task>>(this.API_URL + '?page=' + page + '&size=' + size, { headers });
    }

    listTodayTasks(page: number = 0, size: number = 10): Observable<Page<Task>> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        return this.http.get<Page<Task>>(this.API_URL + '/today?page=' + page + '&size=' + size, { headers });
    }

    listTomorrowTasks(page: number = 0, size: number = 10): Observable<Page<Task>> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        return this.http.get<Page<Task>>(this.API_URL + '/tomorrow?page=' + page + '&size=' + size, { headers });
    }
}
