import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonCreateComponent } from '../../components/button-create/button-create.component';
import { DailyTaskComponent } from '../../components/daily-task/daily-task.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { ToggleButtonComponent } from "../../components/toggle-button/toggle-button.component";

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
    todayTasks: Task[] = [];
    tomorrowTasks: Task[] = [];
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
    }

    navigate() {
        this.router.navigate(['task']);
    }

    loadTodayTasks() {
        this.taskService.listTodayTasks(0, 10).subscribe({
            next: (page)=> {
                this.todayTasks = page.content;
            },
            error: () => this.toastr.error("Failed to load today tasks. try again later"),
        });
    }

    loadTomorrowTasks() {
        this.taskService.listTomorrowTasks(0, 10).subscribe({
            next: (page)=> {
                this.tomorrowTasks = page.content;
            },
            error: () => this.toastr.error("Failed to load tomorrow tasks. try again later"),
        });
    }

    toggleShowAllTasks(isExpanded: boolean): void {
        this.showAllTodayTasks = isExpanded;
    }

    toggleShowAllTomorrowTasks(isExpanded: boolean): void {
        this.showAllTomorrowTasks = isExpanded;
    }
}
