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
        /** A label for the up second button (used by screen readers).  */
        this.upSecondLabel = 'Add a second';
        /** A label for the down second button (used by screen readers).  */
        this.downSecondLabel = 'Minus a second';
        /** A label for the up minute button (used by screen readers).  */
        this.upMinuteLabel = 'Add a minute';
        /** A label for the down minute button (used by screen readers).  */
        this.downMinuteLabel = 'Minus a minute';
        /** A label for the up hour button (used by screen readers).  */
        this.upHourLabel = 'Add a hour';
        /** A label for the down hour button (used by screen readers).  */
        this.downHourLabel = 'Minus a hour';
        /** A label for the previous month button (used by screen readers). */
        this.prevMonthLabel = 'Previous month';
        /** A label for the next month button (used by screen readers). */
        this.nextMonthLabel = 'Next month';
        /** A label for the previous year button (used by screen readers). */
        this.prevYearLabel = 'Previous year';
        /** A label for the next year button (used by screen readers). */
        this.nextYearLabel = 'Next year';
        /** A label for the previous multi-year button (used by screen readers). */
        this.prevMultiYearLabel = 'Previous 21 years';
        /** A label for the next multi-year button (used by screen readers). */
        this.nextMultiYearLabel = 'Next 21 years';
        /** A label for the 'switch to month view' button (used by screen readers). */
        this.switchToMonthViewLabel = 'Change to month view';
        /** A label for the 'switch to year view' button (used by screen readers). */
        this.switchToMultiYearViewLabel = 'Choose month and year';
        /** A label for the cancel button */
        this.cancelBtnLabel = 'Cancel';
        /** A label for the set button */
        this.setBtnLabel = 'Set';
        /** A label for the range 'from' in picker info */
        this.rangeFromLabel = 'From';
        /** A label for the range 'to' in picker info */
        this.rangeToLabel = 'To';
        /** A label for the hour12 button (AM) */
        this.hour12AMLabel = 'AM';
        /** A label for the hour12 button (PM) */
        this.hour12PMLabel = 'PM';
    }
}
OwlDateTimeIntl.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: OwlDateTimeIntl, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OwlDateTimeIntl.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: OwlDateTimeIntl, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: OwlDateTimeIntl, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUcvQixNQUFNLE9BQU8sZUFBZTtJQUQ1QjtRQUVFOzs7V0FHRztRQUNNLFlBQU8sR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUV0RCxrRUFBa0U7UUFDbEUsa0JBQWEsR0FBRyxjQUFjLENBQUM7UUFFL0Isb0VBQW9FO1FBQ3BFLG9CQUFlLEdBQUcsZ0JBQWdCLENBQUM7UUFFbkMsa0VBQWtFO1FBQ2xFLGtCQUFhLEdBQUcsY0FBYyxDQUFDO1FBRS9CLG9FQUFvRTtRQUNwRSxvQkFBZSxHQUFHLGdCQUFnQixDQUFDO1FBRW5DLGdFQUFnRTtRQUNoRSxnQkFBVyxHQUFHLFlBQVksQ0FBQztRQUUzQixrRUFBa0U7UUFDbEUsa0JBQWEsR0FBRyxjQUFjLENBQUM7UUFFL0Isc0VBQXNFO1FBQ3RFLG1CQUFjLEdBQUcsZ0JBQWdCLENBQUM7UUFFbEMsa0VBQWtFO1FBQ2xFLG1CQUFjLEdBQUcsWUFBWSxDQUFDO1FBRTlCLHFFQUFxRTtRQUNyRSxrQkFBYSxHQUFHLGVBQWUsQ0FBQztRQUVoQyxpRUFBaUU7UUFDakUsa0JBQWEsR0FBRyxXQUFXLENBQUM7UUFFNUIsMkVBQTJFO1FBQzNFLHVCQUFrQixHQUFHLG1CQUFtQixDQUFDO1FBRXpDLHVFQUF1RTtRQUN2RSx1QkFBa0IsR0FBRyxlQUFlLENBQUM7UUFFckMsOEVBQThFO1FBQzlFLDJCQUFzQixHQUFHLHNCQUFzQixDQUFDO1FBRWhELDZFQUE2RTtRQUM3RSwrQkFBMEIsR0FBRyx1QkFBdUIsQ0FBQztRQUVyRCxvQ0FBb0M7UUFDcEMsbUJBQWMsR0FBRyxRQUFRLENBQUM7UUFFMUIsaUNBQWlDO1FBQ2pDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXBCLGtEQUFrRDtRQUNsRCxtQkFBYyxHQUFHLE1BQU0sQ0FBQztRQUV4QixnREFBZ0Q7UUFDaEQsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFcEIseUNBQXlDO1FBQ3pDLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXJCLHlDQUF5QztRQUN6QyxrQkFBYSxHQUFHLElBQUksQ0FBQztLQUN0Qjs7NEdBbEVZLGVBQWU7Z0hBQWYsZUFBZSxjQURGLE1BQU07MkZBQ25CLGVBQWU7a0JBRDNCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lSW50bCB7XG4gIC8qKlxuICAgKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgbGFiZWxzIGhlcmUgYXJlIGNoYW5nZWQuIFVzZSB0aGlzIHRvIG5vdGlmeVxuICAgKiBjb21wb25lbnRzIGlmIHRoZSBsYWJlbHMgaGF2ZSBjaGFuZ2VkIGFmdGVyIGluaXRpYWxpemF0aW9uLlxuICAgKi9cbiAgcmVhZG9ubHkgY2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSB1cCBzZWNvbmQgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gICovXG4gIHVwU2Vjb25kTGFiZWwgPSAnQWRkIGEgc2Vjb25kJztcblxuICAvKiogQSBsYWJlbCBmb3IgdGhlIGRvd24gc2Vjb25kIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICAqL1xuICBkb3duU2Vjb25kTGFiZWwgPSAnTWludXMgYSBzZWNvbmQnO1xuXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgdXAgbWludXRlIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICAqL1xuICB1cE1pbnV0ZUxhYmVsID0gJ0FkZCBhIG1pbnV0ZSc7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBkb3duIG1pbnV0ZSBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAgKi9cbiAgZG93bk1pbnV0ZUxhYmVsID0gJ01pbnVzIGEgbWludXRlJztcblxuICAvKiogQSBsYWJlbCBmb3IgdGhlIHVwIGhvdXIgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gICovXG4gIHVwSG91ckxhYmVsID0gJ0FkZCBhIGhvdXInO1xuXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgZG93biBob3VyIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICAqL1xuICBkb3duSG91ckxhYmVsID0gJ01pbnVzIGEgaG91cic7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBwcmV2aW91cyBtb250aCBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICBwcmV2TW9udGhMYWJlbCA9ICdQcmV2aW91cyBtb250aCc7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBuZXh0IG1vbnRoIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXG4gIG5leHRNb250aExhYmVsID0gJ05leHQgbW9udGgnO1xuXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgeWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICBwcmV2WWVhckxhYmVsID0gJ1ByZXZpb3VzIHllYXInO1xuXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgbmV4dCB5ZWFyIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXG4gIG5leHRZZWFyTGFiZWwgPSAnTmV4dCB5ZWFyJztcblxuICAvKiogQSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIG11bHRpLXllYXIgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cbiAgcHJldk11bHRpWWVhckxhYmVsID0gJ1ByZXZpb3VzIDIxIHllYXJzJztcblxuICAvKiogQSBsYWJlbCBmb3IgdGhlIG5leHQgbXVsdGkteWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xuICBuZXh0TXVsdGlZZWFyTGFiZWwgPSAnTmV4dCAyMSB5ZWFycyc7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSAnc3dpdGNoIHRvIG1vbnRoIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXG4gIHN3aXRjaFRvTW9udGhWaWV3TGFiZWwgPSAnQ2hhbmdlIHRvIG1vbnRoIHZpZXcnO1xuXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byB5ZWFyIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXG4gIHN3aXRjaFRvTXVsdGlZZWFyVmlld0xhYmVsID0gJ0Nob29zZSBtb250aCBhbmQgeWVhcic7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBjYW5jZWwgYnV0dG9uICovXG4gIGNhbmNlbEJ0bkxhYmVsID0gJ0NhbmNlbCc7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBzZXQgYnV0dG9uICovXG4gIHNldEJ0bkxhYmVsID0gJ1NldCc7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSByYW5nZSAnZnJvbScgaW4gcGlja2VyIGluZm8gKi9cbiAgcmFuZ2VGcm9tTGFiZWwgPSAnRnJvbSc7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSByYW5nZSAndG8nIGluIHBpY2tlciBpbmZvICovXG4gIHJhbmdlVG9MYWJlbCA9ICdUbyc7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBob3VyMTIgYnV0dG9uIChBTSkgKi9cbiAgaG91cjEyQU1MYWJlbCA9ICdBTSc7XG5cbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBob3VyMTIgYnV0dG9uIChQTSkgKi9cbiAgaG91cjEyUE1MYWJlbCA9ICdQTSc7XG59XG4iXX0=