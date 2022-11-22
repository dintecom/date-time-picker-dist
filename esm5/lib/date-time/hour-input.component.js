/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * hour-input.component
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
var OwlHourInputComponent = /** @class */ (function () {
    function OwlHourInputComponent(pickerIntl) {
        this.pickerIntl = pickerIntl;
        this.min = 0;
        this.max = 23;
        this.step = 1;
        this.valueChange = new EventEmitter();
        this.isPM = false;
    }
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
    OwlHourInputComponent.prototype.setHourValueViaInput = /**
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
    OwlHourInputComponent.prototype.setHourValue = /**
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
            this.setHourValue(hours);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG91ci1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvaG91ci1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRTtJQXVCSSwrQkFBb0IsVUFBMkI7UUFBM0IsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFSdEMsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFFBQUcsR0FBRyxFQUFFLENBQUM7UUFDVCxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRTNDLFNBQUksR0FBRyxLQUFLLENBQUM7SUFFNkIsQ0FBQztJQUVuRCxzQkFBSSxvREFBaUI7Ozs7UUFBckI7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJO2dCQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7Z0JBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9EQUFpQjs7OztRQUFyQjtZQUNJLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQVM7Ozs7UUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDJDQUFROzs7O1FBQVo7O2dCQUNRLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUztZQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbkIsT0FB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QUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O2dCQTVHSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLHE0QkFBMEM7b0JBQzFDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxJQUFJLEVBQUU7d0JBQ0Ysd0JBQXdCLEVBQUUsbUJBQW1CO3FCQUNoRDtpQkFDSjs7OztnQkFWUSxlQUFlOzs7aUNBWW5CLEtBQUs7Z0NBQ0wsS0FBSzttQ0FDTCxLQUFLO2tDQUNMLEtBQUs7d0JBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLE1BQU07O0lBMEZYLDRCQUFDO0NBQUEsQUE3R0QsSUE2R0M7U0FwR1kscUJBQXFCOzs7SUFDOUIsK0NBQWdDOztJQUNoQyw4Q0FBZ0M7O0lBQ2hDLGlEQUFrQzs7SUFDbEMsZ0RBQWtDOztJQUNsQyxzQ0FBdUI7O0lBQ3ZCLG9DQUFpQjs7SUFDakIsb0NBQWtCOztJQUNsQixxQ0FBa0I7O0lBQ2xCLDRDQUE4Qjs7SUFDOUIsNENBQW1EOzs7OztJQUVuRCxxQ0FBcUI7Ozs7O0lBRVQsMkNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGhvdXItaW5wdXQuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnRsIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIGV4cG9ydEFzOiAnb3dsSG91cklucHV0JyxcclxuICAgIHNlbGVjdG9yOiAnb3dsLWhvdXItaW5wdXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hvdXItaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5vd2wtaG91ci1pbnB1dF0nOiAnb3dsSG91cklucHV0Q2xhc3MnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPd2xIb3VySW5wdXRDb21wb25lbnQge1xyXG4gICAgQElucHV0KCkgdXBCdG5BcmlhTGFiZWw6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHVwQnRuRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBkb3duQnRuQXJpYUxhYmVsOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBkb3duQnRuRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgbWluID0gMDtcclxuICAgIEBJbnB1dCgpIG1heCA9IDIzO1xyXG4gICAgQElucHV0KCkgc3RlcCA9IDE7XHJcbiAgICBASW5wdXQoKSBob3VyMTJUaW1lcjogYm9vbGVhbjtcclxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAgIHByaXZhdGUgaXNQTSA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGlja2VySW50bDogT3dsRGF0ZVRpbWVJbnRsKSB7fVxyXG5cclxuICAgIGdldCBob3VyMTJCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzUE1cclxuICAgICAgICAgICAgPyB0aGlzLnBpY2tlckludGwuaG91cjEyUE1MYWJlbFxyXG4gICAgICAgICAgICA6IHRoaXMucGlja2VySW50bC5ob3VyMTJBTUxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xIb3VySW5wdXRDbGFzcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaG91clZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJveFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGhvdXJzID0gdGhpcy5ob3VyVmFsdWU7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5ob3VyMTJUaW1lcikge1xyXG4gICAgICAgICAgICByZXR1cm4gaG91cnM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGhvdXJzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBob3VycyA9IDEyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BNID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiAwICYmIGhvdXJzIDwgMTIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXJzID09PSAxMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BNID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VycyA+IDEyICYmIGhvdXJzIDwgMjQpIHtcclxuICAgICAgICAgICAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhvdXJzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBCdG5DbGlja2VkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUgKyB0aGlzLnN0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb3duQnRuQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlIC0gdGhpcy5zdGVwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SG91clZhbHVlVmlhSW5wdXQoaG91cnM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMuaXNQTSAmJiBob3VycyA+PSAxICYmIGhvdXJzIDw9IDExKSB7XHJcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgKyAxMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUgJiYgIXRoaXMuaXNQTSAmJiBob3VycyA9PT0gMTIpIHtcclxuICAgICAgICAgICAgaG91cnMgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IGhvdXJzO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRIb3VyVmFsdWUoaG91cnM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChob3VycyA8IHRoaXMubWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm1heDtcclxuICAgICAgICB9IGVsc2UgaWYgKGhvdXJzID4gdGhpcy5tYXgpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBob3VycztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE1lcmlkaWFuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNQTSA9ICF0aGlzLmlzUE07XHJcbiAgICAgICAgbGV0IGhvdXJzID0gdGhpcy5ob3VyVmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUE0pIHtcclxuICAgICAgICAgICAgaG91cnMgPSBob3VycyArIDEyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChob3VycyA+PSAwICYmIGhvdXJzIDw9IDIzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SG91clZhbHVlKGhvdXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZWQodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWx1ZUNoYW5nZWQodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19