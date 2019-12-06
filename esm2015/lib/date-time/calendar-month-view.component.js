/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-month-view.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { Subscription } from 'rxjs';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { getLocaleFirstDayOfWeek } from '@angular/common';
/** @type {?} */
const DAYS_PER_WEEK = 7;
/** @type {?} */
const WEEKS_PER_VIEW = 6;
/**
 * @template T
 */
export class OwlMonthViewComponent {
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
         * Whether to hide dates in other months at the start or end of the current month.
         */
        this.hideOtherMonths = false;
        /**
         * Define the first day of a week
         * Sunday: 0 - Saturday: 6
         */
        this._firstDayOfWeek = getLocaleFirstDayOfWeek(this.dateTimeAdapter.getLocale());
        /**
         * The select mode of the picker;
         */
        this._selectMode = 'single';
        this._selecteds = [];
        this.isDefaultFirstDayOfWeek = true;
        this.localeSub = Subscription.EMPTY;
        this.initiated = false;
        /**
         * An array to hold all selectedDates' value
         * the value is the day number in current month
         */
        this.selectedDates = [];
        /**
         * Callback to invoke when a new date is selected
         */
        this.selectedChange = new EventEmitter();
        /**
         * Callback to invoke when any date is selected.
         */
        this.userSelection = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.pickerMomentChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set firstDayOfWeek(value) {
        if (value >= 0 && value <= 6 && value !== this._firstDayOfWeek) {
            this._firstDayOfWeek = value;
            this.isDefaultFirstDayOfWeek = false;
            if (this.initiated) {
                this.generateWeekDays();
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        }
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
            this.generateCalendar();
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
            this.setSelectedDates();
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
        this.setSelectedDates();
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
        this.firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this._pickerMoment), this.dateTimeAdapter.getMonth(this._pickerMoment), 1);
        if (!this.isSameMonth(oldMoment, this._pickerMoment) &&
            this.initiated) {
            this.generateCalendar();
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
            this.generateCalendar();
            this.cdRef.markForCheck();
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
            this.generateCalendar();
            this.cdRef.markForCheck();
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
            this.generateCalendar();
            this.cdRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get weekdays() {
        return this._weekdays;
    }
    /**
     * @return {?}
     */
    get days() {
        return this._days;
    }
    /**
     * @return {?}
     */
    get activeCell() {
        if (this.pickerMoment) {
            return (this.dateTimeAdapter.getDate(this.pickerMoment) +
                this.firstRowOffset -
                1);
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
        this.generateWeekDays();
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @param {?} locale
         * @return {?}
         */
        locale => {
            this.generateWeekDays();
            this.generateCalendar();
            this.firstDayOfWeek = this.isDefaultFirstDayOfWeek
                ? getLocaleFirstDayOfWeek(locale)
                : this.firstDayOfWeek;
            this.cdRef.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.generateCalendar();
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
        // Cases in which the date would not be selected
        // 1, the calendar cell is NOT enabled (is NOT valid)
        // 2, the selected date is NOT in current picker's month and the hideOtherMonths is enabled
        if (!cell.enabled || (this.hideOtherMonths && cell.out)) {
            return;
        }
        this.selectDate(cell.value);
    }
    /**
     * Handle a new date selected
     * @private
     * @param {?} date
     * @return {?}
     */
    selectDate(date) {
        /** @type {?} */
        const daysDiff = date - 1;
        /** @type {?} */
        const selected = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
        this.selectedChange.emit(selected);
        this.userSelection.emit();
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
            // minus 1 day
            case LEFT_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 day
            case RIGHT_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 week
            case UP_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -7);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 week
            case DOWN_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 7);
                this.pickerMomentChange.emit(moment);
                break;
            // move to first day of current month
            case HOME:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1 - this.dateTimeAdapter.getDate(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // move to last day of current month
            case END:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment) -
                    this.dateTimeAdapter.getDate(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 month (or 1 year)
            case PAGE_UP:
                moment = event.altKey
                    ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1)
                    : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 month (or 1 year)
            case PAGE_DOWN:
                moment = event.altKey
                    ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1)
                    : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // select the pickerMoment
            case ENTER:
                if (!this.dateFilter || this.dateFilter(this.pickerMoment)) {
                    this.selectDate(this.dateTimeAdapter.getDate(this.pickerMoment));
                }
                break;
            default:
                return;
        }
        this.focusActiveCell();
        event.preventDefault();
    }
    /**
     * Generate the calendar weekdays array
     * @private
     * @return {?}
     */
    generateWeekDays() {
        /** @type {?} */
        const longWeekdays = this.dateTimeAdapter.getDayOfWeekNames('long');
        /** @type {?} */
        const shortWeekdays = this.dateTimeAdapter.getDayOfWeekNames('short');
        /** @type {?} */
        const narrowWeekdays = this.dateTimeAdapter.getDayOfWeekNames('narrow');
        /** @type {?} */
        const firstDayOfWeek = this.firstDayOfWeek;
        /** @type {?} */
        const weekdays = longWeekdays.map((/**
         * @param {?} long
         * @param {?} i
         * @return {?}
         */
        (long, i) => {
            return { long, short: shortWeekdays[i], narrow: narrowWeekdays[i] };
        }));
        this._weekdays = weekdays
            .slice(firstDayOfWeek)
            .concat(weekdays.slice(0, firstDayOfWeek));
        this.dateNames = this.dateTimeAdapter.getDateNames();
        return;
    }
    /**
     * Generate the calendar days array
     * @private
     * @return {?}
     */
    generateCalendar() {
        if (!this.pickerMoment) {
            return;
        }
        this.todayDate = null;
        // the first weekday of the month
        /** @type {?} */
        const startWeekdayOfMonth = this.dateTimeAdapter.getDay(this.firstDateOfMonth);
        /** @type {?} */
        const firstDayOfWeek = this.firstDayOfWeek;
        // the amount of days from the first date of the month
        // if it is < 0, it means the date is in previous month
        /** @type {?} */
        let daysDiff = 0 -
            ((startWeekdayOfMonth + (DAYS_PER_WEEK - firstDayOfWeek)) %
                DAYS_PER_WEEK);
        // the index of cell that contains the first date of the month
        this.firstRowOffset = Math.abs(daysDiff);
        this._days = [];
        for (let i = 0; i < WEEKS_PER_VIEW; i++) {
            /** @type {?} */
            const week = [];
            for (let j = 0; j < DAYS_PER_WEEK; j++) {
                /** @type {?} */
                const date = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
                /** @type {?} */
                const dateCell = this.createDateCell(date, daysDiff);
                // check if the date is today
                if (this.dateTimeAdapter.isSameDay(this.dateTimeAdapter.now(), date)) {
                    this.todayDate = daysDiff + 1;
                }
                week.push(dateCell);
                daysDiff += 1;
            }
            this._days.push(week);
        }
        this.setSelectedDates();
    }
    /**
     * Creates CalendarCell for days.
     * @private
     * @param {?} date
     * @param {?} daysDiff
     * @return {?}
     */
    createDateCell(date, daysDiff) {
        // total days of the month
        /** @type {?} */
        const daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment);
        /** @type {?} */
        const dateNum = this.dateTimeAdapter.getDate(date);
        // const dateName = this.dateNames[dateNum - 1];
        /** @type {?} */
        const dateName = dateNum.toString();
        /** @type {?} */
        const ariaLabel = this.dateTimeAdapter.format(date, this.dateTimeFormats.dateA11yLabel);
        // check if the date if selectable
        /** @type {?} */
        const enabled = this.isDateEnabled(date);
        // check if date is not in current month
        /** @type {?} */
        const dayValue = daysDiff + 1;
        /** @type {?} */
        const out = dayValue < 1 || dayValue > daysInMonth;
        /** @type {?} */
        const cellClass = 'owl-dt-day-' + this.dateTimeAdapter.getDay(date);
        return new CalendarCell(dayValue, dateName, ariaLabel, enabled, out, cellClass);
    }
    /**
     * Check if the date is valid
     * @private
     * @param {?} date
     * @return {?}
     */
    isDateEnabled(date) {
        return (!!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate ||
                this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
            (!this.maxDate ||
                this.dateTimeAdapter.compare(date, this.maxDate) <= 0));
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
     * Check if the give dates are none-null and in the same month
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    isSameMonth(dateLeft, dateRight) {
        return !!(dateLeft &&
            dateRight &&
            this.dateTimeAdapter.isValid(dateLeft) &&
            this.dateTimeAdapter.isValid(dateRight) &&
            this.dateTimeAdapter.getYear(dateLeft) ===
                this.dateTimeAdapter.getYear(dateRight) &&
            this.dateTimeAdapter.getMonth(dateLeft) ===
                this.dateTimeAdapter.getMonth(dateRight));
    }
    /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     * @private
     * @return {?}
     */
    setSelectedDates() {
        this.selectedDates = [];
        if (!this.firstDateOfMonth) {
            return;
        }
        if (this.isInSingleMode && this.selected) {
            /** @type {?} */
            const dayDiff = this.dateTimeAdapter.differenceInCalendarDays(this.selected, this.firstDateOfMonth);
            this.selectedDates[0] = dayDiff + 1;
            return;
        }
        if (this.isInRangeMode && this.selecteds) {
            this.selectedDates = this.selecteds.map((/**
             * @param {?} selected
             * @return {?}
             */
            selected => {
                if (this.dateTimeAdapter.isValid(selected)) {
                    /** @type {?} */
                    const dayDiff = this.dateTimeAdapter.differenceInCalendarDays(selected, this.firstDateOfMonth);
                    return dayDiff + 1;
                }
                else {
                    return null;
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    focusActiveCell() {
        this.calendarBodyElm.focusActiveCell();
    }
}
OwlMonthViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-date-time-month-view',
                exportAs: 'owlYearView',
                template: "<table\n    class=\"owl-dt-calendar-table owl-dt-calendar-month-table\"\n    [class.owl-dt-calendar-only-current-month]=\"hideOtherMonths\"\n>\n    <thead class=\"owl-dt-calendar-header\">\n        <tr class=\"owl-dt-weekdays\">\n            <th\n                *ngFor=\"let weekday of weekdays\"\n                [attr.aria-label]=\"weekday.long\"\n                class=\"owl-dt-weekday\"\n                scope=\"col\"\n            >\n                <span>{{ weekday.short }}</span>\n            </th>\n        </tr>\n        <tr>\n            <th\n                class=\"owl-dt-calendar-table-divider\"\n                aria-hidden=\"true\"\n                colspan=\"7\"\n            ></th>\n        </tr>\n    </thead>\n    <tbody\n        owl-date-time-calendar-body\n        role=\"grid\"\n        [rows]=\"days\"\n        [todayValue]=\"todayDate\"\n        [selectedValues]=\"selectedDates\"\n        [selectMode]=\"selectMode\"\n        [activeCell]=\"activeCell\"\n        (keydown)=\"handleCalendarKeydown($event)\"\n        (select)=\"selectCalendarCell($event)\"\n    ></tbody>\n</table>\n",
                host: {
                    '[class.owl-dt-calendar-view]': 'owlDTCalendarView'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
OwlMonthViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
];
OwlMonthViewComponent.propDecorators = {
    hideOtherMonths: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    selectMode: [{ type: Input }],
    selected: [{ type: Input }],
    selecteds: [{ type: Input }],
    pickerMoment: [{ type: Input }],
    dateFilter: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    selectedChange: [{ type: Output }],
    userSelection: [{ type: Output }],
    pickerMomentChange: [{ type: Output }],
    calendarBodyElm: [{ type: ViewChild, args: [OwlCalendarBodyComponent, { static: true },] }]
};
if (false) {
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     * @type {?}
     */
    OwlMonthViewComponent.prototype.hideOtherMonths;
    /**
     * Define the first day of a week
     * Sunday: 0 - Saturday: 6
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._firstDayOfWeek;
    /**
     * The select mode of the picker;
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._selectMode;
    /**
     * The currently selected date.
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._pickerMoment;
    /**
     * A function used to filter which dates are selectable
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._dateFilter;
    /**
     * The minimum selectable date.
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._minDate;
    /**
     * The maximum selectable date.
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._weekdays;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._days;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.firstDateOfMonth;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.isDefaultFirstDayOfWeek;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.localeSub;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.initiated;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.dateNames;
    /**
     * The date of the month that today falls on.
     * @type {?}
     */
    OwlMonthViewComponent.prototype.todayDate;
    /**
     * An array to hold all selectedDates' value
     * the value is the day number in current month
     * @type {?}
     */
    OwlMonthViewComponent.prototype.selectedDates;
    /** @type {?} */
    OwlMonthViewComponent.prototype.firstRowOffset;
    /**
     * Callback to invoke when a new date is selected
     * @type {?}
     */
    OwlMonthViewComponent.prototype.selectedChange;
    /**
     * Callback to invoke when any date is selected.
     * @type {?}
     */
    OwlMonthViewComponent.prototype.userSelection;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    OwlMonthViewComponent.prototype.pickerMomentChange;
    /**
     * The body of calendar table
     * @type {?}
     */
    OwlMonthViewComponent.prototype.calendarBodyElm;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsWUFBWSxFQUNaLHdCQUF3QixFQUMzQixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQyxPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7TUFFcEQsYUFBYSxHQUFHLENBQUM7O01BQ2pCLGNBQWMsR0FBRyxDQUFDOzs7O0FBV3hCLE1BQU0sT0FBTyxxQkFBcUI7Ozs7OztJQTZPOUIsWUFDWSxLQUF3QixFQUNaLGVBQW1DLEVBRy9DLGVBQW1DO1FBSm5DLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ1osb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBRy9DLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjs7OztRQTVPL0Msb0JBQWUsR0FBRyxLQUFLLENBQUM7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LDhDQUFvQzs7SUFHcEMsK0NBQThCOzs7OztJQUs5QiwrQ0FDdUQ7Ozs7O0lBS3ZELDhDQUNrRDs7Ozs7SUFHbEQsbURBQ3FFOzs7OztJQUdyRSxnREFDMEM7Ozs7O0lBT3RDLHNDQUFnQzs7Ozs7SUFDaEMsZ0RBQXVEOzs7OztJQUN2RCxnREFFMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGNhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FsZW5kYXJDZWxsLFxuICAgIE93bENhbGVuZGFyQm9keUNvbXBvbmVudFxufSBmcm9tICcuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQge1xuICAgIE9XTF9EQVRFX1RJTUVfRk9STUFUUyxcbiAgICBPd2xEYXRlVGltZUZvcm1hdHNcbn0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZWxlY3RNb2RlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBET1dOX0FSUk9XLFxuICAgIEVORCxcbiAgICBFTlRFUixcbiAgICBIT01FLFxuICAgIExFRlRfQVJST1csXG4gICAgUEFHRV9ET1dOLFxuICAgIFBBR0VfVVAsXG4gICAgUklHSFRfQVJST1csXG4gICAgVVBfQVJST1dcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IGdldExvY2FsZUZpcnN0RGF5T2ZXZWVrIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuY29uc3QgREFZU19QRVJfV0VFSyA9IDc7XG5jb25zdCBXRUVLU19QRVJfVklFVyA9IDY7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS1tb250aC12aWV3JyxcbiAgICBleHBvcnRBczogJ293bFllYXJWaWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci12aWV3XSc6ICdvd2xEVENhbGVuZGFyVmlldydcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE93bE1vbnRoVmlld0NvbXBvbmVudDxUPlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gaGlkZSBkYXRlcyBpbiBvdGhlciBtb250aHMgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgY3VycmVudCBtb250aC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhpZGVPdGhlck1vbnRocyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lIHRoZSBmaXJzdCBkYXkgb2YgYSB3ZWVrXG4gICAgICogU3VuZGF5OiAwIC0gU2F0dXJkYXk6IDZcbiAgICAgKi9cbiAgICBwcml2YXRlIF9maXJzdERheU9mV2VlayA9IGdldExvY2FsZUZpcnN0RGF5T2ZXZWVrKFxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRMb2NhbGUoKVxuICAgICk7XG4gICAgQElucHV0KClcbiAgICBnZXQgZmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrO1xuICAgIH1cblxuICAgIHNldCBmaXJzdERheU9mV2Vlayh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh2YWx1ZSA+PSAwICYmIHZhbHVlIDw9IDYgJiYgdmFsdWUgIT09IHRoaXMuX2ZpcnN0RGF5T2ZXZWVrKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdERheU9mV2VlayA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5pc0RlZmF1bHRGaXJzdERheU9mV2VlayA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlV2Vla0RheXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNlbGVjdCBtb2RlIG9mIHRoZSBwaWNrZXI7XG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2VsZWN0TW9kZTogU2VsZWN0TW9kZSA9ICdzaW5nbGUnO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RNb2RlKHZhbDogU2VsZWN0TW9kZSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID0gdmFsO1xuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgY29uc3Qgb2xkU2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZDtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNTYW1lRGF5KG9sZFNlbGVjdGVkLCB0aGlzLl9zZWxlY3RlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWREYXRlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRzOiBUW10gPSBbXTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZHMoKTogVFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkcztcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWRzKHZhbHVlczogVFtdKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkcyA9IHZhbHVlcy5tYXAodiA9PiB7XG4gICAgICAgICAgICB2ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGUodik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkRGF0ZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQ7XG4gICAgQElucHV0KClcbiAgICBnZXQgcGlja2VyTW9tZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyTW9tZW50O1xuICAgIH1cblxuICAgIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcbiAgICAgICAgY29uc3Qgb2xkTW9tZW50ID0gdGhpcy5fcGlja2VyTW9tZW50O1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50ID1cbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcblxuICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5fcGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5pc1NhbWVNb250aChvbGRNb21lbnQsIHRoaXMuX3BpY2tlck1vbWVudCkgJiZcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhdGVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZGF0ZUZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBnZXQgZGF0ZUZpbHRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVGaWx0ZXI7XG4gICAgfVxuXG4gICAgc2V0IGRhdGVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogVCkgPT4gYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kYXRlRmlsdGVyID0gZmlsdGVyO1xuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfbWluRGF0ZTogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgbWluRGF0ZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICAgIH1cblxuICAgIHNldCBtaW5EYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21heERhdGU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heERhdGUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWF4RGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21heERhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF93ZWVrZGF5czogQXJyYXk8eyBsb25nOiBzdHJpbmc7IHNob3J0OiBzdHJpbmc7IG5hcnJvdzogc3RyaW5nIH0+O1xuICAgIGdldCB3ZWVrZGF5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RheXM6IENhbGVuZGFyQ2VsbFtdW107XG4gICAgZ2V0IGRheXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXlzO1xuICAgIH1cblxuICAgIGdldCBhY3RpdmVDZWxsKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnBpY2tlck1vbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KSArXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdFJvd09mZnNldCAtXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgfHxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaXJzdERhdGVPZk1vbnRoOiBUO1xuXG4gICAgcHJpdmF0ZSBpc0RlZmF1bHRGaXJzdERheU9mV2VlayA9IHRydWU7XG5cbiAgICBwcml2YXRlIGxvY2FsZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgcHJpdmF0ZSBpbml0aWF0ZWQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgZGF0ZU5hbWVzOiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBkYXRlIG9mIHRoZSBtb250aCB0aGF0IHRvZGF5IGZhbGxzIG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyB0b2RheURhdGU6IG51bWJlciB8IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSB0byBob2xkIGFsbCBzZWxlY3RlZERhdGVzJyB2YWx1ZVxuICAgICAqIHRoZSB2YWx1ZSBpcyB0aGUgZGF5IG51bWJlciBpbiBjdXJyZW50IG1vbnRoXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdGVkRGF0ZXM6IG51bWJlcltdID0gW107XG5cbiAgICAvLyB0aGUgaW5kZXggb2YgY2VsbCB0aGF0IGNvbnRhaW5zIHRoZSBmaXJzdCBkYXRlIG9mIHRoZSBtb250aFxuICAgIHB1YmxpYyBmaXJzdFJvd09mZnNldDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZFxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUIHwgbnVsbD4oKTtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGFueSBkYXRlIGlzIHNlbGVjdGVkLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHVzZXJTZWxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBhY3RpdmF0ZWQuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgcGlja2VyTW9tZW50Q2hhbmdlOiBFdmVudEVtaXR0ZXI8VD4gPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cbiAgICBAVmlld0NoaWxkKE93bENhbGVuZGFyQm9keUNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBjYWxlbmRhckJvZHlFbG06IE93bENhbGVuZGFyQm9keUNvbXBvbmVudDtcblxuICAgIGdldCBvd2xEVENhbGVuZGFyVmlldygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+LFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcbiAgICAgICAgcHJpdmF0ZSBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0c1xuICAgICkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVdlZWtEYXlzKCk7XG5cbiAgICAgICAgdGhpcy5sb2NhbGVTdWIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5sb2NhbGVDaGFuZ2VzLnN1YnNjcmliZShcbiAgICAgICAgICAgIGxvY2FsZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVdlZWtEYXlzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdERheU9mV2VlayA9IHRoaXMuaXNEZWZhdWx0Rmlyc3REYXlPZldlZWtcbiAgICAgICAgICAgICAgICAgICAgPyBnZXRMb2NhbGVGaXJzdERheU9mV2Vlayhsb2NhbGUpXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5maXJzdERheU9mV2VlaztcbiAgICAgICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICAgICAgICB0aGlzLmluaXRpYXRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvY2FsZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNhbGVuZGFyQ2VsbCBzZWxlY3RlZFxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3RDYWxlbmRhckNlbGwoY2VsbDogQ2FsZW5kYXJDZWxsKTogdm9pZCB7XG4gICAgICAgIC8vIENhc2VzIGluIHdoaWNoIHRoZSBkYXRlIHdvdWxkIG5vdCBiZSBzZWxlY3RlZFxuICAgICAgICAvLyAxLCB0aGUgY2FsZW5kYXIgY2VsbCBpcyBOT1QgZW5hYmxlZCAoaXMgTk9UIHZhbGlkKVxuICAgICAgICAvLyAyLCB0aGUgc2VsZWN0ZWQgZGF0ZSBpcyBOT1QgaW4gY3VycmVudCBwaWNrZXIncyBtb250aCBhbmQgdGhlIGhpZGVPdGhlck1vbnRocyBpcyBlbmFibGVkXG4gICAgICAgIGlmICghY2VsbC5lbmFibGVkIHx8ICh0aGlzLmhpZGVPdGhlck1vbnRocyAmJiBjZWxsLm91dCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0RGF0ZShjZWxsLnZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBuZXcgZGF0ZSBzZWxlY3RlZFxuICAgICAqL1xuICAgIHByaXZhdGUgc2VsZWN0RGF0ZShkYXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF5c0RpZmYgPSBkYXRlIC0gMTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXG4gICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGgsXG4gICAgICAgICAgICBkYXlzRGlmZlxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3RlZCk7XG4gICAgICAgIHRoaXMudXNlclNlbGVjdGlvbi5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGtleWRvd24gZXZlbnQgb24gY2FsZW5kYXIgYm9keVxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVDYWxlbmRhcktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgbGV0IG1vbWVudDtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAvLyBtaW51cyAxIGRheVxuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIC0xXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIGFkZCAxIGRheVxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIG1pbnVzIDEgd2Vla1xuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAtN1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBhZGQgMSB3ZWVrXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgN1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIHRvIGZpcnN0IGRheSBvZiBjdXJyZW50IG1vbnRoXG4gICAgICAgICAgICBjYXNlIEhPTUU6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgMSAtIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgdG8gbGFzdCBkYXkgb2YgY3VycmVudCBtb250aFxuICAgICAgICAgICAgY2FzZSBFTkQ6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgodGhpcy5waWNrZXJNb21lbnQpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIG1pbnVzIDEgbW9udGggKG9yIDEgeWVhcilcbiAgICAgICAgICAgIGNhc2UgUEFHRV9VUDpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSBldmVudC5hbHRLZXlcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLTFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAtMVxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBhZGQgMSBtb250aCAob3IgMSB5ZWFyKVxuICAgICAgICAgICAgY2FzZSBQQUdFX0RPV046XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gZXZlbnQuYWx0S2V5XG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIHNlbGVjdCB0aGUgcGlja2VyTW9tZW50XG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcih0aGlzLnBpY2tlck1vbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnBpY2tlck1vbWVudClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgdGhlIGNhbGVuZGFyIHdlZWtkYXlzIGFycmF5XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZVdlZWtEYXlzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBsb25nV2Vla2RheXMgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXlPZldlZWtOYW1lcygnbG9uZycpO1xuICAgICAgICBjb25zdCBzaG9ydFdlZWtkYXlzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoJ3Nob3J0Jyk7XG4gICAgICAgIGNvbnN0IG5hcnJvd1dlZWtkYXlzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoJ25hcnJvdycpO1xuICAgICAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuZmlyc3REYXlPZldlZWs7XG5cbiAgICAgICAgY29uc3Qgd2Vla2RheXMgPSBsb25nV2Vla2RheXMubWFwKChsb25nLCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBsb25nLCBzaG9ydDogc2hvcnRXZWVrZGF5c1tpXSwgbmFycm93OiBuYXJyb3dXZWVrZGF5c1tpXSB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl93ZWVrZGF5cyA9IHdlZWtkYXlzXG4gICAgICAgICAgICAuc2xpY2UoZmlyc3REYXlPZldlZWspXG4gICAgICAgICAgICAuY29uY2F0KHdlZWtkYXlzLnNsaWNlKDAsIGZpcnN0RGF5T2ZXZWVrKSk7XG5cbiAgICAgICAgdGhpcy5kYXRlTmFtZXMgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlTmFtZXMoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgdGhlIGNhbGVuZGFyIGRheXMgYXJyYXlcbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5waWNrZXJNb21lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9kYXlEYXRlID0gbnVsbDtcblxuICAgICAgICAvLyB0aGUgZmlyc3Qgd2Vla2RheSBvZiB0aGUgbW9udGhcbiAgICAgICAgY29uc3Qgc3RhcnRXZWVrZGF5T2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheShcbiAgICAgICAgICAgIHRoaXMuZmlyc3REYXRlT2ZNb250aFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuZmlyc3REYXlPZldlZWs7XG5cbiAgICAgICAgLy8gdGhlIGFtb3VudCBvZiBkYXlzIGZyb20gdGhlIGZpcnN0IGRhdGUgb2YgdGhlIG1vbnRoXG4gICAgICAgIC8vIGlmIGl0IGlzIDwgMCwgaXQgbWVhbnMgdGhlIGRhdGUgaXMgaW4gcHJldmlvdXMgbW9udGhcbiAgICAgICAgbGV0IGRheXNEaWZmID1cbiAgICAgICAgICAgIDAgLVxuICAgICAgICAgICAgKChzdGFydFdlZWtkYXlPZk1vbnRoICsgKERBWVNfUEVSX1dFRUsgLSBmaXJzdERheU9mV2VlaykpICVcbiAgICAgICAgICAgICAgICBEQVlTX1BFUl9XRUVLKTtcblxuICAgICAgICAvLyB0aGUgaW5kZXggb2YgY2VsbCB0aGF0IGNvbnRhaW5zIHRoZSBmaXJzdCBkYXRlIG9mIHRoZSBtb250aFxuICAgICAgICB0aGlzLmZpcnN0Um93T2Zmc2V0ID0gTWF0aC5hYnMoZGF5c0RpZmYpO1xuXG4gICAgICAgIHRoaXMuX2RheXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBXRUVLU19QRVJfVklFVzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB3ZWVrID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IERBWVNfUEVSX1dFRUs7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3REYXRlT2ZNb250aCxcbiAgICAgICAgICAgICAgICAgICAgZGF5c0RpZmZcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVDZWxsID0gdGhpcy5jcmVhdGVEYXRlQ2VsbChkYXRlLCBkYXlzRGlmZik7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgZGF0ZSBpcyB0b2RheVxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNTYW1lRGF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2RheURhdGUgPSBkYXlzRGlmZiArIDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd2Vlay5wdXNoKGRhdGVDZWxsKTtcbiAgICAgICAgICAgICAgICBkYXlzRGlmZiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGF5cy5wdXNoKHdlZWspO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZERhdGVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBDYWxlbmRhckNlbGwgZm9yIGRheXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXRlQ2VsbChkYXRlOiBULCBkYXlzRGlmZjogbnVtYmVyKTogQ2FsZW5kYXJDZWxsIHtcbiAgICAgICAgLy8gdG90YWwgZGF5cyBvZiB0aGUgbW9udGhcbiAgICAgICAgY29uc3QgZGF5c0luTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aChcbiAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRhdGVOdW0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKGRhdGUpO1xuICAgICAgICAvLyBjb25zdCBkYXRlTmFtZSA9IHRoaXMuZGF0ZU5hbWVzW2RhdGVOdW0gLSAxXTtcbiAgICAgICAgY29uc3QgZGF0ZU5hbWUgPSBkYXRlTnVtLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5kYXRlQTExeUxhYmVsXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGRhdGUgaWYgc2VsZWN0YWJsZVxuICAgICAgICBjb25zdCBlbmFibGVkID0gdGhpcy5pc0RhdGVFbmFibGVkKGRhdGUpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGRhdGUgaXMgbm90IGluIGN1cnJlbnQgbW9udGhcbiAgICAgICAgY29uc3QgZGF5VmFsdWUgPSBkYXlzRGlmZiArIDE7XG4gICAgICAgIGNvbnN0IG91dCA9IGRheVZhbHVlIDwgMSB8fCBkYXlWYWx1ZSA+IGRheXNJbk1vbnRoO1xuICAgICAgICBjb25zdCBjZWxsQ2xhc3MgPSAnb3dsLWR0LWRheS0nICsgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF5KGRhdGUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgQ2FsZW5kYXJDZWxsKFxuICAgICAgICAgICAgZGF5VmFsdWUsXG4gICAgICAgICAgICBkYXRlTmFtZSxcbiAgICAgICAgICAgIGFyaWFMYWJlbCxcbiAgICAgICAgICAgIGVuYWJsZWQsXG4gICAgICAgICAgICBvdXQsXG4gICAgICAgICAgICBjZWxsQ2xhc3NcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZGF0ZSBpcyB2YWxpZFxuICAgICAqL1xuICAgIHByaXZhdGUgaXNEYXRlRW5hYmxlZChkYXRlOiBUKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhIWRhdGUgJiZcbiAgICAgICAgICAgICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkgJiZcbiAgICAgICAgICAgICghdGhpcy5taW5EYXRlIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlLCB0aGlzLm1pbkRhdGUpID49IDApICYmXG4gICAgICAgICAgICAoIXRoaXMubWF4RGF0ZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZGF0ZSwgdGhpcy5tYXhEYXRlKSA8PSAwKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgICAgICAgID8gb2JqXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGdpdmUgZGF0ZXMgYXJlIG5vbmUtbnVsbCBhbmQgaW4gdGhlIHNhbWUgbW9udGhcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNTYW1lTW9udGgoZGF0ZUxlZnQ6IFQsIGRhdGVSaWdodDogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISEoXG4gICAgICAgICAgICBkYXRlTGVmdCAmJlxuICAgICAgICAgICAgZGF0ZVJpZ2h0ICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKGRhdGVMZWZ0KSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChkYXRlUmlnaHQpICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGVMZWZ0KSA9PT1cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGVSaWdodCkgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGVMZWZ0KSA9PT1cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlUmlnaHQpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzZWxlY3RlZERhdGVzIHZhbHVlLlxuICAgICAqIEluIHNpbmdsZSBtb2RlLCBpdCBoYXMgb25seSBvbmUgdmFsdWUgd2hpY2ggcmVwcmVzZW50IHRoZSBzZWxlY3RlZCBkYXRlXG4gICAgICogSW4gcmFuZ2UgbW9kZSwgaXQgd291bGQgaGFzIHR3byB2YWx1ZXMsIG9uZSBmb3IgdGhlIGZyb21WYWx1ZSBhbmQgdGhlIG90aGVyIGZvciB0aGUgdG9WYWx1ZVxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0U2VsZWN0ZWREYXRlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVzID0gW107XG5cbiAgICAgICAgaWYgKCF0aGlzLmZpcnN0RGF0ZU9mTW9udGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlICYmIHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRheURpZmYgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZXNbMF0gPSBkYXlEaWZmICsgMTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUgJiYgdGhpcy5zZWxlY3RlZHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlcyA9IHRoaXMuc2VsZWN0ZWRzLm1hcChzZWxlY3RlZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQoc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRheURpZmYgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3REYXRlT2ZNb250aFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF5RGlmZiArIDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhckJvZHlFbG0uZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgfVxufVxuIl19