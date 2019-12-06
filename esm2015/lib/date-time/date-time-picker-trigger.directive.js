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
export class OwlDateTimeTriggerDirective {
    /**
     * @param {?} changeDetector
     */
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.stateChanges = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined
            ? this.dtPicker.disabled
            : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value;
    }
    /**
     * @return {?}
     */
    get owlDTTriggerDisabledClass() {
        return this.disabled;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.watchStateChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClickOnHost(event) {
        if (this.dtPicker) {
            this.dtPicker.open();
            event.stopPropagation();
        }
    }
    /**
     * @private
     * @return {?}
     */
    watchStateChanges() {
        this.stateChanges.unsubscribe();
        /** @type {?} */
        const inputDisabled = this.dtPicker && this.dtPicker.dtInput
            ? this.dtPicker.dtInput.disabledChange
            : observableOf();
        /** @type {?} */
        const pickerDisabled = this.dtPicker
            ? this.dtPicker.disabledChange
            : observableOf();
        this.stateChanges = merge(pickerDisabled, inputDisabled).subscribe((/**
         * @return {?}
         */
        () => {
            this.changeDetector.markForCheck();
        }));
    }
}
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
OwlDateTimeTriggerDirective.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
OwlDateTimeTriggerDirective.propDecorators = {
    dtPicker: [{ type: Input, args: ['owlDateTimeTrigger',] }],
    disabled: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLXRyaWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEVBS1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7OztBQVNwRSxNQUFNLE9BQU8sMkJBQTJCOzs7O0lBc0JwQyxZQUFzQixjQUFpQztRQUFqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFGL0MsaUJBQVksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBRWdCLENBQUM7Ozs7SUFqQjNELElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTO1lBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7WUFDeEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsSUFBSSx5QkFBeUI7UUFDekIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFNTSxRQUFRLEtBQVUsQ0FBQzs7Ozs7SUFFbkIsV0FBVyxDQUFDLE9BQXNCO1FBQ3JDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7Ozs7SUFFTSxrQkFBa0I7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRU0saUJBQWlCLENBQUMsS0FBWTtRQUNqQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7Ozs7O0lBRU8saUJBQWlCO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7O2NBRTFCLGFBQWEsR0FDZixJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTztZQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYztZQUN0QyxDQUFDLENBQUMsWUFBWSxFQUFFOztjQUVsQixjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVE7WUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYztZQUM5QixDQUFDLENBQUMsWUFBWSxFQUFFO1FBRXBCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQyxTQUFTOzs7UUFDOUQsR0FBRyxFQUFFO1lBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDLEVBQ0osQ0FBQztJQUNOLENBQUM7OztZQXZFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsSUFBSSxFQUFFO29CQUNGLFNBQVMsRUFBRSwyQkFBMkI7b0JBQ3RDLGlDQUFpQyxFQUFFLDJCQUEyQjtpQkFDakU7YUFDSjs7OztZQWpCRyxpQkFBaUI7Ozt1QkFvQmhCLEtBQUssU0FBQyxvQkFBb0I7dUJBRzFCLEtBQUs7Ozs7SUFITiwrQ0FBK0Q7Ozs7O0lBRS9ELGdEQUEyQjs7Ozs7SUFnQjNCLG1EQUEwQzs7Ozs7SUFFOUIscURBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXRpbWUtcGlja2VyLXRyaWdnZXIuZGlyZWN0aXZlXG4gKi9cblxuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tvd2xEYXRlVGltZVRyaWdnZXJdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrT25Ib3N0KCRldmVudCknLFxuICAgICAgICAnW2NsYXNzLm93bC1kdC10cmlnZ2VyLWRpc2FibGVkXSc6ICdvd2xEVFRyaWdnZXJEaXNhYmxlZENsYXNzJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVUcmlnZ2VyRGlyZWN0aXZlPFQ+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoJ293bERhdGVUaW1lVHJpZ2dlcicpIGR0UGlja2VyOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPjtcblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0aGlzLmR0UGlja2VyLmRpc2FibGVkXG4gICAgICAgICAgICA6ICEhdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG93bERUVHJpZ2dlckRpc2FibGVkQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGVDaGFuZ2VzID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlcy5kYXRlcGlja2VyKSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLndhdGNoU3RhdGVDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVDbGlja09uSG9zdChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIub3BlbigpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHdhdGNoU3RhdGVDaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuXG4gICAgICAgIGNvbnN0IGlucHV0RGlzYWJsZWQgPVxuICAgICAgICAgICAgdGhpcy5kdFBpY2tlciAmJiB0aGlzLmR0UGlja2VyLmR0SW5wdXRcbiAgICAgICAgICAgICAgICA/IHRoaXMuZHRQaWNrZXIuZHRJbnB1dC5kaXNhYmxlZENoYW5nZVxuICAgICAgICAgICAgICAgIDogb2JzZXJ2YWJsZU9mKCk7XG5cbiAgICAgICAgY29uc3QgcGlja2VyRGlzYWJsZWQgPSB0aGlzLmR0UGlja2VyXG4gICAgICAgICAgICA/IHRoaXMuZHRQaWNrZXIuZGlzYWJsZWRDaGFuZ2VcbiAgICAgICAgICAgIDogb2JzZXJ2YWJsZU9mKCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMgPSBtZXJnZShwaWNrZXJEaXNhYmxlZCwgaW5wdXREaXNhYmxlZCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19