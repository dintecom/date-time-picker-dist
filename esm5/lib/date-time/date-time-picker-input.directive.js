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
export var OWL_DATETIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return OwlDateTimeInputDirective; })),
    multi: true
};
/** @type {?} */
export var OWL_DATETIME_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return OwlDateTimeInputDirective; })),
    multi: true
};
/**
 * @template T
 */
var OwlDateTimeInputDirective = /** @class */ (function () {
    function OwlDateTimeInputDirective(elmRef, renderer, dateTimeAdapter, dateTimeFormats) {
        var _this = this;
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
        function (date) { });
        this.onModelTouched = (/**
         * @return {?}
         */
        function () { });
        this.validatorOnChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * The form control validator for whether the input parses.
         */
        this.parseValidator = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = _this.elmRef.nativeElement.value;
            if (!value)
                return null;
            return _this.lastValueValid
                ? null
                : { owlDateTimeParse: { text: value } };
        });
        /**
         * The form control validator for the min date.
         */
        this.minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            if (_this.isInSingleMode) {
                /** @type {?} */
                var controlValue = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value));
                return !_this.min ||
                    !controlValue ||
                    _this.dateTimeAdapter.compare(_this.min, controlValue) <= 0
                    ? null
                    : { owlDateTimeMin: { min: _this.min, actual: controlValue } };
            }
            else if (_this.isInRangeMode && control.value) {
                /** @type {?} */
                var controlValueFrom = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[0]));
                /** @type {?} */
                var controlValueTo = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[1]));
                return !_this.min ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    _this.dateTimeAdapter.compare(_this.min, controlValueFrom) <= 0
                    ? null
                    : {
                        owlDateTimeMin: {
                            min: _this.min,
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
        function (control) {
            if (_this.isInSingleMode) {
                /** @type {?} */
                var controlValue = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value));
                return !_this.max ||
                    !controlValue ||
                    _this.dateTimeAdapter.compare(_this.max, controlValue) >= 0
                    ? null
                    : { owlDateTimeMax: { max: _this.max, actual: controlValue } };
            }
            else if (_this.isInRangeMode && control.value) {
                /** @type {?} */
                var controlValueFrom = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[0]));
                /** @type {?} */
                var controlValueTo = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[1]));
                return !_this.max ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    _this.dateTimeAdapter.compare(_this.max, controlValueTo) >= 0
                    ? null
                    : {
                        owlDateTimeMax: {
                            max: _this.max,
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
        function (control) {
            /** @type {?} */
            var controlValue = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value));
            return !_this._dateTimeFilter ||
                !controlValue ||
                _this._dateTimeFilter(controlValue)
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
        function (control) {
            if (_this.isInSingleMode || !control.value) {
                return null;
            }
            /** @type {?} */
            var controlValueFrom = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[0]));
            /** @type {?} */
            var controlValueTo = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[1]));
            return !controlValueFrom ||
                !controlValueTo ||
                _this.dateTimeAdapter.compare(controlValueFrom, controlValueTo) <= 0
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
            throw Error("OwlDateTimePicker: No provider found for DateTimePicker. You must import one of the following " +
                "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                "custom implementation.");
        }
        if (!this.dateTimeFormats) {
            throw Error("OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following " +
                "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                "custom implementation.");
        }
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.value = _this.value;
        }));
    }
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTime", {
        /**
         * The date time picker that this input is associated with.
         */
        set: /**
         * The date time picker that this input is associated with.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.registerDateTimePicker(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeFilter", {
        /**
         * A function to filter date time
         */
        set: /**
         * A function to filter date time
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this._dateTimeFilter = filter;
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "dateTimeFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateTimeFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = coerceBooleanProperty(value);
            /** @type {?} */
            var element = this.elmRef.nativeElement;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "min", {
        get: /**
         * @return {?}
         */
        function () {
            return this._min;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "max", {
        get: /**
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "selectMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectMode;
        },
        set: /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            if (mode !== 'single' &&
                mode !== 'range' &&
                mode !== 'rangeFrom' &&
                mode !== 'rangeTo') {
                throw Error('OwlDateTime Error: invalid selectMode value!');
            }
            this._selectMode = mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this.lastValueValid = !value || this.dateTimeAdapter.isValid(value);
            value = this.getValidDate(value);
            /** @type {?} */
            var oldDate = this._value;
            this._value = value;
            // set the input property 'value'
            this.formatNativeInputValue();
            // check if the input value changed
            if (!this.dateTimeAdapter.isEqual(oldDate, value)) {
                this.valueChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "values", {
        get: /**
         * @return {?}
         */
        function () {
            return this._values;
        },
        set: /**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            var _this = this;
            if (values && values.length > 0) {
                this._values = values.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
                    v = _this.dateTimeAdapter.deserialize(v);
                    return _this.getValidDate(v);
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "elementRef", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elmRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "isInRangeMode", {
        get: /**
         * @return {?}
         */
        function () {
            return (this._selectMode === 'range' ||
                this._selectMode === 'rangeFrom' ||
                this._selectMode === 'rangeTo');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeInputAriaHaspopup", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeInputAriaOwns", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.dtPicker.opened && this.dtPicker.id) || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "minIso8601", {
        get: /**
         * @return {?}
         */
        function () {
            return this.min ? this.dateTimeAdapter.toIso8601(this.min) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "maxIso8601", {
        get: /**
         * @return {?}
         */
        function () {
            return this.max ? this.dateTimeAdapter.toIso8601(this.max) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeInputDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.dtPicker) {
            throw Error("OwlDateTimePicker: the picker input doesn't have any associated owl-date-time component");
        }
    };
    /**
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dtPickerSub = this.dtPicker.confirmSelectedChange.subscribe((/**
         * @param {?} selecteds
         * @return {?}
         */
        function (selecteds) {
            if (Array.isArray(selecteds)) {
                _this.values = selecteds;
            }
            else {
                _this.value = selecteds;
            }
            _this.onModelChange(selecteds);
            _this.onModelTouched();
            _this.dateTimeChange.emit({
                source: _this,
                value: selecteds,
                input: _this.elmRef.nativeElement
            });
            _this.dateTimeInput.emit({
                source: _this,
                value: selecteds,
                input: _this.elmRef.nativeElement
            });
        }));
    };
    /**
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.dtPickerSub.unsubscribe();
        this.localeSub.unsubscribe();
        this.valueChange.complete();
        this.disabledChange.complete();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInSingleMode) {
            this.value = value;
        }
        else {
            this.values = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} c
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this.validator ? this.validator(c) : null;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.validatorOnChange = fn;
    };
    /**
     * Open the picker when user hold alt + DOWN_ARROW
     */
    /**
     * Open the picker when user hold alt + DOWN_ARROW
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.handleKeydownOnHost = /**
     * Open the picker when user hold alt + DOWN_ARROW
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this.dtPicker.open();
            event.preventDefault();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.handleBlurOnHost = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onModelTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.handleInputOnHost = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var value = event.target.value;
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.handleChangeOnHost = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var v;
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
    };
    /**
     * Set the native input property 'value'
     */
    /**
     * Set the native input property 'value'
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.formatNativeInputValue = /**
     * Set the native input property 'value'
     * @return {?}
     */
    function () {
        if (this.isInSingleMode) {
            this.renderer.setProperty(this.elmRef.nativeElement, 'value', this._value
                ? this.dateTimeAdapter.format(this._value, this.dtPicker.formatString)
                : '');
        }
        else if (this.isInRangeMode) {
            if (this._values && this.values.length > 0) {
                /** @type {?} */
                var from = this._values[0];
                /** @type {?} */
                var to = this._values[1];
                /** @type {?} */
                var fromFormatted = from
                    ? this.dateTimeAdapter.format(from, this.dtPicker.formatString)
                    : '';
                /** @type {?} */
                var toFormatted = to
                    ? this.dateTimeAdapter.format(to, this.dtPicker.formatString)
                    : '';
                if (!fromFormatted && !toFormatted) {
                    this.renderer.setProperty(this.elmRef.nativeElement, 'value', null);
                }
                else {
                    if (this._selectMode === 'range') {
                        this.renderer.setProperty(this.elmRef.nativeElement, 'value', fromFormatted + " " + this.rangeSeparator + " " + toFormatted);
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
    };
    /**
     * Register the relationship between this input and its picker component
     */
    /**
     * Register the relationship between this input and its picker component
     * @private
     * @param {?} picker
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.registerDateTimePicker = /**
     * Register the relationship between this input and its picker component
     * @private
     * @param {?} picker
     * @return {?}
     */
    function (picker) {
        if (picker) {
            this.dtPicker = picker;
            this.dtPicker.registerInput(this);
        }
    };
    /**
     * Convert a given obj to a valid date object
     */
    /**
     * Convert a given obj to a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.getValidDate = /**
     * Convert a given obj to a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    };
    /**
     * Convert a time string to a date-time string
     * When pickerType is 'timer', the value in the picker's input is a time string.
     * The dateTimeAdapter parse fn could not parse a time string to a Date Object.
     * Therefore we need this fn to convert a time string to a date-time string.
     */
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
    OwlDateTimeInputDirective.prototype.convertTimeStringToDateTimeString = /**
     * Convert a time string to a date-time string
     * When pickerType is 'timer', the value in the picker's input is a time string.
     * The dateTimeAdapter parse fn could not parse a time string to a Date Object.
     * Therefore we need this fn to convert a time string to a date-time string.
     * @private
     * @param {?} timeString
     * @param {?} dateTime
     * @return {?}
     */
    function (timeString, dateTime) {
        if (timeString) {
            /** @type {?} */
            var v = dateTime || this.dateTimeAdapter.now();
            /** @type {?} */
            var dateString = this.dateTimeAdapter.format(v, this.dateTimeFormats.datePickerInput);
            return dateString + ' ' + timeString;
        }
        else {
            return null;
        }
    };
    /**
     * Handle input change in single mode
     */
    /**
     * Handle input change in single mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.changeInputInSingleMode = /**
     * Handle input change in single mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        this.lastValueValid = this.dateTimeAdapter.isValidFormat(inputValue, this.dtPicker.formatString);
        /** @type {?} */
        var value = inputValue;
        if (this.dtPicker.pickerType === 'timer') {
            value = this.convertTimeStringToDateTimeString(value, this.value);
        }
        /** @type {?} */
        var result = this.dateTimeAdapter.parse(value, this.dateTimeFormats.parseInput);
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
    };
    /**
     * Handle input change in rangeFrom or rangeTo mode
     */
    /**
     * Handle input change in rangeFrom or rangeTo mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.changeInputInRangeFromToMode = /**
     * Handle input change in rangeFrom or rangeTo mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        this.lastValueValid = this.dateTimeAdapter.isValidFormat(inputValue, this.dtPicker.formatString);
        /** @type {?} */
        var originalValue = this._selectMode === 'rangeFrom'
            ? this._values[0]
            : this._values[1];
        if (this.dtPicker.pickerType === 'timer') {
            inputValue = this.convertTimeStringToDateTimeString(inputValue, originalValue);
        }
        /** @type {?} */
        var result = this.dateTimeAdapter.parse(inputValue, this.dateTimeFormats.parseInput);
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
    };
    /**
     * Handle input change in range mode
     */
    /**
     * Handle input change in range mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.changeInputInRangeMode = /**
     * Handle input change in range mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var selecteds = inputValue.split(this.rangeSeparator);
        /** @type {?} */
        var fromString = (selecteds[0] || '').trim();
        /** @type {?} */
        var toString = (selecteds[1] || '').trim();
        this.lastValueValid =
            this.dateTimeAdapter.isValidFormat(fromString, this.dtPicker.formatString) &&
                this.dateTimeAdapter.isValidFormat(toString, this.dtPicker.formatString);
        if (this.dtPicker.pickerType === 'timer') {
            fromString = this.convertTimeStringToDateTimeString(fromString, this.values[0]);
            toString = this.convertTimeStringToDateTimeString(toString, this.values[1]);
        }
        /** @type {?} */
        var from = this.dateTimeAdapter.parse(fromString, this.dateTimeFormats.parseInput);
        /** @type {?} */
        var to = this.dateTimeAdapter.parse(toString, this.dateTimeFormats.parseInput);
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
    };
    /**
     * Check if the two value is the same
     */
    /**
     * Check if the two value is the same
     * @private
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.isSameValue = /**
     * Check if the two value is the same
     * @private
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first, second) {
        if (first && second) {
            return this.dateTimeAdapter.compare(first, second) === 0;
        }
        return first === second;
    };
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
    OwlDateTimeInputDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
    ]; };
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
    return OwlDateTimeInputDirective;
}());
export { OwlDateTimeInputDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdILGFBQWEsRUFDYixpQkFBaUIsRUFJakIsVUFBVSxFQUNiLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUdwRSxNQUFNLEtBQU8sMkJBQTJCLEdBQVE7SUFDNUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLHlCQUF5QixFQUF6QixDQUF5QixFQUFDO0lBQ3hELEtBQUssRUFBRSxJQUFJO0NBQ2Q7O0FBRUQsTUFBTSxLQUFPLHVCQUF1QixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxjQUFNLE9BQUEseUJBQXlCLEVBQXpCLENBQXlCLEVBQUM7SUFD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Ozs4QkF2VmhDLEtBQUs7b0NBUUwsS0FBSzs0QkFZTCxLQUFLO3NCQTBCTCxLQUFLO3NCQVlMLEtBQUs7NkJBY0wsS0FBSztpQ0FxQkwsS0FBSzt3QkFJTCxLQUFLO3lCQXNCTCxLQUFLO2lDQThCTCxNQUFNO2dDQU1OLE1BQU07O0lBZ2tCWCxnQ0FBQztDQUFBLEFBcnZCRCxJQXF2QkM7U0FydUJZLHlCQUF5Qjs7Ozs7O0lBd0JsQyxvREFBcUQ7Ozs7OztJQU1yRCw4Q0FDMkI7Ozs7OztJQXdCM0IseUNBQXVCOzs7Ozs7SUFZdkIseUNBQXVCOzs7Ozs7SUFjdkIsZ0RBQTJDOzs7OztJQXNCM0MsbURBQ3FCOzs7OztJQUVyQiwyQ0FBeUI7Ozs7O0lBc0J6Qiw0Q0FBMEI7Ozs7O0lBK0IxQixtREFDeUM7Ozs7O0lBS3pDLGtEQUN3Qzs7Ozs7SUFtQnhDLDZDQUF5Qzs7Ozs7SUFFekMsZ0RBQXVEOzs7OztJQUN2RCw4Q0FBcUQ7Ozs7O0lBRXJELG1EQUE4Qjs7Ozs7SUFFOUIsa0RBQThDOzs7OztJQUM5QyxtREFBa0M7Ozs7O0lBQ2xDLHNEQUFxQzs7Ozs7O0lBR3JDLG1EQU9FOzs7Ozs7SUFHRixpREErQkU7Ozs7OztJQUdGLGlEQStCRTs7Ozs7O0lBR0Ysb0RBV0U7Ozs7Ozs7SUFNRixtREFtQkU7Ozs7OztJQUdGLDhDQU1HOzs7OztJQUdILGdEQUF3RDs7Ozs7SUFHeEQsbURBQW9EOzs7OztJQXVCaEQsMkNBQTBCOzs7OztJQUMxQiw2Q0FBMkI7Ozs7O0lBQzNCLG9EQUF1RDs7Ozs7SUFDdkQsb0RBRTJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXRpbWUtcGlja2VyLWlucHV0LmRpcmVjdGl2ZVxuICovXG5cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBET1dOX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBYnN0cmFjdENvbnRyb2wsXG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgTkdfVkFMSURBVE9SUyxcbiAgICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICBWYWxpZGF0aW9uRXJyb3JzLFxuICAgIFZhbGlkYXRvcixcbiAgICBWYWxpZGF0b3JGbixcbiAgICBWYWxpZGF0b3JzXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcblxuZXhwb3J0IGNvbnN0IE9XTF9EQVRFVElNRV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmUpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgY29uc3QgT1dMX0RBVEVUSU1FX1ZBTElEQVRPUlM6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmUpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2lucHV0W293bERhdGVUaW1lXScsXG4gICAgZXhwb3J0QXM6ICdvd2xEYXRlVGltZUlucHV0JyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bk9uSG9zdCgkZXZlbnQpJyxcbiAgICAgICAgJyhibHVyKSc6ICdoYW5kbGVCbHVyT25Ib3N0KCRldmVudCknLFxuICAgICAgICAnKGlucHV0KSc6ICdoYW5kbGVJbnB1dE9uSG9zdCgkZXZlbnQpJyxcbiAgICAgICAgJyhjaGFuZ2UpJzogJ2hhbmRsZUNoYW5nZU9uSG9zdCgkZXZlbnQpJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtaGFzcG9wdXBdJzogJ293bERhdGVUaW1lSW5wdXRBcmlhSGFzcG9wdXAnLFxuICAgICAgICAnW2F0dHIuYXJpYS1vd25zXSc6ICdvd2xEYXRlVGltZUlucHV0QXJpYU93bnMnLFxuICAgICAgICAnW2F0dHIubWluXSc6ICdtaW5Jc284NjAxJyxcbiAgICAgICAgJ1thdHRyLm1heF0nOiAnbWF4SXNvODYwMScsXG4gICAgICAgICdbZGlzYWJsZWRdJzogJ293bERhdGVUaW1lSW5wdXREaXNhYmxlZCdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW09XTF9EQVRFVElNRV9WQUxVRV9BQ0NFU1NPUiwgT1dMX0RBVEVUSU1FX1ZBTElEQVRPUlNdXG59KVxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmU8VD5cbiAgICBpbXBsZW1lbnRzXG4gICAgICAgIE9uSW5pdCxcbiAgICAgICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICAgICAgT25EZXN0cm95LFxuICAgICAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICAgICAgVmFsaWRhdG9yIHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGF0ZSB0aW1lIHBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IG93bERhdGVUaW1lKHZhbHVlOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPikge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRGF0ZVRpbWVQaWNrZXIodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdG8gZmlsdGVyIGRhdGUgdGltZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IG93bERhdGVUaW1lRmlsdGVyKGZpbHRlcjogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2RhdGVUaW1lRmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGF0ZVRpbWVGaWx0ZXI6IChkYXRlOiBUIHwgbnVsbCkgPT4gYm9vbGVhbjtcbiAgICBnZXQgZGF0ZVRpbWVGaWx0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlVGltZUZpbHRlcjtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZGF0ZSB0aW1lIHBpY2tlcidzIGlucHV0IGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICBpZiAodGhpcy5fZGlzYWJsZWQgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5lbWl0KG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbnVsbCBjaGVjayB0aGUgYGJsdXJgIG1ldGhvZCwgYmVjYXVzZSBpdCdzIHVuZGVmaW5lZCBkdXJpbmcgU1NSLlxuICAgICAgICBpZiAobmV3VmFsdWUgJiYgZWxlbWVudC5ibHVyKSB7XG4gICAgICAgICAgICAvLyBOb3JtYWxseSwgbmF0aXZlIGlucHV0IGVsZW1lbnRzIGF1dG9tYXRpY2FsbHkgYmx1ciBpZiB0aGV5IHR1cm4gZGlzYWJsZWQuIFRoaXMgYmVoYXZpb3JcbiAgICAgICAgICAgIC8vIGlzIHByb2JsZW1hdGljLCBiZWNhdXNlIGl0IHdvdWxkIG1lYW4gdGhhdCBpdCB0cmlnZ2VycyBhbm90aGVyIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsXG4gICAgICAgICAgICAvLyB3aGljaCB0aGVuIGNhdXNlcyBhIGNoYW5nZWQgYWZ0ZXIgY2hlY2tlZCBlcnJvciBpZiB0aGUgaW5wdXQgZWxlbWVudCB3YXMgZm9jdXNlZCBiZWZvcmUuXG4gICAgICAgICAgICBlbGVtZW50LmJsdXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSB2YWxpZCBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21pbjogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgbWluKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG5cbiAgICBzZXQgbWluKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9taW4gPSB0aGlzLmdldFZhbGlkRGF0ZSh0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHZhbGlkIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfbWF4OiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXgoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4O1xuICAgIH1cblxuICAgIHNldCBtYXgodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21heCA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGlja2VyJ3Mgc2VsZWN0IG1vZGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zZWxlY3RNb2RlOiBTZWxlY3RNb2RlID0gJ3NpbmdsZSc7XG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0TW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1vZGU7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdE1vZGUobW9kZTogU2VsZWN0TW9kZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBtb2RlICE9PSAnc2luZ2xlJyAmJlxuICAgICAgICAgICAgbW9kZSAhPT0gJ3JhbmdlJyAmJlxuICAgICAgICAgICAgbW9kZSAhPT0gJ3JhbmdlRnJvbScgJiZcbiAgICAgICAgICAgIG1vZGUgIT09ICdyYW5nZVRvJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdPd2xEYXRlVGltZSBFcnJvcjogaW52YWxpZCBzZWxlY3RNb2RlIHZhbHVlIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9IG1vZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGNoYXJhY3RlciB0byBzZXBhcmF0ZSB0aGUgJ2Zyb20nIGFuZCAndG8nIGluIGlucHV0IHZhbHVlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByYW5nZVNlcGFyYXRvciA9ICctJztcblxuICAgIHByaXZhdGUgX3ZhbHVlOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhdmFsdWUgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZCh2YWx1ZSk7XG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuICAgICAgICBjb25zdCBvbGREYXRlID0gdGhpcy5fdmFsdWU7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBpbnB1dCBwcm9wZXJ0eSAndmFsdWUnXG4gICAgICAgIHRoaXMuZm9ybWF0TmF0aXZlSW5wdXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBpbnB1dCB2YWx1ZSBjaGFuZ2VkXG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNFcXVhbChvbGREYXRlLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWx1ZXM6IFRbXSA9IFtdO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlcztcbiAgICB9XG5cbiAgICBzZXQgdmFsdWVzKHZhbHVlczogVFtdKSB7XG4gICAgICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcy5tYXAodiA9PiB7XG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHYpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkRGF0ZSh2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9XG4gICAgICAgICAgICAgICAgKCF0aGlzLl92YWx1ZXNbMF0gfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZCh0aGlzLl92YWx1ZXNbMF0pKSAmJlxuICAgICAgICAgICAgICAgICghdGhpcy5fdmFsdWVzWzFdIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQodGhpcy5fdmFsdWVzWzFdKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHRoZSBpbnB1dCBwcm9wZXJ0eSAndmFsdWUnXG4gICAgICAgIHRoaXMuZm9ybWF0TmF0aXZlSW5wdXRWYWx1ZSgpO1xuXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGBjaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgZGF0ZVRpbWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGFuIGBpbnB1dGAgZXZlbnQgaXMgZmlyZWQgb24gdGhpcyBgPGlucHV0PmAuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgZGF0ZVRpbWVJbnB1dCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgZ2V0IGVsZW1lbnRSZWYoKTogRWxlbWVudFJlZiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsbVJlZjtcbiAgICB9XG5cbiAgICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcbiAgICB9XG5cbiAgICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VUbydcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGRhdGUtdGltZS1waWNrZXIgdGhhdCB0aGlzIGlucHV0IGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgICBwdWJsaWMgZHRQaWNrZXI6IE93bERhdGVUaW1lQ29tcG9uZW50PFQ+O1xuXG4gICAgcHJpdmF0ZSBkdFBpY2tlclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIHByaXZhdGUgbG9jYWxlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBwcml2YXRlIGxhc3RWYWx1ZVZhbGlkID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgb25Nb2RlbENoYW5nZSA9IChkYXRlOiBUW10gfCBUKSA9PiB7fTtcbiAgICBwcml2YXRlIG9uTW9kZWxUb3VjaGVkID0gKCkgPT4ge307XG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JPbkNoYW5nZSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB3aGV0aGVyIHRoZSBpbnB1dCBwYXJzZXMuICovXG4gICAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RWYWx1ZVZhbGlkXG4gICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgIDogeyBvd2xEYXRlVGltZVBhcnNlOiB7IHRleHQ6IHZhbHVlIH0gfTtcbiAgICB9O1xuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWluIGRhdGUuICovXG4gICAgcHJpdmF0ZSBtaW5WYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKFxuICAgICAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5taW4gfHxcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZSh0aGlzLm1pbiwgY29udHJvbFZhbHVlKSA8PSAwXG4gICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgOiB7IG93bERhdGVUaW1lTWluOiB7IG1pbjogdGhpcy5taW4sIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUgJiYgY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlRnJvbSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMF0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlVG8gPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzFdKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5taW4gfHxcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlRnJvbSB8fFxuICAgICAgICAgICAgICAgICFjb250cm9sVmFsdWVUbyB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUodGhpcy5taW4sIGNvbnRyb2xWYWx1ZUZyb20pIDw9IDBcbiAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICBvd2xEYXRlVGltZU1pbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IFtjb250cm9sVmFsdWVGcm9tLCBjb250cm9sVmFsdWVUb11cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIG1heCBkYXRlLiAqL1xuICAgIHByaXZhdGUgbWF4VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChcbiAgICAgICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gICAgKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMubWF4IHx8XG4gICAgICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUodGhpcy5tYXgsIGNvbnRyb2xWYWx1ZSkgPj0gMFxuICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgIDogeyBvd2xEYXRlVGltZU1heDogeyBtYXg6IHRoaXMubWF4LCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlICYmIGNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZUZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzBdKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZVRvID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVsxXSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMubWF4IHx8XG4gICAgICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZUZyb20gfHxcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlVG8gfHxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHRoaXMubWF4LCBjb250cm9sVmFsdWVUbykgPj0gMFxuICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgIG93bERhdGVUaW1lTWF4OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogW2NvbnRyb2xWYWx1ZUZyb20sIGNvbnRyb2xWYWx1ZVRvXVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgZGF0ZSBmaWx0ZXIuICovXG4gICAgcHJpdmF0ZSBmaWx0ZXJWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKFxuICAgICAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9kYXRlVGltZUZpbHRlciB8fFxuICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZSB8fFxuICAgICAgICAgICAgdGhpcy5fZGF0ZVRpbWVGaWx0ZXIoY29udHJvbFZhbHVlKVxuICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICA6IHsgb3dsRGF0ZVRpbWVGaWx0ZXI6IHRydWUgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSByYW5nZS5cbiAgICAgKiBDaGVjayB3aGV0aGVyIHRoZSAnYmVmb3JlJyB2YWx1ZSBpcyBiZWZvcmUgdGhlICd0bycgdmFsdWVcbiAgICAgKi9cbiAgICBwcml2YXRlIHJhbmdlVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChcbiAgICAgICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sXG4gICAgKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSB8fCAhY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250cm9sVmFsdWVGcm9tID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzBdKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBjb250cm9sVmFsdWVUbyA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVsxXSlcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gIWNvbnRyb2xWYWx1ZUZyb20gfHxcbiAgICAgICAgICAgICFjb250cm9sVmFsdWVUbyB8fFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShjb250cm9sVmFsdWVGcm9tLCBjb250cm9sVmFsdWVUbykgPD0gMFxuICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICA6IHsgb3dsRGF0ZVRpbWVSYW5nZTogdHJ1ZSB9O1xuICAgIH07XG5cbiAgICAvKiogVGhlIGNvbWJpbmVkIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoaXMgaW5wdXQuICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3I6IFZhbGlkYXRvckZuIHwgbnVsbCA9IFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgIHRoaXMucGFyc2VWYWxpZGF0b3IsXG4gICAgICAgIHRoaXMubWluVmFsaWRhdG9yLFxuICAgICAgICB0aGlzLm1heFZhbGlkYXRvcixcbiAgICAgICAgdGhpcy5maWx0ZXJWYWxpZGF0b3IsXG4gICAgICAgIHRoaXMucmFuZ2VWYWxpZGF0b3JcbiAgICBdKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzIChlaXRoZXIgZHVlIHRvIHVzZXIgaW5wdXQgb3IgcHJvZ3JhbW1hdGljIGNoYW5nZSkuICovXG4gICAgcHVibGljIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUW10gfCBUIHwgbnVsbD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBkaXNhYmxlZCBzdGF0ZSBoYXMgY2hhbmdlZCAqL1xuICAgIHB1YmxpYyBkaXNhYmxlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIGdldCBvd2xEYXRlVGltZUlucHV0QXJpYUhhc3BvcHVwKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgb3dsRGF0ZVRpbWVJbnB1dEFyaWFPd25zKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAodGhpcy5kdFBpY2tlci5vcGVuZWQgJiYgdGhpcy5kdFBpY2tlci5pZCkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgbWluSXNvODYwMSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5taW4gPyB0aGlzLmRhdGVUaW1lQWRhcHRlci50b0lzbzg2MDEodGhpcy5taW4pIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgbWF4SXNvODYwMSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXggPyB0aGlzLmRhdGVUaW1lQWRhcHRlci50b0lzbzg2MDEodGhpcy5tYXgpIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgb3dsRGF0ZVRpbWVJbnB1dERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbG1SZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXG4gICAgICAgIHByaXZhdGUgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHNcbiAgICApIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lQWRhcHRlcikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgRGF0ZVRpbWVQaWNrZXIuIFlvdSBtdXN0IGltcG9ydCBvbmUgb2YgdGhlIGZvbGxvd2luZyBgICtcbiAgICAgICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290OiBPd2xOYXRpdmVEYXRlVGltZU1vZHVsZSwgT3dsTW9tZW50RGF0ZVRpbWVNb2R1bGUsIG9yIHByb3ZpZGUgYSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGN1c3RvbSBpbXBsZW1lbnRhdGlvbi5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lRm9ybWF0cykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgT1dMX0RBVEVfVElNRV9GT1JNQVRTLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBmb2xsb3dpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdDogT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUsIE93bE1vbWVudERhdGVUaW1lTW9kdWxlLCBvciBwcm92aWRlIGEgYCArXG4gICAgICAgICAgICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9jYWxlU3ViID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIubG9jYWxlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmR0UGlja2VyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IHRoZSBwaWNrZXIgaW5wdXQgZG9lc24ndCBoYXZlIGFueSBhc3NvY2lhdGVkIG93bC1kYXRlLXRpbWUgY29tcG9uZW50YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHRQaWNrZXJTdWIgPSB0aGlzLmR0UGlja2VyLmNvbmZpcm1TZWxlY3RlZENoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoc2VsZWN0ZWRzOiBUW10gfCBUKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHNlbGVjdGVkcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gc2VsZWN0ZWRzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZShzZWxlY3RlZHMpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzZWxlY3RlZHMsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUlucHV0LmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzZWxlY3RlZHMsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmR0UGlja2VyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMubG9jYWxlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yID8gdGhpcy52YWxpZGF0b3IoYykgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIHRoZSBwaWNrZXIgd2hlbiB1c2VyIGhvbGQgYWx0ICsgRE9XTl9BUlJPV1xuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVLZXlkb3duT25Ib3N0KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudC5hbHRLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gRE9XTl9BUlJPVykge1xuICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5vcGVuKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUJsdXJPbkhvc3QoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlSW5wdXRPbkhvc3QoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUlucHV0SW5TaW5nbGVNb2RlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2UnKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUlucHV0SW5SYW5nZU1vZGUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbnB1dEluUmFuZ2VGcm9tVG9Nb2RlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUNoYW5nZU9uSG9zdChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCB2O1xuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgdiA9IHRoaXMudmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICB2ID0gdGhpcy52YWx1ZXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGVUaW1lQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgdmFsdWU6IHYsXG4gICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG5hdGl2ZSBpbnB1dCBwcm9wZXJ0eSAndmFsdWUnXG4gICAgICovXG4gICAgcHVibGljIGZvcm1hdE5hdGl2ZUlucHV0VmFsdWUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIuZm9ybWF0U3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlcyAmJiB0aGlzLnZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbSA9IHRoaXMuX3ZhbHVlc1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCB0byA9IHRoaXMuX3ZhbHVlc1sxXTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZyb21Gb3JtYXR0ZWQgPSBmcm9tXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0UGlja2VyLmZvcm1hdFN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgICAgICBjb25zdCB0b0Zvcm1hdHRlZCA9IHRvXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0byxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5mb3JtYXRTdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZyb21Gb3JtYXR0ZWQgJiYgIXRvRm9ybWF0dGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7ZnJvbUZvcm1hdHRlZH0gJHt0aGlzLnJhbmdlU2VwYXJhdG9yfSAke3RvRm9ybWF0dGVkfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb21Gb3JtYXR0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b0Zvcm1hdHRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIHRoZSByZWxhdGlvbnNoaXAgYmV0d2VlbiB0aGlzIGlucHV0IGFuZCBpdHMgcGlja2VyIGNvbXBvbmVudFxuICAgICAqL1xuICAgIHByaXZhdGUgcmVnaXN0ZXJEYXRlVGltZVBpY2tlcihwaWNrZXI6IE93bERhdGVUaW1lQ29tcG9uZW50PFQ+KSB7XG4gICAgICAgIGlmIChwaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIgPSBwaWNrZXI7XG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyLnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgZ2l2ZW4gb2JqIHRvIGEgdmFsaWQgZGF0ZSBvYmplY3RcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKVxuICAgICAgICAgICAgPyBvYmpcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgdGltZSBzdHJpbmcgdG8gYSBkYXRlLXRpbWUgc3RyaW5nXG4gICAgICogV2hlbiBwaWNrZXJUeXBlIGlzICd0aW1lcicsIHRoZSB2YWx1ZSBpbiB0aGUgcGlja2VyJ3MgaW5wdXQgaXMgYSB0aW1lIHN0cmluZy5cbiAgICAgKiBUaGUgZGF0ZVRpbWVBZGFwdGVyIHBhcnNlIGZuIGNvdWxkIG5vdCBwYXJzZSBhIHRpbWUgc3RyaW5nIHRvIGEgRGF0ZSBPYmplY3QuXG4gICAgICogVGhlcmVmb3JlIHdlIG5lZWQgdGhpcyBmbiB0byBjb252ZXJ0IGEgdGltZSBzdHJpbmcgdG8gYSBkYXRlLXRpbWUgc3RyaW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICB0aW1lU3RyaW5nOiBzdHJpbmcsXG4gICAgICAgIGRhdGVUaW1lOiBUXG4gICAgKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGlmICh0aW1lU3RyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gZGF0ZVRpbWUgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxuICAgICAgICAgICAgICAgIHYsXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUZvcm1hdHMuZGF0ZVBpY2tlcklucHV0XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmcgKyAnICcgKyB0aW1lU3RyaW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5wdXQgY2hhbmdlIGluIHNpbmdsZSBtb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VJbnB1dEluU2luZ2xlTW9kZShpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWRGb3JtYXQoaW5wdXRWYWx1ZSwgdGhpcy5kdFBpY2tlci5mb3JtYXRTdHJpbmcpO1xuXG4gICAgICAgIGxldCB2YWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmR0UGlja2VyLnBpY2tlclR5cGUgPT09ICd0aW1lcicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jb252ZXJ0VGltZVN0cmluZ1RvRGF0ZVRpbWVTdHJpbmcodmFsdWUsIHRoaXMudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XG4gICAgICAgICk7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuZ2V0VmFsaWREYXRlKHJlc3VsdCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIG5ld1ZhbHVlIGlzIHRoZSBzYW1lIGFzIHRoZSBvbGRWYWx1ZSwgd2UgaW50ZW5kIHRvIG5vdCBmaXJlIHRoZSB2YWx1ZUNoYW5nZSBldmVudFxuICAgICAgICAvLyByZXN1bHQgZXF1YWxzIHRvIG51bGwgbWVhbnMgdGhlcmUgaXMgaW5wdXQgZXZlbnQsIGJ1dCB0aGUgaW5wdXQgdmFsdWUgaXMgaW52YWxpZFxuICAgICAgICBpZiAoIXRoaXMuaXNTYW1lVmFsdWUocmVzdWx0LCB0aGlzLl92YWx1ZSkgfHwgcmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHJlc3VsdDtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChyZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lSW5wdXQuZW1pdCh7XG4gICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGlucHV0IGNoYW5nZSBpbiByYW5nZUZyb20gb3IgcmFuZ2VUbyBtb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VJbnB1dEluUmFuZ2VGcm9tVG9Nb2RlKGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZEZvcm1hdChpbnB1dFZhbHVlLCB0aGlzLmR0UGlja2VyLmZvcm1hdFN0cmluZyk7XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxWYWx1ZSA9XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJ1xuICAgICAgICAgICAgICAgID8gdGhpcy5fdmFsdWVzWzBdXG4gICAgICAgICAgICAgICAgOiB0aGlzLl92YWx1ZXNbMV07XG5cbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIucGlja2VyVHlwZSA9PT0gJ3RpbWVyJykge1xuICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5wYXJzZShcbiAgICAgICAgICAgIGlucHV0VmFsdWUsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XG4gICAgICAgICk7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuZ2V0VmFsaWREYXRlKHJlc3VsdCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIG5ld1ZhbHVlIGlzIHRoZSBzYW1lIGFzIHRoZSBvbGRWYWx1ZSwgd2UgaW50ZW5kIHRvIG5vdCBmaXJlIHRoZSB2YWx1ZUNoYW5nZSBldmVudFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2FtZVZhbHVlKHJlc3VsdCwgdGhpcy5fdmFsdWVzWzBdKSAmJlxuICAgICAgICAgICAgICAgIHJlc3VsdCkgfHxcbiAgICAgICAgICAgICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VUbycgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2FtZVZhbHVlKHJlc3VsdCwgdGhpcy5fdmFsdWVzWzFdKSAmJlxuICAgICAgICAgICAgICAgIHJlc3VsdClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92YWx1ZXMgPVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbSdcbiAgICAgICAgICAgICAgICA/IFtyZXN1bHQsIHRoaXMuX3ZhbHVlc1sxXV1cbiAgICAgICAgICAgICAgICA6IFt0aGlzLl92YWx1ZXNbMF0sIHJlc3VsdF07XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZXMpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5fdmFsdWVzKTtcbiAgICAgICAgdGhpcy5kYXRlVGltZUlucHV0LmVtaXQoe1xuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3ZhbHVlcyxcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBpbnB1dCBjaGFuZ2UgaW4gcmFuZ2UgbW9kZVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlSW5wdXRJblJhbmdlTW9kZShpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRzID0gaW5wdXRWYWx1ZS5zcGxpdCh0aGlzLnJhbmdlU2VwYXJhdG9yKTtcbiAgICAgICAgbGV0IGZyb21TdHJpbmcgPSAoc2VsZWN0ZWRzWzBdIHx8ICcnKS50cmltKCk7XG4gICAgICAgIGxldCB0b1N0cmluZyA9IChzZWxlY3RlZHNbMV0gfHwgJycpLnRyaW0oKTtcblxuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID1cbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWRGb3JtYXQoZnJvbVN0cmluZywgdGhpcy5kdFBpY2tlci5mb3JtYXRTdHJpbmcpICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkRm9ybWF0KHRvU3RyaW5nLCB0aGlzLmR0UGlja2VyLmZvcm1hdFN0cmluZyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIucGlja2VyVHlwZSA9PT0gJ3RpbWVyJykge1xuICAgICAgICAgICAgZnJvbVN0cmluZyA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICAgICAgICAgIGZyb21TdHJpbmcsXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbMF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0b1N0cmluZyA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICAgICAgICAgIHRvU3RyaW5nLFxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzWzFdXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZyb20gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5wYXJzZShcbiAgICAgICAgICAgIGZyb21TdHJpbmcsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XG4gICAgICAgICk7XG4gICAgICAgIGxldCB0byA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKFxuICAgICAgICAgICAgdG9TdHJpbmcsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XG4gICAgICAgICk7XG4gICAgICAgIGZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShmcm9tKTtcbiAgICAgICAgdG8gPSB0aGlzLmdldFZhbGlkRGF0ZSh0byk7XG5cbiAgICAgICAgLy8gaWYgdGhlIG5ld1ZhbHVlIGlzIHRoZSBzYW1lIGFzIHRoZSBvbGRWYWx1ZSwgd2UgaW50ZW5kIHRvIG5vdCBmaXJlIHRoZSB2YWx1ZUNoYW5nZSBldmVudFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5pc1NhbWVWYWx1ZShmcm9tLCB0aGlzLl92YWx1ZXNbMF0pIHx8XG4gICAgICAgICAgICAhdGhpcy5pc1NhbWVWYWx1ZSh0bywgdGhpcy5fdmFsdWVzWzFdKSB8fFxuICAgICAgICAgICAgKGZyb20gPT09IG51bGwgJiYgdG8gPT09IG51bGwpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gW2Zyb20sIHRvXTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZXMpO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lSW5wdXQuZW1pdCh7XG4gICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLl92YWx1ZXMsXG4gICAgICAgICAgICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIHR3byB2YWx1ZSBpcyB0aGUgc2FtZVxuICAgICAqL1xuICAgIHByaXZhdGUgaXNTYW1lVmFsdWUoZmlyc3Q6IFQgfCBudWxsLCBzZWNvbmQ6IFQgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaXJzdCAmJiBzZWNvbmQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGZpcnN0LCBzZWNvbmQpID09PSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpcnN0ID09PSBzZWNvbmQ7XG4gICAgfVxufVxuIl19