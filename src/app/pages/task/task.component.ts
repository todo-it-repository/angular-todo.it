import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { ScheduleFormComponent } from '../../components/schedule-form/schedule-form.component';
import { TimeBoxComponent } from "../../components/time-box/time-box.component";

@Component({
    selector: 'app-task',
    imports: [
    DateRangeComponent,
    ScheduleFormComponent,
    TimeBoxComponent
],
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
