import { coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, InjectionToken, Input, Optional, Output, } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { OWL_DATE_TIME_FORMATS } from '../adapter/date-time-format.class';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { OwlDateTime } from './date-time.class';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "../dialog/dialog.service";
import * as i3 from "../adapter/date-time-adapter.class";
/** Injection token that determines the scroll handling while the dtPicker is open. */
export const OWL_DTPICKER_SCROLL_STRATEGY = new InjectionToken('owl-dtpicker-scroll-strategy');
/** @docs-private */
export function OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.block();
}
/** @docs-private */
export const OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DTPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
export class OwlDateTimeComponent extends OwlDateTime {
    constructor(overlay, viewContainerRef, dialogService, ngZone, changeDetector, dateTimeAdapter, defaultScrollStrategy, dateTimeFormats, document) {
        super(dateTimeAdapter, dateTimeFormats);
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.dialogService = dialogService;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        this.document = document;
        /** Custom class for the picker backdrop. */
        this.backdropClass = [];
        /** Custom class for the picker overlay pane. */
        this.panelClass = [];
        /**
         * Set the type of the dateTime picker
         *      'both' -- show both calendar and timer
         *      'calendar' -- show only calendar
         *      'timer' -- show only timer
         */
        this._pickerType = 'both';
        /**
         * Whether the picker open as a dialog
         */
        this._pickerMode = 'popup';
        /** Whether the calendar is open. */
        this._opened = false;
        this._opening = false;
        this._closing = false;
        /**
         * For Range mode. Check if the 'from' is after 'to' or 'to' is before 'from'.
         * If true check when click 'Set' or select 'to'/'from'. If false - check every time change.
         */
        this._lazyValidation = false;
        /**
         * Callback when the picker is closed
         */
        this.afterPickerClosed = new EventEmitter();
        /**
         * Callback when the picker is open
         */
        this.afterPickerOpen = new EventEmitter();
        this.pickerOpening = new EventEmitter();
        this.pickerClosing = new EventEmitter();
        /**
         * Emits selected year in multi-year view
         * This doesn't imply a change on the selected date.
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits selected month in year view
         * This doesn't imply a change on the selected date.
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emit when the selected value has been confirmed
         */
        this.confirmSelectedChange = new EventEmitter();
        /**
         * Emits when the date time picker is disabled.
         */
        this.disabledChange = new EventEmitter();
        this.dtInputSub = Subscription.EMPTY;
        this.hidePickerStreamSub = Subscription.EMPTY;
        this.confirmSelectedStreamSub = Subscription.EMPTY;
        this.pickerOpenedStreamSub = Subscription.EMPTY;
        /** The element that was focused before the date time picker was opened. */
        this.focusedElementBeforeOpen = null;
        this._selecteds = [];
        this.defaultScrollStrategy = defaultScrollStrategy;
    }
    get startAt() {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        if (this._startAt) {
            return this._startAt;
        }
        if (this._dtInput) {
            if (this._dtInput.selectMode === 'single') {
                return this._dtInput.value || null;
            }
            else if (this._dtInput.selectMode === 'range' || this._dtInput.selectMode === 'rangeFrom') {
                return this._dtInput.values[0] || null;
            }
            else if (this._dtInput.selectMode === 'rangeTo') {
                return this._dtInput.values[1] || null;
            }
        }
        return null;
    }
    set startAt(date) {
        this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(date));
    }
    get pickerType() {
        return this._pickerType;
    }
    set pickerType(val) {
        if (val !== this._pickerType) {
            this._pickerType = val;
            if (this._dtInput) {
                this._dtInput.formatNativeInputValue();
            }
        }
    }
    get pickerMode() {
        return this._pickerMode;
    }
    set pickerMode(mode) {
        if (mode === 'popup') {
            this._pickerMode = mode;
        }
        else {
            this._pickerMode = 'dialog';
        }
    }
    get disabled() {
        return this._disabled === undefined && this._dtInput
            ? this._dtInput.disabled
            : !!this._disabled;
    }
    set disabled(value) {
        value = coerceBooleanProperty(value);
        if (value !== this._disabled) {
            this._disabled = value;
            this.disabledChange.next(value);
        }
    }
    get opened() {
        return this._opened;
    }
    set opened(val) {
        val ? this.open() : this.close();
    }
    get opening() {
        return this._opening;
    }
    get closing() {
        return this._closing;
    }
    get lazyValidation() {
        return this._lazyValidation;
    }
    set lazyValidation(value) {
        this._lazyValidation = value;
    }
    get dtInput() {
        return this._dtInput;
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.changeDetector.markForCheck();
    }
    get selecteds() {
        return this._selecteds;
    }
    set selecteds(values) {
        this._selecteds = values;
        this.changeDetector.markForCheck();
    }
    /** The minimum selectable date. */
    get minDateTime() {
        return this._dtInput && this._dtInput.min;
    }
    /** The maximum selectable date. */
    get maxDateTime() {
        return this._dtInput && this._dtInput.max;
    }
    get dateTimeFilter() {
        return this._dtInput && this._dtInput.dateTimeFilter;
    }
    get selectMode() {
        return this._dtInput.selectMode;
    }
    get isInSingleMode() {
        return this._dtInput.isInSingleMode;
    }
    get isInRangeMode() {
        return this._dtInput.isInRangeMode;
    }
    ngOnDestroy() {
        this.close();
        this.dtInputSub.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
        }
    }
    registerInput(input) {
        if (this._dtInput) {
            throw Error('A Owl DateTimePicker can only be associated with a single input.');
        }
        this._dtInput = input;
        this.dtInputSub = this._dtInput.valueChange.subscribe((value) => {
            if (Array.isArray(value)) {
                this.selecteds = value;
            }
            else {
                this.selected = value;
            }
        });
    }
    open() {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this._dtInput) {
            throw Error('Attempted to open an DateTimePicker with no associated input.');
        }
        this._opening = true;
        this.pickerOpening.next();
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
            this.selected = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.selected), this.dateTimeAdapter.getMonth(this.selected), this.dateTimeAdapter.getDate(this.selected), this.dateTimeAdapter.getHours(this._startAt), this.dateTimeAdapter.getMinutes(this._startAt), this.dateTimeAdapter.getSeconds(this._startAt), this.dateTimeAdapter.getMilliseconds(this._startAt));
        }
        this.pickerMode === 'dialog' ? this.openAsDialog() : this.openAsPopup();
        this.pickerContainer.picker = this;
        this.pickerContainer.lazyValidation = this.lazyValidation;
        // Listen to picker container's hidePickerStream
        this.hidePickerStreamSub = this.pickerContainer.hidePickerStream.subscribe(() => {
            this.close();
        });
        // Listen to picker container's confirmSelectedStream
        this.confirmSelectedStreamSub = this.pickerContainer.confirmSelectedStream.subscribe((event) => {
            this.confirmSelect(event);
        });
    }
    /**
     * Selects the given date
     */
    select(date) {
        if (Array.isArray(date)) {
            this.selecteds = [...date];
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
                (this.selectMode === 'range' && this.selecteds[0] && this.selecteds[1]))) {
            this.confirmSelect();
        }
    }
    /**
     * Emits the selected year in multi-year view
     */
    selectYear(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /**
     * Emits selected month in year view
     */
    selectMonth(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /**
     * Hide the picker
     */
    close() {
        if (!this._opened) {
            return;
        }
        this._closing = true;
        this.pickerClosing.emit();
        if (this.popupRef && this.popupRef.hasAttached()) {
            this.popupRef.detach();
        }
        if (this.pickerContainerPortal && this.pickerContainerPortal.isAttached) {
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
        const completeClose = () => {
            if (this._opened) {
                this._closing = false;
                this._opened = false;
                this.afterPickerClosed.emit();
                this.focusedElementBeforeOpen = null;
            }
        };
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
    }
    /**
     * Confirm the selected value
     */
    confirmSelect(event) {
        if (this.isInSingleMode) {
            const selected = this.selected || this.startAt || this.dateTimeAdapter.now();
            this.confirmSelectedChange.emit(selected);
        }
        else if (this.isInRangeMode) {
            this.confirmSelectedChange.emit(this.selecteds);
        }
        this.close();
        return;
    }
    /**
     * Open the picker as a dialog
     */
    openAsDialog() {
        this.dialogRef = this.dialogService.open(OwlDateTimeContainerComponent, {
            autoFocus: false,
            backdropClass: ['cdk-overlay-dark-backdrop', ...coerceArray(this.backdropClass)],
            paneClass: ['owl-dt-dialog', ...coerceArray(this.panelClass)],
            viewContainerRef: this.viewContainerRef,
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
        });
        this.pickerContainer = this.dialogRef.componentInstance;
        this.dialogRef.afterOpen().subscribe(() => {
            this._opening = false;
            this._opened = true;
            this.afterPickerOpen.emit();
        });
        this.dialogRef.afterClosed().subscribe(() => this.close());
    }
    /**
     * Open the picker as popup
     */
    openAsPopup() {
        if (!this.pickerContainerPortal) {
            this.pickerContainerPortal = new ComponentPortal(OwlDateTimeContainerComponent, this.viewContainerRef);
        }
        if (!this.popupRef) {
            this.createPopup();
        }
        if (!this.popupRef.hasAttached()) {
            const componentRef = this.popupRef.attach(this.pickerContainerPortal);
            this.pickerContainer = componentRef.instance;
            // Update the position once the calendar has rendered.
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                this.popupRef.updatePosition();
            });
            // emit open stream
            this.pickerOpenedStreamSub = this.pickerContainer.pickerOpenedStream
                .pipe(take(1))
                .subscribe(() => {
                this._opening = false;
                this._opened = true;
                this.afterPickerOpen.emit();
            });
        }
    }
    createPopup() {
        const overlayConfig = new OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: ['cdk-overlay-transparent-backdrop', ...coerceArray(this.backdropClass)],
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
            panelClass: ['owl-dt-popup', ...coerceArray(this.panelClass)],
        });
        this.popupRef = this.overlay.create(overlayConfig);
        merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef
            .keydownEvents()
            .pipe(filter(event => event.keyCode === ESCAPE ||
            (this._dtInput && event.altKey && event.keyCode === UP_ARROW)))).subscribe(() => this.close());
    }
    /**
     * Create the popup PositionStrategy.
     */
    createPopupPositionStrategy() {
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
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top',
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom',
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -176,
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -352,
            },
        ]);
    }
}
OwlDateTimeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeComponent, deps: [{ token: i1.Overlay }, { token: i0.ViewContainerRef }, { token: i2.OwlDialogService }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i3.DateTimeAdapter, optional: true }, { token: OWL_DTPICKER_SCROLL_STRATEGY }, { token: OWL_DATE_TIME_FORMATS, optional: true }, { token: DOCUMENT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OwlDateTimeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: OwlDateTimeComponent, selector: "owl-date-time", inputs: { backdropClass: "backdropClass", panelClass: "panelClass", startAt: "startAt", pickerType: "pickerType", pickerMode: "pickerMode", disabled: "disabled", opened: "opened", scrollStrategy: "scrollStrategy", lazyValidation: "lazyValidation" }, outputs: { afterPickerClosed: "afterPickerClosed", afterPickerOpen: "afterPickerOpen", pickerOpening: "pickerOpening", pickerClosing: "pickerClosing", yearSelected: "yearSelected", monthSelected: "monthSelected" }, exportAs: ["owlDateTime"], usesInheritance: true, ngImport: i0, template: "", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'owl-date-time', exportAs: 'owlDateTime', changeDetection: ChangeDetectionStrategy.OnPush, template: "" }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.ViewContainerRef }, { type: i2.OwlDialogService }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i3.DateTimeAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [OWL_DTPICKER_SCROLL_STRATEGY]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [OWL_DATE_TIME_FORMATS]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { backdropClass: [{
                type: Input
            }], panelClass: [{
                type: Input
            }], startAt: [{
                type: Input
            }], pickerType: [{
                type: Input
            }], pickerMode: [{
                type: Input
            }], disabled: [{
                type: Input
            }], opened: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], lazyValidation: [{
                type: Input
            }], afterPickerClosed: [{
                type: Output
            }], afterPickerOpen: [{
                type: Output
            }], pickerOpening: [{
                type: Output
            }], pickerClosing: [{
                type: Output
            }], yearSelected: [{
                type: Output
            }], monthSelected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBRUwsT0FBTyxFQUNQLGFBQWEsR0FJZCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQXNCLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFHOUYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFdkYsT0FBTyxFQUFFLFdBQVcsRUFBc0MsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFFcEYsc0ZBQXNGO0FBQ3RGLE1BQU0sQ0FBQyxN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QXVCLENBQUMsTUFBTTs7MEJBdVA1QyxRQUFROzswQkFDUixNQUFNOzJCQUFDLDRCQUE0Qjs7MEJBQ25DLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMscUJBQXFCOzswQkFFNUIsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyxRQUFROzRDQXhQWCxhQUFhO3NCQURuQixLQUFLO2dCQUtDLFVBQVU7c0JBRGhCLEtBQUs7Z0JBTUYsT0FBTztzQkFEVixLQUFLO2dCQWdDRixVQUFVO3NCQURiLEtBQUs7Z0JBbUJGLFVBQVU7c0JBRGIsS0FBSztnQkFnQk8sUUFBUTtzQkFEcEIsS0FBSztnQkFrQkYsTUFBTTtzQkFEVCxLQUFLO2dCQXdCQyxjQUFjO3NCQURwQixLQUFLO2dCQVNGLGNBQWM7c0JBRGpCLEtBQUs7Z0JBYU4saUJBQWlCO3NCQURoQixNQUFNO2dCQU9QLGVBQWU7c0JBRGQsTUFBTTtnQkFJUCxhQUFhO3NCQURaLE1BQU07Z0JBSVAsYUFBYTtzQkFEWixNQUFNO2dCQVFQLFlBQVk7c0JBRFgsTUFBTTtnQkFRUCxhQUFhO3NCQURaLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VBcnJheSwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEVTQ0FQRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQmxvY2tTY3JvbGxTdHJhdGVneSxcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgT3ZlcmxheVJlZixcbiAgUG9zaXRpb25TdHJhdGVneSxcbiAgU2Nyb2xsU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUZvcm1hdHMsIE9XTF9EQVRFX1RJTUVfRk9STUFUUyB9IGZyb20gJy4uL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dSZWYgfSBmcm9tICcuLi9kaWFsb2cvZGlhbG9nLXJlZi5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vZGlhbG9nL2RpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWUsIFBpY2tlck1vZGUsIFBpY2tlclR5cGUsIFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGR0UGlja2VyIGlzIG9wZW4uICovXG5leHBvcnQgY29uc3QgT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oXG4gICdvd2wtZHRwaWNrZXItc2Nyb2xsLXN0cmF0ZWd5Jyxcbik7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZKFxuICBvdmVybGF5OiBPdmVybGF5LFxuKTogKCkgPT4gQmxvY2tTY3JvbGxTdHJhdGVneSB7XG4gIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZLFxuICBkZXBzOiBbT3ZlcmxheV0sXG4gIHVzZUZhY3Rvcnk6IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUnLFxuICBleHBvcnRBczogJ293bERhdGVUaW1lJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD4gZXh0ZW5kcyBPd2xEYXRlVGltZTxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBwaWNrZXIgYmFja2Ryb3AuICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBiYWNrZHJvcENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBwaWNrZXIgb3ZlcmxheSBwYW5lLiAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gPSBbXTtcblxuICAvKiogVGhlIGRhdGUgdG8gb3BlbiB0aGUgY2FsZW5kYXIgdG8gaW5pdGlhbGx5LiAqL1xuICBwcml2YXRlIF9zdGFydEF0OiBUIHwgbnVsbDtcbiAgQElucHV0KClcbiAgZ2V0IHN0YXJ0QXQoKTogVCB8IG51bGwge1xuICAgIC8vIElmIGFuIGV4cGxpY2l0IHN0YXJ0QXQgaXMgc2V0IHdlIHN0YXJ0IHRoZXJlLCBvdGhlcndpc2Ugd2Ugc3RhcnQgYXQgd2hhdGV2ZXIgdGhlIGN1cnJlbnRseVxuICAgIC8vIHNlbGVjdGVkIHZhbHVlIGlzLlxuICAgIGlmICh0aGlzLl9zdGFydEF0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fc3RhcnRBdDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZHRJbnB1dCkge1xuICAgICAgaWYgKHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQudmFsdWUgfHwgbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8IHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQudmFsdWVzWzBdIHx8IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LnZhbHVlc1sxXSB8fCBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHNldCBzdGFydEF0KGRhdGU6IFQgfCBudWxsKSB7XG4gICAgdGhpcy5fc3RhcnRBdCA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGRhdGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHR5cGUgb2YgdGhlIGRhdGVUaW1lIHBpY2tlclxuICAgKiAgICAgICdib3RoJyAtLSBzaG93IGJvdGggY2FsZW5kYXIgYW5kIHRpbWVyXG4gICAqICAgICAgJ2NhbGVuZGFyJyAtLSBzaG93IG9ubHkgY2FsZW5kYXJcbiAgICogICAgICAndGltZXInIC0tIHNob3cgb25seSB0aW1lclxuICAgKi9cbiAgcHJpdmF0ZSBfcGlja2VyVHlwZTogUGlja2VyVHlwZSA9ICdib3RoJztcbiAgQElucHV0KClcbiAgZ2V0IHBpY2tlclR5cGUoKTogUGlja2VyVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3BpY2tlclR5cGU7XG4gIH1cblxuICBzZXQgcGlja2VyVHlwZSh2YWw6IFBpY2tlclR5cGUpIHtcbiAgICBpZiAodmFsICE9PSB0aGlzLl9waWNrZXJUeXBlKSB7XG4gICAgICB0aGlzLl9waWNrZXJUeXBlID0gdmFsO1xuICAgICAgaWYgKHRoaXMuX2R0SW5wdXQpIHtcbiAgICAgICAgdGhpcy5fZHRJbnB1dC5mb3JtYXROYXRpdmVJbnB1dFZhbHVlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHBpY2tlciBvcGVuIGFzIGEgZGlhbG9nXG4gICAqL1xuICBfcGlja2VyTW9kZTogUGlja2VyTW9kZSA9ICdwb3B1cCc7XG4gIEBJbnB1dCgpXG4gIGdldCBwaWNrZXJNb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9waWNrZXJNb2RlO1xuICB9XG5cbiAgc2V0IHBpY2tlck1vZGUobW9kZTogUGlja2VyTW9kZSkge1xuICAgIGlmIChtb2RlID09PSAncG9wdXAnKSB7XG4gICAgICB0aGlzLl9waWNrZXJNb2RlID0gbW9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGlja2VyTW9kZSA9ICdkaWFsb2cnO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBkYXRlIHRpbWUgcGlja2VyIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIG92ZXJyaWRlIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kdElucHV0XG4gICAgICA/IHRoaXMuX2R0SW5wdXQuZGlzYWJsZWRcbiAgICAgIDogISF0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIG92ZXJyaWRlIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgb3Blbi4gKi9cbiAgcHJpdmF0ZSBfb3BlbmVkID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGdldCBvcGVuZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbiAgfVxuXG4gIHNldCBvcGVuZWQodmFsOiBib29sZWFuKSB7XG4gICAgdmFsID8gdGhpcy5vcGVuKCkgOiB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIF9vcGVuaW5nID0gZmFsc2U7XG4gIGdldCBvcGVuaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9vcGVuaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2xvc2luZyA9IGZhbHNlO1xuICBnZXQgY2xvc2luZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2xvc2luZztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2Nyb2xsIHN0cmF0ZWd5IHdoZW4gdGhlIHBpY2tlciBpcyBvcGVuXG4gICAqIExlYXJuIG1vcmUgdGhpcyBmcm9tIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9jZGsvb3ZlcmxheS9vdmVydmlldyNzY3JvbGwtc3RyYXRlZ2llc1xuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIHNjcm9sbFN0cmF0ZWd5OiBTY3JvbGxTdHJhdGVneTtcblxuICAvKipcbiAgICogRm9yIFJhbmdlIG1vZGUuIENoZWNrIGlmIHRoZSAnZnJvbScgaXMgYWZ0ZXIgJ3RvJyBvciAndG8nIGlzIGJlZm9yZSAnZnJvbScuXG4gICAqIElmIHRydWUgY2hlY2sgd2hlbiBjbGljayAnU2V0JyBvciBzZWxlY3QgJ3RvJy8nZnJvbScuIElmIGZhbHNlIC0gY2hlY2sgZXZlcnkgdGltZSBjaGFuZ2UuXG4gICAqL1xuICBwcml2YXRlIF9sYXp5VmFsaWRhdGlvbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBnZXQgbGF6eVZhbGlkYXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xhenlWYWxpZGF0aW9uO1xuICB9XG5cbiAgc2V0IGxhenlWYWxpZGF0aW9uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbGF6eVZhbGlkYXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayB3aGVuIHRoZSBwaWNrZXIgaXMgY2xvc2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgYWZ0ZXJQaWNrZXJDbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHdoZW4gdGhlIHBpY2tlciBpcyBvcGVuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgYWZ0ZXJQaWNrZXJPcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBPdXRwdXQoKVxuICBwaWNrZXJPcGVuaW5nID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBPdXRwdXQoKVxuICBwaWNrZXJDbG9zaW5nID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBzZWxlY3RlZCB5ZWFyIGluIG11bHRpLXllYXIgdmlld1xuICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgeWVhclNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBzZWxlY3RlZCBtb250aCBpbiB5ZWFyIHZpZXdcbiAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIG1vbnRoU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgLyoqXG4gICAqIEVtaXQgd2hlbiB0aGUgc2VsZWN0ZWQgdmFsdWUgaGFzIGJlZW4gY29uZmlybWVkXG4gICAqL1xuICBwdWJsaWMgY29uZmlybVNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUW10gfCBUPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSBkYXRlIHRpbWUgcGlja2VyIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgcHVibGljIGRpc2FibGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIHByaXZhdGUgcGlja2VyQ29udGFpbmVyUG9ydGFsOiBDb21wb25lbnRQb3J0YWw8T3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD4+O1xuICBwcml2YXRlIHBpY2tlckNvbnRhaW5lcjogT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD47XG4gIHByaXZhdGUgcG9wdXBSZWY6IE92ZXJsYXlSZWY7XG4gIHByaXZhdGUgZGlhbG9nUmVmOiBPd2xEaWFsb2dSZWY8T3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD4+O1xuICBwcml2YXRlIGR0SW5wdXRTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgaGlkZVBpY2tlclN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBjb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgcGlja2VyT3BlbmVkU3RyZWFtU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBUaGUgZWxlbWVudCB0aGF0IHdhcyBmb2N1c2VkIGJlZm9yZSB0aGUgZGF0ZSB0aW1lIHBpY2tlciB3YXMgb3BlbmVkLiAqL1xuICBwcml2YXRlIGZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIF9kdElucHV0OiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlPFQ+O1xuICBnZXQgZHRJbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZHRJbnB1dDtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBUIHwgbnVsbDtcbiAgZ2V0IHNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xuICBnZXQgc2VsZWN0ZWRzKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XG4gIH1cblxuICBzZXQgc2VsZWN0ZWRzKHZhbHVlczogVFtdKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWRzID0gdmFsdWVzO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICBnZXQgbWluRGF0ZVRpbWUoKTogVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9kdElucHV0ICYmIHRoaXMuX2R0SW5wdXQubWluO1xuICB9XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZHRJbnB1dCAmJiB0aGlzLl9kdElucHV0Lm1heDtcbiAgfVxuXG4gIGdldCBkYXRlVGltZUZpbHRlcigpOiAoZGF0ZTogVCB8IG51bGwpID0+IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kdElucHV0ICYmIHRoaXMuX2R0SW5wdXQuZGF0ZVRpbWVGaWx0ZXI7XG4gIH1cblxuICBnZXQgc2VsZWN0TW9kZSgpOiBTZWxlY3RNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlO1xuICB9XG5cbiAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kdElucHV0LmlzSW5TaW5nbGVNb2RlO1xuICB9XG5cbiAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQuaXNJblJhbmdlTW9kZTtcbiAgfVxuXG4gIHByaXZhdGUgZGVmYXVsdFNjcm9sbFN0cmF0ZWd5OiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgZGlhbG9nU2VydmljZTogT3dsRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIG92ZXJyaWRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+LFxuICAgIEBJbmplY3QoT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWSkgZGVmYXVsdFNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHMsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KERPQ1VNRU5UKVxuICAgIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgKSB7XG4gICAgc3VwZXIoZGF0ZVRpbWVBZGFwdGVyLCBkYXRlVGltZUZvcm1hdHMpO1xuICAgIHRoaXMuZGVmYXVsdFNjcm9sbFN0cmF0ZWd5ID0gZGVmYXVsdFNjcm9sbFN0cmF0ZWd5O1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLmR0SW5wdXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmNvbXBsZXRlKCk7XG5cbiAgICBpZiAodGhpcy5wb3B1cFJlZikge1xuICAgICAgdGhpcy5wb3B1cFJlZi5kaXNwb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVySW5wdXQoaW5wdXQ6IE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmU8VD4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZHRJbnB1dCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0EgT3dsIERhdGVUaW1lUGlja2VyIGNhbiBvbmx5IGJlIGFzc29jaWF0ZWQgd2l0aCBhIHNpbmdsZSBpbnB1dC4nKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kdElucHV0ID0gaW5wdXQ7XG4gICAgdGhpcy5kdElucHV0U3ViID0gdGhpcy5fZHRJbnB1dC52YWx1ZUNoYW5nZS5zdWJzY3JpYmUoKHZhbHVlOiBUW10gfCBUIHwgbnVsbCkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRzID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3BlbmVkIHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2R0SW5wdXQpIHtcbiAgICAgIHRocm93IEVycm9yKCdBdHRlbXB0ZWQgdG8gb3BlbiBhbiBEYXRlVGltZVBpY2tlciB3aXRoIG5vIGFzc29jaWF0ZWQgaW5wdXQuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fb3BlbmluZyA9IHRydWU7XG4gICAgdGhpcy5waWNrZXJPcGVuaW5nLm5leHQoKTtcblxuICAgIGlmICh0aGlzLmRvY3VtZW50KSB7XG4gICAgICB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiA9IHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyByZXNldCB0aGUgcGlja2VyIHNlbGVjdGVkIHZhbHVlXG4gICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLl9kdElucHV0LnZhbHVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkcyA9IHRoaXMuX2R0SW5wdXQudmFsdWVzO1xuICAgIH1cblxuICAgIC8vIHdoZW4gdGhlIHBpY2tlciBpcyBvcGVuICwgd2UgbWFrZSBzdXJlIHRoZSBwaWNrZXIncyBjdXJyZW50IHNlbGVjdGVkIHRpbWUgdmFsdWVcbiAgICAvLyBpcyB0aGUgc2FtZSBhcyB0aGUgX3N0YXJ0QXQgdGltZSB2YWx1ZS5cbiAgICBpZiAodGhpcy5zZWxlY3RlZCAmJiB0aGlzLnBpY2tlclR5cGUgIT09ICdjYWxlbmRhcicgJiYgdGhpcy5fc3RhcnRBdCkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5zZWxlY3RlZCksXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMuc2VsZWN0ZWQpLFxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMuc2VsZWN0ZWQpLFxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLl9zdGFydEF0KSxcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLl9zdGFydEF0KSxcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLl9zdGFydEF0KSxcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWlsbGlzZWNvbmRzKHRoaXMuX3N0YXJ0QXQpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnBpY2tlck1vZGUgPT09ICdkaWFsb2cnID8gdGhpcy5vcGVuQXNEaWFsb2coKSA6IHRoaXMub3BlbkFzUG9wdXAoKTtcblxuICAgIHRoaXMucGlja2VyQ29udGFpbmVyLnBpY2tlciA9IHRoaXM7XG4gICAgdGhpcy5waWNrZXJDb250YWluZXIubGF6eVZhbGlkYXRpb24gPSB0aGlzLmxhenlWYWxpZGF0aW9uO1xuXG4gICAgLy8gTGlzdGVuIHRvIHBpY2tlciBjb250YWluZXIncyBoaWRlUGlja2VyU3RyZWFtXG4gICAgdGhpcy5oaWRlUGlja2VyU3RyZWFtU3ViID0gdGhpcy5waWNrZXJDb250YWluZXIuaGlkZVBpY2tlclN0cmVhbS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gTGlzdGVuIHRvIHBpY2tlciBjb250YWluZXIncyBjb25maXJtU2VsZWN0ZWRTdHJlYW1cbiAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLmNvbmZpcm1TZWxlY3RlZFN0cmVhbS5zdWJzY3JpYmUoXG4gICAgICAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3QoZXZlbnQpO1xuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIGdpdmVuIGRhdGVcbiAgICovXG4gIHB1YmxpYyBzZWxlY3QoZGF0ZTogVFtdIHwgVCk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGUpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkcyA9IFsuLi5kYXRlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FzZXMgaW4gd2hpY2ggYXV0b21hdGljYWxseSBjb25maXJtIHRoZSBzZWxlY3Qgd2hlbiBkYXRlIG9yIGRhdGVzIGFyZSBzZWxlY3RlZDpcbiAgICAgKiAxKSBwaWNrZXIgbW9kZSBpcyBOT1QgJ2RpYWxvZydcbiAgICAgKiAyKSBwaWNrZXIgdHlwZSBpcyAnY2FsZW5kYXInIGFuZCBzZWxlY3RNb2RlIGlzICdzaW5nbGUnLlxuICAgICAqIDMpIHBpY2tlciB0eXBlIGlzICdjYWxlbmRhcicgYW5kIHNlbGVjdE1vZGUgaXMgJ3JhbmdlJyBhbmRcbiAgICAgKiAgICB0aGUgJ3NlbGVjdGVkcycgaGFzICdmcm9tJyhzZWxlY3RlZHNbMF0pIGFuZCAndG8nKHNlbGVjdGVkc1sxXSkgdmFsdWVzLlxuICAgICAqIDQpIHNlbGVjdE1vZGUgaXMgJ3JhbmdlRnJvbScgYW5kIHNlbGVjdGVkc1swXSBoYXMgdmFsdWUuXG4gICAgICogNSkgc2VsZWN0TW9kZSBpcyAncmFuZ2VUbycgYW5kIHNlbGVjdGVkc1sxXSBoYXMgdmFsdWUuXG4gICAgICovXG4gICAgaWYgKFxuICAgICAgdGhpcy5waWNrZXJNb2RlICE9PSAnZGlhbG9nJyAmJlxuICAgICAgdGhpcy5waWNrZXJUeXBlID09PSAnY2FsZW5kYXInICYmXG4gICAgICAoKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZScgJiYgdGhpcy5zZWxlY3RlZCkgfHxcbiAgICAgICAgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgJiYgdGhpcy5zZWxlY3RlZHNbMF0pIHx8XG4gICAgICAgICh0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJyAmJiB0aGlzLnNlbGVjdGVkc1sxXSkgfHxcbiAgICAgICAgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyAmJiB0aGlzLnNlbGVjdGVkc1swXSAmJiB0aGlzLnNlbGVjdGVkc1sxXSkpXG4gICAgKSB7XG4gICAgICB0aGlzLmNvbmZpcm1TZWxlY3QoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgdGhlIHNlbGVjdGVkIHllYXIgaW4gbXVsdGkteWVhciB2aWV3XG4gICAqL1xuICBwdWJsaWMgc2VsZWN0WWVhcihub3JtYWxpemVkWWVhcjogVCk6IHZvaWQge1xuICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQobm9ybWFsaXplZFllYXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlld1xuICAgKi9cbiAgcHVibGljIHNlbGVjdE1vbnRoKG5vcm1hbGl6ZWRNb250aDogVCk6IHZvaWQge1xuICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRNb250aCk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZSB0aGUgcGlja2VyXG4gICAqL1xuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9vcGVuZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9jbG9zaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnBpY2tlckNsb3NpbmcuZW1pdCgpO1xuXG4gICAgaWYgKHRoaXMucG9wdXBSZWYgJiYgdGhpcy5wb3B1cFJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLnBvcHVwUmVmLmRldGFjaCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbCAmJiB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbC5pc0F0dGFjaGVkKSB7XG4gICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbC5kZXRhY2goKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oaWRlUGlja2VyU3RyZWFtU3ViKSB7XG4gICAgICB0aGlzLmhpZGVQaWNrZXJTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuaGlkZVBpY2tlclN0cmVhbVN1YiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlybVNlbGVjdGVkU3RyZWFtU3ViKSB7XG4gICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBpY2tlck9wZW5lZFN0cmVhbVN1Yikge1xuICAgICAgdGhpcy5waWNrZXJPcGVuZWRTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kaWFsb2dSZWYpIHtcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgICB0aGlzLmRpYWxvZ1JlZiA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcGxldGVDbG9zZSA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9vcGVuZWQpIHtcbiAgICAgICAgdGhpcy5fY2xvc2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9vcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hZnRlclBpY2tlckNsb3NlZC5lbWl0KCk7XG4gICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gJiZcbiAgICAgIHR5cGVvZiB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3Blbi5mb2N1cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgLy8gQmVjYXVzZSBJRSBtb3ZlcyBmb2N1cyBhc3luY2hyb25vdXNseSwgd2UgY2FuJ3QgY291bnQgb24gaXQgYmVpbmcgcmVzdG9yZWQgYmVmb3JlIHdlJ3ZlXG4gICAgICAvLyBtYXJrZWQgdGhlIGRhdGVwaWNrZXIgYXMgY2xvc2VkLiBJZiB0aGUgZXZlbnQgZmlyZXMgb3V0IG9mIHNlcXVlbmNlIGFuZCB0aGUgZWxlbWVudCB0aGF0XG4gICAgICAvLyB3ZSdyZSByZWZvY3VzaW5nIG9wZW5zIHRoZSBkYXRlcGlja2VyIG9uIGZvY3VzLCB0aGUgdXNlciBjb3VsZCBiZSBzdHVjayB3aXRoIG5vdCBiZWluZ1xuICAgICAgLy8gYWJsZSB0byBjbG9zZSB0aGUgY2FsZW5kYXIgYXQgYWxsLiBXZSB3b3JrIGFyb3VuZCBpdCBieSBtYWtpbmcgdGhlIGxvZ2ljLCB0aGF0IG1hcmtzXG4gICAgICAvLyB0aGUgZGF0ZXBpY2tlciBhcyBjbG9zZWQsIGFzeW5jIGFzIHdlbGwuXG4gICAgICB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3Blbi5mb2N1cygpO1xuICAgICAgc2V0VGltZW91dChjb21wbGV0ZUNsb3NlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcGxldGVDbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maXJtIHRoZSBzZWxlY3RlZCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIGNvbmZpcm1TZWxlY3QoZXZlbnQ/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkIHx8IHRoaXMuc3RhcnRBdCB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcbiAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRzKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW4gdGhlIHBpY2tlciBhcyBhIGRpYWxvZ1xuICAgKi9cbiAgcHJpdmF0ZSBvcGVuQXNEaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbihPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCwge1xuICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IFsnY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCcsIC4uLmNvZXJjZUFycmF5KHRoaXMuYmFja2Ryb3BDbGFzcyldLFxuICAgICAgcGFuZUNsYXNzOiBbJ293bC1kdC1kaWFsb2cnLCAuLi5jb2VyY2VBcnJheSh0aGlzLnBhbmVsQ2xhc3MpXSxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZixcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5IHx8IHRoaXMuZGVmYXVsdFNjcm9sbFN0cmF0ZWd5KCksXG4gICAgfSk7XG4gICAgdGhpcy5waWNrZXJDb250YWluZXIgPSB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZTtcblxuICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyT3BlbigpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9vcGVuaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9vcGVuZWQgPSB0cnVlO1xuICAgICAgdGhpcy5hZnRlclBpY2tlck9wZW4uZW1pdCgpO1xuICAgIH0pO1xuICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbiB0aGUgcGlja2VyIGFzIHBvcHVwXG4gICAqL1xuICBwcml2YXRlIG9wZW5Bc1BvcHVwKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwpIHtcbiAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbDxPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPj4oXG4gICAgICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5wb3B1cFJlZikge1xuICAgICAgdGhpcy5jcmVhdGVQb3B1cCgpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5wb3B1cFJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPj4gPSB0aGlzLnBvcHVwUmVmLmF0dGFjaChcbiAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwsXG4gICAgICApO1xuICAgICAgdGhpcy5waWNrZXJDb250YWluZXIgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgcG9zaXRpb24gb25jZSB0aGUgY2FsZW5kYXIgaGFzIHJlbmRlcmVkLlxuICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucG9wdXBSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIGVtaXQgb3BlbiBzdHJlYW1cbiAgICAgIHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViID0gdGhpcy5waWNrZXJDb250YWluZXIucGlja2VyT3BlbmVkU3RyZWFtXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX29wZW5pbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLl9vcGVuZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuYWZ0ZXJQaWNrZXJPcGVuLmVtaXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQb3B1cCgpOiB2b2lkIHtcbiAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5jcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3koKSxcbiAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgYmFja2Ryb3BDbGFzczogWydjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsIC4uLmNvZXJjZUFycmF5KHRoaXMuYmFja2Ryb3BDbGFzcyldLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuc2Nyb2xsU3RyYXRlZ3kgfHwgdGhpcy5kZWZhdWx0U2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgIHBhbmVsQ2xhc3M6IFsnb3dsLWR0LXBvcHVwJywgLi4uY29lcmNlQXJyYXkodGhpcy5wYW5lbENsYXNzKV0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnBvcHVwUmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcblxuICAgIG1lcmdlKFxuICAgICAgdGhpcy5wb3B1cFJlZi5iYWNrZHJvcENsaWNrKCksXG4gICAgICB0aGlzLnBvcHVwUmVmLmRldGFjaG1lbnRzKCksXG4gICAgICB0aGlzLnBvcHVwUmVmXG4gICAgICAgIC5rZXlkb3duRXZlbnRzKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgZXZlbnQgPT5cbiAgICAgICAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFIHx8XG4gICAgICAgICAgICAgICh0aGlzLl9kdElucHV0ICYmIGV2ZW50LmFsdEtleSAmJiBldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVyksXG4gICAgICAgICAgKSxcbiAgICAgICAgKSxcbiAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgcG9wdXAgUG9zaXRpb25TdHJhdGVneS5cbiAgICovXG4gIHByaXZhdGUgY3JlYXRlUG9wdXBQb3NpdGlvblN0cmF0ZWd5KCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlcbiAgICAgIC5wb3NpdGlvbigpXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9kdElucHV0LmVsZW1lbnRSZWYpXG4gICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcub3dsLWR0LWNvbnRhaW5lcicpXG4gICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgIC53aXRoUHVzaChmYWxzZSlcbiAgICAgIC53aXRoUG9zaXRpb25zKFtcbiAgICAgICAge1xuICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBvcmlnaW5YOiAnZW5kJyxcbiAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICBvdmVybGF5WDogJ2VuZCcsXG4gICAgICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgICAgIG9mZnNldFk6IC0xNzYsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgICAgICBvZmZzZXRZOiAtMzUyLFxuICAgICAgICB9LFxuICAgICAgXSk7XG4gIH1cbn1cbiIsIiJdfQ==