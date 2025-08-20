import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-user',
    imports: [],
    templateUrl: './user.component.html',
})
export class UserComponent {
    constructor(
        private messageService: MessageService,
        private router: Router
    ) {}

    goBack() {
        this.router.navigate(['/home']);
    }
}
