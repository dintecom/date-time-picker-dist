import { Directive, Input, } from '@angular/core';
import { merge, of as observableOf, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export class OwlDateTimeTriggerDirective {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.stateChanges = Subscription.EMPTY;
    }
    get disabled() {
        return this._disabled === undefined ? this.dtPicker.disabled : !!this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }
    get owlDTTriggerDisabledClass() {
        return this.disabled;
    }
    ngOnChanges(changes) {
        if (changes['datepicker']) {
            this.watchStateChanges();
        }
    }
    ngAfterContentInit() {
        this.watchStateChanges();
    }
    ngOnDestroy() {
        this.stateChanges.unsubscribe();
    }
    handleClickOnHost(event) {
        if (this.dtPicker) {
            this.dtPicker.open();
            event.stopPropagation();
        }
    }
    watchStateChanges() {
        this.stateChanges.unsubscribe();
        const inputDisabled = this.dtPicker && this.dtPicker.dtInput
            ? this.dtPicker.dtInput.disabledChange
            : observableOf();
        const pickerDisabled = this.dtPicker ? this.dtPicker.disabledChange : observableOf();
        this.stateChanges = merge([pickerDisabled, inputDisabled]).subscribe(() => {
            this.changeDetector.markForCheck();
        });
    }
}
OwlDateTimeTriggerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeTriggerDirective, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
OwlDateTimeTriggerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.0", type: OwlDateTimeTriggerDirective, selector: "[owlDateTimeTrigger]", inputs: { dtPicker: ["owlDateTimeTrigger", "dtPicker"], disabled: "disabled" }, host: { listeners: { "click": "handleClickOnHost($event)" }, properties: { "class.owl-dt-trigger-disabled": "owlDTTriggerDisabledClass" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[owlDateTimeTrigger]',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        '(click)': 'handleClickOnHost($event)',
                        '[class.owl-dt-trigger-disabled]': 'owlDTTriggerDisabledClass',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { dtPicker: [{
                type: Input,
                args: ['owlDateTimeTrigger']
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLXRyaWdnZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxTQUFTLEVBQ1QsS0FBSyxHQUlOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBVy9ELE1BQU0sT0FBTywyQkFBMkI7SUFtQnRDLFlBQXNCLGNBQWlDO1FBQWpDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUYvQyxpQkFBWSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFFZ0IsQ0FBQztJQWYzRCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDbEYsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUkseUJBQXlCO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBTU0sV0FBVyxDQUFDLE9BQXNCO1FBQ3ZDLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVNLGtCQUFrQjtRQUN2QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxLQUFZO1FBQ25DLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVoQyxNQUFNLGFBQWEsR0FDakIsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87WUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWM7WUFDdEMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXJCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVyRixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDeEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O3dIQXZEVSwyQkFBMkI7NEdBQTNCLDJCQUEyQjsyRkFBM0IsMkJBQTJCO2tCQVJ2QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLHFFQUFxRTtvQkFDckUsSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFBRSwyQkFBMkI7d0JBQ3RDLGlDQUFpQyxFQUFFLDJCQUEyQjtxQkFDL0Q7aUJBQ0Y7d0dBRThCLFFBQVE7c0JBQXBDLEtBQUs7dUJBQUMsb0JBQW9CO2dCQUl2QixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbb3dsRGF0ZVRpbWVUcmlnZ2VyXScsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxuICBob3N0OiB7XG4gICAgJyhjbGljayknOiAnaGFuZGxlQ2xpY2tPbkhvc3QoJGV2ZW50KScsXG4gICAgJ1tjbGFzcy5vd2wtZHQtdHJpZ2dlci1kaXNhYmxlZF0nOiAnb3dsRFRUcmlnZ2VyRGlzYWJsZWRDbGFzcycsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCdvd2xEYXRlVGltZVRyaWdnZXInKSBkdFBpY2tlcjogT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD47XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCA/IHRoaXMuZHRQaWNrZXIuZGlzYWJsZWQgOiAhIXRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBvd2xEVFRyaWdnZXJEaXNhYmxlZENsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydkYXRlcGlja2VyJ10pIHtcbiAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrT25Ib3N0KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmR0UGlja2VyKSB7XG4gICAgICB0aGlzLmR0UGlja2VyLm9wZW4oKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgd2F0Y2hTdGF0ZUNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcblxuICAgIGNvbnN0IGlucHV0RGlzYWJsZWQgPVxuICAgICAgdGhpcy5kdFBpY2tlciAmJiB0aGlzLmR0UGlja2VyLmR0SW5wdXRcbiAgICAgICAgPyB0aGlzLmR0UGlja2VyLmR0SW5wdXQuZGlzYWJsZWRDaGFuZ2VcbiAgICAgICAgOiBvYnNlcnZhYmxlT2YoKTtcblxuICAgIGNvbnN0IHBpY2tlckRpc2FibGVkID0gdGhpcy5kdFBpY2tlciA/IHRoaXMuZHRQaWNrZXIuZGlzYWJsZWRDaGFuZ2UgOiBvYnNlcnZhYmxlT2YoKTtcblxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzID0gbWVyZ2UoW3BpY2tlckRpc2FibGVkLCBpbnB1dERpc2FibGVkXSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==