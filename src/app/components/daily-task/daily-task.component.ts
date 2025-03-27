import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-daily-task',
    imports: [],
    templateUrl: './daily-task.component.html',
    styleUrl: './daily-task.component.css'
})
export class DailyTaskComponent {
    @Input() title: string = '';
    @Input() daily: string = '';
    @Input() progress: number = 100;
    @Input() progressDescription: string = '';
}
