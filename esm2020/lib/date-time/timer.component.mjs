import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewChild, } from '@angular/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./date-time-picker-intl.service";
import * as i2 from "../adapter/date-time-adapter.class";
import * as i3 from "@angular/common";
import * as i4 from "./timer-box.component";
export class OwlTimerComponent {
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
    get pickerMoment() {
        return this._pickerMoment;
    }
    set pickerMoment(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._pickerMoment = this.getValidDate(value) || this.dateTimeAdapter.now();
    }
    get minDateTime() {
        return this._minDateTime;
    }
    set minDateTime(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._minDateTime = this.getValidDate(value);
    }
    get maxDateTime() {
        return this._maxDateTime;
    }
    set maxDateTime(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._maxDateTime = this.getValidDate(value);
    }
    get hourValue() {
        return this.dateTimeAdapter.getHours(this.pickerMoment);
    }
    /**
     * The value would be displayed in hourBox.
     * We need this because the value displayed in hourBox it not
     * the same as the hourValue when the timer is in hour12Timer mode.
     */
    get hourBoxValue() {
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
    get minuteValue() {
        return this.dateTimeAdapter.getMinutes(this.pickerMoment);
    }
    get secondValue() {
        return this.dateTimeAdapter.getSeconds(this.pickerMoment);
    }
    get upHourButtonLabel() {
        return this.pickerIntl.upHourLabel;
    }
    get downHourButtonLabel() {
        return this.pickerIntl.downHourLabel;
    }
    get upMinuteButtonLabel() {
        return this.pickerIntl.upMinuteLabel;
    }
    get downMinuteButtonLabel() {
        return this.pickerIntl.downMinuteLabel;
    }
    get upSecondButtonLabel() {
        return this.pickerIntl.upSecondLabel;
    }
    get downSecondButtonLabel() {
        return this.pickerIntl.downSecondLabel;
    }
    get hour12AMLabel() {
        return this.pickerIntl.hour12AMLabel;
    }
    get hour12PMLabel() {
        return this.pickerIntl.hour12PMLabel;
    }
    get owlDTTimerClass() {
        return true;
    }
    get owlDTTimeTabIndex() {
        return -1;
    }
    ngOnInit() { }
    /**
     * Focus to the host element
     */
    focus() {
        this.ngZone.runOutsideAngular(() => {
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                this.elmRef.nativeElement.focus();
            });
        });
    }
    /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
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
    setHourValue(hours) {
        const result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), this.dateTimeAdapter.getMonth(this.pickerMoment), this.dateTimeAdapter.getDate(this.pickerMoment), hours, this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.selectedChange.emit(result);
        this.cdRef.markForCheck();
    }
    setMinuteValue(minutes) {
        const result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), this.dateTimeAdapter.getMonth(this.pickerMoment), this.dateTimeAdapter.getDate(this.pickerMoment), this.dateTimeAdapter.getHours(this.pickerMoment), minutes, this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.selectedChange.emit(result);
        this.cdRef.markForCheck();
    }
    setSecondValue(seconds) {
        const result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), this.dateTimeAdapter.getMonth(this.pickerMoment), this.dateTimeAdapter.getDate(this.pickerMoment), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), seconds);
        this.selectedChange.emit(result);
        this.cdRef.markForCheck();
    }
    setMeridian(event) {
        this.isPM = !this.isPM;
        this.ngZone.runOutsideAngular(() => {
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                (this.isPM ? this.pmButton : this.amButton).nativeElement.focus();
            });
        });
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
     */
    upHourEnabled() {
        return !this.maxDateTime || this.compareHours(this.stepHour, this.maxDateTime) < 1;
    }
    /**
     * Check if the down hour button is enabled
     */
    downHourEnabled() {
        return !this.minDateTime || this.compareHours(-this.stepHour, this.minDateTime) > -1;
    }
    /**
     * Check if the up minute button is enabled
     */
    upMinuteEnabled() {
        return !this.maxDateTime || this.compareMinutes(this.stepMinute, this.maxDateTime) < 1;
    }
    /**
     * Check if the down minute button is enabled
     */
    downMinuteEnabled() {
        return !this.minDateTime || this.compareMinutes(-this.stepMinute, this.minDateTime) > -1;
    }
    /**
     * Check if the up second button is enabled
     */
    upSecondEnabled() {
        return !this.maxDateTime || this.compareSeconds(this.stepSecond, this.maxDateTime) < 1;
    }
    /**
     * Check if the down second button is enabled
     */
    downSecondEnabled() {
        return !this.minDateTime || this.compareSeconds(-this.stepSecond, this.minDateTime) > -1;
    }
    /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     */
    compareHours(amount, comparedDate) {
        const result = this.dateTimeAdapter.addTimerHours(this.pickerMoment, amount);
        return this.dateTimeAdapter.compareDate(result, comparedDate);
    }
    /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     */
    compareMinutes(amount, comparedDate) {
        const result = this.dateTimeAdapter.addTimerMinutes(this.pickerMoment, amount);
        return this.dateTimeAdapter.compareDate(result, comparedDate);
    }
    /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     */
    compareSeconds(amount, comparedDate) {
        const result = this.dateTimeAdapter.addTimerSeconds(this.pickerMoment, amount);
        return this.dateTimeAdapter.compareDate(result, comparedDate);
    }
    /**
     * Get a valid date object
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
}
OwlTimerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlTimerComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i1.OwlDateTimeIntl }, { token: i0.ChangeDetectorRef }, { token: i2.DateTimeAdapter, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OwlTimerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: OwlTimerComponent, selector: "owl-date-time-timer", inputs: { pickerMoment: "pickerMoment", minDateTime: "minDateTime", maxDateTime: "maxDateTime", showSecondsTimer: "showSecondsTimer", hour12Timer: "hour12Timer", stepHour: "stepHour", stepMinute: "stepMinute", stepSecond: "stepSecond" }, outputs: { selectedChange: "selectedChange" }, host: { properties: { "class.owl-dt-timer": "owlDTTimerClass", "attr.tabindex": "owlDTTimeTabIndex" } }, viewQueries: [{ propertyName: "amButton", first: true, predicate: ["am"], descendants: true }, { propertyName: "pmButton", first: true, predicate: ["pm"], descendants: true }], exportAs: ["owlDateTimeTimer"], ngImport: i0, template: "<owl-date-time-timer-box\n  [upBtnAriaLabel]=\"upHourButtonLabel\"\n  [downBtnAriaLabel]=\"downHourButtonLabel\"\n  [upBtnDisabled]=\"!upHourEnabled()\"\n  [downBtnDisabled]=\"!downHourEnabled()\"\n  [boxValue]=\"hourBoxValue\"\n  [value]=\"hourValue\"\n  [min]=\"0\"\n  [max]=\"23\"\n  [step]=\"stepHour\"\n  [inputLabel]=\"'Hour'\"\n  (inputChange)=\"setHourValueViaInput($event)\"\n  (valueChange)=\"setHourValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n  [showDivider]=\"true\"\n  [upBtnAriaLabel]=\"upMinuteButtonLabel\"\n  [downBtnAriaLabel]=\"downMinuteButtonLabel\"\n  [upBtnDisabled]=\"!upMinuteEnabled()\"\n  [downBtnDisabled]=\"!downMinuteEnabled()\"\n  [value]=\"minuteValue\"\n  [min]=\"0\"\n  [max]=\"59\"\n  [step]=\"stepMinute\"\n  [inputLabel]=\"'Minute'\"\n  (inputChange)=\"setMinuteValue($event)\"\n  (valueChange)=\"setMinuteValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n  *ngIf=\"showSecondsTimer\"\n  [showDivider]=\"true\"\n  [upBtnAriaLabel]=\"upSecondButtonLabel\"\n  [downBtnAriaLabel]=\"downSecondButtonLabel\"\n  [upBtnDisabled]=\"!upSecondEnabled()\"\n  [downBtnDisabled]=\"!downSecondEnabled()\"\n  [value]=\"secondValue\"\n  [min]=\"0\"\n  [max]=\"59\"\n  [step]=\"stepSecond\"\n  [inputLabel]=\"'Second'\"\n  (inputChange)=\"setSecondValue($event)\"\n  (valueChange)=\"setSecondValue($event)\"\n></owl-date-time-timer-box>\n\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\n  <button\n    #am\n    class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\n    [class.owl-dt-timer-hour12-inactive]=\"isPM\"\n    type=\"button\"\n    tabindex=\"0\"\n    (click)=\"setMeridian($event)\"\n  >\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n      {{ hour12AMLabel }}\n    </span>\n  </button>\n  <button\n    #pm\n    class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\n    [class.owl-dt-timer-hour12-inactive]=\"!isPM\"\n    type=\"button\"\n    tabindex=\"0\"\n    (click)=\"setMeridian($event)\"\n  >\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n      {{ hour12PMLabel }}\n    </span>\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.OwlTimerBoxComponent, selector: "owl-date-time-timer-box", inputs: ["showDivider", "upBtnAriaLabel", "upBtnDisabled", "downBtnAriaLabel", "downBtnDisabled", "boxValue", "value", "min", "max", "step", "inputLabel"], outputs: ["valueChange", "inputChange"], exportAs: ["owlDateTimeTimerBox"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlTimerComponent, decorators: [{
            type: Component,
            args: [{ exportAs: 'owlDateTimeTimer', selector: 'owl-date-time-timer', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.owl-dt-timer]': 'owlDTTimerClass',
                        '[attr.tabindex]': 'owlDTTimeTabIndex',
                    }, template: "<owl-date-time-timer-box\n  [upBtnAriaLabel]=\"upHourButtonLabel\"\n  [downBtnAriaLabel]=\"downHourButtonLabel\"\n  [upBtnDisabled]=\"!upHourEnabled()\"\n  [downBtnDisabled]=\"!downHourEnabled()\"\n  [boxValue]=\"hourBoxValue\"\n  [value]=\"hourValue\"\n  [min]=\"0\"\n  [max]=\"23\"\n  [step]=\"stepHour\"\n  [inputLabel]=\"'Hour'\"\n  (inputChange)=\"setHourValueViaInput($event)\"\n  (valueChange)=\"setHourValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n  [showDivider]=\"true\"\n  [upBtnAriaLabel]=\"upMinuteButtonLabel\"\n  [downBtnAriaLabel]=\"downMinuteButtonLabel\"\n  [upBtnDisabled]=\"!upMinuteEnabled()\"\n  [downBtnDisabled]=\"!downMinuteEnabled()\"\n  [value]=\"minuteValue\"\n  [min]=\"0\"\n  [max]=\"59\"\n  [step]=\"stepMinute\"\n  [inputLabel]=\"'Minute'\"\n  (inputChange)=\"setMinuteValue($event)\"\n  (valueChange)=\"setMinuteValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n  *ngIf=\"showSecondsTimer\"\n  [showDivider]=\"true\"\n  [upBtnAriaLabel]=\"upSecondButtonLabel\"\n  [downBtnAriaLabel]=\"downSecondButtonLabel\"\n  [upBtnDisabled]=\"!upSecondEnabled()\"\n  [downBtnDisabled]=\"!downSecondEnabled()\"\n  [value]=\"secondValue\"\n  [min]=\"0\"\n  [max]=\"59\"\n  [step]=\"stepSecond\"\n  [inputLabel]=\"'Second'\"\n  (inputChange)=\"setSecondValue($event)\"\n  (valueChange)=\"setSecondValue($event)\"\n></owl-date-time-timer-box>\n\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\n  <button\n    #am\n    class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\n    [class.owl-dt-timer-hour12-inactive]=\"isPM\"\n    type=\"button\"\n    tabindex=\"0\"\n    (click)=\"setMeridian($event)\"\n  >\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n      {{ hour12AMLabel }}\n    </span>\n  </button>\n  <button\n    #pm\n    class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\n    [class.owl-dt-timer-hour12-inactive]=\"!isPM\"\n    type=\"button\"\n    tabindex=\"0\"\n    (click)=\"setMeridian($event)\"\n  >\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n      {{ hour12PMLabel }}\n    </span>\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i1.OwlDateTimeIntl }, { type: i0.ChangeDetectorRef }, { type: i2.DateTimeAdapter, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { pickerMoment: [{
                type: Input
            }], minDateTime: [{
                type: Input
            }], maxDateTime: [{
                type: Input
            }], showSecondsTimer: [{
                type: Input
            }], hour12Timer: [{
                type: Input
            }], stepHour: [{
                type: Input
            }], stepMinute: [{
                type: Input
            }], stepSecond: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], amButton: [{
                type: ViewChild,
                args: ['am']
            }], pmButton: [{
                type: ViewChild,
                args: ['pm']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL3RpbWVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS90aW1lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBZXRDLE1BQU0sT0FBTyxpQkFBaUI7SUE0SjVCLFlBQ1UsTUFBYyxFQUNkLE1BQWtCLEVBQ2xCLFVBQTJCLEVBQzNCLEtBQXdCLEVBQ1osZUFBbUM7UUFKL0MsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDM0IsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUE1SHpELFNBQUksR0FBRyxLQUFLLENBQUMsQ0FBQywyREFBMkQ7UUFjekU7O1dBRUc7UUFFSCxhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWI7O1dBRUc7UUFFSCxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRWY7O1dBRUc7UUFFSCxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBMEVmLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQztJQXFCcEMsQ0FBQztJQS9KSixJQUNJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksWUFBWSxDQUFDLEtBQVE7UUFDdkIsS0FBSyxHQUFHLElB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LFdBQVcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOztPQUVHO0lBQ0ssWUFBWSxDQUFDLEdBQVE7UUFDM0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDbEYsQ0FBQyxDQUFDLEdBQUc7WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1gsQ0FBQzs7OEdBdFZVLGlCQUFpQjtrR0FBakIsaUJBQWlCLGtwQkM1QjlCLHdtRUFzRUE7MkZEMUNhLGlCQUFpQjtrQkFYN0IsU0FBUzsrQkFDRSxrQkFBa0IsWUFDbEIscUJBQXFCLG1CQUVkLHVCQUF1QixDQUFDLE1BQU0sUUFFekM7d0JBQ0osc0JBQXNCLEVBQUUsaUJBQWlCO3dCQUN6QyxpQkFBaUIsRUFBRSxtQkFBbUI7cUJBQ3ZDOzswQkFtS0UsUUFBUTs0Q0E3SlAsWUFBWTtzQkFEZixLQUFLO2dCQWFGLFdBQVc7c0JBRGQsS0FBSztnQkFhRixXQUFXO3NCQURkLEtBQUs7Z0JBZ0JOLGdCQUFnQjtzQkFEZixLQUFLO2dCQU9OLFdBQVc7c0JBRFYsS0FBSztnQkFPTixRQUFRO3NCQURQLEtBQUs7Z0JBT04sVUFBVTtzQkFEVCxLQUFLO2dCQU9OLFVBQVU7c0JBRFQsS0FBSztnQkEyRU4sY0FBYztzQkFEYixNQUFNO2dCQVlQLFFBQVE7c0JBRFAsU0FBUzt1QkFBQyxJQUFJO2dCQUdmLFFBQVE7c0JBRFAsU0FBUzt1QkFBQyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4uL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnRsIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBleHBvcnRBczogJ293bERhdGVUaW1lVGltZXInLFxuICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUtdGltZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdGltZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm93bC1kdC10aW1lcl0nOiAnb3dsRFRUaW1lckNsYXNzJyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ293bERUVGltZVRhYkluZGV4JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgT3dsVGltZXJDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiogVGhlIGN1cnJlbnQgcGlja2VyIG1vbWVudCAqL1xuICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQ7XG4gIEBJbnB1dCgpXG4gIGdldCBwaWNrZXJNb21lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcbiAgfVxuXG4gIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcbiAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB0aGlzLl9waWNrZXJNb21lbnQgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gIH1cblxuICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlIHRpbWUuICovXG4gIHByaXZhdGUgX21pbkRhdGVUaW1lOiBUIHwgbnVsbDtcbiAgQElucHV0KClcbiAgZ2V0IG1pbkRhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZVRpbWU7XG4gIH1cblxuICBzZXQgbWluRGF0ZVRpbWUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fbWluRGF0ZVRpbWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gIH1cblxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlIHRpbWUuICovXG4gIHByaXZhdGUgX21heERhdGVUaW1lOiBUIHwgbnVsbDtcbiAgQElucHV0KClcbiAgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZVRpbWU7XG4gIH1cblxuICBzZXQgbWF4RGF0ZVRpbWUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fbWF4RGF0ZVRpbWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gIH1cblxuICBpc1BNID0gZmFsc2U7IC8vIGEgZmxhZyBpbmRpY2F0ZXMgdGhlIGN1cnJlbnQgdGltZXIgbW9tZW50IGlzIGluIFBNIG9yIEFNXG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgc2Vjb25kJ3MgdGltZXJcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNob3dTZWNvbmRzVGltZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHRpbWVyIGlzIGluIGhvdXIxMiBmb3JtYXRcbiAgICovXG4gIEBJbnB1dCgpXG4gIGhvdXIxMlRpbWVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBIb3VycyB0byBjaGFuZ2UgcGVyIHN0ZXBcbiAgICovXG4gIEBJbnB1dCgpXG4gIHN0ZXBIb3VyID0gMTtcblxuICAvKipcbiAgICogTWludXRlcyB0byBjaGFuZ2UgcGVyIHN0ZXBcbiAgICovXG4gIEBJbnB1dCgpXG4gIHN0ZXBNaW51dGUgPSAxO1xuXG4gIC8qKlxuICAgKiBTZWNvbmRzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgKi9cbiAgQElucHV0KClcbiAgc3RlcFNlY29uZCA9IDE7XG5cbiAgZ2V0IGhvdXJWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHZhbHVlIHdvdWxkIGJlIGRpc3BsYXllZCBpbiBob3VyQm94LlxuICAgKiBXZSBuZWVkIHRoaXMgYmVjYXVzZSB0aGUgdmFsdWUgZGlzcGxheWVkIGluIGhvdXJCb3ggaXQgbm90XG4gICAqIHRoZSBzYW1lIGFzIHRoZSBob3VyVmFsdWUgd2hlbiB0aGUgdGltZXIgaXMgaW4gaG91cjEyVGltZXIgbW9kZS5cbiAgICovXG4gIGdldCBob3VyQm94VmFsdWUoKTogbnVtYmVyIHtcbiAgICBsZXQgaG91cnMgPSB0aGlzLmhvdXJWYWx1ZTtcblxuICAgIGlmICghdGhpcy5ob3VyMTJUaW1lcikge1xuICAgICAgcmV0dXJuIGhvdXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaG91cnMgPT09IDApIHtcbiAgICAgICAgaG91cnMgPSAxMjtcbiAgICAgICAgdGhpcy5pc1BNID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGhvdXJzID4gMCAmJiBob3VycyA8IDEyKSB7XG4gICAgICAgIHRoaXMuaXNQTSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChob3VycyA9PT0gMTIpIHtcbiAgICAgICAgdGhpcy5pc1BNID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiAxMiAmJiBob3VycyA8IDI0KSB7XG4gICAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcbiAgICAgICAgdGhpcy5pc1BNID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhvdXJzO1xuICAgIH1cbiAgfVxuXG4gIGdldCBtaW51dGVWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNaW51dGVzKHRoaXMucGlja2VyTW9tZW50KTtcbiAgfVxuXG4gIGdldCBzZWNvbmRWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50KTtcbiAgfVxuXG4gIGdldCB1cEhvdXJCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBpY2tlckludGwudXBIb3VyTGFiZWw7XG4gIH1cblxuICBnZXQgZG93bkhvdXJCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBpY2tlckludGwuZG93bkhvdXJMYWJlbDtcbiAgfVxuXG4gIGdldCB1cE1pbnV0ZUJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VySW50bC51cE1pbnV0ZUxhYmVsO1xuICB9XG5cbiAgZ2V0IGRvd25NaW51dGVCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBpY2tlckludGwuZG93bk1pbnV0ZUxhYmVsO1xuICB9XG5cbiAgZ2V0IHVwU2Vjb25kQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnVwU2Vjb25kTGFiZWw7XG4gIH1cblxuICBnZXQgZG93blNlY29uZEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5kb3duU2Vjb25kTGFiZWw7XG4gIH1cblxuICBnZXQgaG91cjEyQU1MYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBpY2tlckludGwuaG91cjEyQU1MYWJlbDtcbiAgfVxuXG4gIGdldCBob3VyMTJQTUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5ob3VyMTJQTUxhYmVsO1xuICB9XG5cbiAgQE91dHB1dCgpXG4gIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIGdldCBvd2xEVFRpbWVyQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXQgb3dsRFRUaW1lVGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBAVmlld0NoaWxkKCdhbScpXG4gIGFtQnV0dG9uOiBFbGVtZW50UmVmPEhUTUxCdXR0b25FbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgncG0nKVxuICBwbUJ1dHRvbjogRWxlbWVudFJlZjxIVE1MQnV0dG9uRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGVsbVJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCxcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+LFxuICApIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge31cblxuICAvKipcbiAgICogRm9jdXMgdG8gdGhlIGhvc3QgZWxlbWVudFxuICAgKi9cbiAgcHVibGljIGZvY3VzKCkge1xuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaG91ciB2YWx1ZSB2aWEgdHlwaW5nIGludG8gdGltZXIgYm94IGlucHV0XG4gICAqIFdlIG5lZWQgdGhpcyB0byBoYW5kbGUgdGhlIGhvdXIgdmFsdWUgd2hlbiB0aGUgdGltZXIgaXMgaW4gaG91cjEyIG1vZGVcbiAgICovXG4gIHB1YmxpYyBzZXRIb3VyVmFsdWVWaWFJbnB1dChob3VyczogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaG91cjEyVGltZXIgJiYgdGhpcy5pc1BNICYmIGhvdXJzID49IDEgJiYgaG91cnMgPD0gMTEpIHtcbiAgICAgIGhvdXJzID0gaG91cnMgKyAxMjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaG91cjEyVGltZXIgJiYgIXRoaXMuaXNQTSAmJiBob3VycyA9PT0gMTIpIHtcbiAgICAgIGhvdXJzID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLnNldEhvdXJWYWx1ZShob3Vycyk7XG4gIH1cblxuICBwdWJsaWMgc2V0SG91clZhbHVlKGhvdXJzOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIGhvdXJzLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICApO1xuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChyZXN1bHQpO1xuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0TWludXRlVmFsdWUobWludXRlczogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICBtaW51dGVzLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgKTtcbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQocmVzdWx0KTtcbiAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHVibGljIHNldFNlY29uZFZhbHVlKHNlY29uZHM6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICBzZWNvbmRzLFxuICAgICk7XG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHJlc3VsdCk7XG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRNZXJpZGlhbihldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5pc1BNID0gIXRoaXMuaXNQTTtcblxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAodGhpcy5pc1BNID8gdGhpcy5wbUJ1dHRvbiA6IHRoaXMuYW1CdXR0b24pLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgaG91cnMgPSB0aGlzLmhvdXJWYWx1ZTtcbiAgICBpZiAodGhpcy5pc1BNKSB7XG4gICAgICBob3VycyA9IGhvdXJzICsgMTI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcbiAgICB9XG5cbiAgICBpZiAoaG91cnMgPj0gMCAmJiBob3VycyA8PSAyMykge1xuICAgICAgdGhpcy5zZXRIb3VyVmFsdWUoaG91cnMpO1xuICAgIH1cblxuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgdXAgaG91ciBidXR0b24gaXMgZW5hYmxlZFxuICAgKi9cbiAgcHVibGljIHVwSG91ckVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLm1heERhdGVUaW1lIHx8IHRoaXMuY29tcGFyZUhvdXJzKHRoaXMuc3RlcEhvdXIsIHRoaXMubWF4RGF0ZVRpbWUpIDwgMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZG93biBob3VyIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAqL1xuICBwdWJsaWMgZG93bkhvdXJFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5taW5EYXRlVGltZSB8fCB0aGlzLmNvbXBhcmVIb3VycygtdGhpcy5zdGVwSG91ciwgdGhpcy5taW5EYXRlVGltZSkgPiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgdXAgbWludXRlIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAqL1xuICBwdWJsaWMgdXBNaW51dGVFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5tYXhEYXRlVGltZSB8fCB0aGlzLmNvbXBhcmVNaW51dGVzKHRoaXMuc3RlcE1pbnV0ZSwgdGhpcy5tYXhEYXRlVGltZSkgPCAxO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBkb3duIG1pbnV0ZSBidXR0b24gaXMgZW5hYmxlZFxuICAgKi9cbiAgcHVibGljIGRvd25NaW51dGVFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5taW5EYXRlVGltZSB8fCB0aGlzLmNvbXBhcmVNaW51dGVzKC10aGlzLnN0ZXBNaW51dGUsIHRoaXMubWluRGF0ZVRpbWUpID4gLTE7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIHVwIHNlY29uZCBidXR0b24gaXMgZW5hYmxlZFxuICAgKi9cbiAgcHVibGljIHVwU2Vjb25kRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMubWF4RGF0ZVRpbWUgfHwgdGhpcy5jb21wYXJlU2Vjb25kcyh0aGlzLnN0ZXBTZWNvbmQsIHRoaXMubWF4RGF0ZVRpbWUpIDwgMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZG93biBzZWNvbmQgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICovXG4gIHB1YmxpYyBkb3duU2Vjb25kRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMubWluRGF0ZVRpbWUgfHwgdGhpcy5jb21wYXJlU2Vjb25kcygtdGhpcy5zdGVwU2Vjb25kLCB0aGlzLm1pbkRhdGVUaW1lKSA+IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIFBpY2tlck1vbWVudCdzIGhvdXIgdmFsdWUgKy8tIGNlcnRhaW4gYW1vdW50IGFuZCBjb21wYXJlIGl0IHRvIHRoZSBnaXZlIGRhdGVcbiAgICogMSBpcyBhZnRlciB0aGUgY29tcGFyZWREYXRlXG4gICAqIC0xIGlzIGJlZm9yZSB0aGUgY29tcGFyZWREYXRlXG4gICAqIDAgaXMgZXF1YWwgdGhlIGNvbXBhcmVkRGF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjb21wYXJlSG91cnMoYW1vdW50OiBudW1iZXIsIGNvbXBhcmVkRGF0ZTogVCk6IG51bWJlciB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkVGltZXJIb3Vycyh0aGlzLnBpY2tlck1vbWVudCwgYW1vdW50KTtcbiAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUocmVzdWx0LCBjb21wYXJlZERhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBpY2tlck1vbWVudCdzIG1pbnV0ZSB2YWx1ZSArLy0gY2VydGFpbiBhbW91bnQgYW5kIGNvbXBhcmUgaXQgdG8gdGhlIGdpdmUgZGF0ZVxuICAgKiAxIGlzIGFmdGVyIHRoZSBjb21wYXJlZERhdGVcbiAgICogLTEgaXMgYmVmb3JlIHRoZSBjb21wYXJlZERhdGVcbiAgICogMCBpcyBlcXVhbCB0aGUgY29tcGFyZWREYXRlXG4gICAqL1xuICBwcml2YXRlIGNvbXBhcmVNaW51dGVzKGFtb3VudDogbnVtYmVyLCBjb21wYXJlZERhdGU6IFQpOiBudW1iZXIge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZFRpbWVyTWludXRlcyh0aGlzLnBpY2tlck1vbWVudCwgYW1vdW50KTtcbiAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUocmVzdWx0LCBjb21wYXJlZERhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBpY2tlck1vbWVudCdzIHNlY29uZCB2YWx1ZSArLy0gY2VydGFpbiBhbW91bnQgYW5kIGNvbXBhcmUgaXQgdG8gdGhlIGdpdmUgZGF0ZVxuICAgKiAxIGlzIGFmdGVyIHRoZSBjb21wYXJlZERhdGVcbiAgICogLTEgaXMgYmVmb3JlIHRoZSBjb21wYXJlZERhdGVcbiAgICogMCBpcyBlcXVhbCB0aGUgY29tcGFyZWREYXRlXG4gICAqL1xuICBwcml2YXRlIGNvbXBhcmVTZWNvbmRzKGFtb3VudDogbnVtYmVyLCBjb21wYXJlZERhdGU6IFQpOiBudW1iZXIge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZFRpbWVyU2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudCwgYW1vdW50KTtcbiAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUocmVzdWx0LCBjb21wYXJlZERhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XG4gICAqL1xuICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgID8gb2JqXG4gICAgICA6IG51bGw7XG4gIH1cbn1cbiIsIjxvd2wtZGF0ZS10aW1lLXRpbWVyLWJveFxuICBbdXBCdG5BcmlhTGFiZWxdPVwidXBIb3VyQnV0dG9uTGFiZWxcIlxuICBbZG93bkJ0bkFyaWFMYWJlbF09XCJkb3duSG91ckJ1dHRvbkxhYmVsXCJcbiAgW3VwQnRuRGlzYWJsZWRdPVwiIXVwSG91ckVuYWJsZWQoKVwiXG4gIFtkb3duQnRuRGlzYWJsZWRdPVwiIWRvd25Ib3VyRW5hYmxlZCgpXCJcbiAgW2JveFZhbHVlXT1cImhvdXJCb3hWYWx1ZVwiXG4gIFt2YWx1ZV09XCJob3VyVmFsdWVcIlxuICBbbWluXT1cIjBcIlxuICBbbWF4XT1cIjIzXCJcbiAgW3N0ZXBdPVwic3RlcEhvdXJcIlxuICBbaW5wdXRMYWJlbF09XCInSG91cidcIlxuICAoaW5wdXRDaGFuZ2UpPVwic2V0SG91clZhbHVlVmlhSW5wdXQoJGV2ZW50KVwiXG4gICh2YWx1ZUNoYW5nZSk9XCJzZXRIb3VyVmFsdWUoJGV2ZW50KVwiXG4+PC9vd2wtZGF0ZS10aW1lLXRpbWVyLWJveD5cbjxvd2wtZGF0ZS10aW1lLXRpbWVyLWJveFxuICBbc2hvd0RpdmlkZXJdPVwidHJ1ZVwiXG4gIFt1cEJ0bkFyaWFMYWJlbF09XCJ1cE1pbnV0ZUJ1dHRvbkxhYmVsXCJcbiAgW2Rvd25CdG5BcmlhTGFiZWxdPVwiZG93bk1pbnV0ZUJ1dHRvbkxhYmVsXCJcbiAgW3VwQnRuRGlzYWJsZWRdPVwiIXVwTWludXRlRW5hYmxlZCgpXCJcbiAgW2Rvd25CdG5EaXNhYmxlZF09XCIhZG93bk1pbnV0ZUVuYWJsZWQoKVwiXG4gIFt2YWx1ZV09XCJtaW51dGVWYWx1ZVwiXG4gIFttaW5dPVwiMFwiXG4gIFttYXhdPVwiNTlcIlxuICBbc3RlcF09XCJzdGVwTWludXRlXCJcbiAgW2lucHV0TGFiZWxdPVwiJ01pbnV0ZSdcIlxuICAoaW5wdXRDaGFuZ2UpPVwic2V0TWludXRlVmFsdWUoJGV2ZW50KVwiXG4gICh2YWx1ZUNoYW5nZSk9XCJzZXRNaW51dGVWYWx1ZSgkZXZlbnQpXCJcbj48L293bC1kYXRlLXRpbWUtdGltZXItYm94PlxuPG93bC1kYXRlLXRpbWUtdGltZXItYm94XG4gICpuZ0lmPVwic2hvd1NlY29uZHNUaW1lclwiXG4gIFtzaG93RGl2aWRlcl09XCJ0cnVlXCJcbiAgW3VwQnRuQXJpYUxhYmVsXT1cInVwU2Vjb25kQnV0dG9uTGFiZWxcIlxuICBbZG93bkJ0bkFyaWFMYWJlbF09XCJkb3duU2Vjb25kQnV0dG9uTGFiZWxcIlxuICBbdXBCdG5EaXNhYmxlZF09XCIhdXBTZWNvbmRFbmFibGVkKClcIlxuICBbZG93bkJ0bkRpc2FibGVkXT1cIiFkb3duU2Vjb25kRW5hYmxlZCgpXCJcbiAgW3ZhbHVlXT1cInNlY29uZFZhbHVlXCJcbiAgW21pbl09XCIwXCJcbiAgW21heF09XCI1OVwiXG4gIFtzdGVwXT1cInN0ZXBTZWNvbmRcIlxuICBbaW5wdXRMYWJlbF09XCInU2Vjb25kJ1wiXG4gIChpbnB1dENoYW5nZSk9XCJzZXRTZWNvbmRWYWx1ZSgkZXZlbnQpXCJcbiAgKHZhbHVlQ2hhbmdlKT1cInNldFNlY29uZFZhbHVlKCRldmVudClcIlxuPjwvb3dsLWRhdGUtdGltZS10aW1lci1ib3g+XG5cbjxkaXYgKm5nSWY9XCJob3VyMTJUaW1lclwiIGNsYXNzPVwib3dsLWR0LXRpbWVyLWhvdXIxMlwiPlxuICA8YnV0dG9uXG4gICAgI2FtXG4gICAgY2xhc3M9XCJvd2wtZHQtY29udHJvbC1idXR0b24gb3dsLWR0LXRpbWVyLWhvdXIxMi1ib3hcIlxuICAgIFtjbGFzcy5vd2wtZHQtdGltZXItaG91cjEyLWluYWN0aXZlXT1cImlzUE1cIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIHRhYmluZGV4PVwiMFwiXG4gICAgKGNsaWNrKT1cInNldE1lcmlkaWFuKCRldmVudClcIlxuICA+XG4gICAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udHJvbC1idXR0b24tY29udGVudFwiIHRhYmluZGV4PVwiLTFcIj5cbiAgICAgIHt7IGhvdXIxMkFNTGFiZWwgfX1cbiAgICA8L3NwYW4+XG4gIDwvYnV0dG9uPlxuICA8YnV0dG9uXG4gICAgI3BtXG4gICAgY2xhc3M9XCJvd2wtZHQtY29udHJvbC1idXR0b24gb3dsLWR0LXRpbWVyLWhvdXIxMi1ib3hcIlxuICAgIFtjbGFzcy5vd2wtZHQtdGltZXItaG91cjEyLWluYWN0aXZlXT1cIiFpc1BNXCJcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICB0YWJpbmRleD1cIjBcIlxuICAgIChjbGljayk9XCJzZXRNZXJpZGlhbigkZXZlbnQpXCJcbiAgPlxuICAgIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wtYnV0dG9uLWNvbnRlbnRcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICB7eyBob3VyMTJQTUxhYmVsIH19XG4gICAgPC9zcGFuPlxuICA8L2J1dHRvbj5cbjwvZGl2PlxuIl19