import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
        private authService: AuthService
    ) {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    submit() {
        this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
            next: () => console.log('Login successful'),
            error: () => console.log('Login failed')
        });
    }

    navigate() {
        this.router.navigate(['register']);
    }
}
