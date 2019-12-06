/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * date-time-picker.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { OwlDateTime } from './date-time.class';
import { OwlDialogService } from '../dialog/dialog.service';
import { merge, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
/**
 * Injection token that determines the scroll handling while the dtPicker is open.
 * @type {?}
 */
export var OWL_DTPICKER_SCROLL_STRATEGY = new InjectionToken('owl-dtpicker-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.block(); });
}
/**
 * \@docs-private
 * @type {?}
 */
export var OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DTPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/**
 * @template T
 */
var OwlDateTimeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OwlDateTimeComponent, _super);
    function OwlDateTimeComponent(overlay, viewContainerRef, dialogService, ngZone, changeDetector, dateTimeAdapter, defaultScrollStrategy, dateTimeFormats, document) {
        var _this = _super.call(this, dateTimeAdapter, dateTimeFormats) || this;
        _this.overlay = overlay;
        _this.viewContainerRef = viewContainerRef;
        _this.dialogService = dialogService;
        _this.ngZone = ngZone;
        _this.changeDetector = changeDetector;
        _this.dateTimeAdapter = dateTimeAdapter;
        _this.dateTimeFormats = dateTimeFormats;
        _this.document = document;
        /**
         * Custom class for the picker backdrop.
         */
        _this.backdropClass = [];
        /**
         * Custom class for the picker overlay pane.
         */
        _this.panelClass = [];
        /**
         * Set the type of the dateTime picker
         *      'both' -- show both calendar and timer
         *      'calendar' -- show only calendar
         *      'timer' -- show only timer
         */
        _this._pickerType = 'both';
        /**
         * Whether the picker open as a dialog
         */
        _this._pickerMode = 'popup';
        /**
         * Whether the calendar is open.
         */
        _this._opened = false;
        /**
         * Callback when the picker is closed
         */
        _this.afterPickerClosed = new EventEmitter();
        /**
         * Callback when the picker is open
         */
        _this.afterPickerOpen = new EventEmitter();
        /**
         * Emits selected year in multi-year view
         * This doesn't imply a change on the selected date.
         */
        _this.yearSelected = new EventEmitter();
        /**
         * Emits selected month in year view
         * This doesn't imply a change on the selected date.
         */
        _this.monthSelected = new EventEmitter();
        /**
         * Emit when the selected value has been confirmed
         */
        _this.confirmSelectedChange = new EventEmitter();
        /**
         * Emits when the date time picker is disabled.
         */
        _this.disabledChange = new EventEmitter();
        _this.dtInputSub = Subscription.EMPTY;
        _this.hidePickerStreamSub = Subscription.EMPTY;
        _this.confirmSelectedStreamSub = Subscription.EMPTY;
        _this.pickerOpenedStreamSub = Subscription.EMPTY;
        /**
         * The element that was focused before the date time picker was opened.
         */
        _this.focusedElementBeforeOpen = null;
        _this._selecteds = [];
        _this.defaultScrollStrategy = defaultScrollStrategy;
        return _this;
    }
    Object.defineProperty(OwlDateTimeComponent.prototype, "startAt", {
        get: /**
         * @return {?}
         */
        function () {
            // If an explicit startAt is set we start there, otherwise we start at whatever the currently
            // selected value is.
            if (this._startAt) {
                return this._startAt;
            }
            if (this._dtInput) {
                if (this._dtInput.selectMode === 'single') {
                    return this._dtInput.value || null;
                }
                else if (this._dtInput.selectMode === 'range' ||
                    this._dtInput.selectMode === 'rangeFrom') {
                    return this._dtInput.values[0] || null;
                }
                else if (this._dtInput.selectMode === 'rangeTo') {
                    return this._dtInput.values[1] || null;
                }
            }
            else {
                return null;
            }
        },
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(date));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "pickerType", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pickerType;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val !== this._pickerType) {
                this._pickerType = val;
                if (this._dtInput) {
                    this._dtInput.formatNativeInputValue();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "pickerMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pickerMode;
        },
        set: /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            if (mode === 'popup') {
                this._pickerMode = mode;
            }
            else {
                this._pickerMode = 'dialog';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled === undefined && this._dtInput
                ? this._dtInput.disabled
                : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceBooleanProperty(value);
            if (value !== this._disabled) {
                this._disabled = value;
                this.disabledChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "opened", {
        get: /**
         * @return {?}
         */
        function () {
            return this._opened;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            val ? this.open() : this.close();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "dtInput", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selected = value;
            this.changeDetector.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "selecteds", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selecteds;
        },
        set: /**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            this._selecteds = values;
            this.changeDetector.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "minDateTime", {
        /** The minimum selectable date. */
        get: /**
         * The minimum selectable date.
         * @return {?}
         */
        function () {
            return this._dtInput && this._dtInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "maxDateTime", {
        /** The maximum selectable date. */
        get: /**
         * The maximum selectable date.
         * @return {?}
         */
        function () {
            return this._dtInput && this._dtInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "dateTimeFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput && this._dtInput.dateTimeFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "selectMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput.selectMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput.isInSingleMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "isInRangeMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput.isInRangeMode;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDateTimeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    OwlDateTimeComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        this.dtInputSub.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
        }
    };
    /**
     * @param {?} input
     * @return {?}
     */
    OwlDateTimeComponent.prototype.registerInput = /**
     * @param {?} input
     * @return {?}
     */
    function (input) {
        var _this = this;
        if (this._dtInput) {
            throw Error('A Owl DateTimePicker can only be associated with a single input.');
        }
        this._dtInput = input;
        this.dtInputSub = this._dtInput.valueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (Array.isArray(value)) {
                _this.selecteds = value;
            }
            else {
                _this.selected = value;
            }
        }));
    };
    /**
     * @return {?}
     */
    OwlDateTimeComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._opened || this.disabled) {
            return;
        }
        if (!this._dtInput) {
            throw Error('Attempted to open an DateTimePicker with no associated input.');
        }
        if (this.document) {
            this.focusedElementBeforeOpen = this.document.activeElement;
        }
        // reset the picker selected value
        if (this.isInSingleMode) {
            this.selected = this._dtInput.value;
        }
        else if (this.isInRangeMode) {
            this.selecteds = this._dtInput.values;
        }
        // when the picker is open , we make sure the picker's current selected time value
        // is the same as the _startAt time value.
        if (this.selected && this.pickerType !== 'calendar' && this._startAt) {
            this.selected = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.selected), this.dateTimeAdapter.getMonth(this.selected), this.dateTimeAdapter.getDate(this.selected), this.dateTimeAdapter.getHours(this._startAt), this.dateTimeAdapter.getMinutes(this._startAt), this.dateTimeAdapter.getSeconds(this._startAt));
        }
        this.pickerMode === 'dialog' ? this.openAsDialog() : this.openAsPopup();
        this.pickerContainer.picker = this;
        // Listen to picker container's hidePickerStream
        this.hidePickerStreamSub = this.pickerContainer.hidePickerStream.subscribe((/**
         * @return {?}
         */
        function () {
            _this.close();
        }));
        // Listen to picker container's confirmSelectedStream
        this.confirmSelectedStreamSub = this.pickerContainer.confirmSelectedStream.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.confirmSelect(event);
        }));
    };
    /**
     * Selects the given date
     */
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeComponent.prototype.select = /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (Array.isArray(date)) {
            this.selecteds = tslib_1.__spread(date);
        }
        else {
            this.selected = date;
        }
        /**
         * Cases in which automatically confirm the select when date or dates are selected:
         * 1) picker mode is NOT 'dialog'
         * 2) picker type is 'calendar' and selectMode is 'single'.
         * 3) picker type is 'calendar' and selectMode is 'range' and
         *    the 'selecteds' has 'from'(selecteds[0]) and 'to'(selecteds[1]) values.
         * 4) selectMode is 'rangeFrom' and selecteds[0] has value.
         * 5) selectMode is 'rangeTo' and selecteds[1] has value.
         */
        if (this.pickerMode !== 'dialog' &&
            this.pickerType === 'calendar' &&
            ((this.selectMode === 'single' && this.selected) ||
                (this.selectMode === 'rangeFrom' && this.selecteds[0]) ||
                (this.selectMode === 'rangeTo' && this.selecteds[1]) ||
                (this.selectMode === 'range' &&
                    this.selecteds[0] &&
                    this.selecteds[1]))) {
            this.confirmSelect();
        }
    };
    /**
     * Emits the selected year in multi-year view
     */
    /**
     * Emits the selected year in multi-year view
     * @param {?} normalizedYear
     * @return {?}
     */
    OwlDateTimeComponent.prototype.selectYear = /**
     * Emits the selected year in multi-year view
     * @param {?} normalizedYear
     * @return {?}
     */
    function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /**
     * Emits selected month in year view
     */
    /**
     * Emits selected month in year view
     * @param {?} normalizedMonth
     * @return {?}
     */
    OwlDateTimeComponent.prototype.selectMonth = /**
     * Emits selected month in year view
     * @param {?} normalizedMonth
     * @return {?}
     */
    function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    /**
     * Hide the picker
     */
    /**
     * Hide the picker
     * @return {?}
     */
    OwlDateTimeComponent.prototype.close = /**
     * Hide the picker
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._opened) {
            return;
        }
        if (this.popupRef && this.popupRef.hasAttached()) {
            this.popupRef.detach();
        }
        if (this.pickerContainerPortal &&
            this.pickerContainerPortal.isAttached) {
            this.pickerContainerPortal.detach();
        }
        if (this.hidePickerStreamSub) {
            this.hidePickerStreamSub.unsubscribe();
            this.hidePickerStreamSub = null;
        }
        if (this.confirmSelectedStreamSub) {
            this.confirmSelectedStreamSub.unsubscribe();
            this.confirmSelectedStreamSub = null;
        }
        if (this.pickerOpenedStreamSub) {
            this.pickerOpenedStreamSub.unsubscribe();
            this.pickerOpenedStreamSub = null;
        }
        if (this.dialogRef) {
            this.dialogRef.close();
            this.dialogRef = null;
        }
        /** @type {?} */
        var completeClose = (/**
         * @return {?}
         */
        function () {
            if (_this._opened) {
                _this._opened = false;
                _this.afterPickerClosed.emit(null);
                _this.focusedElementBeforeOpen = null;
            }
        });
        if (this.focusedElementBeforeOpen &&
            typeof this.focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this.focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    };
    /**
     * Confirm the selected value
     */
    /**
     * Confirm the selected value
     * @param {?=} event
     * @return {?}
     */
    OwlDateTimeComponent.prototype.confirmSelect = /**
     * Confirm the selected value
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        if (this.isInSingleMode) {
            /** @type {?} */
            var selected = this.selected || this.startAt || this.dateTimeAdapter.now();
            this.confirmSelectedChange.emit(selected);
        }
        else if (this.isInRangeMode) {
            this.confirmSelectedChange.emit(this.selecteds);
        }
        this.close();
        return;
    };
    /**
     * Open the picker as a dialog
     */
    /**
     * Open the picker as a dialog
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.openAsDialog = /**
     * Open the picker as a dialog
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.dialogRef = this.dialogService.open(OwlDateTimeContainerComponent, {
            autoFocus: false,
            backdropClass: tslib_1.__spread([
                'cdk-overlay-dark-backdrop'
            ], coerceArray(this.backdropClass)),
            paneClass: tslib_1.__spread(['owl-dt-dialog'], coerceArray(this.panelClass)),
            viewContainerRef: this.viewContainerRef,
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy()
        });
        this.pickerContainer = this.dialogRef.componentInstance;
        this.dialogRef.afterOpen().subscribe((/**
         * @return {?}
         */
        function () {
            _this.afterPickerOpen.emit(null);
            _this._opened = true;
        }));
        this.dialogRef.afterClosed().subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    };
    /**
     * Open the picker as popup
     */
    /**
     * Open the picker as popup
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.openAsPopup = /**
     * Open the picker as popup
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.pickerContainerPortal) {
            this.pickerContainerPortal = new ComponentPortal(OwlDateTimeContainerComponent, this.viewContainerRef);
        }
        if (!this.popupRef) {
            this.createPopup();
        }
        if (!this.popupRef.hasAttached()) {
            /** @type {?} */
            var componentRef = this.popupRef.attach(this.pickerContainerPortal);
            this.pickerContainer = componentRef.instance;
            // Update the position once the calendar has rendered.
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.popupRef.updatePosition();
            }));
            // emit open stream
            this.pickerOpenedStreamSub = this.pickerContainer.pickerOpenedStream
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.afterPickerOpen.emit(null);
                _this._opened = true;
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.createPopup = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var overlayConfig = new OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: tslib_1.__spread([
                'cdk-overlay-transparent-backdrop'
            ], coerceArray(this.backdropClass)),
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
            panelClass: tslib_1.__spread(['owl-dt-popup'], coerceArray(this.panelClass))
        });
        this.popupRef = this.overlay.create(overlayConfig);
        merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef
            .keydownEvents()
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return event.keyCode === ESCAPE ||
                (_this._dtInput &&
                    event.altKey &&
                    event.keyCode === UP_ARROW);
        })))).subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    };
    /**
     * Create the popup PositionStrategy.
     */
    /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.createPopupPositionStrategy = /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    function () {
        return this.overlay
            .position()
            .flexibleConnectedTo(this._dtInput.elementRef)
            .withTransformOriginOn('.owl-dt-container')
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -176
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -352
            }
        ]);
    };
    OwlDateTimeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-date-time',
                    exportAs: 'owlDateTime',
                    template: "",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    OwlDateTimeComponent.ctorParameters = function () { return [
        { type: Overlay },
        { type: ViewContainerRef },
        { type: OwlDialogService },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Inject, args: [OWL_DTPICKER_SCROLL_STRATEGY,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    OwlDateTimeComponent.propDecorators = {
        backdropClass: [{ type: Input }],
        panelClass: [{ type: Input }],
        startAt: [{ type: Input }],
        pickerType: [{ type: Input }],
        pickerMode: [{ type: Input }],
        disabled: [{ type: Input }],
        opened: [{ type: Input }],
        scrollStrategy: [{ type: Input }],
        afterPickerClosed: [{ type: Output }],
        afterPickerOpen: [{ type: Output }],
        yearSelected: [{ type: Output }],
        monthSelected: [{ type: Output }]
    };
    return OwlDateTimeComponent;
}(OwlDateTime));
export { OwlDateTimeComponent };
if (false) {
    /**
     * Custom class for the picker backdrop.
     * @type {?}
     */
    OwlDateTimeComponent.prototype.backdropClass;
    /**
     * Custom class for the picker overlay pane.
     * @type {?}
     */
    OwlDateTimeComponent.prototype.panelClass;
    /**
     * The date to open the calendar to initially.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._startAt;
    /**
     * Set the type of the dateTime picker
     *      'both' -- show both calendar and timer
     *      'calendar' -- show only calendar
     *      'timer' -- show only timer
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._pickerType;
    /**
     * Whether the picker open as a dialog
     * @type {?}
     */
    OwlDateTimeComponent.prototype._pickerMode;
    /**
     * Whether the date time picker should be disabled.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._disabled;
    /**
     * Whether the calendar is open.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._opened;
    /**
     * The scroll strategy when the picker is open
     * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
     * @type {?}
     */
    OwlDateTimeComponent.prototype.scrollStrategy;
    /**
     * Callback when the picker is closed
     * @type {?}
     */
    OwlDateTimeComponent.prototype.afterPickerClosed;
    /**
     * Callback when the picker is open
     * @type {?}
     */
    OwlDateTimeComponent.prototype.afterPickerOpen;
    /**
     * Emits selected year in multi-year view
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    OwlDateTimeComponent.prototype.yearSelected;
    /**
     * Emits selected month in year view
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    OwlDateTimeComponent.prototype.monthSelected;
    /**
     * Emit when the selected value has been confirmed
     * @type {?}
     */
    OwlDateTimeComponent.prototype.confirmSelectedChange;
    /**
     * Emits when the date time picker is disabled.
     * @type {?}
     */
    OwlDateTimeComponent.prototype.disabledChange;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerContainerPortal;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerContainer;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.popupRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dialogRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dtInputSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.hidePickerStreamSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.confirmSelectedStreamSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerOpenedStreamSub;
    /**
     * The element that was focused before the date time picker was opened.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.focusedElementBeforeOpen;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._dtInput;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.defaultScrollStrategy;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dialogService;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.dateTimeFormats;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUNOLGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFFSCxPQUFPLEVBQ1AsYUFBYSxFQUloQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRXZGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUNILFdBQVcsRUFJZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JB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QUFrQzs7Ozs7O0lBZWxDLHlDQUEyQjs7Ozs7O0lBaUIzQix1Q0FBd0I7Ozs7OztJQWN4Qiw4Q0FDc0M7Ozs7O0lBS3RDLGlEQUM0Qzs7Ozs7SUFLNUMsK0NBQzBDOzs7Ozs7SUFNMUMsNENBQ3FDOzs7Ozs7SUFNckMsNkNBQ3NDOzs7OztJQUt0QyxxREFBMkQ7Ozs7O0lBSzNELDhDQUFvRDs7Ozs7SUFFcEQscURBRUU7Ozs7O0lBQ0YsK0NBQTBEOzs7OztJQUMxRCx3Q0FBNkI7Ozs7O0lBQzdCLHlDQUFrRTs7Ozs7SUFDbEUsMENBQXdDOzs7OztJQUN4QyxtREFBaUQ7Ozs7O0lBQ2pELHdEQUFzRDs7Ozs7SUFDdEQscURBQW1EOzs7Ozs7SUFHbkQsd0RBQTREOzs7OztJQUU1RCx3Q0FBK0M7Ozs7O0lBSy9DLHlDQUE0Qjs7Ozs7SUFVNUIsMENBQTZCOzs7OztJQW9DN0IscURBQW9EOzs7OztJQUdoRCx1Q0FBd0I7Ozs7O0lBQ3hCLGdEQUEwQzs7Ozs7SUFDMUMsNkNBQXVDOzs7OztJQUN2QyxzQ0FBc0I7Ozs7O0lBQ3RCLDhDQUEyQzs7Ozs7SUFDM0MsK0NBQXlEOzs7OztJQUV6RCwrQ0FFNkM7Ozs7O0lBQzdDLHdDQUVxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBCbG9ja1Njcm9sbFN0cmF0ZWd5LFxuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheUNvbmZpZyxcbiAgICBPdmVybGF5UmVmLFxuICAgIFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgU2Nyb2xsU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRVNDQVBFLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBjb2VyY2VBcnJheSwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQge1xuICAgIE93bERhdGVUaW1lLFxuICAgIFBpY2tlck1vZGUsXG4gICAgUGlja2VyVHlwZSxcbiAgICBTZWxlY3RNb2RlXG59IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7IE93bERpYWxvZ1JlZiB9IGZyb20gJy4uL2RpYWxvZy9kaWFsb2ctcmVmLmNsYXNzJztcbmltcG9ydCB7IE93bERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9kaWFsb2cvZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkdFBpY2tlciBpcyBvcGVuLiAqL1xuZXhwb3J0IGNvbnN0IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1kgPSBuZXcgSW5qZWN0aW9uVG9rZW48XG4gICAgKCkgPT4gU2Nyb2xsU3RyYXRlZ3lcbj4oJ293bC1kdHBpY2tlci1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUlkoXG4gICAgb3ZlcmxheTogT3ZlcmxheVxuKTogKCkgPT4gQmxvY2tTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIgPSB7XG4gICAgcHJvdmlkZTogT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUnLFxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD4gZXh0ZW5kcyBPd2xEYXRlVGltZTxUPlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBwaWNrZXIgYmFja2Ryb3AuICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgYmFja2Ryb3BDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gPSBbXTtcblxuICAgIC8qKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBwaWNrZXIgb3ZlcmxheSBwYW5lLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHBhbmVsQ2xhc3M6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG5cbiAgICAvKiogVGhlIGRhdGUgdG8gb3BlbiB0aGUgY2FsZW5kYXIgdG8gaW5pdGlhbGx5LiAqL1xuICAgIHByaXZhdGUgX3N0YXJ0QXQ6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0YXJ0QXQoKTogVCB8IG51bGwge1xuICAgICAgICAvLyBJZiBhbiBleHBsaWNpdCBzdGFydEF0IGlzIHNldCB3ZSBzdGFydCB0aGVyZSwgb3RoZXJ3aXNlIHdlIHN0YXJ0IGF0IHdoYXRldmVyIHRoZSBjdXJyZW50bHlcbiAgICAgICAgLy8gc2VsZWN0ZWQgdmFsdWUgaXMuXG4gICAgICAgIGlmICh0aGlzLl9zdGFydEF0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRBdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9kdElucHV0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LnZhbHVlIHx8IG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxuICAgICAgICAgICAgICAgIHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbSdcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LnZhbHVlc1swXSB8fCBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kdElucHV0LnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LnZhbHVlc1sxXSB8fCBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgc3RhcnRBdChkYXRlOiBUIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5nZXRWYWxpZERhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShkYXRlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdHlwZSBvZiB0aGUgZGF0ZVRpbWUgcGlja2VyXG4gICAgICogICAgICAnYm90aCcgLS0gc2hvdyBib3RoIGNhbGVuZGFyIGFuZCB0aW1lclxuICAgICAqICAgICAgJ2NhbGVuZGFyJyAtLSBzaG93IG9ubHkgY2FsZW5kYXJcbiAgICAgKiAgICAgICd0aW1lcicgLS0gc2hvdyBvbmx5IHRpbWVyXG4gICAgICovXG4gICAgcHJpdmF0ZSBfcGlja2VyVHlwZTogUGlja2VyVHlwZSA9ICdib3RoJztcbiAgICBASW5wdXQoKVxuICAgIGdldCBwaWNrZXJUeXBlKCk6IFBpY2tlclR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyVHlwZTtcbiAgICB9XG5cbiAgICBzZXQgcGlja2VyVHlwZSh2YWw6IFBpY2tlclR5cGUpIHtcbiAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fcGlja2VyVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fcGlja2VyVHlwZSA9IHZhbDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kdElucHV0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHRJbnB1dC5mb3JtYXROYXRpdmVJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBwaWNrZXIgb3BlbiBhcyBhIGRpYWxvZ1xuICAgICAqL1xuICAgIF9waWNrZXJNb2RlOiBQaWNrZXJNb2RlID0gJ3BvcHVwJztcbiAgICBASW5wdXQoKVxuICAgIGdldCBwaWNrZXJNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyTW9kZTtcbiAgICB9XG5cbiAgICBzZXQgcGlja2VyTW9kZShtb2RlOiBQaWNrZXJNb2RlKSB7XG4gICAgICAgIGlmIChtb2RlID09PSAncG9wdXAnKSB7XG4gICAgICAgICAgICB0aGlzLl9waWNrZXJNb2RlID0gbW9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vZGUgPSAnZGlhbG9nJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkYXRlIHRpbWUgcGlja2VyIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5fZHRJbnB1dFxuICAgICAgICAgICAgPyB0aGlzLl9kdElucHV0LmRpc2FibGVkXG4gICAgICAgICAgICA6ICEhdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgb3Blbi4gKi9cbiAgICBwcml2YXRlIF9vcGVuZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBvcGVuZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuZWQ7XG4gICAgfVxuXG4gICAgc2V0IG9wZW5lZCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdmFsID8gdGhpcy5vcGVuKCkgOiB0aGlzLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHNjcm9sbCBzdHJhdGVneSB3aGVuIHRoZSBwaWNrZXIgaXMgb3BlblxuICAgICAqIExlYXJuIG1vcmUgdGhpcyBmcm9tIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9jZGsvb3ZlcmxheS9vdmVydmlldyNzY3JvbGwtc3RyYXRlZ2llc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNjcm9sbFN0cmF0ZWd5OiBTY3JvbGxTdHJhdGVneTtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHdoZW4gdGhlIHBpY2tlciBpcyBjbG9zZWRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBhZnRlclBpY2tlckNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgd2hlbiB0aGUgcGlja2VyIGlzIG9wZW5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBhZnRlclBpY2tlck9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHNlbGVjdGVkIHllYXIgaW4gbXVsdGkteWVhciB2aWV3XG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHllYXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlld1xuICAgICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBtb250aFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdCB3aGVuIHRoZSBzZWxlY3RlZCB2YWx1ZSBoYXMgYmVlbiBjb25maXJtZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgY29uZmlybVNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUW10gfCBUPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgd2hlbiB0aGUgZGF0ZSB0aW1lIHBpY2tlciBpcyBkaXNhYmxlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGlzYWJsZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBwcml2YXRlIHBpY2tlckNvbnRhaW5lclBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFxuICAgICAgICBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPlxuICAgID47XG4gICAgcHJpdmF0ZSBwaWNrZXJDb250YWluZXI6IE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+O1xuICAgIHByaXZhdGUgcG9wdXBSZWY6IE92ZXJsYXlSZWY7XG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE93bERpYWxvZ1JlZjxPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPj47XG4gICAgcHJpdmF0ZSBkdElucHV0U3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIHByaXZhdGUgaGlkZVBpY2tlclN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBwcml2YXRlIGNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBwcml2YXRlIHBpY2tlck9wZW5lZFN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIC8qKiBUaGUgZWxlbWVudCB0aGF0IHdhcyBmb2N1c2VkIGJlZm9yZSB0aGUgZGF0ZSB0aW1lIHBpY2tlciB3YXMgb3BlbmVkLiAqL1xuICAgIHByaXZhdGUgZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfZHRJbnB1dDogT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZTxUPjtcbiAgICBnZXQgZHRJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFQgfCBudWxsO1xuICAgIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xuICAgIGdldCBzZWxlY3RlZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSB2YWx1ZXM7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBnZXQgbWluRGF0ZVRpbWUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dCAmJiB0aGlzLl9kdElucHV0Lm1pbjtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIGdldCBtYXhEYXRlVGltZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0ICYmIHRoaXMuX2R0SW5wdXQubWF4O1xuICAgIH1cblxuICAgIGdldCBkYXRlVGltZUZpbHRlcigpOiAoZGF0ZTogVCB8IG51bGwpID0+IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dCAmJiB0aGlzLl9kdElucHV0LmRhdGVUaW1lRmlsdGVyO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlO1xuICAgIH1cblxuICAgIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQuaXNJblNpbmdsZU1vZGU7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LmlzSW5SYW5nZU1vZGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZhdWx0U2Nyb2xsU3RyYXRlZ3k6ICgpID0+IFNjcm9sbFN0cmF0ZWd5O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IE93bERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgICAgICAgQEluamVjdChPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZKSBkZWZhdWx0U2Nyb2xsU3RyYXRlZ3k6IGFueSxcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXG4gICAgICAgIHByb3RlY3RlZCBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0cyxcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChET0NVTUVOVClcbiAgICAgICAgcHJpdmF0ZSBkb2N1bWVudDogYW55XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGRhdGVUaW1lQWRhcHRlciwgZGF0ZVRpbWVGb3JtYXRzKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0U2Nyb2xsU3RyYXRlZ3kgPSBkZWZhdWx0U2Nyb2xsU3RyYXRlZ3k7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLmR0SW5wdXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5jb21wbGV0ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLnBvcHVwUmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlcklucHV0KGlucHV0OiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlPFQ+KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kdElucHV0KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICAnQSBPd2wgRGF0ZVRpbWVQaWNrZXIgY2FuIG9ubHkgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc2luZ2xlIGlucHV0LidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kdElucHV0ID0gaW5wdXQ7XG4gICAgICAgIHRoaXMuZHRJbnB1dFN1YiA9IHRoaXMuX2R0SW5wdXQudmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHZhbHVlOiBUW10gfCBUIHwgbnVsbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkcyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9vcGVuZWQgfHwgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9kdElucHV0KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICAnQXR0ZW1wdGVkIHRvIG9wZW4gYW4gRGF0ZVRpbWVQaWNrZXIgd2l0aCBubyBhc3NvY2lhdGVkIGlucHV0LidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gPSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCB0aGUgcGlja2VyIHNlbGVjdGVkIHZhbHVlXG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5fZHRJbnB1dC52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzID0gdGhpcy5fZHRJbnB1dC52YWx1ZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3aGVuIHRoZSBwaWNrZXIgaXMgb3BlbiAsIHdlIG1ha2Ugc3VyZSB0aGUgcGlja2VyJ3MgY3VycmVudCBzZWxlY3RlZCB0aW1lIHZhbHVlXG4gICAgICAgIC8vIGlzIHRoZSBzYW1lIGFzIHRoZSBfc3RhcnRBdCB0aW1lIHZhbHVlLlxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAmJiB0aGlzLnBpY2tlclR5cGUgIT09ICdjYWxlbmRhcicgJiYgdGhpcy5fc3RhcnRBdCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnNlbGVjdGVkKSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnNlbGVjdGVkKSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMuX3N0YXJ0QXQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5fc3RhcnRBdCksXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLl9zdGFydEF0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGlja2VyTW9kZSA9PT0gJ2RpYWxvZycgPyB0aGlzLm9wZW5Bc0RpYWxvZygpIDogdGhpcy5vcGVuQXNQb3B1cCgpO1xuXG4gICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyLnBpY2tlciA9IHRoaXM7XG5cbiAgICAgICAgLy8gTGlzdGVuIHRvIHBpY2tlciBjb250YWluZXIncyBoaWRlUGlja2VyU3RyZWFtXG4gICAgICAgIHRoaXMuaGlkZVBpY2tlclN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLmhpZGVQaWNrZXJTdHJlYW0uc3Vic2NyaWJlKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICAvLyBMaXN0ZW4gdG8gcGlja2VyIGNvbnRhaW5lcidzIGNvbmZpcm1TZWxlY3RlZFN0cmVhbVxuICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLmNvbmZpcm1TZWxlY3RlZFN0cmVhbS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0cyB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3QoZGF0ZTogVFtdIHwgVCk6IHZvaWQge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRlKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHMgPSBbLi4uZGF0ZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYXNlcyBpbiB3aGljaCBhdXRvbWF0aWNhbGx5IGNvbmZpcm0gdGhlIHNlbGVjdCB3aGVuIGRhdGUgb3IgZGF0ZXMgYXJlIHNlbGVjdGVkOlxuICAgICAgICAgKiAxKSBwaWNrZXIgbW9kZSBpcyBOT1QgJ2RpYWxvZydcbiAgICAgICAgICogMikgcGlja2VyIHR5cGUgaXMgJ2NhbGVuZGFyJyBhbmQgc2VsZWN0TW9kZSBpcyAnc2luZ2xlJy5cbiAgICAgICAgICogMykgcGlja2VyIHR5cGUgaXMgJ2NhbGVuZGFyJyBhbmQgc2VsZWN0TW9kZSBpcyAncmFuZ2UnIGFuZFxuICAgICAgICAgKiAgICB0aGUgJ3NlbGVjdGVkcycgaGFzICdmcm9tJyhzZWxlY3RlZHNbMF0pIGFuZCAndG8nKHNlbGVjdGVkc1sxXSkgdmFsdWVzLlxuICAgICAgICAgKiA0KSBzZWxlY3RNb2RlIGlzICdyYW5nZUZyb20nIGFuZCBzZWxlY3RlZHNbMF0gaGFzIHZhbHVlLlxuICAgICAgICAgKiA1KSBzZWxlY3RNb2RlIGlzICdyYW5nZVRvJyBhbmQgc2VsZWN0ZWRzWzFdIGhhcyB2YWx1ZS5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucGlja2VyTW9kZSAhPT0gJ2RpYWxvZycgJiZcbiAgICAgICAgICAgIHRoaXMucGlja2VyVHlwZSA9PT0gJ2NhbGVuZGFyJyAmJlxuICAgICAgICAgICAgKCh0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnICYmIHRoaXMuc2VsZWN0ZWQpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgJiYgdGhpcy5zZWxlY3RlZHNbMF0pIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nICYmIHRoaXMuc2VsZWN0ZWRzWzFdKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHNbMF0gJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHNbMV0pKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW1pdHMgdGhlIHNlbGVjdGVkIHllYXIgaW4gbXVsdGkteWVhciB2aWV3XG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdFllYXIobm9ybWFsaXplZFllYXI6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy55ZWFyU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkWWVhcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3XG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdE1vbnRoKG5vcm1hbGl6ZWRNb250aDogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vbnRoU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkTW9udGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIHBpY2tlclxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9vcGVuZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvcHVwUmVmICYmIHRoaXMucG9wdXBSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5kZXRhY2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsICYmXG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbC5pc0F0dGFjaGVkXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oaWRlUGlja2VyU3RyZWFtU3ViKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVQaWNrZXJTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZVBpY2tlclN0cmVhbVN1YiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkU3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1YiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5waWNrZXJPcGVuZWRTdHJlYW1TdWIpIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLnBpY2tlck9wZW5lZFN0cmVhbVN1YiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kaWFsb2dSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1JlZiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wbGV0ZUNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wZW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wZW5lZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJQaWNrZXJDbG9zZWQuZW1pdChudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3Blbi5mb2N1cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIEJlY2F1c2UgSUUgbW92ZXMgZm9jdXMgYXN5bmNocm9ub3VzbHksIHdlIGNhbid0IGNvdW50IG9uIGl0IGJlaW5nIHJlc3RvcmVkIGJlZm9yZSB3ZSd2ZVxuICAgICAgICAgICAgLy8gbWFya2VkIHRoZSBkYXRlcGlja2VyIGFzIGNsb3NlZC4gSWYgdGhlIGV2ZW50IGZpcmVzIG91dCBvZiBzZXF1ZW5jZSBhbmQgdGhlIGVsZW1lbnQgdGhhdFxuICAgICAgICAgICAgLy8gd2UncmUgcmVmb2N1c2luZyBvcGVucyB0aGUgZGF0ZXBpY2tlciBvbiBmb2N1cywgdGhlIHVzZXIgY291bGQgYmUgc3R1Y2sgd2l0aCBub3QgYmVpbmdcbiAgICAgICAgICAgIC8vIGFibGUgdG8gY2xvc2UgdGhlIGNhbGVuZGFyIGF0IGFsbC4gV2Ugd29yayBhcm91bmQgaXQgYnkgbWFraW5nIHRoZSBsb2dpYywgdGhhdCBtYXJrc1xuICAgICAgICAgICAgLy8gdGhlIGRhdGVwaWNrZXIgYXMgY2xvc2VkLCBhc3luYyBhcyB3ZWxsLlxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4uZm9jdXMoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoY29tcGxldGVDbG9zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wbGV0ZUNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25maXJtIHRoZSBzZWxlY3RlZCB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBjb25maXJtU2VsZWN0KGV2ZW50PzogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCB8fCB0aGlzLnN0YXJ0QXQgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiB0aGUgcGlja2VyIGFzIGEgZGlhbG9nXG4gICAgICovXG4gICAgcHJpdmF0ZSBvcGVuQXNEaWFsb2coKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmID0gdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW4oXG4gICAgICAgICAgICBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2Nkay1vdmVybGF5LWRhcmstYmFja2Ryb3AnLFxuICAgICAgICAgICAgICAgICAgICAuLi5jb2VyY2VBcnJheSh0aGlzLmJhY2tkcm9wQ2xhc3MpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBwYW5lQ2xhc3M6IFsnb3dsLWR0LWRpYWxvZycsIC4uLmNvZXJjZUFycmF5KHRoaXMucGFuZWxDbGFzcyldLFxuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBzY3JvbGxTdHJhdGVneTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxTdHJhdGVneSB8fCB0aGlzLmRlZmF1bHRTY3JvbGxTdHJhdGVneSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyID0gdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2U7XG5cbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJPcGVuKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJQaWNrZXJPcGVuLmVtaXQobnVsbCk7XG4gICAgICAgICAgICB0aGlzLl9vcGVuZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIHRoZSBwaWNrZXIgYXMgcG9wdXBcbiAgICAgKi9cbiAgICBwcml2YXRlIG9wZW5Bc1BvcHVwKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWw8XG4gICAgICAgICAgICAgICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD5cbiAgICAgICAgICAgID4oT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucG9wdXBSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9wdXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wb3B1cFJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxcbiAgICAgICAgICAgICAgICBUXG4gICAgICAgICAgICA+PiA9IHRoaXMucG9wdXBSZWYuYXR0YWNoKHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsKTtcbiAgICAgICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHBvc2l0aW9uIG9uY2UgdGhlIGNhbGVuZGFyIGhhcyByZW5kZXJlZC5cbiAgICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBlbWl0IG9wZW4gc3RyZWFtXG4gICAgICAgICAgICB0aGlzLnBpY2tlck9wZW5lZFN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLnBpY2tlck9wZW5lZFN0cmVhbVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJQaWNrZXJPcGVuLmVtaXQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wZW5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVBvcHVwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5jcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogW1xuICAgICAgICAgICAgICAgICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXG4gICAgICAgICAgICAgICAgLi4uY29lcmNlQXJyYXkodGhpcy5iYWNrZHJvcENsYXNzKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5IHx8IHRoaXMuZGVmYXVsdFNjcm9sbFN0cmF0ZWd5KCksXG4gICAgICAgICAgICBwYW5lbENsYXNzOiBbJ293bC1kdC1wb3B1cCcsIC4uLmNvZXJjZUFycmF5KHRoaXMucGFuZWxDbGFzcyldXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucG9wdXBSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuXG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5iYWNrZHJvcENsaWNrKCksXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmRldGFjaG1lbnRzKCksXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmXG4gICAgICAgICAgICAgICAgLmtleWRvd25FdmVudHMoKVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl9kdElucHV0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmFsdEtleSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIHBvcHVwIFBvc2l0aW9uU3RyYXRlZ3kuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3koKTogUG9zaXRpb25TdHJhdGVneSB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlcbiAgICAgICAgICAgIC5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9kdElucHV0LmVsZW1lbnRSZWYpXG4gICAgICAgICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcub3dsLWR0LWNvbnRhaW5lcicpXG4gICAgICAgICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgICAgICAgIC53aXRoUHVzaChmYWxzZSlcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WTogLTE3NlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WTogLTM1MlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pO1xuICAgIH1cbn1cbiJdfQ==