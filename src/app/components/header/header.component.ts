import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-header',
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Input() title: string = '';
    @Input() placeholder: string = '';
    isFocused: boolean = false;

    search() {
        console.log("pesquisado");
    }
    onFocus() {
        this.isFocused = true;
    }

    onBlur() {
        this.isFocused = false;
    }
}
