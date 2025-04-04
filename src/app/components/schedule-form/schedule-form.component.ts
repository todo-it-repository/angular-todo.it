import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-schedule-form',
    imports: [

    ],
    templateUrl: './schedule-form.component.html',
    styleUrl: './schedule-form.component.css'
})
export class ScheduleFormComponent {
    @Input() form!: FormGroup;
    @Input() placeholderName: string = '';
    @Input() placeholderDescription: string = '';
}
