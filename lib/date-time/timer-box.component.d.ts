/**
 * timer-box.component
 */
import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
export declare class OwlTimerBoxComponent implements OnInit, OnDestroy {
    showDivider: boolean;
    upBtnAriaLabel: string;
    upBtnDisabled: boolean;
    downBtnAriaLabel: string;
    downBtnDisabled: boolean;
    /**
     * Value would be displayed in the box
     * If it is null, the box would display [value]
     */
    boxValue: number;
    value: number;
    min: number;
    max: number;
    step: number;
    inputLabel: string;
    valueChange: EventEmitter<number>;
    inputChange: EventEmitter<number>;
    private inputStream;
    private inputStreamSub;
    constructor();
    readonly displayValue: number;
    readonly owlDTTimerBoxClass: boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
    upBtnClicked(): void;
    downBtnClicked(): void;
    handleInputChange(value: string): void;
    handleWheelChange(event: WheelEvent): void;
    private updateValue;
    private updateValueViaInput;
}
