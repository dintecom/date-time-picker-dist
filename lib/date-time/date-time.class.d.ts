import { EventEmitter } from '@angular/core';
import { DateTimeAdapter } from '../adapter/date-time-adapter.class';
import { OwlDateTimeFormats } from '../adapter/date-time-format.class';
import * as i0 from "@angular/core";
export declare type PickerType = 'both' | 'calendar' | 'timer';
export declare type PickerMode = 'popup' | 'dialog' | 'inline';
export declare type SelectMode = 'single' | 'range' | 'rangeFrom' | 'rangeTo';
export declare abstract class OwlDateTime<T> {
    protected dateTimeAdapter: DateTimeAdapter<T>;
    protected dateTimeFormats: OwlDateTimeFormats;
    /**
     * Whether to show the second's timer
     */
    private _showSecondsTimer;
    get showSecondsTimer(): boolean;
    set showSecondsTimer(val: boolean);
    /**
     * Whether the timer is in hour12 format
     */
    private _hour12Timer;
    get hour12Timer(): boolean;
    set hour12Timer(val: boolean);
    /**
     * The view that the calendar should start in.
     */
    startView: 'month' | 'year' | 'multi-years';
    /**
     * Hours to change per step
     */
    private _stepHour;
    get stepHour(): number;
    set stepHour(val: number);
    /**
     * Minutes to change per step
     */
    private _stepMinute;
    get stepMinute(): number;
    set stepMinute(val: number);
    /**
     * Seconds to change per step
     */
    private _stepSecond;
    get stepSecond(): number;
    set stepSecond(val: number);
    /**
     * Set the first day of week
     */
    private _firstDayOfWeek;
    get firstDayOfWeek(): number;
    set firstDayOfWeek(value: number);
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     */
    private _hideOtherMonths;
    get hideOtherMonths(): boolean;
    set hideOtherMonths(val: boolean);
    private readonly _id;
    get id(): string;
    abstract get selected(): T | null;
    abstract get selecteds(): T[] | null;
    abstract get dateTimeFilter(): (date: T | null) => boolean;
    abstract get maxDateTime(): T | null;
    abstract get minDateTime(): T | null;
    abstract get selectMode(): SelectMode;
    abstract get startAt(): T | null;
    abstract get opened(): boolean;
    abstract get pickerMode(): PickerMode;
    abstract get pickerType(): PickerType;
    abstract get isInSingleMode(): boolean;
    abstract get isInRangeMode(): boolean;
    abstract select(date: T | T[]): void;
    abstract yearSelected: EventEmitter<T>;
    abstract monthSelected: EventEmitter<T>;
    abstract selectYear(normalizedYear: T): void;
    abstract selectMonth(normalizedMonth: T): void;
    get formatString(): string;
    /**
     * Date Time Checker to check if the give dateTime is selectable
     */
    dateTimeChecker: (dateTime: T) => boolean;
    get disabled(): boolean;
    constructor(dateTimeAdapter: DateTimeAdapter<T>, dateTimeFormats: OwlDateTimeFormats);
    protected getValidDate(obj: any): T | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDateTime<any>, [{ optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OwlDateTime<any>, never, never, { "showSecondsTimer": "showSecondsTimer"; "hour12Timer": "hour12Timer"; "startView": "startView"; "stepHour": "stepHour"; "stepMinute": "stepMinute"; "stepSecond": "stepSecond"; "firstDayOfWeek": "firstDayOfWeek"; "hideOtherMonths": "hideOtherMonths"; }, {}, never, never, false>;
}
