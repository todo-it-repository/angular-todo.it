import { Component } from '@angular/core';

import { DailyTaskComponent } from '../../components/daily-task/daily-task.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TodayTaskComponent } from '../../components/today-task/today-task.component';

@Component({
    selector: 'app-home',
    imports: [
    HeaderComponent,
    TodayTaskComponent,
    DailyTaskComponent
],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

}
