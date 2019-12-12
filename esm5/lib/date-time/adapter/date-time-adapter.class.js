/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-adapter.class
 */
import { Subject } from 'rxjs';
import { inject, InjectionToken, LOCALE_ID } from '@angular/core';
/**
 * InjectionToken for date time picker that can be used to override default locale code.
 * @type {?}
 */
export var OWL_DATE_TIME_LOCALE = new InjectionToken('OWL_DATE_TIME_LOCALE', {
    providedIn: 'root',
    factory: OWL_DATE_TIME_LOCALE_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
export function OWL_DATE_TIME_LOCALE_FACTORY() {
    return inject(LOCALE_ID);
}
/**
 * Provider for OWL_DATE_TIME_LOCALE injection token.
 * @type {?}
 */
export var OWL_DATE_TIME_LOCALE_PROVIDER = {
    provide: OWL_DATE_TIME_LOCALE,
    useExisting: LOCALE_ID
};
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
DateTimeAdapter = /** @class */ (function () {
    function DateTimeAdapter() {
        /**
         * A stream that emits when the locale changes.
         */
        this._localeChanges = new Subject();
        /**
         * total milliseconds in a day.
         */
        this.millisecondsInDay = 86400000;
        /**
         * total milliseconds in a minute.
         */
        this.milliseondsInMinute = 60000;
    }
    Object.defineProperty(DateTimeAdapter.prototype, "localeChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return this._localeChanges;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Compare two given dates
     * 1 if the first date is after the second,
     * -1 if the first date is before the second
     * 0 if dates are equal.
     */
    /**
     * Compare two given dates
     * 1 if the first date is after the second,
     * -1 if the first date is before the second
     * 0 if dates are equal.
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DateTimeAdapter.prototype.compare = /**
     * Compare two given dates
     * 1 if the first date is after the second,
     * -1 if the first date is before the second
     * 0 if dates are equal.
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first, second) {
        if (!this.isValid(first) || !this.isValid(second)) {
            throw Error('JSNativeDate: Cannot compare invalid dates.');
        }
        /** @type {?} */
        var dateFirst = this.clone(first);
        /** @type {?} */
        var dateSecond = this.clone(second);
        /** @type {?} */
        var diff = this.getTime(dateFirst) - this.getTime(dateSecond);
        if (diff < 0) {
            return -1;
        }
        else if (diff > 0) {
            return 1;
        }
        else {
            // Return 0 if diff is 0; return NaN if diff is NaN
            return diff;
        }
    };
    /**
     * Check if two given dates are in the same year
     * 1 if the first date's year is after the second,
     * -1 if the first date's year is before the second
     * 0 if two given dates are in the same year
     */
    /**
     * Check if two given dates are in the same year
     * 1 if the first date's year is after the second,
     * -1 if the first date's year is before the second
     * 0 if two given dates are in the same year
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DateTimeAdapter.prototype.compareYear = /**
     * Check if two given dates are in the same year
     * 1 if the first date's year is after the second,
     * -1 if the first date's year is before the second
     * 0 if two given dates are in the same year
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first, second) {
        if (!this.isValid(first) || !this.isValid(second)) {
            throw Error('JSNativeDate: Cannot compare invalid dates.');
        }
        /** @type {?} */
        var yearLeft = this.getYear(first);
        /** @type {?} */
        var yearRight = this.getYear(second);
        /** @type {?} */
        var diff = yearLeft - yearRight;
        if (diff < 0) {
            return -1;
        }
        else if (diff > 0) {
            return 1;
        }
        else {
            return 0;
        }
    };
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     */
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param {?} value
     * @return {?}
     */
    DateTimeAdapter.prototype.deserialize = /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value == null ||
            (this.isDateInstance(value) && this.isValid(value))) {
            return value;
        }
        return this.invalid();
    };
    /**
     * Get the locale used for all dates.
     */
    /**
     * Get the locale used for all dates.
     * @return {?}
     */
    DateTimeAdapter.prototype.getLocale = /**
     * Get the locale used for all dates.
     * @return {?}
     */
    function () {
        return this.locale;
    };
    /**
     * Sets the locale used for all dates.
     */
    /**
     * Sets the locale used for all dates.
     * @param {?} locale
     * @return {?}
     */
    DateTimeAdapter.prototype.setLocale = /**
     * Sets the locale used for all dates.
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        this.locale = locale;
        this._localeChanges.next(locale);
    };
    /**
     * Clamp the given date between min and max dates.
     */
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    DateTimeAdapter.prototype.clampDate = /**
     * Clamp the given date between min and max dates.
     * @param {?} date
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    function (date, min, max) {
        if (min && this.compare(date, min) < 0) {
            return min;
        }
        if (max && this.compare(date, max) > 0) {
            return max;
        }
        return date;
    };
    return DateTimeAdapter;
}());
/**
 * @abstract
 * @template T
 */
export { DateTimeAdapter };
if (false) {
    /**
     * The locale to use for all dates.
     * @type {?}
     * @private
     */
    DateTimeAdapter.prototype.locale;
    /**
     * A stream that emits when the locale changes.
     * @type {?}
     * @protected
     */
    DateTimeAdapter.prototype._localeChanges;
    /**
     * total milliseconds in a day.
     * @type {?}
     * @protected
     */
    DateTimeAdapter.prototype.millisecondsInDay;
    /**
     * total milliseconds in a minute.
     * @type {?}
     * @protected
     */
    DateTimeAdapter.prototype.milliseondsInMinute;
    /**
     * Get the year of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getYear = function (date) { };
    /**
     * Get the month of the given date
     * 0 -- January
     * 11 -- December
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getMonth = function (date) { };
    /**
     * Get the day of the week of the given date
     * 0 -- Sunday
     * 6 -- Saturday
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getDay = function (date) { };
    /**
     * Get the day num of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getDate = function (date) { };
    /**
     * Get the hours of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getHours = function (date) { };
    /**
     * Get the minutes of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getMinutes = function (date) { };
    /**
     * Get the seconds of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getSeconds = function (date) { };
    /**
     * Get the milliseconds timestamp of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getTime = function (date) { };
    /**
     * Gets the number of days in the month of the given date.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getNumDaysInMonth = function (date) { };
    /**
     * Get the number of calendar days between the given dates.
     * If dateLeft is before dateRight, it would return positive value
     * If dateLeft is after dateRight, it would return negative value
     * @abstract
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    DateTimeAdapter.prototype.differenceInCalendarDays = function (dateLeft, dateRight) { };
    /**
     * Gets the name for the year of the given date.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getYearName = function (date) { };
    /**
     * Get a list of month names
     * @abstract
     * @param {?} style
     * @return {?}
     */
    DateTimeAdapter.prototype.getMonthNames = function (style) { };
    /**
     * Get a list of week names
     * @abstract
     * @param {?} style
     * @return {?}
     */
    DateTimeAdapter.prototype.getDayOfWeekNames = function (style) { };
    /**
     * Gets a list of names for the dates of the month.
     * @abstract
     * @return {?}
     */
    DateTimeAdapter.prototype.getDateNames = function () { };
    /**
     * Return a Date object as a string, using the ISO standard
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.toIso8601 = function (date) { };
    /**
     * Check if the give dates are equal
     * @abstract
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    DateTimeAdapter.prototype.isEqual = function (dateLeft, dateRight) { };
    /**
     * Check if the give dates are the same day
     * @abstract
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    DateTimeAdapter.prototype.isSameDay = function (dateLeft, dateRight) { };
    /**
     * Checks whether the given date is valid.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.isValid = function (date) { };
    /**
     * Checks whether the given date is valid.
     * @abstract
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    DateTimeAdapter.prototype.isValidFormat = function (value, parseFormat) { };
    /**
     * Gets date instance that is not valid.
     * @abstract
     * @return {?}
     */
    DateTimeAdapter.prototype.invalid = function () { };
    /**
     * Checks whether the given object is considered a date instance by this DateTimeAdapter.
     * @abstract
     * @param {?} obj
     * @return {?}
     */
    DateTimeAdapter.prototype.isDateInstance = function (obj) { };
    /**
     * Add the specified number of years to the given date
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.addCalendarYears = function (date, amount) { };
    /**
     * Add the specified number of months to the given date
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.addCalendarMonths = function (date, amount) { };
    /**
     * Add the specified number of days to the given date
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.addCalendarDays = function (date, amount) { };
    /**
     * Set the hours to the given date.
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.setHours = function (date, amount) { };
    /**
     * Set the minutes to the given date.
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.setMinutes = function (date, amount) { };
    /**
     * Set the seconds to the given date.
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.setSeconds = function (date, amount) { };
    /**
     * Creates a date with the given year, month, date, hour, minute and second. Does not allow over/under-flow of the
     * month and date.
     * @abstract
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.createDate = function (year, month, date) { };
    /**
     * @abstract
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    DateTimeAdapter.prototype.createDate = function (year, month, date, hours, minutes, seconds) { };
    /**
     * Clone the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.clone = function (date) { };
    /**
     * Get a new moment
     * @abstract
     * @return {?}
     */
    DateTimeAdapter.prototype.now = function () { };
    /**
     * Formats a date as a string according to the given format.
     * @abstract
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    DateTimeAdapter.prototype.format = function (date, displayFormat) { };
    /**
     * Parse a user-provided value to a Date Object
     * @abstract
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    DateTimeAdapter.prototype.parse = function (value, parseFormat) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBR2xFLE1BQU0sS0FBTyxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FDbEQsc0JBQXNCLEVBQ3RCO0lBQ0ksVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLDRCQUE0QjtDQUN4QyxDQUNKOzs7OztBQUdELE1BQU0sVUFBVSw0QkFBNEI7SUFDeEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0IsQ0FBQzs7Ozs7QUFHRCxNQUFNLEtBQU8sNkJBQTZCLEdBQUc7SUFDekMsT0FBTyxFQUFFLG9CQUFvQjtJQUM3QixXQUFXLEVBQUUsU0FBUztDQUN6Qjs7Ozs7QUFFRDs7Ozs7SUFBQTs7OztRQUtjLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQzs7OztRQU05QixzQkFBaUIsR0FBRyxRQUFRLENBQUM7Ozs7UUFHN0Isd0JBQW1CLEdBQUcsS0FBSyxDQUFDO0lBa1JuRCxDQUFDO0lBMVJHLHNCQUFJLDBDQUFhOzs7O1FBQWpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBdUxEOzs7OztPQUtHOzs7Ozs7Ozs7O0lBQ0gsaUNBQU87Ozs7Ozs7OztJQUFQLFVBQVEsS0FBUSxFQUFFLE1BQVM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FB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Ozs7O0lBT2xDLHlEQUFtQzs7Ozs7Ozs7O0lBT25DLHVEQUFpQzs7Ozs7OztJQUtqQyx3REFBa0M7Ozs7Ozs7SUFLbEMseURBQW1DOzs7Ozs7O0lBS25DLDJEQUFxQzs7Ozs7OztJQUtyQywyREFBcUM7Ozs7Ozs7SUFLckMsd0RBQWtDOzs7Ozs7O0lBS2xDLGtFQUE0Qzs7Ozs7Ozs7OztJQU81Qyx3RkFBcUU7Ozs7Ozs7SUFLckUsNERBQXNDOzs7Ozs7O0lBS3RDLCtEQUFxRTs7Ozs7OztJQUtyRSxtRUFBeUU7Ozs7OztJQUt6RSx5REFBa0M7Ozs7Ozs7SUFLbEMsMERBQW9DOzs7Ozs7OztJQUtwQyx1RUFBcUQ7Ozs7Ozs7O0lBS3JELHlFQUF1RDs7Ozs7OztJQUt2RCx3REFBbUM7Ozs7Ozs7O0lBS25DLDRFQUFpRTs7Ozs7O0lBS2pFLG9EQUFzQjs7Ozs7OztJQUt0Qiw4REFBMkM7Ozs7Ozs7O0lBSzNDLHlFQUFzRDs7Ozs7Ozs7SUFLdEQsMEVBQXVEOzs7Ozs7OztJQUt2RCx3RUFBcUQ7Ozs7Ozs7O0lBS3JELGlFQUE4Qzs7Ozs7Ozs7SUFLOUMsbUVBQWdEOzs7Ozs7OztJQUtoRCxtRUFBZ0Q7Ozs7Ozs7Ozs7SUFNaEQsd0VBQWtFOzs7Ozs7Ozs7OztJQUNsRSxpR0FPSzs7Ozs7OztJQUtMLHNEQUEyQjs7Ozs7O0lBSzNCLGdEQUFrQjs7Ozs7Ozs7SUFLbEIsc0VBQXFEOzs7Ozs7OztJQUtyRCxvRUFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1hZGFwdGVyLmNsYXNzXG4gKi9cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGluamVjdCwgSW5qZWN0aW9uVG9rZW4sIExPQ0FMRV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogSW5qZWN0aW9uVG9rZW4gZm9yIGRhdGUgdGltZSBwaWNrZXIgdGhhdCBjYW4gYmUgdXNlZCB0byBvdmVycmlkZSBkZWZhdWx0IGxvY2FsZSBjb2RlLiAqL1xuZXhwb3J0IGNvbnN0IE9XTF9EQVRFX1RJTUVfTE9DQUxFID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oXG4gICAgJ09XTF9EQVRFX1RJTUVfTE9DQUxFJyxcbiAgICB7XG4gICAgICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICAgICAgZmFjdG9yeTogT1dMX0RBVEVfVElNRV9MT0NBTEVfRkFDVE9SWVxuICAgIH1cbik7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gT1dMX0RBVEVfVElNRV9MT0NBTEVfRkFDVE9SWSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBpbmplY3QoTE9DQUxFX0lEKTtcbn1cblxuLyoqIFByb3ZpZGVyIGZvciBPV0xfREFURV9USU1FX0xPQ0FMRSBpbmplY3Rpb24gdG9rZW4uICovXG5leHBvcnQgY29uc3QgT1dMX0RBVEVfVElNRV9MT0NBTEVfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogT1dMX0RBVEVfVElNRV9MT0NBTEUsXG4gICAgdXNlRXhpc3Rpbmc6IExPQ0FMRV9JRFxufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGVUaW1lQWRhcHRlcjxUPiB7XG4gICAgLyoqIFRoZSBsb2NhbGUgdG8gdXNlIGZvciBhbGwgZGF0ZXMuICovXG4gICAgcHJpdmF0ZSBsb2NhbGU6IHN0cmluZztcblxuICAgIC8qKiBBIHN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gdGhlIGxvY2FsZSBjaGFuZ2VzLiAqL1xuICAgIHByb3RlY3RlZCBfbG9jYWxlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBnZXQgbG9jYWxlQ2hhbmdlcygpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlQ2hhbmdlcztcbiAgICB9XG5cbiAgICAvKiogdG90YWwgbWlsbGlzZWNvbmRzIGluIGEgZGF5LiAqL1xuICAgIHByb3RlY3RlZCByZWFkb25seSBtaWxsaXNlY29uZHNJbkRheSA9IDg2NDAwMDAwO1xuXG4gICAgLyoqIHRvdGFsIG1pbGxpc2Vjb25kcyBpbiBhIG1pbnV0ZS4gKi9cbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWlsbGlzZW9uZHNJbk1pbnV0ZSA9IDYwMDAwO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0WWVhcihkYXRlOiBUKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqIDAgLS0gSmFudWFyeVxuICAgICAqIDExIC0tIERlY2VtYmVyXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TW9udGgoZGF0ZTogVCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGF5IG9mIHRoZSB3ZWVrIG9mIHRoZSBnaXZlbiBkYXRlXG4gICAgICogMCAtLSBTdW5kYXlcbiAgICAgKiA2IC0tIFNhdHVyZGF5XG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0RGF5KGRhdGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRheSBudW0gb2YgdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXRlKGRhdGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGhvdXJzIG9mIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0SG91cnMoZGF0ZTogVCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWludXRlcyBvZiB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldE1pbnV0ZXMoZGF0ZTogVCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgc2Vjb25kcyBvZiB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldFNlY29uZHMoZGF0ZTogVCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbWlsbGlzZWNvbmRzIHRpbWVzdGFtcCBvZiB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldFRpbWUoZGF0ZTogVCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBUKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5cyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAgICAgKiBJZiBkYXRlTGVmdCBpcyBiZWZvcmUgZGF0ZVJpZ2h0LCBpdCB3b3VsZCByZXR1cm4gcG9zaXRpdmUgdmFsdWVcbiAgICAgKiBJZiBkYXRlTGVmdCBpcyBhZnRlciBkYXRlUmlnaHQsIGl0IHdvdWxkIHJldHVybiBuZWdhdGl2ZSB2YWx1ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlTGVmdDogVCwgZGF0ZVJpZ2h0OiBUKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbmFtZSBmb3IgdGhlIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0WWVhck5hbWUoZGF0ZTogVCk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEdldCBhIGxpc3Qgb2YgbW9udGggbmFtZXNcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIEdldCBhIGxpc3Qgb2Ygd2VlayBuYW1lc1xuICAgICAqL1xuICAgIGFic3RyYWN0IGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBsaXN0IG9mIG5hbWVzIGZvciB0aGUgZGF0ZXMgb2YgdGhlIG1vbnRoLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldERhdGVOYW1lcygpOiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIERhdGUgb2JqZWN0IGFzIGEgc3RyaW5nLCB1c2luZyB0aGUgSVNPIHN0YW5kYXJkXG4gICAgICovXG4gICAgYWJzdHJhY3QgdG9Jc284NjAxKGRhdGU6IFQpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZ2l2ZSBkYXRlcyBhcmUgZXF1YWxcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpc0VxdWFsKGRhdGVMZWZ0OiBULCBkYXRlUmlnaHQ6IFQpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGdpdmUgZGF0ZXMgYXJlIHRoZSBzYW1lIGRheVxuICAgICAqL1xuICAgIGFic3RyYWN0IGlzU2FtZURheShkYXRlTGVmdDogVCwgZGF0ZVJpZ2h0OiBUKTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBkYXRlIGlzIHZhbGlkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGlzVmFsaWQoZGF0ZTogVCk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZSBpcyB2YWxpZC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpc1ZhbGlkRm9ybWF0KHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBzdHJpbmcpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBkYXRlIGluc3RhbmNlIHRoYXQgaXMgbm90IHZhbGlkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGludmFsaWQoKTogVDtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgY29uc2lkZXJlZCBhIGRhdGUgaW5zdGFuY2UgYnkgdGhpcyBEYXRlVGltZUFkYXB0ZXIuXG4gICAgICovXG4gICAgYWJzdHJhY3QgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHllYXJzIHRvIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbW9udGhzIHRvIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xuXG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRheXMgdG8gdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBhZGRDYWxlbmRhckRheXMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBob3VycyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRIb3VycyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG1pbnV0ZXMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0TWludXRlcyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0U2Vjb25kcyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZGF0ZSB3aXRoIHRoZSBnaXZlbiB5ZWFyLCBtb250aCwgZGF0ZSwgaG91ciwgbWludXRlIGFuZCBzZWNvbmQuIERvZXMgbm90IGFsbG93IG92ZXIvdW5kZXItZmxvdyBvZiB0aGVcbiAgICAgKiBtb250aCBhbmQgZGF0ZS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogVDtcbiAgICBhYnN0cmFjdCBjcmVhdGVEYXRlKFxuICAgICAgICB5ZWFyOiBudW1iZXIsXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXG4gICAgICAgIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlcixcbiAgICAgICAgbWludXRlczogbnVtYmVyLFxuICAgICAgICBzZWNvbmRzOiBudW1iZXJcbiAgICApOiBUO1xuXG4gICAgLyoqXG4gICAgICogQ2xvbmUgdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBjbG9uZShkYXRlOiBUKTogVDtcblxuICAgIC8qKlxuICAgICAqIEdldCBhIG5ldyBtb21lbnRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBub3coKTogVDtcblxuICAgIC8qKlxuICAgICAqIEZvcm1hdHMgYSBkYXRlIGFzIGEgc3RyaW5nIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gZm9ybWF0LlxuICAgICAqL1xuICAgIGFic3RyYWN0IGZvcm1hdChkYXRlOiBULCBkaXNwbGF5Rm9ybWF0OiBhbnkpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhIHVzZXItcHJvdmlkZWQgdmFsdWUgdG8gYSBEYXRlIE9iamVjdFxuICAgICAqL1xuICAgIGFic3RyYWN0IHBhcnNlKHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBhbnkpOiBUIHwgbnVsbDtcblxuICAgIC8qKlxuICAgICAqIENvbXBhcmUgdHdvIGdpdmVuIGRhdGVzXG4gICAgICogMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBhZnRlciB0aGUgc2Vjb25kLFxuICAgICAqIC0xIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kXG4gICAgICogMCBpZiBkYXRlcyBhcmUgZXF1YWwuXG4gICAgICovXG4gICAgY29tcGFyZShmaXJzdDogVCwgc2Vjb25kOiBUKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoZmlyc3QpIHx8ICF0aGlzLmlzVmFsaWQoc2Vjb25kKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0pTTmF0aXZlRGF0ZTogQ2Fubm90IGNvbXBhcmUgaW52YWxpZCBkYXRlcy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhdGVGaXJzdCA9IHRoaXMuY2xvbmUoZmlyc3QpO1xuICAgICAgICBjb25zdCBkYXRlU2Vjb25kID0gdGhpcy5jbG9uZShzZWNvbmQpO1xuXG4gICAgICAgIGNvbnN0IGRpZmYgPSB0aGlzLmdldFRpbWUoZGF0ZUZpcnN0KSAtIHRoaXMuZ2V0VGltZShkYXRlU2Vjb25kKTtcblxuICAgICAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChkaWZmID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gMCBpZiBkaWZmIGlzIDA7IHJldHVybiBOYU4gaWYgZGlmZiBpcyBOYU5cbiAgICAgICAgICAgIHJldHVybiBkaWZmO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdHdvIGdpdmVuIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSB5ZWFyXG4gICAgICogMSBpZiB0aGUgZmlyc3QgZGF0ZSdzIHllYXIgaXMgYWZ0ZXIgdGhlIHNlY29uZCxcbiAgICAgKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSdzIHllYXIgaXMgYmVmb3JlIHRoZSBzZWNvbmRcbiAgICAgKiAwIGlmIHR3byBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgeWVhclxuICAgICAqL1xuICAgIGNvbXBhcmVZZWFyKGZpcnN0OiBULCBzZWNvbmQ6IFQpOiBudW1iZXIge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChmaXJzdCkgfHwgIXRoaXMuaXNWYWxpZChzZWNvbmQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignSlNOYXRpdmVEYXRlOiBDYW5ub3QgY29tcGFyZSBpbnZhbGlkIGRhdGVzLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeWVhckxlZnQgPSB0aGlzLmdldFllYXIoZmlyc3QpO1xuICAgICAgICBjb25zdCB5ZWFyUmlnaHQgPSB0aGlzLmdldFllYXIoc2Vjb25kKTtcblxuICAgICAgICBjb25zdCBkaWZmID0geWVhckxlZnQgLSB5ZWFyUmlnaHQ7XG5cbiAgICAgICAgaWYgKGRpZmYgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBkZXNlcmlhbGl6ZSBhIHZhbHVlIHRvIGEgdmFsaWQgZGF0ZSBvYmplY3QuIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gcGFyc2luZyBpbiB0aGF0XG4gICAgICogZGVzZXJpYWxpemUgc2hvdWxkIG9ubHkgYWNjZXB0IG5vbi1hbWJpZ3VvdXMsIGxvY2FsZS1pbmRlcGVuZGVudCBmb3JtYXRzIChlLmcuIGEgSVNPIDg2MDFcbiAgICAgKiBzdHJpbmcpLiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdCBhbGxvdyBhbnkgZGVzZXJpYWxpemF0aW9uLCBpdCBzaW1wbHkgY2hlY2tzIHRoYXRcbiAgICAgKiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYWxyZWFkeSBhIHZhbGlkIGRhdGUgb2JqZWN0IG9yIG51bGwuIFRoZSBgPG1hdC1kYXRlcGlja2VyPmAgd2lsbCBjYWxsIHRoaXNcbiAgICAgKiBtZXRob2Qgb24gYWxsIG9mIGl0J3MgYEBJbnB1dCgpYCBwcm9wZXJ0aWVzIHRoYXQgYWNjZXB0IGRhdGVzLiBJdCBpcyB0aGVyZWZvcmUgcG9zc2libGUgdG9cbiAgICAgKiBzdXBwb3J0IHBhc3NpbmcgdmFsdWVzIGZyb20geW91ciBiYWNrZW5kIGRpcmVjdGx5IHRvIHRoZXNlIHByb3BlcnRpZXMgYnkgb3ZlcnJpZGluZyB0aGlzIG1ldGhvZFxuICAgICAqIHRvIGFsc28gZGVzZXJpYWxpemUgdGhlIGZvcm1hdCB1c2VkIGJ5IHlvdXIgYmFja2VuZC5cbiAgICAgKi9cbiAgICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogVCB8IG51bGwge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB2YWx1ZSA9PSBudWxsIHx8XG4gICAgICAgICAgICAodGhpcy5pc0RhdGVJbnN0YW5jZSh2YWx1ZSkgJiYgdGhpcy5pc1ZhbGlkKHZhbHVlKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbG9jYWxlIHVzZWQgZm9yIGFsbCBkYXRlcy5cbiAgICAgKi9cbiAgICBnZXRMb2NhbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBsb2NhbGUgdXNlZCBmb3IgYWxsIGRhdGVzLlxuICAgICAqL1xuICAgIHNldExvY2FsZShsb2NhbGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgICAgICAgdGhpcy5fbG9jYWxlQ2hhbmdlcy5uZXh0KGxvY2FsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xhbXAgdGhlIGdpdmVuIGRhdGUgYmV0d2VlbiBtaW4gYW5kIG1heCBkYXRlcy5cbiAgICAgKi9cbiAgICBjbGFtcERhdGUoZGF0ZTogVCwgbWluPzogVCB8IG51bGwsIG1heD86IFQgfCBudWxsKTogVCB7XG4gICAgICAgIGlmIChtaW4gJiYgdGhpcy5jb21wYXJlKGRhdGUsIG1pbikgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbWluO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXggJiYgdGhpcy5jb21wYXJlKGRhdGUsIG1heCkgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbn1cbiJdfQ==