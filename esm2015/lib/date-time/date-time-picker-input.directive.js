/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker-input.directive
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { OwlDateTimeComponent } from './date-time-picker.component';
/** @type {?} */
export const OWL_DATETIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => OwlDateTimeInputDirective)),
    multi: true
};
/** @type {?} */
export const OWL_DATETIME_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => OwlDateTimeInputDirective)),
    multi: true
};
/**
 * @template T
 */
export class OwlDateTimeInputDirective {
    /**
     * @param {?} elmRef
     * @param {?} renderer
     * @param {?} dateTimeAdapter
     * @param {?} dateTimeFormats
     */
    constructor(elmRef, renderer, dateTimeAdapter, dateTimeFormats) {
        this.elmRef = elmRef;
        this.renderer = renderer;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
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
        this.onModelChange = (/**
         * @param {?} date
         * @return {?}
         */
        (date) => { });
        this.onModelTouched = (/**
         * @return {?}
         */
        () => { });
        this.validatorOnChange = (/**
         * @return {?}
         */
        () => { });
        /**
         * The form control validator for whether the input parses.
         */
        this.parseValidator = (/**
         * @return {?}
         */
        () => {
            return this.lastValueValid
                ? null
                : { owlDateTimeParse: { text: this.elmRef.nativeElement.value } };
        });
        /**
         * The form control validator for the min date.
         */
        this.minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            if (this.isInSingleMode) {
                /** @type {?} */
                const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
                return !this.min ||
                    !controlValue ||
                    this.dateTimeAdapter.compare(this.min, controlValue) <= 0
                    ? null
                    : { owlDateTimeMin: { min: this.min, actual: controlValue } };
            }
            else if (this.isInRangeMode && control.value) {
                /** @type {?} */
                const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
                /** @type {?} */
                const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
                return !this.min ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    this.dateTimeAdapter.compare(this.min, controlValueFrom) <= 0
                    ? null
                    : {
                        owlDateTimeMin: {
                            min: this.min,
                            actual: [controlValueFrom, controlValueTo]
                        }
                    };
            }
        });
        /**
         * The form control validator for the max date.
         */
        this.maxValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            if (this.isInSingleMode) {
                /** @type {?} */
                const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
                return !this.max ||
                    !controlValue ||
                    this.dateTimeAdapter.compare(this.max, controlValue) >= 0
                    ? null
                    : { owlDateTimeMax: { max: this.max, actual: controlValue } };
            }
            else if (this.isInRangeMode && control.value) {
                /** @type {?} */
                const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
                /** @type {?} */
                const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
                return !this.max ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    this.dateTimeAdapter.compare(this.max, controlValueTo) >= 0
                    ? null
                    : {
                        owlDateTimeMax: {
                            max: this.max,
                            actual: [controlValueFrom, controlValueTo]
                        }
                    };
            }
        });
        /**
         * The form control validator for the date filter.
         */
        this.filterValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
            return !this._dateTimeFilter ||
                !controlValue ||
                this._dateTimeFilter(controlValue)
                ? null
                : { owlDateTimeFilter: true };
        });
        /**
         * The form control validator for the range.
         * Check whether the 'before' value is before the 'to' value
         */
        this.rangeValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            if (this.isInSingleMode || !control.value) {
                return null;
            }
            /** @type {?} */
            const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
            /** @type {?} */
            const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
            return !controlValueFrom ||
                !controlValueTo ||
                this.dateTimeAdapter.compare(controlValueFrom, controlValueTo) <= 0
                ? null
                : { owlDateTimeRange: true };
        });
        /**
         * The combined form control validator for this input.
         */
        this.validator = Validators.compose([
            this.parseValidator,
            this.minValidator,
            this.maxValidator,
            this.filterValidator,
            this.rangeValidator
        ]);
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         */
        this.valueChange = new EventEmitter();
        /**
         * Emits when the disabled state has changed
         */
        this.disabledChange = new EventEmitter();
        if (!this.dateTimeAdapter) {
            throw Error(`OwlDateTimePicker: No provider found for DateTimePicker. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        if (!this.dateTimeFormats) {
            throw Error(`OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this.value = this.value;
        }));
    }
    /**
     * The date time picker that this input is associated with.
     * @param {?} value
     * @return {?}
     */
    set owlDateTime(value) {
        this.registerDateTimePicker(value);
    }
    /**
     * A function to filter date time
     * @param {?} filter
     * @return {?}
     */
    set owlDateTimeFilter(filter) {
        this._dateTimeFilter = filter;
        this.validatorOnChange();
    }
    /**
     * @return {?}
     */
    get dateTimeFilter() {
        return this._dateTimeFilter;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = coerceBooleanProperty(value);
        /** @type {?} */
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
    /**
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.validatorOnChange();
    }
    /**
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.validatorOnChange();
    }
    /**
     * @return {?}
     */
    get selectMode() {
        return this._selectMode;
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    set selectMode(mode) {
        if (mode !== 'single' &&
            mode !== 'range' &&
            mode !== 'rangeFrom' &&
            mode !== 'rangeTo') {
            throw Error('OwlDateTime Error: invalid selectMode value!');
        }
        this._selectMode = mode;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this.lastValueValid = !value || this.dateTimeAdapter.isValid(value);
        value = this.getValidDate(value);
        /** @type {?} */
        const oldDate = this._value;
        this._value = value;
        // set the input property 'value'
        this.formatNativeInputValue();
        // check if the input value changed
        if (!this.dateTimeAdapter.isEqual(oldDate, value)) {
            this.valueChange.emit(value);
        }
    }
    /**
     * @return {?}
     */
    get values() {
        return this._values;
    }
    /**
     * @param {?} values
     * @return {?}
     */
    set values(values) {
        if (values && values.length > 0) {
            this._values = values.map((/**
             * @param {?} v
             * @return {?}
             */
            v => {
                v = this.dateTimeAdapter.deserialize(v);
                return this.getValidDate(v);
            }));
            this.lastValueValid =
                (!this._values[0] ||
                    this.dateTimeAdapter.isValid(this._values[0])) &&
                    (!this._values[1] ||
                        this.dateTimeAdapter.isValid(this._values[1]));
        }
        else {
            this._values = [];
            this.lastValueValid = true;
        }
        // set the input property 'value'
        this.formatNativeInputValue();
        this.valueChange.emit(this._values);
    }
    /**
     * @return {?}
     */
    get elementRef() {
        return this.elmRef;
    }
    /**
     * @return {?}
     */
    get isInSingleMode() {
        return this._selectMode === 'single';
    }
    /**
     * @return {?}
     */
    get isInRangeMode() {
        return (this._selectMode === 'range' ||
            this._selectMode === 'rangeFrom' ||
            this._selectMode === 'rangeTo');
    }
    /**
     * @return {?}
     */
    get owlDateTimeInputAriaHaspopup() {
        return true;
    }
    /**
     * @return {?}
     */
    get owlDateTimeInputAriaOwns() {
        return (this.dtPicker.opened && this.dtPicker.id) || null;
    }
    /**
     * @return {?}
     */
    get minIso8601() {
        return this.min ? this.dateTimeAdapter.toIso8601(this.min) : null;
    }
    /**
     * @return {?}
     */
    get maxIso8601() {
        return this.max ? this.dateTimeAdapter.toIso8601(this.max) : null;
    }
    /**
     * @return {?}
     */
    get owlDateTimeInputDisabled() {
        return this.disabled;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.dtPicker) {
            throw Error(`OwlDateTimePicker: the picker input doesn't have any associated owl-date-time component`);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.dtPickerSub = this.dtPicker.confirmSelectedChange.subscribe((/**
         * @param {?} selecteds
         * @return {?}
         */
        (selecteds) => {
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
                input: this.elmRef.nativeElement
            });
            this.dateTimeInput.emit({
                source: this,
                value: selecteds,
                input: this.elmRef.nativeElement
            });
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.dtPickerSub.unsubscribe();
        this.localeSub.unsubscribe();
        this.valueChange.complete();
        this.disabledChange.complete();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.isInSingleMode) {
            this.value = value;
        }
        else {
            this.values = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        return this.validator ? this.validator(c) : null;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) {
        this.validatorOnChange = fn;
    }
    /**
     * Open the picker when user hold alt + DOWN_ARROW
     * @param {?} event
     * @return {?}
     */
    handleKeydownOnHost(event) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this.dtPicker.open();
            event.preventDefault();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleBlurOnHost(event) {
        this.onModelTouched();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleInputOnHost(event) {
        /** @type {?} */
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleChangeOnHost(event) {
        /** @type {?} */
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
            input: this.elmRef.nativeElement
        });
    }
    /**
     * Set the native input property 'value'
     * @return {?}
     */
    formatNativeInputValue() {
        if (this.isInSingleMode) {
            this.renderer.setProperty(this.elmRef.nativeElement, 'value', this._value
                ? this.dateTimeAdapter.format(this._value, this.dtPicker.formatString)
                : '');
        }
        else if (this.isInRangeMode) {
            if (this._values && this.values.length > 0) {
                /** @type {?} */
                const from = this._values[0];
                /** @type {?} */
                const to = this._values[1];
                /** @type {?} */
                const fromFormatted = from
                    ? this.dateTimeAdapter.format(from, this.dtPicker.formatString)
                    : '';
                /** @type {?} */
                const toFormatted = to
                    ? this.dateTimeAdapter.format(to, this.dtPicker.formatString)
                    : '';
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
     * @private
     * @param {?} picker
     * @return {?}
     */
    registerDateTimePicker(picker) {
        if (picker) {
            this.dtPicker = picker;
            this.dtPicker.registerInput(this);
        }
    }
    /**
     * Convert a given obj to a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
    /**
     * Convert a time string to a date-time string
     * When pickerType is 'timer', the value in the picker's input is a time string.
     * The dateTimeAdapter parse fn could not parse a time string to a Date Object.
     * Therefore we need this fn to convert a time string to a date-time string.
     * @private
     * @param {?} timeString
     * @param {?} dateTime
     * @return {?}
     */
    convertTimeStringToDateTimeString(timeString, dateTime) {
        if (timeString) {
            /** @type {?} */
            const v = dateTime || this.dateTimeAdapter.now();
            /** @type {?} */
            const dateString = this.dateTimeAdapter.format(v, this.dateTimeFormats.datePickerInput);
            return dateString + ' ' + timeString;
        }
        else {
            return null;
        }
    }
    /**
     * Handle input change in single mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    changeInputInSingleMode(inputValue) {
        /** @type {?} */
        let value = inputValue;
        if (this.dtPicker.pickerType === 'timer') {
            value = this.convertTimeStringToDateTimeString(value, this.value);
        }
        /** @type {?} */
        let result = this.dateTimeAdapter.parse(value, this.dateTimeFormats.parseInput);
        this.lastValueValid = !result || this.dateTimeAdapter.isValid(result);
        result = this.getValidDate(result);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        // result equals to null means there is input event, but the input value is invalid
        if (!this.isSameValue(result, this._value) || result === null) {
            this._value = result;
            this.valueChange.emit(result);
            this.onModelChange(result);
            this.dateTimeInput.emit({
                source: this,
                value: result,
                input: this.elmRef.nativeElement
            });
        }
    }
    /**
     * Handle input change in rangeFrom or rangeTo mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    changeInputInRangeFromToMode(inputValue) {
        /** @type {?} */
        const originalValue = this._selectMode === 'rangeFrom'
            ? this._values[0]
            : this._values[1];
        if (this.dtPicker.pickerType === 'timer') {
            inputValue = this.convertTimeStringToDateTimeString(inputValue, originalValue);
        }
        /** @type {?} */
        let result = this.dateTimeAdapter.parse(inputValue, this.dateTimeFormats.parseInput);
        this.lastValueValid = !result || this.dateTimeAdapter.isValid(result);
        result = this.getValidDate(result);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        if ((this._selectMode === 'rangeFrom' &&
            this.isSameValue(result, this._values[0]) &&
            result) ||
            (this._selectMode === 'rangeTo' &&
                this.isSameValue(result, this._values[1]) &&
                result)) {
            return;
        }
        this._values =
            this._selectMode === 'rangeFrom'
                ? [result, this._values[1]]
                : [this._values[0], result];
        this.valueChange.emit(this._values);
        this.onModelChange(this._values);
        this.dateTimeInput.emit({
            source: this,
            value: this._values,
            input: this.elmRef.nativeElement
        });
    }
    /**
     * Handle input change in range mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    changeInputInRangeMode(inputValue) {
        /** @type {?} */
        const selecteds = inputValue.split(this.rangeSeparator);
        /** @type {?} */
        let fromString = selecteds[0];
        /** @type {?} */
        let toString = selecteds[1];
        if (this.dtPicker.pickerType === 'timer') {
            fromString = this.convertTimeStringToDateTimeString(fromString, this.values[0]);
            toString = this.convertTimeStringToDateTimeString(toString, this.values[1]);
        }
        /** @type {?} */
        let from = this.dateTimeAdapter.parse(fromString, this.dateTimeFormats.parseInput);
        /** @type {?} */
        let to = this.dateTimeAdapter.parse(toString, this.dateTimeFormats.parseInput);
        this.lastValueValid =
            (!from || this.dateTimeAdapter.isValid(from)) &&
                (!to || this.dateTimeAdapter.isValid(to));
        from = this.getValidDate(from);
        to = this.getValidDate(to);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        if (!this.isSameValue(from, this._values[0]) ||
            !this.isSameValue(to, this._values[1]) ||
            (from === null && to === null)) {
            this._values = [from, to];
            this.valueChange.emit(this._values);
            this.onModelChange(this._values);
            this.dateTimeInput.emit({
                source: this,
                value: this._values,
                input: this.elmRef.nativeElement
            });
        }
    }
    /**
     * Check if the two value is the same
     * @private
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    isSameValue(first, second) {
        if (first && second) {
            return this.dateTimeAdapter.compare(first, second) === 0;
        }
        return first === second;
    }
}
OwlDateTimeInputDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[owlDateTime]',
                exportAs: 'owlDateTimeInput',
                host: {
                    '(keydown)': 'handleKeydownOnHost($event)',
                    '(blur)': 'handleBlurOnHost($event)',
                    '(input)': 'handleInputOnHost($event)',
                    '(change)': 'handleChangeOnHost($event)',
                    '[attr.aria-haspopup]': 'owlDateTimeInputAriaHaspopup',
                    '[attr.aria-owns]': 'owlDateTimeInputAriaOwns',
                    '[attr.min]': 'minIso8601',
                    '[attr.max]': 'maxIso8601',
                    '[disabled]': 'owlDateTimeInputDisabled'
                },
                providers: [OWL_DATETIME_VALUE_ACCESSOR, OWL_DATETIME_VALIDATORS]
            },] }
];
/** @nocollapse */
OwlDateTimeInputDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
];
OwlDateTimeInputDirective.propDecorators = {
    owlDateTime: [{ type: Input }],
    owlDateTimeFilter: [{ type: Input }],
    _disabled: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    selectMode: [{ type: Input }],
    rangeSeparator: [{ type: Input }],
    value: [{ type: Input }],
    values: [{ type: Input }],
    dateTimeChange: [{ type: Output }],
    dateTimeInput: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._dateTimeFilter;
    /**
     * Whether the date time picker's input is disabled.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._disabled;
    /**
     * The minimum valid date.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._min;
    /**
     * The maximum valid date.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._max;
    /**
     * The picker's select mode
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._selectMode;
    /**
     * The character to separate the 'from' and 'to' in input value
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.rangeSeparator;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._value;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._values;
    /**
     * Callback to invoke when `change` event is fired on this `<input>`
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.dateTimeChange;
    /**
     * Callback to invoke when an `input` event is fired on this `<input>`.
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.dateTimeInput;
    /**
     * The date-time-picker that this input is associated with.
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.dtPicker;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.dtPickerSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.localeSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.lastValueValid;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.onModelChange;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.onModelTouched;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.validatorOnChange;
    /**
     * The form control validator for whether the input parses.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.parseValidator;
    /**
     * The form control validator for the min date.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.minValidator;
    /**
     * The form control validator for the max date.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.maxValidator;
    /**
     * The form control validator for the date filter.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.filterValidator;
    /**
     * The form control validator for the range.
     * Check whether the 'before' value is before the 'to' value
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.rangeValidator;
    /**
     * The combined form control validator for this input.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.validator;
    /**
     * Emits when the value changes (either due to user input or programmatic change).
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.valueChange;
    /**
     * Emits when the disabled state has changed
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.disabledChange;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdILGFBQWEsRUFDYixpQkFBaUIsRUFJakIsVUFBVSxFQUNiLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUdwRSxNQUFNLE9BQU8sMkJBQTJCLEdBQVE7SUFDNUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMseUJBQXlCLEVBQUM7SUFDeEQsS0FBSyxFQUFFLElBQUk7Q0FDZDs7QUFFRCxNQUFNLE9BQU8sdUJBQXVCLEdBQVE7SUFDeEMsT0FBTyxFQUFFLGFBQWE7SUFDdEIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUF5QixFQUFDO0lBQ3hELEtBQUssRUFBRSxJ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dC5kaXJlY3RpdmVcbiAqL1xuXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRE9XTl9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQWJzdHJhY3RDb250cm9sLFxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgVmFsaWRhdGlvbkVycm9ycyxcbiAgICBWYWxpZGF0b3IsXG4gICAgVmFsaWRhdG9yRm4sXG4gICAgVmFsaWRhdG9yc1xufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQge1xuICAgIE9XTF9EQVRFX1RJTUVfRk9STUFUUyxcbiAgICBPd2xEYXRlVGltZUZvcm1hdHNcbn0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XG5cbmV4cG9ydCBjb25zdCBPV0xfREFURVRJTUVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGNvbnN0IE9XTF9EQVRFVElNRV9WQUxJREFUT1JTOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbnB1dFtvd2xEYXRlVGltZV0nLFxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVJbnB1dCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGtleWRvd24pJzogJ2hhbmRsZUtleWRvd25Pbkhvc3QoJGV2ZW50KScsXG4gICAgICAgICcoYmx1ciknOiAnaGFuZGxlQmx1ck9uSG9zdCgkZXZlbnQpJyxcbiAgICAgICAgJyhpbnB1dCknOiAnaGFuZGxlSW5wdXRPbkhvc3QoJGV2ZW50KScsXG4gICAgICAgICcoY2hhbmdlKSc6ICdoYW5kbGVDaGFuZ2VPbkhvc3QoJGV2ZW50KScsXG4gICAgICAgICdbYXR0ci5hcmlhLWhhc3BvcHVwXSc6ICdvd2xEYXRlVGltZUlucHV0QXJpYUhhc3BvcHVwJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtb3duc10nOiAnb3dsRGF0ZVRpbWVJbnB1dEFyaWFPd25zJyxcbiAgICAgICAgJ1thdHRyLm1pbl0nOiAnbWluSXNvODYwMScsXG4gICAgICAgICdbYXR0ci5tYXhdJzogJ21heElzbzg2MDEnLFxuICAgICAgICAnW2Rpc2FibGVkXSc6ICdvd2xEYXRlVGltZUlucHV0RGlzYWJsZWQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtPV0xfREFURVRJTUVfVkFMVUVfQUNDRVNTT1IsIE9XTF9EQVRFVElNRV9WQUxJREFUT1JTXVxufSlcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlPFQ+XG4gICAgaW1wbGVtZW50c1xuICAgICAgICBPbkluaXQsXG4gICAgICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgICAgIE9uRGVzdHJveSxcbiAgICAgICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgICAgIFZhbGlkYXRvciB7XG4gICAgLyoqXG4gICAgICogVGhlIGRhdGUgdGltZSBwaWNrZXIgdGhhdCB0aGlzIGlucHV0IGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBvd2xEYXRlVGltZSh2YWx1ZTogT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD4pIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckRhdGVUaW1lUGlja2VyKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHRvIGZpbHRlciBkYXRlIHRpbWVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBvd2xEYXRlVGltZUZpbHRlcihmaWx0ZXI6IChkYXRlOiBUIHwgbnVsbCkgPT4gYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kYXRlVGltZUZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RhdGVUaW1lRmlsdGVyOiAoZGF0ZTogVCB8IG51bGwpID0+IGJvb2xlYW47XG4gICAgZ2V0IGRhdGVUaW1lRmlsdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZVRpbWVGaWx0ZXI7XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRhdGUgdGltZSBwaWNrZXIncyBpbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rpc2FibGVkICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UuZW1pdChuZXdWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBuZWVkIHRvIG51bGwgY2hlY2sgdGhlIGBibHVyYCBtZXRob2QsIGJlY2F1c2UgaXQncyB1bmRlZmluZWQgZHVyaW5nIFNTUi5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIGVsZW1lbnQuYmx1cikge1xuICAgICAgICAgICAgLy8gTm9ybWFsbHksIG5hdGl2ZSBpbnB1dCBlbGVtZW50cyBhdXRvbWF0aWNhbGx5IGJsdXIgaWYgdGhleSB0dXJuIGRpc2FibGVkLiBUaGlzIGJlaGF2aW9yXG4gICAgICAgICAgICAvLyBpcyBwcm9ibGVtYXRpYywgYmVjYXVzZSBpdCB3b3VsZCBtZWFuIHRoYXQgaXQgdHJpZ2dlcnMgYW5vdGhlciBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLFxuICAgICAgICAgICAgLy8gd2hpY2ggdGhlbiBjYXVzZXMgYSBjaGFuZ2VkIGFmdGVyIGNoZWNrZWQgZXJyb3IgaWYgdGhlIGlucHV0IGVsZW1lbnQgd2FzIGZvY3VzZWQgYmVmb3JlLlxuICAgICAgICAgICAgZWxlbWVudC5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIG1pbmltdW0gdmFsaWQgZGF0ZS4gKi9cbiAgICBwcml2YXRlIF9taW46IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1pbigpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW47XG4gICAgfVxuXG4gICAgc2V0IG1pbih2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWluID0gdGhpcy5nZXRWYWxpZERhdGUodGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWF4aW11bSB2YWxpZCBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21heDogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgbWF4KCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICB9XG5cbiAgICBzZXQgbWF4KHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9tYXggPSB0aGlzLmdldFZhbGlkRGF0ZSh0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHBpY2tlcidzIHNlbGVjdCBtb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2VsZWN0TW9kZTogU2VsZWN0TW9kZSA9ICdzaW5nbGUnO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdE1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RNb2RlKG1vZGU6IFNlbGVjdE1vZGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgbW9kZSAhPT0gJ3NpbmdsZScgJiZcbiAgICAgICAgICAgIG1vZGUgIT09ICdyYW5nZScgJiZcbiAgICAgICAgICAgIG1vZGUgIT09ICdyYW5nZUZyb20nICYmXG4gICAgICAgICAgICBtb2RlICE9PSAncmFuZ2VUbydcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignT3dsRGF0ZVRpbWUgRXJyb3I6IGludmFsaWQgc2VsZWN0TW9kZSB2YWx1ZSEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPSBtb2RlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBjaGFyYWN0ZXIgdG8gc2VwYXJhdGUgdGhlICdmcm9tJyBhbmQgJ3RvJyBpbiBpbnB1dCB2YWx1ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcmFuZ2VTZXBhcmF0b3IgPSAnLSc7XG5cbiAgICBwcml2YXRlIF92YWx1ZTogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gIXZhbHVlIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQodmFsdWUpO1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICAgICAgY29uc3Qgb2xkRGF0ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIHNldCB0aGUgaW5wdXQgcHJvcGVydHkgJ3ZhbHVlJ1xuICAgICAgICB0aGlzLmZvcm1hdE5hdGl2ZUlucHV0VmFsdWUoKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgaW5wdXQgdmFsdWUgY2hhbmdlZFxuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzRXF1YWwob2xkRGF0ZSwgdmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWVzOiBUW10gPSBbXTtcbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZXM7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlcyh2YWx1ZXM6IFRbXSkge1xuICAgICAgICBpZiAodmFsdWVzICYmIHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXMubWFwKHYgPT4ge1xuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGUodik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPVxuICAgICAgICAgICAgICAgICghdGhpcy5fdmFsdWVzWzBdIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQodGhpcy5fdmFsdWVzWzBdKSkgJiZcbiAgICAgICAgICAgICAgICAoIXRoaXMuX3ZhbHVlc1sxXSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHRoaXMuX3ZhbHVlc1sxXSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gW107XG4gICAgICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCB0aGUgaW5wdXQgcHJvcGVydHkgJ3ZhbHVlJ1xuICAgICAgICB0aGlzLmZvcm1hdE5hdGl2ZUlucHV0VmFsdWUoKTtcblxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5fdmFsdWVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBgY2hhbmdlYCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YFxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIGRhdGVUaW1lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbiBgaW5wdXRgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIGRhdGVUaW1lSW5wdXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGdldCBlbGVtZW50UmVmKCk6IEVsZW1lbnRSZWYge1xuICAgICAgICByZXR1cm4gdGhpcy5lbG1SZWY7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBkYXRlLXRpbWUtcGlja2VyIHRoYXQgdGhpcyBpbnB1dCBpcyBhc3NvY2lhdGVkIHdpdGguICovXG4gICAgcHVibGljIGR0UGlja2VyOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPjtcblxuICAgIHByaXZhdGUgZHRQaWNrZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBwcml2YXRlIGxvY2FsZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgcHJpdmF0ZSBsYXN0VmFsdWVWYWxpZCA9IHRydWU7XG5cbiAgICBwcml2YXRlIG9uTW9kZWxDaGFuZ2UgPSAoZGF0ZTogVFtdIHwgVCkgPT4ge307XG4gICAgcHJpdmF0ZSBvbk1vZGVsVG91Y2hlZCA9ICgpID0+IHt9O1xuICAgIHByaXZhdGUgdmFsaWRhdG9yT25DaGFuZ2UgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3Igd2hldGhlciB0aGUgaW5wdXQgcGFyc2VzLiAqL1xuICAgIHByaXZhdGUgcGFyc2VWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGFzdFZhbHVlVmFsaWRcbiAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgOiB7IG93bERhdGVUaW1lUGFyc2U6IHsgdGV4dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudC52YWx1ZSB9IH07XG4gICAgfTtcblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIG1pbiBkYXRlLiAqL1xuICAgIHByaXZhdGUgbWluVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChcbiAgICAgICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gICAgKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMubWluIHx8XG4gICAgICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUodGhpcy5taW4sIGNvbnRyb2xWYWx1ZSkgPD0gMFxuICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgIDogeyBvd2xEYXRlVGltZU1pbjogeyBtaW46IHRoaXMubWluLCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlICYmIGNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZUZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzBdKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZVRvID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVsxXSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMubWluIHx8XG4gICAgICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZUZyb20gfHxcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlVG8gfHxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHRoaXMubWluLCBjb250cm9sVmFsdWVGcm9tKSA8PSAwXG4gICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgb3dsRGF0ZVRpbWVNaW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiBbY29udHJvbFZhbHVlRnJvbSwgY29udHJvbFZhbHVlVG9dXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtYXggZGF0ZS4gKi9cbiAgICBwcml2YXRlIG1heFZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoXG4gICAgICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICAgICk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLm1heCB8fFxuICAgICAgICAgICAgICAgICFjb250cm9sVmFsdWUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHRoaXMubWF4LCBjb250cm9sVmFsdWUpID49IDBcbiAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICA6IHsgb3dsRGF0ZVRpbWVNYXg6IHsgbWF4OiB0aGlzLm1heCwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSAmJiBjb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sVmFsdWVGcm9tID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVswXSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sVmFsdWVUbyA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMV0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLm1heCB8fFxuICAgICAgICAgICAgICAgICFjb250cm9sVmFsdWVGcm9tIHx8XG4gICAgICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZVRvIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZSh0aGlzLm1heCwgY29udHJvbFZhbHVlVG8pID49IDBcbiAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICBvd2xEYXRlVGltZU1heDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IFtjb250cm9sVmFsdWVGcm9tLCBjb250cm9sVmFsdWVUb11cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIGRhdGUgZmlsdGVyLiAqL1xuICAgIHByaXZhdGUgZmlsdGVyVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChcbiAgICAgICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gICAgKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiAhdGhpcy5fZGF0ZVRpbWVGaWx0ZXIgfHxcbiAgICAgICAgICAgICFjb250cm9sVmFsdWUgfHxcbiAgICAgICAgICAgIHRoaXMuX2RhdGVUaW1lRmlsdGVyKGNvbnRyb2xWYWx1ZSlcbiAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgOiB7IG93bERhdGVUaW1lRmlsdGVyOiB0cnVlIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgcmFuZ2UuXG4gICAgICogQ2hlY2sgd2hldGhlciB0aGUgJ2JlZm9yZScgdmFsdWUgaXMgYmVmb3JlIHRoZSAndG8nIHZhbHVlXG4gICAgICovXG4gICAgcHJpdmF0ZSByYW5nZVZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoXG4gICAgICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICAgICk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUgfHwgIWNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlRnJvbSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVswXSlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlVG8gPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMV0pXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuICFjb250cm9sVmFsdWVGcm9tIHx8XG4gICAgICAgICAgICAhY29udHJvbFZhbHVlVG8gfHxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoY29udHJvbFZhbHVlRnJvbSwgY29udHJvbFZhbHVlVG8pIDw9IDBcbiAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgOiB7IG93bERhdGVUaW1lUmFuZ2U6IHRydWUgfTtcbiAgICB9O1xuXG4gICAgLyoqIFRoZSBjb21iaW5lZCBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGlzIGlucHV0LiAqL1xuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IG51bGwgPSBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICB0aGlzLnBhcnNlVmFsaWRhdG9yLFxuICAgICAgICB0aGlzLm1pblZhbGlkYXRvcixcbiAgICAgICAgdGhpcy5tYXhWYWxpZGF0b3IsXG4gICAgICAgIHRoaXMuZmlsdGVyVmFsaWRhdG9yLFxuICAgICAgICB0aGlzLnJhbmdlVmFsaWRhdG9yXG4gICAgXSk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcyAoZWl0aGVyIGR1ZSB0byB1c2VyIGlucHV0IG9yIHByb2dyYW1tYXRpYyBjaGFuZ2UpLiAqL1xuICAgIHB1YmxpYyB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VFtdIHwgVCB8IG51bGw+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgZGlzYWJsZWQgc3RhdGUgaGFzIGNoYW5nZWQgKi9cbiAgICBwdWJsaWMgZGlzYWJsZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBnZXQgb3dsRGF0ZVRpbWVJbnB1dEFyaWFIYXNwb3B1cCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IG93bERhdGVUaW1lSW5wdXRBcmlhT3ducygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gKHRoaXMuZHRQaWNrZXIub3BlbmVkICYmIHRoaXMuZHRQaWNrZXIuaWQpIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IG1pbklzbzg2MDEoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWluID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIudG9Jc284NjAxKHRoaXMubWluKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IG1heElzbzg2MDEoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4ID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIudG9Jc284NjAxKHRoaXMubWF4KSA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IG93bERhdGVUaW1lSW5wdXREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxtUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxuICAgICAgICBwcml2YXRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzXG4gICAgKSB7XG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBPd2xEYXRlVGltZVBpY2tlcjogTm8gcHJvdmlkZXIgZm91bmQgZm9yIERhdGVUaW1lUGlja2VyLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBmb2xsb3dpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdDogT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUsIE93bE1vbWVudERhdGVUaW1lTW9kdWxlLCBvciBwcm92aWRlIGEgYCArXG4gICAgICAgICAgICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUZvcm1hdHMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBPd2xEYXRlVGltZVBpY2tlcjogTm8gcHJvdmlkZXIgZm91bmQgZm9yIE9XTF9EQVRFX1RJTUVfRk9STUFUUy4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZm9sbG93aW5nIGAgK1xuICAgICAgICAgICAgICAgICAgICBgbW9kdWxlcyBhdCB5b3VyIGFwcGxpY2F0aW9uIHJvb3Q6IE93bE5hdGl2ZURhdGVUaW1lTW9kdWxlLCBPd2xNb21lbnREYXRlVGltZU1vZHVsZSwgb3IgcHJvdmlkZSBhIGAgK1xuICAgICAgICAgICAgICAgICAgICBgY3VzdG9tIGltcGxlbWVudGF0aW9uLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvY2FsZVN1YiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmxvY2FsZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kdFBpY2tlcikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiB0aGUgcGlja2VyIGlucHV0IGRvZXNuJ3QgaGF2ZSBhbnkgYXNzb2NpYXRlZCBvd2wtZGF0ZS10aW1lIGNvbXBvbmVudGBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmR0UGlja2VyU3ViID0gdGhpcy5kdFBpY2tlci5jb25maXJtU2VsZWN0ZWRDaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHNlbGVjdGVkczogVFtdIHwgVCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdGVkcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSBzZWxlY3RlZHM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2Uoc2VsZWN0ZWRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc2VsZWN0ZWRzLFxuICAgICAgICAgICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVJbnB1dC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc2VsZWN0ZWRzLFxuICAgICAgICAgICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kdFBpY2tlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmxvY2FsZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvciA/IHRoaXMudmFsaWRhdG9yKGMpIDogbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiB0aGUgcGlja2VyIHdoZW4gdXNlciBob2xkIGFsdCArIERPV05fQVJST1dcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlS2V5ZG93bk9uSG9zdChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQuYWx0S2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIub3BlbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVCbHVyT25Ib3N0KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUlucHV0T25Ib3N0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbnB1dEluU2luZ2xlTW9kZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJykge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbnB1dEluUmFuZ2VNb2RlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW5wdXRJblJhbmdlRnJvbVRvTW9kZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlQ2hhbmdlT25Ib3N0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IHY7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICB2ID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLnZhbHVlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVDaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICB2YWx1ZTogdixcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbmF0aXZlIGlucHV0IHByb3BlcnR5ICd2YWx1ZSdcbiAgICAgKi9cbiAgICBwdWJsaWMgZm9ybWF0TmF0aXZlSW5wdXRWYWx1ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5mb3JtYXRTdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVzICYmIHRoaXMudmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9tID0gdGhpcy5fdmFsdWVzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvID0gdGhpcy5fdmFsdWVzWzFdO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbUZvcm1hdHRlZCA9IGZyb21cbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIuZm9ybWF0U3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvRm9ybWF0dGVkID0gdG9cbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0UGlja2VyLmZvcm1hdFN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiAnJztcblxuICAgICAgICAgICAgICAgIGlmICghZnJvbUZvcm1hdHRlZCAmJiAhdG9Gb3JtYXR0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHtmcm9tRm9ybWF0dGVkfSAke3RoaXMucmFuZ2VTZXBhcmF0b3J9ICR7dG9Gb3JtYXR0ZWR9YFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUZvcm1hdHRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VUbycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvRm9ybWF0dGVkXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgdGhlIHJlbGF0aW9uc2hpcCBiZXR3ZWVuIHRoaXMgaW5wdXQgYW5kIGl0cyBwaWNrZXIgY29tcG9uZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSByZWdpc3RlckRhdGVUaW1lUGlja2VyKHBpY2tlcjogT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD4pIHtcbiAgICAgICAgaWYgKHBpY2tlcikge1xuICAgICAgICAgICAgdGhpcy5kdFBpY2tlciA9IHBpY2tlcjtcbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIucmVnaXN0ZXJJbnB1dCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBnaXZlbiBvYmogdG8gYSB2YWxpZCBkYXRlIG9iamVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChvYmopXG4gICAgICAgICAgICA/IG9ialxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSB0aW1lIHN0cmluZyB0byBhIGRhdGUtdGltZSBzdHJpbmdcbiAgICAgKiBXaGVuIHBpY2tlclR5cGUgaXMgJ3RpbWVyJywgdGhlIHZhbHVlIGluIHRoZSBwaWNrZXIncyBpbnB1dCBpcyBhIHRpbWUgc3RyaW5nLlxuICAgICAqIFRoZSBkYXRlVGltZUFkYXB0ZXIgcGFyc2UgZm4gY291bGQgbm90IHBhcnNlIGEgdGltZSBzdHJpbmcgdG8gYSBEYXRlIE9iamVjdC5cbiAgICAgKiBUaGVyZWZvcmUgd2UgbmVlZCB0aGlzIGZuIHRvIGNvbnZlcnQgYSB0aW1lIHN0cmluZyB0byBhIGRhdGUtdGltZSBzdHJpbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0VGltZVN0cmluZ1RvRGF0ZVRpbWVTdHJpbmcoXG4gICAgICAgIHRpbWVTdHJpbmc6IHN0cmluZyxcbiAgICAgICAgZGF0ZVRpbWU6IFRcbiAgICApOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgaWYgKHRpbWVTdHJpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSBkYXRlVGltZSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXG4gICAgICAgICAgICAgICAgdixcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5kYXRlUGlja2VySW5wdXRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZVN0cmluZyArICcgJyArIHRpbWVTdHJpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBpbnB1dCBjaGFuZ2UgaW4gc2luZ2xlIG1vZGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUlucHV0SW5TaW5nbGVNb2RlKGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBsZXQgdmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgICBpZiAodGhpcy5kdFBpY2tlci5waWNrZXJUeXBlID09PSAndGltZXInKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKHZhbHVlLCB0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5wYXJzZShcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUZvcm1hdHMucGFyc2VJbnB1dFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gIXJlc3VsdCB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHJlc3VsdCk7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuZ2V0VmFsaWREYXRlKHJlc3VsdCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIG5ld1ZhbHVlIGlzIHRoZSBzYW1lIGFzIHRoZSBvbGRWYWx1ZSwgd2UgaW50ZW5kIHRvIG5vdCBmaXJlIHRoZSB2YWx1ZUNoYW5nZSBldmVudFxuICAgICAgICAvLyByZXN1bHQgZXF1YWxzIHRvIG51bGwgbWVhbnMgdGhlcmUgaXMgaW5wdXQgZXZlbnQsIGJ1dCB0aGUgaW5wdXQgdmFsdWUgaXMgaW52YWxpZFxuICAgICAgICBpZiAoIXRoaXMuaXNTYW1lVmFsdWUocmVzdWx0LCB0aGlzLl92YWx1ZSkgfHwgcmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHJlc3VsdDtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChyZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lSW5wdXQuZW1pdCh7XG4gICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGlucHV0IGNoYW5nZSBpbiByYW5nZUZyb20gb3IgcmFuZ2VUbyBtb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VJbnB1dEluUmFuZ2VGcm9tVG9Nb2RlKGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBvcmlnaW5hbFZhbHVlID1cbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nXG4gICAgICAgICAgICAgICAgPyB0aGlzLl92YWx1ZXNbMF1cbiAgICAgICAgICAgICAgICA6IHRoaXMuX3ZhbHVlc1sxXTtcblxuICAgICAgICBpZiAodGhpcy5kdFBpY2tlci5waWNrZXJUeXBlID09PSAndGltZXInKSB7XG4gICAgICAgICAgICBpbnB1dFZhbHVlID0gdGhpcy5jb252ZXJ0VGltZVN0cmluZ1RvRGF0ZVRpbWVTdHJpbmcoXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFZhbHVlXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKFxuICAgICAgICAgICAgaW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLnBhcnNlSW5wdXRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICFyZXN1bHQgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChyZXN1bHQpO1xuICAgICAgICByZXN1bHQgPSB0aGlzLmdldFZhbGlkRGF0ZShyZXN1bHQpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBuZXdWYWx1ZSBpcyB0aGUgc2FtZSBhcyB0aGUgb2xkVmFsdWUsIHdlIGludGVuZCB0byBub3QgZmlyZSB0aGUgdmFsdWVDaGFuZ2UgZXZlbnRcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nICYmXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NhbWVWYWx1ZShyZXN1bHQsIHRoaXMuX3ZhbHVlc1swXSkgJiZcbiAgICAgICAgICAgICAgICByZXN1bHQpIHx8XG4gICAgICAgICAgICAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nICYmXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NhbWVWYWx1ZShyZXN1bHQsIHRoaXMuX3ZhbHVlc1sxXSkgJiZcbiAgICAgICAgICAgICAgICByZXN1bHQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdmFsdWVzID1cbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nXG4gICAgICAgICAgICAgICAgPyBbcmVzdWx0LCB0aGlzLl92YWx1ZXNbMV1dXG4gICAgICAgICAgICAgICAgOiBbdGhpcy5fdmFsdWVzWzBdLCByZXN1bHRdO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5fdmFsdWVzKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgIHRoaXMuZGF0ZVRpbWVJbnB1dC5lbWl0KHtcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl92YWx1ZXMsXG4gICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5wdXQgY2hhbmdlIGluIHJhbmdlIG1vZGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUlucHV0SW5SYW5nZU1vZGUoaW5wdXRWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkcyA9IGlucHV0VmFsdWUuc3BsaXQodGhpcy5yYW5nZVNlcGFyYXRvcik7XG4gICAgICAgIGxldCBmcm9tU3RyaW5nID0gc2VsZWN0ZWRzWzBdO1xuICAgICAgICBsZXQgdG9TdHJpbmcgPSBzZWxlY3RlZHNbMV07XG5cbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIucGlja2VyVHlwZSA9PT0gJ3RpbWVyJykge1xuICAgICAgICAgICAgZnJvbVN0cmluZyA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICAgICAgICAgIGZyb21TdHJpbmcsXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbMF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0b1N0cmluZyA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICAgICAgICAgIHRvU3RyaW5nLFxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzWzFdXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZyb20gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5wYXJzZShcbiAgICAgICAgICAgIGZyb21TdHJpbmcsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XG4gICAgICAgICk7XG4gICAgICAgIGxldCB0byA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKFxuICAgICAgICAgICAgdG9TdHJpbmcsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPVxuICAgICAgICAgICAgKCFmcm9tIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQoZnJvbSkpICYmXG4gICAgICAgICAgICAoIXRvIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQodG8pKTtcbiAgICAgICAgZnJvbSA9IHRoaXMuZ2V0VmFsaWREYXRlKGZyb20pO1xuICAgICAgICB0byA9IHRoaXMuZ2V0VmFsaWREYXRlKHRvKTtcblxuICAgICAgICAvLyBpZiB0aGUgbmV3VmFsdWUgaXMgdGhlIHNhbWUgYXMgdGhlIG9sZFZhbHVlLCB3ZSBpbnRlbmQgdG8gbm90IGZpcmUgdGhlIHZhbHVlQ2hhbmdlIGV2ZW50XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLmlzU2FtZVZhbHVlKGZyb20sIHRoaXMuX3ZhbHVlc1swXSkgfHxcbiAgICAgICAgICAgICF0aGlzLmlzU2FtZVZhbHVlKHRvLCB0aGlzLl92YWx1ZXNbMV0pIHx8XG4gICAgICAgICAgICAoZnJvbSA9PT0gbnVsbCAmJiB0byA9PT0gbnVsbClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBbZnJvbSwgdG9dO1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5fdmFsdWVzKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVJbnB1dC5lbWl0KHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3ZhbHVlcyxcbiAgICAgICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgdHdvIHZhbHVlIGlzIHRoZSBzYW1lXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc1NhbWVWYWx1ZShmaXJzdDogVCB8IG51bGwsIHNlY29uZDogVCB8IG51bGwpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpcnN0ICYmIHNlY29uZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZmlyc3QsIHNlY29uZCkgPT09IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlyc3QgPT09IHNlY29uZDtcbiAgICB9XG59XG4iXX0=