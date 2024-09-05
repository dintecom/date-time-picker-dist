import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OWL_DATE_TIME_FORMATS } from '../adapter/date-time-format.class';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { OwlDateTime } from './date-time.class';
import * as i0 from "@angular/core";
import * as i1 from "../adapter/date-time-adapter.class";
import * as i2 from "./date-time-picker-container.component";
export const OWL_DATETIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OwlDateTimeInlineComponent),
    multi: true,
};
export class OwlDateTimeInlineComponent extends OwlDateTime {
    constructor(changeDetector, dateTimeAdapter, dateTimeFormats) {
        super(dateTimeAdapter, dateTimeFormats);
        this.changeDetector = changeDetector;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Set the type of the dateTime picker
         *      'both' -- show both calendar and timer
         *      'calendar' -- show only calendar
         *      'timer' -- show only timer
         */
        this._pickerType = 'both';
        this._disabled = false;
        this._selectMode = 'single';
        this._values = [];
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
        this._selecteds = [];
        this.onModelChange = (date) => { };
        this.onModelTouched = () => { };
    }
    get pickerType() {
        return this._pickerType;
    }
    set pickerType(val) {
        if (val !== this._pickerType) {
            this._pickerType = val;
        }
    }
    get disabled() {
        return !!this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get selectMode() {
        return this._selectMode;
    }
    set selectMode(mode) {
        if (mode !== 'single' && mode !== 'range' && mode !== 'rangeFrom' && mode !== 'rangeTo') {
            throw Error('OwlDateTime Error: invalid selectMode value!');
        }
        this._selectMode = mode;
    }
    get startAt() {
        if (this._startAt) {
            return this._startAt;
        }
        if (this.selectMode === 'single') {
            return this.value || null;
        }
        else if (this.selectMode === 'range' || this.selectMode === 'rangeFrom') {
            return this.values[0] || null;
        }
        else if (this.selectMode === 'rangeTo') {
            return this.values[1] || null;
        }
        else {
            return null;
        }
    }
    set startAt(date) {
        this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(date));
    }
    get dateTimeFilter() {
        return this._dateTimeFilter;
    }
    set dateTimeFilter(filter) {
        this._dateTimeFilter = filter;
    }
    get minDateTime() {
        return this._min || null;
    }
    set minDateTime(value) {
        this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.changeDetector.markForCheck();
    }
    get maxDateTime() {
        return this._max || null;
    }
    set maxDateTime(value) {
        this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.changeDetector.markForCheck();
    }
    get value() {
        return this._value;
    }
    set value(value) {
        value = this.dateTimeAdapter.deserialize(value);
        value = this.getValidDate(value);
        this._value = value;
        this.selected = value;
    }
    get values() {
        return this._values;
    }
    set values(values) {
        if (values && values.length > 0) {
            values = values.map(v => {
                v = this.dateTimeAdapter.deserialize(v);
                v = this.getValidDate(v);
                return v ? this.dateTimeAdapter.clone(v) : null;
            });
            this._values = [...values];
            this.selecteds = [...values];
        }
        else {
            this._values = [];
            this.selecteds = [];
        }
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
    get opened() {
        return true;
    }
    get pickerMode() {
        return 'inline';
    }
    get isInSingleMode() {
        return this._selectMode === 'single';
    }
    get isInRangeMode() {
        return (this._selectMode === 'range' ||
            this._selectMode === 'rangeFrom' ||
            this._selectMode === 'rangeTo');
    }
    get owlDTInlineClass() {
        return true;
    }
    ngOnInit() {
        this.container.picker = this;
    }
    writeValue(value) {
        if (this.isInSingleMode) {
            this.value = value;
            this.container.pickerMoment = value;
        }
        else {
            this.values = value;
            this.container.pickerMoment = this._values[this.container.activeSelectedIndex];
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    select(date) {
        if (this.disabled) {
            return;
        }
        if (Array.isArray(date)) {
            this.values = [...date];
        }
        else {
            this.value = date;
        }
        this.onModelChange(date);
        this.onModelTouched();
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
}
OwlDateTimeInlineComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeInlineComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OwlDateTimeInlineComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: OwlDateTimeInlineComponent, selector: "owl-date-time-inline", inputs: { pickerType: "pickerType", disabled: "disabled", selectMode: "selectMode", startAt: "startAt", dateTimeFilter: ["owlDateTimeFilter", "dateTimeFilter"], minDateTime: ["min", "minDateTime"], maxDateTime: ["max", "maxDateTime"], value: "value", values: "values" }, outputs: { yearSelected: "yearSelected", monthSelected: "monthSelected" }, host: { properties: { "class.owl-dt-inline": "owlDTInlineClass" } }, providers: [OWL_DATETIME_VALUE_ACCESSOR], viewQueries: [{ propertyName: "container", first: true, predicate: OwlDateTimeContainerComponent, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<owl-date-time-container></owl-date-time-container>\n", dependencies: [{ kind: "component", type: i2.OwlDateTimeContainerComponent, selector: "owl-date-time-container", exportAs: ["owlDateTimeContainer"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeInlineComponent, decorators: [{
            type: Component,
            args: [{ selector: 'owl-date-time-inline', host: {
                        '[class.owl-dt-inline]': 'owlDTInlineClass',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, providers: [OWL_DATETIME_VALUE_ACCESSOR], template: "<owl-date-time-container></owl-date-time-container>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DateTimeAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [OWL_DATE_TIME_FORMATS]
                }] }]; }, propDecorators: { container: [{
                type: ViewChild,
                args: [OwlDateTimeContainerComponent, { static: true }]
            }], pickerType: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selectMode: [{
                type: Input
            }], startAt: [{
                type: Input
            }], dateTimeFilter: [{
                type: Input,
                args: ['owlDateTimeFilter']
            }], minDateTime: [{
                type: Input,
                args: ['min']
            }], maxDateTime: [{
                type: Input,
                args: ['max']
            }], value: [{
                type: Input
            }], values: [{
                type: Input
            }], yearSelected: [{
                type: Output
            }], monthSelected: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWlubGluZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLWlubGluZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLWlubGluZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBc0IscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN2RixPQUFPLEVBQUUsV0FBVyxFQUFzQyxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRXBGLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFRO0lBQzlDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztJQUN6RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFZRixNQUFNLE9BQU8sMEJBQ1gsU0FBUSxXQUFjO0lBME10QixZQUNZLGNBQWlDLEVBQ1osZUFBbUMsRUFHL0MsZUFBbUM7UUFFdEQsS0FBSyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQU45QixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7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WCxNQUFNO2dCQVFQLGFBQWE7c0JBRFosTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IE93bERhdGVUaW1lRm9ybWF0cywgT1dMX0RBVEVfVElNRV9GT1JNQVRTIH0gZnJvbSAnLi4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcbmltcG9ydCB7IE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWUsIFBpY2tlck1vZGUsIFBpY2tlclR5cGUsIFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XG5cbmV4cG9ydCBjb25zdCBPV0xfREFURVRJTUVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE93bERhdGVUaW1lSW5saW5lQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLWlubGluZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtaW5saW5lLmNvbXBvbmVudC5odG1sJyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm93bC1kdC1pbmxpbmVdJzogJ293bERUSW5saW5lQ2xhc3MnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbT1dMX0RBVEVUSU1FX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnQ8VD5cbiAgZXh0ZW5kcyBPd2xEYXRlVGltZTxUPlxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3JcbntcbiAgQFZpZXdDaGlsZChPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgY29udGFpbmVyOiBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPjtcblxuICAvKipcbiAgICogU2V0IHRoZSB0eXBlIG9mIHRoZSBkYXRlVGltZSBwaWNrZXJcbiAgICogICAgICAnYm90aCcgLS0gc2hvdyBib3RoIGNhbGVuZGFyIGFuZCB0aW1lclxuICAgKiAgICAgICdjYWxlbmRhcicgLS0gc2hvdyBvbmx5IGNhbGVuZGFyXG4gICAqICAgICAgJ3RpbWVyJyAtLSBzaG93IG9ubHkgdGltZXJcbiAgICovXG4gIHByaXZhdGUgX3BpY2tlclR5cGU6IFBpY2tlclR5cGUgPSAnYm90aCc7XG4gIEBJbnB1dCgpXG4gIGdldCBwaWNrZXJUeXBlKCk6IFBpY2tlclR5cGUge1xuICAgIHJldHVybiB0aGlzLl9waWNrZXJUeXBlO1xuICB9XG5cbiAgc2V0IHBpY2tlclR5cGUodmFsOiBQaWNrZXJUeXBlKSB7XG4gICAgaWYgKHZhbCAhPT0gdGhpcy5fcGlja2VyVHlwZSkge1xuICAgICAgdGhpcy5fcGlja2VyVHlwZSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBvdmVycmlkZSBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBvdmVycmlkZSBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RNb2RlOiBTZWxlY3RNb2RlID0gJ3NpbmdsZSc7XG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RNb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlO1xuICB9XG5cbiAgc2V0IHNlbGVjdE1vZGUobW9kZTogU2VsZWN0TW9kZSkge1xuICAgIGlmIChtb2RlICE9PSAnc2luZ2xlJyAmJiBtb2RlICE9PSAncmFuZ2UnICYmIG1vZGUgIT09ICdyYW5nZUZyb20nICYmIG1vZGUgIT09ICdyYW5nZVRvJykge1xuICAgICAgdGhyb3cgRXJyb3IoJ093bERhdGVUaW1lIEVycm9yOiBpbnZhbGlkIHNlbGVjdE1vZGUgdmFsdWUhJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2VsZWN0TW9kZSA9IG1vZGU7XG4gIH1cblxuICAvKiogVGhlIGRhdGUgdG8gb3BlbiB0aGUgY2FsZW5kYXIgdG8gaW5pdGlhbGx5LiAqL1xuICBwcml2YXRlIF9zdGFydEF0OiBUIHwgbnVsbDtcbiAgQElucHV0KClcbiAgZ2V0IHN0YXJ0QXQoKTogVCB8IG51bGwge1xuICAgIGlmICh0aGlzLl9zdGFydEF0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fc3RhcnRBdDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWUgfHwgbnVsbDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fCB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZXNbMF0gfHwgbnVsbDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZXNbMV0gfHwgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2V0IHN0YXJ0QXQoZGF0ZTogVCB8IG51bGwpIHtcbiAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5nZXRWYWxpZERhdGUodGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoZGF0ZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGF0ZVRpbWVGaWx0ZXI6IChkYXRlOiBUIHwgbnVsbCkgPT4gYm9vbGVhbjtcbiAgQElucHV0KCdvd2xEYXRlVGltZUZpbHRlcicpXG4gIGdldCBkYXRlVGltZUZpbHRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZVRpbWVGaWx0ZXI7XG4gIH1cblxuICBzZXQgZGF0ZVRpbWVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogVCB8IG51bGwpID0+IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kYXRlVGltZUZpbHRlciA9IGZpbHRlcjtcbiAgfVxuXG4gIC8qKiBUaGUgbWluaW11bSB2YWxpZCBkYXRlLiAqL1xuICBwcml2YXRlIF9taW46IFQgfCBudWxsO1xuXG4gIGdldCBtaW5EYXRlVGltZSgpOiBUIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21pbiB8fCBudWxsO1xuICB9XG5cbiAgQElucHV0KCdtaW4nKVxuICBzZXQgbWluRGF0ZVRpbWUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgdGhpcy5fbWluID0gdGhpcy5nZXRWYWxpZERhdGUodGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHZhbGlkIGRhdGUuICovXG4gIHByaXZhdGUgX21heDogVCB8IG51bGw7XG5cbiAgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4IHx8IG51bGw7XG4gIH1cblxuICBASW5wdXQoJ21heCcpXG4gIHNldCBtYXhEYXRlVGltZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICB0aGlzLl9tYXggPSB0aGlzLmdldFZhbGlkRGF0ZSh0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZTogVCB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZXM6IFRbXSA9IFtdO1xuICBASW5wdXQoKVxuICBnZXQgdmFsdWVzKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZXM7XG4gIH1cblxuICBzZXQgdmFsdWVzKHZhbHVlczogVFtdKSB7XG4gICAgaWYgKHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgdmFsdWVzID0gdmFsdWVzLm1hcCh2ID0+IHtcbiAgICAgICAgdiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHYpO1xuICAgICAgICB2ID0gdGhpcy5nZXRWYWxpZERhdGUodik7XG4gICAgICAgIHJldHVybiB2ID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUodikgOiBudWxsO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl92YWx1ZXMgPSBbLi4udmFsdWVzXTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRzID0gWy4uLnZhbHVlc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3ZhbHVlcyA9IFtdO1xuICAgICAgdGhpcy5zZWxlY3RlZHMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aS15ZWFyIHZpZXdcbiAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHllYXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAvKipcbiAgICogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3XG4gICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBtb250aFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBUIHwgbnVsbDtcbiAgZ2V0IHNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xuICBnZXQgc2VsZWN0ZWRzKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XG4gIH1cblxuICBzZXQgc2VsZWN0ZWRzKHZhbHVlczogVFtdKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWRzID0gdmFsdWVzO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgb3BlbmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0IHBpY2tlck1vZGUoKTogUGlja2VyTW9kZSB7XG4gICAgcmV0dXJuICdpbmxpbmUnO1xuICB9XG5cbiAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcbiAgfVxuXG4gIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxuICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgKTtcbiAgfVxuXG4gIGdldCBvd2xEVElubGluZUNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk1vZGVsQ2hhbmdlID0gKGRhdGU6IFRbXSB8IFQpID0+IHt9O1xuICBwcml2YXRlIG9uTW9kZWxUb3VjaGVkID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgb3ZlcnJpZGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcbiAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHMsXG4gICkge1xuICAgIHN1cGVyKGRhdGVUaW1lQWRhcHRlciwgZGF0ZVRpbWVGb3JtYXRzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5waWNrZXIgPSB0aGlzO1xuICB9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLmNvbnRhaW5lci5waWNrZXJNb21lbnQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnBpY2tlck1vbWVudCA9IHRoaXMuX3ZhbHVlc1t0aGlzLmNvbnRhaW5lci5hY3RpdmVTZWxlY3RlZEluZGV4XTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3QoZGF0ZTogVFtdIHwgVCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZSkpIHtcbiAgICAgIHRoaXMudmFsdWVzID0gWy4uLmRhdGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICB9XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlKGRhdGUpO1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aS15ZWFyIHZpZXdcbiAgICovXG4gIHB1YmxpYyBzZWxlY3RZZWFyKG5vcm1hbGl6ZWRZZWFyOiBUKTogdm9pZCB7XG4gICAgdGhpcy55ZWFyU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkWWVhcik7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3XG4gICAqL1xuICBwdWJsaWMgc2VsZWN0TW9udGgobm9ybWFsaXplZE1vbnRoOiBUKTogdm9pZCB7XG4gICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQobm9ybWFsaXplZE1vbnRoKTtcbiAgfVxufVxuIiwiPG93bC1kYXRlLXRpbWUtY29udGFpbmVyPjwvb3dsLWRhdGUtdGltZS1jb250YWluZXI+XG4iXX0=