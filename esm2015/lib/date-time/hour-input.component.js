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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG91ci1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvaG91ci1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBa0J6RSxNQUFNLE9BQU8scUJBQXFCOzs7O0lBc0I5QixZQUFvQixVQUEyQjtRQUEzQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQVJ0QyxRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsUUFBRyxHQUFHLEVBQUUsQ0FBQztRQUNULFNBQUksR0FBRyxDQUFDLENBQUM7UUFFUixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFM0MsU0FBSSxHQUFHLEtBQUssQ0FBQztRQXlGckIsYUFBUTs7O1FBQVEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDO1FBRXpCLFlBQU87OztRQUFRLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztJQXpGMEIsQ0FBQzs7OztJQWhCbkQsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBQ0QsSUFBYSxLQUFLLENBQUMsS0FBYTtRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7OztJQVdELElBQUksaUJB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S0FBSztrQkFLTCxLQUFLO2tCQUNMLEtBQUs7bUJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLE1BQU07Ozs7SUFqQlAsK0NBQWdDOztJQUNoQyw4Q0FBZ0M7O0lBQ2hDLGlEQUFrQzs7SUFDbEMsZ0RBQWtDOzs7OztJQUNsQyx1Q0FBdUI7O0lBU3ZCLG9DQUFpQjs7SUFDakIsb0NBQWtCOztJQUNsQixxQ0FBa0I7O0lBQ2xCLDRDQUE4Qjs7SUFDOUIsNENBQW1EOzs7OztJQUVuRCxxQ0FBcUI7O0lBeUZyQix5Q0FBeUI7O0lBRXpCLHdDQUF3Qjs7Ozs7SUF6RlosMkNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGhvdXItaW5wdXQuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgZm9yd2FyZFJlZixcclxuICAgIElucHV0LFxyXG4gICAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE93bERhdGVUaW1lSW50bCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIGV4cG9ydEFzOiAnb3dsSG91cklucHV0JyxcclxuICAgIHNlbGVjdG9yOiAnb3dsLWhvdXItaW5wdXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hvdXItaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5vd2wtaG91ci1pbnB1dF0nOiAnb3dsSG91cklucHV0Q2xhc3MnXHJcbiAgICB9LFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT3dsSG91cklucHV0Q29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPd2xIb3VySW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgICBASW5wdXQoKSB1cEJ0bkFyaWFMYWJlbDogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgdXBCdG5EaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGRvd25CdG5BcmlhTGFiZWw6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGRvd25CdG5EaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XHJcbiAgICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcbiAgICBASW5wdXQoKSBzZXQgdmFsdWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoKHZhbHVlKTtcclxuICAgIH1cclxuICAgIEBJbnB1dCgpIG1pbiA9IDA7XHJcbiAgICBASW5wdXQoKSBtYXggPSAyMztcclxuICAgIEBJbnB1dCgpIHN0ZXAgPSAxO1xyXG4gICAgQElucHV0KCkgaG91cjEyVGltZXI6IGJvb2xlYW47XHJcbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgICBwcml2YXRlIGlzUE0gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCkge31cclxuXHJcbiAgICBnZXQgaG91cjEyQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1BNXHJcbiAgICAgICAgICAgID8gdGhpcy5waWNrZXJJbnRsLmhvdXIxMlBNTGFiZWxcclxuICAgICAgICAgICAgOiB0aGlzLnBpY2tlckludGwuaG91cjEyQU1MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsSG91cklucHV0Q2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhvdXJWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBib3hWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuaG91clZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaG91cjEyVGltZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhvdXJzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChob3VycyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaG91cnMgPSAxMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXJzID4gMCAmJiBob3VycyA8IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VycyA9PT0gMTIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiAxMiAmJiBob3VycyA8IDI0KSB7XHJcbiAgICAgICAgICAgICAgICBob3VycyA9IGhvdXJzIC0gMTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBob3VycztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwQnRuQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlICsgdGhpcy5zdGVwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG93bkJ0bkNsaWNrZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQodGhpcy52YWx1ZSAtIHRoaXMuc3RlcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFZhbHVlVmlhSW5wdXQoaG91cnM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMuaXNQTSAmJiBob3VycyA+PSAxICYmIGhvdXJzIDw9IDExKSB7XHJcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgKyAxMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUgJiYgIXRoaXMuaXNQTSAmJiBob3VycyA9PT0gMTIpIHtcclxuICAgICAgICAgICAgaG91cnMgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IGhvdXJzO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRWYWx1ZShob3VyczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGhvdXJzIDwgdGhpcy5taW4pIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiB0aGlzLm1heCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGhvdXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TWVyaWRpYW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc1BNID0gIXRoaXMuaXNQTTtcclxuICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmhvdXJWYWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQTSkge1xyXG4gICAgICAgICAgICBob3VycyA9IGhvdXJzICsgMTI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaG91cnMgPSBob3VycyAtIDEyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhvdXJzID49IDAgJiYgaG91cnMgPD0gMjMpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShob3Vycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsdWVDaGFuZ2VkKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgICBvblRvdWNoOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaCA9IGZuO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==