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
var MONTHS_PER_YEAR = 12;
/** @type {?} */
var MONTHS_PER_ROW = 3;
/**
 * @template T
 */
var OwlYearViewComponent = /** @class */ (function () {
    function OwlYearViewComponent(cdRef, dateTimeAdapter, dateTimeFormats) {
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
    Object.defineProperty(OwlYearViewComponent.prototype, "selectMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectMode;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._selectMode = val;
            if (this.initiated) {
                this.generateMonthList();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlYearViewComponent.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._selected = this.getValidDate(value);
            this.setSelectedMonths();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlYearViewComponent.prototype, "selecteds", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selecteds;
        },
        set: /**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            this._selecteds = [];
            for (var i = 0; i < values.length; i++) {
                /** @type {?} */
                var value = this.dateTimeAdapter.deserialize(values[i]);
                this._selecteds.push(this.getValidDate(value));
            }
            this.setSelectedMonths();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlYearViewComponent.prototype, "pickerMoment", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pickerMoment;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldMoment = this._pickerMoment;
            value = this.dateTimeAdapter.deserialize(value);
            this._pickerMoment =
                this.getValidDate(value) || this.dateTimeAdapter.now();
            if (!this.hasSameYear(oldMoment, this._pickerMoment) &&
                this.initiated) {
                this.generateMonthList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlYearViewComponent.prototype, "dateFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateFilter;
        },
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this._dateFilter = filter;
            if (this.initiated) {
                this.generateMonthList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlYearViewComponent.prototype, "minDate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._minDate = this.getValidDate(value);
            if (this.initiated) {
                this.generateMonthList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlYearViewComponent.prototype, "maxDate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._maxDate = this.getValidDate(value);
            if (this.initiated) {
                this.generateMonthList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlYearViewComponent.prototype, "months", {
        get: /**
         * @return {?}
         */
        function () {
            return this._months;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlYearViewComponent.prototype, "activeCell", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._pickerMoment) {
                return this.dateTimeAdapter.getMonth(this._pickerMoment);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlYearViewComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlYearViewComponent.prototype, "isInRangeMode", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.selectMode === 'range' ||
                this.selectMode === 'rangeFrom' ||
                this.selectMode === 'rangeTo');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlYearViewComponent.prototype, "owlDTCalendarView", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlYearViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.generateMonthList();
            _this.cdRef.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    OwlYearViewComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.generateMonthList();
        this.initiated = true;
    };
    /**
     * @return {?}
     */
    OwlYearViewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.localeSub.unsubscribe();
    };
    /**
     * Handle a calendarCell selected
     */
    /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    OwlYearViewComponent.prototype.selectCalendarCell = /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        this.selectMonth(cell.value);
    };
    /**
     * Handle a new month selected
     */
    /**
     * Handle a new month selected
     * @private
     * @param {?} month
     * @return {?}
     */
    OwlYearViewComponent.prototype.selectMonth = /**
     * Handle a new month selected
     * @private
     * @param {?} month
     * @return {?}
     */
    function (month) {
        /** @type {?} */
        var firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        this.monthSelected.emit(firstDateOfMonth);
        /** @type {?} */
        var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
        /** @type {?} */
        var result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.change.emit(result);
    };
    /**
     * Handle keydown event on calendar body
     */
    /**
     * Handle keydown event on calendar body
     * @param {?} event
     * @return {?}
     */
    OwlYearViewComponent.prototype.handleCalendarKeydown = /**
     * Handle keydown event on calendar body
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var moment;
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
    };
    /**
     * Generate the calendar month list
     */
    /**
     * Generate the calendar month list
     * @private
     * @return {?}
     */
    OwlYearViewComponent.prototype.generateMonthList = /**
     * Generate the calendar month list
     * @private
     * @return {?}
     */
    function () {
        if (!this.pickerMoment) {
            return;
        }
        this.setSelectedMonths();
        this.todayMonth = this.getMonthInCurrentYear(this.dateTimeAdapter.now());
        this._months = [];
        for (var i = 0; i < MONTHS_PER_YEAR / MONTHS_PER_ROW; i++) {
            /** @type {?} */
            var row = [];
            for (var j = 0; j < MONTHS_PER_ROW; j++) {
                /** @type {?} */
                var month = j + i * MONTHS_PER_ROW;
                /** @type {?} */
                var monthCell = this.createMonthCell(month);
                row.push(monthCell);
            }
            this._months.push(row);
        }
        return;
    };
    /**
     * Creates an CalendarCell for the given month.
     */
    /**
     * Creates an CalendarCell for the given month.
     * @private
     * @param {?} month
     * @return {?}
     */
    OwlYearViewComponent.prototype.createMonthCell = /**
     * Creates an CalendarCell for the given month.
     * @private
     * @param {?} month
     * @return {?}
     */
    function (month) {
        /** @type {?} */
        var startDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        /** @type {?} */
        var ariaLabel = this.dateTimeAdapter.format(startDateOfMonth, this.dateTimeFormats.monthYearA11yLabel);
        /** @type {?} */
        var cellClass = 'owl-dt-month-' + month;
        return new CalendarCell(month, this.monthNames[month], ariaLabel, this.isMonthEnabled(month), false, cellClass);
    };
    /**
     * Check if the given month is enable
     */
    /**
     * Check if the given month is enable
     * @private
     * @param {?} month
     * @return {?}
     */
    OwlYearViewComponent.prototype.isMonthEnabled = /**
     * Check if the given month is enable
     * @private
     * @param {?} month
     * @return {?}
     */
    function (month) {
        /** @type {?} */
        var firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        // If any date in the month is selectable,
        // we count the month as enable
        for (var date = firstDateOfMonth; this.dateTimeAdapter.getMonth(date) === month; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
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
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlYearViewComponent.prototype.getMonthInCurrentYear = /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.getValidDate(date) && this.getValidDate(this._pickerMoment)) {
            /** @type {?} */
            var result = this.dateTimeAdapter.compareYear(date, this._pickerMoment);
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
    };
    /**
     * Set the selectedMonths value
     * In single mode, it has only one value which represent the month the selected date in
     * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
     */
    /**
     * Set the selectedMonths value
     * In single mode, it has only one value which represent the month the selected date in
     * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
     * @private
     * @return {?}
     */
    OwlYearViewComponent.prototype.setSelectedMonths = /**
     * Set the selectedMonths value
     * In single mode, it has only one value which represent the month the selected date in
     * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
     * @private
     * @return {?}
     */
    function () {
        this.selectedMonths = [];
        if (this.isInSingleMode && this.selected) {
            this.selectedMonths[0] = this.getMonthInCurrentYear(this.selected);
        }
        if (this.isInRangeMode && this.selecteds) {
            this.selectedMonths[0] = this.getMonthInCurrentYear(this.selecteds[0]);
            this.selectedMonths[1] = this.getMonthInCurrentYear(this.selecteds[1]);
        }
    };
    /**
     * Check the given dates are in the same year
     */
    /**
     * Check the given dates are in the same year
     * @private
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    OwlYearViewComponent.prototype.hasSameYear = /**
     * Check the given dates are in the same year
     * @private
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        return !!(dateLeft &&
            dateRight &&
            this.dateTimeAdapter.getYear(dateLeft) ===
                this.dateTimeAdapter.getYear(dateRight));
    };
    /**
     * Get a valid date object
     */
    /**
     * Get a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    OwlYearViewComponent.prototype.getValidDate = /**
     * Get a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    };
    /**
     * @private
     * @return {?}
     */
    OwlYearViewComponent.prototype.focusActiveCell = /**
     * @private
     * @return {?}
     */
    function () {
        this.calendarBodyElm.focusActiveCell();
    };
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
    OwlYearViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
    ]; };
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
    return OwlYearViewComponent;
}());
export { OwlYearViewComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFlBQVksRUFDWix3QkFBd0IsRUFDM0IsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUNILFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsUUFBUSxFQUNYLE1BQU0sdUJBQXVCLENBQUM7O0lBRXpCLGVBQWUsR0FBRyxFQUFFOztJQUNwQixjQUFjLEdBQUcsQ0FBQzs7OztBQUV4QjtJQTRMSSw4QkFDWSxLQUF3QixFQUNaLGVBQW1DLEVBRy9DLGVBQW1DO1FBSm5DLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ1osb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBRy9DLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjs7OztRQW5MdkMsZ0JBQVcsR0FBZSxRQUFRLENBQUM7UUEyQm5DLGVBQVUsR0FBUSxFQUFFLENBQUM7UUEyR3JCLGNBQVMsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUU3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QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7O0lBZ1V6RCwyQkFBQztDQUFBLEFBcmZELElBcWZDO1NBNWVZLG9CQUFvQjs7Ozs7OztJQUs3QiwyQ0FBMkM7Ozs7OztJQWUzQyx5Q0FBNEI7Ozs7O0lBWTVCLDBDQUE2Qjs7Ozs7SUFnQjdCLDZDQUFnQzs7Ozs7O0lBdUJoQywyQ0FBMEM7Ozs7OztJQWMxQyx3Q0FBMkI7Ozs7OztJQWUzQix3Q0FBMkI7Ozs7O0lBYzNCLDBDQUFzQzs7Ozs7SUFFdEMsdUNBQWtDOzs7OztJQXVCbEMseUNBQXFEOzs7OztJQUVyRCx5Q0FBMEI7O0lBRTFCLDBDQUFpQzs7Ozs7O0lBTWpDLDhDQUFxQzs7Ozs7SUFLckMsc0NBQ3dDOzs7OztJQUt4Qyw2Q0FDK0M7Ozs7O0lBRy9DLGtEQUNxRTs7Ozs7SUFHckUsNkNBQ29FOzs7OztJQUdwRSwrQ0FDMEM7Ozs7O0lBT3RDLHFDQUFnQzs7Ozs7SUFDaEMsK0NBQXVEOzs7OztJQUN2RCwrQ0FFMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGNhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYWxlbmRhckNlbGwsXG4gICAgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50XG59IGZyb20gJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIEhPTUUsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBQQUdFX0RPV04sXG4gICAgUEFHRV9VUCxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBVUF9BUlJPV1xufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuXG5jb25zdCBNT05USFNfUEVSX1lFQVIgPSAxMjtcbmNvbnN0IE1PTlRIU19QRVJfUk9XID0gMztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLXllYXItdmlldycsXG4gICAgZXhwb3J0QXM6ICdvd2xNb250aFZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtY2FsZW5kYXItdmlld10nOiAnb3dsRFRDYWxlbmRhclZpZXcnXG4gICAgfSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBPd2xZZWFyVmlld0NvbXBvbmVudDxUPlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3QgbW9kZSBvZiB0aGUgcGlja2VyO1xuICAgICAqL1xuICAgIHByaXZhdGUgX3NlbGVjdE1vZGU6IFNlbGVjdE1vZGUgPSAnc2luZ2xlJztcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0TW9kZSh2YWw6IFNlbGVjdE1vZGUpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9IHZhbDtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlTW9udGhMaXN0KCk7XG4gICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cbiAgICBwcml2YXRlIF9zZWxlY3RlZDogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWQoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRNb250aHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkcygpOiBUW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZHModmFsdWVzOiBUW10pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlc1tpXSk7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZHMucHVzaCh0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZE1vbnRocygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BpY2tlck1vbWVudDogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgcGlja2VyTW9tZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyTW9tZW50O1xuICAgIH1cblxuICAgIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcbiAgICAgICAgY29uc3Qgb2xkTW9tZW50ID0gdGhpcy5fcGlja2VyTW9tZW50O1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50ID1cbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5oYXNTYW1lWWVhcihvbGRNb21lbnQsIHRoaXMuX3BpY2tlck1vbWVudCkgJiZcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhdGVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2RhdGVGaWx0ZXI6IChkYXRlOiBUKSA9PiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRhdGVGaWx0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlRmlsdGVyO1xuICAgIH1cblxuICAgIHNldCBkYXRlRmlsdGVyKGZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGF0ZUZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlTW9udGhMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21pbkRhdGU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1pbkRhdGUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWluRGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBwcml2YXRlIF9tYXhEYXRlOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXhEYXRlKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gICAgfVxuXG4gICAgc2V0IG1heERhdGUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9tYXhEYXRlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZG9ubHkgbW9udGhOYW1lczogc3RyaW5nW107XG5cbiAgICBwcml2YXRlIF9tb250aHM6IENhbGVuZGFyQ2VsbFtdW107XG4gICAgZ2V0IG1vbnRocygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRocztcbiAgICB9XG5cbiAgICBnZXQgYWN0aXZlQ2VsbCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fcGlja2VyTW9tZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5fcGlja2VyTW9tZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgfHxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2NhbGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgaW5pdGlhdGVkID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgdG9kYXlNb250aDogbnVtYmVyIHwgbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IHRvIGhvbGQgYWxsIHNlbGVjdGVkRGF0ZXMnIG1vbnRoIHZhbHVlXG4gICAgICogdGhlIHZhbHVlIGlzIHRoZSBtb250aCBudW1iZXIgaW4gY3VycmVudCB5ZWFyXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdGVkTW9udGhzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBuZXcgbW9udGggaXMgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhci4gVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgbW9udGhTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBwaWNrZXJNb21lbnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxUPiA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHVzZSBrZXlib2FyZCBlbnRlciB0byBzZWxlY3QgYSBjYWxlbmRhciBjZWxsICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkga2V5Ym9hcmRFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIC8qKiBUaGUgYm9keSBvZiBjYWxlbmRhciB0YWJsZSAqL1xuICAgIEBWaWV3Q2hpbGQoT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIGNhbGVuZGFyQm9keUVsbTogT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50O1xuXG4gICAgZ2V0IG93bERUQ2FsZW5kYXJWaWV3KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxuICAgICAgICBwcml2YXRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzXG4gICAgKSB7XG4gICAgICAgIHRoaXMubW9udGhOYW1lcyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoTmFtZXMoJ3Nob3J0Jyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxvY2FsZVN1YiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmxvY2FsZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2NhbGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjYWxlbmRhckNlbGwgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0Q2FsZW5kYXJDZWxsKGNlbGw6IENhbGVuZGFyQ2VsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdE1vbnRoKGNlbGwudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIG5ldyBtb250aCBzZWxlY3RlZFxuICAgICAqL1xuICAgIHByaXZhdGUgc2VsZWN0TW9udGgobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBmaXJzdERhdGVPZk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICAxXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQoZmlyc3REYXRlT2ZNb250aCk7XG5cbiAgICAgICAgY29uc3QgZGF5c0luTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aChcbiAgICAgICAgICAgIGZpcnN0RGF0ZU9mTW9udGhcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICBkYXlzSW5Nb250aCxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHJlc3VsdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGtleWRvd24gZXZlbnQgb24gY2FsZW5kYXIgYm9keVxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVDYWxlbmRhcktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgbGV0IG1vbWVudDtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAvLyBtaW51cyAxIG1vbnRoXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAtMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBhZGQgMSBtb250aFxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbWludXMgMyBtb250aHNcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAtM1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBhZGQgMyBtb250aHNcbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIDNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbW92ZSB0byBmaXJzdCBtb250aCBvZiBjdXJyZW50IHllYXJcbiAgICAgICAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIC10aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnBpY2tlck1vbWVudClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbW92ZSB0byBsYXN0IG1vbnRoIG9mIGN1cnJlbnQgeWVhclxuICAgICAgICAgICAgY2FzZSBFTkQ6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAxMSAtIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBtaW51cyAxIHllYXIgKG9yIDEwIHllYXIpXG4gICAgICAgICAgICBjYXNlIFBBR0VfVVA6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmFsdEtleSA/IC0xMCA6IC0xXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIGFkZCAxIHllYXIgKG9yIDEwIHllYXIpXG4gICAgICAgICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuYWx0S2V5ID8gMTAgOiAxXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIFNlbGVjdCBjdXJyZW50IG1vbnRoXG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9udGgoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlib2FyZEVudGVyLmVtaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSB0aGUgY2FsZW5kYXIgbW9udGggbGlzdFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVNb250aExpc3QoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5waWNrZXJNb21lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRNb250aHMoKTtcbiAgICAgICAgdGhpcy50b2RheU1vbnRoID0gdGhpcy5nZXRNb250aEluQ3VycmVudFllYXIoXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuX21vbnRocyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1PTlRIU19QRVJfWUVBUiAvIE1PTlRIU19QRVJfUk9XOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IE1PTlRIU19QRVJfUk9XOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb250aCA9IGogKyBpICogTU9OVEhTX1BFUl9ST1c7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGhDZWxsID0gdGhpcy5jcmVhdGVNb250aENlbGwobW9udGgpO1xuICAgICAgICAgICAgICAgIHJvdy5wdXNoKG1vbnRoQ2VsbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX21vbnRocy5wdXNoKHJvdyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBDYWxlbmRhckNlbGwgZm9yIHRoZSBnaXZlbiBtb250aC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZU1vbnRoQ2VsbChtb250aDogbnVtYmVyKTogQ2FsZW5kYXJDZWxsIHtcbiAgICAgICAgY29uc3Qgc3RhcnREYXRlT2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgMVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBhcmlhTGFiZWwgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXG4gICAgICAgICAgICBzdGFydERhdGVPZk1vbnRoLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUZvcm1hdHMubW9udGhZZWFyQTExeUxhYmVsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNlbGxDbGFzcyA9ICdvd2wtZHQtbW9udGgtJyArIG1vbnRoO1xuICAgICAgICByZXR1cm4gbmV3IENhbGVuZGFyQ2VsbChcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgdGhpcy5tb250aE5hbWVzW21vbnRoXSxcbiAgICAgICAgICAgIGFyaWFMYWJlbCxcbiAgICAgICAgICAgIHRoaXMuaXNNb250aEVuYWJsZWQobW9udGgpLFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBjZWxsQ2xhc3NcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZ2l2ZW4gbW9udGggaXMgZW5hYmxlXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc01vbnRoRW5hYmxlZChtb250aDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgICAgICBtb250aCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBJZiBhbnkgZGF0ZSBpbiB0aGUgbW9udGggaXMgc2VsZWN0YWJsZSxcbiAgICAgICAgLy8gd2UgY291bnQgdGhlIG1vbnRoIGFzIGVuYWJsZVxuICAgICAgICBmb3IgKFxuICAgICAgICAgICAgbGV0IGRhdGUgPSBmaXJzdERhdGVPZk1vbnRoO1xuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZSkgPT09IG1vbnRoO1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhkYXRlLCAxKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhIWRhdGUgJiZcbiAgICAgICAgICAgICAgICAoIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSkpICYmXG4gICAgICAgICAgICAgICAgKCF0aGlzLm1pbkRhdGUgfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlLCB0aGlzLm1pbkRhdGUpID49IDApICYmXG4gICAgICAgICAgICAgICAgKCF0aGlzLm1heERhdGUgfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlLCB0aGlzLm1heERhdGUpIDw9IDApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtb250aCBpbiB0aGlzIHllYXIgdGhhdCB0aGUgZ2l2ZW4gRGF0ZSBmYWxscyBvbi5cbiAgICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIGdpdmVuIERhdGUgaXMgaW4gYW5vdGhlciB5ZWFyLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0TW9udGhJbkN1cnJlbnRZZWFyKGRhdGU6IFQgfCBudWxsKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0VmFsaWREYXRlKGRhdGUpICYmIHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuX3BpY2tlck1vbWVudCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVZZWFyKFxuICAgICAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyA8IDAgOiB0aGUgZ2l2ZW4gZGF0ZSdzIHllYXIgaXMgYmVmb3JlIHBpY2tlck1vbWVudCdzIHllYXIsIHdlIHJldHVybiAtMSBhcyBzZWxlY3RlZCBtb250aCB2YWx1ZS5cbiAgICAgICAgICAgIC8vID4gMCA6IHRoZSBnaXZlbiBkYXRlJ3MgeWVhciBpcyBhZnRlciBwaWNrZXJNb21lbnQncyB5ZWFyLCB3ZSByZXR1cm4gMTIgYXMgc2VsZWN0ZWQgbW9udGggdmFsdWUuXG4gICAgICAgICAgICAvLyAwIDogdGhlIGdpdmUgZGF0ZSdzIHllYXIgaXMgc2FtZSBhcyB0aGUgcGlja2VyTW9tZW50J3MgeWVhciwgd2UgcmV0dXJuIHRoZSBhY3R1YWwgbW9udGggdmFsdWUuXG4gICAgICAgICAgICBpZiAocmVzdWx0IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNlbGVjdGVkTW9udGhzIHZhbHVlXG4gICAgICogSW4gc2luZ2xlIG1vZGUsIGl0IGhhcyBvbmx5IG9uZSB2YWx1ZSB3aGljaCByZXByZXNlbnQgdGhlIG1vbnRoIHRoZSBzZWxlY3RlZCBkYXRlIGluXG4gICAgICogSW4gcmFuZ2UgbW9kZSwgaXQgd291bGQgaGFzIHR3byB2YWx1ZXMsIG9uZSBmb3IgdGhlIG1vbnRoIHRoZSBmcm9tVmFsdWUgaW4gYW5kIHRoZSBvdGhlciBmb3IgdGhlIG1vbnRoIHRoZSB0b1ZhbHVlIGluXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3RlZE1vbnRocygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRocyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSAmJiB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGhzWzBdID0gdGhpcy5nZXRNb250aEluQ3VycmVudFllYXIodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlICYmIHRoaXMuc2VsZWN0ZWRzKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGhzWzBdID0gdGhpcy5nZXRNb250aEluQ3VycmVudFllYXIoXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHNbMF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGhzWzFdID0gdGhpcy5nZXRNb250aEluQ3VycmVudFllYXIoXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHNbMV1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgZ2l2ZW4gZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHllYXJcbiAgICAgKi9cbiAgICBwcml2YXRlIGhhc1NhbWVZZWFyKGRhdGVMZWZ0OiBULCBkYXRlUmlnaHQ6IFQpIHtcbiAgICAgICAgcmV0dXJuICEhKFxuICAgICAgICAgICAgZGF0ZUxlZnQgJiZcbiAgICAgICAgICAgIGRhdGVSaWdodCAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlTGVmdCkgPT09XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlUmlnaHQpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgdmFsaWQgZGF0ZSBvYmplY3RcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKVxuICAgICAgICAgICAgPyBvYmpcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhckJvZHlFbG0uZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgfVxufVxuIl19