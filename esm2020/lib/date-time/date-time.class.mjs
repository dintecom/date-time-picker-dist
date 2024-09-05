import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, Inject, Input, Optional } from '@angular/core';
import { OWL_DATE_TIME_FORMATS } from '../adapter/date-time-format.class';
import * as i0 from "@angular/core";
import * as i1 from "../adapter/date-time-adapter.class";
let nextUniqueId = 0;
export class OwlDateTime {
    constructor(dateTimeAdapter, dateTimeFormats) {
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Whether to show the second's timer
         */
        this._showSecondsTimer = false;
        /**
         * Whether the timer is in hour12 format
         */
        this._hour12Timer = false;
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        /**
         * Hours to change per step
         */
        this._stepHour = 1;
        /**
         * Minutes to change per step
         */
        this._stepMinute = 1;
        /**
         * Seconds to change per step
         */
        this._stepSecond = 1;
        /**
         * Whether to hide dates in other months at the start or end of the current month.
         */
        this._hideOtherMonths = false;
        /**
         * Date Time Checker to check if the give dateTime is selectable
         */
        this.dateTimeChecker = (dateTime) => {
            return (!!dateTime &&
                (!this.dateTimeFilter || this.dateTimeFilter(dateTime)) &&
                (!this.minDateTime || this.dateTimeAdapter.compareDate(dateTime, this.minDateTime) >= 0) &&
                (!this.maxDateTime || this.dateTimeAdapter.compareDate(dateTime, this.maxDateTime) <= 0));
        };
        if (!this.dateTimeAdapter) {
            throw Error(`OwlDateTimePicker: No provider found for DateTimeAdapter. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule or provide a ` +
                `custom implementation.`);
        }
        if (!this.dateTimeFormats) {
            throw Error(`OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule or provide a ` +
                `custom implementation.`);
        }
        this._id = `owl-dt-picker-${nextUniqueId++}`;
    }
    get showSecondsTimer() {
        return this._showSecondsTimer;
    }
    set showSecondsTimer(val) {
        this._showSecondsTimer = coerceBooleanProperty(val);
    }
    get hour12Timer() {
        return this._hour12Timer;
    }
    set hour12Timer(val) {
        this._hour12Timer = coerceBooleanProperty(val);
    }
    get stepHour() {
        return this._stepHour;
    }
    set stepHour(val) {
        this._stepHour = coerceNumberProperty(val, 1);
    }
    get stepMinute() {
        return this._stepMinute;
    }
    set stepMinute(val) {
        this._stepMinute = coerceNumberProperty(val, 1);
    }
    get stepSecond() {
        return this._stepSecond;
    }
    set stepSecond(val) {
        this._stepSecond = coerceNumberProperty(val, 1);
    }
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    set firstDayOfWeek(value) {
        value = coerceNumberProperty(value);
        if (value > 6 || value < 0) {
            this._firstDayOfWeek = undefined;
        }
        else {
            this._firstDayOfWeek = value;
        }
    }
    get hideOtherMonths() {
        return this._hideOtherMonths;
    }
    set hideOtherMonths(val) {
        this._hideOtherMonths = coerceBooleanProperty(val);
    }
    get id() {
        return this._id;
    }
    get formatString() {
        return this.pickerType === 'both'
            ? this.dateTimeFormats.display.fullInput
            : this.pickerType === 'calendar'
                ? this.dateTimeFormats.display.dateInput
                : this.dateTimeFormats.display.timeInput;
    }
    get disabled() {
        return false;
    }
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
}
OwlDateTime.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTime, deps: [{ token: i1.DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
OwlDateTime.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.0.0", type: OwlDateTime, inputs: { showSecondsTimer: "showSecondsTimer", hour12Timer: "hour12Timer", startView: "startView", stepHour: "stepHour", stepMinute: "stepMinute", stepSecond: "stepSecond", firstDayOfWeek: "firstDayOfWeek", hideOtherMonths: "hideOtherMonths" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTime, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.DateTimeAdapter, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [OWL_DATE_TIME_FORMATS]
                }] }]; }, propDecorators: { showSecondsTimer: [{
                type: Input
            }], hour12Timer: [{
                type: Input
            }], startView: [{
                type: Input
            }], stepHour: [{
                type: Input
            }], stepMinute: [{
                type: Input
            }], stepSecond: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], hideOtherMonths: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLmNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlja2VyL3NyYy9saWIvZGF0ZS10aW1lL2RhdGUtdGltZS5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsU0FBUyxFQUFnQixNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRixPQUFPLEVBQXNCLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQUU5RixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFTckIsTUFBTSxPQUFnQixXQUFXO0lBc0svQixZQUN3QixlQUFtQyxFQUcvQyxlQUFtQztRQUh2QixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBeksvQzs7V0FFRztRQUNLLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQVVsQzs7V0FFRztRQUNLLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBVTdCOztXQUVHO1FBRUgsY0FBUyxHQUFxQyxPQUFPLENBQUM7UUFFdEQ7O1dBRUc7UUFDSyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBVXRCOztXQUVHO1FBQ0ssZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFVeEI7O1dBRUc7UUFDSyxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQTRCeEI7O1dBRUc7UUFDSyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUF5RGpDOztXQUVHO1FBQ0ksb0JBQWUsR0FBRyxDQUFDLFFBQVcsRUFBRSxFQUFFO1lBQ3ZDLE9BQU8sQ0FDTCxDQUFDLENBQUMsUUFBUTtnQkFDVixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dC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LENBQUMsVUFBVSxLQUFLLE1BQU07WUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVM7WUFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVTtnQkFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVM7Z0JBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDN0MsQ0FBQztJQWNELElBQUksUUFBUTtRQUNWLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQTJCUyxZQUFZLENBQUMsR0FBUTtRQUM3QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNsRixDQUFDLENBQUMsR0FBRztZQUNMLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDWCxDQUFDOzt3R0FuTW1CLFdBQVcsaUVBeUtyQixxQkFBcUI7NEZBektYLFdBQVc7MkZBQVgsV0FBVztrQkFEaEMsU0FBUzs7MEJBd0tMLFFBQVE7OzBCQUNSLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMscUJBQXFCOzRDQW5LM0IsZ0JBQWdCO3NCQURuQixLQUFLO2dCQWNGLFdBQVc7c0JBRGQsS0FBSztnQkFhTixTQUFTO3NCQURSLEtBQUs7Z0JBUUYsUUFBUTtzQkFEWCxLQUFLO2dCQWNGLFVBQVU7c0JBRGIsS0FBSztnQkFjRixVQUFVO3NCQURiLEtBQUs7Z0JBY0YsY0FBYztzQkFEakIsS0FBSztnQkFtQkYsZUFBZTtzQkFEbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IE93bERhdGVUaW1lRm9ybWF0cywgT1dMX0RBVEVfVElNRV9GT1JNQVRTIH0gZnJvbSAnLi4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbmV4cG9ydCB0eXBlIFBpY2tlclR5cGUgPSAnYm90aCcgfCAnY2FsZW5kYXInIHwgJ3RpbWVyJztcblxuZXhwb3J0IHR5cGUgUGlja2VyTW9kZSA9ICdwb3B1cCcgfCAnZGlhbG9nJyB8ICdpbmxpbmUnO1xuXG5leHBvcnQgdHlwZSBTZWxlY3RNb2RlID0gJ3NpbmdsZScgfCAncmFuZ2UnIHwgJ3JhbmdlRnJvbScgfCAncmFuZ2VUbyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE93bERhdGVUaW1lPFQ+IHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgc2Vjb25kJ3MgdGltZXJcbiAgICovXG4gIHByaXZhdGUgX3Nob3dTZWNvbmRzVGltZXIgPSBmYWxzZTtcbiAgQElucHV0KClcbiAgZ2V0IHNob3dTZWNvbmRzVGltZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dTZWNvbmRzVGltZXI7XG4gIH1cblxuICBzZXQgc2hvd1NlY29uZHNUaW1lcih2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93U2Vjb25kc1RpbWVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgdGltZXIgaXMgaW4gaG91cjEyIGZvcm1hdFxuICAgKi9cbiAgcHJpdmF0ZSBfaG91cjEyVGltZXIgPSBmYWxzZTtcbiAgQElucHV0KClcbiAgZ2V0IGhvdXIxMlRpbWVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9ob3VyMTJUaW1lcjtcbiAgfVxuXG4gIHNldCBob3VyMTJUaW1lcih2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9ob3VyMTJUaW1lciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB2aWV3IHRoYXQgdGhlIGNhbGVuZGFyIHNob3VsZCBzdGFydCBpbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHN0YXJ0VmlldzogJ21vbnRoJyB8ICd5ZWFyJyB8ICdtdWx0aS15ZWFycycgPSAnbW9udGgnO1xuXG4gIC8qKlxuICAgKiBIb3VycyB0byBjaGFuZ2UgcGVyIHN0ZXBcbiAgICovXG4gIHByaXZhdGUgX3N0ZXBIb3VyID0gMTtcbiAgQElucHV0KClcbiAgZ2V0IHN0ZXBIb3VyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXBIb3VyO1xuICB9XG5cbiAgc2V0IHN0ZXBIb3VyKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RlcEhvdXIgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1pbnV0ZXMgdG8gY2hhbmdlIHBlciBzdGVwXG4gICAqL1xuICBwcml2YXRlIF9zdGVwTWludXRlID0gMTtcbiAgQElucHV0KClcbiAgZ2V0IHN0ZXBNaW51dGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcE1pbnV0ZTtcbiAgfVxuXG4gIHNldCBzdGVwTWludXRlKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RlcE1pbnV0ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbCwgMSk7XG4gIH1cblxuICAvKipcbiAgICogU2Vjb25kcyB0byBjaGFuZ2UgcGVyIHN0ZXBcbiAgICovXG4gIHByaXZhdGUgX3N0ZXBTZWNvbmQgPSAxO1xuICBASW5wdXQoKVxuICBnZXQgc3RlcFNlY29uZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdGVwU2Vjb25kO1xuICB9XG5cbiAgc2V0IHN0ZXBTZWNvbmQodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwU2Vjb25kID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGZpcnN0IGRheSBvZiB3ZWVrXG4gICAqL1xuICBwcml2YXRlIF9maXJzdERheU9mV2VlazogbnVtYmVyO1xuICBASW5wdXQoKVxuICBnZXQgZmlyc3REYXlPZldlZWsoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrO1xuICB9XG5cbiAgc2V0IGZpcnN0RGF5T2ZXZWVrKHZhbHVlOiBudW1iZXIpIHtcbiAgICB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPiA2IHx8IHZhbHVlIDwgMCkge1xuICAgICAgdGhpcy5fZmlyc3REYXlPZldlZWsgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gaGlkZSBkYXRlcyBpbiBvdGhlciBtb250aHMgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgY3VycmVudCBtb250aC5cbiAgICovXG4gIHByaXZhdGUgX2hpZGVPdGhlck1vbnRocyA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBnZXQgaGlkZU90aGVyTW9udGhzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlT3RoZXJNb250aHM7XG4gIH1cblxuICBzZXQgaGlkZU90aGVyTW9udGhzKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVPdGhlck1vbnRocyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfaWQ6IHN0cmluZztcbiAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgYWJzdHJhY3QgZ2V0IHNlbGVjdGVkKCk6IFQgfCBudWxsO1xuXG4gIGFic3RyYWN0IGdldCBzZWxlY3RlZHMoKTogVFtdIHwgbnVsbDtcblxuICBhYnN0cmFjdCBnZXQgZGF0ZVRpbWVGaWx0ZXIoKTogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuO1xuXG4gIGFic3RyYWN0IGdldCBtYXhEYXRlVGltZSgpOiBUIHwgbnVsbDtcblxuICBhYnN0cmFjdCBnZXQgbWluRGF0ZVRpbWUoKTogVCB8IG51bGw7XG5cbiAgYWJzdHJhY3QgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZTtcblxuICBhYnN0cmFjdCBnZXQgc3RhcnRBdCgpOiBUIHwgbnVsbDtcblxuICBhYnN0cmFjdCBnZXQgb3BlbmVkKCk6IGJvb2xlYW47XG5cbiAgYWJzdHJhY3QgZ2V0IHBpY2tlck1vZGUoKTogUGlja2VyTW9kZTtcblxuICBhYnN0cmFjdCBnZXQgcGlja2VyVHlwZSgpOiBQaWNrZXJUeXBlO1xuXG4gIGFic3RyYWN0IGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuO1xuXG4gIGFic3RyYWN0IGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW47XG5cbiAgYWJzdHJhY3Qgc2VsZWN0KGRhdGU6IFQgfCBUW10pOiB2b2lkO1xuXG4gIGFic3RyYWN0IHllYXJTZWxlY3RlZDogRXZlbnRFbWl0dGVyPFQ+O1xuXG4gIGFic3RyYWN0IG1vbnRoU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxUPjtcblxuICBhYnN0cmFjdCBzZWxlY3RZZWFyKG5vcm1hbGl6ZWRZZWFyOiBUKTogdm9pZDtcblxuICBhYnN0cmFjdCBzZWxlY3RNb250aChub3JtYWxpemVkTW9udGg6IFQpOiB2b2lkO1xuXG4gIGdldCBmb3JtYXRTdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXJUeXBlID09PSAnYm90aCdcbiAgICAgID8gdGhpcy5kYXRlVGltZUZvcm1hdHMuZGlzcGxheS5mdWxsSW5wdXRcbiAgICAgIDogdGhpcy5waWNrZXJUeXBlID09PSAnY2FsZW5kYXInXG4gICAgICA/IHRoaXMuZGF0ZVRpbWVGb3JtYXRzLmRpc3BsYXkuZGF0ZUlucHV0XG4gICAgICA6IHRoaXMuZGF0ZVRpbWVGb3JtYXRzLmRpc3BsYXkudGltZUlucHV0O1xuICB9XG5cbiAgLyoqXG4gICAqIERhdGUgVGltZSBDaGVja2VyIHRvIGNoZWNrIGlmIHRoZSBnaXZlIGRhdGVUaW1lIGlzIHNlbGVjdGFibGVcbiAgICovXG4gIHB1YmxpYyBkYXRlVGltZUNoZWNrZXIgPSAoZGF0ZVRpbWU6IFQpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgISFkYXRlVGltZSAmJlxuICAgICAgKCF0aGlzLmRhdGVUaW1lRmlsdGVyIHx8IHRoaXMuZGF0ZVRpbWVGaWx0ZXIoZGF0ZVRpbWUpKSAmJlxuICAgICAgKCF0aGlzLm1pbkRhdGVUaW1lIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGVUaW1lLCB0aGlzLm1pbkRhdGVUaW1lKSA+PSAwKSAmJlxuICAgICAgKCF0aGlzLm1heERhdGVUaW1lIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGVUaW1lLCB0aGlzLm1heERhdGVUaW1lKSA8PSAwKVxuICAgICk7XG4gIH07XG5cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxuICAgIHByb3RlY3RlZCBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0cyxcbiAgKSB7XG4gICAgaWYgKCF0aGlzLmRhdGVUaW1lQWRhcHRlcikge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgIGBPd2xEYXRlVGltZVBpY2tlcjogTm8gcHJvdmlkZXIgZm91bmQgZm9yIERhdGVUaW1lQWRhcHRlci4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZm9sbG93aW5nIGAgK1xuICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdDogT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUgb3IgcHJvdmlkZSBhIGAgK1xuICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmRhdGVUaW1lRm9ybWF0cykge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgIGBPd2xEYXRlVGltZVBpY2tlcjogTm8gcHJvdmlkZXIgZm91bmQgZm9yIE9XTF9EQVRFX1RJTUVfRk9STUFUUy4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZm9sbG93aW5nIGAgK1xuICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdDogT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUgb3IgcHJvdmlkZSBhIGAgK1xuICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5faWQgPSBgb3dsLWR0LXBpY2tlci0ke25leHRVbmlxdWVJZCsrfWA7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKVxuICAgICAgPyBvYmpcbiAgICAgIDogbnVsbDtcbiAgfVxufVxuIl19