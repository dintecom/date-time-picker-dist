/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-body.component
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { take } from 'rxjs/operators';
var CalendarCell = /** @class */ (function () {
    function CalendarCell(value, displayValue, ariaLabel, enabled, out, cellClass) {
        if (out === void 0) { out = false; }
        if (cellClass === void 0) { cellClass = ''; }
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.out = out;
        this.cellClass = cellClass;
    }
    return CalendarCell;
}());
export { CalendarCell };
if (false) {
    /** @type {?} */
    CalendarCell.prototype.value;
    /** @type {?} */
    CalendarCell.prototype.displayValue;
    /** @type {?} */
    CalendarCell.prototype.ariaLabel;
    /** @type {?} */
    CalendarCell.prototype.enabled;
    /** @type {?} */
    CalendarCell.prototype.out;
    /** @type {?} */
    CalendarCell.prototype.cellClass;
}
var OwlCalendarBodyComponent = /** @class */ (function () {
    function OwlCalendarBodyComponent(elmRef, ngZone) {
        this.elmRef = elmRef;
        this.ngZone = ngZone;
        /**
         * The cell number of the active cell in the table.
         */
        this.activeCell = 0;
        /**
         * The number of columns in the table.
         */
        this.numCols = 7;
        /**
         * The ratio (width / height) to use for the cells in the table.
         */
        this.cellRatio = 1;
        /**
         * Emit when a calendar cell is selected
         */
        this.select = new EventEmitter();
    }
    Object.defineProperty(OwlCalendarBodyComponent.prototype, "owlDTCalendarBodyClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarBodyComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarBodyComponent.prototype, "isInRangeMode", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.selectMode === 'range' ||
                this.selectMode === 'rangeFrom' ||
                this.selectMode === 'rangeTo');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} cell
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.selectCell = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        this.select.emit(cell);
    };
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isActiveCell = /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    function (rowIndex, colIndex) {
        /** @type {?} */
        var cellNumber = rowIndex * this.numCols + colIndex;
        return cellNumber === this.activeCell;
    };
    /**
     * Check if the cell is selected
     */
    /**
     * Check if the cell is selected
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isSelected = /**
     * Check if the cell is selected
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.selectedValues || this.selectedValues.length === 0) {
            return false;
        }
        if (this.isInSingleMode) {
            return value === this.selectedValues[0];
        }
        if (this.isInRangeMode) {
            /** @type {?} */
            var fromValue = this.selectedValues[0];
            /** @type {?} */
            var toValue = this.selectedValues[1];
            return value === fromValue || value === toValue;
        }
    };
    /**
     * Check if the cell in the range
     */
    /**
     * Check if the cell in the range
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isInRange = /**
     * Check if the cell in the range
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            var fromValue = this.selectedValues[0];
            /** @type {?} */
            var toValue = this.selectedValues[1];
            if (fromValue !== null && toValue !== null) {
                return value >= fromValue && value <= toValue;
            }
            else {
                return value === fromValue || value === toValue;
            }
        }
    };
    /**
     * Check if the cell is the range from
     */
    /**
     * Check if the cell is the range from
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isRangeFrom = /**
     * Check if the cell is the range from
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            var fromValue = this.selectedValues[0];
            return fromValue !== null && value === fromValue;
        }
    };
    /**
     * Check if the cell is the range to
     */
    /**
     * Check if the cell is the range to
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isRangeTo = /**
     * Check if the cell is the range to
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            var toValue = this.selectedValues[1];
            return toValue !== null && value === toValue;
        }
    };
    /**
     * Focus to a active cell
     */
    /**
     * Focus to a active cell
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.focusActiveCell = /**
     * Focus to a active cell
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.elmRef.nativeElement
                    .querySelector('.owl-dt-calendar-cell-active')
                    .focus();
            }));
        }));
    };
    OwlCalendarBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: '[owl-date-time-calendar-body]',
                    exportAs: 'owlDateTimeCalendarBody',
                    template: "<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n    <td\n        *ngFor=\"let item of row; let colIndex = index\"\n        class=\"owl-dt-calendar-cell {{ item.cellClass }}\"\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n        [class.owl-dt-calendar-cell-active]=\"isActiveCell(rowIndex, colIndex)\"\n        [class.owl-dt-calendar-cell-disabled]=\"!item.enabled\"\n        [class.owl-dt-calendar-cell-in-range]=\"isInRange(item.value)\"\n        [class.owl-dt-calendar-cell-range-from]=\"isRangeFrom(item.value)\"\n        [class.owl-dt-calendar-cell-range-to]=\"isRangeTo(item.value)\"\n        [attr.aria-label]=\"item.ariaLabel\"\n        [attr.aria-disabled]=\"!item.enabled || null\"\n        [style.width.%]=\"100 / numCols\"\n        [style.paddingTop.%]=\"(50 * cellRatio) / numCols\"\n        [style.paddingBottom.%]=\"(50 * cellRatio) / numCols\"\n        (click)=\"selectCell(item)\"\n    >\n        <span\n            class=\"owl-dt-calendar-cell-content\"\n            [ngClass]=\"{\n                'owl-dt-calendar-cell-out': item.out,\n                'owl-dt-calendar-cell-today': item.value === todayValue,\n                'owl-dt-calendar-cell-selected': isSelected(item.value)\n            }\"\n        >\n            {{ item.displayValue }}\n        </span>\n    </td>\n</tr>\n",
                    host: {
                        '[class.owl-dt-calendar-body]': 'owlDTCalendarBodyClass'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    OwlCalendarBodyComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    OwlCalendarBodyComponent.propDecorators = {
        activeCell: [{ type: Input }],
        rows: [{ type: Input }],
        numCols: [{ type: Input }],
        cellRatio: [{ type: Input }],
        todayValue: [{ type: Input }],
        selectedValues: [{ type: Input }],
        selectMode: [{ type: Input }],
        select: [{ type: Output }]
    };
    return OwlCalendarBodyComponent;
}());
export { OwlCalendarBodyComponent };
if (false) {
    /**
     * The cell number of the active cell in the table.
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.activeCell;
    /**
     * The cells to display in the table.
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.rows;
    /**
     * The number of columns in the table.
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.numCols;
    /**
     * The ratio (width / height) to use for the cells in the table.
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.cellRatio;
    /**
     * The value in the table that corresponds to today.
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.todayValue;
    /**
     * The value in the table that is currently selected.
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.selectedValues;
    /**
     * Current picker select mode
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.selectMode;
    /**
     * Emit when a calendar cell is selected
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.select;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarBodyComponent.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarBodyComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvY2FsZW5kYXItYm9keS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDO0lBQ0ksc0JBQ1csS0FBYSxFQUNiLFlBQW9CLEVBQ3BCLFNBQWlCLEVBQ2pCLE9BQWdCLEVBQ2hCLEdBQW9CLEVBQ3BCLFNBQXNCO1FBRHRCLG9CQUFBLEVBQUEsV0FBb0I7UUFDcEIsMEJBQUEsRUFBQSxjQUFzQjtRQUx0QixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLFFBQUcsR0FBSCxHQUFHLENBQWlCO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQWE7SUFDOUIsQ0FBQztJQUNSLG1CQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7Ozs7SUFQTyw2QkFBb0I7O0lBQ3BCLG9DQUEyQjs7SUFDM0IsaUNBQXdCOztJQUN4QiwrQkFBdUI7O0lBQ3ZCLDJCQUEyQjs7SUFDM0IsaUNBQTZCOztBQUlyQztJQTBFSSxrQ0FBb0IsTUFBa0IsRUFBVSxNQUFjO1FBQTFDLFdBQU0sR0FBTixNQUFNLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFROzs7O1FBNUQ5RCxlQUFVLEdBQUcsQ0FBQyxDQUFDOzs7O1FBWWYsWUFBTyxHQUFHLENBQUMsQ0FBQzs7OztRQU1aLGNBQVMsR0FBRyxD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ZW50XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RNb2RlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQ2VsbCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgZGlzcGxheVZhbHVlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBhcmlhTGFiZWw6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyBvdXQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgcHVibGljIGNlbGxDbGFzczogc3RyaW5nID0gJydcbiAgICApIHt9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW293bC1kYXRlLXRpbWUtY2FsZW5kYXItYm9keV0nLFxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVDYWxlbmRhckJvZHknLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLWJvZHldJzogJ293bERUQ2FsZW5kYXJCb2R5Q2xhc3MnXG4gICAgfSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8qKlxuICAgICAqIFRoZSBjZWxsIG51bWJlciBvZiB0aGUgYWN0aXZlIGNlbGwgaW4gdGhlIHRhYmxlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWN0aXZlQ2VsbCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2VsbHMgdG8gZGlzcGxheSBpbiB0aGUgdGFibGUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICByb3dzOiBDYWxlbmRhckNlbGxbXVtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSB0YWJsZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG51bUNvbHMgPSA3O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHJhdGlvICh3aWR0aCAvIGhlaWdodCkgdG8gdXNlIGZvciB0aGUgY2VsbHMgaW4gdGhlIHRhYmxlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2VsbFJhdGlvID0gMTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBpbiB0aGUgdGFibGUgdGhhdCBjb3JyZXNwb25kcyB0byB0b2RheS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRvZGF5VmFsdWU6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBpbiB0aGUgdGFibGUgdGhhdCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RlZFZhbHVlczogbnVtYmVyW107XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHBpY2tlciBzZWxlY3QgbW9kZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0TW9kZTogU2VsZWN0TW9kZTtcblxuICAgIC8qKlxuICAgICAqIEVtaXQgd2hlbiBhIGNhbGVuZGFyIGNlbGwgaXMgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckNlbGw+KCk7XG5cbiAgICBnZXQgb3dsRFRDYWxlbmRhckJvZHlDbGFzcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcbiAgICB9XG5cbiAgICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VUbydcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsbVJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgICBwdWJsaWMgc2VsZWN0Q2VsbChjZWxsOiBDYWxlbmRhckNlbGwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3QuZW1pdChjZWxsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNBY3RpdmVDZWxsKHJvd0luZGV4OiBudW1iZXIsIGNvbEluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgY2VsbE51bWJlciA9IHJvd0luZGV4ICogdGhpcy5udW1Db2xzICsgY29sSW5kZXg7XG4gICAgICAgIHJldHVybiBjZWxsTnVtYmVyID09PSB0aGlzLmFjdGl2ZUNlbGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaXMgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNTZWxlY3RlZCh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlcyB8fCB0aGlzLnNlbGVjdGVkVmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdGhpcy5zZWxlY3RlZFZhbHVlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGZyb21WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF07XG4gICAgICAgICAgICBjb25zdCB0b1ZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1sxXTtcblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSBmcm9tVmFsdWUgfHwgdmFsdWUgPT09IHRvVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgY2VsbCBpbiB0aGUgcmFuZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNJblJhbmdlKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgY29uc3QgZnJvbVZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1swXTtcbiAgICAgICAgICAgIGNvbnN0IHRvVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzFdO1xuXG4gICAgICAgICAgICBpZiAoZnJvbVZhbHVlICE9PSBudWxsICYmIHRvVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPj0gZnJvbVZhbHVlICYmIHZhbHVlIDw9IHRvVmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gZnJvbVZhbHVlIHx8IHZhbHVlID09PSB0b1ZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaXMgdGhlIHJhbmdlIGZyb21cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNSYW5nZUZyb20odmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xuICAgICAgICAgICAgcmV0dXJuIGZyb21WYWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSA9PT0gZnJvbVZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaXMgdGhlIHJhbmdlIHRvXG4gICAgICovXG4gICAgcHVibGljIGlzUmFuZ2VUbyh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHRvVmFsdWUgIT09IG51bGwgJiYgdmFsdWUgPT09IHRvVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb2N1cyB0byBhIGFjdGl2ZSBjZWxsXG4gICAgICovXG4gICAgcHVibGljIGZvY3VzQWN0aXZlQ2VsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLm93bC1kdC1jYWxlbmRhci1jZWxsLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19