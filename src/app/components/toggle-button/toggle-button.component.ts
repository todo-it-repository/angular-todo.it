import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-toggle-button',
    imports: [],
    templateUrl: './toggle-button.component.html',
    styleUrl: './toggle-button.component.css'
})
export class ToggleButtonComponent {
    @Input() isExpanded: boolean = false;
    @Input() offText: string = 'See All';
    @Input() onText: string = 'Show Less';
    @Output() toggle = new EventEmitter<boolean>();

    onToggle() {
        this.isExpanded = !this.isExpanded;
        this.toggle.emit(this.isExpanded);
    }
}
