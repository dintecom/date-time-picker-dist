/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-body.component
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { take } from 'rxjs/operators';
export class CalendarCell {
    /**
     * @param {?} value
     * @param {?} displayValue
     * @param {?} ariaLabel
     * @param {?} enabled
     * @param {?=} out
     * @param {?=} cellClass
     */
    constructor(value, displayValue, ariaLabel, enabled, out = false, cellClass = '') {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.out = out;
        this.cellClass = cellClass;
    }
}
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
export class OwlCalendarBodyComponent {
    /**
     * @param {?} elmRef
     * @param {?} ngZone
     */
    constructor(elmRef, ngZone) {
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
    /**
     * @return {?}
     */
    get owlDTCalendarBodyClass() {
        return true;
    }
    /**
     * @return {?}
     */
    get isInSingleMode() {
        return this.selectMode === 'single';
    }
    /**
     * @return {?}
     */
    get isInRangeMode() {
        return (this.selectMode === 'range' ||
            this.selectMode === 'rangeFrom' ||
            this.selectMode === 'rangeTo');
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @param {?} cell
     * @return {?}
     */
    selectCell(cell) {
        this.select.emit(cell);
    }
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    isActiveCell(rowIndex, colIndex) {
        /** @type {?} */
        const cellNumber = rowIndex * this.numCols + colIndex;
        return cellNumber === this.activeCell;
    }
    /**
     * Check if the cell is selected
     * @param {?} value
     * @return {?}
     */
    isSelected(value) {
        if (!this.selectedValues || this.selectedValues.length === 0) {
            return false;
        }
        if (this.isInSingleMode) {
            return value === this.selectedValues[0];
        }
        if (this.isInRangeMode) {
            /** @type {?} */
            const fromValue = this.selectedValues[0];
            /** @type {?} */
            const toValue = this.selectedValues[1];
            return value === fromValue || value === toValue;
        }
    }
    /**
     * Check if the cell in the range
     * @param {?} value
     * @return {?}
     */
    isInRange(value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            const fromValue = this.selectedValues[0];
            /** @type {?} */
            const toValue = this.selectedValues[1];
            if (fromValue !== null && toValue !== null) {
                return value >= fromValue && value <= toValue;
            }
            else {
                return value === fromValue || value === toValue;
            }
        }
    }
    /**
     * Check if the cell is the range from
     * @param {?} value
     * @return {?}
     */
    isRangeFrom(value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            const fromValue = this.selectedValues[0];
            return fromValue !== null && value === fromValue;
        }
    }
    /**
     * Check if the cell is the range to
     * @param {?} value
     * @return {?}
     */
    isRangeTo(value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            const toValue = this.selectedValues[1];
            return toValue !== null && value === toValue;
        }
    }
    /**
     * Focus to a active cell
     * @return {?}
     */
    focusActiveCell() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.elmRef.nativeElement
                    .querySelector('.owl-dt-calendar-cell-active')
                    .focus();
            }));
        }));
    }
}
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
OwlCalendarBodyComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvY2FsZW5kYXItYm9keS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE1BQU0sT0FBTyxZQUFZOzs7Ozs7Ozs7SUFDckIsWUFDVyxLQUFhLEVBQ2IsWUFBb0IsRUFDcEIsU0FBaUIsRUFDakIsT0FBZ0IsRUFDaEIsTUFBZSxLQUFLLEVBQ3BCLFlBQW9CLEVBQUU7UUFMdEIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFhO0lBQzlCLENBQUM7Q0FDUDs7O0lBUE8sNkJBQW9COztJQUNwQixvQ0FBMkI7O0lBQzNCLGlDQUF3Qjs7SUFDeEIsK0JBQXVCOztJQUN2QiwyQkFBMkI7O0lBQzNCLGlDQUE2Qjs7QUFhckMsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7SUFpRWpDLFlBQW9CLE1BQWtCLEVBQVUsTUFBYztRQUExQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTs7OztRQTVEOUQsZUFBVSxHQUFHLENBQUMsQ0FBQzs7OztRQVlmLFlBQU8sR0FBRyxDQUFDLENBQUM7Ozs7UUFNWixjQUFTLEdBQUcsQ0FBQyxDQUFDOzs7O1FBd0JFLFdB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Q2IsU0FBUzs7O1lBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYTtxQkFDcEIsYUFBYSxDQUFDLDhCQUE4QixDQUFDO3FCQUM3QyxLQUFLLEVBQUUsQ0FBQztZQUNqQixDQUFDLEVBQUMsQ0FBQztRQUNYLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBN0pKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6QyxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQywyMENBQTZDO2dCQUM3QyxJQUFJLEVBQUU7b0JBQ0YsOEJBQThCLEVBQUUsd0JBQXdCO2lCQUMzRDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7OztZQTdCRyxVQUFVO1lBR1YsTUFBTTs7O3lCQStCTCxLQUFLO21CQU1MLEtBQUs7c0JBTUwsS0FBSzt3QkFNTCxLQUFLO3lCQU1MLEtBQUs7NkJBTUwsS0FBSzt5QkFNTCxLQUFLO3FCQU1MLE1BQU07Ozs7Ozs7SUExQ1AsOENBQ2U7Ozs7O0lBS2Ysd0NBQ3VCOzs7OztJQUt2QiwyQ0FDWTs7Ozs7SUFLWiw2Q0FDYzs7Ozs7SUFLZCw4Q0FDbUI7Ozs7O0lBS25CLGtEQUN5Qjs7Ozs7SUFLekIsOENBQ3VCOzs7OztJQUt2QiwwQ0FDMEQ7Ozs7O0lBa0I5QywwQ0FBMEI7Ozs7O0lBQUUsMENBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBjYWxlbmRhci1ib2R5LmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNlbGwge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgdmFsdWU6IG51bWJlcixcbiAgICAgICAgcHVibGljIGRpc3BsYXlWYWx1ZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgYXJpYUxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuLFxuICAgICAgICBwdWJsaWMgb3V0OiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyBjZWxsQ2xhc3M6IHN0cmluZyA9ICcnXG4gICAgKSB7fVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1tvd2wtZGF0ZS10aW1lLWNhbGVuZGFyLWJvZHldJyxcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lQ2FsZW5kYXJCb2R5JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci1ib2R5XSc6ICdvd2xEVENhbGVuZGFyQm9keUNsYXNzJ1xuICAgIH0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICAvKipcbiAgICAgKiBUaGUgY2VsbCBudW1iZXIgb2YgdGhlIGFjdGl2ZSBjZWxsIGluIHRoZSB0YWJsZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFjdGl2ZUNlbGwgPSAwO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNlbGxzIHRvIGRpc3BsYXkgaW4gdGhlIHRhYmxlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcm93czogQ2FsZW5kYXJDZWxsW11bXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgdGFibGUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBudW1Db2xzID0gNztcblxuICAgIC8qKlxuICAgICAqIFRoZSByYXRpbyAod2lkdGggLyBoZWlnaHQpIHRvIHVzZSBmb3IgdGhlIGNlbGxzIGluIHRoZSB0YWJsZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNlbGxSYXRpbyA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgaW4gdGhlIHRhYmxlIHRoYXQgY29ycmVzcG9uZHMgdG8gdG9kYXkuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0b2RheVZhbHVlOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgaW4gdGhlIHRhYmxlIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0ZWRWYWx1ZXM6IG51bWJlcltdO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBwaWNrZXIgc2VsZWN0IG1vZGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdE1vZGU6IFNlbGVjdE1vZGU7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0IHdoZW4gYSBjYWxlbmRhciBjZWxsIGlzIHNlbGVjdGVkXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJDZWxsPigpO1xuXG4gICAgZ2V0IG93bERUQ2FsZW5kYXJCb2R5Q2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgfHxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbG1SZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHt9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7fVxuXG4gICAgcHVibGljIHNlbGVjdENlbGwoY2VsbDogQ2FsZW5kYXJDZWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0LmVtaXQoY2VsbCk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQWN0aXZlQ2VsbChyb3dJbmRleDogbnVtYmVyLCBjb2xJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGNlbGxOdW1iZXIgPSByb3dJbmRleCAqIHRoaXMubnVtQ29scyArIGNvbEluZGV4O1xuICAgICAgICByZXR1cm4gY2VsbE51bWJlciA9PT0gdGhpcy5hY3RpdmVDZWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBjZWxsIGlzIHNlbGVjdGVkXG4gICAgICovXG4gICAgcHVibGljIGlzU2VsZWN0ZWQodmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZXMgfHwgdGhpcy5zZWxlY3RlZFZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xuICAgICAgICAgICAgY29uc3QgdG9WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMV07XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gZnJvbVZhbHVlIHx8IHZhbHVlID09PSB0b1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaW4gdGhlIHJhbmdlXG4gICAgICovXG4gICAgcHVibGljIGlzSW5SYW5nZSh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGZyb21WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF07XG4gICAgICAgICAgICBjb25zdCB0b1ZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1sxXTtcblxuICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gbnVsbCAmJiB0b1ZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID49IGZyb21WYWx1ZSAmJiB2YWx1ZSA8PSB0b1ZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IGZyb21WYWx1ZSB8fCB2YWx1ZSA9PT0gdG9WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBjZWxsIGlzIHRoZSByYW5nZSBmcm9tXG4gICAgICovXG4gICAgcHVibGljIGlzUmFuZ2VGcm9tKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgY29uc3QgZnJvbVZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1swXTtcbiAgICAgICAgICAgIHJldHVybiBmcm9tVmFsdWUgIT09IG51bGwgJiYgdmFsdWUgPT09IGZyb21WYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBjZWxsIGlzIHRoZSByYW5nZSB0b1xuICAgICAqL1xuICAgIHB1YmxpYyBpc1JhbmdlVG8odmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICBjb25zdCB0b1ZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1sxXTtcbiAgICAgICAgICAgIHJldHVybiB0b1ZhbHVlICE9PSBudWxsICYmIHZhbHVlID09PSB0b1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9jdXMgdG8gYSBhY3RpdmUgY2VsbFxuICAgICAqL1xuICAgIHB1YmxpYyBmb2N1c0FjdGl2ZUNlbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5vd2wtZHQtY2FsZW5kYXItY2VsbC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==