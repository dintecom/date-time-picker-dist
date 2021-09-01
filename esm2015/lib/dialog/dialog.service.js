/**
 * dialog.service
 */
import { Inject, Injectable, InjectionToken, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { OwlDialogConfig } from './dialog-config.class';
import { OwlDialogRef } from './dialog-ref.class';
import { OwlDialogContainerComponent } from './dialog-container.component';
import { extendObject } from '../utils';
import { defer, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/common";
import * as i3 from "./dialog-config.class";
export const OWL_DIALOG_DATA = new InjectionToken('OwlDialogData');
/**
 * Injection token that determines the scroll handling while the dialog is open.
 */
export const OWL_DIALOG_SCROLL_STRATEGY = new InjectionToken('owl-dialog-scroll-strategy');
export function OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.block();
}
/** @docs-private */
export const OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/**
 * Injection token that can be used to specify default dialog options.
 */
export const OWL_DIALOG_DEFAULT_OPTIONS = new InjectionToken('owl-dialog-default-options');
export class OwlDialogService {
    constructor(overlay, injector, location, scrollStrategy, defaultOptions, parentDialog, overlayContainer) {
        this.overlay = overlay;
        this.injector = injector;
        this.location = location;
        this.defaultOptions = defaultOptions;
        this.parentDialog = parentDialog;
        this.overlayContainer = overlayContainer;
        this.ariaHiddenElements = new Map();
        this._openDialogsAtThisLevel = [];
        this._afterOpenAtThisLevel = new Subject();
        this._afterAllClosedAtThisLevel = new Subject();
        /**
         * Stream that emits when all open dialog have finished closing.
         * Will emit on subscribe if there are no open dialogs to begin with.
         */
        this.afterAllClosed = defer(() => this._openDialogsAtThisLevel.length
            ? this._afterAllClosed
            : this._afterAllClosed.pipe(startWith(undefined)));
        this.scrollStrategy = scrollStrategy;
        if (!parentDialog && location) {
            location.subscribe(() => this.closeAll());
        }
    }
    /** Keeps track of the currently-open dialogs. */
    get openDialogs() {
        return this.parentDialog
            ? this.parentDialog.openDialogs
            : this._openDialogsAtThisLevel;
    }
    /** Stream that emits when a dialog has been opened. */
    get afterOpen() {
        return this.parentDialog
            ? this.parentDialog.afterOpen
            : this._afterOpenAtThisLevel;
    }
    get _afterAllClosed() {
        const parent = this.parentDialog;
        return parent
            ? parent._afterAllClosed
            : this._afterAllClosedAtThisLevel;
    }
    open(componentOrTemplateRef, config) {
        config = applyConfigDefaults(config, this.defaultOptions);
        if (config.id && this.getDialogById(config.id)) {
            throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
        }
        const overlayRef = this.createOverlay(config);
        const dialogContainer = this.attachDialogContainer(overlayRef, config);
        const dialogRef = this.attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
        if (!this.openDialogs.length) {
            this.hideNonDialogContentFromAssistiveTechnology();
        }
        this.openDialogs.push(dialogRef);
        dialogRef
            .afterClosed()
            .subscribe(() => this.removeOpenDialog(dialogRef));
        this.afterOpen.next(dialogRef);
        return dialogRef;
    }
    /**
     * Closes all of the currently-open dialogs.
     */
    closeAll() {
        let i = this.openDialogs.length;
        while (i--) {
            this.openDialogs[i].close();
        }
    }
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     */
    getDialogById(id) {
        return this.openDialogs.find(dialog => dialog.id === id);
    }
    attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config) {
        const dialogRef = new OwlDialogRef(overlayRef, dialogContainer, config.id, this.location);
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe(() => {
                if (!dialogRef.disableClose) {
                    dialogRef.close();
                }
            });
        }
        if (componentOrTemplateRef instanceof TemplateRef) {
        }
        else {
            const injector = this.createInjector(config, dialogRef, dialogContainer);
            const contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
            dialogRef.componentInstance = contentRef.instance;
        }
        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);
        return dialogRef;
    }
    createInjector(config, dialogRef, dialogContainer) {
        const userInjector = config &&
            config.viewContainerRef &&
            config.viewContainerRef.injector;
        const injectionTokens = new WeakMap();
        injectionTokens.set(OwlDialogRef, dialogRef);
        injectionTokens.set(OwlDialogContainerComponent, dialogContainer);
        injectionTokens.set(OWL_DIALOG_DATA, config.data);
        return new PortalInjector(userInjector || this.injector, injectionTokens);
    }
    createOverlay(config) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }
    attachDialogContainer(overlayRef, config) {
        const containerPortal = new ComponentPortal(OwlDialogContainerComponent, config.viewContainerRef);
        const containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.setConfig(config);
        return containerRef.instance;
    }
    getOverlayConfig(dialogConfig) {
        const state = new OverlayConfig({
            positionStrategy: this.overlay.position().global(),
            scrollStrategy: dialogConfig.scrollStrategy || this.scrollStrategy(),
            panelClass: dialogConfig.paneClass,
            hasBackdrop: dialogConfig.hasBackdrop,
            minWidth: dialogConfig.minWidth,
            minHeight: dialogConfig.minHeight,
            maxWidth: dialogConfig.maxWidth,
            maxHeight: dialogConfig.maxHeight
        });
        if (dialogConfig.backdropClass) {
            state.backdropClass = dialogConfig.backdropClass;
        }
        return state;
    }
    removeOpenDialog(dialogRef) {
        const index = this._openDialogsAtThisLevel.indexOf(dialogRef);
        if (index > -1) {
            this.openDialogs.splice(index, 1);
            // If all the dialogs were closed, remove/restore the `aria-hidden`
            // to a the siblings and emit to the `afterAllClosed` stream.
            if (!this.openDialogs.length) {
                this.ariaHiddenElements.forEach((previousValue, element) => {
                    if (previousValue) {
                        element.setAttribute('aria-hidden', previousValue);
                    }
                    else {
                        element.removeAttribute('aria-hidden');
                    }
                });
                this.ariaHiddenElements.clear();
                this._afterAllClosed.next();
            }
        }
    }
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     */
    hideNonDialogContentFromAssistiveTechnology() {
        const overlayContainer = this.overlayContainer.getContainerElement();
        // Ensure that the overlay container is attached to the DOM.
        if (overlayContainer.parentElement) {
            const siblings = overlayContainer.parentElement.children;
            for (let i = siblings.length - 1; i > -1; i--) {
                const sibling = siblings[i];
                if (sibling !== overlayContainer &&
                    sibling.nodeName !== 'SCRIPT' &&
                    sibling.nodeName !== 'STYLE' &&
                    !sibling.hasAttribute('aria-live')) {
                    this.ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }
        }
    }
}
OwlDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: OwlDialogService, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: i2.Location, optional: true }, { token: OWL_DIALOG_SCROLL_STRATEGY }, { token: OWL_DIALOG_DEFAULT_OPTIONS, optional: true }, { token: OwlDialogService, optional: true, skipSelf: true }, { token: i1.OverlayContainer }], target: i0.ɵɵFactoryTarget.Injectable });
OwlDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: OwlDialogService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: OwlDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: i2.Location, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [OWL_DIALOG_SCROLL_STRATEGY]
                }] }, { type: i3.OwlDialogConfig, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [OWL_DIALOG_DEFAULT_OPTIONS]
                }] }, { type: OwlDialogService, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i1.OverlayContainer }]; } });
