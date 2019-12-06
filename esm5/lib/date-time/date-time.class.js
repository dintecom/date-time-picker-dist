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
var nextUniqueId = 0;
/**
 * @abstract
 * @template T
 */
var OwlDateTime = /** @class */ (function () {
    function OwlDateTime(dateTimeAdapter, dateTimeFormats) {
        var _this = this;
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
        function (dateTime) {
            return (!!dateTime &&
                (!_this.dateTimeFilter || _this.dateTimeFilter(dateTime)) &&
                (!_this.minDateTime ||
                    _this.dateTimeAdapter.compare(dateTime, _this.minDateTime) >=
                        0) &&
                (!_this.maxDateTime ||
                    _this.dateTimeAdapter.compare(dateTime, _this.maxDateTime) <= 0));
        });
        if (!this.dateTimeAdapter) {
            throw Error("OwlDateTimePicker: No provider found for DateTimeAdapter. You must import one of the following " +
                "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                "custom implementation.");
        }
        if (!this.dateTimeFormats) {
            throw Error("OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following " +
                "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                "custom implementation.");
        }
        this._id = "owl-dt-picker-" + nextUniqueId++;
    }
    Object.defineProperty(OwlDateTime.prototype, "showSecondsTimer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showSecondsTimer;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._showSecondsTimer = coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "hour12Timer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hour12Timer;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._hour12Timer = coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "stepHour", {
        get: /**
         * @return {?}
         */
        function () {
            return this._stepHour;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._stepHour = coerceNumberProperty(val, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "stepMinute", {
        get: /**
         * @return {?}
         */
        function () {
            return this._stepMinute;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._stepMinute = coerceNumberProperty(val, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "stepSecond", {
        get: /**
         * @return {?}
         */
        function () {
            return this._stepSecond;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._stepSecond = coerceNumberProperty(val, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "firstDayOfWeek", {
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
            value = coerceNumberProperty(value);
            if (value > 6 || value < 0) {
                this._firstDayOfWeek = undefined;
            }
            else {
                this._firstDayOfWeek = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "hideOtherMonths", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hideOtherMonths;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._hideOtherMonths = coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "formatString", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerType === 'both'
                ? this.dateTimeFormats.fullPickerInput
                : this.pickerType === 'calendar'
                    ? this.dateTimeFormats.datePickerInput
                    : this.dateTimeFormats.timePickerInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    OwlDateTime.prototype.getValidDate = /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    };
    /** @nocollapse */
    OwlDateTime.ctorParameters = function () { return [
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
    ]; };
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
    return OwlDateTime;
}());
export { OwlDateTime };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2RhdGUtdGltZS5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsT0FBTyxFQUFnQixNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUN2QixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7O0lBRXRDLFlBQVksR0FBRyxDQUFDOzs7OztBQVFwQjtJQXlLSSxxQkFDMEIsZUFBbUMsRUFHL0MsZUFBbUM7UUFKakQsaUJBdUJDO1FBdEJ5QixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9COzs7O1FBekt6QyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7Ozs7UUFhMUIsaUJBQVksR0FBRyxLQUFLLENBQUM7Ozs7UUFjN0IsY0FBUyxHQUFxQyxPQUFPLENBQUM7Ozs7UUFLOUMsY0FBUyxHQUFHLENBQUMsQ0FBQzs7OztRQWFkLGdCQUFXLEdBQUcsQ0FBQyxDQUFDOzs7O1FBYWhCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDOzs7O1FBK0JoQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7Ozs7UUE0RDFCLG9CQUFlOzs7O1FBQUcsVUFBQyxRQUFXO1lBQ2pDLE9BQU8sQ0FDSCxDQUFDLENBQUMsUUFBUTtnQkFDVixDQUFDLENBQUMsS0FBSSxDQUFDLGNBQWMsSUFBSSxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVc7b0JBQ2QsS0FBSSxDQUFD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OztJQUV2QyxvQ0FBd0M7Ozs7O0lBaUJ4QyxzQ0FVRTs7Ozs7SUFPRSxzQ0FBeUQ7Ozs7O0lBQ3pELHNDQUU2Qzs7Ozs7SUFqRWpELGlEQUFrQzs7Ozs7SUFFbEMsa0RBQXFDOzs7OztJQUVyQyx1REFBMkQ7Ozs7O0lBRTNELG9EQUFxQzs7Ozs7SUFFckMsb0RBQXFDOzs7OztJQUVyQyxtREFBc0M7Ozs7O0lBRXRDLGdEQUFpQzs7Ozs7SUFFakMsK0NBQStCOzs7OztJQUUvQixtREFBc0M7Ozs7O0lBRXRDLG1EQUFzQzs7Ozs7SUFFdEMsdURBQXVDOzs7OztJQUV2QyxzREFBc0M7Ozs7OztJQUV0QyxtREFBcUM7Ozs7OztJQU1yQyxpRUFBNkM7Ozs7OztJQUU3QyxtRUFBK0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS5jbGFzc1xuICovXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgICBjb2VyY2VOdW1iZXJQcm9wZXJ0eVxufSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG5leHBvcnQgdHlwZSBQaWNrZXJUeXBlID0gJ2JvdGgnIHwgJ2NhbGVuZGFyJyB8ICd0aW1lcic7XG5cbmV4cG9ydCB0eXBlIFBpY2tlck1vZGUgPSAncG9wdXAnIHwgJ2RpYWxvZycgfCAnaW5saW5lJztcblxuZXhwb3J0IHR5cGUgU2VsZWN0TW9kZSA9ICdzaW5nbGUnIHwgJ3JhbmdlJyB8ICdyYW5nZUZyb20nIHwgJ3JhbmdlVG8nO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT3dsRGF0ZVRpbWU8VD4ge1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgc2Vjb25kJ3MgdGltZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zaG93U2Vjb25kc1RpbWVyID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBnZXQgc2hvd1NlY29uZHNUaW1lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dTZWNvbmRzVGltZXI7XG4gICAgfVxuXG4gICAgc2V0IHNob3dTZWNvbmRzVGltZXIodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dTZWNvbmRzVGltZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB0aW1lciBpcyBpbiBob3VyMTIgZm9ybWF0XG4gICAgICovXG4gICAgcHJpdmF0ZSBfaG91cjEyVGltZXIgPSBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBob3VyMTJUaW1lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hvdXIxMlRpbWVyO1xuICAgIH1cblxuICAgIHNldCBob3VyMTJUaW1lcih2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faG91cjEyVGltZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmlldyB0aGF0IHRoZSBjYWxlbmRhciBzaG91bGQgc3RhcnQgaW4uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGFydFZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcnMnID0gJ21vbnRoJztcblxuICAgIC8qKlxuICAgICAqIEhvdXJzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIHByaXZhdGUgX3N0ZXBIb3VyID0gMTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGVwSG91cigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcEhvdXI7XG4gICAgfVxuXG4gICAgc2V0IHN0ZXBIb3VyKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3N0ZXBIb3VyID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNaW51dGVzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIHByaXZhdGUgX3N0ZXBNaW51dGUgPSAxO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0ZXBNaW51dGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXBNaW51dGU7XG4gICAgfVxuXG4gICAgc2V0IHN0ZXBNaW51dGUodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc3RlcE1pbnV0ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbCwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2Vjb25kcyB0byBjaGFuZ2UgcGVyIHN0ZXBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zdGVwU2Vjb25kID0gMTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGVwU2Vjb25kKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwU2Vjb25kO1xuICAgIH1cblxuICAgIHNldCBzdGVwU2Vjb25kKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3N0ZXBTZWNvbmQgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwsIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZmlyc3QgZGF5IG9mIHdlZWtcbiAgICAgKi9cbiAgICBwcml2YXRlIF9maXJzdERheU9mV2VlazogbnVtYmVyO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGZpcnN0RGF5T2ZXZWVrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3REYXlPZldlZWs7XG4gICAgfVxuXG4gICAgc2V0IGZpcnN0RGF5T2ZXZWVrKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZSA+IDYgfHwgdmFsdWUgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdERheU9mV2VlayA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGhpZGUgZGF0ZXMgaW4gb3RoZXIgbW9udGhzIGF0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGN1cnJlbnQgbW9udGguXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaGlkZU90aGVyTW9udGhzID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBnZXQgaGlkZU90aGVyTW9udGhzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlkZU90aGVyTW9udGhzO1xuICAgIH1cblxuICAgIHNldCBoaWRlT3RoZXJNb250aHModmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2hpZGVPdGhlck1vbnRocyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2lkOiBzdHJpbmc7XG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBnZXQgc2VsZWN0ZWQoKTogVCB8IG51bGw7XG5cbiAgICBhYnN0cmFjdCBnZXQgc2VsZWN0ZWRzKCk6IFRbXSB8IG51bGw7XG5cbiAgICBhYnN0cmFjdCBnZXQgZGF0ZVRpbWVGaWx0ZXIoKTogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuO1xuXG4gICAgYWJzdHJhY3QgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsO1xuXG4gICAgYWJzdHJhY3QgZ2V0IG1pbkRhdGVUaW1lKCk6IFQgfCBudWxsO1xuXG4gICAgYWJzdHJhY3QgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZTtcblxuICAgIGFic3RyYWN0IGdldCBzdGFydEF0KCk6IFQgfCBudWxsO1xuXG4gICAgYWJzdHJhY3QgZ2V0IG9wZW5lZCgpOiBib29sZWFuO1xuXG4gICAgYWJzdHJhY3QgZ2V0IHBpY2tlck1vZGUoKTogUGlja2VyTW9kZTtcblxuICAgIGFic3RyYWN0IGdldCBwaWNrZXJUeXBlKCk6IFBpY2tlclR5cGU7XG5cbiAgICBhYnN0cmFjdCBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbjtcblxuICAgIGFic3RyYWN0IGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW47XG5cbiAgICBhYnN0cmFjdCBzZWxlY3QoZGF0ZTogVCB8IFRbXSk6IHZvaWQ7XG5cbiAgICBhYnN0cmFjdCB5ZWFyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxUPjtcblxuICAgIGFic3RyYWN0IG1vbnRoU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxUPjtcblxuICAgIGFic3RyYWN0IHNlbGVjdFllYXIobm9ybWFsaXplZFllYXI6IFQpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3Qgc2VsZWN0TW9udGgobm9ybWFsaXplZE1vbnRoOiBUKTogdm9pZDtcblxuICAgIGdldCBmb3JtYXRTdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyVHlwZSA9PT0gJ2JvdGgnXG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVGb3JtYXRzLmZ1bGxQaWNrZXJJbnB1dFxuICAgICAgICAgICAgOiB0aGlzLnBpY2tlclR5cGUgPT09ICdjYWxlbmRhcidcbiAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUZvcm1hdHMuZGF0ZVBpY2tlcklucHV0XG4gICAgICAgICAgICA6IHRoaXMuZGF0ZVRpbWVGb3JtYXRzLnRpbWVQaWNrZXJJbnB1dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEYXRlIFRpbWUgQ2hlY2tlciB0byBjaGVjayBpZiB0aGUgZ2l2ZSBkYXRlVGltZSBpcyBzZWxlY3RhYmxlXG4gICAgICovXG4gICAgcHVibGljIGRhdGVUaW1lQ2hlY2tlciA9IChkYXRlVGltZTogVCkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgISFkYXRlVGltZSAmJlxuICAgICAgICAgICAgKCF0aGlzLmRhdGVUaW1lRmlsdGVyIHx8IHRoaXMuZGF0ZVRpbWVGaWx0ZXIoZGF0ZVRpbWUpKSAmJlxuICAgICAgICAgICAgKCF0aGlzLm1pbkRhdGVUaW1lIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlVGltZSwgdGhpcy5taW5EYXRlVGltZSkgPj1cbiAgICAgICAgICAgICAgICAgICAgMCkgJiZcbiAgICAgICAgICAgICghdGhpcy5tYXhEYXRlVGltZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZGF0ZVRpbWUsIHRoaXMubWF4RGF0ZVRpbWUpIDw9IDApXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxuICAgICAgICBwcm90ZWN0ZWQgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHNcbiAgICApIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lQWRhcHRlcikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgRGF0ZVRpbWVBZGFwdGVyLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBmb2xsb3dpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdDogT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUsIE93bE1vbWVudERhdGVUaW1lTW9kdWxlLCBvciBwcm92aWRlIGEgYCArXG4gICAgICAgICAgICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUZvcm1hdHMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBPd2xEYXRlVGltZVBpY2tlcjogTm8gcHJvdmlkZXIgZm91bmQgZm9yIE9XTF9EQVRFX1RJTUVfRk9STUFUUy4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZm9sbG93aW5nIGAgK1xuICAgICAgICAgICAgICAgICAgICBgbW9kdWxlcyBhdCB5b3VyIGFwcGxpY2F0aW9uIHJvb3Q6IE93bE5hdGl2ZURhdGVUaW1lTW9kdWxlLCBPd2xNb21lbnREYXRlVGltZU1vZHVsZSwgb3IgcHJvdmlkZSBhIGAgK1xuICAgICAgICAgICAgICAgICAgICBgY3VzdG9tIGltcGxlbWVudGF0aW9uLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pZCA9IGBvd2wtZHQtcGlja2VyLSR7bmV4dFVuaXF1ZUlkKyt9YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChvYmopXG4gICAgICAgICAgICA/IG9ialxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cbn1cbiJdfQ==