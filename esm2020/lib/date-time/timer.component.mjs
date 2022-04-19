import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./date-time-picker-intl.service";
import * as i2 from "../adapter/date-time-adapter.class";
import * as i3 from "./timer-box.component";
import * as i4 from "@angular/common";
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
    get hour12ButtonLabel() {
        return this.isPM ? this.pickerIntl.hour12PMLabel : this.pickerIntl.hour12AMLabel;
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
OwlTimerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: OwlTimerComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i1.OwlDateTimeIntl }, { token: i0.ChangeDetectorRef }, { token: i2.DateTimeAdapter, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OwlTimerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.2", type: OwlTimerComponent, selector: "owl-date-time-timer", inputs: { pickerMoment: "pickerMoment", minDateTime: "minDateTime", maxDateTime: "maxDateTime", showSecondsTimer: "showSecondsTimer", hour12Timer: "hour12Timer", stepHour: "stepHour", stepMinute: "stepMinute", stepSecond: "stepSecond" }, outputs: { selectedChange: "selectedChange" }, host: { properties: { "class.owl-dt-timer": "owlDTTimerClass", "attr.tabindex": "owlDTTimeTabIndex" } }, exportAs: ["owlDateTimeTimer"], ngImport: i0, template: "<owl-date-time-timer-box\n  [upBtnAriaLabel]=\"upHourButtonLabel\"\n  [downBtnAriaLabel]=\"downHourButtonLabel\"\n  [upBtnDisabled]=\"!upHourEnabled()\"\n  [downBtnDisabled]=\"!downHourEnabled()\"\n  [boxValue]=\"hourBoxValue\"\n  [value]=\"hourValue\"\n  [min]=\"0\"\n  [max]=\"23\"\n  [step]=\"stepHour\"\n  [inputLabel]=\"'Hour'\"\n  (inputChange)=\"setHourValueViaInput($event)\"\n  (valueChange)=\"setHourValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n  [showDivider]=\"true\"\n  [upBtnAriaLabel]=\"upMinuteButtonLabel\"\n  [downBtnAriaLabel]=\"downMinuteButtonLabel\"\n  [upBtnDisabled]=\"!upMinuteEnabled()\"\n  [downBtnDisabled]=\"!downMinuteEnabled()\"\n  [value]=\"minuteValue\"\n  [min]=\"0\"\n  [max]=\"59\"\n  [step]=\"stepMinute\"\n  [inputLabel]=\"'Minute'\"\n  (inputChange)=\"setMinuteValue($event)\"\n  (valueChange)=\"setMinuteValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n  *ngIf=\"showSecondsTimer\"\n  [showDivider]=\"true\"\n  [upBtnAriaLabel]=\"upSecondButtonLabel\"\n  [downBtnAriaLabel]=\"downSecondButtonLabel\"\n  [upBtnDisabled]=\"!upSecondEnabled()\"\n  [downBtnDisabled]=\"!downSecondEnabled()\"\n  [value]=\"secondValue\"\n  [min]=\"0\"\n  [max]=\"59\"\n  [step]=\"stepSecond\"\n  [inputLabel]=\"'Second'\"\n  (inputChange)=\"setSecondValue($event)\"\n  (valueChange)=\"setSecondValue($event)\"\n></owl-date-time-timer-box>\n\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\n  <button\n    class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\n    type=\"button\"\n    tabindex=\"0\"\n    (click)=\"setMeridian($event)\"\n  >\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n      {{ hour12ButtonLabel }}\n    </span>\n  </button>\n</div>\n", components: [{ type: i3.OwlTimerBoxComponent, selector: "owl-date-time-timer-box", inputs: ["showDivider", "upBtnAriaLabel", "upBtnDisabled", "downBtnAriaLabel", "downBtnDisabled", "boxValue", "value", "min", "max", "step", "inputLabel"], outputs: ["valueChange", "inputChange"], exportAs: ["owlDateTimeTimerBox"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: OwlTimerComponent, decorators: [{
            type: Component,
            args: [{ exportAs: 'owlDateTimeTimer', selector: 'owl-date-time-timer', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.owl-dt-timer]': 'owlDTTimerClass',
                        '[attr.tabindex]': 'owlDTTimeTabIndex'
                    }, template: "<owl-date-time-timer-box\n  [upBtnAriaLabel]=\"upHourButtonLabel\"\n  [downBtnAriaLabel]=\"downHourButtonLabel\"\n  [upBtnDisabled]=\"!upHourEnabled()\"\n  [downBtnDisabled]=\"!downHourEnabled()\"\n  [boxValue]=\"hourBoxValue\"\n  [value]=\"hourValue\"\n  [min]=\"0\"\n  [max]=\"23\"\n  [step]=\"stepHour\"\n  [inputLabel]=\"'Hour'\"\n  (inputChange)=\"setHourValueViaInput($event)\"\n  (valueChange)=\"setHourValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n  [showDivider]=\"true\"\n  [upBtnAriaLabel]=\"upMinuteButtonLabel\"\n  [downBtnAriaLabel]=\"downMinuteButtonLabel\"\n  [upBtnDisabled]=\"!upMinuteEnabled()\"\n  [downBtnDisabled]=\"!downMinuteEnabled()\"\n  [value]=\"minuteValue\"\n  [min]=\"0\"\n  [max]=\"59\"\n  [step]=\"stepMinute\"\n  [inputLabel]=\"'Minute'\"\n  (inputChange)=\"setMinuteValue($event)\"\n  (valueChange)=\"setMinuteValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n  *ngIf=\"showSecondsTimer\"\n  [showDivider]=\"true\"\n  [upBtnAriaLabel]=\"upSecondButtonLabel\"\n  [downBtnAriaLabel]=\"downSecondButtonLabel\"\n  [upBtnDisabled]=\"!upSecondEnabled()\"\n  [downBtnDisabled]=\"!downSecondEnabled()\"\n  [value]=\"secondValue\"\n  [min]=\"0\"\n  [max]=\"59\"\n  [step]=\"stepSecond\"\n  [inputLabel]=\"'Second'\"\n  (inputChange)=\"setSecondValue($event)\"\n  (valueChange)=\"setSecondValue($event)\"\n></owl-date-time-timer-box>\n\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\n  <button\n    class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\n    type=\"button\"\n    tabindex=\"0\"\n    (click)=\"setMeridian($event)\"\n  >\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n      {{ hour12ButtonLabel }}\n    </span>\n  </button>\n</div>\n" }]
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL3RpbWVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS90aW1lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFhdEMsTUFBTSxPQUFPLGlCQUFpQjtJQW1KNUIsWUFDVSxNQUFjLEVBQ2QsTUFBa0IsRUFDbEIsVUFBMkIsRUFDM0IsS0FBd0IsRUFDWixlQUFtQztRQUovQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUMzQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUNaLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQW5IakQsU0FBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLDJEQUEyRDtRQWNqRjs7V0FFRztRQUVILGFBQVEsR0FBRyxDQUFDLENBQUM7UUFFYjs7V0FFRztRQUVILGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFZjs7V0FFRztRQUVILGVBQVUsR0FBRyxDQUFDLENBQUM7UUFzRWYsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDO0lBZ0JwQyxDQUFDO0lBdEpKLElBQ0ksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxZQUFZLENBQUMsS0FBUTtRQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLGVB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bUJBRWQsdUJBQXVCLENBQUMsTUFBTSxRQUV6Qzt3QkFDSixzQkFBc0IsRUFBRSxpQkFBaUI7d0JBQ3pDLGlCQUFpQixFQUFFLG1CQUFtQjtxQkFDdkM7OzBCQTBKRSxRQUFROzRDQXBKUCxZQUFZO3NCQURmLEtBQUs7Z0JBYUYsV0FBVztzQkFEZCxLQUFLO2dCQWFGLFdBQVc7c0JBRGQsS0FBSztnQkFnQk4sZ0JBQWdCO3NCQURmLEtBQUs7Z0JBT04sV0FBVztzQkFEVixLQUFLO2dCQU9OLFFBQVE7c0JBRFAsS0FBSztnQkFPTixVQUFVO3NCQURULEtBQUs7Z0JBT04sVUFBVTtzQkFEVCxLQUFLO2dCQXVFTixjQUFjO3NCQURiLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4uL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVUaW1lcicsXG4gIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS10aW1lcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mub3dsLWR0LXRpbWVyXSc6ICdvd2xEVFRpbWVyQ2xhc3MnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnb3dsRFRUaW1lVGFiSW5kZXgnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgT3dsVGltZXJDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQge1xuICAvKiogVGhlIGN1cnJlbnQgcGlja2VyIG1vbWVudCAqL1xuICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQ7XG4gIEBJbnB1dCgpXG4gIGdldCBwaWNrZXJNb21lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcbiAgfVxuXG4gIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcbiAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB0aGlzLl9waWNrZXJNb21lbnQgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gIH1cblxuICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlIHRpbWUuICovXG4gIHByaXZhdGUgX21pbkRhdGVUaW1lOiBUIHwgbnVsbDtcbiAgQElucHV0KClcbiAgZ2V0IG1pbkRhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZVRpbWU7XG4gIH1cblxuICBzZXQgbWluRGF0ZVRpbWUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fbWluRGF0ZVRpbWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gIH1cblxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlIHRpbWUuICovXG4gIHByaXZhdGUgX21heERhdGVUaW1lOiBUIHwgbnVsbDtcbiAgQElucHV0KClcbiAgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZVRpbWU7XG4gIH1cblxuICBzZXQgbWF4RGF0ZVRpbWUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fbWF4RGF0ZVRpbWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGlzUE0gPSBmYWxzZTsgLy8gYSBmbGFnIGluZGljYXRlcyB0aGUgY3VycmVudCB0aW1lciBtb21lbnQgaXMgaW4gUE0gb3IgQU1cblxuICAvKipcbiAgICogV2hldGhlciB0byBzaG93IHRoZSBzZWNvbmQncyB0aW1lclxuICAgKi9cbiAgQElucHV0KClcbiAgc2hvd1NlY29uZHNUaW1lcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgdGltZXIgaXMgaW4gaG91cjEyIGZvcm1hdFxuICAgKi9cbiAgQElucHV0KClcbiAgaG91cjEyVGltZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEhvdXJzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgKi9cbiAgQElucHV0KClcbiAgc3RlcEhvdXIgPSAxO1xuXG4gIC8qKlxuICAgKiBNaW51dGVzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgKi9cbiAgQElucHV0KClcbiAgc3RlcE1pbnV0ZSA9IDE7XG5cbiAgLyoqXG4gICAqIFNlY29uZHMgdG8gY2hhbmdlIHBlciBzdGVwXG4gICAqL1xuICBASW5wdXQoKVxuICBzdGVwU2Vjb25kID0gMTtcblxuICBnZXQgaG91clZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMucGlja2VyTW9tZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgdmFsdWUgd291bGQgYmUgZGlzcGxheWVkIGluIGhvdXJCb3guXG4gICAqIFdlIG5lZWQgdGhpcyBiZWNhdXNlIHRoZSB2YWx1ZSBkaXNwbGF5ZWQgaW4gaG91ckJveCBpdCBub3RcbiAgICogdGhlIHNhbWUgYXMgdGhlIGhvdXJWYWx1ZSB3aGVuIHRoZSB0aW1lciBpcyBpbiBob3VyMTJUaW1lciBtb2RlLlxuICAgKi9cbiAgZ2V0IGhvdXJCb3hWYWx1ZSgpOiBudW1iZXIge1xuICAgIGxldCBob3VycyA9IHRoaXMuaG91clZhbHVlO1xuXG4gICAgaWYgKCF0aGlzLmhvdXIxMlRpbWVyKSB7XG4gICAgICByZXR1cm4gaG91cnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChob3VycyA9PT0gMCkge1xuICAgICAgICBob3VycyA9IDEyO1xuICAgICAgICB0aGlzLmlzUE0gPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiAwICYmIGhvdXJzIDwgMTIpIHtcbiAgICAgICAgdGhpcy5pc1BNID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgICB0aGlzLmlzUE0gPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChob3VycyA+IDEyICYmIGhvdXJzIDwgMjQpIHtcbiAgICAgICAgaG91cnMgPSBob3VycyAtIDEyO1xuICAgICAgICB0aGlzLmlzUE0gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaG91cnM7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1pbnV0ZVZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpO1xuICB9XG5cbiAgZ2V0IHNlY29uZFZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5waWNrZXJNb21lbnQpO1xuICB9XG5cbiAgZ2V0IHVwSG91ckJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VySW50bC51cEhvdXJMYWJlbDtcbiAgfVxuXG4gIGdldCBkb3duSG91ckJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5kb3duSG91ckxhYmVsO1xuICB9XG5cbiAgZ2V0IHVwTWludXRlQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnVwTWludXRlTGFiZWw7XG4gIH1cblxuICBnZXQgZG93bk1pbnV0ZUJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5kb3duTWludXRlTGFiZWw7XG4gIH1cblxuICBnZXQgdXBTZWNvbmRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBpY2tlckludGwudXBTZWNvbmRMYWJlbDtcbiAgfVxuXG4gIGdldCBkb3duU2Vjb25kQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLmRvd25TZWNvbmRMYWJlbDtcbiAgfVxuXG4gIGdldCBob3VyMTJCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlzUE0gPyB0aGlzLnBpY2tlckludGwuaG91cjEyUE1MYWJlbCA6IHRoaXMucGlja2VySW50bC5ob3VyMTJBTUxhYmVsO1xuICB9XG5cbiAgQE91dHB1dCgpXG4gIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIGdldCBvd2xEVFRpbWVyQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXQgb3dsRFRUaW1lVGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgZWxtUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcGlja2VySW50bDogT3dsRGF0ZVRpbWVJbnRsLFxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD5cbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgLyoqXG4gICAqIEZvY3VzIHRvIHRoZSBob3N0IGVsZW1lbnRcbiAgICovXG4gIHB1YmxpYyBmb2N1cygpIHtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGhvdXIgdmFsdWUgdmlhIHR5cGluZyBpbnRvIHRpbWVyIGJveCBpbnB1dFxuICAgKiBXZSBuZWVkIHRoaXMgdG8gaGFuZGxlIHRoZSBob3VyIHZhbHVlIHdoZW4gdGhlIHRpbWVyIGlzIGluIGhvdXIxMiBtb2RlXG4gICAqL1xuICBwdWJsaWMgc2V0SG91clZhbHVlVmlhSW5wdXQoaG91cnM6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmhvdXIxMlRpbWVyICYmIHRoaXMuaXNQTSAmJiBob3VycyA+PSAxICYmIGhvdXJzIDw9IDExKSB7XG4gICAgICBob3VycyA9IGhvdXJzICsgMTI7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhvdXIxMlRpbWVyICYmICF0aGlzLmlzUE0gJiYgaG91cnMgPT09IDEyKSB7XG4gICAgICBob3VycyA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRIb3VyVmFsdWUoaG91cnMpO1xuICB9XG5cbiAgcHVibGljIHNldEhvdXJWYWx1ZShob3VyczogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICBob3VycyxcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudClcbiAgICApO1xuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChyZXN1bHQpO1xuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0TWludXRlVmFsdWUobWludXRlczogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICBtaW51dGVzLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudClcbiAgICApO1xuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChyZXN1bHQpO1xuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0U2Vjb25kVmFsdWUoc2Vjb25kczogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNaW51dGVzKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIHNlY29uZHNcbiAgICApO1xuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChyZXN1bHQpO1xuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0TWVyaWRpYW4oZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuaXNQTSA9ICF0aGlzLmlzUE07XG5cbiAgICBsZXQgaG91cnMgPSB0aGlzLmhvdXJWYWx1ZTtcbiAgICBpZiAodGhpcy5pc1BNKSB7XG4gICAgICBob3VycyA9IGhvdXJzICsgMTI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcbiAgICB9XG5cbiAgICBpZiAoaG91cnMgPj0gMCAmJiBob3VycyA8PSAyMykge1xuICAgICAgdGhpcy5zZXRIb3VyVmFsdWUoaG91cnMpO1xuICAgIH1cblxuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgdXAgaG91ciBidXR0b24gaXMgZW5hYmxlZFxuICAgKi9cbiAgcHVibGljIHVwSG91ckVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLm1heERhdGVUaW1lIHx8IHRoaXMuY29tcGFyZUhvdXJzKHRoaXMuc3RlcEhvdXIsIHRoaXMubWF4RGF0ZVRpbWUpIDwgMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZG93biBob3VyIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAqL1xuICBwdWJsaWMgZG93bkhvdXJFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5taW5EYXRlVGltZSB8fCB0aGlzLmNvbXBhcmVIb3VycygtdGhpcy5zdGVwSG91ciwgdGhpcy5taW5EYXRlVGltZSkgPiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgdXAgbWludXRlIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAqL1xuICBwdWJsaWMgdXBNaW51dGVFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5tYXhEYXRlVGltZSB8fCB0aGlzLmNvbXBhcmVNaW51dGVzKHRoaXMuc3RlcE1pbnV0ZSwgdGhpcy5tYXhEYXRlVGltZSkgPCAxO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBkb3duIG1pbnV0ZSBidXR0b24gaXMgZW5hYmxlZFxuICAgKi9cbiAgcHVibGljIGRvd25NaW51dGVFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5taW5EYXRlVGltZSB8fCB0aGlzLmNvbXBhcmVNaW51dGVzKC10aGlzLnN0ZXBNaW51dGUsIHRoaXMubWluRGF0ZVRpbWUpID4gLTE7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIHVwIHNlY29uZCBidXR0b24gaXMgZW5hYmxlZFxuICAgKi9cbiAgcHVibGljIHVwU2Vjb25kRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMubWF4RGF0ZVRpbWUgfHwgdGhpcy5jb21wYXJlU2Vjb25kcyh0aGlzLnN0ZXBTZWNvbmQsIHRoaXMubWF4RGF0ZVRpbWUpIDwgMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZG93biBzZWNvbmQgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICovXG4gIHB1YmxpYyBkb3duU2Vjb25kRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMubWluRGF0ZVRpbWUgfHwgdGhpcy5jb21wYXJlU2Vjb25kcygtdGhpcy5zdGVwU2Vjb25kLCB0aGlzLm1pbkRhdGVUaW1lKSA+IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIFBpY2tlck1vbWVudCdzIGhvdXIgdmFsdWUgKy8tIGNlcnRhaW4gYW1vdW50IGFuZCBjb21wYXJlIGl0IHRvIHRoZSBnaXZlIGRhdGVcbiAgICogMSBpcyBhZnRlciB0aGUgY29tcGFyZWREYXRlXG4gICAqIC0xIGlzIGJlZm9yZSB0aGUgY29tcGFyZWREYXRlXG4gICAqIDAgaXMgZXF1YWwgdGhlIGNvbXBhcmVkRGF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjb21wYXJlSG91cnMoYW1vdW50OiBudW1iZXIsIGNvbXBhcmVkRGF0ZTogVCk6IG51bWJlciB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkVGltZXJIb3Vycyh0aGlzLnBpY2tlck1vbWVudCwgYW1vdW50KTtcbiAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUocmVzdWx0LCBjb21wYXJlZERhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBpY2tlck1vbWVudCdzIG1pbnV0ZSB2YWx1ZSArLy0gY2VydGFpbiBhbW91bnQgYW5kIGNvbXBhcmUgaXQgdG8gdGhlIGdpdmUgZGF0ZVxuICAgKiAxIGlzIGFmdGVyIHRoZSBjb21wYXJlZERhdGVcbiAgICogLTEgaXMgYmVmb3JlIHRoZSBjb21wYXJlZERhdGVcbiAgICogMCBpcyBlcXVhbCB0aGUgY29tcGFyZWREYXRlXG4gICAqL1xuICBwcml2YXRlIGNvbXBhcmVNaW51dGVzKGFtb3VudDogbnVtYmVyLCBjb21wYXJlZERhdGU6IFQpOiBudW1iZXIge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZFRpbWVyTWludXRlcyh0aGlzLnBpY2tlck1vbWVudCwgYW1vdW50KTtcbiAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUocmVzdWx0LCBjb21wYXJlZERhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBpY2tlck1vbWVudCdzIHNlY29uZCB2YWx1ZSArLy0gY2VydGFpbiBhbW91bnQgYW5kIGNvbXBhcmUgaXQgdG8gdGhlIGdpdmUgZGF0ZVxuICAgKiAxIGlzIGFmdGVyIHRoZSBjb21wYXJlZERhdGVcbiAgICogLTEgaXMgYmVmb3JlIHRoZSBjb21wYXJlZERhdGVcbiAgICogMCBpcyBlcXVhbCB0aGUgY29tcGFyZWREYXRlXG4gICAqL1xuICBwcml2YXRlIGNvbXBhcmVTZWNvbmRzKGFtb3VudDogbnVtYmVyLCBjb21wYXJlZERhdGU6IFQpOiBudW1iZXIge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZFRpbWVyU2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudCwgYW1vdW50KTtcbiAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUocmVzdWx0LCBjb21wYXJlZERhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XG4gICAqL1xuICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgID8gb2JqXG4gICAgICA6IG51bGw7XG4gIH1cbn1cbiIsIjxvd2wtZGF0ZS10aW1lLXRpbWVyLWJveFxuICBbdXBCdG5BcmlhTGFiZWxdPVwidXBIb3VyQnV0dG9uTGFiZWxcIlxuICBbZG93bkJ0bkFyaWFMYWJlbF09XCJkb3duSG91ckJ1dHRvbkxhYmVsXCJcbiAgW3VwQnRuRGlzYWJsZWRdPVwiIXVwSG91ckVuYWJsZWQoKVwiXG4gIFtkb3duQnRuRGlzYWJsZWRdPVwiIWRvd25Ib3VyRW5hYmxlZCgpXCJcbiAgW2JveFZhbHVlXT1cImhvdXJCb3hWYWx1ZVwiXG4gIFt2YWx1ZV09XCJob3VyVmFsdWVcIlxuICBbbWluXT1cIjBcIlxuICBbbWF4XT1cIjIzXCJcbiAgW3N0ZXBdPVwic3RlcEhvdXJcIlxuICBbaW5wdXRMYWJlbF09XCInSG91cidcIlxuICAoaW5wdXRDaGFuZ2UpPVwic2V0SG91clZhbHVlVmlhSW5wdXQoJGV2ZW50KVwiXG4gICh2YWx1ZUNoYW5nZSk9XCJzZXRIb3VyVmFsdWUoJGV2ZW50KVwiXG4+PC9vd2wtZGF0ZS10aW1lLXRpbWVyLWJveD5cbjxvd2wtZGF0ZS10aW1lLXRpbWVyLWJveFxuICBbc2hvd0RpdmlkZXJdPVwidHJ1ZVwiXG4gIFt1cEJ0bkFyaWFMYWJlbF09XCJ1cE1pbnV0ZUJ1dHRvbkxhYmVsXCJcbiAgW2Rvd25CdG5BcmlhTGFiZWxdPVwiZG93bk1pbnV0ZUJ1dHRvbkxhYmVsXCJcbiAgW3VwQnRuRGlzYWJsZWRdPVwiIXVwTWludXRlRW5hYmxlZCgpXCJcbiAgW2Rvd25CdG5EaXNhYmxlZF09XCIhZG93bk1pbnV0ZUVuYWJsZWQoKVwiXG4gIFt2YWx1ZV09XCJtaW51dGVWYWx1ZVwiXG4gIFttaW5dPVwiMFwiXG4gIFttYXhdPVwiNTlcIlxuICBbc3RlcF09XCJzdGVwTWludXRlXCJcbiAgW2lucHV0TGFiZWxdPVwiJ01pbnV0ZSdcIlxuICAoaW5wdXRDaGFuZ2UpPVwic2V0TWludXRlVmFsdWUoJGV2ZW50KVwiXG4gICh2YWx1ZUNoYW5nZSk9XCJzZXRNaW51dGVWYWx1ZSgkZXZlbnQpXCJcbj48L293bC1kYXRlLXRpbWUtdGltZXItYm94PlxuPG93bC1kYXRlLXRpbWUtdGltZXItYm94XG4gICpuZ0lmPVwic2hvd1NlY29uZHNUaW1lclwiXG4gIFtzaG93RGl2aWRlcl09XCJ0cnVlXCJcbiAgW3VwQnRuQXJpYUxhYmVsXT1cInVwU2Vjb25kQnV0dG9uTGFiZWxcIlxuICBbZG93bkJ0bkFyaWFMYWJlbF09XCJkb3duU2Vjb25kQnV0dG9uTGFiZWxcIlxuICBbdXBCdG5EaXNhYmxlZF09XCIhdXBTZWNvbmRFbmFibGVkKClcIlxuICBbZG93bkJ0bkRpc2FibGVkXT1cIiFkb3duU2Vjb25kRW5hYmxlZCgpXCJcbiAgW3ZhbHVlXT1cInNlY29uZFZhbHVlXCJcbiAgW21pbl09XCIwXCJcbiAgW21heF09XCI1OVwiXG4gIFtzdGVwXT1cInN0ZXBTZWNvbmRcIlxuICBbaW5wdXRMYWJlbF09XCInU2Vjb25kJ1wiXG4gIChpbnB1dENoYW5nZSk9XCJzZXRTZWNvbmRWYWx1ZSgkZXZlbnQpXCJcbiAgKHZhbHVlQ2hhbmdlKT1cInNldFNlY29uZFZhbHVlKCRldmVudClcIlxuPjwvb3dsLWRhdGUtdGltZS10aW1lci1ib3g+XG5cbjxkaXYgKm5nSWY9XCJob3VyMTJUaW1lclwiIGNsYXNzPVwib3dsLWR0LXRpbWVyLWhvdXIxMlwiPlxuICA8YnV0dG9uXG4gICAgY2xhc3M9XCJvd2wtZHQtY29udHJvbC1idXR0b24gb3dsLWR0LXRpbWVyLWhvdXIxMi1ib3hcIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIHRhYmluZGV4PVwiMFwiXG4gICAgKGNsaWNrKT1cInNldE1lcmlkaWFuKCRldmVudClcIlxuICA+XG4gICAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udHJvbC1idXR0b24tY29udGVudFwiIHRhYmluZGV4PVwiLTFcIj5cbiAgICAgIHt7IGhvdXIxMkJ1dHRvbkxhYmVsIH19XG4gICAgPC9zcGFuPlxuICA8L2J1dHRvbj5cbjwvZGl2PlxuIl19