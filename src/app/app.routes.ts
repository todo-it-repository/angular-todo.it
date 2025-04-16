import { Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { TaskComponent } from './pages/task/task.component';
import { ViewTaskComponent } from './pages/view-task/view-task.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'task',
        component: TaskComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'view',
        component: ViewTaskComponent,
        canActivate: [AuthGuard]
    }
];
