import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-task-card',
    imports: [],
    templateUrl: './task-card.component.html',
    styleUrl: './task-card.component.css'
})
export class TaskCardComponent {

    @Input() title: string = 'Task Title Example';
    @Input() date: string = '4 Oct';
}
