import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

@Component({
    selector: 'app-task-card',
    imports: [
        CommonModule
    ],
    templateUrl: './task-card.component.html',
    styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
    @Input() title: string = '';
    @Input() date: Date = new Date();
    @Input() priority: TaskPriority = 'LOW';

    getPriorityColor(): string {
        switch (this.priority) {
            case 'LOW':
                return 'bg-pinklight';
            case 'MEDIUM':
                return 'bg-ocean';
            case 'HIGH':
                return 'bg-beige';
            default:
                return 'bg-pinklight';
        }
    }
}
