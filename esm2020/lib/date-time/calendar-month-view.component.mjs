import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW, } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { OWL_DATE_TIME_FORMATS } from '../adapter/date-time-format.class';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import * as i0 from "@angular/core";
import * as i1 from "../adapter/date-time-adapter.class";
import * as i2 from "@angular/common";
import * as i3 from "./calendar-body.component";
const DAYS_PER_WEEK = 7;
const WEEKS_PER_VIEW = 6;
export class OwlMonthViewComponent {
    constructor(cdRef, dateTimeAdapter, dateTimeFormats) {
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Whether to hide dates in other months at the start or end of the current month.
         */
        this.hideOtherMonths = false;
        /**
         * Define the first day of a week
         * Sunday: 0 - Saturday: 6
         */
        this._firstDayOfWeek = this.dateTimeAdapter.getFirstDayOfWeek();
        /**
         * The select mode of the picker;
         */
        this._selectMode = 'single';
        this._selecteds = [];
        this.isDefaultFirstDayOfWeek = true;
        this.localeSub = Subscription.EMPTY;
        this.initiated = false;
        /**
         * An array to hold all selectedDates' value
         * the value is the day number in current month
         */
        this.selectedDates = [];
        /**
         * Callback to invoke when a new date is selected
         */
        this.selectedChange = new EventEmitter();
        /**
         * Callback to invoke when any date is selected.
         */
        this.userSelection = new EventEmitter();
        /** Emits when any date is activated. */
        this.pickerMomentChange = new EventEmitter();
    }
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    set firstDayOfWeek(value) {
        if (value >= 0 && value <= 6 && value !== this._firstDayOfWeek) {
            this._firstDayOfWeek = value;
            this.isDefaultFirstDayOfWeek = false;
            if (this.initiated) {
                this.generateWeekDays();
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        }
    }
    get selectMode() {
        return this._selectMode;
    }
    set selectMode(val) {
        this._selectMode = val;
        if (this.initiated) {
            this.generateCalendar();
            this.cdRef.markForCheck();
        }
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        const oldSelected = this._selected;
        value = this.dateTimeAdapter.deserialize(value);
        this._selected = this.getValidDate(value);
        if (!this.dateTimeAdapter.sameDate(oldSelected, this._selected)) {
            this.setSelectedDates();
        }
    }
    get selecteds() {
        return this._selecteds;
    }
    set selecteds(values) {
        this._selecteds = values.map(v => {
            v = this.dateTimeAdapter.deserialize(v);
            return this.getValidDate(v);
        });
        this.setSelectedDates();
    }
    get pickerMoment() {
        return this._pickerMoment;
    }
    set pickerMoment(value) {
        const oldMoment = this._pickerMoment;
        value = this.dateTimeAdapter.deserialize(value);
        this._pickerMoment = this.getValidDate(value) || this.dateTimeAdapter.now();
        this.firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this._pickerMoment), this.dateTimeAdapter.getMonth(this._pickerMoment), 1);
        if (!this.isSameMonth(oldMoment, this._pickerMoment) && this.initiated) {
            this.generateCalendar();
        }
    }
    get dateFilter() {
        return this._dateFilter;
    }
    set dateFilter(filter) {
        this._dateFilter = filter;
        if (this.initiated) {
            this.generateCalendar();
            this.cdRef.markForCheck();
        }
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._minDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateCalendar();
            this.cdRef.markForCheck();
        }
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._maxDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateCalendar();
            this.cdRef.markForCheck();
        }
    }
    get weekdays() {
        return this._weekdays;
    }
    get days() {
        return this._days;
    }
    get activeCell() {
        if (this.pickerMoment) {
            return this.dateTimeAdapter.getDate(this.pickerMoment) + this.firstRowOffset - 1;
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
        this.generateWeekDays();
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(locale => {
            this.generateWeekDays();
            this.generateCalendar();
            this.firstDayOfWeek = this.isDefaultFirstDayOfWeek
                ? this.dateTimeAdapter.getFirstDayOfWeek()
                : this.firstDayOfWeek;
            this.cdRef.markForCheck();
        });
    }
    ngAfterContentInit() {
        this.generateCalendar();
        this.initiated = true;
    }
    ngOnDestroy() {
        this.localeSub.unsubscribe();
    }
    /**
     * Handle a calendarCell selected
     */
    selectCalendarCell(cell) {
        // Cases in which the date would not be selected
        // 1, the calendar cell is NOT enabled (is NOT valid)
        // 2, the selected date is NOT in current picker's month and the hideOtherMonths is enabled
        if (!cell.enabled || (this.hideOtherMonths && cell.out)) {
            return;
        }
        this.selectDate(cell.value);
    }
    /**
     * Handle a new date selected
     */
    selectDate(date) {
        const daysDiff = date - 1;
        const selected = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
        this.selectedChange.emit(selected);
        this.userSelection.emit();
    }
    /**
     * Handle keydown event on calendar body
     */
    handleCalendarKeydown(event) {
        let moment;
        switch (event.keyCode) {
            // minus 1 day
            case LEFT_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 day
            case RIGHT_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 week
            case UP_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -7);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 week
            case DOWN_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 7);
                this.pickerMomentChange.emit(moment);
                break;
            // move to first day of current month
            case HOME:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1 - this.dateTimeAdapter.getDate(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // move to last day of current month
            case END:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment) -
                    this.dateTimeAdapter.getDate(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 month (or 1 year)
            case PAGE_UP:
                moment = event.altKey
                    ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1)
                    : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 month (or 1 year)
            case PAGE_DOWN:
                moment = event.altKey
                    ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1)
                    : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // select the pickerMoment
            case ENTER:
                if (!this.dateFilter || this.dateFilter(this.pickerMoment)) {
                    this.selectDate(this.dateTimeAdapter.getDate(this.pickerMoment));
                }
                break;
            default:
                return;
        }
        this.focusActiveCell();
        event.preventDefault();
    }
    /**
     * Generate the calendar weekdays array
     */
    generateWeekDays() {
        const longWeekdays = this.dateTimeAdapter.getDayOfWeekNames('long');
        const shortWeekdays = this.dateTimeAdapter.getDayOfWeekNames('short');
        const narrowWeekdays = this.dateTimeAdapter.getDayOfWeekNames('narrow');
        const firstDayOfWeek = this.firstDayOfWeek;
        const weekdays = longWeekdays.map((long, i) => {
            return { long, short: shortWeekdays[i], narrow: narrowWeekdays[i] };
        });
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this.dateNames = this.dateTimeAdapter.getDateNames();
        return;
    }
    /**
     * Generate the calendar days array
     */
    generateCalendar() {
        if (!this.pickerMoment) {
            return;
        }
        this.todayDate = null;
        // the first weekday of the month
        const startWeekdayOfMonth = this.dateTimeAdapter.getDayOfWeek(this.firstDateOfMonth);
        const firstDayOfWeek = this.firstDayOfWeek;
        // the amount of days from the first date of the month
        // if it is < 0, it means the date is in previous month
        let daysDiff = 0 - ((startWeekdayOfMonth + (DAYS_PER_WEEK - firstDayOfWeek)) % DAYS_PER_WEEK);
        // the index of cell that contains the first date of the month
        this.firstRowOffset = Math.abs(daysDiff);
        this._days = [];
        for (let i = 0; i < WEEKS_PER_VIEW; i++) {
            const week = [];
            for (let j = 0; j < DAYS_PER_WEEK; j++) {
                const date = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
                const dateCell = this.createDateCell(date, daysDiff);
                // check if the date is today
                if (this.dateTimeAdapter.sameDate(this.dateTimeAdapter.now(), date)) {
                    this.todayDate = daysDiff + 1;
                }
                week.push(dateCell);
                daysDiff += 1;
            }
            this._days.push(week);
        }
        this.setSelectedDates();
    }
    /**
     * Creates CalendarCell for days.
     */
    createDateCell(date, daysDiff) {
        // total days of the month
        const daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment);
        const dateNum = this.dateTimeAdapter.getDate(date);
        // const dateName = this.dateNames[dateNum - 1];
        const dateName = dateNum.toString();
        const ariaLabel = this.dateTimeAdapter.format(date, this.dateTimeFormats.display.dateA11yLabel);
        // check if the date if selectable
        const enabled = this.isDateEnabled(date);
        // check if date is not in current month
        const dayValue = daysDiff + 1;
        const out = dayValue < 1 || dayValue > daysInMonth;
        const cellClass = 'owl-dt-day-' + this.dateTimeAdapter.getDayOfWeek(date);
        return new CalendarCell(dayValue, dateName, ariaLabel, enabled, out, cellClass);
    }
    /**
     * Check if the date is valid
     */
    isDateEnabled(date) {
        return (!!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate || this.dateTimeAdapter.compareDate(date, this.minDate) >= 0) &&
            (!this.maxDate || this.dateTimeAdapter.compareDate(date, this.maxDate) <= 0));
    }
    /**
     * Get a valid date object
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
    /**
     * Check if the give dates are none-null and in the same month
     */
    isSameMonth(dateLeft, dateRight) {
        return !!(dateLeft &&
            dateRight &&
            this.dateTimeAdapter.isValid(dateLeft) &&
            this.dateTimeAdapter.isValid(dateRight) &&
            this.dateTimeAdapter.getYear(dateLeft) === this.dateTimeAdapter.getYear(dateRight) &&
            this.dateTimeAdapter.getMonth(dateLeft) === this.dateTimeAdapter.getMonth(dateRight));
    }
    /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     */
    setSelectedDates() {
        this.selectedDates = [];
        if (!this.firstDateOfMonth) {
            return;
        }
        if (this.isInSingleMode && this.selected) {
            const dayDiff = this.dateTimeAdapter.differenceInCalendarDays(this.selected, this.firstDateOfMonth);
            this.selectedDates[0] = dayDiff + 1;
            return;
        }
        if (this.isInRangeMode && this.selecteds) {
            this.selectedDates = this.selecteds.map(selected => {
                if (this.dateTimeAdapter.isValid(selected)) {
                    const dayDiff = this.dateTimeAdapter.differenceInCalendarDays(selected, this.firstDateOfMonth);
                    return dayDiff + 1;
                }
                else {
                    return null;
                }
            });
        }
    }
    focusActiveCell() {
        this.calendarBodyElm.focusActiveCell();
    }
}
OwlMonthViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlMonthViewComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OwlMonthViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: OwlMonthViewComponent, selector: "owl-date-time-month-view", inputs: { hideOtherMonths: "hideOtherMonths", firstDayOfWeek: "firstDayOfWeek", selectMode: "selectMode", selected: "selected", selecteds: "selecteds", pickerMoment: "pickerMoment", dateFilter: "dateFilter", minDate: "minDate", maxDate: "maxDate" }, outputs: { selectedChange: "selectedChange", userSelection: "userSelection", pickerMomentChange: "pickerMomentChange" }, host: { properties: { "class.owl-dt-calendar-view": "owlDTCalendarView" } }, viewQueries: [{ propertyName: "calendarBodyElm", first: true, predicate: OwlCalendarBodyComponent, descendants: true, static: true }], exportAs: ["owlYearView"], ngImport: i0, template: "<table\n  class=\"owl-dt-calendar-table owl-dt-calendar-month-table\"\n  [class.owl-dt-calendar-only-current-month]=\"hideOtherMonths\"\n>\n  <thead class=\"owl-dt-calendar-header\">\n    <tr class=\"owl-dt-weekdays\">\n      <th\n        *ngFor=\"let weekday of weekdays\"\n        [attr.aria-label]=\"weekday.long\"\n        class=\"owl-dt-weekday\"\n        scope=\"col\"\n      >\n        <span>{{ weekday.short }}</span>\n      </th>\n    </tr>\n    <tr>\n      <th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"7\"></th>\n    </tr>\n  </thead>\n  <tbody\n    owl-date-time-calendar-body\n    role=\"grid\"\n    [rows]=\"days\"\n    [todayValue]=\"todayDate\"\n    [selectedValues]=\"selectedDates\"\n    [selectMode]=\"selectMode\"\n    [activeCell]=\"activeCell\"\n    (keydown)=\"handleCalendarKeydown($event)\"\n    (select)=\"selectCalendarCell($event)\"\n  ></tbody>\n</table>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i3.OwlCalendarBodyComponent, selector: "[owl-date-time-calendar-body]", inputs: ["activeCell", "rows", "numCols", "cellRatio", "todayValue", "selectedValues", "selectMode"], outputs: ["select"], exportAs: ["owlDateTimeCalendarBody"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlMonthViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'owl-date-time-month-view', exportAs: 'owlYearView', host: {
                        '[class.owl-dt-calendar-view]': 'owlDTCalendarView',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<table\n  class=\"owl-dt-calendar-table owl-dt-calendar-month-table\"\n  [class.owl-dt-calendar-only-current-month]=\"hideOtherMonths\"\n>\n  <thead class=\"owl-dt-calendar-header\">\n    <tr class=\"owl-dt-weekdays\">\n      <th\n        *ngFor=\"let weekday of weekdays\"\n        [attr.aria-label]=\"weekday.long\"\n        class=\"owl-dt-weekday\"\n        scope=\"col\"\n      >\n        <span>{{ weekday.short }}</span>\n      </th>\n    </tr>\n    <tr>\n      <th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"7\"></th>\n    </tr>\n  </thead>\n  <tbody\n    owl-date-time-calendar-body\n    role=\"grid\"\n    [rows]=\"days\"\n    [todayValue]=\"todayDate\"\n    [selectedValues]=\"selectedDates\"\n    [selectMode]=\"selectMode\"\n    [activeCell]=\"activeCell\"\n    (keydown)=\"handleCalendarKeydown($event)\"\n    (select)=\"selectCalendarCell($event)\"\n  ></tbody>\n</table>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DateTimeAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [OWL_DATE_TIME_FORMATS]
                }] }]; }, propDecorators: { hideOtherMonths: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], selectMode: [{
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
            }], selectedChange: [{
                type: Output
            }], userSelection: [{
                type: Output
            }], pickerMomentChange: [{
                type: Output
            }], calendarBodyElm: [{
                type: ViewChild,
                args: [OwlCalendarBodyComponent, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEdBQ1QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBc0IscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RixPQUFPLEVBQUUsWUFBWSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7O0FBR25GLE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQztBQUN4QixNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFXekIsTUFBTSxPQUFPLHFCQUFxQjtJQW1PaEMsWUFDVSxLQUF3QixFQUNaLGVBQW1DLEVBRy9DLGVBQW1DO1FBSm5DLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ1osb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBRy9DLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQXZPN0M7O1dBRUc7UUFFSCxvQkFBZSxHQUFHLEtBQUss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T0FBTztzQkFEVixLQUFLO2dCQXdFRyxjQUFjO3NCQUR0QixNQUFNO2dCQU9FLGFBQWE7c0JBRHJCLE1BQU07Z0JBS0Usa0JBQWtCO3NCQUQxQixNQUFNO2dCQUtQLGVBQWU7c0JBRGQsU0FBUzt1QkFBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBET1dOX0FSUk9XLFxuICBFTkQsXG4gIEVOVEVSLFxuICBIT01FLFxuICBMRUZUX0FSUk9XLFxuICBQQUdFX0RPV04sXG4gIFBBR0VfVVAsXG4gIFJJR0hUX0FSUk9XLFxuICBVUF9BUlJPVyxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IE93bERhdGVUaW1lRm9ybWF0cywgT1dMX0RBVEVfVElNRV9GT1JNQVRTIH0gZnJvbSAnLi4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcbmltcG9ydCB7IENhbGVuZGFyQ2VsbCwgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWxlY3RNb2RlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuXG5jb25zdCBEQVlTX1BFUl9XRUVLID0gNztcbmNvbnN0IFdFRUtTX1BFUl9WSUVXID0gNjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS1tb250aC12aWV3JyxcbiAgZXhwb3J0QXM6ICdvd2xZZWFyVmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLXZpZXddJzogJ293bERUQ2FsZW5kYXJWaWV3JyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE93bE1vbnRoVmlld0NvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gaGlkZSBkYXRlcyBpbiBvdGhlciBtb250aHMgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgY3VycmVudCBtb250aC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGhpZGVPdGhlck1vbnRocyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBEZWZpbmUgdGhlIGZpcnN0IGRheSBvZiBhIHdlZWtcbiAgICogU3VuZGF5OiAwIC0gU2F0dXJkYXk6IDZcbiAgICovXG4gIHByaXZhdGUgX2ZpcnN0RGF5T2ZXZWVrID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0Rmlyc3REYXlPZldlZWsoKTtcbiAgQElucHV0KClcbiAgZ2V0IGZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrO1xuICB9XG5cbiAgc2V0IGZpcnN0RGF5T2ZXZWVrKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPj0gMCAmJiB2YWx1ZSA8PSA2ICYmIHZhbHVlICE9PSB0aGlzLl9maXJzdERheU9mV2Vlaykge1xuICAgICAgdGhpcy5fZmlyc3REYXlPZldlZWsgPSB2YWx1ZTtcbiAgICAgIHRoaXMuaXNEZWZhdWx0Rmlyc3REYXlPZldlZWsgPSBmYWxzZTtcblxuICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVXZWVrRGF5cygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIHNlbGVjdCBtb2RlIG9mIHRoZSBwaWNrZXI7XG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3RNb2RlOiBTZWxlY3RNb2RlID0gJ3NpbmdsZSc7XG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlO1xuICB9XG5cbiAgc2V0IHNlbGVjdE1vZGUodmFsOiBTZWxlY3RNb2RlKSB7XG4gICAgdGhpcy5fc2VsZWN0TW9kZSA9IHZhbDtcbiAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICBwcml2YXRlIF9zZWxlY3RlZDogVCB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZCgpOiBUIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgIGNvbnN0IG9sZFNlbGVjdGVkID0gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG5cbiAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNhbWVEYXRlKG9sZFNlbGVjdGVkLCB0aGlzLl9zZWxlY3RlZCkpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWREYXRlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZHMoKTogVFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkcyA9IHZhbHVlcy5tYXAodiA9PiB7XG4gICAgICB2ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodik7XG4gICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGUodik7XG4gICAgfSk7XG4gICAgdGhpcy5zZXRTZWxlY3RlZERhdGVzKCk7XG4gIH1cblxuICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQ7XG4gIEBJbnB1dCgpXG4gIGdldCBwaWNrZXJNb21lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcbiAgfVxuXG4gIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcbiAgICBjb25zdCBvbGRNb21lbnQgPSB0aGlzLl9waWNrZXJNb21lbnQ7XG4gICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fcGlja2VyTW9tZW50ID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xuXG4gICAgdGhpcy5maXJzdERhdGVPZk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KSxcbiAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMuX3BpY2tlck1vbWVudCksXG4gICAgICAxLFxuICAgICk7XG5cbiAgICBpZiAoIXRoaXMuaXNTYW1lTW9udGgob2xkTW9tZW50LCB0aGlzLl9waWNrZXJNb21lbnQpICYmIHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZVxuICAgKi9cbiAgcHJpdmF0ZSBfZGF0ZUZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIGdldCBkYXRlRmlsdGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRlRmlsdGVyO1xuICB9XG5cbiAgc2V0IGRhdGVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogVCkgPT4gYm9vbGVhbikge1xuICAgIHRoaXMuX2RhdGVGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfbWluRGF0ZTogVCB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIGdldCBtaW5EYXRlKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgfVxuXG4gIHNldCBtaW5EYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfbWF4RGF0ZTogVCB8IG51bGw7XG4gIEBJbnB1dCgpXG4gIGdldCBtYXhEYXRlKCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgfVxuXG4gIHNldCBtYXhEYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIHRoaXMuX21heERhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG5cbiAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF93ZWVrZGF5czogQXJyYXk8eyBsb25nOiBzdHJpbmc7IHNob3J0OiBzdHJpbmc7IG5hcnJvdzogc3RyaW5nIH0+O1xuICBnZXQgd2Vla2RheXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGF5czogQ2FsZW5kYXJDZWxsW11bXTtcbiAgZ2V0IGRheXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RheXM7XG4gIH1cblxuICBnZXQgYWN0aXZlQ2VsbCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAodGhpcy5waWNrZXJNb21lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KSArIHRoaXMuZmlyc3RSb3dPZmZzZXQgLSAxO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcbiAgfVxuXG4gIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcbiAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgfHxcbiAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZmlyc3REYXRlT2ZNb250aDogVDtcblxuICBwcml2YXRlIGlzRGVmYXVsdEZpcnN0RGF5T2ZXZWVrID0gdHJ1ZTtcblxuICBwcml2YXRlIGxvY2FsZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgaW5pdGlhdGVkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBkYXRlTmFtZXM6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0ZSBvZiB0aGUgbW9udGggdGhhdCB0b2RheSBmYWxscyBvbi5cbiAgICovXG4gIHB1YmxpYyB0b2RheURhdGU6IG51bWJlciB8IG51bGw7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IHRvIGhvbGQgYWxsIHNlbGVjdGVkRGF0ZXMnIHZhbHVlXG4gICAqIHRoZSB2YWx1ZSBpcyB0aGUgZGF5IG51bWJlciBpbiBjdXJyZW50IG1vbnRoXG4gICAqL1xuICBwdWJsaWMgc2VsZWN0ZWREYXRlczogbnVtYmVyW10gPSBbXTtcblxuICAvLyB0aGUgaW5kZXggb2YgY2VsbCB0aGF0IGNvbnRhaW5zIHRoZSBmaXJzdCBkYXRlIG9mIHRoZSBtb250aFxuICBwdWJsaWMgZmlyc3RSb3dPZmZzZXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUIHwgbnVsbD4oKTtcblxuICAvKipcbiAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYW55IGRhdGUgaXMgc2VsZWN0ZWQuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgdXNlclNlbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBhY3RpdmF0ZWQuICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBwaWNrZXJNb21lbnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxUPiA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cbiAgQFZpZXdDaGlsZChPd2xDYWxlbmRhckJvZHlDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pXG4gIGNhbGVuZGFyQm9keUVsbTogT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50O1xuXG4gIGdldCBvd2xEVENhbGVuZGFyVmlldygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcbiAgICBwcml2YXRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzLFxuICApIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2VuZXJhdGVXZWVrRGF5cygpO1xuXG4gICAgdGhpcy5sb2NhbGVTdWIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5sb2NhbGVDaGFuZ2VzLnN1YnNjcmliZShsb2NhbGUgPT4ge1xuICAgICAgdGhpcy5nZW5lcmF0ZVdlZWtEYXlzKCk7XG4gICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgIHRoaXMuZmlyc3REYXlPZldlZWsgPSB0aGlzLmlzRGVmYXVsdEZpcnN0RGF5T2ZXZWVrXG4gICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0Rmlyc3REYXlPZldlZWsoKVxuICAgICAgICA6IHRoaXMuZmlyc3REYXlPZldlZWs7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICB0aGlzLmluaXRpYXRlZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5sb2NhbGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgYSBjYWxlbmRhckNlbGwgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBzZWxlY3RDYWxlbmRhckNlbGwoY2VsbDogQ2FsZW5kYXJDZWxsKTogdm9pZCB7XG4gICAgLy8gQ2FzZXMgaW4gd2hpY2ggdGhlIGRhdGUgd291bGQgbm90IGJlIHNlbGVjdGVkXG4gICAgLy8gMSwgdGhlIGNhbGVuZGFyIGNlbGwgaXMgTk9UIGVuYWJsZWQgKGlzIE5PVCB2YWxpZClcbiAgICAvLyAyLCB0aGUgc2VsZWN0ZWQgZGF0ZSBpcyBOT1QgaW4gY3VycmVudCBwaWNrZXIncyBtb250aCBhbmQgdGhlIGhpZGVPdGhlck1vbnRocyBpcyBlbmFibGVkXG4gICAgaWYgKCFjZWxsLmVuYWJsZWQgfHwgKHRoaXMuaGlkZU90aGVyTW9udGhzICYmIGNlbGwub3V0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0RGF0ZShjZWxsLnZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgYSBuZXcgZGF0ZSBzZWxlY3RlZFxuICAgKi9cbiAgcHJpdmF0ZSBzZWxlY3REYXRlKGRhdGU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGRheXNEaWZmID0gZGF0ZSAtIDE7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXModGhpcy5maXJzdERhdGVPZk1vbnRoLCBkYXlzRGlmZik7XG5cbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgIHRoaXMudXNlclNlbGVjdGlvbi5lbWl0KCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGtleWRvd24gZXZlbnQgb24gY2FsZW5kYXIgYm9keVxuICAgKi9cbiAgcHVibGljIGhhbmRsZUNhbGVuZGFyS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGxldCBtb21lbnQ7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAvLyBtaW51cyAxIGRheVxuICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXModGhpcy5waWNrZXJNb21lbnQsIC0xKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gYWRkIDEgZGF5XG4gICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXModGhpcy5waWNrZXJNb21lbnQsIDEpO1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBtaW51cyAxIHdlZWtcbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLnBpY2tlck1vbWVudCwgLTcpO1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBhZGQgMSB3ZWVrXG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLnBpY2tlck1vbWVudCwgNyk7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIG1vdmUgdG8gZmlyc3QgZGF5IG9mIGN1cnJlbnQgbW9udGhcbiAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgIDEgLSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gbW92ZSB0byBsYXN0IGRheSBvZiBjdXJyZW50IG1vbnRoXG4gICAgICBjYXNlIEVORDpcbiAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKHRoaXMucGlja2VyTW9tZW50KSAtXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gbWludXMgMSBtb250aCAob3IgMSB5ZWFyKVxuICAgICAgY2FzZSBQQUdFX1VQOlxuICAgICAgICBtb21lbnQgPSBldmVudC5hbHRLZXlcbiAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5waWNrZXJNb21lbnQsIC0xKVxuICAgICAgICAgIDogdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5waWNrZXJNb21lbnQsIC0xKTtcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gYWRkIDEgbW9udGggKG9yIDEgeWVhcilcbiAgICAgIGNhc2UgUEFHRV9ET1dOOlxuICAgICAgICBtb21lbnQgPSBldmVudC5hbHRLZXlcbiAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5waWNrZXJNb21lbnQsIDEpXG4gICAgICAgICAgOiB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLnBpY2tlck1vbWVudCwgMSk7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIHNlbGVjdCB0aGUgcGlja2VyTW9tZW50XG4gICAgICBjYXNlIEVOVEVSOlxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIodGhpcy5waWNrZXJNb21lbnQpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3REYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgdGhlIGNhbGVuZGFyIHdlZWtkYXlzIGFycmF5XG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlV2Vla0RheXMoKTogdm9pZCB7XG4gICAgY29uc3QgbG9uZ1dlZWtkYXlzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoJ2xvbmcnKTtcbiAgICBjb25zdCBzaG9ydFdlZWtkYXlzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoJ3Nob3J0Jyk7XG4gICAgY29uc3QgbmFycm93V2Vla2RheXMgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXlPZldlZWtOYW1lcygnbmFycm93Jyk7XG4gICAgY29uc3QgZmlyc3REYXlPZldlZWsgPSB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuXG4gICAgY29uc3Qgd2Vla2RheXMgPSBsb25nV2Vla2RheXMubWFwKChsb25nLCBpKSA9PiB7XG4gICAgICByZXR1cm4geyBsb25nLCBzaG9ydDogc2hvcnRXZWVrZGF5c1tpXSwgbmFycm93OiBuYXJyb3dXZWVrZGF5c1tpXSB9O1xuICAgIH0pO1xuXG4gICAgdGhpcy5fd2Vla2RheXMgPSB3ZWVrZGF5cy5zbGljZShmaXJzdERheU9mV2VlaykuY29uY2F0KHdlZWtkYXlzLnNsaWNlKDAsIGZpcnN0RGF5T2ZXZWVrKSk7XG5cbiAgICB0aGlzLmRhdGVOYW1lcyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGVOYW1lcygpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHRoZSBjYWxlbmRhciBkYXlzIGFycmF5XG4gICAqL1xuICBwcml2YXRlIGdlbmVyYXRlQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnBpY2tlck1vbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudG9kYXlEYXRlID0gbnVsbDtcblxuICAgIC8vIHRoZSBmaXJzdCB3ZWVrZGF5IG9mIHRoZSBtb250aFxuICAgIGNvbnN0IHN0YXJ0V2Vla2RheU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXlPZldlZWsodGhpcy5maXJzdERhdGVPZk1vbnRoKTtcbiAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuZmlyc3REYXlPZldlZWs7XG5cbiAgICAvLyB0aGUgYW1vdW50IG9mIGRheXMgZnJvbSB0aGUgZmlyc3QgZGF0ZSBvZiB0aGUgbW9udGhcbiAgICAvLyBpZiBpdCBpcyA8IDAsIGl0IG1lYW5zIHRoZSBkYXRlIGlzIGluIHByZXZpb3VzIG1vbnRoXG4gICAgbGV0IGRheXNEaWZmID0gMCAtICgoc3RhcnRXZWVrZGF5T2ZNb250aCArIChEQVlTX1BFUl9XRUVLIC0gZmlyc3REYXlPZldlZWspKSAlIERBWVNfUEVSX1dFRUspO1xuXG4gICAgLy8gdGhlIGluZGV4IG9mIGNlbGwgdGhhdCBjb250YWlucyB0aGUgZmlyc3QgZGF0ZSBvZiB0aGUgbW9udGhcbiAgICB0aGlzLmZpcnN0Um93T2Zmc2V0ID0gTWF0aC5hYnMoZGF5c0RpZmYpO1xuXG4gICAgdGhpcy5fZGF5cyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgV0VFS1NfUEVSX1ZJRVc7IGkrKykge1xuICAgICAgY29uc3Qgd2VlayA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBEQVlTX1BFUl9XRUVLOyBqKyspIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLmZpcnN0RGF0ZU9mTW9udGgsIGRheXNEaWZmKTtcbiAgICAgICAgY29uc3QgZGF0ZUNlbGwgPSB0aGlzLmNyZWF0ZURhdGVDZWxsKGRhdGUsIGRheXNEaWZmKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZGF0ZSBpcyB0b2RheVxuICAgICAgICBpZiAodGhpcy5kYXRlVGltZUFkYXB0ZXIuc2FtZURhdGUodGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCksIGRhdGUpKSB7XG4gICAgICAgICAgdGhpcy50b2RheURhdGUgPSBkYXlzRGlmZiArIDE7XG4gICAgICAgIH1cblxuICAgICAgICB3ZWVrLnB1c2goZGF0ZUNlbGwpO1xuICAgICAgICBkYXlzRGlmZiArPSAxO1xuICAgICAgfVxuICAgICAgdGhpcy5fZGF5cy5wdXNoKHdlZWspO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U2VsZWN0ZWREYXRlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgQ2FsZW5kYXJDZWxsIGZvciBkYXlzLlxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVEYXRlQ2VsbChkYXRlOiBULCBkYXlzRGlmZjogbnVtYmVyKTogQ2FsZW5kYXJDZWxsIHtcbiAgICAvLyB0b3RhbCBkYXlzIG9mIHRoZSBtb250aFxuICAgIGNvbnN0IGRheXNJbk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgodGhpcy5waWNrZXJNb21lbnQpO1xuICAgIGNvbnN0IGRhdGVOdW0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKGRhdGUpO1xuICAgIC8vIGNvbnN0IGRhdGVOYW1lID0gdGhpcy5kYXRlTmFtZXNbZGF0ZU51bSAtIDFdO1xuICAgIGNvbnN0IGRhdGVOYW1lID0gZGF0ZU51bS50b1N0cmluZygpO1xuICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChkYXRlLCB0aGlzLmRhdGVUaW1lRm9ybWF0cy5kaXNwbGF5LmRhdGVBMTF5TGFiZWwpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGRhdGUgaWYgc2VsZWN0YWJsZVxuICAgIGNvbnN0IGVuYWJsZWQgPSB0aGlzLmlzRGF0ZUVuYWJsZWQoZGF0ZSk7XG5cbiAgICAvLyBjaGVjayBpZiBkYXRlIGlzIG5vdCBpbiBjdXJyZW50IG1vbnRoXG4gICAgY29uc3QgZGF5VmFsdWUgPSBkYXlzRGlmZiArIDE7XG4gICAgY29uc3Qgb3V0ID0gZGF5VmFsdWUgPCAxIHx8IGRheVZhbHVlID4gZGF5c0luTW9udGg7XG4gICAgY29uc3QgY2VsbENsYXNzID0gJ293bC1kdC1kYXktJyArIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheU9mV2VlayhkYXRlKTtcblxuICAgIHJldHVybiBuZXcgQ2FsZW5kYXJDZWxsKGRheVZhbHVlLCBkYXRlTmFtZSwgYXJpYUxhYmVsLCBlbmFibGVkLCBvdXQsIGNlbGxDbGFzcyk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGRhdGUgaXMgdmFsaWRcbiAgICovXG4gIHByaXZhdGUgaXNEYXRlRW5hYmxlZChkYXRlOiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICEhZGF0ZSAmJlxuICAgICAgKCF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUpKSAmJlxuICAgICAgKCF0aGlzLm1pbkRhdGUgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUoZGF0ZSwgdGhpcy5taW5EYXRlKSA+PSAwKSAmJlxuICAgICAgKCF0aGlzLm1heERhdGUgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZURhdGUoZGF0ZSwgdGhpcy5tYXhEYXRlKSA8PSAwKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdmFsaWQgZGF0ZSBvYmplY3RcbiAgICovXG4gIHByaXZhdGUgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKVxuICAgICAgPyBvYmpcbiAgICAgIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZ2l2ZSBkYXRlcyBhcmUgbm9uZS1udWxsIGFuZCBpbiB0aGUgc2FtZSBtb250aFxuICAgKi9cbiAgcHVibGljIGlzU2FtZU1vbnRoKGRhdGVMZWZ0OiBULCBkYXRlUmlnaHQ6IFQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEoXG4gICAgICBkYXRlTGVmdCAmJlxuICAgICAgZGF0ZVJpZ2h0ICYmXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKGRhdGVMZWZ0KSAmJlxuICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChkYXRlUmlnaHQpICYmXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGVMZWZ0KSA9PT0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlUmlnaHQpICYmXG4gICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlTGVmdCkgPT09IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGVSaWdodClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgc2VsZWN0ZWREYXRlcyB2YWx1ZS5cbiAgICogSW4gc2luZ2xlIG1vZGUsIGl0IGhhcyBvbmx5IG9uZSB2YWx1ZSB3aGljaCByZXByZXNlbnQgdGhlIHNlbGVjdGVkIGRhdGVcbiAgICogSW4gcmFuZ2UgbW9kZSwgaXQgd291bGQgaGFzIHR3byB2YWx1ZXMsIG9uZSBmb3IgdGhlIGZyb21WYWx1ZSBhbmQgdGhlIG90aGVyIGZvciB0aGUgdG9WYWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTZWxlY3RlZERhdGVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWREYXRlcyA9IFtdO1xuXG4gICAgaWYgKCF0aGlzLmZpcnN0RGF0ZU9mTW9udGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSAmJiB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICBjb25zdCBkYXlEaWZmID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICAgICAgICB0aGlzLnNlbGVjdGVkLFxuICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGgsXG4gICAgICApO1xuICAgICAgdGhpcy5zZWxlY3RlZERhdGVzWzBdID0gZGF5RGlmZiArIDE7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSAmJiB0aGlzLnNlbGVjdGVkcykge1xuICAgICAgdGhpcy5zZWxlY3RlZERhdGVzID0gdGhpcy5zZWxlY3RlZHMubWFwKHNlbGVjdGVkID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQoc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgY29uc3QgZGF5RGlmZiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhcbiAgICAgICAgICAgIHNlbGVjdGVkLFxuICAgICAgICAgICAgdGhpcy5maXJzdERhdGVPZk1vbnRoLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIGRheURpZmYgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICB0aGlzLmNhbGVuZGFyQm9keUVsbS5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgfVxufVxuIiwiPHRhYmxlXG4gIGNsYXNzPVwib3dsLWR0LWNhbGVuZGFyLXRhYmxlIG93bC1kdC1jYWxlbmRhci1tb250aC10YWJsZVwiXG4gIFtjbGFzcy5vd2wtZHQtY2FsZW5kYXItb25seS1jdXJyZW50LW1vbnRoXT1cImhpZGVPdGhlck1vbnRoc1wiXG4+XG4gIDx0aGVhZCBjbGFzcz1cIm93bC1kdC1jYWxlbmRhci1oZWFkZXJcIj5cbiAgICA8dHIgY2xhc3M9XCJvd2wtZHQtd2Vla2RheXNcIj5cbiAgICAgIDx0aFxuICAgICAgICAqbmdGb3I9XCJsZXQgd2Vla2RheSBvZiB3ZWVrZGF5c1wiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwid2Vla2RheS5sb25nXCJcbiAgICAgICAgY2xhc3M9XCJvd2wtZHQtd2Vla2RheVwiXG4gICAgICAgIHNjb3BlPVwiY29sXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4+e3sgd2Vla2RheS5zaG9ydCB9fTwvc3Bhbj5cbiAgICAgIDwvdGg+XG4gICAgPC90cj5cbiAgICA8dHI+XG4gICAgICA8dGggY2xhc3M9XCJvd2wtZHQtY2FsZW5kYXItdGFibGUtZGl2aWRlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNvbHNwYW49XCI3XCI+PC90aD5cbiAgICA8L3RyPlxuICA8L3RoZWFkPlxuICA8dGJvZHlcbiAgICBvd2wtZGF0ZS10aW1lLWNhbGVuZGFyLWJvZHlcbiAgICByb2xlPVwiZ3JpZFwiXG4gICAgW3Jvd3NdPVwiZGF5c1wiXG4gICAgW3RvZGF5VmFsdWVdPVwidG9kYXlEYXRlXCJcbiAgICBbc2VsZWN0ZWRWYWx1ZXNdPVwic2VsZWN0ZWREYXRlc1wiXG4gICAgW3NlbGVjdE1vZGVdPVwic2VsZWN0TW9kZVwiXG4gICAgW2FjdGl2ZUNlbGxdPVwiYWN0aXZlQ2VsbFwiXG4gICAgKGtleWRvd24pPVwiaGFuZGxlQ2FsZW5kYXJLZXlkb3duKCRldmVudClcIlxuICAgIChzZWxlY3QpPVwic2VsZWN0Q2FsZW5kYXJDZWxsKCRldmVudClcIlxuICA+PC90Ym9keT5cbjwvdGFibGU+XG4iXX0=