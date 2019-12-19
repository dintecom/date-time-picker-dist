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
        if (SUPPORTS_INTL_API) {
            parseFormat = Object.assign({}, parseFormat, { timeZone: 'utc' });
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.getLocale(), parseFormat);
            /** @type {?} */
            const parts = dtf.formatToParts();
            /** @type {?} */
            let regex = '^';
            for (const part of parts) {
                switch (part.type) {
                    case 'day':
                        regex += '([1-9]{1}|[0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})';
                        break;
                    case 'month':
                        regex += '([1-9]|0[1-9]|1[0-2])';
                        break;
                    case 'year':
                        regex += '([0-9]{1,4})';
                        break;
                    case 'hour':
                        if (dtf.resolvedOptions().hour12) {
                            regex += '(0?[1-9]|1[012])';
                        }
                        else {
                            regex += '([01]?[0-9]|2[0-3])';
                        }
                        break;
                    case 'second':
                    case 'minute':
                        regex += '([0-9]{1}|[0-5][0-9])';
                        break;
                    case 'dayPeriod':
                        regex += '((a|A)(m|M)?|(p|P)(m|M)?)';
                        break;
                    case 'literal':
                        regex += part.value.replace('/', '\\/').replace('.', '\\.');
                        break;
                }
            }
            regex += '$';
            return (new RegExp(regex)).test(value);
        }
        else {
            /** @type {?} */
            const date = new Date(value);
            return date.getTime() === date.getTime();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2FkYXB0ZXIvbmF0aXZlL25hdGl2ZS1kYXRlLXRpbWUtYWRhcHRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsZUFBZSxFQUNmLG9CQUFvQixFQUN2QixNQUFNLDRCQUE0QixDQUFDOzs7OztNQUc5QixtQkFBbUIsR0FBRztJQUN4QixJQUFJLEVBQUU7UUFDRixTQUFTO1FBQ1QsVUFBVTtRQUNWLE9BQU87UUFDUCxPQUFPO1FBQ1AsS0FBSztRQUNMLE1BQU07UUFDTixNQUFNO1FBQ04sUUFBUTtRQUNSLFdBQVc7UUFDWCxTQUFTO1FBQ1QsVUFBVTtRQUNWLFVBQVU7S0FDYjtJQUNELEtBQUssRUFBRTtRQUNILEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztLQUNSO0lBQ0QsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Q0FDdkU7Ozs7O01BR0sseUJBQXlCLEdBQUc7SUFDOUIsSUFBSSxFQUFFO1FBQ0YsUUFBUTtRQUNSLFFBQVE7UUFDUixTQUFTO1FBQ1QsV0FBVztRQUNYLFVB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QUFJLENBQUMsZUFBZSxFQUFFLENBQ3pCLENBQ0o7UUFDRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7O1lBaGRKLFVBQVU7Ozs7eUNBY0YsUUFBUSxZQUNSLE1BQU0sU0FBQyxvQkFBb0I7WUEzRjNCLFFBQVE7Ozs7Ozs7O0lBK0ViLDJDQUFxQzs7Ozs7Ozs7SUFRckMsaURBQTBCOzs7OztJQUd0QixrREFFaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG5hdGl2ZS1kYXRlLXRpbWUtYWRhcHRlci5jbGFzc1xuICovXG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gICAgRGF0ZVRpbWVBZGFwdGVyLFxuICAgIE9XTF9EQVRFX1RJTUVfTE9DQUxFXG59IGZyb20gJy4uL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcblxuLyoqIFRoZSBkZWZhdWx0IG1vbnRoIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xuY29uc3QgREVGQVVMVF9NT05USF9OQU1FUyA9IHtcbiAgICBsb25nOiBbXG4gICAgICAgICdKYW51YXJ5JyxcbiAgICAgICAgJ0ZlYnJ1YXJ5JyxcbiAgICAgICAgJ01hcmNoJyxcbiAgICAgICAgJ0FwcmlsJyxcbiAgICAgICAgJ01heScsXG4gICAgICAgICdKdW5lJyxcbiAgICAgICAgJ0p1bHknLFxuICAgICAgICAnQXVndXN0JyxcbiAgICAgICAgJ1NlcHRlbWJlcicsXG4gICAgICAgICdPY3RvYmVyJyxcbiAgICAgICAgJ05vdmVtYmVyJyxcbiAgICAgICAgJ0RlY2VtYmVyJ1xuICAgIF0sXG4gICAgc2hvcnQ6IFtcbiAgICAgICAgJ0phbicsXG4gICAgICAgICdGZWInLFxuICAgICAgICAnTWFyJyxcbiAgICAgICAgJ0FwcicsXG4gICAgICAgICdNYXknLFxuICAgICAgICAnSnVuJyxcbiAgICAgICAgJ0p1bCcsXG4gICAgICAgICdBdWcnLFxuICAgICAgICAnU2VwJyxcbiAgICAgICAgJ09jdCcsXG4gICAgICAgICdOb3YnLFxuICAgICAgICAnRGVjJ1xuICAgIF0sXG4gICAgbmFycm93OiBbJ0onLCAnRicsICdNJywgJ0EnLCAnTScsICdKJywgJ0onLCAnQScsICdTJywgJ08nLCAnTicsICdEJ11cbn07XG5cbi8qKiBUaGUgZGVmYXVsdCBkYXkgb2YgdGhlIHdlZWsgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX0RBWV9PRl9XRUVLX05BTUVTID0ge1xuICAgIGxvbmc6IFtcbiAgICAgICAgJ1N1bmRheScsXG4gICAgICAgICdNb25kYXknLFxuICAgICAgICAnVHVlc2RheScsXG4gICAgICAgICdXZWRuZXNkYXknLFxuICAgICAgICAnVGh1cnNkYXknLFxuICAgICAgICAnRnJpZGF5JyxcbiAgICAgICAgJ1NhdHVyZGF5J1xuICAgIF0sXG4gICAgc2hvcnQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXG4gICAgbmFycm93OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXVxufTtcblxuLyoqIFRoZSBkZWZhdWx0IGRhdGUgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX0RBVEVfTkFNRVMgPSByYW5nZSgzMSwgaSA9PiBTdHJpbmcoaSArIDEpKTtcblxuLyoqIFdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIEludGwgQVBJLiAqL1xuY29uc3QgU1VQUE9SVFNfSU5UTF9BUEkgPSB0eXBlb2YgSW50bCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogTWF0Y2hlcyBzdHJpbmdzIHRoYXQgaGF2ZSB0aGUgZm9ybSBvZiBhIHZhbGlkIFJGQyAzMzM5IHN0cmluZ1xuICogKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzMzM5KS4gTm90ZSB0aGF0IHRoZSBzdHJpbmcgbWF5IG5vdCBhY3R1YWxseSBiZSBhIHZhbGlkIGRhdGVcbiAqIGJlY2F1c2UgdGhlIHJlZ2V4IHdpbGwgbWF0Y2ggc3RyaW5ncyBhbiB3aXRoIG91dCBvZiBib3VuZHMgbW9udGgsIGRhdGUsIGV0Yy5cbiAqL1xuY29uc3QgSVNPXzg2MDFfUkVHRVggPSAvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9KD86VFxcZHsyfTpcXGR7Mn06XFxkezJ9KD86XFwuXFxkKyk/KD86WnwoPzpbK1xcLV1cXGR7Mn06XFxkezJ9KSk/KT8kLztcblxuLyoqIENyZWF0ZXMgYW4gYXJyYXkgYW5kIGZpbGxzIGl0IHdpdGggdmFsdWVzLiAqL1xuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcbiAgICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZXNBcnJheVtpXSA9IHZhbHVlRnVuY3Rpb24oaSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXNBcnJheTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hdGl2ZURhdGVUaW1lQWRhcHRlciBleHRlbmRzIERhdGVUaW1lQWRhcHRlcjxEYXRlPiB7XG4gICAgLyoqIFdoZXRoZXIgdG8gY2xhbXAgdGhlIGRhdGUgYmV0d2VlbiAxIGFuZCA5OTk5IHRvIGF2b2lkIElFIGFuZCBFZGdlIGVycm9ycy4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jbGFtcERhdGU6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSBgdGltZVpvbmU6ICd1dGMnYCB3aXRoIGBJbnRsLkRhdGVUaW1lRm9ybWF0YCB3aGVuIGZvcm1hdHRpbmcgZGF0ZXMuXG4gICAgICogV2l0aG91dCB0aGlzIGBJbnRsLkRhdGVUaW1lRm9ybWF0YCBzb21ldGltZXMgY2hvb3NlcyB0aGUgd3JvbmcgdGltZVpvbmUsIHdoaWNoIGNhbiB0aHJvdyBvZmZcbiAgICAgKiB0aGUgcmVzdWx0LiAoZS5nLiBpbiB0aGUgZW4tVVMgbG9jYWxlIGBuZXcgRGF0ZSgxODAwLCA3LCAxNCkudG9Mb2NhbGVEYXRlU3RyaW5nKClgXG4gICAgICogd2lsbCBwcm9kdWNlIGAnOC8xMy8xODAwJ2AuXG4gICAgICovXG4gICAgdXNlVXRjRm9yRGlzcGxheTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfTE9DQUxFKVxuICAgICAgICBwcml2YXRlIG93bERhdGVUaW1lTG9jYWxlOiBzdHJpbmcsXG4gICAgICAgIHBsYXRmb3JtOiBQbGF0Zm9ybVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzdXBlci5zZXRMb2NhbGUob3dsRGF0ZVRpbWVMb2NhbGUpO1xuXG4gICAgICAgIC8vIElFIGRvZXMgaXRzIG93biB0aW1lIHpvbmUgY29ycmVjdGlvbiwgc28gd2UgZGlzYWJsZSB0aGlzIG9uIElFLlxuICAgICAgICB0aGlzLnVzZVV0Y0ZvckRpc3BsYXkgPSAhcGxhdGZvcm0uVFJJREVOVDtcbiAgICAgICAgdGhpcy5fY2xhbXBEYXRlID0gcGxhdGZvcm0uVFJJREVOVCB8fCBwbGF0Zm9ybS5FREdFO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRZZWFyKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNb250aChkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF5KGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXREYXkoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0ZShkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRIb3VycyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWludXRlcyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZWNvbmRzKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRpbWUoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGxhc3REYXRlT2ZNb250aCA9IHRoaXMuY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgICAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSkgKyAxLFxuICAgICAgICAgICAgMFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGUobGFzdERhdGVPZk1vbnRoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGVMZWZ0OiBEYXRlLCBkYXRlUmlnaHQ6IERhdGUpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKGRhdGVMZWZ0KSAmJiB0aGlzLmlzVmFsaWQoZGF0ZVJpZ2h0KSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZUxlZnRTdGFydE9mRGF5ID0gdGhpcy5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0WWVhcihkYXRlTGVmdCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRNb250aChkYXRlTGVmdCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYXRlKGRhdGVMZWZ0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVSaWdodFN0YXJ0T2ZEYXkgPSB0aGlzLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRZZWFyKGRhdGVSaWdodCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRNb250aChkYXRlUmlnaHQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGF0ZShkYXRlUmlnaHQpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCB0aW1lU3RhbXBMZWZ0ID1cbiAgICAgICAgICAgICAgICB0aGlzLmdldFRpbWUoZGF0ZUxlZnRTdGFydE9mRGF5KSAtXG4gICAgICAgICAgICAgICAgZGF0ZUxlZnRTdGFydE9mRGF5LmdldFRpbWV6b25lT2Zmc2V0KCkgKlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbGxpc2VvbmRzSW5NaW51dGU7XG4gICAgICAgICAgICBjb25zdCB0aW1lU3RhbXBSaWdodCA9XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUaW1lKGRhdGVSaWdodFN0YXJ0T2ZEYXkpIC1cbiAgICAgICAgICAgICAgICBkYXRlUmlnaHRTdGFydE9mRGF5LmdldFRpbWV6b25lT2Zmc2V0KCkgKlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbGxpc2VvbmRzSW5NaW51dGU7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChcbiAgICAgICAgICAgICAgICAodGltZVN0YW1wTGVmdCAtIHRpbWVTdGFtcFJpZ2h0KSAvIHRoaXMubWlsbGlzZWNvbmRzSW5EYXlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRZZWFyTmFtZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICAgICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmdldExvY2FsZSgpLCB7XG4gICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIHRpbWVab25lOiAndXRjJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBkYXRlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFN0cmluZyh0aGlzLmdldFllYXIoZGF0ZSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5nZXRMb2NhbGUoKSwge1xuICAgICAgICAgICAgICAgIG1vbnRoOiBzdHlsZSxcbiAgICAgICAgICAgICAgICB0aW1lWm9uZTogJ3V0YydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlKDEyLCBpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgaSwgMSkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gREVGQVVMVF9NT05USF9OQU1FU1tzdHlsZV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5nZXRMb2NhbGUoKSwge1xuICAgICAgICAgICAgICAgIHdlZWtkYXk6IHN0eWxlLFxuICAgICAgICAgICAgICAgIHRpbWVab25lOiAndXRjJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2UoNywgaSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1hdChkdGYsIG5ldyBEYXRlKDIwMTcsIDAsIGkgKyAxKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERFRkFVTFRfREFZX09GX1dFRUtfTkFNRVNbc3R5bGVdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgICAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMuZ2V0TG9jYWxlKCksIHtcbiAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICB0aW1lWm9uZTogJ3V0YydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlKDMxLCBpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgMCwgaSArIDEpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIERFRkFVTFRfREFURV9OQU1FUztcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9Jc284NjAxKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0VxdWFsKGRhdGVMZWZ0OiBEYXRlLCBkYXRlUmlnaHQ6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChkYXRlTGVmdCkgJiYgdGhpcy5pc1ZhbGlkKGRhdGVSaWdodCkpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlTGVmdC5nZXRUaW1lKCkgPT09IGRhdGVSaWdodC5nZXRUaW1lKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNTYW1lRGF5KGRhdGVMZWZ0OiBEYXRlLCBkYXRlUmlnaHQ6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChkYXRlTGVmdCkgJiYgdGhpcy5pc1ZhbGlkKGRhdGVSaWdodCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVMZWZ0U3RhcnRPZkRheSA9IHRoaXMuY2xvbmUoZGF0ZUxlZnQpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVJpZ2h0U3RhcnRPZkRheSA9IHRoaXMuY2xvbmUoZGF0ZVJpZ2h0KTtcbiAgICAgICAgICAgIGRhdGVMZWZ0U3RhcnRPZkRheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIGRhdGVSaWdodFN0YXJ0T2ZEYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIGRhdGVMZWZ0U3RhcnRPZkRheS5nZXRUaW1lKCkgPT09IGRhdGVSaWdodFN0YXJ0T2ZEYXkuZ2V0VGltZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzVmFsaWQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZGF0ZSAmJiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1ZhbGlkRm9ybWF0KHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICAgICAgICBwYXJzZUZvcm1hdCA9IHsgLi4ucGFyc2VGb3JtYXQsIHRpbWVab25lOiAndXRjJyB9O1xuICAgICAgICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2NhbGUoKSxcbiAgICAgICAgICAgICAgICBwYXJzZUZvcm1hdFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gZHRmLmZvcm1hdFRvUGFydHMoKTtcbiAgICAgICAgICAgIGxldCByZWdleCA9ICdeJztcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGFydCBvZiBwYXJ0cykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocGFydC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleCArPSAnKFsxLTldezF9fFswXXsxfVsxLTldezF9fFsxLTJdezF9WzAtOV17MX18M1swLTFdezF9KSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXggKz0gJyhbMS05XXwwWzEtOV18MVswLTJdKSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleCArPSAnKFswLTldezEsNH0pJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdGYucmVzb2x2ZWRPcHRpb25zKCkuaG91cjEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXggKz0gJygwP1sxLTldfDFbMDEyXSknO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdleCArPSAnKFswMV0/WzAtOV18MlswLTNdKSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4ICs9ICcoWzAtOV17MX18WzAtNV1bMC05XSknO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RheVBlcmlvZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleCArPSAnKChhfEEpKG18TSk/fChwfFApKG18TSk/KSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGl0ZXJhbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleCArPSBwYXJ0LnZhbHVlLnJlcGxhY2UoJy8nLCAnXFxcXC8nKS5yZXBsYWNlKCcuJywgJ1xcXFwuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWdleCArPSAnJCc7XG5cbiAgICAgICAgICAgIHJldHVybiAobmV3IFJlZ0V4cChyZWdleCkpLnRlc3QodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKSA9PT0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaW52YWxpZCgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBEYXRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDYWxlbmRhclllYXJzKGRhdGU6IERhdGUsIGFtb3VudDogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZENhbGVuZGFyTW9udGhzKGRhdGUsIGFtb3VudCAqIDEyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogRGF0ZSwgYW1vdW50OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgYW1vdW50ID0gTnVtYmVyKGFtb3VudCk7XG5cbiAgICAgICAgY29uc3QgZGVzaXJlZE1vbnRoID0gcmVzdWx0LmdldE1vbnRoKCkgKyBhbW91bnQ7XG4gICAgICAgIGNvbnN0IGRhdGVXaXRoRGVzaXJlZE1vbnRoID0gbmV3IERhdGUoMCk7XG4gICAgICAgIGRhdGVXaXRoRGVzaXJlZE1vbnRoLnNldEZ1bGxZZWFyKHJlc3VsdC5nZXRGdWxsWWVhcigpLCBkZXNpcmVkTW9udGgsIDEpO1xuICAgICAgICBkYXRlV2l0aERlc2lyZWRNb250aC5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgICAgICBjb25zdCBkYXlzSW5Nb250aCA9IHRoaXMuZ2V0TnVtRGF5c0luTW9udGgoZGF0ZVdpdGhEZXNpcmVkTW9udGgpO1xuICAgICAgICAvLyBTZXQgdGhlIGxhc3QgZGF5IG9mIHRoZSBuZXcgbW9udGhcbiAgICAgICAgLy8gaWYgdGhlIG9yaWdpbmFsIGRhdGUgd2FzIHRoZSBsYXN0IGRheSBvZiB0aGUgbG9uZ2VyIG1vbnRoXG4gICAgICAgIHJlc3VsdC5zZXRNb250aChkZXNpcmVkTW9udGgsIE1hdGgubWluKGRheXNJbk1vbnRoLCByZXN1bHQuZ2V0RGF0ZSgpKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBEYXRlLCBhbW91bnQ6IG51bWJlcik6IERhdGUge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBhbW91bnQgPSBOdW1iZXIoYW1vdW50KTtcbiAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSArIGFtb3VudCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEhvdXJzKGRhdGU6IERhdGUsIGFtb3VudDogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIHJlc3VsdC5zZXRIb3VycyhhbW91bnQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNaW51dGVzKGRhdGU6IERhdGUsIGFtb3VudDogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIHJlc3VsdC5zZXRNaW51dGVzKGFtb3VudCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNlY29uZHMoZGF0ZTogRGF0ZSwgYW1vdW50OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgcmVzdWx0LnNldFNlY29uZHMoYW1vdW50KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlRGF0ZShcbiAgICAgICAgeWVhcjogbnVtYmVyLFxuICAgICAgICBtb250aDogbnVtYmVyLFxuICAgICAgICBkYXRlOiBudW1iZXIsXG4gICAgICAgIGhvdXJzOiBudW1iZXIgPSAwLFxuICAgICAgICBtaW51dGVzOiBudW1iZXIgPSAwLFxuICAgICAgICBzZWNvbmRzOiBudW1iZXIgPSAwXG4gICAgKTogRGF0ZSB7XG4gICAgICAgIGlmIChtb250aCA8IDAgfHwgbW9udGggPiAxMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgbW9udGggaW5kZXggXCIke21vbnRofVwiLiBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAxMS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBob3VycyBcIiR7aG91cnN9XCIuIEhvdXJzIGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDIzLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWludXRlcyA8IDAgfHwgbWludXRlcyA+IDU5KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBtaW51dGVzIFwiJHttaW51dGVzfVwiLiBNaW51dGVzIGhhcyB0byBiZXR3ZWVuIDAgYW5kIDU5LmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kcyA8IDAgfHwgc2Vjb25kcyA+IDU5KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBzZWNvbmRzIFwiJHtzZWNvbmRzfVwiLiBTZWNvbmRzIGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDU5LmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXG4gICAgICAgICAgICB5ZWFyLFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgICAgc2Vjb25kc1xuICAgICAgICApO1xuXG4gICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIGRhdGUgd2Fzbid0IGFib3ZlIHRoZSB1cHBlciBib3VuZCBmb3IgdGhlIG1vbnRoLCBjYXVzaW5nIHRoZSBtb250aCB0byBvdmVyZmxvd1xuICAgICAgICAvLyBGb3IgZXhhbXBsZSwgY3JlYXRlRGF0ZSgyMDE3LCAxLCAzMSkgd291bGQgdHJ5IHRvIGNyZWF0ZSBhIGRhdGUgMjAxNy8wMi8zMSB3aGljaCBpcyBpbnZhbGlkXG4gICAgICAgIGlmIChyZXN1bHQuZ2V0TW9udGgoKSAhPT0gbW9udGgpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIgZm9yIG1vbnRoIHdpdGggaW5kZXggXCIke21vbnRofVwiLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9uZShkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICB0aGlzLmdldFllYXIoZGF0ZSksXG4gICAgICAgICAgICB0aGlzLmdldE1vbnRoKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXREYXRlKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0TWludXRlcyhkYXRlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBub3coKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmb3JtYXQoZGF0ZTogRGF0ZSwgZGlzcGxheUZvcm1hdDogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdKU05hdGl2ZURhdGU6IENhbm5vdCBmb3JtYXQgaW52YWxpZCBkYXRlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xhbXBEYXRlICYmXG4gICAgICAgICAgICAgICAgKGRhdGUuZ2V0RnVsbFllYXIoKSA8IDEgfHwgZGF0ZS5nZXRGdWxsWWVhcigpID4gOTk5OSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0RnVsbFllYXIoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KDEsIE1hdGgubWluKDk5OTksIGRhdGUuZ2V0RnVsbFllYXIoKSkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGlzcGxheUZvcm1hdCA9IHsgLi4uZGlzcGxheUZvcm1hdCwgdGltZVpvbmU6ICd1dGMnIH07XG4gICAgICAgICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcbiAgICAgICAgICAgICAgICB0aGlzLmdldExvY2FsZSgpLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlGb3JtYXRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBkYXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhkYXRlLnRvRGF0ZVN0cmluZygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IGFueSk6IERhdGUgfCBudWxsIHtcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gd2F5IHVzaW5nIHRoZSBuYXRpdmUgSlMgRGF0ZSB0byBzZXQgdGhlIHBhcnNlIGZvcm1hdCBvciBsb2NhbGVcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlID8gbmV3IERhdGUoRGF0ZS5wYXJzZSh2YWx1ZSkpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBnaXZlbiB2YWx1ZSBpZiBnaXZlbiBhIHZhbGlkIERhdGUgb3IgbnVsbC4gRGVzZXJpYWxpemVzIHZhbGlkIElTTyA4NjAxIHN0cmluZ3NcbiAgICAgKiAoaHR0cHM6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzMzMzkudHh0KSBpbnRvIHZhbGlkIERhdGVzIGFuZCBlbXB0eSBzdHJpbmcgaW50byBudWxsLiBSZXR1cm5zIGFuXG4gICAgICogaW52YWxpZCBkYXRlIGZvciBhbGwgb3RoZXIgdmFsdWVzLlxuICAgICAqL1xuICAgIHB1YmxpYyBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogRGF0ZSB8IG51bGwge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlIGBEYXRlYCBjb25zdHJ1Y3RvciBhY2NlcHRzIGZvcm1hdHMgb3RoZXIgdGhhbiBJU08gODYwMSwgc28gd2UgbmVlZCB0byBtYWtlIHN1cmUgdGhlXG4gICAgICAgICAgICAvLyBzdHJpbmcgaXMgdGhlIHJpZ2h0IGZvcm1hdCBmaXJzdC5cbiAgICAgICAgICAgIGlmIChJU09fODYwMV9SRUdFWC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZGF0ZSBidXQgYWxsb3dzIHRoZSBtb250aCBhbmQgZGF0ZSB0byBvdmVyZmxvdy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXG4gICAgICAgIHllYXI6IG51bWJlcixcbiAgICAgICAgbW9udGg6IG51bWJlcixcbiAgICAgICAgZGF0ZTogbnVtYmVyLFxuICAgICAgICBob3VyczogbnVtYmVyID0gMCxcbiAgICAgICAgbWludXRlczogbnVtYmVyID0gMCxcbiAgICAgICAgc2Vjb25kczogbnVtYmVyID0gMFxuICAgICk6IERhdGUge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpO1xuXG4gICAgICAgIGlmICh5ZWFyID49IDAgJiYgeWVhciA8IDEwMCkge1xuICAgICAgICAgICAgcmVzdWx0LnNldEZ1bGxZZWFyKHRoaXMuZ2V0WWVhcihyZXN1bHQpIC0gMTkwMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdHJpcCBvdXQgdW5pY29kZSBMVFIgYW5kIFJUTCBjaGFyYWN0ZXJzLiBFZGdlIGFuZCBJRSBpbnNlcnQgdGhlc2UgaW50byBmb3JtYXR0ZWQgZGF0ZXMgd2hpbGVcbiAgICAgKiBvdGhlciBicm93c2VycyBkbyBub3QuIFdlIHJlbW92ZSB0aGVtIHRvIG1ha2Ugb3V0cHV0IGNvbnNpc3RlbnQgYW5kIGJlY2F1c2UgdGhleSBpbnRlcmZlcmUgd2l0aFxuICAgICAqIGRhdGUgcGFyc2luZy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcdTIwMGVcXHUyMDBmXS9nLCAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBjb252ZXJ0aW5nIERhdGUgb2JqZWN0IHRvIHN0cmluZywgamF2YXNjcmlwdCBidWlsdC1pbiBmdW5jdGlvbnMgbWF5IHJldHVybiB3cm9uZ1xuICAgICAqIHJlc3VsdHMgYmVjYXVzZSBpdCBhcHBsaWVzIGl0cyBpbnRlcm5hbCBEU1QgcnVsZXMuIFRoZSBEU1QgcnVsZXMgYXJvdW5kIHRoZSB3b3JsZCBjaGFuZ2VcbiAgICAgKiB2ZXJ5IGZyZXF1ZW50bHksIGFuZCB0aGUgY3VycmVudCB2YWxpZCBydWxlIGlzIG5vdCBhbHdheXMgdmFsaWQgaW4gcHJldmlvdXMgeWVhcnMgdGhvdWdoLlxuICAgICAqIFdlIHdvcmsgYXJvdW5kIHRoaXMgcHJvYmxlbSBidWlsZGluZyBhIG5ldyBEYXRlIG9iamVjdCB3aGljaCBoYXMgaXRzIGludGVybmFsIFVUQ1xuICAgICAqIHJlcHJlc2VudGF0aW9uIHdpdGggdGhlIGxvY2FsIGRhdGUgYW5kIHRpbWUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZm9ybWF0KGR0ZjogSW50bC5EYXRlVGltZUZvcm1hdCwgZGF0ZTogRGF0ZSkge1xuICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoXG4gICAgICAgICAgICBEYXRlLlVUQyhcbiAgICAgICAgICAgICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0SG91cnMoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldFNlY29uZHMoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBkdGYuZm9ybWF0KGQpO1xuICAgIH1cbn1cbiJdfQ==