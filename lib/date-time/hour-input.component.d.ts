/**
 * hour-input.component
 */
import { EventEmitter } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { ControlValueAccessor } from '@angular/forms';
export declare class OwlHourInputComponent implements ControlValueAccessor {
    private pickerIntl;
    upBtnAriaLabel: string;
    downBtnAriaLabel: string;
    private _value;
    value: number;
    min: number;
    max: number;
    step: number;
    hour12Timer: boolean;
    disabled: boolean;
    valueChange: EventEmitter<number>;
    private isPM;
    constructor(pickerIntl: OwlDateTimeIntl);
    readonly hour12ButtonLabel: string;
    readonly owlHourInputClass: boolean;
    readonly hourValue: number;
    readonly boxValue: number;
    upBtnClicked(): void;
    downBtnClicked(): void;
    setValueViaInput(hours: number): void;
    setValue(hours: number): void;
    setMeridian(): void;
    private valueChanged;
    onChange: any;
    onTouch: any;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
