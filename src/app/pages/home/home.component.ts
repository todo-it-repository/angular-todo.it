import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonCreateComponent } from '../../components/button-create/button-create.component';
import { DailyTaskComponent } from '../../components/daily-task/daily-task.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-home',
    imports: [
    HeaderComponent,
    DailyTaskComponent,
    ButtonCreateComponent,
    CommonModule,
    TaskCardComponent
],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    todayTasks: Task[] = [];

    constructor(
        private router: Router,
        private taskService: TaskService
    ) {
    }

    ngOnInit(): void {
        this.loadTodayTasks();
    }

    navigate() {
        this.router.navigate(['task']);
    }

    loadTodayTasks() {
        this.taskService.list(0, 10).subscribe({
            next: (page)=> {
                this.todayTasks = page.content.slice(0, 3);
            }
        });
    }
}
