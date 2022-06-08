import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class CalendarCell {
    constructor(value, displayValue, ariaLabel, enabled, out = false, cellClass = '') {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.out = out;
        this.cellClass = cellClass;
    }
}
export class OwlCalendarBodyComponent {
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
    get owlDTCalendarBodyClass() {
        return true;
    }
    get isInSingleMode() {
        return this.selectMode === 'single';
    }
    get isInRangeMode() {
        return (this.selectMode === 'range' ||
            this.selectMode === 'rangeFrom' ||
            this.selectMode === 'rangeTo');
    }
    ngOnInit() { }
    selectCell(cell) {
        this.select.emit(cell);
    }
    isActiveCell(rowIndex, colIndex) {
        const cellNumber = rowIndex * this.numCols + colIndex;
        return cellNumber === this.activeCell;
    }
    /**
     * Check if the cell is selected
     */
    isSelected(value) {
        if (!this.selectedValues || this.selectedValues.length === 0) {
            return false;
        }
        if (this.isInSingleMode) {
            return value === this.selectedValues[0];
        }
        if (this.isInRangeMode) {
            const fromValue = this.selectedValues[0];
            const toValue = this.selectedValues[1];
            return value === fromValue || value === toValue;
        }
        return false;
    }
    /**
     * Check if the cell in the range
     */
    isInRange(value) {
        if (this.isInRangeMode) {
            const fromValue = this.selectedValues[0];
            const toValue = this.selectedValues[1];
            if (fromValue !== null && toValue !== null) {
                return value >= fromValue && value <= toValue;
            }
            else {
                return value === fromValue || value === toValue;
            }
        }
        return false;
    }
    /**
     * Check if the cell is the range from
     */
    isRangeFrom(value) {
        if (this.isInRangeMode) {
            const fromValue = this.selectedValues[0];
            return fromValue !== null && value === fromValue;
        }
    }
    /**
     * Check if the cell is the range to
     */
    isRangeTo(value) {
        if (this.isInRangeMode) {
            const toValue = this.selectedValues[1];
            return toValue !== null && value === toValue;
        }
    }
    /**
     * Focus to a active cell
     */
    focusActiveCell() {
        this.ngZone.runOutsideAngular(() => {
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                this.elmRef.nativeElement.querySelector('.owl-dt-calendar-cell-active').focus();
            });
        });
    }
}
OwlCalendarBodyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlCalendarBodyComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
OwlCalendarBodyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: OwlCalendarBodyComponent, selector: "[owl-date-time-calendar-body]", inputs: { activeCell: "activeCell", rows: "rows", numCols: "numCols", cellRatio: "cellRatio", todayValue: "todayValue", selectedValues: "selectedValues", selectMode: "selectMode" }, outputs: { select: "select" }, host: { properties: { "class.owl-dt-calendar-body": "owlDTCalendarBodyClass" } }, exportAs: ["owlDateTimeCalendarBody"], ngImport: i0, template: "<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n  <td\n    *ngFor=\"let item of row; let colIndex = index\"\n    class=\"owl-dt-calendar-cell {{ item.cellClass }}\"\n    [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n    [class.owl-dt-calendar-cell-active]=\"isActiveCell(rowIndex, colIndex)\"\n    [class.owl-dt-calendar-cell-disabled]=\"!item.enabled\"\n    [class.owl-dt-calendar-cell-in-range]=\"isInRange(item.value)\"\n    [class.owl-dt-calendar-cell-range-from]=\"isRangeFrom(item.value)\"\n    [class.owl-dt-calendar-cell-range-to]=\"isRangeTo(item.value)\"\n    [attr.aria-label]=\"item.ariaLabel\"\n    [attr.aria-disabled]=\"!item.enabled || null\"\n    [style.width.%]=\"100 / numCols\"\n    [style.paddingTop.%]=\"(50 * cellRatio) / numCols\"\n    [style.paddingBottom.%]=\"(50 * cellRatio) / numCols\"\n    (click)=\"selectCell(item)\"\n  >\n    <span\n      class=\"owl-dt-calendar-cell-content\"\n      [ngClass]=\"{\n        'owl-dt-calendar-cell-out': item.out,\n        'owl-dt-calendar-cell-today': item.value === todayValue,\n        'owl-dt-calendar-cell-selected': isSelected(item.value)\n      }\"\n    >\n      {{ item.displayValue }}\n    </span>\n  </td>\n</tr>\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlCalendarBodyComponent, decorators: [{
            type: Component,
            args: [{ selector: '[owl-date-time-calendar-body]', exportAs: 'owlDateTimeCalendarBody', host: {
                        '[class.owl-dt-calendar-body]': 'owlDTCalendarBodyClass'
                    }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n  <td\n    *ngFor=\"let item of row; let colIndex = index\"\n    class=\"owl-dt-calendar-cell {{ item.cellClass }}\"\n    [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n    [class.owl-dt-calendar-cell-active]=\"isActiveCell(rowIndex, colIndex)\"\n    [class.owl-dt-calendar-cell-disabled]=\"!item.enabled\"\n    [class.owl-dt-calendar-cell-in-range]=\"isInRange(item.value)\"\n    [class.owl-dt-calendar-cell-range-from]=\"isRangeFrom(item.value)\"\n    [class.owl-dt-calendar-cell-range-to]=\"isRangeTo(item.value)\"\n    [attr.aria-label]=\"item.ariaLabel\"\n    [attr.aria-disabled]=\"!item.enabled || null\"\n    [style.width.%]=\"100 / numCols\"\n    [style.paddingTop.%]=\"(50 * cellRatio) / numCols\"\n    [style.paddingBottom.%]=\"(50 * cellRatio) / numCols\"\n    (click)=\"selectCell(item)\"\n  >\n    <span\n      class=\"owl-dt-calendar-cell-content\"\n      [ngClass]=\"{\n        'owl-dt-calendar-cell-out': item.out,\n        'owl-dt-calendar-cell-today': item.value === todayValue,\n        'owl-dt-calendar-cell-selected': isSelected(item.value)\n      }\"\n    >\n      {{ item.displayValue }}\n    </span>\n  </td>\n</tr>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { activeCell: [{
                type: Input
            }], rows: [{
                type: Input
            }], numCols: [{
                type: Input
            }], cellRatio: [{
                type: Input
            }], todayValue: [{
                type: Input
            }], selectedValues: [{
                type: Input
            }], selectMode: [{
                type: Input
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvY2FsZW5kYXItYm9keS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvY2FsZW5kYXItYm9keS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUV0QyxNQUFNLE9BQU8sWUFBWTtJQUN2QixZQUNTLEtBQWEsRUFDYixZQUFvQixFQUNwQixTQUFpQixFQUNqQixPQUFnQixFQUNoQixNQUFlLEtBQUssRUFDcEIsWUFBb0IsRUFBRTtRQUx0QixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLFFBQUcsR0FBSCxHQUFHLENBQWlCO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQWE7SUFDNUIsQ0FBQztDQUNMO0FBWUQsTUFBTSxPQUFPLHdCQUF3QjtJQWlFbkMsWUFBb0IsTUFBa0IsRUFBVSxNQUFjO1FBQTFDLFdBQU0sR0FBTixNQUFNLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBaEU5RDs7V0FFRztRQUVILGVBQVUsR0FBRyxDQUFDLENBQUM7UUFRZjs7V0FFRztRQUVILFlBQU8sR0FBRyxDQUFDLENBQUM7UUFFWjs7V0FFRztRQUVILGNBQVMsR0FBRyxDQUFDLENBQUM7UUFvQmQ7O1dBRUc7UUFFYSxXQUFNLEdB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QyxHQUFHLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2lCQUNqQixZQUFZLEVBQUU7aUJBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYixTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xGLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztxSEFwSlUsd0JBQXdCO3lHQUF4Qix3QkFBd0IsbVpDbENyQyx1c0NBNkJBOzJGREthLHdCQUF3QjtrQkFWcEMsU0FBUzsrQkFDRSwrQkFBK0IsWUFDL0IseUJBQXlCLFFBRzdCO3dCQUNKLDhCQUE4QixFQUFFLHdCQUF3QjtxQkFDekQsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU07c0hBTy9DLFVBQVU7c0JBRFQsS0FBSztnQkFPTixJQUFJO3NCQURILEtBQUs7Z0JBT04sT0FBTztzQkFETixLQUFLO2dCQU9OLFNBQVM7c0JBRFIsS0FBSztnQkFPTixVQUFVO3NCQURULEtBQUs7Z0JBT04sY0FBYztzQkFEYixLQUFLO2dCQU9OLFVBQVU7c0JBRFQsS0FBSztnQkFPVSxNQUFNO3NCQURyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkluaXQsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDZWxsIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHZhbHVlOiBudW1iZXIsXG4gICAgcHVibGljIGRpc3BsYXlWYWx1ZTogc3RyaW5nLFxuICAgIHB1YmxpYyBhcmlhTGFiZWw6IHN0cmluZyxcbiAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbixcbiAgICBwdWJsaWMgb3V0OiBib29sZWFuID0gZmFsc2UsXG4gICAgcHVibGljIGNlbGxDbGFzczogc3RyaW5nID0gJydcbiAgKSB7fVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbb3dsLWRhdGUtdGltZS1jYWxlbmRhci1ib2R5XScsXG4gIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVDYWxlbmRhckJvZHknLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuaHRtbCcsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5vd2wtZHQtY2FsZW5kYXItYm9keV0nOiAnb3dsRFRDYWxlbmRhckJvZHlDbGFzcydcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqXG4gICAqIFRoZSBjZWxsIG51bWJlciBvZiB0aGUgYWN0aXZlIGNlbGwgaW4gdGhlIHRhYmxlLlxuICAgKi9cbiAgQElucHV0KClcbiAgYWN0aXZlQ2VsbCA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBjZWxscyB0byBkaXNwbGF5IGluIHRoZSB0YWJsZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHJvd3M6IENhbGVuZGFyQ2VsbFtdW107XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgdGFibGUuXG4gICAqL1xuICBASW5wdXQoKVxuICBudW1Db2xzID0gNztcblxuICAvKipcbiAgICogVGhlIHJhdGlvICh3aWR0aCAvIGhlaWdodCkgdG8gdXNlIGZvciB0aGUgY2VsbHMgaW4gdGhlIHRhYmxlLlxuICAgKi9cbiAgQElucHV0KClcbiAgY2VsbFJhdGlvID0gMTtcblxuICAvKipcbiAgICogVGhlIHZhbHVlIGluIHRoZSB0YWJsZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRvZGF5LlxuICAgKi9cbiAgQElucHV0KClcbiAgdG9kYXlWYWx1ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgdmFsdWUgaW4gdGhlIHRhYmxlIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2VsZWN0ZWRWYWx1ZXM6IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBpY2tlciBzZWxlY3QgbW9kZVxuICAgKi9cbiAgQElucHV0KClcbiAgc2VsZWN0TW9kZTogU2VsZWN0TW9kZTtcblxuICAvKipcbiAgICogRW1pdCB3aGVuIGEgY2FsZW5kYXIgY2VsbCBpcyBzZWxlY3RlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyByZWFkb25seSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyQ2VsbD4oKTtcblxuICBnZXQgb3dsRFRDYWxlbmRhckJvZHlDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcbiAgfVxuXG4gIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcbiAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgfHxcbiAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxtUmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgcHVibGljIHNlbGVjdENlbGwoY2VsbDogQ2FsZW5kYXJDZWxsKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdChjZWxsKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0FjdGl2ZUNlbGwocm93SW5kZXg6IG51bWJlciwgY29sSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNlbGxOdW1iZXIgPSByb3dJbmRleCAqIHRoaXMubnVtQ29scyArIGNvbEluZGV4O1xuICAgIHJldHVybiBjZWxsTnVtYmVyID09PSB0aGlzLmFjdGl2ZUNlbGw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaXMgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBpc1NlbGVjdGVkKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWYWx1ZXMgfHwgdGhpcy5zZWxlY3RlZFZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgIGNvbnN0IGZyb21WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF07XG4gICAgICBjb25zdCB0b1ZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1sxXTtcblxuICAgICAgcmV0dXJuIHZhbHVlID09PSBmcm9tVmFsdWUgfHwgdmFsdWUgPT09IHRvVmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgY2VsbCBpbiB0aGUgcmFuZ2VcbiAgICovXG4gIHB1YmxpYyBpc0luUmFuZ2UodmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgIGNvbnN0IGZyb21WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF07XG4gICAgICBjb25zdCB0b1ZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1sxXTtcblxuICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gbnVsbCAmJiB0b1ZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA+PSBmcm9tVmFsdWUgJiYgdmFsdWUgPD0gdG9WYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gZnJvbVZhbHVlIHx8IHZhbHVlID09PSB0b1ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaXMgdGhlIHJhbmdlIGZyb21cbiAgICovXG4gIHB1YmxpYyBpc1JhbmdlRnJvbSh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB8IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgIGNvbnN0IGZyb21WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF07XG4gICAgICByZXR1cm4gZnJvbVZhbHVlICE9PSBudWxsICYmIHZhbHVlID09PSBmcm9tVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBjZWxsIGlzIHRoZSByYW5nZSB0b1xuICAgKi9cbiAgcHVibGljIGlzUmFuZ2VUbyh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB8IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgIGNvbnN0IHRvVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzFdO1xuICAgICAgcmV0dXJuIHRvVmFsdWUgIT09IG51bGwgJiYgdmFsdWUgPT09IHRvVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIHRvIGEgYWN0aXZlIGNlbGxcbiAgICovXG4gIHB1YmxpYyBmb2N1c0FjdGl2ZUNlbGwoKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bC1kdC1jYWxlbmRhci1jZWxsLWFjdGl2ZScpLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCI8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiByb3dzOyBsZXQgcm93SW5kZXggPSBpbmRleFwiIHJvbGU9XCJyb3dcIj5cbiAgPHRkXG4gICAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygcm93OyBsZXQgY29sSW5kZXggPSBpbmRleFwiXG4gICAgY2xhc3M9XCJvd2wtZHQtY2FsZW5kYXItY2VsbCB7eyBpdGVtLmNlbGxDbGFzcyB9fVwiXG4gICAgW3RhYmluZGV4XT1cImlzQWN0aXZlQ2VsbChyb3dJbmRleCwgY29sSW5kZXgpID8gMCA6IC0xXCJcbiAgICBbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLWNlbGwtYWN0aXZlXT1cImlzQWN0aXZlQ2VsbChyb3dJbmRleCwgY29sSW5kZXgpXCJcbiAgICBbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLWNlbGwtZGlzYWJsZWRdPVwiIWl0ZW0uZW5hYmxlZFwiXG4gICAgW2NsYXNzLm93bC1kdC1jYWxlbmRhci1jZWxsLWluLXJhbmdlXT1cImlzSW5SYW5nZShpdGVtLnZhbHVlKVwiXG4gICAgW2NsYXNzLm93bC1kdC1jYWxlbmRhci1jZWxsLXJhbmdlLWZyb21dPVwiaXNSYW5nZUZyb20oaXRlbS52YWx1ZSlcIlxuICAgIFtjbGFzcy5vd2wtZHQtY2FsZW5kYXItY2VsbC1yYW5nZS10b109XCJpc1JhbmdlVG8oaXRlbS52YWx1ZSlcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaXRlbS5hcmlhTGFiZWxcIlxuICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiIWl0ZW0uZW5hYmxlZCB8fCBudWxsXCJcbiAgICBbc3R5bGUud2lkdGguJV09XCIxMDAgLyBudW1Db2xzXCJcbiAgICBbc3R5bGUucGFkZGluZ1RvcC4lXT1cIig1MCAqIGNlbGxSYXRpbykgLyBudW1Db2xzXCJcbiAgICBbc3R5bGUucGFkZGluZ0JvdHRvbS4lXT1cIig1MCAqIGNlbGxSYXRpbykgLyBudW1Db2xzXCJcbiAgICAoY2xpY2spPVwic2VsZWN0Q2VsbChpdGVtKVwiXG4gID5cbiAgICA8c3BhblxuICAgICAgY2xhc3M9XCJvd2wtZHQtY2FsZW5kYXItY2VsbC1jb250ZW50XCJcbiAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgJ293bC1kdC1jYWxlbmRhci1jZWxsLW91dCc6IGl0ZW0ub3V0LFxuICAgICAgICAnb3dsLWR0LWNhbGVuZGFyLWNlbGwtdG9kYXknOiBpdGVtLnZhbHVlID09PSB0b2RheVZhbHVlLFxuICAgICAgICAnb3dsLWR0LWNhbGVuZGFyLWNlbGwtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkKGl0ZW0udmFsdWUpXG4gICAgICB9XCJcbiAgICA+XG4gICAgICB7eyBpdGVtLmRpc3BsYXlWYWx1ZSB9fVxuICAgIDwvc3Bhbj5cbiAgPC90ZD5cbjwvdHI+XG4iXX0=