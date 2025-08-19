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

interface RegisterForm {
    name: FormControl;
    login: FormControl;
    password: FormControl;
    confirmPassword: FormControl;
}

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        DefaultLoginComponent,
        ReactiveFormsModule,
        InputFormComponent,
        TranslatePipe,
    ],
    providers: [AuthService],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    registerForm!: FormGroup<RegisterForm>;

    constructor(
        private router: Router,
        private authService: AuthService,
        private toast: MessageService,
        private translate: TranslateService
    ) {
        this.registerForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100),
            ]),
            login: new FormControl('', [
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(
                    /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9_-]{3,16})$/
                ),
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
            ]),
            confirmPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
            ]),
        });
    }

    submit() {
        this.authService
            .register(
                this.registerForm.value.name,
                this.registerForm.value.login,
                this.registerForm.value.password
            )
            .subscribe({
                next: () => {
                    this.toast.add({
                        severity: 'success',
                        summary: this.translate.instant(
                            'toasts.register.success.summary'
                        ),
                        detail: this.translate.instant(
                            'toasts.register.success.details'
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
                                'toasts.register.error.summary'
                            ),
                            detail: this.translate.instant(
                                'toasts.register.error.details'
                            ),
                        });
                    }
                },
            });
    }

    navigate() {
        this.router.navigate(['login']);
    }
}
