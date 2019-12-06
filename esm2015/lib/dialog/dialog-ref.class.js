/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ESCAPE } from '@angular/cdk/keycodes';
import { Subject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
/**
 * @template T
 */
export class OwlDialogRef {
    /**
     * @param {?} overlayRef
     * @param {?} container
     * @param {?} id
     * @param {?=} location
     */
    constructor(overlayRef, container, id, location) {
        this.overlayRef = overlayRef;
        this.container = container;
        this.id = id;
        this._beforeClose$ = new Subject();
        this._afterOpen$ = new Subject();
        this._afterClosed$ = new Subject();
        /**
         * Subscription to changes in the user's location.
         */
        this.locationChanged = Subscription.EMPTY;
        /**
         * Whether the user is allowed to close the dialog.
         */
        this.disableClose = this.container.config.disableClose;
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => event.phaseName === 'done' && event.toState === 'enter')), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._afterOpen$.next();
            this._afterOpen$.complete();
        }));
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => event.phaseName === 'done' && event.toState === 'exit')), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.overlayRef.dispose();
            this.locationChanged.unsubscribe();
            this._afterClosed$.next(this.result);
            this._afterClosed$.complete();
            this.componentInstance = undefined;
        }));
        this.overlayRef
            .keydownEvents()
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.keyCode === ESCAPE && !this.disableClose)))
            .subscribe((/**
         * @return {?}
         */
        () => this.close()));
        if (location) {
            this.locationChanged = location.subscribe((/**
             * @return {?}
             */
            () => {
                if (this.container.config.closeOnNavigation) {
                    this.close();
                }
            }));
        }
    }
    /**
     * @param {?=} dialogResult
     * @return {?}
     */
    close(dialogResult) {
        this.result = dialogResult;
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => event.phaseName === 'start')), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._beforeClose$.next(dialogResult);
            this._beforeClose$.complete();
            this.overlayRef.detachBackdrop();
        }));
        this.container.startExitAnimation();
    }
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    backdropClick() {
        return this.overlayRef.backdropClick();
    }
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    keydownEvents() {
        return this.overlayRef.keydownEvents();
    }
    /**
     * Updates the dialog's position.
     * @template THIS
     * @this {THIS}
     * @param {?=} position New dialog position.
     * @return {THIS}
     */
    updatePosition(position) {
        /** @type {?} */
        const strategy = (/** @type {?} */ (this)).getPositionStrategy();
        if (position && (position.left || position.right)) {
            position.left
                ? strategy.left(position.left)
                : strategy.right(position.right);
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom)) {
            position.top
                ? strategy.top(position.top)
                : strategy.bottom(position.bottom);
        }
        else {
            strategy.centerVertically();
        }
        (/** @type {?} */ (this)).overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    }
    /**
     * Updates the dialog's width and height.
     * @template THIS
     * @this {THIS}
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {THIS}
     */
    updateSize(width = 'auto', height = 'auto') {
        (/** @type {?} */ (this)).getPositionStrategy()
            .width(width)
            .height(height);
        (/** @type {?} */ (this)).overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    isAnimating() {
        return this.container.isAnimating;
    }
    /**
     * @return {?}
     */
    afterOpen() {
        return this._afterOpen$.asObservable();
    }
    /**
     * @return {?}
     */
    beforeClose() {
        return this._beforeClose$.asObservable();
    }
    /**
     * @return {?}
     */
    afterClosed() {
        return this._afterClosed$.asObservable();
    }
    /**
     * Fetches the position strategy object from the overlay ref.
     * @private
     * @return {?}
     */
    getPositionStrategy() {
        return (/** @type {?} */ (this.overlayRef.getConfig()
            .positionStrategy));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype.result;
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype._beforeClose$;
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype._afterOpen$;
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype._afterClosed$;
    /**
     * Subscription to changes in the user's location.
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype.locationChanged;
    /**
     * The instance of component opened into modal
     * @type {?}
     */
    OwlDialogRef.prototype.componentInstance;
    /**
     * Whether the user is allowed to close the dialog.
     * @type {?}
     */
    OwlDialogRef.prototype.disableClose;
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype.overlayRef;
    /**
     * @type {?}
     * @private
     */
    OwlDialogRef.prototype.container;
    /** @type {?} */
    OwlDialogRef.prototype.id;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlZi5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RpYWxvZy9kaWFsb2ctcmVmLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHL0MsT0FBTyxFQUVILE9BQU8sRUFDUCxZQUFZLEVBRWYsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRTlDLE1BQU0sT0FBTyxZQUFZOzs7Ozs7O0lBb0JyQixZQUNZLFVBQXNCLEVBQ3RCLFNBQXNDLEVBQzlCLEVBQVUsRUFDMUIsUUFBbUI7UUFIWCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQTZCO1FBQzlCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFwQnRCLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUVuQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFFakMsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDOzs7O1FBR25DLG9CQUFlLEdBQWtCLFlBQVksQ0FBQyxLQUFLLENBQUM7Ozs7UUFRckQsaUJBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFRckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUI7YUFDL0IsSUFBSSxDQUNELE1BQU07Ozs7UUFDRixDQUFDLEtBQXFCLEVBQUUsRUFBRSxDQUN0QixLQUFLLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFDOUQsRUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1Y7YUFDQSxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMs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LENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBR08sbUJBQW1CO1FBQ3ZCLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUU7YUFDN0IsZ0JBQWdCLEVBQTBCLENBQUM7SUFDcEQsQ0FBQztDQUNKOzs7Ozs7SUFuS0csOEJBQW9COzs7OztJQUVwQixxQ0FBMkM7Ozs7O0lBRTNDLG1DQUF5Qzs7Ozs7SUFFekMscUNBQTJDOzs7Ozs7SUFHM0MsdUNBQTREOzs7OztJQUs1RCx5Q0FBNEI7Ozs7O0lBRzVCLG9DQUF5RDs7Ozs7SUFHckQsa0NBQThCOzs7OztJQUM5QixpQ0FBOEM7O0lBQzlDLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGlhbG9nLXJlZi5jbGFzc1xuICovXG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgR2xvYmFsUG9zaXRpb25TdHJhdGVneSwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RpYWxvZy1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERpYWxvZ1Bvc2l0aW9uIH0gZnJvbSAnLi9kaWFsb2ctY29uZmlnLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT2JzZXJ2YWJsZSxcbiAgICBTdWJqZWN0LFxuICAgIFN1YnNjcmlwdGlvbixcbiAgICBTdWJzY3JpcHRpb25MaWtlIGFzIElTdWJzY3JpcHRpb25cbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBPd2xEaWFsb2dSZWY8VD4ge1xuICAgIHByaXZhdGUgcmVzdWx0OiBhbnk7XG5cbiAgICBwcml2YXRlIF9iZWZvcmVDbG9zZSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBwcml2YXRlIF9hZnRlck9wZW4kID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgcHJpdmF0ZSBfYWZ0ZXJDbG9zZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGFuZ2VzIGluIHRoZSB1c2VyJ3MgbG9jYXRpb24uICovXG4gICAgcHJpdmF0ZSBsb2NhdGlvbkNoYW5nZWQ6IElTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5zdGFuY2Ugb2YgY29tcG9uZW50IG9wZW5lZCBpbnRvIG1vZGFsXG4gICAgICovXG4gICAgcHVibGljIGNvbXBvbmVudEluc3RhbmNlOiBUO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgaXMgYWxsb3dlZCB0byBjbG9zZSB0aGUgZGlhbG9nLiAqL1xuICAgIHB1YmxpYyBkaXNhYmxlQ2xvc2UgPSB0aGlzLmNvbnRhaW5lci5jb25maWcuZGlzYWJsZUNsb3NlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICAgICAgcHJpdmF0ZSBjb250YWluZXI6IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIGxvY2F0aW9uPzogTG9jYXRpb25cbiAgICApIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgIChldmVudDogQW5pbWF0aW9uRXZlbnQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSAnZW50ZXInXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlck9wZW4kLm5leHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlck9wZW4kLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hbmltYXRpb25TdGF0ZUNoYW5nZWRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgKGV2ZW50OiBBbmltYXRpb25FdmVudCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIGV2ZW50LnRvU3RhdGUgPT09ICdleGl0J1xuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uQ2hhbmdlZC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FmdGVyQ2xvc2VkJC5uZXh0KHRoaXMucmVzdWx0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlckNsb3NlZCQuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmXG4gICAgICAgICAgICAua2V5ZG93bkV2ZW50cygpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmICF0aGlzLmRpc2FibGVDbG9zZSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcblxuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25DaGFuZ2VkID0gbG9jYXRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIuY29uZmlnLmNsb3NlT25OYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZShkaWFsb2dSZXN1bHQ/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSBkaWFsb2dSZXN1bHQ7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKGV2ZW50OiBBbmltYXRpb25FdmVudCkgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnc3RhcnQnKSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVDbG9zZSQubmV4dChkaWFsb2dSZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2JlZm9yZUNsb3NlJC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2hCYWNrZHJvcCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuc3RhcnRFeGl0QW5pbWF0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiB0aGUgb3ZlcmxheSdzIGJhY2tkcm9wIGhhcyBiZWVuIGNsaWNrZWQuXG4gICAgICovXG4gICAgcHVibGljIGJhY2tkcm9wQ2xpY2soKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiBrZXlkb3duIGV2ZW50cyBhcmUgdGFyZ2V0ZWQgb24gdGhlIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIGtleWRvd25FdmVudHMoKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGRpYWxvZydzIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiBOZXcgZGlhbG9nIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVQb3NpdGlvbihwb3NpdGlvbj86IERpYWxvZ1Bvc2l0aW9uKTogdGhpcyB7XG4gICAgICAgIGNvbnN0IHN0cmF0ZWd5ID0gdGhpcy5nZXRQb3NpdGlvblN0cmF0ZWd5KCk7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uICYmIChwb3NpdGlvbi5sZWZ0IHx8IHBvc2l0aW9uLnJpZ2h0KSkge1xuICAgICAgICAgICAgcG9zaXRpb24ubGVmdFxuICAgICAgICAgICAgICAgID8gc3RyYXRlZ3kubGVmdChwb3NpdGlvbi5sZWZ0KVxuICAgICAgICAgICAgICAgIDogc3RyYXRlZ3kucmlnaHQocG9zaXRpb24ucmlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyYXRlZ3kuY2VudGVySG9yaXpvbnRhbGx5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gJiYgKHBvc2l0aW9uLnRvcCB8fCBwb3NpdGlvbi5ib3R0b20pKSB7XG4gICAgICAgICAgICBwb3NpdGlvbi50b3BcbiAgICAgICAgICAgICAgICA/IHN0cmF0ZWd5LnRvcChwb3NpdGlvbi50b3ApXG4gICAgICAgICAgICAgICAgOiBzdHJhdGVneS5ib3R0b20ocG9zaXRpb24uYm90dG9tKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmF0ZWd5LmNlbnRlclZlcnRpY2FsbHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGRpYWxvZydzIHdpZHRoIGFuZCBoZWlnaHQuXG4gICAgICogQHBhcmFtIHdpZHRoIE5ldyB3aWR0aCBvZiB0aGUgZGlhbG9nLlxuICAgICAqIEBwYXJhbSBoZWlnaHQgTmV3IGhlaWdodCBvZiB0aGUgZGlhbG9nLlxuICAgICAqL1xuICAgIHVwZGF0ZVNpemUod2lkdGg6IHN0cmluZyA9ICdhdXRvJywgaGVpZ2h0OiBzdHJpbmcgPSAnYXV0bycpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvblN0cmF0ZWd5KClcbiAgICAgICAgICAgIC53aWR0aCh3aWR0aClcbiAgICAgICAgICAgIC5oZWlnaHQoaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0FuaW1hdGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmlzQW5pbWF0aW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZnRlck9wZW4oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FmdGVyT3BlbiQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGJlZm9yZUNsb3NlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iZWZvcmVDbG9zZSQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQ2xvc2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZnRlckNsb3NlZCQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqIEZldGNoZXMgdGhlIHBvc2l0aW9uIHN0cmF0ZWd5IG9iamVjdCBmcm9tIHRoZSBvdmVybGF5IHJlZi4gKi9cbiAgICBwcml2YXRlIGdldFBvc2l0aW9uU3RyYXRlZ3koKTogR2xvYmFsUG9zaXRpb25TdHJhdGVneSB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKClcbiAgICAgICAgICAgIC5wb3NpdGlvblN0cmF0ZWd5IGFzIEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3k7XG4gICAgfVxufVxuIl19