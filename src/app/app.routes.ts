import { Routes } from '@angular/router';

import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskComponent } from './pages/task/task.component';
import { UserComponent } from './pages/user/user.component';
import { ViewTaskComponent } from './pages/view-task/view-task.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'user/me',
        component: UserComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'task',
        component: TaskComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'task/:id',
        component: ViewTaskComponent,
        canActivate: [AuthGuard],
    },
];
