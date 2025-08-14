import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonDefaultComponent } from '../../components/button-default/button-default.component';
import { ButtonTaskComponent } from '../../components/button-task/button-task.component';
import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { PriorityComponent } from '../../components/priority/priority.component';
import { ScheduleFormComponent } from '../../components/schedule-form/schedule-form.component';
import { TimeBoxComponent } from '../../components/time-box/time-box.component';
import { DateTimeService } from '../../services/date-time.service';
import { TaskService } from '../../services/task.service';
import { TranslatePipe } from '@ngx-translate/core';

interface TaskForm {
    id: FormControl;
    userId: FormControl;
    title: FormControl;
    description: FormControl;
    startAt: FormControl;
    endAt: FormControl;
    priority: FormControl;
}

type InputPriorityTypes = 'LOW' | 'MEDIUM' | 'HIGH';

@Component({
    selector: 'app-view-task',
    imports: [
        ReactiveFormsModule,
        PriorityComponent,
        TimeBoxComponent,
        ScheduleFormComponent,
        DateRangeComponent,
        ButtonTaskComponent,
        ButtonDefaultComponent,
        TranslatePipe,
    ],
    templateUrl: './view-task.component.html',
})
export class ViewTaskComponent implements OnInit {
    taskForm!: FormGroup<TaskForm>;
    @Input() title: string = '';
    selectedPriority: InputPriorityTypes = 'LOW';
    taskId: string = '';
    startTime: string = '';
    endTime: string = '';
    selectedDate: Date = new Date();
    @ViewChild(DateRangeComponent) dateRangeComponent!: DateRangeComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private taskService: TaskService,
        private dateTimeService: DateTimeService
    ) {}

    ngOnInit() {
        this.taskForm = new FormGroup<TaskForm>({
            id: new FormControl('', { nonNullable: true }),
            userId: new FormControl('', { nonNullable: true }),
            title: new FormControl('', { nonNullable: true }),
            description: new FormControl('', { nonNullable: true }),
            startAt: new FormControl(new Date(), { nonNullable: true }),
            endAt: new FormControl(new Date(), { nonNullable: true }),
            priority: new FormControl('LOW' as InputPriorityTypes, {
                nonNullable: true,
            }),
        });
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.taskId = params['id'];
                this.loadTask();
            }
        });
    }

    goBack() {
        this.router.navigate(['/home']);
    }

    updateTitle(taskTitle: string) {
        this.title = taskTitle;
    }

    setPriority(priority: InputPriorityTypes): void {
        this.selectedPriority = priority;
        this.taskForm.patchValue({
            priority: priority,
        });
    }

    onDateSelected(date: Date) {
        this.selectedDate = date;
        this.updateDateTime();
    }

    updateDateTime() {
        if (this.startTime && this.endTime) {
            const startDateTime = this.dateTimeService.formatDateTime(
                this.selectedDate,
                this.startTime
            );
            const endDateTime = this.dateTimeService.formatDateTime(
                this.selectedDate,
                this.endTime
            );

            this.taskForm.patchValue({
                startAt: startDateTime,
                endAt: endDateTime,
            });
        }
    }

    onDateTimeUpdate(dateTime: { startAt: string; endAt: string }) {
        this.taskForm.patchValue({
            startAt: dateTime.startAt,
            endAt: dateTime.endAt,
        });
    }

    loadTask() {
        this.taskService.view(this.taskId).subscribe({
            next: (task) => {
                const date = task.startAt.split(' ')[0];
                const dateParts = date.split('/');
                const day = parseInt(dateParts[0]);
                const month = parseInt(dateParts[1]) - 1;
                const year = parseInt(dateParts[2]);

                const taskDate = new Date(year, month, day);

                this.updateTitle(task.title);
                this.selectedDate = taskDate;
                this.startTime = task.startAt.split(' ')[1];
                this.endTime = task.endAt.split(' ')[1];
                this.selectedPriority = task.priority;

                this.updateDate(taskDate);

                this.taskForm.patchValue({
                    id: task.id,
                    userId: task.userId,
                    title: task.title,
                    description: task.description,
                    startAt: task.startAt,
                    endAt: task.endAt,
                    priority: task.priority,
                });
            },
            error: (error) => {},
        });
    }

    updateDate(date: Date) {
        setTimeout(() => {
            if (this.dateRangeComponent) {
                this.dateRangeComponent.calendarWeek(date);
                const dateString = date.toISOString().split('T')[0];
                this.dateRangeComponent.selectDate(dateString);
            }
        });
    }

    save() {
        const updatedTask = {
            id: this.taskForm.get('id')?.value,
            userId: this.taskForm.get('userId')?.value,
            title: this.taskForm.get('title')?.value,
            description: this.taskForm.get('description')?.value,
            startAt: this.taskForm.get('startAt')?.value,
            endAt: this.taskForm.get('endAt')?.value,
            priority: this.taskForm.get('priority')?.value,
        };

        this.taskService.update(this.taskId, updatedTask).subscribe({
            next: () => {
                this.router.navigate(['/home']);
            },
            error: (error) => {},
        });
    }

    delete() {
        this.taskService.delete(this.taskId).subscribe({
            next: () => {
                this.router.navigate(['/home']);
            },
            error: (error) => {},
        });
    }
}
