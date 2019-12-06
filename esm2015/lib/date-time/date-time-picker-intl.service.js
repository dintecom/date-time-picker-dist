/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker-intl.service
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class OwlDateTimeIntl {
    constructor() {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         */
        this.changes = new Subject();
        /**
         * A label for the up second button (used by screen readers).
         */
        this.upSecondLabel = 'Add a second';
        /**
         * A label for the down second button (used by screen readers).
         */
        this.downSecondLabel = 'Minus a second';
        /**
         * A label for the up minute button (used by screen readers).
         */
        this.upMinuteLabel = 'Add a minute';
        /**
         * A label for the down minute button (used by screen readers).
         */
        this.downMinuteLabel = 'Minus a minute';
        /**
         * A label for the up hour button (used by screen readers).
         */
        this.upHourLabel = 'Add a hour';
        /**
         * A label for the down hour button (used by screen readers).
         */
        this.downHourLabel = 'Minus a hour';
        /**
         * A label for the previous month button (used by screen readers).
         */
        this.prevMonthLabel = 'Previous month';
        /**
         * A label for the next month button (used by screen readers).
         */
        this.nextMonthLabel = 'Next month';
        /**
         * A label for the previous year button (used by screen readers).
         */
        this.prevYearLabel = 'Previous year';
        /**
         * A label for the next year button (used by screen readers).
         */
        this.nextYearLabel = 'Next year';
        /**
         * A label for the previous multi-year button (used by screen readers).
         */
        this.prevMultiYearLabel = 'Previous 21 years';
        /**
         * A label for the next multi-year button (used by screen readers).
         */
        this.nextMultiYearLabel = 'Next 21 years';
        /**
         * A label for the 'switch to month view' button (used by screen readers).
         */
        this.switchToMonthViewLabel = 'Change to month view';
        /**
         * A label for the 'switch to year view' button (used by screen readers).
         */
        this.switchToMultiYearViewLabel = 'Choose month and year';
        /**
         * A label for the cancel button
         */
        this.cancelBtnLabel = 'Cancel';
        /**
         * A label for the set button
         */
        this.setBtnLabel = 'Set';
        /**
         * A label for the range 'from' in picker info
         */
        this.rangeFromLabel = 'From';
        /**
         * A label for the range 'to' in picker info
         */
        this.rangeToLabel = 'To';
        /**
         * A label for the hour12 button (AM)
         */
        this.hour12AMLabel = 'AM';
        /**
         * A label for the hour12 button (PM)
         */
        this.hour12PMLabel = 'PM';
    }
}
OwlDateTimeIntl.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ OwlDateTimeIntl.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function OwlDateTimeIntl_Factory() { return new OwlDateTimeIntl(); }, token: OwlDateTimeIntl, providedIn: "root" });
if (false) {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     * @type {?}
     */
    OwlDateTimeIntl.prototype.changes;
    /**
     * A label for the up second button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.upSecondLabel;
    /**
     * A label for the down second button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.downSecondLabel;
    /**
     * A label for the up minute button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.upMinuteLabel;
    /**
     * A label for the down minute button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.downMinuteLabel;
    /**
     * A label for the up hour button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.upHourLabel;
    /**
     * A label for the down hour button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.downHourLabel;
    /**
     * A label for the previous month button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.prevMonthLabel;
    /**
     * A label for the next month button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.nextMonthLabel;
    /**
     * A label for the previous year button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.prevYearLabel;
    /**
     * A label for the next year button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.nextYearLabel;
    /**
     * A label for the previous multi-year button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.prevMultiYearLabel;
    /**
     * A label for the next multi-year button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.nextMultiYearLabel;
    /**
     * A label for the 'switch to month view' button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.switchToMonthViewLabel;
    /**
     * A label for the 'switch to year view' button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.switchToMultiYearViewLabel;
    /**
     * A label for the cancel button
     * @type {?}
     */
    OwlDateTimeIntl.prototype.cancelBtnLabel;
    /**
     * A label for the set button
     * @type {?}
     */
    OwlDateTimeIntl.prototype.setBtnLabel;
    /**
     * A label for the range 'from' in picker info
     * @type {?}
     */
    OwlDateTimeIntl.prototype.rangeFromLabel;
    /**
     * A label for the range 'to' in picker info
     * @type {?}
     */
    OwlDateTimeIntl.prototype.rangeToLabel;
    /**
     * A label for the hour12 button (AM)
     * @type {?}
     */
    OwlDateTimeIntl.prototype.hour12AMLabel;
    /**
     * A label for the hour12 button (PM)
     * @type {?}
     */
    OwlDateTimeIntl.prototype.hour12PMLabel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHL0IsTUFBTSxPQUFPLGVBQWU7SUFENUI7Ozs7O1FBTWEsWUFBTyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1FBR3RELGtCQUFhLEdBQUcsY0FBYyxDQUFDOzs7O1FBRy9CLG9CQUFlLEdBQUcsZ0JBQWdCLENBQUM7Ozs7UUFHbkMsa0JBQWEsR0FBRyxjQUFjLENBQUM7Ozs7UUFHL0Isb0JBQWUsR0FBRyxnQkFBZ0IsQ0FBQzs7OztRQUduQyxnQkFBVyxHQUFHLFlBQVksQ0FBQzs7OztRQUczQixrQkFBYSxHQUFHLGNBQWMsQ0FBQzs7OztRQUcvQixtQkFBYyxHQUFHLGdCQUFnQixDQUFDOzs7O1FBR2xDLG1CQUFjLEdBQUcsWUFBWSxDQUFDOzs7O1FBRzlCLGtCQUFhLEdBQUcsZUFBZSxDQUFDOzs7O1FBR2hDLGtCQUFhLEdBQUcsV0FBVyxDQUFDOzs7O1FBRzVCLHVCQUFrQixHQUFHLG1CQUFtQixDQUFDOzs7O1FBR3pDLHVCQUFrQixHQUFHLGVBQWUsQ0FBQzs7OztRQUdyQywyQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQzs7OztRQUdoRCwrQkFBMEIsR0FBRyx1QkFBdUIsQ0FBQzs7OztRQUdyRCxtQkFBYyxHQUFHLFFBQVEsQ0FBQzs7OztRQUcxQixnQkFBVyxHQUFHLEtBQUssQ0FBQzs7OztRQUdwQixtQkFBYyxHQUFHLE1BQU0sQ0FBQzs7OztRQUd4QixpQkFBWSxHQUFHLElBQUksQ0FBQzs7OztRQUdwQixrQkFBYSxHQUFHLElBQUksQ0FBQzs7OztRQUdyQixrQkFBYSxHQUFHLElBQUksQ0FBQztLQUN4Qjs7O1lBbkVBLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7Ozs7Ozs7OztJQU05QixrQ0FBc0Q7Ozs7O0lBR3RELHdDQUErQjs7Ozs7SUFHL0IsMENBQW1DOzs7OztJQUduQyx3Q0FBK0I7Ozs7O0lBRy9CLDBDQUFtQzs7Ozs7SUFHbkMsc0NBQTJCOzs7OztJQUczQix3Q0FBK0I7Ozs7O0lBRy9CLHlDQUFrQzs7Ozs7SUFHbEMseUNBQThCOzs7OztJQUc5Qix3Q0FBZ0M7Ozs7O0lBR2hDLHdDQUE0Qjs7Ozs7SUFHNUIsNkNBQXlDOzs7OztJQUd6Qyw2Q0FBcUM7Ozs7O0lBR3JDLGlEQUFnRDs7Ozs7SUFHaEQscURBQXFEOzs7OztJQUdyRCx5Q0FBMEI7Ozs7O0lBRzFCLHNDQUFvQjs7Ozs7SUFHcEIseUNBQXdCOzs7OztJQUd4Qix1Q0FBb0I7Ozs7O0lBR3BCLHdDQUFxQjs7Ozs7SUFHckIsd0NBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZVxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZUludGwge1xuICAgIC8qKlxuICAgICAqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBsYWJlbHMgaGVyZSBhcmUgY2hhbmdlZC4gVXNlIHRoaXMgdG8gbm90aWZ5XG4gICAgICogY29tcG9uZW50cyBpZiB0aGUgbGFiZWxzIGhhdmUgY2hhbmdlZCBhZnRlciBpbml0aWFsaXphdGlvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSBjaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgdXAgc2Vjb25kIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICAqL1xuICAgIHVwU2Vjb25kTGFiZWwgPSAnQWRkIGEgc2Vjb25kJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgZG93biBzZWNvbmQgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gICovXG4gICAgZG93blNlY29uZExhYmVsID0gJ01pbnVzIGEgc2Vjb25kJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgdXAgbWludXRlIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICAqL1xuICAgIHVwTWludXRlTGFiZWwgPSAnQWRkIGEgbWludXRlJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgZG93biBtaW51dGUgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gICovXG4gICAgZG93bk1pbnV0ZUxhYmVsID0gJ01pbnVzIGEgbWludXRlJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgdXAgaG91ciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAgKi9cbiAgICB1cEhvdXJMYWJlbCA9ICdBZGQgYSBob3VyJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgZG93biBob3VyIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICAqL1xuICAgIGRvd25Ib3VyTGFiZWwgPSAnTWludXMgYSBob3VyJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgbW9udGggYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cbiAgICBwcmV2TW9udGhMYWJlbCA9ICdQcmV2aW91cyBtb250aCc7XG5cbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIG5leHQgbW9udGggYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cbiAgICBuZXh0TW9udGhMYWJlbCA9ICdOZXh0IG1vbnRoJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgeWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICAgIHByZXZZZWFyTGFiZWwgPSAnUHJldmlvdXMgeWVhcic7XG5cbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIG5leHQgeWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICAgIG5leHRZZWFyTGFiZWwgPSAnTmV4dCB5ZWFyJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgbXVsdGkteWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICAgIHByZXZNdWx0aVllYXJMYWJlbCA9ICdQcmV2aW91cyAyMSB5ZWFycyc7XG5cbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIG5leHQgbXVsdGkteWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICAgIG5leHRNdWx0aVllYXJMYWJlbCA9ICdOZXh0IDIxIHllYXJzJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byBtb250aCB2aWV3JyBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICAgIHN3aXRjaFRvTW9udGhWaWV3TGFiZWwgPSAnQ2hhbmdlIHRvIG1vbnRoIHZpZXcnO1xuXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSAnc3dpdGNoIHRvIHllYXIgdmlldycgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cbiAgICBzd2l0Y2hUb011bHRpWWVhclZpZXdMYWJlbCA9ICdDaG9vc2UgbW9udGggYW5kIHllYXInO1xuXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSBjYW5jZWwgYnV0dG9uICovXG4gICAgY2FuY2VsQnRuTGFiZWwgPSAnQ2FuY2VsJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgc2V0IGJ1dHRvbiAqL1xuICAgIHNldEJ0bkxhYmVsID0gJ1NldCc7XG5cbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIHJhbmdlICdmcm9tJyBpbiBwaWNrZXIgaW5mbyAqL1xuICAgIHJhbmdlRnJvbUxhYmVsID0gJ0Zyb20nO1xuXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSByYW5nZSAndG8nIGluIHBpY2tlciBpbmZvICovXG4gICAgcmFuZ2VUb0xhYmVsID0gJ1RvJztcblxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgaG91cjEyIGJ1dHRvbiAoQU0pICovXG4gICAgaG91cjEyQU1MYWJlbCA9ICdBTSc7XG5cbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIGhvdXIxMiBidXR0b24gKFBNKSAqL1xuICAgIGhvdXIxMlBNTGFiZWwgPSAnUE0nO1xufVxuIl19