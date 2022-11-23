/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * hour-input.component
 */
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var OwlHourInputComponent = /** @class */ (function () {
    function OwlHourInputComponent(pickerIntl) {
        this.pickerIntl = pickerIntl;
        this.min = 0;
        this.max = 23;
        this.step = 1;
        this.valueChange = new EventEmitter();
        this.isPM = false;
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        this.onTouch = (/**
         * @return {?}
         */
        function () { });
    }
    Object.defineProperty(OwlHourInputComponent.prototype, "value", {
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
            this._value = value;
            this.onChange(value);
            this.onTouch(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlHourInputComponent.prototype, "hour12ButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isPM
                ? this.pickerIntl.hour12PMLabel
                : this.pickerIntl.hour12AMLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlHourInputComponent.prototype, "owlHourInputClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlHourInputComponent.prototype, "hourValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlHourInputComponent.prototype, "boxValue", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var hours = this.hourValue;
            if (!this.hour12Timer) {
                return hours;
            }
            else {
                if (hours === 0) {
                    hours = 12;
                    this.isPM = false;
                }
                else if (hours > 0 && hours < 12) {
                    this.isPM = false;
                }
                else if (hours === 12) {
                    this.isPM = true;
                }
                else if (hours > 12 && hours < 24) {
                    hours = hours - 12;
                    this.isPM = true;
                }
                return hours;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlHourInputComponent.prototype.upBtnClicked = /**
     * @return {?}
     */
    function () {
        this.valueChanged(this.value + this.step);
    };
    /**
     * @return {?}
     */
    OwlHourInputComponent.prototype.downBtnClicked = /**
     * @return {?}
     */
    function () {
        this.valueChanged(this.value - this.step);
    };
    /**
     * @param {?} hours
     * @return {?}
     */
    OwlHourInputComponent.prototype.setValueViaInput = /**
     * @param {?} hours
     * @return {?}
     */
    function (hours) {
        if (this.value && this.isPM && hours >= 1 && hours <= 11) {
            hours = hours + 12;
        }
        else if (this.value && !this.isPM && hours === 12) {
            hours = 0;
        }
        this.value = hours;
        this.valueChanged(this.value);
    };
    /**
     * @param {?} hours
     * @return {?}
     */
    OwlHourInputComponent.prototype.setValue = /**
     * @param {?} hours
     * @return {?}
     */
    function (hours) {
        if (hours < this.min) {
            this.value = this.max;
        }
        else if (hours > this.max) {
            this.value = this.min;
        }
        else {
            this.value = hours;
        }
        this.valueChanged(this.value);
    };
    /**
     * @return {?}
     */
    OwlHourInputComponent.prototype.setMeridian = /**
     * @return {?}
     */
    function () {
        this.isPM = !this.isPM;
        /** @type {?} */
        var hours = this.hourValue;
        if (this.isPM) {
            hours = hours + 12;
        }
        else {
            hours = hours - 12;
        }
        if (hours >= 0 && hours <= 23) {
            this.setValue(hours);
        }
        this.valueChanged(this.value);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    OwlHourInputComponent.prototype.valueChanged = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.valueChange.emit(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    OwlHourInputComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    OwlHourInputComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    OwlHourInputComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouch = fn;
    };
    OwlHourInputComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'owlHourInput',
                    selector: 'owl-hour-input',
                    template: "<owl-date-time-timer-box\r\n    [upBtnAriaLabel]=\"upBtnAriaLabel\"\r\n    [downBtnAriaLabel]=\"downBtnAriaLabel\"\r\n    [upBtnDisabled]=\"upBtnDisabled\"\r\n    [downBtnDisabled]=\"downBtnDisabled\"\r\n    [boxValue]=\"boxValue\"\r\n    [value]=\"value\"\r\n    [min]=\"0\"\r\n    [max]=\"23\"\r\n    [step]=\"step\"\r\n    [inputLabel]=\"'Hour'\"\r\n    (inputChange)=\"setValueViaInput($event)\"\r\n    (valueChange)=\"setValue($event)\"\r\n></owl-date-time-timer-box>\r\n\r\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\r\n    <button\r\n        class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\r\n        type=\"button\"\r\n        tabindex=\"0\"\r\n        (click)=\"setMeridian()\"\r\n    >\r\n        <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n            {{ hour12ButtonLabel }}\r\n        </span>\r\n    </button>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.owl-hour-input]': 'owlHourInputClass'
                    },
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return OwlHourInputComponent; })),
                            multi: true
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    OwlHourInputComponent.ctorParameters = function () { return [
        { type: OwlDateTimeIntl }
    ]; };
    OwlHourInputComponent.propDecorators = {
        upBtnAriaLabel: [{ type: Input }],
        upBtnDisabled: [{ type: Input }],
        downBtnAriaLabel: [{ type: Input }],
        downBtnDisabled: [{ type: Input }],
        value: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        step: [{ type: Input }],
        hour12Timer: [{ type: Input }],
        valueChange: [{ type: Output }]
    };
    return OwlHourInputComponent;
}());
export { OwlHourInputComponent };
if (false) {
    /** @type {?} */
    OwlHourInputComponent.prototype.upBtnAriaLabel;
    /** @type {?} */
    OwlHourInputComponent.prototype.upBtnDisabled;
    /** @type {?} */
    OwlHourInputComponent.prototype.downBtnAriaLabel;
    /** @type {?} */
    OwlHourInputComponent.prototype.downBtnDisabled;
    /**
     * @type {?}
     * @private
     */
    OwlHourInputComponent.prototype._value;
    /** @type {?} */
    OwlHourInputComponent.prototype.min;
    /** @type {?} */
    OwlHourInputComponent.prototype.max;
    /** @type {?} */
    OwlHourInputComponent.prototype.step;
    /** @type {?} */
    OwlHourInputComponent.prototype.hour12Timer;
    /** @type {?} */
    OwlHourInputComponent.prototype.valueChange;
    /**
     * @type {?}
     * @private
     */
    OwlHourInputComponent.prototype.isPM;
    /** @type {?} */
    OwlHourInputComponent.prototype.onChange;
    /** @type {?} */
    OwlHourInputComponent.prototype.onTouch;
    /**
     * @type {?}
     * @private
     */
    OwlHourInputComponent.prototype.pickerIntl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG91ci1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvaG91ci1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFO0lBc0NJLCtCQUFvQixVQUEyQjtRQUEzQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQVJ0QyxRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsUUFBRyxHQUFHLEVBQUUsQ0FBQztRQUNULFNBQUksR0FBRyxDQUFDLENBQUM7UUFFUixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFM0MsU0FBSSxHQUFHLEtBQUssQ0FBQztRQXlGckIsYUFBUTs7O1FBQVEsY0FBTyxDQUFDLEVBQUM7UUFFekIsWUFBTzs7O1FBQVEsY0FBTyxDQUFDLEVBQUM7SUF6RjBCLENBQUM7SUFoQm5ELHNCQUFJLHdDQUFLOzs7O1FBQVQ7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFDRCxVQUFtQixLQUFhO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixDQUFDOzs7T0FMQTtJQWdCRCxzQkFBSSxvREFBaUI7Ozs7UUFBckI7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJ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RUFBckIsQ0FBcUIsRUFBQzs0QkFDcEQsS0FBSyxFQUFFLElBQUk7eUJBQ2Q7cUJBQ0o7aUJBQ0o7Ozs7Z0JBbEJRLGVBQWU7OztpQ0FvQm5CLEtBQUs7Z0NBQ0wsS0FBSzttQ0FDTCxLQUFLO2tDQUNMLEtBQUs7d0JBS0wsS0FBSztzQkFLTCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLE1BQU07O0lBeUdYLDRCQUFDO0NBQUEsQUEzSUQsSUEySUM7U0EzSFkscUJBQXFCOzs7SUFDOUIsK0NBQWdDOztJQUNoQyw4Q0FBZ0M7O0lBQ2hDLGlEQUFrQzs7SUFDbEMsZ0RBQWtDOzs7OztJQUNsQyx1Q0FBdUI7O0lBU3ZCLG9DQUFpQjs7SUFDakIsb0NBQWtCOztJQUNsQixxQ0FBa0I7O0lBQ2xCLDRDQUE4Qjs7SUFDOUIsNENBQW1EOzs7OztJQUVuRCxxQ0FBcUI7O0lBeUZyQix5Q0FBeUI7O0lBRXpCLHdDQUF3Qjs7Ozs7SUF6RlosMkNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGhvdXItaW5wdXQuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgZm9yd2FyZFJlZixcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE93bERhdGVUaW1lSW50bCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIGV4cG9ydEFzOiAnb3dsSG91cklucHV0JyxcclxuICAgIHNlbGVjdG9yOiAnb3dsLWhvdXItaW5wdXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hvdXItaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5vd2wtaG91ci1pbnB1dF0nOiAnb3dsSG91cklucHV0Q2xhc3MnXHJcbiAgICB9LFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT3dsSG91cklucHV0Q29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPd2xIb3VySW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgICBASW5wdXQoKSB1cEJ0bkFyaWFMYWJlbDogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgdXBCdG5EaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGRvd25CdG5BcmlhTGFiZWw6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGRvd25CdG5EaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XHJcbiAgICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcbiAgICBASW5wdXQoKSBzZXQgdmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHZhbHVlKTtcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIG1pbiA9IDA7XHJcbiAgICBASW5wdXQoKSBtYXggPSAyMztcclxuICAgIEBJbnB1dCgpIHN0ZXAgPSAxO1xyXG4gICAgQElucHV0KCkgaG91cjEyVGltZXI6IGJvb2xlYW47XHJcbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgICBwcml2YXRlIGlzUE0gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCkge31cclxuXHJcbiAgICBnZXQgaG91cjEyQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1BNXHJcbiAgICAgICAgICAgID8gdGhpcy5waWNrZXJJbnRsLmhvdXIxMlBNTGFiZWxcclxuICAgICAgICAgICAgOiB0aGlzLnBpY2tlckludGwuaG91cjEyQU1MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsSG91cklucHV0Q2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhvdXJWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBib3hWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuaG91clZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaG91cjEyVGltZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhvdXJzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChob3VycyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaG91cnMgPSAxMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXJzID4gMCAmJiBob3VycyA8IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VycyA9PT0gMTIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiAxMiAmJiBob3VycyA8IDI0KSB7XHJcbiAgICAgICAgICAgICAgICBob3VycyA9IGhvdXJzIC0gMTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBob3VycztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwQnRuQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlICsgdGhpcy5zdGVwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG93bkJ0bkNsaWNrZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQodGhpcy52YWx1ZSAtIHRoaXMuc3RlcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFZhbHVlVmlhSW5wdXQoaG91cnM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMuaXNQTSAmJiBob3VycyA+PSAxICYmIGhvdXJzIDw9IDExKSB7XHJcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgKyAxMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUgJiYgIXRoaXMuaXNQTSAmJiBob3VycyA9PT0gMTIpIHtcclxuICAgICAgICAgICAgaG91cnMgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IGhvdXJzO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRWYWx1ZShob3VyczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGhvdXJzIDwgdGhpcy5taW4pIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiB0aGlzLm1heCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGhvdXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TWVyaWRpYW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc1BNID0gIXRoaXMuaXNQTTtcclxuICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmhvdXJWYWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQTSkge1xyXG4gICAgICAgICAgICBob3VycyA9IGhvdXJzICsgMTI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaG91cnMgPSBob3VycyAtIDEyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhvdXJzID49IDAgJiYgaG91cnMgPD0gMjMpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShob3Vycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsdWVDaGFuZ2VkKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgICBvblRvdWNoOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaCA9IGZuO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==