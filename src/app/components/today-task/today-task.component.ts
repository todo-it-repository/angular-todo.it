import { Component } from '@angular/core';

import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
    selector: 'app-today-task',
    imports: [TaskCardComponent],
    templateUrl: './today-task.component.html',
    styleUrl: './today-task.component.css'
})
export class TodayTaskComponent {

}
