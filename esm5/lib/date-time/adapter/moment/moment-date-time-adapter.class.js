/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * moment-date-time-adapter.class
 */
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import * as importMoment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE } from '../date-time-adapter.class';
/** @type {?} */
var moment = importMoment;
/**
 * Configurable options for {\@see MomentDateAdapter}.
 * @record
 */
export function OwlMomentDateTimeAdapterOptions() { }
if (false) {
    /**
     * Turns the use of utc dates on or off.
     * Changing this will change how the DateTimePicker output value.
     * {\@default false}
     * @type {?}
     */
    OwlMomentDateTimeAdapterOptions.prototype.useUtc;
    /**
     * Turns the use of strict string parsing in moment.
     * Changing this will change how the DateTimePicker interprets input.
     * {\@default false}
     * @type {?}
     */
    OwlMomentDateTimeAdapterOptions.prototype.parseStrict;
}
/**
 * InjectionToken for moment date adapter to configure options.
 * @type {?}
 */
export var OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS = new InjectionToken('OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
export function OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false,
        parseStrict: false
    };
}
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
var MomentDateTimeAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(MomentDateTimeAdapter, _super);
    function MomentDateTimeAdapter(owlDateTimeLocale, options) {
        var _this = _super.call(this) || this;
        _this.owlDateTimeLocale = owlDateTimeLocale;
        _this.options = options;
        _this.setLocale(owlDateTimeLocale || moment.locale());
        return _this;
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.setLocale = /**
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        var _this = this;
        _super.prototype.setLocale.call(this, locale);
        /** @type {?} */
        var momentLocaleData = moment.localeData(locale);
        this._localeData = {
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
            dates: range(31, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return _this.createDate(2017, 0, i + 1).format('D'); }))
        };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).year();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).month();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getDay = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).day();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).date();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getHours = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).hours();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getMinutes = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).minutes();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getSeconds = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).seconds();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).valueOf();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).daysInMonth();
    };
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.differenceInCalendarDays = /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        return this.clone(dateLeft).diff(dateRight, 'days');
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).format('YYYY');
    };
    /**
     * @param {?} style
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        return style === 'long'
            ? this._localeData.longMonths
            : this._localeData.shortMonths;
    };
    /**
     * @param {?} style
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        if (style === 'long') {
            return this._localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this._localeData.shortDaysOfWeek;
        }
        return this._localeData.narrowDaysOfWeek;
    };
    /**
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        return this._localeData.dates;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.toIso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).format();
    };
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.isEqual = /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        if (dateLeft && dateRight) {
            return this.clone(dateLeft).isSame(this.clone(dateRight));
        }
        return dateLeft === dateRight;
    };
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.isSameDay = /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        if (dateLeft && dateRight) {
            return this.clone(dateLeft).isSame(this.clone(dateRight), 'day');
        }
        return dateLeft === dateRight;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).isValid();
    };
    /**
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.invalid = /**
     * @return {?}
     */
    function () {
        return moment.invalid();
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.isDateInstance = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return moment.isMoment(obj);
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        return this.clone(date).add({ years: amount });
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        return this.clone(date).add({ months: amount });
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        return this.clone(date).add({ days: amount });
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.setHours = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        return this.clone(date).hours(amount);
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.setMinutes = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        return this.clone(date).minutes(amount);
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.setSeconds = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        return this.clone(date).seconds(amount);
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
    MomentDateTimeAdapter.prototype.createDate = /**
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
        var result = this.createMoment({
            year: year,
            month: month,
            date: date,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }).locale(this.getLocale());
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.createMoment(date)
            .clone()
            .locale(this.getLocale());
    };
    /**
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.now = /**
     * @return {?}
     */
    function () {
        return this.createMoment().locale(this.getLocale());
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateTimeAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    };
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.parse = /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    function (value, parseFormat) {
        if (value && typeof value === 'string') {
            return this.createMoment(value, parseFormat, this.getLocale(), this.parseStrict);
        }
        return value ? this.createMoment(value).locale(this.getLocale()) : null;
    };
    Object.defineProperty(MomentDateTimeAdapter.prototype, "parseStrict", {
        get: /**
         * @return {?}
         */
        function () {
            return this.options && this.options.parseStrict;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     */
    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.deserialize = /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var date;
        if (value instanceof Date) {
            date = this.createMoment(value);
        }
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            date = this.createMoment(value, moment.ISO_8601, this.parseStrict).locale(this.getLocale());
        }
        if (date && this.isValid(date)) {
            return date;
        }
        return _super.prototype.deserialize.call(this, value);
    };
    /** Creates a Moment instance while respecting the current UTC settings. */
    /**
     * Creates a Moment instance while respecting the current UTC settings.
     * @private
     * @param {...?} args
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.createMoment = /**
     * Creates a Moment instance while respecting the current UTC settings.
     * @private
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.options && this.options.useUtc
            ? moment.utc.apply(moment, tslib_1.__spread(args)) : moment.apply(void 0, tslib_1.__spread(args));
    };
    MomentDateTimeAdapter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MomentDateTimeAdapter.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_LOCALE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS,] }] }
    ]; };
    return MomentDateTimeAdapter;
}(DateTimeAdapter));
export { MomentDateTimeAdapter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MomentDateTimeAdapter.prototype._localeData;
    /**
     * @type {?}
     * @private
     */
    MomentDateTimeAdapter.prototype.owlDateTimeLocale;
    /**
     * @type {?}
     * @private
     */
    MomentDateTimeAdapter.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2FkYXB0ZXIvbW9tZW50L21vbWVudC1kYXRlLXRpbWUtYWRhcHRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxLQUFLLFlBQVksTUFBTSxRQUFRLENBQUM7QUFFdkMsT0FBTyxFQUNILGVBQWUsRUFDZixvQkFBb0IsRUFDdkIsTUFBTSw0QkFBNEIsQ0FBQzs7SUFFOUIsTUFBTSxHQUFHLFlBQVk7Ozs7O0FBRzNCLHFEQWFDOzs7Ozs7OztJQVBHLGlEQUFnQjs7Ozs7OztJQU1oQixzREFBcUI7Ozs7OztBQUl6QixNQUFNLEtBQU8sb0NBQW9DLEdBQUcsSUFBSSxjQUFjLENBRXBFLHNDQUFzQyxFQUFFO0lBQ3RDLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSw0Q0FBNEM7Q0FDeEQsQ0FBQzs7Ozs7QUFHRixNQUFNLFVBQVUsNENBQTRDO0lBQ3hELE9BQU87UUFDSCxNQUFNLEVBQUUsS0FBSztRQUNiLFdBQVcsRUFBRSxLQUFLO0tBQ3JCLENBQUM7QUFDTixDQUFDOzs7Ozs7OztBQUdELFNBQVMsS0FBSyxDQUFJLE1BQWMsRUFBRSxhQUFtQzs7UUFDM0QsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDdkIs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QyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FDckUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUNuQixDQUFDO1NBQ0w7UUFDRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLGlCQUFNLFdBQVcsWUFBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsMkVBQTJFOzs7Ozs7O0lBQ25FLDRDQUFZOzs7Ozs7SUFBcEI7UUFBcUIsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUN0QyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBVixNQUFNLG1CQUFRLElBQUksR0FDcEIsQ0FBQyxDQUFDLE1BQU0sZ0NBQUksSUFBSSxFQUFDLENBQUM7SUFDMUIsQ0FBQzs7Z0JBcFJKLFVBQVU7Ozs7NkNBWUYsUUFBUSxZQUNSLE1BQU0sU0FBQyxvQkFBb0I7Z0RBRTNCLFFBQVEsWUFDUixNQUFNLFNBQUMsb0NBQW9DOztJQXFRcEQsNEJBQUM7Q0FBQSxBQXJSRCxDQUMyQyxlQUFlLEdBb1J6RDtTQXBSWSxxQkFBcUI7Ozs7OztJQUM5Qiw0Q0FPRTs7Ozs7SUFHRSxrREFFaUM7Ozs7O0lBQ2pDLHdDQUVpRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbW9tZW50LWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGltcG9ydE1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7XG4gICAgRGF0ZVRpbWVBZGFwdGVyLFxuICAgIE9XTF9EQVRFX1RJTUVfTE9DQUxFXG59IGZyb20gJy4uL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcblxuY29uc3QgbW9tZW50ID0gaW1wb3J0TW9tZW50O1xuXG4vKiogQ29uZmlndXJhYmxlIG9wdGlvbnMgZm9yIHtAc2VlIE1vbWVudERhdGVBZGFwdGVyfS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT3dsTW9tZW50RGF0ZVRpbWVBZGFwdGVyT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogVHVybnMgdGhlIHVzZSBvZiB1dGMgZGF0ZXMgb24gb3Igb2ZmLlxuICAgICAqIENoYW5naW5nIHRoaXMgd2lsbCBjaGFuZ2UgaG93IHRoZSBEYXRlVGltZVBpY2tlciBvdXRwdXQgdmFsdWUuXG4gICAgICoge0BkZWZhdWx0IGZhbHNlfVxuICAgICAqL1xuICAgIHVzZVV0YzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFR1cm5zIHRoZSB1c2Ugb2Ygc3RyaWN0IHN0cmluZyBwYXJzaW5nIGluIG1vbWVudC5cbiAgICogQ2hhbmdpbmcgdGhpcyB3aWxsIGNoYW5nZSBob3cgdGhlIERhdGVUaW1lUGlja2VyIGludGVycHJldHMgaW5wdXQuXG4gICAqIHtAZGVmYXVsdCBmYWxzZX1cbiAgICovXG4gICAgcGFyc2VTdHJpY3Q6IGJvb2xlYW47XG59XG5cbi8qKiBJbmplY3Rpb25Ub2tlbiBmb3IgbW9tZW50IGRhdGUgYWRhcHRlciB0byBjb25maWd1cmUgb3B0aW9ucy4gKi9cbmV4cG9ydCBjb25zdCBPV0xfTU9NRU5UX0RBVEVfVElNRV9BREFQVEVSX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48XG4gICAgT3dsTW9tZW50RGF0ZVRpbWVBZGFwdGVyT3B0aW9uc1xuPignT1dMX01PTUVOVF9EQVRFX1RJTUVfQURBUFRFUl9PUFRJT05TJywge1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICBmYWN0b3J5OiBPV0xfTU9NRU5UX0RBVEVfVElNRV9BREFQVEVSX09QVElPTlNfRkFDVE9SWVxufSk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gT1dMX01PTUVOVF9EQVRFX1RJTUVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUlkoKTogT3dsTW9tZW50RGF0ZVRpbWVBZGFwdGVyT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXNlVXRjOiBmYWxzZSxcbiAgICAgICAgcGFyc2VTdHJpY3Q6IGZhbHNlXG4gICAgfTtcbn1cblxuLyoqIENyZWF0ZXMgYW4gYXJyYXkgYW5kIGZpbGxzIGl0IHdpdGggdmFsdWVzLiAqL1xuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcbiAgICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZXNBcnJheVtpXSA9IHZhbHVlRnVuY3Rpb24oaSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXNBcnJheTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vbWVudERhdGVUaW1lQWRhcHRlciBleHRlbmRzIERhdGVUaW1lQWRhcHRlcjxNb21lbnQ+IHtcbiAgICBwcml2YXRlIF9sb2NhbGVEYXRhOiB7XG4gICAgICAgIGxvbmdNb250aHM6IHN0cmluZ1tdO1xuICAgICAgICBzaG9ydE1vbnRoczogc3RyaW5nW107XG4gICAgICAgIGxvbmdEYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICAgICAgc2hvcnREYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICAgICAgbmFycm93RGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgICAgIGRhdGVzOiBzdHJpbmdbXTtcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9MT0NBTEUpXG4gICAgICAgIHByaXZhdGUgb3dsRGF0ZVRpbWVMb2NhbGU6IHN0cmluZyxcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfTU9NRU5UX0RBVEVfVElNRV9BREFQVEVSX09QVElPTlMpXG4gICAgICAgIHByaXZhdGUgb3B0aW9ucz86IE93bE1vbWVudERhdGVUaW1lQWRhcHRlck9wdGlvbnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zZXRMb2NhbGUob3dsRGF0ZVRpbWVMb2NhbGUgfHwgbW9tZW50LmxvY2FsZSgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyLnNldExvY2FsZShsb2NhbGUpO1xuXG4gICAgICAgIGNvbnN0IG1vbWVudExvY2FsZURhdGEgPSBtb21lbnQubG9jYWxlRGF0YShsb2NhbGUpO1xuICAgICAgICB0aGlzLl9sb2NhbGVEYXRhID0ge1xuICAgICAgICAgICAgbG9uZ01vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHMoKSxcbiAgICAgICAgICAgIHNob3J0TW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRoc1Nob3J0KCksXG4gICAgICAgICAgICBsb25nRGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5cygpLFxuICAgICAgICAgICAgc2hvcnREYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzU2hvcnQoKSxcbiAgICAgICAgICAgIG5hcnJvd0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXNNaW4oKSxcbiAgICAgICAgICAgIGRhdGVzOiByYW5nZSgzMSwgaSA9PiB0aGlzLmNyZWF0ZURhdGUoMjAxNywgMCwgaSArIDEpLmZvcm1hdCgnRCcpKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRZZWFyKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnllYXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubW9udGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF5KGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRlKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRhdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SG91cnMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaG91cnMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWludXRlcyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5taW51dGVzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlY29uZHMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuc2Vjb25kcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaW1lKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnZhbHVlT2YoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5c0luTW9udGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICAgICAgICBkYXRlTGVmdDogTW9tZW50LFxuICAgICAgICBkYXRlUmlnaHQ6IE1vbWVudFxuICAgICk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGVMZWZ0KS5kaWZmKGRhdGVSaWdodCwgJ2RheXMnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0WWVhck5hbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCdZWVlZJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlID09PSAnbG9uZydcbiAgICAgICAgICAgID8gdGhpcy5fbG9jYWxlRGF0YS5sb25nTW9udGhzXG4gICAgICAgICAgICA6IHRoaXMuX2xvY2FsZURhdGEuc2hvcnRNb250aHM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ2xvbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5sb25nRGF5c09mV2VlaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3R5bGUgPT09ICdzaG9ydCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLnNob3J0RGF5c09mV2VlaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5uYXJyb3dEYXlzT2ZXZWVrO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5kYXRlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9Jc284NjAxKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmZvcm1hdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0VxdWFsKGRhdGVMZWZ0OiBNb21lbnQsIGRhdGVSaWdodDogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChkYXRlTGVmdCAmJiBkYXRlUmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGVMZWZ0KS5pc1NhbWUodGhpcy5jbG9uZShkYXRlUmlnaHQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlTGVmdCA9PT0gZGF0ZVJpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1NhbWVEYXkoZGF0ZUxlZnQ6IE1vbWVudCwgZGF0ZVJpZ2h0OiBNb21lbnQpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGRhdGVMZWZ0ICYmIGRhdGVSaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZUxlZnQpLmlzU2FtZSh0aGlzLmNsb25lKGRhdGVSaWdodCksICdkYXknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlTGVmdCA9PT0gZGF0ZVJpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1ZhbGlkKGRhdGU6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5pc1ZhbGlkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGludmFsaWQoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pbnZhbGlkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBtb21lbnQuaXNNb21lbnQob2JqKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBNb21lbnQsIGFtb3VudDogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgeWVhcnM6IGFtb3VudCB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IG1vbnRoczogYW1vdW50IH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDYWxlbmRhckRheXMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IGRheXM6IGFtb3VudCB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SG91cnMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmhvdXJzKGFtb3VudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1pbnV0ZXMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1pbnV0ZXMoYW1vdW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2Vjb25kcyhkYXRlOiBNb21lbnQsIGFtb3VudDogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuc2Vjb25kcyhhbW91bnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogTW9tZW50O1xuICAgIHB1YmxpYyBjcmVhdGVEYXRlKFxuICAgICAgICB5ZWFyOiBudW1iZXIsXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXG4gICAgICAgIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlciA9IDAsXG4gICAgICAgIG1pbnV0ZXM6IG51bWJlciA9IDAsXG4gICAgICAgIHNlY29uZHM6IG51bWJlciA9IDBcbiAgICApOiBNb21lbnQge1xuICAgICAgICBpZiAobW9udGggPCAwIHx8IG1vbnRoID4gMTEpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIG1vbnRoIGluZGV4IFwiJHttb250aH1cIi4gTW9udGggaW5kZXggaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgMTEuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3VycyA8IDAgfHwgaG91cnMgPiAyMykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgaG91cnMgXCIke2hvdXJzfVwiLiBIb3VycyBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAyMy5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMgPCAwIHx8IG1pbnV0ZXMgPiA1OSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgbWludXRlcyBcIiR7bWludXRlc31cIi4gTWludXRlcyBoYXMgdG8gYmV0d2VlbiAwIGFuZCA1OS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMgPCAwIHx8IHNlY29uZHMgPiA1OSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgc2Vjb25kcyBcIiR7c2Vjb25kc31cIi4gU2Vjb25kcyBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCA1OS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jcmVhdGVNb21lbnQoe1xuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHNcbiAgICAgICAgfSkubG9jYWxlKHRoaXMuZ2V0TG9jYWxlKCkpO1xuXG4gICAgICAgIC8vIElmIHRoZSByZXN1bHQgaXNuJ3QgdmFsaWQsIHRoZSBkYXRlIG11c3QgaGF2ZSBiZWVuIG91dCBvZiBib3VuZHMgZm9yIHRoaXMgbW9udGguXG4gICAgICAgIGlmICghcmVzdWx0LmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb25lKGRhdGU6IE1vbWVudCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudChkYXRlKVxuICAgICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgIC5sb2NhbGUodGhpcy5nZXRMb2NhbGUoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5vdygpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQoKS5sb2NhbGUodGhpcy5nZXRMb2NhbGUoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZvcm1hdChkYXRlOiBNb21lbnQsIGRpc3BsYXlGb3JtYXQ6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ01vbWVudERhdGVUaW1lQWRhcHRlcjogQ2Fubm90IGZvcm1hdCBpbnZhbGlkIGRhdGUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGUuZm9ybWF0KGRpc3BsYXlGb3JtYXQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogYW55KTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIHBhcnNlRm9ybWF0LCB0aGlzLmdldExvY2FsZSgpLCB0aGlzLnBhcnNlU3RyaWN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMuZ2V0TG9jYWxlKCkpIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgcGFyc2VTdHJpY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnBhcnNlU3RyaWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGdpdmVuIHZhbHVlIGlmIGdpdmVuIGEgdmFsaWQgTW9tZW50IG9yIG51bGwuIERlc2VyaWFsaXplcyB2YWxpZCBJU08gODYwMSBzdHJpbmdzXG4gICAgICogKGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCkgYW5kIHZhbGlkIERhdGUgb2JqZWN0cyBpbnRvIHZhbGlkIE1vbWVudHMgYW5kIGVtcHR5XG4gICAgICogc3RyaW5nIGludG8gbnVsbC4gUmV0dXJucyBhbiBpbnZhbGlkIGRhdGUgZm9yIGFsbCBvdGhlciB2YWx1ZXMuXG4gICAgICovXG4gICAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgZGF0ZTtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEsIHRoaXMucGFyc2VTdHJpY3QpLmxvY2FsZShcbiAgICAgICAgICAgICAgICB0aGlzLmdldExvY2FsZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRlICYmIHRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlcyBhIE1vbWVudCBpbnN0YW5jZSB3aGlsZSByZXNwZWN0aW5nIHRoZSBjdXJyZW50IFVUQyBzZXR0aW5ncy4gKi9cbiAgICBwcml2YXRlIGNyZWF0ZU1vbWVudCguLi5hcmdzOiBhbnlbXSk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnVzZVV0Y1xuICAgICAgICAgICAgPyBtb21lbnQudXRjKC4uLmFyZ3MpXG4gICAgICAgICAgICA6IG1vbWVudCguLi5hcmdzKTtcbiAgICB9XG59XG4iXX0=