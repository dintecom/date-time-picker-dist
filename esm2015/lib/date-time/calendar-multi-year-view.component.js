/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-multi-year-view.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output, ViewChild } from '@angular/core';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
/** @type {?} */
export const YEARS_PER_ROW = 3;
/** @type {?} */
export const YEAR_ROWS = 7;
/**
 * @template T
 */
export class OwlMultiYearViewComponent {
    /**
     * @param {?} cdRef
     * @param {?} pickerIntl
     * @param {?} dateTimeAdapter
     */
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
        /**
         * Emits when any date is activated.
         */
        this.pickerMomentChange = new EventEmitter();
        /**
         * Emits when use keyboard enter to select a calendar cell
         */
        this.keyboardEnter = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get selectMode() {
        return this._selectMode;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set selectMode(val) {
        this._selectMode = val;
        if (this.initiated) {
            this.setSelectedYears();
            this.cdRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        /** @type {?} */
        const oldSelected = this._selected;
        value = this.dateTimeAdapter.deserialize(value);
        this._selected = this.getValidDate(value);
        if (!this.dateTimeAdapter.isSameDay(oldSelected, this._selected)) {
            this.setSelectedYears();
        }
    }
    /**
     * @return {?}
     */
    get selecteds() {
        return this._selecteds;
    }
    /**
     * @param {?} values
     * @return {?}
     */
    set selecteds(values) {
        this._selecteds = values.map((/**
         * @param {?} v
         * @return {?}
         */
        v => {
            v = this.dateTimeAdapter.deserialize(v);
            return this.getValidDate(v);
        }));
        this.setSelectedYears();
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
        /** @type {?} */
        const oldMoment = this._pickerMoment;
        value = this.dateTimeAdapter.deserialize(value);
        this._pickerMoment =
            this.getValidDate(value) || this.dateTimeAdapter.now();
        if (oldMoment &&
            this._pickerMoment &&
            !this.isSameYearList(oldMoment, this._pickerMoment)) {
            this.generateYearList();
        }
    }
    /**
     * @return {?}
     */
    get dateFilter() {
        return this._dateFilter;
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    set dateFilter(filter) {
        this._dateFilter = filter;
        if (this.initiated) {
            this.generateYearList();
        }
    }
    /**
     * @return {?}
     */
    get minDate() {
        return this._minDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._minDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateYearList();
        }
    }
    /**
     * @return {?}
     */
    get maxDate() {
        return this._maxDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._maxDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateYearList();
        }
    }
    /**
     * @return {?}
     */
    get todayYear() {
        return this._todayYear;
    }
    /**
     * @return {?}
     */
    get years() {
        return this._years;
    }
    /**
     * @return {?}
     */
    get selectedYears() {
        return this._selectedYears;
    }
    /**
     * @return {?}
     */
    get isInSingleMode() {
        return this.selectMode === 'single';
    }
    /**
     * @return {?}
     */
    get isInRangeMode() {
        return (this.selectMode === 'range' ||
            this.selectMode === 'rangeFrom' ||
            this.selectMode === 'rangeTo');
    }
    /**
     * @return {?}
     */
    get activeCell() {
        if (this._pickerMoment) {
            return (this.dateTimeAdapter.getYear(this._pickerMoment) %
                (YEARS_PER_ROW * YEAR_ROWS));
        }
    }
    /**
     * @return {?}
     */
    get tableHeader() {
        if (this._years && this._years.length > 0) {
            return `${this._years[0][0].displayValue} - ${this._years[YEAR_ROWS - 1][YEARS_PER_ROW - 1].displayValue}`;
        }
    }
    /**
     * @return {?}
     */
    get prevButtonLabel() {
        return this.pickerIntl.prevMultiYearLabel;
    }
    /**
     * @return {?}
     */
    get nextButtonLabel() {
        return this.pickerIntl.nextMultiYearLabel;
    }
    /**
     * @return {?}
     */
    get owlDTCalendarView() {
        return true;
    }
    /**
     * @return {?}
     */
    get owlDTCalendarMultiYearView() {
        return true;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._todayYear = this.dateTimeAdapter.getYear(this.dateTimeAdapter.now());
        this.generateYearList();
        this.initiated = true;
    }
    /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    selectCalendarCell(cell) {
        this.selectYear(cell.value);
    }
    /**
     * @private
     * @param {?} year
     * @return {?}
     */
    selectYear(year) {
        this.yearSelected.emit(this.dateTimeAdapter.createDate(year, 0, 1));
        /** @type {?} */
        const firstDateOfMonth = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), 1);
        /** @type {?} */
        const daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
        /** @type {?} */
        const selected = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.change.emit(selected);
    }
    /**
     * Generate the previous year list
     * @param {?} event
     * @return {?}
     */
    prevYearList(event) {
        this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1 * YEAR_ROWS * YEARS_PER_ROW);
        this.generateYearList();
        event.preventDefault();
    }
    /**
     * Generate the next year list
     * @param {?} event
     * @return {?}
     */
    nextYearList(event) {
        this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, YEAR_ROWS * YEARS_PER_ROW);
        this.generateYearList();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    generateYearList() {
        this._years = [];
        /** @type {?} */
        const pickerMomentYear = this.dateTimeAdapter.getYear(this._pickerMoment);
        /** @type {?} */
        const offset = pickerMomentYear % (YEARS_PER_ROW * YEAR_ROWS);
        for (let i = 0; i < YEAR_ROWS; i++) {
            /** @type {?} */
            const row = [];
            for (let j = 0; j < YEARS_PER_ROW; j++) {
                /** @type {?} */
                const year = pickerMomentYear - offset + (j + i * YEARS_PER_ROW);
                /** @type {?} */
                const yearCell = this.createYearCell(year);
                row.push(yearCell);
            }
            this._years.push(row);
        }
        return;
    }
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    previousEnabled() {
        if (!this.minDate) {
            return true;
        }
        return (!this.minDate ||
            !this.isSameYearList(this._pickerMoment, this.minDate));
    }
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    nextEnabled() {
        return (!this.maxDate ||
            !this.isSameYearList(this._pickerMoment, this.maxDate));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleCalendarKeydown(event) {
        /** @type {?} */
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
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -this.dateTimeAdapter.getYear(this._pickerMoment) %
                    (YEARS_PER_ROW * YEAR_ROWS));
                this.pickerMomentChange.emit(moment);
                break;
            // go to the last year of the year page
            case END:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, YEARS_PER_ROW * YEAR_ROWS -
                    (this.dateTimeAdapter.getYear(this._pickerMoment) %
                        (YEARS_PER_ROW * YEAR_ROWS)) -
                    1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 year page (or 10 year pages)
            case PAGE_UP:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey
                    ? -10 * (YEARS_PER_ROW * YEAR_ROWS)
                    : -1 * (YEARS_PER_ROW * YEAR_ROWS));
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 year page (or 10 year pages)
            case PAGE_DOWN:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey
                    ? 10 * (YEARS_PER_ROW * YEAR_ROWS)
                    : YEARS_PER_ROW * YEAR_ROWS);
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
     * @private
     * @param {?} year
     * @return {?}
     */
    createYearCell(year) {
        /** @type {?} */
        const startDateOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
        /** @type {?} */
        const ariaLabel = this.dateTimeAdapter.getYearName(startDateOfYear);
        /** @type {?} */
        const cellClass = 'owl-dt-year-' + year;
        return new CalendarCell(year, year.toString(), ariaLabel, this.isYearEnabled(year), false, cellClass);
    }
    /**
     * @private
     * @return {?}
     */
    setSelectedYears() {
        this._selectedYears = [];
        if (this.isInSingleMode && this.selected) {
            this._selectedYears[0] = this.dateTimeAdapter.getYear(this.selected);
        }
        if (this.isInRangeMode && this.selecteds) {
            this._selectedYears = this.selecteds.map((/**
             * @param {?} selected
             * @return {?}
             */
            selected => {
                if (this.dateTimeAdapter.isValid(selected)) {
                    return this.dateTimeAdapter.getYear(selected);
                }
                else {
                    return null;
                }
            }));
        }
    }
    /**
     * Whether the given year is enabled.
     * @private
     * @param {?} year
     * @return {?}
     */
    isYearEnabled(year) {
        // disable if the year is greater than maxDate lower than minDate
        if (year === undefined ||
            year === null ||
            (this.maxDate &&
                year > this.dateTimeAdapter.getYear(this.maxDate)) ||
            (this.minDate && year < this.dateTimeAdapter.getYear(this.minDate))) {
            return false;
        }
        // enable if it reaches here and there's no filter defined
        if (!this.dateFilter) {
            return true;
        }
        /** @type {?} */
        const firstOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
        // If any date in the year is enabled count the year as enabled.
        for (let date = firstOfYear; this.dateTimeAdapter.getYear(date) === year; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    isSameYearList(date1, date2) {
        return (Math.floor(this.dateTimeAdapter.getYear(date1) /
            (YEARS_PER_ROW * YEAR_ROWS)) ===
            Math.floor(this.dateTimeAdapter.getYear(date2) /
                (YEARS_PER_ROW * YEAR_ROWS)));
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
    /**
     * @private
     * @return {?}
     */
    focusActiveCell() {
        this.calendarBodyElm.focusActiveCell();
    }
}
OwlMultiYearViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-date-time-multi-year-view',
                template: "<button\n    class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n    [disabled]=\"!previousEnabled()\"\n    [attr.aria-label]=\"prevButtonLabel\"\n    type=\"button\"\n    tabindex=\"0\"\n    (click)=\"prevYearList($event)\"\n>\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\n        <svg\n            xmlns=\"http://www.w3.org/2000/svg\"\n            xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n            version=\"1.1\"\n            x=\"0px\"\n            y=\"0px\"\n            viewBox=\"0 0 250.738 250.738\"\n            style=\"enable-background:new 0 0 250.738 250.738;\"\n            xml:space=\"preserve\"\n            width=\"100%\"\n            height=\"100%\"\n        >\n            <path\n                style=\"fill-rule: evenodd; clip-rule: evenodd;\"\n                d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"\n            />\n        </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n<table class=\"owl-dt-calendar-table owl-dt-calendar-multi-year-table\">\n    <thead class=\"owl-dt-calendar-header\">\n        <tr>\n            <th colspan=\"3\">{{ tableHeader }}</th>\n        </tr>\n    </thead>\n    <tbody\n        owl-date-time-calendar-body\n        role=\"grid\"\n        [rows]=\"years\"\n        [numCols]=\"3\"\n        [cellRatio]=\"3 / 7\"\n        [activeCell]=\"activeCell\"\n        [todayValue]=\"todayYear\"\n        [selectedValues]=\"selectedYears\"\n        [selectMode]=\"selectMode\"\n        (keydown)=\"handleCalendarKeydown($event)\"\n        (select)=\"selectCalendarCell($event)\"\n    ></tbody>\n</table>\n<button\n    class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n    [disabled]=\"!nextEnabled()\"\n    [attr.aria-label]=\"nextButtonLabel\"\n    type=\"button\"\n    tabindex=\"0\"\n    (click)=\"nextYearList($event)\"\n>\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\n        <svg\n            version=\"1.1\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n            xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n            x=\"0px\"\n            y=\"0px\"\n            viewBox=\"0 0 250.738 250.738\"\n            style=\"enable-background:new 0 0 250.738 250.738;\"\n            xml:space=\"preserve\"\n        >\n            <path\n                style=\"fill-rule:evenodd;clip-rule:evenodd;\"\n                d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                C197.237,120.447,195.534,115.448,191.75,111.689z\"\n            />\n        </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n",
                host: {
                    '[class.owl-dt-calendar-view]': 'owlDTCalendarView',
                    '[class.owl-dt-calendar-multi-year-view]': 'owlDTCalendarMultiYearView'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
OwlMultiYearViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: OwlDateTimeIntl },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] }
];
OwlMultiYearViewComponent.propDecorators = {
    selectMode: [{ type: Input }],
    selected: [{ type: Input }],
    selecteds: [{ type: Input }],
    pickerMoment: [{ type: Input }],
    dateFilter: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    change: [{ type: Output }],
    yearSelected: [{ type: Output }],
    pickerMomentChange: [{ type: Output }],
    keyboardEnter: [{ type: Output }],
    calendarBodyElm: [{ type: ViewChild, args: [OwlCalendarBodyComponent, { static: true },] }]
};
if (false) {
    /**
     * The select mode of the picker;
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._selectMode;
    /**
     * The currently selected date.
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._pickerMoment;
    /**
     * A function used to filter which dates are selectable
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._dateFilter;
    /**
     * The minimum selectable date.
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._minDate;
    /**
     * The maximum selectable date.
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._todayYear;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._years;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._selectedYears;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype.initiated;
    /**
     * Callback to invoke when a new month is selected
     * @type {?}
     */
    OwlMultiYearViewComponent.prototype.change;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     * @type {?}
     */
    OwlMultiYearViewComponent.prototype.yearSelected;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    OwlMultiYearViewComponent.prototype.pickerMomentChange;
    /**
     * Emits when use keyboard enter to select a calendar cell
     * @type {?}
     */
    OwlMultiYearViewComponent.prototype.keyboardEnter;
    /**
     * The body of calendar table
     * @type {?}
     */
    OwlMultiYearViewComponent.prototype.calendarBodyElm;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype.pickerIntl;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype.dateTimeAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbXVsdGkteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILFlBQVksRUFDWix3QkFBd0IsRUFDM0IsTUFBTSwyQkFBMkIsQ0FBQztBQUVuQyxPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBRWxFLE1BQU0sT0FBTyxhQUFhLEdBQUcsQ0FBQzs7QUFDOUIsTUFBTSxPQUFPLFNBQVMsR0FBRyxDQUFDOzs7O0FBVzFCLE1BQU0sT0FBTyx5QkFBeUI7Ozs7OztJQTBNbEMsWUFDWSxLQUF3QixFQUN4QixVQUEyQixFQUNmLGVBQW1DO1FBRi9DLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQ2Ysb0JBQWUsR0FBZixlQUFlLENBQW9COzs7O1FBek1uRCxnQkFBVyxHQUFlLFFBQVEsQ0FBQztRQStCbkMsZUFBVSxHQUFRLEVBQUUsQ0FBQztRQWdHckIsY0FBUyxHQUFHLEtBQUssQ0FBQzs7OztRQTBDUCxXQUFNLEdB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bkMsb0RBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBjYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBDYWxlbmRhckNlbGwsXG4gICAgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50XG59IGZyb20gJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgSE9NRSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFBBR0VfRE9XTixcbiAgICBQQUdFX1VQLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IFlFQVJTX1BFUl9ST1cgPSAzO1xuZXhwb3J0IGNvbnN0IFlFQVJfUk9XUyA9IDc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS1tdWx0aS15ZWFyLXZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtY2FsZW5kYXItdmlld10nOiAnb3dsRFRDYWxlbmRhclZpZXcnLFxuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXddJzogJ293bERUQ2FsZW5kYXJNdWx0aVllYXJWaWV3J1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgT3dsTXVsdGlZZWFyVmlld0NvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgLyoqXG4gICAgICogVGhlIHNlbGVjdCBtb2RlIG9mIHRoZSBwaWNrZXI7XG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2VsZWN0TW9kZTogU2VsZWN0TW9kZSA9ICdzaW5nbGUnO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RNb2RlKHZhbDogU2VsZWN0TW9kZSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID0gdmFsO1xuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRZZWFycygpO1xuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgY29uc3Qgb2xkU2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZDtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNTYW1lRGF5KG9sZFNlbGVjdGVkLCB0aGlzLl9zZWxlY3RlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRZZWFycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRzOiBUW10gPSBbXTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZHMoKTogVFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkcztcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWRzKHZhbHVlczogVFtdKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkcyA9IHZhbHVlcy5tYXAodiA9PiB7XG4gICAgICAgICAgICB2ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGUodik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkWWVhcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBpY2tlck1vbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcbiAgICB9XG5cbiAgICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XG4gICAgICAgIGNvbnN0IG9sZE1vbWVudCA9IHRoaXMuX3BpY2tlck1vbWVudDtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCA9XG4gICAgICAgICAgICB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgb2xkTW9tZW50ICYmXG4gICAgICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQgJiZcbiAgICAgICAgICAgICF0aGlzLmlzU2FtZVllYXJMaXN0KG9sZE1vbWVudCwgdGhpcy5fcGlja2VyTW9tZW50KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2RhdGVGaWx0ZXI6IChkYXRlOiBUKSA9PiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRhdGVGaWx0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlRmlsdGVyO1xuICAgIH1cblxuICAgIHNldCBkYXRlRmlsdGVyKGZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGF0ZUZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfbWluRGF0ZTogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgbWluRGF0ZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICAgIH1cblxuICAgIHNldCBtaW5EYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfbWF4RGF0ZTogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgbWF4RGF0ZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICAgIH1cblxuICAgIHNldCBtYXhEYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3RvZGF5WWVhcjogbnVtYmVyO1xuICAgIGdldCB0b2RheVllYXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvZGF5WWVhcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF95ZWFyczogQ2FsZW5kYXJDZWxsW11bXTtcbiAgICBnZXQgeWVhcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95ZWFycztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZFllYXJzOiBudW1iZXJbXTtcbiAgICBnZXQgc2VsZWN0ZWRZZWFycygpOiBudW1iZXJbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFllYXJzO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdGlhdGVkID0gZmFsc2U7XG5cbiAgICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldCBhY3RpdmVDZWxsKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLl9waWNrZXJNb21lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9waWNrZXJNb21lbnQpICVcbiAgICAgICAgICAgICAgICAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdGFibGVIZWFkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuX3llYXJzICYmIHRoaXMuX3llYXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLl95ZWFyc1swXVswXS5kaXNwbGF5VmFsdWV9IC0gJHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ZWFyc1tZRUFSX1JPV1MgLSAxXVtZRUFSU19QRVJfUk9XIC0gMV0uZGlzcGxheVZhbHVlXG4gICAgICAgICAgICB9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwcmV2QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5wcmV2TXVsdGlZZWFyTGFiZWw7XG4gICAgfVxuXG4gICAgZ2V0IG5leHRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLm5leHRNdWx0aVllYXJMYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5ldyBtb250aCBpcyBzZWxlY3RlZFxuICAgICAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhci4gVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlXG4gICAgICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHllYXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgcGlja2VyTW9tZW50Q2hhbmdlOiBFdmVudEVtaXR0ZXI8VD4gPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgICAgICBUXG4gICAgPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdXNlIGtleWJvYXJkIGVudGVyIHRvIHNlbGVjdCBhIGNhbGVuZGFyIGNlbGwgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkga2V5Ym9hcmRFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgICAgICBhbnlcbiAgICA+KCk7XG5cbiAgICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cbiAgICBAVmlld0NoaWxkKE93bENhbGVuZGFyQm9keUNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBjYWxlbmRhckJvZHlFbG06IE93bENhbGVuZGFyQm9keUNvbXBvbmVudDtcblxuICAgIGdldCBvd2xEVENhbGVuZGFyVmlldygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IG93bERUQ2FsZW5kYXJNdWx0aVllYXJWaWV3KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgcGlja2VySW50bDogT3dsRGF0ZVRpbWVJbnRsLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+XG4gICAgKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RvZGF5WWVhciA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNhbGVuZGFyQ2VsbCBzZWxlY3RlZFxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3RDYWxlbmRhckNlbGwoY2VsbDogQ2FsZW5kYXJDZWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0WWVhcihjZWxsLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbGVjdFllYXIoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQodGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZSh5ZWFyLCAwLCAxKSk7XG4gICAgICAgIGNvbnN0IGZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZGF5c0luTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aChcbiAgICAgICAgICAgIGZpcnN0RGF0ZU9mTW9udGhcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgIE1hdGgubWluKFxuICAgICAgICAgICAgICAgIGRheXNJbk1vbnRoLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIHRoZSBwcmV2aW91cyB5ZWFyIGxpc3RcbiAgICAgKi9cbiAgICBwdWJsaWMgcHJldlllYXJMaXN0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgLTEgKiBZRUFSX1JPV1MgKiBZRUFSU19QRVJfUk9XXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIHRoZSBuZXh0IHllYXIgbGlzdFxuICAgICAqL1xuICAgIHB1YmxpYyBuZXh0WWVhckxpc3QoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICBZRUFSX1JPV1MgKiBZRUFSU19QRVJfUk9XXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZW5lcmF0ZVllYXJMaXN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl95ZWFycyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHBpY2tlck1vbWVudFllYXIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKFxuICAgICAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHBpY2tlck1vbWVudFllYXIgJSAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBZRUFSX1JPV1M7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgWUVBUlNfUEVSX1JPVzsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeWVhciA9XG4gICAgICAgICAgICAgICAgICAgIHBpY2tlck1vbWVudFllYXIgLSBvZmZzZXQgKyAoaiArIGkgKiBZRUFSU19QRVJfUk9XKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5ZWFyQ2VsbCA9IHRoaXMuY3JlYXRlWWVhckNlbGwoeWVhcik7XG4gICAgICAgICAgICAgICAgcm93LnB1c2goeWVhckNlbGwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl95ZWFycy5wdXNoKHJvdyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHByZXZpb3VzIHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cbiAgICBwdWJsaWMgcHJldmlvdXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMubWluRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICF0aGlzLm1pbkRhdGUgfHxcbiAgICAgICAgICAgICF0aGlzLmlzU2FtZVllYXJMaXN0KHRoaXMuX3BpY2tlck1vbWVudCwgdGhpcy5taW5EYXRlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBuZXh0IHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cbiAgICBwdWJsaWMgbmV4dEVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhdGhpcy5tYXhEYXRlIHx8XG4gICAgICAgICAgICAhdGhpcy5pc1NhbWVZZWFyTGlzdCh0aGlzLl9waWNrZXJNb21lbnQsIHRoaXMubWF4RGF0ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlQ2FsZW5kYXJLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGxldCBtb21lbnQ7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgLy8gbWludXMgMSB5ZWFyXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAtMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBhZGQgMSB5ZWFyXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBtaW51cyAzIHllYXJzXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgLTEgKiBZRUFSU19QRVJfUk9XXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIGFkZCAzIHllYXJzXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICBZRUFSU19QRVJfUk9XXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIGdvIHRvIHRoZSBmaXJzdCB5ZWFyIG9mIHRoZSB5ZWFyIHBhZ2VcbiAgICAgICAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIC10aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuX3BpY2tlck1vbWVudCkgJVxuICAgICAgICAgICAgICAgICAgICAgICAgKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIGdvIHRvIHRoZSBsYXN0IHllYXIgb2YgdGhlIHllYXIgcGFnZVxuICAgICAgICAgICAgY2FzZSBFTkQ6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICBZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuX3BpY2tlck1vbWVudCkgJVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKSkgLVxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBtaW51cyAxIHllYXIgcGFnZSAob3IgMTAgeWVhciBwYWdlcylcbiAgICAgICAgICAgIGNhc2UgUEFHRV9VUDpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuYWx0S2V5XG4gICAgICAgICAgICAgICAgICAgICAgICA/IC0xMCAqIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAtMSAqIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBhZGQgMSB5ZWFyIHBhZ2UgKG9yIDEwIHllYXIgcGFnZXMpXG4gICAgICAgICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuYWx0S2V5XG4gICAgICAgICAgICAgICAgICAgICAgICA/IDEwICogKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1NcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFllYXIoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlib2FyZEVudGVyLmVtaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gQ2FsZW5kYXJDZWxsIGZvciB0aGUgZ2l2ZW4geWVhci5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZVllYXJDZWxsKHllYXI6IG51bWJlcik6IENhbGVuZGFyQ2VsbCB7XG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZU9mWWVhciA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgMCwgMSk7XG4gICAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXJOYW1lKHN0YXJ0RGF0ZU9mWWVhcik7XG4gICAgICAgIGNvbnN0IGNlbGxDbGFzcyA9ICdvd2wtZHQteWVhci0nICsgeWVhcjtcbiAgICAgICAgcmV0dXJuIG5ldyBDYWxlbmRhckNlbGwoXG4gICAgICAgICAgICB5ZWFyLFxuICAgICAgICAgICAgeWVhci50b1N0cmluZygpLFxuICAgICAgICAgICAgYXJpYUxhYmVsLFxuICAgICAgICAgICAgdGhpcy5pc1llYXJFbmFibGVkKHllYXIpLFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBjZWxsQ2xhc3NcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFNlbGVjdGVkWWVhcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkWWVhcnMgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSAmJiB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZFllYXJzWzBdID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSAmJiB0aGlzLnNlbGVjdGVkcykge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRZZWFycyA9IHRoaXMuc2VsZWN0ZWRzLm1hcChzZWxlY3RlZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQoc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiB5ZWFyIGlzIGVuYWJsZWQuICovXG4gICAgcHJpdmF0ZSBpc1llYXJFbmFibGVkKHllYXI6IG51bWJlcikge1xuICAgICAgICAvLyBkaXNhYmxlIGlmIHRoZSB5ZWFyIGlzIGdyZWF0ZXIgdGhhbiBtYXhEYXRlIGxvd2VyIHRoYW4gbWluRGF0ZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB5ZWFyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIHllYXIgPT09IG51bGwgfHxcbiAgICAgICAgICAgICh0aGlzLm1heERhdGUgJiZcbiAgICAgICAgICAgICAgICB5ZWFyID4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLm1heERhdGUpKSB8fFxuICAgICAgICAgICAgKHRoaXMubWluRGF0ZSAmJiB5ZWFyIDwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLm1pbkRhdGUpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuYWJsZSBpZiBpdCByZWFjaGVzIGhlcmUgYW5kIHRoZXJlJ3Mgbm8gZmlsdGVyIGRlZmluZWRcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVGaWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlyc3RPZlllYXIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKHllYXIsIDAsIDEpO1xuXG4gICAgICAgIC8vIElmIGFueSBkYXRlIGluIHRoZSB5ZWFyIGlzIGVuYWJsZWQgY291bnQgdGhlIHllYXIgYXMgZW5hYmxlZC5cbiAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBkYXRlID0gZmlyc3RPZlllYXI7XG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUpID09PSB5ZWFyO1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhkYXRlLCAxKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVGaWx0ZXIoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzU2FtZVllYXJMaXN0KGRhdGUxOiBULCBkYXRlMjogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUxKSAvXG4gICAgICAgICAgICAgICAgICAgIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKVxuICAgICAgICAgICAgKSA9PT1cbiAgICAgICAgICAgIE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMikgL1xuICAgICAgICAgICAgICAgICAgICAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUylcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSB2YWxpZCBkYXRlIG9iamVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChvYmopXG4gICAgICAgICAgICA/IG9ialxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9jdXNBY3RpdmVDZWxsKCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyQm9keUVsbS5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICB9XG59XG4iXX0=