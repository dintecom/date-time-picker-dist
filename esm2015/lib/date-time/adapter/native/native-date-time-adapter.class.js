/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * native-date-time-adapter.class
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE } from '../date-time-adapter.class';
/**
 * The default month names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_MONTH_NAMES = {
    long: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    short: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
/**
 * The default day of the week names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_DAY_OF_WEEK_NAMES = {
    long: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
const ɵ0 = /**
 * @param {?} i
 * @return {?}
 */
i => String(i + 1);
/**
 * The default date names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_DATE_NAMES = range(31, (ɵ0));
/**
 * Whether the browser supports the Intl API.
 * @type {?}
 */
const SUPPORTS_INTL_API = typeof Intl !== 'undefined';
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 * @type {?}
 */
const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:[+\-]\d{2}:\d{2}))?)?$/;
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
export class NativeDateTimeAdapter extends DateTimeAdapter {
    /**
     * @param {?} owlDateTimeLocale
     * @param {?} platform
     */
    constructor(owlDateTimeLocale, platform) {
        super();
        this.owlDateTimeLocale = owlDateTimeLocale;
        super.setLocale(owlDateTimeLocale);
        // IE does its own time zone correction, so we disable this on IE.
        this.useUtcForDisplay = !platform.TRIDENT;
        this._clampDate = platform.TRIDENT || platform.EDGE;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return date.getFullYear();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return date.getMonth();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDay(date) {
        return date.getDay();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return date.getDate();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getHours(date) {
        return date.getHours();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMinutes(date) {
        return date.getMinutes();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getSeconds(date) {
        return date.getSeconds();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getTime(date) {
        return date.getTime();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        /** @type {?} */
        const lastDateOfMonth = this.createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0);
        return this.getDate(lastDateOfMonth);
    }
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    differenceInCalendarDays(dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            /** @type {?} */
            const dateLeftStartOfDay = this.createDate(this.getYear(dateLeft), this.getMonth(dateLeft), this.getDate(dateLeft));
            /** @type {?} */
            const dateRightStartOfDay = this.createDate(this.getYear(dateRight), this.getMonth(dateRight), this.getDate(dateRight));
            /** @type {?} */
            const timeStampLeft = this.getTime(dateLeftStartOfDay) -
                dateLeftStartOfDay.getTimezoneOffset() *
                    this.milliseondsInMinute;
            /** @type {?} */
            const timeStampRight = this.getTime(dateRightStartOfDay) -
                dateRightStartOfDay.getTimezoneOffset() *
                    this.milliseondsInMinute;
            return Math.round((timeStampLeft - timeStampRight) / this.millisecondsInDay);
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYearName(date) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.getLocale(), {
                year: 'numeric',
                timeZone: 'utc'
            });
            return this.stripDirectionalityCharacters(this._format(dtf, date));
        }
        return String(this.getYear(date));
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getMonthNames(style) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.getLocale(), {
                month: style,
                timeZone: 'utc'
            });
            return range(12, (/**
             * @param {?} i
             * @return {?}
             */
            i => this.stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1)))));
        }
        return DEFAULT_MONTH_NAMES[style];
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getDayOfWeekNames(style) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.getLocale(), {
                weekday: style,
                timeZone: 'utc'
            });
            return range(7, (/**
             * @param {?} i
             * @return {?}
             */
            i => this.stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1)))));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    }
    /**
     * @return {?}
     */
    getDateNames() {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.getLocale(), {
                day: 'numeric',
                timeZone: 'utc'
            });
            return range(31, (/**
             * @param {?} i
             * @return {?}
             */
            i => this.stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1)))));
        }
        return DEFAULT_DATE_NAMES;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toIso8601(date) {
        return date.toISOString();
    }
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    isEqual(dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            return dateLeft.getTime() === dateRight.getTime();
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    isSameDay(dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            /** @type {?} */
            const dateLeftStartOfDay = this.clone(dateLeft);
            /** @type {?} */
            const dateRightStartOfDay = this.clone(dateRight);
            dateLeftStartOfDay.setHours(0, 0, 0, 0);
            dateRightStartOfDay.setHours(0, 0, 0, 0);
            return (dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime());
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return date && !isNaN(date.getTime());
    }
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    isValidFormat(value, parseFormat) {
        return !!Date.parse(value);
    }
    /**
     * @return {?}
     */
    invalid() {
        return new Date(NaN);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isDateInstance(obj) {
        return obj instanceof Date;
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    addCalendarYears(date, amount) {
        return this.addCalendarMonths(date, amount * 12);
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    addCalendarMonths(date, amount) {
        /** @type {?} */
        const result = this.clone(date);
        amount = Number(amount);
        /** @type {?} */
        const desiredMonth = result.getMonth() + amount;
        /** @type {?} */
        const dateWithDesiredMonth = new Date(0);
        dateWithDesiredMonth.setFullYear(result.getFullYear(), desiredMonth, 1);
        dateWithDesiredMonth.setHours(0, 0, 0, 0);
        /** @type {?} */
        const daysInMonth = this.getNumDaysInMonth(dateWithDesiredMonth);
        // Set the last day of the new month
        // if the original date was the last day of the longer month
        result.setMonth(desiredMonth, Math.min(daysInMonth, result.getDate()));
        return result;
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    addCalendarDays(date, amount) {
        /** @type {?} */
        const result = this.clone(date);
        amount = Number(amount);
        result.setDate(result.getDate() + amount);
        return result;
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    setHours(date, amount) {
        /** @type {?} */
        const result = this.clone(date);
        result.setHours(amount);
        return result;
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    setMinutes(date, amount) {
        /** @type {?} */
        const result = this.clone(date);
        result.setMinutes(amount);
        return result;
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    setSeconds(date, amount) {
        /** @type {?} */
        const result = this.clone(date);
        result.setSeconds(amount);
        return result;
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @param {?=} seconds
     * @return {?}
     */
    createDate(year, month, date, hours = 0, minutes = 0, seconds = 0) {
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        if (hours < 0 || hours > 23) {
            throw Error(`Invalid hours "${hours}". Hours has to be between 0 and 23.`);
        }
        if (minutes < 0 || minutes > 59) {
            throw Error(`Invalid minutes "${minutes}". Minutes has to between 0 and 59.`);
        }
        if (seconds < 0 || seconds > 59) {
            throw Error(`Invalid seconds "${seconds}". Seconds has to be between 0 and 59.`);
        }
        /** @type {?} */
        const result = this.createDateWithOverflow(year, month, date, hours, minutes, seconds);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        // For example, createDate(2017, 1, 31) would try to create a date 2017/02/31 which is invalid
        if (result.getMonth() !== month) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
    }
    /**
     * @return {?}
     */
    now() {
        return new Date();
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    format(date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('JSNativeDate: Cannot format invalid date.');
        }
        if (SUPPORTS_INTL_API) {
            if (this._clampDate &&
                (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
                date = this.clone(date);
                date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
            }
            displayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' });
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.getLocale(), displayFormat);
            return this.stripDirectionalityCharacters(this._format(dtf, date));
        }
        return this.stripDirectionalityCharacters(date.toDateString());
    }
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    parse(value, parseFormat) {
        // There is no way using the native JS Date to set the parse format or locale
        if (typeof value === 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    }
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    deserialize(value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                /** @type {?} */
                const date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return super.deserialize(value);
    }
    /**
     * Creates a date but allows the month and date to overflow.
     * @private
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @param {?=} seconds
     * @return {?}
     */
    createDateWithOverflow(year, month, date, hours = 0, minutes = 0, seconds = 0) {
        /** @type {?} */
        const result = new Date(year, month, date, hours, minutes, seconds);
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    }
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @private
     * @param {?} str
     * @return {?}
     */
    stripDirectionalityCharacters(str) {
        return str.replace(/[\u200e\u200f]/g, '');
    }
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     * @private
     * @param {?} dtf
     * @param {?} date
     * @return {?}
     */
    _format(dtf, date) {
        /** @type {?} */
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        return dtf.format(d);
    }
}
NativeDateTimeAdapter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NativeDateTimeAdapter.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_LOCALE,] }] },
    { type: Platform }
];
if (false) {
    /**
     * Whether to clamp the date between 1 and 9999 to avoid IE and Edge errors.
     * @type {?}
     * @private
     */
    NativeDateTimeAdapter.prototype._clampDate;
    /**
     * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
     * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
     * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
     * will produce `'8/13/1800'`.
     * @type {?}
     */
    NativeDateTimeAdapter.prototype.useUtcForDisplay;
    /**
     * @type {?}
     * @private
     */
    NativeDateTimeAdapter.prototype.owlDateTimeLocale;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2FkYXB0ZXIvbmF0aXZlL25hdGl2ZS1kYXRlLXRpbWUtYWRhcHRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsZUFBZSxFQUNmLG9CQUFvQixFQUN2QixNQUFNLDRCQUE0QixDQUFDOzs7OztNQUc5QixtQkFBbUIsR0FBRztJQUN4QixJQUFJLEVBQUU7UUFDRixTQUFTO1FBQ1QsVUFBVTtRQUNWLE9BQU87UUFDUCxPQUFPO1FBQ1AsS0FBSztRQUNMLE1BQU07UUFDTixNQUFNO1FBQ04sUUFBUTtRQUNSLFdBQVc7UUFDWCxTQUFTO1FBQ1QsVUFBVTtRQUNWLFVBQVU7S0FDYjtJQUNELEtBQUssRUFBRTtRQUNILEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztLQUNSO0lBQ0QsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Q0FDdkU7Ozs7O01BR0sseUJBQXlCLEdBQUc7SUFDOUIsSUFBSSxFQUFFO1FBQ0YsUUFBUTtRQUNSLFFBQVE7UUFDUixTQUFTO1FBQ1QsV0FBVztRQUNYLFVB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M0IsUUFBUTs7Ozs7Ozs7SUErRWIsMkNBQXFDOzs7Ozs7OztJQVFyQyxpREFBMEI7Ozs7O0lBR3RCLGtEQUVpQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbmF0aXZlLWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgICBEYXRlVGltZUFkYXB0ZXIsXG4gICAgT1dMX0RBVEVfVElNRV9MT0NBTEVcbn0gZnJvbSAnLi4vZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuXG4vKiogVGhlIGRlZmF1bHQgbW9udGggbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX01PTlRIX05BTUVTID0ge1xuICAgIGxvbmc6IFtcbiAgICAgICAgJ0phbnVhcnknLFxuICAgICAgICAnRmVicnVhcnknLFxuICAgICAgICAnTWFyY2gnLFxuICAgICAgICAnQXByaWwnLFxuICAgICAgICAnTWF5JyxcbiAgICAgICAgJ0p1bmUnLFxuICAgICAgICAnSnVseScsXG4gICAgICAgICdBdWd1c3QnLFxuICAgICAgICAnU2VwdGVtYmVyJyxcbiAgICAgICAgJ09jdG9iZXInLFxuICAgICAgICAnTm92ZW1iZXInLFxuICAgICAgICAnRGVjZW1iZXInXG4gICAgXSxcbiAgICBzaG9ydDogW1xuICAgICAgICAnSmFuJyxcbiAgICAgICAgJ0ZlYicsXG4gICAgICAgICdNYXInLFxuICAgICAgICAnQXByJyxcbiAgICAgICAgJ01heScsXG4gICAgICAgICdKdW4nLFxuICAgICAgICAnSnVsJyxcbiAgICAgICAgJ0F1ZycsXG4gICAgICAgICdTZXAnLFxuICAgICAgICAnT2N0JyxcbiAgICAgICAgJ05vdicsXG4gICAgICAgICdEZWMnXG4gICAgXSxcbiAgICBuYXJyb3c6IFsnSicsICdGJywgJ00nLCAnQScsICdNJywgJ0onLCAnSicsICdBJywgJ1MnLCAnTycsICdOJywgJ0QnXVxufTtcblxuLyoqIFRoZSBkZWZhdWx0IGRheSBvZiB0aGUgd2VlayBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cbmNvbnN0IERFRkFVTFRfREFZX09GX1dFRUtfTkFNRVMgPSB7XG4gICAgbG9uZzogW1xuICAgICAgICAnU3VuZGF5JyxcbiAgICAgICAgJ01vbmRheScsXG4gICAgICAgICdUdWVzZGF5JyxcbiAgICAgICAgJ1dlZG5lc2RheScsXG4gICAgICAgICdUaHVyc2RheScsXG4gICAgICAgICdGcmlkYXknLFxuICAgICAgICAnU2F0dXJkYXknXG4gICAgXSxcbiAgICBzaG9ydDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgICBuYXJyb3c6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddXG59O1xuXG4vKiogVGhlIGRlZmF1bHQgZGF0ZSBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cbmNvbnN0IERFRkFVTFRfREFURV9OQU1FUyA9IHJhbmdlKDMxLCBpID0+IFN0cmluZyhpICsgMSkpO1xuXG4vKiogV2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgSW50bCBBUEkuICovXG5jb25zdCBTVVBQT1JUU19JTlRMX0FQSSA9IHR5cGVvZiBJbnRsICE9PSAndW5kZWZpbmVkJztcblxuLyoqXG4gKiBNYXRjaGVzIHN0cmluZ3MgdGhhdCBoYXZlIHRoZSBmb3JtIG9mIGEgdmFsaWQgUkZDIDMzMzkgc3RyaW5nXG4gKiAoaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzMzMzkpLiBOb3RlIHRoYXQgdGhlIHN0cmluZyBtYXkgbm90IGFjdHVhbGx5IGJlIGEgdmFsaWQgZGF0ZVxuICogYmVjYXVzZSB0aGUgcmVnZXggd2lsbCBtYXRjaCBzdHJpbmdzIGFuIHdpdGggb3V0IG9mIGJvdW5kcyBtb250aCwgZGF0ZSwgZXRjLlxuICovXG5jb25zdCBJU09fODYwMV9SRUdFWCA9IC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0oPzpUXFxkezJ9OlxcZHsyfTpcXGR7Mn0oPzpcXC5cXGQrKT8oPzpafCg/OlsrXFwtXVxcZHsyfTpcXGR7Mn0pKT8pPyQvO1xuXG4vKiogQ3JlYXRlcyBhbiBhcnJheSBhbmQgZmlsbHMgaXQgd2l0aCB2YWx1ZXMuICovXG5mdW5jdGlvbiByYW5nZTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWVGdW5jdGlvbjogKGluZGV4OiBudW1iZXIpID0+IFQpOiBUW10ge1xuICAgIGNvbnN0IHZhbHVlc0FycmF5ID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlc0FycmF5W2ldID0gdmFsdWVGdW5jdGlvbihpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlc0FycmF5O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZVRpbWVBZGFwdGVyIGV4dGVuZHMgRGF0ZVRpbWVBZGFwdGVyPERhdGU+IHtcbiAgICAvKiogV2hldGhlciB0byBjbGFtcCB0aGUgZGF0ZSBiZXR3ZWVuIDEgYW5kIDk5OTkgdG8gYXZvaWQgSUUgYW5kIEVkZ2UgZXJyb3JzLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NsYW1wRGF0ZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIGB0aW1lWm9uZTogJ3V0YydgIHdpdGggYEludGwuRGF0ZVRpbWVGb3JtYXRgIHdoZW4gZm9ybWF0dGluZyBkYXRlcy5cbiAgICAgKiBXaXRob3V0IHRoaXMgYEludGwuRGF0ZVRpbWVGb3JtYXRgIHNvbWV0aW1lcyBjaG9vc2VzIHRoZSB3cm9uZyB0aW1lWm9uZSwgd2hpY2ggY2FuIHRocm93IG9mZlxuICAgICAqIHRoZSByZXN1bHQuIChlLmcuIGluIHRoZSBlbi1VUyBsb2NhbGUgYG5ldyBEYXRlKDE4MDAsIDcsIDE0KS50b0xvY2FsZURhdGVTdHJpbmcoKWBcbiAgICAgKiB3aWxsIHByb2R1Y2UgYCc4LzEzLzE4MDAnYC5cbiAgICAgKi9cbiAgICB1c2VVdGNGb3JEaXNwbGF5OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9MT0NBTEUpXG4gICAgICAgIHByaXZhdGUgb3dsRGF0ZVRpbWVMb2NhbGU6IHN0cmluZyxcbiAgICAgICAgcGxhdGZvcm06IFBsYXRmb3JtXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHN1cGVyLnNldExvY2FsZShvd2xEYXRlVGltZUxvY2FsZSk7XG5cbiAgICAgICAgLy8gSUUgZG9lcyBpdHMgb3duIHRpbWUgem9uZSBjb3JyZWN0aW9uLCBzbyB3ZSBkaXNhYmxlIHRoaXMgb24gSUUuXG4gICAgICAgIHRoaXMudXNlVXRjRm9yRGlzcGxheSA9ICFwbGF0Zm9ybS5UUklERU5UO1xuICAgICAgICB0aGlzLl9jbGFtcERhdGUgPSBwbGF0Zm9ybS5UUklERU5UIHx8IHBsYXRmb3JtLkVER0U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFllYXIoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXkoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldERheSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRlKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEhvdXJzKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNaW51dGVzKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlY29uZHMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGltZShkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgbGFzdERhdGVPZk1vbnRoID0gdGhpcy5jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRNb250aChkYXRlKSArIDEsXG4gICAgICAgICAgICAwXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZShsYXN0RGF0ZU9mTW9udGgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZUxlZnQ6IERhdGUsIGRhdGVSaWdodDogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoZGF0ZUxlZnQpICYmIHRoaXMuaXNWYWxpZChkYXRlUmlnaHQpKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlTGVmdFN0YXJ0T2ZEYXkgPSB0aGlzLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRZZWFyKGRhdGVMZWZ0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1vbnRoKGRhdGVMZWZ0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhdGUoZGF0ZUxlZnQpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVJpZ2h0U3RhcnRPZkRheSA9IHRoaXMuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmdldFllYXIoZGF0ZVJpZ2h0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1vbnRoKGRhdGVSaWdodCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYXRlKGRhdGVSaWdodClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdGFtcExlZnQgPVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGltZShkYXRlTGVmdFN0YXJ0T2ZEYXkpIC1cbiAgICAgICAgICAgICAgICBkYXRlTGVmdFN0YXJ0T2ZEYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlsbGlzZW9uZHNJbk1pbnV0ZTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdGFtcFJpZ2h0ID1cbiAgICAgICAgICAgICAgICB0aGlzLmdldFRpbWUoZGF0ZVJpZ2h0U3RhcnRPZkRheSkgLVxuICAgICAgICAgICAgICAgIGRhdGVSaWdodFN0YXJ0T2ZEYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlsbGlzZW9uZHNJbk1pbnV0ZTtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKFxuICAgICAgICAgICAgICAgICh0aW1lU3RhbXBMZWZ0IC0gdGltZVN0YW1wUmlnaHQpIC8gdGhpcy5taWxsaXNlY29uZHNJbkRheVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldFllYXJOYW1lKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgICAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMuZ2V0TG9jYWxlKCksIHtcbiAgICAgICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgdGltZVpvbmU6ICd1dGMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHRoaXMuX2Zvcm1hdChkdGYsIGRhdGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU3RyaW5nKHRoaXMuZ2V0WWVhcihkYXRlKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICAgICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmdldExvY2FsZSgpLCB7XG4gICAgICAgICAgICAgICAgbW9udGg6IHN0eWxlLFxuICAgICAgICAgICAgICAgIHRpbWVab25lOiAndXRjJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2UoMTIsIGkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLnN0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JtYXQoZHRmLCBuZXcgRGF0ZSgyMDE3LCBpLCAxKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBERUZBVUxUX01PTlRIX05BTUVTW3N0eWxlXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICAgICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmdldExvY2FsZSgpLCB7XG4gICAgICAgICAgICAgICAgd2Vla2RheTogc3R5bGUsXG4gICAgICAgICAgICAgICAgdGltZVpvbmU6ICd1dGMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByYW5nZSg3LCBpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgMCwgaSArIDEpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gREVGQVVMVF9EQVlfT0ZfV0VFS19OQU1FU1tzdHlsZV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGVOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5nZXRMb2NhbGUoKSwge1xuICAgICAgICAgICAgICAgIGRheTogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIHRpbWVab25lOiAndXRjJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2UoMzEsIGkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLnN0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JtYXQoZHRmLCBuZXcgRGF0ZSgyMDE3LCAwLCBpICsgMSkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gREVGQVVMVF9EQVRFX05BTUVTO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0lzbzg2MDEoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRXF1YWwoZGF0ZUxlZnQ6IERhdGUsIGRhdGVSaWdodDogRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKGRhdGVMZWZ0KSAmJiB0aGlzLmlzVmFsaWQoZGF0ZVJpZ2h0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGVMZWZ0LmdldFRpbWUoKSA9PT0gZGF0ZVJpZ2h0LmdldFRpbWUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc1NhbWVEYXkoZGF0ZUxlZnQ6IERhdGUsIGRhdGVSaWdodDogRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKGRhdGVMZWZ0KSAmJiB0aGlzLmlzVmFsaWQoZGF0ZVJpZ2h0KSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZUxlZnRTdGFydE9mRGF5ID0gdGhpcy5jbG9uZShkYXRlTGVmdCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUmlnaHRTdGFydE9mRGF5ID0gdGhpcy5jbG9uZShkYXRlUmlnaHQpO1xuICAgICAgICAgICAgZGF0ZUxlZnRTdGFydE9mRGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgZGF0ZVJpZ2h0U3RhcnRPZkRheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgZGF0ZUxlZnRTdGFydE9mRGF5LmdldFRpbWUoKSA9PT0gZGF0ZVJpZ2h0U3RhcnRPZkRheS5nZXRUaW1lKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWYWxpZChkYXRlOiBEYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBkYXRlICYmICFpc05hTihkYXRlLmdldFRpbWUoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzVmFsaWRGb3JtYXQodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFEYXRlLnBhcnNlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW52YWxpZCgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBEYXRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDYWxlbmRhclllYXJzKGRhdGU6IERhdGUsIGFtb3VudDogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZENhbGVuZGFyTW9udGhzKGRhdGUsIGFtb3VudCAqIDEyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogRGF0ZSwgYW1vdW50OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgYW1vdW50ID0gTnVtYmVyKGFtb3VudCk7XG5cbiAgICAgICAgY29uc3QgZGVzaXJlZE1vbnRoID0gcmVzdWx0LmdldE1vbnRoKCkgKyBhbW91bnQ7XG4gICAgICAgIGNvbnN0IGRhdGVXaXRoRGVzaXJlZE1vbnRoID0gbmV3IERhdGUoMCk7XG4gICAgICAgIGRhdGVXaXRoRGVzaXJlZE1vbnRoLnNldEZ1bGxZZWFyKHJlc3VsdC5nZXRGdWxsWWVhcigpLCBkZXNpcmVkTW9udGgsIDEpO1xuICAgICAgICBkYXRlV2l0aERlc2lyZWRNb250aC5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgICAgICBjb25zdCBkYXlzSW5Nb250aCA9IHRoaXMuZ2V0TnVtRGF5c0luTW9udGgoZGF0ZVdpdGhEZXNpcmVkTW9udGgpO1xuICAgICAgICAvLyBTZXQgdGhlIGxhc3QgZGF5IG9mIHRoZSBuZXcgbW9udGhcbiAgICAgICAgLy8gaWYgdGhlIG9yaWdpbmFsIGRhdGUgd2FzIHRoZSBsYXN0IGRheSBvZiB0aGUgbG9uZ2VyIG1vbnRoXG4gICAgICAgIHJlc3VsdC5zZXRNb250aChkZXNpcmVkTW9udGgsIE1hdGgubWluKGRheXNJbk1vbnRoLCByZXN1bHQuZ2V0RGF0ZSgpKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBEYXRlLCBhbW91bnQ6IG51bWJlcik6IERhdGUge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBhbW91bnQgPSBOdW1iZXIoYW1vdW50KTtcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSArIGFtb3VudCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEhvdXJzKGRhdGU6IERhdGUsIGFtb3VudDogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIHJlc3VsdC5zZXRIb3VycyhhbW91bnQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNaW51dGVzKGRhdGU6IERhdGUsIGFtb3VudDogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIHJlc3VsdC5zZXRNaW51dGVzKGFtb3VudCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNlY29uZHMoZGF0ZTogRGF0ZSwgYW1vdW50OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgcmVzdWx0LnNldFNlY29uZHMoYW1vdW50KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlRGF0ZShcbiAgICAgICAgeWVhcjogbnVtYmVyLFxuICAgICAgICBtb250aDogbnVtYmVyLFxuICAgICAgICBkYXRlOiBudW1iZXIsXG4gICAgICAgIGhvdXJzOiBudW1iZXIgPSAwLFxuICAgICAgICBtaW51dGVzOiBudW1iZXIgPSAwLFxuICAgICAgICBzZWNvbmRzOiBudW1iZXIgPSAwXG4gICAgKTogRGF0ZSB7XG4gICAgICAgIGlmIChtb250aCA8IDAgfHwgbW9udGggPiAxMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgbW9udGggaW5kZXggXCIke21vbnRofVwiLiBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAxMS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBob3VycyBcIiR7aG91cnN9XCIuIEhvdXJzIGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDIzLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWludXRlcyA8IDAgfHwgbWludXRlcyA+IDU5KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBtaW51dGVzIFwiJHttaW51dGVzfVwiLiBNaW51dGVzIGhhcyB0byBiZXR3ZWVuIDAgYW5kIDU5LmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kcyA8IDAgfHwgc2Vjb25kcyA+IDU5KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBzZWNvbmRzIFwiJHtzZWNvbmRzfVwiLiBTZWNvbmRzIGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDU5LmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXG4gICAgICAgICAgICB5ZWFyLFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgICAgc2Vjb25kc1xuICAgICAgICApO1xuXG4gICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIGRhdGUgd2Fzbid0IGFib3ZlIHRoZSB1cHBlciBib3VuZCBmb3IgdGhlIG1vbnRoLCBjYXVzaW5nIHRoZSBtb250aCB0byBvdmVyZmxvd1xuICAgICAgICAvLyBGb3IgZXhhbXBsZSwgY3JlYXRlRGF0ZSgyMDE3LCAxLCAzMSkgd291bGQgdHJ5IHRvIGNyZWF0ZSBhIGRhdGUgMjAxNy8wMi8zMSB3aGljaCBpcyBpbnZhbGlkXG4gICAgICAgIGlmIChyZXN1bHQuZ2V0TW9udGgoKSAhPT0gbW9udGgpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIgZm9yIG1vbnRoIHdpdGggaW5kZXggXCIke21vbnRofVwiLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9uZShkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICB0aGlzLmdldFllYXIoZGF0ZSksXG4gICAgICAgICAgICB0aGlzLmdldE1vbnRoKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXREYXRlKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0TWludXRlcyhkYXRlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBub3coKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmb3JtYXQoZGF0ZTogRGF0ZSwgZGlzcGxheUZvcm1hdDogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdKU05hdGl2ZURhdGU6IENhbm5vdCBmb3JtYXQgaW52YWxpZCBkYXRlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xhbXBEYXRlICYmXG4gICAgICAgICAgICAgICAgKGRhdGUuZ2V0RnVsbFllYXIoKSA8IDEgfHwgZGF0ZS5nZXRGdWxsWWVhcigpID4gOTk5OSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0RnVsbFllYXIoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KDEsIE1hdGgubWluKDk5OTksIGRhdGUuZ2V0RnVsbFllYXIoKSkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGlzcGxheUZvcm1hdCA9IHsgLi4uZGlzcGxheUZvcm1hdCwgdGltZVpvbmU6ICd1dGMnIH07XG4gICAgICAgICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcbiAgICAgICAgICAgICAgICB0aGlzLmdldExvY2FsZSgpLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlGb3JtYXRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBkYXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhkYXRlLnRvRGF0ZVN0cmluZygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IGFueSk6IERhdGUgfCBudWxsIHtcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gd2F5IHVzaW5nIHRoZSBuYXRpdmUgSlMgRGF0ZSB0byBzZXQgdGhlIHBhcnNlIGZvcm1hdCBvciBsb2NhbGVcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlID8gbmV3IERhdGUoRGF0ZS5wYXJzZSh2YWx1ZSkpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBnaXZlbiB2YWx1ZSBpZiBnaXZlbiBhIHZhbGlkIERhdGUgb3IgbnVsbC4gRGVzZXJpYWxpemVzIHZhbGlkIElTTyA4NjAxIHN0cmluZ3NcbiAgICAgKiAoaHR0cHM6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzMzMzkudHh0KSBpbnRvIHZhbGlkIERhdGVzIGFuZCBlbXB0eSBzdHJpbmcgaW50byBudWxsLiBSZXR1cm5zIGFuXG4gICAgICogaW52YWxpZCBkYXRlIGZvciBhbGwgb3RoZXIgdmFsdWVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogRGF0ZSB8IG51bGwge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlIGBEYXRlYCBjb25zdHJ1Y3RvciBhY2NlcHRzIGZvcm1hdHMgb3RoZXIgdGhhbiBJU08gODYwMSwgc28gd2UgbmVlZCB0byBtYWtlIHN1cmUgdGhlXG4gICAgICAgICAgICAvLyBzdHJpbmcgaXMgdGhlIHJpZ2h0IGZvcm1hdCBmaXJzdC5cbiAgICAgICAgICAgIGlmIChJU09fODYwMV9SRUdFWC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZGF0ZSBidXQgYWxsb3dzIHRoZSBtb250aCBhbmQgZGF0ZSB0byBvdmVyZmxvdy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXG4gICAgICAgIHllYXI6IG51bWJlcixcbiAgICAgICAgbW9udGg6IG51bWJlcixcbiAgICAgICAgZGF0ZTogbnVtYmVyLFxuICAgICAgICBob3VyczogbnVtYmVyID0gMCxcbiAgICAgICAgbWludXRlczogbnVtYmVyID0gMCxcbiAgICAgICAgc2Vjb25kczogbnVtYmVyID0gMFxuICAgICk6IERhdGUge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpO1xuXG4gICAgICAgIGlmICh5ZWFyID49IDAgJiYgeWVhciA8IDEwMCkge1xuICAgICAgICAgICAgcmVzdWx0LnNldEZ1bGxZZWFyKHRoaXMuZ2V0WWVhcihyZXN1bHQpIC0gMTkwMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdHJpcCBvdXQgdW5pY29kZSBMVFIgYW5kIFJUTCBjaGFyYWN0ZXJzLiBFZGdlIGFuZCBJRSBpbnNlcnQgdGhlc2UgaW50byBmb3JtYXR0ZWQgZGF0ZXMgd2hpbGVcbiAgICAgKiBvdGhlciBicm93c2VycyBkbyBub3QuIFdlIHJlbW92ZSB0aGVtIHRvIG1ha2Ugb3V0cHV0IGNvbnNpc3RlbnQgYW5kIGJlY2F1c2UgdGhleSBpbnRlcmZlcmUgd2l0aFxuICAgICAqIGRhdGUgcGFyc2luZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcdTIwMGVcXHUyMDBmXS9nLCAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBjb252ZXJ0aW5nIERhdGUgb2JqZWN0IHRvIHN0cmluZywgamF2YXNjcmlwdCBidWlsdC1pbiBmdW5jdGlvbnMgbWF5IHJldHVybiB3cm9uZ1xuICAgICAqIHJlc3VsdHMgYmVjYXVzZSBpdCBhcHBsaWVzIGl0cyBpbnRlcm5hbCBEU1QgcnVsZXMuIFRoZSBEU1QgcnVsZXMgYXJvdW5kIHRoZSB3b3JsZCBjaGFuZ2VcbiAgICAgKiB2ZXJ5IGZyZXF1ZW50bHksIGFuZCB0aGUgY3VycmVudCB2YWxpZCBydWxlIGlzIG5vdCBhbHdheXMgdmFsaWQgaW4gcHJldmlvdXMgeWVhcnMgdGhvdWdoLlxuICAgICAqIFdlIHdvcmsgYXJvdW5kIHRoaXMgcHJvYmxlbSBidWlsZGluZyBhIG5ldyBEYXRlIG9iamVjdCB3aGljaCBoYXMgaXRzIGludGVybmFsIFVUQ1xuICAgICAqIHJlcHJlc2VudGF0aW9uIHdpdGggdGhlIGxvY2FsIGRhdGUgYW5kIHRpbWUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZm9ybWF0KGR0ZjogSW50bC5EYXRlVGltZUZvcm1hdCwgZGF0ZTogRGF0ZSkge1xuICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoXG4gICAgICAgICAgICBEYXRlLlVUQyhcbiAgICAgICAgICAgICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldFNlY29uZHMoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBkdGYuZm9ybWF0KGQpO1xuICAgIH1cbn1cbiJdfQ==