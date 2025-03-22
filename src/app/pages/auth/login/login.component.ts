import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DefaultLoginComponent } from '../../../components/default-login/default-login.component';
import { InputFormComponent } from '../../../components/input-form/input-form.component';
import { AuthService } from '../../../services/auth.service';


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
    loginForm!: FormGroup;

    constructor(
        private router: Router,
        private authService: AuthService,
        private toastr: ToastrService
    ) {
        this.loginForm = new FormGroup({
            username: new FormControl('', [
                Validators.required,
                Validators.pattern(/^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9_-]{3,16})$/)
            ]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    submit() {
        this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
            next: () => this.toastr.success("Login successful"),
            error: () => this.toastr.error("Login failed, Please try again later")
        });
    }

    navigate() {
        this.router.navigate(['register']);
    }

    get isUsernameValid(): boolean {
        const username = this.loginForm.get('username')?.value;
        return this.isEmailValid(username) || this.isNicknameValid(username);
      }

      private isEmailValid(value: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      private isNicknameValid(value: string): boolean {
        return /^[a-zA-Z0-9_-]{3,16}$/.test(value);
      }
}
