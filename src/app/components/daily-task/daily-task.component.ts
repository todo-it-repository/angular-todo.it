import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-daily-task',
    imports: [],
    templateUrl: './daily-task.component.html',
    styleUrl: './daily-task.component.css'
})
export class DailyTaskComponent {
    @Input() daily: string = '3/3 Task Completed';
    @Input() progress: number = 100;
}
