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
export var YEARS_PER_ROW = 3;
/** @type {?} */
export var YEAR_ROWS = 7;
/**
 * @template T
 */
var OwlMultiYearViewComponent = /** @class */ (function () {
    function OwlMultiYearViewComponent(cdRef, pickerIntl, dateTimeAdapter) {
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
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "selectMode", {
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
                this.setSelectedYears();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "selected", {
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
                this.setSelectedYears();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "selecteds", {
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
            this.setSelectedYears();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "pickerMoment", {
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
            if (oldMoment &&
                this._pickerMoment &&
                !this.isSameYearList(oldMoment, this._pickerMoment)) {
                this.generateYearList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "dateFilter", {
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
                this.generateYearList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "minDate", {
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
                this.generateYearList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "maxDate", {
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
                this.generateYearList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "todayYear", {
        get: /**
         * @return {?}
         */
        function () {
            return this._todayYear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "years", {
        get: /**
         * @return {?}
         */
        function () {
            return this._years;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "selectedYears", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectedYears;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "isInRangeMode", {
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
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "activeCell", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._pickerMoment) {
                return (this.dateTimeAdapter.getYear(this._pickerMoment) %
                    (YEARS_PER_ROW * YEAR_ROWS));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "tableHeader", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._years && this._years.length > 0) {
                return this._years[0][0].displayValue + " - " + this._years[YEAR_ROWS - 1][YEARS_PER_ROW - 1].displayValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "prevButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.prevMultiYearLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "nextButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.nextMultiYearLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "owlDTCalendarView", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "owlDTCalendarMultiYearView", {
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
    OwlMultiYearViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._todayYear = this.dateTimeAdapter.getYear(this.dateTimeAdapter.now());
        this.generateYearList();
        this.initiated = true;
    };
    /**
     * Handle a calendarCell selected
     */
    /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.selectCalendarCell = /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        this.selectYear(cell.value);
    };
    /**
     * @private
     * @param {?} year
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.selectYear = /**
     * @private
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.yearSelected.emit(this.dateTimeAdapter.createDate(year, 0, 1));
        /** @type {?} */
        var firstDateOfMonth = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), 1);
        /** @type {?} */
        var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
        /** @type {?} */
        var selected = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.change.emit(selected);
    };
    /**
     * Generate the previous year list
     */
    /**
     * Generate the previous year list
     * @param {?} event
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.prevYearList = /**
     * Generate the previous year list
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1 * YEAR_ROWS * YEARS_PER_ROW);
        this.generateYearList();
        event.preventDefault();
    };
    /**
     * Generate the next year list
     */
    /**
     * Generate the next year list
     * @param {?} event
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.nextYearList = /**
     * Generate the next year list
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, YEAR_ROWS * YEARS_PER_ROW);
        this.generateYearList();
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.generateYearList = /**
     * @return {?}
     */
    function () {
        this._years = [];
        /** @type {?} */
        var pickerMomentYear = this.dateTimeAdapter.getYear(this._pickerMoment);
        /** @type {?} */
        var offset = pickerMomentYear % (YEARS_PER_ROW * YEAR_ROWS);
        for (var i = 0; i < YEAR_ROWS; i++) {
            /** @type {?} */
            var row = [];
            for (var j = 0; j < YEARS_PER_ROW; j++) {
                /** @type {?} */
                var year = pickerMomentYear - offset + (j + i * YEARS_PER_ROW);
                /** @type {?} */
                var yearCell = this.createYearCell(year);
                row.push(yearCell);
            }
            this._years.push(row);
        }
        return;
    };
    /** Whether the previous period button is enabled. */
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.previousEnabled = /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    function () {
        if (!this.minDate) {
            return true;
        }
        return (!this.minDate ||
            !this.isSameYearList(this._pickerMoment, this.minDate));
    };
    /** Whether the next period button is enabled. */
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.nextEnabled = /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    function () {
        return (!this.maxDate ||
            !this.isSameYearList(this._pickerMoment, this.maxDate));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.handleCalendarKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var moment;
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
    };
    /**
     * Creates an CalendarCell for the given year.
     */
    /**
     * Creates an CalendarCell for the given year.
     * @private
     * @param {?} year
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.createYearCell = /**
     * Creates an CalendarCell for the given year.
     * @private
     * @param {?} year
     * @return {?}
     */
    function (year) {
        /** @type {?} */
        var startDateOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
        /** @type {?} */
        var ariaLabel = this.dateTimeAdapter.getYearName(startDateOfYear);
        /** @type {?} */
        var cellClass = 'owl-dt-year-' + year;
        return new CalendarCell(year, year.toString(), ariaLabel, this.isYearEnabled(year), false, cellClass);
    };
    /**
     * @private
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.setSelectedYears = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._selectedYears = [];
        if (this.isInSingleMode && this.selected) {
            this._selectedYears[0] = this.dateTimeAdapter.getYear(this.selected);
        }
        if (this.isInRangeMode && this.selecteds) {
            this._selectedYears = this.selecteds.map((/**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                if (_this.dateTimeAdapter.isValid(selected)) {
                    return _this.dateTimeAdapter.getYear(selected);
                }
                else {
                    return null;
                }
            }));
        }
    };
    /** Whether the given year is enabled. */
    /**
     * Whether the given year is enabled.
     * @private
     * @param {?} year
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.isYearEnabled = /**
     * Whether the given year is enabled.
     * @private
     * @param {?} year
     * @return {?}
     */
    function (year) {
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
        var firstOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
        // If any date in the year is enabled count the year as enabled.
        for (var date = firstOfYear; this.dateTimeAdapter.getYear(date) === year; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.isSameYearList = /**
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function (date1, date2) {
        return (Math.floor(this.dateTimeAdapter.getYear(date1) /
            (YEARS_PER_ROW * YEAR_ROWS)) ===
            Math.floor(this.dateTimeAdapter.getYear(date2) /
                (YEARS_PER_ROW * YEAR_ROWS)));
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
    OwlMultiYearViewComponent.prototype.getValidDate = /**
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
    OwlMultiYearViewComponent.prototype.focusActiveCell = /**
     * @private
     * @return {?}
     */
    function () {
        this.calendarBodyElm.focusActiveCell();
    };
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
    OwlMultiYearViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: OwlDateTimeIntl },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] }
    ]; };
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
    return OwlMultiYearViewComponent;
}());
export { OwlMultiYearViewComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbXVsdGkteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILFlBQVksRUFDWix3QkFBd0IsRUFDM0IsTUFBTSwyQkFBMkIsQ0FBQztBQUVuQyxPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBRWxFLE1BQU0sS0FBTyxhQUFhLEdBQUcsQ0FBQzs7QUFDOUIsTUFBTSxLQUFPLFNBQVMsR0FBRyxDQUFDOzs7O0FBRTFCO0lBbU5JLG1DQUNZLEtBQXdCLEVBQ3hCLFVBQTJCLEVBQ2YsZUFBbUM7UUFGL0MsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDZixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7Ozs7UUF6TW5ELGdCQUFXLEdBQWUsUUFBUSxDQUFDO1FBK0JuQyxlQUFVLEdBQVEsRUFBRSxDQUFDO1FBZ0dyQixjQUFTLEdBQUcsS0FBSyxDQUFDOzs7O1FBMENQLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFD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Szs2QkF3QkwsS0FBSzswQkFjTCxLQUFLOzBCQWVMLEtBQUs7eUJBc0VMLE1BQU07K0JBS04sTUFBTTtxQ0FHTixNQUFNO2dDQUtOLE1BQU07a0NBS04sU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUFpVXpELGdDQUFDO0NBQUEsQUF6Z0JELElBeWdCQztTQWhnQlkseUJBQXlCOzs7Ozs7O0lBSWxDLGdEQUEyQzs7Ozs7O0lBZTNDLDhDQUE0Qjs7Ozs7SUFnQjVCLCtDQUE2Qjs7Ozs7SUFjN0Isa0RBQWdDOzs7Ozs7SUF3QmhDLGdEQUEwQzs7Ozs7O0lBYzFDLDZDQUEyQjs7Ozs7O0lBZTNCLDZDQUEyQjs7Ozs7SUFjM0IsK0NBQTJCOzs7OztJQUszQiwyQ0FBaUM7Ozs7O0lBS2pDLG1EQUFpQzs7Ozs7SUFLakMsOENBQTBCOzs7OztJQTBDMUIsMkNBQWtEOzs7OztJQUtsRCxpREFBd0Q7Ozs7O0lBR3hELHVEQUVJOzs7OztJQUdKLGtEQUVJOzs7OztJQUdKLG9EQUMwQzs7Ozs7SUFXdEMsMENBQWdDOzs7OztJQUNoQywrQ0FBbUM7Ozs7O0lBQ25DLG9EQUF1RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY2FsZW5kYXItbXVsdGkteWVhci12aWV3LmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7XG4gICAgQ2FsZW5kYXJDZWxsLFxuICAgIE93bENhbGVuZGFyQm9keUNvbXBvbmVudFxufSBmcm9tICcuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIEhPTUUsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBQQUdFX0RPV04sXG4gICAgUEFHRV9VUCxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBVUF9BUlJPV1xufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnRsIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBZRUFSU19QRVJfUk9XID0gMztcbmV4cG9ydCBjb25zdCBZRUFSX1JPV1MgPSA3O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUtbXVsdGkteWVhci12aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItbXVsdGkteWVhci12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLXZpZXddJzogJ293bERUQ2FsZW5kYXJWaWV3JyxcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtY2FsZW5kYXItbXVsdGkteWVhci12aWV3XSc6ICdvd2xEVENhbGVuZGFyTXVsdGlZZWFyVmlldydcbiAgICB9LFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE93bE11bHRpWWVhclZpZXdDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xuICAgIC8qKlxuICAgICAqIFRoZSBzZWxlY3QgbW9kZSBvZiB0aGUgcGlja2VyO1xuICAgICAqL1xuICAgIHByaXZhdGUgX3NlbGVjdE1vZGU6IFNlbGVjdE1vZGUgPSAnc2luZ2xlJztcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0TW9kZSh2YWw6IFNlbGVjdE1vZGUpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9IHZhbDtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkWWVhcnMoKTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIGNvbnN0IG9sZFNlbGVjdGVkID0gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzU2FtZURheShvbGRTZWxlY3RlZCwgdGhpcy5fc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkWWVhcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWRzKCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSB2YWx1ZXMubWFwKHYgPT4ge1xuICAgICAgICAgICAgdiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHYpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWREYXRlKHYpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZFllYXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGlja2VyTW9tZW50OiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBwaWNrZXJNb21lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJNb21lbnQ7XG4gICAgfVxuXG4gICAgc2V0IHBpY2tlck1vbWVudCh2YWx1ZTogVCkge1xuICAgICAgICBjb25zdCBvbGRNb21lbnQgPSB0aGlzLl9waWNrZXJNb21lbnQ7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQgPVxuICAgICAgICAgICAgdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG9sZE1vbWVudCAmJlxuICAgICAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50ICYmXG4gICAgICAgICAgICAhdGhpcy5pc1NhbWVZZWFyTGlzdChvbGRNb21lbnQsIHRoaXMuX3BpY2tlck1vbWVudClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9kYXRlRmlsdGVyOiAoZGF0ZTogVCkgPT4gYm9vbGVhbjtcbiAgICBASW5wdXQoKVxuICAgIGdldCBkYXRlRmlsdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUZpbHRlcjtcbiAgICB9XG5cbiAgICBzZXQgZGF0ZUZpbHRlcihmaWx0ZXI6IChkYXRlOiBUKSA9PiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2RhdGVGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21pbkRhdGU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1pbkRhdGUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWluRGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21heERhdGU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heERhdGUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWF4RGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21heERhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF90b2RheVllYXI6IG51bWJlcjtcbiAgICBnZXQgdG9kYXlZZWFyKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b2RheVllYXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfeWVhcnM6IENhbGVuZGFyQ2VsbFtdW107XG4gICAgZ2V0IHllYXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feWVhcnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRZZWFyczogbnVtYmVyW107XG4gICAgZ2V0IHNlbGVjdGVkWWVhcnMoKTogbnVtYmVyW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRZZWFycztcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYXRlZCA9IGZhbHNlO1xuXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcbiAgICB9XG5cbiAgICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VUbydcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQgYWN0aXZlQ2VsbCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fcGlja2VyTW9tZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KSAlXG4gICAgICAgICAgICAgICAgKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHRhYmxlSGVhZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLl95ZWFycyAmJiB0aGlzLl95ZWFycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5feWVhcnNbMF1bMF0uZGlzcGxheVZhbHVlfSAtICR7XG4gICAgICAgICAgICAgICAgdGhpcy5feWVhcnNbWUVBUl9ST1dTIC0gMV1bWUVBUlNfUEVSX1JPVyAtIDFdLmRpc3BsYXlWYWx1ZVxuICAgICAgICAgICAgfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcHJldkJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwucHJldk11bHRpWWVhckxhYmVsO1xuICAgIH1cblxuICAgIGdldCBuZXh0QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5uZXh0TXVsdGlZZWFyTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBuZXcgbW9udGggaXMgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgdGhlIHNlbGVjdGVkIHllYXIuIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSByZWFkb25seSB5ZWFyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBhY3RpdmF0ZWQuICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHBpY2tlck1vbWVudENoYW5nZTogRXZlbnRFbWl0dGVyPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICAgICAgVFxuICAgID4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHVzZSBrZXlib2FyZCBlbnRlciB0byBzZWxlY3QgYSBjYWxlbmRhciBjZWxsICovXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGtleWJvYXJkRW50ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICAgICAgYW55XG4gICAgPigpO1xuXG4gICAgLyoqIFRoZSBib2R5IG9mIGNhbGVuZGFyIHRhYmxlICovXG4gICAgQFZpZXdDaGlsZChPd2xDYWxlbmRhckJvZHlDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pXG4gICAgY2FsZW5kYXJCb2R5RWxtOiBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQ7XG5cbiAgICBnZXQgb3dsRFRDYWxlbmRhclZpZXcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldCBvd2xEVENhbGVuZGFyTXVsdGlZZWFyVmlldygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPlxuICAgICkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90b2RheVllYXIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XG4gICAgICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjYWxlbmRhckNlbGwgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0Q2FsZW5kYXJDZWxsKGNlbGw6IENhbGVuZGFyQ2VsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdFllYXIoY2VsbC52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3RZZWFyKHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnllYXJTZWxlY3RlZC5lbWl0KHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgMCwgMSkpO1xuICAgICAgICBjb25zdCBmaXJzdERhdGVPZk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHllYXIsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgICAgICAxXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRheXNJbk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgoXG4gICAgICAgICAgICBmaXJzdERhdGVPZk1vbnRoXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHllYXIsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICBkYXlzSW5Nb250aCxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSB0aGUgcHJldmlvdXMgeWVhciBsaXN0XG4gICAgICovXG4gICAgcHVibGljIHByZXZZZWFyTGlzdChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgIC0xICogWUVBUl9ST1dTICogWUVBUlNfUEVSX1JPV1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSB0aGUgbmV4dCB5ZWFyIGxpc3RcbiAgICAgKi9cbiAgICBwdWJsaWMgbmV4dFllYXJMaXN0KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgWUVBUl9ST1dTICogWUVBUlNfUEVSX1JPV1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2VuZXJhdGVZZWFyTGlzdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5feWVhcnMgPSBbXTtcblxuICAgICAgICBjb25zdCBwaWNrZXJNb21lbnRZZWFyID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vbWVudFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBvZmZzZXQgPSBwaWNrZXJNb21lbnRZZWFyICUgKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgWUVBUl9ST1dTOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFlFQVJTX1BFUl9ST1c7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPVxuICAgICAgICAgICAgICAgICAgICBwaWNrZXJNb21lbnRZZWFyIC0gb2Zmc2V0ICsgKGogKyBpICogWUVBUlNfUEVSX1JPVyk7XG4gICAgICAgICAgICAgICAgY29uc3QgeWVhckNlbGwgPSB0aGlzLmNyZWF0ZVllYXJDZWxsKHllYXIpO1xuICAgICAgICAgICAgICAgIHJvdy5wdXNoKHllYXJDZWxsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5feWVhcnMucHVzaChyb3cpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwcmV2aW91cyBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXG4gICAgcHVibGljIHByZXZpb3VzRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhdGhpcy5taW5EYXRlIHx8XG4gICAgICAgICAgICAhdGhpcy5pc1NhbWVZZWFyTGlzdCh0aGlzLl9waWNrZXJNb21lbnQsIHRoaXMubWluRGF0ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgbmV4dCBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXG4gICAgcHVibGljIG5leHRFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRoaXMubWF4RGF0ZSB8fFxuICAgICAgICAgICAgIXRoaXMuaXNTYW1lWWVhckxpc3QodGhpcy5fcGlja2VyTW9tZW50LCB0aGlzLm1heERhdGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUNhbGVuZGFyS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBsZXQgbW9tZW50O1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIC8vIG1pbnVzIDEgeWVhclxuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgLTFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gYWRkIDEgeWVhclxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbWludXMgMyB5ZWFyc1xuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIC0xICogWUVBUlNfUEVSX1JPV1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBhZGQgMyB5ZWFyc1xuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgWUVBUlNfUEVSX1JPV1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBnbyB0byB0aGUgZmlyc3QgeWVhciBvZiB0aGUgeWVhciBwYWdlXG4gICAgICAgICAgICBjYXNlIEhPTUU6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAtdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9waWNrZXJNb21lbnQpICVcbiAgICAgICAgICAgICAgICAgICAgICAgIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBnbyB0byB0aGUgbGFzdCB5ZWFyIG9mIHRoZSB5ZWFyIHBhZ2VcbiAgICAgICAgICAgIGNhc2UgRU5EOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUyAtXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9waWNrZXJNb21lbnQpICVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbWludXMgMSB5ZWFyIHBhZ2UgKG9yIDEwIHllYXIgcGFnZXMpXG4gICAgICAgICAgICBjYXNlIFBBR0VfVVA6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmFsdEtleVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAtMTAgKiAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUylcbiAgICAgICAgICAgICAgICAgICAgICAgIDogLTEgKiAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gYWRkIDEgeWVhciBwYWdlIChvciAxMCB5ZWFyIHBhZ2VzKVxuICAgICAgICAgICAgY2FzZSBQQUdFX0RPV046XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmFsdEtleVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAxMCAqIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RZZWFyKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuX3BpY2tlck1vbWVudClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRFbnRlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIENhbGVuZGFyQ2VsbCBmb3IgdGhlIGdpdmVuIHllYXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVZZWFyQ2VsbCh5ZWFyOiBudW1iZXIpOiBDYWxlbmRhckNlbGwge1xuICAgICAgICBjb25zdCBzdGFydERhdGVPZlllYXIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKHllYXIsIDAsIDEpO1xuICAgICAgICBjb25zdCBhcmlhTGFiZWwgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyTmFtZShzdGFydERhdGVPZlllYXIpO1xuICAgICAgICBjb25zdCBjZWxsQ2xhc3MgPSAnb3dsLWR0LXllYXItJyArIHllYXI7XG4gICAgICAgIHJldHVybiBuZXcgQ2FsZW5kYXJDZWxsKFxuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIHllYXIudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGFyaWFMYWJlbCxcbiAgICAgICAgICAgIHRoaXMuaXNZZWFyRW5hYmxlZCh5ZWFyKSxcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgY2VsbENsYXNzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3RlZFllYXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZFllYXJzID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUgJiYgdGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRZZWFyc1swXSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUgJiYgdGhpcy5zZWxlY3RlZHMpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkWWVhcnMgPSB0aGlzLnNlbGVjdGVkcy5tYXAoc2VsZWN0ZWQgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHNlbGVjdGVkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihzZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgZ2l2ZW4geWVhciBpcyBlbmFibGVkLiAqL1xuICAgIHByaXZhdGUgaXNZZWFyRW5hYmxlZCh5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgLy8gZGlzYWJsZSBpZiB0aGUgeWVhciBpcyBncmVhdGVyIHRoYW4gbWF4RGF0ZSBsb3dlciB0aGFuIG1pbkRhdGVcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgeWVhciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICB5ZWFyID09PSBudWxsIHx8XG4gICAgICAgICAgICAodGhpcy5tYXhEYXRlICYmXG4gICAgICAgICAgICAgICAgeWVhciA+IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5tYXhEYXRlKSkgfHxcbiAgICAgICAgICAgICh0aGlzLm1pbkRhdGUgJiYgeWVhciA8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5taW5EYXRlKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmFibGUgaWYgaXQgcmVhY2hlcyBoZXJlIGFuZCB0aGVyZSdzIG5vIGZpbHRlciBkZWZpbmVkXG4gICAgICAgIGlmICghdGhpcy5kYXRlRmlsdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpcnN0T2ZZZWFyID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZSh5ZWFyLCAwLCAxKTtcblxuICAgICAgICAvLyBJZiBhbnkgZGF0ZSBpbiB0aGUgeWVhciBpcyBlbmFibGVkIGNvdW50IHRoZSB5ZWFyIGFzIGVuYWJsZWQuXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgZGF0ZSA9IGZpcnN0T2ZZZWFyO1xuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlKSA9PT0geWVhcjtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoZGF0ZSwgMSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlRmlsdGVyKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1NhbWVZZWFyTGlzdChkYXRlMTogVCwgZGF0ZTI6IFQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMSkgL1xuICAgICAgICAgICAgICAgICAgICAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUylcbiAgICAgICAgICAgICkgPT09XG4gICAgICAgICAgICBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZTIpIC9cbiAgICAgICAgICAgICAgICAgICAgKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgdmFsaWQgZGF0ZSBvYmplY3RcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKVxuICAgICAgICAgICAgPyBvYmpcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhckJvZHlFbG0uZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgfVxufVxuIl19