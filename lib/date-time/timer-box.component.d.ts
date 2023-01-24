import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NumberFixedLenPipe } from './numberedFixLen.pipe';
import * as i0 from "@angular/core";
export declare class OwlTimerBoxComponent implements OnInit, OnDestroy {
    private readonly numberFixedLen;
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
    private stringValue;
    private editMode;
    constructor(numberFixedLen: NumberFixedLenPipe);
    get displayValue(): string;
    get owlDTTimerBoxClass(): boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
    upBtnClicked(): void;
    downBtnClicked(): void;
    handleInputChange(value: string): void;
    focusIn(): void;
    focusOut(value: string): void;
    handleWheelChange(event: WheelEvent): void;
    private updateValue;
    private updateValueViaInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlTimerBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlTimerBoxComponent, "owl-date-time-timer-box", ["owlDateTimeTimerBox"], { "showDivider": "showDivider"; "upBtnAriaLabel": "upBtnAriaLabel"; "upBtnDisabled": "upBtnDisabled"; "downBtnAriaLabel": "downBtnAriaLabel"; "downBtnDisabled": "downBtnDisabled"; "boxValue": "boxValue"; "value": "value"; "min": "min"; "max": "max"; "step": "step"; "inputLabel": "inputLabel"; }, { "valueChange": "valueChange"; "inputChange": "inputChange"; }, never, never, false>;
}
