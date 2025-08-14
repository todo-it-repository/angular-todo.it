import { Component, forwardRef, Input } from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';

type InputTypes = 'text' | 'password' | 'login';

@Component({
    selector: 'app-input-form',
    imports: [ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputFormComponent),
            multi: true,
        },
    ],
    templateUrl: './input-form.component.html',
})
export class InputFormComponent implements ControlValueAccessor {
    @Input() type: InputTypes = 'text';
    @Input() placeholder: string = '';
    @Input() label: string = '';
    @Input() inputName: string = '';

    value: string = '';
    onChange: any = () => {};
    onTouched: any = () => {};

    onInput(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        this.onChange(value);
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {}
}
