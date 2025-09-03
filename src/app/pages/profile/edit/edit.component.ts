import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../../../services/user.service';
import { InputFormComponent } from '../../../components/input-form/input-form.component';

@Component({
    selector: 'edit',
    imports: [CommonModule, TranslatePipe, InputFormComponent],
    templateUrl: './edit.component.html',
})
export class EditComponent {
    constructor(private router: Router, private userService: UserService) {}

    goBack() {
        this.router.navigate(['/profile']);
    }
}
