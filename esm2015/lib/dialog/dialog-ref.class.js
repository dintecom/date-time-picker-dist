import { ESCAPE } from '@angular/cdk/keycodes';
import { Subject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
export class OwlDialogRef {
    constructor(overlayRef, container, id, location) {
        this.overlayRef = overlayRef;
        this.container = container;
        this.id = id;
        this._beforeClose$ = new Subject();
        this._afterOpen$ = new Subject();
        this._afterClosed$ = new Subject();
        /** Subscription to changes in the user's location. */
        this.locationChanged = Subscription.EMPTY;
        /** Whether the user is allowed to close the dialog. */
        this.disableClose = this.container.config.disableClose;
        this.container.animationStateChanged
            .pipe(filter((event) => event.phaseName === 'done' && event.toState === 'enter'), take(1))
            .subscribe(() => {
            this._afterOpen$.next();
            this._afterOpen$.complete();
        });
        this.container.animationStateChanged
            .pipe(filter((event) => event.phaseName === 'done' && event.toState === 'exit'), take(1))
            .subscribe(() => {
            this.overlayRef.dispose();
            this.locationChanged.unsubscribe();
            this._afterClosed$.next(this.result);
            this._afterClosed$.complete();
            this.componentInstance = undefined;
        });
        this.overlayRef
            .keydownEvents()
            .pipe(filter(event => event.keyCode === ESCAPE && !this.disableClose))
            .subscribe(() => this.close());
        if (location) {
            this.locationChanged = location.subscribe(() => {
                if (this.container.config.closeOnNavigation) {
                    this.close();
                }
            });
        }
    }
    close(dialogResult) {
        this.result = dialogResult;
        this.container.animationStateChanged
            .pipe(filter((event) => event.phaseName === 'start'), take(1))
            .subscribe(() => {
            this._beforeClose$.next(dialogResult);
            this._beforeClose$.complete();
            this.overlayRef.detachBackdrop();
        });
        this.container.startExitAnimation();
    }
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    backdropClick() {
        return this.overlayRef.backdropClick();
    }
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    keydownEvents() {
        return this.overlayRef.keydownEvents();
    }
    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    updatePosition(position) {
        const strategy = this.getPositionStrategy();
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
        this.overlayRef.updatePosition();
        return this;
    }
    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    updateSize(width = 'auto', height = 'auto') {
        this.getPositionStrategy()
            .width(width)
            .height(height);
        this.overlayRef.updatePosition();
        return this;
    }
    isAnimating() {
        return this.container.isAnimating;
    }
    afterOpen() {
        return this._afterOpen$.asObservable();
    }
    beforeClose() {
        return this._beforeClose$.asObservable();
    }
    afterClosed() {
        return this._afterClosed$.asObservable();
    }
    /** Fetches the position strategy object from the overlay ref. */
    getPositionStrategy() {
        return this.overlayRef.getConfig()
            .positionStrategy;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlZi5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RpYWxvZy9kaWFsb2ctcmVmLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUcvQyxPQUFPLEVBRUgsT0FBTyxFQUNQLFlBQVksRUFFZixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsTUFBTSxPQUFPLFlBQVk7SUFvQnJCLFlBQ1ksVUFBc0IsRUFDdEIsU0FBc0MsRUFDOUIsRUFBVSxFQUMxQixRQUFtQjtRQUhYLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBNkI7UUFDOUIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQXBCdEIsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBRW5DLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUVsQyxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFFM0Msc0RBQXNEO1FBQzlDLG9CQUFlLEdBQWtCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFPNUQsdURBQXVEO1FBQ2hELGlCQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBUXJELElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCO2FBQy9CLElBQUksQ0FDRCxNQUFNLENBQ0YsQ0FBQyxLQUFxQixFQUFFLEVBQUUsQ0FDdEIsS0FBSyxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQzlELEVBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNWO2FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNaLElB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QUN2QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO2FBQzdCLGdCQUEwQyxDQUFDO0lBQ3BELENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGlhbG9nLXJlZi5jbGFzc1xuICovXG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgR2xvYmFsUG9zaXRpb25TdHJhdGVneSwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RpYWxvZy1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERpYWxvZ1Bvc2l0aW9uIH0gZnJvbSAnLi9kaWFsb2ctY29uZmlnLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT2JzZXJ2YWJsZSxcbiAgICBTdWJqZWN0LFxuICAgIFN1YnNjcmlwdGlvbixcbiAgICBTdWJzY3JpcHRpb25MaWtlIGFzIElTdWJzY3JpcHRpb25cbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBPd2xEaWFsb2dSZWY8VD4ge1xuICAgIHByaXZhdGUgcmVzdWx0OiBhbnk7XG5cbiAgICBwcml2YXRlIF9iZWZvcmVDbG9zZSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBwcml2YXRlIF9hZnRlck9wZW4kID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIHByaXZhdGUgX2FmdGVyQ2xvc2VkJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gY2hhbmdlcyBpbiB0aGUgdXNlcidzIGxvY2F0aW9uLiAqL1xuICAgIHByaXZhdGUgbG9jYXRpb25DaGFuZ2VkOiBJU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGluc3RhbmNlIG9mIGNvbXBvbmVudCBvcGVuZWQgaW50byBtb2RhbFxuICAgICAqL1xuICAgIHB1YmxpYyBjb21wb25lbnRJbnN0YW5jZTogVDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB1c2VyIGlzIGFsbG93ZWQgdG8gY2xvc2UgdGhlIGRpYWxvZy4gKi9cbiAgICBwdWJsaWMgZGlzYWJsZUNsb3NlID0gdGhpcy5jb250YWluZXIuY29uZmlnLmRpc2FibGVDbG9zZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgICAgIHByaXZhdGUgY29udGFpbmVyOiBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICBsb2NhdGlvbj86IExvY2F0aW9uXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucGhhc2VOYW1lID09PSAnZG9uZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gJ2VudGVyJ1xuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJPcGVuJC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJPcGVuJC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgIChldmVudDogQW5pbWF0aW9uRXZlbnQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSAnZXhpdCdcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbkNoYW5nZWQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlckNsb3NlZCQubmV4dCh0aGlzLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJDbG9zZWQkLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZlxuICAgICAgICAgICAgLmtleWRvd25FdmVudHMoKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiAhdGhpcy5kaXNhYmxlQ2xvc2UpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG5cbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uQ2hhbmdlZCA9IGxvY2F0aW9uLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmNvbmZpZy5jbG9zZU9uTmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2UoZGlhbG9nUmVzdWx0PzogYW55KSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0gZGlhbG9nUmVzdWx0O1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKChldmVudDogQW5pbWF0aW9uRXZlbnQpID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ3N0YXJ0JyksXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmVmb3JlQ2xvc2UkLm5leHQoZGlhbG9nUmVzdWx0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVDbG9zZSQuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoQmFja2Ryb3AoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0YXJ0RXhpdEFuaW1hdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gdGhlIG92ZXJsYXkncyBiYWNrZHJvcCBoYXMgYmVlbiBjbGlja2VkLlxuICAgICAqL1xuICAgIHB1YmxpYyBiYWNrZHJvcENsaWNrKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4ga2V5ZG93biBldmVudHMgYXJlIHRhcmdldGVkIG9uIHRoZSBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBrZXlkb3duRXZlbnRzKCk6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBkaWFsb2cncyBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gTmV3IGRpYWxvZyBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlUG9zaXRpb24ocG9zaXRpb24/OiBEaWFsb2dQb3NpdGlvbik6IHRoaXMge1xuICAgICAgICBjb25zdCBzdHJhdGVneSA9IHRoaXMuZ2V0UG9zaXRpb25TdHJhdGVneSgpO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiAmJiAocG9zaXRpb24ubGVmdCB8fCBwb3NpdGlvbi5yaWdodCkpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLmxlZnRcbiAgICAgICAgICAgICAgICA/IHN0cmF0ZWd5LmxlZnQocG9zaXRpb24ubGVmdClcbiAgICAgICAgICAgICAgICA6IHN0cmF0ZWd5LnJpZ2h0KHBvc2l0aW9uLnJpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmF0ZWd5LmNlbnRlckhvcml6b250YWxseSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uICYmIChwb3NpdGlvbi50b3AgfHwgcG9zaXRpb24uYm90dG9tKSkge1xuICAgICAgICAgICAgcG9zaXRpb24udG9wXG4gICAgICAgICAgICAgICAgPyBzdHJhdGVneS50b3AocG9zaXRpb24udG9wKVxuICAgICAgICAgICAgICAgIDogc3RyYXRlZ3kuYm90dG9tKHBvc2l0aW9uLmJvdHRvbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJhdGVneS5jZW50ZXJWZXJ0aWNhbGx5KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBkaWFsb2cncyB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgICAqIEBwYXJhbSB3aWR0aCBOZXcgd2lkdGggb2YgdGhlIGRpYWxvZy5cbiAgICAgKiBAcGFyYW0gaGVpZ2h0IE5ldyBoZWlnaHQgb2YgdGhlIGRpYWxvZy5cbiAgICAgKi9cbiAgICB1cGRhdGVTaXplKHdpZHRoOiBzdHJpbmcgPSAnYXV0bycsIGhlaWdodDogc3RyaW5nID0gJ2F1dG8nKTogdGhpcyB7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb25TdHJhdGVneSgpXG4gICAgICAgICAgICAud2lkdGgod2lkdGgpXG4gICAgICAgICAgICAuaGVpZ2h0KGhlaWdodCk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNBbmltYXRpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5pc0FuaW1hdGluZztcbiAgICB9XG5cbiAgICBwdWJsaWMgYWZ0ZXJPcGVuKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZnRlck9wZW4kLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBiZWZvcmVDbG9zZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmVmb3JlQ2xvc2UkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZnRlckNsb3NlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWZ0ZXJDbG9zZWQkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIC8qKiBGZXRjaGVzIHRoZSBwb3NpdGlvbiBzdHJhdGVneSBvYmplY3QgZnJvbSB0aGUgb3ZlcmxheSByZWYuICovXG4gICAgcHJpdmF0ZSBnZXRQb3NpdGlvblN0cmF0ZWd5KCk6IEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpXG4gICAgICAgICAgICAucG9zaXRpb25TdHJhdGVneSBhcyBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5O1xuICAgIH1cbn1cbiJdfQ==