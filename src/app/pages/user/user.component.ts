import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../interfaces/user-response.interface';
import { RouterLink } from '@angular/router';

interface UserForm {
    name: FormControl;
    login: FormControl;
    password: FormControl;
    confirmPassword: FormControl;
}

@Component({
    selector: 'app-user',
    imports: [ReactiveFormsModule, CommonModule, RouterLink, TranslatePipe],
    templateUrl: './user.component.html',
})
export class UserComponent {
    userForm!: FormGroup<UserForm>;
    user?: UserResponse;

    constructor(
        private router: Router,
        private toast: MessageService,
        private translate: TranslateService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.view();
    }

    goBack() {
        this.router.navigate(['/home']);
    }

    view() {
        this.userService.getUser().subscribe({
            next: (data) => {
                this.user = data;
            },
            error: () => {
                console.log('usuario nao encontrado');
            },
        });
    }
}
