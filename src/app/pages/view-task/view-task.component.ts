import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ButtonDefaultComponent } from '../../components/button-default/button-default.component';
import { ButtonTaskComponent } from '../../components/button-task/button-task.component';
import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { PriorityComponent } from '../../components/priority/priority.component';
import { ScheduleFormComponent } from '../../components/schedule-form/schedule-form.component';
import { TimeBoxComponent } from '../../components/time-box/time-box.component';
import { DateTimeService } from '../../services/date-time.service';
import { TaskService } from '../../services/task.service';

interface TaskForm {
    id: FormControl,
    userId: FormControl,
    title: FormControl,
    description: FormControl,
    startAt: FormControl,
    endAt: FormControl,
    priority: FormControl
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
        ButtonDefaultComponent
    ],
    templateUrl: './view-task.component.html',
    styleUrl: './view-task.component.css'
})
export class ViewTaskComponent implements OnInit {
    taskForm!: FormGroup<TaskForm>;
    @Input() title: string = 'Create new task';
    selectedPriority: InputPriorityTypes = 'LOW';
    taskId: string = '';
    startTime: string = '';
    endTime: string = '';
    selectedDate: Date = new Date();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private taskService: TaskService,
        private toastr: ToastrService,
        private dateTimeService: DateTimeService
    ) {

    }

    ngOnInit() {
        this.taskForm = new FormGroup<TaskForm>({
            id: new FormControl('', { nonNullable: true }),
            userId: new FormControl('', { nonNullable: true }),
            title: new FormControl('', { nonNullable: true }),
            description: new FormControl('', { nonNullable: true }),
            startAt: new FormControl(new Date(), { nonNullable: true }),
            endAt: new FormControl(new Date(), { nonNullable: true }),
            priority: new FormControl('LOW' as InputPriorityTypes, { nonNullable: true })
        });
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.taskId = params['id'];
                this.loadTask();
            }
        });
    }


    goBack() {
        this.router.navigate(['/home']);
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
    }

    onDateTimeUpdate(dateTime: {startAt: string, endAt: string}) {
        this.taskForm.patchValue({
            startAt: dateTime.startAt,
            endAt: dateTime.endAt
        });
    }

    loadTask() {
        this.taskService.view(this.taskId).subscribe({
            next: (task) => {
                this.taskForm.patchValue({
                    title: task.title,
                    description: task.description,
                    startAt: task.startAt,
                    endAt: task.endAt,
                    priority: task.priority
                })
            }
        });
    }
}
