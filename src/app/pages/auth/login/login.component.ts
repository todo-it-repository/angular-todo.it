import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DefaultLoginComponent } from '../../../components/default-login/default-login.component';
import { InputFormComponent } from '../../../components/input-form/input-form.component';
import { AuthService } from '../../../services/auth.service';

interface LoginForm {
    login: FormControl,
    password: FormControl
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
    DefaultLoginComponent,
    ReactiveFormsModule,
    InputFormComponent
],
    providers: [
        AuthService
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm!: FormGroup<LoginForm>;

    constructor(
        private router: Router,
        private authService: AuthService,
        private toastr: ToastrService
    ) {
        this.loginForm = new FormGroup({
            login: new FormControl('', [
                Validators.required,
                Validators.pattern(/^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9_-]{3,16})$/)
            ]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    submit() {
        this.authService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe({
            next: () => {
                this.toastr.success("Login successful");
                this.router.navigate(['home']);
            },
            error: () => this.toastr.error("Login failed, Please try again later")
        });
    }

    navigate() {
        this.router.navigate(['register']);
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
