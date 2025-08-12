import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'app-schedule-form',
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './schedule-form.component.html'
})
export class ScheduleFormComponent {
    @Input() form!: FormGroup;
    @Input() placeholderName: string = '';
    @Input() placeholderDescription: string = '';
}
