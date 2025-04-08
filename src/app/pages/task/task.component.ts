import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ButtonTaskComponent } from '../../components/button-task/button-task.component';
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
    ReactiveFormsModule,
    ButtonTaskComponent
],
    templateUrl: './task.component.html',
    styleUrl: './task.component.css'
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
        private toastr: ToastrService
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
        this.startTime = this.formatTime(now);
        this.endTime = this.addMinutes(now, 30);
        this.updateDateTime();
    }

    private formatTime(date: Date): string {
        return date.toTimeString().substring(0, 5);
    }

    private addMinutes(date: Date, minutes: number): string {
        const newDate = new Date(date);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        return this.formatTime(newDate);
    }

    setPriority(priority: InputPriorityTypes): void {
        this.selectedPriority = priority;
        this.taskForm.patchValue({
            priority: priority
        });
    }

    onStartTimeChange(time: string) {
        const currentDate = new Date();
        const selectedDateTime = this.createDateTime(this.selectedDate, time);

        if (selectedDateTime < currentDate) {
            this.toastr.warning('Start time cannot be in the past');
            this.startTime = this.formatTime(currentDate);
            return;
        }

        this.startTime = time;

        const endDateTime = this.createDateTime(this.selectedDate, this.endTime);
        if (selectedDateTime >= endDateTime) {
            this.endTime = this.addMinutes(selectedDateTime, 30);
        }

        this.updateDateTime();
    }

    onEndTimeChange(time: string) {
        const startDateTime = this.createDateTime(this.selectedDate, this.startTime);
        const endDateTime = this.createDateTime(this.selectedDate, time);

        if (endDateTime <= startDateTime) {
            this.toastr.warning('End time must be after start time');
            this.endTime = this.addMinutes(startDateTime, 30);
            return;
        }

        this.endTime = time;
        this.updateDateTime();
    }

    private createDateTime(date: Date, time: string): Date {
        const [hours, minutes] = time.split(':');
        const dateTime = new Date(date);
        dateTime.setHours(parseInt(hours), parseInt(minutes), 0);
        return dateTime;
    }

    onDateSelected(date: Date) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate < currentDate) {
            this.toastr.warning('Selected date cannot be in the past');
            this.selectedDate = currentDate;
            return;
        }

        this.selectedDate = date;
        this.updateDateTime();
    }

    formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    formatDateTime(date: Date, time: string): string {
        return `${this.formatDate(date)} ${time}`;
    }

    updateDateTime() {
        const startDate = this.formatDateTime(this.selectedDate, this.startTime);
        const endDate = this.formatDateTime(this.selectedDate, this.endTime);

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

        const currentDate = new Date();
        const startDateTime = this.createDateTime(
            this.selectedDate,
            this.startTime
        );

        if (startDateTime < currentDate) {
            this.toastr.error('Task cannot start before current date');
            return;
        }

        const task = {
            title: this.taskForm.get('title')?.value,
            description: this.taskForm.get('description')?.value,
            startAt: this.taskForm.get('startAt')?.value,
            endAt: this.taskForm.get('endAt')?.value,
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
