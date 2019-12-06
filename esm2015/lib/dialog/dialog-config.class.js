/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NoopScrollStrategy } from '@angular/cdk/overlay';
/** @type {?} */
let uniqueId = 0;
/**
 * Possible overrides for a dialog's position.
 * @record
 */
export function DialogPosition() { }
if (false) {
    /**
     * Override for the dialog's top position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.top;
    /**
     * Override for the dialog's bottom position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.bottom;
    /**
     * Override for the dialog's left position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.left;
    /**
     * Override for the dialog's right position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.right;
}
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
        /**
         * Whether the dialog has a backdrop.
         */
        this.hasBackdrop = true;
        /**
         * Data being injected into the child component.
         */
        this.data = null;
        /**
         * Whether the user can use escape or clicking outside to close a modal.
         */
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
        /**
         * Width of the dialog.
         */
        this.width = '';
        /**
         * Height of the dialog.
         */
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
if (false) {
    /**
     * ID of the element that describes the dialog.
     * @type {?}
     */
    OwlDialogConfig.prototype.ariaDescribedBy;
    /**
     * Whether to focus the dialog when the dialog is opened
     * @type {?}
     */
    OwlDialogConfig.prototype.autoFocus;
    /**
     * Whether the dialog has a backdrop.
     * @type {?}
     */
    OwlDialogConfig.prototype.hasBackdrop;
    /**
     * Custom style for the backdrop
     * @type {?}
     */
    OwlDialogConfig.prototype.backdropStyle;
    /**
     * Data being injected into the child component.
     * @type {?}
     */
    OwlDialogConfig.prototype.data;
    /**
     * Whether the user can use escape or clicking outside to close a modal.
     * @type {?}
     */
    OwlDialogConfig.prototype.disableClose;
    /**
     * ID for the modal. If omitted, a unique one will be generated.
     * @type {?}
     */
    OwlDialogConfig.prototype.id;
    /**
     * The ARIA role of the dialog element.
     * @type {?}
     */
    OwlDialogConfig.prototype.role;
    /**
     * Custom class for the pane
     * @type {?}
     */
    OwlDialogConfig.prototype.paneClass;
    /**
     * Mouse Event
     * @type {?}
     */
    OwlDialogConfig.prototype.event;
    /**
     * Custom class for the backdrop
     * @type {?}
     */
    OwlDialogConfig.prototype.backdropClass;
    /**
     * Whether the dialog should close when the user goes backwards/forwards in history.
     * @type {?}
     */
    OwlDialogConfig.prototype.closeOnNavigation;
    /**
     * Width of the dialog.
     * @type {?}
     */
    OwlDialogConfig.prototype.width;
    /**
     * Height of the dialog.
     * @type {?}
     */
    OwlDialogConfig.prototype.height;
    /**
     * The min-width of the overlay panel.
     * If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OwlDialogConfig.prototype.minWidth;
    /**
     * The min-height of the overlay panel.
     * If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OwlDialogConfig.prototype.minHeight;
    /**
     * The max-width of the overlay panel.
     * If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OwlDialogConfig.prototype.maxWidth;
    /**
     * The max-height of the overlay panel.
     * If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OwlDialogConfig.prototype.maxHeight;
    /**
     * Position overrides.
     * @type {?}
     */
    OwlDialogConfig.prototype.position;
    /**
     * The scroll strategy when the dialog is open
     * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
     * @type {?}
     */
    OwlDialogConfig.prototype.scrollStrategy;
    /** @type {?} */
    OwlDialogConfig.prototype.viewContainerRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbmZpZy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RpYWxvZy9kaWFsb2ctY29uZmlnLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUUsa0JBQWtCLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7O0lBRXRFLFFBQVEsR0FBRyxDQUFDOzs7OztBQUdoQixvQ0FZQzs7Ozs7O0lBVkcsNkJBQWE7Ozs7O0lBR2IsZ0NBQWdCOzs7OztJQUdoQiw4QkFBYzs7Ozs7SUFHZCwrQkFBZTs7QUFHbkIsTUFBTSxPQUFPLGVBQWU7SUFnR3hCOzs7O1FBNUZPLG9CQUFlLEdBQW1CLElBQUksQ0FBQzs7OztRQUt2QyxjQUFTLEdBQUksSUFBSSxDQUFDOzs7O1FBR2xCLGdCQUFXLEdBQUksSUFBSSxDQUFDOzs7O1FBUXBCLFNBQUksR0FBUyxJQUFJLENBQUM7Ozs7UUFHbEIsaUJBQVksR0FBSSxLQUFLLENBQUM7Ozs7UUFVdEIsU0FBSSxHQUE4QixRQUFRLENBQUM7Ozs7UUFLM0MsY0FBUyxHQUF1QixFQUFFLENBQUM7Ozs7UUFLbkMsVUFBSyxHQUFnQixJQUFJLENBQUM7Ozs7UUFLMUIsa0JBQWEsR0FBdUIsRUFBRSxDQUFDOzs7O1FBS3ZDLHNCQUFpQixHQUFJLElBQUksQ0FBQzs7OztRQUcxQixVQUFLLEdBQUksRUFBRSxDQUFDOzs7O1FBR1osV0FBTSxHQUFJLEVBQUUsQ0FBQzs7Ozs7UUFrQmIsYUFBUSxHQUFxQixNQUFNLENBQUM7Ozs7O1FBZXBDLG1CQUFjLEdBQW9CLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUs5RCxJQUFJLENBQUMsRUFBRSxHQUFHLGNBQWMsUUFBUSxFQUFFLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0NBQ0o7Ozs7OztJQS9GRywwQ0FBOEM7Ozs7O0lBSzlDLG9DQUF5Qjs7Ozs7SUFHekIsc0NBQTJCOzs7OztJQUszQix3Q0FBMkI7Ozs7O0lBRzNCLCtCQUF5Qjs7Ozs7SUFHekIsdUNBQTZCOzs7OztJQUs3Qiw2QkFBbUI7Ozs7O0lBS25CLCtCQUFrRDs7Ozs7SUFLbEQsb0NBQTBDOzs7OztJQUsxQyxnQ0FBaUM7Ozs7O0lBS2pDLHdDQUE4Qzs7Ozs7SUFLOUMsNENBQWlDOzs7OztJQUdqQyxnQ0FBbUI7Ozs7O0lBR25CLGlDQUFvQjs7Ozs7O0lBTXBCLG1DQUFrQzs7Ozs7O0lBTWxDLG9DQUFtQzs7Ozs7O0lBTW5DLG1DQUEyQzs7Ozs7O0lBTTNDLG9DQUFtQzs7Ozs7SUFHbkMsbUNBQWlDOzs7Ozs7SUFNakMseUNBQWtFOztJQUVsRSwyQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRpYWxvZy1jb25maWcuY2xhc3NcbiAqL1xuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm9vcFNjcm9sbFN0cmF0ZWd5LCBTY3JvbGxTdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcblxubGV0IHVuaXF1ZUlkID0gMDtcblxuLyoqIFBvc3NpYmxlIG92ZXJyaWRlcyBmb3IgYSBkaWFsb2cncyBwb3NpdGlvbi4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGlhbG9nUG9zaXRpb24ge1xuICAgIC8qKiBPdmVycmlkZSBmb3IgdGhlIGRpYWxvZydzIHRvcCBwb3NpdGlvbi4gKi9cbiAgICB0b3A/OiBzdHJpbmc7XG5cbiAgICAvKiogT3ZlcnJpZGUgZm9yIHRoZSBkaWFsb2cncyBib3R0b20gcG9zaXRpb24uICovXG4gICAgYm90dG9tPzogc3RyaW5nO1xuXG4gICAgLyoqIE92ZXJyaWRlIGZvciB0aGUgZGlhbG9nJ3MgbGVmdCBwb3NpdGlvbi4gKi9cbiAgICBsZWZ0Pzogc3RyaW5nO1xuXG4gICAgLyoqIE92ZXJyaWRlIGZvciB0aGUgZGlhbG9nJ3MgcmlnaHQgcG9zaXRpb24uICovXG4gICAgcmlnaHQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBPd2xEaWFsb2dDb25maWcge1xuICAgIC8qKlxuICAgICAqIElEIG9mIHRoZSBlbGVtZW50IHRoYXQgZGVzY3JpYmVzIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgcHVibGljIGFyaWFEZXNjcmliZWRCeT86IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBmb2N1cyB0aGUgZGlhbG9nIHdoZW4gdGhlIGRpYWxvZyBpcyBvcGVuZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgYXV0b0ZvY3VzPyA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZGlhbG9nIGhhcyBhIGJhY2tkcm9wLiAqL1xuICAgIHB1YmxpYyBoYXNCYWNrZHJvcD8gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIHN0eWxlIGZvciB0aGUgYmFja2Ryb3BcbiAgICAgKi9cbiAgICBwdWJsaWMgYmFja2Ryb3BTdHlsZT86IGFueTtcblxuICAgIC8qKiBEYXRhIGJlaW5nIGluamVjdGVkIGludG8gdGhlIGNoaWxkIGNvbXBvbmVudC4gKi9cbiAgICBwdWJsaWMgZGF0YT86IGFueSA9IG51bGw7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdXNlciBjYW4gdXNlIGVzY2FwZSBvciBjbGlja2luZyBvdXRzaWRlIHRvIGNsb3NlIGEgbW9kYWwuICovXG4gICAgcHVibGljIGRpc2FibGVDbG9zZT8gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIElEIGZvciB0aGUgbW9kYWwuIElmIG9taXR0ZWQsIGEgdW5pcXVlIG9uZSB3aWxsIGJlIGdlbmVyYXRlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgaWQ/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgQVJJQSByb2xlIG9mIHRoZSBkaWFsb2cgZWxlbWVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgcm9sZT86ICdkaWFsb2cnIHwgJ2FsZXJ0ZGlhbG9nJyA9ICdkaWFsb2cnO1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIGNsYXNzIGZvciB0aGUgcGFuZVxuICAgICAqL1xuICAgIHB1YmxpYyBwYW5lQ2xhc3M/OiBzdHJpbmcgfCBzdHJpbmdbXSA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogTW91c2UgRXZlbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgZXZlbnQ/OiBNb3VzZUV2ZW50ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBjbGFzcyBmb3IgdGhlIGJhY2tkcm9wXG4gICAgICovXG4gICAgcHVibGljIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmcgfCBzdHJpbmdbXSA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZGlhbG9nIHNob3VsZCBjbG9zZSB3aGVuIHRoZSB1c2VyIGdvZXMgYmFja3dhcmRzL2ZvcndhcmRzIGluIGhpc3RvcnkuXG4gICAgICovXG4gICAgcHVibGljIGNsb3NlT25OYXZpZ2F0aW9uPyA9IHRydWU7XG5cbiAgICAvKiogV2lkdGggb2YgdGhlIGRpYWxvZy4gKi9cbiAgICBwdWJsaWMgd2lkdGg/ID0gJyc7XG5cbiAgICAvKiogSGVpZ2h0IG9mIHRoZSBkaWFsb2cuICovXG4gICAgcHVibGljIGhlaWdodD8gPSAnJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBtaW4td2lkdGggb2YgdGhlIG92ZXJsYXkgcGFuZWwuXG4gICAgICogSWYgYSBudW1iZXIgaXMgcHJvdmlkZWQsIHBpeGVsIHVuaXRzIGFyZSBhc3N1bWVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBtaW5XaWR0aD86IG51bWJlciB8IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBtaW4taGVpZ2h0IG9mIHRoZSBvdmVybGF5IHBhbmVsLlxuICAgICAqIElmIGEgbnVtYmVyIGlzIHByb3ZpZGVkLCBwaXhlbCB1bml0cyBhcmUgYXNzdW1lZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgbWluSGVpZ2h0PzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1heC13aWR0aCBvZiB0aGUgb3ZlcmxheSBwYW5lbC5cbiAgICAgKiBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgcGl4ZWwgdW5pdHMgYXJlIGFzc3VtZWQuXG4gICAgICovXG4gICAgcHVibGljIG1heFdpZHRoPzogbnVtYmVyIHwgc3RyaW5nID0gJzg1dncnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1heC1oZWlnaHQgb2YgdGhlIG92ZXJsYXkgcGFuZWwuXG4gICAgICogSWYgYSBudW1iZXIgaXMgcHJvdmlkZWQsIHBpeGVsIHVuaXRzIGFyZSBhc3N1bWVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBtYXhIZWlnaHQ/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgICAvKiogUG9zaXRpb24gb3ZlcnJpZGVzLiAqL1xuICAgIHB1YmxpYyBwb3NpdGlvbj86IERpYWxvZ1Bvc2l0aW9uO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNjcm9sbCBzdHJhdGVneSB3aGVuIHRoZSBkaWFsb2cgaXMgb3BlblxuICAgICAqIExlYXJuIG1vcmUgdGhpcyBmcm9tIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9jZGsvb3ZlcmxheS9vdmVydmlldyNzY3JvbGwtc3RyYXRlZ2llc1xuICAgICAqL1xuICAgIHB1YmxpYyBzY3JvbGxTdHJhdGVneT86IFNjcm9sbFN0cmF0ZWd5ID0gbmV3IE5vb3BTY3JvbGxTdHJhdGVneSgpO1xuXG4gICAgcHVibGljIHZpZXdDb250YWluZXJSZWY/OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaWQgPSBgb3dsLWRpYWxvZy0ke3VuaXF1ZUlkKyt9YDtcbiAgICB9XG59XG4iXX0=