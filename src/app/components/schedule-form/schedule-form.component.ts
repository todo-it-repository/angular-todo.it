import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-schedule-form',
    imports: [],
    templateUrl: './schedule-form.component.html',
    styleUrl: './schedule-form.component.css'
})
export class ScheduleFormComponent {
    @Input() placeholderName: string = '';
    @Input() placeholderDescription: string = '';
}
