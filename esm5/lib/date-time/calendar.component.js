/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
/**
 * @template T
 */
var OwlCalendarComponent = /** @class */ (function () {
    function OwlCalendarComponent(elmRef, pickerIntl, ngZone, cdRef, dateTimeAdapter, dateTimeFormats) {
        var _this = this;
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
        /**
         * Emits when the currently picker moment changes.
         */
        this.pickerMomentChange = new EventEmitter();
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits when any date is selected.
         */
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
        this.dateFilterForViews = (/**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return (!!date &&
                (!_this.dateFilter || _this.dateFilter(date)) &&
                (!_this.minDate ||
                    _this.dateTimeAdapter.compare(date, _this.minDate) >= 0) &&
                (!_this.maxDate ||
                    _this.dateTimeAdapter.compare(date, _this.maxDate) <= 0));
        });
        this.intlChangesSub = Subscription.EMPTY;
        /**
         * Used for scheduling that focus should be moved to the active cell on the next tick.
         * We need to schedule it, rather than do it immediately, because we have to wait
         * for Angular to re-evaluate the view children.
         */
        this.moveFocusOnNextTick = false;
        this.intlChangesSub = this.pickerIntl.changes.subscribe((/**
         * @return {?}
         */
        function () {
            _this.cdRef.markForCheck();
        }));
    }
    Object.defineProperty(OwlCalendarComponent.prototype, "minDate", {
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
            value = this.getValidDate(value);
            this._minDate = value
                ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(value), this.dateTimeAdapter.getMonth(value), this.dateTimeAdapter.getDate(value))
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "maxDate", {
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
            value = this.getValidDate(value);
            this._maxDate = value
                ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(value), this.dateTimeAdapter.getMonth(value), this.dateTimeAdapter.getDate(value))
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "pickerMoment", {
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
            value = this.dateTimeAdapter.deserialize(value);
            this._pickerMoment =
                this.getValidDate(value) || this.dateTimeAdapter.now();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "selected", {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "selecteds", {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "periodButtonText", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isMonthView
                ? this.dateTimeAdapter.format(this.pickerMoment, this.dateTimeFormats.monthYearLabel)
                : this.dateTimeAdapter.getYearName(this.pickerMoment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "periodButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isMonthView
                ? this.pickerIntl.switchToMultiYearViewLabel
                : this.pickerIntl.switchToMonthViewLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "prevButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._currentView === 'month') {
                return this.pickerIntl.prevMonthLabel;
            }
            else if (this._currentView === 'year') {
                return this.pickerIntl.prevYearLabel;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "nextButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._currentView === 'month') {
                return this.pickerIntl.nextMonthLabel;
            }
            else if (this._currentView === 'year') {
                return this.pickerIntl.nextYearLabel;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "currentView", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentView;
        },
        set: /**
         * @param {?} view
         * @return {?}
         */
        function (view) {
            this._currentView = view;
            this.moveFocusOnNextTick = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "isInRangeMode", {
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
    Object.defineProperty(OwlCalendarComponent.prototype, "showControlArrows", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentView !== 'multi-years';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "isMonthView", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentView === 'month';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "owlDTCalendarClass", {
        /**
         * Bind class 'owl-dt-calendar' to host
         */
        get: /**
         * Bind class 'owl-dt-calendar' to host
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
    OwlCalendarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    OwlCalendarComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._currentView = this.startView;
    };
    /**
     * @return {?}
     */
    OwlCalendarComponent.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (this.moveFocusOnNextTick) {
            this.moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    };
    /**
     * @return {?}
     */
    OwlCalendarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.intlChangesSub.unsubscribe();
    };
    /**
     * Toggle between month view and year view
     */
    /**
     * Toggle between month view and year view
     * @return {?}
     */
    OwlCalendarComponent.prototype.toggleViews = /**
     * Toggle between month view and year view
     * @return {?}
     */
    function () {
        this.currentView =
            this._currentView === 'month' ? 'multi-years' : 'month';
    };
    /**
     * Handles user clicks on the previous button.
     */
    /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    OwlCalendarComponent.prototype.previousClicked = /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    function () {
        this.pickerMoment = this.isMonthView
            ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1)
            : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1);
        this.pickerMomentChange.emit(this.pickerMoment);
    };
    /**
     * Handles user clicks on the next button.
     */
    /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    OwlCalendarComponent.prototype.nextClicked = /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    function () {
        this.pickerMoment = this.isMonthView
            ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1)
            : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1);
        this.pickerMomentChange.emit(this.pickerMoment);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    OwlCalendarComponent.prototype.dateSelected = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!this.dateFilterForViews(date)) {
            return;
        }
        this.selectedChange.emit(date);
        /*if ((this.isInSingleMode && !this.dateTimeAdapter.isSameDay(date, this.selected)) ||
            this.isInRangeMode) {
            this.selectedChange.emit(date);
        }*/
    };
    /**
     * Change the pickerMoment value and switch to a specific view
     */
    /**
     * Change the pickerMoment value and switch to a specific view
     * @param {?} date
     * @param {?} view
     * @return {?}
     */
    OwlCalendarComponent.prototype.goToDateInView = /**
     * Change the pickerMoment value and switch to a specific view
     * @param {?} date
     * @param {?} view
     * @return {?}
     */
    function (date, view) {
        this.handlePickerMomentChange(date);
        this.currentView = view;
        return;
    };
    /**
     * Change the pickerMoment value
     */
    /**
     * Change the pickerMoment value
     * @param {?} date
     * @return {?}
     */
    OwlCalendarComponent.prototype.handlePickerMomentChange = /**
     * Change the pickerMoment value
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.pickerMoment = this.dateTimeAdapter.clampDate(date, this.minDate, this.maxDate);
        this.pickerMomentChange.emit(this.pickerMoment);
        return;
    };
    /**
     * @return {?}
     */
    OwlCalendarComponent.prototype.userSelected = /**
     * @return {?}
     */
    function () {
        this.userSelection.emit();
    };
    /**
     * Whether the previous period button is enabled.
     */
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    OwlCalendarComponent.prototype.prevButtonEnabled = /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    function () {
        return (!this.minDate || !this.isSameView(this.pickerMoment, this.minDate));
    };
    /**
     * Whether the next period button is enabled.
     */
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    OwlCalendarComponent.prototype.nextButtonEnabled = /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    function () {
        return (!this.maxDate || !this.isSameView(this.pickerMoment, this.maxDate));
    };
    /**
     * Focus to the host element
     */
    /**
     * Focus to the host element
     * @return {?}
     */
    OwlCalendarComponent.prototype.focusActiveCell = /**
     * Focus to the host element
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.elmRef.nativeElement
                    .querySelector('.owl-dt-calendar-cell-active')
                    .focus();
            }));
        }));
    };
    /**
     * @param {?} normalizedYear
     * @return {?}
     */
    OwlCalendarComponent.prototype.selectYearInMultiYearView = /**
     * @param {?} normalizedYear
     * @return {?}
     */
    function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /**
     * @param {?} normalizedMonth
     * @return {?}
     */
    OwlCalendarComponent.prototype.selectMonthInYearView = /**
     * @param {?} normalizedMonth
     * @return {?}
     */
    function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     */
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    OwlCalendarComponent.prototype.isSameView = /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function (date1, date2) {
        if (this._currentView === 'month') {
            return !!(date1 &&
                date2 &&
                this.dateTimeAdapter.getYear(date1) ===
                    this.dateTimeAdapter.getYear(date2) &&
                this.dateTimeAdapter.getMonth(date1) ===
                    this.dateTimeAdapter.getMonth(date2));
        }
        else if (this._currentView === 'year') {
            return !!(date1 &&
                date2 &&
                this.dateTimeAdapter.getYear(date1) ===
                    this.dateTimeAdapter.getYear(date2));
        }
        else {
            return false;
        }
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
    OwlCalendarComponent.prototype.getValidDate = /**
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
    OwlCalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-date-time-calendar',
                    exportAs: 'owlDateTimeCalendar',
                    template: "<div class=\"owl-dt-calendar-control\">\n    <!-- focus when keyboard tab (http://kizu.ru/en/blog/keyboard-only-focus/#x) -->\n    <button\n        class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\"\n        tabindex=\"0\"\n        [style.visibility]=\"showControlArrows ? 'visible' : 'hidden'\"\n        [disabled]=\"!prevButtonEnabled()\"\n        [attr.aria-label]=\"prevButtonLabel\"\n        (click)=\"previousClicked()\"\n    >\n        <span\n            class=\"owl-dt-control-content owl-dt-control-button-content\"\n            tabindex=\"-1\"\n        >\n            <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\n            <svg\n                xmlns=\"http://www.w3.org/2000/svg\"\n                xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                version=\"1.1\"\n                x=\"0px\"\n                y=\"0px\"\n                viewBox=\"0 0 250.738 250.738\"\n                style=\"enable-background:new 0 0 250.738 250.738;\"\n                xml:space=\"preserve\"\n                width=\"100%\"\n                height=\"100%\"\n            >\n                <path\n                    style=\"fill-rule: evenodd; clip-rule: evenodd;\"\n                    d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"\n                />\n            </svg>\n            <!-- </editor-fold> -->\n        </span>\n    </button>\n    <div class=\"owl-dt-calendar-control-content\">\n        <button\n            class=\"owl-dt-control owl-dt-control-button owl-dt-control-period-button\"\n            type=\"button\"\n            tabindex=\"0\"\n            [attr.aria-label]=\"periodButtonLabel\"\n            (click)=\"toggleViews()\"\n        >\n            <span\n                class=\"owl-dt-control-content owl-dt-control-button-content\"\n                tabindex=\"-1\"\n            >\n                {{ periodButtonText }}\n\n                <span\n                    class=\"owl-dt-control-button-arrow\"\n                    [style.transform]=\"\n                        'rotate(' + (isMonthView ? 0 : 180) + 'deg)'\n                    \"\n                >\n                    <!-- <editor-fold desc=\"SVG Arrow\"> -->\n                    <svg\n                        version=\"1.1\"\n                        xmlns=\"http://www.w3.org/2000/svg\"\n                        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                        x=\"0px\"\n                        y=\"0px\"\n                        width=\"50%\"\n                        height=\"50%\"\n                        viewBox=\"0 0 292.362 292.362\"\n                        style=\"enable-background:new 0 0 292.362 292.362;\"\n                        xml:space=\"preserve\"\n                    >\n                        <g>\n                            <path\n                                d=\"M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424\n                                C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428\n                                s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z\"\n                            />\n                        </g>\n                    </svg>\n                    <!-- </editor-fold> -->\n                </span>\n            </span>\n        </button>\n    </div>\n    <button\n        class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\"\n        tabindex=\"0\"\n        [style.visibility]=\"showControlArrows ? 'visible' : 'hidden'\"\n        [disabled]=\"!nextButtonEnabled()\"\n        [attr.aria-label]=\"nextButtonLabel\"\n        (click)=\"nextClicked()\"\n    >\n        <span\n            class=\"owl-dt-control-content owl-dt-control-button-content\"\n            tabindex=\"-1\"\n        >\n            <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\n            <svg\n                version=\"1.1\"\n                xmlns=\"http://www.w3.org/2000/svg\"\n                xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                x=\"0px\"\n                y=\"0px\"\n                viewBox=\"0 0 250.738 250.738\"\n                style=\"enable-background:new 0 0 250.738 250.738;\"\n                xml:space=\"preserve\"\n            >\n                <path\n                    style=\"fill-rule:evenodd;clip-rule:evenodd;\"\n                    d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                    c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                    c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                    C197.237,120.447,195.534,115.448,191.75,111.689z\"\n                />\n            </svg>\n            <!-- </editor-fold> -->\n        </span>\n    </button>\n</div>\n<div\n    class=\"owl-dt-calendar-main\"\n    cdkMonitorSubtreeFocus\n    [ngSwitch]=\"currentView\"\n    tabindex=\"-1\"\n>\n    <owl-date-time-month-view\n        *ngSwitchCase=\"'month'\"\n        [pickerMoment]=\"pickerMoment\"\n        [firstDayOfWeek]=\"firstDayOfWeek\"\n        [selected]=\"selected\"\n        [selecteds]=\"selecteds\"\n        [selectMode]=\"selectMode\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        [dateFilter]=\"dateFilter\"\n        [hideOtherMonths]=\"hideOtherMonths\"\n        (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n        (selectedChange)=\"dateSelected($event)\"\n        (userSelection)=\"userSelected()\"\n    ></owl-date-time-month-view>\n\n    <owl-date-time-year-view\n        *ngSwitchCase=\"'year'\"\n        [pickerMoment]=\"pickerMoment\"\n        [selected]=\"selected\"\n        [selecteds]=\"selecteds\"\n        [selectMode]=\"selectMode\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        [dateFilter]=\"dateFilter\"\n        (keyboardEnter)=\"focusActiveCell()\"\n        (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n        (monthSelected)=\"selectMonthInYearView($event)\"\n        (change)=\"goToDateInView($event, 'month')\"\n    ></owl-date-time-year-view>\n\n    <owl-date-time-multi-year-view\n        *ngSwitchCase=\"'multi-years'\"\n        [pickerMoment]=\"pickerMoment\"\n        [selected]=\"selected\"\n        [selecteds]=\"selecteds\"\n        [selectMode]=\"selectMode\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        [dateFilter]=\"dateFilter\"\n        (keyboardEnter)=\"focusActiveCell()\"\n        (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n        (yearSelected)=\"selectYearInMultiYearView($event)\"\n        (change)=\"goToDateInView($event, 'year')\"\n    ></owl-date-time-multi-year-view>\n</div>\n",
                    host: {
                        '[class.owl-dt-calendar]': 'owlDTCalendarClass'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    OwlCalendarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: OwlDateTimeIntl },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
    ]; };
    OwlCalendarComponent.propDecorators = {
        dateFilter: [{ type: Input }],
        firstDayOfWeek: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        pickerMoment: [{ type: Input }],
        selectMode: [{ type: Input }],
        selected: [{ type: Input }],
        selecteds: [{ type: Input }],
        startView: [{ type: Input }],
        hideOtherMonths: [{ type: Input }],
        pickerMomentChange: [{ type: Output }],
        selectedChange: [{ type: Output }],
        userSelection: [{ type: Output }],
        yearSelected: [{ type: Output }],
        monthSelected: [{ type: Output }]
    };
    return OwlCalendarComponent;
}());
export { OwlCalendarComponent };
if (false) {
    /**
     * Date filter for the month and year view
     * @type {?}
     */
    OwlCalendarComponent.prototype.dateFilter;
    /**
     * Set the first day of week
     * @type {?}
     */
    OwlCalendarComponent.prototype.firstDayOfWeek;
    /**
     * The minimum selectable date.
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._minDate;
    /**
     * The maximum selectable date.
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._maxDate;
    /**
     * The current picker moment
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._pickerMoment;
    /** @type {?} */
    OwlCalendarComponent.prototype.selectMode;
    /**
     * The currently selected moment.
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._selecteds;
    /**
     * The view that the calendar should start in.
     * @type {?}
     */
    OwlCalendarComponent.prototype.startView;
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     * @type {?}
     */
    OwlCalendarComponent.prototype.hideOtherMonths;
    /**
     * Emits when the currently picker moment changes.
     * @type {?}
     */
    OwlCalendarComponent.prototype.pickerMomentChange;
    /**
     * Emits when the currently selected date changes.
     * @type {?}
     */
    OwlCalendarComponent.prototype.selectedChange;
    /**
     * Emits when any date is selected.
     * @type {?}
     */
    OwlCalendarComponent.prototype.userSelection;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     * @type {?}
     */
    OwlCalendarComponent.prototype.yearSelected;
    /**
     * Emits the selected month. This doesn't imply a change on the selected date
     * @type {?}
     */
    OwlCalendarComponent.prototype.monthSelected;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._currentView;
    /**
     * Date filter for the month and year view
     * @type {?}
     */
    OwlCalendarComponent.prototype.dateFilterForViews;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.intlChangesSub;
    /**
     * Used for scheduling that focus should be moved to the active cell on the next tick.
     * We need to schedule it, rather than do it immediately, because we have to wait
     * for Angular to re-evaluate the view children.
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.moveFocusOnNextTick;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.pickerIntl;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBR04sUUFBUSxFQUNSLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFDSCxxQkFBcUIsRUFFeEIsTUFBTSxrQ0FBa0MsQ0FBQztBQUUxQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQUVwQztJQTJPSSw4QkFDWSxNQUFrQixFQUNsQixVQUEyQixFQUMzQixNQUFjLEVBQ2QsS0FBd0IsRUFDWixlQUFtQyxFQUcvQyxlQUFtQztRQVIvQyxpQkFhQztRQVpXLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDM0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ1osb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBRy9DLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQXhKdkMsZUFBVSxHQUFRLEVBQUUsQ0FBQzs7OztRQWlCN0IsY0FBUyxHQUFxQyxPQUFPLENBQUM7Ozs7UUFVdEQsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQzs7OztRQUkzQyxtQkFBYyxHQUFHLElBQUks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R3ZDLDZDQUN5Qzs7Ozs7SUFLekMsNENBQzhDOzs7OztJQUs5Qyw2Q0FDK0M7Ozs7O0lBcUMvQyw0Q0FBdUQ7Ozs7O0lBaUN2RCxrREFTRTs7Ozs7SUFTRiw4Q0FBNEM7Ozs7Ozs7O0lBTzVDLG1EQUFvQzs7Ozs7SUFHaEMsc0NBQTBCOzs7OztJQUMxQiwwQ0FBbUM7Ozs7O0lBQ25DLHNDQUFzQjs7Ozs7SUFDdEIscUNBQWdDOzs7OztJQUNoQywrQ0FBdUQ7Ozs7O0lBQ3ZELCtDQUUyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY2FsZW5kYXIuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQge1xuICAgIE9XTF9EQVRFX1RJTUVfRk9STUFUUyxcbiAgICBPd2xEYXRlVGltZUZvcm1hdHNcbn0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLWNhbGVuZGFyJyxcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lQ2FsZW5kYXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhcl0nOiAnb3dsRFRDYWxlbmRhckNsYXNzJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgT3dsQ2FsZW5kYXJDb21wb25lbnQ8VD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBEYXRlIGZpbHRlciBmb3IgdGhlIG1vbnRoIGFuZCB5ZWFyIHZpZXdcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRhdGVGaWx0ZXI6IEZ1bmN0aW9uO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBmaXJzdCBkYXkgb2Ygd2Vla1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfbWluRGF0ZTogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgbWluRGF0ZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICAgIH1cblxuICAgIHNldCBtaW5EYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IHZhbHVlXG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHZhbHVlKSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHZhbHVlKSxcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodmFsdWUpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21heERhdGU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heERhdGUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWF4RGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuXG4gICAgICAgIHRoaXMuX21heERhdGUgPSB2YWx1ZVxuICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih2YWx1ZSksXG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh2YWx1ZSksXG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHZhbHVlKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBjdXJyZW50IHBpY2tlciBtb21lbnQgKi9cbiAgICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQ7XG4gICAgQElucHV0KClcbiAgICBnZXQgcGlja2VyTW9tZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyTW9tZW50O1xuICAgIH1cblxuICAgIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCA9XG4gICAgICAgICAgICB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RNb2RlOiBTZWxlY3RNb2RlO1xuXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgbW9tZW50LiAqL1xuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkcygpOiBUW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZHModmFsdWVzOiBUW10pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRzID0gdmFsdWVzLm1hcCh2ID0+IHtcbiAgICAgICAgICAgIHYgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkRGF0ZSh2KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHZpZXcgdGhhdCB0aGUgY2FsZW5kYXIgc2hvdWxkIHN0YXJ0IGluLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RhcnRWaWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXJzJyA9ICdtb250aCc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGhpZGUgZGF0ZXMgaW4gb3RoZXIgbW9udGhzIGF0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGN1cnJlbnQgbW9udGguXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoaWRlT3RoZXJNb250aHM6IGJvb2xlYW47XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgY3VycmVudGx5IHBpY2tlciBtb21lbnQgY2hhbmdlcy4gKi9cbiAgICBAT3V0cHV0KClcbiAgICBwaWNrZXJNb21lbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUgY2hhbmdlcy4gKi9cbiAgICBAT3V0cHV0KClcbiAgICBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIHNlbGVjdGVkLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHVzZXJTZWxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhci4gVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgeWVhclNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgdGhlIHNlbGVjdGVkIG1vbnRoLiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGVcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBtb250aFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgZ2V0IHBlcmlvZEJ1dHRvblRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNNb250aFZpZXdcbiAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxuICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5tb250aFllYXJMYWJlbFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXJOYW1lKHRoaXMucGlja2VyTW9tZW50KTtcbiAgICB9XG5cbiAgICBnZXQgcGVyaW9kQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNNb250aFZpZXdcbiAgICAgICAgICAgID8gdGhpcy5waWNrZXJJbnRsLnN3aXRjaFRvTXVsdGlZZWFyVmlld0xhYmVsXG4gICAgICAgICAgICA6IHRoaXMucGlja2VySW50bC5zd2l0Y2hUb01vbnRoVmlld0xhYmVsO1xuICAgIH1cblxuICAgIGdldCBwcmV2QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnByZXZNb250aExhYmVsO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAneWVhcicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwucHJldlllYXJMYWJlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG5leHRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwubmV4dE1vbnRoTGFiZWw7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICd5ZWFyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5uZXh0WWVhckxhYmVsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jdXJyZW50VmlldzogJ21vbnRoJyB8ICd5ZWFyJyB8ICdtdWx0aS15ZWFycyc7XG4gICAgZ2V0IGN1cnJlbnRWaWV3KCk6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcnMnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWV3O1xuICAgIH1cblxuICAgIHNldCBjdXJyZW50Vmlldyh2aWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXJzJykge1xuICAgICAgICB0aGlzLl9jdXJyZW50VmlldyA9IHZpZXc7XG4gICAgICAgIHRoaXMubW92ZUZvY3VzT25OZXh0VGljayA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcbiAgICB9XG5cbiAgICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VUbydcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQgc2hvd0NvbnRyb2xBcnJvd3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmlldyAhPT0gJ211bHRpLXllYXJzJztcbiAgICB9XG5cbiAgICBnZXQgaXNNb250aFZpZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmlldyA9PT0gJ21vbnRoJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEYXRlIGZpbHRlciBmb3IgdGhlIG1vbnRoIGFuZCB5ZWFyIHZpZXdcbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0ZUZpbHRlckZvclZpZXdzID0gKGRhdGU6IFQpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICEhZGF0ZSAmJlxuICAgICAgICAgICAgKCF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUpKSAmJlxuICAgICAgICAgICAgKCF0aGlzLm1pbkRhdGUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGUsIHRoaXMubWluRGF0ZSkgPj0gMCkgJiZcbiAgICAgICAgICAgICghdGhpcy5tYXhEYXRlIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlLCB0aGlzLm1heERhdGUpIDw9IDApXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEJpbmQgY2xhc3MgJ293bC1kdC1jYWxlbmRhcicgdG8gaG9zdFxuICAgICAqL1xuICAgIGdldCBvd2xEVENhbGVuZGFyQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW50bENoYW5nZXNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBzY2hlZHVsaW5nIHRoYXQgZm9jdXMgc2hvdWxkIGJlIG1vdmVkIHRvIHRoZSBhY3RpdmUgY2VsbCBvbiB0aGUgbmV4dCB0aWNrLlxuICAgICAqIFdlIG5lZWQgdG8gc2NoZWR1bGUgaXQsIHJhdGhlciB0aGFuIGRvIGl0IGltbWVkaWF0ZWx5LCBiZWNhdXNlIHdlIGhhdmUgdG8gd2FpdFxuICAgICAqIGZvciBBbmd1bGFyIHRvIHJlLWV2YWx1YXRlIHRoZSB2aWV3IGNoaWxkcmVuLlxuICAgICAqL1xuICAgIHByaXZhdGUgbW92ZUZvY3VzT25OZXh0VGljayA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxtUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCxcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxuICAgICAgICBwcml2YXRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaW50bENoYW5nZXNTdWIgPSB0aGlzLnBpY2tlckludGwuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gdGhpcy5zdGFydFZpZXc7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZUZvY3VzT25OZXh0VGljaykge1xuICAgICAgICAgICAgdGhpcy5tb3ZlRm9jdXNPbk5leHRUaWNrID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmludGxDaGFuZ2VzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIGJldHdlZW4gbW9udGggdmlldyBhbmQgeWVhciB2aWV3XG4gICAgICovXG4gICAgcHVibGljIHRvZ2dsZVZpZXdzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID1cbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRWaWV3ID09PSAnbW9udGgnID8gJ211bHRpLXllYXJzJyA6ICdtb250aCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgcHJldmlvdXMgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBwcmV2aW91c0NsaWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5pc01vbnRoVmlld1xuICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLnBpY2tlck1vbWVudCwgLTEpXG4gICAgICAgICAgICA6IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5waWNrZXJNb21lbnQsIC0xKTtcblxuICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KHRoaXMucGlja2VyTW9tZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBuZXh0IGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgbmV4dENsaWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5pc01vbnRoVmlld1xuICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLnBpY2tlck1vbWVudCwgMSlcbiAgICAgICAgICAgIDogdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLnBpY2tlck1vbWVudCwgMSk7XG5cbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdCh0aGlzLnBpY2tlck1vbWVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRhdGVTZWxlY3RlZChkYXRlOiBUKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kYXRlRmlsdGVyRm9yVmlld3MoZGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChkYXRlKTtcblxuICAgICAgICAvKmlmICgodGhpcy5pc0luU2luZ2xlTW9kZSAmJiAhdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNTYW1lRGF5KGRhdGUsIHRoaXMuc2VsZWN0ZWQpKSB8fFxuICAgICAgICAgICAgdGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgICAgIH0qL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoYW5nZSB0aGUgcGlja2VyTW9tZW50IHZhbHVlIGFuZCBzd2l0Y2ggdG8gYSBzcGVjaWZpYyB2aWV3XG4gICAgICovXG4gICAgcHVibGljIGdvVG9EYXRlSW5WaWV3KFxuICAgICAgICBkYXRlOiBULFxuICAgICAgICB2aWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXJzJ1xuICAgICk6IHZvaWQge1xuICAgICAgICB0aGlzLmhhbmRsZVBpY2tlck1vbWVudENoYW5nZShkYXRlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHZpZXc7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgdGhlIHBpY2tlck1vbWVudCB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVQaWNrZXJNb21lbnRDaGFuZ2UoZGF0ZTogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNsYW1wRGF0ZShcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICB0aGlzLm1pbkRhdGUsXG4gICAgICAgICAgICB0aGlzLm1heERhdGVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdCh0aGlzLnBpY2tlck1vbWVudCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXNlclNlbGVjdGVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVzZXJTZWxlY3Rpb24uZW1pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHByZXZpb3VzIHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgcHJldkJ1dHRvbkVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhdGhpcy5taW5EYXRlIHx8ICF0aGlzLmlzU2FtZVZpZXcodGhpcy5waWNrZXJNb21lbnQsIHRoaXMubWluRGF0ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBuZXh0IHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgbmV4dEJ1dHRvbkVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhdGhpcy5tYXhEYXRlIHx8ICF0aGlzLmlzU2FtZVZpZXcodGhpcy5waWNrZXJNb21lbnQsIHRoaXMubWF4RGF0ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb2N1cyB0byB0aGUgaG9zdCBlbGVtZW50XG4gICAgICovXG4gICAgcHVibGljIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLm93bC1kdC1jYWxlbmRhci1jZWxsLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdFllYXJJbk11bHRpWWVhclZpZXcobm9ybWFsaXplZFllYXI6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy55ZWFyU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkWWVhcik7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdE1vbnRoSW5ZZWFyVmlldyhub3JtYWxpemVkTW9udGg6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQobm9ybWFsaXplZE1vbnRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB0d28gZGF0ZXMgcmVwcmVzZW50IHRoZSBzYW1lIHZpZXcgaW4gdGhlIGN1cnJlbnQgdmlldyBtb2RlIChtb250aCBvciB5ZWFyKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGlzU2FtZVZpZXcoZGF0ZTE6IFQsIGRhdGUyOiBUKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50VmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgcmV0dXJuICEhKFxuICAgICAgICAgICAgICAgIGRhdGUxICYmXG4gICAgICAgICAgICAgICAgZGF0ZTIgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PT1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMikgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlMSkgPT09XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGUyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50VmlldyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICByZXR1cm4gISEoXG4gICAgICAgICAgICAgICAgZGF0ZTEgJiZcbiAgICAgICAgICAgICAgICBkYXRlMiAmJlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZTEpID09PVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgICAgICAgID8gb2JqXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxufVxuIl19