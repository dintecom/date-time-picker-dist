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
var /**
 * @template T
 */
OwlDialogRef = /** @class */ (function () {
    function OwlDialogRef(overlayRef, container, id, location) {
        var _this = this;
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
        function (event) {
            return event.phaseName === 'done' && event.toState === 'enter';
        })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._afterOpen$.next();
            _this._afterOpen$.complete();
        }));
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return event.phaseName === 'done' && event.toState === 'exit';
        })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.overlayRef.dispose();
            _this.locationChanged.unsubscribe();
            _this._afterClosed$.next(_this.result);
            _this._afterClosed$.complete();
            _this.componentInstance = undefined;
        }));
        this.overlayRef
            .keydownEvents()
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.keyCode === ESCAPE && !_this.disableClose; })))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
        if (location) {
            this.locationChanged = location.subscribe((/**
             * @return {?}
             */
            function () {
                if (_this.container.config.closeOnNavigation) {
                    _this.close();
                }
            }));
        }
    }
    /**
     * @param {?=} dialogResult
     * @return {?}
     */
    OwlDialogRef.prototype.close = /**
     * @param {?=} dialogResult
     * @return {?}
     */
    function (dialogResult) {
        var _this = this;
        this.result = dialogResult;
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'start'; })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._beforeClose$.next(dialogResult);
            _this._beforeClose$.complete();
            _this.overlayRef.detachBackdrop();
        }));
        this.container.startExitAnimation();
    };
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    OwlDialogRef.prototype.backdropClick = /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    function () {
        return this.overlayRef.backdropClick();
    };
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    OwlDialogRef.prototype.keydownEvents = /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    function () {
        return this.overlayRef.keydownEvents();
    };
    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    /**
     * Updates the dialog's position.
     * @template THIS
     * @this {THIS}
     * @param {?=} position New dialog position.
     * @return {THIS}
     */
    OwlDialogRef.prototype.updatePosition = /**
     * Updates the dialog's position.
     * @template THIS
     * @this {THIS}
     * @param {?=} position New dialog position.
     * @return {THIS}
     */
    function (position) {
        /** @type {?} */
        var strategy = (/** @type {?} */ (this)).getPositionStrategy();
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
    };
    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    /**
     * Updates the dialog's width and height.
     * @template THIS
     * @this {THIS}
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {THIS}
     */
    OwlDialogRef.prototype.updateSize = /**
     * Updates the dialog's width and height.
     * @template THIS
     * @this {THIS}
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {THIS}
     */
    function (width, height) {
        if (width === void 0) { width = 'auto'; }
        if (height === void 0) { height = 'auto'; }
        (/** @type {?} */ (this)).getPositionStrategy()
            .width(width)
            .height(height);
        (/** @type {?} */ (this)).overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    };
    /**
     * @return {?}
     */
    OwlDialogRef.prototype.isAnimating = /**
     * @return {?}
     */
    function () {
        return this.container.isAnimating;
    };
    /**
     * @return {?}
     */
    OwlDialogRef.prototype.afterOpen = /**
     * @return {?}
     */
    function () {
        return this._afterOpen$.asObservable();
    };
    /**
     * @return {?}
     */
    OwlDialogRef.prototype.beforeClose = /**
     * @return {?}
     */
    function () {
        return this._beforeClose$.asObservable();
    };
    /**
     * @return {?}
     */
    OwlDialogRef.prototype.afterClosed = /**
     * @return {?}
     */
    function () {
        return this._afterClosed$.asObservable();
    };
    /** Fetches the position strategy object from the overlay ref. */
    /**
     * Fetches the position strategy object from the overlay ref.
     * @private
     * @return {?}
     */
    OwlDialogRef.prototype.getPositionStrategy = /**
     * Fetches the position strategy object from the overlay ref.
     * @private
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this.overlayRef.getConfig()
            .positionStrategy));
    };
    return OwlDialogRef;
}());
/**
 * @template T
 */
