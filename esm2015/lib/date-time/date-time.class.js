/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time.class
 */
import { Inject, Input, Optional } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
/** @type {?} */
let nextUniqueId = 0;
/**
 * @abstract
 * @template T
 */
export class OwlDateTime {
    /**
     * @param {?} dateTimeAdapter
     * @param {?} dateTimeFormats
     */
    constructor(dateTimeAdapter, dateTimeFormats) {
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Whether to show the second's timer
         */
        this._showSecondsTimer = false;
        /**
         * Whether the timer is in hour12 format
         */
        this._hour12Timer = false;
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        /**
         * Hours to change per step
         */
        this._stepHour = 1;
        /**
         * Minutes to change per step
         */
        this._stepMinute = 1;
        /**
         * Seconds to change per step
         */
        this._stepSecond = 1;
        /**
         * Whether to hide dates in other months at the start or end of the current month.
         */
        this._hideOtherMonths = false;
        /**
         * Date Time Checker to check if the give dateTime is selectable
         */
        this.dateTimeChecker = (/**
         * @param {?} dateTime
         * @return {?}
         */
        (dateTime) => {
            return (!!dateTime &&
                (!this.dateTimeFilter || this.dateTimeFilter(dateTime)) &&
                (!this.minDateTime ||
                    this.dateTimeAdapter.compare(dateTime, this.minDateTime) >=
                        0) &&
                (!this.maxDateTime ||
                    this.dateTimeAdapter.compare(dateTime, this.maxDateTime) <= 0));
        });
        if (!this.dateTimeAdapter) {
            throw Error(`OwlDateTimePicker: No provider found for DateTimeAdapter. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        if (!this.dateTimeFormats) {
            throw Error(`OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        this._id = `owl-dt-picker-${nextUniqueId++}`;
    }
    /**
     * @return {?}
     */
    get showSecondsTimer() {
        return this._showSecondsTimer;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set showSecondsTimer(val) {
        this._showSecondsTimer = coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    get hour12Timer() {
        return this._hour12Timer;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set hour12Timer(val) {
        this._hour12Timer = coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    get stepHour() {
        return this._stepHour;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set stepHour(val) {
        this._stepHour = coerceNumberProperty(val, 1);
    }
    /**
     * @return {?}
     */
    get stepMinute() {
        return this._stepMinute;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set stepMinute(val) {
        this._stepMinute = coerceNumberProperty(val, 1);
    }
    /**
     * @return {?}
     */
    get stepSecond() {
        return this._stepSecond;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set stepSecond(val) {
        this._stepSecond = coerceNumberProperty(val, 1);
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
        value = coerceNumberProperty(value);
        if (value > 6 || value < 0) {
            this._firstDayOfWeek = undefined;
        }
        else {
            this._firstDayOfWeek = value;
        }
    }
    /**
     * @return {?}
     */
    get hideOtherMonths() {
        return this._hideOtherMonths;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set hideOtherMonths(val) {
        this._hideOtherMonths = coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @return {?}
     */
    get formatString() {
        return this.pickerType === 'both'
            ? this.dateTimeFormats.fullPickerInput
            : this.pickerType === 'calendar'
                ? this.dateTimeFormats.datePickerInput
                : this.dateTimeFormats.timePickerInput;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return false;
    }
    /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
}
/** @nocollapse */
OwlDateTime.ctorParameters = () => [
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
];
OwlDateTime.propDecorators = {
    showSecondsTimer: [{ type: Input }],
    hour12Timer: [{ type: Input }],
    startView: [{ type: Input }],
    stepHour: [{ type: Input }],
    stepMinute: [{ type: Input }],
    stepSecond: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    hideOtherMonths: [{ type: Input }]
};
if (false) {
    /**
     * Whether to show the second's timer
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._showSecondsTimer;
    /**
     * Whether the timer is in hour12 format
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._hour12Timer;
    /**
     * The view that the calendar should start in.
     * @type {?}
     */
    OwlDateTime.prototype.startView;
    /**
     * Hours to change per step
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._stepHour;
    /**
     * Minutes to change per step
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._stepMinute;
    /**
     * Seconds to change per step
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._stepSecond;
    /**
     * Set the first day of week
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._firstDayOfWeek;
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._hideOtherMonths;
    /**
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._id;
    /** @type {?} */
    OwlDateTime.prototype.yearSelected;
    /** @type {?} */
    OwlDateTime.prototype.monthSelected;
    /**
     * Date Time Checker to check if the give dateTime is selectable
     * @type {?}
     */
    OwlDateTime.prototype.dateTimeChecker;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTime.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTime.prototype.dateTimeFormats;
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.selected = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.selecteds = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.dateTimeFilter = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.maxDateTime = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.minDateTime = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.selectMode = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.startAt = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.opened = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.pickerMode = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.pickerType = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.isInSingleMode = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.isInRangeMode = function () { };
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    OwlDateTime.prototype.select = function (date) { };
    /**
     * @abstract
     * @param {?} normalizedYear
     * @return {?}
     */
    OwlDateTime.prototype.selectYear = function (normalizedYear) { };
    /**
     * @abstract
     * @param {?} normalizedMonth
     * @return {?}
     */
    OwlDateTime.prototype.selectMonth = function (normalizedMonth) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2RhdGUtdGltZS5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsT0FBTyxFQUFnQixNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUN2QixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7O0lBRXRDLFlBQVksR0FBRyxDQUFDOzs7OztBQVFwQixNQUFNLE9BQWdCLFdBQVc7Ozs7O0lBeUs3QixZQUMwQixlQUFtQyxFQUcvQyxlQUFtQztRQUh2QixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9COzs7O1FBekt6QyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7Ozs7UUFhMUIsaUJBQVksR0FBRyxLQUFLLENBQUM7Ozs7UUFjN0IsY0FBUyxHQUFxQyxPQUFPLENBQUM7Ozs7UUFLOUMsY0FBUyxHQUFHLENBQUMsQ0FBQzs7OztRQWFkLGdCQUFXLEdBQUcsQ0FBQyxDQUFDOzs7O1FBYWhCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDOzs7O1FBK0JoQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7Ozs7UUE0RDFCLG9CQUFlOzs7O1FBQUcsQ0FBQyxRQUFXLEVBQUUsRUFBRTtZQUNyQyxPQUFPLENBQ0gsQ0FBQyxDQUFDLFFBQVE7Z0JBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXO29CQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO3dCQUNwRCxDQUFDLENBQUM7Z0JBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXO29CQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3JFLENBQUM7UUFDTixDQUFDLEVBQUM7UUFZRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN2QixNQUFNLEtBQUssQ0FDUCxpR0FBaUc7Z0JBQzdGLG1HQUFtRztnQkFDbkcsd0JBQXdCLENBQy9CLENBQUM7U0FDTDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3ZCLE1BQU0sS0FBSyxDQUNQLHVHQUF1RztnQkFDbkcsbUdBQW1HO2dCQUNuRyx3QkFBd0IsQ0FDL0IsQ0FBQztTQUNMO1FBRUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxpQkFBaUIsWUFBWSxFQUFFLEVBQUUsQ0FBQztJQUNqRCxDQUFDOzs7O0lBM0xELElBQ0ksZ0JBQWdCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFZO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7O0lBTUQsSUFDSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsSUFBSSxXQUFXLENBQUMsR0FBWTtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7SUFZRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBQyxHQUFXO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7SUFNRCxJQUNJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFVBQVUsQ0FBQyxHQUFXO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7SUFNRCxJQUNJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFVBQVUsQ0FBQyxHQUFXO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7SUFNRCxJQUNJLGNBQWM7UUFDZCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxJQUFJLGNBQWMsQ0FBQyxLQUFhO1FBQzVCLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztTQUNwQzthQUFNO1lBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7U0FDaEM7SUFDTCxDQUFDOzs7O0lBTUQsSUFDSSxlQUFlO1FBQ2YsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCxJQUFJLGVBQWUsQ0FBQyxHQUFZO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7O0lBR0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFvQ0QsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLE1BQU07WUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZTtZQUN0QyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVO2dCQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlO2dCQUN0QyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUM7SUFDL0MsQ0FBQzs7OztJQWlCRCxJQUFJLFFBQVE7UUFDUixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUEyQlMsWUFBWSxDQUFDLEdBQVE7UUFDM0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxHQUFHO1lBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNmLENBQUM7Ozs7WUFyTkksZUFBZSx1QkF3TGYsUUFBUTs0Q0FDUixRQUFRLFlBQ1IsTUFBTSxTQUFDLHFCQUFxQjs7OytCQXZLaEMsS0FBSzswQkFhTCxLQUFLO3dCQVlMLEtBQUs7dUJBT0wsS0FBSzt5QkFhTCxLQUFLO3lCQWFMLEtBQUs7NkJBYUwsS0FBSzs4QkFrQkwsS0FBSzs7Ozs7Ozs7SUExRk4sd0NBQWtDOzs7Ozs7SUFhbEMsbUNBQTZCOzs7OztJQWE3QixnQ0FDc0Q7Ozs7OztJQUt0RCxnQ0FBc0I7Ozs7OztJQWF0QixrQ0FBd0I7Ozs7OztJQWF4QixrQ0FBd0I7Ozs7OztJQWF4QixzQ0FBZ0M7Ozs7OztJQWtCaEMsdUNBQWlDOzs7OztJQVVqQywwQkFBNkI7O0lBK0I3QixtQ0FBdUM7O0lBRXZDLG9DQUF3Qzs7Ozs7SUFpQnhDLHNDQVVFOzs7OztJQU9FLHNDQUF5RDs7Ozs7SUFDekQsc0NBRTZDOzs7OztJQWpFakQsaURBQWtDOzs7OztJQUVsQyxrREFBcUM7Ozs7O0lBRXJDLHVEQUEyRDs7Ozs7SUFFM0Qsb0RBQXFDOzs7OztJQUVyQyxvREFBcUM7Ozs7O0lBRXJDLG1EQUFzQzs7Ozs7SUFFdEMsZ0RBQWlDOzs7OztJQUVqQywrQ0FBK0I7Ozs7O0lBRS9CLG1EQUFzQzs7Ozs7SUFFdEMsbURBQXNDOzs7OztJQUV0Qyx1REFBdUM7Ozs7O0lBRXZDLHNEQUFzQzs7Ozs7O0lBRXRDLG1EQUFxQzs7Ozs7O0lBTXJDLGlFQUE2Qzs7Ozs7O0lBRTdDLG1FQUErQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLmNsYXNzXG4gKi9cbmltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgY29lcmNlQm9vbGVhblByb3BlcnR5LFxuICAgIGNvZXJjZU51bWJlclByb3BlcnR5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBPV0xfREFURV9USU1FX0ZPUk1BVFMsXG4gICAgT3dsRGF0ZVRpbWVGb3JtYXRzXG59IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbmV4cG9ydCB0eXBlIFBpY2tlclR5cGUgPSAnYm90aCcgfCAnY2FsZW5kYXInIHwgJ3RpbWVyJztcblxuZXhwb3J0IHR5cGUgUGlja2VyTW9kZSA9ICdwb3B1cCcgfCAnZGlhbG9nJyB8ICdpbmxpbmUnO1xuXG5leHBvcnQgdHlwZSBTZWxlY3RNb2RlID0gJ3NpbmdsZScgfCAncmFuZ2UnIHwgJ3JhbmdlRnJvbScgfCAncmFuZ2VUbyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBPd2xEYXRlVGltZTxUPiB7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBzZWNvbmQncyB0aW1lclxuICAgICAqL1xuICAgIHByaXZhdGUgX3Nob3dTZWNvbmRzVGltZXIgPSBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzaG93U2Vjb25kc1RpbWVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd1NlY29uZHNUaW1lcjtcbiAgICB9XG5cbiAgICBzZXQgc2hvd1NlY29uZHNUaW1lcih2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2hvd1NlY29uZHNUaW1lciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHRpbWVyIGlzIGluIGhvdXIxMiBmb3JtYXRcbiAgICAgKi9cbiAgICBwcml2YXRlIF9ob3VyMTJUaW1lciA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGhvdXIxMlRpbWVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faG91cjEyVGltZXI7XG4gICAgfVxuXG4gICAgc2V0IGhvdXIxMlRpbWVyKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9ob3VyMTJUaW1lciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSB2aWV3IHRoYXQgdGhlIGNhbGVuZGFyIHNob3VsZCBzdGFydCBpbi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHN0YXJ0VmlldzogJ21vbnRoJyB8ICd5ZWFyJyB8ICdtdWx0aS15ZWFycycgPSAnbW9udGgnO1xuXG4gICAgLyoqXG4gICAgICogSG91cnMgdG8gY2hhbmdlIHBlciBzdGVwXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc3RlcEhvdXIgPSAxO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0ZXBIb3VyKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwSG91cjtcbiAgICB9XG5cbiAgICBzZXQgc3RlcEhvdXIodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc3RlcEhvdXIgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwsIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1pbnV0ZXMgdG8gY2hhbmdlIHBlciBzdGVwXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc3RlcE1pbnV0ZSA9IDE7XG4gICAgQElucHV0KClcbiAgICBnZXQgc3RlcE1pbnV0ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcE1pbnV0ZTtcbiAgICB9XG5cbiAgICBzZXQgc3RlcE1pbnV0ZSh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zdGVwTWludXRlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWNvbmRzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIHByaXZhdGUgX3N0ZXBTZWNvbmQgPSAxO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0ZXBTZWNvbmQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXBTZWNvbmQ7XG4gICAgfVxuXG4gICAgc2V0IHN0ZXBTZWNvbmQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc3RlcFNlY29uZCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbCwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBmaXJzdCBkYXkgb2Ygd2Vla1xuICAgICAqL1xuICAgIHByaXZhdGUgX2ZpcnN0RGF5T2ZXZWVrOiBudW1iZXI7XG4gICAgQElucHV0KClcbiAgICBnZXQgZmlyc3REYXlPZldlZWsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdERheU9mV2VlaztcbiAgICB9XG5cbiAgICBzZXQgZmlyc3REYXlPZldlZWsodmFsdWU6IG51bWJlcikge1xuICAgICAgICB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlID4gNiB8fCB2YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3REYXlPZldlZWsgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gaGlkZSBkYXRlcyBpbiBvdGhlciBtb250aHMgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgY3VycmVudCBtb250aC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9oaWRlT3RoZXJNb250aHMgPSBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBoaWRlT3RoZXJNb250aHMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaWRlT3RoZXJNb250aHM7XG4gICAgfVxuXG4gICAgc2V0IGhpZGVPdGhlck1vbnRocyh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faGlkZU90aGVyTW9udGhzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkb25seSBfaWQ6IHN0cmluZztcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIGFic3RyYWN0IGdldCBzZWxlY3RlZCgpOiBUIHwgbnVsbDtcblxuICAgIGFic3RyYWN0IGdldCBzZWxlY3RlZHMoKTogVFtdIHwgbnVsbDtcblxuICAgIGFic3RyYWN0IGdldCBkYXRlVGltZUZpbHRlcigpOiAoZGF0ZTogVCB8IG51bGwpID0+IGJvb2xlYW47XG5cbiAgICBhYnN0cmFjdCBnZXQgbWF4RGF0ZVRpbWUoKTogVCB8IG51bGw7XG5cbiAgICBhYnN0cmFjdCBnZXQgbWluRGF0ZVRpbWUoKTogVCB8IG51bGw7XG5cbiAgICBhYnN0cmFjdCBnZXQgc2VsZWN0TW9kZSgpOiBTZWxlY3RNb2RlO1xuXG4gICAgYWJzdHJhY3QgZ2V0IHN0YXJ0QXQoKTogVCB8IG51bGw7XG5cbiAgICBhYnN0cmFjdCBnZXQgb3BlbmVkKCk6IGJvb2xlYW47XG5cbiAgICBhYnN0cmFjdCBnZXQgcGlja2VyTW9kZSgpOiBQaWNrZXJNb2RlO1xuXG4gICAgYWJzdHJhY3QgZ2V0IHBpY2tlclR5cGUoKTogUGlja2VyVHlwZTtcblxuICAgIGFic3RyYWN0IGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuO1xuXG4gICAgYWJzdHJhY3QgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbjtcblxuICAgIGFic3RyYWN0IHNlbGVjdChkYXRlOiBUIHwgVFtdKTogdm9pZDtcblxuICAgIGFic3RyYWN0IHllYXJTZWxlY3RlZDogRXZlbnRFbWl0dGVyPFQ+O1xuXG4gICAgYWJzdHJhY3QgbW9udGhTZWxlY3RlZDogRXZlbnRFbWl0dGVyPFQ+O1xuXG4gICAgYWJzdHJhY3Qgc2VsZWN0WWVhcihub3JtYWxpemVkWWVhcjogVCk6IHZvaWQ7XG5cbiAgICBhYnN0cmFjdCBzZWxlY3RNb250aChub3JtYWxpemVkTW9udGg6IFQpOiB2b2lkO1xuXG4gICAgZ2V0IGZvcm1hdFN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJUeXBlID09PSAnYm90aCdcbiAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUZvcm1hdHMuZnVsbFBpY2tlcklucHV0XG4gICAgICAgICAgICA6IHRoaXMucGlja2VyVHlwZSA9PT0gJ2NhbGVuZGFyJ1xuICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lRm9ybWF0cy5kYXRlUGlja2VySW5wdXRcbiAgICAgICAgICAgIDogdGhpcy5kYXRlVGltZUZvcm1hdHMudGltZVBpY2tlcklucHV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERhdGUgVGltZSBDaGVja2VyIHRvIGNoZWNrIGlmIHRoZSBnaXZlIGRhdGVUaW1lIGlzIHNlbGVjdGFibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0ZVRpbWVDaGVja2VyID0gKGRhdGVUaW1lOiBUKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhIWRhdGVUaW1lICYmXG4gICAgICAgICAgICAoIXRoaXMuZGF0ZVRpbWVGaWx0ZXIgfHwgdGhpcy5kYXRlVGltZUZpbHRlcihkYXRlVGltZSkpICYmXG4gICAgICAgICAgICAoIXRoaXMubWluRGF0ZVRpbWUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGVUaW1lLCB0aGlzLm1pbkRhdGVUaW1lKSA+PVxuICAgICAgICAgICAgICAgICAgICAwKSAmJlxuICAgICAgICAgICAgKCF0aGlzLm1heERhdGVUaW1lIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlVGltZSwgdGhpcy5tYXhEYXRlVGltZSkgPD0gMClcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXG4gICAgICAgIHByb3RlY3RlZCBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0c1xuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBEYXRlVGltZUFkYXB0ZXIuIFlvdSBtdXN0IGltcG9ydCBvbmUgb2YgdGhlIGZvbGxvd2luZyBgICtcbiAgICAgICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290OiBPd2xOYXRpdmVEYXRlVGltZU1vZHVsZSwgT3dsTW9tZW50RGF0ZVRpbWVNb2R1bGUsIG9yIHByb3ZpZGUgYSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGN1c3RvbSBpbXBsZW1lbnRhdGlvbi5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lRm9ybWF0cykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgT1dMX0RBVEVfVElNRV9GT1JNQVRTLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBmb2xsb3dpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdDogT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUsIE93bE1vbWVudERhdGVUaW1lTW9kdWxlLCBvciBwcm92aWRlIGEgYCArXG4gICAgICAgICAgICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lkID0gYG93bC1kdC1waWNrZXItJHtuZXh0VW5pcXVlSWQrK31gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgICAgICAgID8gb2JqXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxufVxuIl19