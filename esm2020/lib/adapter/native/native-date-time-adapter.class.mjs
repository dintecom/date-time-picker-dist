import { Inject, Injectable, Optional } from '@angular/core';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE } from '../date-time-adapter.class';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
// TODO(mmalerba): Remove when we no longer support safari 9.
/** Whether the browser supports the Intl API. */
let SUPPORTS_INTL_API;
// We need a try/catch around the reference to `Intl`, because accessing it in some cases can
// cause IE to throw. These cases are tied to particular versions of Windows and can happen if
// the consumer is providing a polyfilled `Map`. See:
// https://github.com/Microsoft/ChakraCore/issues/3189
// https://github.com/angular/components/issues/15687
try {
    SUPPORTS_INTL_API = typeof Intl !== 'undefined';
}
catch {
    SUPPORTS_INTL_API = false;
}
/** The default month names to use if Intl API is not available. */
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
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
/** The default date names to use if Intl API is not available. */
const DEFAULT_DATE_NAMES = range(31, i => String(i + 1));
/** The default day of the week names to use if Intl API is not available. */
const DEFAULT_DAY_OF_WEEK_NAMES = {
    long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 */
const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
export class NativeDateTimeAdapter extends DateTimeAdapter {
    constructor(owlDateTimeLocale, platform) {
        super();
        /**
         * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
         * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
         * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
         * will produce `'8/13/1800'`.
         *
         * TODO(mmalerba): drop this variable. It's not being used in the code right now. We're now
         * getting the string representation of a Date object from its utc representation. We're keeping
         * it here for sometime, just for precaution, in case we decide to revert some of these changes
         * though.
         */
        this.useUtcForDisplay = true;
        super.setLocale(owlDateTimeLocale);
        // IE does its own time zone correction, so we disable this on IE.
        this.useUtcForDisplay = !platform.TRIDENT;
        this._clampDate = platform.TRIDENT || platform.EDGE;
    }
    getYear(date) {
        return date.getFullYear();
    }
    getMonth(date) {
        return date.getMonth();
    }
    getDate(date) {
        return date.getDate();
    }
    getDayOfWeek(date) {
        return date.getDay();
    }
    getMonthNames(style) {
        if (SUPPORTS_INTL_API) {
            const dtf = new Intl.DateTimeFormat(this.locale, {
                month: style,
                timeZone: 'utc'
            });
            return range(12, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1))));
        }
        return DEFAULT_MONTH_NAMES[style];
    }
    getDateNames() {
        if (SUPPORTS_INTL_API) {
            const dtf = new Intl.DateTimeFormat(this.locale, {
                day: 'numeric',
                timeZone: 'utc'
            });
            return range(31, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DATE_NAMES;
    }
    getDayOfWeekNames(style) {
        if (SUPPORTS_INTL_API) {
            const dtf = new Intl.DateTimeFormat(this.locale, {
                weekday: style,
                timeZone: 'utc'
            });
            return range(7, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    }
    getYearName(date) {
        if (SUPPORTS_INTL_API) {
            const dtf = new Intl.DateTimeFormat(this.locale, {
                year: 'numeric',
                timeZone: 'utc'
            });
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return String(this.getYear(date));
    }
    getFirstDayOfWeek() {
        return getLocaleFirstDayOfWeek(this.locale);
    }
    getNumDaysInMonth(date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    }
    getHours(date) {
        return date.getHours();
    }
    getMinutes(date) {
        return date.getMinutes();
    }
    getSeconds(date) {
        return date.getSeconds();
    }
    getMilliseconds(date) {
        return date.getMilliseconds();
    }
    getTime(date) {
        return date.getTime();
    }
    clone(date) {
        return new Date(date.getTime());
    }
    createDate(year, month, date, hours = 0, minutes = 0, seconds = 0, ms = 0) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
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
        if (ms < 0 || ms > 999) {
            throw Error(`Invalid milliseconds "${ms}". Milliseconds has to be between 0 and 999.`);
        }
        const result = this._createDateWithOverflow(year, month, date, hours, minutes, seconds, ms);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        // For example, createDate(2017, 1, 31) would try to create a date 2017/02/31 which is invalid
        if (result.getMonth() !== month) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    now() {
        return new Date();
    }
    parse(value) {
        // We have no way using the native JS Date to set the parse format or locale, so we ignore these
        // parameters.
        if (typeof value === 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    }
    format(date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('NativeDateAdapter: Cannot format invalid date.');
        }
        if (SUPPORTS_INTL_API) {
            // On IE and Edge the i18n API will throw a hard error that can crash the entire app
            // if we attempt to format a date whose year is less than 1 or greater than 9999.
            if (this._clampDate && (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
                date = this.clone(date);
                date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
            }
            displayFormat = { ...displayFormat, timeZone: 'utc' };
            const dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    }
    addCalendarYears(date, years) {
        return this.addCalendarMonths(date, years * 12);
    }
    addCalendarMonths(date, months) {
        let newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date), this.getMilliseconds(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) !== (((this.getMonth(date) + months) % 12) + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0, this.getHours(newDate), this.getMinutes(newDate), this.getSeconds(newDate), this.getMilliseconds(newDate));
        }
        return newDate;
    }
    addCalendarDays(date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days, this.getHours(date), this.getMinutes(date), this.getSeconds(date), this.getMilliseconds(date));
    }
    addTimerHours(date, hours) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date) + hours, this.getMinutes(date), this.getSeconds(date), this.getMilliseconds(date));
    }
    addTimerMinutes(date, minutes) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date) + minutes, this.getSeconds(date), this.getMilliseconds(date));
    }
    addTimerSeconds(date, seconds) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date) + seconds, this.getMilliseconds(date));
    }
    addTimerMilliseconds(date, milliseconds) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date), this.getMilliseconds(date) + milliseconds);
    }
    toIso8601(date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    }
    isDateInstance(obj) {
        return obj instanceof Date;
    }
    isValid(date) {
        return date && !isNaN(date.getTime());
    }
    invalid() {
        return new Date(NaN);
    }
    differenceInCalendarDays(dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            const dateLeftStartOfDay = this.createDate(this.getYear(dateLeft), this.getMonth(dateLeft), this.getDate(dateLeft));
            const dateRightStartOfDay = this.createDate(this.getYear(dateRight), this.getMonth(dateRight), this.getDate(dateRight));
            const timeStampLeft = this.getTime(dateLeftStartOfDay) -
                dateLeftStartOfDay.getTimezoneOffset() * this.milliseondsInMinute;
            const timeStampRight = this.getTime(dateRightStartOfDay) -
                dateRightStartOfDay.getTimezoneOffset() * this.milliseondsInMinute;
            return Math.round((timeStampLeft - timeStampRight) / this.millisecondsInDay);
        }
        else {
            return null;
        }
    }
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     */
    deserialize(value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                const date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return super.deserialize(value);
    }
    /** Creates a date but allows the month and date to overflow. */
    _createDateWithOverflow(year, month, date, hours = 0, minutes = 0, seconds = 0, ms = 0) {
        const result = new Date(year, month, date, hours, minutes, seconds, ms);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    }
    /**
     * Pads a number to make it two digits.
     * @param n The number to pad.
     * @returns The padded number.
     */
    _2digit(n) {
        return ('00' + n).slice(-2);
    }
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param str The string to strip direction characters from.
     * @returns The stripped string.
     */
    _stripDirectionalityCharacters(str) {
        return str.replace(/[\u200e\u200f]/g, '');
    }
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     * @param dtf Intl.DateTimeFormat object, containg the desired string format. It must have
     *    timeZone set to 'utc' to work fine.
     * @param date Date from which we want to get the string representation according to dtf
     * @returns A Date object with its UTC representation based on the passed in date info
     */
    _format(dtf, date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        return dtf.format(d);
    }
}
NativeDateTimeAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: NativeDateTimeAdapter, deps: [{ token: OWL_DATE_TIME_LOCALE, optional: true }, { token: i1.Platform }], target: i0.ɵɵFactoryTarget.Injectable });
NativeDateTimeAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: NativeDateTimeAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: NativeDateTimeAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [OWL_DATE_TIME_LOCALE]
                }] }, { type: i1.Platform }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvYWRhcHRlci9uYXRpdmUvbmF0aXZlLWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQUUxRCw2REFBNkQ7QUFDN0QsaURBQWlEO0FBQ2pELElBQUksaUJBQTBCLENBQUM7QUFFL0IsNkZBQTZGO0FBQzdGLDhGQUE4RjtBQUM5RixxREFBcUQ7QUFDckQsc0RBQXNEO0FBQ3RELHFEQUFxRDtBQUNyRCxJQUFJO0lBQ0YsaUJBQWlCLEdBQUcsT0FBTyxJQUFJLEtBQUssV0FBVyxDQUFDO0NBQ2pEO0FBQUMsTUFBTTtJQUNOLGlCQUFpQixHQUFHLEtBQUssQ0FBQztDQUMzQjtBQUVELG1FQUFtRTtBQUNuRSxNQUFNLG1CQUFtQixHQUFHO0lBQzFCLElBQUksRUFBRTtRQUNKLFNBQVM7UUFDVCxVQUFVO1FBQ1YsT0FBTztRQUNQLE9BQU87UUFDUCxLQUFLO1FBQ0wsTUFBTTtRQUNOLE1BQU07UUFDTixRQUFRO1FBQ1IsV0FBVztRQUNYLFNBQVM7UUFDVCxVQUFVO1FBQ1YsVUFBVTtLQUNYO0lBQ0QsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7SUFDM0Ys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QUcsQ0FDTixJQUFJLENBQUMsV0FBVyxFQUFFLEVBQ2xCLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDZixJQUFJLENBQUMsT0FBTyxFQUFFLEVBQ2QsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUNqQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQ3ZCLENBQ0YsQ0FBQztRQUNGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDOztrSEFoYlUscUJBQXFCLGtCQWlCVixvQkFBb0I7c0hBakIvQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVTs7MEJBa0JOLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyLCBPV0xfREFURV9USU1FX0xPQ0FMRSB9IGZyb20gJy4uL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IGdldExvY2FsZUZpcnN0RGF5T2ZXZWVrIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLy8gVE9ETyhtbWFsZXJiYSk6IFJlbW92ZSB3aGVuIHdlIG5vIGxvbmdlciBzdXBwb3J0IHNhZmFyaSA5LlxuLyoqIFdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIEludGwgQVBJLiAqL1xubGV0IFNVUFBPUlRTX0lOVExfQVBJOiBib29sZWFuO1xuXG4vLyBXZSBuZWVkIGEgdHJ5L2NhdGNoIGFyb3VuZCB0aGUgcmVmZXJlbmNlIHRvIGBJbnRsYCwgYmVjYXVzZSBhY2Nlc3NpbmcgaXQgaW4gc29tZSBjYXNlcyBjYW5cbi8vIGNhdXNlIElFIHRvIHRocm93LiBUaGVzZSBjYXNlcyBhcmUgdGllZCB0byBwYXJ0aWN1bGFyIHZlcnNpb25zIG9mIFdpbmRvd3MgYW5kIGNhbiBoYXBwZW4gaWZcbi8vIHRoZSBjb25zdW1lciBpcyBwcm92aWRpbmcgYSBwb2x5ZmlsbGVkIGBNYXBgLiBTZWU6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0NoYWtyYUNvcmUvaXNzdWVzLzMxODlcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzE1Njg3XG50cnkge1xuICBTVVBQT1JUU19JTlRMX0FQSSA9IHR5cGVvZiBJbnRsICE9PSAndW5kZWZpbmVkJztcbn0gY2F0Y2gge1xuICBTVVBQT1JUU19JTlRMX0FQSSA9IGZhbHNlO1xufVxuXG4vKiogVGhlIGRlZmF1bHQgbW9udGggbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX01PTlRIX05BTUVTID0ge1xuICBsb25nOiBbXG4gICAgJ0phbnVhcnknLFxuICAgICdGZWJydWFyeScsXG4gICAgJ01hcmNoJyxcbiAgICAnQXByaWwnLFxuICAgICdNYXknLFxuICAgICdKdW5lJyxcbiAgICAnSnVseScsXG4gICAgJ0F1Z3VzdCcsXG4gICAgJ1NlcHRlbWJlcicsXG4gICAgJ09jdG9iZXInLFxuICAgICdOb3ZlbWJlcicsXG4gICAgJ0RlY2VtYmVyJ1xuICBdLFxuICBzaG9ydDogWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddLFxuICBuYXJyb3c6IFsnSicsICdGJywgJ00nLCAnQScsICdNJywgJ0onLCAnSicsICdBJywgJ1MnLCAnTycsICdOJywgJ0QnXVxufTtcblxuLyoqIFRoZSBkZWZhdWx0IGRhdGUgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX0RBVEVfTkFNRVMgPSByYW5nZSgzMSwgaSA9PiBTdHJpbmcoaSArIDEpKTtcblxuLyoqIFRoZSBkZWZhdWx0IGRheSBvZiB0aGUgd2VlayBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cbmNvbnN0IERFRkFVTFRfREFZX09GX1dFRUtfTkFNRVMgPSB7XG4gIGxvbmc6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXSxcbiAgc2hvcnQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXG4gIG5hcnJvdzogWydTJywgJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJ11cbn07XG5cbi8qKlxuICogTWF0Y2hlcyBzdHJpbmdzIHRoYXQgaGF2ZSB0aGUgZm9ybSBvZiBhIHZhbGlkIFJGQyAzMzM5IHN0cmluZ1xuICogKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzMzM5KS4gTm90ZSB0aGF0IHRoZSBzdHJpbmcgbWF5IG5vdCBhY3R1YWxseSBiZSBhIHZhbGlkIGRhdGVcbiAqIGJlY2F1c2UgdGhlIHJlZ2V4IHdpbGwgbWF0Y2ggc3RyaW5ncyBhbiB3aXRoIG91dCBvZiBib3VuZHMgbW9udGgsIGRhdGUsIGV0Yy5cbiAqL1xuY29uc3QgSVNPXzg2MDFfUkVHRVggPVxuICAvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9KD86VFxcZHsyfTpcXGR7Mn06XFxkezJ9KD86XFwuXFxkKyk/KD86WnwoPzooPzpcXCt8LSlcXGR7Mn06XFxkezJ9KSk/KT8kLztcblxuLyoqIENyZWF0ZXMgYW4gYXJyYXkgYW5kIGZpbGxzIGl0IHdpdGggdmFsdWVzLiAqL1xuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcbiAgY29uc3QgdmFsdWVzQXJyYXkgPSBBcnJheShsZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xuICB9XG4gIHJldHVybiB2YWx1ZXNBcnJheTtcbn1cblxuLyoqIEFkYXB0cyB0aGUgbmF0aXZlIEpTIERhdGUgZm9yIHVzZSB3aXRoIGNkay1iYXNlZCBjb21wb25lbnRzIHRoYXQgd29yayB3aXRoIGRhdGVzLiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hdGl2ZURhdGVUaW1lQWRhcHRlciBleHRlbmRzIERhdGVUaW1lQWRhcHRlcjxEYXRlPiB7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHVzZSBgdGltZVpvbmU6ICd1dGMnYCB3aXRoIGBJbnRsLkRhdGVUaW1lRm9ybWF0YCB3aGVuIGZvcm1hdHRpbmcgZGF0ZXMuXG4gICAqIFdpdGhvdXQgdGhpcyBgSW50bC5EYXRlVGltZUZvcm1hdGAgc29tZXRpbWVzIGNob29zZXMgdGhlIHdyb25nIHRpbWVab25lLCB3aGljaCBjYW4gdGhyb3cgb2ZmXG4gICAqIHRoZSByZXN1bHQuIChlLmcuIGluIHRoZSBlbi1VUyBsb2NhbGUgYG5ldyBEYXRlKDE4MDAsIDcsIDE0KS50b0xvY2FsZURhdGVTdHJpbmcoKWBcbiAgICogd2lsbCBwcm9kdWNlIGAnOC8xMy8xODAwJ2AuXG4gICAqXG4gICAqIFRPRE8obW1hbGVyYmEpOiBkcm9wIHRoaXMgdmFyaWFibGUuIEl0J3Mgbm90IGJlaW5nIHVzZWQgaW4gdGhlIGNvZGUgcmlnaHQgbm93LiBXZSdyZSBub3dcbiAgICogZ2V0dGluZyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgRGF0ZSBvYmplY3QgZnJvbSBpdHMgdXRjIHJlcHJlc2VudGF0aW9uLiBXZSdyZSBrZWVwaW5nXG4gICAqIGl0IGhlcmUgZm9yIHNvbWV0aW1lLCBqdXN0IGZvciBwcmVjYXV0aW9uLCBpbiBjYXNlIHdlIGRlY2lkZSB0byByZXZlcnQgc29tZSBvZiB0aGVzZSBjaGFuZ2VzXG4gICAqIHRob3VnaC5cbiAgICovXG4gIHVzZVV0Y0ZvckRpc3BsYXkgPSB0cnVlO1xuICAvKiogV2hldGhlciB0byBjbGFtcCB0aGUgZGF0ZSBiZXR3ZWVuIDEgYW5kIDk5OTkgdG8gYXZvaWQgSUUgYW5kIEVkZ2UgZXJyb3JzLiAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9jbGFtcERhdGU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChPV0xfREFURV9USU1FX0xPQ0FMRSkgb3dsRGF0ZVRpbWVMb2NhbGU6IHN0cmluZyxcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm1cbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICBzdXBlci5zZXRMb2NhbGUob3dsRGF0ZVRpbWVMb2NhbGUpO1xuXG4gICAgLy8gSUUgZG9lcyBpdHMgb3duIHRpbWUgem9uZSBjb3JyZWN0aW9uLCBzbyB3ZSBkaXNhYmxlIHRoaXMgb24gSUUuXG4gICAgdGhpcy51c2VVdGNGb3JEaXNwbGF5ID0gIXBsYXRmb3JtLlRSSURFTlQ7XG4gICAgdGhpcy5fY2xhbXBEYXRlID0gcGxhdGZvcm0uVFJJREVOVCB8fCBwbGF0Zm9ybS5FREdFO1xuICB9XG5cbiAgZ2V0WWVhcihkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICB9XG5cbiAgZ2V0TW9udGgoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKTtcbiAgfVxuXG4gIGdldERhdGUoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpO1xuICB9XG5cbiAgZ2V0RGF5T2ZXZWVrKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiBkYXRlLmdldERheSgpO1xuICB9XG5cbiAgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIHtcbiAgICAgICAgbW9udGg6IHN0eWxlLFxuICAgICAgICB0aW1lWm9uZTogJ3V0YydcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJhbmdlKDEyLCBpID0+XG4gICAgICAgIHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHRoaXMuX2Zvcm1hdChkdGYsIG5ldyBEYXRlKDIwMTcsIGksIDEpKSlcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBERUZBVUxUX01PTlRIX05BTUVTW3N0eWxlXTtcbiAgfVxuXG4gIGdldERhdGVOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwge1xuICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgdGltZVpvbmU6ICd1dGMnXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByYW5nZSgzMSwgaSA9PlxuICAgICAgICB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBuZXcgRGF0ZSgyMDE3LCAwLCBpICsgMSkpKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIERFRkFVTFRfREFURV9OQU1FUztcbiAgfVxuXG4gIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwge1xuICAgICAgICB3ZWVrZGF5OiBzdHlsZSxcbiAgICAgICAgdGltZVpvbmU6ICd1dGMnXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByYW5nZSg3LCBpID0+XG4gICAgICAgIHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHRoaXMuX2Zvcm1hdChkdGYsIG5ldyBEYXRlKDIwMTcsIDAsIGkgKyAxKSkpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gREVGQVVMVF9EQVlfT0ZfV0VFS19OQU1FU1tzdHlsZV07XG4gIH1cblxuICBnZXRZZWFyTmFtZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7XG4gICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgdGltZVpvbmU6ICd1dGMnXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBkYXRlKSk7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcodGhpcy5nZXRZZWFyKGRhdGUpKTtcbiAgfVxuXG4gIGdldEZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGdldExvY2FsZUZpcnN0RGF5T2ZXZWVrKHRoaXMubG9jYWxlKTtcbiAgfVxuXG4gIGdldE51bURheXNJbk1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldERhdGUoXG4gICAgICB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KHRoaXMuZ2V0WWVhcihkYXRlKSwgdGhpcy5nZXRNb250aChkYXRlKSArIDEsIDApXG4gICAgKTtcbiAgfVxuXG4gIGdldEhvdXJzKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG4gIH1cblxuICBnZXRNaW51dGVzKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgfVxuXG4gIGdldFNlY29uZHMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpO1xuICB9XG5cbiAgZ2V0TWlsbGlzZWNvbmRzKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiBkYXRlLmdldE1pbGxpc2Vjb25kcygpO1xuICB9XG5cbiAgZ2V0VGltZShkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKCk7XG4gIH1cblxuICBjbG9uZShkYXRlOiBEYXRlKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKTtcbiAgfVxuXG4gIGNyZWF0ZURhdGUoXG4gICAgeWVhcjogbnVtYmVyLFxuICAgIG1vbnRoOiBudW1iZXIsXG4gICAgZGF0ZTogbnVtYmVyLFxuICAgIGhvdXJzID0gMCxcbiAgICBtaW51dGVzID0gMCxcbiAgICBzZWNvbmRzID0gMCxcbiAgICBtcyA9IDBcbiAgKTogRGF0ZSB7XG4gICAgLy8gQ2hlY2sgZm9yIGludmFsaWQgbW9udGggYW5kIGRhdGUgKGV4Y2VwdCB1cHBlciBib3VuZCBvbiBkYXRlIHdoaWNoIHdlIGhhdmUgdG8gY2hlY2sgYWZ0ZXJcbiAgICAvLyBjcmVhdGluZyB0aGUgRGF0ZSkuXG4gICAgaWYgKG1vbnRoIDwgMCB8fCBtb250aCA+IDExKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBtb250aCBpbmRleCBcIiR7bW9udGh9XCIuIE1vbnRoIGluZGV4IGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDExLmApO1xuICAgIH1cblxuICAgIGlmIChkYXRlIDwgMSkge1xuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYCk7XG4gICAgfVxuXG4gICAgaWYgKGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBob3VycyBcIiR7aG91cnN9XCIuIEhvdXJzIGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDIzLmApO1xuICAgIH1cblxuICAgIGlmIChtaW51dGVzIDwgMCB8fCBtaW51dGVzID4gNTkpIHtcbiAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIG1pbnV0ZXMgXCIke21pbnV0ZXN9XCIuIE1pbnV0ZXMgaGFzIHRvIGJldHdlZW4gMCBhbmQgNTkuYCk7XG4gICAgfVxuXG4gICAgaWYgKHNlY29uZHMgPCAwIHx8IHNlY29uZHMgPiA1OSkge1xuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgc2Vjb25kcyBcIiR7c2Vjb25kc31cIi4gU2Vjb25kcyBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCA1OS5gKTtcbiAgICB9XG5cbiAgICBpZiAobXMgPCAwIHx8IG1zID4gOTk5KSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBtaWxsaXNlY29uZHMgXCIke21zfVwiLiBNaWxsaXNlY29uZHMgaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgOTk5LmApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coeWVhciwgbW9udGgsIGRhdGUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtcyk7XG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgZGF0ZSB3YXNuJ3QgYWJvdmUgdGhlIHVwcGVyIGJvdW5kIGZvciB0aGUgbW9udGgsIGNhdXNpbmcgdGhlIG1vbnRoIHRvIG92ZXJmbG93XG4gICAgLy8gRm9yIGV4YW1wbGUsIGNyZWF0ZURhdGUoMjAxNywgMSwgMzEpIHdvdWxkIHRyeSB0byBjcmVhdGUgYSBkYXRlIDIwMTcvMDIvMzEgd2hpY2ggaXMgaW52YWxpZFxuICAgIGlmIChyZXN1bHQuZ2V0TW9udGgoKSAhPT0gbW9udGgpIHtcbiAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIgZm9yIG1vbnRoIHdpdGggaW5kZXggXCIke21vbnRofVwiLmApO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBub3coKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gIH1cblxuICBwYXJzZSh2YWx1ZTogYW55KTogRGF0ZSB8IG51bGwge1xuICAgIC8vIFdlIGhhdmUgbm8gd2F5IHVzaW5nIHRoZSBuYXRpdmUgSlMgRGF0ZSB0byBzZXQgdGhlIHBhcnNlIGZvcm1hdCBvciBsb2NhbGUsIHNvIHdlIGlnbm9yZSB0aGVzZVxuICAgIC8vIHBhcmFtZXRlcnMuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSA/IG5ldyBEYXRlKERhdGUucGFyc2UodmFsdWUpKSA6IG51bGw7XG4gIH1cblxuICBmb3JtYXQoZGF0ZTogRGF0ZSwgZGlzcGxheUZvcm1hdDogb2JqZWN0KTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ05hdGl2ZURhdGVBZGFwdGVyOiBDYW5ub3QgZm9ybWF0IGludmFsaWQgZGF0ZS4nKTtcbiAgICB9XG5cbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgIC8vIE9uIElFIGFuZCBFZGdlIHRoZSBpMThuIEFQSSB3aWxsIHRocm93IGEgaGFyZCBlcnJvciB0aGF0IGNhbiBjcmFzaCB0aGUgZW50aXJlIGFwcFxuICAgICAgLy8gaWYgd2UgYXR0ZW1wdCB0byBmb3JtYXQgYSBkYXRlIHdob3NlIHllYXIgaXMgbGVzcyB0aGFuIDEgb3IgZ3JlYXRlciB0aGFuIDk5OTkuXG4gICAgICBpZiAodGhpcy5fY2xhbXBEYXRlICYmIChkYXRlLmdldEZ1bGxZZWFyKCkgPCAxIHx8IGRhdGUuZ2V0RnVsbFllYXIoKSA+IDk5OTkpKSB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKE1hdGgubWF4KDEsIE1hdGgubWluKDk5OTksIGRhdGUuZ2V0RnVsbFllYXIoKSkpKTtcbiAgICAgIH1cblxuICAgICAgZGlzcGxheUZvcm1hdCA9IHsgLi4uZGlzcGxheUZvcm1hdCwgdGltZVpvbmU6ICd1dGMnIH07XG5cbiAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCBkaXNwbGF5Rm9ybWF0KTtcbiAgICAgIHJldHVybiB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBkYXRlKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhkYXRlLnRvRGF0ZVN0cmluZygpKTtcbiAgfVxuXG4gIGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogRGF0ZSwgeWVhcnM6IG51bWJlcik6IERhdGUge1xuICAgIHJldHVybiB0aGlzLmFkZENhbGVuZGFyTW9udGhzKGRhdGUsIHllYXJzICogMTIpO1xuICB9XG5cbiAgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogRGF0ZSwgbW9udGhzOiBudW1iZXIpOiBEYXRlIHtcbiAgICBsZXQgbmV3RGF0ZSA9IHRoaXMuX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXG4gICAgICB0aGlzLmdldFllYXIoZGF0ZSksXG4gICAgICB0aGlzLmdldE1vbnRoKGRhdGUpICsgbW9udGhzLFxuICAgICAgdGhpcy5nZXREYXRlKGRhdGUpLFxuICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TWludXRlcyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TWlsbGlzZWNvbmRzKGRhdGUpXG4gICAgKTtcblxuICAgIC8vIEl0J3MgcG9zc2libGUgdG8gd2luZCB1cCBpbiB0aGUgd3JvbmcgbW9udGggaWYgdGhlIG9yaWdpbmFsIG1vbnRoIGhhcyBtb3JlIGRheXMgdGhhbiB0aGUgbmV3XG4gICAgLy8gbW9udGguIEluIHRoaXMgY2FzZSB3ZSB3YW50IHRvIGdvIHRvIHRoZSBsYXN0IGRheSBvZiB0aGUgZGVzaXJlZCBtb250aC5cbiAgICAvLyBOb3RlOiB0aGUgYWRkaXRpb25hbCArIDEyICUgMTIgZW5zdXJlcyB3ZSBlbmQgdXAgd2l0aCBhIHBvc2l0aXZlIG51bWJlciwgc2luY2UgSlMgJSBkb2Vzbid0XG4gICAgLy8gZ3VhcmFudGVlIHRoaXMuXG4gICAgaWYgKHRoaXMuZ2V0TW9udGgobmV3RGF0ZSkgIT09ICgoKHRoaXMuZ2V0TW9udGgoZGF0ZSkgKyBtb250aHMpICUgMTIpICsgMTIpICUgMTIpIHtcbiAgICAgIG5ld0RhdGUgPSB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgICB0aGlzLmdldFllYXIobmV3RGF0ZSksXG4gICAgICAgIHRoaXMuZ2V0TW9udGgobmV3RGF0ZSksXG4gICAgICAgIDAsXG4gICAgICAgIHRoaXMuZ2V0SG91cnMobmV3RGF0ZSksXG4gICAgICAgIHRoaXMuZ2V0TWludXRlcyhuZXdEYXRlKSxcbiAgICAgICAgdGhpcy5nZXRTZWNvbmRzKG5ld0RhdGUpLFxuICAgICAgICB0aGlzLmdldE1pbGxpc2Vjb25kcyhuZXdEYXRlKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RGF0ZTtcbiAgfVxuXG4gIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSksXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSkgKyBkYXlzLFxuICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TWludXRlcyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TWlsbGlzZWNvbmRzKGRhdGUpXG4gICAgKTtcbiAgfVxuXG4gIGFkZFRpbWVySG91cnMoZGF0ZTogRGF0ZSwgaG91cnM6IG51bWJlcik6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxuICAgICAgdGhpcy5nZXRNb250aChkYXRlKSxcbiAgICAgIHRoaXMuZ2V0RGF0ZShkYXRlKSxcbiAgICAgIHRoaXMuZ2V0SG91cnMoZGF0ZSkgKyBob3VycyxcbiAgICAgIHRoaXMuZ2V0TWludXRlcyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TWlsbGlzZWNvbmRzKGRhdGUpXG4gICAgKTtcbiAgfVxuXG4gIGFkZFRpbWVyTWludXRlcyhkYXRlOiBEYXRlLCBtaW51dGVzOiBudW1iZXIpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSksXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSksXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLFxuICAgICAgdGhpcy5nZXRNaW51dGVzKGRhdGUpICsgbWludXRlcyxcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TWlsbGlzZWNvbmRzKGRhdGUpXG4gICAgKTtcbiAgfVxuXG4gIGFkZFRpbWVyU2Vjb25kcyhkYXRlOiBEYXRlLCBzZWNvbmRzOiBudW1iZXIpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSksXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSksXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLFxuICAgICAgdGhpcy5nZXRNaW51dGVzKGRhdGUpLFxuICAgICAgdGhpcy5nZXRTZWNvbmRzKGRhdGUpICsgc2Vjb25kcyxcbiAgICAgIHRoaXMuZ2V0TWlsbGlzZWNvbmRzKGRhdGUpXG4gICAgKTtcbiAgfVxuXG4gIGFkZFRpbWVyTWlsbGlzZWNvbmRzKGRhdGU6IERhdGUsIG1pbGxpc2Vjb25kczogbnVtYmVyKTogRGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXG4gICAgICB0aGlzLmdldFllYXIoZGF0ZSksXG4gICAgICB0aGlzLmdldE1vbnRoKGRhdGUpLFxuICAgICAgdGhpcy5nZXREYXRlKGRhdGUpLFxuICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TWludXRlcyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TWlsbGlzZWNvbmRzKGRhdGUpICsgbWlsbGlzZWNvbmRzXG4gICAgKTtcbiAgfVxuXG4gIHRvSXNvODYwMShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gW1xuICAgICAgZGF0ZS5nZXRVVENGdWxsWWVhcigpLFxuICAgICAgdGhpcy5fMmRpZ2l0KGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpLFxuICAgICAgdGhpcy5fMmRpZ2l0KGRhdGUuZ2V0VVRDRGF0ZSgpKVxuICAgIF0uam9pbignLScpO1xuICB9XG5cbiAgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRGF0ZTtcbiAgfVxuXG4gIGlzVmFsaWQoZGF0ZTogRGF0ZSkge1xuICAgIHJldHVybiBkYXRlICYmICFpc05hTihkYXRlLmdldFRpbWUoKSk7XG4gIH1cblxuICBpbnZhbGlkKCk6IERhdGUge1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG5cbiAgcHVibGljIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlTGVmdDogRGF0ZSwgZGF0ZVJpZ2h0OiBEYXRlKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5pc1ZhbGlkKGRhdGVMZWZ0KSAmJiB0aGlzLmlzVmFsaWQoZGF0ZVJpZ2h0KSkge1xuICAgICAgY29uc3QgZGF0ZUxlZnRTdGFydE9mRGF5ID0gdGhpcy5jcmVhdGVEYXRlKFxuICAgICAgICB0aGlzLmdldFllYXIoZGF0ZUxlZnQpLFxuICAgICAgICB0aGlzLmdldE1vbnRoKGRhdGVMZWZ0KSxcbiAgICAgICAgdGhpcy5nZXREYXRlKGRhdGVMZWZ0KVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRhdGVSaWdodFN0YXJ0T2ZEYXkgPSB0aGlzLmNyZWF0ZURhdGUoXG4gICAgICAgIHRoaXMuZ2V0WWVhcihkYXRlUmlnaHQpLFxuICAgICAgICB0aGlzLmdldE1vbnRoKGRhdGVSaWdodCksXG4gICAgICAgIHRoaXMuZ2V0RGF0ZShkYXRlUmlnaHQpXG4gICAgICApO1xuXG4gICAgICBjb25zdCB0aW1lU3RhbXBMZWZ0ID1cbiAgICAgICAgdGhpcy5nZXRUaW1lKGRhdGVMZWZ0U3RhcnRPZkRheSkgLVxuICAgICAgICBkYXRlTGVmdFN0YXJ0T2ZEYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIHRoaXMubWlsbGlzZW9uZHNJbk1pbnV0ZTtcbiAgICAgIGNvbnN0IHRpbWVTdGFtcFJpZ2h0ID1cbiAgICAgICAgdGhpcy5nZXRUaW1lKGRhdGVSaWdodFN0YXJ0T2ZEYXkpIC1cbiAgICAgICAgZGF0ZVJpZ2h0U3RhcnRPZkRheS5nZXRUaW1lem9uZU9mZnNldCgpICogdGhpcy5taWxsaXNlb25kc0luTWludXRlO1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoKHRpbWVTdGFtcExlZnQgLSB0aW1lU3RhbXBSaWdodCkgLyB0aGlzLm1pbGxpc2Vjb25kc0luRGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGdpdmVuIHZhbHVlIGlmIGdpdmVuIGEgdmFsaWQgRGF0ZSBvciBudWxsLiBEZXNlcmlhbGl6ZXMgdmFsaWQgSVNPIDg2MDEgc3RyaW5nc1xuICAgKiAoaHR0cHM6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzMzMzkudHh0KSBpbnRvIHZhbGlkIERhdGVzIGFuZCBlbXB0eSBzdHJpbmcgaW50byBudWxsLiBSZXR1cm5zIGFuXG4gICAqIGludmFsaWQgZGF0ZSBmb3IgYWxsIG90aGVyIHZhbHVlcy5cbiAgICovXG4gIG92ZXJyaWRlIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBEYXRlIHwgbnVsbCB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICAvLyBUaGUgYERhdGVgIGNvbnN0cnVjdG9yIGFjY2VwdHMgZm9ybWF0cyBvdGhlciB0aGFuIElTTyA4NjAxLCBzbyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGVcbiAgICAgIC8vIHN0cmluZyBpcyB0aGUgcmlnaHQgZm9ybWF0IGZpcnN0LlxuICAgICAgaWYgKElTT184NjAxX1JFR0VYLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3VwZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgYSBkYXRlIGJ1dCBhbGxvd3MgdGhlIG1vbnRoIGFuZCBkYXRlIHRvIG92ZXJmbG93LiAqL1xuICBwcml2YXRlIF9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgIHllYXI6IG51bWJlcixcbiAgICBtb250aDogbnVtYmVyLFxuICAgIGRhdGU6IG51bWJlcixcbiAgICBob3VycyA9IDAsXG4gICAgbWludXRlcyA9IDAsXG4gICAgc2Vjb25kcyA9IDAsXG4gICAgbXMgPSAwXG4gICkge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlLCBob3VycywgbWludXRlcywgc2Vjb25kcywgbXMpO1xuXG4gICAgLy8gV2UgbmVlZCB0byBjb3JyZWN0IGZvciB0aGUgZmFjdCB0aGF0IEpTIG5hdGl2ZSBEYXRlIHRyZWF0cyB5ZWFycyBpbiByYW5nZSBbMCwgOTldIGFzXG4gICAgLy8gYWJicmV2aWF0aW9ucyBmb3IgMTl4eC5cbiAgICBpZiAoeWVhciA+PSAwICYmIHllYXIgPCAxMDApIHtcbiAgICAgIHJlc3VsdC5zZXRGdWxsWWVhcih0aGlzLmdldFllYXIocmVzdWx0KSAtIDE5MDApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFBhZHMgYSBudW1iZXIgdG8gbWFrZSBpdCB0d28gZGlnaXRzLlxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIHRvIHBhZC5cbiAgICogQHJldHVybnMgVGhlIHBhZGRlZCBudW1iZXIuXG4gICAqL1xuICBwcml2YXRlIF8yZGlnaXQobjogbnVtYmVyKSB7XG4gICAgcmV0dXJuICgnMDAnICsgbikuc2xpY2UoLTIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0cmlwIG91dCB1bmljb2RlIExUUiBhbmQgUlRMIGNoYXJhY3RlcnMuIEVkZ2UgYW5kIElFIGluc2VydCB0aGVzZSBpbnRvIGZvcm1hdHRlZCBkYXRlcyB3aGlsZVxuICAgKiBvdGhlciBicm93c2VycyBkbyBub3QuIFdlIHJlbW92ZSB0aGVtIHRvIG1ha2Ugb3V0cHV0IGNvbnNpc3RlbnQgYW5kIGJlY2F1c2UgdGhleSBpbnRlcmZlcmUgd2l0aFxuICAgKiBkYXRlIHBhcnNpbmcuXG4gICAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBzdHJpcCBkaXJlY3Rpb24gY2hhcmFjdGVycyBmcm9tLlxuICAgKiBAcmV0dXJucyBUaGUgc3RyaXBwZWQgc3RyaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoc3RyOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXHUyMDBlXFx1MjAwZl0vZywgJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gY29udmVydGluZyBEYXRlIG9iamVjdCB0byBzdHJpbmcsIGphdmFzY3JpcHQgYnVpbHQtaW4gZnVuY3Rpb25zIG1heSByZXR1cm4gd3JvbmdcbiAgICogcmVzdWx0cyBiZWNhdXNlIGl0IGFwcGxpZXMgaXRzIGludGVybmFsIERTVCBydWxlcy4gVGhlIERTVCBydWxlcyBhcm91bmQgdGhlIHdvcmxkIGNoYW5nZVxuICAgKiB2ZXJ5IGZyZXF1ZW50bHksIGFuZCB0aGUgY3VycmVudCB2YWxpZCBydWxlIGlzIG5vdCBhbHdheXMgdmFsaWQgaW4gcHJldmlvdXMgeWVhcnMgdGhvdWdoLlxuICAgKiBXZSB3b3JrIGFyb3VuZCB0aGlzIHByb2JsZW0gYnVpbGRpbmcgYSBuZXcgRGF0ZSBvYmplY3Qgd2hpY2ggaGFzIGl0cyBpbnRlcm5hbCBVVENcbiAgICogcmVwcmVzZW50YXRpb24gd2l0aCB0aGUgbG9jYWwgZGF0ZSBhbmQgdGltZS5cbiAgICogQHBhcmFtIGR0ZiBJbnRsLkRhdGVUaW1lRm9ybWF0IG9iamVjdCwgY29udGFpbmcgdGhlIGRlc2lyZWQgc3RyaW5nIGZvcm1hdC4gSXQgbXVzdCBoYXZlXG4gICAqICAgIHRpbWVab25lIHNldCB0byAndXRjJyB0byB3b3JrIGZpbmUuXG4gICAqIEBwYXJhbSBkYXRlIERhdGUgZnJvbSB3aGljaCB3ZSB3YW50IHRvIGdldCB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIGFjY29yZGluZyB0byBkdGZcbiAgICogQHJldHVybnMgQSBEYXRlIG9iamVjdCB3aXRoIGl0cyBVVEMgcmVwcmVzZW50YXRpb24gYmFzZWQgb24gdGhlIHBhc3NlZCBpbiBkYXRlIGluZm9cbiAgICovXG4gIHByaXZhdGUgX2Zvcm1hdChkdGY6IEludGwuRGF0ZVRpbWVGb3JtYXQsIGRhdGU6IERhdGUpIHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoXG4gICAgICBEYXRlLlVUQyhcbiAgICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgIGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICBkYXRlLmdldEhvdXJzKCksXG4gICAgICAgIGRhdGUuZ2V0TWludXRlcygpLFxuICAgICAgICBkYXRlLmdldFNlY29uZHMoKSxcbiAgICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxuICAgICAgKVxuICAgICk7XG4gICAgcmV0dXJuIGR0Zi5mb3JtYXQoZCk7XG4gIH1cbn1cbiJdfQ==