export { OwlDialogRef };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlZi5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RpYWxvZy9kaWFsb2ctcmVmLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHL0MsT0FBTyxFQUVILE9BQU8sRUFDUCxZQUFZLEVBRWYsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRTlDOzs7O0lBb0JJLHNCQUNZLFVBQXNCLEVBQ3RCLFNBQXNDLEVBQzlCLEVBQVUsRUFDMUIsUUFBbUI7UUFKdkIsaUJBaURDO1FBaERXLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBNkI7UUFDOUIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQXBCdEIsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBRW5DLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUVqQyxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7Ozs7UUFHbkMsb0JBQWUsR0FBa0IsWUFBWSxDQUFDLEtBQUssQ0FBQzs7OztRQVFyRCxpQkFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQVFyRCxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQjthQUMvQixJQUFJLENBQ0QsTUFBTTs7OztRQUNGLFVBQUMsS0FBcUI7WUFDbEIsT0FBQSxLQUFLLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU87UUFBdkQsQ0FBdUQsRUFDOUQsRUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1Y7YUFDQSxTQUFTOzs7UUFBQztZQUNQLEtBQUksQ0FBQyxXQUFXLENB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SSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7OztJQUVNLGtDQUFXOzs7SUFBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVNLGtDQUFXOzs7SUFBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELGlFQUFpRTs7Ozs7O0lBQ3pELDBDQUFtQjs7Ozs7SUFBM0I7UUFDSSxPQUFPLG1CQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO2FBQzdCLGdCQUFnQixFQUEwQixDQUFDO0lBQ3BELENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFwS0QsSUFvS0M7Ozs7Ozs7Ozs7SUFuS0csOEJBQW9COzs7OztJQUVwQixxQ0FBMkM7Ozs7O0lBRTNDLG1DQUF5Qzs7Ozs7SUFFekMscUNBQTJDOzs7Ozs7SUFHM0MsdUNBQTREOzs7OztJQUs1RCx5Q0FBNEI7Ozs7O0lBRzVCLG9DQUF5RDs7Ozs7SUFHckQsa0NBQThCOzs7OztJQUM5QixpQ0FBOEM7O0lBQzlDLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGlhbG9nLXJlZi5jbGFzc1xuICovXG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgR2xvYmFsUG9zaXRpb25TdHJhdGVneSwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RpYWxvZy1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERpYWxvZ1Bvc2l0aW9uIH0gZnJvbSAnLi9kaWFsb2ctY29uZmlnLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT2JzZXJ2YWJsZSxcbiAgICBTdWJqZWN0LFxuICAgIFN1YnNjcmlwdGlvbixcbiAgICBTdWJzY3JpcHRpb25MaWtlIGFzIElTdWJzY3JpcHRpb25cbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBPd2xEaWFsb2dSZWY8VD4ge1xuICAgIHByaXZhdGUgcmVzdWx0OiBhbnk7XG5cbiAgICBwcml2YXRlIF9iZWZvcmVDbG9zZSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBwcml2YXRlIF9hZnRlck9wZW4kID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgcHJpdmF0ZSBfYWZ0ZXJDbG9zZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGFuZ2VzIGluIHRoZSB1c2VyJ3MgbG9jYXRpb24uICovXG4gICAgcHJpdmF0ZSBsb2NhdGlvbkNoYW5nZWQ6IElTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5zdGFuY2Ugb2YgY29tcG9uZW50IG9wZW5lZCBpbnRvIG1vZGFsXG4gICAgICovXG4gICAgcHVibGljIGNvbXBvbmVudEluc3RhbmNlOiBUO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgaXMgYWxsb3dlZCB0byBjbG9zZSB0aGUgZGlhbG9nLiAqL1xuICAgIHB1YmxpYyBkaXNhYmxlQ2xvc2UgPSB0aGlzLmNvbnRhaW5lci5jb25maWcuZGlzYWJsZUNsb3NlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICAgICAgcHJpdmF0ZSBjb250YWluZXI6IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIGxvY2F0aW9uPzogTG9jYXRpb25cbiAgICApIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgIChldmVudDogQW5pbWF0aW9uRXZlbnQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSAnZW50ZXInXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlck9wZW4kLm5leHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlck9wZW4kLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hbmltYXRpb25TdGF0ZUNoYW5nZWRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgKGV2ZW50OiBBbmltYXRpb25FdmVudCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIGV2ZW50LnRvU3RhdGUgPT09ICdleGl0J1xuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uQ2hhbmdlZC51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FmdGVyQ2xvc2VkJC5uZXh0KHRoaXMucmVzdWx0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlckNsb3NlZCQuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmXG4gICAgICAgICAgICAua2V5ZG93bkV2ZW50cygpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmICF0aGlzLmRpc2FibGVDbG9zZSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcblxuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25DaGFuZ2VkID0gbG9jYXRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIuY29uZmlnLmNsb3NlT25OYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZShkaWFsb2dSZXN1bHQ/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQgPSBkaWFsb2dSZXN1bHQ7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKGV2ZW50OiBBbmltYXRpb25FdmVudCkgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnc3RhcnQnKSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVDbG9zZSQubmV4dChkaWFsb2dSZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2JlZm9yZUNsb3NlJC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2hCYWNrZHJvcCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuc3RhcnRFeGl0QW5pbWF0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiB0aGUgb3ZlcmxheSdzIGJhY2tkcm9wIGhhcyBiZWVuIGNsaWNrZWQuXG4gICAgICovXG4gICAgcHVibGljIGJhY2tkcm9wQ2xpY2soKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiBrZXlkb3duIGV2ZW50cyBhcmUgdGFyZ2V0ZWQgb24gdGhlIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIGtleWRvd25FdmVudHMoKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGRpYWxvZydzIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiBOZXcgZGlhbG9nIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVQb3NpdGlvbihwb3NpdGlvbj86IERpYWxvZ1Bvc2l0aW9uKTogdGhpcyB7XG4gICAgICAgIGNvbnN0IHN0cmF0ZWd5ID0gdGhpcy5nZXRQb3NpdGlvblN0cmF0ZWd5KCk7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uICYmIChwb3NpdGlvbi5sZWZ0IHx8IHBvc2l0aW9uLnJpZ2h0KSkge1xuICAgICAgICAgICAgcG9zaXRpb24ubGVmdFxuICAgICAgICAgICAgICAgID8gc3RyYXRlZ3kubGVmdChwb3NpdGlvbi5sZWZ0KVxuICAgICAgICAgICAgICAgIDogc3RyYXRlZ3kucmlnaHQocG9zaXRpb24ucmlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyYXRlZ3kuY2VudGVySG9yaXpvbnRhbGx5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gJiYgKHBvc2l0aW9uLnRvcCB8fCBwb3NpdGlvbi5ib3R0b20pKSB7XG4gICAgICAgICAgICBwb3NpdGlvbi50b3BcbiAgICAgICAgICAgICAgICA/IHN0cmF0ZWd5LnRvcChwb3NpdGlvbi50b3ApXG4gICAgICAgICAgICAgICAgOiBzdHJhdGVneS5ib3R0b20ocG9zaXRpb24uYm90dG9tKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmF0ZWd5LmNlbnRlclZlcnRpY2FsbHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGRpYWxvZydzIHdpZHRoIGFuZCBoZWlnaHQuXG4gICAgICogQHBhcmFtIHdpZHRoIE5ldyB3aWR0aCBvZiB0aGUgZGlhbG9nLlxuICAgICAqIEBwYXJhbSBoZWlnaHQgTmV3IGhlaWdodCBvZiB0aGUgZGlhbG9nLlxuICAgICAqL1xuICAgIHVwZGF0ZVNpemUod2lkdGg6IHN0cmluZyA9ICdhdXRvJywgaGVpZ2h0OiBzdHJpbmcgPSAnYXV0bycpOiB0aGlzIHtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvblN0cmF0ZWd5KClcbiAgICAgICAgICAgIC53aWR0aCh3aWR0aClcbiAgICAgICAgICAgIC5oZWlnaHQoaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0FuaW1hdGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmlzQW5pbWF0aW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZnRlck9wZW4oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FmdGVyT3BlbiQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGJlZm9yZUNsb3NlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iZWZvcmVDbG9zZSQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFmdGVyQ2xvc2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZnRlckNsb3NlZCQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqIEZldGNoZXMgdGhlIHBvc2l0aW9uIHN0cmF0ZWd5IG9iamVjdCBmcm9tIHRoZSBvdmVybGF5IHJlZi4gKi9cbiAgICBwcml2YXRlIGdldFBvc2l0aW9uU3RyYXRlZ3koKTogR2xvYmFsUG9zaXRpb25TdHJhdGVneSB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKClcbiAgICAgICAgICAgIC5wb3NpdGlvblN0cmF0ZWd5IGFzIEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3k7XG4gICAgfVxufVxuIl19