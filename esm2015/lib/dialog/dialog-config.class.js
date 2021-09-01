import { NoopScrollStrategy } from '@angular/cdk/overlay';
let uniqueId = 0;
export class OwlDialogConfig {
    constructor() {
        /**
         * ID of the element that describes the dialog.
         */
        this.ariaDescribedBy = null;
        /**
         * Whether to focus the dialog when the dialog is opened
         */
        this.autoFocus = true;
        /** Whether the dialog has a backdrop. */
        this.hasBackdrop = true;
        /** Data being injected into the child component. */
        this.data = null;
        /** Whether the user can use escape or clicking outside to close a modal. */
        this.disableClose = false;
        /**
         * The ARIA role of the dialog element.
         */
        this.role = 'dialog';
        /**
         * Custom class for the pane
         */
        this.paneClass = '';
        /**
         * Mouse Event
         */
        this.event = null;
        /**
         * Custom class for the backdrop
         */
        this.backdropClass = '';
        /**
         * Whether the dialog should close when the user goes backwards/forwards in history.
         */
        this.closeOnNavigation = true;
        /** Width of the dialog. */
        this.width = '';
        /** Height of the dialog. */
        this.height = '';
        /**
         * The max-width of the overlay panel.
         * If a number is provided, pixel units are assumed.
         */
        this.maxWidth = '85vw';
        /**
         * The scroll strategy when the dialog is open
         * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
         */
        this.scrollStrategy = new NoopScrollStrategy();
        this.id = `owl-dialog-${uniqueId++}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbmZpZy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RpYWxvZy9kaWFsb2ctY29uZmlnLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxrQkFBa0IsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUUxRSxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFpQmpCLE1BQU0sT0FBTyxlQUFlO0lBZ0d4QjtRQS9GQTs7V0FFRztRQUNJLG9CQUFlLEdBQW1CLElBQUksQ0FBQztRQUU5Qzs7V0FFRztRQUNJLGNBQVMsR0FBSSxJQUFJLENBQUM7UUFFekIseUNBQXlDO1FBQ2xDLGdCQUFXLEdBQUksSUFBSSxDQUFDO1FBTzNCLG9EQUFvRDtRQUM3QyxTQUFJLEdBQVMsSUFBSSxDQUFDO1FBRXpCLDRFQUE0RTtRQUNyRSxpQkFBWSxHQUFJLEtBQUssQ0FBQztRQU83Qjs7V0FFRztRQUNJLFNBQUksR0FBOEIsUUFBUSxDQUFDO1FBRWxEOztXQUVHO1FBQ0ksY0FBUyxHQUF1QixFQUFFLENBQUM7UUFFMUM7O1dBRUc7UUFDSSxVQUFLLEdBQWdCLElBQUksQ0FBQztRQUVqQzs7V0FFRztRQUNJLGtCQUFhLEdBQXVCLEVBQUUsQ0FBQztRQUU5Qzs7V0FFRztRQUNJLHNCQUFpQixHQUFJLElBQUksQ0FBQztRQUVqQywyQkFBMkI7UUFDcEIsVUFBSyxHQUFJLEVBQUUsQ0FBQztRQUVuQiw0QkFBNEI7UUFDckIsV0FBTSxHQUFJLEVBQUUsQ0FBQztRQWNwQjs7O1dBR0c7UUFDSSxhQUFRLEdBQXFCLE1BQU0sQ0FBQztRQVczQzs7O1dBR0c7UUFDSSxtQkFBYyxHQUFvQixJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFLOUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxjQUFjLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDekMsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkaWFsb2ctY29uZmlnLmNsYXNzXG4gKi9cbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vb3BTY3JvbGxTdHJhdGVneSwgU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5cbmxldCB1bmlxdWVJZCA9IDA7XG5cbi8qKiBQb3NzaWJsZSBvdmVycmlkZXMgZm9yIGEgZGlhbG9nJ3MgcG9zaXRpb24uICovXG5leHBvcnQgaW50ZXJmYWNlIERpYWxvZ1Bvc2l0aW9uIHtcbiAgICAvKiogT3ZlcnJpZGUgZm9yIHRoZSBkaWFsb2cncyB0b3AgcG9zaXRpb24uICovXG4gICAgdG9wPzogc3RyaW5nO1xuXG4gICAgLyoqIE92ZXJyaWRlIGZvciB0aGUgZGlhbG9nJ3MgYm90dG9tIHBvc2l0aW9uLiAqL1xuICAgIGJvdHRvbT86IHN0cmluZztcblxuICAgIC8qKiBPdmVycmlkZSBmb3IgdGhlIGRpYWxvZydzIGxlZnQgcG9zaXRpb24uICovXG4gICAgbGVmdD86IHN0cmluZztcblxuICAgIC8qKiBPdmVycmlkZSBmb3IgdGhlIGRpYWxvZydzIHJpZ2h0IHBvc2l0aW9uLiAqL1xuICAgIHJpZ2h0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgT3dsRGlhbG9nQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBJRCBvZiB0aGUgZWxlbWVudCB0aGF0IGRlc2NyaWJlcyB0aGUgZGlhbG9nLlxuICAgICAqL1xuICAgIHB1YmxpYyBhcmlhRGVzY3JpYmVkQnk/OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZm9jdXMgdGhlIGRpYWxvZyB3aGVuIHRoZSBkaWFsb2cgaXMgb3BlbmVkXG4gICAgICovXG4gICAgcHVibGljIGF1dG9Gb2N1cz8gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRpYWxvZyBoYXMgYSBiYWNrZHJvcC4gKi9cbiAgICBwdWJsaWMgaGFzQmFja2Ryb3A/ID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBzdHlsZSBmb3IgdGhlIGJhY2tkcm9wXG4gICAgICovXG4gICAgcHVibGljIGJhY2tkcm9wU3R5bGU/OiBhbnk7XG5cbiAgICAvKiogRGF0YSBiZWluZyBpbmplY3RlZCBpbnRvIHRoZSBjaGlsZCBjb21wb25lbnQuICovXG4gICAgcHVibGljIGRhdGE/OiBhbnkgPSBudWxsO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgY2FuIHVzZSBlc2NhcGUgb3IgY2xpY2tpbmcgb3V0c2lkZSB0byBjbG9zZSBhIG1vZGFsLiAqL1xuICAgIHB1YmxpYyBkaXNhYmxlQ2xvc2U/ID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBJRCBmb3IgdGhlIG1vZGFsLiBJZiBvbWl0dGVkLCBhIHVuaXF1ZSBvbmUgd2lsbCBiZSBnZW5lcmF0ZWQuXG4gICAgICovXG4gICAgcHVibGljIGlkPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIEFSSUEgcm9sZSBvZiB0aGUgZGlhbG9nIGVsZW1lbnQuXG4gICAgICovXG4gICAgcHVibGljIHJvbGU/OiAnZGlhbG9nJyB8ICdhbGVydGRpYWxvZycgPSAnZGlhbG9nJztcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBjbGFzcyBmb3IgdGhlIHBhbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgcGFuZUNsYXNzPzogc3RyaW5nIHwgc3RyaW5nW10gPSAnJztcblxuICAgIC8qKlxuICAgICAqIE1vdXNlIEV2ZW50XG4gICAgICovXG4gICAgcHVibGljIGV2ZW50PzogTW91c2VFdmVudCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBiYWNrZHJvcFxuICAgICAqL1xuICAgIHB1YmxpYyBiYWNrZHJvcENsYXNzPzogc3RyaW5nIHwgc3RyaW5nW10gPSAnJztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGRpYWxvZyBzaG91bGQgY2xvc2Ugd2hlbiB0aGUgdXNlciBnb2VzIGJhY2t3YXJkcy9mb3J3YXJkcyBpbiBoaXN0b3J5LlxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9zZU9uTmF2aWdhdGlvbj8gPSB0cnVlO1xuXG4gICAgLyoqIFdpZHRoIG9mIHRoZSBkaWFsb2cuICovXG4gICAgcHVibGljIHdpZHRoPyA9ICcnO1xuXG4gICAgLyoqIEhlaWdodCBvZiB0aGUgZGlhbG9nLiAqL1xuICAgIHB1YmxpYyBoZWlnaHQ/ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWluLXdpZHRoIG9mIHRoZSBvdmVybGF5IHBhbmVsLlxuICAgICAqIElmIGEgbnVtYmVyIGlzIHByb3ZpZGVkLCBwaXhlbCB1bml0cyBhcmUgYXNzdW1lZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgbWluV2lkdGg/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWluLWhlaWdodCBvZiB0aGUgb3ZlcmxheSBwYW5lbC5cbiAgICAgKiBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgcGl4ZWwgdW5pdHMgYXJlIGFzc3VtZWQuXG4gICAgICovXG4gICAgcHVibGljIG1pbkhlaWdodD86IG51bWJlciB8IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBtYXgtd2lkdGggb2YgdGhlIG92ZXJsYXkgcGFuZWwuXG4gICAgICogSWYgYSBudW1iZXIgaXMgcHJvdmlkZWQsIHBpeGVsIHVuaXRzIGFyZSBhc3N1bWVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBtYXhXaWR0aD86IG51bWJlciB8IHN0cmluZyA9ICc4NXZ3JztcblxuICAgIC8qKlxuICAgICAqIFRoZSBtYXgtaGVpZ2h0IG9mIHRoZSBvdmVybGF5IHBhbmVsLlxuICAgICAqIElmIGEgbnVtYmVyIGlzIHByb3ZpZGVkLCBwaXhlbCB1bml0cyBhcmUgYXNzdW1lZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgbWF4SGVpZ2h0PzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gICAgLyoqIFBvc2l0aW9uIG92ZXJyaWRlcy4gKi9cbiAgICBwdWJsaWMgcG9zaXRpb24/OiBEaWFsb2dQb3NpdGlvbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzY3JvbGwgc3RyYXRlZ3kgd2hlbiB0aGUgZGlhbG9nIGlzIG9wZW5cbiAgICAgKiBMZWFybiBtb3JlIHRoaXMgZnJvbSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vY2RrL292ZXJsYXkvb3ZlcnZpZXcjc2Nyb2xsLXN0cmF0ZWdpZXNcbiAgICAgKi9cbiAgICBwdWJsaWMgc2Nyb2xsU3RyYXRlZ3k/OiBTY3JvbGxTdHJhdGVneSA9IG5ldyBOb29wU2Nyb2xsU3RyYXRlZ3koKTtcblxuICAgIHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmPzogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlkID0gYG93bC1kaWFsb2ctJHt1bmlxdWVJZCsrfWA7XG4gICAgfVxufVxuIl19