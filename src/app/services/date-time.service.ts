import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DateTimeService {
    formatTime(date: Date): string {
        return date.toTimeString().substring(0, 5);
    }

    addMinutes(date: Date, minutes: number): string {
        const newDate = new Date(date);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        return this.formatTime(newDate);
    }

    createDateTime(date: Date, time: string): Date {
        const [hours, minutes] = time.split(':');
        const dateTime = new Date(date);
        dateTime.setHours(parseInt(hours), parseInt(minutes), 0);
        return dateTime;
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

    isDateInPast(date: Date): boolean {
        const cleanDate = new Date(date);
        cleanDate.setHours(0, 0, 0, 0);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        return cleanDate < currentDate;
    }

    isTimeInPast(time: string): boolean {
        const currentDate = new Date();
        const selectedDateTime = this.createDateTime(new Date(), time);
        return selectedDateTime < currentDate;
    }

    isEndTimeBeforeStart(
        startTime: string,
        endTime: string,
        date: Date
    ): boolean {
        const startDateTime = this.createDateTime(date, startTime);
        const endDateTime = this.createDateTime(date, endTime);
        return endDateTime <= startDateTime;
    }
}
