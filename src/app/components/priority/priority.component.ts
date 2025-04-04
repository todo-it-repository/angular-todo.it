import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type InputPriorityTypes = 'LOW' | 'MEDIUM' | 'HIGH';

@Component({
    selector: 'app-priority',
    imports: [
        CommonModule
    ],
    templateUrl: './priority.component.html',
    styleUrl: './priority.component.css'
})
export class PriorityComponent {
    @Input() title: string = '';
    @Input() priority: InputPriorityTypes = 'LOW';
    @Input() isSelected: boolean = false;
    @Output() priorityChange = new EventEmitter<InputPriorityTypes>();

    getPriorityColor(): string {
        const baseColor = this.getBaseColor();
        return this.isSelected
            ? `${baseColor} bg-${baseColor.split('-')[1]} text-black`
            : `${baseColor} text-white`;
    }

    private getBaseColor(): string {
        switch (this.priority) {
            case 'LOW':
                return 'border-pinklight';
            case 'MEDIUM':
                return 'border-ocean';
            case 'HIGH':
                return 'border-beige';
            default:
                return 'border-pinklight';
        }
    }

    onClick(): void {
        this.priorityChange.emit(this.priority);
    }
}
