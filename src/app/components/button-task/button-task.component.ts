import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-task',
  imports: [],
  templateUrl: './button-task.component.html'
})
export class ButtonTaskComponent {
    @Input() title: string = '';
    @Output("submit") onSumit = new EventEmitter();

    submit() {
        this.onSumit.emit();
    }
}
