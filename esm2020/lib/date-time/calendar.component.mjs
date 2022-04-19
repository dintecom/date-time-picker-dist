import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { OWL_DATE_TIME_FORMATS } from '../adapter/date-time-format.class';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./date-time-picker-intl.service";
import * as i2 from "../adapter/date-time-adapter.class";
import * as i3 from "./calendar-month-view.component";
import * as i4 from "./calendar-year-view.component";
import * as i5 from "./calendar-multi-year-view.component";
import * as i6 from "@angular/cdk/a11y";
import * as i7 from "@angular/common";
export class OwlCalendarComponent {
    constructor(elmRef, pickerIntl, ngZone, cdRef, dateTimeAdapter, dateTimeFormats) {
        this.elmRef = elmRef;
        this.pickerIntl = pickerIntl;
        this.ngZone = ngZone;
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        this._selecteds = [];
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        /** Emits when the currently picker moment changes. */
        this.pickerMomentChange = new EventEmitter();
        /** Emits when the currently selected date changes. */
        this.selectedChange = new EventEmitter();
        /** Emits when any date is selected. */
        this.userSelection = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits the selected month. This doesn't imply a change on the selected date
         */
        this.monthSelected = new EventEmitter();
        /**
         * Date filter for the month and year view
         */
        this.dateFilterForViews = (date) => {
            return (!!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate || this.dateTimeAdapter.compareDate(date, this.minDate) >= 0) &&
                (!this.maxDate || this.dateTimeAdapter.compareDate(date, this.maxDate) <= 0));
        };
        this.intlChangesSub = Subscription.EMPTY;
        /**
         * Used for scheduling that focus should be moved to the active cell on the next tick.
         * We need to schedule it, rather than do it immediately, because we have to wait
         * for Angular to re-evaluate the view children.
         */
        this.moveFocusOnNextTick = false;
        this.intlChangesSub = this.pickerIntl.changes.subscribe(() => {
            this.cdRef.markForCheck();
        });
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        value = this.getValidDate(value);
        this._minDate = value
            ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(value), this.dateTimeAdapter.getMonth(value), this.dateTimeAdapter.getDate(value))
            : null;
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        value = this.getValidDate(value);
        this._maxDate = value
            ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(value), this.dateTimeAdapter.getMonth(value), this.dateTimeAdapter.getDate(value))
            : null;
    }
    get pickerMoment() {
        return this._pickerMoment;
    }
    set pickerMoment(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._pickerMoment = this.getValidDate(value) || this.dateTimeAdapter.now();
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._selected = this.getValidDate(value);
    }
    get selecteds() {
        return this._selecteds;
    }
    set selecteds(values) {
        this._selecteds = values.map(v => {
            v = this.dateTimeAdapter.deserialize(v);
            return this.getValidDate(v);
        });
    }
    get periodButtonText() {
        return this.isMonthView
            ? this.dateTimeAdapter.format(this.pickerMoment, this.dateTimeFormats.display.monthYearLabel)
            : this.dateTimeAdapter.getYearName(this.pickerMoment);
    }
    get periodButtonLabel() {
        return this.isMonthView
            ? this.pickerIntl.switchToMultiYearViewLabel
            : this.pickerIntl.switchToMonthViewLabel;
    }
    get prevButtonLabel() {
        if (this._currentView === 'month') {
            return this.pickerIntl.prevMonthLabel;
        }
        else if (this._currentView === 'year') {
            return this.pickerIntl.prevYearLabel;
        }
        else {
            return null;
        }
    }
    get nextButtonLabel() {
        if (this._currentView === 'month') {
            return this.pickerIntl.nextMonthLabel;
        }
        else if (this._currentView === 'year') {
            return this.pickerIntl.nextYearLabel;
        }
        else {
            return null;
        }
    }
    get currentView() {
        return this._currentView;
    }
    set currentView(view) {
        this._currentView = view;
        this.moveFocusOnNextTick = true;
    }
    get isInSingleMode() {
        return this.selectMode === 'single';
    }
    get isInRangeMode() {
        return (this.selectMode === 'range' ||
            this.selectMode === 'rangeFrom' ||
            this.selectMode === 'rangeTo');
    }
    get showControlArrows() {
        return this._currentView !== 'multi-years';
    }
    get isMonthView() {
        return this._currentView === 'month';
    }
    /**
     * Bind class 'owl-dt-calendar' to host
     */
    get owlDTCalendarClass() {
        return true;
    }
    ngOnInit() { }
    ngAfterContentInit() {
        this._currentView = this.startView;
    }
    ngAfterViewChecked() {
        if (this.moveFocusOnNextTick) {
            this.moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    }
    ngOnDestroy() {
        this.intlChangesSub.unsubscribe();
    }
    /**
     * Toggle between month view and year view
     */
    toggleViews() {
        this.currentView = this._currentView === 'month' ? 'multi-years' : 'month';
    }
    /**
     * Handles user clicks on the previous button.
     */
    previousClicked() {
        this.pickerMoment = this.isMonthView
            ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1)
            : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1);
        this.pickerMomentChange.emit(this.pickerMoment);
    }
    /**
     * Handles user clicks on the next button.
     */
    nextClicked() {
        this.pickerMoment = this.isMonthView
            ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1)
            : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1);
        this.pickerMomentChange.emit(this.pickerMoment);
    }
    dateSelected(date) {
        if (!this.dateFilterForViews(date)) {
            return;
        }
        this.selectedChange.emit(date);
    }
    /**
     * Change the pickerMoment value and switch to a specific view
     */
    goToDateInView(date, view) {
        this.handlePickerMomentChange(date);
        this.currentView = view;
        return;
    }
    /**
     * Change the pickerMoment value
     */
    handlePickerMomentChange(date) {
        this.pickerMoment = this.dateTimeAdapter.clampDate(date, this.minDate, this.maxDate);
        this.pickerMomentChange.emit(this.pickerMoment);
        return;
    }
    userSelected() {
        this.userSelection.emit();
    }
    /**
     * Whether the previous period button is enabled.
     */
    prevButtonEnabled() {
        return !this.minDate || !this.isSameView(this.pickerMoment, this.minDate);
    }
    /**
     * Whether the next period button is enabled.
     */
    nextButtonEnabled() {
        return !this.maxDate || !this.isSameView(this.pickerMoment, this.maxDate);
    }
    /**
     * Focus to the host element
     */
    focusActiveCell() {
        this.ngZone.runOutsideAngular(() => {
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                this.elmRef.nativeElement.querySelector('.owl-dt-calendar-cell-active').focus();
            });
        });
    }
    selectYearInMultiYearView(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    selectMonthInYearView(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     */
    isSameView(date1, date2) {
        if (this._currentView === 'month') {
            return !!(date1 &&
                date2 &&
                this.dateTimeAdapter.getYear(date1) === this.dateTimeAdapter.getYear(date2) &&
                this.dateTimeAdapter.getMonth(date1) === this.dateTimeAdapter.getMonth(date2));
        }
        else if (this._currentView === 'year') {
            return !!(date1 &&
                date2 &&
                this.dateTimeAdapter.getYear(date1) === this.dateTimeAdapter.getYear(date2));
        }
        else {
            return false;
        }
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
OwlCalendarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: OwlCalendarComponent, deps: [{ token: i0.ElementRef }, { token: i1.OwlDateTimeIntl }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i2.DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OwlCalendarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.2", type: OwlCalendarComponent, selector: "owl-date-time-calendar", inputs: { dateFilter: "dateFilter", firstDayOfWeek: "firstDayOfWeek", minDate: "minDate", maxDate: "maxDate", pickerMoment: "pickerMoment", selectMode: "selectMode", selected: "selected", selecteds: "selecteds", startView: "startView", hideOtherMonths: "hideOtherMonths" }, outputs: { pickerMomentChange: "pickerMomentChange", selectedChange: "selectedChange", userSelection: "userSelection", yearSelected: "yearSelected", monthSelected: "monthSelected" }, host: { properties: { "class.owl-dt-calendar": "owlDTCalendarClass" } }, exportAs: ["owlDateTimeCalendar"], ngImport: i0, template: "<div class=\"owl-dt-calendar-control\">\n  <!-- focus when keyboard tab (http://kizu.ru/en/blog/keyboard-only-focus/#x) -->\n  <button\n    class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\n    type=\"button\"\n    tabindex=\"0\"\n    [style.visibility]=\"showControlArrows ? 'visible' : 'hidden'\"\n    [disabled]=\"!prevButtonEnabled()\"\n    [attr.aria-label]=\"prevButtonLabel\"\n    (click)=\"previousClicked()\"\n  >\n    <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n      <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\n      <svg\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        version=\"1.1\"\n        x=\"0px\"\n        y=\"0px\"\n        viewBox=\"0 0 250.738 250.738\"\n        style=\"enable-background: new 0 0 250.738 250.738\"\n        xml:space=\"preserve\"\n        width=\"100%\"\n        height=\"100%\"\n      >\n        <path\n          style=\"fill-rule: evenodd; clip-rule: evenodd\"\n          d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"\n        />\n      </svg>\n      <!-- </editor-fold> -->\n    </span>\n  </button>\n  <div class=\"owl-dt-calendar-control-content\">\n    <button\n      class=\"owl-dt-control owl-dt-control-button owl-dt-control-period-button\"\n      type=\"button\"\n      tabindex=\"0\"\n      [attr.aria-label]=\"periodButtonLabel\"\n      (click)=\"toggleViews()\"\n    >\n      <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n        {{ periodButtonText }}\n\n        <span\n          class=\"owl-dt-control-button-arrow\"\n          [style.transform]=\"'rotate(' + (isMonthView ? 0 : 180) + 'deg)'\"\n        >\n          <!-- <editor-fold desc=\"SVG Arrow\"> -->\n          <svg\n            version=\"1.1\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n            xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n            x=\"0px\"\n            y=\"0px\"\n            width=\"50%\"\n            height=\"50%\"\n            viewBox=\"0 0 292.362 292.362\"\n            style=\"enable-background: new 0 0 292.362 292.362\"\n            xml:space=\"preserve\"\n          >\n            <g>\n              <path\n                d=\"M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424\n                                C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428\n                                s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z\"\n              />\n            </g>\n          </svg>\n          <!-- </editor-fold> -->\n        </span>\n      </span>\n    </button>\n  </div>\n  <button\n    class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\n    type=\"button\"\n    tabindex=\"0\"\n    [style.visibility]=\"showControlArrows ? 'visible' : 'hidden'\"\n    [disabled]=\"!nextButtonEnabled()\"\n    [attr.aria-label]=\"nextButtonLabel\"\n    (click)=\"nextClicked()\"\n  >\n    <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n      <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\n      <svg\n        version=\"1.1\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        x=\"0px\"\n        y=\"0px\"\n        viewBox=\"0 0 250.738 250.738\"\n        style=\"enable-background: new 0 0 250.738 250.738\"\n        xml:space=\"preserve\"\n      >\n        <path\n          style=\"fill-rule: evenodd; clip-rule: evenodd\"\n          d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                    c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                    c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                    C197.237,120.447,195.534,115.448,191.75,111.689z\"\n        />\n      </svg>\n      <!-- </editor-fold> -->\n    </span>\n  </button>\n</div>\n<div class=\"owl-dt-calendar-main\" cdkMonitorSubtreeFocus [ngSwitch]=\"currentView\" tabindex=\"-1\">\n  <owl-date-time-month-view\n    *ngSwitchCase=\"'month'\"\n    [pickerMoment]=\"pickerMoment\"\n    [firstDayOfWeek]=\"firstDayOfWeek\"\n    [selected]=\"selected\"\n    [selecteds]=\"selecteds\"\n    [selectMode]=\"selectMode\"\n    [minDate]=\"minDate\"\n    [maxDate]=\"maxDate\"\n    [dateFilter]=\"dateFilter\"\n    [hideOtherMonths]=\"hideOtherMonths\"\n    (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n    (selectedChange)=\"dateSelected($event)\"\n    (userSelection)=\"userSelected()\"\n  ></owl-date-time-month-view>\n\n  <owl-date-time-year-view\n    *ngSwitchCase=\"'year'\"\n    [pickerMoment]=\"pickerMoment\"\n    [selected]=\"selected\"\n    [selecteds]=\"selecteds\"\n    [selectMode]=\"selectMode\"\n    [minDate]=\"minDate\"\n    [maxDate]=\"maxDate\"\n    [dateFilter]=\"dateFilter\"\n    (keyboardEnter)=\"focusActiveCell()\"\n    (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n    (monthSelected)=\"selectMonthInYearView($event)\"\n    (change)=\"goToDateInView($event, 'month')\"\n  ></owl-date-time-year-view>\n\n  <owl-date-time-multi-year-view\n    *ngSwitchCase=\"'multi-years'\"\n    [pickerMoment]=\"pickerMoment\"\n    [selected]=\"selected\"\n    [selecteds]=\"selecteds\"\n    [selectMode]=\"selectMode\"\n    [minDate]=\"minDate\"\n    [maxDate]=\"maxDate\"\n    [dateFilter]=\"dateFilter\"\n    (keyboardEnter)=\"focusActiveCell()\"\n    (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n    (yearSelected)=\"selectYearInMultiYearView($event)\"\n    (change)=\"goToDateInView($event, 'year')\"\n  ></owl-date-time-multi-year-view>\n</div>\n", components: [{ type: i3.OwlMonthViewComponent, selector: "owl-date-time-month-view", inputs: ["hideOtherMonths", "firstDayOfWeek", "selectMode", "selected", "selecteds", "pickerMoment", "dateFilter", "minDate", "maxDate"], outputs: ["selectedChange", "userSelection", "pickerMomentChange"], exportAs: ["owlYearView"] }, { type: i4.OwlYearViewComponent, selector: "owl-date-time-year-view", inputs: ["selectMode", "selected", "selecteds", "pickerMoment", "dateFilter", "minDate", "maxDate"], outputs: ["change", "monthSelected", "pickerMomentChange", "keyboardEnter"], exportAs: ["owlMonthView"] }, { type: i5.OwlMultiYearViewComponent, selector: "owl-date-time-multi-year-view", inputs: ["selectMode", "selected", "selecteds", "pickerMoment", "dateFilter", "minDate", "maxDate"], outputs: ["change", "yearSelected", "pickerMomentChange", "keyboardEnter"] }], directives: [{ type: i6.CdkMonitorFocus, selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]", outputs: ["cdkFocusChange"] }, { type: i7.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i7.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: OwlCalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'owl-date-time-calendar', exportAs: 'owlDateTimeCalendar', host: {
                        '[class.owl-dt-calendar]': 'owlDTCalendarClass'
                    }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"owl-dt-calendar-control\">\n  <!-- focus when keyboard tab (http://kizu.ru/en/blog/keyboard-only-focus/#x) -->\n  <button\n    class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\n    type=\"button\"\n    tabindex=\"0\"\n    [style.visibility]=\"showControlArrows ? 'visible' : 'hidden'\"\n    [disabled]=\"!prevButtonEnabled()\"\n    [attr.aria-label]=\"prevButtonLabel\"\n    (click)=\"previousClicked()\"\n  >\n    <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n      <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\n      <svg\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        version=\"1.1\"\n        x=\"0px\"\n        y=\"0px\"\n        viewBox=\"0 0 250.738 250.738\"\n        style=\"enable-background: new 0 0 250.738 250.738\"\n        xml:space=\"preserve\"\n        width=\"100%\"\n        height=\"100%\"\n      >\n        <path\n          style=\"fill-rule: evenodd; clip-rule: evenodd\"\n          d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"\n        />\n      </svg>\n      <!-- </editor-fold> -->\n    </span>\n  </button>\n  <div class=\"owl-dt-calendar-control-content\">\n    <button\n      class=\"owl-dt-control owl-dt-control-button owl-dt-control-period-button\"\n      type=\"button\"\n      tabindex=\"0\"\n      [attr.aria-label]=\"periodButtonLabel\"\n      (click)=\"toggleViews()\"\n    >\n      <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n        {{ periodButtonText }}\n\n        <span\n          class=\"owl-dt-control-button-arrow\"\n          [style.transform]=\"'rotate(' + (isMonthView ? 0 : 180) + 'deg)'\"\n        >\n          <!-- <editor-fold desc=\"SVG Arrow\"> -->\n          <svg\n            version=\"1.1\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n            xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n            x=\"0px\"\n            y=\"0px\"\n            width=\"50%\"\n            height=\"50%\"\n            viewBox=\"0 0 292.362 292.362\"\n            style=\"enable-background: new 0 0 292.362 292.362\"\n            xml:space=\"preserve\"\n          >\n            <g>\n              <path\n                d=\"M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424\n                                C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428\n                                s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z\"\n              />\n            </g>\n          </svg>\n          <!-- </editor-fold> -->\n        </span>\n      </span>\n    </button>\n  </div>\n  <button\n    class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\n    type=\"button\"\n    tabindex=\"0\"\n    [style.visibility]=\"showControlArrows ? 'visible' : 'hidden'\"\n    [disabled]=\"!nextButtonEnabled()\"\n    [attr.aria-label]=\"nextButtonLabel\"\n    (click)=\"nextClicked()\"\n  >\n    <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n      <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\n      <svg\n        version=\"1.1\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        x=\"0px\"\n        y=\"0px\"\n        viewBox=\"0 0 250.738 250.738\"\n        style=\"enable-background: new 0 0 250.738 250.738\"\n        xml:space=\"preserve\"\n      >\n        <path\n          style=\"fill-rule: evenodd; clip-rule: evenodd\"\n          d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                    c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                    c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                    C197.237,120.447,195.534,115.448,191.75,111.689z\"\n        />\n      </svg>\n      <!-- </editor-fold> -->\n    </span>\n  </button>\n</div>\n<div class=\"owl-dt-calendar-main\" cdkMonitorSubtreeFocus [ngSwitch]=\"currentView\" tabindex=\"-1\">\n  <owl-date-time-month-view\n    *ngSwitchCase=\"'month'\"\n    [pickerMoment]=\"pickerMoment\"\n    [firstDayOfWeek]=\"firstDayOfWeek\"\n    [selected]=\"selected\"\n    [selecteds]=\"selecteds\"\n    [selectMode]=\"selectMode\"\n    [minDate]=\"minDate\"\n    [maxDate]=\"maxDate\"\n    [dateFilter]=\"dateFilter\"\n    [hideOtherMonths]=\"hideOtherMonths\"\n    (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n    (selectedChange)=\"dateSelected($event)\"\n    (userSelection)=\"userSelected()\"\n  ></owl-date-time-month-view>\n\n  <owl-date-time-year-view\n    *ngSwitchCase=\"'year'\"\n    [pickerMoment]=\"pickerMoment\"\n    [selected]=\"selected\"\n    [selecteds]=\"selecteds\"\n    [selectMode]=\"selectMode\"\n    [minDate]=\"minDate\"\n    [maxDate]=\"maxDate\"\n    [dateFilter]=\"dateFilter\"\n    (keyboardEnter)=\"focusActiveCell()\"\n    (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n    (monthSelected)=\"selectMonthInYearView($event)\"\n    (change)=\"goToDateInView($event, 'month')\"\n  ></owl-date-time-year-view>\n\n  <owl-date-time-multi-year-view\n    *ngSwitchCase=\"'multi-years'\"\n    [pickerMoment]=\"pickerMoment\"\n    [selected]=\"selected\"\n    [selecteds]=\"selecteds\"\n    [selectMode]=\"selectMode\"\n    [minDate]=\"minDate\"\n    [maxDate]=\"maxDate\"\n    [dateFilter]=\"dateFilter\"\n    (keyboardEnter)=\"focusActiveCell()\"\n    (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n    (yearSelected)=\"selectYearInMultiYearView($event)\"\n    (change)=\"goToDateInView($event, 'year')\"\n  ></owl-date-time-multi-year-view>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.OwlDateTimeIntl }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i2.DateTimeAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [OWL_DATE_TIME_FORMATS]
                }] }]; }, propDecorators: { dateFilter: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], pickerMoment: [{
                type: Input
            }], selectMode: [{
                type: Input
            }], selected: [{
                type: Input
            }], selecteds: [{
                type: Input
            }], startView: [{
                type: Input
            }], hideOtherMonths: [{
                type: Input
            }], pickerMomentChange: [{
                type: Output
            }], selectedChange: [{
                type: Output
            }], userSelection: [{
                type: Output
            }], yearSelected: [{
                type: Output
            }], monthSelected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL2NhbGVuZGFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9jYWxlbmRhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFJTCxRQUFRLEVBQ1IsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBc0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUU5RixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7O0FBWXBDLE1BQU0sT0FBTyxvQkFBb0I7SUE2Ti9CLFlBQ1UsTUFBa0IsRUFDbEIsVUFBMkIsRUFDM0IsTUFBYyxFQUNkLEtBQXdCLEVBQ1osZUFBbUMsRUFHL0MsZUFBbUM7UUFQbkMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBbkpyQyxlQUFVLEdBQVEsRUFBRSxDQUFDO1FBYTdCOztXQUVHO1FBRUgsY0FBUyxHQUFxQyxPQUFPLENBQUM7UUFRdEQsc0RBQXNEO1FBRXRELHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFLLENBQUM7UUFFM0Msc0RBQXNEO1FBRXRELG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVB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S0FBSztnQkFxQkYsT0FBTztzQkFEVixLQUFLO2dCQXFCRixZQUFZO3NCQURmLEtBQUs7Z0JBV04sVUFBVTtzQkFEVCxLQUFLO2dCQU1GLFFBQVE7c0JBRFgsS0FBSztnQkFZRixTQUFTO3NCQURaLEtBQUs7Z0JBZ0JOLFNBQVM7c0JBRFIsS0FBSztnQkFPTixlQUFlO3NCQURkLEtBQUs7Z0JBS04sa0JBQWtCO3NCQURqQixNQUFNO2dCQUtQLGNBQWM7c0JBRGIsTUFBTTtnQkFLUCxhQUFhO3NCQURaLE1BQU07Z0JBT0UsWUFBWTtzQkFEcEIsTUFBTTtnQkFPRSxhQUFhO3NCQURyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE93bERhdGVUaW1lSW50bCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQgeyBPV0xfREFURV9USU1FX0ZPUk1BVFMsIE93bERhdGVUaW1lRm9ybWF0cyB9IGZyb20gJy4uL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQgeyBTZWxlY3RNb2RlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLWNhbGVuZGFyJyxcbiAgZXhwb3J0QXM6ICdvd2xEYXRlVGltZUNhbGVuZGFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhcl0nOiAnb3dsRFRDYWxlbmRhckNsYXNzJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBPd2xDYWxlbmRhckNvbXBvbmVudDxUPlxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95XG57XG4gIC8qKlxuICAgKiBEYXRlIGZpbHRlciBmb3IgdGhlIG1vbnRoIGFuZCB5ZWFyIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpXG4gIGRhdGVGaWx0ZXI6ICgoZGF0ZTogVCkgPT4gYm9vbGVhbikgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZmlyc3QgZGF5IG9mIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpXG4gIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXI7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfbWluRGF0ZTogVCB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIGdldCBtaW5EYXRlKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgfVxuXG4gIHNldCBtaW5EYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIHZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuXG4gICAgdGhpcy5fbWluRGF0ZSA9IHZhbHVlXG4gICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih2YWx1ZSksXG4gICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodmFsdWUpLFxuICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodmFsdWUpXG4gICAgICAgIClcbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gIHByaXZhdGUgX21heERhdGU6IFQgfCBudWxsO1xuICBASW5wdXQoKVxuICBnZXQgbWF4RGF0ZSgpOiBUIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gIH1cblxuICBzZXQgbWF4RGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB2YWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcblxuICAgIHRoaXMuX21heERhdGUgPSB2YWx1ZVxuICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodmFsdWUpLFxuICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHZhbHVlKSxcbiAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHZhbHVlKVxuICAgICAgICApXG4gICAgICA6IG51bGw7XG4gIH1cblxuICAvKiogVGhlIGN1cnJlbnQgcGlja2VyIG1vbWVudCAqL1xuICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQ7XG4gIEBJbnB1dCgpXG4gIGdldCBwaWNrZXJNb21lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcbiAgfVxuXG4gIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcbiAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB0aGlzLl9waWNrZXJNb21lbnQgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZWxlY3RNb2RlOiBTZWxlY3RNb2RlO1xuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIG1vbWVudC4gKi9cbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFQgfCBudWxsO1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZHMoKTogVFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkcyA9IHZhbHVlcy5tYXAodiA9PiB7XG4gICAgICB2ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodik7XG4gICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGUodik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHZpZXcgdGhhdCB0aGUgY2FsZW5kYXIgc2hvdWxkIHN0YXJ0IGluLlxuICAgKi9cbiAgQElucHV0KClcbiAgc3RhcnRWaWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXJzJyA9ICdtb250aCc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gaGlkZSBkYXRlcyBpbiBvdGhlciBtb250aHMgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgY3VycmVudCBtb250aC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGhpZGVPdGhlck1vbnRoczogYm9vbGVhbjtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY3VycmVudGx5IHBpY2tlciBtb21lbnQgY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpXG4gIHBpY2tlck1vbWVudENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUgY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpXG4gIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIHNlbGVjdGVkLiAqL1xuICBAT3V0cHV0KClcbiAgdXNlclNlbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKipcbiAgICogRW1pdHMgdGhlIHNlbGVjdGVkIHllYXIuIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZVxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHllYXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAvKipcbiAgICogRW1pdHMgdGhlIHNlbGVjdGVkIG1vbnRoLiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGVcbiAgICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBtb250aFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIGdldCBwZXJpb2RCdXR0b25UZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaXNNb250aFZpZXdcbiAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KHRoaXMucGlja2VyTW9tZW50LCB0aGlzLmRhdGVUaW1lRm9ybWF0cy5kaXNwbGF5Lm1vbnRoWWVhckxhYmVsKVxuICAgICAgOiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyTmFtZSh0aGlzLnBpY2tlck1vbWVudCk7XG4gIH1cblxuICBnZXQgcGVyaW9kQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc01vbnRoVmlld1xuICAgICAgPyB0aGlzLnBpY2tlckludGwuc3dpdGNoVG9NdWx0aVllYXJWaWV3TGFiZWxcbiAgICAgIDogdGhpcy5waWNrZXJJbnRsLnN3aXRjaFRvTW9udGhWaWV3TGFiZWw7XG4gIH1cblxuICBnZXQgcHJldkJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAnbW9udGgnKSB7XG4gICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnByZXZNb250aExhYmVsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICd5ZWFyJykge1xuICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5wcmV2WWVhckxhYmVsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBnZXQgbmV4dEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAnbW9udGgnKSB7XG4gICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLm5leHRNb250aExhYmVsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICd5ZWFyJykge1xuICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5uZXh0WWVhckxhYmVsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50VmlldzogJ21vbnRoJyB8ICd5ZWFyJyB8ICdtdWx0aS15ZWFycyc7XG4gIGdldCBjdXJyZW50VmlldygpOiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXJzJyB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWV3O1xuICB9XG5cbiAgc2V0IGN1cnJlbnRWaWV3KHZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcnMnKSB7XG4gICAgdGhpcy5fY3VycmVudFZpZXcgPSB2aWV3O1xuICAgIHRoaXMubW92ZUZvY3VzT25OZXh0VGljayA9IHRydWU7XG4gIH1cblxuICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XG4gIH1cblxuICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XG4gICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJ1xuICAgICk7XG4gIH1cblxuICBnZXQgc2hvd0NvbnRyb2xBcnJvd3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWV3ICE9PSAnbXVsdGkteWVhcnMnO1xuICB9XG5cbiAgZ2V0IGlzTW9udGhWaWV3KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmlldyA9PT0gJ21vbnRoJztcbiAgfVxuXG4gIC8qKlxuICAgKiBEYXRlIGZpbHRlciBmb3IgdGhlIG1vbnRoIGFuZCB5ZWFyIHZpZXdcbiAgICovXG4gIHB1YmxpYyBkYXRlRmlsdGVyRm9yVmlld3MgPSAoZGF0ZTogVCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAhIWRhdGUgJiZcbiAgICAgICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkgJiZcbiAgICAgICghdGhpcy5taW5EYXRlIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGUsIHRoaXMubWluRGF0ZSkgPj0gMCkgJiZcbiAgICAgICghdGhpcy5tYXhEYXRlIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGUsIHRoaXMubWF4RGF0ZSkgPD0gMClcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBCaW5kIGNsYXNzICdvd2wtZHQtY2FsZW5kYXInIHRvIGhvc3RcbiAgICovXG4gIGdldCBvd2xEVENhbGVuZGFyQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGludGxDaGFuZ2VzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKlxuICAgKiBVc2VkIGZvciBzY2hlZHVsaW5nIHRoYXQgZm9jdXMgc2hvdWxkIGJlIG1vdmVkIHRvIHRoZSBhY3RpdmUgY2VsbCBvbiB0aGUgbmV4dCB0aWNrLlxuICAgKiBXZSBuZWVkIHRvIHNjaGVkdWxlIGl0LCByYXRoZXIgdGhhbiBkbyBpdCBpbW1lZGlhdGVseSwgYmVjYXVzZSB3ZSBoYXZlIHRvIHdhaXRcbiAgICogZm9yIEFuZ3VsYXIgdG8gcmUtZXZhbHVhdGUgdGhlIHZpZXcgY2hpbGRyZW4uXG4gICAqL1xuICBwcml2YXRlIG1vdmVGb2N1c09uTmV4dFRpY2sgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsbVJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcbiAgICBwcml2YXRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzXG4gICkge1xuICAgIHRoaXMuaW50bENoYW5nZXNTdWIgPSB0aGlzLnBpY2tlckludGwuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50VmlldyA9IHRoaXMuc3RhcnRWaWV3O1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICBpZiAodGhpcy5tb3ZlRm9jdXNPbk5leHRUaWNrKSB7XG4gICAgICB0aGlzLm1vdmVGb2N1c09uTmV4dFRpY2sgPSBmYWxzZTtcbiAgICAgIHRoaXMuZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaW50bENoYW5nZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgYmV0d2VlbiBtb250aCB2aWV3IGFuZCB5ZWFyIHZpZXdcbiAgICovXG4gIHB1YmxpYyB0b2dnbGVWaWV3cygpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdGhpcy5fY3VycmVudFZpZXcgPT09ICdtb250aCcgPyAnbXVsdGkteWVhcnMnIDogJ21vbnRoJztcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBwcmV2aW91cyBidXR0b24uXG4gICAqL1xuICBwdWJsaWMgcHJldmlvdXNDbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5pc01vbnRoVmlld1xuICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLnBpY2tlck1vbWVudCwgLTEpXG4gICAgICA6IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5waWNrZXJNb21lbnQsIC0xKTtcblxuICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQodGhpcy5waWNrZXJNb21lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIG5leHQgYnV0dG9uLlxuICAgKi9cbiAgcHVibGljIG5leHRDbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5pc01vbnRoVmlld1xuICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLnBpY2tlck1vbWVudCwgMSlcbiAgICAgIDogdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLnBpY2tlck1vbWVudCwgMSk7XG5cbiAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KHRoaXMucGlja2VyTW9tZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBkYXRlU2VsZWN0ZWQoZGF0ZTogVCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kYXRlRmlsdGVyRm9yVmlld3MoZGF0ZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSBwaWNrZXJNb21lbnQgdmFsdWUgYW5kIHN3aXRjaCB0byBhIHNwZWNpZmljIHZpZXdcbiAgICovXG4gIHB1YmxpYyBnb1RvRGF0ZUluVmlldyhkYXRlOiBULCB2aWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXJzJyk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlUGlja2VyTW9tZW50Q2hhbmdlKGRhdGUpO1xuICAgIHRoaXMuY3VycmVudFZpZXcgPSB2aWV3O1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdGhlIHBpY2tlck1vbWVudCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIGhhbmRsZVBpY2tlck1vbWVudENoYW5nZShkYXRlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5waWNrZXJNb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbGFtcERhdGUoZGF0ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpO1xuICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQodGhpcy5waWNrZXJNb21lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHB1YmxpYyB1c2VyU2VsZWN0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy51c2VyU2VsZWN0aW9uLmVtaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBwcmV2aW91cyBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuXG4gICAqL1xuICBwdWJsaWMgcHJldkJ1dHRvbkVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLm1pbkRhdGUgfHwgIXRoaXMuaXNTYW1lVmlldyh0aGlzLnBpY2tlck1vbWVudCwgdGhpcy5taW5EYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBuZXh0IHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC5cbiAgICovXG4gIHB1YmxpYyBuZXh0QnV0dG9uRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMubWF4RGF0ZSB8fCAhdGhpcy5pc1NhbWVWaWV3KHRoaXMucGlja2VyTW9tZW50LCB0aGlzLm1heERhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIHRvIHRoZSBob3N0IGVsZW1lbnRcbiAgICovXG4gIHB1YmxpYyBmb2N1c0FjdGl2ZUNlbGwoKSB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1kdC1jYWxlbmRhci1jZWxsLWFjdGl2ZScpLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdFllYXJJbk11bHRpWWVhclZpZXcobm9ybWFsaXplZFllYXI6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnllYXJTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRZZWFyKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RNb250aEluWWVhclZpZXcobm9ybWFsaXplZE1vbnRoOiBUKTogdm9pZCB7XG4gICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQobm9ybWFsaXplZE1vbnRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSB0d28gZGF0ZXMgcmVwcmVzZW50IHRoZSBzYW1lIHZpZXcgaW4gdGhlIGN1cnJlbnQgdmlldyBtb2RlIChtb250aCBvciB5ZWFyKS5cbiAgICovXG4gIHByaXZhdGUgaXNTYW1lVmlldyhkYXRlMTogVCwgZGF0ZTI6IFQpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgIHJldHVybiAhIShcbiAgICAgICAgZGF0ZTEgJiZcbiAgICAgICAgZGF0ZTIgJiZcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMSkgPT09IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZTIpICYmXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGUxKSA9PT0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZTIpXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICd5ZWFyJykge1xuICAgICAgcmV0dXJuICEhKFxuICAgICAgICBkYXRlMSAmJlxuICAgICAgICBkYXRlMiAmJlxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PT0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMilcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdmFsaWQgZGF0ZSBvYmplY3RcbiAgICovXG4gIHByaXZhdGUgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKVxuICAgICAgPyBvYmpcbiAgICAgIDogbnVsbDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm93bC1kdC1jYWxlbmRhci1jb250cm9sXCI+XG4gIDwhLS0gZm9jdXMgd2hlbiBrZXlib2FyZCB0YWIgKGh0dHA6Ly9raXp1LnJ1L2VuL2Jsb2cva2V5Ym9hcmQtb25seS1mb2N1cy8jeCkgLS0+XG4gIDxidXR0b25cbiAgICBjbGFzcz1cIm93bC1kdC1jb250cm9sIG93bC1kdC1jb250cm9sLWJ1dHRvbiBvd2wtZHQtY29udHJvbC1hcnJvdy1idXR0b25cIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIHRhYmluZGV4PVwiMFwiXG4gICAgW3N0eWxlLnZpc2liaWxpdHldPVwic2hvd0NvbnRyb2xBcnJvd3MgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1wiXG4gICAgW2Rpc2FibGVkXT1cIiFwcmV2QnV0dG9uRW5hYmxlZCgpXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInByZXZCdXR0b25MYWJlbFwiXG4gICAgKGNsaWNrKT1cInByZXZpb3VzQ2xpY2tlZCgpXCJcbiAgPlxuICAgIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wtY29udGVudCBvd2wtZHQtY29udHJvbC1idXR0b24tY29udGVudFwiIHRhYmluZGV4PVwiLTFcIj5cbiAgICAgIDwhLS0gPGVkaXRvci1mb2xkIGRlc2M9XCJTVkcgQXJyb3cgTGVmdFwiPiAtLT5cbiAgICAgIDxzdmdcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiXG4gICAgICAgIHZlcnNpb249XCIxLjFcIlxuICAgICAgICB4PVwiMHB4XCJcbiAgICAgICAgeT1cIjBweFwiXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgMjUwLjczOCAyNTAuNzM4XCJcbiAgICAgICAgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDogbmV3IDAgMCAyNTAuNzM4IDI1MC43MzhcIlxuICAgICAgICB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiXG4gICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIHN0eWxlPVwiZmlsbC1ydWxlOiBldmVub2RkOyBjbGlwLXJ1bGU6IGV2ZW5vZGRcIlxuICAgICAgICAgIGQ9XCJNOTYuNjMzLDEyNS4zNjlsOTUuMDUzLTk0LjUzM2M3LjEwMS03LjA1NSw3LjEwMS0xOC40OTIsMC0yNS41NDYgICBjLTcuMS03LjA1NC0xOC42MTMtNy4wNTQtMjUuNzE0LDBMNTguOTg5LDExMS42ODljLTMuNzg0LDMuNzU5LTUuNDg3LDguNzU5LTUuMjM4LDEzLjY4Yy0wLjI0OSw0LjkyMiwxLjQ1NCw5LjkyMSw1LjIzOCwxMy42ODEgICBsMTA2Ljk4MywxMDYuMzk4YzcuMTAxLDcuMDU1LDE4LjYxMyw3LjA1NSwyNS43MTQsMGM3LjEwMS03LjA1NCw3LjEwMS0xOC40OTEsMC0yNS41NDRMOTYuNjMzLDEyNS4zNjl6XCJcbiAgICAgICAgLz5cbiAgICAgIDwvc3ZnPlxuICAgICAgPCEtLSA8L2VkaXRvci1mb2xkPiAtLT5cbiAgICA8L3NwYW4+XG4gIDwvYnV0dG9uPlxuICA8ZGl2IGNsYXNzPVwib3dsLWR0LWNhbGVuZGFyLWNvbnRyb2wtY29udGVudFwiPlxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wgb3dsLWR0LWNvbnRyb2wtYnV0dG9uIG93bC1kdC1jb250cm9sLXBlcmlvZC1idXR0b25cIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJwZXJpb2RCdXR0b25MYWJlbFwiXG4gICAgICAoY2xpY2spPVwidG9nZ2xlVmlld3MoKVwiXG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udHJvbC1jb250ZW50IG93bC1kdC1jb250cm9sLWJ1dHRvbi1jb250ZW50XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICB7eyBwZXJpb2RCdXR0b25UZXh0IH19XG5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzcz1cIm93bC1kdC1jb250cm9sLWJ1dHRvbi1hcnJvd1wiXG4gICAgICAgICAgW3N0eWxlLnRyYW5zZm9ybV09XCIncm90YXRlKCcgKyAoaXNNb250aFZpZXcgPyAwIDogMTgwKSArICdkZWcpJ1wiXG4gICAgICAgID5cbiAgICAgICAgICA8IS0tIDxlZGl0b3ItZm9sZCBkZXNjPVwiU1ZHIEFycm93XCI+IC0tPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIHZlcnNpb249XCIxLjFcIlxuICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxuICAgICAgICAgICAgeD1cIjBweFwiXG4gICAgICAgICAgICB5PVwiMHB4XCJcbiAgICAgICAgICAgIHdpZHRoPVwiNTAlXCJcbiAgICAgICAgICAgIGhlaWdodD1cIjUwJVwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI5Mi4zNjIgMjkyLjM2MlwiXG4gICAgICAgICAgICBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOiBuZXcgMCAwIDI5Mi4zNjIgMjkyLjM2MlwiXG4gICAgICAgICAgICB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGc+XG4gICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgZD1cIk0yODYuOTM1LDY5LjM3N2MtMy42MTQtMy42MTctNy44OTgtNS40MjQtMTIuODQ4LTUuNDI0SDE4LjI3NGMtNC45NTIsMC05LjIzMywxLjgwNy0xMi44NSw1LjQyNFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDMS44MDcsNzIuOTk4LDAsNzcuMjc5LDAsODIuMjI4YzAsNC45NDgsMS44MDcsOS4yMjksNS40MjQsMTIuODQ3bDEyNy45MDcsMTI3LjkwN2MzLjYyMSwzLjYxNyw3LjkwMiw1LjQyOCwxMi44NSw1LjQyOFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzOS4yMzMtMS44MTEsMTIuODQ3LTUuNDI4TDI4Ni45MzUsOTUuMDc0YzMuNjEzLTMuNjE3LDUuNDI3LTcuODk4LDUuNDI3LTEyLjg0N0MyOTIuMzYyLDc3LjI3OSwyOTAuNTQ4LDcyLjk5OCwyODYuOTM1LDY5LjM3N3pcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwhLS0gPC9lZGl0b3ItZm9sZD4gLS0+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDxidXR0b25cbiAgICBjbGFzcz1cIm93bC1kdC1jb250cm9sIG93bC1kdC1jb250cm9sLWJ1dHRvbiBvd2wtZHQtY29udHJvbC1hcnJvdy1idXR0b25cIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIHRhYmluZGV4PVwiMFwiXG4gICAgW3N0eWxlLnZpc2liaWxpdHldPVwic2hvd0NvbnRyb2xBcnJvd3MgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1wiXG4gICAgW2Rpc2FibGVkXT1cIiFuZXh0QnV0dG9uRW5hYmxlZCgpXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5leHRCdXR0b25MYWJlbFwiXG4gICAgKGNsaWNrKT1cIm5leHRDbGlja2VkKClcIlxuICA+XG4gICAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udHJvbC1jb250ZW50IG93bC1kdC1jb250cm9sLWJ1dHRvbi1jb250ZW50XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgPCEtLSA8ZWRpdG9yLWZvbGQgZGVzYz1cIlNWRyBBcnJvdyBSaWdodFwiPiAtLT5cbiAgICAgIDxzdmdcbiAgICAgICAgdmVyc2lvbj1cIjEuMVwiXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxuICAgICAgICB4PVwiMHB4XCJcbiAgICAgICAgeT1cIjBweFwiXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgMjUwLjczOCAyNTAuNzM4XCJcbiAgICAgICAgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDogbmV3IDAgMCAyNTAuNzM4IDI1MC43MzhcIlxuICAgICAgICB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiXG4gICAgICA+XG4gICAgICAgIDxwYXRoXG4gICAgICAgICAgc3R5bGU9XCJmaWxsLXJ1bGU6IGV2ZW5vZGQ7IGNsaXAtcnVsZTogZXZlbm9kZFwiXG4gICAgICAgICAgZD1cIk0xOTEuNzUsMTExLjY4OUw4NC43NjYsNS4yOTFjLTcuMS03LjA1NS0xOC42MTMtNy4wNTUtMjUuNzEzLDBcbiAgICAgICAgICAgICAgICAgICAgYy03LjEwMSw3LjA1NC03LjEwMSwxOC40OSwwLDI1LjU0NGw5NS4wNTMsOTQuNTM0bC05NS4wNTMsOTQuNTMzYy03LjEwMSw3LjA1NC03LjEwMSwxOC40OTEsMCwyNS41NDVcbiAgICAgICAgICAgICAgICAgICAgYzcuMSw3LjA1NCwxOC42MTMsNy4wNTQsMjUuNzEzLDBMMTkxLjc1LDEzOS4wNWMzLjc4NC0zLjc1OSw1LjQ4Ny04Ljc1OSw1LjIzOC0xMy42ODFcbiAgICAgICAgICAgICAgICAgICAgQzE5Ny4yMzcsMTIwLjQ0NywxOTUuNTM0LDExNS40NDgsMTkxLjc1LDExMS42ODl6XCJcbiAgICAgICAgLz5cbiAgICAgIDwvc3ZnPlxuICAgICAgPCEtLSA8L2VkaXRvci1mb2xkPiAtLT5cbiAgICA8L3NwYW4+XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwib3dsLWR0LWNhbGVuZGFyLW1haW5cIiBjZGtNb25pdG9yU3VidHJlZUZvY3VzIFtuZ1N3aXRjaF09XCJjdXJyZW50Vmlld1wiIHRhYmluZGV4PVwiLTFcIj5cbiAgPG93bC1kYXRlLXRpbWUtbW9udGgtdmlld1xuICAgICpuZ1N3aXRjaENhc2U9XCInbW9udGgnXCJcbiAgICBbcGlja2VyTW9tZW50XT1cInBpY2tlck1vbWVudFwiXG4gICAgW2ZpcnN0RGF5T2ZXZWVrXT1cImZpcnN0RGF5T2ZXZWVrXCJcbiAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgIFtzZWxlY3RlZHNdPVwic2VsZWN0ZWRzXCJcbiAgICBbc2VsZWN0TW9kZV09XCJzZWxlY3RNb2RlXCJcbiAgICBbbWluRGF0ZV09XCJtaW5EYXRlXCJcbiAgICBbbWF4RGF0ZV09XCJtYXhEYXRlXCJcbiAgICBbZGF0ZUZpbHRlcl09XCJkYXRlRmlsdGVyXCJcbiAgICBbaGlkZU90aGVyTW9udGhzXT1cImhpZGVPdGhlck1vbnRoc1wiXG4gICAgKHBpY2tlck1vbWVudENoYW5nZSk9XCJoYW5kbGVQaWNrZXJNb21lbnRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgKHNlbGVjdGVkQ2hhbmdlKT1cImRhdGVTZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAodXNlclNlbGVjdGlvbik9XCJ1c2VyU2VsZWN0ZWQoKVwiXG4gID48L293bC1kYXRlLXRpbWUtbW9udGgtdmlldz5cblxuICA8b3dsLWRhdGUtdGltZS15ZWFyLXZpZXdcbiAgICAqbmdTd2l0Y2hDYXNlPVwiJ3llYXInXCJcbiAgICBbcGlja2VyTW9tZW50XT1cInBpY2tlck1vbWVudFwiXG4gICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICBbc2VsZWN0ZWRzXT1cInNlbGVjdGVkc1wiXG4gICAgW3NlbGVjdE1vZGVdPVwic2VsZWN0TW9kZVwiXG4gICAgW21pbkRhdGVdPVwibWluRGF0ZVwiXG4gICAgW21heERhdGVdPVwibWF4RGF0ZVwiXG4gICAgW2RhdGVGaWx0ZXJdPVwiZGF0ZUZpbHRlclwiXG4gICAgKGtleWJvYXJkRW50ZXIpPVwiZm9jdXNBY3RpdmVDZWxsKClcIlxuICAgIChwaWNrZXJNb21lbnRDaGFuZ2UpPVwiaGFuZGxlUGlja2VyTW9tZW50Q2hhbmdlKCRldmVudClcIlxuICAgIChtb250aFNlbGVjdGVkKT1cInNlbGVjdE1vbnRoSW5ZZWFyVmlldygkZXZlbnQpXCJcbiAgICAoY2hhbmdlKT1cImdvVG9EYXRlSW5WaWV3KCRldmVudCwgJ21vbnRoJylcIlxuICA+PC9vd2wtZGF0ZS10aW1lLXllYXItdmlldz5cblxuICA8b3dsLWRhdGUtdGltZS1tdWx0aS15ZWFyLXZpZXdcbiAgICAqbmdTd2l0Y2hDYXNlPVwiJ211bHRpLXllYXJzJ1wiXG4gICAgW3BpY2tlck1vbWVudF09XCJwaWNrZXJNb21lbnRcIlxuICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgW3NlbGVjdGVkc109XCJzZWxlY3RlZHNcIlxuICAgIFtzZWxlY3RNb2RlXT1cInNlbGVjdE1vZGVcIlxuICAgIFttaW5EYXRlXT1cIm1pbkRhdGVcIlxuICAgIFttYXhEYXRlXT1cIm1heERhdGVcIlxuICAgIFtkYXRlRmlsdGVyXT1cImRhdGVGaWx0ZXJcIlxuICAgIChrZXlib2FyZEVudGVyKT1cImZvY3VzQWN0aXZlQ2VsbCgpXCJcbiAgICAocGlja2VyTW9tZW50Q2hhbmdlKT1cImhhbmRsZVBpY2tlck1vbWVudENoYW5nZSgkZXZlbnQpXCJcbiAgICAoeWVhclNlbGVjdGVkKT1cInNlbGVjdFllYXJJbk11bHRpWWVhclZpZXcoJGV2ZW50KVwiXG4gICAgKGNoYW5nZSk9XCJnb1RvRGF0ZUluVmlldygkZXZlbnQsICd5ZWFyJylcIlxuICA+PC9vd2wtZGF0ZS10aW1lLW11bHRpLXllYXItdmlldz5cbjwvZGl2PlxuIl19