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
var OwlTimerBoxComponent = /** @class */ (function () {
    function OwlTimerBoxComponent() {
        this.showDivider = false;
        this.step = 1;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.inputStream = new Subject();
        this.inputStreamSub = Subscription.EMPTY;
        this.onValueInputMouseWheelBind = this.onValueInputMouseWheel.bind(this);
    }
    Object.defineProperty(OwlTimerBoxComponent.prototype, "displayValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.boxValue || this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerBoxComponent.prototype, "owlDTTimerBoxClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.inputStreamSub = this.inputStream.pipe(debounceTime(500), distinctUntilChanged()).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val) {
                /** @type {?} */
                var inputValue = coerceNumberProperty(val, 0);
                _this.updateValueViaInput(inputValue);
            }
        }));
        this.bindValueInputMouseWheel();
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unbindValueInputMouseWheel();
        this.inputStreamSub.unsubscribe();
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.upBtnClicked = /**
     * @return {?}
     */
    function () {
        this.updateValue(this.value + this.step);
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.downBtnClicked = /**
     * @return {?}
     */
    function () {
        this.updateValue(this.value - this.step);
    };
    /**
     * @param {?} val
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.handleInputChange = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.inputStream.next(val);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.updateValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.valueChange.emit(value);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.updateValueViaInput = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value > this.max || value < this.min) {
            return;
        }
        this.inputChange.emit(value);
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.onValueInputMouseWheel = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @private
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.bindValueInputMouseWheel = /**
     * @private
     * @return {?}
     */
    function () {
        this.valueInput.nativeElement.addEventListener('onwheel' in document ? "wheel" : "mousewheel", this.onValueInputMouseWheelBind);
    };
    /**
     * @private
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.unbindValueInputMouseWheel = /**
     * @private
     * @return {?}
     */
    function () {
        this.valueInput.nativeElement.removeEventListener('onwheel' in document ? "wheel" : "mousewheel", this.onValueInputMouseWheelBind);
    };
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
    OwlTimerBoxComponent.ctorParameters = function () { return []; };
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
    return OwlTimerBoxComponent;
}());
export { OwlTimerBoxComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL3RpbWVyLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFHTCxNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXBFO0lBMERJO1FBNUNTLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBc0JwQixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBSVIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXpDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUUzQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFFcEMsbUJBQWMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBd0RwQywrQkFBMEIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBM0M1RSxDQUFDO0lBWEQsc0JBQUksOENBQVk7Ozs7UUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9EQUFrQjs7OztRQUF0QjtZQUNJLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBOzs7O0lBT00sdUNBQVE7OztJQUFmO1FBQUEsaUJBV0M7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Q0FBQyxDQUFDO0lBQ3pDLENBQUM7O2dCQTlISixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMseXlGQUF5QztvQkFFekMsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLElBQUksRUFBRTt3QkFDRiwwQkFBMEIsRUFBRSxvQkFBb0I7cUJBQ25EOztpQkFDSjs7Ozs7OEJBSUksS0FBSztpQ0FFTCxLQUFLO2dDQUVMLEtBQUs7bUNBRUwsS0FBSztrQ0FFTCxLQUFLOzJCQU1MLEtBQUs7d0JBRUwsS0FBSztzQkFFTCxLQUFLO3NCQUVMLEtBQUs7dUJBRUwsS0FBSzs2QkFFTCxLQUFLOzhCQUVMLE1BQU07OEJBRU4sTUFBTTs2QkFjTixTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUF1RTdDLDJCQUFDO0NBQUEsQUEvSEQsSUErSEM7U0FuSFksb0JBQW9COzs7SUFFN0IsMkNBQTZCOztJQUU3Qiw4Q0FBZ0M7O0lBRWhDLDZDQUFnQzs7SUFFaEMsZ0RBQWtDOztJQUVsQywrQ0FBa0M7Ozs7Ozs7SUFNbEMsd0NBQTBCOztJQUUxQixxQ0FBdUI7O0lBRXZCLG1DQUFxQjs7SUFFckIsbUNBQXFCOztJQUVyQixvQ0FBa0I7O0lBRWxCLDBDQUE0Qjs7SUFFNUIsMkNBQW1EOztJQUVuRCwyQ0FBbUQ7Ozs7O0lBRW5ELDJDQUE0Qzs7Ozs7SUFFNUMsOENBQTRDOzs7OztJQVU1QywwQ0FBMEU7Ozs7O0lBOEMxRSwwREFBNEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHRpbWVyLWJveC5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgRWxlbWVudFJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVUaW1lckJveCcsXG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLXRpbWVyLWJveCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWVyLWJveC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGltZXItYm94LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm93bC1kdC10aW1lci1ib3hdJzogJ293bERUVGltZXJCb3hDbGFzcydcbiAgICB9XG59KVxuXG5leHBvcnQgY2xhc3MgT3dsVGltZXJCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzaG93RGl2aWRlciA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgdXBCdG5BcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHVwQnRuRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBkb3duQnRuQXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkb3duQnRuRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSB3b3VsZCBiZSBkaXNwbGF5ZWQgaW4gdGhlIGJveFxuICAgICAqIElmIGl0IGlzIG51bGwsIHRoZSBib3ggd291bGQgZGlzcGxheSBbdmFsdWVdXG4gICAgICogKi9cbiAgICBASW5wdXQoKSBib3hWYWx1ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgdmFsdWU6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBzdGVwID0gMTtcblxuICAgIEBJbnB1dCgpIGlucHV0TGFiZWw6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgQE91dHB1dCgpIGlucHV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICBwcml2YXRlIGlucHV0U3RyZWFtID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gICAgcHJpdmF0ZSBpbnB1dFN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGdldCBkaXNwbGF5VmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm94VmFsdWUgfHwgdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgb3dsRFRUaW1lckJveENsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKCd2YWx1ZUlucHV0JywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSB2YWx1ZUlucHV0OiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlucHV0U3RyZWFtU3ViID0gdGhpcy5pbnB1dFN0cmVhbS5waXBlKFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDUwMCksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICAgICkuc3Vic2NyaWJlKCggdmFsOiBzdHJpbmcgKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZVZpYUlucHV0KGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5iaW5kVmFsdWVJbnB1dE1vdXNlV2hlZWwoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudW5iaW5kVmFsdWVJbnB1dE1vdXNlV2hlZWwoKTtcbiAgICAgICAgdGhpcy5pbnB1dFN0cmVhbVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cEJ0bkNsaWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy52YWx1ZSArIHRoaXMuc3RlcCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRvd25CdG5DbGlja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMudmFsdWUgLSB0aGlzLnN0ZXApO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVJbnB1dENoYW5nZSggdmFsOiBzdHJpbmcgKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW0ubmV4dCh2YWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWUoIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZVZpYUlucHV0KCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUgPiB0aGlzLm1heCB8fCB2YWx1ZSA8IHRoaXMubWluKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnB1dENoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVmFsdWVJbnB1dE1vdXNlV2hlZWxCaW5kID0gdGhpcy5vblZhbHVlSW5wdXRNb3VzZVdoZWVsLmJpbmQodGhpcyk7XG4gICAgcHJpdmF0ZSBvblZhbHVlSW5wdXRNb3VzZVdoZWVsKCBldmVudDogYW55ICk6IHZvaWQge1xuICAgICAgICBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgdmFyIGRlbHRhID0gZXZlbnQud2hlZWxEZWx0YSB8fCAtZXZlbnQuZGVsdGFZIHx8IC1ldmVudC5kZXRhaWw7XG5cbiAgICAgICAgaWYgKGRlbHRhID4gMCl7XG4gICAgICAgICAgICAhdGhpcy51cEJ0bkRpc2FibGVkICYmIHRoaXMudXBCdG5DbGlja2VkKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGVsdGEgPCAwKXtcbiAgICAgICAgICAgICF0aGlzLmRvd25CdG5EaXNhYmxlZCAmJiB0aGlzLmRvd25CdG5DbGlja2VkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCA/IGV2ZW50LnByZXZlbnREZWZhdWx0KCkgOiAoZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBiaW5kVmFsdWVJbnB1dE1vdXNlV2hlZWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVJbnB1dC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnb253aGVlbCcgaW4gZG9jdW1lbnQgPyBcIndoZWVsXCIgOiBcIm1vdXNld2hlZWxcIixcbiAgICAgICAgICAgIHRoaXMub25WYWx1ZUlucHV0TW91c2VXaGVlbEJpbmQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdW5iaW5kVmFsdWVJbnB1dE1vdXNlV2hlZWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVJbnB1dC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnb253aGVlbCcgaW4gZG9jdW1lbnQgPyBcIndoZWVsXCIgOiBcIm1vdXNld2hlZWxcIixcbiAgICAgICAgICAgIHRoaXMub25WYWx1ZUlucHV0TW91c2VXaGVlbEJpbmQpO1xuICAgIH1cbn1cbiJdfQ==