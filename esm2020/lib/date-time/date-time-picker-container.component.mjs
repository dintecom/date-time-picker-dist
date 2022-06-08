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
            if ((this.activeSelectedIndex === 0 &&
                selecteds[1] &&
                this.dateTimeAdapter.compareDate(this.pickerMoment, selecteds[1]) > 0) ||
                (this.activeSelectedIndex === 1 &&
                    selecteds[0] &&
                    this.dateTimeAdapter.compareDate(this.pickerMoment, selecteds[0]) < 0)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFHVCxRQUFRLEVBQ1IsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR3RELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7QUFzQjdGLE1BQU0sT0FBTyw2QkFBNkI7SUE0SXhDLFlBQ1UsS0FBd0IsRUFDeEIsTUFBa0IsRUFDbEIsVUFBMkIsRUFDZixlQUFtQztRQUgvQyxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQ2Ysb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBeklsRCx3QkFBbUIsR0FBRyxDQUFDLENBQUMsQ0FBQyw2RUFBNkU7UUFFN0c7O1dBRUc7UUFDSyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFNekM7O1dBRUc7UUFDSyxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBTXRDLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztJQXNIeEMsQ0FBQztJQW5JSixJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQU9ELElBQUkscUJBQXFCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFJRCxJQUFJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQVFELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLFlBQVksQ0FBQyxLQUFRO1FBQ3ZCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUNyRCxLQUFLLEVBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUN4QixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNuRixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLGdCQUFnQjtRQUNsQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNuRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sQ0FDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxRQUFRO1lBQ25DLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUMvRSxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUksd0JBQXdCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssT0FBTyxDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFJLHlCQUF5QjtRQUMzQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQztJQUM3QyxDQUFDO0lBRUQsSUFBSSx5QkFBeUI7UUFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUM7SUFDN0MsQ0FBQztJQUVELElBQUksMkJBQTJCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksdUJBQXVCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM1RCxDQUFDO0lBU00sUUFBUSxLQUFJLENBQUM7SUFFYixrQkFBa0I7UUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxlQUFlO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sNEJBQTRCLENBQUMsS0FBcUI7UUFDdkQsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRU0sWUFBWSxDQUFDLElBQU87UUFDekIsSUFBSSxNQUFNLENBQUM7UUFFWCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO1lBQzlCLE1BQU0sR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzVCO2lCQUFNO2dCQUNMLHNFQUFzRTtnQkFDdEUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzdCO2FBQ0Y7WUFDRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQzdCLE1BQU0sR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzVCO1NBQ0Y7SUFDSCxDQUFDO0lBRU0sWUFBWSxDQUFDLElBQU87UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ25ELE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RDLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDN0IsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFN0MsNERBQTREO1lBQzVELCtEQUErRDtZQUMvRCxJQUNFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixLQUFLLENBQUM7Z0JBQzdCLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixLQUFLLENBQUM7b0JBQzdCLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDeEU7Z0JBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ2pDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNMLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3pEO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxlQUFlLENBQUMsS0FBVTtRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsT0FBTztJQUNULENBQUM7SUFFRDs7T0FFRztJQUNJLFlBQVksQ0FBQyxLQUFVO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLE9BQU87SUFDVCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxzQkFBc0IsQ0FBQyxLQUFVLEVBQUUsS0FBYTtRQUNyRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSSx3QkFBd0IsQ0FBQyxLQUFVLEVBQUUsSUFBUyxFQUFFLEtBQWE7UUFDbEUsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ3JCLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxVQUFVO2dCQUNiLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLE1BQU07WUFFUixLQUFLLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsTUFBTTtZQUVSO2dCQUNFLE9BQU87U0FDVjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNLLHNCQUFzQixDQUFDLEtBQWE7UUFDMUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLG1CQUFtQixLQUFLLEtBQUssRUFBRTtZQUM1RSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBRWpDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksUUFBUSxFQUFFO2dCQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Y7UUFDRCxPQUFPO0lBQ1QsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7O09BR0c7SUFDSyx3QkFBd0IsQ0FBQyxJQUFPO1FBQ3RDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNLLHVCQUF1QixDQUFDLElBQU87UUFDckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQseURBQXlEO1FBQ3pELDZCQUE2QjtRQUM3QixtREFBbUQ7UUFDbkQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxPQUFPLEVBQUU7WUFDdEMsSUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU07Z0JBQzVCLENBQUMsRUFBRTtnQkFDSCxJQUFJO2dCQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDaEU7Z0JBQ0EsRUFBRSxHQUFHLE1BQU0sQ0FBQztnQkFDWixJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQ2QsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDVixJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFdBQVcsRUFBRTtZQUNqRCxJQUFJLEdBQUcsTUFBTSxDQUFDO1lBRWQsb0VBQW9FO1lBQ3BFLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hELEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDWDtTQUNGO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDL0MsRUFBRSxHQUFHLE1BQU0sQ0FBQztZQUVaLHNFQUFzRTtZQUN0RSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMxRCxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUVELE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLDBCQUEwQixDQUFDLElBQU87UUFDeEMsSUFBSSxNQUFNLENBQUM7UUFFWCxpRUFBaUU7UUFDakUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUU7WUFDckMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFDbEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUNuRCxDQUFDO1lBQ0YsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUNyQyxNQUFNLEVBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUN4QixDQUFDO1NBQ0g7YUFBTTtZQUNMLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQztRQUVELDZCQUE2QjtRQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM3RCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDOzswSEE1WlUsNkJBQTZCOzhHQUE3Qiw2QkFBNkIsNGtCQUM3QixvQkFBb0Isd0VBRXBCLGlCQUFpQixvRkM1QzlCLG90SEFpR0Esd2dDRHZFYztRQUNWLDJCQUEyQixDQUFDLGVBQWU7UUFDM0MsMkJBQTJCLENBQUMsWUFBWTtLQUN6QzsyRkFZVSw2QkFBNkI7a0JBcEJ6QyxTQUFTOytCQUNFLHNCQUFzQixZQUN0Qix5QkFBeUIsbUJBRWxCLHVCQUF1QixDQUFDLE1BQU0sY0FDbkM7d0JBQ1YsMkJBQTJCLENBQUMsZUFBZTt3QkFDM0MsMkJBQTJCLENBQUMsWUFBWTtxQkFDekMsUUFDSzt3QkFDSix5QkFBeUIsRUFBRSxzQ0FBc0M7d0JBQ2pFLDBCQUEwQixFQUFFLHFCQUFxQjt3QkFDakQsZ0NBQWdDLEVBQUUsMEJBQTBCO3dCQUM1RCxpQ0FBaUMsRUFBRSwyQkFBMkI7d0JBQzlELGlDQUFpQyxFQUFFLDJCQUEyQjt3QkFDOUQsbUNBQW1DLEVBQUUsNkJBQTZCO3dCQUNsRSxXQUFXLEVBQUUsa0JBQWtCO3dCQUMvQixvQkFBb0IsRUFBRSx5QkFBeUI7cUJBQ2hEOzswQkFrSkUsUUFBUTs0Q0E5SVgsUUFBUTtzQkFEUCxTQUFTO3VCQUFDLG9CQUFvQjtnQkFHL0IsS0FBSztzQkFESixTQUFTO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnRsIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZSc7XG5pbXBvcnQgeyBPd2xDYWxlbmRhckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE93bFRpbWVyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZSwgUGlja2VyVHlwZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG93bERhdGVUaW1lUGlja2VyQW5pbWF0aW9ucyB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5hbmltYXRpb25zJztcbmltcG9ydCB7IERPV05fQVJST1csIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBTUEFDRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgZXhwb3J0QXM6ICdvd2xEYXRlVGltZUNvbnRhaW5lcicsXG4gIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS1jb250YWluZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIG93bERhdGVUaW1lUGlja2VyQW5pbWF0aW9ucy50cmFuc2Zvcm1QaWNrZXIsXG4gICAgb3dsRGF0ZVRpbWVQaWNrZXJBbmltYXRpb25zLmZhZGVJblBpY2tlclxuICBdLFxuICBob3N0OiB7XG4gICAgJyhAdHJhbnNmb3JtUGlja2VyLmRvbmUpJzogJ2hhbmRsZUNvbnRhaW5lckFuaW1hdGlvbkRvbmUoJGV2ZW50KScsXG4gICAgJ1tjbGFzcy5vd2wtZHQtY29udGFpbmVyXSc6ICdvd2xEVENvbnRhaW5lckNsYXNzJyxcbiAgICAnW2NsYXNzLm93bC1kdC1wb3B1cC1jb250YWluZXJdJzogJ293bERUUG9wdXBDb250YWluZXJDbGFzcycsXG4gICAgJ1tjbGFzcy5vd2wtZHQtZGlhbG9nLWNvbnRhaW5lcl0nOiAnb3dsRFREaWFsb2dDb250YWluZXJDbGFzcycsXG4gICAgJ1tjbGFzcy5vd2wtZHQtaW5saW5lLWNvbnRhaW5lcl0nOiAnb3dsRFRJbmxpbmVDb250YWluZXJDbGFzcycsXG4gICAgJ1tjbGFzcy5vd2wtZHQtY29udGFpbmVyLWRpc2FibGVkXSc6ICdvd2xEVENvbnRhaW5lckRpc2FibGVkQ2xhc3MnLFxuICAgICdbYXR0ci5pZF0nOiAnb3dsRFRDb250YWluZXJJZCcsXG4gICAgJ1tAdHJhbnNmb3JtUGlja2VyXSc6ICdvd2xEVENvbnRhaW5lckFuaW1hdGlvbidcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoT3dsQ2FsZW5kYXJDb21wb25lbnQpXG4gIGNhbGVuZGFyOiBPd2xDYWxlbmRhckNvbXBvbmVudDxUPjtcbiAgQFZpZXdDaGlsZChPd2xUaW1lckNvbXBvbmVudClcbiAgdGltZXI6IE93bFRpbWVyQ29tcG9uZW50PFQ+O1xuXG4gIHB1YmxpYyBwaWNrZXI6IE93bERhdGVUaW1lPFQ+O1xuICBwdWJsaWMgYWN0aXZlU2VsZWN0ZWRJbmRleCA9IDA7IC8vIFRoZSBjdXJyZW50IGFjdGl2ZSBTZWxlY3RlZEluZGV4IGluIHJhbmdlIHNlbGVjdCBtb2RlICgwOiAnZnJvbScsIDE6ICd0bycpXG5cbiAgLyoqXG4gICAqIFN0cmVhbSBlbWl0cyB3aGVuIHRyeSB0byBoaWRlIHBpY2tlclxuICAgKi9cbiAgcHJpdmF0ZSBoaWRlUGlja2VyJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBnZXQgaGlkZVBpY2tlclN0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmhpZGVQaWNrZXIkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0cmVhbSBlbWl0cyB3aGVuIHRyeSB0byBjb25maXJtIHRoZSBzZWxlY3RlZCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBjb25maXJtU2VsZWN0ZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGdldCBjb25maXJtU2VsZWN0ZWRTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maXJtU2VsZWN0ZWQkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBwaWNrZXJPcGVuZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGdldCBwaWNrZXJPcGVuZWRTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXJPcGVuZWQkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHBpY2tlciBtb21lbnQuIFRoaXMgZGV0ZXJtaW5lcyB3aGljaCB0aW1lIHBlcmlvZCBpcyBzaG93biBhbmQgd2hpY2ggZGF0ZSBpc1xuICAgKiBoaWdobGlnaHRlZCB3aGVuIHVzaW5nIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9jbGFtUGlja2VyTW9tZW50OiBUO1xuXG4gIGdldCBwaWNrZXJNb21lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYW1QaWNrZXJNb21lbnQ7XG4gIH1cblxuICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9jbGFtUGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xhbXBEYXRlKFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgdGhpcy5waWNrZXIubWluRGF0ZVRpbWUsXG4gICAgICAgIHRoaXMucGlja2VyLm1heERhdGVUaW1lXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHBpY2tlclR5cGUoKTogUGlja2VyVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VyLnBpY2tlclR5cGU7XG4gIH1cblxuICBnZXQgY2FuY2VsTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLmNhbmNlbEJ0bkxhYmVsO1xuICB9XG5cbiAgZ2V0IHNldExhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5zZXRCdG5MYWJlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmFuZ2UgJ2Zyb20nIGxhYmVsXG4gICAqL1xuICBnZXQgZnJvbUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5yYW5nZUZyb21MYWJlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmFuZ2UgJ3RvJyBsYWJlbFxuICAgKi9cbiAgZ2V0IHRvTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnJhbmdlVG9MYWJlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmFuZ2UgJ2Zyb20nIGZvcm1hdHRlZCB2YWx1ZVxuICAgKi9cbiAgZ2V0IGZyb21Gb3JtYXR0ZWRWYWx1ZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5waWNrZXIuc2VsZWN0ZWRzWzBdO1xuICAgIHJldHVybiB2YWx1ZSA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGhpcy5waWNrZXIuZm9ybWF0U3RyaW5nKSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByYW5nZSAndG8nIGZvcm1hdHRlZCB2YWx1ZVxuICAgKi9cbiAgZ2V0IHRvRm9ybWF0dGVkVmFsdWUoKTogc3RyaW5nIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1sxXTtcbiAgICByZXR1cm4gdmFsdWUgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQodmFsdWUsIHRoaXMucGlja2VyLmZvcm1hdFN0cmluZykgOiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXNlcyBpbiB3aGljaCB0aGUgY29udHJvbCBidXR0b25zIHNob3cgaW4gdGhlIHBpY2tlclxuICAgKiAxKSBwaWNrZXIgbW9kZSBpcyAnZGlhbG9nJ1xuICAgKiAyKSBwaWNrZXIgdHlwZSBpcyBOT1QgJ2NhbGVuZGFyJyBhbmQgdGhlIHBpY2tlciBtb2RlIGlzIE5PVCAnaW5saW5lJ1xuICAgKi9cbiAgZ2V0IHNob3dDb250cm9sQnV0dG9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2RpYWxvZycgfHxcbiAgICAgICh0aGlzLnBpY2tlci5waWNrZXJUeXBlICE9PSAnY2FsZW5kYXInICYmIHRoaXMucGlja2VyLnBpY2tlck1vZGUgIT09ICdpbmxpbmUnKVxuICAgICk7XG4gIH1cblxuICBnZXQgY29udGFpbmVyRWxtKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGdldCBvd2xEVENvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0IG93bERUUG9wdXBDb250YWluZXJDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ3BvcHVwJztcbiAgfVxuXG4gIGdldCBvd2xEVERpYWxvZ0NvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnZGlhbG9nJztcbiAgfVxuXG4gIGdldCBvd2xEVElubGluZUNvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnaW5saW5lJztcbiAgfVxuXG4gIGdldCBvd2xEVENvbnRhaW5lckRpc2FibGVkQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VyLmRpc2FibGVkO1xuICB9XG5cbiAgZ2V0IG93bERUQ29udGFpbmVySWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXIuaWQ7XG4gIH1cblxuICBnZXQgb3dsRFRDb250YWluZXJBbmltYXRpb24oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2lubGluZScgPyAnJyA6ICdlbnRlcic7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGVsbVJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+XG4gICkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7fVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0UGlja2VyKCk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNQaWNrZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDb250YWluZXJBbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRvU3RhdGUgPSBldmVudC50b1N0YXRlO1xuICAgIGlmICh0b1N0YXRlID09PSAnZW50ZXInKSB7XG4gICAgICB0aGlzLnBpY2tlck9wZW5lZCQubmV4dChudWxsKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGF0ZVNlbGVjdGVkKGRhdGU6IFQpOiB2b2lkIHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgaWYgKHRoaXMucGlja2VyLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLmRhdGVTZWxlY3RlZEluU2luZ2xlTW9kZShkYXRlKTtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSByZXN1bHQ7XG4gICAgICAgIHRoaXMucGlja2VyLnNlbGVjdChyZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gd2UgY2xvc2UgdGhlIHBpY2tlciB3aGVuIHJlc3VsdCBpcyBudWxsIGFuZCBwaWNrZXJUeXBlIGlzIGNhbGVuZGFyLlxuICAgICAgICBpZiAodGhpcy5waWNrZXJUeXBlID09PSAnY2FsZW5kYXInKSB7XG4gICAgICAgICAgdGhpcy5oaWRlUGlja2VyJC5uZXh0KG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGlja2VyLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVNlbGVjdGVkSW5SYW5nZU1vZGUoZGF0ZSk7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gcmVzdWx0W3RoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleF07XG4gICAgICAgIHRoaXMucGlja2VyLnNlbGVjdChyZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0aW1lU2VsZWN0ZWQodGltZTogVCk6IHZvaWQge1xuICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUodGltZSk7XG5cbiAgICBpZiAoIXRoaXMucGlja2VyLmRhdGVUaW1lQ2hlY2tlcih0aGlzLnBpY2tlck1vbWVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5waWNrZXIuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgIHRoaXMucGlja2VyLnNlbGVjdCh0aGlzLnBpY2tlck1vbWVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGlja2VyLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkcyA9IFsuLi50aGlzLnBpY2tlci5zZWxlY3RlZHNdO1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgJ2Zyb20nIGlzIGFmdGVyICd0bycgb3IgJ3RvJ2lzIGJlZm9yZSAnZnJvbSdcbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2Ugc2V0IGJvdGggdGhlICdmcm9tJyBhbmQgJ3RvJyB0aGUgc2FtZSB2YWx1ZVxuICAgICAgaWYgKFxuICAgICAgICAodGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID09PSAwICYmXG4gICAgICAgICAgc2VsZWN0ZWRzWzFdICYmXG4gICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUodGhpcy5waWNrZXJNb21lbnQsIHNlbGVjdGVkc1sxXSkgPiAwKSB8fFxuICAgICAgICAodGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID09PSAxICYmXG4gICAgICAgICAgc2VsZWN0ZWRzWzBdICYmXG4gICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUodGhpcy5waWNrZXJNb21lbnQsIHNlbGVjdGVkc1swXSkgPCAwKVxuICAgICAgKSB7XG4gICAgICAgIHNlbGVjdGVkc1swXSA9IHRoaXMucGlja2VyTW9tZW50O1xuICAgICAgICBzZWxlY3RlZHNbMV0gPSB0aGlzLnBpY2tlck1vbWVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGVjdGVkc1t0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXhdID0gdGhpcy5waWNrZXJNb21lbnQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucGlja2VyLnNlbGVjdChzZWxlY3RlZHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgY2xpY2sgb24gY2FuY2VsIGJ1dHRvblxuICAgKi9cbiAgcHVibGljIG9uQ2FuY2VsQ2xpY2tlZChldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5oaWRlUGlja2VyJC5uZXh0KG51bGwpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBjbGljayBvbiBzZXQgYnV0dG9uXG4gICAqL1xuICBwdWJsaWMgb25TZXRDbGlja2VkKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGlja2VyLmRhdGVUaW1lQ2hlY2tlcih0aGlzLnBpY2tlck1vbWVudCkpIHtcbiAgICAgIHRoaXMuaGlkZVBpY2tlciQubmV4dChudWxsKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb25maXJtU2VsZWN0ZWQkLm5leHQoZXZlbnQpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBjbGljayBvbiBpbmZvcm0gcmFkaW8gZ3JvdXBcbiAgICovXG4gIHB1YmxpYyBoYW5kbGVDbGlja09uSW5mb0dyb3VwKGV2ZW50OiBhbnksIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNldEFjdGl2ZVNlbGVjdGVkSW5kZXgoaW5kZXgpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGNsaWNrIG9uIGluZm9ybSByYWRpbyBncm91cFxuICAgKi9cbiAgcHVibGljIGhhbmRsZUtleWRvd25PbkluZm9Hcm91cChldmVudDogYW55LCBuZXh0OiBhbnksIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICBuZXh0LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlU2VsZWN0ZWRJbmRleChpbmRleCA9PT0gMCA/IDEgOiAwKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNQQUNFOlxuICAgICAgICB0aGlzLnNldEFjdGl2ZVNlbGVjdGVkSW5kZXgoaW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSB2YWx1ZSBvZiBhY3RpdmVTZWxlY3RlZEluZGV4XG4gICAqL1xuICBwcml2YXRlIHNldEFjdGl2ZVNlbGVjdGVkSW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnBpY2tlci5zZWxlY3RNb2RlID09PSAncmFuZ2UnICYmIHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuXG4gICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1t0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXhdO1xuICAgICAgaWYgKHRoaXMucGlja2VyLnNlbGVjdGVkcyAmJiBzZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNsb25lKHNlbGVjdGVkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0UGlja2VyKCk6IHZvaWQge1xuICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5waWNrZXIuc3RhcnRBdCB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcbiAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPSB0aGlzLnBpY2tlci5zZWxlY3RNb2RlID09PSAncmFuZ2VUbycgPyAxIDogMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgY2FsZW5kYXIgZGF0ZSBpbiBzaW5nbGUgbW9kZSxcbiAgICogaXQgcmV0dXJucyBudWxsIHdoZW4gZGF0ZSBpcyBub3Qgc2VsZWN0ZWQuXG4gICAqL1xuICBwcml2YXRlIGRhdGVTZWxlY3RlZEluU2luZ2xlTW9kZShkYXRlOiBUKTogVCB8IG51bGwge1xuICAgIGlmICh0aGlzLmRhdGVUaW1lQWRhcHRlci5zYW1lRGF0ZShkYXRlLCB0aGlzLnBpY2tlci5zZWxlY3RlZCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnVwZGF0ZUFuZENoZWNrQ2FsZW5kYXJEYXRlKGRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBkYXRlcyBpbiByYW5nZSBNb2RlXG4gICAqL1xuICBwcml2YXRlIGRhdGVTZWxlY3RlZEluUmFuZ2VNb2RlKGRhdGU6IFQpOiBUW10gfCBudWxsIHtcbiAgICBsZXQgZnJvbSA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1swXTtcbiAgICBsZXQgdG8gPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbMV07XG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnVwZGF0ZUFuZENoZWNrQ2FsZW5kYXJEYXRlKGRhdGUpO1xuXG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBnaXZlbiBjYWxlbmRhciBkYXkgaXMgYWZ0ZXIgb3IgZXF1YWwgdG8gJ2Zyb20nLFxuICAgIC8vIHNldCB0aHMgZ2l2ZW4gZGF0ZSBhcyAndG8nXG4gICAgLy8gb3RoZXJ3aXNlLCBzZXQgaXQgYXMgJ2Zyb20nIGFuZCBzZXQgJ3RvJyB0byBudWxsXG4gICAgaWYgKHRoaXMucGlja2VyLnNlbGVjdE1vZGUgPT09ICdyYW5nZScpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0ZWRzICYmXG4gICAgICAgIHRoaXMucGlja2VyLnNlbGVjdGVkcy5sZW5ndGggJiZcbiAgICAgICAgIXRvICYmXG4gICAgICAgIGZyb20gJiZcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKHJlc3VsdCwgZnJvbSkgPj0gMFxuICAgICAgKSB7XG4gICAgICAgIHRvID0gcmVzdWx0O1xuICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnJvbSA9IHJlc3VsdDtcbiAgICAgICAgdG8gPSBudWxsO1xuICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScpIHtcbiAgICAgIGZyb20gPSByZXN1bHQ7XG5cbiAgICAgIC8vIGlmIHRoZSBmcm9tIHZhbHVlIGlzIGFmdGVyIHRoZSB0byB2YWx1ZSwgc2V0IHRoZSB0byB2YWx1ZSBhcyBudWxsXG4gICAgICBpZiAodG8gJiYgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUoZnJvbSwgdG8pID4gMCkge1xuICAgICAgICB0byA9IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnBpY2tlci5zZWxlY3RNb2RlID09PSAncmFuZ2VUbycpIHtcbiAgICAgIHRvID0gcmVzdWx0O1xuXG4gICAgICAvLyBpZiB0aGUgZnJvbSB2YWx1ZSBpcyBhZnRlciB0aGUgdG8gdmFsdWUsIHNldCB0aGUgZnJvbSB2YWx1ZSBhcyBudWxsXG4gICAgICBpZiAoZnJvbSAmJiB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlRGF0ZShmcm9tLCB0bykgPiAwKSB7XG4gICAgICAgIGZyb20gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbZnJvbSwgdG9dO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgZ2l2ZW4gY2FsZW5kYXIgZGF0ZSdzIHRpbWUgYW5kIGNoZWNrIGlmIGl0IGlzIHZhbGlkXG4gICAqIEJlY2F1c2UgdGhlIGNhbGVuZGFyIGRhdGUgaGFzIDAwOjAwOjAwIGFzIGRlZmF1bHQgdGltZSwgaWYgdGhlIHBpY2tlciB0eXBlIGlzICdib3RoJyxcbiAgICogd2UgbmVlZCB0byB1cGRhdGUgdGhlIGdpdmVuIGNhbGVuZGFyIGRhdGUncyB0aW1lIGJlZm9yZSBzZWxlY3RpbmcgaXQuXG4gICAqIGlmIGl0IGlzIHZhbGlkLCByZXR1cm4gdGhlIHVwZGF0ZWQgZGF0ZVRpbWVcbiAgICogaWYgaXQgaXMgbm90IHZhbGlkLCByZXR1cm4gbnVsbFxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVBbmRDaGVja0NhbGVuZGFyRGF0ZShkYXRlOiBUKTogVCB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIC8vIGlmIHRoZSBwaWNrZXIgaXMgJ2JvdGgnLCB1cGRhdGUgdGhlIGNhbGVuZGFyIGRhdGUncyB0aW1lIHZhbHVlXG4gICAgaWYgKHRoaXMucGlja2VyLnBpY2tlclR5cGUgPT09ICdib3RoJykge1xuICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlKSxcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZSksXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUoZGF0ZSksXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5waWNrZXJNb21lbnQpXG4gICAgICApO1xuICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xhbXBEYXRlKFxuICAgICAgICByZXN1bHQsXG4gICAgICAgIHRoaXMucGlja2VyLm1pbkRhdGVUaW1lLFxuICAgICAgICB0aGlzLnBpY2tlci5tYXhEYXRlVGltZVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUoZGF0ZSk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgdGhlIHVwZGF0ZWQgZGF0ZVRpbWVcbiAgICByZXR1cm4gdGhpcy5waWNrZXIuZGF0ZVRpbWVDaGVja2VyKHJlc3VsdCkgPyByZXN1bHQgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIHRvIHRoZSBwaWNrZXJcbiAgICovXG4gIHByaXZhdGUgZm9jdXNQaWNrZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGlja2VyLnBpY2tlck1vZGUgPT09ICdpbmxpbmUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2FsZW5kYXIpIHtcbiAgICAgIHRoaXMuY2FsZW5kYXIuZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICB0aGlzLnRpbWVyLmZvY3VzKCk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2XG4gIFtjZGtUcmFwRm9jdXNdPVwicGlja2VyLnBpY2tlck1vZGUgIT09ICdpbmxpbmUnXCJcbiAgW0BmYWRlSW5QaWNrZXJdPVwicGlja2VyLnBpY2tlck1vZGUgPT09ICdpbmxpbmUnID8gJycgOiAnZW50ZXInXCJcbiAgY2xhc3M9XCJvd2wtZHQtY29udGFpbmVyLWlubmVyXCJcbj5cbiAgPG93bC1kYXRlLXRpbWUtY2FsZW5kYXJcbiAgICAqbmdJZj1cInBpY2tlclR5cGUgPT09ICdib3RoJyB8fCBwaWNrZXJUeXBlID09PSAnY2FsZW5kYXInXCJcbiAgICBjbGFzcz1cIm93bC1kdC1jb250YWluZXItcm93XCJcbiAgICBbZmlyc3REYXlPZldlZWtdPVwicGlja2VyLmZpcnN0RGF5T2ZXZWVrXCJcbiAgICBbKHBpY2tlck1vbWVudCldPVwicGlja2VyTW9tZW50XCJcbiAgICBbc2VsZWN0ZWRdPVwicGlja2VyLnNlbGVjdGVkXCJcbiAgICBbc2VsZWN0ZWRzXT1cInBpY2tlci5zZWxlY3RlZHNcIlxuICAgIFtzZWxlY3RNb2RlXT1cInBpY2tlci5zZWxlY3RNb2RlXCJcbiAgICBbbWluRGF0ZV09XCJwaWNrZXIubWluRGF0ZVRpbWVcIlxuICAgIFttYXhEYXRlXT1cInBpY2tlci5tYXhEYXRlVGltZVwiXG4gICAgW2RhdGVGaWx0ZXJdPVwicGlja2VyLmRhdGVUaW1lRmlsdGVyXCJcbiAgICBbc3RhcnRWaWV3XT1cInBpY2tlci5zdGFydFZpZXdcIlxuICAgIFtoaWRlT3RoZXJNb250aHNdPVwicGlja2VyLmhpZGVPdGhlck1vbnRoc1wiXG4gICAgKHllYXJTZWxlY3RlZCk9XCJwaWNrZXIuc2VsZWN0WWVhcigkZXZlbnQpXCJcbiAgICAobW9udGhTZWxlY3RlZCk9XCJwaWNrZXIuc2VsZWN0TW9udGgoJGV2ZW50KVwiXG4gICAgKHNlbGVjdGVkQ2hhbmdlKT1cImRhdGVTZWxlY3RlZCgkZXZlbnQpXCJcbiAgPjwvb3dsLWRhdGUtdGltZS1jYWxlbmRhcj5cblxuICA8b3dsLWRhdGUtdGltZS10aW1lclxuICAgICpuZ0lmPVwicGlja2VyVHlwZSA9PT0gJ2JvdGgnIHx8IHBpY2tlclR5cGUgPT09ICd0aW1lcidcIlxuICAgIGNsYXNzPVwib3dsLWR0LWNvbnRhaW5lci1yb3dcIlxuICAgIFtwaWNrZXJNb21lbnRdPVwicGlja2VyTW9tZW50XCJcbiAgICBbbWluRGF0ZVRpbWVdPVwicGlja2VyLm1pbkRhdGVUaW1lXCJcbiAgICBbbWF4RGF0ZVRpbWVdPVwicGlja2VyLm1heERhdGVUaW1lXCJcbiAgICBbc2hvd1NlY29uZHNUaW1lcl09XCJwaWNrZXIuc2hvd1NlY29uZHNUaW1lclwiXG4gICAgW2hvdXIxMlRpbWVyXT1cInBpY2tlci5ob3VyMTJUaW1lclwiXG4gICAgW3N0ZXBIb3VyXT1cInBpY2tlci5zdGVwSG91clwiXG4gICAgW3N0ZXBNaW51dGVdPVwicGlja2VyLnN0ZXBNaW51dGVcIlxuICAgIFtzdGVwU2Vjb25kXT1cInBpY2tlci5zdGVwU2Vjb25kXCJcbiAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwidGltZVNlbGVjdGVkKCRldmVudClcIlxuICA+PC9vd2wtZGF0ZS10aW1lLXRpbWVyPlxuXG4gIDxkaXZcbiAgICAqbmdJZj1cInBpY2tlci5pc0luUmFuZ2VNb2RlXCJcbiAgICByb2xlPVwicmFkaW9ncm91cFwiXG4gICAgY2xhc3M9XCJvd2wtZHQtY29udGFpbmVyLWluZm8gb3dsLWR0LWNvbnRhaW5lci1yb3dcIlxuICA+XG4gICAgPGRpdlxuICAgICAgcm9sZT1cInJhZGlvXCJcbiAgICAgIFt0YWJpbmRleF09XCJhY3RpdmVTZWxlY3RlZEluZGV4ID09PSAwID8gMCA6IC0xXCJcbiAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJhY3RpdmVTZWxlY3RlZEluZGV4ID09PSAwXCJcbiAgICAgIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wgb3dsLWR0LWNvbnRhaW5lci1yYW5nZSBvd2wtZHQtY29udGFpbmVyLWZyb21cIlxuICAgICAgW25nQ2xhc3NdPVwieyAnb3dsLWR0LWNvbnRhaW5lci1pbmZvLWFjdGl2ZSc6IGFjdGl2ZVNlbGVjdGVkSW5kZXggPT09IDAgfVwiXG4gICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2tPbkluZm9Hcm91cCgkZXZlbnQsIDApXCJcbiAgICAgIChrZXlkb3duKT1cImhhbmRsZUtleWRvd25PbkluZm9Hcm91cCgkZXZlbnQsIHRvLCAwKVwiXG4gICAgICAjZnJvbVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wtY29udGVudCBvd2wtZHQtY29udGFpbmVyLXJhbmdlLWNvbnRlbnRcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRhaW5lci1pbmZvLWxhYmVsXCI+e3sgZnJvbUxhYmVsIH19Ojwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udGFpbmVyLWluZm8tdmFsdWVcIj57eyBmcm9tRm9ybWF0dGVkVmFsdWUgfX08L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdlxuICAgICAgcm9sZT1cInJhZGlvXCJcbiAgICAgIFt0YWJpbmRleF09XCJhY3RpdmVTZWxlY3RlZEluZGV4ID09PSAxID8gMCA6IC0xXCJcbiAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJhY3RpdmVTZWxlY3RlZEluZGV4ID09PSAxXCJcbiAgICAgIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wgb3dsLWR0LWNvbnRhaW5lci1yYW5nZSBvd2wtZHQtY29udGFpbmVyLXRvXCJcbiAgICAgIFtuZ0NsYXNzXT1cInsgJ293bC1kdC1jb250YWluZXItaW5mby1hY3RpdmUnOiBhY3RpdmVTZWxlY3RlZEluZGV4ID09PSAxIH1cIlxuICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrT25JbmZvR3JvdXAoJGV2ZW50LCAxKVwiXG4gICAgICAoa2V5ZG93bik9XCJoYW5kbGVLZXlkb3duT25JbmZvR3JvdXAoJGV2ZW50LCBmcm9tLCAxKVwiXG4gICAgICAjdG9cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzcz1cIm93bC1kdC1jb250cm9sLWNvbnRlbnQgb3dsLWR0LWNvbnRhaW5lci1yYW5nZS1jb250ZW50XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm93bC1kdC1jb250YWluZXItaW5mby1sYWJlbFwiPnt7IHRvTGFiZWwgfX06PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm93bC1kdC1jb250YWluZXItaW5mby12YWx1ZVwiPnt7IHRvRm9ybWF0dGVkVmFsdWUgfX08L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJzaG93Q29udHJvbEJ1dHRvbnNcIiBjbGFzcz1cIm93bC1kdC1jb250YWluZXItYnV0dG9ucyBvd2wtZHQtY29udGFpbmVyLXJvd1wiPlxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wgb3dsLWR0LWNvbnRyb2wtYnV0dG9uIG93bC1kdC1jb250YWluZXItY29udHJvbC1idXR0b25cIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgKGNsaWNrKT1cIm9uQ2FuY2VsQ2xpY2tlZCgkZXZlbnQpXCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzcz1cIm93bC1kdC1jb250cm9sLWNvbnRlbnQgb3dsLWR0LWNvbnRyb2wtYnV0dG9uLWNvbnRlbnRcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIHt7IGNhbmNlbExhYmVsIH19XG4gICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvblxuICAgICAgY2xhc3M9XCJvd2wtZHQtY29udHJvbCBvd2wtZHQtY29udHJvbC1idXR0b24gb3dsLWR0LWNvbnRhaW5lci1jb250cm9sLWJ1dHRvblwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAoY2xpY2spPVwib25TZXRDbGlja2VkKCRldmVudClcIlxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wtY29udGVudCBvd2wtZHQtY29udHJvbC1idXR0b24tY29udGVudFwiIHRhYmluZGV4PVwiLTFcIj5cbiAgICAgICAge3sgc2V0TGFiZWwgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==