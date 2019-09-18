/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * timer-box.component
 */
import { ChangeDetectionStrategy, Component, EventEmitter, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
export class OwlTimerBoxComponent {
    constructor() {
        this.showDivider = false;
        this.step = 1;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.inputStream = new Subject();
        this.inputStreamSub = Subscription.EMPTY;
        this.onValueInputMouseWheelBind = this.onValueInputMouseWheel.bind(this);
    }
    /**
     * @return {?}
     */
    get displayValue() {
        return this.boxValue || this.value;
    }
    /**
     * @return {?}
     */
    get owlDTTimerBoxClass() {
        return true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.inputStreamSub = this.inputStream.pipe(debounceTime(500), distinctUntilChanged()).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            if (val) {
                /** @type {?} */
                const inputValue = coerceNumberProperty(val, 0);
                this.updateValueViaInput(inputValue);
            }
        }));
        this.bindValueInputMouseWheel();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unbindValueInputMouseWheel();
        this.inputStreamSub.unsubscribe();
    }
    /**
     * @return {?}
     */
    upBtnClicked() {
        this.updateValue(this.value + this.step);
    }
    /**
     * @return {?}
     */
    downBtnClicked() {
        this.updateValue(this.value - this.step);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    handleInputChange(val) {
        this.inputStream.next(val);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        this.valueChange.emit(value);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    updateValueViaInput(value) {
        if (value > this.max || value < this.min) {
            return;
        }
        this.inputChange.emit(value);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    onValueInputMouseWheel(event) {
        event = event || window.event;
        /** @type {?} */
        var delta = event.wheelDelta || -event.deltaY || -event.detail;
        if (delta > 0) {
            !this.upBtnDisabled && this.upBtnClicked();
        }
        else if (delta < 0) {
            !this.downBtnDisabled && this.downBtnClicked();
        }
        event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    }
    /**
     * @private
     * @return {?}
     */
    bindValueInputMouseWheel() {
        this.valueInput.nativeElement.addEventListener('onwheel' in document ? "wheel" : "mousewheel", this.onValueInputMouseWheelBind);
    }
    /**
     * @private
     * @return {?}
     */
    unbindValueInputMouseWheel() {
        this.valueInput.nativeElement.removeEventListener('onwheel' in document ? "wheel" : "mousewheel", this.onValueInputMouseWheelBind);
    }
}
OwlTimerBoxComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'owlDateTimeTimerBox',
                selector: 'owl-date-time-timer-box',
                template: "<div *ngIf=\"showDivider\" class=\"owl-dt-timer-divider\" aria-hidden=\"true\"></div>\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\" tabindex=\"-1\"\n        [disabled]=\"upBtnDisabled\"\n        [attr.aria-label]=\"upBtnAriaLabel\"\n        (click)=\"upBtnClicked()\">\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Up\"> -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\n                 width=\"100%\" height=\"100%\">\n                    <path d=\"M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0\n                        L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4\n                        c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z\"/>\n                </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n<label class=\"owl-dt-timer-content\">\n    <input class=\"owl-dt-timer-input\" maxlength=\"2\"\n           [value]=\"displayValue | numberFixedLen : 2\"\n           (keydown.arrowup)=\"!upBtnDisabled && upBtnClicked()\"\n           (keydown.arrowdown)=\"!downBtnDisabled && downBtnClicked()\"\n           (input)=\"handleInputChange(valueInput.value)\" #valueInput>\n    <span class=\"owl-hidden-accessible\">{{inputLabel}}</span>\n</label>\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\" tabindex=\"-1\"\n        [disabled]=\"downBtnDisabled\"\n        [attr.aria-label]=\"downBtnAriaLabel\"\n        (click)=\"downBtnClicked()\">\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Down\"> -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\n                 width=\"100%\" height=\"100%\">\n                    <path d=\"M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751\n                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0\n                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z\"/>\n                </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n",
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.owl-dt-timer-box]': 'owlDTTimerBoxClass'
                },
                styles: [""]
            }] }
];
/** @nocollapse */
OwlTimerBoxComponent.ctorParameters = () => [];
OwlTimerBoxComponent.propDecorators = {
    showDivider: [{ type: Input }],
    upBtnAriaLabel: [{ type: Input }],
    upBtnDisabled: [{ type: Input }],
    downBtnAriaLabel: [{ type: Input }],
    downBtnDisabled: [{ type: Input }],
    boxValue: [{ type: Input }],
    value: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    step: [{ type: Input }],
    inputLabel: [{ type: Input }],
    valueChange: [{ type: Output }],
    inputChange: [{ type: Output }],
    valueInput: [{ type: ViewChild, args: ['valueInput', { static: true },] }]
};
if (false) {
    /** @type {?} */
    OwlTimerBoxComponent.prototype.showDivider;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.upBtnAriaLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.upBtnDisabled;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.downBtnAriaLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.downBtnDisabled;
    /**
     * Value would be displayed in the box
     * If it is null, the box would display [value]
     *
     * @type {?}
     */
    OwlTimerBoxComponent.prototype.boxValue;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.value;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.min;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.max;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.step;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.inputLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.valueChange;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.inputChange;
    /**
     * @type {?}
     * @private
     */
    OwlTimerBoxComponent.prototype.inputStream;
    /**
     * @type {?}
     * @private
     */
    OwlTimerBoxComponent.prototype.inputStreamSub;
    /**
     * @type {?}
     * @private
     */
    OwlTimerBoxComponent.prototype.valueInput;
    /**
     * @type {?}
     * @private
     */
    OwlTimerBoxComponent.prototype.onValueInputMouseWheelBind;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL3RpbWVyLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFHTCxNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBY3BFLE1BQU0sT0FBTyxvQkFBb0I7SUE4QzdCO1FBNUNTLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBc0JwQixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBSVIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXpDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUUzQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFFcEMsbUJBQWMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBd0RwQywrQkFBMEIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBM0M1RSxDQUFDOzs7O0lBWEQsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELElBQUksa0JBQWtCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFPTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDdkMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixvQkFBb0IsRUFBRSxDQUN6QixDQUFDLFNBQVM7Ozs7UUFBQyxDQUFFLEdBQVcsRUFBRyxFQUFFO1lBQzFCLElBQUksR0FBRyxFQUFFOztzQkFDQyxVQUFVLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3hDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVNLFlBQVk7UUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFTSxjQUFjO1FBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFFTSxpQkFBaUIsQ0FBRSxHQUFXO1FBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUVPLFdBQVcsQ0FBRSxLQUFhO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7OztJQUVPLG1CQUFtQixDQUFFLEtBQWE7UUFDdEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN0QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFHTyxzQkFBc0IsQ0FBRSxLQUFVO1FBQ3RDLEtBQUssR0FBRyxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQzs7WUFDMUIsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07UUFFOUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFDO1lBQ1YsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM5QzthQUFNLElBQUksS0FBSyxHQUFHLENBQUMsRUFBQztZQUNqQixDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ2xEO1FBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDaEYsQ0FBQzs7Ozs7SUFFTyx3QkFBd0I7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQzFDLFNBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUM5QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7OztJQUVPLDBCQUEwQjtRQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FDN0MsU0FBUyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQzlDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7OztZQTlISixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMseXlGQUF5QztnQkFFekMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDRiwwQkFBMEIsRUFBRSxvQkFBb0I7aUJBQ25EOzthQUNKOzs7OzswQkFJSSxLQUFLOzZCQUVMLEtBQUs7NEJBRUwsS0FBSzsrQkFFTCxLQUFLOzhCQUVMLEtBQUs7dUJBTUwsS0FBSztvQkFFTCxLQUFLO2tCQUVMLEtBQUs7a0JBRUwsS0FBSzttQkFFTCxLQUFLO3lCQUVMLEtBQUs7MEJBRUwsTUFBTTswQkFFTixNQUFNO3lCQWNOLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzs7O0lBMUN6QywyQ0FBNkI7O0lBRTdCLDhDQUFnQzs7SUFFaEMsNkNBQWdDOztJQUVoQyxnREFBa0M7O0lBRWxDLCtDQUFrQzs7Ozs7OztJQU1sQyx3Q0FBMEI7O0lBRTFCLHFDQUF1Qjs7SUFFdkIsbUNBQXFCOztJQUVyQixtQ0FBcUI7O0lBRXJCLG9DQUFrQjs7SUFFbEIsMENBQTRCOztJQUU1QiwyQ0FBbUQ7O0lBRW5ELDJDQUFtRDs7Ozs7SUFFbkQsMkNBQTRDOzs7OztJQUU1Qyw4Q0FBNEM7Ozs7O0lBVTVDLDBDQUEwRTs7Ozs7SUE4QzFFLDBEQUE0RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogdGltZXItYm94LmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBFbGVtZW50UmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgZXhwb3J0QXM6ICdvd2xEYXRlVGltZVRpbWVyQm94JyxcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUtdGltZXItYm94JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZXItYm94LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90aW1lci1ib3guY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3Mub3dsLWR0LXRpbWVyLWJveF0nOiAnb3dsRFRUaW1lckJveENsYXNzJ1xuICAgIH1cbn0pXG5cbmV4cG9ydCBjbGFzcyBPd2xUaW1lckJveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHNob3dEaXZpZGVyID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSB1cEJ0bkFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdXBCdG5EaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRvd25CdG5BcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRvd25CdG5EaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFZhbHVlIHdvdWxkIGJlIGRpc3BsYXllZCBpbiB0aGUgYm94XG4gICAgICogSWYgaXQgaXMgbnVsbCwgdGhlIGJveCB3b3VsZCBkaXNwbGF5IFt2YWx1ZV1cbiAgICAgKiAqL1xuICAgIEBJbnB1dCgpIGJveFZhbHVlOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWluOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBtYXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHN0ZXAgPSAxO1xuXG4gICAgQElucHV0KCkgaW5wdXRMYWJlbDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIHByaXZhdGUgaW5wdXRTdHJlYW0gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgICBwcml2YXRlIGlucHV0U3RyZWFtU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5ib3hWYWx1ZSB8fCB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBvd2xEVFRpbWVyQm94Q2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoJ3ZhbHVlSW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIHZhbHVlSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW1TdWIgPSB0aGlzLmlucHV0U3RyZWFtLnBpcGUoXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoNTAwKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgICAgKS5zdWJzY3JpYmUoKCB2YWw6IHN0cmluZyApID0+IHtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dFZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlVmlhSW5wdXQoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJpbmRWYWx1ZUlucHV0TW91c2VXaGVlbCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bmJpbmRWYWx1ZUlucHV0TW91c2VXaGVlbCgpO1xuICAgICAgICB0aGlzLmlucHV0U3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwQnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh0aGlzLnZhbHVlICsgdGhpcy5zdGVwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZG93bkJ0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy52YWx1ZSAtIHRoaXMuc3RlcCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUlucHV0Q2hhbmdlKCB2YWw6IHN0cmluZyApOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dFN0cmVhbS5uZXh0KHZhbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZSggdmFsdWU6IG51bWJlciApOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZhbHVlVmlhSW5wdXQoIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgICAgIGlmICh2YWx1ZSA+IHRoaXMubWF4IHx8IHZhbHVlIDwgdGhpcy5taW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25WYWx1ZUlucHV0TW91c2VXaGVlbEJpbmQgPSB0aGlzLm9uVmFsdWVJbnB1dE1vdXNlV2hlZWwuYmluZCh0aGlzKTtcbiAgICBwcml2YXRlIG9uVmFsdWVJbnB1dE1vdXNlV2hlZWwoIGV2ZW50OiBhbnkgKTogdm9pZCB7XG4gICAgICAgIGV2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICB2YXIgZGVsdGEgPSBldmVudC53aGVlbERlbHRhIHx8IC1ldmVudC5kZWx0YVkgfHwgLWV2ZW50LmRldGFpbDtcblxuICAgICAgICBpZiAoZGVsdGEgPiAwKXtcbiAgICAgICAgICAgICF0aGlzLnVwQnRuRGlzYWJsZWQgJiYgdGhpcy51cEJ0bkNsaWNrZWQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChkZWx0YSA8IDApe1xuICAgICAgICAgICAgIXRoaXMuZG93bkJ0bkRpc2FibGVkICYmIHRoaXMuZG93bkJ0bkNsaWNrZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ID8gZXZlbnQucHJldmVudERlZmF1bHQoKSA6IChldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJpbmRWYWx1ZUlucHV0TW91c2VXaGVlbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdvbndoZWVsJyBpbiBkb2N1bWVudCA/IFwid2hlZWxcIiA6IFwibW91c2V3aGVlbFwiLFxuICAgICAgICAgICAgdGhpcy5vblZhbHVlSW5wdXRNb3VzZVdoZWVsQmluZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1bmJpbmRWYWx1ZUlucHV0TW91c2VXaGVlbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZUlucHV0Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdvbndoZWVsJyBpbiBkb2N1bWVudCA/IFwid2hlZWxcIiA6IFwibW91c2V3aGVlbFwiLFxuICAgICAgICAgICAgdGhpcy5vblZhbHVlSW5wdXRNb3VzZVdoZWVsQmluZCk7XG4gICAgfVxufVxuIl19