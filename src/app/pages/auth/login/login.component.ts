import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DefaultLoginComponent } from '../../../components/default-login/default-login.component';
import { InputFormComponent } from "../../../components/input-form/input-form.component";


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
    DefaultLoginComponent,
    ReactiveFormsModule,
    InputFormComponent
],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm!: FormGroup;

    constructor() {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }
}
