import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import { OWL_DATE_TIME_FORMATS } from '../adapter/date-time-format.class';
import { Subscription } from 'rxjs';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
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
                        '[class.owl-dt-calendar-view]': 'owlDTCalendarView'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL2NhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFzQixNQUFNLG1DQUFtQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUNMLFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsUUFBUSxFQUNULE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFFL0IsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQztBQVl6QixNQUFNLE9BQU8sb0JBQW9CO0lBK0svQixZQUNVLEtBQXdCLEVBQ1osZUFBbUMsRUFHL0MsZUFBbUM7UUFKbkMsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBbkw3Qzs7V0FFRztRQUNLLGdCQUFXLEdBQWUsUUFBUSxDQUFD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RSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDZWxsLCBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4uL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgT1dMX0RBVEVfVElNRV9GT1JNQVRTLCBPd2xEYXRlVGltZUZvcm1hdHMgfSBmcm9tICcuLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZWxlY3RNb2RlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuaW1wb3J0IHtcbiAgRE9XTl9BUlJPVyxcbiAgRU5ELFxuICBFTlRFUixcbiAgSE9NRSxcbiAgTEVGVF9BUlJPVyxcbiAgUEFHRV9ET1dOLFxuICBQQUdFX1VQLFxuICBSSUdIVF9BUlJPVyxcbiAgVVBfQVJST1dcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcblxuY29uc3QgTU9OVEhTX1BFUl9ZRUFSID0gMTI7XG5jb25zdCBNT05USFNfUEVSX1JPVyA9IDM7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUteWVhci12aWV3JyxcbiAgZXhwb3J0QXM6ICdvd2xNb250aFZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci12aWV3XSc6ICdvd2xEVENhbGVuZGFyVmlldydcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgT3dsWWVhclZpZXdDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgc2VsZWN0IG1vZGUgb2YgdGhlIHBpY2tlcjtcbiAgICovXG4gIHByaXZhdGUgX3NlbGVjdE1vZGU6IFNlbGVjdE1vZGUgPSAnc2luZ2xlJztcbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1vZGU7XG4gIH1cblxuICBzZXQgc2VsZWN0TW9kZSh2YWw6IFNlbGVjdE1vZGUpIHtcbiAgICB0aGlzLl9zZWxlY3RNb2RlID0gdmFsO1xuICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICBwcml2YXRlIF9zZWxlY3RlZDogVCB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZCgpOiBUIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuICAgIHRoaXMuc2V0U2VsZWN0ZWRNb250aHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZHMoKTogVFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkcyA9IFtdO1xuICAgIHZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplZFZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRzLnB1c2godGhpcy5nZXRWYWxpZERhdGUoZGVzZXJpYWxpemVkVmFsdWUpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0U2VsZWN0ZWRNb250aHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BpY2tlck1vbWVudDogVCB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIGdldCBwaWNrZXJNb21lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcbiAgfVxuXG4gIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcbiAgICBjb25zdCBvbGRNb21lbnQgPSB0aGlzLl9waWNrZXJNb21lbnQ7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fcGlja2VyTW9tZW50ID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xuXG4gICAgaWYgKCF0aGlzLmhhc1NhbWVZZWFyKG9sZE1vbWVudCwgdGhpcy5fcGlja2VyTW9tZW50KSAmJiB0aGlzLmluaXRpYXRlZCkge1xuICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlXG4gICAqL1xuICBwcml2YXRlIF9kYXRlRmlsdGVyOiAoZGF0ZTogVCkgPT4gYm9vbGVhbjtcbiAgQElucHV0KClcbiAgZ2V0IGRhdGVGaWx0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVGaWx0ZXI7XG4gIH1cblxuICBzZXQgZGF0ZUZpbHRlcihmaWx0ZXI6IChkYXRlOiBUKSA9PiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGF0ZUZpbHRlciA9IGZpbHRlcjtcbiAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICBwcml2YXRlIF9taW5EYXRlOiBUIHwgbnVsbDtcbiAgQElucHV0KClcbiAgZ2V0IG1pbkRhdGUoKTogVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICB9XG5cbiAgc2V0IG1pbkRhdGUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICBwcml2YXRlIF9tYXhEYXRlOiBUIHwgbnVsbDtcbiAgQElucHV0KClcbiAgZ2V0IG1heERhdGUoKTogVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICB9XG5cbiAgc2V0IG1heERhdGUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IG1vbnRoTmFtZXM6IHN0cmluZ1tdO1xuXG4gIHByaXZhdGUgX21vbnRoczogQ2FsZW5kYXJDZWxsW11bXTtcbiAgZ2V0IG1vbnRocygpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9udGhzO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZUNlbGwoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX3BpY2tlck1vbWVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMuX3BpY2tlck1vbWVudCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnO1xuICB9XG5cbiAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxuICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxuICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VUbydcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2NhbGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIGluaXRpYXRlZCA9IGZhbHNlO1xuXG4gIHB1YmxpYyB0b2RheU1vbnRoOiBudW1iZXIgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSB0byBob2xkIGFsbCBzZWxlY3RlZERhdGVzJyBtb250aCB2YWx1ZVxuICAgKiB0aGUgdmFsdWUgaXMgdGhlIG1vbnRoIG51bWJlciBpbiBjdXJyZW50IHllYXJcbiAgICovXG4gIHB1YmxpYyBzZWxlY3RlZE1vbnRoczogbnVtYmVyW10gPSBbXTtcblxuICAvKipcbiAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBuZXcgbW9udGggaXMgc2VsZWN0ZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBzZWxlY3RlZCB5ZWFyLiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGVcbiAgICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBtb250aFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHBpY2tlck1vbWVudENoYW5nZTogRXZlbnRFbWl0dGVyPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHVzZSBrZXlib2FyZCBlbnRlciB0byBzZWxlY3QgYSBjYWxlbmRhciBjZWxsICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBrZXlib2FyZEVudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qKiBUaGUgYm9keSBvZiBjYWxlbmRhciB0YWJsZSAqL1xuICBAVmlld0NoaWxkKE93bENhbGVuZGFyQm9keUNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgY2FsZW5kYXJCb2R5RWxtOiBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQ7XG5cbiAgZ2V0IG93bERUQ2FsZW5kYXJWaWV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxuICAgIHByaXZhdGUgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHNcbiAgKSB7XG4gICAgdGhpcy5tb250aE5hbWVzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGhOYW1lcygnc2hvcnQnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxvY2FsZVN1YiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmxvY2FsZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICB0aGlzLmluaXRpYXRlZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5sb2NhbGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgYSBjYWxlbmRhckNlbGwgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBzZWxlY3RDYWxlbmRhckNlbGwoY2VsbDogQ2FsZW5kYXJDZWxsKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RNb250aChjZWxsLnZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgYSBuZXcgbW9udGggc2VsZWN0ZWRcbiAgICovXG4gIHByaXZhdGUgc2VsZWN0TW9udGgobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICBtb250aCxcbiAgICAgIDFcbiAgICApO1xuXG4gICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQoZmlyc3REYXRlT2ZNb250aCk7XG5cbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKGZpcnN0RGF0ZU9mTW9udGgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIG1vbnRoLFxuICAgICAgTWF0aC5taW4oZGF5c0luTW9udGgsIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpKSxcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudClcbiAgICApO1xuXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChyZXN1bHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBrZXlkb3duIGV2ZW50IG9uIGNhbGVuZGFyIGJvZHlcbiAgICovXG4gIHB1YmxpYyBoYW5kbGVDYWxlbmRhcktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBsZXQgbW9tZW50O1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgLy8gbWludXMgMSBtb250aFxuICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLnBpY2tlck1vbWVudCwgLTEpO1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBhZGQgMSBtb250aFxuICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5waWNrZXJNb21lbnQsIDEpO1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBtaW51cyAzIG1vbnRoc1xuICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5waWNrZXJNb21lbnQsIC0zKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gYWRkIDMgbW9udGhzXG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMucGlja2VyTW9tZW50LCAzKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gbW92ZSB0byBmaXJzdCBtb250aCBvZiBjdXJyZW50IHllYXJcbiAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXG4gICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgLXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBtb3ZlIHRvIGxhc3QgbW9udGggb2YgY3VycmVudCB5ZWFyXG4gICAgICBjYXNlIEVORDpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXG4gICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgMTEgLSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnBpY2tlck1vbWVudClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gbWludXMgMSB5ZWFyIChvciAxMCB5ZWFyKVxuICAgICAgY2FzZSBQQUdFX1VQOlxuICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMucGlja2VyTW9tZW50LCBldmVudC5hbHRLZXkgPyAtMTAgOiAtMSk7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIGFkZCAxIHllYXIgKG9yIDEwIHllYXIpXG4gICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLnBpY2tlck1vbWVudCwgZXZlbnQuYWx0S2V5ID8gMTAgOiAxKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gU2VsZWN0IGN1cnJlbnQgbW9udGhcbiAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIHRoaXMuc2VsZWN0TW9udGgodGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5waWNrZXJNb21lbnQpKTtcbiAgICAgICAgdGhpcy5rZXlib2FyZEVudGVyLmVtaXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHRoZSBjYWxlbmRhciBtb250aCBsaXN0XG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlTW9udGhMaXN0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5waWNrZXJNb21lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldFNlbGVjdGVkTW9udGhzKCk7XG4gICAgdGhpcy50b2RheU1vbnRoID0gdGhpcy5nZXRNb250aEluQ3VycmVudFllYXIodGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCkpO1xuXG4gICAgdGhpcy5fbW9udGhzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNT05USFNfUEVSX1lFQVIgLyBNT05USFNfUEVSX1JPVzsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBNT05USFNfUEVSX1JPVzsgaisrKSB7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gaiArIGkgKiBNT05USFNfUEVSX1JPVztcbiAgICAgICAgY29uc3QgbW9udGhDZWxsID0gdGhpcy5jcmVhdGVNb250aENlbGwobW9udGgpO1xuICAgICAgICByb3cucHVzaChtb250aENlbGwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9tb250aHMucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIENhbGVuZGFyQ2VsbCBmb3IgdGhlIGdpdmVuIG1vbnRoLlxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVNb250aENlbGwobW9udGg6IG51bWJlcik6IENhbGVuZGFyQ2VsbCB7XG4gICAgY29uc3Qgc3RhcnREYXRlT2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgIG1vbnRoLFxuICAgICAgMVxuICAgICk7XG4gICAgY29uc3QgYXJpYUxhYmVsID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxuICAgICAgc3RhcnREYXRlT2ZNb250aCxcbiAgICAgIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLmRpc3BsYXkubW9udGhZZWFyQTExeUxhYmVsXG4gICAgKTtcbiAgICBjb25zdCBjZWxsQ2xhc3MgPSAnb3dsLWR0LW1vbnRoLScgKyBtb250aDtcbiAgICByZXR1cm4gbmV3IENhbGVuZGFyQ2VsbChcbiAgICAgIG1vbnRoLFxuICAgICAgdGhpcy5tb250aE5hbWVzW21vbnRoXSxcbiAgICAgIGFyaWFMYWJlbCxcbiAgICAgIHRoaXMuaXNNb250aEVuYWJsZWQobW9udGgpLFxuICAgICAgZmFsc2UsXG4gICAgICBjZWxsQ2xhc3NcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBnaXZlbiBtb250aCBpcyBlbmFibGVcbiAgICovXG4gIHByaXZhdGUgaXNNb250aEVuYWJsZWQobW9udGg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICBtb250aCxcbiAgICAgIDFcbiAgICApO1xuXG4gICAgLy8gSWYgYW55IGRhdGUgaW4gdGhlIG1vbnRoIGlzIHNlbGVjdGFibGUsXG4gICAgLy8gd2UgY291bnQgdGhlIG1vbnRoIGFzIGVuYWJsZVxuICAgIGZvciAoXG4gICAgICBsZXQgZGF0ZSA9IGZpcnN0RGF0ZU9mTW9udGg7XG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlKSA9PT0gbW9udGg7XG4gICAgICBkYXRlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKGRhdGUsIDEpXG4gICAgKSB7XG4gICAgICBpZiAoXG4gICAgICAgICEhZGF0ZSAmJlxuICAgICAgICAoIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSkpICYmXG4gICAgICAgICghdGhpcy5taW5EYXRlIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGUsIHRoaXMubWluRGF0ZSkgPj0gMCkgJiZcbiAgICAgICAgKCF0aGlzLm1heERhdGUgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUoZGF0ZSwgdGhpcy5tYXhEYXRlKSA8PSAwKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtb250aCBpbiB0aGlzIHllYXIgdGhhdCB0aGUgZ2l2ZW4gRGF0ZSBmYWxscyBvbi5cbiAgICogUmV0dXJucyBudWxsIGlmIHRoZSBnaXZlbiBEYXRlIGlzIGluIGFub3RoZXIgeWVhci5cbiAgICovXG4gIHByaXZhdGUgZ2V0TW9udGhJbkN1cnJlbnRZZWFyKGRhdGU6IFQgfCBudWxsKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5nZXRWYWxpZERhdGUoZGF0ZSkgJiYgdGhpcy5nZXRWYWxpZERhdGUodGhpcy5fcGlja2VyTW9tZW50KSkge1xuICAgICAgY29uc3QgcmVzdWx0ID1cbiAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlKSAtIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpO1xuXG4gICAgICAvLyA8IDAgOiB0aGUgZ2l2ZW4gZGF0ZSdzIHllYXIgaXMgYmVmb3JlIHBpY2tlck1vbWVudCdzIHllYXIsIHdlIHJldHVybiAtMSBhcyBzZWxlY3RlZCBtb250aCB2YWx1ZS5cbiAgICAgIC8vID4gMCA6IHRoZSBnaXZlbiBkYXRlJ3MgeWVhciBpcyBhZnRlciBwaWNrZXJNb21lbnQncyB5ZWFyLCB3ZSByZXR1cm4gMTIgYXMgc2VsZWN0ZWQgbW9udGggdmFsdWUuXG4gICAgICAvLyAwIDogdGhlIGdpdmUgZGF0ZSdzIHllYXIgaXMgc2FtZSBhcyB0aGUgcGlja2VyTW9tZW50J3MgeWVhciwgd2UgcmV0dXJuIHRoZSBhY3R1YWwgbW9udGggdmFsdWUuXG4gICAgICBpZiAocmVzdWx0IDwgMCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA+IDApIHtcbiAgICAgICAgcmV0dXJuIDEyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBzZWxlY3RlZE1vbnRocyB2YWx1ZVxuICAgKiBJbiBzaW5nbGUgbW9kZSwgaXQgaGFzIG9ubHkgb25lIHZhbHVlIHdoaWNoIHJlcHJlc2VudCB0aGUgbW9udGggdGhlIHNlbGVjdGVkIGRhdGUgaW5cbiAgICogSW4gcmFuZ2UgbW9kZSwgaXQgd291bGQgaGFzIHR3byB2YWx1ZXMsIG9uZSBmb3IgdGhlIG1vbnRoIHRoZSBmcm9tVmFsdWUgaW4gYW5kIHRoZSBvdGhlciBmb3IgdGhlIG1vbnRoIHRoZSB0b1ZhbHVlIGluXG4gICAqL1xuICBwcml2YXRlIHNldFNlbGVjdGVkTW9udGhzKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRNb250aHMgPSBbXTtcbiAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSAmJiB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkTW9udGhzWzBdID0gdGhpcy5nZXRNb250aEluQ3VycmVudFllYXIodGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSAmJiB0aGlzLnNlbGVjdGVkcykge1xuICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoc1swXSA9IHRoaXMuZ2V0TW9udGhJbkN1cnJlbnRZZWFyKHRoaXMuc2VsZWN0ZWRzWzBdKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRNb250aHNbMV0gPSB0aGlzLmdldE1vbnRoSW5DdXJyZW50WWVhcih0aGlzLnNlbGVjdGVkc1sxXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRoZSBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgeWVhclxuICAgKi9cbiAgcHJpdmF0ZSBoYXNTYW1lWWVhcihkYXRlTGVmdDogVCwgZGF0ZVJpZ2h0OiBUKSB7XG4gICAgcmV0dXJuICEhKFxuICAgICAgZGF0ZUxlZnQgJiZcbiAgICAgIGRhdGVSaWdodCAmJlxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlTGVmdCkgPT09IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZVJpZ2h0KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdmFsaWQgZGF0ZSBvYmplY3RcbiAgICovXG4gIHByaXZhdGUgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKVxuICAgICAgPyBvYmpcbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgZm9jdXNBY3RpdmVDZWxsKCkge1xuICAgIHRoaXMuY2FsZW5kYXJCb2R5RWxtLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICB9XG59XG4iLCI8dGFibGUgY2xhc3M9XCJvd2wtZHQtY2FsZW5kYXItdGFibGUgb3dsLWR0LWNhbGVuZGFyLXllYXItdGFibGVcIj5cbiAgPHRoZWFkIGNsYXNzPVwib3dsLWR0LWNhbGVuZGFyLWhlYWRlclwiPlxuICAgIDx0cj5cbiAgICAgIDx0aCBjbGFzcz1cIm93bC1kdC1jYWxlbmRhci10YWJsZS1kaXZpZGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgY29sc3Bhbj1cIjNcIj48L3RoPlxuICAgIDwvdHI+XG4gIDwvdGhlYWQ+XG4gIDx0Ym9keVxuICAgIG93bC1kYXRlLXRpbWUtY2FsZW5kYXItYm9keVxuICAgIHJvbGU9XCJncmlkXCJcbiAgICBbcm93c109XCJtb250aHNcIlxuICAgIFtudW1Db2xzXT1cIjNcIlxuICAgIFtjZWxsUmF0aW9dPVwiMyAvIDdcIlxuICAgIFthY3RpdmVDZWxsXT1cImFjdGl2ZUNlbGxcIlxuICAgIFt0b2RheVZhbHVlXT1cInRvZGF5TW9udGhcIlxuICAgIFtzZWxlY3RlZFZhbHVlc109XCJzZWxlY3RlZE1vbnRoc1wiXG4gICAgW3NlbGVjdE1vZGVdPVwic2VsZWN0TW9kZVwiXG4gICAgKGtleWRvd24pPVwiaGFuZGxlQ2FsZW5kYXJLZXlkb3duKCRldmVudClcIlxuICAgIChzZWxlY3QpPVwic2VsZWN0Q2FsZW5kYXJDZWxsKCRldmVudClcIlxuICA+PC90Ym9keT5cbjwvdGFibGU+XG4iXX0=