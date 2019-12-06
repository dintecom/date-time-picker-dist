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
export class OwlTimerComponent {
    /**
     * @param {?} ngZone
     * @param {?} elmRef
     * @param {?} pickerIntl
     * @param {?} cdRef
     * @param {?} dateTimeAdapter
     */
    constructor(ngZone, elmRef, pickerIntl, cdRef, dateTimeAdapter) {
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
    /**
     * @return {?}
     */
    get pickerMoment() {
        return this._pickerMoment;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set pickerMoment(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._pickerMoment =
            this.getValidDate(value) || this.dateTimeAdapter.now();
    }
    /**
     * @return {?}
     */
    get minDateTime() {
        return this._minDateTime;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDateTime(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._minDateTime = this.getValidDate(value);
    }
    /**
     * @return {?}
     */
    get maxDateTime() {
        return this._maxDateTime;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDateTime(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._maxDateTime = this.getValidDate(value);
    }
    /**
     * @return {?}
     */
    get hourValue() {
        return this.dateTimeAdapter.getHours(this.pickerMoment);
    }
    /**
     * The value would be displayed in hourBox.
     * We need this because the value displayed in hourBox it not
     * the same as the hourValue when the timer is in hour12Timer mode.
     * @return {?}
     */
    get hourBoxValue() {
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
    get minuteValue() {
        return this.dateTimeAdapter.getMinutes(this.pickerMoment);
    }
    /**
     * @return {?}
     */
    get secondValue() {
        return this.dateTimeAdapter.getSeconds(this.pickerMoment);
    }
    /**
     * @return {?}
     */
    get upHourButtonLabel() {
        return this.pickerIntl.upHourLabel;
    }
    /**
     * @return {?}
     */
    get downHourButtonLabel() {
        return this.pickerIntl.downHourLabel;
    }
    /**
     * @return {?}
     */
    get upMinuteButtonLabel() {
        return this.pickerIntl.upMinuteLabel;
    }
    /**
     * @return {?}
     */
    get downMinuteButtonLabel() {
        return this.pickerIntl.downMinuteLabel;
    }
    /**
     * @return {?}
     */
    get upSecondButtonLabel() {
        return this.pickerIntl.upSecondLabel;
    }
    /**
     * @return {?}
     */
    get downSecondButtonLabel() {
        return this.pickerIntl.downSecondLabel;
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
    get owlDTTimerClass() {
        return true;
    }
    /**
     * @return {?}
     */
    get owlDTTimeTabIndex() {
        return -1;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * Focus to the host element
     * @return {?}
     */
    focus() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.elmRef.nativeElement.focus();
            }));
        }));
    }
    /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     * @param {?} hours
     * @return {?}
     */
    setHourValueViaInput(hours) {
        if (this.hour12Timer && this.isPM && hours >= 1 && hours <= 11) {
            hours = hours + 12;
        }
        else if (this.hour12Timer && !this.isPM && hours === 12) {
            hours = 0;
        }
        this.setHourValue(hours);
    }
    /**
     * @param {?} hours
     * @return {?}
     */
    setHourValue(hours) {
        /** @type {?} */
        const m = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    }
    /**
     * @param {?} minutes
     * @return {?}
     */
    setMinuteValue(minutes) {
        /** @type {?} */
        const m = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    }
    /**
     * @param {?} seconds
     * @return {?}
     */
    setSecondValue(seconds) {
        /** @type {?} */
        const m = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setMeridian(event) {
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
        this.cdRef.markForCheck();
        event.preventDefault();
    }
    /**
     * Check if the up hour button is enabled
     * @return {?}
     */
    upHourEnabled() {
        return (!this.maxDateTime ||
            this.compareHours(this.stepHour, this.maxDateTime) < 1);
    }
    /**
     * Check if the down hour button is enabled
     * @return {?}
     */
    downHourEnabled() {
        return (!this.minDateTime ||
            this.compareHours(-this.stepHour, this.minDateTime) > -1);
    }
    /**
     * Check if the up minute button is enabled
     * @return {?}
     */
    upMinuteEnabled() {
        return (!this.maxDateTime ||
            this.compareMinutes(this.stepMinute, this.maxDateTime) < 1);
    }
    /**
     * Check if the down minute button is enabled
     * @return {?}
     */
    downMinuteEnabled() {
        return (!this.minDateTime ||
            this.compareMinutes(-this.stepMinute, this.minDateTime) > -1);
    }
    /**
     * Check if the up second button is enabled
     * @return {?}
     */
    upSecondEnabled() {
        return (!this.maxDateTime ||
            this.compareSeconds(this.stepSecond, this.maxDateTime) < 1);
    }
    /**
     * Check if the down second button is enabled
     * @return {?}
     */
    downSecondEnabled() {
        return (!this.minDateTime ||
            this.compareSeconds(-this.stepSecond, this.minDateTime) > -1);
    }
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
    compareHours(amount, comparedDate) {
        /** @type {?} */
        const hours = this.dateTimeAdapter.getHours(this.pickerMoment) + amount;
        /** @type {?} */
        const result = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
        return this.dateTimeAdapter.compare(result, comparedDate);
    }
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
    compareMinutes(amount, comparedDate) {
        /** @type {?} */
        const minutes = this.dateTimeAdapter.getMinutes(this.pickerMoment) + amount;
        /** @type {?} */
        const result = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
        return this.dateTimeAdapter.compare(result, comparedDate);
    }
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
    compareSeconds(amount, comparedDate) {
        /** @type {?} */
        const seconds = this.dateTimeAdapter.getSeconds(this.pickerMoment) + amount;
        /** @type {?} */
        const result = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
        return this.dateTimeAdapter.compare(result, comparedDate);
    }
    /**
     * Get a valid date object
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
}
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
OwlTimerComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: OwlDateTimeIntl },
    { type: ChangeDetectorRef },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL3RpbWVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBWXRDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7Ozs7O0lBc0oxQixZQUNZLE1BQWMsRUFDZCxNQUFrQixFQUNsQixVQUEyQixFQUMzQixLQUF3QixFQUNaLGVBQW1DO1FBSi9DLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQzNCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ1osb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBckhuRCxTQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsMkRBQTJEOzs7O1FBa0JqRixhQUFRLEdBQUcsQ0FBQyxDQUFDOzs7O1FBTWIsZUFBVSxHQUFHLENBQUMsQ0FBQzs7OztRQU1mLGVBQVUsR0FBRyxDQUFDLENBQUM7UUF3RWYsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDO0lBZ0JwQyxDQUFDOzs7O0lBekpKLElBQ0ksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELElBQUksWUFBWSxD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Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiB0aW1lci5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE93bERhdGVUaW1lSW50bCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVUaW1lcicsXG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLXRpbWVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtdGltZXJdJzogJ293bERUVGltZXJDbGFzcycsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnb3dsRFRUaW1lVGFiSW5kZXgnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBPd2xUaW1lckNvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyoqIFRoZSBjdXJyZW50IHBpY2tlciBtb21lbnQgKi9cbiAgICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQ7XG4gICAgQElucHV0KClcbiAgICBnZXQgcGlja2VyTW9tZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyTW9tZW50O1xuICAgIH1cblxuICAgIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCA9XG4gICAgICAgICAgICB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZSB0aW1lLiAqL1xuICAgIHByaXZhdGUgX21pbkRhdGVUaW1lOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW5EYXRlVGltZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlVGltZTtcbiAgICB9XG5cbiAgICBzZXQgbWluRGF0ZVRpbWUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9taW5EYXRlVGltZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlIHRpbWUuICovXG4gICAgcHJpdmF0ZSBfbWF4RGF0ZVRpbWU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGVUaW1lO1xuICAgIH1cblxuICAgIHNldCBtYXhEYXRlVGltZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21heERhdGVUaW1lID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNQTSA9IGZhbHNlOyAvLyBhIGZsYWcgaW5kaWNhdGVzIHRoZSBjdXJyZW50IHRpbWVyIG1vbWVudCBpcyBpbiBQTSBvciBBTVxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBzZWNvbmQncyB0aW1lclxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1NlY29uZHNUaW1lcjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHRpbWVyIGlzIGluIGhvdXIxMiBmb3JtYXRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhvdXIxMlRpbWVyOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogSG91cnMgdG8gY2hhbmdlIHBlciBzdGVwXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGVwSG91ciA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBNaW51dGVzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RlcE1pbnV0ZSA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBTZWNvbmRzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RlcFNlY29uZCA9IDE7XG5cbiAgICBnZXQgaG91clZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIHdvdWxkIGJlIGRpc3BsYXllZCBpbiBob3VyQm94LlxuICAgICAqIFdlIG5lZWQgdGhpcyBiZWNhdXNlIHRoZSB2YWx1ZSBkaXNwbGF5ZWQgaW4gaG91ckJveCBpdCBub3RcbiAgICAgKiB0aGUgc2FtZSBhcyB0aGUgaG91clZhbHVlIHdoZW4gdGhlIHRpbWVyIGlzIGluIGhvdXIxMlRpbWVyIG1vZGUuXG4gICAgICovXG4gICAgZ2V0IGhvdXJCb3hWYWx1ZSgpOiBudW1iZXIge1xuICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmhvdXJWYWx1ZTtcblxuICAgICAgICBpZiAoIXRoaXMuaG91cjEyVGltZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBob3VycztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChob3VycyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGhvdXJzID0gMTI7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1BNID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXJzID4gMCAmJiBob3VycyA8IDEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1BNID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXJzID4gMTIgJiYgaG91cnMgPCAyNCkge1xuICAgICAgICAgICAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaG91cnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbWludXRlVmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpO1xuICAgIH1cblxuICAgIGdldCBzZWNvbmRWYWx1ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudCk7XG4gICAgfVxuXG4gICAgZ2V0IHVwSG91ckJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwudXBIb3VyTGFiZWw7XG4gICAgfVxuXG4gICAgZ2V0IGRvd25Ib3VyQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5kb3duSG91ckxhYmVsO1xuICAgIH1cblxuICAgIGdldCB1cE1pbnV0ZUJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwudXBNaW51dGVMYWJlbDtcbiAgICB9XG5cbiAgICBnZXQgZG93bk1pbnV0ZUJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwuZG93bk1pbnV0ZUxhYmVsO1xuICAgIH1cblxuICAgIGdldCB1cFNlY29uZEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwudXBTZWNvbmRMYWJlbDtcbiAgICB9XG5cbiAgICBnZXQgZG93blNlY29uZEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwuZG93blNlY29uZExhYmVsO1xuICAgIH1cblxuICAgIGdldCBob3VyMTJCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1BNXG4gICAgICAgICAgICA/IHRoaXMucGlja2VySW50bC5ob3VyMTJQTUxhYmVsXG4gICAgICAgICAgICA6IHRoaXMucGlja2VySW50bC5ob3VyMTJBTUxhYmVsO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKVxuICAgIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgZ2V0IG93bERUVGltZXJDbGFzcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IG93bERUVGltZVRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSBlbG1SZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcGlja2VySW50bDogT3dsRGF0ZVRpbWVJbnRsLFxuICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPlxuICAgICkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgICAvKipcbiAgICAgKiBGb2N1cyB0byB0aGUgaG9zdCBlbGVtZW50XG4gICAgICovXG4gICAgcHVibGljIGZvY3VzKCkge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBob3VyIHZhbHVlIHZpYSB0eXBpbmcgaW50byB0aW1lciBib3ggaW5wdXRcbiAgICAgKiBXZSBuZWVkIHRoaXMgdG8gaGFuZGxlIHRoZSBob3VyIHZhbHVlIHdoZW4gdGhlIHRpbWVyIGlzIGluIGhvdXIxMiBtb2RlXG4gICAgICovXG4gICAgcHVibGljIHNldEhvdXJWYWx1ZVZpYUlucHV0KGhvdXJzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaG91cjEyVGltZXIgJiYgdGhpcy5pc1BNICYmIGhvdXJzID49IDEgJiYgaG91cnMgPD0gMTEpIHtcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgKyAxMjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhvdXIxMlRpbWVyICYmICF0aGlzLmlzUE0gJiYgaG91cnMgPT09IDEyKSB7XG4gICAgICAgICAgICBob3VycyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEhvdXJWYWx1ZShob3Vycyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEhvdXJWYWx1ZShob3VyczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCwgaG91cnMpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQobSk7XG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1pbnV0ZVZhbHVlKG1pbnV0ZXM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCwgbWludXRlcyk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChtKTtcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2Vjb25kVmFsdWUoc2Vjb25kczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50LCBzZWNvbmRzKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KG0pO1xuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNZXJpZGlhbihldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNQTSA9ICF0aGlzLmlzUE07XG5cbiAgICAgICAgbGV0IGhvdXJzID0gdGhpcy5ob3VyVmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmlzUE0pIHtcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgKyAxMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3VycyA+PSAwICYmIGhvdXJzIDw9IDIzKSB7XG4gICAgICAgICAgICB0aGlzLnNldEhvdXJWYWx1ZShob3Vycyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSB1cCBob3VyIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAgICovXG4gICAgcHVibGljIHVwSG91ckVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhdGhpcy5tYXhEYXRlVGltZSB8fFxuICAgICAgICAgICAgdGhpcy5jb21wYXJlSG91cnModGhpcy5zdGVwSG91ciwgdGhpcy5tYXhEYXRlVGltZSkgPCAxXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGRvd24gaG91ciBidXR0b24gaXMgZW5hYmxlZFxuICAgICAqL1xuICAgIHB1YmxpYyBkb3duSG91ckVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhdGhpcy5taW5EYXRlVGltZSB8fFxuICAgICAgICAgICAgdGhpcy5jb21wYXJlSG91cnMoLXRoaXMuc3RlcEhvdXIsIHRoaXMubWluRGF0ZVRpbWUpID4gLTFcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgdXAgbWludXRlIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAgICovXG4gICAgcHVibGljIHVwTWludXRlRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICF0aGlzLm1heERhdGVUaW1lIHx8XG4gICAgICAgICAgICB0aGlzLmNvbXBhcmVNaW51dGVzKHRoaXMuc3RlcE1pbnV0ZSwgdGhpcy5tYXhEYXRlVGltZSkgPCAxXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGRvd24gbWludXRlIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAgICovXG4gICAgcHVibGljIGRvd25NaW51dGVFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRoaXMubWluRGF0ZVRpbWUgfHxcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZU1pbnV0ZXMoLXRoaXMuc3RlcE1pbnV0ZSwgdGhpcy5taW5EYXRlVGltZSkgPiAtMVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSB1cCBzZWNvbmQgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBTZWNvbmRFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRoaXMubWF4RGF0ZVRpbWUgfHxcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZVNlY29uZHModGhpcy5zdGVwU2Vjb25kLCB0aGlzLm1heERhdGVUaW1lKSA8IDFcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZG93biBzZWNvbmQgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZG93blNlY29uZEVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhdGhpcy5taW5EYXRlVGltZSB8fFxuICAgICAgICAgICAgdGhpcy5jb21wYXJlU2Vjb25kcygtdGhpcy5zdGVwU2Vjb25kLCB0aGlzLm1pbkRhdGVUaW1lKSA+IC0xXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGlja2VyTW9tZW50J3MgaG91ciB2YWx1ZSArLy0gY2VydGFpbiBhbW91bnQgYW5kIGNvbXBhcmUgaXQgdG8gdGhlIGdpdmUgZGF0ZVxuICAgICAqIDEgaXMgYWZ0ZXIgdGhlIGNvbXBhcmVkRGF0ZVxuICAgICAqIC0xIGlzIGJlZm9yZSB0aGUgY29tcGFyZWREYXRlXG4gICAgICogMCBpcyBlcXVhbCB0aGUgY29tcGFyZWREYXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb21wYXJlSG91cnMoYW1vdW50OiBudW1iZXIsIGNvbXBhcmVkRGF0ZTogVCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGhvdXJzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5waWNrZXJNb21lbnQpICsgYW1vdW50O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCwgaG91cnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShyZXN1bHQsIGNvbXBhcmVkRGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGlja2VyTW9tZW50J3MgbWludXRlIHZhbHVlICsvLSBjZXJ0YWluIGFtb3VudCBhbmQgY29tcGFyZSBpdCB0byB0aGUgZ2l2ZSBkYXRlXG4gICAgICogMSBpcyBhZnRlciB0aGUgY29tcGFyZWREYXRlXG4gICAgICogLTEgaXMgYmVmb3JlIHRoZSBjb21wYXJlZERhdGVcbiAgICAgKiAwIGlzIGVxdWFsIHRoZSBjb21wYXJlZERhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbXBhcmVNaW51dGVzKGFtb3VudDogbnVtYmVyLCBjb21wYXJlZERhdGU6IFQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBtaW51dGVzID1cbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpICsgYW1vdW50O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRNaW51dGVzKFxuICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICBtaW51dGVzXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHJlc3VsdCwgY29tcGFyZWREYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQaWNrZXJNb21lbnQncyBzZWNvbmQgdmFsdWUgKy8tIGNlcnRhaW4gYW1vdW50IGFuZCBjb21wYXJlIGl0IHRvIHRoZSBnaXZlIGRhdGVcbiAgICAgKiAxIGlzIGFmdGVyIHRoZSBjb21wYXJlZERhdGVcbiAgICAgKiAtMSBpcyBiZWZvcmUgdGhlIGNvbXBhcmVkRGF0ZVxuICAgICAqIDAgaXMgZXF1YWwgdGhlIGNvbXBhcmVkRGF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgY29tcGFyZVNlY29uZHMoYW1vdW50OiBudW1iZXIsIGNvbXBhcmVkRGF0ZTogVCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHNlY29uZHMgPVxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudCkgKyBhbW91bnQ7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldFNlY29uZHMoXG4gICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgIHNlY29uZHNcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUocmVzdWx0LCBjb21wYXJlZERhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgICAgICAgID8gb2JqXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxufVxuIl19