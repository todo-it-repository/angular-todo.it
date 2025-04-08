import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-time-box',
    imports: [
        FormsModule
    ],
    templateUrl: './time-box.component.html',
    styleUrl: './time-box.component.css'
})
export class TimeBoxComponent {
    @Input() titleStart: string = '';
    @Input() titleEnd: string = '';
    startTime: string = '';
    endTime: string = '';

    @Output() startTimeChange = new EventEmitter<string>();
    @Output() endTimeChange  = new EventEmitter<string>();

    constructor() {
        this.startTime = '09:00';
        this.endTime = '17:00';

        this.startTimeChange.emit(this.startTime);
        this.endTimeChange.emit(this.endTime);
    }

    onStartTimeChange() {
        this.startTimeChange.emit(this.startTime);
    }
    onEndTimeChange() {
        this.endTimeChange.emit(this.endTime);
    }
}
