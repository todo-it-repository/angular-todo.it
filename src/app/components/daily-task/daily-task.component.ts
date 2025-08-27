import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-daily-task',
    imports: [CommonModule],
    templateUrl: './daily-task.component.html',
    styleUrl: './daily-task.component.css',
})
export class DailyTaskComponent implements OnChanges {
    @Input() tasks: Task[] = [];
    @Input() title: string = '';
    @Input() daily: string = '';
    @Input() progressDescription: string = '';

    completedTasks: number = 0;
    totalTasks: number = 0;
    progress: number = 0;

    constructor(private translate: TranslateService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['tasks']) {
            this.calculateProgress();
        }
    }

    calculateProgress(): void {
        this.totalTasks = this.tasks.length;
        this.completedTasks = this.tasks.filter(
            (task) => task.completed
        ).length;
        this.progress =
            this.totalTasks > 0
                ? Math.round((this.completedTasks / this.totalTasks) * 100)
                : 0;

        this.daily =
            this.completedTasks +
            '/' +
            this.totalTasks +
            this.translate.instant('components.dailyTasks.completed');

        if (this.progress === 100) {
            this.progressDescription = this.translate.instant(
                'components.dailyTasks.progress.allCompleted'
            );
        } else if (this.progress >= 75) {
            this.progressDescription = this.translate.instant(
                'components.dailyTasks.progress.almostDone'
            );
        } else if (this.progress >= 50) {
            this.progressDescription = this.translate.instant(
                'components.dailyTasks.progress.goodProgress'
            );
        } else if (this.progress > 0) {
            this.progressDescription = this.translate.instant(
                'components.dailyTasks.progress.justStarted'
            );
        } else {
            this.progressDescription = this.translate.instant(
                'components.dailyTasks.progress.noTasks'
            );
        }
    }
}
