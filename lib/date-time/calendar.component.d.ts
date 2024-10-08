import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { DateTimeAdapter } from '../adapter/date-time-adapter.class';
import { OwlDateTimeFormats } from '../adapter/date-time-format.class';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { SelectMode } from './date-time.class';
import * as i0 from "@angular/core";
export declare class OwlCalendarComponent<T> implements OnInit, AfterContentInit, AfterViewChecked, OnDestroy {
    private elmRef;
    private pickerIntl;
    private ngZone;
    private cdRef;
    private dateTimeAdapter;
    private dateTimeFormats;
    /**
     * Date filter for the month and year view
     */
    dateFilter: ((date: T) => boolean) | undefined;
    /**
     * Set the first day of week
     */
    firstDayOfWeek: number;
    /** The minimum selectable date. */
    private _minDate;
    get minDate(): T | null;
    set minDate(value: T | null);
    /** The maximum selectable date. */
    private _maxDate;
    get maxDate(): T | null;
    set maxDate(value: T | null);
    /** The current picker moment */
    private _pickerMoment;
    get pickerMoment(): T;
    set pickerMoment(value: T);
    selectMode: SelectMode;
    /** The currently selected moment. */
    private _selected;
    get selected(): T | null;
    set selected(value: T | null);
    private _selecteds;
    get selecteds(): T[];
    set selecteds(values: T[]);
    /**
     * The view that the calendar should start in.
     */
    startView: 'month' | 'year' | 'multi-years';
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     */
    hideOtherMonths: boolean;
    /** Emits when the currently picker moment changes. */
    pickerMomentChange: EventEmitter<T>;
    /** Emits when the currently selected date changes. */
    selectedChange: EventEmitter<T>;
    /** Emits when any date is selected. */
    userSelection: EventEmitter<void>;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     */
    readonly yearSelected: EventEmitter<T>;
    /**
     * Emits the selected month. This doesn't imply a change on the selected date
     */
    readonly monthSelected: EventEmitter<T>;
    get periodButtonText(): string;
    get periodButtonLabel(): string;
    get prevButtonLabel(): string;
    get nextButtonLabel(): string;
    private _currentView;
    get currentView(): 'month' | 'year' | 'multi-years';
    set currentView(view: 'month' | 'year' | 'multi-years');
    get isInSingleMode(): boolean;
    get isInRangeMode(): boolean;
    get showControlArrows(): boolean;
    get isMonthView(): boolean;
    /**
     * Date filter for the month and year view
     */
    dateFilterForViews: (date: T) => boolean;
    /**
     * Bind class 'owl-dt-calendar' to host
     */
    get owlDTCalendarClass(): boolean;
    private intlChangesSub;
    /**
     * Used for scheduling that focus should be moved to the active cell on the next tick.
     * We need to schedule it, rather than do it immediately, because we have to wait
     * for Angular to re-evaluate the view children.
     */
    private moveFocusOnNextTick;
    constructor(elmRef: ElementRef, pickerIntl: OwlDateTimeIntl, ngZone: NgZone, cdRef: ChangeDetectorRef, dateTimeAdapter: DateTimeAdapter<T>, dateTimeFormats: OwlDateTimeFormats);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    /**
     * Toggle between month view and year view
     */
    toggleViews(): void;
    /**
     * Handles user clicks on the previous button.
     */
    previousClicked(): void;
    /**
     * Handles user clicks on the next button.
     */
    nextClicked(): void;
    dateSelected(date: T): void;
    /**
     * Change the pickerMoment value and switch to a specific view
     */
    goToDateInView(date: T, view: 'month' | 'year' | 'multi-years'): void;
    /**
     * Change the pickerMoment value
     */
    handlePickerMomentChange(date: T): void;
    userSelected(): void;
    /**
     * Whether the previous period button is enabled.
     */
    prevButtonEnabled(): boolean;
    /**
     * Whether the next period button is enabled.
     */
    nextButtonEnabled(): boolean;
    /**
     * Focus to the host element
     */
    focusActiveCell(): void;
    selectYearInMultiYearView(normalizedYear: T): void;
    selectMonthInYearView(normalizedMonth: T): void;
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     */
    private isSameView;
    /**
     * Get a valid date object
     */
    private getValidDate;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlCalendarComponent<any>, [null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlCalendarComponent<any>, "owl-date-time-calendar", ["owlDateTimeCalendar"], { "dateFilter": "dateFilter"; "firstDayOfWeek": "firstDayOfWeek"; "minDate": "minDate"; "maxDate": "maxDate"; "pickerMoment": "pickerMoment"; "selectMode": "selectMode"; "selected": "selected"; "selecteds": "selecteds"; "startView": "startView"; "hideOtherMonths": "hideOtherMonths"; }, { "pickerMomentChange": "pickerMomentChange"; "selectedChange": "selectedChange"; "userSelection": "userSelection"; "yearSelected": "yearSelected"; "monthSelected": "monthSelected"; }, never, never, false>;
}
