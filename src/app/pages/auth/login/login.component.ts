import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { DefaultLoginComponent } from '../../../components/default-login/default-login.component';
import { InputFormComponent } from '../../../components/input-form/input-form.component';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginForm {
    login: FormControl;
    password: FormControl;
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        DefaultLoginComponent,
        ReactiveFormsModule,
        InputFormComponent,
        TranslatePipe,
    ],
    providers: [AuthService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    loginForm!: FormGroup<LoginForm>;

    constructor(
        private router: Router,
        private authService: AuthService,
        private toast: MessageService,
        private translate: TranslateService
    ) {
        this.loginForm = new FormGroup({
            login: new FormControl('', [
                Validators.required,
                Validators.pattern(
                    /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9_-]{3,16})$/
                ),
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
            ]),
        });
    }

    submit() {
        this.authService
            .login(this.loginForm.value.login, this.loginForm.value.password)
            .subscribe({
                next: () => {
                    this.toast.add({
                        severity: 'success',
                        summary: this.translate.instant(
                            'toasts.login.success.summary'
                        ),
                        detail: this.translate.instant(
                            'toasts.login.success.details'
                        ),
                    });
                    this.router.navigate(['home']);
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 0) {
                        this.toast.add({
                            severity: 'error',
                            summary: this.translate.instant(
                                'toasts.serverDown.summary'
                            ),
                            detail: this.translate.instant(
                                'toasts.serverDown.details'
                            ),
                        });
                    } else {
                        this.toast.add({
                            severity: 'warn',
                            summary: this.translate.instant(
                                'toasts.login.error.summary'
                            ),
                            detail: this.translate.instant(
                                'toasts.login.error.details'
                            ),
                        });
                    }
                },
            });
    }

    navigate() {
        this.router.navigate(['register']);
    }

    navigateToForgotPassword() {
        this.router.navigate(['forgot-password']);
    }

    get isloginValid(): boolean {
        const login = this.loginForm.get('login')?.value;
        return this.isEmailValid(login) || this.isNicknameValid(login);
    }

    private isEmailValid(value: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    private isNicknameValid(value: string): boolean {
        return /^[a-zA-Z0-9_-]{3,16}$/.test(value);
    }
}
