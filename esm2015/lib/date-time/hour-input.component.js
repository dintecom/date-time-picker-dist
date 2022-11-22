/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * hour-input.component
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
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
    setHourValueViaInput(hours) {
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
    setHourValue(hours) {
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
            this.setHourValue(hours);
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
}
OwlHourInputComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'owlHourInput',
                selector: 'owl-hour-input',
                template: "<owl-date-time-timer-box\r\n    [upBtnAriaLabel]=\"upBtnAriaLabel\"\r\n    [downBtnAriaLabel]=\"downBtnAriaLabel\"\r\n    [upBtnDisabled]=\"upBtnDisabled\"\r\n    [downBtnDisabled]=\"downBtnDisabled\"\r\n    [boxValue]=\"boxValue\"\r\n    [value]=\"value\"\r\n    [min]=\"0\"\r\n    [max]=\"23\"\r\n    [step]=\"step\"\r\n    [inputLabel]=\"'Hour'\"\r\n    (inputChange)=\"setHourValueViaInput($event)\"\r\n    (valueChange)=\"setHourValue($event)\"\r\n></owl-date-time-timer-box>\r\n\r\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\r\n    <button\r\n        class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\r\n        type=\"button\"\r\n        tabindex=\"0\"\r\n        (click)=\"setMeridian()\"\r\n    >\r\n        <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n            {{ hour12ButtonLabel }}\r\n        </span>\r\n    </button>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.owl-hour-input]': 'owlHourInputClass'
                }
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
    /** @type {?} */
    OwlHourInputComponent.prototype.value;
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
    /**
     * @type {?}
     * @private
     */
    OwlHourInputComponent.prototype.pickerIntl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG91ci1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvaG91ci1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQVdsRSxNQUFNLE9BQU8scUJBQXFCOzs7O0lBYzlCLFlBQW9CLFVBQTJCO1FBQTNCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBUnRDLFFBQUcsR0FBRyxDQUFDLENBQUM7UUFDUixRQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ1QsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUVSLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUUzQyxTQUFJLEdBQUcsS0FBSyxDQUFDO0lBRTZCLENBQUM7Ozs7SUFFbkQsSUFBSSxpQkFBaUI7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSTtZQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7WUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCxJQUFJLGlCQUFpQjtRQUNqQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxJQUFJLFFBQVE7O1lBQ0osS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTO1FBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxJQUFJ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RUFBRSxnQkFBZ0I7Z0JBQzFCLHE0QkFBMEM7Z0JBQzFDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0Ysd0JBQXdCLEVBQUUsbUJBQW1CO2lCQUNoRDthQUNKOzs7O1lBVlEsZUFBZTs7OzZCQVluQixLQUFLOzRCQUNMLEtBQUs7K0JBQ0wsS0FBSzs4QkFDTCxLQUFLO29CQUNMLEtBQUs7a0JBQ0wsS0FBSztrQkFDTCxLQUFLO21CQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxNQUFNOzs7O0lBVFAsK0NBQWdDOztJQUNoQyw4Q0FBZ0M7O0lBQ2hDLGlEQUFrQzs7SUFDbEMsZ0RBQWtDOztJQUNsQyxzQ0FBdUI7O0lBQ3ZCLG9DQUFpQjs7SUFDakIsb0NBQWtCOztJQUNsQixxQ0FBa0I7O0lBQ2xCLDRDQUE4Qjs7SUFDOUIsNENBQW1EOzs7OztJQUVuRCxxQ0FBcUI7Ozs7O0lBRVQsMkNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGhvdXItaW5wdXQuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnRsIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIGV4cG9ydEFzOiAnb3dsSG91cklucHV0JyxcclxuICAgIHNlbGVjdG9yOiAnb3dsLWhvdXItaW5wdXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hvdXItaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5vd2wtaG91ci1pbnB1dF0nOiAnb3dsSG91cklucHV0Q2xhc3MnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPd2xIb3VySW5wdXRDb21wb25lbnQge1xyXG4gICAgQElucHV0KCkgdXBCdG5BcmlhTGFiZWw6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHVwQnRuRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBkb3duQnRuQXJpYUxhYmVsOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBkb3duQnRuRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgbWluID0gMDtcclxuICAgIEBJbnB1dCgpIG1heCA9IDIzO1xyXG4gICAgQElucHV0KCkgc3RlcCA9IDE7XHJcbiAgICBASW5wdXQoKSBob3VyMTJUaW1lcjogYm9vbGVhbjtcclxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAgIHByaXZhdGUgaXNQTSA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGlja2VySW50bDogT3dsRGF0ZVRpbWVJbnRsKSB7fVxyXG5cclxuICAgIGdldCBob3VyMTJCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzUE1cclxuICAgICAgICAgICAgPyB0aGlzLnBpY2tlckludGwuaG91cjEyUE1MYWJlbFxyXG4gICAgICAgICAgICA6IHRoaXMucGlja2VySW50bC5ob3VyMTJBTUxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xIb3VySW5wdXRDbGFzcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaG91clZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJveFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGhvdXJzID0gdGhpcy5ob3VyVmFsdWU7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5ob3VyMTJUaW1lcikge1xyXG4gICAgICAgICAgICByZXR1cm4gaG91cnM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGhvdXJzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBob3VycyA9IDEyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BNID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiAwICYmIGhvdXJzIDwgMTIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXJzID09PSAxMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BNID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VycyA+IDEyICYmIGhvdXJzIDwgMjQpIHtcclxuICAgICAgICAgICAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhvdXJzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBCdG5DbGlja2VkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUgKyB0aGlzLnN0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb3duQnRuQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlIC0gdGhpcy5zdGVwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SG91clZhbHVlVmlhSW5wdXQoaG91cnM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMuaXNQTSAmJiBob3VycyA+PSAxICYmIGhvdXJzIDw9IDExKSB7XHJcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgKyAxMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUgJiYgIXRoaXMuaXNQTSAmJiBob3VycyA9PT0gMTIpIHtcclxuICAgICAgICAgICAgaG91cnMgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IGhvdXJzO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRIb3VyVmFsdWUoaG91cnM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChob3VycyA8IHRoaXMubWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1heDtcclxuICAgICAgICB9IGVsc2UgaWYgKGhvdXJzID4gdGhpcy5tYXgpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBob3VycztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE1lcmlkaWFuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNQTSA9ICF0aGlzLmlzUE07XHJcbiAgICAgICAgbGV0IGhvdXJzID0gdGhpcy5ob3VyVmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUE0pIHtcclxuICAgICAgICAgICAgaG91cnMgPSBob3VycyArIDEyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChob3VycyA+PSAwICYmIGhvdXJzIDw9IDIzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SG91clZhbHVlKGhvdXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWx1ZUNoYW5nZWQodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19