import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonRoundComponent } from '../button-round/button-round.component';

@Component({
    selector: 'app-header',
    imports: [CommonModule, ButtonRoundComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    @Input() title: string = '';
    @Input() placeholder: string = '';
    @Output() searchEvent = new EventEmitter<string>();
    @Output('navigate') onNavigate = new EventEmitter();

    isFocused: boolean = false;
    searchContent: string = '';

    constructor() {}

    search() {
        this.searchEvent.emit(this.searchContent);
    }

    onFocus() {
        this.isFocused = true;
    }

    onBlur() {
        this.isFocused = false;
    }

    navigate() {
        this.onNavigate.emit();
    }
}
