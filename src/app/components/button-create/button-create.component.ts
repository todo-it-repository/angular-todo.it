import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-button-create',
    imports: [],
    templateUrl: './button-create.component.html',
})
export class ButtonCreateComponent {
    @Output('navigate') onNavigate = new EventEmitter();

    navigate() {
        this.onNavigate.emit();
    }
}
