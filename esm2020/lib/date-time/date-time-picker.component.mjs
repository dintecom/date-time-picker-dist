import { ChangeDetectionStrategy, Component, EventEmitter, Inject, InjectionToken, Input, Optional, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { OWL_DATE_TIME_FORMATS } from '../adapter/date-time-format.class';
import { OwlDateTime } from './date-time.class';
import { merge, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
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
    useFactory: OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY
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
    ngOnInit() { }
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
                this._opened = false;
                this.afterPickerClosed.emit(null);
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
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy()
        });
        this.pickerContainer = this.dialogRef.componentInstance;
        this.dialogRef.afterOpen().subscribe(() => {
            this.afterPickerOpen.emit(null);
            this._opened = true;
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
                this.afterPickerOpen.emit(null);
                this._opened = true;
            });
        }
    }
    createPopup() {
        const overlayConfig = new OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: ['cdk-overlay-transparent-backdrop', ...coerceArray(this.backdropClass)],
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
            panelClass: ['owl-dt-popup', ...coerceArray(this.panelClass)]
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
    }
}
OwlDateTimeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeComponent, deps: [{ token: i1.Overlay }, { token: i0.ViewContainerRef }, { token: i2.OwlDialogService }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i3.DateTimeAdapter, optional: true }, { token: OWL_DTPICKER_SCROLL_STRATEGY }, { token: OWL_DATE_TIME_FORMATS, optional: true }, { token: DOCUMENT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OwlDateTimeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: OwlDateTimeComponent, selector: "owl-date-time", inputs: { backdropClass: "backdropClass", panelClass: "panelClass", startAt: "startAt", pickerType: "pickerType", pickerMode: "pickerMode", disabled: "disabled", opened: "opened", scrollStrategy: "scrollStrategy", lazyValidation: "lazyValidation" }, outputs: { afterPickerClosed: "afterPickerClosed", afterPickerOpen: "afterPickerOpen", yearSelected: "yearSelected", monthSelected: "monthSelected" }, exportAs: ["owlDateTime"], usesInheritance: true, ngImport: i0, template: "", changeDetection: i0.ChangeDetectionStrategy.OnPush });
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
            }], yearSelected: [{
                type: Output
            }], monthSelected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFFTCxPQUFPLEVBQ1AsYUFBYSxFQUlkLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFHdkYsT0FBTyxFQUFFLHFCQUFxQixFQUFzQixNQUFNLG1DQUFtQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxXQUFXLEVBQXNDLE1BQU0sbUJBQW1CLENBQUM7QUFHcEYsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFFOUMsc0ZBQXNGO0FBQ3RGLE1BQU0sQ0FBQyxN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IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgQmxvY2tTY3JvbGxTdHJhdGVneSxcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgT3ZlcmxheVJlZixcbiAgUG9zaXRpb25TdHJhdGVneSxcbiAgU2Nyb2xsU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRVNDQVBFLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBjb2VyY2VBcnJheSwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQgeyBPV0xfREFURV9USU1FX0ZPUk1BVFMsIE93bERhdGVUaW1lRm9ybWF0cyB9IGZyb20gJy4uL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZSwgUGlja2VyTW9kZSwgUGlja2VyVHlwZSwgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7IE93bERpYWxvZ1JlZiB9IGZyb20gJy4uL2RpYWxvZy9kaWFsb2ctcmVmLmNsYXNzJztcbmltcG9ydCB7IE93bERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9kaWFsb2cvZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkdFBpY2tlciBpcyBvcGVuLiAqL1xuZXhwb3J0IGNvbnN0IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1kgPSBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KFxuICAnb3dsLWR0cGlja2VyLXNjcm9sbC1zdHJhdGVneSdcbik7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZKFxuICBvdmVybGF5OiBPdmVybGF5XG4pOiAoKSA9PiBCbG9ja1Njcm9sbFN0cmF0ZWd5IHtcbiAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1ksXG4gIGRlcHM6IFtPdmVybGF5XSxcbiAgdXNlRmFjdG9yeTogT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lJyxcbiAgZXhwb3J0QXM6ICdvd2xEYXRlVGltZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD4gZXh0ZW5kcyBPd2xEYXRlVGltZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIEN1c3RvbSBjbGFzcyBmb3IgdGhlIHBpY2tlciBiYWNrZHJvcC4gKi9cbiAgQElucHV0KClcbiAgcHVibGljIGJhY2tkcm9wQ2xhc3M6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG5cbiAgLyoqIEN1c3RvbSBjbGFzcyBmb3IgdGhlIHBpY2tlciBvdmVybGF5IHBhbmUuICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBwYW5lbENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKiBUaGUgZGF0ZSB0byBvcGVuIHRoZSBjYWxlbmRhciB0byBpbml0aWFsbHkuICovXG4gIHByaXZhdGUgX3N0YXJ0QXQ6IFQgfCBudWxsO1xuICBASW5wdXQoKVxuICBnZXQgc3RhcnRBdCgpOiBUIHwgbnVsbCB7XG4gICAgLy8gSWYgYW4gZXhwbGljaXQgc3RhcnRBdCBpcyBzZXQgd2Ugc3RhcnQgdGhlcmUsIG90aGVyd2lzZSB3ZSBzdGFydCBhdCB3aGF0ZXZlciB0aGUgY3VycmVudGx5XG4gICAgLy8gc2VsZWN0ZWQgdmFsdWUgaXMuXG4gICAgaWYgKHRoaXMuX3N0YXJ0QXQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdGFydEF0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kdElucHV0KSB7XG4gICAgICBpZiAodGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC52YWx1ZSB8fCBudWxsO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9kdElucHV0LnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHwgdGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJykge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC52YWx1ZXNbMF0gfHwgbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlID09PSAncmFuZ2VUbycpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQudmFsdWVzWzFdIHx8IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2V0IHN0YXJ0QXQoZGF0ZTogVCB8IG51bGwpIHtcbiAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5nZXRWYWxpZERhdGUodGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoZGF0ZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdHlwZSBvZiB0aGUgZGF0ZVRpbWUgcGlja2VyXG4gICAqICAgICAgJ2JvdGgnIC0tIHNob3cgYm90aCBjYWxlbmRhciBhbmQgdGltZXJcbiAgICogICAgICAnY2FsZW5kYXInIC0tIHNob3cgb25seSBjYWxlbmRhclxuICAgKiAgICAgICd0aW1lcicgLS0gc2hvdyBvbmx5IHRpbWVyXG4gICAqL1xuICBwcml2YXRlIF9waWNrZXJUeXBlOiBQaWNrZXJUeXBlID0gJ2JvdGgnO1xuICBASW5wdXQoKVxuICBnZXQgcGlja2VyVHlwZSgpOiBQaWNrZXJUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fcGlja2VyVHlwZTtcbiAgfVxuXG4gIHNldCBwaWNrZXJUeXBlKHZhbDogUGlja2VyVHlwZSkge1xuICAgIGlmICh2YWwgIT09IHRoaXMuX3BpY2tlclR5cGUpIHtcbiAgICAgIHRoaXMuX3BpY2tlclR5cGUgPSB2YWw7XG4gICAgICBpZiAodGhpcy5fZHRJbnB1dCkge1xuICAgICAgICB0aGlzLl9kdElucHV0LmZvcm1hdE5hdGl2ZUlucHV0VmFsdWUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgcGlja2VyIG9wZW4gYXMgYSBkaWFsb2dcbiAgICovXG4gIF9waWNrZXJNb2RlOiBQaWNrZXJNb2RlID0gJ3BvcHVwJztcbiAgQElucHV0KClcbiAgZ2V0IHBpY2tlck1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vZGU7XG4gIH1cblxuICBzZXQgcGlja2VyTW9kZShtb2RlOiBQaWNrZXJNb2RlKSB7XG4gICAgaWYgKG1vZGUgPT09ICdwb3B1cCcpIHtcbiAgICAgIHRoaXMuX3BpY2tlck1vZGUgPSBtb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9waWNrZXJNb2RlID0gJ2RpYWxvZyc7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGRhdGUgdGltZSBwaWNrZXIgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KClcbiAgb3ZlcnJpZGUgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMuX2R0SW5wdXRcbiAgICAgID8gdGhpcy5fZHRJbnB1dC5kaXNhYmxlZFxuICAgICAgOiAhIXRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgb3ZlcnJpZGUgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XG4gICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBpcyBvcGVuLiAqL1xuICBwcml2YXRlIF9vcGVuZWQgPSBmYWxzZTtcbiAgQElucHV0KClcbiAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbmVkO1xuICB9XG5cbiAgc2V0IG9wZW5lZCh2YWw6IGJvb2xlYW4pIHtcbiAgICB2YWwgPyB0aGlzLm9wZW4oKSA6IHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2Nyb2xsIHN0cmF0ZWd5IHdoZW4gdGhlIHBpY2tlciBpcyBvcGVuXG4gICAqIExlYXJuIG1vcmUgdGhpcyBmcm9tIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9jZGsvb3ZlcmxheS9vdmVydmlldyNzY3JvbGwtc3RyYXRlZ2llc1xuICAgKi9cbiAgQElucHV0KClcbiAgcHVibGljIHNjcm9sbFN0cmF0ZWd5OiBTY3JvbGxTdHJhdGVneTtcblxuICAvKipcbiAgICogRm9yIFJhbmdlIG1vZGUuIENoZWNrIGlmIHRoZSAnZnJvbScgaXMgYWZ0ZXIgJ3RvJyBvciAndG8nIGlzIGJlZm9yZSAnZnJvbScuXG4gICAqIElmIHRydWUgY2hlY2sgd2hlbiBjbGljayAnU2V0JyBvciBzZWxlY3QgJ3RvJy8nZnJvbScuIElmIGZhbHNlIC0gY2hlY2sgZXZlcnkgdGltZSBjaGFuZ2UuXG4gICAqL1xuICBwcml2YXRlIF9sYXp5VmFsaWRhdGlvbiA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBnZXQgbGF6eVZhbGlkYXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xhenlWYWxpZGF0aW9uO1xuICB9XG5cbiAgc2V0IGxhenlWYWxpZGF0aW9uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbGF6eVZhbGlkYXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayB3aGVuIHRoZSBwaWNrZXIgaXMgY2xvc2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgYWZ0ZXJQaWNrZXJDbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKipcbiAgICogQ2FsbGJhY2sgd2hlbiB0aGUgcGlja2VyIGlzIG9wZW5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBhZnRlclBpY2tlck9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKipcbiAgICogRW1pdHMgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aS15ZWFyIHZpZXdcbiAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHllYXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAvKipcbiAgICogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3XG4gICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBtb250aFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0IHdoZW4gdGhlIHNlbGVjdGVkIHZhbHVlIGhhcyBiZWVuIGNvbmZpcm1lZFxuICAgKi9cbiAgcHVibGljIGNvbmZpcm1TZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VFtdIHwgVD4oKTtcblxuICAvKipcbiAgICogRW1pdHMgd2hlbiB0aGUgZGF0ZSB0aW1lIHBpY2tlciBpcyBkaXNhYmxlZC5cbiAgICovXG4gIHB1YmxpYyBkaXNhYmxlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBwcml2YXRlIHBpY2tlckNvbnRhaW5lclBvcnRhbDogQ29tcG9uZW50UG9ydGFsPE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+PjtcbiAgcHJpdmF0ZSBwaWNrZXJDb250YWluZXI6IE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+O1xuICBwcml2YXRlIHBvcHVwUmVmOiBPdmVybGF5UmVmO1xuICBwcml2YXRlIGRpYWxvZ1JlZjogT3dsRGlhbG9nUmVmPE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+PjtcbiAgcHJpdmF0ZSBkdElucHV0U3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIGhpZGVQaWNrZXJTdHJlYW1TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgY29uZmlybVNlbGVjdGVkU3RyZWFtU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIHBpY2tlck9wZW5lZFN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogVGhlIGVsZW1lbnQgdGhhdCB3YXMgZm9jdXNlZCBiZWZvcmUgdGhlIGRhdGUgdGltZSBwaWNrZXIgd2FzIG9wZW5lZC4gKi9cbiAgcHJpdmF0ZSBmb2N1c2VkRWxlbWVudEJlZm9yZU9wZW46IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfZHRJbnB1dDogT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZTxUPjtcbiAgZ2V0IGR0SW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQ7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RlZDogVCB8IG51bGw7XG4gIGdldCBzZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRzOiBUW10gPSBbXTtcbiAgZ2V0IHNlbGVjdGVkcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkcyA9IHZhbHVlcztcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgZ2V0IG1pbkRhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZHRJbnB1dCAmJiB0aGlzLl9kdElucHV0Lm1pbjtcbiAgfVxuXG4gIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gIGdldCBtYXhEYXRlVGltZSgpOiBUIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQgJiYgdGhpcy5fZHRJbnB1dC5tYXg7XG4gIH1cblxuICBnZXQgZGF0ZVRpbWVGaWx0ZXIoKTogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZHRJbnB1dCAmJiB0aGlzLl9kdElucHV0LmRhdGVUaW1lRmlsdGVyO1xuICB9XG5cbiAgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZTtcbiAgfVxuXG4gIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC5pc0luU2luZ2xlTW9kZTtcbiAgfVxuXG4gIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kdElucHV0LmlzSW5SYW5nZU1vZGU7XG4gIH1cblxuICBwcml2YXRlIGRlZmF1bHRTY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IE93bERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBvdmVycmlkZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgICBASW5qZWN0KE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1kpIGRlZmF1bHRTY3JvbGxTdHJhdGVneTogYW55LFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChET0NVTUVOVClcbiAgICBwcml2YXRlIGRvY3VtZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoZGF0ZVRpbWVBZGFwdGVyLCBkYXRlVGltZUZvcm1hdHMpO1xuICAgIHRoaXMuZGVmYXVsdFNjcm9sbFN0cmF0ZWd5ID0gZGVmYXVsdFNjcm9sbFN0cmF0ZWd5O1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge31cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMuZHRJbnB1dFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UuY29tcGxldGUoKTtcblxuICAgIGlmICh0aGlzLnBvcHVwUmVmKSB7XG4gICAgICB0aGlzLnBvcHVwUmVmLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJJbnB1dChpbnB1dDogT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZTxUPik6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kdElucHV0KSB7XG4gICAgICB0aHJvdyBFcnJvcignQSBPd2wgRGF0ZVRpbWVQaWNrZXIgY2FuIG9ubHkgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc2luZ2xlIGlucHV0LicpO1xuICAgIH1cblxuICAgIHRoaXMuX2R0SW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLmR0SW5wdXRTdWIgPSB0aGlzLl9kdElucHV0LnZhbHVlQ2hhbmdlLnN1YnNjcmliZSgodmFsdWU6IFRbXSB8IFQgfCBudWxsKSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZHMgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcGVuZWQgfHwgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fZHRJbnB1dCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0F0dGVtcHRlZCB0byBvcGVuIGFuIERhdGVUaW1lUGlja2VyIHdpdGggbm8gYXNzb2NpYXRlZCBpbnB1dC4nKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kb2N1bWVudCkge1xuICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gPSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gcmVzZXQgdGhlIHBpY2tlciBzZWxlY3RlZCB2YWx1ZVxuICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5fZHRJbnB1dC52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZHMgPSB0aGlzLl9kdElucHV0LnZhbHVlcztcbiAgICB9XG5cbiAgICAvLyB3aGVuIHRoZSBwaWNrZXIgaXMgb3BlbiAsIHdlIG1ha2Ugc3VyZSB0aGUgcGlja2VyJ3MgY3VycmVudCBzZWxlY3RlZCB0aW1lIHZhbHVlXG4gICAgLy8gaXMgdGhlIHNhbWUgYXMgdGhlIF9zdGFydEF0IHRpbWUgdmFsdWUuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5waWNrZXJUeXBlICE9PSAnY2FsZW5kYXInICYmIHRoaXMuX3N0YXJ0QXQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuc2VsZWN0ZWQpLFxuICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnNlbGVjdGVkKSxcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnNlbGVjdGVkKSxcbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5fc3RhcnRBdCksXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5fc3RhcnRBdCksXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5fc3RhcnRBdCksXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbGxpc2Vjb25kcyh0aGlzLl9zdGFydEF0KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnBpY2tlck1vZGUgPT09ICdkaWFsb2cnID8gdGhpcy5vcGVuQXNEaWFsb2coKSA6IHRoaXMub3BlbkFzUG9wdXAoKTtcblxuICAgIHRoaXMucGlja2VyQ29udGFpbmVyLnBpY2tlciA9IHRoaXM7XG4gICAgdGhpcy5waWNrZXJDb250YWluZXIubGF6eVZhbGlkYXRpb24gPSB0aGlzLmxhenlWYWxpZGF0aW9uO1xuXG4gICAgLy8gTGlzdGVuIHRvIHBpY2tlciBjb250YWluZXIncyBoaWRlUGlja2VyU3RyZWFtXG4gICAgdGhpcy5oaWRlUGlja2VyU3RyZWFtU3ViID0gdGhpcy5waWNrZXJDb250YWluZXIuaGlkZVBpY2tlclN0cmVhbS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gTGlzdGVuIHRvIHBpY2tlciBjb250YWluZXIncyBjb25maXJtU2VsZWN0ZWRTdHJlYW1cbiAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLmNvbmZpcm1TZWxlY3RlZFN0cmVhbS5zdWJzY3JpYmUoXG4gICAgICAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3QoZXZlbnQpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgZ2l2ZW4gZGF0ZVxuICAgKi9cbiAgcHVibGljIHNlbGVjdChkYXRlOiBUW10gfCBUKTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZSkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRzID0gWy4uLmRhdGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYXNlcyBpbiB3aGljaCBhdXRvbWF0aWNhbGx5IGNvbmZpcm0gdGhlIHNlbGVjdCB3aGVuIGRhdGUgb3IgZGF0ZXMgYXJlIHNlbGVjdGVkOlxuICAgICAqIDEpIHBpY2tlciBtb2RlIGlzIE5PVCAnZGlhbG9nJ1xuICAgICAqIDIpIHBpY2tlciB0eXBlIGlzICdjYWxlbmRhcicgYW5kIHNlbGVjdE1vZGUgaXMgJ3NpbmdsZScuXG4gICAgICogMykgcGlja2VyIHR5cGUgaXMgJ2NhbGVuZGFyJyBhbmQgc2VsZWN0TW9kZSBpcyAncmFuZ2UnIGFuZFxuICAgICAqICAgIHRoZSAnc2VsZWN0ZWRzJyBoYXMgJ2Zyb20nKHNlbGVjdGVkc1swXSkgYW5kICd0bycoc2VsZWN0ZWRzWzFdKSB2YWx1ZXMuXG4gICAgICogNCkgc2VsZWN0TW9kZSBpcyAncmFuZ2VGcm9tJyBhbmQgc2VsZWN0ZWRzWzBdIGhhcyB2YWx1ZS5cbiAgICAgKiA1KSBzZWxlY3RNb2RlIGlzICdyYW5nZVRvJyBhbmQgc2VsZWN0ZWRzWzFdIGhhcyB2YWx1ZS5cbiAgICAgKi9cbiAgICBpZiAoXG4gICAgICB0aGlzLnBpY2tlck1vZGUgIT09ICdkaWFsb2cnICYmXG4gICAgICB0aGlzLnBpY2tlclR5cGUgPT09ICdjYWxlbmRhcicgJiZcbiAgICAgICgodGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJyAmJiB0aGlzLnNlbGVjdGVkKSB8fFxuICAgICAgICAodGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyAmJiB0aGlzLnNlbGVjdGVkc1swXSkgfHxcbiAgICAgICAgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nICYmIHRoaXMuc2VsZWN0ZWRzWzFdKSB8fFxuICAgICAgICAodGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnICYmIHRoaXMuc2VsZWN0ZWRzWzBdICYmIHRoaXMuc2VsZWN0ZWRzWzFdKSlcbiAgICApIHtcbiAgICAgIHRoaXMuY29uZmlybVNlbGVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aS15ZWFyIHZpZXdcbiAgICovXG4gIHB1YmxpYyBzZWxlY3RZZWFyKG5vcm1hbGl6ZWRZZWFyOiBUKTogdm9pZCB7XG4gICAgdGhpcy55ZWFyU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkWWVhcik7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3XG4gICAqL1xuICBwdWJsaWMgc2VsZWN0TW9udGgobm9ybWFsaXplZE1vbnRoOiBUKTogdm9pZCB7XG4gICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQobm9ybWFsaXplZE1vbnRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoZSBwaWNrZXJcbiAgICovXG4gIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX29wZW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBvcHVwUmVmICYmIHRoaXMucG9wdXBSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5wb3B1cFJlZi5kZXRhY2goKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwgJiYgdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwuaXNBdHRhY2hlZCkge1xuICAgICAgdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGlkZVBpY2tlclN0cmVhbVN1Yikge1xuICAgICAgdGhpcy5oaWRlUGlja2VyU3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmhpZGVQaWNrZXJTdHJlYW1TdWIgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1Yikge1xuICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkU3RyZWFtU3ViID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5waWNrZXJPcGVuZWRTdHJlYW1TdWIpIHtcbiAgICAgIHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnBpY2tlck9wZW5lZFN0cmVhbVN1YiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlhbG9nUmVmKSB7XG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICAgICAgdGhpcy5kaWFsb2dSZWYgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBsZXRlQ2xvc2UgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fb3BlbmVkKSB7XG4gICAgICAgIHRoaXMuX29wZW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFmdGVyUGlja2VyQ2xvc2VkLmVtaXQobnVsbCk7XG4gICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gJiZcbiAgICAgIHR5cGVvZiB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3Blbi5mb2N1cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgLy8gQmVjYXVzZSBJRSBtb3ZlcyBmb2N1cyBhc3luY2hyb25vdXNseSwgd2UgY2FuJ3QgY291bnQgb24gaXQgYmVpbmcgcmVzdG9yZWQgYmVmb3JlIHdlJ3ZlXG4gICAgICAvLyBtYXJrZWQgdGhlIGRhdGVwaWNrZXIgYXMgY2xvc2VkLiBJZiB0aGUgZXZlbnQgZmlyZXMgb3V0IG9mIHNlcXVlbmNlIGFuZCB0aGUgZWxlbWVudCB0aGF0XG4gICAgICAvLyB3ZSdyZSByZWZvY3VzaW5nIG9wZW5zIHRoZSBkYXRlcGlja2VyIG9uIGZvY3VzLCB0aGUgdXNlciBjb3VsZCBiZSBzdHVjayB3aXRoIG5vdCBiZWluZ1xuICAgICAgLy8gYWJsZSB0byBjbG9zZSB0aGUgY2FsZW5kYXIgYXQgYWxsLiBXZSB3b3JrIGFyb3VuZCBpdCBieSBtYWtpbmcgdGhlIGxvZ2ljLCB0aGF0IG1hcmtzXG4gICAgICAvLyB0aGUgZGF0ZXBpY2tlciBhcyBjbG9zZWQsIGFzeW5jIGFzIHdlbGwuXG4gICAgICB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3Blbi5mb2N1cygpO1xuICAgICAgc2V0VGltZW91dChjb21wbGV0ZUNsb3NlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcGxldGVDbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maXJtIHRoZSBzZWxlY3RlZCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIGNvbmZpcm1TZWxlY3QoZXZlbnQ/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkIHx8IHRoaXMuc3RhcnRBdCB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcbiAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRzKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW4gdGhlIHBpY2tlciBhcyBhIGRpYWxvZ1xuICAgKi9cbiAgcHJpdmF0ZSBvcGVuQXNEaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbihPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCwge1xuICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IFsnY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCcsIC4uLmNvZXJjZUFycmF5KHRoaXMuYmFja2Ryb3BDbGFzcyldLFxuICAgICAgcGFuZUNsYXNzOiBbJ293bC1kdC1kaWFsb2cnLCAuLi5jb2VyY2VBcnJheSh0aGlzLnBhbmVsQ2xhc3MpXSxcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZixcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5IHx8IHRoaXMuZGVmYXVsdFNjcm9sbFN0cmF0ZWd5KClcbiAgICB9KTtcbiAgICB0aGlzLnBpY2tlckNvbnRhaW5lciA9IHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlO1xuXG4gICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJPcGVuKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuYWZ0ZXJQaWNrZXJPcGVuLmVtaXQobnVsbCk7XG4gICAgICB0aGlzLl9vcGVuZWQgPSB0cnVlO1xuICAgIH0pO1xuICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbiB0aGUgcGlja2VyIGFzIHBvcHVwXG4gICAqL1xuICBwcml2YXRlIG9wZW5Bc1BvcHVwKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwpIHtcbiAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbDxPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPj4oXG4gICAgICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWZcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnBvcHVwUmVmKSB7XG4gICAgICB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnBvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+PiA9IHRoaXMucG9wdXBSZWYuYXR0YWNoKFxuICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbFxuICAgICAgKTtcbiAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIHBvc2l0aW9uIG9uY2UgdGhlIGNhbGVuZGFyIGhhcyByZW5kZXJlZC5cbiAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnBvcHVwUmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBlbWl0IG9wZW4gc3RyZWFtXG4gICAgICB0aGlzLnBpY2tlck9wZW5lZFN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLnBpY2tlck9wZW5lZFN0cmVhbVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmFmdGVyUGlja2VyT3Blbi5lbWl0KG51bGwpO1xuICAgICAgICAgIHRoaXMuX29wZW5lZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUG9wdXAoKTogdm9pZCB7XG4gICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuY3JlYXRlUG9wdXBQb3NpdGlvblN0cmF0ZWd5KCksXG4gICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IFsnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnLCAuLi5jb2VyY2VBcnJheSh0aGlzLmJhY2tkcm9wQ2xhc3MpXSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5IHx8IHRoaXMuZGVmYXVsdFNjcm9sbFN0cmF0ZWd5KCksXG4gICAgICBwYW5lbENsYXNzOiBbJ293bC1kdC1wb3B1cCcsIC4uLmNvZXJjZUFycmF5KHRoaXMucGFuZWxDbGFzcyldXG4gICAgfSk7XG5cbiAgICB0aGlzLnBvcHVwUmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcblxuICAgIG1lcmdlKFxuICAgICAgdGhpcy5wb3B1cFJlZi5iYWNrZHJvcENsaWNrKCksXG4gICAgICB0aGlzLnBvcHVwUmVmLmRldGFjaG1lbnRzKCksXG4gICAgICB0aGlzLnBvcHVwUmVmXG4gICAgICAgIC5rZXlkb3duRXZlbnRzKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgZXZlbnQgPT5cbiAgICAgICAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFIHx8XG4gICAgICAgICAgICAgICh0aGlzLl9kdElucHV0ICYmIGV2ZW50LmFsdEtleSAmJiBldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVylcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgcG9wdXAgUG9zaXRpb25TdHJhdGVneS5cbiAgICovXG4gIHByaXZhdGUgY3JlYXRlUG9wdXBQb3NpdGlvblN0cmF0ZWd5KCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlcbiAgICAgIC5wb3NpdGlvbigpXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9kdElucHV0LmVsZW1lbnRSZWYpXG4gICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcub3dsLWR0LWNvbnRhaW5lcicpXG4gICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgIC53aXRoUHVzaChmYWxzZSlcbiAgICAgIC53aXRoUG9zaXRpb25zKFtcbiAgICAgICAge1xuICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICAgICAgb2Zmc2V0WTogLTE3NlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICAgICAgb2Zmc2V0WTogLTM1MlxuICAgICAgICB9XG4gICAgICBdKTtcbiAgfVxufVxuIiwiIl19