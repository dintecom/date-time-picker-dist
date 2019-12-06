/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * timer.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, Optional, Output } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { take } from 'rxjs/operators';
/**
 * @template T
 */
var OwlTimerComponent = /** @class */ (function () {
    function OwlTimerComponent(ngZone, elmRef, pickerIntl, cdRef, dateTimeAdapter) {
        this.ngZone = ngZone;
        this.elmRef = elmRef;
        this.pickerIntl = pickerIntl;
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.isPM = false; // a flag indicates the current timer moment is in PM or AM
        /**
         * Hours to change per step
         */
        this.stepHour = 1;
        /**
         * Minutes to change per step
         */
        this.stepMinute = 1;
        /**
         * Seconds to change per step
         */
        this.stepSecond = 1;
        this.selectedChange = new EventEmitter();
    }
    Object.defineProperty(OwlTimerComponent.prototype, "pickerMoment", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pickerMoment;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._pickerMoment =
                this.getValidDate(value) || this.dateTimeAdapter.now();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "minDateTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minDateTime;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._minDateTime = this.getValidDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "maxDateTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxDateTime;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._maxDateTime = this.getValidDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "hourValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dateTimeAdapter.getHours(this.pickerMoment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "hourBoxValue", {
        /**
         * The value would be displayed in hourBox.
         * We need this because the value displayed in hourBox it not
         * the same as the hourValue when the timer is in hour12Timer mode.
         */
        get: /**
         * The value would be displayed in hourBox.
         * We need this because the value displayed in hourBox it not
         * the same as the hourValue when the timer is in hour12Timer mode.
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
    Object.defineProperty(OwlTimerComponent.prototype, "minuteValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dateTimeAdapter.getMinutes(this.pickerMoment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "secondValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dateTimeAdapter.getSeconds(this.pickerMoment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "upHourButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.upHourLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "downHourButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.downHourLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "upMinuteButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.upMinuteLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "downMinuteButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.downMinuteLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "upSecondButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.upSecondLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "downSecondButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.downSecondLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "hour12ButtonLabel", {
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
    Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimeTabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlTimerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * Focus to the host element
     */
    /**
     * Focus to the host element
     * @return {?}
     */
    OwlTimerComponent.prototype.focus = /**
     * Focus to the host element
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.elmRef.nativeElement.focus();
            }));
        }));
    };
    /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     */
    /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     * @param {?} hours
     * @return {?}
     */
    OwlTimerComponent.prototype.setHourValueViaInput = /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     * @param {?} hours
     * @return {?}
     */
    function (hours) {
        if (this.hour12Timer && this.isPM && hours >= 1 && hours <= 11) {
            hours = hours + 12;
        }
        else if (this.hour12Timer && !this.isPM && hours === 12) {
            hours = 0;
        }
        this.setHourValue(hours);
    };
    /**
     * @param {?} hours
     * @return {?}
     */
    OwlTimerComponent.prototype.setHourValue = /**
     * @param {?} hours
     * @return {?}
     */
    function (hours) {
        /** @type {?} */
        var m = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} minutes
     * @return {?}
     */
    OwlTimerComponent.prototype.setMinuteValue = /**
     * @param {?} minutes
     * @return {?}
     */
    function (minutes) {
        /** @type {?} */
        var m = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} seconds
     * @return {?}
     */
    OwlTimerComponent.prototype.setSecondValue = /**
     * @param {?} seconds
     * @return {?}
     */
    function (seconds) {
        /** @type {?} */
        var m = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlTimerComponent.prototype.setMeridian = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
        this.cdRef.markForCheck();
        event.preventDefault();
    };
    /**
     * Check if the up hour button is enabled
     */
    /**
     * Check if the up hour button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.upHourEnabled = /**
     * Check if the up hour button is enabled
     * @return {?}
     */
    function () {
        return (!this.maxDateTime ||
            this.compareHours(this.stepHour, this.maxDateTime) < 1);
    };
    /**
     * Check if the down hour button is enabled
     */
    /**
     * Check if the down hour button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.downHourEnabled = /**
     * Check if the down hour button is enabled
     * @return {?}
     */
    function () {
        return (!this.minDateTime ||
            this.compareHours(-this.stepHour, this.minDateTime) > -1);
    };
    /**
     * Check if the up minute button is enabled
     */
    /**
     * Check if the up minute button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.upMinuteEnabled = /**
     * Check if the up minute button is enabled
     * @return {?}
     */
    function () {
        return (!this.maxDateTime ||
            this.compareMinutes(this.stepMinute, this.maxDateTime) < 1);
    };
    /**
     * Check if the down minute button is enabled
     */
    /**
     * Check if the down minute button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.downMinuteEnabled = /**
     * Check if the down minute button is enabled
     * @return {?}
     */
    function () {
        return (!this.minDateTime ||
            this.compareMinutes(-this.stepMinute, this.minDateTime) > -1);
    };
    /**
     * Check if the up second button is enabled
     */
    /**
     * Check if the up second button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.upSecondEnabled = /**
     * Check if the up second button is enabled
     * @return {?}
     */
    function () {
        return (!this.maxDateTime ||
            this.compareSeconds(this.stepSecond, this.maxDateTime) < 1);
    };
    /**
     * Check if the down second button is enabled
     */
    /**
     * Check if the down second button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.downSecondEnabled = /**
     * Check if the down second button is enabled
     * @return {?}
     */
    function () {
        return (!this.minDateTime ||
            this.compareSeconds(-this.stepSecond, this.minDateTime) > -1);
    };
    /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     */
    /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    OwlTimerComponent.prototype.compareHours = /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    function (amount, comparedDate) {
        /** @type {?} */
        var hours = this.dateTimeAdapter.getHours(this.pickerMoment) + amount;
        /** @type {?} */
        var result = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
        return this.dateTimeAdapter.compare(result, comparedDate);
    };
    /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     */
    /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    OwlTimerComponent.prototype.compareMinutes = /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    function (amount, comparedDate) {
        /** @type {?} */
        var minutes = this.dateTimeAdapter.getMinutes(this.pickerMoment) + amount;
        /** @type {?} */
        var result = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
        return this.dateTimeAdapter.compare(result, comparedDate);
    };
    /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     */
    /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    OwlTimerComponent.prototype.compareSeconds = /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    function (amount, comparedDate) {
        /** @type {?} */
        var seconds = this.dateTimeAdapter.getSeconds(this.pickerMoment) + amount;
        /** @type {?} */
        var result = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
        return this.dateTimeAdapter.compare(result, comparedDate);
    };
    /**
     * Get a valid date object
     */
    /**
     * Get a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    OwlTimerComponent.prototype.getValidDate = /**
     * Get a valid date object
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
    OwlTimerComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'owlDateTimeTimer',
                    selector: 'owl-date-time-timer',
                    template: "<owl-date-time-timer-box\n    [upBtnAriaLabel]=\"upHourButtonLabel\"\n    [downBtnAriaLabel]=\"downHourButtonLabel\"\n    [upBtnDisabled]=\"!upHourEnabled()\"\n    [downBtnDisabled]=\"!downHourEnabled()\"\n    [boxValue]=\"hourBoxValue\"\n    [value]=\"hourValue\"\n    [min]=\"0\"\n    [max]=\"23\"\n    [step]=\"stepHour\"\n    [inputLabel]=\"'Hour'\"\n    (inputChange)=\"setHourValueViaInput($event)\"\n    (valueChange)=\"setHourValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n    [showDivider]=\"true\"\n    [upBtnAriaLabel]=\"upMinuteButtonLabel\"\n    [downBtnAriaLabel]=\"downMinuteButtonLabel\"\n    [upBtnDisabled]=\"!upMinuteEnabled()\"\n    [downBtnDisabled]=\"!downMinuteEnabled()\"\n    [value]=\"minuteValue\"\n    [min]=\"0\"\n    [max]=\"59\"\n    [step]=\"stepMinute\"\n    [inputLabel]=\"'Minute'\"\n    (inputChange)=\"setMinuteValue($event)\"\n    (valueChange)=\"setMinuteValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n    *ngIf=\"showSecondsTimer\"\n    [showDivider]=\"true\"\n    [upBtnAriaLabel]=\"upSecondButtonLabel\"\n    [downBtnAriaLabel]=\"downSecondButtonLabel\"\n    [upBtnDisabled]=\"!upSecondEnabled()\"\n    [downBtnDisabled]=\"!downSecondEnabled()\"\n    [value]=\"secondValue\"\n    [min]=\"0\"\n    [max]=\"59\"\n    [step]=\"stepSecond\"\n    [inputLabel]=\"'Second'\"\n    (inputChange)=\"setSecondValue($event)\"\n    (valueChange)=\"setSecondValue($event)\"\n></owl-date-time-timer-box>\n\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\n    <button\n        class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\n        type=\"button\"\n        tabindex=\"0\"\n        (click)=\"setMeridian($event)\"\n    >\n        <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n            {{ hour12ButtonLabel }}\n        </span>\n    </button>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.owl-dt-timer]': 'owlDTTimerClass',
                        '[attr.tabindex]': 'owlDTTimeTabIndex'
                    }
                }] }
    ];
    /** @nocollapse */
    OwlTimerComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: OwlDateTimeIntl },
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] }
    ]; };
    OwlTimerComponent.propDecorators = {
        pickerMoment: [{ type: Input }],
        minDateTime: [{ type: Input }],
        maxDateTime: [{ type: Input }],
        showSecondsTimer: [{ type: Input }],
        hour12Timer: [{ type: Input }],
        stepHour: [{ type: Input }],
        stepMinute: [{ type: Input }],
        stepSecond: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return OwlTimerComponent;
}());
export { OwlTimerComponent };
if (false) {
    /**
     * The current picker moment
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype._pickerMoment;
    /**
     * The minimum selectable date time.
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype._minDateTime;
    /**
     * The maximum selectable date time.
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype._maxDateTime;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.isPM;
    /**
     * Whether to show the second's timer
     * @type {?}
     */
    OwlTimerComponent.prototype.showSecondsTimer;
    /**
     * Whether the timer is in hour12 format
     * @type {?}
     */
    OwlTimerComponent.prototype.hour12Timer;
    /**
     * Hours to change per step
     * @type {?}
     */
    OwlTimerComponent.prototype.stepHour;
    /**
     * Minutes to change per step
     * @type {?}
     */
    OwlTimerComponent.prototype.stepMinute;
    /**
     * Seconds to change per step
     * @type {?}
     */
    OwlTimerComponent.prototype.stepSecond;
    /** @type {?} */
    OwlTimerComponent.prototype.selectedChange;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.pickerIntl;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.dateTimeAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL3RpbWVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRXRDO0lBZ0tJLDJCQUNZLE1BQWMsRUFDZCxNQUFrQixFQUNsQixVQUEyQixFQUMzQixLQUF3QixFQUNaLGVBQW1DO1FBSi9DLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQzNCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ1osb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBckhuRCxTQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsMkRBQTJEOzs7O1FBa0JqRixhQUFRLEdBQUcsQ0FBQyxDQUFDOzs7O1FBTWIsZUFBVSxHQUFHLENBQUMsQ0FBQzs7OztRQU1mLGVBQVUsR0FBRyxDQUFDLENBQUM7UUF3RWYsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDO0lBZ0JwQyxDQUFDO0lBekpKLHNCQUNJLDJDQUFZOzs7O1FBRGhCO1lBRUksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7Ozs7O1FBRUQsVUFBaUIsS0FBUTtZQUNyQixLQUFLLEdBQUcs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QXVCLENBQUMsTUFBTTtvQkFDL0MsSUFBSSxFQUFFO3dCQUNGLHNCQUFzQixFQUFFLGlCQUFpQjt3QkFDekMsaUJBQWlCLEVBQUUsbUJBQW1CO3FCQUN6QztpQkFDSjs7OztnQkFsQkcsTUFBTTtnQkFITixVQUFVO2dCQVFMLGVBQWU7Z0JBVnBCLGlCQUFpQjtnQkFXWixlQUFlLHVCQXdLZixRQUFROzs7K0JBeEpaLEtBQUs7OEJBYUwsS0FBSzs4QkFZTCxLQUFLO21DQWVMLEtBQUs7OEJBTUwsS0FBSzsyQkFNTCxLQUFLOzZCQU1MLEtBQUs7NkJBTUwsS0FBSztpQ0F3RUwsTUFBTTs7SUFzTVgsd0JBQUM7Q0FBQSxBQTNWRCxJQTJWQztTQWpWWSxpQkFBaUI7Ozs7Ozs7SUFFMUIsMENBQXlCOzs7Ozs7SUFhekIseUNBQStCOzs7Ozs7SUFZL0IseUNBQStCOzs7OztJQVcvQixpQ0FBcUI7Ozs7O0lBS3JCLDZDQUMwQjs7Ozs7SUFLMUIsd0NBQ3FCOzs7OztJQUtyQixxQ0FDYTs7Ozs7SUFLYix1Q0FDZTs7Ozs7SUFLZix1Q0FDZTs7SUF1RWYsMkNBQ3VDOzs7OztJQVduQyxtQ0FBc0I7Ozs7O0lBQ3RCLG1DQUEwQjs7Ozs7SUFDMUIsdUNBQW1DOzs7OztJQUNuQyxrQ0FBZ0M7Ozs7O0lBQ2hDLDRDQUF1RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogdGltZXIuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lVGltZXInLFxuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS10aW1lcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3Mub3dsLWR0LXRpbWVyXSc6ICdvd2xEVFRpbWVyQ2xhc3MnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ293bERUVGltZVRhYkluZGV4J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgT3dsVGltZXJDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8qKiBUaGUgY3VycmVudCBwaWNrZXIgbW9tZW50ICovXG4gICAgcHJpdmF0ZSBfcGlja2VyTW9tZW50OiBUO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBpY2tlck1vbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcbiAgICB9XG5cbiAgICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQgPVxuICAgICAgICAgICAgdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUgdGltZS4gKi9cbiAgICBwcml2YXRlIF9taW5EYXRlVGltZTogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgbWluRGF0ZVRpbWUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZVRpbWU7XG4gICAgfVxuXG4gICAgc2V0IG1pbkRhdGVUaW1lKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fbWluRGF0ZVRpbWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZSB0aW1lLiAqL1xuICAgIHByaXZhdGUgX21heERhdGVUaW1lOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXhEYXRlVGltZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlVGltZTtcbiAgICB9XG5cbiAgICBzZXQgbWF4RGF0ZVRpbWUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9tYXhEYXRlVGltZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzUE0gPSBmYWxzZTsgLy8gYSBmbGFnIGluZGljYXRlcyB0aGUgY3VycmVudCB0aW1lciBtb21lbnQgaXMgaW4gUE0gb3IgQU1cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgc2Vjb25kJ3MgdGltZXJcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNob3dTZWNvbmRzVGltZXI6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB0aW1lciBpcyBpbiBob3VyMTIgZm9ybWF0XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBob3VyMTJUaW1lcjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEhvdXJzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RlcEhvdXIgPSAxO1xuXG4gICAgLyoqXG4gICAgICogTWludXRlcyB0byBjaGFuZ2UgcGVyIHN0ZXBcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHN0ZXBNaW51dGUgPSAxO1xuXG4gICAgLyoqXG4gICAgICogU2Vjb25kcyB0byBjaGFuZ2UgcGVyIHN0ZXBcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHN0ZXBTZWNvbmQgPSAxO1xuXG4gICAgZ2V0IGhvdXJWYWx1ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5waWNrZXJNb21lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSB3b3VsZCBiZSBkaXNwbGF5ZWQgaW4gaG91ckJveC5cbiAgICAgKiBXZSBuZWVkIHRoaXMgYmVjYXVzZSB0aGUgdmFsdWUgZGlzcGxheWVkIGluIGhvdXJCb3ggaXQgbm90XG4gICAgICogdGhlIHNhbWUgYXMgdGhlIGhvdXJWYWx1ZSB3aGVuIHRoZSB0aW1lciBpcyBpbiBob3VyMTJUaW1lciBtb2RlLlxuICAgICAqL1xuICAgIGdldCBob3VyQm94VmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGhvdXJzID0gdGhpcy5ob3VyVmFsdWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLmhvdXIxMlRpbWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gaG91cnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaG91cnMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBob3VycyA9IDEyO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VycyA+IDAgJiYgaG91cnMgPCAxMikge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VycyA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VycyA+IDEyICYmIGhvdXJzIDwgMjQpIHtcbiAgICAgICAgICAgICAgICBob3VycyA9IGhvdXJzIC0gMTI7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1BNID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGhvdXJzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG1pbnV0ZVZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNaW51dGVzKHRoaXMucGlja2VyTW9tZW50KTtcbiAgICB9XG5cbiAgICBnZXQgc2Vjb25kVmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5waWNrZXJNb21lbnQpO1xuICAgIH1cblxuICAgIGdldCB1cEhvdXJCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnVwSG91ckxhYmVsO1xuICAgIH1cblxuICAgIGdldCBkb3duSG91ckJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwuZG93bkhvdXJMYWJlbDtcbiAgICB9XG5cbiAgICBnZXQgdXBNaW51dGVCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnVwTWludXRlTGFiZWw7XG4gICAgfVxuXG4gICAgZ2V0IGRvd25NaW51dGVCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLmRvd25NaW51dGVMYWJlbDtcbiAgICB9XG5cbiAgICBnZXQgdXBTZWNvbmRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnVwU2Vjb25kTGFiZWw7XG4gICAgfVxuXG4gICAgZ2V0IGRvd25TZWNvbmRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLmRvd25TZWNvbmRMYWJlbDtcbiAgICB9XG5cbiAgICBnZXQgaG91cjEyQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNQTVxuICAgICAgICAgICAgPyB0aGlzLnBpY2tlckludGwuaG91cjEyUE1MYWJlbFxuICAgICAgICAgICAgOiB0aGlzLnBpY2tlckludGwuaG91cjEyQU1MYWJlbDtcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIGdldCBvd2xEVFRpbWVyQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldCBvd2xEVFRpbWVUYWJJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgZWxtUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCxcbiAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD5cbiAgICApIHt9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7fVxuXG4gICAgLyoqXG4gICAgICogRm9jdXMgdG8gdGhlIGhvc3QgZWxlbWVudFxuICAgICAqL1xuICAgIHB1YmxpYyBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgaG91ciB2YWx1ZSB2aWEgdHlwaW5nIGludG8gdGltZXIgYm94IGlucHV0XG4gICAgICogV2UgbmVlZCB0aGlzIHRvIGhhbmRsZSB0aGUgaG91ciB2YWx1ZSB3aGVuIHRoZSB0aW1lciBpcyBpbiBob3VyMTIgbW9kZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRIb3VyVmFsdWVWaWFJbnB1dChob3VyczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmhvdXIxMlRpbWVyICYmIHRoaXMuaXNQTSAmJiBob3VycyA+PSAxICYmIGhvdXJzIDw9IDExKSB7XG4gICAgICAgICAgICBob3VycyA9IGhvdXJzICsgMTI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ob3VyMTJUaW1lciAmJiAhdGhpcy5pc1BNICYmIGhvdXJzID09PSAxMikge1xuICAgICAgICAgICAgaG91cnMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRIb3VyVmFsdWUoaG91cnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRIb3VyVmFsdWUoaG91cnM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0SG91cnModGhpcy5waWNrZXJNb21lbnQsIGhvdXJzKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KG0pO1xuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNaW51dGVWYWx1ZShtaW51dGVzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQsIG1pbnV0ZXMpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQobSk7XG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNlY29uZFZhbHVlKHNlY29uZHM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudCwgc2Vjb25kcyk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChtKTtcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TWVyaWRpYW4oZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzUE0gPSAhdGhpcy5pc1BNO1xuXG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuaG91clZhbHVlO1xuICAgICAgICBpZiAodGhpcy5pc1BNKSB7XG4gICAgICAgICAgICBob3VycyA9IGhvdXJzICsgMTI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob3VycyA9IGhvdXJzIC0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG91cnMgPj0gMCAmJiBob3VycyA8PSAyMykge1xuICAgICAgICAgICAgdGhpcy5zZXRIb3VyVmFsdWUoaG91cnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgdXAgaG91ciBidXR0b24gaXMgZW5hYmxlZFxuICAgICAqL1xuICAgIHB1YmxpYyB1cEhvdXJFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRoaXMubWF4RGF0ZVRpbWUgfHxcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZUhvdXJzKHRoaXMuc3RlcEhvdXIsIHRoaXMubWF4RGF0ZVRpbWUpIDwgMVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBkb3duIGhvdXIgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZG93bkhvdXJFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRoaXMubWluRGF0ZVRpbWUgfHxcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZUhvdXJzKC10aGlzLnN0ZXBIb3VyLCB0aGlzLm1pbkRhdGVUaW1lKSA+IC0xXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIHVwIG1pbnV0ZSBidXR0b24gaXMgZW5hYmxlZFxuICAgICAqL1xuICAgIHB1YmxpYyB1cE1pbnV0ZUVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhdGhpcy5tYXhEYXRlVGltZSB8fFxuICAgICAgICAgICAgdGhpcy5jb21wYXJlTWludXRlcyh0aGlzLnN0ZXBNaW51dGUsIHRoaXMubWF4RGF0ZVRpbWUpIDwgMVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBkb3duIG1pbnV0ZSBidXR0b24gaXMgZW5hYmxlZFxuICAgICAqL1xuICAgIHB1YmxpYyBkb3duTWludXRlRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICF0aGlzLm1pbkRhdGVUaW1lIHx8XG4gICAgICAgICAgICB0aGlzLmNvbXBhcmVNaW51dGVzKC10aGlzLnN0ZXBNaW51dGUsIHRoaXMubWluRGF0ZVRpbWUpID4gLTFcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgdXAgc2Vjb25kIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAgICovXG4gICAgcHVibGljIHVwU2Vjb25kRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICF0aGlzLm1heERhdGVUaW1lIHx8XG4gICAgICAgICAgICB0aGlzLmNvbXBhcmVTZWNvbmRzKHRoaXMuc3RlcFNlY29uZCwgdGhpcy5tYXhEYXRlVGltZSkgPCAxXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGRvd24gc2Vjb25kIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAgICovXG4gICAgcHVibGljIGRvd25TZWNvbmRFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRoaXMubWluRGF0ZVRpbWUgfHxcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZVNlY29uZHMoLXRoaXMuc3RlcFNlY29uZCwgdGhpcy5taW5EYXRlVGltZSkgPiAtMVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBpY2tlck1vbWVudCdzIGhvdXIgdmFsdWUgKy8tIGNlcnRhaW4gYW1vdW50IGFuZCBjb21wYXJlIGl0IHRvIHRoZSBnaXZlIGRhdGVcbiAgICAgKiAxIGlzIGFmdGVyIHRoZSBjb21wYXJlZERhdGVcbiAgICAgKiAtMSBpcyBiZWZvcmUgdGhlIGNvbXBhcmVkRGF0ZVxuICAgICAqIDAgaXMgZXF1YWwgdGhlIGNvbXBhcmVkRGF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgY29tcGFyZUhvdXJzKGFtb3VudDogbnVtYmVyLCBjb21wYXJlZERhdGU6IFQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBob3VycyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMucGlja2VyTW9tZW50KSArIGFtb3VudDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0SG91cnModGhpcy5waWNrZXJNb21lbnQsIGhvdXJzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUocmVzdWx0LCBjb21wYXJlZERhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBpY2tlck1vbWVudCdzIG1pbnV0ZSB2YWx1ZSArLy0gY2VydGFpbiBhbW91bnQgYW5kIGNvbXBhcmUgaXQgdG8gdGhlIGdpdmUgZGF0ZVxuICAgICAqIDEgaXMgYWZ0ZXIgdGhlIGNvbXBhcmVkRGF0ZVxuICAgICAqIC0xIGlzIGJlZm9yZSB0aGUgY29tcGFyZWREYXRlXG4gICAgICogMCBpcyBlcXVhbCB0aGUgY29tcGFyZWREYXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb21wYXJlTWludXRlcyhhbW91bnQ6IG51bWJlciwgY29tcGFyZWREYXRlOiBUKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgbWludXRlcyA9XG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNaW51dGVzKHRoaXMucGlja2VyTW9tZW50KSArIGFtb3VudDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0TWludXRlcyhcbiAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgbWludXRlc1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShyZXN1bHQsIGNvbXBhcmVkRGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGlja2VyTW9tZW50J3Mgc2Vjb25kIHZhbHVlICsvLSBjZXJ0YWluIGFtb3VudCBhbmQgY29tcGFyZSBpdCB0byB0aGUgZ2l2ZSBkYXRlXG4gICAgICogMSBpcyBhZnRlciB0aGUgY29tcGFyZWREYXRlXG4gICAgICogLTEgaXMgYmVmb3JlIHRoZSBjb21wYXJlZERhdGVcbiAgICAgKiAwIGlzIGVxdWFsIHRoZSBjb21wYXJlZERhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbXBhcmVTZWNvbmRzKGFtb3VudDogbnVtYmVyLCBjb21wYXJlZERhdGU6IFQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBzZWNvbmRzID1cbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5waWNrZXJNb21lbnQpICsgYW1vdW50O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRTZWNvbmRzKFxuICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICBzZWNvbmRzXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHJlc3VsdCwgY29tcGFyZWREYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSB2YWxpZCBkYXRlIG9iamVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChvYmopXG4gICAgICAgICAgICA/IG9ialxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cbn1cbiJdfQ==