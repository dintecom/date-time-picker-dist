/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * date-time-picker-container.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Optional, ViewChild } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { OwlCalendarComponent } from './calendar.component';
import { OwlTimerComponent } from './timer.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { Subject } from 'rxjs';
import { owlDateTimePickerAnimations } from './date-time-picker.animations';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
/**
 * @template T
 */
var OwlDateTimeContainerComponent = /** @class */ (function () {
    function OwlDateTimeContainerComponent(cdRef, elmRef, pickerIntl, dateTimeAdapter) {
        this.cdRef = cdRef;
        this.elmRef = elmRef;
        this.pickerIntl = pickerIntl;
        this.dateTimeAdapter = dateTimeAdapter;
        this.activeSelectedIndex = 0; // The current active SelectedIndex in range select mode (0: 'from', 1: 'to')
        // The current active SelectedIndex in range select mode (0: 'from', 1: 'to')
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
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "hidePickerStream", {
        get: /**
         * @return {?}
         */
        function () {
            return this.hidePicker$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "confirmSelectedStream", {
        get: /**
         * @return {?}
         */
        function () {
            return this.confirmSelected$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerOpenedStream", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerOpened$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerMoment", {
        get: /**
         * @return {?}
         */
        function () {
            return this._clamPickerMoment;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._clamPickerMoment = this.dateTimeAdapter.clampDate(value, this.picker.minDateTime, this.picker.maxDateTime);
            }
            this.cdRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerType", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "cancelLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.cancelBtnLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "setLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.setBtnLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "fromLabel", {
        /**
         * The range 'from' label
         */
        get: /**
         * The range 'from' label
         * @return {?}
         */
        function () {
            return this.pickerIntl.rangeFromLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "toLabel", {
        /**
         * The range 'to' label
         */
        get: /**
         * The range 'to' label
         * @return {?}
         */
        function () {
            return this.pickerIntl.rangeToLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "fromFormattedValue", {
        /**
         * The range 'from' formatted value
         */
        get: /**
         * The range 'from' formatted value
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = this.picker.selecteds[0];
            return value
                ? this.dateTimeAdapter.format(value, this.picker.formatString)
                : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "toFormattedValue", {
        /**
         * The range 'to' formatted value
         */
        get: /**
         * The range 'to' formatted value
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = this.picker.selecteds[1];
            return value
                ? this.dateTimeAdapter.format(value, this.picker.formatString)
                : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "showControlButtons", {
        /**
         * Cases in which the control buttons show in the picker
         * 1) picker mode is 'dialog'
         * 2) picker type is NOT 'calendar' and the picker mode is NOT 'inline'
         */
        get: /**
         * Cases in which the control buttons show in the picker
         * 1) picker mode is 'dialog'
         * 2) picker type is NOT 'calendar' and the picker mode is NOT 'inline'
         * @return {?}
         */
        function () {
            return (this.picker.pickerMode === 'dialog' ||
                (this.picker.pickerType !== 'calendar' &&
                    this.picker.pickerMode !== 'inline'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "containerElm", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elmRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTPopupContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'popup';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTDialogContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'dialog';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTInlineContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'inline';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerDisabledClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerId", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerAnimation", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'inline' ? '' : 'enter';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.initPicker();
    };
    /**
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.focusPicker();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.handleContainerAnimationDone = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var toState = event.toState;
        if (toState === 'enter') {
            this.pickerOpened$.next();
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.dateSelected = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var result;
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
    };
    /**
     * @param {?} time
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.timeSelected = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        this.pickerMoment = this.dateTimeAdapter.clone(time);
        if (!this.picker.dateTimeChecker(this.pickerMoment)) {
            return;
        }
        if (this.picker.isInSingleMode) {
            this.picker.select(this.pickerMoment);
            return;
        }
        if (this.picker.isInRangeMode) {
            /** @type {?} */
            var selecteds = tslib_1.__spread(this.picker.selecteds);
            // check if the 'from' is after 'to' or 'to'is before 'from'
            // In this case, we set both the 'from' and 'to' the same value
            if ((this.activeSelectedIndex === 0 &&
                selecteds[1] &&
                this.dateTimeAdapter.compare(this.pickerMoment, selecteds[1]) === 1) ||
                (this.activeSelectedIndex === 1 &&
                    selecteds[0] &&
                    this.dateTimeAdapter.compare(this.pickerMoment, selecteds[0]) === -1)) {
                selecteds[0] = this.pickerMoment;
                selecteds[1] = this.pickerMoment;
            }
            else {
                selecteds[this.activeSelectedIndex] = this.pickerMoment;
            }
            this.picker.select(selecteds);
        }
    };
    /**
     * Handle click on cancel button
     */
    /**
     * Handle click on cancel button
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.onCancelClicked = /**
     * Handle click on cancel button
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.hidePicker$.next(null);
        event.preventDefault();
        return;
    };
    /**
     * Handle click on set button
     */
    /**
     * Handle click on set button
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.onSetClicked = /**
     * Handle click on set button
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.picker.dateTimeChecker(this.pickerMoment)) {
            this.hidePicker$.next(null);
            event.preventDefault();
            return;
        }
        this.confirmSelected$.next(event);
        event.preventDefault();
        return;
    };
    /**
     * Handle click on inform radio group
     */
    /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.handleClickOnInfoGroup = /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.setActiveSelectedIndex(index);
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * Handle click on inform radio group
     */
    /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} next
     * @param {?} index
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.handleKeydownOnInfoGroup = /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} next
     * @param {?} index
     * @return {?}
     */
    function (event, next, index) {
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
    };
    /**
     * Set the value of activeSelectedIndex
     */
    /**
     * Set the value of activeSelectedIndex
     * @private
     * @param {?} index
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.setActiveSelectedIndex = /**
     * Set the value of activeSelectedIndex
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.picker.selectMode === 'range' &&
            this.activeSelectedIndex !== index) {
            this.activeSelectedIndex = index;
            /** @type {?} */
            var selected = this.picker.selecteds[this.activeSelectedIndex];
            if (this.picker.selecteds && selected) {
                this.pickerMoment = this.dateTimeAdapter.clone(selected);
            }
        }
        return;
    };
    /**
     * @private
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.initPicker = /**
     * @private
     * @return {?}
     */
    function () {
        this.pickerMoment = this.picker.startAt || this.dateTimeAdapter.now();
        this.activeSelectedIndex = this.picker.selectMode === 'rangeTo' ? 1 : 0;
    };
    /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     */
    /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.dateSelectedInSingleMode = /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.dateTimeAdapter.isSameDay(date, this.picker.selected)) {
            return null;
        }
        return this.updateAndCheckCalendarDate(date);
    };
    /**
     * Select dates in range Mode
     */
    /**
     * Select dates in range Mode
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.dateSelectedInRangeMode = /**
     * Select dates in range Mode
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var from = this.picker.selecteds[0];
        /** @type {?} */
        var to = this.picker.selecteds[1];
        /** @type {?} */
        var result = this.updateAndCheckCalendarDate(date);
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
            if (to && this.dateTimeAdapter.compare(from, to) > 0) {
                to = null;
            }
        }
        else if (this.picker.selectMode === 'rangeTo') {
            to = result;
            // if the from value is after the to value, set the from value as null
            if (from && this.dateTimeAdapter.compare(from, to) > 0) {
                from = null;
            }
        }
        return [from, to];
    };
    /**
     * Update the given calendar date's time and check if it is valid
     * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
     * we need to update the given calendar date's time before selecting it.
     * if it is valid, return the updated dateTime
     * if it is not valid, return null
     */
    /**
     * Update the given calendar date's time and check if it is valid
     * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
     * we need to update the given calendar date's time before selecting it.
     * if it is valid, return the updated dateTime
     * if it is not valid, return null
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.updateAndCheckCalendarDate = /**
     * Update the given calendar date's time and check if it is valid
     * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
     * we need to update the given calendar date's time before selecting it.
     * if it is valid, return the updated dateTime
     * if it is not valid, return null
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var result;
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
    };
    /**
     * Focus to the picker
     */
    /**
     * Focus to the picker
     * @private
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.focusPicker = /**
     * Focus to the picker
     * @private
     * @return {?}
     */
    function () {
        if (this.picker.pickerMode === 'inline') {
            return;
        }
        if (this.calendar) {
            this.calendar.focusActiveCell();
        }
        else if (this.timer) {
            this.timer.focus();
        }
    };
    OwlDateTimeContainerComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'owlDateTimeContainer',
                    selector: 'owl-date-time-container',
                    template: "<div [cdkTrapFocus]=\"picker.pickerMode !== 'inline'\"\n     [@fadeInPicker]=\"picker.pickerMode === 'inline'? '' : 'enter'\"\n     class=\"owl-dt-container-inner\">\n\n    <owl-date-time-calendar\n            *ngIf=\"pickerType === 'both' || pickerType === 'calendar'\"\n            class=\"owl-dt-container-row\"\n            [firstDayOfWeek]=\"picker.firstDayOfWeek\"\n            [(pickerMoment)]=\"pickerMoment\"\n            [selected]=\"picker.selected\"\n            [selecteds]=\"picker.selecteds\"\n            [selectMode]=\"picker.selectMode\"\n            [minDate]=\"picker.minDateTime\"\n            [maxDate]=\"picker.maxDateTime\"\n            [dateFilter]=\"picker.dateTimeFilter\"\n            [startView]=\"picker.startView\"\n            [hideOtherMonths]=\"picker.hideOtherMonths\"\n            (yearSelected)=\"picker.selectYear($event)\"\n            (monthSelected)=\"picker.selectMonth($event)\"\n            (selectedChange)=\"dateSelected($event)\"></owl-date-time-calendar>\n\n    <owl-date-time-timer\n            *ngIf=\"pickerType === 'both' || pickerType === 'timer'\"\n            class=\"owl-dt-container-row\"\n            [pickerMoment]=\"pickerMoment\"\n            [minDateTime]=\"picker.minDateTime\"\n            [maxDateTime]=\"picker.maxDateTime\"\n            [showSecondsTimer]=\"picker.showSecondsTimer\"\n            [hour12Timer]=\"picker.hour12Timer\"\n            [stepHour]=\"picker.stepHour\"\n            [stepMinute]=\"picker.stepMinute\"\n            [stepSecond]=\"picker.stepSecond\"\n            (selectedChange)=\"timeSelected($event)\"></owl-date-time-timer>\n\n    <div *ngIf=\"picker.isInRangeMode\"\n         role=\"radiogroup\"\n         class=\"owl-dt-container-info owl-dt-container-row\">\n        <div role=\"radio\" [tabindex]=\"activeSelectedIndex === 0 ? 0 : -1\"\n             [attr.aria-checked]=\"activeSelectedIndex === 0\"\n             class=\"owl-dt-control owl-dt-container-range owl-dt-container-from\"\n             [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 0}\"\n             (click)=\"handleClickOnInfoGroup($event, 0)\"\n             (keydown)=\"handleKeydownOnInfoGroup($event, to, 0)\" #from>\n            <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\n                <span class=\"owl-dt-container-info-label\">{{fromLabel}}:</span>\n                <span class=\"owl-dt-container-info-value\">{{fromFormattedValue}}</span>\n            </span>\n        </div>\n        <div role=\"radio\" [tabindex]=\"activeSelectedIndex === 1 ? 0 : -1\"\n             [attr.aria-checked]=\"activeSelectedIndex === 1\"\n             class=\"owl-dt-control owl-dt-container-range owl-dt-container-to\"\n             [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 1}\"\n             (click)=\"handleClickOnInfoGroup($event, 1)\"\n             (keydown)=\"handleKeydownOnInfoGroup($event, from, 1)\" #to>\n            <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\n                <span class=\"owl-dt-container-info-label\">{{toLabel}}:</span>\n                <span class=\"owl-dt-container-info-value\">{{toFormattedValue}}</span>\n            </span>\n        </div>\n    </div>\n\n    <div *ngIf=\"showControlButtons\" class=\"owl-dt-container-buttons owl-dt-container-row\">\n        <button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\n                type=\"button\" tabindex=\"0\"\n                (click)=\"onCancelClicked($event)\">\n            <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n                {{cancelLabel}}\n            </span>\n        </button>\n        <button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\n                type=\"button\" tabindex=\"0\"\n                (click)=\"onSetClicked($event)\">\n            <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n                {{setLabel}}\n            </span>\n        </button>\n    </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        owlDateTimePickerAnimations.transformPicker,
                        owlDateTimePickerAnimations.fadeInPicker
                    ],
                    host: {
                        '(@transformPicker.done)': 'handleContainerAnimationDone($event)',
                        '[class.owl-dt-container]': 'owlDTContainerClass',
                        '[class.owl-dt-popup-container]': 'owlDTPopupContainerClass',
                        '[class.owl-dt-dialog-container]': 'owlDTDialogContainerClass',
                        '[class.owl-dt-inline-container]': 'owlDTInlineContainerClass',
                        '[class.owl-dt-container-disabled]': 'owlDTContainerDisabledClass',
                        '[attr.id]': 'owlDTContainerId',
                        '[@transformPicker]': 'owlDTContainerAnimation'
                    }
                }] }
    ];
    /** @nocollapse */
    OwlDateTimeContainerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: OwlDateTimeIntl },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] }
    ]; };
    OwlDateTimeContainerComponent.propDecorators = {
        calendar: [{ type: ViewChild, args: [OwlCalendarComponent, { static: false },] }],
        timer: [{ type: ViewChild, args: [OwlTimerComponent, { static: false },] }]
    };
    return OwlDateTimeContainerComponent;
}());
export { OwlDateTimeContainerComponent };
if (false) {
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.calendar;
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.timer;
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.picker;
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.activeSelectedIndex;
    /**
     * Stream emits when try to hide picker
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.hidePicker$;
    /**
     * Stream emits when try to confirm the selected value
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.confirmSelected$;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.pickerOpened$;
    /**
     * The current picker moment. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype._clamPickerMoment;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.pickerIntl;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.dateTimeAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFHSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBRVYsUUFBUSxFQUNSLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXBFLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUUsT0FBTyxFQUNILFVBQVUsRUFDVixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxRQUFRLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUUvQjtJQXNLSSx1Q0FDWSxLQUF3QixFQUN4QixNQUFrQixFQUNsQixVQUEyQixFQUNmLGVBQW1DO1FBSC9DLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDZixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUE5SXBELHdCQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDLDZFQUE2RTs7Ozs7UUFLckcsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDOzs7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QTJCLENBQUMsWUFBWTtxQkFDM0M7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLHlCQUF5QixFQUFFLHNDQUFzQzt3QkFDakUsMEJBQTBCLEVBQUUscUJBQXFCO3dCQUNqRCxnQ0FBZ0MsRUFBRSwwQkFBMEI7d0JBQzVELGlDQUFpQyxFQUFFLDJCQUEyQjt3QkFDOUQsaUNBQWlDLEVBQUUsMkJBQTJCO3dCQUM5RCxtQ0FBbUMsRUFBRSw2QkFBNkI7d0JBQ2xFLFdBQVcsRUFBRSxrQkFBa0I7d0JBQy9CLG9CQUFvQixFQUFFLHlCQUF5QjtxQkFDbEQ7aUJBQ0o7Ozs7Z0JBMUNHLGlCQUFpQjtnQkFFakIsVUFBVTtnQkFNTCxlQUFlO2dCQUdmLGVBQWUsdUJBc0xmLFFBQVE7OzsyQkFwSlosU0FBUyxTQUFDLG9CQUFvQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt3QkFFakQsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7SUE0YW5ELG9DQUFDO0NBQUEsQUFwY0QsSUFvY0M7U0FoYlksNkJBQTZCOzs7SUFFdEMsaURBQ2tDOztJQUNsQyw4Q0FDNEI7O0lBRTVCLCtDQUE4Qjs7SUFDOUIsNERBQStCOzs7Ozs7SUFLL0Isb0RBQXlDOzs7Ozs7SUFTekMseURBQThDOzs7OztJQU05QyxzREFBMkM7Ozs7Ozs7SUFVM0MsMERBQTZCOzs7OztJQTZHekIsOENBQWdDOzs7OztJQUNoQywrQ0FBMEI7Ozs7O0lBQzFCLG1EQUFtQzs7Ozs7SUFDbkMsd0RBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE93bERhdGVUaW1lSW50bCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3dsQ2FsZW5kYXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xUaW1lckNvbXBvbmVudCB9IGZyb20gJy4vdGltZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZSwgUGlja2VyVHlwZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG93bERhdGVUaW1lUGlja2VyQW5pbWF0aW9ucyB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5hbmltYXRpb25zJztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFNQQUNFLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVDb250YWluZXInLFxuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS1jb250YWluZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICBvd2xEYXRlVGltZVBpY2tlckFuaW1hdGlvbnMudHJhbnNmb3JtUGlja2VyLFxuICAgICAgICBvd2xEYXRlVGltZVBpY2tlckFuaW1hdGlvbnMuZmFkZUluUGlja2VyXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgICcoQHRyYW5zZm9ybVBpY2tlci5kb25lKSc6ICdoYW5kbGVDb250YWluZXJBbmltYXRpb25Eb25lKCRldmVudCknLFxuICAgICAgICAnW2NsYXNzLm93bC1kdC1jb250YWluZXJdJzogJ293bERUQ29udGFpbmVyQ2xhc3MnLFxuICAgICAgICAnW2NsYXNzLm93bC1kdC1wb3B1cC1jb250YWluZXJdJzogJ293bERUUG9wdXBDb250YWluZXJDbGFzcycsXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWRpYWxvZy1jb250YWluZXJdJzogJ293bERURGlhbG9nQ29udGFpbmVyQ2xhc3MnLFxuICAgICAgICAnW2NsYXNzLm93bC1kdC1pbmxpbmUtY29udGFpbmVyXSc6ICdvd2xEVElubGluZUNvbnRhaW5lckNsYXNzJyxcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtY29udGFpbmVyLWRpc2FibGVkXSc6ICdvd2xEVENvbnRhaW5lckRpc2FibGVkQ2xhc3MnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ293bERUQ29udGFpbmVySWQnLFxuICAgICAgICAnW0B0cmFuc2Zvcm1QaWNrZXJdJzogJ293bERUQ29udGFpbmVyQW5pbWF0aW9uJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQFZpZXdDaGlsZChPd2xDYWxlbmRhckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gICAgY2FsZW5kYXI6IE93bENhbGVuZGFyQ29tcG9uZW50PFQ+O1xuICAgIEBWaWV3Q2hpbGQoT3dsVGltZXJDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxuICAgIHRpbWVyOiBPd2xUaW1lckNvbXBvbmVudDxUPjtcblxuICAgIHB1YmxpYyBwaWNrZXI6IE93bERhdGVUaW1lPFQ+O1xuICAgIHB1YmxpYyBhY3RpdmVTZWxlY3RlZEluZGV4ID0gMDsgLy8gVGhlIGN1cnJlbnQgYWN0aXZlIFNlbGVjdGVkSW5kZXggaW4gcmFuZ2Ugc2VsZWN0IG1vZGUgKDA6ICdmcm9tJywgMTogJ3RvJylcblxuICAgIC8qKlxuICAgICAqIFN0cmVhbSBlbWl0cyB3aGVuIHRyeSB0byBoaWRlIHBpY2tlclxuICAgICAqL1xuICAgIHByaXZhdGUgaGlkZVBpY2tlciQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBnZXQgaGlkZVBpY2tlclN0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRlUGlja2VyJC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdHJlYW0gZW1pdHMgd2hlbiB0cnkgdG8gY29uZmlybSB0aGUgc2VsZWN0ZWQgdmFsdWVcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbmZpcm1TZWxlY3RlZCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBnZXQgY29uZmlybVNlbGVjdGVkU3RyZWFtKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpcm1TZWxlY3RlZCQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwaWNrZXJPcGVuZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgZ2V0IHBpY2tlck9wZW5lZFN0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJPcGVuZWQkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHBpY2tlciBtb21lbnQuIFRoaXMgZGV0ZXJtaW5lcyB3aGljaCB0aW1lIHBlcmlvZCBpcyBzaG93biBhbmQgd2hpY2ggZGF0ZSBpc1xuICAgICAqIGhpZ2hsaWdodGVkIHdoZW4gdXNpbmcga2V5Ym9hcmQgbmF2aWdhdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9jbGFtUGlja2VyTW9tZW50OiBUO1xuXG4gICAgZ2V0IHBpY2tlck1vbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsYW1QaWNrZXJNb21lbnQ7XG4gICAgfVxuXG4gICAgc2V0IHBpY2tlck1vbWVudCh2YWx1ZTogVCkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsYW1QaWNrZXJNb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbGFtcERhdGUoXG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIubWluRGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIubWF4RGF0ZVRpbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXQgcGlja2VyVHlwZSgpOiBQaWNrZXJUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLnBpY2tlclR5cGU7XG4gICAgfVxuXG4gICAgZ2V0IGNhbmNlbExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwuY2FuY2VsQnRuTGFiZWw7XG4gICAgfVxuXG4gICAgZ2V0IHNldExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwuc2V0QnRuTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHJhbmdlICdmcm9tJyBsYWJlbFxuICAgICAqL1xuICAgIGdldCBmcm9tTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5yYW5nZUZyb21MYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmFuZ2UgJ3RvJyBsYWJlbFxuICAgICAqL1xuICAgIGdldCB0b0xhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwucmFuZ2VUb0xhYmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSByYW5nZSAnZnJvbScgZm9ybWF0dGVkIHZhbHVlXG4gICAgICovXG4gICAgZ2V0IGZyb21Gb3JtYXR0ZWRWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1swXTtcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGhpcy5waWNrZXIuZm9ybWF0U3RyaW5nKVxuICAgICAgICAgICAgOiAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmFuZ2UgJ3RvJyBmb3JtYXR0ZWQgdmFsdWVcbiAgICAgKi9cbiAgICBnZXQgdG9Gb3JtYXR0ZWRWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1sxXTtcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGhpcy5waWNrZXIuZm9ybWF0U3RyaW5nKVxuICAgICAgICAgICAgOiAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYXNlcyBpbiB3aGljaCB0aGUgY29udHJvbCBidXR0b25zIHNob3cgaW4gdGhlIHBpY2tlclxuICAgICAqIDEpIHBpY2tlciBtb2RlIGlzICdkaWFsb2cnXG4gICAgICogMikgcGlja2VyIHR5cGUgaXMgTk9UICdjYWxlbmRhcicgYW5kIHRoZSBwaWNrZXIgbW9kZSBpcyBOT1QgJ2lubGluZSdcbiAgICAgKi9cbiAgICBnZXQgc2hvd0NvbnRyb2xCdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2RpYWxvZycgfHxcbiAgICAgICAgICAgICh0aGlzLnBpY2tlci5waWNrZXJUeXBlICE9PSAnY2FsZW5kYXInICYmXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIucGlja2VyTW9kZSAhPT0gJ2lubGluZScpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRhaW5lckVsbSgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGdldCBvd2xEVENvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgb3dsRFRQb3B1cENvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ3BvcHVwJztcbiAgICB9XG5cbiAgICBnZXQgb3dsRFREaWFsb2dDb250YWluZXJDbGFzcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLnBpY2tlck1vZGUgPT09ICdkaWFsb2cnO1xuICAgIH1cblxuICAgIGdldCBvd2xEVElubGluZUNvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2lubGluZSc7XG4gICAgfVxuXG4gICAgZ2V0IG93bERUQ29udGFpbmVyRGlzYWJsZWRDbGFzcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGdldCBvd2xEVENvbnRhaW5lcklkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlci5pZDtcbiAgICB9XG5cbiAgICBnZXQgb3dsRFRDb250YWluZXJBbmltYXRpb24oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLnBpY2tlck1vZGUgPT09ICdpbmxpbmUnID8gJycgOiAnZW50ZXInO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBlbG1SZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcGlja2VySW50bDogT3dsRGF0ZVRpbWVJbnRsLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+XG4gICAgKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdFBpY2tlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNQaWNrZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlQ29udGFpbmVyQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdG9TdGF0ZSA9IGV2ZW50LnRvU3RhdGU7XG4gICAgICAgIGlmICh0b1N0YXRlID09PSAnZW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tlck9wZW5lZCQubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRhdGVTZWxlY3RlZChkYXRlOiBUKTogdm9pZCB7XG4gICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgaWYgKHRoaXMucGlja2VyLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmRhdGVTZWxlY3RlZEluU2luZ2xlTW9kZShkYXRlKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3QocmVzdWx0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gd2UgY2xvc2UgdGhlIHBpY2tlciB3aGVuIHJlc3VsdCBpcyBudWxsIGFuZCBwaWNrZXJUeXBlIGlzIGNhbGVuZGFyLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBpY2tlclR5cGUgPT09ICdjYWxlbmRhcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUGlja2VyJC5uZXh0KG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmRhdGVTZWxlY3RlZEluUmFuZ2VNb2RlKGRhdGUpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gcmVzdWx0W3RoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0KHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdGltZVNlbGVjdGVkKHRpbWU6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbG9uZSh0aW1lKTtcblxuICAgICAgICBpZiAoIXRoaXMucGlja2VyLmRhdGVUaW1lQ2hlY2tlcih0aGlzLnBpY2tlck1vbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0KHRoaXMucGlja2VyTW9tZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZHMgPSBbLi4udGhpcy5waWNrZXIuc2VsZWN0ZWRzXTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlICdmcm9tJyBpcyBhZnRlciAndG8nIG9yICd0bydpcyBiZWZvcmUgJ2Zyb20nXG4gICAgICAgICAgICAvLyBJbiB0aGlzIGNhc2UsIHdlIHNldCBib3RoIHRoZSAnZnJvbScgYW5kICd0bycgdGhlIHNhbWUgdmFsdWVcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAodGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkc1sxXSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZHNbMV1cbiAgICAgICAgICAgICAgICAgICAgKSA9PT0gMSkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID09PSAxICYmXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkc1swXSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZHNbMF1cbiAgICAgICAgICAgICAgICAgICAgKSA9PT0gLTEpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZHNbMF0gPSB0aGlzLnBpY2tlck1vbWVudDtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZHNbMV0gPSB0aGlzLnBpY2tlck1vbWVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRzW3RoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleF0gPSB0aGlzLnBpY2tlck1vbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0KHNlbGVjdGVkcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2sgb24gY2FuY2VsIGJ1dHRvblxuICAgICAqL1xuICAgIHB1YmxpYyBvbkNhbmNlbENsaWNrZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmhpZGVQaWNrZXIkLm5leHQobnVsbCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2sgb24gc2V0IGJ1dHRvblxuICAgICAqL1xuICAgIHB1YmxpYyBvblNldENsaWNrZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucGlja2VyLmRhdGVUaW1lQ2hlY2tlcih0aGlzLnBpY2tlck1vbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZVBpY2tlciQubmV4dChudWxsKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZCQubmV4dChldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2sgb24gaW5mb3JtIHJhZGlvIGdyb3VwXG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZUNsaWNrT25JbmZvR3JvdXAoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNldEFjdGl2ZVNlbGVjdGVkSW5kZXgoaW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2sgb24gaW5mb3JtIHJhZGlvIGdyb3VwXG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZUtleWRvd25PbkluZm9Hcm91cChcbiAgICAgICAgZXZlbnQ6IGFueSxcbiAgICAgICAgbmV4dDogYW55LFxuICAgICAgICBpbmRleDogbnVtYmVyXG4gICAgKTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgbmV4dC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlU2VsZWN0ZWRJbmRleChpbmRleCA9PT0gMCA/IDEgOiAwKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlU2VsZWN0ZWRJbmRleChpbmRleCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHZhbHVlIG9mIGFjdGl2ZVNlbGVjdGVkSW5kZXhcbiAgICAgKi9cbiAgICBwcml2YXRlIHNldEFjdGl2ZVNlbGVjdGVkSW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3RNb2RlID09PSAncmFuZ2UnICYmXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggIT09IGluZGV4XG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID0gaW5kZXg7XG5cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5waWNrZXIuc2VsZWN0ZWRzW3RoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleF07XG4gICAgICAgICAgICBpZiAodGhpcy5waWNrZXIuc2VsZWN0ZWRzICYmIHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbG9uZShzZWxlY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFBpY2tlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSB0aGlzLnBpY2tlci5zdGFydEF0IHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xuICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPSB0aGlzLnBpY2tlci5zZWxlY3RNb2RlID09PSAncmFuZ2VUbycgPyAxIDogMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgY2FsZW5kYXIgZGF0ZSBpbiBzaW5nbGUgbW9kZSxcbiAgICAgKiBpdCByZXR1cm5zIG51bGwgd2hlbiBkYXRlIGlzIG5vdCBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGRhdGVTZWxlY3RlZEluU2luZ2xlTW9kZShkYXRlOiBUKTogVCB8IG51bGwge1xuICAgICAgICBpZiAodGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNTYW1lRGF5KGRhdGUsIHRoaXMucGlja2VyLnNlbGVjdGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVBbmRDaGVja0NhbGVuZGFyRGF0ZShkYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgZGF0ZXMgaW4gcmFuZ2UgTW9kZVxuICAgICAqL1xuICAgIHByaXZhdGUgZGF0ZVNlbGVjdGVkSW5SYW5nZU1vZGUoZGF0ZTogVCk6IFRbXSB8IG51bGwge1xuICAgICAgICBsZXQgZnJvbSA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1swXTtcbiAgICAgICAgbGV0IHRvID0gdGhpcy5waWNrZXIuc2VsZWN0ZWRzWzFdO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudXBkYXRlQW5kQ2hlY2tDYWxlbmRhckRhdGUoZGF0ZSk7XG5cbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIGdpdmVuIGNhbGVuZGFyIGRheSBpcyBhZnRlciBvciBlcXVhbCB0byAnZnJvbScsXG4gICAgICAgIC8vIHNldCB0aHMgZ2l2ZW4gZGF0ZSBhcyAndG8nXG4gICAgICAgIC8vIG90aGVyd2lzZSwgc2V0IGl0IGFzICdmcm9tJyBhbmQgc2V0ICd0bycgdG8gbnVsbFxuICAgICAgICBpZiAodGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdGVkcyAmJlxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdGVkcy5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAhdG8gJiZcbiAgICAgICAgICAgICAgICBmcm9tICYmXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKHJlc3VsdCwgZnJvbSkgPj0gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdG8gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnJvbSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB0byA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBpY2tlci5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJykge1xuICAgICAgICAgICAgZnJvbSA9IHJlc3VsdDtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGZyb20gdmFsdWUgaXMgYWZ0ZXIgdGhlIHRvIHZhbHVlLCBzZXQgdGhlIHRvIHZhbHVlIGFzIG51bGxcbiAgICAgICAgICAgIGlmICh0byAmJiB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGZyb20sIHRvKSA+IDApIHtcbiAgICAgICAgICAgICAgICB0byA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nKSB7XG4gICAgICAgICAgICB0byA9IHJlc3VsdDtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGZyb20gdmFsdWUgaXMgYWZ0ZXIgdGhlIHRvIHZhbHVlLCBzZXQgdGhlIGZyb20gdmFsdWUgYXMgbnVsbFxuICAgICAgICAgICAgaWYgKGZyb20gJiYgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShmcm9tLCB0bykgPiAwKSB7XG4gICAgICAgICAgICAgICAgZnJvbSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW2Zyb20sIHRvXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGdpdmVuIGNhbGVuZGFyIGRhdGUncyB0aW1lIGFuZCBjaGVjayBpZiBpdCBpcyB2YWxpZFxuICAgICAqIEJlY2F1c2UgdGhlIGNhbGVuZGFyIGRhdGUgaGFzIDAwOjAwOjAwIGFzIGRlZmF1bHQgdGltZSwgaWYgdGhlIHBpY2tlciB0eXBlIGlzICdib3RoJyxcbiAgICAgKiB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgZ2l2ZW4gY2FsZW5kYXIgZGF0ZSdzIHRpbWUgYmVmb3JlIHNlbGVjdGluZyBpdC5cbiAgICAgKiBpZiBpdCBpcyB2YWxpZCwgcmV0dXJuIHRoZSB1cGRhdGVkIGRhdGVUaW1lXG4gICAgICogaWYgaXQgaXMgbm90IHZhbGlkLCByZXR1cm4gbnVsbFxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlQW5kQ2hlY2tDYWxlbmRhckRhdGUoZGF0ZTogVCk6IFQge1xuICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgIC8vIGlmIHRoZSBwaWNrZXIgaXMgJ2JvdGgnLCB1cGRhdGUgdGhlIGNhbGVuZGFyIGRhdGUncyB0aW1lIHZhbHVlXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5waWNrZXJUeXBlID09PSAnYm90aCcpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlKSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlKSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKGRhdGUpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNaW51dGVzKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNsYW1wRGF0ZShcbiAgICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIubWluRGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIubWF4RGF0ZVRpbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbG9uZShkYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIHRoZSB1cGRhdGVkIGRhdGVUaW1lXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlci5kYXRlVGltZUNoZWNrZXIocmVzdWx0KSA/IHJlc3VsdCA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9jdXMgdG8gdGhlIHBpY2tlclxuICAgICAqL1xuICAgIHByaXZhdGUgZm9jdXNQaWNrZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnaW5saW5lJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgdGhpcy50aW1lci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19