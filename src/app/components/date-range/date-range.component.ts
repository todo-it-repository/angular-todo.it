import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-date-range',
    imports: [
        CommonModule
    ],
    templateUrl: './date-range.component.html',
    styleUrl: './date-range.component.css'
})
export class DateRangeComponent implements OnInit {
    currentDate = new Date();
    startDate!: Date;
    endDate!: Date;
    selectedDate!: string;
    weekDays: { name: string; day: number; date: string }[] = [];


    ngOnInit() {
        this.calendarWeek();
    }

    calendarWeek() {
        const startOfWeek = this.getStartOfWeek(this.currentDate);
        this.startDate = startOfWeek;
        this.endDate = new Date(startOfWeek);
        this.endDate.setDate(this.endDate.getDate() + 6);

        this.weekDays = Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(startOfWeek);
        date.setDate(date.getDate() + index);
        return {
            name: date.toLocaleDateString('en-US', { weekday: 'short' }),
            day: date.getDate(),
            date: date.toISOString().split('T')[0]
        };
        });

        this.selectedDate = this.weekDays[0].date;
    }

    getStartOfWeek(date: Date): Date {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    selectDate(date: string) {
        this.selectedDate = date;
    }

    previousWeek() {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
        this.calendarWeek();
    }

    nextWeek() {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
        this.calendarWeek();
    }
}
