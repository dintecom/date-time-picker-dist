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
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    MomentDateTimeAdapter.prototype.isValidFormat = /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    function (value, parseFormat) {
        return moment(value, parseFormat, true).isValid();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2FkYXB0ZXIvbW9tZW50L21vbWVudC1kYXRlLXRpbWUtYWRhcHRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxLQUFLLFlBQVksTUFBTSxRQUFRLENBQUM7QUFFdkMsT0FBTyxFQUNILGVBQWUsRUFDZixvQkFBb0IsRUFDdkIsTUFBTSw0QkFBNEIsQ0FBQzs7SUFFOUIsTUFBTSxHQUFHLFlBQVk7Ozs7O0FBRzNCLHFEQWFDOzs7Ozs7OztJQVBHLGlEQUFnQjs7Ozs7OztJQU1oQixzREFBcUI7Ozs7OztBQUl6QixNQUFNLEtBQU8sb0NBQW9DLEdBQUcsSUFBSSxjQUFjLENBRXBFLHNDQUFzQyxFQUFFO0lBQ3RDLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSw0Q0FBNEM7Q0FDeEQsQ0FBQzs7Ozs7QUFHRixNQUFNLFVBQVUsNENBQTRDO0lBQ3hELE9BQU87UUFDSCxNQUFNLEVBQUUsS0FBSztRQUNiLFdBQVcsRUFBRSxLQUFLO0tBQ3JCLENBQUM7QUFDTixDQUFDOzs7Ozs7OztBQUdELFNBQVMsS0FBSyxDQUFJLE1BQWMsRUFBRSxhQUFtQzs7UUFDM0QsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDdkIs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QUFLLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQ3JFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FDbkIsQ0FBQztTQUNMO1FBQ0QsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxpQkFBTSxXQUFXLFlBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELDJFQUEyRTs7Ozs7OztJQUNuRSw0Q0FBWTs7Ozs7O0lBQXBCO1FBQXFCLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQy9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDdEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQVYsTUFBTSxtQkFBUSxJQUFJLEdBQ3BCLENBQUMsQ0FBQyxNQUFNLGdDQUFJLElBQUksRUFBQyxDQUFDO0lBQzFCLENBQUM7O2dCQXhSSixVQUFVOzs7OzZDQVlGLFFBQVEsWUFDUixNQUFNLFNBQUMsb0JBQW9CO2dEQUUzQixRQUFRLFlBQ1IsTUFBTSxTQUFDLG9DQUFvQzs7SUF5UXBELDRCQUFDO0NBQUEsQUF6UkQsQ0FDMkMsZUFBZSxHQXdSekQ7U0F4UlkscUJBQXFCOzs7Ozs7SUFDOUIsNENBT0U7Ozs7O0lBR0Usa0RBRWlDOzs7OztJQUNqQyx3Q0FFaUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG1vbWVudC1kYXRlLXRpbWUtYWRhcHRlci5jbGFzc1xuICovXG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBpbXBvcnRNb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1xuICAgIERhdGVUaW1lQWRhcHRlcixcbiAgICBPV0xfREFURV9USU1FX0xPQ0FMRVxufSBmcm9tICcuLi9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5cbmNvbnN0IG1vbWVudCA9IGltcG9ydE1vbWVudDtcblxuLyoqIENvbmZpZ3VyYWJsZSBvcHRpb25zIGZvciB7QHNlZSBNb21lbnREYXRlQWRhcHRlcn0uICovXG5leHBvcnQgaW50ZXJmYWNlIE93bE1vbWVudERhdGVUaW1lQWRhcHRlck9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIFR1cm5zIHRoZSB1c2Ugb2YgdXRjIGRhdGVzIG9uIG9yIG9mZi5cbiAgICAgKiBDaGFuZ2luZyB0aGlzIHdpbGwgY2hhbmdlIGhvdyB0aGUgRGF0ZVRpbWVQaWNrZXIgb3V0cHV0IHZhbHVlLlxuICAgICAqIHtAZGVmYXVsdCBmYWxzZX1cbiAgICAgKi9cbiAgICB1c2VVdGM6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUdXJucyB0aGUgdXNlIG9mIHN0cmljdCBzdHJpbmcgcGFyc2luZyBpbiBtb21lbnQuXG4gICAqIENoYW5naW5nIHRoaXMgd2lsbCBjaGFuZ2UgaG93IHRoZSBEYXRlVGltZVBpY2tlciBpbnRlcnByZXRzIGlucHV0LlxuICAgKiB7QGRlZmF1bHQgZmFsc2V9XG4gICAqL1xuICAgIHBhcnNlU3RyaWN0OiBib29sZWFuO1xufVxuXG4vKiogSW5qZWN0aW9uVG9rZW4gZm9yIG1vbWVudCBkYXRlIGFkYXB0ZXIgdG8gY29uZmlndXJlIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgT1dMX01PTUVOVF9EQVRFX1RJTUVfQURBUFRFUl9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPFxuICAgIE93bE1vbWVudERhdGVUaW1lQWRhcHRlck9wdGlvbnNcbj4oJ09XTF9NT01FTlRfREFURV9USU1FX0FEQVBURVJfT1BUSU9OUycsIHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgZmFjdG9yeTogT1dMX01PTUVOVF9EQVRFX1RJTUVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUllcbn0pO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIE9XTF9NT01FTlRfREFURV9USU1FX0FEQVBURVJfT1BUSU9OU19GQUNUT1JZKCk6IE93bE1vbWVudERhdGVUaW1lQWRhcHRlck9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICAgIHVzZVV0YzogZmFsc2UsXG4gICAgICAgIHBhcnNlU3RyaWN0OiBmYWxzZVxuICAgIH07XG59XG5cbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cbmZ1bmN0aW9uIHJhbmdlPFQ+KGxlbmd0aDogbnVtYmVyLCB2YWx1ZUZ1bmN0aW9uOiAoaW5kZXg6IG51bWJlcikgPT4gVCk6IFRbXSB7XG4gICAgY29uc3QgdmFsdWVzQXJyYXkgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzQXJyYXk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb21lbnREYXRlVGltZUFkYXB0ZXIgZXh0ZW5kcyBEYXRlVGltZUFkYXB0ZXI8TW9tZW50PiB7XG4gICAgcHJpdmF0ZSBfbG9jYWxlRGF0YToge1xuICAgICAgICBsb25nTW9udGhzOiBzdHJpbmdbXTtcbiAgICAgICAgc2hvcnRNb250aHM6IHN0cmluZ1tdO1xuICAgICAgICBsb25nRGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgICAgIHNob3J0RGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgICAgIG5hcnJvd0RheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgICAgICBkYXRlczogc3RyaW5nW107XG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfTE9DQUxFKVxuICAgICAgICBwcml2YXRlIG93bERhdGVUaW1lTG9jYWxlOiBzdHJpbmcsXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX01PTUVOVF9EQVRFX1RJTUVfQURBUFRFUl9PUFRJT05TKVxuICAgICAgICBwcml2YXRlIG9wdGlvbnM/OiBPd2xNb21lbnREYXRlVGltZUFkYXB0ZXJPcHRpb25zXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxlKG93bERhdGVUaW1lTG9jYWxlIHx8IG1vbWVudC5sb2NhbGUoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldExvY2FsZShsb2NhbGU6IHN0cmluZykge1xuICAgICAgICBzdXBlci5zZXRMb2NhbGUobG9jYWxlKTtcblxuICAgICAgICBjb25zdCBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LmxvY2FsZURhdGEobG9jYWxlKTtcbiAgICAgICAgdGhpcy5fbG9jYWxlRGF0YSA9IHtcbiAgICAgICAgICAgIGxvbmdNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzKCksXG4gICAgICAgICAgICBzaG9ydE1vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHNTaG9ydCgpLFxuICAgICAgICAgICAgbG9uZ0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXMoKSxcbiAgICAgICAgICAgIHNob3J0RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c1Nob3J0KCksXG4gICAgICAgICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzTWluKCksXG4gICAgICAgICAgICBkYXRlczogcmFuZ2UoMzEsIGkgPT4gdGhpcy5jcmVhdGVEYXRlKDIwMTcsIDAsIGkgKyAxKS5mb3JtYXQoJ0QnKSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0WWVhcihkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS55ZWFyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1vbnRoKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1vbnRoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERheShkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXkoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0ZShkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEhvdXJzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmhvdXJzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1pbnV0ZXMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubWludXRlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZWNvbmRzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnNlY29uZHMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGltZShkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS52YWx1ZU9mKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE51bURheXNJbk1vbnRoKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheXNJbk1vbnRoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhcbiAgICAgICAgZGF0ZUxlZnQ6IE1vbWVudCxcbiAgICAgICAgZGF0ZVJpZ2h0OiBNb21lbnRcbiAgICApOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlTGVmdCkuZGlmZihkYXRlUmlnaHQsICdkYXlzJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFllYXJOYW1lKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmZvcm1hdCgnWVlZWScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBzdHlsZSA9PT0gJ2xvbmcnXG4gICAgICAgICAgICA/IHRoaXMuX2xvY2FsZURhdGEubG9uZ01vbnRoc1xuICAgICAgICAgICAgOiB0aGlzLl9sb2NhbGVEYXRhLnNob3J0TW9udGhzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoc3R5bGUgPT09ICdsb25nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEubG9uZ0RheXNPZldlZWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0eWxlID09PSAnc2hvcnQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5zaG9ydERheXNPZldlZWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEubmFycm93RGF5c09mV2VlaztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEuZGF0ZXM7XG4gICAgfVxuXG4gICAgcHVibGljIHRvSXNvODYwMShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFcXVhbChkYXRlTGVmdDogTW9tZW50LCBkYXRlUmlnaHQ6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZGF0ZUxlZnQgJiYgZGF0ZVJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlTGVmdCkuaXNTYW1lKHRoaXMuY2xvbmUoZGF0ZVJpZ2h0KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZUxlZnQgPT09IGRhdGVSaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNTYW1lRGF5KGRhdGVMZWZ0OiBNb21lbnQsIGRhdGVSaWdodDogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChkYXRlTGVmdCAmJiBkYXRlUmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGVMZWZ0KS5pc1NhbWUodGhpcy5jbG9uZShkYXRlUmlnaHQpLCAnZGF5Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZUxlZnQgPT09IGRhdGVSaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWYWxpZChkYXRlOiBNb21lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaXNWYWxpZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1ZhbGlkRm9ybWF0KHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCh2YWx1ZSwgcGFyc2VGb3JtYXQsIHRydWUpLmlzVmFsaWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW52YWxpZCgpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gbW9tZW50LmludmFsaWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pc01vbWVudChvYmopO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDYWxlbmRhclllYXJzKGRhdGU6IE1vbWVudCwgYW1vdW50OiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyB5ZWFyczogYW1vdW50IH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBNb21lbnQsIGFtb3VudDogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgbW9udGhzOiBhbW91bnQgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBNb21lbnQsIGFtb3VudDogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgZGF5czogYW1vdW50IH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRIb3VycyhkYXRlOiBNb21lbnQsIGFtb3VudDogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaG91cnMoYW1vdW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TWludXRlcyhkYXRlOiBNb21lbnQsIGFtb3VudDogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubWludXRlcyhhbW91bnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTZWNvbmRzKGRhdGU6IE1vbWVudCwgYW1vdW50OiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5zZWNvbmRzKGFtb3VudCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZURhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIpOiBNb21lbnQ7XG4gICAgcHVibGljIGNyZWF0ZURhdGUoXG4gICAgICAgIHllYXI6IG51bWJlcixcbiAgICAgICAgbW9udGg6IG51bWJlcixcbiAgICAgICAgZGF0ZTogbnVtYmVyLFxuICAgICAgICBob3VyczogbnVtYmVyID0gMCxcbiAgICAgICAgbWludXRlczogbnVtYmVyID0gMCxcbiAgICAgICAgc2Vjb25kczogbnVtYmVyID0gMFxuICAgICk6IE1vbWVudCB7XG4gICAgICAgIGlmIChtb250aCA8IDAgfHwgbW9udGggPiAxMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgbW9udGggaW5kZXggXCIke21vbnRofVwiLiBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAxMS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBob3VycyBcIiR7aG91cnN9XCIuIEhvdXJzIGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDIzLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWludXRlcyA8IDAgfHwgbWludXRlcyA+IDU5KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBtaW51dGVzIFwiJHttaW51dGVzfVwiLiBNaW51dGVzIGhhcyB0byBiZXR3ZWVuIDAgYW5kIDU5LmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Vjb25kcyA8IDAgfHwgc2Vjb25kcyA+IDU5KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBzZWNvbmRzIFwiJHtzZWNvbmRzfVwiLiBTZWNvbmRzIGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDU5LmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNyZWF0ZU1vbWVudCh7XG4gICAgICAgICAgICB5ZWFyLFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgaG91cnMsXG4gICAgICAgICAgICBtaW51dGVzLFxuICAgICAgICAgICAgc2Vjb25kc1xuICAgICAgICB9KS5sb2NhbGUodGhpcy5nZXRMb2NhbGUoKSk7XG5cbiAgICAgICAgLy8gSWYgdGhlIHJlc3VsdCBpc24ndCB2YWxpZCwgdGhlIGRhdGUgbXVzdCBoYXZlIGJlZW4gb3V0IG9mIGJvdW5kcyBmb3IgdGhpcyBtb250aC5cbiAgICAgICAgaWYgKCFyZXN1bHQuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiIGZvciBtb250aCB3aXRoIGluZGV4IFwiJHttb250aH1cIi5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvbmUoZGF0ZTogTW9tZW50KTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KGRhdGUpXG4gICAgICAgICAgICAuY2xvbmUoKVxuICAgICAgICAgICAgLmxvY2FsZSh0aGlzLmdldExvY2FsZSgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbm93KCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCgpLmxvY2FsZSh0aGlzLmdldExvY2FsZSgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZm9ybWF0KGRhdGU6IE1vbWVudCwgZGlzcGxheUZvcm1hdDogYW55KTogc3RyaW5nIHtcbiAgICAgICAgZGF0ZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignTW9tZW50RGF0ZVRpbWVBZGFwdGVyOiBDYW5ub3QgZm9ybWF0IGludmFsaWQgZGF0ZS4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZS5mb3JtYXQoZGlzcGxheUZvcm1hdCk7XG4gICAgfVxuXG4gICAgcHVibGljIHBhcnNlKHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBhbnkpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgcGFyc2VGb3JtYXQsIHRoaXMuZ2V0TG9jYWxlKCksIHRoaXMucGFyc2VTdHJpY3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZSA/IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5nZXRMb2NhbGUoKSkgOiBudWxsO1xuICAgIH1cblxuICAgIGdldCBwYXJzZVN0cmljdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMucGFyc2VTdHJpY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZ2l2ZW4gdmFsdWUgaWYgZ2l2ZW4gYSB2YWxpZCBNb21lbnQgb3IgbnVsbC4gRGVzZXJpYWxpemVzIHZhbGlkIElTTyA4NjAxIHN0cmluZ3NcbiAgICAgKiAoaHR0cHM6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzMzMzkudHh0KSBhbmQgdmFsaWQgRGF0ZSBvYmplY3RzIGludG8gdmFsaWQgTW9tZW50cyBhbmQgZW1wdHlcbiAgICAgKiBzdHJpbmcgaW50byBudWxsLiBSZXR1cm5zIGFuIGludmFsaWQgZGF0ZSBmb3IgYWxsIG90aGVyIHZhbHVlcy5cbiAgICAgKi9cbiAgICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBkYXRlO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSwgdGhpcy5wYXJzZVN0cmljdCkubG9jYWxlKFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TG9jYWxlKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGUgJiYgdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGVzIGEgTW9tZW50IGluc3RhbmNlIHdoaWxlIHJlc3BlY3RpbmcgdGhlIGN1cnJlbnQgVVRDIHNldHRpbmdzLiAqL1xuICAgIHByaXZhdGUgY3JlYXRlTW9tZW50KC4uLmFyZ3M6IGFueVtdKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMudXNlVXRjXG4gICAgICAgICAgICA/IG1vbWVudC51dGMoLi4uYXJncylcbiAgICAgICAgICAgIDogbW9tZW50KC4uLmFyZ3MpO1xuICAgIH1cbn1cbiJdfQ==