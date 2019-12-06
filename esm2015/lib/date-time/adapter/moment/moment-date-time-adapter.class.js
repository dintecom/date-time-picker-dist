/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * moment-date-time-adapter.class
 */
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import * as importMoment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE } from '../date-time-adapter.class';
/** @type {?} */
const moment = importMoment;
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
export const OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS = new InjectionToken('OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS', {
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
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
export class MomentDateTimeAdapter extends DateTimeAdapter {
    /**
     * @param {?} owlDateTimeLocale
     * @param {?=} options
     */
    constructor(owlDateTimeLocale, options) {
        super();
        this.owlDateTimeLocale = owlDateTimeLocale;
        this.options = options;
        this.setLocale(owlDateTimeLocale || moment.locale());
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    setLocale(locale) {
        super.setLocale(locale);
        /** @type {?} */
        const momentLocaleData = moment.localeData(locale);
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
            i => this.createDate(2017, 0, i + 1).format('D')))
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return this.clone(date).year();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return this.clone(date).month();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDay(date) {
        return this.clone(date).day();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return this.clone(date).date();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getHours(date) {
        return this.clone(date).hours();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMinutes(date) {
        return this.clone(date).minutes();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getSeconds(date) {
        return this.clone(date).seconds();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getTime(date) {
        return this.clone(date).valueOf();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        return this.clone(date).daysInMonth();
    }
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    differenceInCalendarDays(dateLeft, dateRight) {
        return this.clone(dateLeft).diff(dateRight, 'days');
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYearName(date) {
        return this.clone(date).format('YYYY');
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getMonthNames(style) {
        return style === 'long'
            ? this._localeData.longMonths
            : this._localeData.shortMonths;
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getDayOfWeekNames(style) {
        if (style === 'long') {
            return this._localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this._localeData.shortDaysOfWeek;
        }
        return this._localeData.narrowDaysOfWeek;
    }
    /**
     * @return {?}
     */
    getDateNames() {
        return this._localeData.dates;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toIso8601(date) {
        return this.clone(date).format();
    }
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    isEqual(dateLeft, dateRight) {
        if (dateLeft && dateRight) {
            return this.clone(dateLeft).isSame(this.clone(dateRight));
        }
        return dateLeft === dateRight;
    }
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    isSameDay(dateLeft, dateRight) {
        if (dateLeft && dateRight) {
            return this.clone(dateLeft).isSame(this.clone(dateRight), 'day');
        }
        return dateLeft === dateRight;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return this.clone(date).isValid();
    }
    /**
     * @return {?}
     */
    invalid() {
        return moment.invalid();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isDateInstance(obj) {
        return moment.isMoment(obj);
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    addCalendarYears(date, amount) {
        return this.clone(date).add({ years: amount });
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    addCalendarMonths(date, amount) {
        return this.clone(date).add({ months: amount });
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    addCalendarDays(date, amount) {
        return this.clone(date).add({ days: amount });
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    setHours(date, amount) {
        return this.clone(date).hours(amount);
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    setMinutes(date, amount) {
        return this.clone(date).minutes(amount);
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    setSeconds(date, amount) {
        return this.clone(date).seconds(amount);
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
        const result = this.createMoment({
            year,
            month,
            date,
            hours,
            minutes,
            seconds
        }).locale(this.getLocale());
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return this.createMoment(date)
            .clone()
            .locale(this.getLocale());
    }
    /**
     * @return {?}
     */
    now() {
        return this.createMoment().locale(this.getLocale());
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    format(date, displayFormat) {
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateTimeAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    }
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    parse(value, parseFormat) {
        if (value && typeof value === 'string') {
            return this.createMoment(value, parseFormat, this.getLocale(), this.parseStrict);
        }
        return value ? this.createMoment(value).locale(this.getLocale()) : null;
    }
    /**
     * @return {?}
     */
    get parseStrict() {
        return this.options && this.options.parseStrict;
    }
    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    deserialize(value) {
        /** @type {?} */
        let date;
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
        return super.deserialize(value);
    }
    /**
     * Creates a Moment instance while respecting the current UTC settings.
     * @private
     * @param {...?} args
     * @return {?}
     */
    createMoment(...args) {
        return this.options && this.options.useUtc
            ? moment.utc(...args)
            : moment(...args);
    }
}
MomentDateTimeAdapter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MomentDateTimeAdapter.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_LOCALE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2FkYXB0ZXIvbW9tZW50L21vbWVudC1kYXRlLXRpbWUtYWRhcHRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEtBQUssWUFBWSxNQUFNLFFBQVEsQ0FBQztBQUV2QyxPQUFPLEVBQ0gsZUFBZSxFQUNmLG9CQUFvQixFQUN2QixNQUFNLDRCQUE0QixDQUFDOztNQUU5QixNQUFNLEdBQUcsWUFBWTs7Ozs7QUFHM0IscURBYUM7Ozs7Ozs7O0lBUEcsaURBQWdCOzs7Ozs7O0lBTWhCLHNEQUFxQjs7Ozs7O0FBSXpCLE1BQU0sT0FBTyxvQ0FBb0MsR0FBRyxJQUFJLGNBQWMsQ0FFcEUsc0NBQXNDLEVBQUU7SUFDdEMsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLDRDQUE0QztDQUN4RCxDQUFDOzs7OztBQUdGLE1BQU0sVUFBVSw0Q0FBNEM7SUFDeEQsT0FBTztRQUNILE1BQU0sRUFBRSxLQUFLO1FBQ2IsV0FBVyxFQUFFLEtBQUs7S0FDckIsQ0FBQztBQUNOLENBQUM7Ozs7Ozs7O0FBR0QsU0FBUyxLQUFLLENBQUksTUFBYyxFQUFFLGFBQW1DOztVQUMzRCxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzdCLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckM7SUFDRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixD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Ozs7O3lDQVlGLFFBQVEsWUFDUixNQUFNLFNBQUMsb0JBQW9COzRDQUUzQixRQUFRLFlBQ1IsTUFBTSxTQUFDLG9DQUFvQzs7Ozs7OztJQWRoRCw0Q0FPRTs7Ozs7SUFHRSxrREFFaUM7Ozs7O0lBQ2pDLHdDQUVpRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbW9tZW50LWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGltcG9ydE1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7XG4gICAgRGF0ZVRpbWVBZGFwdGVyLFxuICAgIE9XTF9EQVRFX1RJTUVfTE9DQUxFXG59IGZyb20gJy4uL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcblxuY29uc3QgbW9tZW50ID0gaW1wb3J0TW9tZW50O1xuXG4vKiogQ29uZmlndXJhYmxlIG9wdGlvbnMgZm9yIHtAc2VlIE1vbWVudERhdGVBZGFwdGVyfS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT3dsTW9tZW50RGF0ZVRpbWVBZGFwdGVyT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogVHVybnMgdGhlIHVzZSBvZiB1dGMgZGF0ZXMgb24gb3Igb2ZmLlxuICAgICAqIENoYW5naW5nIHRoaXMgd2lsbCBjaGFuZ2UgaG93IHRoZSBEYXRlVGltZVBpY2tlciBvdXRwdXQgdmFsdWUuXG4gICAgICoge0BkZWZhdWx0IGZhbHNlfVxuICAgICAqL1xuICAgIHVzZVV0YzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFR1cm5zIHRoZSB1c2Ugb2Ygc3RyaWN0IHN0cmluZyBwYXJzaW5nIGluIG1vbWVudC5cbiAgICogQ2hhbmdpbmcgdGhpcyB3aWxsIGNoYW5nZSBob3cgdGhlIERhdGVUaW1lUGlja2VyIGludGVycHJldHMgaW5wdXQuXG4gICAqIHtAZGVmYXVsdCBmYWxzZX1cbiAgICovXG4gICAgcGFyc2VTdHJpY3Q6IGJvb2xlYW47XG59XG5cbi8qKiBJbmplY3Rpb25Ub2tlbiBmb3IgbW9tZW50IGRhdGUgYWRhcHRlciB0byBjb25maWd1cmUgb3B0aW9ucy4gKi9cbmV4cG9ydCBjb25zdCBPV0xfTU9NRU5UX0RBVEVfVElNRV9BREFQVEVSX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48XG4gICAgT3dsTW9tZW50RGF0ZVRpbWVBZGFwdGVyT3B0aW9uc1xuPignT1dMX01PTUVOVF9EQVRFX1RJTUVfQURBUFRFUl9PUFRJT05TJywge1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICBmYWN0b3J5OiBPV0xfTU9NRU5UX0RBVEVfVElNRV9BREFQVEVSX09QVElPTlNfRkFDVE9SWVxufSk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gT1dMX01PTUVOVF9EQVRFX1RJTUVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUlkoKTogT3dsTW9tZW50RGF0ZVRpbWVBZGFwdGVyT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXNlVXRjOiBmYWxzZSxcbiAgICAgICAgcGFyc2VTdHJpY3Q6IGZhbHNlXG4gICAgfTtcbn1cblxuLyoqIENyZWF0ZXMgYW4gYXJyYXkgYW5kIGZpbGxzIGl0IHdpdGggdmFsdWVzLiAqL1xuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcbiAgICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZXNBcnJheVtpXSA9IHZhbHVlRnVuY3Rpb24oaSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXNBcnJheTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vbWVudERhdGVUaW1lQWRhcHRlciBleHRlbmRzIERhdGVUaW1lQWRhcHRlcjxNb21lbnQ+IHtcbiAgICBwcml2YXRlIF9sb2NhbGVEYXRhOiB7XG4gICAgICAgIGxvbmdNb250aHM6IHN0cmluZ1tdO1xuICAgICAgICBzaG9ydE1vbnRoczogc3RyaW5nW107XG4gICAgICAgIGxvbmdEYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICAgICAgc2hvcnREYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICAgICAgbmFycm93RGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgICAgIGRhdGVzOiBzdHJpbmdbXTtcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9MT0NBTEUpXG4gICAgICAgIHByaXZhdGUgb3dsRGF0ZVRpbWVMb2NhbGU6IHN0cmluZyxcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfTU9NRU5UX0RBVEVfVElNRV9BREFQVEVSX09QVElPTlMpXG4gICAgICAgIHByaXZhdGUgb3B0aW9ucz86IE93bE1vbWVudERhdGVUaW1lQWRhcHRlck9wdGlvbnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zZXRMb2NhbGUob3dsRGF0ZVRpbWVMb2NhbGUgfHwgbW9tZW50LmxvY2FsZSgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyLnNldExvY2FsZShsb2NhbGUpO1xuXG4gICAgICAgIGNvbnN0IG1vbWVudExvY2FsZURhdGEgPSBtb21lbnQubG9jYWxlRGF0YShsb2NhbGUpO1xuICAgICAgICB0aGlzLl9sb2NhbGVEYXRhID0ge1xuICAgICAgICAgICAgbG9uZ01vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHMoKSxcbiAgICAgICAgICAgIHNob3J0TW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRoc1Nob3J0KCksXG4gICAgICAgICAgICBsb25nRGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5cygpLFxuICAgICAgICAgICAgc2hvcnREYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzU2hvcnQoKSxcbiAgICAgICAgICAgIG5hcnJvd0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXNNaW4oKSxcbiAgICAgICAgICAgIGRhdGVzOiByYW5nZSgzMSwgaSA9PiB0aGlzLmNyZWF0ZURhdGUoMjAxNywgMCwgaSArIDEpLmZvcm1hdCgnRCcpKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRZZWFyKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnllYXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubW9udGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF5KGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRlKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRhdGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SG91cnMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaG91cnMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWludXRlcyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5taW51dGVzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlY29uZHMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuc2Vjb25kcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaW1lKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnZhbHVlT2YoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5c0luTW9udGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICAgICAgICBkYXRlTGVmdDogTW9tZW50LFxuICAgICAgICBkYXRlUmlnaHQ6IE1vbWVudFxuICAgICk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGVMZWZ0KS5kaWZmKGRhdGVSaWdodCwgJ2RheXMnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0WWVhck5hbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCdZWVlZJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlID09PSAnbG9uZydcbiAgICAgICAgICAgID8gdGhpcy5fbG9jYWxlRGF0YS5sb25nTW9udGhzXG4gICAgICAgICAgICA6IHRoaXMuX2xvY2FsZURhdGEuc2hvcnRNb250aHM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ2xvbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5sb25nRGF5c09mV2VlaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3R5bGUgPT09ICdzaG9ydCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLnNob3J0RGF5c09mV2VlaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5uYXJyb3dEYXlzT2ZXZWVrO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5kYXRlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9Jc284NjAxKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmZvcm1hdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0VxdWFsKGRhdGVMZWZ0OiBNb21lbnQsIGRhdGVSaWdodDogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChkYXRlTGVmdCAmJiBkYXRlUmlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGVMZWZ0KS5pc1NhbWUodGhpcy5jbG9uZShkYXRlUmlnaHQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlTGVmdCA9PT0gZGF0ZVJpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1NhbWVEYXkoZGF0ZUxlZnQ6IE1vbWVudCwgZGF0ZVJpZ2h0OiBNb21lbnQpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGRhdGVMZWZ0ICYmIGRhdGVSaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZUxlZnQpLmlzU2FtZSh0aGlzLmNsb25lKGRhdGVSaWdodCksICdkYXknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlTGVmdCA9PT0gZGF0ZVJpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1ZhbGlkKGRhdGU6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5pc1ZhbGlkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGludmFsaWQoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pbnZhbGlkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBtb21lbnQuaXNNb21lbnQob2JqKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBNb21lbnQsIGFtb3VudDogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgeWVhcnM6IGFtb3VudCB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IG1vbnRoczogYW1vdW50IH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDYWxlbmRhckRheXMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IGRheXM6IGFtb3VudCB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SG91cnMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmhvdXJzKGFtb3VudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1pbnV0ZXMoZGF0ZTogTW9tZW50LCBhbW91bnQ6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1pbnV0ZXMoYW1vdW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2Vjb25kcyhkYXRlOiBNb21lbnQsIGFtb3VudDogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuc2Vjb25kcyhhbW91bnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogTW9tZW50O1xuICAgIHB1YmxpYyBjcmVhdGVEYXRlKFxuICAgICAgICB5ZWFyOiBudW1iZXIsXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXG4gICAgICAgIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlciA9IDAsXG4gICAgICAgIG1pbnV0ZXM6IG51bWJlciA9IDAsXG4gICAgICAgIHNlY29uZHM6IG51bWJlciA9IDBcbiAgICApOiBNb21lbnQge1xuICAgICAgICBpZiAobW9udGggPCAwIHx8IG1vbnRoID4gMTEpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIG1vbnRoIGluZGV4IFwiJHttb250aH1cIi4gTW9udGggaW5kZXggaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgMTEuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3VycyA8IDAgfHwgaG91cnMgPiAyMykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgaG91cnMgXCIke2hvdXJzfVwiLiBIb3VycyBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAyMy5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMgPCAwIHx8IG1pbnV0ZXMgPiA1OSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgbWludXRlcyBcIiR7bWludXRlc31cIi4gTWludXRlcyBoYXMgdG8gYmV0d2VlbiAwIGFuZCA1OS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY29uZHMgPCAwIHx8IHNlY29uZHMgPiA1OSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgc2Vjb25kcyBcIiR7c2Vjb25kc31cIi4gU2Vjb25kcyBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCA1OS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jcmVhdGVNb21lbnQoe1xuICAgICAgICAgICAgeWVhcixcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgIGhvdXJzLFxuICAgICAgICAgICAgbWludXRlcyxcbiAgICAgICAgICAgIHNlY29uZHNcbiAgICAgICAgfSkubG9jYWxlKHRoaXMuZ2V0TG9jYWxlKCkpO1xuXG4gICAgICAgIC8vIElmIHRoZSByZXN1bHQgaXNuJ3QgdmFsaWQsIHRoZSBkYXRlIG11c3QgaGF2ZSBiZWVuIG91dCBvZiBib3VuZHMgZm9yIHRoaXMgbW9udGguXG4gICAgICAgIGlmICghcmVzdWx0LmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb25lKGRhdGU6IE1vbWVudCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudChkYXRlKVxuICAgICAgICAgICAgLmNsb25lKClcbiAgICAgICAgICAgIC5sb2NhbGUodGhpcy5nZXRMb2NhbGUoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5vdygpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQoKS5sb2NhbGUodGhpcy5nZXRMb2NhbGUoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGZvcm1hdChkYXRlOiBNb21lbnQsIGRpc3BsYXlGb3JtYXQ6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ01vbWVudERhdGVUaW1lQWRhcHRlcjogQ2Fubm90IGZvcm1hdCBpbnZhbGlkIGRhdGUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGUuZm9ybWF0KGRpc3BsYXlGb3JtYXQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogYW55KTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIHBhcnNlRm9ybWF0LCB0aGlzLmdldExvY2FsZSgpLCB0aGlzLnBhcnNlU3RyaWN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMuZ2V0TG9jYWxlKCkpIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgcGFyc2VTdHJpY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnBhcnNlU3RyaWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGdpdmVuIHZhbHVlIGlmIGdpdmVuIGEgdmFsaWQgTW9tZW50IG9yIG51bGwuIERlc2VyaWFsaXplcyB2YWxpZCBJU08gODYwMSBzdHJpbmdzXG4gICAgICogKGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCkgYW5kIHZhbGlkIERhdGUgb2JqZWN0cyBpbnRvIHZhbGlkIE1vbWVudHMgYW5kIGVtcHR5XG4gICAgICogc3RyaW5nIGludG8gbnVsbC4gUmV0dXJucyBhbiBpbnZhbGlkIGRhdGUgZm9yIGFsbCBvdGhlciB2YWx1ZXMuXG4gICAgICovXG4gICAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgZGF0ZTtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEsIHRoaXMucGFyc2VTdHJpY3QpLmxvY2FsZShcbiAgICAgICAgICAgICAgICB0aGlzLmdldExvY2FsZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRlICYmIHRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlcyBhIE1vbWVudCBpbnN0YW5jZSB3aGlsZSByZXNwZWN0aW5nIHRoZSBjdXJyZW50IFVUQyBzZXR0aW5ncy4gKi9cbiAgICBwcml2YXRlIGNyZWF0ZU1vbWVudCguLi5hcmdzOiBhbnlbXSk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnVzZVV0Y1xuICAgICAgICAgICAgPyBtb21lbnQudXRjKC4uLmFyZ3MpXG4gICAgICAgICAgICA6IG1vbWVudCguLi5hcmdzKTtcbiAgICB9XG59XG4iXX0=