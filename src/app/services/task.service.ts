import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../models/task';

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
            'Authorization': `Bearer ${token}`
        });

        return this.http.post<Task>(this.API_URL, task, { headers });
    }
}
