import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-date-range',
    imports: [
        CommonModule
    ],
    templateUrl: './date-range.component.html',
    styleUrl: './date-range.component.css'
})
export class DateRangeComponent implements OnInit {
    startDate!: Date;
    endDate!: Date;
    selectedDate!: string;
    weekDays: { name: string; day: number; date: string }[] = [];

    @Output() dateSelected = new EventEmitter<Date>();

    ngOnInit() {
        this.calendarWeek(new Date());
    }

    public calendarWeek(date: Date) {
        const startOfWeek = this.getStartOfWeek(new Date(date));
        this.startDate = startOfWeek;
        this.endDate = new Date(startOfWeek);
        this.endDate.setDate(this.endDate.getDate() + 6);

        this.weekDays = Array.from({ length: 7 }).map((_, index) => {
            const dayDate = new Date(startOfWeek);
            dayDate.setDate(dayDate.getDate() + index);
            return {
                name: dayDate.toLocaleDateString('en-US', { weekday: 'short' }),
                day: dayDate.getDate(),
                date: dayDate.toISOString().split('T')[0]
            };
        });

        const today = new Date().toISOString().split('T')[0];
        const dayInWeek = this.weekDays.find(day => day.date === today);

        if (dayInWeek) {
            this.selectedDate = today;
        } else {
            this.selectedDate = this.weekDays[0].date;
        }

        this.emitSelectedDate();
    }

    getStartOfWeek(date: Date): Date {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        const result = new Date(date);
        result.setDate(diff);
        return result;
    }

    public selectDate(date: string) {
        this.selectedDate = date;
        this.emitSelectedDate();
    }

    previousWeek() {
        const newDate = new Date(this.startDate);
        newDate.setDate(newDate.getDate() - 7);
        this.calendarWeek(newDate);
    }

    nextWeek() {
        const newDate = new Date(this.startDate);
        newDate.setDate(newDate.getDate() + 7);
        this.calendarWeek(newDate);
    }

    emitSelectedDate() {
        const date = new Date(this.selectedDate + 'T12:00:00');
        this.dateSelected.emit(date);
    }
}
