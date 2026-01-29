import * as i0 from '@angular/core';
import { InjectionToken, EventEmitter, OnInit, AfterContentInit, OnDestroy, ElementRef, Renderer2, ViewContainerRef, ChangeDetectorRef, ComponentRef, EmbeddedViewRef, Injector, TemplateRef, NgZone, OnChanges, SimpleChanges, AfterViewChecked, AfterViewInit, PipeTransform, Provider } from '@angular/core';
import * as i4 from '@angular/cdk/overlay';
import { ScrollStrategy, OverlayRef, Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { ControlValueAccessor, Validator, AbstractControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import * as i2 from '@angular/common';
import { Location } from '@angular/common';
import { AnimationEvent } from '@angular/animations';
import * as i3 from '@angular/cdk/a11y';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import * as i5 from '@angular/cdk/portal';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal, ComponentType } from '@angular/cdk/portal';
import * as i1 from '@angular/cdk/platform';
import { Platform } from '@angular/cdk/platform';

/**
 * date-time-adapter.class
 */

/** InjectionToken for date time picker that can be used to override default locale code. */
declare const OWL_DATE_TIME_LOCALE: InjectionToken<string>;
/** Provider for OWL_DATE_TIME_LOCALE injection token. */
declare const OWL_DATE_TIME_LOCALE_PROVIDER: {
    provide: InjectionToken<string>;
    useExisting: InjectionToken<string>;
};
declare abstract class DateTimeAdapter<T> {
    /** The locale to use for all dates. */
    protected locale: any;
    /** A stream that emits when the locale changes. */
    protected _localeChanges: Subject<string>;
    get localeChanges(): Observable<string>;
    firstMonthOfTheYear: number;
    firstDayOfTheWeek: number;
    /** total milliseconds in a day. */
    protected readonly millisecondsInDay = 86400000;
    /** total milliseconds in a minute. */
    protected readonly milliseondsInMinute = 60000;
    /**
     * Get the year of the given date
     */
    abstract getYear(date: T): number;
    /**
     * Get the month of the given date
     * 0 -- January
     * 11 -- December
     * */
    abstract getMonth(date: T): number;
    /**
     * Get the day of the week of the given date
     * 0 -- Sunday
     * 6 -- Saturday
     * */
    abstract getDay(date: T): number;
    /**
     * Get the day num of the given date
     */
    abstract getDate(date: T): number;
    /**
     * Get the hours of the given date
     */
    abstract getHours(date: T): number;
    /**
     * Get the minutes of the given date
     */
    abstract getMinutes(date: T): number;
    /**
     * Get the seconds of the given date
     */
    abstract getSeconds(date: T): number;
    /**
     * Get the milliseconds timestamp of the given date
     */
    abstract getTime(date: T): number;
    /**
     * Gets the number of days in the month of the given date.
     */
    abstract getNumDaysInMonth(date: T): number;
    /**
     * Get the number of calendar days between the given dates.
     * If dateLeft is before dateRight, it would return positive value
     * If dateLeft is after dateRight, it would return negative value
     */
    abstract differenceInCalendarDays(dateLeft: T, dateRight: T): number;
    /**
     * Gets the name for the year of the given date.
     */
    abstract getYearName(date: T): string;
    /**
     * Get a list of month names
     */
    abstract getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    /**
     * Get a list of week names
     */
    abstract getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    /**
     * Gets a list of names for the dates of the month.
     */
    abstract getDateNames(): string[];
    /**
     * Return a Date object as a string, using the ISO standard
     */
    abstract toIso8601(date: T): string;
    /**
     * Check if the give dates are equal
     */
    abstract isEqual(dateLeft: T, dateRight: T): boolean;
    /**
     * Check if the give dates are the same day
     */
    abstract isSameDay(dateLeft: T, dateRight: T): boolean;
    /**
     * Checks whether the given date is valid.
     */
    abstract isValid(date: T): boolean;
    /**
     * Gets date instance that is not valid.
     */
    abstract invalid(): T;
    /**
     * Checks whether the given object is considered a date instance by this DateTimeAdapter.
     */
    abstract isDateInstance(obj: any): boolean;
    /**
     * Add the specified number of years to the given date
     */
    abstract addCalendarYears(date: T, amount: number): T;
    /**
     * Add the specified number of months to the given date
     */
    abstract addCalendarMonths(date: T, amount: number): T;
    /**
     * Add the specified number of days to the given date
     */
    abstract addCalendarDays(date: T, amount: number): T;
    /**
     * Set the hours to the given date.
     */
    abstract setHours(date: T, amount: number): T;
    /**
     * Set the minutes to the given date.
     */
    abstract setMinutes(date: T, amount: number): T;
    /**
     * Set the seconds to the given date.
     */
    abstract setSeconds(date: T, amount: number): T;
    /**
     * Creates a date with the given year, month, date, hour, minute and second. Does not allow over/under-flow of the
     * month and date.
     */
    abstract createDate(year: number, month: number, date: number): T;
    abstract createDate(year: number, month: number, date: number, hours: number, minutes: number, seconds: number): T;
    /**
     * Clone the given date
     */
    abstract clone(date: T): T;
    /**
     * Get a new moment
     * */
    abstract now(): T;
    /**
     * Formats a date as a string according to the given format.
     */
    abstract format(date: T, displayFormat: any): string;
    /**
     * Parse a user-provided value to a Date Object
     */
    abstract parse(value: any, parseFormat: any): T | null;
    /**
     * Compare two given dates
     * 1 if the first date is after the second,
     * -1 if the first date is before the second
     * 0 if dates are equal.
     * */
    compare(first: T, second: T): number;
    /**
     * Check if two given dates are in the same year
     * 1 if the first date's year is after the second,
     * -1 if the first date's year is before the second
     * 0 if two given dates are in the same year
     * */
    compareYear(first: T, second: T): number;
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     */
    deserialize(value: any): T | null;
    /**
     * Sets the locale used for all dates.
     */
    setLocale(locale: string): void;
    /**
    * Get the locale used for all dates.
    * */
    getLocale(): any;
    /**
     * Clamp the given date between min and max dates.
     */
    clampDate(date: T, min?: T | null, max?: T | null): T;
}

/**
 * date-time-format.class
 */

interface OwlDateTimeFormats {
    parseInput: any;
    fullPickerInput: any;
    datePickerInput: any;
    timePickerInput: any;
    monthYearLabel: any;
    dateA11yLabel: any;
    monthYearA11yLabel: any;
}
/** InjectionToken for date time picker that can be used to override default format. */
declare const OWL_DATE_TIME_FORMATS: InjectionToken<OwlDateTimeFormats>;

/**
 * date-time.class
 */

type PickerType = 'both' | 'calendar' | 'timer';
type PickerMode = 'popup' | 'dialog' | 'inline';
type SelectMode = 'single' | 'range' | 'rangeFrom' | 'rangeTo';
declare enum DateView {
    MONTH = "month",
    YEAR = "year",
    MULTI_YEARS = "multi-years"
}
type DateViewType = DateView.MONTH | DateView.YEAR | DateView.MULTI_YEARS;
declare abstract class OwlDateTime<T> {
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
    startView: DateViewType;
    /**
     * Whether to show calendar weeks in the calendar
     * */
    showCalendarWeeks: boolean;
    /**
     * Whether to should only the year and multi-year views.
     */
    yearOnly: boolean;
    /**
     * Whether to should only the multi-year view.
     */
    multiyearOnly: boolean;
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
    abstract get endAt(): T | null;
    abstract get opened(): boolean;
    abstract get pickerMode(): PickerMode;
    abstract get pickerType(): PickerType;
    abstract get isInSingleMode(): boolean;
    abstract get isInRangeMode(): boolean;
    abstract select(date: T | T[]): void;
    abstract yearSelected: EventEmitter<T>;
    abstract monthSelected: EventEmitter<T>;
    abstract dateSelected: EventEmitter<T>;
    abstract selectYear(normalizedYear: T): void;
    abstract selectMonth(normalizedMonth: T): void;
    abstract selectDate(normalizedDate: T): void;
    get formatString(): string;
    /**
     * Date Time Checker to check if the give dateTime is selectable
     */
    dateTimeChecker: (dateTime: T) => boolean;
    get disabled(): boolean;
    protected constructor(dateTimeAdapter: DateTimeAdapter<T>, dateTimeFormats: OwlDateTimeFormats);
    protected getValidDate(obj: any): T | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDateTime<any>, [{ optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OwlDateTime<any>, never, never, { "showSecondsTimer": { "alias": "showSecondsTimer"; "required": false; }; "hour12Timer": { "alias": "hour12Timer"; "required": false; }; "startView": { "alias": "startView"; "required": false; }; "showCalendarWeeks": { "alias": "showCalendarWeeks"; "required": false; }; "yearOnly": { "alias": "yearOnly"; "required": false; }; "multiyearOnly": { "alias": "multiyearOnly"; "required": false; }; "stepHour": { "alias": "stepHour"; "required": false; }; "stepMinute": { "alias": "stepMinute"; "required": false; }; "stepSecond": { "alias": "stepSecond"; "required": false; }; "firstDayOfWeek": { "alias": "firstDayOfWeek"; "required": false; }; "hideOtherMonths": { "alias": "hideOtherMonths"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * date-time-picker-input.directive
 */

declare const OWL_DATETIME_VALUE_ACCESSOR: any;
declare const OWL_DATETIME_VALIDATORS: any;
declare class OwlDateTimeInputDirective<T> implements OnInit, AfterContentInit, OnDestroy, ControlValueAccessor, Validator {
    private elmRef;
    private renderer;
    private dateTimeAdapter;
    private dateTimeFormats;
    static ngAcceptInputType_disabled: boolean | '';
    /**
    * Required flag to be used for range of [null, null]
    * */
    private _required;
    get required(): any;
    set required(value: any);
    /**
     * The date time picker that this input is associated with.
     * */
    set owlDateTime(value: OwlDateTimeComponent<T>);
    /**
     * A function to filter date time
     */
    set owlDateTimeFilter(filter: (date: T | null) => boolean);
    private _dateTimeFilter;
    get dateTimeFilter(): (date: T | null) => boolean;
    /** Whether the date time picker's input is disabled. */
    private _disabled;
    get disabled(): boolean;
    set disabled(value: boolean);
    /** The minimum valid date. */
    private _min;
    get min(): T | null;
    set min(value: T | null);
    /** The maximum valid date. */
    private _max;
    get max(): T | null;
    set max(value: T | null);
    /**
     * The picker's select mode
     */
    private _selectMode;
    get selectMode(): SelectMode;
    set selectMode(mode: SelectMode);
    /**
     * The character to separate the 'from' and 'to' in input value
     */
    rangeSeparator: string;
    private _value;
    get value(): T | null;
    set value(value: T | null);
    private _values;
    get values(): T[];
    set values(values: T[]);
    /**
     * Callback to invoke when `change` event is fired on this `<input>`
     * */
    dateTimeChange: EventEmitter<any>;
    /**
     * Callback to invoke when an `input` event is fired on this `<input>`.
     * */
    dateTimeInput: EventEmitter<any>;
    get elementRef(): ElementRef;
    get isInSingleMode(): boolean;
    get isInRangeMode(): boolean;
    /** The date-time-picker that this input is associated with. */
    dtPicker: OwlDateTimeComponent<T>;
    private dtPickerSub;
    private localeSub;
    private lastValueValid;
    private onModelChange;
    private onModelTouched;
    private validatorOnChange;
    /** The form control validator for whether the input parses. */
    private parseValidator;
    /** The form control validator for the min date. */
    private minValidator;
    /** The form control validator for the max date. */
    private maxValidator;
    /** The form control validator for the date filter. */
    private filterValidator;
    /**
     * The form control validator for the range.
     * Check whether the 'before' value is before the 'to' value
     * */
    private rangeValidator;
    /**
     * The form control validator for the range when required.
     * Check whether the 'before' and 'to' values are present
     * */
    private requiredRangeValidator;
    /** The combined form control validator for this input. */
    private validator;
    /** Emits when the value changes (either due to user input or programmatic change). */
    valueChange: EventEmitter<T | T[]>;
    /** Emits when the disabled state has changed */
    disabledChange: EventEmitter<boolean>;
    get owlDateTimeInputAriaHaspopup(): boolean;
    get owlDateTimeInputAriaOwns(): string;
    get minIso8601(): string;
    get maxIso8601(): string;
    get owlDateTimeInputDisabled(): boolean;
    constructor(elmRef: ElementRef, renderer: Renderer2, dateTimeAdapter: DateTimeAdapter<T>, dateTimeFormats: OwlDateTimeFormats);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    registerOnValidatorChange(fn: () => void): void;
    /**
     * Open the picker when user hold alt + DOWN_ARROW
     * */
    handleKeydownOnHost(event: KeyboardEvent): void;
    handleBlurOnHost(event: Event): void;
    handleInputOnHost(event: any): void;
    handleChangeOnHost(event: any): void;
    /**
     * Set the native input property 'value'
     */
    formatNativeInputValue(): void;
    /**
     * Register the relationship between this input and its picker component
     */
    private registerDateTimePicker;
    /**
     * Convert a given obj to a valid date object
     */
    private getValidDate;
    /**
     * Convert a time string to a date-time string
     * When pickerType is 'timer', the value in the picker's input is a time string.
     * The dateTimeAdapter parse fn could not parse a time string to a Date Object.
     * Therefore we need this fn to convert a time string to a date-time string.
     */
    private convertTimeStringToDateTimeString;
    /**
     * Handle input change in single mode
     */
    private changeInputInSingleMode;
    /**
     * Handle input change in rangeFrom or rangeTo mode
     */
    private changeInputInRangeFromToMode;
    /**
     * Handle input change in range mode
     */
    private changeInputInRangeMode;
    /**
     * Check if the two value is the same
     */
    private isSameValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDateTimeInputDirective<any>, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OwlDateTimeInputDirective<any>, "input[owlDateTime]", ["owlDateTimeInput"], { "required": { "alias": "required"; "required": false; }; "owlDateTime": { "alias": "owlDateTime"; "required": false; }; "owlDateTimeFilter": { "alias": "owlDateTimeFilter"; "required": false; }; "_disabled": { "alias": "_disabled"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "selectMode": { "alias": "selectMode"; "required": false; }; "rangeSeparator": { "alias": "rangeSeparator"; "required": false; }; "value": { "alias": "value"; "required": false; }; "values": { "alias": "values"; "required": false; }; }, { "dateTimeChange": "dateTimeChange"; "dateTimeInput": "dateTimeInput"; }, never, never, false, never>;
}

/**
 * dialog-config.class
 */

/** Possible overrides for a dialog's position. */
interface DialogPosition {
    /** Override for the dialog's top position. */
    top?: string;
    /** Override for the dialog's bottom position. */
    bottom?: string;
    /** Override for the dialog's left position. */
    left?: string;
    /** Override for the dialog's right position. */
    right?: string;
}
interface OwlDialogConfigInterface {
    /**
     * ID of the element that describes the dialog.
     */
    ariaDescribedBy?: string | null;
    /**
     * Whether to focus the dialog when the dialog is opened
     */
    autoFocus?: boolean;
    /** Whether the dialog has a backdrop. */
    hasBackdrop?: boolean;
    /**
     * Custom style for the backdrop
     * */
    backdropStyle?: any;
    /** Data being injected into the child component. */
    data?: any;
    /** Whether the user can use escape or clicking outside to close a modal. */
    disableClose?: boolean;
    /**
     * ID for the modal. If omitted, a unique one will be generated.
     */
    id?: string;
    /**
     * The ARIA role of the dialog element.
     */
    role?: 'dialog' | 'alertdialog';
    /**
     * Custom class for the pane
     * */
    paneClass?: string | string[];
    /**
     * Mouse Event
     * */
    event?: MouseEvent;
    /**
     * Custom class for the backdrop
     * */
    backdropClass?: string | string[];
    /**
     * Whether the dialog should close when the user goes backwards/forwards in history.
     * */
    closeOnNavigation?: boolean;
    /** Width of the dialog. */
    width?: string;
    /** Height of the dialog. */
    height?: string;
    /**
     * The min-width of the overlay panel.
     * If a number is provided, pixel units are assumed.
     * */
    minWidth?: number | string;
    /**
     * The min-height of the overlay panel.
     * If a number is provided, pixel units are assumed.
     * */
    minHeight?: number | string;
    /**
     * The max-width of the overlay panel.
     * If a number is provided, pixel units are assumed.
     * */
    maxWidth?: number | string;
    /**
     * The max-height of the overlay panel.
     * If a number is provided, pixel units are assumed.
     * */
    maxHeight?: number | string;
    /** Position overrides. */
    position?: DialogPosition;
    /**
     * The scroll strategy when the dialog is open
     * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
     * */
    scrollStrategy?: ScrollStrategy;
    viewContainerRef?: ViewContainerRef;
}

/**
 * dialog-container.component
 */

declare class OwlDialogContainerComponent extends BasePortalOutlet implements OnInit {
    private changeDetector;
    private elementRef;
    private focusTrapFactory;
    private document;
    portalOutlet: CdkPortalOutlet | null;
    /** The class that traps and manages focus within the dialog. */
    private focusTrap;
    /** ID of the element that should be considered as the dialog's label. */
    ariaLabelledBy: string | null;
    /** Emits when an animation state changes. */
    animationStateChanged: EventEmitter<AnimationEvent>;
    isAnimating: boolean;
    private _config;
    get config(): OwlDialogConfigInterface;
    private state;
    private params;
    private elementFocusedBeforeDialogWasOpened;
    get owlDialogContainerClass(): boolean;
    get owlDialogContainerTabIndex(): number;
    get owlDialogContainerId(): string;
    get owlDialogContainerRole(): string;
    get owlDialogContainerAriaLabelledby(): string;
    get owlDialogContainerAriaDescribedby(): string;
    get owlDialogContainerAnimation(): any;
    constructor(changeDetector: ChangeDetectorRef, elementRef: ElementRef, focusTrapFactory: FocusTrapFactory, document: any);
    ngOnInit(): void;
    /**
     * Attach a ComponentPortal as content to this dialog container.
     */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    setConfig(config: OwlDialogConfigInterface): void;
    onAnimationStart(event: AnimationEvent): void;
    onAnimationDone(event: AnimationEvent): void;
    startExitAnimation(): void;
    /**
     * Calculate origin used in the `zoomFadeInFrom()`
     * for animation purpose
     */
    private calculateZoomOrigin;
    /**
     * Save the focused element before dialog was open
     */
    private savePreviouslyFocusedElement;
    private trapFocus;
    private restoreFocus;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDialogContainerComponent, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlDialogContainerComponent, "owl-dialog-container", never, {}, {}, never, never, false, never>;
}

declare class OwlDialogRef<T> {
    private overlayRef;
    private container;
    readonly id: string;
    private result;
    private _beforeClose$;
    private _beforeOpen$;
    private _afterOpen$;
    private _afterClosed$;
    /** Subscription to changes in the user's location. */
    private locationChanged;
    /**
     * The instance of component opened into modal
     * */
    componentInstance: T;
    /** Whether the user is allowed to close the dialog. */
    disableClose: boolean;
    constructor(overlayRef: OverlayRef, container: OwlDialogContainerComponent, id: string, location?: Location);
    close(dialogResult?: any): void;
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    backdropClick(): Observable<any>;
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    keydownEvents(): Observable<KeyboardEvent>;
    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    updatePosition(position?: DialogPosition): this;
    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    updateSize(width?: string, height?: string): this;
    isAnimating(): boolean;
    beforeOpen(): Observable<any>;
    afterOpen(): Observable<any>;
    beforeClose(): Observable<any>;
    afterClosed(): Observable<any>;
    /** Fetches the position strategy object from the overlay ref. */
    private getPositionStrategy;
}

/**
 * dialog.service
 */

declare class OwlDialogService {
    private overlay;
    private injector;
    private location;
    private defaultOptions;
    private parentDialog;
    private overlayContainer;
    private ariaHiddenElements;
    private _openDialogsAtThisLevel;
    private _beforeOpenAtThisLevel;
    private _afterOpenAtThisLevel;
    private _afterAllClosedAtThisLevel;
    /** Keeps track of the currently-open dialogs. */
    get openDialogs(): OwlDialogRef<any>[];
    /** Stream that emits when a dialog has been opened. */
    get beforeOpen(): Subject<OwlDialogRef<any>>;
    /** Stream that emits when a dialog has been opened. */
    get afterOpen(): Subject<OwlDialogRef<any>>;
    get _afterAllClosed(): any;
    /**
     * Stream that emits when all open dialog have finished closing.
     * Will emit on subscribe if there are no open dialogs to begin with.
     */
    afterAllClosed: Observable<{}>;
    private readonly scrollStrategy;
    constructor(overlay: Overlay, injector: Injector, location: Location, scrollStrategy: any, defaultOptions: OwlDialogConfigInterface, parentDialog: OwlDialogService, overlayContainer: OverlayContainer);
    open<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: OwlDialogConfigInterface): OwlDialogRef<any>;
    /**
     * Closes all of the currently-open dialogs.
     */
    closeAll(): void;
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     */
    getDialogById(id: string): OwlDialogRef<any> | undefined;
    private attachDialogContent;
    private createInjector;
    private createOverlay;
    private attachDialogContainer;
    private getOverlayConfig;
    private removeOpenDialog;
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     */
    private hideNonDialogContentFromAssistiveTechnology;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDialogService, [null, null, { optional: true; }, null, { optional: true; }, { optional: true; skipSelf: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OwlDialogService>;
}

/**
 * date-time-picker.component
 */

declare class OwlDateTimeComponent<T> extends OwlDateTime<T> implements OnInit, OnDestroy {
    overlay: Overlay;
    private viewContainerRef;
    private dialogService;
    private ngZone;
    protected changeDetector: ChangeDetectorRef;
    protected dateTimeAdapter: DateTimeAdapter<T>;
    protected dateTimeFormats: OwlDateTimeFormats;
    private document;
    /** Custom class for the picker backdrop. */
    backdropClass: string | string[];
    /** Custom class for the picker overlay pane. */
    panelClass: string | string[];
    /** The date to open the calendar to initially. */
    private _startAt;
    get startAt(): T | null;
    set startAt(date: T | null);
    /** The end date to set for range calendar. */
    private _endAt;
    get endAt(): T | null;
    set endAt(date: T | null);
    /**
     * Set the type of the dateTime picker
     *      'both' -- show both calendar and timer
     *      'calendar' -- show only calendar
     *      'timer' -- show only timer
     */
    private _pickerType;
    get pickerType(): PickerType;
    set pickerType(val: PickerType);
    /**
     * Whether the picker open as a dialog
     */
    _pickerMode: PickerMode;
    get pickerMode(): PickerMode;
    set pickerMode(mode: PickerMode);
    /** Whether the date time picker should be disabled. */
    private _disabled;
    get disabled(): boolean;
    set disabled(value: boolean);
    /** Whether the calendar is open. */
    private _opened;
    get opened(): boolean;
    set opened(val: boolean);
    /**
     * The scroll strategy when the picker is open
     * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
     * */
    scrollStrategy: ScrollStrategy;
    /**
     * Callback when the picker is closed
     * */
    afterPickerClosed: EventEmitter<any>;
    /**
     * Callback before the picker is open
     * */
    beforePickerOpen: EventEmitter<any>;
    /**
     * Callback when the picker is open
     * */
    afterPickerOpen: EventEmitter<any>;
    /**
     * Emits selected year in multi-year view
     * This doesn't imply a change on the selected date.
     * */
    yearSelected: EventEmitter<T>;
    /**
     * Emits selected month in year view
     * This doesn't imply a change on the selected date.
     * */
    monthSelected: EventEmitter<T>;
    /**
     * Emits selected date
     * */
    dateSelected: EventEmitter<T>;
    /**
     * Emit when the selected value has been confirmed
     * */
    confirmSelectedChange: EventEmitter<T | T[]>;
    /**
     * Emits when the date time picker is disabled.
     * */
    disabledChange: EventEmitter<boolean>;
    private pickerContainerPortal;
    private pickerContainer;
    private popupRef;
    private dialogRef;
    private dtInputSub;
    private hidePickerStreamSub;
    private confirmSelectedStreamSub;
    private pickerOpenedStreamSub;
    private pickerBeforeOpenedStreamSub;
    /** The element that was focused before the date time picker was opened. */
    private focusedElementBeforeOpen;
    private _dtInput;
    get dtInput(): OwlDateTimeInputDirective<T>;
    private _selected;
    get selected(): T | null;
    set selected(value: T | null);
    private _selecteds;
    get selecteds(): T[];
    set selecteds(values: T[]);
    /** The minimum selectable date. */
    get minDateTime(): T | null;
    /** The maximum selectable date. */
    get maxDateTime(): T | null;
    get dateTimeFilter(): (date: T | null) => boolean;
    get selectMode(): SelectMode;
    get isInSingleMode(): boolean;
    get isInRangeMode(): boolean;
    private readonly defaultScrollStrategy;
    constructor(overlay: Overlay, viewContainerRef: ViewContainerRef, dialogService: OwlDialogService, ngZone: NgZone, changeDetector: ChangeDetectorRef, dateTimeAdapter: DateTimeAdapter<T>, defaultScrollStrategy: any, dateTimeFormats: OwlDateTimeFormats, document: any);
    ngOnInit(): void;
    ngOnDestroy(): void;
    registerInput(input: OwlDateTimeInputDirective<T>): void;
    open(): void;
    /**
     * Selects the given date
     */
    select(date: T[] | T): void;
    /**
     * Emits the selected year in multi-year view
     * */
    selectYear(normalizedYear: T): void;
    /**
     * Emits selected month in year view
     * */
    selectMonth(normalizedMonth: T): void;
    /**
     * Emits the selected date
     * */
    selectDate(normalizedDate: T): void;
    /**
     * Hide the picker
     */
    close(): void;
    /**
     * Confirm the selected value
     */
    confirmSelect(event?: any): void;
    /**
     * Open the picker as a dialog
     */
    private openAsDialog;
    /**
     * Open the picker as popup
     */
    private openAsPopup;
    private createPopup;
    /**
     * Create the popup PositionStrategy.
     * */
    private createPopupPositionStrategy;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDateTimeComponent<any>, [null, null, null, null, null, { optional: true; }, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlDateTimeComponent<any>, "owl-date-time", ["owlDateTime"], { "backdropClass": { "alias": "backdropClass"; "required": false; }; "panelClass": { "alias": "panelClass"; "required": false; }; "startAt": { "alias": "startAt"; "required": false; }; "endAt": { "alias": "endAt"; "required": false; }; "pickerType": { "alias": "pickerType"; "required": false; }; "pickerMode": { "alias": "pickerMode"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; "scrollStrategy": { "alias": "scrollStrategy"; "required": false; }; }, { "afterPickerClosed": "afterPickerClosed"; "beforePickerOpen": "beforePickerOpen"; "afterPickerOpen": "afterPickerOpen"; "yearSelected": "yearSelected"; "monthSelected": "monthSelected"; "dateSelected": "dateSelected"; }, never, never, false, never>;
}

/**
 * date-time-picker-trigger.directive
 */

declare class OwlDateTimeTriggerDirective<T> implements OnInit, OnChanges, AfterContentInit, OnDestroy {
    protected changeDetector: ChangeDetectorRef;
    dtPicker: OwlDateTimeComponent<T>;
    private _disabled;
    get disabled(): boolean;
    set disabled(value: boolean);
    get owlDTTriggerDisabledClass(): boolean;
    private stateChanges;
    constructor(changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    handleClickOnHost(event: Event): void;
    protected handleBlurOnHost(): void;
    private watchStateChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDateTimeTriggerDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OwlDateTimeTriggerDirective<any>, "[owlDateTimeTrigger]", never, { "dtPicker": { "alias": "owlDateTimeTrigger"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, false, never>;
}

declare class OwlDateTimeIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes: Subject<void>;
    /** A label for the up second button (used by screen readers).  */
    upSecondLabel: string;
    /** A label for the down second button (used by screen readers).  */
    downSecondLabel: string;
    /** A label for the up minute button (used by screen readers).  */
    upMinuteLabel: string;
    /** A label for the down minute button (used by screen readers).  */
    downMinuteLabel: string;
    /** A label for the up hour button (used by screen readers).  */
    upHourLabel: string;
    /** A label for the down hour button (used by screen readers).  */
    downHourLabel: string;
    /** A label for the previous month button (used by screen readers). */
    prevMonthLabel: string;
    /** A label for the next month button (used by screen readers). */
    nextMonthLabel: string;
    /** A label for the previous year button (used by screen readers). */
    prevYearLabel: string;
    /** A label for the next year button (used by screen readers). */
    nextYearLabel: string;
    /** A label for the previous multi-year button (used by screen readers). */
    prevMultiYearLabel: string;
    /** A label for the next multi-year button (used by screen readers). */
    nextMultiYearLabel: string;
    /** A label for the 'switch to month view' button (used by screen readers). */
    switchToMonthViewLabel: string;
    /** A label for the 'switch to year view' button (used by screen readers). */
    switchToMultiYearViewLabel: string;
    /** A label for the cancel button */
    cancelBtnLabel: string;
    /** A label for the set button */
    setBtnLabel: string;
    /** A label for the range 'from' in picker info */
    rangeFromLabel: string;
    /** A label for the range 'to' in picker info */
    rangeToLabel: string;
    /** A label for the hour12 button (AM) */
    hour12AMLabel: string;
    /** A label for the hour12 button (PM) */
    hour12PMLabel: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDateTimeIntl, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OwlDateTimeIntl>;
}

/**
 * calendar.component
 */

declare class OwlCalendarComponent<T> implements OnInit, AfterContentInit, AfterViewChecked, OnDestroy {
    private elmRef;
    private pickerIntl;
    private ngZone;
    private cdRef;
    private dateTimeAdapter;
    private dateTimeFormats;
    DateView: typeof DateView;
    get minDate(): T | null;
    set minDate(value: T | null);
    get maxDate(): T | null;
    set maxDate(value: T | null);
    get pickerMoment(): T;
    set pickerMoment(value: T);
    get selected(): T | null;
    set selected(value: T | null);
    get selecteds(): T[];
    set selecteds(values: T[]);
    get periodButtonText(): string;
    get periodButtonLabel(): string;
    get prevButtonLabel(): string;
    get nextButtonLabel(): string;
    get currentView(): DateViewType;
    set currentView(view: DateViewType);
    get isInSingleMode(): boolean;
    get isInRangeMode(): boolean;
    get showControlArrows(): boolean;
    get isMonthView(): boolean;
    /**
     * Bind class 'owl-dt-calendar' to host
     * */
    get owlDTCalendarClass(): boolean;
    constructor(elmRef: ElementRef, pickerIntl: OwlDateTimeIntl, ngZone: NgZone, cdRef: ChangeDetectorRef, dateTimeAdapter: DateTimeAdapter<T>, dateTimeFormats: OwlDateTimeFormats);
    /**
     * Date filter for the month and year view
     * */
    dateFilter: (date: T) => boolean;
    /**
     * Set the first day of week
     */
    firstDayOfWeek: number;
    /** The minimum selectable date. */
    private _minDate;
    /** The maximum selectable date. */
    private _maxDate;
    /** The current picker moment */
    private _pickerMoment;
    selectMode: SelectMode;
    /** The currently selected moment. */
    private _selected;
    private _selecteds;
    /**
     * The view that the calendar should start in.
     */
    startView: DateViewType;
    /**
     * Whether to should only the year and multi-year views.
     */
    yearOnly: boolean;
    /**
     * Whether to show calendar weeks in the calendar
     * */
    showCalendarWeeks: boolean;
    /**
     * Whether to should only the multi-year view.
     */
    multiyearOnly: boolean;
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     * */
    hideOtherMonths: boolean;
    /** Emits when the currently picker moment changes. */
    pickerMomentChange: EventEmitter<T>;
    /** Emits when the selected date changes. */
    readonly dateClicked: EventEmitter<T>;
    /** Emits when the currently selected date changes. */
    readonly selectedChange: EventEmitter<T>;
    /** Emits when any date is selected. */
    readonly userSelection: EventEmitter<void>;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     * */
    readonly yearSelected: EventEmitter<T>;
    /**
     * Emits the selected month. This doesn't imply a change on the selected date
     * */
    readonly monthSelected: EventEmitter<T>;
    private _currentView;
    private intlChangesSub;
    /**
     * Used for scheduling that focus should be moved to the active cell on the next tick.
     * We need to schedule it, rather than do it immediately, because we have to wait
     * for Angular to re-evaluate the view children.
     */
    private moveFocusOnNextTick;
    /**
     * Date filter for the month and year view
     */
    dateFilterForViews: (date: T) => boolean;
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
     * */
    previousClicked(): void;
    /**
     * Handles user clicks on the next button.
     * */
    nextClicked(): void;
    dateSelected(date: T): void;
    /**
     * Change the pickerMoment value and switch to a specific view
     */
    goToDateInView(date: T, view: DateViewType): void;
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
     * */
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
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlCalendarComponent<any>, "owl-date-time-calendar", ["owlDateTimeCalendar"], { "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "pickerMoment": { "alias": "pickerMoment"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "selecteds": { "alias": "selecteds"; "required": false; }; "dateFilter": { "alias": "dateFilter"; "required": false; }; "firstDayOfWeek": { "alias": "firstDayOfWeek"; "required": false; }; "selectMode": { "alias": "selectMode"; "required": false; }; "startView": { "alias": "startView"; "required": false; }; "yearOnly": { "alias": "yearOnly"; "required": false; }; "showCalendarWeeks": { "alias": "showCalendarWeeks"; "required": false; }; "multiyearOnly": { "alias": "multiyearOnly"; "required": false; }; "hideOtherMonths": { "alias": "hideOtherMonths"; "required": false; }; }, { "pickerMomentChange": "pickerMomentChange"; "dateClicked": "dateClicked"; "selectedChange": "selectedChange"; "userSelection": "userSelection"; "yearSelected": "yearSelected"; "monthSelected": "monthSelected"; }, never, never, false, never>;
}

/**
 * timer.component
 */

declare class OwlTimerComponent<T> implements OnInit {
    private ngZone;
    private elmRef;
    private pickerIntl;
    private cdRef;
    private dateTimeAdapter;
    /** The current picker moment */
    private _pickerMoment;
    get pickerMoment(): T;
    set pickerMoment(value: T);
    /** The minimum selectable date time. */
    private _minDateTime;
    get minDateTime(): T | null;
    set minDateTime(value: T | null);
    /** The maximum selectable date time. */
    private _maxDateTime;
    get maxDateTime(): T | null;
    set maxDateTime(value: T | null);
    private isPM;
    /**
     * Whether to show the second's timer
     */
    showSecondsTimer: boolean;
    /**
     * Whether the timer is in hour12 format
     */
    hour12Timer: boolean;
    /**
     * Hours to change per step
     */
    stepHour: number;
    /**
     * Minutes to change per step
     */
    stepMinute: number;
    /**
     * Seconds to change per step
     */
    stepSecond: number;
    get hourValue(): number;
    /**
     * The value would be displayed in hourBox.
     * We need this because the value displayed in hourBox it not
     * the same as the hourValue when the timer is in hour12Timer mode.
     * */
    get hourBoxValue(): number;
    get minuteValue(): number;
    get secondValue(): number;
    get upHourButtonLabel(): string;
    get downHourButtonLabel(): string;
    get upMinuteButtonLabel(): string;
    get downMinuteButtonLabel(): string;
    get upSecondButtonLabel(): string;
    get downSecondButtonLabel(): string;
    get hour12ButtonLabel(): string;
    selectedChange: EventEmitter<T>;
    get owlDTTimerClass(): boolean;
    get owlDTTimeTabIndex(): number;
    constructor(ngZone: NgZone, elmRef: ElementRef, pickerIntl: OwlDateTimeIntl, cdRef: ChangeDetectorRef, dateTimeAdapter: DateTimeAdapter<T>);
    ngOnInit(): void;
    /**
     * Focus to the host element
     * */
    focus(): void;
    /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     * */
    setHourValueViaInput(hours: number): void;
    setHourValue(hours: number): void;
    setMinuteValue(minutes: number): void;
    setSecondValue(seconds: number): void;
    setMeridiem(event: any): void;
    /**
     * Check if the up hour button is enabled
     */
    upHourEnabled(): boolean;
    /**
     * Check if the down hour button is enabled
     */
    downHourEnabled(): boolean;
    /**
     * Check if the up minute button is enabled
     */
    upMinuteEnabled(): boolean;
    /**
     * Check if the down minute button is enabled
     */
    downMinuteEnabled(): boolean;
    /**
     * Check if the up second button is enabled
     */
    upSecondEnabled(): boolean;
    /**
     * Check if the down second button is enabled
     */
    downSecondEnabled(): boolean;
    /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    private compareHours;
    /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    private compareMinutes;
    /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    private compareSeconds;
    /**
     * Get a valid date object
     */
    private getValidDate;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlTimerComponent<any>, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlTimerComponent<any>, "owl-date-time-timer", ["owlDateTimeTimer"], { "pickerMoment": { "alias": "pickerMoment"; "required": false; }; "minDateTime": { "alias": "minDateTime"; "required": false; }; "maxDateTime": { "alias": "maxDateTime"; "required": false; }; "showSecondsTimer": { "alias": "showSecondsTimer"; "required": false; }; "hour12Timer": { "alias": "hour12Timer"; "required": false; }; "stepHour": { "alias": "stepHour"; "required": false; }; "stepMinute": { "alias": "stepMinute"; "required": false; }; "stepSecond": { "alias": "stepSecond"; "required": false; }; }, { "selectedChange": "selectedChange"; }, never, never, false, never>;
}

/**
 * date-time-picker-container.component
 */

declare class OwlDateTimeContainerComponent<T> implements OnInit, AfterContentInit, AfterViewInit {
    private cdRef;
    private elmRef;
    private pickerIntl;
    private dateTimeAdapter;
    calendar: OwlCalendarComponent<T>;
    timer: OwlTimerComponent<T>;
    picker: OwlDateTime<T>;
    activeSelectedIndex: number;
    private retainStartTime;
    private retainEndTime;
    /**
     * Stream emits when try to hide picker
     * */
    private hidePicker$;
    get hidePickerStream(): Observable<any>;
    /**
     * Stream emits when try to confirm the selected value
     * */
    private confirmSelected$;
    get confirmSelectedStream(): Observable<any>;
    private beforePickerOpened$;
    get beforePickerOpenedStream(): Observable<any>;
    private pickerOpened$;
    get pickerOpenedStream(): Observable<any>;
    /**
     * The current picker moment. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    private _clamPickerMoment;
    get pickerMoment(): T;
    set pickerMoment(value: T);
    get pickerType(): PickerType;
    get cancelLabel(): string;
    get setLabel(): string;
    /**
     * The range 'from' label
     * */
    get fromLabel(): string;
    /**
     * The range 'to' label
     * */
    get toLabel(): string;
    /**
     * The range 'from' formatted value
     * */
    get fromFormattedValue(): string;
    /**
     * The range 'to' formatted value
     * */
    get toFormattedValue(): string;
    /**
     * Cases in which the control buttons show in the picker
     * 1) picker mode is 'dialog'
     * 2) picker type is NOT 'calendar' and the picker mode is NOT 'inline'
     * */
    get showControlButtons(): boolean;
    get containerElm(): HTMLElement;
    get owlDTContainerClass(): boolean;
    get owlDTPopupContainerClass(): boolean;
    get owlDTDialogContainerClass(): boolean;
    get owlDTInlineContainerClass(): boolean;
    get owlDTContainerDisabledClass(): boolean;
    get owlDTContainerId(): string;
    get owlDTContainerAnimation(): any;
    constructor(cdRef: ChangeDetectorRef, elmRef: ElementRef, pickerIntl: OwlDateTimeIntl, dateTimeAdapter: DateTimeAdapter<T>);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    handleContainerAnimationStart(event: AnimationEvent): void;
    handleContainerAnimationDone(event: AnimationEvent): void;
    dateSelected(date: T): void;
    timeSelected(time: T): void;
    /**
     * Handle click on cancel button
     */
    onCancelClicked(event: any): void;
    /**
     * Handle click on set button
     */
    onSetClicked(event: any): void;
    /**
     * Handle click on inform radio group
     */
    handleClickOnInfoGroup(event: any, index: number): void;
    /**
     * Handle click on inform radio group
     */
    handleKeydownOnInfoGroup(event: any, next: any, index: number): void;
    /**
     * Set the value of activeSelectedIndex
     */
    private setActiveSelectedIndex;
    private initPicker;
    /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     */
    private dateSelectedInSingleMode;
    /**
     * Select dates in range Mode
     */
    private dateSelectedInRangeMode;
    /**
     * Update the given calendar date's time and check if it is valid
     * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
     * we need to update the given calendar date's time before selecting it.
     * if it is valid, return the updated dateTime
     * if it is not valid, return null
     */
    private updateAndCheckCalendarDate;
    /**
     * Focus to the picker
     * */
    private focusPicker;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDateTimeContainerComponent<any>, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlDateTimeContainerComponent<any>, "owl-date-time-container", ["owlDateTimeContainer"], {}, {}, never, never, false, never>;
}

/**
 * calendar-body.component
 */

declare class CalendarCell {
    value: number;
    displayValue: string;
    ariaLabel: string;
    enabled: boolean;
    out: boolean;
    cellClass: string;
    isoDate: string;
    constructor(value: number, displayValue: string, ariaLabel: string, enabled: boolean, out?: boolean, cellClass?: string, isoDate?: string);
}
declare class OwlCalendarBodyComponent implements OnInit {
    private elmRef;
    private ngZone;
    /**
     * The cell number of the active cell in the table.
     */
    activeCell: number;
    /**
     * The cells to display in the table.
     * */
    rows: CalendarCell[][];
    /**
     * The number of columns in the table.
     * */
    numCols: number;
    /**
     * The ratio (width / height) to use for the cells in the table.
     */
    cellRatio: number;
    /**
     * The value in the table that corresponds to today.
     * */
    todayValue: number;
    /**
     * The value in the table that is currently selected.
     * */
    selectedValues: number[];
    /**
     * Current picker select mode
     */
    selectMode: SelectMode;
    /**
     * Emit when a calendar cell is selected
     * */
    readonly select: EventEmitter<CalendarCell>;
    get owlDTCalendarBodyClass(): boolean;
    get isInSingleMode(): boolean;
    get isInRangeMode(): boolean;
    constructor(elmRef: ElementRef, ngZone: NgZone);
    ngOnInit(): void;
    selectCell(cell: CalendarCell): void;
    isActiveCell(rowIndex: number, colIndex: number): boolean;
    /**
     * Check if the cell is selected
     */
    isSelected(value: number): boolean;
    /**
     * Check if the cell in the range
     * */
    isInRange(value: number): boolean;
    /**
     * Check if the cell is the range from
     * */
    isRangeFrom(value: number): boolean;
    /**
     * Check if the cell is the range to
     * */
    isRangeTo(value: number): boolean;
    /**
     * Focus to a active cell
     * */
    focusActiveCell(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlCalendarBodyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlCalendarBodyComponent, "[owl-date-time-calendar-body]", ["owlDateTimeCalendarBody"], { "activeCell": { "alias": "activeCell"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "numCols": { "alias": "numCols"; "required": false; }; "cellRatio": { "alias": "cellRatio"; "required": false; }; "todayValue": { "alias": "todayValue"; "required": false; }; "selectedValues": { "alias": "selectedValues"; "required": false; }; "selectMode": { "alias": "selectMode"; "required": false; }; }, { "select": "select"; }, never, never, false, never>;
}

/**
 * calendar-multi-year-view.component
 */

declare class OwlMultiYearViewComponent<T> implements OnInit, AfterContentInit {
    private cdRef;
    private pickerIntl;
    private dateTimeAdapter;
    private options;
    /**
     * The select mode of the picker;
     * */
    private _selectMode;
    get selectMode(): SelectMode;
    set selectMode(val: SelectMode);
    /** The currently selected date. */
    private _selected;
    get selected(): T | null;
    set selected(value: T | null);
    private _selecteds;
    get selecteds(): T[];
    set selecteds(values: T[]);
    private _pickerMoment;
    get pickerMoment(): T;
    set pickerMoment(value: T);
    /**
     * A function used to filter which dates are selectable
     * */
    private _dateFilter;
    get dateFilter(): (date: T) => boolean;
    set dateFilter(filter: (date: T) => boolean);
    /** The minimum selectable date. */
    private _minDate;
    get minDate(): T | null;
    set minDate(value: T | null);
    /** The maximum selectable date. */
    private _maxDate;
    get maxDate(): T | null;
    set maxDate(value: T | null);
    private _todayYear;
    get todayYear(): number;
    private _years;
    get years(): CalendarCell[][];
    private _selectedYears;
    get selectedYears(): number[];
    private initiated;
    get isInSingleMode(): boolean;
    get isInRangeMode(): boolean;
    get activeCell(): number;
    get tableHeader(): string;
    get prevButtonLabel(): string;
    get nextButtonLabel(): string;
    /**
     * Callback to invoke when a new month is selected
     * */
    readonly change: EventEmitter<T>;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     * */
    readonly yearSelected: EventEmitter<T>;
    /** Emits when any date is activated. */
    readonly pickerMomentChange: EventEmitter<T>;
    /** Emits when use keyboard enter to select a calendar cell */
    readonly keyboardEnter: EventEmitter<any>;
    /** The body of calendar table */
    calendarBodyElm: OwlCalendarBodyComponent;
    get owlDTCalendarView(): boolean;
    get owlDTCalendarMultiYearView(): boolean;
    constructor(cdRef: ChangeDetectorRef, pickerIntl: OwlDateTimeIntl, dateTimeAdapter: DateTimeAdapter<T>, options: any);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    /**
     * Handle a calendarCell selected
     */
    selectCalendarCell(cell: CalendarCell): void;
    private selectYear;
    /**
     * Generate the previous year list
     * */
    prevYearList(event: any): void;
    /**
     * Generate the next year list
     * */
    nextYearList(event: any): void;
    generateYearList(): void;
    /** Whether the previous period button is enabled. */
    previousEnabled(): boolean;
    /** Whether the next period button is enabled. */
    nextEnabled(): boolean;
    handleCalendarKeydown(event: KeyboardEvent): void;
    /**
     * Creates an CalendarCell for the given year.
     */
    private createYearCell;
    private setSelectedYears;
    /** Whether the given year is enabled. */
    private isYearEnabled;
    private isSameYearList;
    /**
     * Get a valid date object
     */
    private getValidDate;
    private focusActiveCell;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlMultiYearViewComponent<any>, [null, null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlMultiYearViewComponent<any>, "owl-date-time-multi-year-view", never, { "selectMode": { "alias": "selectMode"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "selecteds": { "alias": "selecteds"; "required": false; }; "pickerMoment": { "alias": "pickerMoment"; "required": false; }; "dateFilter": { "alias": "dateFilter"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; }, { "change": "change"; "yearSelected": "yearSelected"; "pickerMomentChange": "pickerMomentChange"; "keyboardEnter": "keyboardEnter"; }, never, never, false, never>;
}

/**
 * calendar-year-view.component
 */

declare class OwlYearViewComponent<T> implements OnInit, AfterContentInit, OnDestroy {
    private cdRef;
    private dateTimeAdapter;
    private dateTimeFormats;
    /**
     * The select mode of the picker;
     * */
    private _selectMode;
    get selectMode(): SelectMode;
    set selectMode(val: SelectMode);
    /** The currently selected date. */
    private _selected;
    get selected(): T | null;
    set selected(value: T | null);
    private _selecteds;
    get selecteds(): T[];
    set selecteds(values: T[]);
    private _pickerMoment;
    get pickerMoment(): T;
    set pickerMoment(value: T);
    /**
     * A function used to filter which dates are selectable
     * */
    private _dateFilter;
    get dateFilter(): (date: T) => boolean;
    set dateFilter(filter: (date: T) => boolean);
    /** The minimum selectable date. */
    private _minDate;
    get minDate(): T | null;
    set minDate(value: T | null);
    /** The maximum selectable date. */
    private _maxDate;
    get maxDate(): T | null;
    set maxDate(value: T | null);
    private readonly monthNames;
    private _months;
    get months(): CalendarCell[][];
    get activeCell(): number;
    get isInSingleMode(): boolean;
    get isInRangeMode(): boolean;
    private localeSub;
    private initiated;
    todayMonth: number | null;
    /**
     * An array to hold all selectedDates' month value
     * the value is the month number in current year
     * */
    selectedMonths: number[];
    /**
     * Callback to invoke when a new month is selected
     * */
    readonly change: EventEmitter<T>;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     * */
    readonly monthSelected: EventEmitter<T>;
    /** Emits when any date is activated. */
    readonly pickerMomentChange: EventEmitter<T>;
    /** Emits when use keyboard enter to select a calendar cell */
    readonly keyboardEnter: EventEmitter<any>;
    /** The body of calendar table */
    calendarBodyElm: OwlCalendarBodyComponent;
    get owlDTCalendarView(): boolean;
    constructor(cdRef: ChangeDetectorRef, dateTimeAdapter: DateTimeAdapter<T>, dateTimeFormats: OwlDateTimeFormats);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * Handle a calendarCell selected
     */
    selectCalendarCell(cell: CalendarCell): void;
    /**
     * Handle a new month selected
     */
    private selectMonth;
    /**
     * Handle keydown event on calendar body
     */
    handleCalendarKeydown(event: KeyboardEvent): void;
    /**
     * Generate the calendar month list
     * */
    private generateMonthList;
    /**
     * Creates an CalendarCell for the given month.
     */
    private createMonthCell;
    /**
     * Check if the given month is enable
     */
    private isMonthEnabled;
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    private getMonthInCurrentYear;
    /**
     * Set the selectedMonths value
     * In single mode, it has only one value which represent the month the selected date in
     * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
     * */
    private setSelectedMonths;
    /**
     * Check the given dates are in the same year
     */
    private hasSameYear;
    /**
     * Get a valid date object
     */
    private getValidDate;
    private focusActiveCell;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlYearViewComponent<any>, [null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlYearViewComponent<any>, "owl-date-time-year-view", ["owlMonthView"], { "selectMode": { "alias": "selectMode"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "selecteds": { "alias": "selecteds"; "required": false; }; "pickerMoment": { "alias": "pickerMoment"; "required": false; }; "dateFilter": { "alias": "dateFilter"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; }, { "change": "change"; "monthSelected": "monthSelected"; "pickerMomentChange": "pickerMomentChange"; "keyboardEnter": "keyboardEnter"; }, never, never, false, never>;
}

/**
 * calendar-month-view.component
 */

declare class OwlMonthViewComponent<T> implements OnInit, AfterContentInit, OnDestroy {
    private cdRef;
    private dateTimeAdapter;
    private dateTimeFormats;
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     * */
    hideOtherMonths: boolean;
    /**
     * Whether to show calendar weeks in the calendar
     * */
    showCalendarWeeks: boolean;
    private isDefaultFirstDayOfWeek;
    /**
     * Define the first day of a week
     * Sunday: 0 - Saturday: 6
     * */
    private _firstDayOfWeek;
    get firstDayOfWeek(): number;
    set firstDayOfWeek(val: number);
    /**
     * The select mode of the picker;
     * */
    private _selectMode;
    get selectMode(): SelectMode;
    set selectMode(val: SelectMode);
    /** The currently selected date. */
    private _selected;
    get selected(): T | null;
    set selected(value: T | null);
    private _selecteds;
    get selecteds(): T[];
    set selecteds(values: T[]);
    private _pickerMoment;
    get pickerMoment(): T;
    set pickerMoment(value: T);
    /**
     * A function used to filter which dates are selectable
     * */
    private _dateFilter;
    get dateFilter(): (date: T) => boolean;
    set dateFilter(filter: (date: T) => boolean);
    /** The minimum selectable date. */
    private _minDate;
    get minDate(): T | null;
    set minDate(value: T | null);
    /** The maximum selectable date. */
    private _maxDate;
    get maxDate(): T | null;
    set maxDate(value: T | null);
    private _weekdays;
    get weekdays(): {
        long: string;
        short: string;
        narrow: string;
    }[];
    private _days;
    get days(): CalendarCell[][];
    get activeCell(): number;
    get isInSingleMode(): boolean;
    get isInRangeMode(): boolean;
    private firstDateOfMonth;
    private localeSub;
    private initiated;
    private dateNames;
    /**
     * The date of the month that today falls on.
     * */
    todayDate: number | null;
    /**
     * Week day numbers
     * */
    weekNumbers: number[];
    /**
     * An array to hold all selectedDates' value
     * the value is the day number in current month
     * */
    selectedDates: number[];
    firstRowOffset: number;
    /**
     * Callback to invoke when a new date is selected
     * */
    readonly selectedChange: EventEmitter<T>;
    /**
     * Callback to invoke when any date is selected.
     * */
    readonly userSelection: EventEmitter<void>;
    /** Emits when any date is activated. */
    readonly pickerMomentChange: EventEmitter<T>;
    /** The body of calendar table */
    calendarBodyElm: OwlCalendarBodyComponent;
    get owlDTCalendarView(): boolean;
    constructor(cdRef: ChangeDetectorRef, dateTimeAdapter: DateTimeAdapter<T>, dateTimeFormats: OwlDateTimeFormats);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * Handle a calendarCell selected
     */
    selectCalendarCell(cell: CalendarCell): void;
    /**
     * Handle a new date selected
     */
    private selectDate;
    /**
     * Handle keydown event on calendar body
     */
    handleCalendarKeydown(event: KeyboardEvent): void;
    /**
     * Generate the calendar weekdays array
     * */
    private generateWeekDays;
    /**
     * Generate the calendar days array
     * */
    private generateCalendar;
    getISOWeek(isoDate: string): number;
    private updateFirstDayOfWeek;
    /**
     * Creates CalendarCell for days.
     */
    private createDateCell;
    /**
     * Check if the date is valid
     */
    private isDateEnabled;
    /**
     * Get a valid date object
     */
    private getValidDate;
    /**
     * Check if the give dates are none-null and in the same month
     */
    isSameMonth(dateLeft: T, dateRight: T): boolean;
    /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     * */
    private setSelectedDates;
    private focusActiveCell;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlMonthViewComponent<any>, [null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlMonthViewComponent<any>, "owl-date-time-month-view", ["owlYearView"], { "hideOtherMonths": { "alias": "hideOtherMonths"; "required": false; }; "showCalendarWeeks": { "alias": "showCalendarWeeks"; "required": false; }; "firstDayOfWeek": { "alias": "firstDayOfWeek"; "required": false; }; "selectMode": { "alias": "selectMode"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "selecteds": { "alias": "selecteds"; "required": false; }; "pickerMoment": { "alias": "pickerMoment"; "required": false; }; "dateFilter": { "alias": "dateFilter"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; }, { "selectedChange": "selectedChange"; "userSelection": "userSelection"; "pickerMomentChange": "pickerMomentChange"; }, never, never, false, never>;
}

/**
 * timer-box.component
 */

declare class OwlTimerBoxComponent implements OnInit, OnDestroy {
    showDivider: boolean;
    upBtnAriaLabel: string;
    upBtnDisabled: boolean;
    downBtnAriaLabel: string;
    downBtnDisabled: boolean;
    /**
     * Value would be displayed in the box
     * If it is null, the box would display [value]
     * */
    boxValue: number;
    value: number;
    min: number;
    max: number;
    step: number;
    inputLabel: string;
    valueChange: EventEmitter<number>;
    inputChange: EventEmitter<number>;
    private inputStream;
    private inputStreamSub;
    private hasFocus;
    get displayValue(): string;
    get owlDTTimerBoxClass(): boolean;
    private valueInput;
    private onValueInputMouseWheelBind;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    upBtnClicked(): void;
    downBtnClicked(): void;
    handleInputChange(val: string): void;
    focusIn(): void;
    focusOut(value: string): void;
    private updateValue;
    private updateValueViaInput;
    private onValueInputMouseWheel;
    private bindValueInputMouseWheel;
    private unbindValueInputMouseWheel;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlTimerBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlTimerBoxComponent, "owl-date-time-timer-box", ["owlDateTimeTimerBox"], { "showDivider": { "alias": "showDivider"; "required": false; }; "upBtnAriaLabel": { "alias": "upBtnAriaLabel"; "required": false; }; "upBtnDisabled": { "alias": "upBtnDisabled"; "required": false; }; "downBtnAriaLabel": { "alias": "downBtnAriaLabel"; "required": false; }; "downBtnDisabled": { "alias": "downBtnDisabled"; "required": false; }; "boxValue": { "alias": "boxValue"; "required": false; }; "value": { "alias": "value"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "step": { "alias": "step"; "required": false; }; "inputLabel": { "alias": "inputLabel"; "required": false; }; }, { "valueChange": "valueChange"; "inputChange": "inputChange"; }, never, never, false, never>;
}

/**
 * hour-input.component
 */

declare class OwlHourInputComponent implements ControlValueAccessor {
    private pickerIntl;
    upBtnAriaLabel: string;
    downBtnAriaLabel: string;
    private _value;
    get value(): number;
    set value(value: number);
    min: number;
    max: number;
    step: number;
    hour12Timer: boolean;
    disabled: boolean;
    valueChange: EventEmitter<number>;
    private isPM;
    constructor(pickerIntl: OwlDateTimeIntl);
    get hour12ButtonLabel(): string;
    get owlHourInputClass(): boolean;
    get hourValue(): number;
    get boxValue(): number;
    upBtnClicked(): void;
    downBtnClicked(): void;
    setValueViaInput(hours: number): void;
    setValue(hours: number): void;
    setMeridian(): void;
    private valueChanged;
    onChange: any;
    onTouch: any;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlHourInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlHourInputComponent, "owl-hour-input", ["owlHourInput"], { "upBtnAriaLabel": { "alias": "upBtnAriaLabel"; "required": false; }; "downBtnAriaLabel": { "alias": "downBtnAriaLabel"; "required": false; }; "value": { "alias": "value"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "step": { "alias": "step"; "required": false; }; "hour12Timer": { "alias": "hour12Timer"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, false, never>;
}

/**
 * numberFixedLen.pipe
 */

declare class NumberFixedLenPipe implements PipeTransform {
    transform(num: number, len: number): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumberFixedLenPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NumberFixedLenPipe, "numberFixedLen", false>;
}

/**
 * date-time-inline.component
 */

declare class OwlDateTimeInlineComponent<T> extends OwlDateTime<T> implements OnInit, ControlValueAccessor {
    protected changeDetector: ChangeDetectorRef;
    protected dateTimeAdapter: DateTimeAdapter<T>;
    protected dateTimeFormats: OwlDateTimeFormats;
    container: OwlDateTimeContainerComponent<T>;
    /**
     * Set the type of the dateTime picker
     *      'both' -- show both calendar and timer
     *      'calendar' -- show only calendar
     *      'timer' -- show only timer
     */
    private _pickerType;
    get pickerType(): PickerType;
    set pickerType(val: PickerType);
    private _disabled;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _selectMode;
    get selectMode(): SelectMode;
    set selectMode(mode: SelectMode);
    /** The date to open the calendar to initially. */
    private _startAt;
    get startAt(): T | null;
    set startAt(date: T | null);
    /** The date to open for range calendar. */
    private _endAt;
    get endAt(): T | null;
    set endAt(date: T | null);
    private _dateTimeFilter;
    get dateTimeFilter(): (date: T | null) => boolean;
    set dateTimeFilter(filter: (date: T | null) => boolean);
    /** The minimum valid date. */
    private _min;
    get minDateTime(): T | null;
    set minDateTime(value: T | null);
    /** The maximum valid date. */
    private _max;
    get maxDateTime(): T | null;
    set maxDateTime(value: T | null);
    private _value;
    get value(): T | null;
    set value(value: T | null);
    private _values;
    get values(): T[];
    set values(values: T[]);
    /**
     * Emits selected year in multi-year view
     * This doesn't imply a change on the selected date.
     * */
    yearSelected: EventEmitter<T>;
    /**
     * Emits selected month in year view
     * This doesn't imply a change on the selected date.
     * */
    monthSelected: EventEmitter<T>;
    /**
     * Emits selected date
     * */
    dateSelected: EventEmitter<T>;
    private _selected;
    get selected(): T | null;
    set selected(value: T | null);
    private _selecteds;
    get selecteds(): T[];
    set selecteds(values: T[]);
    get opened(): boolean;
    get pickerMode(): PickerMode;
    get isInSingleMode(): boolean;
    get isInRangeMode(): boolean;
    get owlDTInlineClass(): boolean;
    private onModelChange;
    private onModelTouched;
    constructor(changeDetector: ChangeDetectorRef, dateTimeAdapter: DateTimeAdapter<T>, dateTimeFormats: OwlDateTimeFormats);
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    select(date: T[] | T): void;
    /**
     * Emits the selected year in multi-year view
     * */
    selectYear(normalizedYear: T): void;
    /**
     * Emits selected month in year view
     * */
    selectMonth(normalizedMonth: T): void;
    /**
     * Emits the selected date
     * */
    selectDate(normalizedDate: T): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDateTimeInlineComponent<any>, [null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OwlDateTimeInlineComponent<any>, "owl-date-time-inline", never, { "pickerType": { "alias": "pickerType"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selectMode": { "alias": "selectMode"; "required": false; }; "startAt": { "alias": "startAt"; "required": false; }; "endAt": { "alias": "endAt"; "required": false; }; "dateTimeFilter": { "alias": "owlDateTimeFilter"; "required": false; }; "minDateTime": { "alias": "min"; "required": false; }; "maxDateTime": { "alias": "max"; "required": false; }; "value": { "alias": "value"; "required": false; }; "values": { "alias": "values"; "required": false; }; }, { "yearSelected": "yearSelected"; "monthSelected": "monthSelected"; "dateSelected": "dateSelected"; }, never, never, false, never>;
}

declare class OwlDialogModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDialogModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OwlDialogModule, [typeof OwlDialogContainerComponent], [typeof i2.CommonModule, typeof i3.A11yModule, typeof i4.OverlayModule, typeof i5.PortalModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OwlDialogModule>;
}

declare class OwlDateTimeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlDateTimeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OwlDateTimeModule, [typeof OwlDateTimeTriggerDirective, typeof OwlDateTimeInputDirective, typeof OwlDateTimeComponent, typeof OwlDateTimeContainerComponent, typeof OwlMultiYearViewComponent, typeof OwlYearViewComponent, typeof OwlMonthViewComponent, typeof OwlTimerComponent, typeof OwlTimerBoxComponent, typeof OwlHourInputComponent, typeof OwlCalendarComponent, typeof OwlCalendarBodyComponent, typeof NumberFixedLenPipe, typeof OwlDateTimeInlineComponent], [typeof i2.CommonModule, typeof i4.OverlayModule, typeof OwlDialogModule, typeof i3.A11yModule], [typeof OwlCalendarComponent, typeof OwlTimerComponent, typeof OwlDateTimeTriggerDirective, typeof OwlDateTimeInputDirective, typeof OwlDateTimeComponent, typeof OwlDateTimeInlineComponent, typeof OwlMultiYearViewComponent, typeof OwlYearViewComponent, typeof OwlMonthViewComponent, typeof OwlTimerBoxComponent, typeof OwlHourInputComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OwlDateTimeModule>;
}

declare class NativeDateTimeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NativeDateTimeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NativeDateTimeModule, never, [typeof i1.PlatformModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NativeDateTimeModule>;
}
declare class OwlNativeDateTimeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<OwlNativeDateTimeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OwlNativeDateTimeModule, never, [typeof NativeDateTimeModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OwlNativeDateTimeModule>;
}

declare class UnixTimestampDateTimeAdapter extends DateTimeAdapter<number> {
    private owlDateTimeLocale;
    firstMonthOfTheYear: number;
    firstDayOfTheWeek: number;
    constructor(owlDateTimeLocale: string, platform: Platform);
    /** Whether to clamp the date between 1 and 9999 to avoid IE and Edge errors. */
    private readonly _clampDate;
    /**
     * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
     * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
     * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
     * will produce `'8/13/1800'`.
     */
    useUtcForDisplay: boolean;
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     */
    private static search_ltr_rtl_pattern;
    private static stripDirectionalityCharacters;
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     */
    private static _format;
    addCalendarDays(date: number, amount: number): number;
    addCalendarMonths(date: number, amount: number): number;
    addCalendarYears(date: number, amount: number): number;
    clone(date: number): number;
    createDate(year: number, month: number, date: number, hours?: number, minutes?: number, seconds?: number): number;
    differenceInCalendarDays(dateLeft: number, dateRight: number): number;
    format(date: number, displayFormat: any): string;
    getDate(date: number): number;
    getDateNames(): string[];
    getDay(date: number): number;
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    getHours(date: number): number;
    getMinutes(date: number): number;
    getMonth(date: number): number;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getNumDaysInMonth(date: number): number;
    getSeconds(date: number): number;
    getTime(date: number): number;
    getYear(date: number): number;
    getYearName(date: number): string;
    invalid(): number;
    isDateInstance(obj: any): boolean;
    isEqual(dateLeft: number, dateRight: number): boolean;
    isSameDay(dateLeft: number, dateRight: number): boolean;
    isValid(date: number): boolean;
    now(): number;
    parse(value: any, parseFormat: any): number | null;
    setHours(date: number, amount: number): number;
    setMinutes(date: number, amount: number): number;
    setSeconds(date: number, amount: number): number;
    toIso8601(date: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnixTimestampDateTimeAdapter, [{ optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnixTimestampDateTimeAdapter>;
}

/**
 * unix-timestamp-date-time-format.class
 */

declare const OWL_UNIX_TIMESTAMP_DATE_TIME_FORMATS: OwlDateTimeFormats;

declare class NativeDateTimeAdapter extends DateTimeAdapter<Date> {
    private owlDateTimeLocale;
    firstMonthOfTheYear: number;
    firstDayOfTheWeek: number;
    /** Whether to clamp the date between 1 and 9999 to avoid IE and Edge errors. */
    private readonly _clampDate;
    /**
     * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
     * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
     * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
     * will produce `'8/13/1800'`.
     */
    useUtcForDisplay: boolean;
    constructor(owlDateTimeLocale: string, platform: Platform);
    getYear(date: Date): number;
    getMonth(date: Date): number;
    getDay(date: Date): number;
    getDate(date: Date): number;
    getHours(date: Date): number;
    getMinutes(date: Date): number;
    getSeconds(date: Date): number;
    getTime(date: Date): number;
    getNumDaysInMonth(date: Date): number;
    differenceInCalendarDays(dateLeft: Date, dateRight: Date): number;
    getYearName(date: Date): string;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    getDateNames(): string[];
    toIso8601(date: Date): string;
    isEqual(dateLeft: Date, dateRight: Date): boolean;
    isSameDay(dateLeft: Date, dateRight: Date): boolean;
    isValid(date: Date): boolean;
    invalid(): Date;
    isDateInstance(obj: any): boolean;
    addCalendarYears(date: Date, amount: number): Date;
    addCalendarMonths(date: Date, amount: number): Date;
    addCalendarDays(date: Date, amount: number): Date;
    setHours(date: Date, amount: number): Date;
    setMinutes(date: Date, amount: number): Date;
    setSeconds(date: Date, amount: number): Date;
    createDate(year: number, month: number, date: number, hours?: number, minutes?: number, seconds?: number): Date;
    clone(date: Date): Date;
    now(): Date;
    format(date: Date, displayFormat: any): string;
    parse(value: any, parseFormat: any): Date | null;
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     */
    deserialize(value: any): Date | null;
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     */
    private stripDirectionalityCharacters;
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     */
    private _format;
    static ɵfac: i0.ɵɵFactoryDeclaration<NativeDateTimeAdapter, [{ optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NativeDateTimeAdapter>;
}

declare function defaultOptionsFactory(): Options;
declare function multiYearOptionsFactory(options: Options): {
    yearsPerRow: number;
    yearRows: number;
};
interface Options {
    multiYear: {
        yearsPerRow: number;
        yearRows: number;
    };
}
declare class DefaultOptions {
    static create(): Options;
}
declare abstract class OptionsTokens {
    static all: InjectionToken<Options>;
    static multiYear: InjectionToken<{
        yearsPerRow: number;
        yearRows: number;
    }>;
}
declare const optionsProviders: Provider[];

export { CalendarCell, DateTimeAdapter, DateView, DefaultOptions, NativeDateTimeAdapter, OWL_DATETIME_VALIDATORS, OWL_DATETIME_VALUE_ACCESSOR, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_LOCALE_PROVIDER, OWL_UNIX_TIMESTAMP_DATE_TIME_FORMATS, OptionsTokens, OwlCalendarBodyComponent, OwlCalendarComponent, OwlDateTimeComponent, OwlDateTimeInlineComponent, OwlDateTimeInputDirective, OwlDateTimeIntl, OwlDateTimeModule, OwlDateTimeTriggerDirective, OwlHourInputComponent, OwlMonthViewComponent, OwlMultiYearViewComponent, OwlNativeDateTimeModule, OwlTimerBoxComponent, OwlTimerComponent, OwlYearViewComponent, UnixTimestampDateTimeAdapter, defaultOptionsFactory, multiYearOptionsFactory, optionsProviders };
export type { DateViewType, Options, OwlDateTimeFormats, PickerMode, PickerType, SelectMode };
