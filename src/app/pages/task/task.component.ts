import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ButtonTaskComponent } from '../../components/button-task/button-task.component';
import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { PriorityComponent } from '../../components/priority/priority.component';
import { ScheduleFormComponent } from '../../components/schedule-form/schedule-form.component';
import { TimeBoxComponent } from '../../components/time-box/time-box.component';
import { CreateTask } from '../../models/create-task';
import { DateTimeService } from '../../services/date-time.service';
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
    ReactiveFormsModule,
    ButtonTaskComponent
],
    templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
    taskForm: FormGroup<TaskForm>;
    @Input() title: string = 'Create new task';
    selectedPriority: InputPriorityTypes = 'LOW';
    selectedDate: Date = new Date();
    startTime: string = '';
    endTime: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private router: Router,
        private toastr: ToastrService,
        private dateTimeService: DateTimeService
    ) {
        this.taskForm = this.formBuilder.group({
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            startAt: new FormControl('', [Validators.required]),
            endAt: new FormControl('', [Validators.required]),
            priority: new FormControl('LOW', [Validators.required])
        });
    }

    ngOnInit() {
        const now = new Date();
        this.selectedDate = now;
        this.startTime = this.dateTimeService.formatTime(now);
        this.endTime = this.dateTimeService.addMinutes(now, 30);
        this.updateDateTime();
    }

    setPriority(priority: InputPriorityTypes): void {
        this.selectedPriority = priority;
        this.taskForm.patchValue({
            priority: priority
        });
    }

    onDateSelected(date: Date) {
        if (this.dateTimeService.isDateInPast(date)) {
            this.toastr.warning('Selected date cannot be in the past');
            this.selectedDate = new Date();
            return;
        }
        this.selectedDate = date;
        this.updateDateTime();
    }

    onDateTimeUpdate(dateTime: {startAt: string, endAt: string}) {
        this.taskForm.patchValue({
            startAt: dateTime.startAt,
            endAt: dateTime.endAt
        });
    }

    updateDateTime() {
        const startDate = this.dateTimeService.formatDateTime(this.selectedDate, this.startTime);
        const endDate = this.dateTimeService.formatDateTime(this.selectedDate, this.endTime);

        this.taskForm.patchValue({
            startAt: startDate,
            endAt: endDate
        });
    }

    goBack() {
        this.router.navigate(['/home']);
    }

    submit() {
        if (this.taskForm.invalid) {
            this.toastr.error('Please fill in all required fields');
            return;
        }

        const startDateTime = this.dateTimeService.createDateTime(
            this.selectedDate,
            this.startTime
        );

        if (startDateTime < new Date()) {
            this.toastr.error('Task cannot start before current date');
            return;
        }

        const task: CreateTask = {
            title: this.taskForm.get('title')?.value || '',
            description: this.taskForm.get('description')?.value || '',
            startAt: this.taskForm.get('startAt')?.value || '',
            endAt: this.taskForm.get('endAt')?.value || '',
            priority: this.taskForm.get('priority')?.value || 'LOW'
        };

        this.taskService.create(task).subscribe({
            next: () => {
                this.toastr.success('Task created successfully!');
                this.router.navigate(['/home']);
            },
            error: () => {
                this.toastr.error('Error creating task. Please try again.');
            }
        });
    }
}
