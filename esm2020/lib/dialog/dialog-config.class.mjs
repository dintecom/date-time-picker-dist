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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbmZpZy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RpYWxvZy9kaWFsb2ctY29uZmlnLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxrQkFBa0IsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUUxRSxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFpQmpCLE1BQU0sT0FBTyxlQUFlO0lBZ0cxQjtRQS9GQTs7V0FFRztRQUNJLG9CQUFlLEdBQW1CLElBQUksQ0FBQztRQUU5Qzs7V0FFRztRQUNJLGNBQVMsR0FBSSxJQUFJLENBQUM7UUFFekIseUNBQXlDO1FBQ2xDLGdCQUFXLEdBQUksSUFBSSxDQUFDO1FBTzNCLG9EQUFvRDtRQUM3QyxTQUFJLEdBQVMsSUFBSSxDQUFDO1FBRXpCLDRFQUE0RTtRQUNyRSxpQkFBWSxHQUFJLEtBQUssQ0FBQztRQU83Qjs7V0FFRztRQUNJLFNBQUksR0FBOEIsUUFBUSxDQUFDO1FBRWxEOztXQUVHO1FBQ0ksY0FBUyxHQUF1QixFQUFFLENBQUM7UUFFMUM7O1dBRUc7UUFDSSxVQUFLLEdBQWdCLElBQUksQ0FBQztRQUVqQzs7V0FFRztRQUNJLGtCQUFhLEdBQXVCLEVBQUUsQ0FBQztRQUU5Qzs7V0FFRztRQUNJLHNCQUFpQixHQUFJLElBQUksQ0FBQztRQUVqQywyQkFBMkI7UUFDcEIsVUFBSyxHQUFJLEVBQUUsQ0FBQztRQUVuQiw0QkFBNEI7UUFDckIsV0FBTSxHQUFJLEVBQUUsQ0FBQztRQWNwQjs7O1dBR0c7UUFDSSxhQUFRLEdBQXFCLE1BQU0sQ0FBQztRQVczQzs7O1dBR0c7UUFDSSxtQkFBYyxHQUFvQixJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFLaEUsSUFBSSxDQUFDLEVBQUUsR0FBRyxjQUFjLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDdkMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm9vcFNjcm9sbFN0cmF0ZWd5LCBTY3JvbGxTdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcblxubGV0IHVuaXF1ZUlkID0gMDtcblxuLyoqIFBvc3NpYmxlIG92ZXJyaWRlcyBmb3IgYSBkaWFsb2cncyBwb3NpdGlvbi4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGlhbG9nUG9zaXRpb24ge1xuICAvKiogT3ZlcnJpZGUgZm9yIHRoZSBkaWFsb2cncyB0b3AgcG9zaXRpb24uICovXG4gIHRvcD86IHN0cmluZztcblxuICAvKiogT3ZlcnJpZGUgZm9yIHRoZSBkaWFsb2cncyBib3R0b20gcG9zaXRpb24uICovXG4gIGJvdHRvbT86IHN0cmluZztcblxuICAvKiogT3ZlcnJpZGUgZm9yIHRoZSBkaWFsb2cncyBsZWZ0IHBvc2l0aW9uLiAqL1xuICBsZWZ0Pzogc3RyaW5nO1xuXG4gIC8qKiBPdmVycmlkZSBmb3IgdGhlIGRpYWxvZydzIHJpZ2h0IHBvc2l0aW9uLiAqL1xuICByaWdodD86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIE93bERpYWxvZ0NvbmZpZyB7XG4gIC8qKlxuICAgKiBJRCBvZiB0aGUgZWxlbWVudCB0aGF0IGRlc2NyaWJlcyB0aGUgZGlhbG9nLlxuICAgKi9cbiAgcHVibGljIGFyaWFEZXNjcmliZWRCeT86IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGZvY3VzIHRoZSBkaWFsb2cgd2hlbiB0aGUgZGlhbG9nIGlzIG9wZW5lZFxuICAgKi9cbiAgcHVibGljIGF1dG9Gb2N1cz8gPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBkaWFsb2cgaGFzIGEgYmFja2Ryb3AuICovXG4gIHB1YmxpYyBoYXNCYWNrZHJvcD8gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBDdXN0b20gc3R5bGUgZm9yIHRoZSBiYWNrZHJvcFxuICAgKi9cbiAgcHVibGljIGJhY2tkcm9wU3R5bGU/OiBhbnk7XG5cbiAgLyoqIERhdGEgYmVpbmcgaW5qZWN0ZWQgaW50byB0aGUgY2hpbGQgY29tcG9uZW50LiAqL1xuICBwdWJsaWMgZGF0YT86IGFueSA9IG51bGw7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgY2FuIHVzZSBlc2NhcGUgb3IgY2xpY2tpbmcgb3V0c2lkZSB0byBjbG9zZSBhIG1vZGFsLiAqL1xuICBwdWJsaWMgZGlzYWJsZUNsb3NlPyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJRCBmb3IgdGhlIG1vZGFsLiBJZiBvbWl0dGVkLCBhIHVuaXF1ZSBvbmUgd2lsbCBiZSBnZW5lcmF0ZWQuXG4gICAqL1xuICBwdWJsaWMgaWQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBBUklBIHJvbGUgb2YgdGhlIGRpYWxvZyBlbGVtZW50LlxuICAgKi9cbiAgcHVibGljIHJvbGU/OiAnZGlhbG9nJyB8ICdhbGVydGRpYWxvZycgPSAnZGlhbG9nJztcblxuICAvKipcbiAgICogQ3VzdG9tIGNsYXNzIGZvciB0aGUgcGFuZVxuICAgKi9cbiAgcHVibGljIHBhbmVDbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdID0gJyc7XG5cbiAgLyoqXG4gICAqIE1vdXNlIEV2ZW50XG4gICAqL1xuICBwdWJsaWMgZXZlbnQ/OiBNb3VzZUV2ZW50ID0gbnVsbDtcblxuICAvKipcbiAgICogQ3VzdG9tIGNsYXNzIGZvciB0aGUgYmFja2Ryb3BcbiAgICovXG4gIHB1YmxpYyBiYWNrZHJvcENsYXNzPzogc3RyaW5nIHwgc3RyaW5nW10gPSAnJztcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZGlhbG9nIHNob3VsZCBjbG9zZSB3aGVuIHRoZSB1c2VyIGdvZXMgYmFja3dhcmRzL2ZvcndhcmRzIGluIGhpc3RvcnkuXG4gICAqL1xuICBwdWJsaWMgY2xvc2VPbk5hdmlnYXRpb24/ID0gdHJ1ZTtcblxuICAvKiogV2lkdGggb2YgdGhlIGRpYWxvZy4gKi9cbiAgcHVibGljIHdpZHRoPyA9ICcnO1xuXG4gIC8qKiBIZWlnaHQgb2YgdGhlIGRpYWxvZy4gKi9cbiAgcHVibGljIGhlaWdodD8gPSAnJztcblxuICAvKipcbiAgICogVGhlIG1pbi13aWR0aCBvZiB0aGUgb3ZlcmxheSBwYW5lbC5cbiAgICogSWYgYSBudW1iZXIgaXMgcHJvdmlkZWQsIHBpeGVsIHVuaXRzIGFyZSBhc3N1bWVkLlxuICAgKi9cbiAgcHVibGljIG1pbldpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbWluLWhlaWdodCBvZiB0aGUgb3ZlcmxheSBwYW5lbC5cbiAgICogSWYgYSBudW1iZXIgaXMgcHJvdmlkZWQsIHBpeGVsIHVuaXRzIGFyZSBhc3N1bWVkLlxuICAgKi9cbiAgcHVibGljIG1pbkhlaWdodD86IG51bWJlciB8IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG1heC13aWR0aCBvZiB0aGUgb3ZlcmxheSBwYW5lbC5cbiAgICogSWYgYSBudW1iZXIgaXMgcHJvdmlkZWQsIHBpeGVsIHVuaXRzIGFyZSBhc3N1bWVkLlxuICAgKi9cbiAgcHVibGljIG1heFdpZHRoPzogbnVtYmVyIHwgc3RyaW5nID0gJzg1dncnO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4LWhlaWdodCBvZiB0aGUgb3ZlcmxheSBwYW5lbC5cbiAgICogSWYgYSBudW1iZXIgaXMgcHJvdmlkZWQsIHBpeGVsIHVuaXRzIGFyZSBhc3N1bWVkLlxuICAgKi9cbiAgcHVibGljIG1heEhlaWdodD86IG51bWJlciB8IHN0cmluZztcblxuICAvKiogUG9zaXRpb24gb3ZlcnJpZGVzLiAqL1xuICBwdWJsaWMgcG9zaXRpb24/OiBEaWFsb2dQb3NpdGlvbjtcblxuICAvKipcbiAgICogVGhlIHNjcm9sbCBzdHJhdGVneSB3aGVuIHRoZSBkaWFsb2cgaXMgb3BlblxuICAgKiBMZWFybiBtb3JlIHRoaXMgZnJvbSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vY2RrL292ZXJsYXkvb3ZlcnZpZXcjc2Nyb2xsLXN0cmF0ZWdpZXNcbiAgICovXG4gIHB1YmxpYyBzY3JvbGxTdHJhdGVneT86IFNjcm9sbFN0cmF0ZWd5ID0gbmV3IE5vb3BTY3JvbGxTdHJhdGVneSgpO1xuXG4gIHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmPzogVmlld0NvbnRhaW5lclJlZjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlkID0gYG93bC1kaWFsb2ctJHt1bmlxdWVJZCsrfWA7XG4gIH1cbn1cbiJdfQ==