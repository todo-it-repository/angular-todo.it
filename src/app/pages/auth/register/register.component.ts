import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DefaultLoginComponent } from '../../../components/default-login/default-login.component';
import { InputFormComponent } from '../../../components/input-form/input-form.component';
import { AuthService } from '../../../services/auth.service';

interface RegisterForm {
    name: FormControl,
    login: FormControl,
    password: FormControl,
    confirmPassword: FormControl
}


@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
    DefaultLoginComponent,
    ReactiveFormsModule,
    InputFormComponent
],
    providers: [
        AuthService
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm!: FormGroup<RegisterForm>;

    constructor(
        private router: Router,
        private authService: AuthService,
        private toastr: ToastrService
    ) {
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
            login: new FormControl('', [
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(/^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9_-]{3,16})$/)
            ]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    submit() {
        this.authService.login(this.registerForm.value.login, this.registerForm.value.password).subscribe({
            next: () => this.toastr.success("Login successful"),
            error: () => this.toastr.error("Login failed, Please try again later")
        });
    }

    navigate() {
        this.router.navigate(['login']);
    }

    get isUsernameValid(): boolean {
        const login = this.registerForm.get('login')?.value;
        return this.isEmailValid(login) || this.isNicknameValid(login);
      }

      private isEmailValid(value: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      private isNicknameValid(value: string): boolean {
        return /^[a-zA-Z0-9_-]{3,16}$/.test(value);
      }
}
