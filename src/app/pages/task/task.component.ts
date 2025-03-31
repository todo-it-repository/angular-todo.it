import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { ScheduleFormComponent } from '../../components/schedule-form/schedule-form.component';

@Component({
    selector: 'app-task',
    imports: [DateRangeComponent, ScheduleFormComponent],
    templateUrl: './task.component.html',
    styleUrl: './task.component.css'
})
export class TaskComponent {
    @Input() title: string = 'Create new task';

    constructor(private router: Router) {}

    goBack() {
        this.router.navigate(['/home']);
    }

}
