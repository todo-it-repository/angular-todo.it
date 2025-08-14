import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { DefaultLoginComponent } from '../../../components/default-login/default-login.component';
import { InputFormComponent } from '../../../components/input-form/input-form.component';
import { AuthService } from '../../../services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

interface ForgotPasswordForm {
    email: FormControl<string>;
}

@Component({
    selector: 'app-forgot-password',
    imports: [
        DefaultLoginComponent,
        ReactiveFormsModule,
        InputFormComponent,
        TranslatePipe,
    ],
    templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
    forgotPasswordForm: FormGroup<ForgotPasswordForm>;

    constructor(private router: Router, private authService: AuthService) {
        this.forgotPasswordForm = new FormGroup({
            email: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required],
            }),
        });
    }

    submit() {}

    goBack() {
        this.router.navigate(['login']);
    }
}
