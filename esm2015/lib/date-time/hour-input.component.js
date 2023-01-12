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
export class OwlHourInputComponent {
    /**
     * @param {?} pickerIntl
     */
    constructor(pickerIntl) {
        this.pickerIntl = pickerIntl;
        this.min = 0;
        this.max = 23;
        this.step = 1;
        this.valueChange = new EventEmitter();
        this.isPM = false;
        this.onChange = (/**
         * @return {?}
         */
        () => { });
        this.onTouch = (/**
         * @return {?}
         */
        () => { });
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
        this._value = value;
        this.onChange(value);
        this.onTouch(value);
    }
    /**
     * @return {?}
     */
    get hour12ButtonLabel() {
        return this.isPM
            ? this.pickerIntl.hour12PMLabel
            : this.pickerIntl.hour12AMLabel;
    }
    /**
     * @return {?}
     */
    get owlHourInputClass() {
        return true;
    }
    /**
     * @return {?}
     */
    get hourValue() {
        return this.value;
    }
    /**
     * @return {?}
     */
    get boxValue() {
        /** @type {?} */
        let hours = this.hourValue;
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
    }
    /**
     * @return {?}
     */
    upBtnClicked() {
        this.valueChanged(this.value + this.step);
    }
    /**
     * @return {?}
     */
    downBtnClicked() {
        this.valueChanged(this.value - this.step);
    }
    /**
     * @param {?} hours
     * @return {?}
     */
    setValueViaInput(hours) {
        if (this.value && this.isPM && hours >= 1 && hours <= 11) {
            hours = hours + 12;
        }
        else if (this.value && !this.isPM && hours === 12) {
            hours = 0;
        }
        this.value = hours;
        this.valueChanged(this.value);
    }
    /**
     * @param {?} hours
     * @return {?}
     */
    setValue(hours) {
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
    }
    /**
     * @return {?}
     */
    setMeridian() {
        this.isPM = !this.isPM;
        /** @type {?} */
        let hours = this.hourValue;
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
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    valueChanged(value) {
        this.valueChange.emit(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
}
OwlHourInputComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'owlHourInput',
                selector: 'owl-hour-input',
                template: "<owl-date-time-timer-box\r\n    [upBtnAriaLabel]=\"upBtnAriaLabel\"\r\n    [downBtnAriaLabel]=\"downBtnAriaLabel\"\r\n    [upBtnDisabled]=\"disabled\"\r\n    [downBtnDisabled]=\"disabled\"\r\n    [boxValue]=\"boxValue\"\r\n    [value]=\"value\"\r\n    [min]=\"0\"\r\n    [max]=\"23\"\r\n    [step]=\"step\"\r\n    [inputLabel]=\"'Hour'\"\r\n    (inputChange)=\"setValueViaInput($event)\"\r\n    (valueChange)=\"setValue($event)\"\r\n></owl-date-time-timer-box>\r\n\r\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\r\n    <button\r\n        class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\r\n        type=\"button\"\r\n        tabindex=\"0\"\r\n        (click)=\"setMeridian()\"\r\n        [disabled]=\"disabled\"\r\n    >\r\n        <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n            {{ hour12ButtonLabel }}\r\n        </span>\r\n    </button>\r\n</div>\r\n",
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
                        () => OwlHourInputComponent)),
                        multi: true
                    }
                ]
            }] }
];
/** @nocollapse */
OwlHourInputComponent.ctorParameters = () => [
    { type: OwlDateTimeIntl }
];
OwlHourInputComponent.propDecorators = {
    upBtnAriaLabel: [{ type: Input }],
    downBtnAriaLabel: [{ type: Input }],
    value: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    step: [{ type: Input }],
    hour12Timer: [{ type: Input }],
    disabled: [{ type: Input }],
    valueChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    OwlHourInputComponent.prototype.upBtnAriaLabel;
    /** @type {?} */
    OwlHourInputComponent.prototype.downBtnAriaLabel;
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
    OwlHourInputComponent.prototype.disabled;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG91ci1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvaG91ci1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBa0J6RSxNQUFNLE9BQU8scUJBQXFCOzs7O0lBcUI5QixZQUFvQixVQUEyQjtRQUEzQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQVR0QyxRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsUUFBRyxHQUFHLEVBQUUsQ0FBQztRQUNULFNBQUksR0FBRyxDQUFDLENBQUM7UUFHUixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFM0MsU0FBSSxHQUFHLEtBQUssQ0FBQztRQXlGckIsYUFBUTs7O1FBQVEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDO1FBRXpCLFlBQU87OztRQUFRLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztJQXpGMEIsQ0FBQzs7OztJQWpCbkQsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBYSxLQUFLLENBQUMsS0FBYTtRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7OztJQVlELElBQUksaUJB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S0FBSzttQkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxNQUFNOzs7O0lBaEJQLCtDQUFnQzs7SUFDaEMsaURBQWtDOzs7OztJQUNsQyx1Q0FBdUI7O0lBU3ZCLG9DQUFpQjs7SUFDakIsb0NBQWtCOztJQUNsQixxQ0FBa0I7O0lBQ2xCLDRDQUE4Qjs7SUFDOUIseUNBQTJCOztJQUMzQiw0Q0FBbUQ7Ozs7O0lBRW5ELHFDQUFxQjs7SUF5RnJCLHlDQUF5Qjs7SUFFekIsd0NBQXdCOzs7OztJQXpGWiwyQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogaG91ci1pbnB1dC5jb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBmb3J3YXJkUmVmLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnRsIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgZXhwb3J0QXM6ICdvd2xIb3VySW5wdXQnLFxyXG4gICAgc2VsZWN0b3I6ICdvd2wtaG91ci1pbnB1dCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vaG91ci1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLm93bC1ob3VyLWlucHV0XSc6ICdvd2xIb3VySW5wdXRDbGFzcydcclxuICAgIH0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPd2xIb3VySW5wdXRDb21wb25lbnQpLFxyXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE93bEhvdXJJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICAgIEBJbnB1dCgpIHVwQnRuQXJpYUxhYmVsOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBkb3duQnRuQXJpYUxhYmVsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xyXG4gICAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG4gICAgQElucHV0KCkgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICAgIHRoaXMub25Ub3VjaCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBASW5wdXQoKSBtaW4gPSAwO1xyXG4gICAgQElucHV0KCkgbWF4ID0gMjM7XHJcbiAgICBASW5wdXQoKSBzdGVwID0gMTtcclxuICAgIEBJbnB1dCgpIGhvdXIxMlRpbWVyOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgICBwcml2YXRlIGlzUE0gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCkge31cclxuXHJcbiAgICBnZXQgaG91cjEyQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1BNXHJcbiAgICAgICAgICAgID8gdGhpcy5waWNrZXJJbnRsLmhvdXIxMlBNTGFiZWxcclxuICAgICAgICAgICAgOiB0aGlzLnBpY2tlckludGwuaG91cjEyQU1MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsSG91cklucHV0Q2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhvdXJWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBib3hWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuaG91clZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaG91cjEyVGltZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhvdXJzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChob3VycyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaG91cnMgPSAxMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXJzID4gMCAmJiBob3VycyA8IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VycyA9PT0gMTIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiAxMiAmJiBob3VycyA8IDI0KSB7XHJcbiAgICAgICAgICAgICAgICBob3VycyA9IGhvdXJzIC0gMTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBob3VycztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwQnRuQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlICsgdGhpcy5zdGVwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG93bkJ0bkNsaWNrZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQodGhpcy52YWx1ZSAtIHRoaXMuc3RlcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFZhbHVlVmlhSW5wdXQoaG91cnM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMuaXNQTSAmJiBob3VycyA+PSAxICYmIGhvdXJzIDw9IDExKSB7XHJcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgKyAxMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUgJiYgIXRoaXMuaXNQTSAmJiBob3VycyA9PT0gMTIpIHtcclxuICAgICAgICAgICAgaG91cnMgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IGhvdXJzO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRWYWx1ZShob3VyczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGhvdXJzIDwgdGhpcy5taW4pIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiB0aGlzLm1heCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGhvdXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TWVyaWRpYW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc1BNID0gIXRoaXMuaXNQTTtcclxuICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmhvdXJWYWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQTSkge1xyXG4gICAgICAgICAgICBob3VycyA9IGhvdXJzICsgMTI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaG91cnMgPSBob3VycyAtIDEyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhvdXJzID49IDAgJiYgaG91cnMgPD0gMjMpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShob3Vycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsdWVDaGFuZ2VkKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgICBvblRvdWNoOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2ggPSBmbjtcclxuICAgIH1cclxufVxyXG4iXX0=