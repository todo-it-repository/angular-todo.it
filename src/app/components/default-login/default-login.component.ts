import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-default-login',
    imports: [TranslatePipe],
    templateUrl: './default-login.component.html',
    styleUrl: './default-login.component.css',
})
export class DefaultLoginComponent {
    @Input() title: string = '';
    @Input() primaryBtnText: string = '';
    @Input() secondaryBtnText: string = '';
    @Input() primaryBtnDisabled: boolean = true;
    @Output('submit') onSumit = new EventEmitter();
    @Output('navigate') onNavigate = new EventEmitter();

    submit() {
        this.onSumit.emit();
    }

    navigate() {
        this.onNavigate.emit();
    }
}
