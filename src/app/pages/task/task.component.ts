import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { PriorityComponent } from '../../components/priority/priority.component';
import { ScheduleFormComponent } from '../../components/schedule-form/schedule-form.component';
import { TimeBoxComponent } from '../../components/time-box/time-box.component';
import { TaskService } from '../../services/task.service';

interface TaskForm {
    title: FormControl,
    description: FormControl,
    startAt: FormControl,
    endAt: FormControl,
    priority: FormControl
}

type InputPriorityTypes = 'LOW' | 'MEDIUM' | 'HIGH';

@Component({
    selector: 'app-task',
    imports: [
    DateRangeComponent,
    ScheduleFormComponent,
    TimeBoxComponent,
    PriorityComponent,
    ReactiveFormsModule
],
    templateUrl: './task.component.html',
    styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
    taskForm!: FormGroup<TaskForm>;
    @Input() title: string = 'Create new task';
    selectedPriority: InputPriorityTypes | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private router: Router,
        private toastr: ToastrService
    ) {
        this.taskForm = this.formBuilder.group({
            title: new FormControl(''),
            description: new FormControl(''),
            startAt: new FormControl(''),
            endAt: new FormControl(''),
            priority: new FormControl('')
        });
    }

    ngOnInit() {

    }

    setPriority(priority: InputPriorityTypes): void {
        this.selectedPriority = priority;
    }

    goBack() {
        this.router.navigate(['/home']);
    }
}
