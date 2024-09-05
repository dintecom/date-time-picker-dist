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
            this._afterOpen$.next(null);
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
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
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
        this.getPositionStrategy().width(width).height(height);
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
        return this.overlayRef.getConfig().positionStrategy;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlZi5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RpYWxvZy9kaWFsb2ctcmVmLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUcvQyxPQUFPLEVBQWMsT0FBTyxFQUFFLFlBQVksRUFBcUMsTUFBTSxNQUFNLENBQUM7QUFDNUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk5QyxNQUFNLE9BQU8sWUFBWTtJQW9CdkIsWUFDVSxVQUFzQixFQUN0QixTQUFzQyxFQUM5QixFQUFVLEVBQzFCLFFBQW1CO1FBSFgsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixjQUFTLEdBQVQsU0FBUyxDQUE2QjtRQUM5QixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBcEJwQixrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFFbkMsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBRWpDLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUUzQyxzREFBc0Q7UUFDOUMsb0JBQWUsR0FBa0IsWUFBWSxDQUFDLEtBQUssQ0FBQztRQU81RCx1REFBdUQ7UUFDaEQsaUJBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFRdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUI7YUFDakMsSUFBSSxDQUNILE1BQU0sQ0FBQyxDQUFDLEtBQXFCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLEVBQzFGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUjthQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUI7YUFDakMsSUFBSSxDQUNILE1BQU0sQ0FBQyxDQUFDLEtBQXFCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLEVBQ3pGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUjthQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxVQUFVO2FBQ1osYUFBYSxFQUFFO2FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3JFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUVqQyxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQzdDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUU7b0JBQzNDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDZDtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQWtCO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO1FBRTNCLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCO2FBQ2pDLElBQUksQ0FDSCxNQUFNLENBQUMsQ0FBQyxLQUFxQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxFQUM5RCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1I7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNJLGFBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNJLGFBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxjQUFjLENBQUMsUUFBeUI7UUFDN0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFNUMsSUFBSSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqRCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0U7YUFBTTtZQUNMLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQy9CO1FBRUQsSUFBSSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNqRCxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUU7YUFBTTtZQUNMLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVqQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVSxDQUFDLEtBQUssR0FBRyxNQUFNLEVBQUUsTUFBTSxHQUFHLE1BQU07UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztJQUNwQyxDQUFDO0lBRU0sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVNLFdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxpRUFBaUU7SUFDekQsbUJBQW1CO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxnQkFBMEMsQ0FBQztJQUNoRixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3ksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIFN1YnNjcmlwdGlvbkxpa2UgYXMgSVN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlhbG9nUG9zaXRpb24gfSBmcm9tICcuL2RpYWxvZy1jb25maWcuY2xhc3MnO1xuaW1wb3J0IHsgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBPd2xEaWFsb2dSZWY8VD4ge1xuICBwcml2YXRlIHJlc3VsdDogYW55O1xuXG4gIHByaXZhdGUgX2JlZm9yZUNsb3NlJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBwcml2YXRlIF9hZnRlck9wZW4kID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIHByaXZhdGUgX2FmdGVyQ2xvc2VkJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIGNoYW5nZXMgaW4gdGhlIHVzZXIncyBsb2NhdGlvbi4gKi9cbiAgcHJpdmF0ZSBsb2NhdGlvbkNoYW5nZWQ6IElTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqXG4gICAqIFRoZSBpbnN0YW5jZSBvZiBjb21wb25lbnQgb3BlbmVkIGludG8gbW9kYWxcbiAgICovXG4gIHB1YmxpYyBjb21wb25lbnRJbnN0YW5jZTogVDtcblxuICAvKiogV2hldGhlciB0aGUgdXNlciBpcyBhbGxvd2VkIHRvIGNsb3NlIHRoZSBkaWFsb2cuICovXG4gIHB1YmxpYyBkaXNhYmxlQ2xvc2UgPSB0aGlzLmNvbnRhaW5lci5jb25maWcuZGlzYWJsZUNsb3NlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nLFxuICAgIGxvY2F0aW9uPzogTG9jYXRpb24sXG4gICkge1xuICAgIHRoaXMuY29udGFpbmVyLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSA9PiBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSAnZW50ZXInKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9hZnRlck9wZW4kLm5leHQobnVsbCk7XG4gICAgICAgIHRoaXMuX2FmdGVyT3BlbiQuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5jb250YWluZXIuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChldmVudDogQW5pbWF0aW9uRXZlbnQpID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIGV2ZW50LnRvU3RhdGUgPT09ICdleGl0JyksXG4gICAgICAgIHRha2UoMSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5sb2NhdGlvbkNoYW5nZWQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5fYWZ0ZXJDbG9zZWQkLm5leHQodGhpcy5yZXN1bHQpO1xuICAgICAgICB0aGlzLl9hZnRlckNsb3NlZCQuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5vdmVybGF5UmVmXG4gICAgICAua2V5ZG93bkV2ZW50cygpXG4gICAgICAucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmICF0aGlzLmRpc2FibGVDbG9zZSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG5cbiAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgIHRoaXMubG9jYXRpb25DaGFuZ2VkID0gbG9jYXRpb24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmNvbmZpZy5jbG9zZU9uTmF2aWdhdGlvbikge1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKGRpYWxvZ1Jlc3VsdD86IGFueSkge1xuICAgIHRoaXMucmVzdWx0ID0gZGlhbG9nUmVzdWx0O1xuXG4gICAgdGhpcy5jb250YWluZXIuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChldmVudDogQW5pbWF0aW9uRXZlbnQpID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ3N0YXJ0JyksXG4gICAgICAgIHRha2UoMSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fYmVmb3JlQ2xvc2UkLm5leHQoZGlhbG9nUmVzdWx0KTtcbiAgICAgICAgdGhpcy5fYmVmb3JlQ2xvc2UkLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2hCYWNrZHJvcCgpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5zdGFydEV4aXRBbmltYXRpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCBlbWl0cyB3aGVuIHRoZSBvdmVybGF5J3MgYmFja2Ryb3AgaGFzIGJlZW4gY2xpY2tlZC5cbiAgICovXG4gIHB1YmxpYyBiYWNrZHJvcENsaWNrKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiBrZXlkb3duIGV2ZW50cyBhcmUgdGFyZ2V0ZWQgb24gdGhlIG92ZXJsYXkuXG4gICAqL1xuICBwdWJsaWMga2V5ZG93bkV2ZW50cygpOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBkaWFsb2cncyBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHBvc2l0aW9uIE5ldyBkaWFsb2cgcG9zaXRpb24uXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlUG9zaXRpb24ocG9zaXRpb24/OiBEaWFsb2dQb3NpdGlvbik6IHRoaXMge1xuICAgIGNvbnN0IHN0cmF0ZWd5ID0gdGhpcy5nZXRQb3NpdGlvblN0cmF0ZWd5KCk7XG5cbiAgICBpZiAocG9zaXRpb24gJiYgKHBvc2l0aW9uLmxlZnQgfHwgcG9zaXRpb24ucmlnaHQpKSB7XG4gICAgICBwb3NpdGlvbi5sZWZ0ID8gc3RyYXRlZ3kubGVmdChwb3NpdGlvbi5sZWZ0KSA6IHN0cmF0ZWd5LnJpZ2h0KHBvc2l0aW9uLnJpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyYXRlZ3kuY2VudGVySG9yaXpvbnRhbGx5KCk7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uICYmIChwb3NpdGlvbi50b3AgfHwgcG9zaXRpb24uYm90dG9tKSkge1xuICAgICAgcG9zaXRpb24udG9wID8gc3RyYXRlZ3kudG9wKHBvc2l0aW9uLnRvcCkgOiBzdHJhdGVneS5ib3R0b20ocG9zaXRpb24uYm90dG9tKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyYXRlZ3kuY2VudGVyVmVydGljYWxseSgpO1xuICAgIH1cblxuICAgIHRoaXMub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZGlhbG9nJ3Mgd2lkdGggYW5kIGhlaWdodC5cbiAgICogQHBhcmFtIHdpZHRoIE5ldyB3aWR0aCBvZiB0aGUgZGlhbG9nLlxuICAgKiBAcGFyYW0gaGVpZ2h0IE5ldyBoZWlnaHQgb2YgdGhlIGRpYWxvZy5cbiAgICovXG4gIHVwZGF0ZVNpemUod2lkdGggPSAnYXV0bycsIGhlaWdodCA9ICdhdXRvJyk6IHRoaXMge1xuICAgIHRoaXMuZ2V0UG9zaXRpb25TdHJhdGVneSgpLndpZHRoKHdpZHRoKS5oZWlnaHQoaGVpZ2h0KTtcbiAgICB0aGlzLm92ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBpc0FuaW1hdGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIuaXNBbmltYXRpbmc7XG4gIH1cblxuICBwdWJsaWMgYWZ0ZXJPcGVuKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2FmdGVyT3BlbiQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgYmVmb3JlQ2xvc2UoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fYmVmb3JlQ2xvc2UkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHVibGljIGFmdGVyQ2xvc2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2FmdGVyQ2xvc2VkJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKiBGZXRjaGVzIHRoZSBwb3NpdGlvbiBzdHJhdGVneSBvYmplY3QgZnJvbSB0aGUgb3ZlcmxheSByZWYuICovXG4gIHByaXZhdGUgZ2V0UG9zaXRpb25TdHJhdGVneSgpOiBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLnBvc2l0aW9uU3RyYXRlZ3kgYXMgR2xvYmFsUG9zaXRpb25TdHJhdGVneTtcbiAgfVxufVxuIl19