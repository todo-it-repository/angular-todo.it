import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../services/user.service';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../../interfaces/user-response.interface';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';

interface UserForm {
    name: FormControl;
    login: FormControl;
    password: FormControl;
    confirmPassword: FormControl;
}

@Component({
    selector: 'user',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        TranslatePipe,
        DialogModule,
        RadioButtonModule,
        FormsModule,
    ],
    templateUrl: './user.component.html',
})
export class UserComponent {
    userForm!: FormGroup<UserForm>;
    user?: UserResponse;
    visible: boolean = false;

    languages: any[] = [];
    selectedLanguage: any = null;

    constructor(
        private router: Router,
        private toast: MessageService,
        private translate: TranslateService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.languages = [
            { name: this.translate.instant('language.manage.pt'), key: 'pt' },
            { name: this.translate.instant('language.manage.en'), key: 'en' },
        ];

        if (this.translate.getCurrentLang() === 'pt') {
            this.selectedLanguage = this.languages[0];
        } else {
            this.selectedLanguage = this.languages[1];
        }

        this.view();
    }

    showDialog() {
        this.visible = true;
    }

    changeLanguage(lang: string) {
        this.translate.use(lang);
        localStorage.setItem('lang', lang);
    }

    goBack() {
        this.router.navigate(['/home']);
    }

    editAccount() {
        this.router.navigate(['profile/edit']);
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
