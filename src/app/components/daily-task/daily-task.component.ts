import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task';

@Component({
    selector: 'app-daily-task',
    imports: [
        CommonModule
    ],
    templateUrl: './daily-task.component.html',
    styleUrl: './daily-task.component.css'
})
export class DailyTaskComponent implements OnChanges{
    @Input() tasks: Task[] = [];
    @Input() title: string = '';
    @Input() daily: string = '';
    @Input() progressDescription: string = '';

    completedTasks: number = 0;
    totalTasks: number = 0;
    progress: number = 0;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['tasks']) {
            this.calculateProgress();
        }
    }

    calculateProgress(): void {
        this.totalTasks = this.tasks.length;
        this.completedTasks = this.tasks.filter(task => task.completed).length;
        this.progress = this.totalTasks > 0 ? Math.round((this.completedTasks / this.totalTasks) * 100) : 0;
        this.daily = this.completedTasks + "/" + this.totalTasks +  " Task Completed";

        if (this.progress === 100) {
            this.progressDescription = 'All tasks completed!';
        } else if (this.progress >= 75) {
            this.progressDescription = 'You are almost done, go ahead!';
        } else if (this.progress >= 50) {
            this.progressDescription = 'Good progress, keep going!';
        } else if (this.progress > 0) {
            this.progressDescription = 'Just getting started, you can do it!';
        } else {
            this.progressDescription = 'No tasks completed yet';
        }
    }
}
