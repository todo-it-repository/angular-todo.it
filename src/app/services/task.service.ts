import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateTask } from '../interfaces/create-task.interface';
import { Page } from '../interfaces/page.interface';
import { Task } from '../interfaces/task.interface';
import { ViewTask } from '../interfaces/view-task.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    constructor(private http: HttpClient) {}

    create(task: CreateTask): Observable<Task> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.post<Task>(environment.API_URL + '/tasks', task, {
            headers,
        });
    }

    list(page: number = 0, size: number = 10): Observable<Page<Task>> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.get<Page<Task>>(
            environment.API_URL + '/tasks?page=' + page + '&size=' + size,
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
            environment.API_URL + '/tasks/today?page=' + page + '&size=' + size,
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
            environment.API_URL +
                '/tasks/tomorrow?page=' +
                page +
                '&size=' +
                size,
            { headers }
        );
    }

    view(id: string): Observable<ViewTask> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.get<ViewTask>(environment.API_URL + '/tasks/' + id, {
            headers,
        });
    }

    update(id: string, task: ViewTask): Observable<ViewTask> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.put<ViewTask>(
            environment.API_URL + '/tasks/' + id,
            task,
            {
                headers,
            }
        );
    }

    updateTaskStatus(id: string, completed: boolean): Observable<ViewTask> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.put<ViewTask>(
            environment.API_URL + '/tasks/' + id,
            { completed },
            { headers }
        );
    }

    delete(id: string): Observable<any> {
        const token = sessionStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token,
        });

        return this.http.delete<any>(environment.API_URL + '/tasks/' + id, {
            headers,
        });
    }
}
