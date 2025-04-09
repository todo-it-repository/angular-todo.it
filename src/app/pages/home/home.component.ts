import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonCreateComponent } from '../../components/button-create/button-create.component';
import { DailyTaskComponent } from '../../components/daily-task/daily-task.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TodayTaskComponent } from '../../components/today-task/today-task.component';

@Component({
    selector: 'app-home',
    imports: [
    HeaderComponent,
    TodayTaskComponent,
    DailyTaskComponent,
    ButtonCreateComponent
],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

    constructor(private router: Router) {
    }

    navigate() {
        this.router.navigate(['task']);
    }
}
