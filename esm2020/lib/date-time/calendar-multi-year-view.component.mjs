import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW, } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewChild, } from '@angular/core';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import * as i0 from "@angular/core";
import * as i1 from "./date-time-picker-intl.service";
import * as i2 from "../adapter/date-time-adapter.class";
import * as i3 from "./calendar-body.component";
export const YEARS_PER_ROW = 3;
export const YEAR_ROWS = 7;
export class OwlMultiYearViewComponent {
    constructor(cdRef, pickerIntl, dateTimeAdapter) {
        this.cdRef = cdRef;
        this.pickerIntl = pickerIntl;
        this.dateTimeAdapter = dateTimeAdapter;
        /**
         * The select mode of the picker;
         */
        this._selectMode = 'single';
        this._selecteds = [];
        this.initiated = false;
        /**
         * Callback to invoke when a new month is selected
         */
        this.change = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         */
        this.yearSelected = new EventEmitter();
        /** Emits when any date is activated. */
        this.pickerMomentChange = new EventEmitter();
        /** Emits when use keyboard enter to select a calendar cell */
        this.keyboardEnter = new EventEmitter();
    }
    get selectMode() {
        return this._selectMode;
    }
    set selectMode(val) {
        this._selectMode = val;
        if (this.initiated) {
            this.setSelectedYears();
            this.cdRef.markForCheck();
        }
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        const oldSelected = this._selected;
        value = this.dateTimeAdapter.deserialize(value);
        this._selected = this.getValidDate(value);
        if (!this.dateTimeAdapter.sameDate(oldSelected, this._selected)) {
            this.setSelectedYears();
        }
    }
    get selecteds() {
        return this._selecteds;
    }
    set selecteds(values) {
        this._selecteds = values.map(v => {
            v = this.dateTimeAdapter.deserialize(v);
            return this.getValidDate(v);
        });
        this.setSelectedYears();
    }
    get pickerMoment() {
        return this._pickerMoment;
    }
    set pickerMoment(value) {
        const oldMoment = this._pickerMoment;
        value = this.dateTimeAdapter.deserialize(value);
        this._pickerMoment = this.getValidDate(value) || this.dateTimeAdapter.now();
        if (oldMoment && this._pickerMoment && !this.isSameYearList(oldMoment, this._pickerMoment)) {
            this.generateYearList();
        }
    }
    get dateFilter() {
        return this._dateFilter;
    }
    set dateFilter(filter) {
        this._dateFilter = filter;
        if (this.initiated) {
            this.generateYearList();
        }
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._minDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateYearList();
        }
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._maxDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateYearList();
        }
    }
    get todayYear() {
        return this._todayYear;
    }
    get years() {
        return this._years;
    }
    get selectedYears() {
        return this._selectedYears;
    }
    get isInSingleMode() {
        return this.selectMode === 'single';
    }
    get isInRangeMode() {
        return (this.selectMode === 'range' ||
            this.selectMode === 'rangeFrom' ||
            this.selectMode === 'rangeTo');
    }
    get activeCell() {
        if (this._pickerMoment) {
            return this.dateTimeAdapter.getYear(this._pickerMoment) % (YEARS_PER_ROW * YEAR_ROWS);
        }
        return null;
    }
    get tableHeader() {
        if (this._years && this._years.length > 0) {
            return `${this._years[0][0].displayValue} - ${this._years[YEAR_ROWS - 1][YEARS_PER_ROW - 1].displayValue}`;
        }
    }
    get prevButtonLabel() {
        return this.pickerIntl.prevMultiYearLabel;
    }
    get nextButtonLabel() {
        return this.pickerIntl.nextMultiYearLabel;
    }
    get owlDTCalendarView() {
        return true;
    }
    get owlDTCalendarMultiYearView() {
        return true;
    }
    ngOnInit() { }
    ngAfterContentInit() {
        this._todayYear = this.dateTimeAdapter.getYear(this.dateTimeAdapter.now());
        this.generateYearList();
        this.initiated = true;
    }
    /**
     * Handle a calendarCell selected
     */
    selectCalendarCell(cell) {
        this.selectYear(cell.value);
    }
    selectYear(year) {
        this.yearSelected.emit(this.dateTimeAdapter.createDate(year, 0, 1));
        const firstDateOfMonth = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), 1);
        const daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
        const selected = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.change.emit(selected);
    }
    /**
     * Generate the previous year list
     */
    prevYearList(event) {
        this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1 * YEAR_ROWS * YEARS_PER_ROW);
        this.generateYearList();
        event.preventDefault();
    }
    /**
     * Generate the next year list
     */
    nextYearList(event) {
        this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, YEAR_ROWS * YEARS_PER_ROW);
        this.generateYearList();
        event.preventDefault();
    }
    generateYearList() {
        this._years = [];
        const pickerMomentYear = this.dateTimeAdapter.getYear(this._pickerMoment);
        const offset = pickerMomentYear % (YEARS_PER_ROW * YEAR_ROWS);
        for (let i = 0; i < YEAR_ROWS; i++) {
            const row = [];
            for (let j = 0; j < YEARS_PER_ROW; j++) {
                const year = pickerMomentYear - offset + (j + i * YEARS_PER_ROW);
                const yearCell = this.createYearCell(year);
                row.push(yearCell);
            }
            this._years.push(row);
        }
        return;
    }
    /** Whether the previous period button is enabled. */
    previousEnabled() {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this.isSameYearList(this._pickerMoment, this.minDate);
    }
    /** Whether the next period button is enabled. */
    nextEnabled() {
        return !this.maxDate || !this.isSameYearList(this._pickerMoment, this.maxDate);
    }
    handleCalendarKeydown(event) {
        let moment;
        switch (event.keyCode) {
            // minus 1 year
            case LEFT_ARROW:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 year
            case RIGHT_ARROW:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 3 years
            case UP_ARROW:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -1 * YEARS_PER_ROW);
                this.pickerMomentChange.emit(moment);
                break;
            // add 3 years
            case DOWN_ARROW:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, YEARS_PER_ROW);
                this.pickerMomentChange.emit(moment);
                break;
            // go to the first year of the year page
            case HOME:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -this.dateTimeAdapter.getYear(this._pickerMoment) % (YEARS_PER_ROW * YEAR_ROWS));
                this.pickerMomentChange.emit(moment);
                break;
            // go to the last year of the year page
            case END:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, YEARS_PER_ROW * YEAR_ROWS -
                    (this.dateTimeAdapter.getYear(this._pickerMoment) % (YEARS_PER_ROW * YEAR_ROWS)) -
                    1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 year page (or 10 year pages)
            case PAGE_UP:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? -10 * (YEARS_PER_ROW * YEAR_ROWS) : -1 * (YEARS_PER_ROW * YEAR_ROWS));
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 year page (or 10 year pages)
            case PAGE_DOWN:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? 10 * (YEARS_PER_ROW * YEAR_ROWS) : YEARS_PER_ROW * YEAR_ROWS);
                this.pickerMomentChange.emit(moment);
                break;
            case ENTER:
                this.selectYear(this.dateTimeAdapter.getYear(this._pickerMoment));
                this.keyboardEnter.emit();
                break;
            default:
                return;
        }
        this.focusActiveCell();
        event.preventDefault();
    }
    /**
     * Creates an CalendarCell for the given year.
     */
    createYearCell(year) {
        const startDateOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
        const ariaLabel = this.dateTimeAdapter.getYearName(startDateOfYear);
        const cellClass = 'owl-dt-year-' + year;
        return new CalendarCell(year, year.toString(), ariaLabel, this.isYearEnabled(year), false, cellClass);
    }
    setSelectedYears() {
        this._selectedYears = [];
        if (this.isInSingleMode && this.selected) {
            this._selectedYears[0] = this.dateTimeAdapter.getYear(this.selected);
        }
        if (this.isInRangeMode && this.selecteds) {
            this._selectedYears = this.selecteds.map(selected => {
                if (this.dateTimeAdapter.isValid(selected)) {
                    return this.dateTimeAdapter.getYear(selected);
                }
                else {
                    return null;
                }
            });
        }
    }
    /** Whether the given year is enabled. */
    isYearEnabled(year) {
        // disable if the year is greater than maxDate lower than minDate
        if (year === undefined ||
            year === null ||
            (this.maxDate && year > this.dateTimeAdapter.getYear(this.maxDate)) ||
            (this.minDate && year < this.dateTimeAdapter.getYear(this.minDate))) {
            return false;
        }
        // enable if it reaches here and there's no filter defined
        if (!this.dateFilter) {
            return true;
        }
        const firstOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
        // If any date in the year is enabled count the year as enabled.
        for (let date = firstOfYear; this.dateTimeAdapter.getYear(date) === year; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    }
    isSameYearList(date1, date2) {
        return (Math.floor(this.dateTimeAdapter.getYear(date1) / (YEARS_PER_ROW * YEAR_ROWS)) ===
            Math.floor(this.dateTimeAdapter.getYear(date2) / (YEARS_PER_ROW * YEAR_ROWS)));
    }
    /**
     * Get a valid date object
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
    focusActiveCell() {
        this.calendarBodyElm.focusActiveCell();
    }
}
OwlMultiYearViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlMultiYearViewComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.OwlDateTimeIntl }, { token: i2.DateTimeAdapter, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OwlMultiYearViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: OwlMultiYearViewComponent, selector: "owl-date-time-multi-year-view", inputs: { selectMode: "selectMode", selected: "selected", selecteds: "selecteds", pickerMoment: "pickerMoment", dateFilter: "dateFilter", minDate: "minDate", maxDate: "maxDate" }, outputs: { change: "change", yearSelected: "yearSelected", pickerMomentChange: "pickerMomentChange", keyboardEnter: "keyboardEnter" }, host: { properties: { "class.owl-dt-calendar-view": "owlDTCalendarView", "class.owl-dt-calendar-multi-year-view": "owlDTCalendarMultiYearView" } }, viewQueries: [{ propertyName: "calendarBodyElm", first: true, predicate: OwlCalendarBodyComponent, descendants: true, static: true }], ngImport: i0, template: "<button\n  class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n  [disabled]=\"!previousEnabled()\"\n  [attr.aria-label]=\"prevButtonLabel\"\n  type=\"button\"\n  tabindex=\"0\"\n  (click)=\"prevYearList($event)\"\n>\n  <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n    <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\n    <svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      version=\"1.1\"\n      x=\"0px\"\n      y=\"0px\"\n      viewBox=\"0 0 250.738 250.738\"\n      style=\"enable-background: new 0 0 250.738 250.738\"\n      xml:space=\"preserve\"\n      width=\"100%\"\n      height=\"100%\"\n    >\n      <path\n        style=\"fill-rule: evenodd; clip-rule: evenodd\"\n        d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"\n      />\n    </svg>\n    <!-- </editor-fold> -->\n  </span>\n</button>\n<table class=\"owl-dt-calendar-table owl-dt-calendar-multi-year-table\">\n  <thead class=\"owl-dt-calendar-header\">\n    <tr>\n      <th colspan=\"3\">{{ tableHeader }}</th>\n    </tr>\n  </thead>\n  <tbody\n    owl-date-time-calendar-body\n    role=\"grid\"\n    [rows]=\"years\"\n    [numCols]=\"3\"\n    [cellRatio]=\"3 / 7\"\n    [activeCell]=\"activeCell\"\n    [todayValue]=\"todayYear\"\n    [selectedValues]=\"selectedYears\"\n    [selectMode]=\"selectMode\"\n    (keydown)=\"handleCalendarKeydown($event)\"\n    (select)=\"selectCalendarCell($event)\"\n  ></tbody>\n</table>\n<button\n  class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n  [disabled]=\"!nextEnabled()\"\n  [attr.aria-label]=\"nextButtonLabel\"\n  type=\"button\"\n  tabindex=\"0\"\n  (click)=\"nextYearList($event)\"\n>\n  <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n    <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\n    <svg\n      version=\"1.1\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      x=\"0px\"\n      y=\"0px\"\n      viewBox=\"0 0 250.738 250.738\"\n      style=\"enable-background: new 0 0 250.738 250.738\"\n      xml:space=\"preserve\"\n    >\n      <path\n        style=\"fill-rule: evenodd; clip-rule: evenodd\"\n        d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                C197.237,120.447,195.534,115.448,191.75,111.689z\"\n      />\n    </svg>\n    <!-- </editor-fold> -->\n  </span>\n</button>\n", dependencies: [{ kind: "component", type: i3.OwlCalendarBodyComponent, selector: "[owl-date-time-calendar-body]", inputs: ["activeCell", "rows", "numCols", "cellRatio", "todayValue", "selectedValues", "selectMode"], outputs: ["select"], exportAs: ["owlDateTimeCalendarBody"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlMultiYearViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'owl-date-time-multi-year-view', host: {
                        '[class.owl-dt-calendar-view]': 'owlDTCalendarView',
                        '[class.owl-dt-calendar-multi-year-view]': 'owlDTCalendarMultiYearView',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n  [disabled]=\"!previousEnabled()\"\n  [attr.aria-label]=\"prevButtonLabel\"\n  type=\"button\"\n  tabindex=\"0\"\n  (click)=\"prevYearList($event)\"\n>\n  <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n    <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\n    <svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      version=\"1.1\"\n      x=\"0px\"\n      y=\"0px\"\n      viewBox=\"0 0 250.738 250.738\"\n      style=\"enable-background: new 0 0 250.738 250.738\"\n      xml:space=\"preserve\"\n      width=\"100%\"\n      height=\"100%\"\n    >\n      <path\n        style=\"fill-rule: evenodd; clip-rule: evenodd\"\n        d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"\n      />\n    </svg>\n    <!-- </editor-fold> -->\n  </span>\n</button>\n<table class=\"owl-dt-calendar-table owl-dt-calendar-multi-year-table\">\n  <thead class=\"owl-dt-calendar-header\">\n    <tr>\n      <th colspan=\"3\">{{ tableHeader }}</th>\n    </tr>\n  </thead>\n  <tbody\n    owl-date-time-calendar-body\n    role=\"grid\"\n    [rows]=\"years\"\n    [numCols]=\"3\"\n    [cellRatio]=\"3 / 7\"\n    [activeCell]=\"activeCell\"\n    [todayValue]=\"todayYear\"\n    [selectedValues]=\"selectedYears\"\n    [selectMode]=\"selectMode\"\n    (keydown)=\"handleCalendarKeydown($event)\"\n    (select)=\"selectCalendarCell($event)\"\n  ></tbody>\n</table>\n<button\n  class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n  [disabled]=\"!nextEnabled()\"\n  [attr.aria-label]=\"nextButtonLabel\"\n  type=\"button\"\n  tabindex=\"0\"\n  (click)=\"nextYearList($event)\"\n>\n  <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n    <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\n    <svg\n      version=\"1.1\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      x=\"0px\"\n      y=\"0px\"\n      viewBox=\"0 0 250.738 250.738\"\n      style=\"enable-background: new 0 0 250.738 250.738\"\n      xml:space=\"preserve\"\n    >\n      <path\n        style=\"fill-rule: evenodd; clip-rule: evenodd\"\n        d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                C197.237,120.447,195.534,115.448,191.75,111.689z\"\n      />\n    </svg>\n    <!-- </editor-fold> -->\n  </span>\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.OwlDateTimeIntl }, { type: i2.DateTimeAdapter, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { selectMode: [{
                type: Input
            }], selected: [{
                type: Input
            }], selecteds: [{
                type: Input
            }], pickerMoment: [{
                type: Input
            }], dateFilter: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], change: [{
                type: Output
            }], yearSelected: [{
                type: Output
            }], pickerMomentChange: [{
                type: Output
            }], keyboardEnter: [{
                type: Output
            }], calendarBodyElm: [{
                type: ViewChild,
                args: [OwlCalendarBodyComponent, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbXVsdGkteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL2NhbGVuZGFyLW11bHRpLXllYXItdmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEdBQ1QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7QUFJbkYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQztBQUMvQixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBWTNCLE1BQU0sT0FBTyx5QkFBeUI7SUErTHBDLFlBQ1UsS0FBd0IsRUFDeEIsVUFBMkIsRUFDZixlQUFtQztRQUYvQyxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUNmLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQWpNekQ7O1dBRUc7UUFDSyxnQkFBVyxHQUFlLFFBQVEsQ0FBQztRQStCbkMsZUFBVSxHQUFRLEVBQUUsQ0FBQztRQTJGckIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQXFDMUI7O1dBRUc7UUFDZ0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFLLENBQUM7UUFFbEQ7O1dBRUc7UUFDZ0IsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDO1FBRXhELHdDQUF3QztRQUNyQix1QkFBa0IsR0FBb0IsSUFBSSxZQUFZLEVBQUssQ0FBQztRQUUvRSw4REFBOEQ7UUFDM0Msa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQWtCM0UsQ0FBQztJQTlMSixJQUNJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksVUFBVSxDQUFDLEdBQWU7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBSUQsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFlO1FBQzFCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMvRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFHRCxJQUNJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksU0FBUyxDQUFDLE1BQVc7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQy9CLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBR0QsSUFDSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLFlBQVksQ0FBQyxLQUFRO1FBQ3ZCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDckMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTVFLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDMUYsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBTUQsSUFDSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQyxNQUE0QjtRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBSUQsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFlO1FBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUlELElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsS0FBZTtRQUN6QixLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUdELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBR0QsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFJRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxDQUNMLElBQUksQ0FBQyxVQUFVLEtBQUssT0FBTztZQUMzQixJQUFJLENBQUMsVUFBVSxLQUFLLFdBQVc7WUFDL0IsSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQzlCLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLE1BQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUNoRCxFQUFFLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDO0lBQzVDLENBQUM7SUFzQkQsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsSUFBSSwwQkFBMEI7UUFDNUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBUU0sUUFBUSxLQUFJLENBQUM7SUFFYixrQkFBa0I7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0JBQWtCLENBQUMsSUFBa0I7UUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVPLFVBQVUsQ0FBQyxJQUFZO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUN0RCxJQUFJLEVBQ0osSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUNoRCxDQUFDLENBQ0YsQ0FBQztRQUNGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM3RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FDOUMsSUFBSSxFQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQ3RFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUNsRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQ25ELENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxZQUFZLENBQUMsS0FBVTtRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQ3hELElBQUksQ0FBQyxZQUFZLEVBQ2pCLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQy9CLENBQUM7UUFDRixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksWUFBWSxDQUFDLEtBQVU7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUN4RCxJQUFJLENBQUMsWUFBWSxFQUNqQixTQUFTLEdBQUcsYUFBYSxDQUMxQixDQUFDO1FBQ0YsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxnQkFBZ0I7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFakIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUUsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLEdBQUcsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLENBQUM7UUFFOUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFFZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxNQUFNLElBQUksR0FBRyxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3BCO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFFRCxPQUFPO0lBQ1QsQ0FBQztJQUVELHFEQUFxRDtJQUM5QyxlQUFlO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELGlEQUFpRDtJQUMxQyxXQUFXO1FBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRU0scUJBQXFCLENBQUMsS0FBb0I7UUFDL0MsSUFBSSxNQUFNLENBQUM7UUFDWCxRQUFRLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDckIsZUFBZTtZQUNmLEtBQUssVUFBVTtnQkFDYixNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFFUixhQUFhO1lBQ2IsS0FBSyxXQUFXO2dCQUNkLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFFUixnQkFBZ0I7WUFDaEIsS0FBSyxRQUFRO2dCQUNYLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUM7Z0JBQ3ZGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFFUixjQUFjO1lBQ2QsS0FBSyxVQUFVO2dCQUNiLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2xGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFFUix3Q0FBd0M7WUFDeEMsS0FBSyxJQUFJO2dCQUNQLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUM1QyxJQUFJLENBQUMsYUFBYSxFQUNsQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsQ0FDaEYsQ0FBQztnQkFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQyxNQUFNO1lBRVIsdUNBQXVDO1lBQ3ZDLEtBQUssR0FBRztnQkFDTixNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FDNUMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsYUFBYSxHQUFHLFNBQVM7b0JBQ3ZCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUFDO29CQUNoRixDQUFDLENBQ0osQ0FBQztnQkFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQyxNQUFNO1lBRVIsdUNBQXVDO1lBQ3ZDLEtBQUssT0FBTztnQkFDVixNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FDNUMsSUFBSSxDQUFDLFlBQVksRUFDakIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUNwRixDQUFDO2dCQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFFUixxQ0FBcUM7WUFDckMsS0FBSyxTQUFTO2dCQUNaLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUM1QyxJQUFJLENBQUMsWUFBWSxFQUNqQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQzVFLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckMsTUFBTTtZQUVSLEtBQUssS0FBSztnQkFDUixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQixNQUFNO1lBRVI7Z0JBQ0UsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDSyxjQUFjLENBQUMsSUFBWTtRQUNqQyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sU0FBUyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDeEMsT0FBTyxJQUFJLFlBQVksQ0FDckIsSUFBSSxFQUNKLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDZixTQUFTLEVBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFDeEIsS0FBSyxFQUNMLFNBQVMsQ0FDVixDQUFDO0lBQ0osQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUV6QixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0RTtRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2xELElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzFDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQy9DO3FCQUFNO29CQUNMLE9BQU8sSUFBSSxDQUFDO2lCQUNiO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCx5Q0FBeUM7SUFDakMsYUFBYSxDQUFDLElBQVk7UUFDaEMsaUVBQWlFO1FBQ2pFLElBQ0UsSUFBSSxLQUFLLFNBQVM7WUFDbEIsSUFBSSxLQUFLLElBQUk7WUFDYixDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUNuRTtZQUNBLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCwwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFaEUsZ0VBQWdFO1FBQ2hFLEtBQ0UsSUFBSSxJQUFJLEdBQUcsV0FBVyxFQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQzNDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ3BEO1lBQ0EsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6QixPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTyxjQUFjLENBQUMsS0FBUSxFQUFFLEtBQVE7UUFDdkMsT0FBTyxDQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUM5RSxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ssWUFBWSxDQUFDLEdBQVE7UUFDM0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDbEYsQ0FBQyxDQUFDLEdBQUc7WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1gsQ0FBQztJQUVPLGVBQWU7UUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QyxDQUFDOztzSEF0Y1UseUJBQXlCOzBHQUF6Qix5QkFBeUIscWtCQW9MekIsd0JBQXdCLDhEQzdOckMsd3pGQWlGQTsyRkR4Q2EseUJBQXlCO2tCQVZyQyxTQUFTOytCQUNFLCtCQUErQixRQUduQzt3QkFDSiw4QkFBOEIsRUFBRSxtQkFBbUI7d0JBQ25ELHlDQUF5QyxFQUFFLDRCQUE0QjtxQkFDeEUsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU07OzBCQW9NNUMsUUFBUTs0Q0E1TFAsVUFBVTtzQkFEYixLQUFLO2dCQWdCRixRQUFRO3NCQURYLEtBQUs7Z0JBaUJGLFNBQVM7c0JBRFosS0FBSztnQkFlRixZQUFZO3NCQURmLEtBQUs7Z0JBb0JGLFVBQVU7c0JBRGIsS0FBSztnQkFlRixPQUFPO3NCQURWLEtBQUs7Z0JBZ0JGLE9BQU87c0JBRFYsS0FBSztnQkFvRWEsTUFBTTtzQkFBeEIsTUFBTTtnQkFLWSxZQUFZO3NCQUE5QixNQUFNO2dCQUdZLGtCQUFrQjtzQkFBcEMsTUFBTTtnQkFHWSxhQUFhO3NCQUEvQixNQUFNO2dCQUlQLGVBQWU7c0JBRGQsU0FBUzt1QkFBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBET1dOX0FSUk9XLFxuICBFTkQsXG4gIEVOVEVSLFxuICBIT01FLFxuICBMRUZUX0FSUk9XLFxuICBQQUdFX0RPV04sXG4gIFBBR0VfVVAsXG4gIFJJR0hUX0FSUk9XLFxuICBVUF9BUlJPVyxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IENhbGVuZGFyQ2VsbCwgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XG5cbmV4cG9ydCBjb25zdCBZRUFSU19QRVJfUk9XID0gMztcbmV4cG9ydCBjb25zdCBZRUFSX1JPV1MgPSA3O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLW11bHRpLXllYXItdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLXZpZXddJzogJ293bERUQ2FsZW5kYXJWaWV3JyxcbiAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXddJzogJ293bERUQ2FsZW5kYXJNdWx0aVllYXJWaWV3JyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE93bE11bHRpWWVhclZpZXdDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xuICAvKipcbiAgICogVGhlIHNlbGVjdCBtb2RlIG9mIHRoZSBwaWNrZXI7XG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3RNb2RlOiBTZWxlY3RNb2RlID0gJ3NpbmdsZSc7XG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlO1xuICB9XG5cbiAgc2V0IHNlbGVjdE1vZGUodmFsOiBTZWxlY3RNb2RlKSB7XG4gICAgdGhpcy5fc2VsZWN0TW9kZSA9IHZhbDtcbiAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRZZWFycygpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICBwcml2YXRlIF9zZWxlY3RlZDogVCB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZCgpOiBUIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgIGNvbnN0IG9sZFNlbGVjdGVkID0gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG5cbiAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNhbWVEYXRlKG9sZFNlbGVjdGVkLCB0aGlzLl9zZWxlY3RlZCkpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRZZWFycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZHMoKTogVFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkcyA9IHZhbHVlcy5tYXAodiA9PiB7XG4gICAgICB2ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodik7XG4gICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGUodik7XG4gICAgfSk7XG4gICAgdGhpcy5zZXRTZWxlY3RlZFllYXJzKCk7XG4gIH1cblxuICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQgfCBudWxsO1xuICBASW5wdXQoKVxuICBnZXQgcGlja2VyTW9tZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9waWNrZXJNb21lbnQ7XG4gIH1cblxuICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XG4gICAgY29uc3Qgb2xkTW9tZW50ID0gdGhpcy5fcGlja2VyTW9tZW50O1xuICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIHRoaXMuX3BpY2tlck1vbWVudCA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcblxuICAgIGlmIChvbGRNb21lbnQgJiYgdGhpcy5fcGlja2VyTW9tZW50ICYmICF0aGlzLmlzU2FtZVllYXJMaXN0KG9sZE1vbWVudCwgdGhpcy5fcGlja2VyTW9tZW50KSkge1xuICAgICAgdGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGVcbiAgICovXG4gIHByaXZhdGUgX2RhdGVGaWx0ZXI6IChkYXRlOiBUKSA9PiBib29sZWFuO1xuICBASW5wdXQoKVxuICBnZXQgZGF0ZUZpbHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZUZpbHRlcjtcbiAgfVxuXG4gIHNldCBkYXRlRmlsdGVyKGZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kYXRlRmlsdGVyID0gZmlsdGVyO1xuICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgdGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfbWluRGF0ZTogVCB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIGdldCBtaW5EYXRlKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgfVxuXG4gIHNldCBtaW5EYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICBwcml2YXRlIF9tYXhEYXRlOiBUIHwgbnVsbDtcbiAgQElucHV0KClcbiAgZ2V0IG1heERhdGUoKTogVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICB9XG5cbiAgc2V0IG1heERhdGUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvZGF5WWVhcjogbnVtYmVyO1xuICBnZXQgdG9kYXlZZWFyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RvZGF5WWVhcjtcbiAgfVxuXG4gIHByaXZhdGUgX3llYXJzOiBDYWxlbmRhckNlbGxbXVtdO1xuICBnZXQgeWVhcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3llYXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRZZWFyczogbnVtYmVyW107XG4gIGdldCBzZWxlY3RlZFllYXJzKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRZZWFycztcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhdGVkID0gZmFsc2U7XG5cbiAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnO1xuICB9XG5cbiAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxuICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxuICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VUbydcbiAgICApO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZUNlbGwoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX3BpY2tlck1vbWVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KSAlIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgdGFibGVIZWFkZXIoKTogc3RyaW5nIHwgdm9pZCB7XG4gICAgaWYgKHRoaXMuX3llYXJzICYmIHRoaXMuX3llYXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLl95ZWFyc1swXVswXS5kaXNwbGF5VmFsdWV9IC0gJHtcbiAgICAgICAgdGhpcy5feWVhcnNbWUVBUl9ST1dTIC0gMV1bWUVBUlNfUEVSX1JPVyAtIDFdLmRpc3BsYXlWYWx1ZVxuICAgICAgfWA7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHByZXZCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBpY2tlckludGwucHJldk11bHRpWWVhckxhYmVsO1xuICB9XG5cbiAgZ2V0IG5leHRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBpY2tlckludGwubmV4dE11bHRpWWVhckxhYmVsO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgbmV3IG1vbnRoIGlzIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhci4gVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgeWVhclNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHBpY2tlck1vbWVudENoYW5nZTogRXZlbnRFbWl0dGVyPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHVzZSBrZXlib2FyZCBlbnRlciB0byBzZWxlY3QgYSBjYWxlbmRhciBjZWxsICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBrZXlib2FyZEVudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qKiBUaGUgYm9keSBvZiBjYWxlbmRhciB0YWJsZSAqL1xuICBAVmlld0NoaWxkKE93bENhbGVuZGFyQm9keUNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgY2FsZW5kYXJCb2R5RWxtOiBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQ7XG5cbiAgZ2V0IG93bERUQ2FsZW5kYXJWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0IG93bERUQ2FsZW5kYXJNdWx0aVllYXJWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBwaWNrZXJJbnRsOiBPd2xEYXRlVGltZUludGwsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl90b2RheVllYXIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpKTtcbiAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcbiAgICB0aGlzLmluaXRpYXRlZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGEgY2FsZW5kYXJDZWxsIHNlbGVjdGVkXG4gICAqL1xuICBwdWJsaWMgc2VsZWN0Q2FsZW5kYXJDZWxsKGNlbGw6IENhbGVuZGFyQ2VsbCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0WWVhcihjZWxsLnZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0WWVhcih5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnllYXJTZWxlY3RlZC5lbWl0KHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgMCwgMSkpO1xuICAgIGNvbnN0IGZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgeWVhcixcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIDEsXG4gICAgKTtcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKGZpcnN0RGF0ZU9mTW9udGgpO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgIHllYXIsXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICBNYXRoLm1pbihkYXlzSW5Nb250aCwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnBpY2tlck1vbWVudCkpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICApO1xuXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChzZWxlY3RlZCk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgdGhlIHByZXZpb3VzIHllYXIgbGlzdFxuICAgKi9cbiAgcHVibGljIHByZXZZZWFyTGlzdChldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fcGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgLTEgKiBZRUFSX1JPV1MgKiBZRUFSU19QRVJfUk9XLFxuICAgICk7XG4gICAgdGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSB0aGUgbmV4dCB5ZWFyIGxpc3RcbiAgICovXG4gIHB1YmxpYyBuZXh0WWVhckxpc3QoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3BpY2tlck1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgIFlFQVJfUk9XUyAqIFlFQVJTX1BFUl9ST1csXG4gICAgKTtcbiAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgcHVibGljIGdlbmVyYXRlWWVhckxpc3QoKTogdm9pZCB7XG4gICAgdGhpcy5feWVhcnMgPSBbXTtcblxuICAgIGNvbnN0IHBpY2tlck1vbWVudFllYXIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuX3BpY2tlck1vbWVudCk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gcGlja2VyTW9tZW50WWVhciAlIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgWUVBUl9ST1dTOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFlFQVJTX1BFUl9ST1c7IGorKykge1xuICAgICAgICBjb25zdCB5ZWFyID0gcGlja2VyTW9tZW50WWVhciAtIG9mZnNldCArIChqICsgaSAqIFlFQVJTX1BFUl9ST1cpO1xuICAgICAgICBjb25zdCB5ZWFyQ2VsbCA9IHRoaXMuY3JlYXRlWWVhckNlbGwoeWVhcik7XG4gICAgICAgIHJvdy5wdXNoKHllYXJDZWxsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5feWVhcnMucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBwcmV2aW91cyBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXG4gIHB1YmxpYyBwcmV2aW91c0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLm1pbkRhdGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gIXRoaXMubWluRGF0ZSB8fCAhdGhpcy5pc1NhbWVZZWFyTGlzdCh0aGlzLl9waWNrZXJNb21lbnQsIHRoaXMubWluRGF0ZSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbmV4dCBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXG4gIHB1YmxpYyBuZXh0RW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMubWF4RGF0ZSB8fCAhdGhpcy5pc1NhbWVZZWFyTGlzdCh0aGlzLl9waWNrZXJNb21lbnQsIHRoaXMubWF4RGF0ZSk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2FsZW5kYXJLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgbGV0IG1vbWVudDtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIC8vIG1pbnVzIDEgeWVhclxuICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX3BpY2tlck1vbWVudCwgLTEpO1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBhZGQgMSB5ZWFyXG4gICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX3BpY2tlck1vbWVudCwgMSk7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIG1pbnVzIDMgeWVhcnNcbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fcGlja2VyTW9tZW50LCAtMSAqIFlFQVJTX1BFUl9ST1cpO1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBhZGQgMyB5ZWFyc1xuICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX3BpY2tlck1vbWVudCwgWUVBUlNfUEVSX1JPVyk7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIGdvIHRvIHRoZSBmaXJzdCB5ZWFyIG9mIHRoZSB5ZWFyIHBhZ2VcbiAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQsXG4gICAgICAgICAgLXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KSAlIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gZ28gdG8gdGhlIGxhc3QgeWVhciBvZiB0aGUgeWVhciBwYWdlXG4gICAgICBjYXNlIEVORDpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQsXG4gICAgICAgICAgWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUyAtXG4gICAgICAgICAgICAodGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9waWNrZXJNb21lbnQpICUgKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpKSAtXG4gICAgICAgICAgICAxLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBtaW51cyAxIHllYXIgcGFnZSAob3IgMTAgeWVhciBwYWdlcylcbiAgICAgIGNhc2UgUEFHRV9VUDpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICBldmVudC5hbHRLZXkgPyAtMTAgKiAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykgOiAtMSAqIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gYWRkIDEgeWVhciBwYWdlIChvciAxMCB5ZWFyIHBhZ2VzKVxuICAgICAgY2FzZSBQQUdFX0RPV046XG4gICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgZXZlbnQuYWx0S2V5ID8gMTAgKiAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykgOiBZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVOVEVSOlxuICAgICAgICB0aGlzLnNlbGVjdFllYXIodGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9waWNrZXJNb21lbnQpKTtcbiAgICAgICAgdGhpcy5rZXlib2FyZEVudGVyLmVtaXQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBDYWxlbmRhckNlbGwgZm9yIHRoZSBnaXZlbiB5ZWFyLlxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVZZWFyQ2VsbCh5ZWFyOiBudW1iZXIpOiBDYWxlbmRhckNlbGwge1xuICAgIGNvbnN0IHN0YXJ0RGF0ZU9mWWVhciA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgMCwgMSk7XG4gICAgY29uc3QgYXJpYUxhYmVsID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhck5hbWUoc3RhcnREYXRlT2ZZZWFyKTtcbiAgICBjb25zdCBjZWxsQ2xhc3MgPSAnb3dsLWR0LXllYXItJyArIHllYXI7XG4gICAgcmV0dXJuIG5ldyBDYWxlbmRhckNlbGwoXG4gICAgICB5ZWFyLFxuICAgICAgeWVhci50b1N0cmluZygpLFxuICAgICAgYXJpYUxhYmVsLFxuICAgICAgdGhpcy5pc1llYXJFbmFibGVkKHllYXIpLFxuICAgICAgZmFsc2UsXG4gICAgICBjZWxsQ2xhc3MsXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0U2VsZWN0ZWRZZWFycygpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3RlZFllYXJzID0gW107XG5cbiAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSAmJiB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZFllYXJzWzBdID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlICYmIHRoaXMuc2VsZWN0ZWRzKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZFllYXJzID0gdGhpcy5zZWxlY3RlZHMubWFwKHNlbGVjdGVkID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQoc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoc2VsZWN0ZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgZ2l2ZW4geWVhciBpcyBlbmFibGVkLiAqL1xuICBwcml2YXRlIGlzWWVhckVuYWJsZWQoeWVhcjogbnVtYmVyKSB7XG4gICAgLy8gZGlzYWJsZSBpZiB0aGUgeWVhciBpcyBncmVhdGVyIHRoYW4gbWF4RGF0ZSBsb3dlciB0aGFuIG1pbkRhdGVcbiAgICBpZiAoXG4gICAgICB5ZWFyID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHllYXIgPT09IG51bGwgfHxcbiAgICAgICh0aGlzLm1heERhdGUgJiYgeWVhciA+IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5tYXhEYXRlKSkgfHxcbiAgICAgICh0aGlzLm1pbkRhdGUgJiYgeWVhciA8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5taW5EYXRlKSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBlbmFibGUgaWYgaXQgcmVhY2hlcyBoZXJlIGFuZCB0aGVyZSdzIG5vIGZpbHRlciBkZWZpbmVkXG4gICAgaWYgKCF0aGlzLmRhdGVGaWx0ZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0T2ZZZWFyID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZSh5ZWFyLCAwLCAxKTtcblxuICAgIC8vIElmIGFueSBkYXRlIGluIHRoZSB5ZWFyIGlzIGVuYWJsZWQgY291bnQgdGhlIHllYXIgYXMgZW5hYmxlZC5cbiAgICBmb3IgKFxuICAgICAgbGV0IGRhdGUgPSBmaXJzdE9mWWVhcjtcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZSkgPT09IHllYXI7XG4gICAgICBkYXRlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKGRhdGUsIDEpXG4gICAgKSB7XG4gICAgICBpZiAodGhpcy5kYXRlRmlsdGVyKGRhdGUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNTYW1lWWVhckxpc3QoZGF0ZTE6IFQsIGRhdGUyOiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIE1hdGguZmxvb3IodGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMSkgLyAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykpID09PVxuICAgICAgTWF0aC5mbG9vcih0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUyKSAvIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XG4gICAqL1xuICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgID8gb2JqXG4gICAgICA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICB0aGlzLmNhbGVuZGFyQm9keUVsbS5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgfVxufVxuIiwiPGJ1dHRvblxuICBjbGFzcz1cIm93bC1kdC1jb250cm9sLWJ1dHRvbiBvd2wtZHQtY29udHJvbC1hcnJvdy1idXR0b25cIlxuICBbZGlzYWJsZWRdPVwiIXByZXZpb3VzRW5hYmxlZCgpXCJcbiAgW2F0dHIuYXJpYS1sYWJlbF09XCJwcmV2QnV0dG9uTGFiZWxcIlxuICB0eXBlPVwiYnV0dG9uXCJcbiAgdGFiaW5kZXg9XCIwXCJcbiAgKGNsaWNrKT1cInByZXZZZWFyTGlzdCgkZXZlbnQpXCJcbj5cbiAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udHJvbC1idXR0b24tY29udGVudFwiIHRhYmluZGV4PVwiLTFcIj5cbiAgICA8IS0tIDxlZGl0b3ItZm9sZCBkZXNjPVwiU1ZHIEFycm93IExlZnRcIj4gLS0+XG4gICAgPHN2Z1xuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxuICAgICAgdmVyc2lvbj1cIjEuMVwiXG4gICAgICB4PVwiMHB4XCJcbiAgICAgIHk9XCIwcHhcIlxuICAgICAgdmlld0JveD1cIjAgMCAyNTAuNzM4IDI1MC43MzhcIlxuICAgICAgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDogbmV3IDAgMCAyNTAuNzM4IDI1MC43MzhcIlxuICAgICAgeG1sOnNwYWNlPVwicHJlc2VydmVcIlxuICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgID5cbiAgICAgIDxwYXRoXG4gICAgICAgIHN0eWxlPVwiZmlsbC1ydWxlOiBldmVub2RkOyBjbGlwLXJ1bGU6IGV2ZW5vZGRcIlxuICAgICAgICBkPVwiTTk2LjYzMywxMjUuMzY5bDk1LjA1My05NC41MzNjNy4xMDEtNy4wNTUsNy4xMDEtMTguNDkyLDAtMjUuNTQ2ICAgYy03LjEtNy4wNTQtMTguNjEzLTcuMDU0LTI1LjcxNCwwTDU4Ljk4OSwxMTEuNjg5Yy0zLjc4NCwzLjc1OS01LjQ4Nyw4Ljc1OS01LjIzOCwxMy42OGMtMC4yNDksNC45MjIsMS40NTQsOS45MjEsNS4yMzgsMTMuNjgxICAgbDEwNi45ODMsMTA2LjM5OGM3LjEwMSw3LjA1NSwxOC42MTMsNy4wNTUsMjUuNzE0LDBjNy4xMDEtNy4wNTQsNy4xMDEtMTguNDkxLDAtMjUuNTQ0TDk2LjYzMywxMjUuMzY5elwiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICAgIDwhLS0gPC9lZGl0b3ItZm9sZD4gLS0+XG4gIDwvc3Bhbj5cbjwvYnV0dG9uPlxuPHRhYmxlIGNsYXNzPVwib3dsLWR0LWNhbGVuZGFyLXRhYmxlIG93bC1kdC1jYWxlbmRhci1tdWx0aS15ZWFyLXRhYmxlXCI+XG4gIDx0aGVhZCBjbGFzcz1cIm93bC1kdC1jYWxlbmRhci1oZWFkZXJcIj5cbiAgICA8dHI+XG4gICAgICA8dGggY29sc3Bhbj1cIjNcIj57eyB0YWJsZUhlYWRlciB9fTwvdGg+XG4gICAgPC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5XG4gICAgb3dsLWRhdGUtdGltZS1jYWxlbmRhci1ib2R5XG4gICAgcm9sZT1cImdyaWRcIlxuICAgIFtyb3dzXT1cInllYXJzXCJcbiAgICBbbnVtQ29sc109XCIzXCJcbiAgICBbY2VsbFJhdGlvXT1cIjMgLyA3XCJcbiAgICBbYWN0aXZlQ2VsbF09XCJhY3RpdmVDZWxsXCJcbiAgICBbdG9kYXlWYWx1ZV09XCJ0b2RheVllYXJcIlxuICAgIFtzZWxlY3RlZFZhbHVlc109XCJzZWxlY3RlZFllYXJzXCJcbiAgICBbc2VsZWN0TW9kZV09XCJzZWxlY3RNb2RlXCJcbiAgICAoa2V5ZG93bik9XCJoYW5kbGVDYWxlbmRhcktleWRvd24oJGV2ZW50KVwiXG4gICAgKHNlbGVjdCk9XCJzZWxlY3RDYWxlbmRhckNlbGwoJGV2ZW50KVwiXG4gID48L3Rib2R5PlxuPC90YWJsZT5cbjxidXR0b25cbiAgY2xhc3M9XCJvd2wtZHQtY29udHJvbC1idXR0b24gb3dsLWR0LWNvbnRyb2wtYXJyb3ctYnV0dG9uXCJcbiAgW2Rpc2FibGVkXT1cIiFuZXh0RW5hYmxlZCgpXCJcbiAgW2F0dHIuYXJpYS1sYWJlbF09XCJuZXh0QnV0dG9uTGFiZWxcIlxuICB0eXBlPVwiYnV0dG9uXCJcbiAgdGFiaW5kZXg9XCIwXCJcbiAgKGNsaWNrKT1cIm5leHRZZWFyTGlzdCgkZXZlbnQpXCJcbj5cbiAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udHJvbC1idXR0b24tY29udGVudFwiIHRhYmluZGV4PVwiLTFcIj5cbiAgICA8IS0tIDxlZGl0b3ItZm9sZCBkZXNjPVwiU1ZHIEFycm93IFJpZ2h0XCI+IC0tPlxuICAgIDxzdmdcbiAgICAgIHZlcnNpb249XCIxLjFcIlxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxuICAgICAgeD1cIjBweFwiXG4gICAgICB5PVwiMHB4XCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjUwLjczOCAyNTAuNzM4XCJcbiAgICAgIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6IG5ldyAwIDAgMjUwLjczOCAyNTAuNzM4XCJcbiAgICAgIHhtbDpzcGFjZT1cInByZXNlcnZlXCJcbiAgICA+XG4gICAgICA8cGF0aFxuICAgICAgICBzdHlsZT1cImZpbGwtcnVsZTogZXZlbm9kZDsgY2xpcC1ydWxlOiBldmVub2RkXCJcbiAgICAgICAgZD1cIk0xOTEuNzUsMTExLjY4OUw4NC43NjYsNS4yOTFjLTcuMS03LjA1NS0xOC42MTMtNy4wNTUtMjUuNzEzLDBcbiAgICAgICAgICAgICAgICBjLTcuMTAxLDcuMDU0LTcuMTAxLDE4LjQ5LDAsMjUuNTQ0bDk1LjA1Myw5NC41MzRsLTk1LjA1Myw5NC41MzNjLTcuMTAxLDcuMDU0LTcuMTAxLDE4LjQ5MSwwLDI1LjU0NVxuICAgICAgICAgICAgICAgIGM3LjEsNy4wNTQsMTguNjEzLDcuMDU0LDI1LjcxMywwTDE5MS43NSwxMzkuMDVjMy43ODQtMy43NTksNS40ODctOC43NTksNS4yMzgtMTMuNjgxXG4gICAgICAgICAgICAgICAgQzE5Ny4yMzcsMTIwLjQ0NywxOTUuNTM0LDExNS40NDgsMTkxLjc1LDExMS42ODl6XCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gICAgPCEtLSA8L2VkaXRvci1mb2xkPiAtLT5cbiAgPC9zcGFuPlxuPC9idXR0b24+XG4iXX0=