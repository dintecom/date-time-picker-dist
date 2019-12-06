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
var DAYS_PER_WEEK = 7;
/** @type {?} */
var WEEKS_PER_VIEW = 6;
/**
 * @template T
 */
var OwlMonthViewComponent = /** @class */ (function () {
    function OwlMonthViewComponent(cdRef, dateTimeAdapter, dateTimeFormats) {
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
    Object.defineProperty(OwlMonthViewComponent.prototype, "firstDayOfWeek", {
        get: /**
         * @return {?}
         */
        function () {
            return this._firstDayOfWeek;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value >= 0 && value <= 6 && value !== this._firstDayOfWeek) {
                this._firstDayOfWeek = value;
                this.isDefaultFirstDayOfWeek = false;
                if (this.initiated) {
                    this.generateWeekDays();
                    this.generateCalendar();
                    this.cdRef.markForCheck();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "selectMode", {
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
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "selected", {
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
            /** @type {?} */
            var oldSelected = this._selected;
            value = this.dateTimeAdapter.deserialize(value);
            this._selected = this.getValidDate(value);
            if (!this.dateTimeAdapter.isSameDay(oldSelected, this._selected)) {
                this.setSelectedDates();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "selecteds", {
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
            var _this = this;
            this._selecteds = values.map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                v = _this.dateTimeAdapter.deserialize(v);
                return _this.getValidDate(v);
            }));
            this.setSelectedDates();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "pickerMoment", {
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
            this.firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this._pickerMoment), this.dateTimeAdapter.getMonth(this._pickerMoment), 1);
            if (!this.isSameMonth(oldMoment, this._pickerMoment) &&
                this.initiated) {
                this.generateCalendar();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "dateFilter", {
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
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "minDate", {
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
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "maxDate", {
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
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "weekdays", {
        get: /**
         * @return {?}
         */
        function () {
            return this._weekdays;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "days", {
        get: /**
         * @return {?}
         */
        function () {
            return this._days;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "activeCell", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.pickerMoment) {
                return (this.dateTimeAdapter.getDate(this.pickerMoment) +
                    this.firstRowOffset -
                    1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "isInRangeMode", {
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
    Object.defineProperty(OwlMonthViewComponent.prototype, "owlDTCalendarView", {
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
    OwlMonthViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.generateWeekDays();
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @param {?} locale
         * @return {?}
         */
        function (locale) {
            _this.generateWeekDays();
            _this.generateCalendar();
            _this.firstDayOfWeek = _this.isDefaultFirstDayOfWeek
                ? getLocaleFirstDayOfWeek(locale)
                : _this.firstDayOfWeek;
            _this.cdRef.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    OwlMonthViewComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.generateCalendar();
        this.initiated = true;
    };
    /**
     * @return {?}
     */
    OwlMonthViewComponent.prototype.ngOnDestroy = /**
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
    OwlMonthViewComponent.prototype.selectCalendarCell = /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        // Cases in which the date would not be selected
        // 1, the calendar cell is NOT enabled (is NOT valid)
        // 2, the selected date is NOT in current picker's month and the hideOtherMonths is enabled
        if (!cell.enabled || (this.hideOtherMonths && cell.out)) {
            return;
        }
        this.selectDate(cell.value);
    };
    /**
     * Handle a new date selected
     */
    /**
     * Handle a new date selected
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlMonthViewComponent.prototype.selectDate = /**
     * Handle a new date selected
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var daysDiff = date - 1;
        /** @type {?} */
        var selected = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
        this.selectedChange.emit(selected);
        this.userSelection.emit();
    };
    /**
     * Handle keydown event on calendar body
     */
    /**
     * Handle keydown event on calendar body
     * @param {?} event
     * @return {?}
     */
    OwlMonthViewComponent.prototype.handleCalendarKeydown = /**
     * Handle keydown event on calendar body
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var moment;
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
    };
    /**
     * Generate the calendar weekdays array
     */
    /**
     * Generate the calendar weekdays array
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.generateWeekDays = /**
     * Generate the calendar weekdays array
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var longWeekdays = this.dateTimeAdapter.getDayOfWeekNames('long');
        /** @type {?} */
        var shortWeekdays = this.dateTimeAdapter.getDayOfWeekNames('short');
        /** @type {?} */
        var narrowWeekdays = this.dateTimeAdapter.getDayOfWeekNames('narrow');
        /** @type {?} */
        var firstDayOfWeek = this.firstDayOfWeek;
        /** @type {?} */
        var weekdays = longWeekdays.map((/**
         * @param {?} long
         * @param {?} i
         * @return {?}
         */
        function (long, i) {
            return { long: long, short: shortWeekdays[i], narrow: narrowWeekdays[i] };
        }));
        this._weekdays = weekdays
            .slice(firstDayOfWeek)
            .concat(weekdays.slice(0, firstDayOfWeek));
        this.dateNames = this.dateTimeAdapter.getDateNames();
        return;
    };
    /**
     * Generate the calendar days array
     */
    /**
     * Generate the calendar days array
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.generateCalendar = /**
     * Generate the calendar days array
     * @private
     * @return {?}
     */
    function () {
        if (!this.pickerMoment) {
            return;
        }
        this.todayDate = null;
        // the first weekday of the month
        /** @type {?} */
        var startWeekdayOfMonth = this.dateTimeAdapter.getDay(this.firstDateOfMonth);
        /** @type {?} */
        var firstDayOfWeek = this.firstDayOfWeek;
        // the amount of days from the first date of the month
        // if it is < 0, it means the date is in previous month
        /** @type {?} */
        var daysDiff = 0 -
            ((startWeekdayOfMonth + (DAYS_PER_WEEK - firstDayOfWeek)) %
                DAYS_PER_WEEK);
        // the index of cell that contains the first date of the month
        this.firstRowOffset = Math.abs(daysDiff);
        this._days = [];
        for (var i = 0; i < WEEKS_PER_VIEW; i++) {
            /** @type {?} */
            var week = [];
            for (var j = 0; j < DAYS_PER_WEEK; j++) {
                /** @type {?} */
                var date = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
                /** @type {?} */
                var dateCell = this.createDateCell(date, daysDiff);
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
    };
    /**
     * Creates CalendarCell for days.
     */
    /**
     * Creates CalendarCell for days.
     * @private
     * @param {?} date
     * @param {?} daysDiff
     * @return {?}
     */
    OwlMonthViewComponent.prototype.createDateCell = /**
     * Creates CalendarCell for days.
     * @private
     * @param {?} date
     * @param {?} daysDiff
     * @return {?}
     */
    function (date, daysDiff) {
        // total days of the month
        /** @type {?} */
        var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment);
        /** @type {?} */
        var dateNum = this.dateTimeAdapter.getDate(date);
        // const dateName = this.dateNames[dateNum - 1];
        /** @type {?} */
        var dateName = dateNum.toString();
        /** @type {?} */
        var ariaLabel = this.dateTimeAdapter.format(date, this.dateTimeFormats.dateA11yLabel);
        // check if the date if selectable
        /** @type {?} */
        var enabled = this.isDateEnabled(date);
        // check if date is not in current month
        /** @type {?} */
        var dayValue = daysDiff + 1;
        /** @type {?} */
        var out = dayValue < 1 || dayValue > daysInMonth;
        /** @type {?} */
        var cellClass = 'owl-dt-day-' + this.dateTimeAdapter.getDay(date);
        return new CalendarCell(dayValue, dateName, ariaLabel, enabled, out, cellClass);
    };
    /**
     * Check if the date is valid
     */
    /**
     * Check if the date is valid
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlMonthViewComponent.prototype.isDateEnabled = /**
     * Check if the date is valid
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return (!!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate ||
                this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
            (!this.maxDate ||
                this.dateTimeAdapter.compare(date, this.maxDate) <= 0));
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
    OwlMonthViewComponent.prototype.getValidDate = /**
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
     * Check if the give dates are none-null and in the same month
     */
    /**
     * Check if the give dates are none-null and in the same month
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    OwlMonthViewComponent.prototype.isSameMonth = /**
     * Check if the give dates are none-null and in the same month
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        return !!(dateLeft &&
            dateRight &&
            this.dateTimeAdapter.isValid(dateLeft) &&
            this.dateTimeAdapter.isValid(dateRight) &&
            this.dateTimeAdapter.getYear(dateLeft) ===
                this.dateTimeAdapter.getYear(dateRight) &&
            this.dateTimeAdapter.getMonth(dateLeft) ===
                this.dateTimeAdapter.getMonth(dateRight));
    };
    /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     */
    /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.setSelectedDates = /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.selectedDates = [];
        if (!this.firstDateOfMonth) {
            return;
        }
        if (this.isInSingleMode && this.selected) {
            /** @type {?} */
            var dayDiff = this.dateTimeAdapter.differenceInCalendarDays(this.selected, this.firstDateOfMonth);
            this.selectedDates[0] = dayDiff + 1;
            return;
        }
        if (this.isInRangeMode && this.selecteds) {
            this.selectedDates = this.selecteds.map((/**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                if (_this.dateTimeAdapter.isValid(selected)) {
                    /** @type {?} */
                    var dayDiff = _this.dateTimeAdapter.differenceInCalendarDays(selected, _this.firstDateOfMonth);
                    return dayDiff + 1;
                }
                else {
                    return null;
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.focusActiveCell = /**
     * @private
     * @return {?}
     */
    function () {
        this.calendarBodyElm.focusActiveCell();
    };
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
    OwlMonthViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
    ]; };
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
    return OwlMonthViewComponent;
}());
export { OwlMonthViewComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsWUFBWSxFQUNaLHdCQUF3QixFQUMzQixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQyxPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFFcEQsYUFBYSxHQUFHLENBQUM7O0lBQ2pCLGNBQWMsR0FBRyxDQUFDOzs7O0FBRXhCO0lBc1BJLCtCQUNZLEtBQXdCLEVBQ1osZUFBbUMsRUFHL0MsZUFBbUM7UUFKbkMsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9COzs7O1FBNU8vQyxvQkFBZSxHQUFHLEtBQUssQ0FBQzs7Ozs7UUFNaEIsb0JBQWUsR0FBRyx1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LEtBQUs7aUNBMEVMLE1BQU07Z0NBTU4sTUFBTTtxQ0FJTixNQUFNO2tDQUlOLFNBQVMsU0FBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7O0lBMFd6RCw0QkFBQztDQUFBLEFBemxCRCxJQXlsQkM7U0FobEJZLHFCQUFxQjs7Ozs7O0lBSzlCLGdEQUN3Qjs7Ozs7OztJQU14QixnREFFRTs7Ozs7O0lBc0JGLDRDQUEyQzs7Ozs7O0lBZTNDLDBDQUE0Qjs7Ozs7SUFnQjVCLDJDQUE2Qjs7Ozs7SUFjN0IsOENBQXlCOzs7Ozs7SUE2QnpCLDRDQUEwQzs7Ozs7O0lBZTFDLHlDQUEyQjs7Ozs7O0lBZ0IzQix5Q0FBMkI7Ozs7O0lBZ0IzQiwwQ0FBMEU7Ozs7O0lBSzFFLHNDQUFnQzs7Ozs7SUEyQmhDLGlEQUE0Qjs7Ozs7SUFFNUIsd0RBQXVDOzs7OztJQUV2QywwQ0FBcUQ7Ozs7O0lBRXJELDBDQUEwQjs7Ozs7SUFFMUIsMENBQTRCOzs7OztJQUs1QiwwQ0FBZ0M7Ozs7OztJQU1oQyw4Q0FBb0M7O0lBR3BDLCtDQUE4Qjs7Ozs7SUFLOUIsK0NBQ3VEOzs7OztJQUt2RCw4Q0FDa0Q7Ozs7O0lBR2xELG1EQUNxRTs7Ozs7SUFHckUsZ0RBQzBDOzs7OztJQU90QyxzQ0FBZ0M7Ozs7O0lBQ2hDLGdEQUF1RDs7Ozs7SUFDdkQsZ0RBRTJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBjYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbGVuZGFyQ2VsbCxcbiAgICBPd2xDYWxlbmRhckJvZHlDb21wb25lbnRcbn0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBPV0xfREFURV9USU1FX0ZPUk1BVFMsXG4gICAgT3dsRGF0ZVRpbWVGb3JtYXRzXG59IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgSE9NRSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFBBR0VfRE9XTixcbiAgICBQQUdFX1VQLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBnZXRMb2NhbGVGaXJzdERheU9mV2VlayB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmNvbnN0IERBWVNfUEVSX1dFRUsgPSA3O1xuY29uc3QgV0VFS1NfUEVSX1ZJRVcgPSA2O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUtbW9udGgtdmlldycsXG4gICAgZXhwb3J0QXM6ICdvd2xZZWFyVmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtY2FsZW5kYXItdmlld10nOiAnb3dsRFRDYWxlbmRhclZpZXcnXG4gICAgfSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBPd2xNb250aFZpZXdDb21wb25lbnQ8VD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGhpZGUgZGF0ZXMgaW4gb3RoZXIgbW9udGhzIGF0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGN1cnJlbnQgbW9udGguXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoaWRlT3RoZXJNb250aHMgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIERlZmluZSB0aGUgZmlyc3QgZGF5IG9mIGEgd2Vla1xuICAgICAqIFN1bmRheTogMCAtIFNhdHVyZGF5OiA2XG4gICAgICovXG4gICAgcHJpdmF0ZSBfZmlyc3REYXlPZldlZWsgPSBnZXRMb2NhbGVGaXJzdERheU9mV2VlayhcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TG9jYWxlKClcbiAgICApO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdERheU9mV2VlaztcbiAgICB9XG5cbiAgICBzZXQgZmlyc3REYXlPZldlZWsodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodmFsdWUgPj0gMCAmJiB2YWx1ZSA8PSA2ICYmIHZhbHVlICE9PSB0aGlzLl9maXJzdERheU9mV2Vlaykge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3REYXlPZldlZWsgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuaXNEZWZhdWx0Rmlyc3REYXlPZldlZWsgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVdlZWtEYXlzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3QgbW9kZSBvZiB0aGUgcGlja2VyO1xuICAgICAqL1xuICAgIHByaXZhdGUgX3NlbGVjdE1vZGU6IFNlbGVjdE1vZGUgPSAnc2luZ2xlJztcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0TW9kZSh2YWw6IFNlbGVjdE1vZGUpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9IHZhbDtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIGNvbnN0IG9sZFNlbGVjdGVkID0gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzU2FtZURheShvbGRTZWxlY3RlZCwgdGhpcy5fc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkRGF0ZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWRzKCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSB2YWx1ZXMubWFwKHYgPT4ge1xuICAgICAgICAgICAgdiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHYpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWREYXRlKHYpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZERhdGVzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGlja2VyTW9tZW50OiBUO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBpY2tlck1vbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcbiAgICB9XG5cbiAgICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XG4gICAgICAgIGNvbnN0IG9sZE1vbWVudCA9IHRoaXMuX3BpY2tlck1vbWVudDtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCA9XG4gICAgICAgICAgICB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG5cbiAgICAgICAgdGhpcy5maXJzdERhdGVPZk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMuX3BpY2tlck1vbWVudCksXG4gICAgICAgICAgICAxXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuaXNTYW1lTW9udGgob2xkTW9tZW50LCB0aGlzLl9waWNrZXJNb21lbnQpICYmXG4gICAgICAgICAgICB0aGlzLmluaXRpYXRlZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2RhdGVGaWx0ZXI6IChkYXRlOiBUKSA9PiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRhdGVGaWx0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlRmlsdGVyO1xuICAgIH1cblxuICAgIHNldCBkYXRlRmlsdGVyKGZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGF0ZUZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21pbkRhdGU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1pbkRhdGUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWluRGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBwcml2YXRlIF9tYXhEYXRlOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXhEYXRlKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gICAgfVxuXG4gICAgc2V0IG1heERhdGUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9tYXhEYXRlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfd2Vla2RheXM6IEFycmF5PHsgbG9uZzogc3RyaW5nOyBzaG9ydDogc3RyaW5nOyBuYXJyb3c6IHN0cmluZyB9PjtcbiAgICBnZXQgd2Vla2RheXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5cztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kYXlzOiBDYWxlbmRhckNlbGxbXVtdO1xuICAgIGdldCBkYXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF5cztcbiAgICB9XG5cbiAgICBnZXQgYWN0aXZlQ2VsbCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5waWNrZXJNb21lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnBpY2tlck1vbWVudCkgK1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RSb3dPZmZzZXQgLVxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlyc3REYXRlT2ZNb250aDogVDtcblxuICAgIHByaXZhdGUgaXNEZWZhdWx0Rmlyc3REYXlPZldlZWsgPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBsb2NhbGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgaW5pdGlhdGVkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGRhdGVOYW1lczogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZGF0ZSBvZiB0aGUgbW9udGggdGhhdCB0b2RheSBmYWxscyBvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9kYXlEYXRlOiBudW1iZXIgfCBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgdG8gaG9sZCBhbGwgc2VsZWN0ZWREYXRlcycgdmFsdWVcbiAgICAgKiB0aGUgdmFsdWUgaXMgdGhlIGRheSBudW1iZXIgaW4gY3VycmVudCBtb250aFxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3RlZERhdGVzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgLy8gdGhlIGluZGV4IG9mIGNlbGwgdGhhdCBjb250YWlucyB0aGUgZmlyc3QgZGF0ZSBvZiB0aGUgbW9udGhcbiAgICBwdWJsaWMgZmlyc3RSb3dPZmZzZXQ6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgbmV3IGRhdGUgaXMgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VCB8IG51bGw+KCk7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbnkgZGF0ZSBpcyBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSB1c2VyU2VsZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEVtaXRzIHdoZW4gYW55IGRhdGUgaXMgYWN0aXZhdGVkLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHBpY2tlck1vbWVudENoYW5nZTogRXZlbnRFbWl0dGVyPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgLyoqIFRoZSBib2R5IG9mIGNhbGVuZGFyIHRhYmxlICovXG4gICAgQFZpZXdDaGlsZChPd2xDYWxlbmRhckJvZHlDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgY2FsZW5kYXJCb2R5RWxtOiBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQ7XG5cbiAgICBnZXQgb3dsRFRDYWxlbmRhclZpZXcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXG4gICAgICAgIHByaXZhdGUgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHNcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVXZWVrRGF5cygpO1xuXG4gICAgICAgIHRoaXMubG9jYWxlU3ViID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIubG9jYWxlQ2hhbmdlcy5zdWJzY3JpYmUoXG4gICAgICAgICAgICBsb2NhbGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVXZWVrRGF5cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3REYXlPZldlZWsgPSB0aGlzLmlzRGVmYXVsdEZpcnN0RGF5T2ZXZWVrXG4gICAgICAgICAgICAgICAgICAgID8gZ2V0TG9jYWxlRmlyc3REYXlPZldlZWsobG9jYWxlKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZmlyc3REYXlPZldlZWs7XG4gICAgICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2NhbGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjYWxlbmRhckNlbGwgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0Q2FsZW5kYXJDZWxsKGNlbGw6IENhbGVuZGFyQ2VsbCk6IHZvaWQge1xuICAgICAgICAvLyBDYXNlcyBpbiB3aGljaCB0aGUgZGF0ZSB3b3VsZCBub3QgYmUgc2VsZWN0ZWRcbiAgICAgICAgLy8gMSwgdGhlIGNhbGVuZGFyIGNlbGwgaXMgTk9UIGVuYWJsZWQgKGlzIE5PVCB2YWxpZClcbiAgICAgICAgLy8gMiwgdGhlIHNlbGVjdGVkIGRhdGUgaXMgTk9UIGluIGN1cnJlbnQgcGlja2VyJ3MgbW9udGggYW5kIHRoZSBoaWRlT3RoZXJNb250aHMgaXMgZW5hYmxlZFxuICAgICAgICBpZiAoIWNlbGwuZW5hYmxlZCB8fCAodGhpcy5oaWRlT3RoZXJNb250aHMgJiYgY2VsbC5vdXQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdERhdGUoY2VsbC52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgbmV3IGRhdGUgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbGVjdERhdGUoZGF0ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRheXNEaWZmID0gZGF0ZSAtIDE7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgICAgdGhpcy5maXJzdERhdGVPZk1vbnRoLFxuICAgICAgICAgICAgZGF5c0RpZmZcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnVzZXJTZWxlY3Rpb24uZW1pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBrZXlkb3duIGV2ZW50IG9uIGNhbGVuZGFyIGJvZHlcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlQ2FsZW5kYXJLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGxldCBtb21lbnQ7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgLy8gbWludXMgMSBkYXlcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAtMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBhZGQgMSBkYXlcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBtaW51cyAxIHdlZWtcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgLTdcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gYWRkIDEgd2Vla1xuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIDdcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbW92ZSB0byBmaXJzdCBkYXkgb2YgY3VycmVudCBtb250aFxuICAgICAgICAgICAgY2FzZSBIT01FOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIDEgLSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIHRvIGxhc3QgZGF5IG9mIGN1cnJlbnQgbW9udGhcbiAgICAgICAgICAgIGNhc2UgRU5EOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKHRoaXMucGlja2VyTW9tZW50KSAtXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBtaW51cyAxIG1vbnRoIChvciAxIHllYXIpXG4gICAgICAgICAgICBjYXNlIFBBR0VfVVA6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gZXZlbnQuYWx0S2V5XG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC0xXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLTFcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gYWRkIDEgbW9udGggKG9yIDEgeWVhcilcbiAgICAgICAgICAgIGNhc2UgUEFHRV9ET1dOOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IGV2ZW50LmFsdEtleVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBzZWxlY3QgdGhlIHBpY2tlck1vbWVudFxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIodGhpcy5waWNrZXJNb21lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIHRoZSBjYWxlbmRhciB3ZWVrZGF5cyBhcnJheVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVXZWVrRGF5cygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbG9uZ1dlZWtkYXlzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoJ2xvbmcnKTtcbiAgICAgICAgY29uc3Qgc2hvcnRXZWVrZGF5cyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCdzaG9ydCcpO1xuICAgICAgICBjb25zdCBuYXJyb3dXZWVrZGF5cyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCduYXJyb3cnKTtcbiAgICAgICAgY29uc3QgZmlyc3REYXlPZldlZWsgPSB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuXG4gICAgICAgIGNvbnN0IHdlZWtkYXlzID0gbG9uZ1dlZWtkYXlzLm1hcCgobG9uZywgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgbG9uZywgc2hvcnQ6IHNob3J0V2Vla2RheXNbaV0sIG5hcnJvdzogbmFycm93V2Vla2RheXNbaV0gfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fd2Vla2RheXMgPSB3ZWVrZGF5c1xuICAgICAgICAgICAgLnNsaWNlKGZpcnN0RGF5T2ZXZWVrKVxuICAgICAgICAgICAgLmNvbmNhdCh3ZWVrZGF5cy5zbGljZSgwLCBmaXJzdERheU9mV2VlaykpO1xuXG4gICAgICAgIHRoaXMuZGF0ZU5hbWVzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZU5hbWVzKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIHRoZSBjYWxlbmRhciBkYXlzIGFycmF5XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUNhbGVuZGFyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucGlja2VyTW9tZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvZGF5RGF0ZSA9IG51bGw7XG5cbiAgICAgICAgLy8gdGhlIGZpcnN0IHdlZWtkYXkgb2YgdGhlIG1vbnRoXG4gICAgICAgIGNvbnN0IHN0YXJ0V2Vla2RheU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXkoXG4gICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGhcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZmlyc3REYXlPZldlZWsgPSB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuXG4gICAgICAgIC8vIHRoZSBhbW91bnQgb2YgZGF5cyBmcm9tIHRoZSBmaXJzdCBkYXRlIG9mIHRoZSBtb250aFxuICAgICAgICAvLyBpZiBpdCBpcyA8IDAsIGl0IG1lYW5zIHRoZSBkYXRlIGlzIGluIHByZXZpb3VzIG1vbnRoXG4gICAgICAgIGxldCBkYXlzRGlmZiA9XG4gICAgICAgICAgICAwIC1cbiAgICAgICAgICAgICgoc3RhcnRXZWVrZGF5T2ZNb250aCArIChEQVlTX1BFUl9XRUVLIC0gZmlyc3REYXlPZldlZWspKSAlXG4gICAgICAgICAgICAgICAgREFZU19QRVJfV0VFSyk7XG5cbiAgICAgICAgLy8gdGhlIGluZGV4IG9mIGNlbGwgdGhhdCBjb250YWlucyB0aGUgZmlyc3QgZGF0ZSBvZiB0aGUgbW9udGhcbiAgICAgICAgdGhpcy5maXJzdFJvd09mZnNldCA9IE1hdGguYWJzKGRheXNEaWZmKTtcblxuICAgICAgICB0aGlzLl9kYXlzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgV0VFS1NfUEVSX1ZJRVc7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgd2VlayA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBEQVlTX1BFUl9XRUVLOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGgsXG4gICAgICAgICAgICAgICAgICAgIGRheXNEaWZmXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlQ2VsbCA9IHRoaXMuY3JlYXRlRGF0ZUNlbGwoZGF0ZSwgZGF5c0RpZmYpO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGRhdGUgaXMgdG9kYXlcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzU2FtZURheShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9kYXlEYXRlID0gZGF5c0RpZmYgKyAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdlZWsucHVzaChkYXRlQ2VsbCk7XG4gICAgICAgICAgICAgICAgZGF5c0RpZmYgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2RheXMucHVzaCh3ZWVrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWREYXRlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgQ2FsZW5kYXJDZWxsIGZvciBkYXlzLlxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlRGF0ZUNlbGwoZGF0ZTogVCwgZGF5c0RpZmY6IG51bWJlcik6IENhbGVuZGFyQ2VsbCB7XG4gICAgICAgIC8vIHRvdGFsIGRheXMgb2YgdGhlIG1vbnRoXG4gICAgICAgIGNvbnN0IGRheXNJbk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgoXG4gICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkYXRlTnVtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZShkYXRlKTtcbiAgICAgICAgLy8gY29uc3QgZGF0ZU5hbWUgPSB0aGlzLmRhdGVOYW1lc1tkYXRlTnVtIC0gMV07XG4gICAgICAgIGNvbnN0IGRhdGVOYW1lID0gZGF0ZU51bS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBhcmlhTGFiZWwgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUZvcm1hdHMuZGF0ZUExMXlMYWJlbFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBkYXRlIGlmIHNlbGVjdGFibGVcbiAgICAgICAgY29uc3QgZW5hYmxlZCA9IHRoaXMuaXNEYXRlRW5hYmxlZChkYXRlKTtcblxuICAgICAgICAvLyBjaGVjayBpZiBkYXRlIGlzIG5vdCBpbiBjdXJyZW50IG1vbnRoXG4gICAgICAgIGNvbnN0IGRheVZhbHVlID0gZGF5c0RpZmYgKyAxO1xuICAgICAgICBjb25zdCBvdXQgPSBkYXlWYWx1ZSA8IDEgfHwgZGF5VmFsdWUgPiBkYXlzSW5Nb250aDtcbiAgICAgICAgY29uc3QgY2VsbENsYXNzID0gJ293bC1kdC1kYXktJyArIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheShkYXRlKTtcblxuICAgICAgICByZXR1cm4gbmV3IENhbGVuZGFyQ2VsbChcbiAgICAgICAgICAgIGRheVZhbHVlLFxuICAgICAgICAgICAgZGF0ZU5hbWUsXG4gICAgICAgICAgICBhcmlhTGFiZWwsXG4gICAgICAgICAgICBlbmFibGVkLFxuICAgICAgICAgICAgb3V0LFxuICAgICAgICAgICAgY2VsbENsYXNzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGRhdGUgaXMgdmFsaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzRGF0ZUVuYWJsZWQoZGF0ZTogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgISFkYXRlICYmXG4gICAgICAgICAgICAoIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSkpICYmXG4gICAgICAgICAgICAoIXRoaXMubWluRGF0ZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZGF0ZSwgdGhpcy5taW5EYXRlKSA+PSAwKSAmJlxuICAgICAgICAgICAgKCF0aGlzLm1heERhdGUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGUsIHRoaXMubWF4RGF0ZSkgPD0gMClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSB2YWxpZCBkYXRlIG9iamVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChvYmopXG4gICAgICAgICAgICA/IG9ialxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlIGRhdGVzIGFyZSBub25lLW51bGwgYW5kIGluIHRoZSBzYW1lIG1vbnRoXG4gICAgICovXG4gICAgcHVibGljIGlzU2FtZU1vbnRoKGRhdGVMZWZ0OiBULCBkYXRlUmlnaHQ6IFQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhKFxuICAgICAgICAgICAgZGF0ZUxlZnQgJiZcbiAgICAgICAgICAgIGRhdGVSaWdodCAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChkYXRlTGVmdCkgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQoZGF0ZVJpZ2h0KSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlTGVmdCkgPT09XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlUmlnaHQpICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlTGVmdCkgPT09XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZVJpZ2h0KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgc2VsZWN0ZWREYXRlcyB2YWx1ZS5cbiAgICAgKiBJbiBzaW5nbGUgbW9kZSwgaXQgaGFzIG9ubHkgb25lIHZhbHVlIHdoaWNoIHJlcHJlc2VudCB0aGUgc2VsZWN0ZWQgZGF0ZVxuICAgICAqIEluIHJhbmdlIG1vZGUsIGl0IHdvdWxkIGhhcyB0d28gdmFsdWVzLCBvbmUgZm9yIHRoZSBmcm9tVmFsdWUgYW5kIHRoZSBvdGhlciBmb3IgdGhlIHRvVmFsdWVcbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFNlbGVjdGVkRGF0ZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlcyA9IFtdO1xuXG4gICAgICAgIGlmICghdGhpcy5maXJzdERhdGVPZk1vbnRoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSAmJiB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBkYXlEaWZmID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdERhdGVPZk1vbnRoXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVzWzBdID0gZGF5RGlmZiArIDE7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlICYmIHRoaXMuc2VsZWN0ZWRzKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZXMgPSB0aGlzLnNlbGVjdGVkcy5tYXAoc2VsZWN0ZWQgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHNlbGVjdGVkKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXlEaWZmID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGhcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRheURpZmYgKyAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb2N1c0FjdGl2ZUNlbGwoKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJCb2R5RWxtLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIH1cbn1cbiJdfQ==