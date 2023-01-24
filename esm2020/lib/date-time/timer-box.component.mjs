import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject, Subscription } from 'rxjs';
import { NumberFixedLenPipe } from './numberedFixLen.pipe';
import * as i0 from "@angular/core";
import * as i1 from "./numberedFixLen.pipe";
import * as i2 from "@angular/common";
export class OwlTimerBoxComponent {
    constructor(numberFixedLen) {
        this.numberFixedLen = numberFixedLen;
        this.showDivider = false;
        this.step = 1;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.inputStream = new Subject();
        this.inputStreamSub = Subscription.EMPTY;
        this.stringValue = '';
        this.editMode = false;
    }
    get displayValue() {
        if (this.editMode)
            return this.stringValue;
        return '' + this.numberFixedLen.transform(this.boxValue || this.value, 2);
    }
    get owlDTTimerBoxClass() {
        return true;
    }
    ngOnInit() {
        this.inputStreamSub = this.inputStream.subscribe((val) => {
            if (val) {
                const inputValue = coerceNumberProperty(val, 0);
                this.updateValueViaInput(inputValue);
            }
        });
    }
    ngOnDestroy() {
        this.inputStreamSub.unsubscribe();
    }
    upBtnClicked() {
        let newValue = this.value + this.step;
        if (newValue > this.max) {
            newValue = this.min;
        }
        this.updateValue(newValue);
    }
    downBtnClicked() {
        let newValue = this.value - this.step;
        if (newValue < this.min) {
            newValue = this.max;
        }
        this.updateValue(newValue);
    }
    handleInputChange(value) {
        this.stringValue = value;
        this.inputStream.next(value);
    }
    focusIn() {
        this.editMode = true;
        this.stringValue = '' + this.numberFixedLen.transform(this.boxValue || this.value, 2);
    }
    focusOut(value) {
        this.editMode = false;
        if (value) {
            const inputValue = coerceNumberProperty(value, 0);
            this.updateValueViaInput(inputValue);
        }
    }
    handleWheelChange(event) {
        const deltaY = event.deltaY;
        if (deltaY > 0 && !this.upBtnDisabled) {
            this.downBtnClicked();
        }
        else if (deltaY < 0 && !this.downBtnDisabled) {
            this.upBtnClicked();
        }
    }
    updateValue(value) {
        this.stringValue = '' + this.numberFixedLen.transform(value, 2);
        this.valueChange.emit(value);
    }
    updateValueViaInput(value) {
        if (value > this.max || value < this.min) {
            return;
        }
        this.inputChange.emit(value);
    }
}
OwlTimerBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlTimerBoxComponent, deps: [{ token: i1.NumberFixedLenPipe }], target: i0.ɵɵFactoryTarget.Component });
OwlTimerBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: OwlTimerBoxComponent, selector: "owl-date-time-timer-box", inputs: { showDivider: "showDivider", upBtnAriaLabel: "upBtnAriaLabel", upBtnDisabled: "upBtnDisabled", downBtnAriaLabel: "downBtnAriaLabel", downBtnDisabled: "downBtnDisabled", boxValue: "boxValue", value: "value", min: "min", max: "max", step: "step", inputLabel: "inputLabel" }, outputs: { valueChange: "valueChange", inputChange: "inputChange" }, host: { properties: { "class.owl-dt-timer-box": "owlDTTimerBoxClass" } }, providers: [NumberFixedLenPipe], exportAs: ["owlDateTimeTimerBox"], ngImport: i0, template: "<div *ngIf=\"showDivider\" class=\"owl-dt-timer-divider\" aria-hidden=\"true\"></div>\n<button\n  class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n  type=\"button\"\n  tabindex=\"-1\"\n  [disabled]=\"upBtnDisabled\"\n  [attr.aria-label]=\"upBtnAriaLabel\"\n  (click)=\"upBtnClicked()\"\n>\n  <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n    <!-- <editor-fold desc=\"SVG Arrow Up\"> -->\n    <svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      version=\"1.1\"\n      x=\"0px\"\n      y=\"0px\"\n      viewBox=\"0 0 451.847 451.846\"\n      style=\"enable-background: new 0 0 451.847 451.846\"\n      xml:space=\"preserve\"\n      width=\"100%\"\n      height=\"100%\"\n    >\n      <path\n        d=\"M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0\n                        L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4\n                        c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z\"\n      />\n    </svg>\n    <!-- </editor-fold> -->\n  </span>\n</button>\n<label class=\"owl-dt-timer-content\">\n  <input\n    class=\"owl-dt-timer-input\"\n    maxlength=\"2\"\n    [value]=\"displayValue\"\n    (wheel)=\"handleWheelChange($event)\"\n    (keydown.arrowUp)=\"!upBtnDisabled && upBtnClicked()\"\n    (keydown.arrowDown)=\"!downBtnDisabled && downBtnClicked()\"\n    (input)=\"handleInputChange(valueInput.value)\"\n    (focusin)=\"focusIn()\"\n    (focusout)=\"focusOut(valueInput.value)\"\n    #valueInput\n  />\n  <span class=\"owl-hidden-accessible\">{{ inputLabel }}</span>\n</label>\n<button\n  class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n  type=\"button\"\n  tabindex=\"-1\"\n  [disabled]=\"downBtnDisabled\"\n  [attr.aria-label]=\"downBtnAriaLabel\"\n  (click)=\"downBtnClicked()\"\n>\n  <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n    <!-- <editor-fold desc=\"SVG Arrow Down\"> -->\n    <svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      version=\"1.1\"\n      x=\"0px\"\n      y=\"0px\"\n      viewBox=\"0 0 451.847 451.846\"\n      style=\"enable-background: new 0 0 451.847 451.846\"\n      xml:space=\"preserve\"\n      width=\"100%\"\n      height=\"100%\"\n    >\n      <path\n        d=\"M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751\n                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0\n                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z\"\n      />\n    </svg>\n    <!-- </editor-fold> -->\n  </span>\n</button>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlTimerBoxComponent, decorators: [{
            type: Component,
            args: [{ exportAs: 'owlDateTimeTimerBox', selector: 'owl-date-time-timer-box', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.owl-dt-timer-box]': 'owlDTTimerBoxClass'
                    }, providers: [NumberFixedLenPipe], template: "<div *ngIf=\"showDivider\" class=\"owl-dt-timer-divider\" aria-hidden=\"true\"></div>\n<button\n  class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n  type=\"button\"\n  tabindex=\"-1\"\n  [disabled]=\"upBtnDisabled\"\n  [attr.aria-label]=\"upBtnAriaLabel\"\n  (click)=\"upBtnClicked()\"\n>\n  <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n    <!-- <editor-fold desc=\"SVG Arrow Up\"> -->\n    <svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      version=\"1.1\"\n      x=\"0px\"\n      y=\"0px\"\n      viewBox=\"0 0 451.847 451.846\"\n      style=\"enable-background: new 0 0 451.847 451.846\"\n      xml:space=\"preserve\"\n      width=\"100%\"\n      height=\"100%\"\n    >\n      <path\n        d=\"M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0\n                        L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4\n                        c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z\"\n      />\n    </svg>\n    <!-- </editor-fold> -->\n  </span>\n</button>\n<label class=\"owl-dt-timer-content\">\n  <input\n    class=\"owl-dt-timer-input\"\n    maxlength=\"2\"\n    [value]=\"displayValue\"\n    (wheel)=\"handleWheelChange($event)\"\n    (keydown.arrowUp)=\"!upBtnDisabled && upBtnClicked()\"\n    (keydown.arrowDown)=\"!downBtnDisabled && downBtnClicked()\"\n    (input)=\"handleInputChange(valueInput.value)\"\n    (focusin)=\"focusIn()\"\n    (focusout)=\"focusOut(valueInput.value)\"\n    #valueInput\n  />\n  <span class=\"owl-hidden-accessible\">{{ inputLabel }}</span>\n</label>\n<button\n  class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n  type=\"button\"\n  tabindex=\"-1\"\n  [disabled]=\"downBtnDisabled\"\n  [attr.aria-label]=\"downBtnAriaLabel\"\n  (click)=\"downBtnClicked()\"\n>\n  <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n    <!-- <editor-fold desc=\"SVG Arrow Down\"> -->\n    <svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      version=\"1.1\"\n      x=\"0px\"\n      y=\"0px\"\n      viewBox=\"0 0 451.847 451.846\"\n      style=\"enable-background: new 0 0 451.847 451.846\"\n      xml:space=\"preserve\"\n      width=\"100%\"\n      height=\"100%\"\n    >\n      <path\n        d=\"M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751\n                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0\n                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z\"\n      />\n    </svg>\n    <!-- </editor-fold> -->\n  </span>\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.NumberFixedLenPipe }]; }, propDecorators: { showDivider: [{
                type: Input
            }], upBtnAriaLabel: [{
                type: Input
            }], upBtnDisabled: [{
                type: Input
            }], downBtnAriaLabel: [{
                type: Input
            }], downBtnDisabled: [{
                type: Input
            }], boxValue: [{
                type: Input
            }], value: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], step: [{
                type: Input
            }], inputLabel: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], inputChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS90aW1lci1ib3guY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL3RpbWVyLWJveC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQWEzRCxNQUFNLE9BQU8sb0JBQW9CO0lBdUMvQixZQUE2QixjQUFrQztRQUFsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUF0Q3RELGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBc0JwQixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBSVIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXpDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUUzQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFFcEMsbUJBQWMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRXBDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRWpCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFFeUMsQ0FBQztJQUVuRSxJQUFJLFlBQVk7UUFDZCxJQUFJLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzNDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUMvRCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sWUFBWTtRQUNqQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN2QixRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLGNBQWM7UUFDbkIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdkIsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxLQUFhO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBYTtRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0lBRU0saUJBQWlCLENBQUMsS0FBaUI7UUFDeEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2QjthQUFNLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVPLFdBQVcsQ0FBQyxLQUFhO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU8sbUJBQW1CLENBQUMsS0FBYTtRQUN2QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3hDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7O2lIQXBIVSxvQkFBb0I7cUdBQXBCLG9CQUFvQiwyZEFGcEIsQ0FBQyxrQkFBa0IsQ0FBQyw2REN0QmpDLHkxRkE4RUE7MkZEdERhLG9CQUFvQjtrQkFYaEMsU0FBUzsrQkFDRSxxQkFBcUIsWUFDckIseUJBQXlCLG1CQUVsQix1QkFBdUIsQ0FBQyxNQUFNLFFBRXpDO3dCQUNKLDBCQUEwQixFQUFFLG9CQUFvQjtxQkFDakQsYUFDVSxDQUFDLGtCQUFrQixDQUFDO3lHQUd0QixXQUFXO3NCQUFuQixLQUFLO2dCQUVHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBRUcsYUFBYTtzQkFBckIsS0FBSztnQkFFRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBRUcsZUFBZTtzQkFBdkIsS0FBSztnQkFNRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxHQUFHO3NCQUFYLEtBQUs7Z0JBRUcsR0FBRztzQkFBWCxLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVJLFdBQVc7c0JBQXBCLE1BQU07Z0JBRUcsV0FBVztzQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE51bWJlckZpeGVkTGVuUGlwZSB9IGZyb20gJy4vbnVtYmVyZWRGaXhMZW4ucGlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBleHBvcnRBczogJ293bERhdGVUaW1lVGltZXJCb3gnLFxuICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUtdGltZXItYm94JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWVyLWJveC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mub3dsLWR0LXRpbWVyLWJveF0nOiAnb3dsRFRUaW1lckJveENsYXNzJ1xuICB9LFxuICBwcm92aWRlcnM6IFtOdW1iZXJGaXhlZExlblBpcGVdXG59KVxuZXhwb3J0IGNsYXNzIE93bFRpbWVyQm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBzaG93RGl2aWRlciA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHVwQnRuQXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgdXBCdG5EaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBkb3duQnRuQXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZG93bkJ0bkRpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBWYWx1ZSB3b3VsZCBiZSBkaXNwbGF5ZWQgaW4gdGhlIGJveFxuICAgKiBJZiBpdCBpcyBudWxsLCB0aGUgYm94IHdvdWxkIGRpc3BsYXkgW3ZhbHVlXVxuICAgKi9cbiAgQElucHV0KCkgYm94VmFsdWU6IG51bWJlcjtcblxuICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHN0ZXAgPSAxO1xuXG4gIEBJbnB1dCgpIGlucHV0TGFiZWw6IHN0cmluZztcblxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBwcml2YXRlIGlucHV0U3RyZWFtID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIHByaXZhdGUgaW5wdXRTdHJlYW1TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBzdHJpbmdWYWx1ZSA9ICcnO1xuXG4gIHByaXZhdGUgZWRpdE1vZGUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG51bWJlckZpeGVkTGVuOiBOdW1iZXJGaXhlZExlblBpcGUpIHt9XG5cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmVkaXRNb2RlKSByZXR1cm4gdGhpcy5zdHJpbmdWYWx1ZTtcbiAgICByZXR1cm4gJycgKyB0aGlzLm51bWJlckZpeGVkTGVuLnRyYW5zZm9ybSh0aGlzLmJveFZhbHVlIHx8IHRoaXMudmFsdWUsIDIpO1xuICB9XG5cbiAgZ2V0IG93bERUVGltZXJCb3hDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlucHV0U3RyZWFtU3ViID0gdGhpcy5pbnB1dFN0cmVhbS5zdWJzY3JpYmUoKHZhbDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwsIDApO1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlVmlhSW5wdXQoaW5wdXRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dFN0cmVhbVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIHVwQnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICBsZXQgbmV3VmFsdWUgPSB0aGlzLnZhbHVlICsgdGhpcy5zdGVwO1xuICAgIGlmIChuZXdWYWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMubWluO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVZhbHVlKG5ld1ZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBkb3duQnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICBsZXQgbmV3VmFsdWUgPSB0aGlzLnZhbHVlIC0gdGhpcy5zdGVwO1xuICAgIGlmIChuZXdWYWx1ZSA8IHRoaXMubWluKSB7XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMubWF4O1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVZhbHVlKG5ld1ZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVJbnB1dENoYW5nZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdHJpbmdWYWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuaW5wdXRTdHJlYW0ubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZm9jdXNJbigpIHtcbiAgICB0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcbiAgICB0aGlzLnN0cmluZ1ZhbHVlID0gJycgKyB0aGlzLm51bWJlckZpeGVkTGVuLnRyYW5zZm9ybSh0aGlzLmJveFZhbHVlIHx8IHRoaXMudmFsdWUsIDIpO1xuICB9XG5cbiAgcHVibGljIGZvY3VzT3V0KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBpbnB1dFZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUsIDApO1xuICAgICAgdGhpcy51cGRhdGVWYWx1ZVZpYUlucHV0KGlucHV0VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVXaGVlbENoYW5nZShldmVudDogV2hlZWxFdmVudCkge1xuICAgIGNvbnN0IGRlbHRhWSA9IGV2ZW50LmRlbHRhWTtcbiAgICBpZiAoZGVsdGFZID4gMCAmJiAhdGhpcy51cEJ0bkRpc2FibGVkKSB7XG4gICAgICB0aGlzLmRvd25CdG5DbGlja2VkKCk7XG4gICAgfSBlbHNlIGlmIChkZWx0YVkgPCAwICYmICF0aGlzLmRvd25CdG5EaXNhYmxlZCkge1xuICAgICAgdGhpcy51cEJ0bkNsaWNrZWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnN0cmluZ1ZhbHVlID0gJycgKyB0aGlzLm51bWJlckZpeGVkTGVuLnRyYW5zZm9ybSh2YWx1ZSwgMik7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVmFsdWVWaWFJbnB1dCh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlID4gdGhpcy5tYXggfHwgdmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwic2hvd0RpdmlkZXJcIiBjbGFzcz1cIm93bC1kdC10aW1lci1kaXZpZGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9kaXY+XG48YnV0dG9uXG4gIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wtYnV0dG9uIG93bC1kdC1jb250cm9sLWFycm93LWJ1dHRvblwiXG4gIHR5cGU9XCJidXR0b25cIlxuICB0YWJpbmRleD1cIi0xXCJcbiAgW2Rpc2FibGVkXT1cInVwQnRuRGlzYWJsZWRcIlxuICBbYXR0ci5hcmlhLWxhYmVsXT1cInVwQnRuQXJpYUxhYmVsXCJcbiAgKGNsaWNrKT1cInVwQnRuQ2xpY2tlZCgpXCJcbj5cbiAgPHNwYW4gY2xhc3M9XCJvd2wtZHQtY29udHJvbC1idXR0b24tY29udGVudFwiIHRhYmluZGV4PVwiLTFcIj5cbiAgICA8IS0tIDxlZGl0b3ItZm9sZCBkZXNjPVwiU1ZHIEFycm93IFVwXCI+IC0tPlxuICAgIDxzdmdcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcbiAgICAgIHZlcnNpb249XCIxLjFcIlxuICAgICAgeD1cIjBweFwiXG4gICAgICB5PVwiMHB4XCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgNDUxLjg0NyA0NTEuODQ2XCJcbiAgICAgIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6IG5ldyAwIDAgNDUxLjg0NyA0NTEuODQ2XCJcbiAgICAgIHhtbDpzcGFjZT1cInByZXNlcnZlXCJcbiAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICA+XG4gICAgICA8cGF0aFxuICAgICAgICBkPVwiTTI0OC4yOTIsMTA2LjQwNmwxOTQuMjgxLDE5NC4yOWMxMi4zNjUsMTIuMzU5LDEyLjM2NSwzMi4zOTEsMCw0NC43NDRjLTEyLjM1NCwxMi4zNTQtMzIuMzkxLDEyLjM1NC00NC43NDQsMFxuICAgICAgICAgICAgICAgICAgICAgICAgTDIyNS45MjMsMTczLjUyOUw1NC4wMTgsMzQ1LjQ0Yy0xMi4zNiwxMi4zNTQtMzIuMzk1LDEyLjM1NC00NC43NDgsMGMtMTIuMzU5LTEyLjM1NC0xMi4zNTktMzIuMzkxLDAtNDQuNzVMMjAzLjU1NCwxMDYuNFxuICAgICAgICAgICAgICAgICAgICAgICAgYzYuMTgtNi4xNzQsMTQuMjcxLTkuMjU5LDIyLjM2OS05LjI1OUMyMzQuMDE4LDk3LjE0MSwyNDIuMTE1LDEwMC4yMzIsMjQ4LjI5MiwxMDYuNDA2elwiXG4gICAgICAvPlxuICAgIDwvc3ZnPlxuICAgIDwhLS0gPC9lZGl0b3ItZm9sZD4gLS0+XG4gIDwvc3Bhbj5cbjwvYnV0dG9uPlxuPGxhYmVsIGNsYXNzPVwib3dsLWR0LXRpbWVyLWNvbnRlbnRcIj5cbiAgPGlucHV0XG4gICAgY2xhc3M9XCJvd2wtZHQtdGltZXItaW5wdXRcIlxuICAgIG1heGxlbmd0aD1cIjJcIlxuICAgIFt2YWx1ZV09XCJkaXNwbGF5VmFsdWVcIlxuICAgICh3aGVlbCk9XCJoYW5kbGVXaGVlbENoYW5nZSgkZXZlbnQpXCJcbiAgICAoa2V5ZG93bi5hcnJvd1VwKT1cIiF1cEJ0bkRpc2FibGVkICYmIHVwQnRuQ2xpY2tlZCgpXCJcbiAgICAoa2V5ZG93bi5hcnJvd0Rvd24pPVwiIWRvd25CdG5EaXNhYmxlZCAmJiBkb3duQnRuQ2xpY2tlZCgpXCJcbiAgICAoaW5wdXQpPVwiaGFuZGxlSW5wdXRDaGFuZ2UodmFsdWVJbnB1dC52YWx1ZSlcIlxuICAgIChmb2N1c2luKT1cImZvY3VzSW4oKVwiXG4gICAgKGZvY3Vzb3V0KT1cImZvY3VzT3V0KHZhbHVlSW5wdXQudmFsdWUpXCJcbiAgICAjdmFsdWVJbnB1dFxuICAvPlxuICA8c3BhbiBjbGFzcz1cIm93bC1oaWRkZW4tYWNjZXNzaWJsZVwiPnt7IGlucHV0TGFiZWwgfX08L3NwYW4+XG48L2xhYmVsPlxuPGJ1dHRvblxuICBjbGFzcz1cIm93bC1kdC1jb250cm9sLWJ1dHRvbiBvd2wtZHQtY29udHJvbC1hcnJvdy1idXR0b25cIlxuICB0eXBlPVwiYnV0dG9uXCJcbiAgdGFiaW5kZXg9XCItMVwiXG4gIFtkaXNhYmxlZF09XCJkb3duQnRuRGlzYWJsZWRcIlxuICBbYXR0ci5hcmlhLWxhYmVsXT1cImRvd25CdG5BcmlhTGFiZWxcIlxuICAoY2xpY2spPVwiZG93bkJ0bkNsaWNrZWQoKVwiXG4+XG4gIDxzcGFuIGNsYXNzPVwib3dsLWR0LWNvbnRyb2wtYnV0dG9uLWNvbnRlbnRcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgPCEtLSA8ZWRpdG9yLWZvbGQgZGVzYz1cIlNWRyBBcnJvdyBEb3duXCI+IC0tPlxuICAgIDxzdmdcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcbiAgICAgIHZlcnNpb249XCIxLjFcIlxuICAgICAgeD1cIjBweFwiXG4gICAgICB5PVwiMHB4XCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgNDUxLjg0NyA0NTEuODQ2XCJcbiAgICAgIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6IG5ldyAwIDAgNDUxLjg0NyA0NTEuODQ2XCJcbiAgICAgIHhtbDpzcGFjZT1cInByZXNlcnZlXCJcbiAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICA+XG4gICAgICA8cGF0aFxuICAgICAgICBkPVwiTTIyNS45MjMsMzU0LjcwNmMtOC4wOTgsMC0xNi4xOTUtMy4wOTItMjIuMzY5LTkuMjYzTDkuMjcsMTUxLjE1N2MtMTIuMzU5LTEyLjM1OS0xMi4zNTktMzIuMzk3LDAtNDQuNzUxXG4gICAgICAgICAgICAgICAgICAgICAgICBjMTIuMzU0LTEyLjM1NCwzMi4zODgtMTIuMzU0LDQ0Ljc0OCwwbDE3MS45MDUsMTcxLjkxNWwxNzEuOTA2LTE3MS45MDljMTIuMzU5LTEyLjM1NCwzMi4zOTEtMTIuMzU0LDQ0Ljc0NCwwXG4gICAgICAgICAgICAgICAgICAgICAgICBjMTIuMzY1LDEyLjM1NCwxMi4zNjUsMzIuMzkyLDAsNDQuNzUxTDI0OC4yOTIsMzQ1LjQ0OUMyNDIuMTE1LDM1MS42MjEsMjM0LjAxOCwzNTQuNzA2LDIyNS45MjMsMzU0LjcwNnpcIlxuICAgICAgLz5cbiAgICA8L3N2Zz5cbiAgICA8IS0tIDwvZWRpdG9yLWZvbGQ+IC0tPlxuICA8L3NwYW4+XG48L2J1dHRvbj5cbiJdfQ==