import { Observable, Subject } from 'rxjs';
import { InjectionToken } from '@angular/core';
export declare const OWL_DATE_TIME_LOCALE: InjectionToken<string>;
export declare function OWL_DATE_TIME_LOCALE_FACTORY(): string;
export declare const OWL_DATE_TIME_LOCALE_PROVIDER: {
    provide: InjectionToken<string>;
    useExisting: InjectionToken<string>;
};
export declare abstract class DateTimeAdapter<T> {
    protected locale: any;
    protected _localeChanges: Subject<void>;
    readonly localeChanges: Observable<void>;
    protected readonly millisecondsInDay = 86400000;
    protected readonly milliseondsInMinute = 60000;
    abstract getYear(date: T): number;
    abstract getMonth(date: T): number;
    abstract getDay(date: T): number;
    abstract getDate(date: T): number;
    abstract getHours(date: T): number;
    abstract getMinutes(date: T): number;
    abstract getSeconds(date: T): number;
    abstract getTime(date: T): number;
    abstract getNumDaysInMonth(date: T): number;
    abstract differenceInCalendarDays(dateLeft: T, dateRight: T): number;
    abstract getYearName(date: T): string;
    abstract getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    abstract getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    abstract getDateNames(): string[];
    abstract toIso8601(date: T): string;
    abstract isEqual(dateLeft: T, dateRight: T): boolean;
    abstract isSameDay(dateLeft: T, dateRight: T): boolean;
    abstract isValid(date: T): boolean;
    abstract invalid(): T;
    abstract isDateInstance(obj: any): boolean;
    abstract addCalendarYears(date: T, amount: number): T;
    abstract addCalendarMonths(date: T, amount: number): T;
    abstract addCalendarDays(date: T, amount: number): T;
    abstract setHours(date: T, amount: number): T;
    abstract setMinutes(date: T, amount: number): T;
    abstract setSeconds(date: T, amount: number): T;
    abstract createDate(year: number, month: number, date: number): T;
    abstract createDate(year: number, month: number, date: number, hours: number, minutes: number, seconds: number): T;
    abstract clone(date: T): T;
    abstract now(): T;
    abstract format(date: T, displayFormat: any): string;
    abstract parse(value: any, parseFormat: any): T | null;
    compare(first: T, second: T): number;
    compareYear(first: T, second: T): number;
    deserialize(value: any): T | null;
    setLocale(locale: any): void;
    clampDate(date: T, min?: T | null, max?: T | null): T;
}
