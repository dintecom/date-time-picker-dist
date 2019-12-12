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
        useUtc: false
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
            return this.createMoment(value, parseFormat, this.getLocale());
        }
        return value ? this.createMoment(value).locale(this.getLocale()) : null;
    };
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
            date = this.createMoment(value, moment.ISO_8601).locale(this.getLocale());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2FkYXB0ZXIvbW9tZW50L21vbWVudC1kYXRlLXRpbWUtYWRhcHRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxLQUFLLFlBQVksTUFBTSxRQUFRLENBQUM7QUFFdkMsT0FBTyxFQUNILGVBQWUsRUFDZixvQkFBb0IsRUFDdkIsTUFBTSw0QkFBNEIsQ0FBQzs7SUFFOUIsTUFBTSxHQUFHLFlBQVk7Ozs7O0FBRzNCLHFEQU9DOzs7Ozs7OztJQURHLGlEQUFnQjs7Ozs7O0FBSXBCLE1BQU0sS0FBTyxvQ0FBb0MsR0FBRyxJQUFJLGNBQWMsQ0FFcEUsc0NBQXNDLEVBQUU7SUFDdEMsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLDRDQUE0QztDQUN4RCxDQUFDOzs7OztBQUdGLE1BQU0sVUFBVSw0Q0FBNEM7SUFDeEQsT0FBTztRQUNILE1BQU0sRUFBRSxLQUFLO0tBQ2hCLENBQUM7QUFDTixDQUFDOzs7Ozs7OztBQUdELFNBQVMsS0FBSyxDQUFJLE1BQWMsRUFBRSxhQUFtQzs7UUFDM0QsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQUVEO0lBQzJDLGlEQUF1QjtJQVU5RCwrQkFHWSxpQkFB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UUFBUSxDQUFDLENBQUMsTUFBTSxDQUNuRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQ25CLENBQUM7U0FDTDtRQUNELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8saUJBQU0sV0FBVyxZQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCwyRUFBMkU7Ozs7Ozs7SUFDbkUsNENBQVk7Ozs7OztJQUFwQjtRQUFxQixjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ3RDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFWLE1BQU0sbUJBQVEsSUFBSSxHQUNwQixDQUFDLENBQUMsTUFBTSxnQ0FBSSxJQUFJLEVBQUMsQ0FBQztJQUMxQixDQUFDOztnQkFwUkosVUFBVTs7Ozs2Q0FZRixRQUFRLFlBQ1IsTUFBTSxTQUFDLG9CQUFvQjtnREFFM0IsUUFBUSxZQUNSLE1BQU0sU0FBQyxvQ0FBb0M7O0lBcVFwRCw0QkFBQztDQUFBLEFBclJELENBQzJDLGVBQWUsR0FvUnpEO1NBcFJZLHFCQUFxQjs7Ozs7O0lBQzlCLDRDQU9FOzs7OztJQUdFLGtEQUVpQzs7Ozs7SUFDakMsd0NBRWlEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtb21lbnQtZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3NcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgaW1wb3J0TW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtcbiAgICBEYXRlVGltZUFkYXB0ZXIsXG4gICAgT1dMX0RBVEVfVElNRV9MT0NBTEVcbn0gZnJvbSAnLi4vZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuXG5jb25zdCBtb21lbnQgPSBpbXBvcnRNb21lbnQ7XG5cbi8qKiBDb25maWd1cmFibGUgb3B0aW9ucyBmb3Ige0BzZWUgTW9tZW50RGF0ZUFkYXB0ZXJ9LiAqL1xuZXhwb3J0IGludGVyZmFjZSBPd2xNb21lbnREYXRlVGltZUFkYXB0ZXJPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBUdXJucyB0aGUgdXNlIG9mIHV0YyBkYXRlcyBvbiBvciBvZmYuXG4gICAgICogQ2hhbmdpbmcgdGhpcyB3aWxsIGNoYW5nZSBob3cgdGhlIERhdGVUaW1lUGlja2VyIG91dHB1dCB2YWx1ZS5cbiAgICAgKiB7QGRlZmF1bHQgZmFsc2V9XG4gICAgICovXG4gICAgdXNlVXRjOiBib29sZWFuO1xufVxuXG4vKiogSW5qZWN0aW9uVG9rZW4gZm9yIG1vbWVudCBkYXRlIGFkYXB0ZXIgdG8gY29uZmlndXJlIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgT1dMX01PTUVOVF9EQVRFX1RJTUVfQURBUFRFUl9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPFxuICAgIE93bE1vbWVudERhdGVUaW1lQWRhcHRlck9wdGlvbnNcbj4oJ09XTF9NT01FTlRfREFURV9USU1FX0FEQVBURVJfT1BUSU9OUycsIHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgZmFjdG9yeTogT1dMX01PTUVOVF9EQVRFX1RJTUVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUllcbn0pO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIE9XTF9NT01FTlRfREFURV9USU1FX0FEQVBURVJfT1BUSU9OU19GQUNUT1JZKCk6IE93bE1vbWVudERhdGVUaW1lQWRhcHRlck9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICAgIHVzZVV0YzogZmFsc2VcbiAgICB9O1xufVxuXG4vKiogQ3JlYXRlcyBhbiBhcnJheSBhbmQgZmlsbHMgaXQgd2l0aCB2YWx1ZXMuICovXG5mdW5jdGlvbiByYW5nZTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWVGdW5jdGlvbjogKGluZGV4OiBudW1iZXIpID0+IFQpOiBUW10ge1xuICAgIGNvbnN0IHZhbHVlc0FycmF5ID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlc0FycmF5W2ldID0gdmFsdWVGdW5jdGlvbihpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlc0FycmF5O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZVRpbWVBZGFwdGVyIGV4dGVuZHMgRGF0ZVRpbWVBZGFwdGVyPE1vbWVudD4ge1xuICAgIHByaXZhdGUgX2xvY2FsZURhdGE6IHtcbiAgICAgICAgbG9uZ01vbnRoczogc3RyaW5nW107XG4gICAgICAgIHNob3J0TW9udGhzOiBzdHJpbmdbXTtcbiAgICAgICAgbG9uZ0RheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgICAgICBzaG9ydERheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICAgICAgZGF0ZXM6IHN0cmluZ1tdO1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0xPQ0FMRSlcbiAgICAgICAgcHJpdmF0ZSBvd2xEYXRlVGltZUxvY2FsZTogc3RyaW5nLFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBASW5qZWN0KE9XTF9NT01FTlRfREFURV9USU1FX0FEQVBURVJfT1BUSU9OUylcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zPzogT3dsTW9tZW50RGF0ZVRpbWVBZGFwdGVyT3B0aW9uc1xuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNldExvY2FsZShvd2xEYXRlVGltZUxvY2FsZSB8fCBtb21lbnQubG9jYWxlKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRMb2NhbGUobG9jYWxlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIuc2V0TG9jYWxlKGxvY2FsZSk7XG5cbiAgICAgICAgY29uc3QgbW9tZW50TG9jYWxlRGF0YSA9IG1vbWVudC5sb2NhbGVEYXRhKGxvY2FsZSk7XG4gICAgICAgIHRoaXMuX2xvY2FsZURhdGEgPSB7XG4gICAgICAgICAgICBsb25nTW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRocygpLFxuICAgICAgICAgICAgc2hvcnRNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzU2hvcnQoKSxcbiAgICAgICAgICAgIGxvbmdEYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzKCksXG4gICAgICAgICAgICBzaG9ydERheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXNTaG9ydCgpLFxuICAgICAgICAgICAgbmFycm93RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c01pbigpLFxuICAgICAgICAgICAgZGF0ZXM6IHJhbmdlKDMxLCBpID0+IHRoaXMuY3JlYXRlRGF0ZSgyMDE3LCAwLCBpICsgMSkuZm9ybWF0KCdEJykpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIGdldFllYXIoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkueWVhcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5tb250aCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXkoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGUoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRIb3VycyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5ob3VycygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNaW51dGVzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1pbnV0ZXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2Vjb25kcyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5zZWNvbmRzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRpbWUoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkudmFsdWVPZigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXlzSW5Nb250aCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXG4gICAgICAgIGRhdGVMZWZ0OiBNb21lbnQsXG4gICAgICAgIGRhdGVSaWdodDogTW9tZW50XG4gICAgKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZUxlZnQpLmRpZmYoZGF0ZVJpZ2h0LCAnZGF5cycpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRZZWFyTmFtZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoJ1lZWVknKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gc3R5bGUgPT09ICdsb25nJ1xuICAgICAgICAgICAgPyB0aGlzLl9sb2NhbGVEYXRhLmxvbmdNb250aHNcbiAgICAgICAgICAgIDogdGhpcy5fbG9jYWxlRGF0YS5zaG9ydE1vbnRocztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKHN0eWxlID09PSAnbG9uZycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLmxvbmdEYXlzT2ZXZWVrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ3Nob3J0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEuc2hvcnREYXlzT2ZXZWVrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLm5hcnJvd0RheXNPZldlZWs7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGVOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLmRhdGVzO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0lzbzg2MDEoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRXF1YWwoZGF0ZUxlZnQ6IE1vbWVudCwgZGF0ZVJpZ2h0OiBNb21lbnQpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGRhdGVMZWZ0ICYmIGRhdGVSaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZUxlZnQpLmlzU2FtZSh0aGlzLmNsb25lKGRhdGVSaWdodCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGVMZWZ0ID09PSBkYXRlUmlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGlzU2FtZURheShkYXRlTGVmdDogTW9tZW50LCBkYXRlUmlnaHQ6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZGF0ZUxlZnQgJiYgZGF0ZVJpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlTGVmdCkuaXNTYW1lKHRoaXMuY2xvbmUoZGF0ZVJpZ2h0KSwgJ2RheScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGVMZWZ0ID09PSBkYXRlUmlnaHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGlzVmFsaWQoZGF0ZTogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmlzVmFsaWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWYWxpZEZvcm1hdCh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBtb21lbnQodmFsdWUsIHBhcnNlRm9ybWF0LCB0cnVlKS5pc1ZhbGlkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGludmFsaWQoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pbnZhbGlkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBtb21lbnQuaXNNb21lbnQob2JqKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBNb21lbnQsIGFtb3VudDogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgeWVhcnM6IGFtb3VudCB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IG1vbnRoczogYW1vdW50IH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDYWxlbmRhckRheXMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IGRheXM6IGFtb3VudCB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SG91cnMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmhvdXJzKGFtb3VudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1pbnV0ZXMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1pbnV0ZXMoYW1vdW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2Vjb25kcyhkYXRlOiBNb21lbnQsIGFtb3VudDogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuc2Vjb25kcyhhbW91bnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogTW9tZW50O1xuICAgIHB1YmxpYyBjcmVhdGVEYXRlKFxuICAgICAgICB5ZWFyOiBudW1iZXIsXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXG4gICAgICAgIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlciA9IDAsXG4gICAgICAgIG1pbnV0ZXM6IG51bWJlciA9IDAsXG4gICAgICAgIHNlY29uZHM6IG51bWJlciA9IDBcbiAgICApOiBNb21lbnQge1xuICAgICAgICBpZiAobW9udGggPCAwIHx8IG1vbnRoID4gMTEpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIG1vbnRoIGluZGV4IFwiJHttb250aH1cIi4gTW9udGggaW5kZXggaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgMTEuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3VycyA8IDAgfHwgaG91cnMgPiAyMykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgaG91cnMgXCIke2hvdXJzfVwiLiBIb3VycyBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAyMy5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMgPCAwIHx8IG1pbnV0ZXMgPiA1OSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgbWludXRlcyBcIiR7bWludXRlc31cIi4gTWludXRlcyBoYXMgdG8gYmV0d2VlbiAwIGFuZCA1OS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMgPCAwIHx8IHNlY29uZHMgPiA1OSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgc2Vjb25kcyBcIiR7c2Vjb25kc31cIi4gU2Vjb25kcyBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCA1OS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jcmVhdGVNb21lbnQoe1xuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHNcbiAgICAgICAgfSkubG9jYWxlKHRoaXMuZ2V0TG9jYWxlKCkpO1xuXG4gICAgICAgIC8vIElmIHRoZSByZXN1bHQgaXNuJ3QgdmFsaWQsIHRoZSBkYXRlIG11c3QgaGF2ZSBiZWVuIG91dCBvZiBib3VuZHMgZm9yIHRoaXMgbW9udGguXG4gICAgICAgIGlmICghcmVzdWx0LmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb25lKGRhdGU6IE1vbWVudCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudChkYXRlKVxuICAgICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgIC5sb2NhbGUodGhpcy5nZXRMb2NhbGUoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5vdygpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQoKS5sb2NhbGUodGhpcy5nZXRMb2NhbGUoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZvcm1hdChkYXRlOiBNb21lbnQsIGRpc3BsYXlGb3JtYXQ6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ01vbWVudERhdGVUaW1lQWRhcHRlcjogQ2Fubm90IGZvcm1hdCBpbnZhbGlkIGRhdGUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGUuZm9ybWF0KGRpc3BsYXlGb3JtYXQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogYW55KTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIHBhcnNlRm9ybWF0LCB0aGlzLmdldExvY2FsZSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMuZ2V0TG9jYWxlKCkpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBnaXZlbiB2YWx1ZSBpZiBnaXZlbiBhIHZhbGlkIE1vbWVudCBvciBudWxsLiBEZXNlcmlhbGl6ZXMgdmFsaWQgSVNPIDg2MDEgc3RyaW5nc1xuICAgICAqIChodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjMzMzOS50eHQpIGFuZCB2YWxpZCBEYXRlIG9iamVjdHMgaW50byB2YWxpZCBNb21lbnRzIGFuZCBlbXB0eVxuICAgICAqIHN0cmluZyBpbnRvIG51bGwuIFJldHVybnMgYW4gaW52YWxpZCBkYXRlIGZvciBhbGwgb3RoZXIgdmFsdWVzLlxuICAgICAqL1xuICAgIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgbGV0IGRhdGU7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgbW9tZW50LklTT184NjAxKS5sb2NhbGUoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2NhbGUoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0ZSAmJiB0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZXMgYSBNb21lbnQgaW5zdGFuY2Ugd2hpbGUgcmVzcGVjdGluZyB0aGUgY3VycmVudCBVVEMgc2V0dGluZ3MuICovXG4gICAgcHJpdmF0ZSBjcmVhdGVNb21lbnQoLi4uYXJnczogYW55W10pOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy51c2VVdGNcbiAgICAgICAgICAgID8gbW9tZW50LnV0YyguLi5hcmdzKVxuICAgICAgICAgICAgOiBtb21lbnQoLi4uYXJncyk7XG4gICAgfVxufVxuIl19