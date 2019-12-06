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
            return _this.lastValueValid
                ? null
                : { owlDateTimeParse: { text: _this.elmRef.nativeElement.value } };
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
        /** @type {?} */
        var value = inputValue;
        if (this.dtPicker.pickerType === 'timer') {
            value = this.convertTimeStringToDateTimeString(value, this.value);
        }
        /** @type {?} */
        var result = this.dateTimeAdapter.parse(value, this.dateTimeFormats.parseInput);
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
        /** @type {?} */
        var originalValue = this._selectMode === 'rangeFrom'
            ? this._values[0]
            : this._values[1];
        if (this.dtPicker.pickerType === 'timer') {
            inputValue = this.convertTimeStringToDateTimeString(inputValue, originalValue);
        }
        /** @type {?} */
        var result = this.dateTimeAdapter.parse(inputValue, this.dateTimeFormats.parseInput);
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
        var fromString = selecteds[0];
        /** @type {?} */
        var toString = selecteds[1];
        if (this.dtPicker.pickerType === 'timer') {
            fromString = this.convertTimeStringToDateTimeString(fromString, this.values[0]);
            toString = this.convertTimeStringToDateTimeString(toString, this.values[1]);
        }
        /** @type {?} */
        var from = this.dateTimeAdapter.parse(fromString, this.dateTimeFormats.parseInput);
        /** @type {?} */
        var to = this.dateTimeAdapter.parse(toString, this.dateTimeFormats.parseInput);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBRUgsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdILGFBQWEsRUFDYixpQkFBaUIsRUFJakIsVUFBVSxFQUNiLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUdwRSxNQUFNLEtBQU8sMkJBQTJCLEdBQVE7SUFDNUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLHlCQUF5QixFQUF6QixDQUF5QixFQUFDO0lBQ3hELEtBQUssRUFBRSxJQUFJO0NBQ2Q7O0FBRUQsTUFBTSxLQUFPLHVCQUF1QixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxjQUFNLE9BQUEseUJBQXlCLEVBQXpCLENBQXlCLEVBQUM7SUFD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QUMyQjs7Ozs7O0lBd0IzQix5Q0FBdUI7Ozs7OztJQVl2Qix5Q0FBdUI7Ozs7OztJQWN2QixnREFBMkM7Ozs7O0lBc0IzQyxtREFDcUI7Ozs7O0lBRXJCLDJDQUF5Qjs7Ozs7SUFzQnpCLDRDQUEwQjs7Ozs7SUErQjFCLG1EQUN5Qzs7Ozs7SUFLekMsa0RBQ3dDOzs7OztJQW1CeEMsNkNBQXlDOzs7OztJQUV6QyxnREFBdUQ7Ozs7O0lBQ3ZELDhDQUFxRDs7Ozs7SUFFckQsbURBQThCOzs7OztJQUU5QixrREFBOEM7Ozs7O0lBQzlDLG1EQUFrQzs7Ozs7SUFDbEMsc0RBQXFDOzs7Ozs7SUFHckMsbURBSUU7Ozs7OztJQUdGLGlEQStCRTs7Ozs7O0lBR0YsaURBK0JFOzs7Ozs7SUFHRixvREFXRTs7Ozs7OztJQU1GLG1EQW1CRTs7Ozs7O0lBR0YsOENBTUc7Ozs7O0lBR0gsZ0RBQXdEOzs7OztJQUd4RCxtREFBb0Q7Ozs7O0lBdUJoRCwyQ0FBMEI7Ozs7O0lBQzFCLDZDQUEyQjs7Ozs7SUFDM0Isb0RBQXVEOzs7OztJQUN2RCxvREFFMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1waWNrZXItaW5wdXQuZGlyZWN0aXZlXG4gKi9cblxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERPV05fQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFic3RyYWN0Q29udHJvbCxcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBOR19WQUxJREFUT1JTLFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIFZhbGlkYXRpb25FcnJvcnMsXG4gICAgVmFsaWRhdG9yLFxuICAgIFZhbGlkYXRvckZuLFxuICAgIFZhbGlkYXRvcnNcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBPV0xfREFURV9USU1FX0ZPUk1BVFMsXG4gICAgT3dsRGF0ZVRpbWVGb3JtYXRzXG59IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcbmltcG9ydCB7IE93bERhdGVUaW1lQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RNb2RlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuXG5leHBvcnQgY29uc3QgT1dMX0RBVEVUSU1FX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbmV4cG9ydCBjb25zdCBPV0xfREFURVRJTUVfVkFMSURBVE9SUzogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW5wdXRbb3dsRGF0ZVRpbWVdJyxcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lSW5wdXQnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duT25Ib3N0KCRldmVudCknLFxuICAgICAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXJPbkhvc3QoJGV2ZW50KScsXG4gICAgICAgICcoaW5wdXQpJzogJ2hhbmRsZUlucHV0T25Ib3N0KCRldmVudCknLFxuICAgICAgICAnKGNoYW5nZSknOiAnaGFuZGxlQ2hhbmdlT25Ib3N0KCRldmVudCknLFxuICAgICAgICAnW2F0dHIuYXJpYS1oYXNwb3B1cF0nOiAnb3dsRGF0ZVRpbWVJbnB1dEFyaWFIYXNwb3B1cCcsXG4gICAgICAgICdbYXR0ci5hcmlhLW93bnNdJzogJ293bERhdGVUaW1lSW5wdXRBcmlhT3ducycsXG4gICAgICAgICdbYXR0ci5taW5dJzogJ21pbklzbzg2MDEnLFxuICAgICAgICAnW2F0dHIubWF4XSc6ICdtYXhJc284NjAxJyxcbiAgICAgICAgJ1tkaXNhYmxlZF0nOiAnb3dsRGF0ZVRpbWVJbnB1dERpc2FibGVkJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbT1dMX0RBVEVUSU1FX1ZBTFVFX0FDQ0VTU09SLCBPV0xfREFURVRJTUVfVkFMSURBVE9SU11cbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZTxUPlxuICAgIGltcGxlbWVudHNcbiAgICAgICAgT25Jbml0LFxuICAgICAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgICAgICBPbkRlc3Ryb3ksXG4gICAgICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgICAgICBWYWxpZGF0b3Ige1xuICAgIC8qKlxuICAgICAqIFRoZSBkYXRlIHRpbWUgcGlja2VyIHRoYXQgdGhpcyBpbnB1dCBpcyBhc3NvY2lhdGVkIHdpdGguXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgb3dsRGF0ZVRpbWUodmFsdWU6IE93bERhdGVUaW1lQ29tcG9uZW50PFQ+KSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJEYXRlVGltZVBpY2tlcih2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB0byBmaWx0ZXIgZGF0ZSB0aW1lXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgb3dsRGF0ZVRpbWVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogVCB8IG51bGwpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGF0ZVRpbWVGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kYXRlVGltZUZpbHRlcjogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuO1xuICAgIGdldCBkYXRlVGltZUZpbHRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVUaW1lRmlsdGVyO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkYXRlIHRpbWUgcGlja2VyJ3MgaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIGlmICh0aGlzLl9kaXNhYmxlZCAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmVtaXQobmV3VmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgbmVlZCB0byBudWxsIGNoZWNrIHRoZSBgYmx1cmAgbWV0aG9kLCBiZWNhdXNlIGl0J3MgdW5kZWZpbmVkIGR1cmluZyBTU1IuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiBlbGVtZW50LmJsdXIpIHtcbiAgICAgICAgICAgIC8vIE5vcm1hbGx5LCBuYXRpdmUgaW5wdXQgZWxlbWVudHMgYXV0b21hdGljYWxseSBibHVyIGlmIHRoZXkgdHVybiBkaXNhYmxlZC4gVGhpcyBiZWhhdmlvclxuICAgICAgICAgICAgLy8gaXMgcHJvYmxlbWF0aWMsIGJlY2F1c2UgaXQgd291bGQgbWVhbiB0aGF0IGl0IHRyaWdnZXJzIGFub3RoZXIgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSxcbiAgICAgICAgICAgIC8vIHdoaWNoIHRoZW4gY2F1c2VzIGEgY2hhbmdlZCBhZnRlciBjaGVja2VkIGVycm9yIGlmIHRoZSBpbnB1dCBlbGVtZW50IHdhcyBmb2N1c2VkIGJlZm9yZS5cbiAgICAgICAgICAgIGVsZW1lbnQuYmx1cigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtaW5pbXVtIHZhbGlkIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfbWluOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW4oKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xuICAgIH1cblxuICAgIHNldCBtaW4odmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21pbiA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gdmFsaWQgZGF0ZS4gKi9cbiAgICBwcml2YXRlIF9tYXg6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heCgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XG4gICAgfVxuXG4gICAgc2V0IG1heCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWF4ID0gdGhpcy5nZXRWYWxpZERhdGUodGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBwaWNrZXIncyBzZWxlY3QgbW9kZVxuICAgICAqL1xuICAgIHByaXZhdGUgX3NlbGVjdE1vZGU6IFNlbGVjdE1vZGUgPSAnc2luZ2xlJztcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0TW9kZShtb2RlOiBTZWxlY3RNb2RlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG1vZGUgIT09ICdzaW5nbGUnICYmXG4gICAgICAgICAgICBtb2RlICE9PSAncmFuZ2UnICYmXG4gICAgICAgICAgICBtb2RlICE9PSAncmFuZ2VGcm9tJyAmJlxuICAgICAgICAgICAgbW9kZSAhPT0gJ3JhbmdlVG8nXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ093bERhdGVUaW1lIEVycm9yOiBpbnZhbGlkIHNlbGVjdE1vZGUgdmFsdWUhJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID0gbW9kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2hhcmFjdGVyIHRvIHNlcGFyYXRlIHRoZSAnZnJvbScgYW5kICd0bycgaW4gaW5wdXQgdmFsdWVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHJhbmdlU2VwYXJhdG9yID0gJy0nO1xuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICF2YWx1ZSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHZhbHVlKTtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IG9sZERhdGUgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAvLyBzZXQgdGhlIGlucHV0IHByb3BlcnR5ICd2YWx1ZSdcbiAgICAgICAgdGhpcy5mb3JtYXROYXRpdmVJbnB1dFZhbHVlKCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGlucHV0IHZhbHVlIGNoYW5nZWRcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0VxdWFsKG9sZERhdGUsIHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlczogVFtdID0gW107XG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVzO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZXModmFsdWVzOiBUW10pIHtcbiAgICAgICAgaWYgKHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzLm1hcCh2ID0+IHtcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWREYXRlKHYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID1cbiAgICAgICAgICAgICAgICAoIXRoaXMuX3ZhbHVlc1swXSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHRoaXMuX3ZhbHVlc1swXSkpICYmXG4gICAgICAgICAgICAgICAgKCF0aGlzLl92YWx1ZXNbMV0gfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZCh0aGlzLl92YWx1ZXNbMV0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgdGhlIGlucHV0IHByb3BlcnR5ICd2YWx1ZSdcbiAgICAgICAgdGhpcy5mb3JtYXROYXRpdmVJbnB1dFZhbHVlKCk7XG5cbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYGNoYW5nZWAgZXZlbnQgaXMgZmlyZWQgb24gdGhpcyBgPGlucHV0PmBcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBkYXRlVGltZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYW4gYGlucHV0YCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBkYXRlVGltZUlucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBnZXQgZWxlbWVudFJlZigpOiBFbGVtZW50UmVmIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxtUmVmO1xuICAgIH1cblxuICAgIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgfHxcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZVRvJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKiBUaGUgZGF0ZS10aW1lLXBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xuICAgIHB1YmxpYyBkdFBpY2tlcjogT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD47XG5cbiAgICBwcml2YXRlIGR0UGlja2VyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgcHJpdmF0ZSBsb2NhbGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgbGFzdFZhbHVlVmFsaWQgPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBvbk1vZGVsQ2hhbmdlID0gKGRhdGU6IFRbXSB8IFQpID0+IHt9O1xuICAgIHByaXZhdGUgb25Nb2RlbFRvdWNoZWQgPSAoKSA9PiB7fTtcbiAgICBwcml2YXRlIHZhbGlkYXRvck9uQ2hhbmdlID0gKCkgPT4ge307XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHdoZXRoZXIgdGhlIGlucHV0IHBhcnNlcy4gKi9cbiAgICBwcml2YXRlIHBhcnNlVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9ICgpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RWYWx1ZVZhbGlkXG4gICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgIDogeyBvd2xEYXRlVGltZVBhcnNlOiB7IHRleHQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgfSB9O1xuICAgIH07XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtaW4gZGF0ZS4gKi9cbiAgICBwcml2YXRlIG1pblZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoXG4gICAgICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICAgICk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLm1pbiB8fFxuICAgICAgICAgICAgICAgICFjb250cm9sVmFsdWUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHRoaXMubWluLCBjb250cm9sVmFsdWUpIDw9IDBcbiAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICA6IHsgb3dsRGF0ZVRpbWVNaW46IHsgbWluOiB0aGlzLm1pbiwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSAmJiBjb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sVmFsdWVGcm9tID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVswXSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sVmFsdWVUbyA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMV0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLm1pbiB8fFxuICAgICAgICAgICAgICAgICFjb250cm9sVmFsdWVGcm9tIHx8XG4gICAgICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZVRvIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZSh0aGlzLm1pbiwgY29udHJvbFZhbHVlRnJvbSkgPD0gMFxuICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgIG93bERhdGVUaW1lTWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogW2NvbnRyb2xWYWx1ZUZyb20sIGNvbnRyb2xWYWx1ZVRvXVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWF4IGRhdGUuICovXG4gICAgcHJpdmF0ZSBtYXhWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKFxuICAgICAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5tYXggfHxcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZSh0aGlzLm1heCwgY29udHJvbFZhbHVlKSA+PSAwXG4gICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgOiB7IG93bERhdGVUaW1lTWF4OiB7IG1heDogdGhpcy5tYXgsIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUgJiYgY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlRnJvbSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMF0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlVG8gPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzFdKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5tYXggfHxcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlRnJvbSB8fFxuICAgICAgICAgICAgICAgICFjb250cm9sVmFsdWVUbyB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUodGhpcy5tYXgsIGNvbnRyb2xWYWx1ZVRvKSA+PSAwXG4gICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgb3dsRGF0ZVRpbWVNYXg6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiBbY29udHJvbFZhbHVlRnJvbSwgY29udHJvbFZhbHVlVG9dXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBkYXRlIGZpbHRlci4gKi9cbiAgICBwcml2YXRlIGZpbHRlclZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoXG4gICAgICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICAgICk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gIXRoaXMuX2RhdGVUaW1lRmlsdGVyIHx8XG4gICAgICAgICAgICAhY29udHJvbFZhbHVlIHx8XG4gICAgICAgICAgICB0aGlzLl9kYXRlVGltZUZpbHRlcihjb250cm9sVmFsdWUpXG4gICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgIDogeyBvd2xEYXRlVGltZUZpbHRlcjogdHJ1ZSB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIHJhbmdlLlxuICAgICAqIENoZWNrIHdoZXRoZXIgdGhlICdiZWZvcmUnIHZhbHVlIGlzIGJlZm9yZSB0aGUgJ3RvJyB2YWx1ZVxuICAgICAqL1xuICAgIHByaXZhdGUgcmFuZ2VWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKFxuICAgICAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2xcbiAgICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlIHx8ICFjb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZUZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMF0pXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZVRvID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzFdKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiAhY29udHJvbFZhbHVlRnJvbSB8fFxuICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZVRvIHx8XG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGNvbnRyb2xWYWx1ZUZyb20sIGNvbnRyb2xWYWx1ZVRvKSA8PSAwXG4gICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgIDogeyBvd2xEYXRlVGltZVJhbmdlOiB0cnVlIH07XG4gICAgfTtcblxuICAgIC8qKiBUaGUgY29tYmluZWQgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhpcyBpbnB1dC4gKi9cbiAgICBwcml2YXRlIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gfCBudWxsID0gVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgdGhpcy5wYXJzZVZhbGlkYXRvcixcbiAgICAgICAgdGhpcy5taW5WYWxpZGF0b3IsXG4gICAgICAgIHRoaXMubWF4VmFsaWRhdG9yLFxuICAgICAgICB0aGlzLmZpbHRlclZhbGlkYXRvcixcbiAgICAgICAgdGhpcy5yYW5nZVZhbGlkYXRvclxuICAgIF0pO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMgKGVpdGhlciBkdWUgdG8gdXNlciBpbnB1dCBvciBwcm9ncmFtbWF0aWMgY2hhbmdlKS4gKi9cbiAgICBwdWJsaWMgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRbXSB8IFQgfCBudWxsPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGRpc2FibGVkIHN0YXRlIGhhcyBjaGFuZ2VkICovXG4gICAgcHVibGljIGRpc2FibGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgZ2V0IG93bERhdGVUaW1lSW5wdXRBcmlhSGFzcG9wdXAoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldCBvd2xEYXRlVGltZUlucHV0QXJpYU93bnMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmR0UGlja2VyLm9wZW5lZCAmJiB0aGlzLmR0UGlja2VyLmlkKSB8fCBudWxsO1xuICAgIH1cblxuICAgIGdldCBtaW5Jc284NjAxKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbiA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnRvSXNvODYwMSh0aGlzLm1pbikgOiBudWxsO1xuICAgIH1cblxuICAgIGdldCBtYXhJc284NjAxKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1heCA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnRvSXNvODYwMSh0aGlzLm1heCkgOiBudWxsO1xuICAgIH1cblxuICAgIGdldCBvd2xEYXRlVGltZUlucHV0RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsbVJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+LFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcbiAgICAgICAgcHJpdmF0ZSBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0c1xuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBEYXRlVGltZVBpY2tlci4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZm9sbG93aW5nIGAgK1xuICAgICAgICAgICAgICAgICAgICBgbW9kdWxlcyBhdCB5b3VyIGFwcGxpY2F0aW9uIHJvb3Q6IE93bE5hdGl2ZURhdGVUaW1lTW9kdWxlLCBPd2xNb21lbnREYXRlVGltZU1vZHVsZSwgb3IgcHJvdmlkZSBhIGAgK1xuICAgICAgICAgICAgICAgICAgICBgY3VzdG9tIGltcGxlbWVudGF0aW9uLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVGb3JtYXRzKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBPV0xfREFURV9USU1FX0ZPUk1BVFMuIFlvdSBtdXN0IGltcG9ydCBvbmUgb2YgdGhlIGZvbGxvd2luZyBgICtcbiAgICAgICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290OiBPd2xOYXRpdmVEYXRlVGltZU1vZHVsZSwgT3dsTW9tZW50RGF0ZVRpbWVNb2R1bGUsIG9yIHByb3ZpZGUgYSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGN1c3RvbSBpbXBsZW1lbnRhdGlvbi5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2NhbGVTdWIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5sb2NhbGVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZHRQaWNrZXIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBPd2xEYXRlVGltZVBpY2tlcjogdGhlIHBpY2tlciBpbnB1dCBkb2Vzbid0IGhhdmUgYW55IGFzc29jaWF0ZWQgb3dsLWRhdGUtdGltZSBjb21wb25lbnRgXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kdFBpY2tlclN1YiA9IHRoaXMuZHRQaWNrZXIuY29uZmlybVNlbGVjdGVkQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgICAgIChzZWxlY3RlZHM6IFRbXSB8IFQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3RlZHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzID0gc2VsZWN0ZWRzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZHM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHNlbGVjdGVkcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVDaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNlbGVjdGVkcyxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lSW5wdXQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNlbGVjdGVkcyxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHRQaWNrZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5sb2NhbGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IgPyB0aGlzLnZhbGlkYXRvcihjKSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gdGhlIHBpY2tlciB3aGVuIHVzZXIgaG9sZCBhbHQgKyBET1dOX0FSUk9XXG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZUtleWRvd25Pbkhvc3QoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50LmFsdEtleSAmJiBldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyLm9wZW4oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlQmx1ck9uSG9zdChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVJbnB1dE9uSG9zdChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW5wdXRJblNpbmdsZU1vZGUodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZScpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW5wdXRJblJhbmdlTW9kZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUlucHV0SW5SYW5nZUZyb21Ub01vZGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUNoYW5nZU9uSG9zdChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCB2O1xuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgdiA9IHRoaXMudmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICB2ID0gdGhpcy52YWx1ZXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGVUaW1lQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgdmFsdWU6IHYsXG4gICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG5hdGl2ZSBpbnB1dCBwcm9wZXJ0eSAndmFsdWUnXG4gICAgICovXG4gICAgcHVibGljIGZvcm1hdE5hdGl2ZUlucHV0VmFsdWUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIuZm9ybWF0U3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlcyAmJiB0aGlzLnZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbSA9IHRoaXMuX3ZhbHVlc1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCB0byA9IHRoaXMuX3ZhbHVlc1sxXTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZyb21Gb3JtYXR0ZWQgPSBmcm9tXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0UGlja2VyLmZvcm1hdFN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgICAgICBjb25zdCB0b0Zvcm1hdHRlZCA9IHRvXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0byxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5mb3JtYXRTdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZyb21Gb3JtYXR0ZWQgJiYgIXRvRm9ybWF0dGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7ZnJvbUZvcm1hdHRlZH0gJHt0aGlzLnJhbmdlU2VwYXJhdG9yfSAke3RvRm9ybWF0dGVkfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb21Gb3JtYXR0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b0Zvcm1hdHRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIHRoZSByZWxhdGlvbnNoaXAgYmV0d2VlbiB0aGlzIGlucHV0IGFuZCBpdHMgcGlja2VyIGNvbXBvbmVudFxuICAgICAqL1xuICAgIHByaXZhdGUgcmVnaXN0ZXJEYXRlVGltZVBpY2tlcihwaWNrZXI6IE93bERhdGVUaW1lQ29tcG9uZW50PFQ+KSB7XG4gICAgICAgIGlmIChwaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIgPSBwaWNrZXI7XG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyLnJlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgZ2l2ZW4gb2JqIHRvIGEgdmFsaWQgZGF0ZSBvYmplY3RcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKVxuICAgICAgICAgICAgPyBvYmpcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgdGltZSBzdHJpbmcgdG8gYSBkYXRlLXRpbWUgc3RyaW5nXG4gICAgICogV2hlbiBwaWNrZXJUeXBlIGlzICd0aW1lcicsIHRoZSB2YWx1ZSBpbiB0aGUgcGlja2VyJ3MgaW5wdXQgaXMgYSB0aW1lIHN0cmluZy5cbiAgICAgKiBUaGUgZGF0ZVRpbWVBZGFwdGVyIHBhcnNlIGZuIGNvdWxkIG5vdCBwYXJzZSBhIHRpbWUgc3RyaW5nIHRvIGEgRGF0ZSBPYmplY3QuXG4gICAgICogVGhlcmVmb3JlIHdlIG5lZWQgdGhpcyBmbiB0byBjb252ZXJ0IGEgdGltZSBzdHJpbmcgdG8gYSBkYXRlLXRpbWUgc3RyaW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICB0aW1lU3RyaW5nOiBzdHJpbmcsXG4gICAgICAgIGRhdGVUaW1lOiBUXG4gICAgKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGlmICh0aW1lU3RyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gZGF0ZVRpbWUgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxuICAgICAgICAgICAgICAgIHYsXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUZvcm1hdHMuZGF0ZVBpY2tlcklucHV0XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmcgKyAnICcgKyB0aW1lU3RyaW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5wdXQgY2hhbmdlIGluIHNpbmdsZSBtb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VJbnB1dEluU2luZ2xlTW9kZShpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IHZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIucGlja2VyVHlwZSA9PT0gJ3RpbWVyJykge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmNvbnZlcnRUaW1lU3RyaW5nVG9EYXRlVGltZVN0cmluZyh2YWx1ZSwgdGhpcy52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIucGFyc2UoXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLnBhcnNlSW5wdXRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICFyZXN1bHQgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChyZXN1bHQpO1xuICAgICAgICByZXN1bHQgPSB0aGlzLmdldFZhbGlkRGF0ZShyZXN1bHQpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBuZXdWYWx1ZSBpcyB0aGUgc2FtZSBhcyB0aGUgb2xkVmFsdWUsIHdlIGludGVuZCB0byBub3QgZmlyZSB0aGUgdmFsdWVDaGFuZ2UgZXZlbnRcbiAgICAgICAgLy8gcmVzdWx0IGVxdWFscyB0byBudWxsIG1lYW5zIHRoZXJlIGlzIGlucHV0IGV2ZW50LCBidXQgdGhlIGlucHV0IHZhbHVlIGlzIGludmFsaWRcbiAgICAgICAgaWYgKCF0aGlzLmlzU2FtZVZhbHVlKHJlc3VsdCwgdGhpcy5fdmFsdWUpIHx8IHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSByZXN1bHQ7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQocmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZShyZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUlucHV0LmVtaXQoe1xuICAgICAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBpbnB1dCBjaGFuZ2UgaW4gcmFuZ2VGcm9tIG9yIHJhbmdlVG8gbW9kZVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlSW5wdXRJblJhbmdlRnJvbVRvTW9kZShpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxWYWx1ZSA9XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJ1xuICAgICAgICAgICAgICAgID8gdGhpcy5fdmFsdWVzWzBdXG4gICAgICAgICAgICAgICAgOiB0aGlzLl92YWx1ZXNbMV07XG5cbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIucGlja2VyVHlwZSA9PT0gJ3RpbWVyJykge1xuICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5wYXJzZShcbiAgICAgICAgICAgIGlucHV0VmFsdWUsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhcmVzdWx0IHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQocmVzdWx0KTtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5nZXRWYWxpZERhdGUocmVzdWx0KTtcblxuICAgICAgICAvLyBpZiB0aGUgbmV3VmFsdWUgaXMgdGhlIHNhbWUgYXMgdGhlIG9sZFZhbHVlLCB3ZSBpbnRlbmQgdG8gbm90IGZpcmUgdGhlIHZhbHVlQ2hhbmdlIGV2ZW50XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaXNTYW1lVmFsdWUocmVzdWx0LCB0aGlzLl92YWx1ZXNbMF0pICYmXG4gICAgICAgICAgICAgICAgcmVzdWx0KSB8fFxuICAgICAgICAgICAgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZVRvJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaXNTYW1lVmFsdWUocmVzdWx0LCB0aGlzLl92YWx1ZXNbMV0pICYmXG4gICAgICAgICAgICAgICAgcmVzdWx0KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3ZhbHVlcyA9XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJ1xuICAgICAgICAgICAgICAgID8gW3Jlc3VsdCwgdGhpcy5fdmFsdWVzWzFdXVxuICAgICAgICAgICAgICAgIDogW3RoaXMuX3ZhbHVlc1swXSwgcmVzdWx0XTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLl92YWx1ZXMpO1xuICAgICAgICB0aGlzLmRhdGVUaW1lSW5wdXQuZW1pdCh7XG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fdmFsdWVzLFxuICAgICAgICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGlucHV0IGNoYW5nZSBpbiByYW5nZSBtb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VJbnB1dEluUmFuZ2VNb2RlKGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWxlY3RlZHMgPSBpbnB1dFZhbHVlLnNwbGl0KHRoaXMucmFuZ2VTZXBhcmF0b3IpO1xuICAgICAgICBsZXQgZnJvbVN0cmluZyA9IHNlbGVjdGVkc1swXTtcbiAgICAgICAgbGV0IHRvU3RyaW5nID0gc2VsZWN0ZWRzWzFdO1xuXG4gICAgICAgIGlmICh0aGlzLmR0UGlja2VyLnBpY2tlclR5cGUgPT09ICd0aW1lcicpIHtcbiAgICAgICAgICAgIGZyb21TdHJpbmcgPSB0aGlzLmNvbnZlcnRUaW1lU3RyaW5nVG9EYXRlVGltZVN0cmluZyhcbiAgICAgICAgICAgICAgICBmcm9tU3RyaW5nLFxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzWzBdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdG9TdHJpbmcgPSB0aGlzLmNvbnZlcnRUaW1lU3RyaW5nVG9EYXRlVGltZVN0cmluZyhcbiAgICAgICAgICAgICAgICB0b1N0cmluZyxcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlc1sxXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmcm9tID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIucGFyc2UoXG4gICAgICAgICAgICBmcm9tU3RyaW5nLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUZvcm1hdHMucGFyc2VJbnB1dFxuICAgICAgICApO1xuICAgICAgICBsZXQgdG8gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5wYXJzZShcbiAgICAgICAgICAgIHRvU3RyaW5nLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUZvcm1hdHMucGFyc2VJbnB1dFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID1cbiAgICAgICAgICAgICghZnJvbSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKGZyb20pKSAmJlxuICAgICAgICAgICAgKCF0byB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHRvKSk7XG4gICAgICAgIGZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShmcm9tKTtcbiAgICAgICAgdG8gPSB0aGlzLmdldFZhbGlkRGF0ZSh0byk7XG5cbiAgICAgICAgLy8gaWYgdGhlIG5ld1ZhbHVlIGlzIHRoZSBzYW1lIGFzIHRoZSBvbGRWYWx1ZSwgd2UgaW50ZW5kIHRvIG5vdCBmaXJlIHRoZSB2YWx1ZUNoYW5nZSBldmVudFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5pc1NhbWVWYWx1ZShmcm9tLCB0aGlzLl92YWx1ZXNbMF0pIHx8XG4gICAgICAgICAgICAhdGhpcy5pc1NhbWVWYWx1ZSh0bywgdGhpcy5fdmFsdWVzWzFdKSB8fFxuICAgICAgICAgICAgKGZyb20gPT09IG51bGwgJiYgdG8gPT09IG51bGwpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gW2Zyb20sIHRvXTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZXMpO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lSW5wdXQuZW1pdCh7XG4gICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLl92YWx1ZXMsXG4gICAgICAgICAgICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIHR3byB2YWx1ZSBpcyB0aGUgc2FtZVxuICAgICAqL1xuICAgIHByaXZhdGUgaXNTYW1lVmFsdWUoZmlyc3Q6IFQgfCBudWxsLCBzZWNvbmQ6IFQgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaXJzdCAmJiBzZWNvbmQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGZpcnN0LCBzZWNvbmQpID09PSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpcnN0ID09PSBzZWNvbmQ7XG4gICAgfVxufVxuIl19