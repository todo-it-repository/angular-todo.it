import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button-default',
    imports: [],
    templateUrl: './button-default.component.html',
})
export class ButtonDefaultComponent {
    @Input() title: string = '';
    @Output('submit') onSumit = new EventEmitter();

    submit() {
        this.onSumit.emit();
    }
}
