import { Component, Input } from '@angular/core';
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
    startTime: string = '06:00';
    endTime: string = '09:00';
}
