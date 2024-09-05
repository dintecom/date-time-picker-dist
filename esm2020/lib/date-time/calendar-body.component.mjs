import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
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
                        '[class.owl-dt-calendar-body]': 'owlDTCalendarBodyClass',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvY2FsZW5kYXItYm9keS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvY2FsZW5kYXItYm9keS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUd0QyxNQUFNLE9BQU8sWUFBWTtJQUN2QixZQUNTLEtBQWEsRUFDYixZQUFvQixFQUNwQixTQUFpQixFQUNqQixPQUFnQixFQUNoQixNQUFlLEtBQUssRUFDcEIsWUFBb0IsRUFBRTtRQUx0QixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLFFBQUcsR0FBSCxHQUFHLENBQWlCO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQWE7SUFDNUIsQ0FBQztDQUNMO0FBWUQsTUFBTSxPQUFPLHdCQUF3QjtJQWlFbkMsWUFBb0IsTUFBa0IsRUFBVSxNQUFjO1FBQTFDLFdBQU0sR0FBTixNQUFNLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBaEU5RDs7V0FFRztRQUVILGVBQVUsR0FBRyxDQUFDLENBQUM7UUFRZjs7V0FFRztRQUVILFlBQU8sR0FBRyxDQUFDLENBQUM7UUFFWjs7V0FFRztRQUVILGNBQVMsR0FBRyxDQUFDLENBQUM7UUFvQmQ7O1dBRUc7UUFFYSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFrQk8sQ0FBQztJQWhCbEUsSUFBSSxzQkFBc0I7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUVELElBQUksYUFBYTtRQUNmLE9BQU8sQ0FDTCxJQUFJLENBQUMsVUFBVSxLQUFLLE9BQU87WUFDM0IsSUFBSSxDQUFDLFVBQVUsS0FBSyxXQUFXO1lBQy9CLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUM5QixDQUFDO0lBQ0osQ0FBQztJQUlNLFFBQVEsS0FBSSxDQUFDO0lBRWIsVUFBVSxDQUFDLElBQWtCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxZQUFZLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjtRQUNwRCxNQUFNLFVBQVUsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7UUFDdEQsT0FBTyxVQUFVLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxVQUFVLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixPQUFPLEtBQUssS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV2QyxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLE9BQU8sQ0FBQztTQUNqRDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0ksU0FBUyxDQUFDLEtBQWE7UUFDNUIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV2QyxJQUFJLFNBQVMsS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDMUMsT0FBTyxLQUFLLElBQUksU0FBUyxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUM7YUFDL0M7aUJBQU07Z0JBQ0wsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxPQUFPLENBQUM7YUFDakQ7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0ksV0FBVyxDQUFDLEtBQWE7UUFDOUIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsT0FBTyxTQUFTLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxTQUFTLENBQUMsS0FBYTtRQUM1QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxPQUFPLE9BQU8sS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLE9BQU8sQ0FBQztTQUM5QztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLGVBQWU7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2lCQUNqQixZQUFZLEVBQUU7aUJBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYixTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xGLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztxSEFwSlUsd0JBQXdCO3lHQUF4Qix3QkFBd0IsbVpDbENyQyx1c0NBNkJBOzJGREthLHdCQUF3QjtrQkFWcEMsU0FBUzsrQkFDRSwrQkFBK0IsWUFDL0IseUJBQXlCLFFBRzdCO3dCQUNKLDhCQUE4QixFQUFFLHdCQUF3QjtxQkFDekQsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU07c0hBTy9DLFVBQVU7c0JBRFQsS0FBSztnQkFPTixJQUFJO3NCQURILEtBQUs7Z0JBT04sT0FBTztzQkFETixLQUFLO2dCQU9OLFNBQVM7c0JBRFIsS0FBSztnQkFPTixVQUFVO3NCQURULEtBQUs7Z0JBT04sY0FBYztzQkFEYixLQUFLO2dCQU9OLFVBQVU7c0JBRFQsS0FBSztnQkFPVSxNQUFNO3NCQURyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQ2VsbCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyLFxuICAgIHB1YmxpYyBkaXNwbGF5VmFsdWU6IHN0cmluZyxcbiAgICBwdWJsaWMgYXJpYUxhYmVsOiBzdHJpbmcsXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4sXG4gICAgcHVibGljIG91dDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHB1YmxpYyBjZWxsQ2xhc3M6IHN0cmluZyA9ICcnLFxuICApIHt9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tvd2wtZGF0ZS10aW1lLWNhbGVuZGFyLWJvZHldJyxcbiAgZXhwb3J0QXM6ICdvd2xEYXRlVGltZUNhbGVuZGFyQm9keScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC5odG1sJyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci1ib2R5XSc6ICdvd2xEVENhbGVuZGFyQm9keUNsYXNzJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE93bENhbGVuZGFyQm9keUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8qKlxuICAgKiBUaGUgY2VsbCBudW1iZXIgb2YgdGhlIGFjdGl2ZSBjZWxsIGluIHRoZSB0YWJsZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGFjdGl2ZUNlbGwgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgY2VsbHMgdG8gZGlzcGxheSBpbiB0aGUgdGFibGUuXG4gICAqL1xuICBASW5wdXQoKVxuICByb3dzOiBDYWxlbmRhckNlbGxbXVtdO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIHRhYmxlLlxuICAgKi9cbiAgQElucHV0KClcbiAgbnVtQ29scyA9IDc7XG5cbiAgLyoqXG4gICAqIFRoZSByYXRpbyAod2lkdGggLyBoZWlnaHQpIHRvIHVzZSBmb3IgdGhlIGNlbGxzIGluIHRoZSB0YWJsZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGNlbGxSYXRpbyA9IDE7XG5cbiAgLyoqXG4gICAqIFRoZSB2YWx1ZSBpbiB0aGUgdGFibGUgdGhhdCBjb3JyZXNwb25kcyB0byB0b2RheS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHRvZGF5VmFsdWU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHZhbHVlIGluIHRoZSB0YWJsZSB0aGF0IGlzIGN1cnJlbnRseSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNlbGVjdGVkVmFsdWVzOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogQ3VycmVudCBwaWNrZXIgc2VsZWN0IG1vZGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNlbGVjdE1vZGU6IFNlbGVjdE1vZGU7XG5cbiAgLyoqXG4gICAqIEVtaXQgd2hlbiBhIGNhbGVuZGFyIGNlbGwgaXMgc2VsZWN0ZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckNlbGw+KCk7XG5cbiAgZ2V0IG93bERUQ2FsZW5kYXJCb2R5Q2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XG4gIH1cblxuICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XG4gICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJ1xuICAgICk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsbVJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge31cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7fVxuXG4gIHB1YmxpYyBzZWxlY3RDZWxsKGNlbGw6IENhbGVuZGFyQ2VsbCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoY2VsbCk7XG4gIH1cblxuICBwdWJsaWMgaXNBY3RpdmVDZWxsKHJvd0luZGV4OiBudW1iZXIsIGNvbEluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBjZWxsTnVtYmVyID0gcm93SW5kZXggKiB0aGlzLm51bUNvbHMgKyBjb2xJbmRleDtcbiAgICByZXR1cm4gY2VsbE51bWJlciA9PT0gdGhpcy5hY3RpdmVDZWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBjZWxsIGlzIHNlbGVjdGVkXG4gICAqL1xuICBwdWJsaWMgaXNTZWxlY3RlZCh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkVmFsdWVzIHx8IHRoaXMuc2VsZWN0ZWRWYWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gdGhpcy5zZWxlY3RlZFZhbHVlc1swXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xuICAgICAgY29uc3QgdG9WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMV07XG5cbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gZnJvbVZhbHVlIHx8IHZhbHVlID09PSB0b1ZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaW4gdGhlIHJhbmdlXG4gICAqL1xuICBwdWJsaWMgaXNJblJhbmdlKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xuICAgICAgY29uc3QgdG9WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMV07XG5cbiAgICAgIGlmIChmcm9tVmFsdWUgIT09IG51bGwgJiYgdG9WYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPj0gZnJvbVZhbHVlICYmIHZhbHVlIDw9IHRvVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IGZyb21WYWx1ZSB8fCB2YWx1ZSA9PT0gdG9WYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBjZWxsIGlzIHRoZSByYW5nZSBmcm9tXG4gICAqL1xuICBwdWJsaWMgaXNSYW5nZUZyb20odmFsdWU6IG51bWJlcik6IGJvb2xlYW4gfCB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xuICAgICAgcmV0dXJuIGZyb21WYWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSA9PT0gZnJvbVZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgY2VsbCBpcyB0aGUgcmFuZ2UgdG9cbiAgICovXG4gIHB1YmxpYyBpc1JhbmdlVG8odmFsdWU6IG51bWJlcik6IGJvb2xlYW4gfCB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICBjb25zdCB0b1ZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1sxXTtcbiAgICAgIHJldHVybiB0b1ZhbHVlICE9PSBudWxsICYmIHZhbHVlID09PSB0b1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1cyB0byBhIGFjdGl2ZSBjZWxsXG4gICAqL1xuICBwdWJsaWMgZm9jdXNBY3RpdmVDZWxsKCk6IHZvaWQge1xuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd2wtZHQtY2FsZW5kYXItY2VsbC1hY3RpdmUnKS5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPHRyICpuZ0Zvcj1cImxldCByb3cgb2Ygcm93czsgbGV0IHJvd0luZGV4ID0gaW5kZXhcIiByb2xlPVwicm93XCI+XG4gIDx0ZFxuICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJvdzsgbGV0IGNvbEluZGV4ID0gaW5kZXhcIlxuICAgIGNsYXNzPVwib3dsLWR0LWNhbGVuZGFyLWNlbGwge3sgaXRlbS5jZWxsQ2xhc3MgfX1cIlxuICAgIFt0YWJpbmRleF09XCJpc0FjdGl2ZUNlbGwocm93SW5kZXgsIGNvbEluZGV4KSA/IDAgOiAtMVwiXG4gICAgW2NsYXNzLm93bC1kdC1jYWxlbmRhci1jZWxsLWFjdGl2ZV09XCJpc0FjdGl2ZUNlbGwocm93SW5kZXgsIGNvbEluZGV4KVwiXG4gICAgW2NsYXNzLm93bC1kdC1jYWxlbmRhci1jZWxsLWRpc2FibGVkXT1cIiFpdGVtLmVuYWJsZWRcIlxuICAgIFtjbGFzcy5vd2wtZHQtY2FsZW5kYXItY2VsbC1pbi1yYW5nZV09XCJpc0luUmFuZ2UoaXRlbS52YWx1ZSlcIlxuICAgIFtjbGFzcy5vd2wtZHQtY2FsZW5kYXItY2VsbC1yYW5nZS1mcm9tXT1cImlzUmFuZ2VGcm9tKGl0ZW0udmFsdWUpXCJcbiAgICBbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLWNlbGwtcmFuZ2UtdG9dPVwiaXNSYW5nZVRvKGl0ZW0udmFsdWUpXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIml0ZW0uYXJpYUxhYmVsXCJcbiAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cIiFpdGVtLmVuYWJsZWQgfHwgbnVsbFwiXG4gICAgW3N0eWxlLndpZHRoLiVdPVwiMTAwIC8gbnVtQ29sc1wiXG4gICAgW3N0eWxlLnBhZGRpbmdUb3AuJV09XCIoNTAgKiBjZWxsUmF0aW8pIC8gbnVtQ29sc1wiXG4gICAgW3N0eWxlLnBhZGRpbmdCb3R0b20uJV09XCIoNTAgKiBjZWxsUmF0aW8pIC8gbnVtQ29sc1wiXG4gICAgKGNsaWNrKT1cInNlbGVjdENlbGwoaXRlbSlcIlxuICA+XG4gICAgPHNwYW5cbiAgICAgIGNsYXNzPVwib3dsLWR0LWNhbGVuZGFyLWNlbGwtY29udGVudFwiXG4gICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICdvd2wtZHQtY2FsZW5kYXItY2VsbC1vdXQnOiBpdGVtLm91dCxcbiAgICAgICAgJ293bC1kdC1jYWxlbmRhci1jZWxsLXRvZGF5JzogaXRlbS52YWx1ZSA9PT0gdG9kYXlWYWx1ZSxcbiAgICAgICAgJ293bC1kdC1jYWxlbmRhci1jZWxsLXNlbGVjdGVkJzogaXNTZWxlY3RlZChpdGVtLnZhbHVlKVxuICAgICAgfVwiXG4gICAgPlxuICAgICAge3sgaXRlbS5kaXNwbGF5VmFsdWUgfX1cbiAgICA8L3NwYW4+XG4gIDwvdGQ+XG48L3RyPlxuIl19