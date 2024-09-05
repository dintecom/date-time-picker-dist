import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW, } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { OWL_DATE_TIME_FORMATS } from '../adapter/date-time-format.class';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import * as i0 from "@angular/core";
import * as i1 from "../adapter/date-time-adapter.class";
import * as i2 from "./calendar-body.component";
const MONTHS_PER_YEAR = 12;
const MONTHS_PER_ROW = 3;
export class OwlYearViewComponent {
    constructor(cdRef, dateTimeAdapter, dateTimeFormats) {
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * The select mode of the picker;
         */
        this._selectMode = 'single';
        this._selecteds = [];
        this.localeSub = Subscription.EMPTY;
        this.initiated = false;
        /**
         * An array to hold all selectedDates' month value
         * the value is the month number in current year
         */
        this.selectedMonths = [];
        /**
         * Callback to invoke when a new month is selected
         */
        this.change = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         */
        this.monthSelected = new EventEmitter();
        /** Emits when any date is activated. */
        this.pickerMomentChange = new EventEmitter();
        /** Emits when use keyboard enter to select a calendar cell */
        this.keyboardEnter = new EventEmitter();
        this.monthNames = this.dateTimeAdapter.getMonthNames('short');
    }
    get selectMode() {
        return this._selectMode;
    }
    set selectMode(val) {
        this._selectMode = val;
        if (this.initiated) {
            this.generateMonthList();
            this.cdRef.markForCheck();
        }
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._selected = this.getValidDate(value);
        this.setSelectedMonths();
    }
    get selecteds() {
        return this._selecteds;
    }
    set selecteds(values) {
        this._selecteds = [];
        values.forEach(value => {
            const deserializedValue = this.dateTimeAdapter.deserialize(value);
            this._selecteds.push(this.getValidDate(deserializedValue));
        });
        this.setSelectedMonths();
    }
    get pickerMoment() {
        return this._pickerMoment;
    }
    set pickerMoment(value) {
        const oldMoment = this._pickerMoment;
        value = this.dateTimeAdapter.deserialize(value);
        this._pickerMoment = this.getValidDate(value) || this.dateTimeAdapter.now();
        if (!this.hasSameYear(oldMoment, this._pickerMoment) && this.initiated) {
            this.generateMonthList();
        }
    }
    get dateFilter() {
        return this._dateFilter;
    }
    set dateFilter(filter) {
        this._dateFilter = filter;
        if (this.initiated) {
            this.generateMonthList();
        }
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._minDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateMonthList();
        }
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._maxDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateMonthList();
        }
    }
    get months() {
        return this._months;
    }
    get activeCell() {
        if (this._pickerMoment) {
            return this.dateTimeAdapter.getMonth(this._pickerMoment);
        }
        return null;
    }
    get isInSingleMode() {
        return this.selectMode === 'single';
    }
    get isInRangeMode() {
        return (this.selectMode === 'range' ||
            this.selectMode === 'rangeFrom' ||
            this.selectMode === 'rangeTo');
    }
    get owlDTCalendarView() {
        return true;
    }
    ngOnInit() {
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(() => {
            this.generateMonthList();
            this.cdRef.markForCheck();
        });
    }
    ngAfterContentInit() {
        this.generateMonthList();
        this.initiated = true;
    }
    ngOnDestroy() {
        this.localeSub.unsubscribe();
    }
    /**
     * Handle a calendarCell selected
     */
    selectCalendarCell(cell) {
        this.selectMonth(cell.value);
    }
    /**
     * Handle a new month selected
     */
    selectMonth(month) {
        const firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        this.monthSelected.emit(firstDateOfMonth);
        const daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
        const result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.change.emit(result);
    }
    /**
     * Handle keydown event on calendar body
     */
    handleCalendarKeydown(event) {
        let moment;
        switch (event.keyCode) {
            // minus 1 month
            case LEFT_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 month
            case RIGHT_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 3 months
            case UP_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -3);
                this.pickerMomentChange.emit(moment);
                break;
            // add 3 months
            case DOWN_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 3);
                this.pickerMomentChange.emit(moment);
                break;
            // move to first month of current year
            case HOME:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // move to last month of current year
            case END:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 11 - this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 year (or 10 year)
            case PAGE_UP:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? -10 : -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 year (or 10 year)
            case PAGE_DOWN:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? 10 : 1);
                this.pickerMomentChange.emit(moment);
                break;
            // Select current month
            case ENTER:
                this.selectMonth(this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.keyboardEnter.emit();
                break;
            default:
                return;
        }
        this.focusActiveCell();
        event.preventDefault();
    }
    /**
     * Generate the calendar month list
     */
    generateMonthList() {
        if (!this.pickerMoment) {
            return;
        }
        this.setSelectedMonths();
        this.todayMonth = this.getMonthInCurrentYear(this.dateTimeAdapter.now());
        this._months = [];
        for (let i = 0; i < MONTHS_PER_YEAR / MONTHS_PER_ROW; i++) {
            const row = [];
            for (let j = 0; j < MONTHS_PER_ROW; j++) {
                const month = j + i * MONTHS_PER_ROW;
                const monthCell = this.createMonthCell(month);
                row.push(monthCell);
            }
            this._months.push(row);
        }
        return;
    }
    /**
     * Creates an CalendarCell for the given month.
     */
    createMonthCell(month) {
        const startDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        const ariaLabel = this.dateTimeAdapter.format(startDateOfMonth, this.dateTimeFormats.display.monthYearA11yLabel);
        const cellClass = 'owl-dt-month-' + month;
        return new CalendarCell(month, this.monthNames[month], ariaLabel, this.isMonthEnabled(month), false, cellClass);
    }
    /**
     * Check if the given month is enable
     */
    isMonthEnabled(month) {
        const firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        // If any date in the month is selectable,
        // we count the month as enable
        for (let date = firstDateOfMonth; this.dateTimeAdapter.getMonth(date) === month; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
            if (!!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate || this.dateTimeAdapter.compareDate(date, this.minDate) >= 0) &&
                (!this.maxDate || this.dateTimeAdapter.compareDate(date, this.maxDate) <= 0)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    getMonthInCurrentYear(date) {
        if (this.getValidDate(date) && this.getValidDate(this._pickerMoment)) {
            const result = this.dateTimeAdapter.getYear(date) - this.dateTimeAdapter.getYear(this.pickerMoment);
            // < 0 : the given date's year is before pickerMoment's year, we return -1 as selected month value.
            // > 0 : the given date's year is after pickerMoment's year, we return 12 as selected month value.
            // 0 : the give date's year is same as the pickerMoment's year, we return the actual month value.
            if (result < 0) {
                return -1;
            }
            else if (result > 0) {
                return 12;
            }
            else {
                return this.dateTimeAdapter.getMonth(date);
            }
        }
        else {
            return null;
        }
    }
    /**
     * Set the selectedMonths value
     * In single mode, it has only one value which represent the month the selected date in
     * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
     */
    setSelectedMonths() {
        this.selectedMonths = [];
        if (this.isInSingleMode && this.selected) {
            this.selectedMonths[0] = this.getMonthInCurrentYear(this.selected);
        }
        if (this.isInRangeMode && this.selecteds) {
            this.selectedMonths[0] = this.getMonthInCurrentYear(this.selecteds[0]);
            this.selectedMonths[1] = this.getMonthInCurrentYear(this.selecteds[1]);
        }
    }
    /**
     * Check the given dates are in the same year
     */
    hasSameYear(dateLeft, dateRight) {
        return !!(dateLeft &&
            dateRight &&
            this.dateTimeAdapter.getYear(dateLeft) === this.dateTimeAdapter.getYear(dateRight));
    }
    /**
     * Get a valid date object
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
    focusActiveCell() {
        this.calendarBodyElm.focusActiveCell();
    }
}
OwlYearViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlYearViewComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OwlYearViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: OwlYearViewComponent, selector: "owl-date-time-year-view", inputs: { selectMode: "selectMode", selected: "selected", selecteds: "selecteds", pickerMoment: "pickerMoment", dateFilter: "dateFilter", minDate: "minDate", maxDate: "maxDate" }, outputs: { change: "change", monthSelected: "monthSelected", pickerMomentChange: "pickerMomentChange", keyboardEnter: "keyboardEnter" }, host: { properties: { "class.owl-dt-calendar-view": "owlDTCalendarView" } }, viewQueries: [{ propertyName: "calendarBodyElm", first: true, predicate: OwlCalendarBodyComponent, descendants: true, static: true }], exportAs: ["owlMonthView"], ngImport: i0, template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-year-table\">\n  <thead class=\"owl-dt-calendar-header\">\n    <tr>\n      <th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"3\"></th>\n    </tr>\n  </thead>\n  <tbody\n    owl-date-time-calendar-body\n    role=\"grid\"\n    [rows]=\"months\"\n    [numCols]=\"3\"\n    [cellRatio]=\"3 / 7\"\n    [activeCell]=\"activeCell\"\n    [todayValue]=\"todayMonth\"\n    [selectedValues]=\"selectedMonths\"\n    [selectMode]=\"selectMode\"\n    (keydown)=\"handleCalendarKeydown($event)\"\n    (select)=\"selectCalendarCell($event)\"\n  ></tbody>\n</table>\n", dependencies: [{ kind: "component", type: i2.OwlCalendarBodyComponent, selector: "[owl-date-time-calendar-body]", inputs: ["activeCell", "rows", "numCols", "cellRatio", "todayValue", "selectedValues", "selectMode"], outputs: ["select"], exportAs: ["owlDateTimeCalendarBody"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlYearViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'owl-date-time-year-view', exportAs: 'owlMonthView', host: {
                        '[class.owl-dt-calendar-view]': 'owlDTCalendarView',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-year-table\">\n  <thead class=\"owl-dt-calendar-header\">\n    <tr>\n      <th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"3\"></th>\n    </tr>\n  </thead>\n  <tbody\n    owl-date-time-calendar-body\n    role=\"grid\"\n    [rows]=\"months\"\n    [numCols]=\"3\"\n    [cellRatio]=\"3 / 7\"\n    [activeCell]=\"activeCell\"\n    [todayValue]=\"todayMonth\"\n    [selectedValues]=\"selectedMonths\"\n    [selectMode]=\"selectMode\"\n    (keydown)=\"handleCalendarKeydown($event)\"\n    (select)=\"selectCalendarCell($event)\"\n  ></tbody>\n</table>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DateTimeAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [OWL_DATE_TIME_FORMATS]
                }] }]; }, propDecorators: { selectMode: [{
                type: Input
            }], selected: [{
                type: Input
            }], selecteds: [{
                type: Input
            }], pickerMoment: [{
                type: Input
            }], dateFilter: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], change: [{
                type: Output
            }], monthSelected: [{
                type: Output
            }], pickerMomentChange: [{
                type: Output
            }], keyboardEnter: [{
                type: Output
            }], calendarBodyElm: [{
                type: ViewChild,
                args: [OwlCalendarBodyComponent, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL2NhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEdBQ1QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBc0IscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RixPQUFPLEVBQUUsWUFBWSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFHbkYsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQztBQVl6QixNQUFNLE9BQU8sb0JBQW9CO0lBK0svQixZQUNVLEtBQXdCLEVBQ1osZUFBbUMsRUFHL0MsZUFBbUM7UUFKbkMsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBbkw3Qzs7V0FFRztRQUNLLGdCQUFXLEdBQWUsUUFBUSxDQUFD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RSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBET1dOX0FSUk9XLFxuICBFTkQsXG4gIEVOVEVSLFxuICBIT01FLFxuICBMRUZUX0FSUk9XLFxuICBQQUdFX0RPV04sXG4gIFBBR0VfVVAsXG4gIFJJR0hUX0FSUk9XLFxuICBVUF9BUlJPVyxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IE93bERhdGVUaW1lRm9ybWF0cywgT1dMX0RBVEVfVElNRV9GT1JNQVRTIH0gZnJvbSAnLi4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcbmltcG9ydCB7IENhbGVuZGFyQ2VsbCwgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RNb2RlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuXG5jb25zdCBNT05USFNfUEVSX1lFQVIgPSAxMjtcbmNvbnN0IE1PTlRIU19QRVJfUk9XID0gMztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS15ZWFyLXZpZXcnLFxuICBleHBvcnRBczogJ293bE1vbnRoVmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLXZpZXddJzogJ293bERUQ2FsZW5kYXJWaWV3JyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE93bFllYXJWaWV3Q29tcG9uZW50PFQ+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIHNlbGVjdCBtb2RlIG9mIHRoZSBwaWNrZXI7XG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3RNb2RlOiBTZWxlY3RNb2RlID0gJ3NpbmdsZSc7XG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlO1xuICB9XG5cbiAgc2V0IHNlbGVjdE1vZGUodmFsOiBTZWxlY3RNb2RlKSB7XG4gICAgdGhpcy5fc2VsZWN0TW9kZSA9IHZhbDtcbiAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFQgfCBudWxsO1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICB0aGlzLnNldFNlbGVjdGVkTW9udGhzKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWRzKCk6IFRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkcztcbiAgfVxuXG4gIHNldCBzZWxlY3RlZHModmFsdWVzOiBUW10pIHtcbiAgICB0aGlzLl9zZWxlY3RlZHMgPSBbXTtcbiAgICB2YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBjb25zdCBkZXNlcmlhbGl6ZWRWYWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkcy5wdXNoKHRoaXMuZ2V0VmFsaWREYXRlKGRlc2VyaWFsaXplZFZhbHVlKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldFNlbGVjdGVkTW9udGhzKCk7XG4gIH1cblxuICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQgfCBudWxsO1xuICBASW5wdXQoKVxuICBnZXQgcGlja2VyTW9tZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9waWNrZXJNb21lbnQ7XG4gIH1cblxuICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XG4gICAgY29uc3Qgb2xkTW9tZW50ID0gdGhpcy5fcGlja2VyTW9tZW50O1xuICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIHRoaXMuX3BpY2tlck1vbWVudCA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcblxuICAgIGlmICghdGhpcy5oYXNTYW1lWWVhcihvbGRNb21lbnQsIHRoaXMuX3BpY2tlck1vbWVudCkgJiYgdGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZVxuICAgKi9cbiAgcHJpdmF0ZSBfZGF0ZUZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGdldCBkYXRlRmlsdGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRlRmlsdGVyO1xuICB9XG5cbiAgc2V0IGRhdGVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogVCkgPT4gYm9vbGVhbikge1xuICAgIHRoaXMuX2RhdGVGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlTW9udGhMaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfbWluRGF0ZTogVCB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIGdldCBtaW5EYXRlKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgfVxuXG4gIHNldCBtaW5EYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlTW9udGhMaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfbWF4RGF0ZTogVCB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIGdldCBtYXhEYXRlKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgfVxuXG4gIHNldCBtYXhEYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIHRoaXMuX21heERhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlTW9udGhMaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWFkb25seSBtb250aE5hbWVzOiBzdHJpbmdbXTtcblxuICBwcml2YXRlIF9tb250aHM6IENhbGVuZGFyQ2VsbFtdW107XG4gIGdldCBtb250aHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vbnRocztcbiAgfVxuXG4gIGdldCBhY3RpdmVDZWxsKCk6IG51bWJlciB8IG51bGwge1xuICAgIGlmICh0aGlzLl9waWNrZXJNb21lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLl9waWNrZXJNb21lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcbiAgfVxuXG4gIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcbiAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgfHxcbiAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9jYWxlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBpbml0aWF0ZWQgPSBmYWxzZTtcblxuICBwdWJsaWMgdG9kYXlNb250aDogbnVtYmVyIHwgbnVsbDtcblxuICAvKipcbiAgICogQW4gYXJyYXkgdG8gaG9sZCBhbGwgc2VsZWN0ZWREYXRlcycgbW9udGggdmFsdWVcbiAgICogdGhlIHZhbHVlIGlzIHRoZSBtb250aCBudW1iZXIgaW4gY3VycmVudCB5ZWFyXG4gICAqL1xuICBwdWJsaWMgc2VsZWN0ZWRNb250aHM6IG51bWJlcltdID0gW107XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgbmV3IG1vbnRoIGlzIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhci4gVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlXG4gICAqL1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgbW9udGhTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBhY3RpdmF0ZWQuICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBwaWNrZXJNb21lbnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxUPiA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAvKiogRW1pdHMgd2hlbiB1c2Uga2V5Ym9hcmQgZW50ZXIgdG8gc2VsZWN0IGEgY2FsZW5kYXIgY2VsbCAqL1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkga2V5Ym9hcmRFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cbiAgQFZpZXdDaGlsZChPd2xDYWxlbmRhckJvZHlDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pXG4gIGNhbGVuZGFyQm9keUVsbTogT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50O1xuXG4gIGdldCBvd2xEVENhbGVuZGFyVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcbiAgICBwcml2YXRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzLFxuICApIHtcbiAgICB0aGlzLm1vbnRoTmFtZXMgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aE5hbWVzKCdzaG9ydCcpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9jYWxlU3ViID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIubG9jYWxlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xuICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmxvY2FsZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBhIGNhbGVuZGFyQ2VsbCBzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIHNlbGVjdENhbGVuZGFyQ2VsbChjZWxsOiBDYWxlbmRhckNlbGwpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdE1vbnRoKGNlbGwudmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBhIG5ldyBtb250aCBzZWxlY3RlZFxuICAgKi9cbiAgcHJpdmF0ZSBzZWxlY3RNb250aChtb250aDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZmlyc3REYXRlT2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIG1vbnRoLFxuICAgICAgMSxcbiAgICApO1xuXG4gICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQoZmlyc3REYXRlT2ZNb250aCk7XG5cbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKGZpcnN0RGF0ZU9mTW9udGgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIG1vbnRoLFxuICAgICAgTWF0aC5taW4oZGF5c0luTW9udGgsIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpKSxcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgKTtcblxuICAgIHRoaXMuY2hhbmdlLmVtaXQocmVzdWx0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUga2V5ZG93biBldmVudCBvbiBjYWxlbmRhciBib2R5XG4gICAqL1xuICBwdWJsaWMgaGFuZGxlQ2FsZW5kYXJLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgbGV0IG1vbWVudDtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIC8vIG1pbnVzIDEgbW9udGhcbiAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5waWNrZXJNb21lbnQsIC0xKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gYWRkIDEgbW9udGhcbiAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMucGlja2VyTW9tZW50LCAxKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gbWludXMgMyBtb250aHNcbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMucGlja2VyTW9tZW50LCAtMyk7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIGFkZCAzIG1vbnRoc1xuICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLnBpY2tlck1vbWVudCwgMyk7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIG1vdmUgdG8gZmlyc3QgbW9udGggb2YgY3VycmVudCB5ZWFyXG4gICAgICBjYXNlIEhPTUU6XG4gICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKFxuICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgIC10aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIG1vdmUgdG8gbGFzdCBtb250aCBvZiBjdXJyZW50IHllYXJcbiAgICAgIGNhc2UgRU5EOlxuICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAxMSAtIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gbWludXMgMSB5ZWFyIChvciAxMCB5ZWFyKVxuICAgICAgY2FzZSBQQUdFX1VQOlxuICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMucGlja2VyTW9tZW50LCBldmVudC5hbHRLZXkgPyAtMTAgOiAtMSk7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIGFkZCAxIHllYXIgKG9yIDEwIHllYXIpXG4gICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLnBpY2tlck1vbWVudCwgZXZlbnQuYWx0S2V5ID8gMTAgOiAxKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gU2VsZWN0IGN1cnJlbnQgbW9udGhcbiAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIHRoaXMuc2VsZWN0TW9udGgodGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5waWNrZXJNb21lbnQpKTtcbiAgICAgICAgdGhpcy5rZXlib2FyZEVudGVyLmVtaXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHRoZSBjYWxlbmRhciBtb250aCBsaXN0XG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlTW9udGhMaXN0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5waWNrZXJNb21lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldFNlbGVjdGVkTW9udGhzKCk7XG4gICAgdGhpcy50b2RheU1vbnRoID0gdGhpcy5nZXRNb250aEluQ3VycmVudFllYXIodGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCkpO1xuXG4gICAgdGhpcy5fbW9udGhzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNT05USFNfUEVSX1lFQVIgLyBNT05USFNfUEVSX1JPVzsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBNT05USFNfUEVSX1JPVzsgaisrKSB7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gaiArIGkgKiBNT05USFNfUEVSX1JPVztcbiAgICAgICAgY29uc3QgbW9udGhDZWxsID0gdGhpcy5jcmVhdGVNb250aENlbGwobW9udGgpO1xuICAgICAgICByb3cucHVzaChtb250aENlbGwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9tb250aHMucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIENhbGVuZGFyQ2VsbCBmb3IgdGhlIGdpdmVuIG1vbnRoLlxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVNb250aENlbGwobW9udGg6IG51bWJlcik6IENhbGVuZGFyQ2VsbCB7XG4gICAgY29uc3Qgc3RhcnREYXRlT2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIG1vbnRoLFxuICAgICAgMSxcbiAgICApO1xuICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcbiAgICAgIHN0YXJ0RGF0ZU9mTW9udGgsXG4gICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5kaXNwbGF5Lm1vbnRoWWVhckExMXlMYWJlbCxcbiAgICApO1xuICAgIGNvbnN0IGNlbGxDbGFzcyA9ICdvd2wtZHQtbW9udGgtJyArIG1vbnRoO1xuICAgIHJldHVybiBuZXcgQ2FsZW5kYXJDZWxsKFxuICAgICAgbW9udGgsXG4gICAgICB0aGlzLm1vbnRoTmFtZXNbbW9udGhdLFxuICAgICAgYXJpYUxhYmVsLFxuICAgICAgdGhpcy5pc01vbnRoRW5hYmxlZChtb250aCksXG4gICAgICBmYWxzZSxcbiAgICAgIGNlbGxDbGFzcyxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBnaXZlbiBtb250aCBpcyBlbmFibGVcbiAgICovXG4gIHByaXZhdGUgaXNNb250aEVuYWJsZWQobW9udGg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICBtb250aCxcbiAgICAgIDEsXG4gICAgKTtcblxuICAgIC8vIElmIGFueSBkYXRlIGluIHRoZSBtb250aCBpcyBzZWxlY3RhYmxlLFxuICAgIC8vIHdlIGNvdW50IHRoZSBtb250aCBhcyBlbmFibGVcbiAgICBmb3IgKFxuICAgICAgbGV0IGRhdGUgPSBmaXJzdERhdGVPZk1vbnRoO1xuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZSkgPT09IG1vbnRoO1xuICAgICAgZGF0ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhkYXRlLCAxKVxuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICAhIWRhdGUgJiZcbiAgICAgICAgKCF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUpKSAmJlxuICAgICAgICAoIXRoaXMubWluRGF0ZSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlRGF0ZShkYXRlLCB0aGlzLm1pbkRhdGUpID49IDApICYmXG4gICAgICAgICghdGhpcy5tYXhEYXRlIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGUsIHRoaXMubWF4RGF0ZSkgPD0gMClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbW9udGggaW4gdGhpcyB5ZWFyIHRoYXQgdGhlIGdpdmVuIERhdGUgZmFsbHMgb24uXG4gICAqIFJldHVybnMgbnVsbCBpZiB0aGUgZ2l2ZW4gRGF0ZSBpcyBpbiBhbm90aGVyIHllYXIuXG4gICAqL1xuICBwcml2YXRlIGdldE1vbnRoSW5DdXJyZW50WWVhcihkYXRlOiBUIHwgbnVsbCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuZ2V0VmFsaWREYXRlKGRhdGUpICYmIHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuX3BpY2tlck1vbWVudCkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9XG4gICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZSkgLSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KTtcblxuICAgICAgLy8gPCAwIDogdGhlIGdpdmVuIGRhdGUncyB5ZWFyIGlzIGJlZm9yZSBwaWNrZXJNb21lbnQncyB5ZWFyLCB3ZSByZXR1cm4gLTEgYXMgc2VsZWN0ZWQgbW9udGggdmFsdWUuXG4gICAgICAvLyA+IDAgOiB0aGUgZ2l2ZW4gZGF0ZSdzIHllYXIgaXMgYWZ0ZXIgcGlja2VyTW9tZW50J3MgeWVhciwgd2UgcmV0dXJuIDEyIGFzIHNlbGVjdGVkIG1vbnRoIHZhbHVlLlxuICAgICAgLy8gMCA6IHRoZSBnaXZlIGRhdGUncyB5ZWFyIGlzIHNhbWUgYXMgdGhlIHBpY2tlck1vbWVudCdzIHllYXIsIHdlIHJldHVybiB0aGUgYWN0dWFsIG1vbnRoIHZhbHVlLlxuICAgICAgaWYgKHJlc3VsdCA8IDApIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPiAwKSB7XG4gICAgICAgIHJldHVybiAxMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgc2VsZWN0ZWRNb250aHMgdmFsdWVcbiAgICogSW4gc2luZ2xlIG1vZGUsIGl0IGhhcyBvbmx5IG9uZSB2YWx1ZSB3aGljaCByZXByZXNlbnQgdGhlIG1vbnRoIHRoZSBzZWxlY3RlZCBkYXRlIGluXG4gICAqIEluIHJhbmdlIG1vZGUsIGl0IHdvdWxkIGhhcyB0d28gdmFsdWVzLCBvbmUgZm9yIHRoZSBtb250aCB0aGUgZnJvbVZhbHVlIGluIGFuZCB0aGUgb3RoZXIgZm9yIHRoZSBtb250aCB0aGUgdG9WYWx1ZSBpblxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZWxlY3RlZE1vbnRocygpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkTW9udGhzID0gW107XG4gICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUgJiYgdGhpcy5zZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoc1swXSA9IHRoaXMuZ2V0TW9udGhJbkN1cnJlbnRZZWFyKHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUgJiYgdGhpcy5zZWxlY3RlZHMpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRNb250aHNbMF0gPSB0aGlzLmdldE1vbnRoSW5DdXJyZW50WWVhcih0aGlzLnNlbGVjdGVkc1swXSk7XG4gICAgICB0aGlzLnNlbGVjdGVkTW9udGhzWzFdID0gdGhpcy5nZXRNb250aEluQ3VycmVudFllYXIodGhpcy5zZWxlY3RlZHNbMV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0aGUgZ2l2ZW4gZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHllYXJcbiAgICovXG4gIHByaXZhdGUgaGFzU2FtZVllYXIoZGF0ZUxlZnQ6IFQsIGRhdGVSaWdodDogVCkge1xuICAgIHJldHVybiAhIShcbiAgICAgIGRhdGVMZWZ0ICYmXG4gICAgICBkYXRlUmlnaHQgJiZcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZUxlZnQpID09PSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGVSaWdodClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XG4gICAqL1xuICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgID8gb2JqXG4gICAgICA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICB0aGlzLmNhbGVuZGFyQm9keUVsbS5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgfVxufVxuIiwiPHRhYmxlIGNsYXNzPVwib3dsLWR0LWNhbGVuZGFyLXRhYmxlIG93bC1kdC1jYWxlbmRhci15ZWFyLXRhYmxlXCI+XG4gIDx0aGVhZCBjbGFzcz1cIm93bC1kdC1jYWxlbmRhci1oZWFkZXJcIj5cbiAgICA8dHI+XG4gICAgICA8dGggY2xhc3M9XCJvd2wtZHQtY2FsZW5kYXItdGFibGUtZGl2aWRlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNvbHNwYW49XCIzXCI+PC90aD5cbiAgICA8L3RyPlxuICA8L3RoZWFkPlxuICA8dGJvZHlcbiAgICBvd2wtZGF0ZS10aW1lLWNhbGVuZGFyLWJvZHlcbiAgICByb2xlPVwiZ3JpZFwiXG4gICAgW3Jvd3NdPVwibW9udGhzXCJcbiAgICBbbnVtQ29sc109XCIzXCJcbiAgICBbY2VsbFJhdGlvXT1cIjMgLyA3XCJcbiAgICBbYWN0aXZlQ2VsbF09XCJhY3RpdmVDZWxsXCJcbiAgICBbdG9kYXlWYWx1ZV09XCJ0b2RheU1vbnRoXCJcbiAgICBbc2VsZWN0ZWRWYWx1ZXNdPVwic2VsZWN0ZWRNb250aHNcIlxuICAgIFtzZWxlY3RNb2RlXT1cInNlbGVjdE1vZGVcIlxuICAgIChrZXlkb3duKT1cImhhbmRsZUNhbGVuZGFyS2V5ZG93bigkZXZlbnQpXCJcbiAgICAoc2VsZWN0KT1cInNlbGVjdENhbGVuZGFyQ2VsbCgkZXZlbnQpXCJcbiAgPjwvdGJvZHk+XG48L3RhYmxlPlxuIl19