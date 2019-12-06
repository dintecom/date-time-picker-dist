/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker-trigger.directive
 */
import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { OwlDateTimeComponent } from './date-time-picker.component';
/**
 * @template T
 */
var OwlDateTimeTriggerDirective = /** @class */ (function () {
    function OwlDateTimeTriggerDirective(changeDetector) {
        this.changeDetector = changeDetector;
        this.stateChanges = Subscription.EMPTY;
    }
    Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled === undefined
                ? this.dtPicker.disabled
                : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "owlDTTriggerDisabledClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} changes
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    };
    /**
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.watchStateChanges();
    };
    /**
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.handleClickOnHost = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.dtPicker) {
            this.dtPicker.open();
            event.stopPropagation();
        }
    };
    /**
     * @private
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.watchStateChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.stateChanges.unsubscribe();
        /** @type {?} */
        var inputDisabled = this.dtPicker && this.dtPicker.dtInput
            ? this.dtPicker.dtInput.disabledChange
            : observableOf();
        /** @type {?} */
        var pickerDisabled = this.dtPicker
            ? this.dtPicker.disabledChange
            : observableOf();
        this.stateChanges = merge(pickerDisabled, inputDisabled).subscribe((/**
         * @return {?}
         */
        function () {
            _this.changeDetector.markForCheck();
        }));
    };
    OwlDateTimeTriggerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[owlDateTimeTrigger]',
                    host: {
                        '(click)': 'handleClickOnHost($event)',
                        '[class.owl-dt-trigger-disabled]': 'owlDTTriggerDisabledClass'
                    }
                },] }
    ];
    /** @nocollapse */
    OwlDateTimeTriggerDirective.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    OwlDateTimeTriggerDirective.propDecorators = {
        dtPicker: [{ type: Input, args: ['owlDateTimeTrigger',] }],
        disabled: [{ type: Input }]
    };
    return OwlDateTimeTriggerDirective;
}());
export { OwlDateTimeTriggerDirective };
if (false) {
    /** @type {?} */
    OwlDateTimeTriggerDirective.prototype.dtPicker;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeTriggerDirective.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeTriggerDirective.prototype.stateChanges;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeTriggerDirective.prototype.changeDetector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLXRyaWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEVBS1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7OztBQUVwRTtJQTZCSSxxQ0FBc0IsY0FBaUM7UUFBakMsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBRi9DLGlCQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUVnQixDQUFDO0lBakIzRCxzQkFDSSxpREFBUTs7OztRQURaO1lBRUksT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVM7Z0JBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMzQixDQUFDOzs7OztRQUVELFVBQWEsS0FBYztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLGtFQUF5Qjs7OztRQUE3QjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTs7OztJQU1NLDhDQUFROzs7SUFBZixjQUF5QixDQUFDOzs7OztJQUVuQixpREFBVzs7OztJQUFsQixVQUFtQixPQUFzQjtRQUNyQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7O0lBRU0sd0RBQWtCOzs7SUFBekI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRU0saURBQVc7OztJQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFTSx1REFBaUI7Ozs7SUFBeEIsVUFBeUIsS0FBWTtRQUNqQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7Ozs7O0lBRU8sdURBQWlCOzs7O0lBQXpCO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7O1lBRTFCLGFBQWEsR0FDZixJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTztZQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYztZQUN0QyxDQUFDLENBQUMsWUFBWSxFQUFFOztZQUVsQixjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVE7WUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYztZQUM5QixDQUFDLENBQUMsWUFBWSxFQUFFO1FBRXBCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQyxTQUFTOzs7UUFDOUQ7WUFDSSxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUMsRUFDSixDQUFDO0lBQ04sQ0FBQzs7Z0JBdkVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxJQUFJLEVBQUU7d0JBQ0YsU0FBUyxFQUFFLDJCQUEyQjt3QkFDdEMsaUNBQWlDLEVBQUUsMkJBQTJCO3FCQUNqRTtpQkFDSjs7OztnQkFqQkcsaUJBQWlCOzs7MkJBb0JoQixLQUFLLFNBQUMsb0JBQW9COzJCQUcxQixLQUFLOztJQTREVixrQ0FBQztDQUFBLEFBeEVELElBd0VDO1NBakVZLDJCQUEyQjs7O0lBRXBDLCtDQUErRDs7Ozs7SUFFL0QsZ0RBQTJCOzs7OztJQWdCM0IsbURBQTBDOzs7OztJQUU5QixxREFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1waWNrZXItdHJpZ2dlci5kaXJlY3RpdmVcbiAqL1xuXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE93bERhdGVUaW1lQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW293bERhdGVUaW1lVHJpZ2dlcl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2tPbkhvc3QoJGV2ZW50KScsXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LXRyaWdnZXItZGlzYWJsZWRdJzogJ293bERUVHJpZ2dlckRpc2FibGVkQ2xhc3MnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZVRyaWdnZXJEaXJlY3RpdmU8VD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgnb3dsRGF0ZVRpbWVUcmlnZ2VyJykgZHRQaWNrZXI6IE93bERhdGVUaW1lQ29tcG9uZW50PFQ+O1xuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRoaXMuZHRQaWNrZXIuZGlzYWJsZWRcbiAgICAgICAgICAgIDogISF0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgb3dsRFRUcmlnZ2VyRGlzYWJsZWRDbGFzcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge31cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmRhdGVwaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUNsaWNrT25Ib3N0KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kdFBpY2tlcikge1xuICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5vcGVuKCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgd2F0Y2hTdGF0ZUNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgY29uc3QgaW5wdXREaXNhYmxlZCA9XG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyICYmIHRoaXMuZHRQaWNrZXIuZHRJbnB1dFxuICAgICAgICAgICAgICAgID8gdGhpcy5kdFBpY2tlci5kdElucHV0LmRpc2FibGVkQ2hhbmdlXG4gICAgICAgICAgICAgICAgOiBvYnNlcnZhYmxlT2YoKTtcblxuICAgICAgICBjb25zdCBwaWNrZXJEaXNhYmxlZCA9IHRoaXMuZHRQaWNrZXJcbiAgICAgICAgICAgID8gdGhpcy5kdFBpY2tlci5kaXNhYmxlZENoYW5nZVxuICAgICAgICAgICAgOiBvYnNlcnZhYmxlT2YoKTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcyA9IG1lcmdlKHBpY2tlckRpc2FibGVkLCBpbnB1dERpc2FibGVkKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=