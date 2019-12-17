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
export const OWL_DATE_TIME_LOCALE = new InjectionToken('OWL_DATE_TIME_LOCALE', {
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
export const OWL_DATE_TIME_LOCALE_PROVIDER = {
    provide: OWL_DATE_TIME_LOCALE,
    useExisting: LOCALE_ID
};
/**
 * @abstract
 * @template T
 */
export class DateTimeAdapter {
    constructor() {
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
    /**
     * @return {?}
     */
    get localeChanges() {
        return this._localeChanges;
    }
    /**
     * Compare two given dates
     * 1 if the first date is after the second,
     * -1 if the first date is before the second
     * 0 if dates are equal.
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    compare(first, second) {
        if (!this.isValid(first) || !this.isValid(second)) {
            throw Error('JSNativeDate: Cannot compare invalid dates.');
        }
        /** @type {?} */
        const dateFirst = this.clone(first);
        /** @type {?} */
        const dateSecond = this.clone(second);
        /** @type {?} */
        const diff = this.getTime(dateFirst) - this.getTime(dateSecond);
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
    }
    /**
     * Check if two given dates are in the same year
     * 1 if the first date's year is after the second,
     * -1 if the first date's year is before the second
     * 0 if two given dates are in the same year
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    compareYear(first, second) {
        if (!this.isValid(first) || !this.isValid(second)) {
            throw Error('JSNativeDate: Cannot compare invalid dates.');
        }
        /** @type {?} */
        const yearLeft = this.getYear(first);
        /** @type {?} */
        const yearRight = this.getYear(second);
        /** @type {?} */
        const diff = yearLeft - yearRight;
        if (diff < 0) {
            return -1;
        }
        else if (diff > 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
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
    deserialize(value) {
        if (value == null ||
            (this.isDateInstance(value) && this.isValid(value))) {
            return value;
        }
        return this.invalid();
    }
    /**
     * Get the locale used for all dates.
     * @return {?}
     */
    getLocale() {
        return this.locale;
    }
    /**
     * Sets the locale used for all dates.
     * @param {?} locale
     * @return {?}
     */
    setLocale(locale) {
        this.locale = locale;
        this._localeChanges.next(locale);
    }
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    clampDate(date, min, max) {
        if (min && this.compare(date, min) < 0) {
            return min;
        }
        if (max && this.compare(date, max) > 0) {
            return max;
        }
        return date;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBR2xFLE1BQU0sT0FBTyxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FDbEQsc0JBQXNCLEVBQ3RCO0lBQ0ksVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLDRCQUE0QjtDQUN4QyxDQUNKOzs7OztBQUdELE1BQU0sVUFBVSw0QkFBNEI7SUFDeEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0IsQ0FBQzs7Ozs7QUFHRCxNQUFNLE9BQU8sNkJBQTZCLEdBQUc7SUFDekMsT0FBTyxFQUFFLG9CQUFvQjtJQUM3QixXQUFXLEVBQUUsU0FBUztDQUN6Qjs7Ozs7QUFFRCxNQUFNLE9BQWdCLGVBQWU7SUFBckM7Ozs7UUFLYyxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7Ozs7UUFNOUIsc0JBQWlCLEdBQUcsUUFBUSxDQUFDOzs7O1FBRzdCLHdCQUFtQixHQUFHLEtBQUssQ0FBQztJQWtSbkQsQ0FBQzs7OztJQTFSRyxJQUFJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQzs7Ozs7Ozs7OztJQTZMRCxPQUFPLENBQUMsS0FBUSxFQUFFLE1BQVM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9DLE1B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QUFzQzs7Ozs7OztJQUt0QywrREFBcUU7Ozs7Ozs7SUFLckUsbUVBQXlFOzs7Ozs7SUFLekUseURBQWtDOzs7Ozs7O0lBS2xDLDBEQUFvQzs7Ozs7Ozs7SUFLcEMsdUVBQXFEOzs7Ozs7OztJQUtyRCx5RUFBdUQ7Ozs7Ozs7SUFLdkQsd0RBQW1DOzs7Ozs7OztJQUtuQyw0RUFBOEQ7Ozs7OztJQUs5RCxvREFBc0I7Ozs7Ozs7SUFLdEIsOERBQTJDOzs7Ozs7OztJQUszQyx5RUFBc0Q7Ozs7Ozs7O0lBS3RELDBFQUF1RDs7Ozs7Ozs7SUFLdkQsd0VBQXFEOzs7Ozs7OztJQUtyRCxpRUFBOEM7Ozs7Ozs7O0lBSzlDLG1FQUFnRDs7Ozs7Ozs7SUFLaEQsbUVBQWdEOzs7Ozs7Ozs7O0lBTWhELHdFQUFrRTs7Ozs7Ozs7Ozs7SUFDbEUsaUdBT0s7Ozs7Ozs7SUFLTCxzREFBMkI7Ozs7OztJQUszQixnREFBa0I7Ozs7Ozs7O0lBS2xCLHNFQUFxRDs7Ozs7Ozs7SUFLckQsb0VBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXRpbWUtYWRhcHRlci5jbGFzc1xuICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBpbmplY3QsIEluamVjdGlvblRva2VuLCBMT0NBTEVfSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIEluamVjdGlvblRva2VuIGZvciBkYXRlIHRpbWUgcGlja2VyIHRoYXQgY2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgZGVmYXVsdCBsb2NhbGUgY29kZS4gKi9cbmV4cG9ydCBjb25zdCBPV0xfREFURV9USU1FX0xPQ0FMRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KFxuICAgICdPV0xfREFURV9USU1FX0xPQ0FMRScsXG4gICAge1xuICAgICAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgICAgIGZhY3Rvcnk6IE9XTF9EQVRFX1RJTUVfTE9DQUxFX0ZBQ1RPUllcbiAgICB9XG4pO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIE9XTF9EQVRFX1RJTUVfTE9DQUxFX0ZBQ1RPUlkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaW5qZWN0KExPQ0FMRV9JRCk7XG59XG5cbi8qKiBQcm92aWRlciBmb3IgT1dMX0RBVEVfVElNRV9MT0NBTEUgaW5qZWN0aW9uIHRva2VuLiAqL1xuZXhwb3J0IGNvbnN0IE9XTF9EQVRFX1RJTUVfTE9DQUxFX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE9XTF9EQVRFX1RJTUVfTE9DQUxFLFxuICAgIHVzZUV4aXN0aW5nOiBMT0NBTEVfSURcbn07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRlVGltZUFkYXB0ZXI8VD4ge1xuICAgIC8qKiBUaGUgbG9jYWxlIHRvIHVzZSBmb3IgYWxsIGRhdGVzLiAqL1xuICAgIHByaXZhdGUgbG9jYWxlOiBzdHJpbmc7XG5cbiAgICAvKiogQSBzdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHRoZSBsb2NhbGUgY2hhbmdlcy4gKi9cbiAgICBwcm90ZWN0ZWQgX2xvY2FsZUNoYW5nZXMgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgZ2V0IGxvY2FsZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZUNoYW5nZXM7XG4gICAgfVxuXG4gICAgLyoqIHRvdGFsIG1pbGxpc2Vjb25kcyBpbiBhIGRheS4gKi9cbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWlsbGlzZWNvbmRzSW5EYXkgPSA4NjQwMDAwMDtcblxuICAgIC8qKiB0b3RhbCBtaWxsaXNlY29uZHMgaW4gYSBtaW51dGUuICovXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IG1pbGxpc2VvbmRzSW5NaW51dGUgPSA2MDAwMDtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldFllYXIoZGF0ZTogVCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbW9udGggb2YgdGhlIGdpdmVuIGRhdGVcbiAgICAgKiAwIC0tIEphbnVhcnlcbiAgICAgKiAxMSAtLSBEZWNlbWJlclxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldE1vbnRoKGRhdGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRheSBvZiB0aGUgd2VlayBvZiB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqIDAgLS0gU3VuZGF5XG4gICAgICogNiAtLSBTYXR1cmRheVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldERheShkYXRlOiBUKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkYXkgbnVtIG9mIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0RGF0ZShkYXRlOiBUKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBob3VycyBvZiB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldEhvdXJzKGRhdGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1pbnV0ZXMgb2YgdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRNaW51dGVzKGRhdGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNlY29uZHMgb2YgdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRTZWNvbmRzKGRhdGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgb2YgdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRUaW1lKGRhdGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGggb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogVCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gICAgICogSWYgZGF0ZUxlZnQgaXMgYmVmb3JlIGRhdGVSaWdodCwgaXQgd291bGQgcmV0dXJuIHBvc2l0aXZlIHZhbHVlXG4gICAgICogSWYgZGF0ZUxlZnQgaXMgYWZ0ZXIgZGF0ZVJpZ2h0LCBpdCB3b3VsZCByZXR1cm4gbmVnYXRpdmUgdmFsdWVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZUxlZnQ6IFQsIGRhdGVSaWdodDogVCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG5hbWUgZm9yIHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldFllYXJOYW1lKGRhdGU6IFQpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIG1vbnRoIG5hbWVzXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIHdlZWsgbmFtZXNcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbGlzdCBvZiBuYW1lcyBmb3IgdGhlIGRhdGVzIG9mIHRoZSBtb250aC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXRlTmFtZXMoKTogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBEYXRlIG9iamVjdCBhcyBhIHN0cmluZywgdXNpbmcgdGhlIElTTyBzdGFuZGFyZFxuICAgICAqL1xuICAgIGFic3RyYWN0IHRvSXNvODYwMShkYXRlOiBUKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGdpdmUgZGF0ZXMgYXJlIGVxdWFsXG4gICAgICovXG4gICAgYWJzdHJhY3QgaXNFcXVhbChkYXRlTGVmdDogVCwgZGF0ZVJpZ2h0OiBUKTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlIGRhdGVzIGFyZSB0aGUgc2FtZSBkYXlcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpc1NhbWVEYXkoZGF0ZUxlZnQ6IFQsIGRhdGVSaWdodDogVCk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZSBpcyB2YWxpZC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IFQpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGRhdGUgaXMgdmFsaWQuXG4gICAgICovXG4gICAgYWJzdHJhY3QgaXNWYWxpZEZvcm1hdCh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogYW55KTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgZGF0ZSBpbnN0YW5jZSB0aGF0IGlzIG5vdCB2YWxpZC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpbnZhbGlkKCk6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGNvbnNpZGVyZWQgYSBkYXRlIGluc3RhbmNlIGJ5IHRoaXMgRGF0ZVRpbWVBZGFwdGVyLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB5ZWFycyB0byB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xuXG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1vbnRocyB0byB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IFQsIGFtb3VudDogbnVtYmVyKTogVDtcblxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkYXlzIHRvIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IFQsIGFtb3VudDogbnVtYmVyKTogVDtcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgaG91cnMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0SG91cnMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBtaW51dGVzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldE1pbnV0ZXMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldFNlY29uZHMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGRhdGUgd2l0aCB0aGUgZ2l2ZW4geWVhciwgbW9udGgsIGRhdGUsIGhvdXIsIG1pbnV0ZSBhbmQgc2Vjb25kLiBEb2VzIG5vdCBhbGxvdyBvdmVyL3VuZGVyLWZsb3cgb2YgdGhlXG4gICAgICogbW9udGggYW5kIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3QgY3JlYXRlRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlcik6IFQ7XG4gICAgYWJzdHJhY3QgY3JlYXRlRGF0ZShcbiAgICAgICAgeWVhcjogbnVtYmVyLFxuICAgICAgICBtb250aDogbnVtYmVyLFxuICAgICAgICBkYXRlOiBudW1iZXIsXG4gICAgICAgIGhvdXJzOiBudW1iZXIsXG4gICAgICAgIG1pbnV0ZXM6IG51bWJlcixcbiAgICAgICAgc2Vjb25kczogbnVtYmVyXG4gICAgKTogVDtcblxuICAgIC8qKlxuICAgICAqIENsb25lIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3QgY2xvbmUoZGF0ZTogVCk6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBuZXcgbW9tZW50XG4gICAgICovXG4gICAgYWJzdHJhY3Qgbm93KCk6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXRzIGEgZGF0ZSBhcyBhIHN0cmluZyBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGZvcm1hdC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBmb3JtYXQoZGF0ZTogVCwgZGlzcGxheUZvcm1hdDogYW55KTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUGFyc2UgYSB1c2VyLXByb3ZpZGVkIHZhbHVlIHRvIGEgRGF0ZSBPYmplY3RcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogYW55KTogVCB8IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBDb21wYXJlIHR3byBnaXZlbiBkYXRlc1xuICAgICAqIDEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYWZ0ZXIgdGhlIHNlY29uZCxcbiAgICAgKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZFxuICAgICAqIDAgaWYgZGF0ZXMgYXJlIGVxdWFsLlxuICAgICAqL1xuICAgIGNvbXBhcmUoZmlyc3Q6IFQsIHNlY29uZDogVCk6IG51bWJlciB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKGZpcnN0KSB8fCAhdGhpcy5pc1ZhbGlkKHNlY29uZCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdKU05hdGl2ZURhdGU6IENhbm5vdCBjb21wYXJlIGludmFsaWQgZGF0ZXMuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRlRmlyc3QgPSB0aGlzLmNsb25lKGZpcnN0KTtcbiAgICAgICAgY29uc3QgZGF0ZVNlY29uZCA9IHRoaXMuY2xvbmUoc2Vjb25kKTtcblxuICAgICAgICBjb25zdCBkaWZmID0gdGhpcy5nZXRUaW1lKGRhdGVGaXJzdCkgLSB0aGlzLmdldFRpbWUoZGF0ZVNlY29uZCk7XG5cbiAgICAgICAgaWYgKGRpZmYgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmV0dXJuIDAgaWYgZGlmZiBpcyAwOyByZXR1cm4gTmFOIGlmIGRpZmYgaXMgTmFOXG4gICAgICAgICAgICByZXR1cm4gZGlmZjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHR3byBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgeWVhclxuICAgICAqIDEgaWYgdGhlIGZpcnN0IGRhdGUncyB5ZWFyIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gICAgICogLTEgaWYgdGhlIGZpcnN0IGRhdGUncyB5ZWFyIGlzIGJlZm9yZSB0aGUgc2Vjb25kXG4gICAgICogMCBpZiB0d28gZ2l2ZW4gZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHllYXJcbiAgICAgKi9cbiAgICBjb21wYXJlWWVhcihmaXJzdDogVCwgc2Vjb25kOiBUKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoZmlyc3QpIHx8ICF0aGlzLmlzVmFsaWQoc2Vjb25kKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0pTTmF0aXZlRGF0ZTogQ2Fubm90IGNvbXBhcmUgaW52YWxpZCBkYXRlcy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHllYXJMZWZ0ID0gdGhpcy5nZXRZZWFyKGZpcnN0KTtcbiAgICAgICAgY29uc3QgeWVhclJpZ2h0ID0gdGhpcy5nZXRZZWFyKHNlY29uZCk7XG5cbiAgICAgICAgY29uc3QgZGlmZiA9IHllYXJMZWZ0IC0geWVhclJpZ2h0O1xuXG4gICAgICAgIGlmIChkaWZmIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgdG8gZGVzZXJpYWxpemUgYSB2YWx1ZSB0byBhIHZhbGlkIGRhdGUgb2JqZWN0LiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHBhcnNpbmcgaW4gdGhhdFxuICAgICAqIGRlc2VyaWFsaXplIHNob3VsZCBvbmx5IGFjY2VwdCBub24tYW1iaWd1b3VzLCBsb2NhbGUtaW5kZXBlbmRlbnQgZm9ybWF0cyAoZS5nLiBhIElTTyA4NjAxXG4gICAgICogc3RyaW5nKS4gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gZG9lcyBub3QgYWxsb3cgYW55IGRlc2VyaWFsaXphdGlvbiwgaXQgc2ltcGx5IGNoZWNrcyB0aGF0XG4gICAgICogdGhlIGdpdmVuIHZhbHVlIGlzIGFscmVhZHkgYSB2YWxpZCBkYXRlIG9iamVjdCBvciBudWxsLiBUaGUgYDxtYXQtZGF0ZXBpY2tlcj5gIHdpbGwgY2FsbCB0aGlzXG4gICAgICogbWV0aG9kIG9uIGFsbCBvZiBpdCdzIGBASW5wdXQoKWAgcHJvcGVydGllcyB0aGF0IGFjY2VwdCBkYXRlcy4gSXQgaXMgdGhlcmVmb3JlIHBvc3NpYmxlIHRvXG4gICAgICogc3VwcG9ydCBwYXNzaW5nIHZhbHVlcyBmcm9tIHlvdXIgYmFja2VuZCBkaXJlY3RseSB0byB0aGVzZSBwcm9wZXJ0aWVzIGJ5IG92ZXJyaWRpbmcgdGhpcyBtZXRob2RcbiAgICAgKiB0byBhbHNvIGRlc2VyaWFsaXplIHRoZSBmb3JtYXQgdXNlZCBieSB5b3VyIGJhY2tlbmQuXG4gICAgICovXG4gICAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IFQgfCBudWxsIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdmFsdWUgPT0gbnVsbCB8fFxuICAgICAgICAgICAgKHRoaXMuaXNEYXRlSW5zdGFuY2UodmFsdWUpICYmIHRoaXMuaXNWYWxpZCh2YWx1ZSkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmludmFsaWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGxvY2FsZSB1c2VkIGZvciBhbGwgZGF0ZXMuXG4gICAgICovXG4gICAgZ2V0TG9jYWxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgbG9jYWxlIHVzZWQgZm9yIGFsbCBkYXRlcy5cbiAgICAgKi9cbiAgICBzZXRMb2NhbGUobG9jYWxlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XG4gICAgICAgIHRoaXMuX2xvY2FsZUNoYW5nZXMubmV4dChsb2NhbGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsYW1wIHRoZSBnaXZlbiBkYXRlIGJldHdlZW4gbWluIGFuZCBtYXggZGF0ZXMuXG4gICAgICovXG4gICAgY2xhbXBEYXRlKGRhdGU6IFQsIG1pbj86IFQgfCBudWxsLCBtYXg/OiBUIHwgbnVsbCk6IFQge1xuICAgICAgICBpZiAobWluICYmIHRoaXMuY29tcGFyZShkYXRlLCBtaW4pIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4ICYmIHRoaXMuY29tcGFyZShkYXRlLCBtYXgpID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG1heDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG59XG4iXX0=