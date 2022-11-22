/**
 * hour-input.component
 */
import { EventEmitter } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
export declare class OwlHourInputComponent {
    private pickerIntl;
    upBtnAriaLabel: string;
    upBtnDisabled: boolean;
    downBtnAriaLabel: string;
    downBtnDisabled: boolean;
    value: number;
    min: number;
    max: number;
    step: number;
    hour12Timer: boolean;
    valueChange: EventEmitter<number>;
    private isPM;
    constructor(pickerIntl: OwlDateTimeIntl);
    readonly hour12ButtonLabel: string;
    readonly owlHourInputClass: boolean;
    readonly hourValue: number;
    readonly boxValue: number;
    upBtnClicked(): void;
    downBtnClicked(): void;
    setHourValueViaInput(hours: number): void;
    setHourValue(hours: number): void;
    setMeridian(): void;
    private valueChanged;
}
