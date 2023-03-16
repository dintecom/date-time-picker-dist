import { ChangeDetectionStrategy, Component, Optional, ViewChild } from '@angular/core';
import { OwlCalendarComponent } from './calendar.component';
import { OwlTimerComponent } from './timer.component';
import { Subject } from 'rxjs';
import { owlDateTimePickerAnimations } from './date-time-picker.animations';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import * as i0 from "@angular/core";
import * as i1 from "./date-time-picker-intl.service";
import * as i2 from "../adapter/date-time-adapter.class";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/a11y";
import * as i5 from "./timer.component";
import * as i6 from "./calendar.component";
export class OwlDateTimeContainerComponent {
    constructor(cdRef, elmRef, pickerIntl, dateTimeAdapter) {
        this.cdRef = cdRef;
        this.elmRef = elmRef;
        this.pickerIntl = pickerIntl;
        this.dateTimeAdapter = dateTimeAdapter;
        this.activeSelectedIndex = 0; // The current active SelectedIndex in range select mode (0: 'from', 1: 'to')
        this.lazyValidation = false;
        /**
         * Stream emits when try to hide picker
         */
        this.hidePicker$ = new Subject();
        /**
         * Stream emits when try to confirm the selected value
         */
        this.confirmSelected$ = new Subject();
        this.pickerOpened$ = new Subject();
    }
    get hidePickerStream() {
        return this.hidePicker$.asObservable();
    }
    get confirmSelectedStream() {
        return this.confirmSelected$.asObservable();
    }
    get pickerOpenedStream() {
        return this.pickerOpened$.asObservable();
    }
    get pickerMoment() {
        return this._clamPickerMoment;
    }
    set pickerMoment(value) {
        if (value) {
            this._clamPickerMoment = this.dateTimeAdapter.clampDate(value, this.picker.minDateTime, this.picker.maxDateTime);
        }
        this.cdRef.markForCheck();
    }
    get pickerType() {
        return this.picker.pickerType;
    }
    get cancelLabel() {
        return this.pickerIntl.cancelBtnLabel;
    }
    get setLabel() {
        return this.pickerIntl.setBtnLabel;
    }
    /**
     * The range 'from' label
     */
    get fromLabel() {
        return this.pickerIntl.rangeFromLabel;
    }
    /**
     * The range 'to' label
     */
    get toLabel() {
        return this.pickerIntl.rangeToLabel;
    }
    /**
     * The range 'from' formatted value
     */
    get fromFormattedValue() {
        const value = this.picker.selecteds[0];
        return value ? this.dateTimeAdapter.format(value, this.picker.formatString) : '';
    }
    /**
     * The range 'to' formatted value
     */
    get toFormattedValue() {
        const value = this.picker.selecteds[1];
        return value ? this.dateTimeAdapter.format(value, this.picker.formatString) : '';
    }
    /**
     * Cases in which the control buttons show in the picker
     * 1) picker mode is 'dialog'
     * 2) picker type is NOT 'calendar' and the picker mode is NOT 'inline'
     */
    get showControlButtons() {
        return (this.picker.pickerMode === 'dialog' ||
            (this.picker.pickerType !== 'calendar' && this.picker.pickerMode !== 'inline'));
    }
    get containerElm() {
        return this.elmRef.nativeElement;
    }
    get owlDTContainerClass() {
        return true;
    }
    get owlDTPopupContainerClass() {
        return this.picker.pickerMode === 'popup';
    }
    get owlDTDialogContainerClass() {
        return this.picker.pickerMode === 'dialog';
    }
    get owlDTInlineContainerClass() {
        return this.picker.pickerMode === 'inline';
    }
    get owlDTContainerDisabledClass() {
        return this.picker.disabled;
    }
    get owlDTContainerId() {
        return this.picker.id;
    }
    get owlDTContainerAnimation() {
        return this.picker.pickerMode === 'inline' ? '' : 'enter';
    }
    ngOnInit() { }
    ngAfterContentInit() {
        this.initPicker();
    }
    ngAfterViewInit() {
        this.focusPicker();
    }
    handleContainerAnimationDone(event) {
        const toState = event.toState;
        if (toState === 'enter') {
            this.pickerOpened$.next(null);
        }
    }
    dateSelected(date) {
        let result;
        if (this.picker.isInSingleMode) {
            result = this.dateSelectedInSingleMode(date);
            if (result) {
                this.pickerMoment = result;
                this.picker.select(result);
            }
            else {
                // we close the picker when result is null and pickerType is calendar.
                if (this.pickerType === 'calendar') {
                    this.hidePicker$.next(null);
                }
            }
            return;
        }
        if (this.picker.isInRangeMode) {
            result = this.dateSelectedInRangeMode(date);
            if (result) {
                this.pickerMoment = result[this.activeSelectedIndex];
                this.picker.select(result);
            }
        }
    }
    timeSelected(time) {
        this.pickerMoment = this.dateTimeAdapter.clone(time);
        if (!this.picker.dateTimeChecker(this.pickerMoment)) {
            return;
        }
        if (this.picker.isInSingleMode) {
            this.picker.select(this.pickerMoment);
            return;
        }
        if (this.picker.isInRangeMode) {
            const selecteds = [...this.picker.selecteds];
            // check if the 'from' is after 'to' or 'to'is before 'from'
            // In this case, we set both the 'from' and 'to' the same value
            if (!this.lazyValidation &&
                ((this.activeSelectedIndex === 0 &&
                    selecteds[1] &&
                    this.dateTimeAdapter.compareDate(this.pickerMoment, selecteds[1]) > 0) ||
                    (this.activeSelectedIndex === 1 &&
                        selecteds[0] &&
                        this.dateTimeAdapter.compareDate(this.pickerMoment, selecteds[0]) < 0))) {
                selecteds[0] = this.pickerMoment;
                selecteds[1] = this.pickerMoment;
            }
            else {
                selecteds[this.activeSelectedIndex] = this.pickerMoment;
            }
            this.picker.select(selecteds);
        }
    }
    /**
     * Handle click on cancel button
     */
    onCancelClicked(event) {
        this.hidePicker$.next(null);
        event.preventDefault();
        return;
    }
    /**
     * Handle click on set button
     */
    onSetClicked(event) {
        this._checkBeforeAfterTimeValidity();
        if (!this.picker.dateTimeChecker(this.pickerMoment)) {
            this.hidePicker$.next(null);
            event.preventDefault();
            return;
        }
        this.confirmSelected$.next(event);
        event.preventDefault();
        return;
    }
    /**
     * Handle click on inform radio group
     */
    handleClickOnInfoGroup(event, index) {
        this.setActiveSelectedIndex(index);
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * Handle click on inform radio group
     */
    handleKeydownOnInfoGroup(event, next, index) {
        switch (event.keyCode) {
            case DOWN_ARROW:
            case RIGHT_ARROW:
            case UP_ARROW:
            case LEFT_ARROW:
                next.focus();
                this.setActiveSelectedIndex(index === 0 ? 1 : 0);
                event.preventDefault();
                event.stopPropagation();
                break;
            case SPACE:
                this.setActiveSelectedIndex(index);
                event.preventDefault();
                event.stopPropagation();
                break;
            default:
                return;
        }
    }
    /**
     * Set the value of activeSelectedIndex
     */
    setActiveSelectedIndex(index) {
        if (this.picker.selectMode === 'range' && this.activeSelectedIndex !== index) {
            this.activeSelectedIndex = index;
            const selected = this.picker.selecteds[this.activeSelectedIndex];
            if (this.picker.selecteds && selected) {
                this.pickerMoment = this.dateTimeAdapter.clone(selected);
            }
            this._checkBeforeAfterTimeValidity();
        }
        return;
    }
    initPicker() {
        this.pickerMoment = this.picker.startAt || this.dateTimeAdapter.now();
        this.activeSelectedIndex = this.picker.selectMode === 'rangeTo' ? 1 : 0;
    }
    /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     */
    dateSelectedInSingleMode(date) {
        if (this.dateTimeAdapter.sameDate(date, this.picker.selected)) {
            return null;
        }
        return this.updateAndCheckCalendarDate(date);
    }
    /**
     * Select dates in range Mode
     */
    dateSelectedInRangeMode(date) {
        let from = this.picker.selecteds[0];
        let to = this.picker.selecteds[1];
        const result = this.updateAndCheckCalendarDate(date);
        if (!result) {
            return null;
        }
        // if the given calendar day is after or equal to 'from',
        // set ths given date as 'to'
        // otherwise, set it as 'from' and set 'to' to null
        if (this.picker.selectMode === 'range') {
            if (this.picker.selecteds &&
                this.picker.selecteds.length &&
                !to &&
                from &&
                this.dateTimeAdapter.differenceInCalendarDays(result, from) >= 0) {
                to = result;
                this.activeSelectedIndex = 1;
            }
            else {
                from = result;
                to = null;
                this.activeSelectedIndex = 0;
            }
        }
        else if (this.picker.selectMode === 'rangeFrom') {
            from = result;
            // if the from value is after the to value, set the to value as null
            if (to && this.dateTimeAdapter.compareDate(from, to) > 0) {
                to = null;
            }
        }
        else if (this.picker.selectMode === 'rangeTo') {
            to = result;
            // if the from value is after the to value, set the from value as null
            if (from && this.dateTimeAdapter.compareDate(from, to) > 0) {
                from = null;
            }
        }
        return [from, to];
    }
    /**
     * Update the given calendar date's time and check if it is valid
     * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
     * we need to update the given calendar date's time before selecting it.
     * if it is valid, return the updated dateTime
     * if it is not valid, return null
     */
    updateAndCheckCalendarDate(date) {
        let result;
        // if the picker is 'both', update the calendar date's time value
        if (this.picker.pickerType === 'both') {
            result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(date), this.dateTimeAdapter.getMonth(date), this.dateTimeAdapter.getDate(date), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
            result = this.dateTimeAdapter.clampDate(result, this.picker.minDateTime, this.picker.maxDateTime);
        }
        else {
            result = this.dateTimeAdapter.clone(date);
        }
        // check the updated dateTime
        return this.picker.dateTimeChecker(result) ? result : null;
    }
    /**
     * Focus to the picker
     */
    focusPicker() {
        if (this.picker.pickerMode === 'inline') {
            return;
        }
        if (this.calendar) {
            this.calendar.focusActiveCell();
        }
        else if (this.timer) {
            this.timer.focus();
        }
    }
    _checkBeforeAfterTimeValidity() {
        if (this.picker.isInRangeMode && this.lazyValidation) {
            const selecteds = [...this.picker.selecteds];
            if ((this.activeSelectedIndex === 0 &&
                selecteds[1] &&
                this.dateTimeAdapter.compareDate(this.pickerMoment, selecteds[1]) > 0) ||
                (this.activeSelectedIndex === 1 &&
                    selecteds[0] &&
                    this.dateTimeAdapter.compareDate(this.pickerMoment, selecteds[0]) < 0)) {
                selecteds[0] = this.pickerMoment;
                selecteds[1] = this.pickerMoment;
                this.picker.select(selecteds);
            }
        }
    }
}
OwlDateTimeContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeContainerComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1.OwlDateTimeIntl }, { token: i2.DateTimeAdapter, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OwlDateTimeContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: OwlDateTimeContainerComponent, selector: "owl-date-time-container", host: { listeners: { "@transformPicker.done": "handleContainerAnimationDone($event)" }, properties: { "class.owl-dt-container": "owlDTContainerClass", "class.owl-dt-popup-container": "owlDTPopupContainerClass", "class.owl-dt-dialog-container": "owlDTDialogContainerClass", "class.owl-dt-inline-container": "owlDTInlineContainerClass", "class.owl-dt-container-disabled": "owlDTContainerDisabledClass", "attr.id": "owlDTContainerId", "@transformPicker": "owlDTContainerAnimation" } }, viewQueries: [{ propertyName: "calendar", first: true, predicate: OwlCalendarComponent, descendants: true }, { propertyName: "timer", first: true, predicate: OwlTimerComponent, descendants: true }], exportAs: ["owlDateTimeContainer"], ngImport: i0, template: "<div\n  [cdkTrapFocus]=\"picker.pickerMode !== 'inline'\"\n  [@fadeInPicker]=\"picker.pickerMode === 'inline' ? '' : 'enter'\"\n  class=\"owl-dt-container-inner\"\n>\n  <owl-date-time-calendar\n    *ngIf=\"pickerType === 'both' || pickerType === 'calendar'\"\n    class=\"owl-dt-container-row\"\n    [firstDayOfWeek]=\"picker.firstDayOfWeek\"\n    [(pickerMoment)]=\"pickerMoment\"\n    [selected]=\"picker.selected\"\n    [selecteds]=\"picker.selecteds\"\n    [selectMode]=\"picker.selectMode\"\n    [minDate]=\"picker.minDateTime\"\n    [maxDate]=\"picker.maxDateTime\"\n    [dateFilter]=\"picker.dateTimeFilter\"\n    [startView]=\"picker.startView\"\n    [hideOtherMonths]=\"picker.hideOtherMonths\"\n    (yearSelected)=\"picker.selectYear($event)\"\n    (monthSelected)=\"picker.selectMonth($event)\"\n    (selectedChange)=\"dateSelected($event)\"\n  ></owl-date-time-calendar>\n\n  <owl-date-time-timer\n    *ngIf=\"pickerType === 'both' || pickerType === 'timer'\"\n    class=\"owl-dt-container-row\"\n    [pickerMoment]=\"pickerMoment\"\n    [minDateTime]=\"picker.minDateTime\"\n    [maxDateTime]=\"picker.maxDateTime\"\n    [showSecondsTimer]=\"picker.showSecondsTimer\"\n    [hour12Timer]=\"picker.hour12Timer\"\n    [stepHour]=\"picker.stepHour\"\n    [stepMinute]=\"picker.stepMinute\"\n    [stepSecond]=\"picker.stepSecond\"\n    (selectedChange)=\"timeSelected($event)\"\n  ></owl-date-time-timer>\n\n  <div\n    *ngIf=\"picker.isInRangeMode\"\n    role=\"radiogroup\"\n    class=\"owl-dt-container-info owl-dt-container-row\"\n  >\n    <div\n      role=\"radio\"\n      [tabindex]=\"activeSelectedIndex === 0 ? 0 : -1\"\n      [attr.aria-checked]=\"activeSelectedIndex === 0\"\n      class=\"owl-dt-control owl-dt-container-range owl-dt-container-from\"\n      [ngClass]=\"{ 'owl-dt-container-info-active': activeSelectedIndex === 0 }\"\n      (click)=\"handleClickOnInfoGroup($event, 0)\"\n      (keydown)=\"handleKeydownOnInfoGroup($event, to, 0)\"\n      #from\n    >\n      <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\n        <span class=\"owl-dt-container-info-label\">{{ fromLabel }}:</span>\n        <span class=\"owl-dt-container-info-value\">{{ fromFormattedValue }}</span>\n      </span>\n    </div>\n    <div\n      role=\"radio\"\n      [tabindex]=\"activeSelectedIndex === 1 ? 0 : -1\"\n      [attr.aria-checked]=\"activeSelectedIndex === 1\"\n      class=\"owl-dt-control owl-dt-container-range owl-dt-container-to\"\n      [ngClass]=\"{ 'owl-dt-container-info-active': activeSelectedIndex === 1 }\"\n      (click)=\"handleClickOnInfoGroup($event, 1)\"\n      (keydown)=\"handleKeydownOnInfoGroup($event, from, 1)\"\n      #to\n    >\n      <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\n        <span class=\"owl-dt-container-info-label\">{{ toLabel }}:</span>\n        <span class=\"owl-dt-container-info-value\">{{ toFormattedValue }}</span>\n      </span>\n    </div>\n  </div>\n\n  <div *ngIf=\"showControlButtons\" class=\"owl-dt-container-buttons owl-dt-container-row\">\n    <button\n      class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\n      type=\"button\"\n      tabindex=\"0\"\n      (click)=\"onCancelClicked($event)\"\n    >\n      <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n        {{ cancelLabel }}\n      </span>\n    </button>\n    <button\n      class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\n      type=\"button\"\n      tabindex=\"0\"\n      (click)=\"onSetClicked($event)\"\n    >\n      <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n        {{ setLabel }}\n      </span>\n    </button>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { kind: "component", type: i5.OwlTimerComponent, selector: "owl-date-time-timer", inputs: ["pickerMoment", "minDateTime", "maxDateTime", "showSecondsTimer", "hour12Timer", "stepHour", "stepMinute", "stepSecond"], outputs: ["selectedChange"], exportAs: ["owlDateTimeTimer"] }, { kind: "component", type: i6.OwlCalendarComponent, selector: "owl-date-time-calendar", inputs: ["dateFilter", "firstDayOfWeek", "minDate", "maxDate", "pickerMoment", "selectMode", "selected", "selecteds", "startView", "hideOtherMonths"], outputs: ["pickerMomentChange", "selectedChange", "userSelection", "yearSelected", "monthSelected"], exportAs: ["owlDateTimeCalendar"] }], animations: [
        owlDateTimePickerAnimations.transformPicker,
        owlDateTimePickerAnimations.fadeInPicker
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeContainerComponent, decorators: [{
            type: Component,
            args: [{ exportAs: 'owlDateTimeContainer', selector: 'owl-date-time-container', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        owlDateTimePickerAnimations.transformPicker,
                        owlDateTimePickerAnimations.fadeInPicker
                    ], host: {
                        '(@transformPicker.done)': 'handleContainerAnimationDone($event)',
                        '[class.owl-dt-container]': 'owlDTContainerClass',
                        '[class.owl-dt-popup-container]': 'owlDTPopupContainerClass',
                        '[class.owl-dt-dialog-container]': 'owlDTDialogContainerClass',
                        '[class.owl-dt-inline-container]': 'owlDTInlineContainerClass',
                        '[class.owl-dt-container-disabled]': 'owlDTContainerDisabledClass',
                        '[attr.id]': 'owlDTContainerId',
                        '[@transformPicker]': 'owlDTContainerAnimation'
                    }, template: "<div\n  [cdkTrapFocus]=\"picker.pickerMode !== 'inline'\"\n  [@fadeInPicker]=\"picker.pickerMode === 'inline' ? '' : 'enter'\"\n  class=\"owl-dt-container-inner\"\n>\n  <owl-date-time-calendar\n    *ngIf=\"pickerType === 'both' || pickerType === 'calendar'\"\n    class=\"owl-dt-container-row\"\n    [firstDayOfWeek]=\"picker.firstDayOfWeek\"\n    [(pickerMoment)]=\"pickerMoment\"\n    [selected]=\"picker.selected\"\n    [selecteds]=\"picker.selecteds\"\n    [selectMode]=\"picker.selectMode\"\n    [minDate]=\"picker.minDateTime\"\n    [maxDate]=\"picker.maxDateTime\"\n    [dateFilter]=\"picker.dateTimeFilter\"\n    [startView]=\"picker.startView\"\n    [hideOtherMonths]=\"picker.hideOtherMonths\"\n    (yearSelected)=\"picker.selectYear($event)\"\n    (monthSelected)=\"picker.selectMonth($event)\"\n    (selectedChange)=\"dateSelected($event)\"\n  ></owl-date-time-calendar>\n\n  <owl-date-time-timer\n    *ngIf=\"pickerType === 'both' || pickerType === 'timer'\"\n    class=\"owl-dt-container-row\"\n    [pickerMoment]=\"pickerMoment\"\n    [minDateTime]=\"picker.minDateTime\"\n    [maxDateTime]=\"picker.maxDateTime\"\n    [showSecondsTimer]=\"picker.showSecondsTimer\"\n    [hour12Timer]=\"picker.hour12Timer\"\n    [stepHour]=\"picker.stepHour\"\n    [stepMinute]=\"picker.stepMinute\"\n    [stepSecond]=\"picker.stepSecond\"\n    (selectedChange)=\"timeSelected($event)\"\n  ></owl-date-time-timer>\n\n  <div\n    *ngIf=\"picker.isInRangeMode\"\n    role=\"radiogroup\"\n    class=\"owl-dt-container-info owl-dt-container-row\"\n  >\n    <div\n      role=\"radio\"\n      [tabindex]=\"activeSelectedIndex === 0 ? 0 : -1\"\n      [attr.aria-checked]=\"activeSelectedIndex === 0\"\n      class=\"owl-dt-control owl-dt-container-range owl-dt-container-from\"\n      [ngClass]=\"{ 'owl-dt-container-info-active': activeSelectedIndex === 0 }\"\n      (click)=\"handleClickOnInfoGroup($event, 0)\"\n      (keydown)=\"handleKeydownOnInfoGroup($event, to, 0)\"\n      #from\n    >\n      <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\n        <span class=\"owl-dt-container-info-label\">{{ fromLabel }}:</span>\n        <span class=\"owl-dt-container-info-value\">{{ fromFormattedValue }}</span>\n      </span>\n    </div>\n    <div\n      role=\"radio\"\n      [tabindex]=\"activeSelectedIndex === 1 ? 0 : -1\"\n      [attr.aria-checked]=\"activeSelectedIndex === 1\"\n      class=\"owl-dt-control owl-dt-container-range owl-dt-container-to\"\n      [ngClass]=\"{ 'owl-dt-container-info-active': activeSelectedIndex === 1 }\"\n      (click)=\"handleClickOnInfoGroup($event, 1)\"\n      (keydown)=\"handleKeydownOnInfoGroup($event, from, 1)\"\n      #to\n    >\n      <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\n        <span class=\"owl-dt-container-info-label\">{{ toLabel }}:</span>\n        <span class=\"owl-dt-container-info-value\">{{ toFormattedValue }}</span>\n      </span>\n    </div>\n  </div>\n\n  <div *ngIf=\"showControlButtons\" class=\"owl-dt-container-buttons owl-dt-container-row\">\n    <button\n      class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\n      type=\"button\"\n      tabindex=\"0\"\n      (click)=\"onCancelClicked($event)\"\n    >\n      <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n        {{ cancelLabel }}\n      </span>\n    </button>\n    <button\n      class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\n      type=\"button\"\n      tabindex=\"0\"\n      (click)=\"onSetClicked($event)\"\n    >\n      <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n        {{ setLabel }}\n      </span>\n    </button>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1.OwlDateTimeIntl }, { type: i2.DateTimeAdapter, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { calendar: [{
                type: ViewChild,
                args: [OwlCalendarComponent]
            }], timer: [{
                type: ViewChild,
                args: [OwlTimerComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFHVCxRQUFRLEVBQ1IsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR3RELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7QUFzQjdGLE1BQU0sT0FBTyw2QkFBNkI7SUE2SXhDLFlBQ1UsS0FBd0IsRUFDeEIsTUFBa0IsRUFDbEIsVUFBMkIsRUFDZixlQUFtQztRQUgvQyxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQ2Ysb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBMUlsRCx3QkFBbUIsR0FBRyxDQUFDLENBQUMsQ0FBQyw2RUFBNkU7UUFDdEcsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFOUI7O1dBRUc7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WUFBWSxDQUFDO2dCQUNqQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFFakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0I7U0FDRjtJQUNILENBQUM7OzBIQXRiVSw2QkFBNkI7OEdBQTdCLDZCQUE2Qiw0a0JBQzdCLG9CQUFvQix3RUFFcEIsaUJBQWlCLG9GQzVDOUIsb3RIQWlHQSx3Z0NEdkVjO1FBQ1YsMkJBQTJCLENBQUMsZUFBZTtRQUMzQywyQkFBMkIsQ0FBQyxZQUFZO0tBQ3pDOzJGQVlVLDZCQUE2QjtrQkFwQnpDLFNBQVM7K0JBQ0Usc0JBQXNCLFlBQ3RCLHlCQUF5QixtQkFFbEIsdUJBQXVCLENBQUMsTUFBTSxjQUNuQzt3QkFDViwyQkFBMkIsQ0FBQyxlQUFlO3dCQUMzQywyQkFBMkIsQ0FBQyxZQUFZO3FCQUN6QyxRQUNLO3dCQUNKLHlCQUF5QixFQUFFLHNDQUFzQzt3QkFDakUsMEJBQTBCLEVBQUUscUJBQXFCO3dCQUNqRCxnQ0FBZ0MsRUFBRSwwQkFBMEI7d0JBQzVELGlDQUFpQyxFQUFFLDJCQUEyQjt3QkFDOUQsaUNBQWlDLEVBQUUsMkJBQTJCO3dCQUM5RCxtQ0FBbUMsRUFBRSw2QkFBNkI7d0JBQ2xFLFdBQVcsRUFBRSxrQkFBa0I7d0JBQy9CLG9CQUFvQixFQUFFLHlCQUF5QjtxQkFDaEQ7OzBCQW1KRSxRQUFROzRDQS9JWCxRQUFRO3NCQURQLFNBQVM7dUJBQUMsb0JBQW9CO2dCQUcvQixLQUFLO3NCQURKLFNBQVM7dUJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcbmltcG9ydCB7IE93bENhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsVGltZXJDb21wb25lbnQgfSBmcm9tICcuL3RpbWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IE93bERhdGVUaW1lLCBQaWNrZXJUeXBlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgb3dsRGF0ZVRpbWVQaWNrZXJBbmltYXRpb25zIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRE9XTl9BUlJPVywgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5cbkBDb21wb25lbnQoe1xuICBleHBvcnRBczogJ293bERhdGVUaW1lQ29udGFpbmVyJyxcbiAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgb3dsRGF0ZVRpbWVQaWNrZXJBbmltYXRpb25zLnRyYW5zZm9ybVBpY2tlcixcbiAgICBvd2xEYXRlVGltZVBpY2tlckFuaW1hdGlvbnMuZmFkZUluUGlja2VyXG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAnKEB0cmFuc2Zvcm1QaWNrZXIuZG9uZSknOiAnaGFuZGxlQ29udGFpbmVyQW5pbWF0aW9uRG9uZSgkZXZlbnQpJyxcbiAgICAnW2NsYXNzLm93bC1kdC1jb250YWluZXJdJzogJ293bERUQ29udGFpbmVyQ2xhc3MnLFxuICAgICdbY2xhc3Mub3dsLWR0LXBvcHVwLWNvbnRhaW5lcl0nOiAnb3dsRFRQb3B1cENvbnRhaW5lckNsYXNzJyxcbiAgICAnW2NsYXNzLm93bC1kdC1kaWFsb2ctY29udGFpbmVyXSc6ICdvd2xEVERpYWxvZ0NvbnRhaW5lckNsYXNzJyxcbiAgICAnW2NsYXNzLm93bC1kdC1pbmxpbmUtY29udGFpbmVyXSc6ICdvd2xEVElubGluZUNvbnRhaW5lckNsYXNzJyxcbiAgICAnW2NsYXNzLm93bC1kdC1jb250YWluZXItZGlzYWJsZWRdJzogJ293bERUQ29udGFpbmVyRGlzYWJsZWRDbGFzcycsXG4gICAgJ1thdHRyLmlkXSc6ICdvd2xEVENvbnRhaW5lcklkJyxcbiAgICAnW0B0cmFuc2Zvcm1QaWNrZXJdJzogJ293bERUQ29udGFpbmVyQW5pbWF0aW9uJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZChPd2xDYWxlbmRhckNvbXBvbmVudClcbiAgY2FsZW5kYXI6IE93bENhbGVuZGFyQ29tcG9uZW50PFQ+O1xuICBAVmlld0NoaWxkKE93bFRpbWVyQ29tcG9uZW50KVxuICB0aW1lcjogT3dsVGltZXJDb21wb25lbnQ8VD47XG5cbiAgcHVibGljIHBpY2tlcjogT3dsRGF0ZVRpbWU8VD47XG4gIHB1YmxpYyBhY3RpdmVTZWxlY3RlZEluZGV4ID0gMDsgLy8gVGhlIGN1cnJlbnQgYWN0aXZlIFNlbGVjdGVkSW5kZXggaW4gcmFuZ2Ugc2VsZWN0IG1vZGUgKDA6ICdmcm9tJywgMTogJ3RvJylcbiAgcHVibGljIGxhenlWYWxpZGF0aW9uID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFN0cmVhbSBlbWl0cyB3aGVuIHRyeSB0byBoaWRlIHBpY2tlclxuICAgKi9cbiAgcHJpdmF0ZSBoaWRlUGlja2VyJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBnZXQgaGlkZVBpY2tlclN0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmhpZGVQaWNrZXIkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0cmVhbSBlbWl0cyB3aGVuIHRyeSB0byBjb25maXJtIHRoZSBzZWxlY3RlZCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBjb25maXJtU2VsZWN0ZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGdldCBjb25maXJtU2VsZWN0ZWRTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maXJtU2VsZWN0ZWQkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBwaWNrZXJPcGVuZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGdldCBwaWNrZXJPcGVuZWRTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXJPcGVuZWQkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHBpY2tlciBtb21lbnQuIFRoaXMgZGV0ZXJtaW5lcyB3aGljaCB0aW1lIHBlcmlvZCBpcyBzaG93biBhbmQgd2hpY2ggZGF0ZSBpc1xuICAgKiBoaWdobGlnaHRlZCB3aGVuIHVzaW5nIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9jbGFtUGlja2VyTW9tZW50OiBUO1xuXG4gIGdldCBwaWNrZXJNb21lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYW1QaWNrZXJNb21lbnQ7XG4gIH1cblxuICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9jbGFtUGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xhbXBEYXRlKFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgdGhpcy5waWNrZXIubWluRGF0ZVRpbWUsXG4gICAgICAgIHRoaXMucGlja2VyLm1heERhdGVUaW1lXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHBpY2tlclR5cGUoKTogUGlja2VyVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VyLnBpY2tlclR5cGU7XG4gIH1cblxuICBnZXQgY2FuY2VsTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLmNhbmNlbEJ0bkxhYmVsO1xuICB9XG5cbiAgZ2V0IHNldExhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5zZXRCdG5MYWJlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmFuZ2UgJ2Zyb20nIGxhYmVsXG4gICAqL1xuICBnZXQgZnJvbUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5yYW5nZUZyb21MYWJlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmFuZ2UgJ3RvJyBsYWJlbFxuICAgKi9cbiAgZ2V0IHRvTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnJhbmdlVG9MYWJlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmFuZ2UgJ2Zyb20nIGZvcm1hdHRlZCB2YWx1ZVxuICAgKi9cbiAgZ2V0IGZyb21Gb3JtYXR0ZWRWYWx1ZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5waWNrZXIuc2VsZWN0ZWRzWzBdO1xuICAgIHJldHVybiB2YWx1ZSA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGhpcy5waWNrZXIuZm9ybWF0U3RyaW5nKSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByYW5nZSAndG8nIGZvcm1hdHRlZCB2YWx1ZVxuICAgKi9cbiAgZ2V0IHRvRm9ybWF0dGVkVmFsdWUoKTogc3RyaW5nIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1sxXTtcbiAgICByZXR1cm4gdmFsdWUgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQodmFsdWUsIHRoaXMucGlja2VyLmZvcm1hdFN0cmluZykgOiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXNlcyBpbiB3aGljaCB0aGUgY29udHJvbCBidXR0b25zIHNob3cgaW4gdGhlIHBpY2tlclxuICAgKiAxKSBwaWNrZXIgbW9kZSBpcyAnZGlhbG9nJ1xuICAgKiAyKSBwaWNrZXIgdHlwZSBpcyBOT1QgJ2NhbGVuZGFyJyBhbmQgdGhlIHBpY2tlciBtb2RlIGlzIE5PVCAnaW5saW5lJ1xuICAgKi9cbiAgZ2V0IHNob3dDb250cm9sQnV0dG9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2RpYWxvZycgfHxcbiAgICAgICh0aGlzLnBpY2tlci5waWNrZXJUeXBlICE9PSAnY2FsZW5kYXInICYmIHRoaXMucGlja2VyLnBpY2tlck1vZGUgIT09ICdpbmxpbmUnKVxuICAgICk7XG4gIH1cblxuICBnZXQgY29udGFpbmVyRWxtKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGdldCBvd2xEVENvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0IG93bERUUG9wdXBDb250YWluZXJDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ3BvcHVwJztcbiAgfVxuXG4gIGdldCBvd2xEVERpYWxvZ0NvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnZGlhbG9nJztcbiAgfVxuXG4gIGdldCBvd2xEVElubGluZUNvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnaW5saW5lJztcbiAgfVxuXG4gIGdldCBvd2xEVENvbnRhaW5lckRpc2FibGVkQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VyLmRpc2FibGVkO1xuICB9XG5cbiAgZ2V0IG93bERUQ29udGFpbmVySWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXIuaWQ7XG4gIH1cblxuICBnZXQgb3dsRFRDb250YWluZXJBbmltYXRpb24oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2lubGluZScgPyAnJyA6ICdlbnRlcic7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGVsbVJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+XG4gICkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7fVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0UGlja2VyKCk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNQaWNrZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDb250YWluZXJBbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRvU3RhdGUgPSBldmVudC50b1N0YXRlO1xuICAgIGlmICh0b1N0YXRlID09PSAnZW50ZXInKSB7XG4gICAgICB0aGlzLnBpY2tlck9wZW5lZCQubmV4dChudWxsKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGF0ZVNlbGVjdGVkKGRhdGU6IFQpOiB2b2lkIHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgaWYgKHRoaXMucGlja2VyLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLmRhdGVTZWxlY3RlZEluU2luZ2xlTW9kZShkYXRlKTtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSByZXN1bHQ7XG4gICAgICAgIHRoaXMucGlja2VyLnNlbGVjdChyZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gd2UgY2xvc2UgdGhlIHBpY2tlciB3aGVuIHJlc3VsdCBpcyBudWxsIGFuZCBwaWNrZXJUeXBlIGlzIGNhbGVuZGFyLlxuICAgICAgICBpZiAodGhpcy5waWNrZXJUeXBlID09PSAnY2FsZW5kYXInKSB7XG4gICAgICAgICAgdGhpcy5oaWRlUGlja2VyJC5uZXh0KG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGlja2VyLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVNlbGVjdGVkSW5SYW5nZU1vZGUoZGF0ZSk7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gcmVzdWx0W3RoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleF07XG4gICAgICAgIHRoaXMucGlja2VyLnNlbGVjdChyZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0aW1lU2VsZWN0ZWQodGltZTogVCk6IHZvaWQge1xuICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUodGltZSk7XG5cbiAgICBpZiAoIXRoaXMucGlja2VyLmRhdGVUaW1lQ2hlY2tlcih0aGlzLnBpY2tlck1vbWVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5waWNrZXIuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgIHRoaXMucGlja2VyLnNlbGVjdCh0aGlzLnBpY2tlck1vbWVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGlja2VyLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkcyA9IFsuLi50aGlzLnBpY2tlci5zZWxlY3RlZHNdO1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgJ2Zyb20nIGlzIGFmdGVyICd0bycgb3IgJ3RvJ2lzIGJlZm9yZSAnZnJvbSdcbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2Ugc2V0IGJvdGggdGhlICdmcm9tJyBhbmQgJ3RvJyB0aGUgc2FtZSB2YWx1ZVxuICAgICAgaWYgKFxuICAgICAgICAhdGhpcy5sYXp5VmFsaWRhdGlvbiAmJlxuICAgICAgICAoKHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9PT0gMCAmJlxuICAgICAgICAgIHNlbGVjdGVkc1sxXSAmJlxuICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKHRoaXMucGlja2VyTW9tZW50LCBzZWxlY3RlZHNbMV0pID4gMCkgfHxcbiAgICAgICAgICAodGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID09PSAxICYmXG4gICAgICAgICAgICBzZWxlY3RlZHNbMF0gJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKHRoaXMucGlja2VyTW9tZW50LCBzZWxlY3RlZHNbMF0pIDwgMCkpXG4gICAgICApIHtcbiAgICAgICAgc2VsZWN0ZWRzWzBdID0gdGhpcy5waWNrZXJNb21lbnQ7XG4gICAgICAgIHNlbGVjdGVkc1sxXSA9IHRoaXMucGlja2VyTW9tZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZWN0ZWRzW3RoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleF0gPSB0aGlzLnBpY2tlck1vbWVudDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5waWNrZXIuc2VsZWN0KHNlbGVjdGVkcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBjbGljayBvbiBjYW5jZWwgYnV0dG9uXG4gICAqL1xuICBwdWJsaWMgb25DYW5jZWxDbGlja2VkKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGVQaWNrZXIkLm5leHQobnVsbCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGNsaWNrIG9uIHNldCBidXR0b25cbiAgICovXG4gIHB1YmxpYyBvblNldENsaWNrZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2NoZWNrQmVmb3JlQWZ0ZXJUaW1lVmFsaWRpdHkoKTtcblxuICAgIGlmICghdGhpcy5waWNrZXIuZGF0ZVRpbWVDaGVja2VyKHRoaXMucGlja2VyTW9tZW50KSkge1xuICAgICAgdGhpcy5oaWRlUGlja2VyJC5uZXh0KG51bGwpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZCQubmV4dChldmVudCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGNsaWNrIG9uIGluZm9ybSByYWRpbyBncm91cFxuICAgKi9cbiAgcHVibGljIGhhbmRsZUNsaWNrT25JbmZvR3JvdXAoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2V0QWN0aXZlU2VsZWN0ZWRJbmRleChpbmRleCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgY2xpY2sgb24gaW5mb3JtIHJhZGlvIGdyb3VwXG4gICAqL1xuICBwdWJsaWMgaGFuZGxlS2V5ZG93bk9uSW5mb0dyb3VwKGV2ZW50OiBhbnksIG5leHQ6IGFueSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgIG5leHQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVTZWxlY3RlZEluZGV4KGluZGV4ID09PSAwID8gMSA6IDApO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlU2VsZWN0ZWRJbmRleChpbmRleCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHZhbHVlIG9mIGFjdGl2ZVNlbGVjdGVkSW5kZXhcbiAgICovXG4gIHByaXZhdGUgc2V0QWN0aXZlU2VsZWN0ZWRJbmRleChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGlja2VyLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgJiYgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ICE9PSBpbmRleCkge1xuICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID0gaW5kZXg7XG5cbiAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5waWNrZXIuc2VsZWN0ZWRzW3RoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleF07XG4gICAgICBpZiAodGhpcy5waWNrZXIuc2VsZWN0ZWRzICYmIHNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUoc2VsZWN0ZWQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jaGVja0JlZm9yZUFmdGVyVGltZVZhbGlkaXR5KCk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFBpY2tlcigpOiB2b2lkIHtcbiAgICB0aGlzLnBpY2tlck1vbWVudCA9IHRoaXMucGlja2VyLnN0YXJ0QXQgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID0gdGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nID8gMSA6IDA7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGNhbGVuZGFyIGRhdGUgaW4gc2luZ2xlIG1vZGUsXG4gICAqIGl0IHJldHVybnMgbnVsbCB3aGVuIGRhdGUgaXMgbm90IHNlbGVjdGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBkYXRlU2VsZWN0ZWRJblNpbmdsZU1vZGUoZGF0ZTogVCk6IFQgfCBudWxsIHtcbiAgICBpZiAodGhpcy5kYXRlVGltZUFkYXB0ZXIuc2FtZURhdGUoZGF0ZSwgdGhpcy5waWNrZXIuc2VsZWN0ZWQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy51cGRhdGVBbmRDaGVja0NhbGVuZGFyRGF0ZShkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgZGF0ZXMgaW4gcmFuZ2UgTW9kZVxuICAgKi9cbiAgcHJpdmF0ZSBkYXRlU2VsZWN0ZWRJblJhbmdlTW9kZShkYXRlOiBUKTogVFtdIHwgbnVsbCB7XG4gICAgbGV0IGZyb20gPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbMF07XG4gICAgbGV0IHRvID0gdGhpcy5waWNrZXIuc2VsZWN0ZWRzWzFdO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy51cGRhdGVBbmRDaGVja0NhbGVuZGFyRGF0ZShkYXRlKTtcblxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgZ2l2ZW4gY2FsZW5kYXIgZGF5IGlzIGFmdGVyIG9yIGVxdWFsIHRvICdmcm9tJyxcbiAgICAvLyBzZXQgdGhzIGdpdmVuIGRhdGUgYXMgJ3RvJ1xuICAgIC8vIG90aGVyd2lzZSwgc2V0IGl0IGFzICdmcm9tJyBhbmQgc2V0ICd0bycgdG8gbnVsbFxuICAgIGlmICh0aGlzLnBpY2tlci5zZWxlY3RNb2RlID09PSAncmFuZ2UnKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMucGlja2VyLnNlbGVjdGVkcyAmJlxuICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3RlZHMubGVuZ3RoICYmXG4gICAgICAgICF0byAmJlxuICAgICAgICBmcm9tICYmXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhyZXN1bHQsIGZyb20pID49IDBcbiAgICAgICkge1xuICAgICAgICB0byA9IHJlc3VsdDtcbiAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZyb20gPSByZXN1bHQ7XG4gICAgICAgIHRvID0gbnVsbDtcbiAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMucGlja2VyLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nKSB7XG4gICAgICBmcm9tID0gcmVzdWx0O1xuXG4gICAgICAvLyBpZiB0aGUgZnJvbSB2YWx1ZSBpcyBhZnRlciB0aGUgdG8gdmFsdWUsIHNldCB0aGUgdG8gdmFsdWUgYXMgbnVsbFxuICAgICAgaWYgKHRvICYmIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKGZyb20sIHRvKSA+IDApIHtcbiAgICAgICAgdG8gPSBudWxsO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nKSB7XG4gICAgICB0byA9IHJlc3VsdDtcblxuICAgICAgLy8gaWYgdGhlIGZyb20gdmFsdWUgaXMgYWZ0ZXIgdGhlIHRvIHZhbHVlLCBzZXQgdGhlIGZyb20gdmFsdWUgYXMgbnVsbFxuICAgICAgaWYgKGZyb20gJiYgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUoZnJvbSwgdG8pID4gMCkge1xuICAgICAgICBmcm9tID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2Zyb20sIHRvXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGdpdmVuIGNhbGVuZGFyIGRhdGUncyB0aW1lIGFuZCBjaGVjayBpZiBpdCBpcyB2YWxpZFxuICAgKiBCZWNhdXNlIHRoZSBjYWxlbmRhciBkYXRlIGhhcyAwMDowMDowMCBhcyBkZWZhdWx0IHRpbWUsIGlmIHRoZSBwaWNrZXIgdHlwZSBpcyAnYm90aCcsXG4gICAqIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBnaXZlbiBjYWxlbmRhciBkYXRlJ3MgdGltZSBiZWZvcmUgc2VsZWN0aW5nIGl0LlxuICAgKiBpZiBpdCBpcyB2YWxpZCwgcmV0dXJuIHRoZSB1cGRhdGVkIGRhdGVUaW1lXG4gICAqIGlmIGl0IGlzIG5vdCB2YWxpZCwgcmV0dXJuIG51bGxcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlQW5kQ2hlY2tDYWxlbmRhckRhdGUoZGF0ZTogVCk6IFQge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICAvLyBpZiB0aGUgcGlja2VyIGlzICdib3RoJywgdXBkYXRlIHRoZSBjYWxlbmRhciBkYXRlJ3MgdGltZSB2YWx1ZVxuICAgIGlmICh0aGlzLnBpY2tlci5waWNrZXJUeXBlID09PSAnYm90aCcpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZSksXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGUpLFxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKGRhdGUpLFxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgKTtcbiAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNsYW1wRGF0ZShcbiAgICAgICAgcmVzdWx0LFxuICAgICAgICB0aGlzLnBpY2tlci5taW5EYXRlVGltZSxcbiAgICAgICAgdGhpcy5waWNrZXIubWF4RGF0ZVRpbWVcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNsb25lKGRhdGUpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHRoZSB1cGRhdGVkIGRhdGVUaW1lXG4gICAgcmV0dXJuIHRoaXMucGlja2VyLmRhdGVUaW1lQ2hlY2tlcihyZXN1bHQpID8gcmVzdWx0IDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1cyB0byB0aGUgcGlja2VyXG4gICAqL1xuICBwcml2YXRlIGZvY3VzUGlja2VyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnaW5saW5lJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNhbGVuZGFyKSB7XG4gICAgICB0aGlzLmNhbGVuZGFyLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50aW1lcikge1xuICAgICAgdGhpcy50aW1lci5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrQmVmb3JlQWZ0ZXJUaW1lVmFsaWRpdHkoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGlja2VyLmlzSW5SYW5nZU1vZGUgJiYgdGhpcy5sYXp5VmFsaWRhdGlvbikge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRzID0gWy4uLnRoaXMucGlja2VyLnNlbGVjdGVkc107XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9PT0gMCAmJlxuICAgICAgICAgIHNlbGVjdGVkc1sxXSAmJlxuICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKHRoaXMucGlja2VyTW9tZW50LCBzZWxlY3RlZHNbMV0pID4gMCkgfHxcbiAgICAgICAgKHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9PT0gMSAmJlxuICAgICAgICAgIHNlbGVjdGVkc1swXSAmJlxuICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKHRoaXMucGlja2VyTW9tZW50LCBzZWxlY3RlZHNbMF0pIDwgMClcbiAgICAgICkge1xuICAgICAgICBzZWxlY3RlZHNbMF0gPSB0aGlzLnBpY2tlck1vbWVudDtcbiAgICAgICAgc2VsZWN0ZWRzWzFdID0gdGhpcy5waWNrZXJNb21lbnQ7XG5cbiAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0KHNlbGVjdGVkcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2XG4gIFtjZGtUcmFwRm9jdXNdPVwicGlja2VyLnBpY2tlck1vZGUgIT09ICdpbmxpbmUnXCJcbiAgW0BmYWRlSW5QaWNrZXJdPVwicGlja2VyLnBpY2tlck1vZGUgPT09ICdpbmxpbmUnID8gJycgOiAnZW50ZXInXCJcbiAgY2xhc3M9XCJvd2wtZHQtY29udGFpbmVyLWlubmVyXCJcbj5cbiAgPG93bC1kYXRlLXRpbWUtY2FsZW5kYXJcbiAgICAqbmdJZj1cInBpY2tlclR5cGUgPT09ICdib3RoJyB8fCBwaWNrZXJUeXBlID09PSAnY2FsZW5kYXInXCJcbiAgICBjbGFzcz1cIm93bC1kdC1jb250YWluZXItcm93XCJcbiAgICBbZmlyc3REYXlPZldlZWtdPVwicGlja2VyLmZpcnN0RGF5T2ZXZWVrXCJcbiAgICBbKHBpY2tlck1vbWVudCldPVwicGlja2VyTW9tZW50XCJcbiAgICBbc2VsZWN0ZWRdPVwicGlja2VyLnNlbGVjdGVkXCJcbiAgICBbc2VsZWN0ZWRzXT1cInBpY2tlci5zZWxlY3RlZHNcIlxuICAgIFtzZWxlY3RNb2RlXT1cInBpY2tlci5zZWxlY3RNb2RlXCJcbiAgICBbbWluRGF0ZV09XCJwaWNrZXIubWluRGF0ZVRpbWVcIlxuICAgIFttYXhEYXRlXT1cInBpY2tlci5tYXhEYXRlVGltZVwiXG4gICAgW2RhdGVGaWx0ZXJdPVwicGlja2VyLmRhdGVUaW1lRmlsdGVyXCJcbiAgICBbc3RhcnRWaWV3XT1cInBpY2tlci5zdGFydFZpZXdcIlxuICAgIFtoaWRlT3RoZXJNb250aHNdPVwicGlja2VyLmhpZGVPdGhlck1vbnRoc1wiXG4gICAgKHllYXJTZWxlY3RlZCk9XCJwaWNrZXIuc2VsZWN0WWVhcigkZXZlbnQpXCJcbiAgICAobW9udGhTZWxlY3RlZCk9XCJwaWNrZXIuc2VsZWN0TW9udGgoJGV2ZW50KVwiXG4gICAgKHNlbGVjdGVkQ2hhbmdlKT1cImRhdGVTZWxlY3RlZCgkZXZlbnQpXCJcbiAgPjwvb3dsLWRhdGUtdGltZS1jYWxlbmRhcj5cblxuICA8b3dsLWRhdGUtdGltZS10aW1lclxuICAgICpuZ0lmPVwicGlja2VyVHlwZSA9PT0gJ2JvdGgnIHx8IHBpY2tlclR5cGUgPT09ICd0aW1lcidcIlxuICAgIGNsYXNzPVwib3dsLWR0LWNvbnRhaW5lci1yb3dcIlxuICAgIFtwaWNrZXJNb21lbnRdPVwicGlja2VyTW9tZW50XCJcbiAgICBbbWluRGF0ZVRpbWVdPVwicGlja2VyLm1pbkRhdGVUaW1lXCJcbiAgICBbbWF4RGF0ZVRpbWVdPVwicGlja2VyLm1heERhdGVUaW1lXCJcbiAgICBbc2hvd1NlY29uZHNUaW1lcl09XCJwaWNrZXIuc2hvd1NlY29uZHNUaW1lclwiXG4gICAgW2hvdXIxMlRpbWVyXT1cInBpY2tlci5ob3VyMTJUaW1lclwiXG4gICAgW3N0ZXBIb3VyXT1cInBpY2tlci5zdGVwSG91clwiXG4gICAgW3N0ZXBNaW51dGVdPVwicGlja2VyLnN0ZXBNaW51dGVcIlxuICAgIFtzdGVwU2Vjb25kXT1cInBpY2tlci5zdGVwU2Vjb25kXCJcbiAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwidGltZVNlbGVjdGVkKCRldmVudClcIlxuICA+PC9vd2wtZGF0ZS10aW1lLXRpbWVyPlxuXG4gIDxkaXZcbiAgICAqbmdJZj1cInBpY2tlci5pc0luUmFuZ2VNb2RlXCJcbiAgICByb2xlPVwicmFkaW9ncm91cFwiXG4gICAgY2xhc3M9XCJvd2wtZHQtY29udGFpbmVyLWluZm8gb3dsLWR0LWNvbnRhaW5lci1yb3dcIlxuICA+XG4gICAgPGRpdlxuICAgICAgcm9sZT1cInJhZGlvXCJcbiAgICAgIFt0YWJpbmRleF09XCJhY3RpdmVTZWxlY3RlZEluZGV4ID09PSAwID8gMCA6IC0xXCJcbiAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJhY3RpdmVTZWxlY3RlZEluZGV4ID09PSAwXCJcbiAgICAgIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wgb3dsLWR0LWNvbnRhaW5lci1yYW5nZSBvd2wtZHQtY29udGFpbmVyLWZyb21cIlxuICAgICAgW25nQ2xhc3NdPVwieyAnb3dsLWR0LWNvbnRhaW5lci1pbmZvLWFjdGl2ZSc6IGFjdGl2ZVNlbGVjdGVkSW5kZXggPT09IDAgfVwiXG4gICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2tPbkluZm9Hcm91cCgkZXZlbnQsIDApXCJcbiAgICAgIChrZXlkb3duKT1cImhhbmRsZUtleWRvd25PbkluZm9Hcm91cCgkZXZlbnQsIHRvLCAwKVwiXG4gICAgICAjZnJvbVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wtY29udGVudCBvd2wtZHQtY29udGFpbmVyLXJhbmdlLWNvbnRlbnRcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRhaW5lci1pbmZvLWxhYmVsXCI+e3sgZnJvbUxhYmVsIH19Ojwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udGFpbmVyLWluZm8tdmFsdWVcIj57eyBmcm9tRm9ybWF0dGVkVmFsdWUgfX08L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdlxuICAgICAgcm9sZT1cInJhZGlvXCJcbiAgICAgIFt0YWJpbmRleF09XCJhY3RpdmVTZWxlY3RlZEluZGV4ID09PSAxID8gMCA6IC0xXCJcbiAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJhY3RpdmVTZWxlY3RlZEluZGV4ID09PSAxXCJcbiAgICAgIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wgb3dsLWR0LWNvbnRhaW5lci1yYW5nZSBvd2wtZHQtY29udGFpbmVyLXRvXCJcbiAgICAgIFtuZ0NsYXNzXT1cInsgJ293bC1kdC1jb250YWluZXItaW5mby1hY3RpdmUnOiBhY3RpdmVTZWxlY3RlZEluZGV4ID09PSAxIH1cIlxuICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrT25JbmZvR3JvdXAoJGV2ZW50LCAxKVwiXG4gICAgICAoa2V5ZG93bik9XCJoYW5kbGVLZXlkb3duT25JbmZvR3JvdXAoJGV2ZW50LCBmcm9tLCAxKVwiXG4gICAgICAjdG9cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzcz1cIm93bC1kdC1jb250cm9sLWNvbnRlbnQgb3dsLWR0LWNvbnRhaW5lci1yYW5nZS1jb250ZW50XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm93bC1kdC1jb250YWluZXItaW5mby1sYWJlbFwiPnt7IHRvTGFiZWwgfX06PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm93bC1kdC1jb250YWluZXItaW5mby12YWx1ZVwiPnt7IHRvRm9ybWF0dGVkVmFsdWUgfX08L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJzaG93Q29udHJvbEJ1dHRvbnNcIiBjbGFzcz1cIm93bC1kdC1jb250YWluZXItYnV0dG9ucyBvd2wtZHQtY29udGFpbmVyLXJvd1wiPlxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wgb3dsLWR0LWNvbnRyb2wtYnV0dG9uIG93bC1kdC1jb250YWluZXItY29udHJvbC1idXR0b25cIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgKGNsaWNrKT1cIm9uQ2FuY2VsQ2xpY2tlZCgkZXZlbnQpXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzcz1cIm93bC1kdC1jb250cm9sLWNvbnRlbnQgb3dsLWR0LWNvbnRyb2wtYnV0dG9uLWNvbnRlbnRcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIHt7IGNhbmNlbExhYmVsIH19XG4gICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvblxuICAgICAgY2xhc3M9XCJvd2wtZHQtY29udHJvbCBvd2wtZHQtY29udHJvbC1idXR0b24gb3dsLWR0LWNvbnRhaW5lci1jb250cm9sLWJ1dHRvblwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAoY2xpY2spPVwib25TZXRDbGlja2VkKCRldmVudClcIlxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wtY29udGVudCBvd2wtZHQtY29udHJvbC1idXR0b24tY29udGVudFwiIHRhYmluZGV4PVwiLTFcIj5cbiAgICAgICAge3sgc2V0TGFiZWwgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==