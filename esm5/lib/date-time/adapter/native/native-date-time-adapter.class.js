/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DEFAULT_MONTH_NAMES = {
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
var DEFAULT_DAY_OF_WEEK_NAMES = {
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
var ɵ0 = /**
 * @param {?} i
 * @return {?}
 */
function (i) { return String(i + 1); };
/**
 * The default date names to use if Intl API is not available.
 * @type {?}
 */
var DEFAULT_DATE_NAMES = range(31, (ɵ0));
/**
 * Whether the browser supports the Intl API.
 * @type {?}
 */
var SUPPORTS_INTL_API = typeof Intl !== 'undefined';
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 * @type {?}
 */
var ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:[+\-]\d{2}:\d{2}))?)?$/;
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
var NativeDateTimeAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(NativeDateTimeAdapter, _super);
    function NativeDateTimeAdapter(owlDateTimeLocale, platform) {
        var _this = _super.call(this) || this;
        _this.owlDateTimeLocale = owlDateTimeLocale;
        _super.prototype.setLocale.call(_this, owlDateTimeLocale);
        // IE does its own time zone correction, so we disable this on IE.
        _this.useUtcForDisplay = !platform.TRIDENT;
        _this._clampDate = platform.TRIDENT || platform.EDGE;
        return _this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getFullYear();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getDay = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDay();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDate();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getHours = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getHours();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getMinutes = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMinutes();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getSeconds = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getSeconds();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getTime();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var lastDateOfMonth = this.createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0);
        return this.getDate(lastDateOfMonth);
    };
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.differenceInCalendarDays = /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            /** @type {?} */
            var dateLeftStartOfDay = this.createDate(this.getYear(dateLeft), this.getMonth(dateLeft), this.getDate(dateLeft));
            /** @type {?} */
            var dateRightStartOfDay = this.createDate(this.getYear(dateRight), this.getMonth(dateRight), this.getDate(dateRight));
            /** @type {?} */
            var timeStampLeft = this.getTime(dateLeftStartOfDay) -
                dateLeftStartOfDay.getTimezoneOffset() *
                    this.milliseondsInMinute;
            /** @type {?} */
            var timeStampRight = this.getTime(dateRightStartOfDay) -
                dateRightStartOfDay.getTimezoneOffset() *
                    this.milliseondsInMinute;
            return Math.round((timeStampLeft - timeStampRight) / this.millisecondsInDay);
        }
        else {
            return null;
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf = new Intl.DateTimeFormat(this.getLocale(), {
                year: 'numeric',
                timeZone: 'utc'
            });
            return this.stripDirectionalityCharacters(this._format(dtf, date));
        }
        return String(this.getYear(date));
    };
    /**
     * @param {?} style
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_1 = new Intl.DateTimeFormat(this.getLocale(), {
                month: style,
                timeZone: 'utc'
            });
            return range(12, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) {
                return _this.stripDirectionalityCharacters(_this._format(dtf_1, new Date(2017, i, 1)));
            }));
        }
        return DEFAULT_MONTH_NAMES[style];
    };
    /**
     * @param {?} style
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_2 = new Intl.DateTimeFormat(this.getLocale(), {
                weekday: style,
                timeZone: 'utc'
            });
            return range(7, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) {
                return _this.stripDirectionalityCharacters(_this._format(dtf_2, new Date(2017, 0, i + 1)));
            }));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    };
    /**
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_3 = new Intl.DateTimeFormat(this.getLocale(), {
                day: 'numeric',
                timeZone: 'utc'
            });
            return range(31, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) {
                return _this.stripDirectionalityCharacters(_this._format(dtf_3, new Date(2017, 0, i + 1)));
            }));
        }
        return DEFAULT_DATE_NAMES;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.toIso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.toISOString();
    };
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.isEqual = /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            return dateLeft.getTime() === dateRight.getTime();
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.isSameDay = /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            /** @type {?} */
            var dateLeftStartOfDay = this.clone(dateLeft);
            /** @type {?} */
            var dateRightStartOfDay = this.clone(dateRight);
            dateLeftStartOfDay.setHours(0, 0, 0, 0);
            dateRightStartOfDay.setHours(0, 0, 0, 0);
            return (dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime());
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date && !isNaN(date.getTime());
    };
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.isValidFormat = /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    function (value, parseFormat) {
        var e_1, _a;
        if (SUPPORTS_INTL_API) {
            parseFormat = tslib_1.__assign({}, parseFormat, { timeZone: 'utc' });
            /** @type {?} */
            var dtf = new Intl.DateTimeFormat(this.getLocale(), parseFormat);
            /** @type {?} */
            var parts = dtf.formatToParts();
            /** @type {?} */
            var regex = '^';
            try {
                for (var parts_1 = tslib_1.__values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
                    var part = parts_1_1.value;
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (parts_1_1 && !parts_1_1.done && (_a = parts_1.return)) _a.call(parts_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            regex += '$';
            return (new RegExp(regex)).test(value);
        }
        else {
            /** @type {?} */
            var date = new Date(value);
            return date.getTime() === date.getTime();
        }
    };
    /**
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.invalid = /**
     * @return {?}
     */
    function () {
        return new Date(NaN);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.isDateInstance = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj instanceof Date;
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        return this.addCalendarMonths(date, amount * 12);
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        /** @type {?} */
        var result = this.clone(date);
        amount = Number(amount);
        /** @type {?} */
        var desiredMonth = result.getMonth() + amount;
        /** @type {?} */
        var dateWithDesiredMonth = new Date(0);
        dateWithDesiredMonth.setFullYear(result.getFullYear(), desiredMonth, 1);
        dateWithDesiredMonth.setHours(0, 0, 0, 0);
        /** @type {?} */
        var daysInMonth = this.getNumDaysInMonth(dateWithDesiredMonth);
        // Set the last day of the new month
        // if the original date was the last day of the longer month
        result.setMonth(desiredMonth, Math.min(daysInMonth, result.getDate()));
        return result;
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        /** @type {?} */
        var result = this.clone(date);
        amount = Number(amount);
        result.setDate(result.getDate() + amount);
        return result;
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.setHours = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        /** @type {?} */
        var result = this.clone(date);
        result.setHours(amount);
        return result;
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.setMinutes = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        /** @type {?} */
        var result = this.clone(date);
        result.setMinutes(amount);
        return result;
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.setSeconds = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        /** @type {?} */
        var result = this.clone(date);
        result.setSeconds(amount);
        return result;
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @param {?=} seconds
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @param {?=} seconds
     * @return {?}
     */
    function (year, month, date, hours, minutes, seconds) {
        if (hours === void 0) { hours = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        if (hours < 0 || hours > 23) {
            throw Error("Invalid hours \"" + hours + "\". Hours has to be between 0 and 23.");
        }
        if (minutes < 0 || minutes > 59) {
            throw Error("Invalid minutes \"" + minutes + "\". Minutes has to between 0 and 59.");
        }
        if (seconds < 0 || seconds > 59) {
            throw Error("Invalid seconds \"" + seconds + "\". Seconds has to be between 0 and 59.");
        }
        /** @type {?} */
        var result = this.createDateWithOverflow(year, month, date, hours, minutes, seconds);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        // For example, createDate(2017, 1, 31) would try to create a date 2017/02/31 which is invalid
        if (result.getMonth() !== month) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
    };
    /**
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.now = /**
     * @return {?}
     */
    function () {
        return new Date();
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('JSNativeDate: Cannot format invalid date.');
        }
        if (SUPPORTS_INTL_API) {
            if (this._clampDate &&
                (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
                date = this.clone(date);
                date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
            }
            displayFormat = tslib_1.__assign({}, displayFormat, { timeZone: 'utc' });
            /** @type {?} */
            var dtf = new Intl.DateTimeFormat(this.getLocale(), displayFormat);
            return this.stripDirectionalityCharacters(this._format(dtf, date));
        }
        return this.stripDirectionalityCharacters(date.toDateString());
    };
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.parse = /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    function (value, parseFormat) {
        // There is no way using the native JS Date to set the parse format or locale
        if (typeof value === 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    };
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     */
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.deserialize = /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                /** @type {?} */
                var date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return _super.prototype.deserialize.call(this, value);
    };
    /**
     * Creates a date but allows the month and date to overflow.
     */
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
    NativeDateTimeAdapter.prototype.createDateWithOverflow = /**
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
    function (year, month, date, hours, minutes, seconds) {
        if (hours === void 0) { hours = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        /** @type {?} */
        var result = new Date(year, month, date, hours, minutes, seconds);
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     */
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @private
     * @param {?} str
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.stripDirectionalityCharacters = /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.replace(/[\u200e\u200f]/g, '');
    };
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     */
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
    NativeDateTimeAdapter.prototype._format = /**
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
    function (dtf, date) {
        /** @type {?} */
        var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        return dtf.format(d);
    };
    NativeDateTimeAdapter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NativeDateTimeAdapter.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_LOCALE,] }] },
        { type: Platform }
    ]; };
    return NativeDateTimeAdapter;
}(DateTimeAdapter));
export { NativeDateTimeAdapter };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2FkYXB0ZXIvbmF0aXZlL25hdGl2ZS1kYXRlLXRpbWUtYWRhcHRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUNILGVBQWUsRUFDZixvQkFBb0IsRUFDdkIsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7SUFHOUIsbUJBQW1CLEdBQUc7SUFDeEIsSUFBSSxFQUFFO1FBQ0YsU0FBUztRQUNULFVBQVU7UUFDVixPQUFPO1FBQ1AsT0FBTztRQUNQLEtBQUs7UUFDTCxNQUFNO1FBQ04sTUFBTTtRQUNOLFFBQVE7UUFDUixXQUFXO1FBQ1gsU0FBUztRQUNULFVBQVU7UUFDVixVQUFVO0tBQ2I7SUFDRCxLQUFLLEVBQUU7UUFDSCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7S0FDUjtJQUNELE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0NBQ3ZFOzs7OztJQUdLLHlCQUF5QixHQUFHO0lBQzlCLElBQUksRUFBRTtRQUNGLFFBQVE7UUFDUixRQUFRO1FBQ1IsU0FBUztRQUNULFdBQVc7UUFDWCxV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SUFHdEIsa0RBRWlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBuYXRpdmUtZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3NcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICAgIERhdGVUaW1lQWRhcHRlcixcbiAgICBPV0xfREFURV9USU1FX0xPQ0FMRVxufSBmcm9tICcuLi9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5cbi8qKiBUaGUgZGVmYXVsdCBtb250aCBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cbmNvbnN0IERFRkFVTFRfTU9OVEhfTkFNRVMgPSB7XG4gICAgbG9uZzogW1xuICAgICAgICAnSmFudWFyeScsXG4gICAgICAgICdGZWJydWFyeScsXG4gICAgICAgICdNYXJjaCcsXG4gICAgICAgICdBcHJpbCcsXG4gICAgICAgICdNYXknLFxuICAgICAgICAnSnVuZScsXG4gICAgICAgICdKdWx5JyxcbiAgICAgICAgJ0F1Z3VzdCcsXG4gICAgICAgICdTZXB0ZW1iZXInLFxuICAgICAgICAnT2N0b2JlcicsXG4gICAgICAgICdOb3ZlbWJlcicsXG4gICAgICAgICdEZWNlbWJlcidcbiAgICBdLFxuICAgIHNob3J0OiBbXG4gICAgICAgICdKYW4nLFxuICAgICAgICAnRmViJyxcbiAgICAgICAgJ01hcicsXG4gICAgICAgICdBcHInLFxuICAgICAgICAnTWF5JyxcbiAgICAgICAgJ0p1bicsXG4gICAgICAgICdKdWwnLFxuICAgICAgICAnQXVnJyxcbiAgICAgICAgJ1NlcCcsXG4gICAgICAgICdPY3QnLFxuICAgICAgICAnTm92JyxcbiAgICAgICAgJ0RlYydcbiAgICBdLFxuICAgIG5hcnJvdzogWydKJywgJ0YnLCAnTScsICdBJywgJ00nLCAnSicsICdKJywgJ0EnLCAnUycsICdPJywgJ04nLCAnRCddXG59O1xuXG4vKiogVGhlIGRlZmF1bHQgZGF5IG9mIHRoZSB3ZWVrIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xuY29uc3QgREVGQVVMVF9EQVlfT0ZfV0VFS19OQU1FUyA9IHtcbiAgICBsb25nOiBbXG4gICAgICAgICdTdW5kYXknLFxuICAgICAgICAnTW9uZGF5JyxcbiAgICAgICAgJ1R1ZXNkYXknLFxuICAgICAgICAnV2VkbmVzZGF5JyxcbiAgICAgICAgJ1RodXJzZGF5JyxcbiAgICAgICAgJ0ZyaWRheScsXG4gICAgICAgICdTYXR1cmRheSdcbiAgICBdLFxuICAgIHNob3J0OiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxuICAgIG5hcnJvdzogWydTJywgJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJ11cbn07XG5cbi8qKiBUaGUgZGVmYXVsdCBkYXRlIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xuY29uc3QgREVGQVVMVF9EQVRFX05BTUVTID0gcmFuZ2UoMzEsIGkgPT4gU3RyaW5nKGkgKyAxKSk7XG5cbi8qKiBXaGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIHRoZSBJbnRsIEFQSS4gKi9cbmNvbnN0IFNVUFBPUlRTX0lOVExfQVBJID0gdHlwZW9mIEludGwgIT09ICd1bmRlZmluZWQnO1xuXG4vKipcbiAqIE1hdGNoZXMgc3RyaW5ncyB0aGF0IGhhdmUgdGhlIGZvcm0gb2YgYSB2YWxpZCBSRkMgMzMzOSBzdHJpbmdcbiAqIChodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzMzOSkuIE5vdGUgdGhhdCB0aGUgc3RyaW5nIG1heSBub3QgYWN0dWFsbHkgYmUgYSB2YWxpZCBkYXRlXG4gKiBiZWNhdXNlIHRoZSByZWdleCB3aWxsIG1hdGNoIHN0cmluZ3MgYW4gd2l0aCBvdXQgb2YgYm91bmRzIG1vbnRoLCBkYXRlLCBldGMuXG4gKi9cbmNvbnN0IElTT184NjAxX1JFR0VYID0gL15cXGR7NH0tXFxkezJ9LVxcZHsyfSg/OlRcXGR7Mn06XFxkezJ9OlxcZHsyfSg/OlxcLlxcZCspPyg/Olp8KD86WytcXC1dXFxkezJ9OlxcZHsyfSkpPyk/JC87XG5cbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cbmZ1bmN0aW9uIHJhbmdlPFQ+KGxlbmd0aDogbnVtYmVyLCB2YWx1ZUZ1bmN0aW9uOiAoaW5kZXg6IG51bWJlcikgPT4gVCk6IFRbXSB7XG4gICAgY29uc3QgdmFsdWVzQXJyYXkgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzQXJyYXk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYXRpdmVEYXRlVGltZUFkYXB0ZXIgZXh0ZW5kcyBEYXRlVGltZUFkYXB0ZXI8RGF0ZT4ge1xuICAgIC8qKiBXaGV0aGVyIHRvIGNsYW1wIHRoZSBkYXRlIGJldHdlZW4gMSBhbmQgOTk5OSB0byBhdm9pZCBJRSBhbmQgRWRnZSBlcnJvcnMuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY2xhbXBEYXRlOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB1c2UgYHRpbWVab25lOiAndXRjJ2Agd2l0aCBgSW50bC5EYXRlVGltZUZvcm1hdGAgd2hlbiBmb3JtYXR0aW5nIGRhdGVzLlxuICAgICAqIFdpdGhvdXQgdGhpcyBgSW50bC5EYXRlVGltZUZvcm1hdGAgc29tZXRpbWVzIGNob29zZXMgdGhlIHdyb25nIHRpbWVab25lLCB3aGljaCBjYW4gdGhyb3cgb2ZmXG4gICAgICogdGhlIHJlc3VsdC4gKGUuZy4gaW4gdGhlIGVuLVVTIGxvY2FsZSBgbmV3IERhdGUoMTgwMCwgNywgMTQpLnRvTG9jYWxlRGF0ZVN0cmluZygpYFxuICAgICAqIHdpbGwgcHJvZHVjZSBgJzgvMTMvMTgwMCdgLlxuICAgICAqL1xuICAgIHVzZVV0Y0ZvckRpc3BsYXk6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0xPQ0FMRSlcbiAgICAgICAgcHJpdmF0ZSBvd2xEYXRlVGltZUxvY2FsZTogc3RyaW5nLFxuICAgICAgICBwbGF0Zm9ybTogUGxhdGZvcm1cbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc3VwZXIuc2V0TG9jYWxlKG93bERhdGVUaW1lTG9jYWxlKTtcblxuICAgICAgICAvLyBJRSBkb2VzIGl0cyBvd24gdGltZSB6b25lIGNvcnJlY3Rpb24sIHNvIHdlIGRpc2FibGUgdGhpcyBvbiBJRS5cbiAgICAgICAgdGhpcy51c2VVdGNGb3JEaXNwbGF5ID0gIXBsYXRmb3JtLlRSSURFTlQ7XG4gICAgICAgIHRoaXMuX2NsYW1wRGF0ZSA9IHBsYXRmb3JtLlRSSURFTlQgfHwgcGxhdGZvcm0uRURHRTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0WWVhcihkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TW9udGgoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERheShkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0RGF5KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGUoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldERhdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SG91cnMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1pbnV0ZXMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2Vjb25kcyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaW1lKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE51bURheXNJbk1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBsYXN0RGF0ZU9mTW9udGggPSB0aGlzLmNyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXG4gICAgICAgICAgICB0aGlzLmdldFllYXIoZGF0ZSksXG4gICAgICAgICAgICB0aGlzLmdldE1vbnRoKGRhdGUpICsgMSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRlKGxhc3REYXRlT2ZNb250aCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlTGVmdDogRGF0ZSwgZGF0ZVJpZ2h0OiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChkYXRlTGVmdCkgJiYgdGhpcy5pc1ZhbGlkKGRhdGVSaWdodCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVMZWZ0U3RhcnRPZkRheSA9IHRoaXMuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmdldFllYXIoZGF0ZUxlZnQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZUxlZnQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGF0ZShkYXRlTGVmdClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUmlnaHRTdGFydE9mRGF5ID0gdGhpcy5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0WWVhcihkYXRlUmlnaHQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZVJpZ2h0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhdGUoZGF0ZVJpZ2h0KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgdGltZVN0YW1wTGVmdCA9XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUaW1lKGRhdGVMZWZ0U3RhcnRPZkRheSkgLVxuICAgICAgICAgICAgICAgIGRhdGVMZWZ0U3RhcnRPZkRheS5nZXRUaW1lem9uZU9mZnNldCgpICpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taWxsaXNlb25kc0luTWludXRlO1xuICAgICAgICAgICAgY29uc3QgdGltZVN0YW1wUmlnaHQgPVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGltZShkYXRlUmlnaHRTdGFydE9mRGF5KSAtXG4gICAgICAgICAgICAgICAgZGF0ZVJpZ2h0U3RhcnRPZkRheS5nZXRUaW1lem9uZU9mZnNldCgpICpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taWxsaXNlb25kc0luTWludXRlO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoXG4gICAgICAgICAgICAgICAgKHRpbWVTdGFtcExlZnQgLSB0aW1lU3RhbXBSaWdodCkgLyB0aGlzLm1pbGxpc2Vjb25kc0luRGF5XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0WWVhck5hbWUoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5nZXRMb2NhbGUoKSwge1xuICAgICAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICB0aW1lWm9uZTogJ3V0YydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnModGhpcy5fZm9ybWF0KGR0ZiwgZGF0ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcodGhpcy5nZXRZZWFyKGRhdGUpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgICAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMuZ2V0TG9jYWxlKCksIHtcbiAgICAgICAgICAgICAgICBtb250aDogc3R5bGUsXG4gICAgICAgICAgICAgICAgdGltZVpvbmU6ICd1dGMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByYW5nZSgxMiwgaSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1hdChkdGYsIG5ldyBEYXRlKDIwMTcsIGksIDEpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIERFRkFVTFRfTU9OVEhfTkFNRVNbc3R5bGVdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgICAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMuZ2V0TG9jYWxlKCksIHtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5OiBzdHlsZSxcbiAgICAgICAgICAgICAgICB0aW1lWm9uZTogJ3V0YydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlKDcsIGkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLnN0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JtYXQoZHRmLCBuZXcgRGF0ZSgyMDE3LCAwLCBpICsgMSkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBERUZBVUxUX0RBWV9PRl9XRUVLX05BTUVTW3N0eWxlXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICAgICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmdldExvY2FsZSgpLCB7XG4gICAgICAgICAgICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgdGltZVpvbmU6ICd1dGMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByYW5nZSgzMSwgaSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1hdChkdGYsIG5ldyBEYXRlKDIwMTcsIDAsIGkgKyAxKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBERUZBVUxUX0RBVEVfTkFNRVM7XG4gICAgfVxuXG4gICAgcHVibGljIHRvSXNvODYwMShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFcXVhbChkYXRlTGVmdDogRGF0ZSwgZGF0ZVJpZ2h0OiBEYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoZGF0ZUxlZnQpICYmIHRoaXMuaXNWYWxpZChkYXRlUmlnaHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZUxlZnQuZ2V0VGltZSgpID09PSBkYXRlUmlnaHQuZ2V0VGltZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzU2FtZURheShkYXRlTGVmdDogRGF0ZSwgZGF0ZVJpZ2h0OiBEYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoZGF0ZUxlZnQpICYmIHRoaXMuaXNWYWxpZChkYXRlUmlnaHQpKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlTGVmdFN0YXJ0T2ZEYXkgPSB0aGlzLmNsb25lKGRhdGVMZWZ0KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVSaWdodFN0YXJ0T2ZEYXkgPSB0aGlzLmNsb25lKGRhdGVSaWdodCk7XG4gICAgICAgICAgICBkYXRlTGVmdFN0YXJ0T2ZEYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICBkYXRlUmlnaHRTdGFydE9mRGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBkYXRlTGVmdFN0YXJ0T2ZEYXkuZ2V0VGltZSgpID09PSBkYXRlUmlnaHRTdGFydE9mRGF5LmdldFRpbWUoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc1ZhbGlkKGRhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGRhdGUgJiYgIWlzTmFOKGRhdGUuZ2V0VGltZSgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWYWxpZEZvcm1hdCh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgICAgICAgcGFyc2VGb3JtYXQgPSB7IC4uLnBhcnNlRm9ybWF0LCB0aW1lWm9uZTogJ3V0YycgfTtcbiAgICAgICAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TG9jYWxlKCksXG4gICAgICAgICAgICAgICAgcGFyc2VGb3JtYXRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IGR0Zi5mb3JtYXRUb1BhcnRzKCk7XG4gICAgICAgICAgICBsZXQgcmVnZXggPSAnXic7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHBhcnQudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXggKz0gJyhbMS05XXsxfXxbMF17MX1bMS05XXsxfXxbMS0yXXsxfVswLTldezF9fDNbMC0xXXsxfSknO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4ICs9ICcoWzEtOV18MFsxLTldfDFbMC0yXSknO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXggKz0gJyhbMC05XXsxLDR9KSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHRmLnJlc29sdmVkT3B0aW9ucygpLmhvdXIxMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4ICs9ICcoMD9bMS05XXwxWzAxMl0pJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXggKz0gJyhbMDFdP1swLTldfDJbMC0zXSknO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleCArPSAnKFswLTldezF9fFswLTVdWzAtOV0pJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXlQZXJpb2QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXggKz0gJygoYXxBKShtfE0pP3wocHxQKShtfE0pPyknO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xpdGVyYWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXggKz0gcGFydC52YWx1ZS5yZXBsYWNlKCcvJywgJ1xcXFwvJykucmVwbGFjZSgnLicsICdcXFxcLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVnZXggKz0gJyQnO1xuXG4gICAgICAgICAgICByZXR1cm4gKG5ldyBSZWdFeHAocmVnZXgpKS50ZXN0KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKCkgPT09IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGludmFsaWQoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBEYXRlLCBhbW91bnQ6IG51bWJlcik6IERhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRDYWxlbmRhck1vbnRocyhkYXRlLCBhbW91bnQgKiAxMik7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IERhdGUsIGFtb3VudDogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIGFtb3VudCA9IE51bWJlcihhbW91bnQpO1xuXG4gICAgICAgIGNvbnN0IGRlc2lyZWRNb250aCA9IHJlc3VsdC5nZXRNb250aCgpICsgYW1vdW50O1xuICAgICAgICBjb25zdCBkYXRlV2l0aERlc2lyZWRNb250aCA9IG5ldyBEYXRlKDApO1xuICAgICAgICBkYXRlV2l0aERlc2lyZWRNb250aC5zZXRGdWxsWWVhcihyZXN1bHQuZ2V0RnVsbFllYXIoKSwgZGVzaXJlZE1vbnRoLCAxKTtcbiAgICAgICAgZGF0ZVdpdGhEZXNpcmVkTW9udGguc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICAgICAgY29uc3QgZGF5c0luTW9udGggPSB0aGlzLmdldE51bURheXNJbk1vbnRoKGRhdGVXaXRoRGVzaXJlZE1vbnRoKTtcbiAgICAgICAgLy8gU2V0IHRoZSBsYXN0IGRheSBvZiB0aGUgbmV3IG1vbnRoXG4gICAgICAgIC8vIGlmIHRoZSBvcmlnaW5hbCBkYXRlIHdhcyB0aGUgbGFzdCBkYXkgb2YgdGhlIGxvbmdlciBtb250aFxuICAgICAgICByZXN1bHQuc2V0TW9udGgoZGVzaXJlZE1vbnRoLCBNYXRoLm1pbihkYXlzSW5Nb250aCwgcmVzdWx0LmdldERhdGUoKSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDYWxlbmRhckRheXMoZGF0ZTogRGF0ZSwgYW1vdW50OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgYW1vdW50ID0gTnVtYmVyKGFtb3VudCk7XG4gICAgICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgKyBhbW91bnQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRIb3VycyhkYXRlOiBEYXRlLCBhbW91bnQ6IG51bWJlcik6IERhdGUge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICByZXN1bHQuc2V0SG91cnMoYW1vdW50KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TWludXRlcyhkYXRlOiBEYXRlLCBhbW91bnQ6IG51bWJlcik6IERhdGUge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICByZXN1bHQuc2V0TWludXRlcyhhbW91bnQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTZWNvbmRzKGRhdGU6IERhdGUsIGFtb3VudDogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIHJlc3VsdC5zZXRTZWNvbmRzKGFtb3VudCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZURhdGUoXG4gICAgICAgIHllYXI6IG51bWJlcixcbiAgICAgICAgbW9udGg6IG51bWJlcixcbiAgICAgICAgZGF0ZTogbnVtYmVyLFxuICAgICAgICBob3VyczogbnVtYmVyID0gMCxcbiAgICAgICAgbWludXRlczogbnVtYmVyID0gMCxcbiAgICAgICAgc2Vjb25kczogbnVtYmVyID0gMFxuICAgICk6IERhdGUge1xuICAgICAgICBpZiAobW9udGggPCAwIHx8IG1vbnRoID4gMTEpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIG1vbnRoIGluZGV4IFwiJHttb250aH1cIi4gTW9udGggaW5kZXggaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgMTEuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3VycyA8IDAgfHwgaG91cnMgPiAyMykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgaG91cnMgXCIke2hvdXJzfVwiLiBIb3VycyBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAyMy5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMgPCAwIHx8IG1pbnV0ZXMgPiA1OSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgbWludXRlcyBcIiR7bWludXRlc31cIi4gTWludXRlcyBoYXMgdG8gYmV0d2VlbiAwIGFuZCA1OS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMgPCAwIHx8IHNlY29uZHMgPiA1OSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgc2Vjb25kcyBcIiR7c2Vjb25kc31cIi4gU2Vjb25kcyBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCA1OS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHNcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBDaGVjayB0aGF0IHRoZSBkYXRlIHdhc24ndCBhYm92ZSB0aGUgdXBwZXIgYm91bmQgZm9yIHRoZSBtb250aCwgY2F1c2luZyB0aGUgbW9udGggdG8gb3ZlcmZsb3dcbiAgICAgICAgLy8gRm9yIGV4YW1wbGUsIGNyZWF0ZURhdGUoMjAxNywgMSwgMzEpIHdvdWxkIHRyeSB0byBjcmVhdGUgYSBkYXRlIDIwMTcvMDIvMzEgd2hpY2ggaXMgaW52YWxpZFxuICAgICAgICBpZiAocmVzdWx0LmdldE1vbnRoKCkgIT09IG1vbnRoKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiIGZvciBtb250aCB3aXRoIGluZGV4IFwiJHttb250aH1cIi5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvbmUoZGF0ZTogRGF0ZSk6IERhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRNb250aChkYXRlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0ZShkYXRlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0SG91cnMoZGF0ZSksXG4gICAgICAgICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSksXG4gICAgICAgICAgICB0aGlzLmdldFNlY29uZHMoZGF0ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbm93KCk6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZm9ybWF0KGRhdGU6IERhdGUsIGRpc3BsYXlGb3JtYXQ6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignSlNOYXRpdmVEYXRlOiBDYW5ub3QgZm9ybWF0IGludmFsaWQgZGF0ZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuX2NsYW1wRGF0ZSAmJlxuICAgICAgICAgICAgICAgIChkYXRlLmdldEZ1bGxZZWFyKCkgPCAxIHx8IGRhdGUuZ2V0RnVsbFllYXIoKSA+IDk5OTkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKFxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1heCgxLCBNYXRoLm1pbig5OTk5LCBkYXRlLmdldEZ1bGxZZWFyKCkpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpc3BsYXlGb3JtYXQgPSB7IC4uLmRpc3BsYXlGb3JtYXQsIHRpbWVab25lOiAndXRjJyB9O1xuICAgICAgICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2NhbGUoKSxcbiAgICAgICAgICAgICAgICBkaXNwbGF5Rm9ybWF0XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnModGhpcy5fZm9ybWF0KGR0ZiwgZGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoZGF0ZS50b0RhdGVTdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBhcnNlKHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBhbnkpOiBEYXRlIHwgbnVsbCB7XG4gICAgICAgIC8vIFRoZXJlIGlzIG5vIHdheSB1c2luZyB0aGUgbmF0aXZlIEpTIERhdGUgdG8gc2V0IHRoZSBwYXJzZSBmb3JtYXQgb3IgbG9jYWxlXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZSA/IG5ldyBEYXRlKERhdGUucGFyc2UodmFsdWUpKSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZ2l2ZW4gdmFsdWUgaWYgZ2l2ZW4gYSB2YWxpZCBEYXRlIG9yIG51bGwuIERlc2VyaWFsaXplcyB2YWxpZCBJU08gODYwMSBzdHJpbmdzXG4gICAgICogKGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCkgaW50byB2YWxpZCBEYXRlcyBhbmQgZW1wdHkgc3RyaW5nIGludG8gbnVsbC4gUmV0dXJucyBhblxuICAgICAqIGludmFsaWQgZGF0ZSBmb3IgYWxsIG90aGVyIHZhbHVlcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IERhdGUgfCBudWxsIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZSBgRGF0ZWAgY29uc3RydWN0b3IgYWNjZXB0cyBmb3JtYXRzIG90aGVyIHRoYW4gSVNPIDg2MDEsIHNvIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoZVxuICAgICAgICAgICAgLy8gc3RyaW5nIGlzIHRoZSByaWdodCBmb3JtYXQgZmlyc3QuXG4gICAgICAgICAgICBpZiAoSVNPXzg2MDFfUkVHRVgudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGRhdGUgYnV0IGFsbG93cyB0aGUgbW9udGggYW5kIGRhdGUgdG8gb3ZlcmZsb3cuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgICB5ZWFyOiBudW1iZXIsXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXG4gICAgICAgIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlciA9IDAsXG4gICAgICAgIG1pbnV0ZXM6IG51bWJlciA9IDAsXG4gICAgICAgIHNlY29uZHM6IG51bWJlciA9IDBcbiAgICApOiBEYXRlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKTtcblxuICAgICAgICBpZiAoeWVhciA+PSAwICYmIHllYXIgPCAxMDApIHtcbiAgICAgICAgICAgIHJlc3VsdC5zZXRGdWxsWWVhcih0aGlzLmdldFllYXIocmVzdWx0KSAtIDE5MDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RyaXAgb3V0IHVuaWNvZGUgTFRSIGFuZCBSVEwgY2hhcmFjdGVycy4gRWRnZSBhbmQgSUUgaW5zZXJ0IHRoZXNlIGludG8gZm9ybWF0dGVkIGRhdGVzIHdoaWxlXG4gICAgICogb3RoZXIgYnJvd3NlcnMgZG8gbm90LiBXZSByZW1vdmUgdGhlbSB0byBtYWtlIG91dHB1dCBjb25zaXN0ZW50IGFuZCBiZWNhdXNlIHRoZXkgaW50ZXJmZXJlIHdpdGhcbiAgICAgKiBkYXRlIHBhcnNpbmcuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhzdHI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXHUyMDBlXFx1MjAwZl0vZywgJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gY29udmVydGluZyBEYXRlIG9iamVjdCB0byBzdHJpbmcsIGphdmFzY3JpcHQgYnVpbHQtaW4gZnVuY3Rpb25zIG1heSByZXR1cm4gd3JvbmdcbiAgICAgKiByZXN1bHRzIGJlY2F1c2UgaXQgYXBwbGllcyBpdHMgaW50ZXJuYWwgRFNUIHJ1bGVzLiBUaGUgRFNUIHJ1bGVzIGFyb3VuZCB0aGUgd29ybGQgY2hhbmdlXG4gICAgICogdmVyeSBmcmVxdWVudGx5LCBhbmQgdGhlIGN1cnJlbnQgdmFsaWQgcnVsZSBpcyBub3QgYWx3YXlzIHZhbGlkIGluIHByZXZpb3VzIHllYXJzIHRob3VnaC5cbiAgICAgKiBXZSB3b3JrIGFyb3VuZCB0aGlzIHByb2JsZW0gYnVpbGRpbmcgYSBuZXcgRGF0ZSBvYmplY3Qgd2hpY2ggaGFzIGl0cyBpbnRlcm5hbCBVVENcbiAgICAgKiByZXByZXNlbnRhdGlvbiB3aXRoIHRoZSBsb2NhbCBkYXRlIGFuZCB0aW1lLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2Zvcm1hdChkdGY6IEludGwuRGF0ZVRpbWVGb3JtYXQsIGRhdGU6IERhdGUpIHtcbiAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgRGF0ZS5VVEMoXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldEhvdXJzKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRNaW51dGVzKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZHRmLmZvcm1hdChkKTtcbiAgICB9XG59XG4iXX0=