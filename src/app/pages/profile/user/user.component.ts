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
import { ButtonTaskComponent } from '../../../components/button-task/button-task.component';
import { ButtonDefaultComponent } from '../../../components/button-default/button-default.component';

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
        ButtonTaskComponent,
        ButtonDefaultComponent,
    ],
    templateUrl: './user.component.html',
})
export class UserComponent {
    userForm!: FormGroup<UserForm>;
    user?: UserResponse;
    ModalLanguageIsVisible: boolean = false;
    ModalDeleteAccountIsVisible: boolean = false;

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

    showLanguageModal() {
        this.ModalLanguageIsVisible = true;
    }

    showDeleteModal() {
        this.ModalDeleteAccountIsVisible = true;
    }

    changeLanguage(lang: string) {
        this.selectedLanguage = this.languages.find((l) => l.key === lang);
    }

    confirmLanguageChange() {
        if (this.selectedLanguage) {
            this.translate.use(this.selectedLanguage.key);
            localStorage.setItem('lang', this.selectedLanguage.key);
            this.ModalLanguageIsVisible = false;
        }
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

    delete() {
        this.userService.deleteUser().subscribe({
            next: () => {
                this.toast.add({
                    severity: 'info',
                    summary: this.translate.instant(
                        'toasts.user.delete.success.summary'
                    ),
                    detail: this.translate.instant(
                        'toasts.user.delete.success.details'
                    ),
                });
                this.router.navigate(['/login']);
            },
            error: () => {
                this.toast.add({
                    severity: 'error',
                    summary: this.translate.instant(
                        'toasts.user.delete.error.summary'
                    ),
                    detail: this.translate.instant(
                        'toasts.user.delete.error.details'
                    ),
                });
            },
        });
    }
}
