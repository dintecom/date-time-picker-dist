import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { Directive, EventEmitter, forwardRef, Inject, Input, Optional, Output, } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators, } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OWL_DATE_TIME_FORMATS } from '../adapter/date-time-format.class';
import * as i0 from "@angular/core";
import * as i1 from "../adapter/date-time-adapter.class";
export const OWL_DATETIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OwlDateTimeInputDirective),
    multi: true,
};
export const OWL_DATETIME_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => OwlDateTimeInputDirective),
    multi: true,
};
export class OwlDateTimeInputDirective {
    constructor(elmRef, renderer, dateTimeAdapter, dateTimeFormats) {
        this.elmRef = elmRef;
        this.renderer = renderer;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /** The minimum valid date. */
        this._min = this.dateTimeAdapter?.createDate(1, 0, 1, 0, 0, 0);
        /** The maximum valid date. */
        this._max = this.dateTimeAdapter?.createDate(3000, 11, 31, 23, 59, 59);
        /**
         * The picker's select mode
         */
        this._selectMode = 'single';
        /**
         * The character to separate the 'from' and 'to' in input value
         */
        this.rangeSeparator = '-';
        this._values = [];
        /**
         * Callback to invoke when `change` event is fired on this `<input>`
         */
        this.dateTimeChange = new EventEmitter();
        /**
         * Callback to invoke when an `input` event is fired on this `<input>`.
         */
        this.dateTimeInput = new EventEmitter();
        this.dtPickerSub = Subscription.EMPTY;
        this.localeSub = Subscription.EMPTY;
        this.lastValueValid = true;
        this.onModelChange = (date) => { };
        this.onModelTouched = () => { };
        this.validatorOnChange = () => { };
        /** The form control validator for whether the input parses. */
        this.parseValidator = () => {
            const value = this.elmRef.nativeElement.value;
            if (!value)
                return null;
            return this.lastValueValid ? null : { owlDateTimeParse: { text: value } };
        };
        /** The form control validator for the min date. */
        this.minValidator = (control) => {
            if (this.isInSingleMode) {
                const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
                return !this.min ||
                    !controlValue ||
                    this.dateTimeAdapter.compareDate(this.min, controlValue) <= 0
                    ? null
                    : { owlDateTimeMin: { min: this.min, actual: controlValue } };
            }
            else if (this.isInRangeMode && control.value) {
                const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
                const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
                return !this.min ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    this.dateTimeAdapter.compareDate(this.min, controlValueFrom) <= 0
                    ? null
                    : {
                        owlDateTimeMin: {
                            min: this.min,
                            actual: [controlValueFrom, controlValueTo],
                        },
                    };
            }
            return null;
        };
        /** The form control validator for the max date. */
        this.maxValidator = (control) => {
            if (this.isInSingleMode) {
                const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
                return !this.max ||
                    !controlValue ||
                    this.dateTimeAdapter.compareDate(this.max, controlValue) >= 0
                    ? null
                    : { owlDateTimeMax: { max: this.max, actual: controlValue } };
            }
            else if (this.isInRangeMode && control.value) {
                const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
                const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
                return !this.max ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    this.dateTimeAdapter.compareDate(this.max, controlValueTo) >= 0
                    ? null
                    : {
                        owlDateTimeMax: {
                            max: this.max,
                            actual: [controlValueFrom, controlValueTo],
                        },
                    };
            }
            return null;
        };
        /** The form control validator for the date filter. */
        this.filterValidator = (control) => {
            const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
            return !this._dateTimeFilter || !controlValue || this._dateTimeFilter(controlValue)
                ? null
                : { owlDateTimeFilter: true };
        };
        /**
         * The form control validator for the range.
         * Check whether the 'before' value is before the 'to' value
         */
        this.rangeValidator = (control) => {
            if (this.isInSingleMode || !control.value) {
                return null;
            }
            const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
            const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
            return !controlValueFrom ||
                !controlValueTo ||
                this.dateTimeAdapter.compareDate(controlValueFrom, controlValueTo) <= 0
                ? null
                : { owlDateTimeRange: true };
        };
        /** The combined form control validator for this input. */
        this.validator = Validators.compose([
            this.parseValidator,
            this.minValidator,
            this.maxValidator,
            this.filterValidator,
            this.rangeValidator,
        ]);
        /** Emits when the value changes (either due to user input or programmatic change). */
        this.valueChange = new EventEmitter();
        /** Emits when the disabled state has changed */
        this.disabledChange = new EventEmitter();
        if (!this.dateTimeAdapter) {
            throw Error(`OwlDateTimePicker: No provider found for DateTimePicker. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule or provide a ` +
                `custom implementation.`);
        }
        if (!this.dateTimeFormats) {
            throw Error(`OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule or provide a ` +
                `custom implementation.`);
        }
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(() => {
            this.value = this.value;
        });
    }
    /**
     * The date time picker that this input is associated with.
     */
    set owlDateTime(value) {
        this.registerDateTimePicker(value);
    }
    /**
     * A function to filter date time
     */
    set owlDateTimeFilter(filter) {
        this._dateTimeFilter = filter;
        this.validatorOnChange();
    }
    get dateTimeFilter() {
        return this._dateTimeFilter;
    }
    get disabled() {
        return !!this._disabled;
    }
    set disabled(value) {
        const newValue = coerceBooleanProperty(value);
        const element = this.elmRef.nativeElement;
        if (this._disabled !== newValue) {
            this._disabled = newValue;
            this.disabledChange.emit(newValue);
        }
        // We need to null check the `blur` method, because it's undefined during SSR.
        if (newValue && element.blur) {
            // Normally, native input elements automatically blur if they turn disabled. This behavior
            // is problematic, because it would mean that it triggers another change detection cycle,
            // which then causes a changed after checked error if the input element was focused before.
            element.blur();
        }
    }
    get min() {
        return this._min;
    }
    set min(value) {
        this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.validatorOnChange();
    }
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.validatorOnChange();
    }
    get selectMode() {
        return this._selectMode;
    }
    set selectMode(mode) {
        if (mode !== 'single' && mode !== 'range' && mode !== 'rangeFrom' && mode !== 'rangeTo') {
            throw Error('OwlDateTime Error: invalid selectMode value!');
        }
        this._selectMode = mode;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this.lastValueValid = !value || this.dateTimeAdapter.isValid(value);
        value = this.getValidDate(value);
        const oldDate = this._value;
        this._value = value;
        // set the input property 'value'
        this.formatNativeInputValue();
        // check if the input value changed
        if (!this.dateTimeAdapter.sameDate(oldDate, value)) {
            this.valueChange.emit(value);
        }
    }
    get values() {
        return this._values;
    }
    set values(values) {
        if (values && values.length > 0) {
            this._values = values.map(v => {
                v = this.dateTimeAdapter.deserialize(v);
                return this.getValidDate(v);
            });
            this.lastValueValid =
                (!this._values[0] || this.dateTimeAdapter.isValid(this._values[0])) &&
                    (!this._values[1] || this.dateTimeAdapter.isValid(this._values[1]));
        }
        else {
            this._values = [];
            this.lastValueValid = true;
        }
        // set the input property 'value'
        this.formatNativeInputValue();
        this.valueChange.emit(this._values);
    }
    get elementRef() {
        return this.elmRef;
    }
    get isInSingleMode() {
        return this._selectMode === 'single';
    }
    get isInRangeMode() {
        return (this._selectMode === 'range' ||
            this._selectMode === 'rangeFrom' ||
            this._selectMode === 'rangeTo');
    }
    get owlDateTimeInputAriaHaspopup() {
        return true;
    }
    get owlDateTimeInputAriaOwns() {
        return (this.dtPicker.opened && this.dtPicker.id) || null;
    }
    get minIso8601() {
        return this.min ? this.dateTimeAdapter.toIso8601(this.min) : null;
    }
    get maxIso8601() {
        return this.max ? this.dateTimeAdapter.toIso8601(this.max) : null;
    }
    get owlDateTimeInputDisabled() {
        return this.disabled;
    }
    ngOnInit() {
        if (!this.dtPicker) {
            throw Error(`OwlDateTimePicker: the picker input doesn't have any associated owl-date-time component`);
        }
    }
    ngAfterContentInit() {
        this.dtPickerSub = this.dtPicker.confirmSelectedChange.subscribe((selecteds) => {
            if (Array.isArray(selecteds)) {
                this.values = selecteds;
            }
            else {
                this.value = selecteds;
            }
            this.onModelChange(selecteds);
            this.onModelTouched();
            this.dateTimeChange.emit({
                source: this,
                value: selecteds,
                input: this.elmRef.nativeElement,
            });
            this.dateTimeInput.emit({
                source: this,
                value: selecteds,
                input: this.elmRef.nativeElement,
            });
        });
    }
    ngOnDestroy() {
        this.dtPickerSub.unsubscribe();
        this.localeSub.unsubscribe();
        this.valueChange.complete();
        this.disabledChange.complete();
    }
    writeValue(value) {
        if (this.isInSingleMode) {
            this.value = value;
        }
        else {
            this.values = value;
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    validate(c) {
        return this.validator ? this.validator(c) : null;
    }
    registerOnValidatorChange(fn) {
        this.validatorOnChange = fn;
    }
    /**
     * Open the picker when user hold alt + DOWN_ARROW
     */
    handleKeydownOnHost(event) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this.dtPicker.open();
            event.preventDefault();
        }
    }
    handleBlurOnHost(event) {
        this.onModelTouched();
    }
    handleInputOnHost(event) {
        const value = event.target.value;
        if (this._selectMode === 'single') {
            this.changeInputInSingleMode(value);
        }
        else if (this._selectMode === 'range') {
            this.changeInputInRangeMode(value);
        }
        else {
            this.changeInputInRangeFromToMode(value);
        }
        this.validatorOnChange();
    }
    handleChangeOnHost(event) {
        let v;
        if (this.isInSingleMode) {
            v = this.value;
        }
        else if (this.isInRangeMode) {
            v = this.values;
        }
        this.dateTimeChange.emit({
            source: this,
            value: v,
            input: this.elmRef.nativeElement,
        });
    }
    /**
     * Set the native input property 'value'
     */
    formatNativeInputValue() {
        if (this.isInSingleMode) {
            this.renderer.setProperty(this.elmRef.nativeElement, 'value', this._value ? this.dateTimeAdapter.format(this._value, this.dtPicker.formatString) : '');
        }
        else if (this.isInRangeMode) {
            if (this._values && this.values.length > 0) {
                const from = this._values[0];
                const to = this._values[1];
                const fromFormatted = from
                    ? this.dateTimeAdapter.format(from, this.dtPicker.formatString)
                    : '';
                const toFormatted = to ? this.dateTimeAdapter.format(to, this.dtPicker.formatString) : '';
                if (!fromFormatted && !toFormatted) {
                    this.renderer.setProperty(this.elmRef.nativeElement, 'value', null);
                }
                else {
                    if (this._selectMode === 'range') {
                        this.renderer.setProperty(this.elmRef.nativeElement, 'value', `${fromFormatted} ${this.rangeSeparator} ${toFormatted}`);
                    }
                    else if (this._selectMode === 'rangeFrom') {
                        this.renderer.setProperty(this.elmRef.nativeElement, 'value', fromFormatted);
                    }
                    else if (this._selectMode === 'rangeTo') {
                        this.renderer.setProperty(this.elmRef.nativeElement, 'value', toFormatted);
                    }
                }
            }
            else {
                this.renderer.setProperty(this.elmRef.nativeElement, 'value', '');
            }
        }
        return;
    }
    /**
     * Register the relationship between this input and its picker component
     */
    registerDateTimePicker(picker) {
        if (picker) {
            this.dtPicker = picker;
            this.dtPicker.registerInput(this);
        }
    }
    /**
     * Convert a given obj to a valid date object
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
    /**
     * Convert a time string to a date-time string
     * When pickerType is 'timer', the value in the picker's input is a time string.
     * The dateTimeAdapter parse fn could not parse a time string to a Date Object.
     * Therefore we need this fn to convert a time string to a date-time string.
     */
    convertTimeStringToDateTimeString(timeString, dateTime) {
        if (timeString) {
            const v = dateTime || this.dateTimeAdapter.now();
            const dateString = this.dateTimeAdapter.format(v, this.dateTimeFormats.display.dateInput);
            return dateString + ' ' + timeString;
        }
        else {
            return null;
        }
    }
    /**
     * Handle input change in single mode
     */
    changeInputInSingleMode(inputValue) {
        inputValue = (inputValue || '').trim();
        this.lastValueValid = this.dateTimeAdapter.isValidFormat(inputValue, this.dtPicker.formatString);
        let value = inputValue;
        if (this.dtPicker.pickerType === 'timer') {
            value = this.convertTimeStringToDateTimeString(value, this.value);
        }
        let result = this.dateTimeAdapter.parse(value, this.dateTimeFormats.parse.dateTimeInput);
        result = this.getValidDate(result);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        // result equals to null means there is input event, but the input value is invalid
        if (!this.dateTimeAdapter.sameDate(result, this._value) || result === null) {
            this._value = result;
            this.valueChange.emit(result);
            this.onModelChange(result);
            this.dateTimeInput.emit({
                source: this,
                value: result,
                input: this.elmRef.nativeElement,
            });
        }
    }
    /**
     * Handle input change in rangeFrom or rangeTo mode
     */
    changeInputInRangeFromToMode(inputValue) {
        inputValue = (inputValue || '').trim();
        this.lastValueValid = this.dateTimeAdapter.isValidFormat(inputValue, this.dtPicker.formatString);
        const originalValue = this._selectMode === 'rangeFrom' ? this._values[0] : this._values[1];
        if (this.dtPicker.pickerType === 'timer') {
            inputValue = this.convertTimeStringToDateTimeString(inputValue, originalValue);
        }
        let result = this.dateTimeAdapter.parse(inputValue, this.dateTimeFormats.parse.dateTimeInput);
        result = this.getValidDate(result);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        if ((this._selectMode === 'rangeFrom' &&
            this.dateTimeAdapter.sameDate(result, this._values[0]) &&
            result) ||
            (this._selectMode === 'rangeTo' &&
                this.dateTimeAdapter.sameDate(result, this._values[1]) &&
                result)) {
            return;
        }
        this._values =
            this._selectMode === 'rangeFrom' ? [result, this._values[1]] : [this._values[0], result];
        this.valueChange.emit(this._values);
        this.onModelChange(this._values);
        this.dateTimeInput.emit({
            source: this,
            value: this._values,
            input: this.elmRef.nativeElement,
        });
    }
    /**
     * Handle input change in range mode
     */
    changeInputInRangeMode(inputValue) {
        inputValue = (inputValue || '').trim();
        const selecteds = inputValue.split(this.rangeSeparator);
        let fromString = (selecteds[0] || '').trim();
        let toString = (selecteds[1] || '').trim();
        this.lastValueValid =
            this.dateTimeAdapter.isValidFormat(fromString, this.dtPicker.formatString) &&
                this.dateTimeAdapter.isValidFormat(toString, this.dtPicker.formatString);
        if (this.dtPicker.pickerType === 'timer') {
            fromString = this.convertTimeStringToDateTimeString(fromString, this.values[0]);
            toString = this.convertTimeStringToDateTimeString(toString, this.values[1]);
        }
        let from = this.dateTimeAdapter.parse(fromString, this.dateTimeFormats.parse.dateTimeInput);
        let to = this.dateTimeAdapter.parse(toString, this.dateTimeFormats.parse.dateTimeInput);
        from = this.getValidDate(from);
        to = this.getValidDate(to);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        if (!this.dateTimeAdapter.sameDate(from, this._values[0]) ||
            !this.dateTimeAdapter.sameDate(to, this._values[1]) ||
            (from === null && to === null)) {
            this._values = [from, to];
            this.valueChange.emit(this._values);
            this.onModelChange(this._values);
            this.dateTimeInput.emit({
                source: this,
                value: this._values,
                input: this.elmRef.nativeElement,
            });
        }
    }
}
OwlDateTimeInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeInputDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
OwlDateTimeInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.0", type: OwlDateTimeInputDirective, selector: "input[owlDateTime]", inputs: { owlDateTime: "owlDateTime", owlDateTimeFilter: "owlDateTimeFilter", _disabled: "_disabled", min: "min", max: "max", selectMode: "selectMode", rangeSeparator: "rangeSeparator", value: "value", values: "values" }, outputs: { dateTimeChange: "dateTimeChange", dateTimeInput: "dateTimeInput" }, host: { listeners: { "keydown": "handleKeydownOnHost($event)", "blur": "handleBlurOnHost($event)", "input": "handleInputOnHost($event)", "change": "handleChangeOnHost($event)" }, properties: { "attr.aria-haspopup": "owlDateTimeInputAriaHaspopup", "attr.aria-owns": "owlDateTimeInputAriaOwns", "attr.min": "minIso8601", "attr.max": "maxIso8601", "disabled": "owlDateTimeInputDisabled" } }, providers: [OWL_DATETIME_VALUE_ACCESSOR, OWL_DATETIME_VALIDATORS], exportAs: ["owlDateTimeInput"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[owlDateTime]',
                    exportAs: 'owlDateTimeInput',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        '(keydown)': 'handleKeydownOnHost($event)',
                        '(blur)': 'handleBlurOnHost($event)',
                        '(input)': 'handleInputOnHost($event)',
                        '(change)': 'handleChangeOnHost($event)',
                        '[attr.aria-haspopup]': 'owlDateTimeInputAriaHaspopup',
                        '[attr.aria-owns]': 'owlDateTimeInputAriaOwns',
                        '[attr.min]': 'minIso8601',
                        '[attr.max]': 'maxIso8601',
                        '[disabled]': 'owlDateTimeInputDisabled',
                    },
                    providers: [OWL_DATETIME_VALUE_ACCESSOR, OWL_DATETIME_VALIDATORS],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.DateTimeAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [OWL_DATE_TIME_FORMATS]
                }] }]; }, propDecorators: { owlDateTime: [{
                type: Input
            }], owlDateTimeFilter: [{
                type: Input
            }], _disabled: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], selectMode: [{
                type: Input
            }], rangeSeparator: [{
                type: Input
            }], value: [{
                type: Input
            }], values: [{
                type: Input
            }], dateTimeChange: [{
                type: Output
            }], dateTimeInput: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFFTCxTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFJakIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQyxPQUFPLEVBQXNCLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQUk5RixNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBUTtJQUM5QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMseUJBQXlCLENBQUM7SUFDeEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQVE7SUFDMUMsT0FBTyxFQUFFLGFBQWE7SUFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFtQkYsTUFBTSxPQUFPLHlCQUF5QjtJQXlUcEMsWUFDVSxNQUFrQixFQUNsQixRQUFtQixFQUNQLGVBQW1DLEVBRy9DLGVBQW1DO1FBTG5DLFdB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QUMxQixZQUFZLEVBQUUsMEJBQTBCO3FCQUN6QztvQkFDRCxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSx1QkFBdUIsQ0FBQztpQkFDbEU7OzBCQTZUSSxRQUFROzswQkFDUixRQUFROzswQkFDUixNQUFNOzJCQUFDLHFCQUFxQjs0Q0F2VDNCLFdBQVc7c0JBRGQsS0FBSztnQkFTRixpQkFBaUI7c0JBRHBCLEtBQUs7Z0JBYUUsU0FBUztzQkFEaEIsS0FBSztnQkEyQkYsR0FBRztzQkFETixLQUFLO2dCQWFGLEdBQUc7c0JBRE4sS0FBSztnQkFlRixVQUFVO3NCQURiLEtBQUs7Z0JBaUJOLGNBQWM7c0JBRGIsS0FBSztnQkFLRixLQUFLO3NCQURSLEtBQUs7Z0JBdUJGLE1BQU07c0JBRFQsS0FBSztnQkE2Qk4sY0FBYztzQkFEYixNQUFNO2dCQU9QLGFBQWE7c0JBRFosTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBET1dOX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFic3RyYWN0Q29udHJvbCxcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5HX1ZBTElEQVRPUlMsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBWYWxpZGF0aW9uRXJyb3JzLFxuICBWYWxpZGF0b3IsXG4gIFZhbGlkYXRvckZuLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4uL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVGb3JtYXRzLCBPV0xfREFURV9USU1FX0ZPUk1BVFMgfSBmcm9tICcuLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XG5cbmV4cG9ydCBjb25zdCBPV0xfREFURVRJTUVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBjb25zdCBPV0xfREFURVRJTUVfVkFMSURBVE9SUzogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlKSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtvd2xEYXRlVGltZV0nLFxuICBleHBvcnRBczogJ293bERhdGVUaW1lSW5wdXQnLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcbiAgaG9zdDoge1xuICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bk9uSG9zdCgkZXZlbnQpJyxcbiAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXJPbkhvc3QoJGV2ZW50KScsXG4gICAgJyhpbnB1dCknOiAnaGFuZGxlSW5wdXRPbkhvc3QoJGV2ZW50KScsXG4gICAgJyhjaGFuZ2UpJzogJ2hhbmRsZUNoYW5nZU9uSG9zdCgkZXZlbnQpJyxcbiAgICAnW2F0dHIuYXJpYS1oYXNwb3B1cF0nOiAnb3dsRGF0ZVRpbWVJbnB1dEFyaWFIYXNwb3B1cCcsXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnb3dsRGF0ZVRpbWVJbnB1dEFyaWFPd25zJyxcbiAgICAnW2F0dHIubWluXSc6ICdtaW5Jc284NjAxJyxcbiAgICAnW2F0dHIubWF4XSc6ICdtYXhJc284NjAxJyxcbiAgICAnW2Rpc2FibGVkXSc6ICdvd2xEYXRlVGltZUlucHV0RGlzYWJsZWQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtPV0xfREFURVRJTUVfVkFMVUVfQUNDRVNTT1IsIE9XTF9EQVRFVElNRV9WQUxJREFUT1JTXSxcbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZTxUPlxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yXG57XG4gIC8qKlxuICAgKiBUaGUgZGF0ZSB0aW1lIHBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG93bERhdGVUaW1lKHZhbHVlOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPikge1xuICAgIHRoaXMucmVnaXN0ZXJEYXRlVGltZVBpY2tlcih2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0byBmaWx0ZXIgZGF0ZSB0aW1lXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgb3dsRGF0ZVRpbWVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogVCB8IG51bGwpID0+IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kYXRlVGltZUZpbHRlciA9IGZpbHRlcjtcbiAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gIH1cblxuICBwcml2YXRlIF9kYXRlVGltZUZpbHRlcjogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuO1xuICBnZXQgZGF0ZVRpbWVGaWx0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVUaW1lRmlsdGVyO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGRhdGUgdGltZSBwaWNrZXIncyBpbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudDtcblxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmVtaXQobmV3VmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdG8gbnVsbCBjaGVjayB0aGUgYGJsdXJgIG1ldGhvZCwgYmVjYXVzZSBpdCdzIHVuZGVmaW5lZCBkdXJpbmcgU1NSLlxuICAgIGlmIChuZXdWYWx1ZSAmJiBlbGVtZW50LmJsdXIpIHtcbiAgICAgIC8vIE5vcm1hbGx5LCBuYXRpdmUgaW5wdXQgZWxlbWVudHMgYXV0b21hdGljYWxseSBibHVyIGlmIHRoZXkgdHVybiBkaXNhYmxlZC4gVGhpcyBiZWhhdmlvclxuICAgICAgLy8gaXMgcHJvYmxlbWF0aWMsIGJlY2F1c2UgaXQgd291bGQgbWVhbiB0aGF0IGl0IHRyaWdnZXJzIGFub3RoZXIgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSxcbiAgICAgIC8vIHdoaWNoIHRoZW4gY2F1c2VzIGEgY2hhbmdlZCBhZnRlciBjaGVja2VkIGVycm9yIGlmIHRoZSBpbnB1dCBlbGVtZW50IHdhcyBmb2N1c2VkIGJlZm9yZS5cbiAgICAgIGVsZW1lbnQuYmx1cigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgbWluaW11bSB2YWxpZCBkYXRlLiAqL1xuICBwcml2YXRlIF9taW46IFQgfCBudWxsID0gdGhpcy5kYXRlVGltZUFkYXB0ZXI/LmNyZWF0ZURhdGUoMSwgMCwgMSwgMCwgMCwgMCk7XG4gIEBJbnB1dCgpXG4gIGdldCBtaW4oKTogVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9taW47XG4gIH1cblxuICBzZXQgbWluKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgIHRoaXMuX21pbiA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICB9XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHZhbGlkIGRhdGUuICovXG4gIHByaXZhdGUgX21heDogVCB8IG51bGwgPSB0aGlzLmRhdGVUaW1lQWRhcHRlcj8uY3JlYXRlRGF0ZSgzMDAwLCAxMSwgMzEsIDIzLCA1OSwgNTkpO1xuICBASW5wdXQoKVxuICBnZXQgbWF4KCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xuICB9XG5cbiAgc2V0IG1heCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICB0aGlzLl9tYXggPSB0aGlzLmdldFZhbGlkRGF0ZSh0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcGlja2VyJ3Mgc2VsZWN0IG1vZGVcbiAgICovXG4gIHByaXZhdGUgX3NlbGVjdE1vZGU6IFNlbGVjdE1vZGUgPSAnc2luZ2xlJztcbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdE1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1vZGU7XG4gIH1cblxuICBzZXQgc2VsZWN0TW9kZShtb2RlOiBTZWxlY3RNb2RlKSB7XG4gICAgaWYgKG1vZGUgIT09ICdzaW5nbGUnICYmIG1vZGUgIT09ICdyYW5nZScgJiYgbW9kZSAhPT0gJ3JhbmdlRnJvbScgJiYgbW9kZSAhPT0gJ3JhbmdlVG8nKSB7XG4gICAgICB0aHJvdyBFcnJvcignT3dsRGF0ZVRpbWUgRXJyb3I6IGludmFsaWQgc2VsZWN0TW9kZSB2YWx1ZSEnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZWxlY3RNb2RlID0gbW9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY2hhcmFjdGVyIHRvIHNlcGFyYXRlIHRoZSAnZnJvbScgYW5kICd0bycgaW4gaW5wdXQgdmFsdWVcbiAgICovXG4gIEBJbnB1dCgpXG4gIHJhbmdlU2VwYXJhdG9yID0gJy0nO1xuXG4gIHByaXZhdGUgX3ZhbHVlOiBUIHwgbnVsbDtcbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gIXZhbHVlIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQodmFsdWUpO1xuICAgIHZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuICAgIGNvbnN0IG9sZERhdGUgPSB0aGlzLl92YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgLy8gc2V0IHRoZSBpbnB1dCBwcm9wZXJ0eSAndmFsdWUnXG4gICAgdGhpcy5mb3JtYXROYXRpdmVJbnB1dFZhbHVlKCk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGUgaW5wdXQgdmFsdWUgY2hhbmdlZFxuICAgIGlmICghdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2FtZURhdGUob2xkRGF0ZSwgdmFsdWUpKSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlczogVFtdID0gW107XG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlcztcbiAgfVxuXG4gIHNldCB2YWx1ZXModmFsdWVzOiBUW10pIHtcbiAgICBpZiAodmFsdWVzICYmIHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXMubWFwKHYgPT4ge1xuICAgICAgICB2ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodik7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkRGF0ZSh2KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9XG4gICAgICAgICghdGhpcy5fdmFsdWVzWzBdIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQodGhpcy5fdmFsdWVzWzBdKSkgJiZcbiAgICAgICAgKCF0aGlzLl92YWx1ZXNbMV0gfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZCh0aGlzLl92YWx1ZXNbMV0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdmFsdWVzID0gW107XG4gICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBzZXQgdGhlIGlucHV0IHByb3BlcnR5ICd2YWx1ZSdcbiAgICB0aGlzLmZvcm1hdE5hdGl2ZUlucHV0VmFsdWUoKTtcblxuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGBjaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZGF0ZVRpbWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKipcbiAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYW4gYGlucHV0YCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBkYXRlVGltZUlucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZ2V0IGVsZW1lbnRSZWYoKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuZWxtUmVmO1xuICB9XG5cbiAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcbiAgfVxuXG4gIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxuICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBUaGUgZGF0ZS10aW1lLXBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xuICBwdWJsaWMgZHRQaWNrZXI6IE93bERhdGVUaW1lQ29tcG9uZW50PFQ+O1xuXG4gIHByaXZhdGUgZHRQaWNrZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBsb2NhbGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIGxhc3RWYWx1ZVZhbGlkID0gdHJ1ZTtcblxuICBwcml2YXRlIG9uTW9kZWxDaGFuZ2UgPSAoZGF0ZTogVFtdIHwgVCkgPT4ge307XG4gIHByaXZhdGUgb25Nb2RlbFRvdWNoZWQgPSAoKSA9PiB7fTtcbiAgcHJpdmF0ZSB2YWxpZGF0b3JPbkNoYW5nZSA9ICgpID0+IHt9O1xuXG4gIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3Igd2hldGhlciB0aGUgaW5wdXQgcGFyc2VzLiAqL1xuICBwcml2YXRlIHBhcnNlVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9ICgpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIHRoaXMubGFzdFZhbHVlVmFsaWQgPyBudWxsIDogeyBvd2xEYXRlVGltZVBhcnNlOiB7IHRleHQ6IHZhbHVlIH0gfTtcbiAgfTtcblxuICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtaW4gZGF0ZS4gKi9cbiAgcHJpdmF0ZSBtaW5WYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUodGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuICAgICAgcmV0dXJuICF0aGlzLm1pbiB8fFxuICAgICAgICAhY29udHJvbFZhbHVlIHx8XG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKHRoaXMubWluLCBjb250cm9sVmFsdWUpIDw9IDBcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDogeyBvd2xEYXRlVGltZU1pbjogeyBtaW46IHRoaXMubWluLCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUgJiYgY29udHJvbC52YWx1ZSkge1xuICAgICAgY29uc3QgY29udHJvbFZhbHVlRnJvbSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzBdKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBjb250cm9sVmFsdWVUbyA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMV0pKTtcbiAgICAgIHJldHVybiAhdGhpcy5taW4gfHxcbiAgICAgICAgIWNvbnRyb2xWYWx1ZUZyb20gfHxcbiAgICAgICAgIWNvbnRyb2xWYWx1ZVRvIHx8XG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKHRoaXMubWluLCBjb250cm9sVmFsdWVGcm9tKSA8PSAwXG4gICAgICAgID8gbnVsbFxuICAgICAgICA6IHtcbiAgICAgICAgICAgIG93bERhdGVUaW1lTWluOiB7XG4gICAgICAgICAgICAgIG1pbjogdGhpcy5taW4sXG4gICAgICAgICAgICAgIGFjdHVhbDogW2NvbnRyb2xWYWx1ZUZyb20sIGNvbnRyb2xWYWx1ZVRvXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWF4IGRhdGUuICovXG4gIHByaXZhdGUgbWF4VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcbiAgICAgIHJldHVybiAhdGhpcy5tYXggfHxcbiAgICAgICAgIWNvbnRyb2xWYWx1ZSB8fFxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlRGF0ZSh0aGlzLm1heCwgY29udHJvbFZhbHVlKSA+PSAwXG4gICAgICAgID8gbnVsbFxuICAgICAgICA6IHsgb3dsRGF0ZVRpbWVNYXg6IHsgbWF4OiB0aGlzLm1heCwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlICYmIGNvbnRyb2wudmFsdWUpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZUZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVswXSksXG4gICAgICApO1xuICAgICAgY29uc3QgY29udHJvbFZhbHVlVG8gPSB0aGlzLmdldFZhbGlkRGF0ZSh0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzFdKSk7XG4gICAgICByZXR1cm4gIXRoaXMubWF4IHx8XG4gICAgICAgICFjb250cm9sVmFsdWVGcm9tIHx8XG4gICAgICAgICFjb250cm9sVmFsdWVUbyB8fFxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlRGF0ZSh0aGlzLm1heCwgY29udHJvbFZhbHVlVG8pID49IDBcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDoge1xuICAgICAgICAgICAgb3dsRGF0ZVRpbWVNYXg6IHtcbiAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heCxcbiAgICAgICAgICAgICAgYWN0dWFsOiBbY29udHJvbFZhbHVlRnJvbSwgY29udHJvbFZhbHVlVG9dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBkYXRlIGZpbHRlci4gKi9cbiAgcHJpdmF0ZSBmaWx0ZXJWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG4gICAgcmV0dXJuICF0aGlzLl9kYXRlVGltZUZpbHRlciB8fCAhY29udHJvbFZhbHVlIHx8IHRoaXMuX2RhdGVUaW1lRmlsdGVyKGNvbnRyb2xWYWx1ZSlcbiAgICAgID8gbnVsbFxuICAgICAgOiB7IG93bERhdGVUaW1lRmlsdGVyOiB0cnVlIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgcmFuZ2UuXG4gICAqIENoZWNrIHdoZXRoZXIgdGhlICdiZWZvcmUnIHZhbHVlIGlzIGJlZm9yZSB0aGUgJ3RvJyB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSByYW5nZVZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlIHx8ICFjb250cm9sLnZhbHVlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9sVmFsdWVGcm9tID0gdGhpcy5nZXRWYWxpZERhdGUodGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVswXSkpO1xuICAgIGNvbnN0IGNvbnRyb2xWYWx1ZVRvID0gdGhpcy5nZXRWYWxpZERhdGUodGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVsxXSkpO1xuXG4gICAgcmV0dXJuICFjb250cm9sVmFsdWVGcm9tIHx8XG4gICAgICAhY29udHJvbFZhbHVlVG8gfHxcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKGNvbnRyb2xWYWx1ZUZyb20sIGNvbnRyb2xWYWx1ZVRvKSA8PSAwXG4gICAgICA/IG51bGxcbiAgICAgIDogeyBvd2xEYXRlVGltZVJhbmdlOiB0cnVlIH07XG4gIH07XG5cbiAgLyoqIFRoZSBjb21iaW5lZCBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGlzIGlucHV0LiAqL1xuICBwcml2YXRlIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gfCBudWxsID0gVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICB0aGlzLnBhcnNlVmFsaWRhdG9yLFxuICAgIHRoaXMubWluVmFsaWRhdG9yLFxuICAgIHRoaXMubWF4VmFsaWRhdG9yLFxuICAgIHRoaXMuZmlsdGVyVmFsaWRhdG9yLFxuICAgIHRoaXMucmFuZ2VWYWxpZGF0b3IsXG4gIF0pO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzIChlaXRoZXIgZHVlIHRvIHVzZXIgaW5wdXQgb3IgcHJvZ3JhbW1hdGljIGNoYW5nZSkuICovXG4gIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUW10gfCBUIHwgbnVsbD4oKTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgZGlzYWJsZWQgc3RhdGUgaGFzIGNoYW5nZWQgKi9cbiAgZGlzYWJsZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgZ2V0IG93bERhdGVUaW1lSW5wdXRBcmlhSGFzcG9wdXAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXQgb3dsRGF0ZVRpbWVJbnB1dEFyaWFPd25zKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmR0UGlja2VyLm9wZW5lZCAmJiB0aGlzLmR0UGlja2VyLmlkKSB8fCBudWxsO1xuICB9XG5cbiAgZ2V0IG1pbklzbzg2MDEoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5taW4gPyB0aGlzLmRhdGVUaW1lQWRhcHRlci50b0lzbzg2MDEodGhpcy5taW4pIDogbnVsbDtcbiAgfVxuXG4gIGdldCBtYXhJc284NjAxKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWF4ID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIudG9Jc284NjAxKHRoaXMubWF4KSA6IG51bGw7XG4gIH1cblxuICBnZXQgb3dsRGF0ZVRpbWVJbnB1dERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbG1SZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcbiAgICBwcml2YXRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzLFxuICApIHtcbiAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgRGF0ZVRpbWVQaWNrZXIuIFlvdSBtdXN0IGltcG9ydCBvbmUgb2YgdGhlIGZvbGxvd2luZyBgICtcbiAgICAgICAgICBgbW9kdWxlcyBhdCB5b3VyIGFwcGxpY2F0aW9uIHJvb3Q6IE93bE5hdGl2ZURhdGVUaW1lTW9kdWxlIG9yIHByb3ZpZGUgYSBgICtcbiAgICAgICAgICBgY3VzdG9tIGltcGxlbWVudGF0aW9uLmAsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5kYXRlVGltZUZvcm1hdHMpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBPV0xfREFURV9USU1FX0ZPUk1BVFMuIFlvdSBtdXN0IGltcG9ydCBvbmUgb2YgdGhlIGZvbGxvd2luZyBgICtcbiAgICAgICAgICBgbW9kdWxlcyBhdCB5b3VyIGFwcGxpY2F0aW9uIHJvb3Q6IE93bE5hdGl2ZURhdGVUaW1lTW9kdWxlIG9yIHByb3ZpZGUgYSBgICtcbiAgICAgICAgICBgY3VzdG9tIGltcGxlbWVudGF0aW9uLmAsXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMubG9jYWxlU3ViID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIubG9jYWxlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmR0UGlja2VyKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiB0aGUgcGlja2VyIGlucHV0IGRvZXNuJ3QgaGF2ZSBhbnkgYXNzb2NpYXRlZCBvd2wtZGF0ZS10aW1lIGNvbXBvbmVudGAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kdFBpY2tlclN1YiA9IHRoaXMuZHRQaWNrZXIuY29uZmlybVNlbGVjdGVkQ2hhbmdlLnN1YnNjcmliZSgoc2VsZWN0ZWRzOiBUW10gfCBUKSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3RlZHMpKSB7XG4gICAgICAgIHRoaXMudmFsdWVzID0gc2VsZWN0ZWRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkcztcbiAgICAgIH1cblxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHNlbGVjdGVkcyk7XG4gICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICB0aGlzLmRhdGVUaW1lQ2hhbmdlLmVtaXQoe1xuICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgIHZhbHVlOiBzZWxlY3RlZHMsXG4gICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgfSk7XG4gICAgICB0aGlzLmRhdGVUaW1lSW5wdXQuZW1pdCh7XG4gICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgdmFsdWU6IHNlbGVjdGVkcyxcbiAgICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmR0UGlja2VyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5sb2NhbGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5kaXNhYmxlZENoYW5nZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWVzID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yID8gdGhpcy52YWxpZGF0b3IoYykgOiBudWxsO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKipcbiAgICogT3BlbiB0aGUgcGlja2VyIHdoZW4gdXNlciBob2xkIGFsdCArIERPV05fQVJST1dcbiAgICovXG4gIHB1YmxpYyBoYW5kbGVLZXlkb3duT25Ib3N0KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LmFsdEtleSAmJiBldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICB0aGlzLmR0UGlja2VyLm9wZW4oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhhbmRsZUJsdXJPbkhvc3QoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUlucHV0T25Ib3N0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgIHRoaXMuY2hhbmdlSW5wdXRJblNpbmdsZU1vZGUodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJykge1xuICAgICAgdGhpcy5jaGFuZ2VJbnB1dEluUmFuZ2VNb2RlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGFuZ2VJbnB1dEluUmFuZ2VGcm9tVG9Nb2RlKHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNoYW5nZU9uSG9zdChldmVudDogYW55KTogdm9pZCB7XG4gICAgbGV0IHY7XG4gICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgIHYgPSB0aGlzLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICB2ID0gdGhpcy52YWx1ZXM7XG4gICAgfVxuXG4gICAgdGhpcy5kYXRlVGltZUNoYW5nZS5lbWl0KHtcbiAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgIHZhbHVlOiB2LFxuICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBuYXRpdmUgaW5wdXQgcHJvcGVydHkgJ3ZhbHVlJ1xuICAgKi9cbiAgcHVibGljIGZvcm1hdE5hdGl2ZUlucHV0VmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICd2YWx1ZScsXG4gICAgICAgIHRoaXMuX3ZhbHVlID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KHRoaXMuX3ZhbHVlLCB0aGlzLmR0UGlja2VyLmZvcm1hdFN0cmluZykgOiAnJyxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgIGlmICh0aGlzLl92YWx1ZXMgJiYgdGhpcy52YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBmcm9tID0gdGhpcy5fdmFsdWVzWzBdO1xuICAgICAgICBjb25zdCB0byA9IHRoaXMuX3ZhbHVlc1sxXTtcblxuICAgICAgICBjb25zdCBmcm9tRm9ybWF0dGVkID0gZnJvbVxuICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KGZyb20sIHRoaXMuZHRQaWNrZXIuZm9ybWF0U3RyaW5nKVxuICAgICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IHRvRm9ybWF0dGVkID0gdG8gPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQodG8sIHRoaXMuZHRQaWNrZXIuZm9ybWF0U3RyaW5nKSA6ICcnO1xuXG4gICAgICAgIGlmICghZnJvbUZvcm1hdHRlZCAmJiAhdG9Gb3JtYXR0ZWQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2UnKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgICBgJHtmcm9tRm9ybWF0dGVkfSAke3RoaXMucmFuZ2VTZXBhcmF0b3J9ICR7dG9Gb3JtYXR0ZWR9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBmcm9tRm9ybWF0dGVkKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZVRvJykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB0b0Zvcm1hdHRlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsICcnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgdGhlIHJlbGF0aW9uc2hpcCBiZXR3ZWVuIHRoaXMgaW5wdXQgYW5kIGl0cyBwaWNrZXIgY29tcG9uZW50XG4gICAqL1xuICBwcml2YXRlIHJlZ2lzdGVyRGF0ZVRpbWVQaWNrZXIocGlja2VyOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPikge1xuICAgIGlmIChwaWNrZXIpIHtcbiAgICAgIHRoaXMuZHRQaWNrZXIgPSBwaWNrZXI7XG4gICAgICB0aGlzLmR0UGlja2VyLnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBnaXZlbiBvYmogdG8gYSB2YWxpZCBkYXRlIG9iamVjdFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChvYmopXG4gICAgICA/IG9ialxuICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSB0aW1lIHN0cmluZyB0byBhIGRhdGUtdGltZSBzdHJpbmdcbiAgICogV2hlbiBwaWNrZXJUeXBlIGlzICd0aW1lcicsIHRoZSB2YWx1ZSBpbiB0aGUgcGlja2VyJ3MgaW5wdXQgaXMgYSB0aW1lIHN0cmluZy5cbiAgICogVGhlIGRhdGVUaW1lQWRhcHRlciBwYXJzZSBmbiBjb3VsZCBub3QgcGFyc2UgYSB0aW1lIHN0cmluZyB0byBhIERhdGUgT2JqZWN0LlxuICAgKiBUaGVyZWZvcmUgd2UgbmVlZCB0aGlzIGZuIHRvIGNvbnZlcnQgYSB0aW1lIHN0cmluZyB0byBhIGRhdGUtdGltZSBzdHJpbmcuXG4gICAqL1xuICBwcml2YXRlIGNvbnZlcnRUaW1lU3RyaW5nVG9EYXRlVGltZVN0cmluZyh0aW1lU3RyaW5nOiBzdHJpbmcsIGRhdGVUaW1lOiBUKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKHRpbWVTdHJpbmcpIHtcbiAgICAgIGNvbnN0IHYgPSBkYXRlVGltZSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcbiAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQodiwgdGhpcy5kYXRlVGltZUZvcm1hdHMuZGlzcGxheS5kYXRlSW5wdXQpO1xuICAgICAgcmV0dXJuIGRhdGVTdHJpbmcgKyAnICcgKyB0aW1lU3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGlucHV0IGNoYW5nZSBpbiBzaW5nbGUgbW9kZVxuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VJbnB1dEluU2luZ2xlTW9kZShpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpbnB1dFZhbHVlID0gKGlucHV0VmFsdWUgfHwgJycpLnRyaW0oKTtcbiAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZEZvcm1hdChcbiAgICAgIGlucHV0VmFsdWUsXG4gICAgICB0aGlzLmR0UGlja2VyLmZvcm1hdFN0cmluZyxcbiAgICApO1xuXG4gICAgbGV0IHZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICBpZiAodGhpcy5kdFBpY2tlci5waWNrZXJUeXBlID09PSAndGltZXInKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKHZhbHVlLCB0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIucGFyc2UodmFsdWUsIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLnBhcnNlLmRhdGVUaW1lSW5wdXQpO1xuICAgIHJlc3VsdCA9IHRoaXMuZ2V0VmFsaWREYXRlKHJlc3VsdCk7XG5cbiAgICAvLyBpZiB0aGUgbmV3VmFsdWUgaXMgdGhlIHNhbWUgYXMgdGhlIG9sZFZhbHVlLCB3ZSBpbnRlbmQgdG8gbm90IGZpcmUgdGhlIHZhbHVlQ2hhbmdlIGV2ZW50XG4gICAgLy8gcmVzdWx0IGVxdWFscyB0byBudWxsIG1lYW5zIHRoZXJlIGlzIGlucHV0IGV2ZW50LCBidXQgdGhlIGlucHV0IHZhbHVlIGlzIGludmFsaWRcbiAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNhbWVEYXRlKHJlc3VsdCwgdGhpcy5fdmFsdWUpIHx8IHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmFsdWUgPSByZXN1bHQ7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQocmVzdWx0KTtcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZShyZXN1bHQpO1xuICAgICAgdGhpcy5kYXRlVGltZUlucHV0LmVtaXQoe1xuICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBpbnB1dCBjaGFuZ2UgaW4gcmFuZ2VGcm9tIG9yIHJhbmdlVG8gbW9kZVxuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VJbnB1dEluUmFuZ2VGcm9tVG9Nb2RlKGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlucHV0VmFsdWUgPSAoaW5wdXRWYWx1ZSB8fCAnJykudHJpbSgpO1xuICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkRm9ybWF0KFxuICAgICAgaW5wdXRWYWx1ZSxcbiAgICAgIHRoaXMuZHRQaWNrZXIuZm9ybWF0U3RyaW5nLFxuICAgICk7XG5cbiAgICBjb25zdCBvcmlnaW5hbFZhbHVlID0gdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgPyB0aGlzLl92YWx1ZXNbMF0gOiB0aGlzLl92YWx1ZXNbMV07XG5cbiAgICBpZiAodGhpcy5kdFBpY2tlci5waWNrZXJUeXBlID09PSAndGltZXInKSB7XG4gICAgICBpbnB1dFZhbHVlID0gdGhpcy5jb252ZXJ0VGltZVN0cmluZ1RvRGF0ZVRpbWVTdHJpbmcoaW5wdXRWYWx1ZSwgb3JpZ2luYWxWYWx1ZSk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKGlucHV0VmFsdWUsIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLnBhcnNlLmRhdGVUaW1lSW5wdXQpO1xuICAgIHJlc3VsdCA9IHRoaXMuZ2V0VmFsaWREYXRlKHJlc3VsdCk7XG5cbiAgICAvLyBpZiB0aGUgbmV3VmFsdWUgaXMgdGhlIHNhbWUgYXMgdGhlIG9sZFZhbHVlLCB3ZSBpbnRlbmQgdG8gbm90IGZpcmUgdGhlIHZhbHVlQ2hhbmdlIGV2ZW50XG4gICAgaWYgKFxuICAgICAgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nICYmXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNhbWVEYXRlKHJlc3VsdCwgdGhpcy5fdmFsdWVzWzBdKSAmJlxuICAgICAgICByZXN1bHQpIHx8XG4gICAgICAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nICYmXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNhbWVEYXRlKHJlc3VsdCwgdGhpcy5fdmFsdWVzWzFdKSAmJlxuICAgICAgICByZXN1bHQpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsdWVzID1cbiAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nID8gW3Jlc3VsdCwgdGhpcy5fdmFsdWVzWzFdXSA6IFt0aGlzLl92YWx1ZXNbMF0sIHJlc3VsdF07XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlcyk7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlcyk7XG4gICAgdGhpcy5kYXRlVGltZUlucHV0LmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgdmFsdWU6IHRoaXMuX3ZhbHVlcyxcbiAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBpbnB1dCBjaGFuZ2UgaW4gcmFuZ2UgbW9kZVxuICAgKi9cbiAgcHJpdmF0ZSBjaGFuZ2VJbnB1dEluUmFuZ2VNb2RlKGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlucHV0VmFsdWUgPSAoaW5wdXRWYWx1ZSB8fCAnJykudHJpbSgpO1xuICAgIGNvbnN0IHNlbGVjdGVkcyA9IGlucHV0VmFsdWUuc3BsaXQodGhpcy5yYW5nZVNlcGFyYXRvcik7XG4gICAgbGV0IGZyb21TdHJpbmcgPSAoc2VsZWN0ZWRzWzBdIHx8ICcnKS50cmltKCk7XG4gICAgbGV0IHRvU3RyaW5nID0gKHNlbGVjdGVkc1sxXSB8fCAnJykudHJpbSgpO1xuXG4gICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9XG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkRm9ybWF0KGZyb21TdHJpbmcsIHRoaXMuZHRQaWNrZXIuZm9ybWF0U3RyaW5nKSAmJlxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZEZvcm1hdCh0b1N0cmluZywgdGhpcy5kdFBpY2tlci5mb3JtYXRTdHJpbmcpO1xuXG4gICAgaWYgKHRoaXMuZHRQaWNrZXIucGlja2VyVHlwZSA9PT0gJ3RpbWVyJykge1xuICAgICAgZnJvbVN0cmluZyA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKGZyb21TdHJpbmcsIHRoaXMudmFsdWVzWzBdKTtcbiAgICAgIHRvU3RyaW5nID0gdGhpcy5jb252ZXJ0VGltZVN0cmluZ1RvRGF0ZVRpbWVTdHJpbmcodG9TdHJpbmcsIHRoaXMudmFsdWVzWzFdKTtcbiAgICB9XG5cbiAgICBsZXQgZnJvbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKGZyb21TdHJpbmcsIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLnBhcnNlLmRhdGVUaW1lSW5wdXQpO1xuICAgIGxldCB0byA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKHRvU3RyaW5nLCB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZS5kYXRlVGltZUlucHV0KTtcbiAgICBmcm9tID0gdGhpcy5nZXRWYWxpZERhdGUoZnJvbSk7XG4gICAgdG8gPSB0aGlzLmdldFZhbGlkRGF0ZSh0byk7XG5cbiAgICAvLyBpZiB0aGUgbmV3VmFsdWUgaXMgdGhlIHNhbWUgYXMgdGhlIG9sZFZhbHVlLCB3ZSBpbnRlbmQgdG8gbm90IGZpcmUgdGhlIHZhbHVlQ2hhbmdlIGV2ZW50XG4gICAgaWYgKFxuICAgICAgIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNhbWVEYXRlKGZyb20sIHRoaXMuX3ZhbHVlc1swXSkgfHxcbiAgICAgICF0aGlzLmRhdGVUaW1lQWRhcHRlci5zYW1lRGF0ZSh0bywgdGhpcy5fdmFsdWVzWzFdKSB8fFxuICAgICAgKGZyb20gPT09IG51bGwgJiYgdG8gPT09IG51bGwpXG4gICAgKSB7XG4gICAgICB0aGlzLl92YWx1ZXMgPSBbZnJvbSwgdG9dO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlcyk7XG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5fdmFsdWVzKTtcbiAgICAgIHRoaXMuZGF0ZVRpbWVJbnB1dC5lbWl0KHtcbiAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICB2YWx1ZTogdGhpcy5fdmFsdWVzLFxuICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19