/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-year-view.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { Subscription } from 'rxjs';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
/** @type {?} */
const MONTHS_PER_YEAR = 12;
/** @type {?} */
const MONTHS_PER_ROW = 3;
/**
 * @template T
 */
export class OwlYearViewComponent {
    /**
     * @param {?} cdRef
     * @param {?} dateTimeAdapter
     * @param {?} dateTimeFormats
     */
    constructor(cdRef, dateTimeAdapter, dateTimeFormats) {
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * The select mode of the picker;
         */
        this._selectMode = 'single';
        this._selecteds = [];
        this.localeSub = Subscription.EMPTY;
        this.initiated = false;
        /**
         * An array to hold all selectedDates' month value
         * the value is the month number in current year
         */
        this.selectedMonths = [];
        /**
         * Callback to invoke when a new month is selected
         */
        this.change = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.pickerMomentChange = new EventEmitter();
        /**
         * Emits when use keyboard enter to select a calendar cell
         */
        this.keyboardEnter = new EventEmitter();
        this.monthNames = this.dateTimeAdapter.getMonthNames('short');
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
            this.generateMonthList();
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
        value = this.dateTimeAdapter.deserialize(value);
        this._selected = this.getValidDate(value);
        this.setSelectedMonths();
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
        this._selecteds = [];
        for (let i = 0; i < values.length; i++) {
            /** @type {?} */
            const value = this.dateTimeAdapter.deserialize(values[i]);
            this._selecteds.push(this.getValidDate(value));
        }
        this.setSelectedMonths();
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
        if (!this.hasSameYear(oldMoment, this._pickerMoment) &&
            this.initiated) {
            this.generateMonthList();
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
            this.generateMonthList();
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
            this.generateMonthList();
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
            this.generateMonthList();
        }
    }
    /**
     * @return {?}
     */
    get months() {
        return this._months;
    }
    /**
     * @return {?}
     */
    get activeCell() {
        if (this._pickerMoment) {
            return this.dateTimeAdapter.getMonth(this._pickerMoment);
        }
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
    get owlDTCalendarView() {
        return true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this.generateMonthList();
            this.cdRef.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.generateMonthList();
        this.initiated = true;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.localeSub.unsubscribe();
    }
    /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    selectCalendarCell(cell) {
        this.selectMonth(cell.value);
    }
    /**
     * Handle a new month selected
     * @private
     * @param {?} month
     * @return {?}
     */
    selectMonth(month) {
        /** @type {?} */
        const firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        this.monthSelected.emit(firstDateOfMonth);
        /** @type {?} */
        const daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
        /** @type {?} */
        const result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.change.emit(result);
    }
    /**
     * Handle keydown event on calendar body
     * @param {?} event
     * @return {?}
     */
    handleCalendarKeydown(event) {
        /** @type {?} */
        let moment;
        switch (event.keyCode) {
            // minus 1 month
            case LEFT_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 month
            case RIGHT_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 3 months
            case UP_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -3);
                this.pickerMomentChange.emit(moment);
                break;
            // add 3 months
            case DOWN_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 3);
                this.pickerMomentChange.emit(moment);
                break;
            // move to first month of current year
            case HOME:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // move to last month of current year
            case END:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 11 - this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 year (or 10 year)
            case PAGE_UP:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? -10 : -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 year (or 10 year)
            case PAGE_DOWN:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? 10 : 1);
                this.pickerMomentChange.emit(moment);
                break;
            // Select current month
            case ENTER:
                this.selectMonth(this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.keyboardEnter.emit();
                break;
            default:
                return;
        }
        this.focusActiveCell();
        event.preventDefault();
    }
    /**
     * Generate the calendar month list
     * @private
     * @return {?}
     */
    generateMonthList() {
        if (!this.pickerMoment) {
            return;
        }
        this.setSelectedMonths();
        this.todayMonth = this.getMonthInCurrentYear(this.dateTimeAdapter.now());
        this._months = [];
        for (let i = 0; i < MONTHS_PER_YEAR / MONTHS_PER_ROW; i++) {
            /** @type {?} */
            const row = [];
            for (let j = 0; j < MONTHS_PER_ROW; j++) {
                /** @type {?} */
                const month = j + i * MONTHS_PER_ROW;
                /** @type {?} */
                const monthCell = this.createMonthCell(month);
                row.push(monthCell);
            }
            this._months.push(row);
        }
        return;
    }
    /**
     * Creates an CalendarCell for the given month.
     * @private
     * @param {?} month
     * @return {?}
     */
    createMonthCell(month) {
        /** @type {?} */
        const startDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        /** @type {?} */
        const ariaLabel = this.dateTimeAdapter.format(startDateOfMonth, this.dateTimeFormats.monthYearA11yLabel);
        /** @type {?} */
        const cellClass = 'owl-dt-month-' + month;
        return new CalendarCell(month, this.monthNames[month], ariaLabel, this.isMonthEnabled(month), false, cellClass);
    }
    /**
     * Check if the given month is enable
     * @private
     * @param {?} month
     * @return {?}
     */
    isMonthEnabled(month) {
        /** @type {?} */
        const firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        // If any date in the month is selectable,
        // we count the month as enable
        for (let date = firstDateOfMonth; this.dateTimeAdapter.getMonth(date) === month; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
            if (!!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate ||
                    this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
                (!this.maxDate ||
                    this.dateTimeAdapter.compare(date, this.maxDate) <= 0)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    getMonthInCurrentYear(date) {
        if (this.getValidDate(date) && this.getValidDate(this._pickerMoment)) {
            /** @type {?} */
            const result = this.dateTimeAdapter.compareYear(date, this._pickerMoment);
            // < 0 : the given date's year is before pickerMoment's year, we return -1 as selected month value.
            // > 0 : the given date's year is after pickerMoment's year, we return 12 as selected month value.
            // 0 : the give date's year is same as the pickerMoment's year, we return the actual month value.
            if (result < 0) {
                return -1;
            }
            else if (result > 0) {
                return 12;
            }
            else {
                return this.dateTimeAdapter.getMonth(date);
            }
        }
        else {
            return null;
        }
    }
    /**
     * Set the selectedMonths value
     * In single mode, it has only one value which represent the month the selected date in
     * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
     * @private
     * @return {?}
     */
    setSelectedMonths() {
        this.selectedMonths = [];
        if (this.isInSingleMode && this.selected) {
            this.selectedMonths[0] = this.getMonthInCurrentYear(this.selected);
        }
        if (this.isInRangeMode && this.selecteds) {
            this.selectedMonths[0] = this.getMonthInCurrentYear(this.selecteds[0]);
            this.selectedMonths[1] = this.getMonthInCurrentYear(this.selecteds[1]);
        }
    }
    /**
     * Check the given dates are in the same year
     * @private
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    hasSameYear(dateLeft, dateRight) {
        return !!(dateLeft &&
            dateRight &&
            this.dateTimeAdapter.getYear(dateLeft) ===
                this.dateTimeAdapter.getYear(dateRight));
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
OwlYearViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-date-time-year-view',
                exportAs: 'owlMonthView',
                template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-year-table\">\n    <thead class=\"owl-dt-calendar-header\">\n        <tr>\n            <th\n                class=\"owl-dt-calendar-table-divider\"\n                aria-hidden=\"true\"\n                colspan=\"3\"\n            ></th>\n        </tr>\n    </thead>\n    <tbody\n        owl-date-time-calendar-body\n        role=\"grid\"\n        [rows]=\"months\"\n        [numCols]=\"3\"\n        [cellRatio]=\"3 / 7\"\n        [activeCell]=\"activeCell\"\n        [todayValue]=\"todayMonth\"\n        [selectedValues]=\"selectedMonths\"\n        [selectMode]=\"selectMode\"\n        (keydown)=\"handleCalendarKeydown($event)\"\n        (select)=\"selectCalendarCell($event)\"\n    ></tbody>\n</table>\n",
                host: {
                    '[class.owl-dt-calendar-view]': 'owlDTCalendarView'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
OwlYearViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
];
OwlYearViewComponent.propDecorators = {
    selectMode: [{ type: Input }],
    selected: [{ type: Input }],
    selecteds: [{ type: Input }],
    pickerMoment: [{ type: Input }],
    dateFilter: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    change: [{ type: Output }],
    monthSelected: [{ type: Output }],
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
    OwlYearViewComponent.prototype._selectMode;
    /**
     * The currently selected date.
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._pickerMoment;
    /**
     * A function used to filter which dates are selectable
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._dateFilter;
    /**
     * The minimum selectable date.
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._minDate;
    /**
     * The maximum selectable date.
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.monthNames;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._months;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.localeSub;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.initiated;
    /** @type {?} */
    OwlYearViewComponent.prototype.todayMonth;
    /**
     * An array to hold all selectedDates' month value
     * the value is the month number in current year
     * @type {?}
     */
    OwlYearViewComponent.prototype.selectedMonths;
    /**
     * Callback to invoke when a new month is selected
     * @type {?}
     */
    OwlYearViewComponent.prototype.change;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     * @type {?}
     */
    OwlYearViewComponent.prototype.monthSelected;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    OwlYearViewComponent.prototype.pickerMomentChange;
    /**
     * Emits when use keyboard enter to select a calendar cell
     * @type {?}
     */
    OwlYearViewComponent.prototype.keyboardEnter;
    /**
     * The body of calendar table
     * @type {?}
     */
    OwlYearViewComponent.prototype.calendarBodyElm;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFlBQVksRUFDWix3QkFBd0IsRUFDM0IsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUNILFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsUUFBUSxFQUNYLE1BQU0sdUJBQXVCLENBQUM7O01BRXpCLGVBQWUsR0FBRyxFQUFFOztNQUNwQixjQUFjLEdBQUcsQ0FBQzs7OztBQVd4QixNQUFNLE9BQU8sb0JBQW9COzs7Ozs7SUFtTDdCLFlBQ1ksS0FBd0IsRUFDWixlQUFtQyxFQUcvQyxlQUFtQztRQUpuQyxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUNaLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUcvQyxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7Ozs7UUFuTHZDLGdCQUFXLEdBQWUsUUFBUSxDQUFDO1FBMkJuQyxlQUFVLEdBQVEsRUFBRSxDQUFDO1FBMkdyQixjQUFTLEdBQWlCLFlB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QWdDOzs7OztJQUNoQywrQ0FBdUQ7Ozs7O0lBQ3ZELCtDQUUyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbGVuZGFyQ2VsbCxcbiAgICBPd2xDYWxlbmRhckJvZHlDb21wb25lbnRcbn0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBPV0xfREFURV9USU1FX0ZPUk1BVFMsXG4gICAgT3dsRGF0ZVRpbWVGb3JtYXRzXG59IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgSE9NRSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFBBR0VfRE9XTixcbiAgICBQQUdFX1VQLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5cbmNvbnN0IE1PTlRIU19QRVJfWUVBUiA9IDEyO1xuY29uc3QgTU9OVEhTX1BFUl9ST1cgPSAzO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUteWVhci12aWV3JyxcbiAgICBleHBvcnRBczogJ293bE1vbnRoVmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci12aWV3XSc6ICdvd2xEVENhbGVuZGFyVmlldydcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE93bFllYXJWaWV3Q29tcG9uZW50PFQ+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogVGhlIHNlbGVjdCBtb2RlIG9mIHRoZSBwaWNrZXI7XG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2VsZWN0TW9kZTogU2VsZWN0TW9kZSA9ICdzaW5nbGUnO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RNb2RlKHZhbDogU2VsZWN0TW9kZSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID0gdmFsO1xuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZE1vbnRocygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWRzKCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWVzW2ldKTtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkcy5wdXNoKHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkTW9udGhzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGlja2VyTW9tZW50OiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBwaWNrZXJNb21lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJNb21lbnQ7XG4gICAgfVxuXG4gICAgc2V0IHBpY2tlck1vbWVudCh2YWx1ZTogVCkge1xuICAgICAgICBjb25zdCBvbGRNb21lbnQgPSB0aGlzLl9waWNrZXJNb21lbnQ7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQgPVxuICAgICAgICAgICAgdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLmhhc1NhbWVZZWFyKG9sZE1vbWVudCwgdGhpcy5fcGlja2VyTW9tZW50KSAmJlxuICAgICAgICAgICAgdGhpcy5pbml0aWF0ZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlTW9udGhMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZGF0ZUZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBnZXQgZGF0ZUZpbHRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVGaWx0ZXI7XG4gICAgfVxuXG4gICAgc2V0IGRhdGVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogVCkgPT4gYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kYXRlRmlsdGVyID0gZmlsdGVyO1xuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfbWluRGF0ZTogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgbWluRGF0ZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICAgIH1cblxuICAgIHNldCBtaW5EYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlTW9udGhMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21heERhdGU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heERhdGUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWF4RGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21heERhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkb25seSBtb250aE5hbWVzOiBzdHJpbmdbXTtcblxuICAgIHByaXZhdGUgX21vbnRoczogQ2FsZW5kYXJDZWxsW11bXTtcbiAgICBnZXQgbW9udGhzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzO1xuICAgIH1cblxuICAgIGdldCBhY3RpdmVDZWxsKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLl9waWNrZXJNb21lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLl9waWNrZXJNb21lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcbiAgICB9XG5cbiAgICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VUbydcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvY2FsZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgcHJpdmF0ZSBpbml0aWF0ZWQgPSBmYWxzZTtcblxuICAgIHB1YmxpYyB0b2RheU1vbnRoOiBudW1iZXIgfCBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgdG8gaG9sZCBhbGwgc2VsZWN0ZWREYXRlcycgbW9udGggdmFsdWVcbiAgICAgKiB0aGUgdmFsdWUgaXMgdGhlIG1vbnRoIG51bWJlciBpbiBjdXJyZW50IHllYXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0ZWRNb250aHM6IG51bWJlcltdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5ldyBtb250aCBpcyBzZWxlY3RlZFxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHRoZSBzZWxlY3RlZCB5ZWFyLiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGVcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBtb250aFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYW55IGRhdGUgaXMgYWN0aXZhdGVkLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHBpY2tlck1vbWVudENoYW5nZTogRXZlbnRFbWl0dGVyPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gdXNlIGtleWJvYXJkIGVudGVyIHRvIHNlbGVjdCBhIGNhbGVuZGFyIGNlbGwgKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBrZXlib2FyZEVudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqIFRoZSBib2R5IG9mIGNhbGVuZGFyIHRhYmxlICovXG4gICAgQFZpZXdDaGlsZChPd2xDYWxlbmRhckJvZHlDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgY2FsZW5kYXJCb2R5RWxtOiBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQ7XG5cbiAgICBnZXQgb3dsRFRDYWxlbmRhclZpZXcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXG4gICAgICAgIHByaXZhdGUgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHNcbiAgICApIHtcbiAgICAgICAgdGhpcy5tb250aE5hbWVzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGhOYW1lcygnc2hvcnQnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubG9jYWxlU3ViID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIubG9jYWxlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xuICAgICAgICB0aGlzLmluaXRpYXRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvY2FsZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNhbGVuZGFyQ2VsbCBzZWxlY3RlZFxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3RDYWxlbmRhckNlbGwoY2VsbDogQ2FsZW5kYXJDZWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0TW9udGgoY2VsbC52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgbmV3IG1vbnRoIHNlbGVjdGVkXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZWxlY3RNb250aChtb250aDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgICAgICBtb250aCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLm1vbnRoU2VsZWN0ZWQuZW1pdChmaXJzdERhdGVPZk1vbnRoKTtcblxuICAgICAgICBjb25zdCBkYXlzSW5Nb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKFxuICAgICAgICAgICAgZmlyc3REYXRlT2ZNb250aFxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgICAgICBtb250aCxcbiAgICAgICAgICAgIE1hdGgubWluKFxuICAgICAgICAgICAgICAgIGRheXNJbk1vbnRoLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQocmVzdWx0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUga2V5ZG93biBldmVudCBvbiBjYWxlbmRhciBib2R5XG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZUNhbGVuZGFyS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBsZXQgbW9tZW50O1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIC8vIG1pbnVzIDEgbW9udGhcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIC0xXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIGFkZCAxIG1vbnRoXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBtaW51cyAzIG1vbnRoc1xuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIC0zXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIGFkZCAzIG1vbnRoc1xuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgM1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIHRvIGZpcnN0IG1vbnRoIG9mIGN1cnJlbnQgeWVhclxuICAgICAgICAgICAgY2FzZSBIT01FOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgLXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIHRvIGxhc3QgbW9udGggb2YgY3VycmVudCB5ZWFyXG4gICAgICAgICAgICBjYXNlIEVORDpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIDExIC0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5waWNrZXJNb21lbnQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIG1pbnVzIDEgeWVhciAob3IgMTAgeWVhcilcbiAgICAgICAgICAgIGNhc2UgUEFHRV9VUDpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuYWx0S2V5ID8gLTEwIDogLTFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gYWRkIDEgeWVhciAob3IgMTAgeWVhcilcbiAgICAgICAgICAgIGNhc2UgUEFHRV9ET1dOOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICBldmVudC5hbHRLZXkgPyAxMCA6IDFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gU2VsZWN0IGN1cnJlbnQgbW9udGhcbiAgICAgICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RNb250aChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5waWNrZXJNb21lbnQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtleWJvYXJkRW50ZXIuZW1pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIHRoZSBjYWxlbmRhciBtb250aCBsaXN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZU1vbnRoTGlzdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnBpY2tlck1vbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZE1vbnRocygpO1xuICAgICAgICB0aGlzLnRvZGF5TW9udGggPSB0aGlzLmdldE1vbnRoSW5DdXJyZW50WWVhcihcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5fbW9udGhzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTU9OVEhTX1BFUl9ZRUFSIC8gTU9OVEhTX1BFUl9ST1c7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTU9OVEhTX1BFUl9ST1c7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoID0gaiArIGkgKiBNT05USFNfUEVSX1JPVztcbiAgICAgICAgICAgICAgICBjb25zdCBtb250aENlbGwgPSB0aGlzLmNyZWF0ZU1vbnRoQ2VsbChtb250aCk7XG4gICAgICAgICAgICAgICAgcm93LnB1c2gobW9udGhDZWxsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fbW9udGhzLnB1c2gocm93KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIENhbGVuZGFyQ2VsbCBmb3IgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlTW9udGhDZWxsKG1vbnRoOiBudW1iZXIpOiBDYWxlbmRhckNlbGwge1xuICAgICAgICBjb25zdCBzdGFydERhdGVPZk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICAxXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcbiAgICAgICAgICAgIHN0YXJ0RGF0ZU9mTW9udGgsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5tb250aFllYXJBMTF5TGFiZWxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY2VsbENsYXNzID0gJ293bC1kdC1tb250aC0nICsgbW9udGg7XG4gICAgICAgIHJldHVybiBuZXcgQ2FsZW5kYXJDZWxsKFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICB0aGlzLm1vbnRoTmFtZXNbbW9udGhdLFxuICAgICAgICAgICAgYXJpYUxhYmVsLFxuICAgICAgICAgICAgdGhpcy5pc01vbnRoRW5hYmxlZChtb250aCksXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIGNlbGxDbGFzc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlbiBtb250aCBpcyBlbmFibGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzTW9udGhFbmFibGVkKG1vbnRoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZmlyc3REYXRlT2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgMVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIElmIGFueSBkYXRlIGluIHRoZSBtb250aCBpcyBzZWxlY3RhYmxlLFxuICAgICAgICAvLyB3ZSBjb3VudCB0aGUgbW9udGggYXMgZW5hYmxlXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgZGF0ZSA9IGZpcnN0RGF0ZU9mTW9udGg7XG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlKSA9PT0gbW9udGg7XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKGRhdGUsIDEpXG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICEhZGF0ZSAmJlxuICAgICAgICAgICAgICAgICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkgJiZcbiAgICAgICAgICAgICAgICAoIXRoaXMubWluRGF0ZSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGUsIHRoaXMubWluRGF0ZSkgPj0gMCkgJiZcbiAgICAgICAgICAgICAgICAoIXRoaXMubWF4RGF0ZSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGUsIHRoaXMubWF4RGF0ZSkgPD0gMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1vbnRoIGluIHRoaXMgeWVhciB0aGF0IHRoZSBnaXZlbiBEYXRlIGZhbGxzIG9uLlxuICAgICAqIFJldHVybnMgbnVsbCBpZiB0aGUgZ2l2ZW4gRGF0ZSBpcyBpbiBhbm90aGVyIHllYXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRNb250aEluQ3VycmVudFllYXIoZGF0ZTogVCB8IG51bGwpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5nZXRWYWxpZERhdGUoZGF0ZSkgJiYgdGhpcy5nZXRWYWxpZERhdGUodGhpcy5fcGlja2VyTW9tZW50KSkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZVllYXIoXG4gICAgICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLl9waWNrZXJNb21lbnRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIDwgMCA6IHRoZSBnaXZlbiBkYXRlJ3MgeWVhciBpcyBiZWZvcmUgcGlja2VyTW9tZW50J3MgeWVhciwgd2UgcmV0dXJuIC0xIGFzIHNlbGVjdGVkIG1vbnRoIHZhbHVlLlxuICAgICAgICAgICAgLy8gPiAwIDogdGhlIGdpdmVuIGRhdGUncyB5ZWFyIGlzIGFmdGVyIHBpY2tlck1vbWVudCdzIHllYXIsIHdlIHJldHVybiAxMiBhcyBzZWxlY3RlZCBtb250aCB2YWx1ZS5cbiAgICAgICAgICAgIC8vIDAgOiB0aGUgZ2l2ZSBkYXRlJ3MgeWVhciBpcyBzYW1lIGFzIHRoZSBwaWNrZXJNb21lbnQncyB5ZWFyLCB3ZSByZXR1cm4gdGhlIGFjdHVhbCBtb250aCB2YWx1ZS5cbiAgICAgICAgICAgIGlmIChyZXN1bHQgPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgc2VsZWN0ZWRNb250aHMgdmFsdWVcbiAgICAgKiBJbiBzaW5nbGUgbW9kZSwgaXQgaGFzIG9ubHkgb25lIHZhbHVlIHdoaWNoIHJlcHJlc2VudCB0aGUgbW9udGggdGhlIHNlbGVjdGVkIGRhdGUgaW5cbiAgICAgKiBJbiByYW5nZSBtb2RlLCBpdCB3b3VsZCBoYXMgdHdvIHZhbHVlcywgb25lIGZvciB0aGUgbW9udGggdGhlIGZyb21WYWx1ZSBpbiBhbmQgdGhlIG90aGVyIGZvciB0aGUgbW9udGggdGhlIHRvVmFsdWUgaW5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFNlbGVjdGVkTW9udGhzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGhzID0gW107XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlICYmIHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aHNbMF0gPSB0aGlzLmdldE1vbnRoSW5DdXJyZW50WWVhcih0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUgJiYgdGhpcy5zZWxlY3RlZHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aHNbMF0gPSB0aGlzLmdldE1vbnRoSW5DdXJyZW50WWVhcihcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkc1swXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aHNbMV0gPSB0aGlzLmdldE1vbnRoSW5DdXJyZW50WWVhcihcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkc1sxXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoZSBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgeWVhclxuICAgICAqL1xuICAgIHByaXZhdGUgaGFzU2FtZVllYXIoZGF0ZUxlZnQ6IFQsIGRhdGVSaWdodDogVCkge1xuICAgICAgICByZXR1cm4gISEoXG4gICAgICAgICAgICBkYXRlTGVmdCAmJlxuICAgICAgICAgICAgZGF0ZVJpZ2h0ICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGVMZWZ0KSA9PT1cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGVSaWdodClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSB2YWxpZCBkYXRlIG9iamVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChvYmopXG4gICAgICAgICAgICA/IG9ialxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9jdXNBY3RpdmVDZWxsKCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyQm9keUVsbS5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICB9XG59XG4iXX0=