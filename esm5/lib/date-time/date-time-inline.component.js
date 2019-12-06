/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * date-time-inline.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { OwlDateTime } from './date-time.class';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
/** @type {?} */
export var OWL_DATETIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return OwlDateTimeInlineComponent; })),
    multi: true
};
/**
 * @template T
 */
var OwlDateTimeInlineComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OwlDateTimeInlineComponent, _super);
    function OwlDateTimeInlineComponent(changeDetector, dateTimeAdapter, dateTimeFormats) {
        var _this = _super.call(this, dateTimeAdapter, dateTimeFormats) || this;
        _this.changeDetector = changeDetector;
        _this.dateTimeAdapter = dateTimeAdapter;
        _this.dateTimeFormats = dateTimeFormats;
        /**
         * Set the type of the dateTime picker
         *      'both' -- show both calendar and timer
         *      'calendar' -- show only calendar
         *      'timer' -- show only timer
         */
        _this._pickerType = 'both';
        _this._disabled = false;
        _this._selectMode = 'single';
        _this._values = [];
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
        _this._selecteds = [];
        _this.onModelChange = (/**
         * @param {?} date
         * @return {?}
         */
        function (date) { });
        _this.onModelTouched = (/**
         * @return {?}
         */
        function () { });
        return _this;
    }
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "pickerType", {
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
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selectMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectMode;
        },
        set: /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            if (mode !== 'single' &&
                mode !== 'range' &&
                mode !== 'rangeFrom' &&
                mode !== 'rangeTo') {
                throw Error('OwlDateTime Error: invalid selectMode value!');
            }
            this._selectMode = mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "startAt", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._startAt) {
                return this._startAt;
            }
            if (this.selectMode === 'single') {
                return this.value || null;
            }
            else if (this.selectMode === 'range' ||
                this.selectMode === 'rangeFrom') {
                return this.values[0] || null;
            }
            else if (this.selectMode === 'rangeTo') {
                return this.values[1] || null;
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
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "dateTimeFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateTimeFilter;
        },
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this._dateTimeFilter = filter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "minDateTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._min || null;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
            this.changeDetector.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "maxDateTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._max || null;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
            this.changeDetector.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            value = this.getValidDate(value);
            this._value = value;
            this.selected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "values", {
        get: /**
         * @return {?}
         */
        function () {
            return this._values;
        },
        set: /**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            var _this = this;
            if (values && values.length > 0) {
                values = values.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
                    v = _this.dateTimeAdapter.deserialize(v);
                    v = _this.getValidDate(v);
                    return v ? _this.dateTimeAdapter.clone(v) : null;
                }));
                this._values = tslib_1.__spread(values);
                this.selecteds = tslib_1.__spread(values);
            }
            else {
                this._values = [];
                this.selecteds = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selected", {
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
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selecteds", {
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
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "opened", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "pickerMode", {
        get: /**
         * @return {?}
         */
        function () {
            return 'inline';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "isInRangeMode", {
        get: /**
         * @return {?}
         */
        function () {
            return (this._selectMode === 'range' ||
                this._selectMode === 'rangeFrom' ||
                this._selectMode === 'rangeTo');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInlineComponent.prototype, "owlDTInlineClass", {
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
    OwlDateTimeInlineComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.container.picker = this;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    OwlDateTimeInlineComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInSingleMode) {
            this.value = value;
            this.container.pickerMoment = value;
        }
        else {
            this.values = value;
            this.container.pickerMoment = this._values[this.container.activeSelectedIndex];
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    OwlDateTimeInlineComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    OwlDateTimeInlineComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    OwlDateTimeInlineComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeInlineComponent.prototype.select = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.disabled) {
            return;
        }
        if (Array.isArray(date)) {
            this.values = tslib_1.__spread(date);
        }
        else {
            this.value = date;
        }
        this.onModelChange(date);
        this.onModelTouched();
    };
    /**
     * Emits the selected year in multi-year view
     */
    /**
     * Emits the selected year in multi-year view
     * @param {?} normalizedYear
     * @return {?}
     */
    OwlDateTimeInlineComponent.prototype.selectYear = /**
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
    OwlDateTimeInlineComponent.prototype.selectMonth = /**
     * Emits selected month in year view
     * @param {?} normalizedMonth
     * @return {?}
     */
    function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    OwlDateTimeInlineComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-date-time-inline',
                    template: "<owl-date-time-container></owl-date-time-container>\n",
                    host: {
                        '[class.owl-dt-inline]': 'owlDTInlineClass'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [OWL_DATETIME_VALUE_ACCESSOR]
                }] }
    ];
    /** @nocollapse */
    OwlDateTimeInlineComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
    ]; };
    OwlDateTimeInlineComponent.propDecorators = {
        container: [{ type: ViewChild, args: [OwlDateTimeContainerComponent, { static: true },] }],
        pickerType: [{ type: Input }],
        disabled: [{ type: Input }],
        selectMode: [{ type: Input }],
        startAt: [{ type: Input }],
        dateTimeFilter: [{ type: Input, args: ['owlDateTimeFilter',] }],
        minDateTime: [{ type: Input, args: ['min',] }],
        maxDateTime: [{ type: Input, args: ['max',] }],
        value: [{ type: Input }],
        values: [{ type: Input }],
        yearSelected: [{ type: Output }],
        monthSelected: [{ type: Output }]
    };
    return OwlDateTimeInlineComponent;
}(OwlDateTime));
export { OwlDateTimeInlineComponent };
if (false) {
    /** @type {?} */
    OwlDateTimeInlineComponent.prototype.container;
    /**
     * Set the type of the dateTime picker
     *      'both' -- show both calendar and timer
     *      'calendar' -- show only calendar
     *      'timer' -- show only timer
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._pickerType;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._selectMode;
    /**
     * The date to open the calendar to initially.
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._startAt;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._dateTimeFilter;
    /**
     * The minimum valid date.
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._min;
    /**
     * The maximum valid date.
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._max;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._value;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._values;
    /**
     * Emits selected year in multi-year view
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    OwlDateTimeInlineComponent.prototype.yearSelected;
    /**
     * Emits selected month in year view
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    OwlDateTimeInlineComponent.prototype.monthSelected;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype.onModelChange;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype.onModelTouched;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeInlineComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeInlineComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeInlineComponent.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWlubGluZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLWlubGluZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsV0FBVyxFQUlkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFDSCxxQkFBcUIsRUFFeEIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUFFdkYsTUFBTSxLQUFPLDJCQUEyQixHQUFRO0lBQzVDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSwwQkFBMEIsRUFBMUIsQ0FBMEIsRUFBQztJQUN6RCxLQUFLLEVBQUUsSUFBSTtDQUNkOzs7O0FBRUQ7SUFTbUQsc0RBQWM7SUFtTjdELG9DQUNjLGNBQWlDLEVBQ3JCLGVBQW1DLEVBRy9DLGVBQW1DO1FBTGpELFlBT0ksa0JBQU0sZUFBZSxFQUFFLGVBQWUsQ0FBQyxTQUMxQztRQVBhLG9CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNyQixxQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0MscUJB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NkJBVUwsS0FBSzswQkFvQkwsS0FBSztpQ0EyQkwsS0FBSyxTQUFDLG1CQUFtQjs4QkFnQnpCLEtBQUssU0FBQyxLQUFLOzhCQWFYLEtBQUssU0FBQyxLQUFLO3dCQU9YLEtBQUs7eUJBYUwsS0FBSzsrQkF3QkwsTUFBTTtnQ0FPTixNQUFNOztJQW1IWCxpQ0FBQztDQUFBLEFBN1JELENBU21ELFdBQVcsR0FvUjdEO1NBcFJZLDBCQUEwQjs7O0lBRW5DLCtDQUM0Qzs7Ozs7Ozs7O0lBUTVDLGlEQUF5Qzs7Ozs7SUFZekMsK0NBQTBCOzs7OztJQVUxQixpREFBMkM7Ozs7OztJQW9CM0MsOENBQTJCOzs7OztJQTJCM0IscURBQXFEOzs7Ozs7SUFXckQsMENBQXVCOzs7Ozs7SUFhdkIsMENBQXVCOzs7OztJQVl2Qiw0Q0FBeUI7Ozs7O0lBYXpCLDZDQUEwQjs7Ozs7O0lBeUIxQixrREFDcUM7Ozs7OztJQU1yQyxtREFDc0M7Ozs7O0lBRXRDLCtDQUE0Qjs7Ozs7SUFVNUIsZ0RBQTZCOzs7OztJQWtDN0IsbURBQThDOzs7OztJQUM5QyxvREFBa0M7Ozs7O0lBRzlCLG9EQUEyQzs7Ozs7SUFDM0MscURBQXlEOzs7OztJQUN6RCxxREFFNkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1pbmxpbmUuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gICAgT3dsRGF0ZVRpbWUsXG4gICAgUGlja2VyTW9kZSxcbiAgICBQaWNrZXJUeXBlLFxuICAgIFNlbGVjdE1vZGVcbn0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IE9XTF9EQVRFVElNRV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE93bERhdGVUaW1lSW5saW5lQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLWlubGluZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtdGltZS1pbmxpbmUuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtaW5saW5lXSc6ICdvd2xEVElubGluZUNsYXNzJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbT1dMX0RBVEVUSU1FX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZUlubGluZUNvbXBvbmVudDxUPiBleHRlbmRzIE93bERhdGVUaW1lPFQ+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBAVmlld0NoaWxkKE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIGNvbnRhaW5lcjogT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD47XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHR5cGUgb2YgdGhlIGRhdGVUaW1lIHBpY2tlclxuICAgICAqICAgICAgJ2JvdGgnIC0tIHNob3cgYm90aCBjYWxlbmRhciBhbmQgdGltZXJcbiAgICAgKiAgICAgICdjYWxlbmRhcicgLS0gc2hvdyBvbmx5IGNhbGVuZGFyXG4gICAgICogICAgICAndGltZXInIC0tIHNob3cgb25seSB0aW1lclxuICAgICAqL1xuICAgIHByaXZhdGUgX3BpY2tlclR5cGU6IFBpY2tlclR5cGUgPSAnYm90aCc7XG4gICAgQElucHV0KClcbiAgICBnZXQgcGlja2VyVHlwZSgpOiBQaWNrZXJUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlclR5cGU7XG4gICAgfVxuXG4gICAgc2V0IHBpY2tlclR5cGUodmFsOiBQaWNrZXJUeXBlKSB7XG4gICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3BpY2tlclR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlclR5cGUgPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdE1vZGU6IFNlbGVjdE1vZGUgPSAnc2luZ2xlJztcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0TW9kZShtb2RlOiBTZWxlY3RNb2RlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG1vZGUgIT09ICdzaW5nbGUnICYmXG4gICAgICAgICAgICBtb2RlICE9PSAncmFuZ2UnICYmXG4gICAgICAgICAgICBtb2RlICE9PSAncmFuZ2VGcm9tJyAmJlxuICAgICAgICAgICAgbW9kZSAhPT0gJ3JhbmdlVG8nXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ093bERhdGVUaW1lIEVycm9yOiBpbnZhbGlkIHNlbGVjdE1vZGUgdmFsdWUhJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID0gbW9kZTtcbiAgICB9XG5cbiAgICAvKiogVGhlIGRhdGUgdG8gb3BlbiB0aGUgY2FsZW5kYXIgdG8gaW5pdGlhbGx5LiAqL1xuICAgIHByaXZhdGUgX3N0YXJ0QXQ6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0YXJ0QXQoKTogVCB8IG51bGwge1xuICAgICAgICBpZiAodGhpcy5fc3RhcnRBdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0QXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgfHwgbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlc1swXSB8fCBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXNbMV0gfHwgbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0IHN0YXJ0QXQoZGF0ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc3RhcnRBdCA9IHRoaXMuZ2V0VmFsaWREYXRlKFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoZGF0ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kYXRlVGltZUZpbHRlcjogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuO1xuICAgIEBJbnB1dCgnb3dsRGF0ZVRpbWVGaWx0ZXInKVxuICAgIGdldCBkYXRlVGltZUZpbHRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVUaW1lRmlsdGVyO1xuICAgIH1cblxuICAgIHNldCBkYXRlVGltZUZpbHRlcihmaWx0ZXI6IChkYXRlOiBUIHwgbnVsbCkgPT4gYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kYXRlVGltZUZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1pbmltdW0gdmFsaWQgZGF0ZS4gKi9cbiAgICBwcml2YXRlIF9taW46IFQgfCBudWxsO1xuXG4gICAgZ2V0IG1pbkRhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbiB8fCBudWxsO1xuICAgIH1cblxuICAgIEBJbnB1dCgnbWluJylcbiAgICBzZXQgbWluRGF0ZVRpbWUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX21pbiA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHZhbGlkIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfbWF4OiBUIHwgbnVsbDtcblxuICAgIGdldCBtYXhEYXRlVGltZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXggfHwgbnVsbDtcbiAgICB9XG5cbiAgICBASW5wdXQoJ21heCcpXG4gICAgc2V0IG1heERhdGVUaW1lKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9tYXggPSB0aGlzLmdldFZhbGlkRGF0ZSh0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWVzOiBUW10gPSBbXTtcbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZXM7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlcyh2YWx1ZXM6IFRbXSkge1xuICAgICAgICBpZiAodmFsdWVzICYmIHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMubWFwKHYgPT4ge1xuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2KTtcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5nZXRWYWxpZERhdGUodik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHYgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbG9uZSh2KSA6IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IFsuLi52YWx1ZXNdO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHMgPSBbLi4udmFsdWVzXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHNlbGVjdGVkIHllYXIgaW4gbXVsdGkteWVhciB2aWV3XG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHllYXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlld1xuICAgICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBtb250aFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFQgfCBudWxsO1xuICAgIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xuICAgIGdldCBzZWxlY3RlZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSB2YWx1ZXM7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IHBpY2tlck1vZGUoKTogUGlja2VyTW9kZSB7XG4gICAgICAgIHJldHVybiAnaW5saW5lJztcbiAgICB9XG5cbiAgICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcbiAgICB9XG5cbiAgICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VUbydcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQgb3dsRFRJbmxpbmVDbGFzcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1vZGVsQ2hhbmdlID0gKGRhdGU6IFRbXSB8IFQpID0+IHt9O1xuICAgIHByaXZhdGUgb25Nb2RlbFRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxuICAgICAgICBwcm90ZWN0ZWQgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoZGF0ZVRpbWVBZGFwdGVyLCBkYXRlVGltZUZvcm1hdHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIucGlja2VyID0gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5waWNrZXJNb21lbnQgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5waWNrZXJNb21lbnQgPSB0aGlzLl92YWx1ZXNbXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYWN0aXZlU2VsZWN0ZWRJbmRleFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdChkYXRlOiBUW10gfCBUKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRlKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSBbLi4uZGF0ZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UoZGF0ZSk7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aS15ZWFyIHZpZXdcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0WWVhcihub3JtYWxpemVkWWVhcjogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLnllYXJTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRZZWFyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBzZWxlY3RlZCBtb250aCBpbiB5ZWFyIHZpZXdcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0TW9udGgobm9ybWFsaXplZE1vbnRoOiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRNb250aCk7XG4gICAgfVxufVxuIl19