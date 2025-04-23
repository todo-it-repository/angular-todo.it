import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ButtonCreateComponent } from '../../components/button-create/button-create.component';
import { DailyTaskComponent } from '../../components/daily-task/daily-task.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { ToggleButtonComponent } from '../../components/toggle-button/toggle-button.component';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { ViewTask } from './../../models/view-task';

@Component({
    selector: 'app-home',
    imports: [
        HeaderComponent,
        DailyTaskComponent,
        ButtonCreateComponent,
        CommonModule,
        TaskCardComponent,
        ToggleButtonComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    allTasks: Task[] = [];
    todayTasks: Task[] = [];
    tomorrowTasks: Task[] = [];
    showAllTasks: boolean = false;
    showAllTodayTasks: boolean = false;
    showAllTomorrowTasks: boolean = false;

    constructor(
        private router: Router,
        private taskService: TaskService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.loadTodayTasks();
        this.loadTomorrowTasks();
        this.listAllTasks();
    }

    navigate() {
        this.router.navigate(['task']);
    }

    navigateToTask(taskId: string) {
        this.router.navigate(['task', taskId]);
    }

    loadTodayTasks() {
        this.taskService.listTodayTasks(0, 10).subscribe({
            next: (page)=> {
                this.todayTasks = page.content;
            },
            error: () => {
                this.toastr.error("Failed to load today tasks. try again later");
            }
        });
    }

    loadTomorrowTasks() {
        this.taskService.listTomorrowTasks(0, 10).subscribe({
            next: (page)=> {
                this.tomorrowTasks = page.content;
            },
            error: () => {
                this.toastr.error("Failed to load tomorrow tasks. try again later");
            }
        });
    }

    listAllTasks() {
        this.taskService.list(0, 15).subscribe({
            next: (page)=> {
                this.allTasks = page.content;
            },
            error: () => {
                this.toastr.error("Failed to load all tasks. try again later");
            }
        });
    }

    toggleShowAllTasksToday(isExpanded: boolean): void {
        this.showAllTodayTasks = isExpanded;
    }

    toggleShowAllTomorrowTasks(isExpanded: boolean): void {
        this.showAllTomorrowTasks = isExpanded;
    }

    toggleListAllTasks(isExpanded: boolean): void {
        this.showAllTasks = isExpanded;
    }
}
