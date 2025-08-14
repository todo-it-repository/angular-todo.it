import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateTask } from '../interfaces/create-task';
import { Page } from '../interfaces/page';
import { Task } from '../interfaces/task';
import { ViewTask } from '../interfaces/view-task';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    API_URL: string = 'http://localhost:8080/tasks';

    constructor(private http: HttpClient) {}

    create(task: CreateTask): Observable<Task> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.post<Task>(this.API_URL, task, { headers });
    }

    list(page: number = 0, size: number = 10): Observable<Page<Task>> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.get<Page<Task>>(
            this.API_URL + '?page=' + page + '&size=' + size,
            { headers }
        );
    }

    listTodayTasks(
        page: number = 0,
        size: number = 10
    ): Observable<Page<Task>> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.get<Page<Task>>(
            this.API_URL + '/today?page=' + page + '&size=' + size,
            { headers }
        );
    }

    listTomorrowTasks(
        page: number = 0,
        size: number = 10
    ): Observable<Page<Task>> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.get<Page<Task>>(
            this.API_URL + '/tomorrow?page=' + page + '&size=' + size,
            { headers }
        );
    }

    view(id: string): Observable<ViewTask> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.get<ViewTask>(this.API_URL + '/' + id, { headers });
    }

    update(id: string, task: ViewTask): Observable<ViewTask> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.put<ViewTask>(this.API_URL + '/' + id, task, {
            headers,
        });
    }

    updateTaskStatus(id: string, completed: boolean): Observable<ViewTask> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.put<ViewTask>(
            this.API_URL + '/' + id,
            { completed },
            { headers }
        );
    }

    delete(id: string): Observable<any> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.delete<any>(this.API_URL + '/' + id, { headers });
    }
}