/**
 * Applies default options to the dialog config.
 * @param config Config to be modified.
 * @param defaultOptions Default config setting
 * @returns The new configuration object.
 */
function applyConfigDefaults(config, defaultOptions) {
    return extendObject(new OwlDialogConfig(), config, defaultOptions);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kaWFsb2cvZGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLEVBRUgsTUFBTSxFQUNOLFVBQVUsRUFDVixjQUFjLEVBRWQsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQ0gsT0FBTyxFQUNQLGFBQWEsRUFJaEIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQ0gsZUFBZSxFQUVmLGNBQWMsRUFDakIsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7QUFFN0IsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLElBQUksY0FBYyxDQUFNLGVBQWUsQ0FBQyxDQUFDO0FBRXhFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsSUFBSSxjQUFjLENBRTFELDRCQUE0QixDQUFDLENBQUM7QUFFaEMsTUFBTSxVQUFVLDJDQUEyQyxDQUN2RCxPQUFnQjtJQUVoQixPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNsRCxDQUFDO0FBRUQsb0JBQW9CO0FBQ3BC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LEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFNUIsSUFDSSxPQUFPLEtBQUssZ0JBQWdCO29CQUM1QixPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVE7b0JBQzdCLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTztvQkFDNUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUNwQztvQkFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUN2QixPQUFPLEVBQ1AsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FDdEMsQ0FBQztvQkFDRixPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDL0M7YUFDSjtTQUNKO0lBQ0wsQ0FBQzs7NkdBeFFRLGdCQUFnQix5R0E2Q2IsMEJBQTBCLGFBRTFCLDBCQUEwQiw2QkFJWixnQkFBZ0I7aUhBbkRqQyxnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVTs7MEJBNkNGLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsMEJBQTBCOzswQkFDakMsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQywwQkFBMEI7OEJBSVosZ0JBQWdCOzBCQUZyQyxRQUFROzswQkFDUixRQUFROztBQXlOakI7Ozs7O0dBS0c7QUFDSCxTQUFTLG1CQUFtQixDQUN4QixNQUF3QixFQUN4QixjQUFnQztJQUVoQyxPQUFPLFlBQVksQ0FBQyxJQUFJLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztBQUN2RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkaWFsb2cuc2VydmljZVxuICovXG5cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBJbmplY3RhYmxlLFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIEluamVjdG9yLFxuICAgIE9wdGlvbmFsLFxuICAgIFNraXBTZWxmLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT3dsRGlhbG9nQ29uZmlnIH0gZnJvbSAnLi9kaWFsb2ctY29uZmlnLmNsYXNzJztcbmltcG9ydCB7IE93bERpYWxvZ1JlZiB9IGZyb20gJy4vZGlhbG9nLXJlZi5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RpYWxvZy1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IGV4dGVuZE9iamVjdCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGRlZmVyLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheUNvbmZpZyxcbiAgICBPdmVybGF5Q29udGFpbmVyLFxuICAgIE92ZXJsYXlSZWYsXG4gICAgU2Nyb2xsU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnRQb3J0YWwsXG4gICAgQ29tcG9uZW50VHlwZSxcbiAgICBQb3J0YWxJbmplY3RvclxufSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcblxuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfREFUQSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdPd2xEaWFsb2dEYXRhJyk7XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkaWFsb2cgaXMgb3Blbi5cbiAqL1xuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZID0gbmV3IEluamVjdGlvblRva2VuPFxuICAgICgpID0+IFNjcm9sbFN0cmF0ZWd5XG4+KCdvd2wtZGlhbG9nLXNjcm9sbC1zdHJhdGVneScpO1xuXG5leHBvcnQgZnVuY3Rpb24gT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWShcbiAgICBvdmVybGF5OiBPdmVybGF5XG4pOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZXG59O1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHNwZWNpZnkgZGVmYXVsdCBkaWFsb2cgb3B0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfREVGQVVMVF9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPE93bERpYWxvZ0NvbmZpZz4oXG4gICAgJ293bC1kaWFsb2ctZGVmYXVsdC1vcHRpb25zJ1xuKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE93bERpYWxvZ1NlcnZpY2Uge1xuICAgIHByaXZhdGUgYXJpYUhpZGRlbkVsZW1lbnRzID0gbmV3IE1hcDxFbGVtZW50LCBzdHJpbmcgfCBudWxsPigpO1xuXG4gICAgcHJpdmF0ZSBfb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbDogT3dsRGlhbG9nUmVmPGFueT5bXSA9IFtdO1xuICAgIHByaXZhdGUgX2FmdGVyT3BlbkF0VGhpc0xldmVsID0gbmV3IFN1YmplY3Q8T3dsRGlhbG9nUmVmPGFueT4+KCk7XG4gICAgcHJpdmF0ZSBfYWZ0ZXJBbGxDbG9zZWRBdFRoaXNMZXZlbCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnRseS1vcGVuIGRpYWxvZ3MuICovXG4gICAgZ2V0IG9wZW5EaWFsb2dzKCk6IE93bERpYWxvZ1JlZjxhbnk+W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnREaWFsb2dcbiAgICAgICAgICAgID8gdGhpcy5wYXJlbnREaWFsb2cub3BlbkRpYWxvZ3NcbiAgICAgICAgICAgIDogdGhpcy5fb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbDtcbiAgICB9XG5cbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhIGRpYWxvZyBoYXMgYmVlbiBvcGVuZWQuICovXG4gICAgZ2V0IGFmdGVyT3BlbigpOiBTdWJqZWN0PE93bERpYWxvZ1JlZjxhbnk+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudERpYWxvZ1xuICAgICAgICAgICAgPyB0aGlzLnBhcmVudERpYWxvZy5hZnRlck9wZW5cbiAgICAgICAgICAgIDogdGhpcy5fYWZ0ZXJPcGVuQXRUaGlzTGV2ZWw7XG4gICAgfVxuXG4gICAgZ2V0IF9hZnRlckFsbENsb3NlZCgpOiBhbnkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudERpYWxvZztcbiAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgICAgICAgPyBwYXJlbnQuX2FmdGVyQWxsQ2xvc2VkXG4gICAgICAgICAgICA6IHRoaXMuX2FmdGVyQWxsQ2xvc2VkQXRUaGlzTGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhbGwgb3BlbiBkaWFsb2cgaGF2ZSBmaW5pc2hlZCBjbG9zaW5nLlxuICAgICAqIFdpbGwgZW1pdCBvbiBzdWJzY3JpYmUgaWYgdGhlcmUgYXJlIG5vIG9wZW4gZGlhbG9ncyB0byBiZWdpbiB3aXRoLlxuICAgICAqL1xuXG4gICAgYWZ0ZXJBbGxDbG9zZWQ6IE9ic2VydmFibGU8e30+ID0gZGVmZXIoKCkgPT5cbiAgICAgICAgdGhpcy5fb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbC5sZW5ndGhcbiAgICAgICAgICAgID8gdGhpcy5fYWZ0ZXJBbGxDbG9zZWRcbiAgICAgICAgICAgIDogdGhpcy5fYWZ0ZXJBbGxDbG9zZWQucGlwZShzdGFydFdpdGgodW5kZWZpbmVkKSlcbiAgICApO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgICAgIEBJbmplY3QoT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RJQUxPR19ERUZBVUxUX09QVElPTlMpXG4gICAgICAgIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM6IE93bERpYWxvZ0NvbmZpZyxcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQFNraXBTZWxmKClcbiAgICAgICAgcHJpdmF0ZSBwYXJlbnREaWFsb2c6IE93bERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheUNvbnRhaW5lcjogT3ZlcmxheUNvbnRhaW5lclxuICAgICkge1xuICAgICAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5ID0gc2Nyb2xsU3RyYXRlZ3k7XG4gICAgICAgIGlmICghcGFyZW50RGlhbG9nICYmIGxvY2F0aW9uKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZUFsbCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuPFQ+KFxuICAgICAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sXG4gICAgICAgIGNvbmZpZz86IE93bERpYWxvZ0NvbmZpZ1xuICAgICk6IE93bERpYWxvZ1JlZjxhbnk+IHtcbiAgICAgICAgY29uZmlnID0gYXBwbHlDb25maWdEZWZhdWx0cyhjb25maWcsIHRoaXMuZGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChjb25maWcuaWQgJiYgdGhpcy5nZXREaWFsb2dCeUlkKGNvbmZpZy5pZCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBEaWFsb2cgd2l0aCBpZCBcIiR7Y29uZmlnLmlkfVwiIGV4aXN0cyBhbHJlYWR5LiBUaGUgZGlhbG9nIGlkIG11c3QgYmUgdW5pcXVlLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbnRhaW5lciA9IHRoaXMuYXR0YWNoRGlhbG9nQ29udGFpbmVyKG92ZXJsYXlSZWYsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuYXR0YWNoRGlhbG9nQ29udGVudDxUPihcbiAgICAgICAgICAgIGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsXG4gICAgICAgICAgICBkaWFsb2dDb250YWluZXIsXG4gICAgICAgICAgICBvdmVybGF5UmVmLFxuICAgICAgICAgICAgY29uZmlnXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wZW5EaWFsb2dzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlTm9uRGlhbG9nQ29udGVudEZyb21Bc3Npc3RpdmVUZWNobm9sb2d5KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wZW5EaWFsb2dzLnB1c2goZGlhbG9nUmVmKTtcbiAgICAgICAgZGlhbG9nUmVmXG4gICAgICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbW92ZU9wZW5EaWFsb2coZGlhbG9nUmVmKSk7XG4gICAgICAgIHRoaXMuYWZ0ZXJPcGVuLm5leHQoZGlhbG9nUmVmKTtcbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgYWxsIG9mIHRoZSBjdXJyZW50bHktb3BlbiBkaWFsb2dzLlxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9zZUFsbCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGkgPSB0aGlzLm9wZW5EaWFsb2dzLmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5EaWFsb2dzW2ldLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbiBvcGVuIGRpYWxvZyBieSBpdHMgaWQuXG4gICAgICogQHBhcmFtIGlkIElEIHRvIHVzZSB3aGVuIGxvb2tpbmcgdXAgdGhlIGRpYWxvZy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RGlhbG9nQnlJZChpZDogc3RyaW5nKTogT3dsRGlhbG9nUmVmPGFueT4gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuRGlhbG9ncy5maW5kKGRpYWxvZyA9PiBkaWFsb2cuaWQgPT09IGlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaERpYWxvZ0NvbnRlbnQ8VD4oXG4gICAgICAgIGNvbXBvbmVudE9yVGVtcGxhdGVSZWY6IENvbXBvbmVudFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPixcbiAgICAgICAgZGlhbG9nQ29udGFpbmVyOiBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgICAgIGNvbmZpZzogT3dsRGlhbG9nQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IG5ldyBPd2xEaWFsb2dSZWY8VD4oXG4gICAgICAgICAgICBvdmVybGF5UmVmLFxuICAgICAgICAgICAgZGlhbG9nQ29udGFpbmVyLFxuICAgICAgICAgICAgY29uZmlnLmlkLFxuICAgICAgICAgICAgdGhpcy5sb2NhdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChjb25maWcuaGFzQmFja2Ryb3ApIHtcbiAgICAgICAgICAgIG92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFkaWFsb2dSZWYuZGlzYWJsZUNsb3NlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ1JlZi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaW5qZWN0b3IgPSB0aGlzLmNyZWF0ZUluamVjdG9yPFQ+KFxuICAgICAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgICAgICBkaWFsb2dSZWYsXG4gICAgICAgICAgICAgICAgZGlhbG9nQ29udGFpbmVyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgY29udGVudFJlZiA9IGRpYWxvZ0NvbnRhaW5lci5hdHRhY2hDb21wb25lbnRQb3J0YWwoXG4gICAgICAgICAgICAgICAgbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnRPclRlbXBsYXRlUmVmLCB1bmRlZmluZWQsIGluamVjdG9yKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZSA9IGNvbnRlbnRSZWYuaW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBkaWFsb2dSZWZcbiAgICAgICAgICAgIC51cGRhdGVTaXplKGNvbmZpZy53aWR0aCwgY29uZmlnLmhlaWdodClcbiAgICAgICAgICAgIC51cGRhdGVQb3NpdGlvbihjb25maWcucG9zaXRpb24pO1xuXG4gICAgICAgIHJldHVybiBkaWFsb2dSZWY7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVJbmplY3RvcjxUPihcbiAgICAgICAgY29uZmlnOiBPd2xEaWFsb2dDb25maWcsXG4gICAgICAgIGRpYWxvZ1JlZjogT3dsRGlhbG9nUmVmPFQ+LFxuICAgICAgICBkaWFsb2dDb250YWluZXI6IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudFxuICAgICkge1xuICAgICAgICBjb25zdCB1c2VySW5qZWN0b3IgPVxuICAgICAgICAgICAgY29uZmlnICYmXG4gICAgICAgICAgICBjb25maWcudmlld0NvbnRhaW5lclJlZiAmJlxuICAgICAgICAgICAgY29uZmlnLnZpZXdDb250YWluZXJSZWYuaW5qZWN0b3I7XG4gICAgICAgIGNvbnN0IGluamVjdGlvblRva2VucyA9IG5ldyBXZWFrTWFwKCk7XG5cbiAgICAgICAgaW5qZWN0aW9uVG9rZW5zLnNldChPd2xEaWFsb2dSZWYsIGRpYWxvZ1JlZik7XG4gICAgICAgIGluamVjdGlvblRva2Vucy5zZXQoT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LCBkaWFsb2dDb250YWluZXIpO1xuICAgICAgICBpbmplY3Rpb25Ub2tlbnMuc2V0KE9XTF9ESUFMT0dfREFUQSwgY29uZmlnLmRhdGEpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUG9ydGFsSW5qZWN0b3IoXG4gICAgICAgICAgICB1c2VySW5qZWN0b3IgfHwgdGhpcy5pbmplY3RvcixcbiAgICAgICAgICAgIGluamVjdGlvblRva2Vuc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlT3ZlcmxheShjb25maWc6IE93bERpYWxvZ0NvbmZpZyk6IE92ZXJsYXlSZWYge1xuICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gdGhpcy5nZXRPdmVybGF5Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoRGlhbG9nQ29udGFpbmVyKFxuICAgICAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmLFxuICAgICAgICBjb25maWc6IE93bERpYWxvZ0NvbmZpZ1xuICAgICk6IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoXG4gICAgICAgICAgICBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgICAgICBjb25maWcudmlld0NvbnRhaW5lclJlZlxuICAgICAgICApO1xuICAgICAgICBjb25zdCBjb250YWluZXJSZWY6IENvbXBvbmVudFJlZjxPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQ+ID0gb3ZlcmxheVJlZi5hdHRhY2goXG4gICAgICAgICAgICBjb250YWluZXJQb3J0YWxcbiAgICAgICAgKTtcbiAgICAgICAgY29udGFpbmVyUmVmLmluc3RhbmNlLnNldENvbmZpZyhjb25maWcpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXJSZWYuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5Q29uZmlnKGRpYWxvZ0NvbmZpZzogT3dsRGlhbG9nQ29uZmlnKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKCksXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTpcbiAgICAgICAgICAgICAgICBkaWFsb2dDb25maWcuc2Nyb2xsU3RyYXRlZ3kgfHwgdGhpcy5zY3JvbGxTdHJhdGVneSgpLFxuICAgICAgICAgICAgcGFuZWxDbGFzczogZGlhbG9nQ29uZmlnLnBhbmVDbGFzcyxcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiBkaWFsb2dDb25maWcuaGFzQmFja2Ryb3AsXG4gICAgICAgICAgICBtaW5XaWR0aDogZGlhbG9nQ29uZmlnLm1pbldpZHRoLFxuICAgICAgICAgICAgbWluSGVpZ2h0OiBkaWFsb2dDb25maWcubWluSGVpZ2h0LFxuICAgICAgICAgICAgbWF4V2lkdGg6IGRpYWxvZ0NvbmZpZy5tYXhXaWR0aCxcbiAgICAgICAgICAgIG1heEhlaWdodDogZGlhbG9nQ29uZmlnLm1heEhlaWdodFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MpIHtcbiAgICAgICAgICAgIHN0YXRlLmJhY2tkcm9wQ2xhc3MgPSBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZU9wZW5EaWFsb2coZGlhbG9nUmVmOiBPd2xEaWFsb2dSZWY8YW55Pik6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX29wZW5EaWFsb2dzQXRUaGlzTGV2ZWwuaW5kZXhPZihkaWFsb2dSZWYpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5EaWFsb2dzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAvLyBJZiBhbGwgdGhlIGRpYWxvZ3Mgd2VyZSBjbG9zZWQsIHJlbW92ZS9yZXN0b3JlIHRoZSBgYXJpYS1oaWRkZW5gXG4gICAgICAgICAgICAvLyB0byBhIHRoZSBzaWJsaW5ncyBhbmQgZW1pdCB0byB0aGUgYGFmdGVyQWxsQ2xvc2VkYCBzdHJlYW0uXG4gICAgICAgICAgICBpZiAoIXRoaXMub3BlbkRpYWxvZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmlhSGlkZGVuRWxlbWVudHMuZm9yRWFjaCgocHJldmlvdXNWYWx1ZSwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgcHJldmlvdXNWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hcmlhSGlkZGVuRWxlbWVudHMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlckFsbENsb3NlZC5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyBhbGwgb2YgdGhlIGNvbnRlbnQgdGhhdCBpc24ndCBhbiBvdmVybGF5IGZyb20gYXNzaXN0aXZlIHRlY2hub2xvZ3kuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWRlTm9uRGlhbG9nQ29udGVudEZyb21Bc3Npc3RpdmVUZWNobm9sb2d5KCkge1xuICAgICAgICBjb25zdCBvdmVybGF5Q29udGFpbmVyID0gdGhpcy5vdmVybGF5Q29udGFpbmVyLmdldENvbnRhaW5lckVsZW1lbnQoKTtcblxuICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgb3ZlcmxheSBjb250YWluZXIgaXMgYXR0YWNoZWQgdG8gdGhlIERPTS5cbiAgICAgICAgaWYgKG92ZXJsYXlDb250YWluZXIucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3Qgc2libGluZ3MgPSBvdmVybGF5Q29udGFpbmVyLnBhcmVudEVsZW1lbnQuY2hpbGRyZW47XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzaWJsaW5ncy5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmcgPSBzaWJsaW5nc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgc2libGluZyAhPT0gb3ZlcmxheUNvbnRhaW5lciAmJlxuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLm5vZGVOYW1lICE9PSAnU0NSSVBUJyAmJlxuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLm5vZGVOYW1lICE9PSAnU1RZTEUnICYmXG4gICAgICAgICAgICAgICAgICAgICFzaWJsaW5nLmhhc0F0dHJpYnV0ZSgnYXJpYS1saXZlJylcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcmlhSGlkZGVuRWxlbWVudHMuc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmcuZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHNpYmxpbmcuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEFwcGxpZXMgZGVmYXVsdCBvcHRpb25zIHRvIHRoZSBkaWFsb2cgY29uZmlnLlxuICogQHBhcmFtIGNvbmZpZyBDb25maWcgdG8gYmUgbW9kaWZpZWQuXG4gKiBAcGFyYW0gZGVmYXVsdE9wdGlvbnMgRGVmYXVsdCBjb25maWcgc2V0dGluZ1xuICogQHJldHVybnMgVGhlIG5ldyBjb25maWd1cmF0aW9uIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYXBwbHlDb25maWdEZWZhdWx0cyhcbiAgICBjb25maWc/OiBPd2xEaWFsb2dDb25maWcsXG4gICAgZGVmYXVsdE9wdGlvbnM/OiBPd2xEaWFsb2dDb25maWdcbik6IE93bERpYWxvZ0NvbmZpZyB7XG4gICAgcmV0dXJuIGV4dGVuZE9iamVjdChuZXcgT3dsRGlhbG9nQ29uZmlnKCksIGNvbmZpZywgZGVmYXVsdE9wdGlvbnMpO1xufVxuIl19