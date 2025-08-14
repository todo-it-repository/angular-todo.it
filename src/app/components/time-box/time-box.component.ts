import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeService } from '../../services/date-time.service';

@Component({
    selector: 'app-time-box',
    imports: [FormsModule],
    templateUrl: './time-box.component.html',
    styleUrl: './time-box.component.css',
})
export class TimeBoxComponent {
    @Input() titleStart: string = '';
    @Input() titleEnd: string = '';
    @Input() startTime: string = '';
    @Input() endTime: string = '';
    @Input() selectedDate: Date = new Date();

    @Output() startTimeChange = new EventEmitter<string>();
    @Output() endTimeChange = new EventEmitter<string>();
    @Output() dateTimeUpdate = new EventEmitter<{
        startAt: string;
        endAt: string;
    }>();

    constructor(private dateTimeService: DateTimeService) {}

    onStartTimeChange() {
        if (this.dateTimeService.isTimeInPast(this.startTime)) {
            this.startTime = this.dateTimeService.formatTime(new Date());
            return;
        }

        if (
            this.dateTimeService.isEndTimeBeforeStart(
                this.startTime,
                this.endTime,
                this.selectedDate
            )
        ) {
            this.endTime = this.dateTimeService.addMinutes(
                this.dateTimeService.createDateTime(
                    this.selectedDate,
                    this.startTime
                ),
                30
            );
        }

        this.updateDateTime();
        this.startTimeChange.emit(this.startTime);
    }

    onEndTimeChange() {
        if (
            this.dateTimeService.isEndTimeBeforeStart(
                this.startTime,
                this.endTime,
                this.selectedDate
            )
        ) {
            this.endTime = this.dateTimeService.addMinutes(
                this.dateTimeService.createDateTime(
                    this.selectedDate,
                    this.startTime
                ),
                30
            );
            return;
        }

        this.updateDateTime();
        this.endTimeChange.emit(this.endTime);
    }

    private updateDateTime() {
        const startDateTime = this.dateTimeService.formatDateTime(
            this.selectedDate,
            this.startTime
        );
        const endDateTime = this.dateTimeService.formatDateTime(
            this.selectedDate,
            this.endTime
        );

        this.dateTimeUpdate.emit({
            startAt: startDateTime,
            endAt: endDateTime,
        });
    }
}
