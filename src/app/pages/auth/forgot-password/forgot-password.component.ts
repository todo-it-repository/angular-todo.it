import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DefaultLoginComponent } from '../../../components/default-login/default-login.component';
import { InputFormComponent } from '../../../components/input-form/input-form.component';
import { AuthService } from '../../../services/auth.service';

interface ForgotPasswordForm {
    email: FormControl<string>;
}

@Component({
  selector: 'app-forgot-password',
  imports: [
    DefaultLoginComponent,
    ReactiveFormsModule,
    InputFormComponent
    ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
    forgotPasswordForm: FormGroup<ForgotPasswordForm>;

    constructor(
        private router: Router,
        private authService: AuthService,
        private toastr: ToastrService
    ) {
        this.forgotPasswordForm = new FormGroup({
            email: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required]
            })
        });
    }

    submit() {
        
    }

    goBack() {
        this.router.navigate(['login']);
    }
}
