/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * dialog.service
 */
import { Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { OwlDialogConfig } from './dialog-config.class';
import { OwlDialogRef } from './dialog-ref.class';
import { OwlDialogContainerComponent } from './dialog-container.component';
import { extendObject } from '../utils';
import { defer, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Overlay, OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
/** @type {?} */
export const OWL_DIALOG_DATA = new InjectionToken('OwlDialogData');
/**
 * Injection token that determines the scroll handling while the dialog is open.
 * @type {?}
 */
export const OWL_DIALOG_SCROLL_STRATEGY = new InjectionToken('owl-dialog-scroll-strategy');
/**
 * @param {?} overlay
 * @return {?}
 */
export function OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.block());
}
/**
 * \@docs-private
 * @type {?}
 */
export const OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/**
 * Injection token that can be used to specify default dialog options.
 * @type {?}
 */
export const OWL_DIALOG_DEFAULT_OPTIONS = new InjectionToken('owl-dialog-default-options');
export class OwlDialogService {
    /**
     * @param {?} overlay
     * @param {?} injector
     * @param {?} location
     * @param {?} scrollStrategy
     * @param {?} defaultOptions
     * @param {?} parentDialog
     * @param {?} overlayContainer
     */
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
        this.afterAllClosed = defer((/**
         * @return {?}
         */
        () => this._openDialogsAtThisLevel.length
            ? this._afterAllClosed
            : this._afterAllClosed.pipe(startWith(undefined))));
        this.scrollStrategy = scrollStrategy;
        if (!parentDialog && location) {
            location.subscribe((/**
             * @return {?}
             */
            () => this.closeAll()));
        }
    }
    /**
     * Keeps track of the currently-open dialogs.
     * @return {?}
     */
    get openDialogs() {
        return this.parentDialog
            ? this.parentDialog.openDialogs
            : this._openDialogsAtThisLevel;
    }
    /**
     * Stream that emits when a dialog has been opened.
     * @return {?}
     */
    get afterOpen() {
        return this.parentDialog
            ? this.parentDialog.afterOpen
            : this._afterOpenAtThisLevel;
    }
    /**
     * @return {?}
     */
    get _afterAllClosed() {
        /** @type {?} */
        const parent = this.parentDialog;
        return parent
            ? parent._afterAllClosed
            : this._afterAllClosedAtThisLevel;
    }
    /**
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    open(componentOrTemplateRef, config) {
        config = applyConfigDefaults(config, this.defaultOptions);
        if (config.id && this.getDialogById(config.id)) {
            throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
        }
        /** @type {?} */
        const overlayRef = this.createOverlay(config);
        /** @type {?} */
        const dialogContainer = this.attachDialogContainer(overlayRef, config);
        /** @type {?} */
        const dialogRef = this.attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
        if (!this.openDialogs.length) {
            this.hideNonDialogContentFromAssistiveTechnology();
        }
        this.openDialogs.push(dialogRef);
        dialogRef
            .afterClosed()
            .subscribe((/**
         * @return {?}
         */
        () => this.removeOpenDialog(dialogRef)));
        this.afterOpen.next(dialogRef);
        return dialogRef;
    }
    /**
     * Closes all of the currently-open dialogs.
     * @return {?}
     */
    closeAll() {
        /** @type {?} */
        let i = this.openDialogs.length;
        while (i--) {
            this.openDialogs[i].close();
        }
    }
    /**
     * Finds an open dialog by its id.
     * @param {?} id ID to use when looking up the dialog.
     * @return {?}
     */
    getDialogById(id) {
        return this.openDialogs.find((/**
         * @param {?} dialog
         * @return {?}
         */
        dialog => dialog.id === id));
    }
    /**
     * @private
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?} dialogContainer
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config) {
        /** @type {?} */
        const dialogRef = new OwlDialogRef(overlayRef, dialogContainer, config.id, this.location);
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe((/**
             * @return {?}
             */
            () => {
                if (!dialogRef.disableClose) {
                    dialogRef.close();
                }
            }));
        }
        if (componentOrTemplateRef instanceof TemplateRef) {
        }
        else {
            /** @type {?} */
            const injector = this.createInjector(config, dialogRef, dialogContainer);
            /** @type {?} */
            const contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
            dialogRef.componentInstance = contentRef.instance;
        }
        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);
        return dialogRef;
    }
    /**
     * @private
     * @template T
     * @param {?} config
     * @param {?} dialogRef
     * @param {?} dialogContainer
     * @return {?}
     */
    createInjector(config, dialogRef, dialogContainer) {
        /** @type {?} */
        const userInjector = config &&
            config.viewContainerRef &&
            config.viewContainerRef.injector;
        /** @type {?} */
        const injectionTokens = new WeakMap();
        injectionTokens.set(OwlDialogRef, dialogRef);
        injectionTokens.set(OwlDialogContainerComponent, dialogContainer);
        injectionTokens.set(OWL_DIALOG_DATA, config.data);
        return new PortalInjector(userInjector || this.injector, injectionTokens);
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    createOverlay(config) {
        /** @type {?} */
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }
    /**
     * @private
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    attachDialogContainer(overlayRef, config) {
        /** @type {?} */
        const containerPortal = new ComponentPortal(OwlDialogContainerComponent, config.viewContainerRef);
        /** @type {?} */
        const containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.setConfig(config);
        return containerRef.instance;
    }
    /**
     * @private
     * @param {?} dialogConfig
     * @return {?}
     */
    getOverlayConfig(dialogConfig) {
        /** @type {?} */
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
    /**
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    removeOpenDialog(dialogRef) {
        /** @type {?} */
        const index = this._openDialogsAtThisLevel.indexOf(dialogRef);
        if (index > -1) {
            this.openDialogs.splice(index, 1);
            // If all the dialogs were closed, remove/restore the `aria-hidden`
            // to a the siblings and emit to the `afterAllClosed` stream.
            if (!this.openDialogs.length) {
                this.ariaHiddenElements.forEach((/**
                 * @param {?} previousValue
                 * @param {?} element
                 * @return {?}
                 */
                (previousValue, element) => {
                    if (previousValue) {
                        element.setAttribute('aria-hidden', previousValue);
                    }
                    else {
                        element.removeAttribute('aria-hidden');
                    }
                }));
                this.ariaHiddenElements.clear();
                this._afterAllClosed.next();
            }
        }
    }
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     * @private
     * @return {?}
     */
    hideNonDialogContentFromAssistiveTechnology() {
        /** @type {?} */
        const overlayContainer = this.overlayContainer.getContainerElement();
        // Ensure that the overlay container is attached to the DOM.
        if (overlayContainer.parentElement) {
            /** @type {?} */
            const siblings = overlayContainer.parentElement.children;
            for (let i = siblings.length - 1; i > -1; i--) {
                /** @type {?} */
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
OwlDialogService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OwlDialogService.ctorParameters = () => [
    { type: Overlay },
    { type: Injector },
    { type: Location, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Inject, args: [OWL_DIALOG_SCROLL_STRATEGY,] }] },
    { type: OwlDialogConfig, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DIALOG_DEFAULT_OPTIONS,] }] },
    { type: OwlDialogService, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: OverlayContainer }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.ariaHiddenElements;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype._openDialogsAtThisLevel;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype._afterOpenAtThisLevel;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype._afterAllClosedAtThisLevel;
    /**
     * Stream that emits when all open dialog have finished closing.
     * Will emit on subscribe if there are no open dialogs to begin with.
     * @type {?}
     */
    OwlDialogService.prototype.afterAllClosed;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.scrollStrategy;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.location;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.defaultOptions;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.parentDialog;
    /**
     * @type {?}
     * @private
     */
    OwlDialogService.prototype.overlayContainer;
}
/**
 * Applies default options to the dialog config.
 * @param {?=} config Config to be modified.
 * @param {?=} defaultOptions Default config setting
 * @return {?} The new configuration object.
 */
function applyConfigDefaults(config, defaultOptions) {
    return extendObject(new OwlDialogConfig(), config, defaultOptions);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kaWFsb2cvZGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFFSCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUNILE9BQU8sRUFDUCxhQUFhLEVBQ2IsZ0JBQWdCLEVBR25CLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNILGVBQWUsRUFFZixjQUFjLEVBQ2pCLE1BQU0scUJBQXFCLENBQUM7O0FBRTdCLE1BQU0sT0FBTyxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQU0sZUFBZSxDQUFDOzs7OztBQUt2RSxNQUFNLE9BQU8sMEJBQTBCLEdBQUcsSUFBSSxjQUFjLENBRTFELDRCQUE0QixDQUFDOzs7OztBQUUvQixNQUFNLFVBQVUsMkNBQTJDLENBQ3ZELE9BQWdCO0lBRWhCOzs7SUFBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEVB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LFFBQVE7b0JBQzdCLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTztvQkFDNUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUNwQztvQkFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUN2QixPQUFPLEVBQ1AsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FDdEMsQ0FBQztvQkFDRixPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDL0M7YUFDSjtTQUNKO0lBQ0wsQ0FBQzs7O1lBelFKLFVBQVU7Ozs7WUF6Q1AsT0FBTztZQWJQLFFBQVE7WUFLSCxRQUFRLHVCQThGUixRQUFROzRDQUNSLE1BQU0sU0FBQywwQkFBMEI7WUE5RmpDLGVBQWUsdUJBK0ZmLFFBQVEsWUFDUixNQUFNLFNBQUMsMEJBQTBCO1lBSVosZ0JBQWdCLHVCQUZyQyxRQUFRLFlBQ1IsUUFBUTtZQTFGYixnQkFBZ0I7Ozs7Ozs7SUF5Q2hCLDhDQUErRDs7Ozs7SUFFL0QsbURBQTBEOzs7OztJQUMxRCxpREFBaUU7Ozs7O0lBQ2pFLHNEQUF5RDs7Ozs7O0lBNEJ6RCwwQ0FJRTs7Ozs7SUFFRiwwQ0FBNkM7Ozs7O0lBR3pDLG1DQUF3Qjs7Ozs7SUFDeEIsb0NBQTBCOzs7OztJQUMxQixvQ0FBc0M7Ozs7O0lBRXRDLDBDQUV1Qzs7Ozs7SUFDdkMsd0NBRXNDOzs7OztJQUN0Qyw0Q0FBMEM7Ozs7Ozs7O0FBNk5sRCxTQUFTLG1CQUFtQixDQUN4QixNQUF3QixFQUN4QixjQUFnQztJQUVoQyxPQUFPLFlBQVksQ0FBQyxJQUFJLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztBQUN2RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkaWFsb2cuc2VydmljZVxuICovXG5cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBJbmplY3RhYmxlLFxuICAgIEluamVjdGlvblRva2VuLFxuICAgIEluamVjdG9yLFxuICAgIE9wdGlvbmFsLFxuICAgIFNraXBTZWxmLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT3dsRGlhbG9nQ29uZmlnIH0gZnJvbSAnLi9kaWFsb2ctY29uZmlnLmNsYXNzJztcbmltcG9ydCB7IE93bERpYWxvZ1JlZiB9IGZyb20gJy4vZGlhbG9nLXJlZi5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RpYWxvZy1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IGV4dGVuZE9iamVjdCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGRlZmVyLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheUNvbmZpZyxcbiAgICBPdmVybGF5Q29udGFpbmVyLFxuICAgIE92ZXJsYXlSZWYsXG4gICAgU2Nyb2xsU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnRQb3J0YWwsXG4gICAgQ29tcG9uZW50VHlwZSxcbiAgICBQb3J0YWxJbmplY3RvclxufSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcblxuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfREFUQSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdPd2xEaWFsb2dEYXRhJyk7XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkaWFsb2cgaXMgb3Blbi5cbiAqL1xuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZID0gbmV3IEluamVjdGlvblRva2VuPFxuICAgICgpID0+IFNjcm9sbFN0cmF0ZWd5XG4+KCdvd2wtZGlhbG9nLXNjcm9sbC1zdHJhdGVneScpO1xuXG5leHBvcnQgZnVuY3Rpb24gT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWShcbiAgICBvdmVybGF5OiBPdmVybGF5XG4pOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XG4gICAgcmV0dXJuICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSID0ge1xuICAgIHByb3ZpZGU6IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZXG59O1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHNwZWNpZnkgZGVmYXVsdCBkaWFsb2cgb3B0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfREVGQVVMVF9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPE93bERpYWxvZ0NvbmZpZz4oXG4gICAgJ293bC1kaWFsb2ctZGVmYXVsdC1vcHRpb25zJ1xuKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE93bERpYWxvZ1NlcnZpY2Uge1xuICAgIHByaXZhdGUgYXJpYUhpZGRlbkVsZW1lbnRzID0gbmV3IE1hcDxFbGVtZW50LCBzdHJpbmcgfCBudWxsPigpO1xuXG4gICAgcHJpdmF0ZSBfb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbDogT3dsRGlhbG9nUmVmPGFueT5bXSA9IFtdO1xuICAgIHByaXZhdGUgX2FmdGVyT3BlbkF0VGhpc0xldmVsID0gbmV3IFN1YmplY3Q8T3dsRGlhbG9nUmVmPGFueT4+KCk7XG4gICAgcHJpdmF0ZSBfYWZ0ZXJBbGxDbG9zZWRBdFRoaXNMZXZlbCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnRseS1vcGVuIGRpYWxvZ3MuICovXG4gICAgZ2V0IG9wZW5EaWFsb2dzKCk6IE93bERpYWxvZ1JlZjxhbnk+W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnREaWFsb2dcbiAgICAgICAgICAgID8gdGhpcy5wYXJlbnREaWFsb2cub3BlbkRpYWxvZ3NcbiAgICAgICAgICAgIDogdGhpcy5fb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbDtcbiAgICB9XG5cbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhIGRpYWxvZyBoYXMgYmVlbiBvcGVuZWQuICovXG4gICAgZ2V0IGFmdGVyT3BlbigpOiBTdWJqZWN0PE93bERpYWxvZ1JlZjxhbnk+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudERpYWxvZ1xuICAgICAgICAgICAgPyB0aGlzLnBhcmVudERpYWxvZy5hZnRlck9wZW5cbiAgICAgICAgICAgIDogdGhpcy5fYWZ0ZXJPcGVuQXRUaGlzTGV2ZWw7XG4gICAgfVxuXG4gICAgZ2V0IF9hZnRlckFsbENsb3NlZCgpOiBhbnkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudERpYWxvZztcbiAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgICAgICAgPyBwYXJlbnQuX2FmdGVyQWxsQ2xvc2VkXG4gICAgICAgICAgICA6IHRoaXMuX2FmdGVyQWxsQ2xvc2VkQXRUaGlzTGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhbGwgb3BlbiBkaWFsb2cgaGF2ZSBmaW5pc2hlZCBjbG9zaW5nLlxuICAgICAqIFdpbGwgZW1pdCBvbiBzdWJzY3JpYmUgaWYgdGhlcmUgYXJlIG5vIG9wZW4gZGlhbG9ncyB0byBiZWdpbiB3aXRoLlxuICAgICAqL1xuXG4gICAgYWZ0ZXJBbGxDbG9zZWQ6IE9ic2VydmFibGU8e30+ID0gZGVmZXIoKCkgPT5cbiAgICAgICAgdGhpcy5fb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbC5sZW5ndGhcbiAgICAgICAgICAgID8gdGhpcy5fYWZ0ZXJBbGxDbG9zZWRcbiAgICAgICAgICAgIDogdGhpcy5fYWZ0ZXJBbGxDbG9zZWQucGlwZShzdGFydFdpdGgodW5kZWZpbmVkKSlcbiAgICApO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgICAgIEBJbmplY3QoT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RJQUxPR19ERUZBVUxUX09QVElPTlMpXG4gICAgICAgIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM6IE93bERpYWxvZ0NvbmZpZyxcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQFNraXBTZWxmKClcbiAgICAgICAgcHJpdmF0ZSBwYXJlbnREaWFsb2c6IE93bERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheUNvbnRhaW5lcjogT3ZlcmxheUNvbnRhaW5lclxuICAgICkge1xuICAgICAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5ID0gc2Nyb2xsU3RyYXRlZ3k7XG4gICAgICAgIGlmICghcGFyZW50RGlhbG9nICYmIGxvY2F0aW9uKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZUFsbCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuPFQ+KFxuICAgICAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sXG4gICAgICAgIGNvbmZpZz86IE93bERpYWxvZ0NvbmZpZ1xuICAgICk6IE93bERpYWxvZ1JlZjxhbnk+IHtcbiAgICAgICAgY29uZmlnID0gYXBwbHlDb25maWdEZWZhdWx0cyhjb25maWcsIHRoaXMuZGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChjb25maWcuaWQgJiYgdGhpcy5nZXREaWFsb2dCeUlkKGNvbmZpZy5pZCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBEaWFsb2cgd2l0aCBpZCBcIiR7Y29uZmlnLmlkfVwiIGV4aXN0cyBhbHJlYWR5LiBUaGUgZGlhbG9nIGlkIG11c3QgYmUgdW5pcXVlLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5jcmVhdGVPdmVybGF5KGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbnRhaW5lciA9IHRoaXMuYXR0YWNoRGlhbG9nQ29udGFpbmVyKG92ZXJsYXlSZWYsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuYXR0YWNoRGlhbG9nQ29udGVudDxUPihcbiAgICAgICAgICAgIGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsXG4gICAgICAgICAgICBkaWFsb2dDb250YWluZXIsXG4gICAgICAgICAgICBvdmVybGF5UmVmLFxuICAgICAgICAgICAgY29uZmlnXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wZW5EaWFsb2dzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlTm9uRGlhbG9nQ29udGVudEZyb21Bc3Npc3RpdmVUZWNobm9sb2d5KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wZW5EaWFsb2dzLnB1c2goZGlhbG9nUmVmKTtcbiAgICAgICAgZGlhbG9nUmVmXG4gICAgICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbW92ZU9wZW5EaWFsb2coZGlhbG9nUmVmKSk7XG4gICAgICAgIHRoaXMuYWZ0ZXJPcGVuLm5leHQoZGlhbG9nUmVmKTtcbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgYWxsIG9mIHRoZSBjdXJyZW50bHktb3BlbiBkaWFsb2dzLlxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9zZUFsbCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGkgPSB0aGlzLm9wZW5EaWFsb2dzLmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5EaWFsb2dzW2ldLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbiBvcGVuIGRpYWxvZyBieSBpdHMgaWQuXG4gICAgICogQHBhcmFtIGlkIElEIHRvIHVzZSB3aGVuIGxvb2tpbmcgdXAgdGhlIGRpYWxvZy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RGlhbG9nQnlJZChpZDogc3RyaW5nKTogT3dsRGlhbG9nUmVmPGFueT4gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuRGlhbG9ncy5maW5kKGRpYWxvZyA9PiBkaWFsb2cuaWQgPT09IGlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaERpYWxvZ0NvbnRlbnQ8VD4oXG4gICAgICAgIGNvbXBvbmVudE9yVGVtcGxhdGVSZWY6IENvbXBvbmVudFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPixcbiAgICAgICAgZGlhbG9nQ29udGFpbmVyOiBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgICAgIGNvbmZpZzogT3dsRGlhbG9nQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IG5ldyBPd2xEaWFsb2dSZWY8VD4oXG4gICAgICAgICAgICBvdmVybGF5UmVmLFxuICAgICAgICAgICAgZGlhbG9nQ29udGFpbmVyLFxuICAgICAgICAgICAgY29uZmlnLmlkLFxuICAgICAgICAgICAgdGhpcy5sb2NhdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChjb25maWcuaGFzQmFja2Ryb3ApIHtcbiAgICAgICAgICAgIG92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFkaWFsb2dSZWYuZGlzYWJsZUNsb3NlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ1JlZi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaW5qZWN0b3IgPSB0aGlzLmNyZWF0ZUluamVjdG9yPFQ+KFxuICAgICAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgICAgICBkaWFsb2dSZWYsXG4gICAgICAgICAgICAgICAgZGlhbG9nQ29udGFpbmVyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgY29udGVudFJlZiA9IGRpYWxvZ0NvbnRhaW5lci5hdHRhY2hDb21wb25lbnRQb3J0YWwoXG4gICAgICAgICAgICAgICAgbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnRPclRlbXBsYXRlUmVmLCB1bmRlZmluZWQsIGluamVjdG9yKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZSA9IGNvbnRlbnRSZWYuaW5zdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBkaWFsb2dSZWZcbiAgICAgICAgICAgIC51cGRhdGVTaXplKGNvbmZpZy53aWR0aCwgY29uZmlnLmhlaWdodClcbiAgICAgICAgICAgIC51cGRhdGVQb3NpdGlvbihjb25maWcucG9zaXRpb24pO1xuXG4gICAgICAgIHJldHVybiBkaWFsb2dSZWY7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVJbmplY3RvcjxUPihcbiAgICAgICAgY29uZmlnOiBPd2xEaWFsb2dDb25maWcsXG4gICAgICAgIGRpYWxvZ1JlZjogT3dsRGlhbG9nUmVmPFQ+LFxuICAgICAgICBkaWFsb2dDb250YWluZXI6IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudFxuICAgICkge1xuICAgICAgICBjb25zdCB1c2VySW5qZWN0b3IgPVxuICAgICAgICAgICAgY29uZmlnICYmXG4gICAgICAgICAgICBjb25maWcudmlld0NvbnRhaW5lclJlZiAmJlxuICAgICAgICAgICAgY29uZmlnLnZpZXdDb250YWluZXJSZWYuaW5qZWN0b3I7XG4gICAgICAgIGNvbnN0IGluamVjdGlvblRva2VucyA9IG5ldyBXZWFrTWFwKCk7XG5cbiAgICAgICAgaW5qZWN0aW9uVG9rZW5zLnNldChPd2xEaWFsb2dSZWYsIGRpYWxvZ1JlZik7XG4gICAgICAgIGluamVjdGlvblRva2Vucy5zZXQoT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LCBkaWFsb2dDb250YWluZXIpO1xuICAgICAgICBpbmplY3Rpb25Ub2tlbnMuc2V0KE9XTF9ESUFMT0dfREFUQSwgY29uZmlnLmRhdGEpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUG9ydGFsSW5qZWN0b3IoXG4gICAgICAgICAgICB1c2VySW5qZWN0b3IgfHwgdGhpcy5pbmplY3RvcixcbiAgICAgICAgICAgIGluamVjdGlvblRva2Vuc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlT3ZlcmxheShjb25maWc6IE93bERpYWxvZ0NvbmZpZyk6IE92ZXJsYXlSZWYge1xuICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gdGhpcy5nZXRPdmVybGF5Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoRGlhbG9nQ29udGFpbmVyKFxuICAgICAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmLFxuICAgICAgICBjb25maWc6IE93bERpYWxvZ0NvbmZpZ1xuICAgICk6IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoXG4gICAgICAgICAgICBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgICAgICBjb25maWcudmlld0NvbnRhaW5lclJlZlxuICAgICAgICApO1xuICAgICAgICBjb25zdCBjb250YWluZXJSZWY6IENvbXBvbmVudFJlZjxPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQ+ID0gb3ZlcmxheVJlZi5hdHRhY2goXG4gICAgICAgICAgICBjb250YWluZXJQb3J0YWxcbiAgICAgICAgKTtcbiAgICAgICAgY29udGFpbmVyUmVmLmluc3RhbmNlLnNldENvbmZpZyhjb25maWcpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXJSZWYuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5Q29uZmlnKGRpYWxvZ0NvbmZpZzogT3dsRGlhbG9nQ29uZmlnKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKCksXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTpcbiAgICAgICAgICAgICAgICBkaWFsb2dDb25maWcuc2Nyb2xsU3RyYXRlZ3kgfHwgdGhpcy5zY3JvbGxTdHJhdGVneSgpLFxuICAgICAgICAgICAgcGFuZWxDbGFzczogZGlhbG9nQ29uZmlnLnBhbmVDbGFzcyxcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiBkaWFsb2dDb25maWcuaGFzQmFja2Ryb3AsXG4gICAgICAgICAgICBtaW5XaWR0aDogZGlhbG9nQ29uZmlnLm1pbldpZHRoLFxuICAgICAgICAgICAgbWluSGVpZ2h0OiBkaWFsb2dDb25maWcubWluSGVpZ2h0LFxuICAgICAgICAgICAgbWF4V2lkdGg6IGRpYWxvZ0NvbmZpZy5tYXhXaWR0aCxcbiAgICAgICAgICAgIG1heEhlaWdodDogZGlhbG9nQ29uZmlnLm1heEhlaWdodFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MpIHtcbiAgICAgICAgICAgIHN0YXRlLmJhY2tkcm9wQ2xhc3MgPSBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZU9wZW5EaWFsb2coZGlhbG9nUmVmOiBPd2xEaWFsb2dSZWY8YW55Pik6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX29wZW5EaWFsb2dzQXRUaGlzTGV2ZWwuaW5kZXhPZihkaWFsb2dSZWYpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5EaWFsb2dzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAvLyBJZiBhbGwgdGhlIGRpYWxvZ3Mgd2VyZSBjbG9zZWQsIHJlbW92ZS9yZXN0b3JlIHRoZSBgYXJpYS1oaWRkZW5gXG4gICAgICAgICAgICAvLyB0byBhIHRoZSBzaWJsaW5ncyBhbmQgZW1pdCB0byB0aGUgYGFmdGVyQWxsQ2xvc2VkYCBzdHJlYW0uXG4gICAgICAgICAgICBpZiAoIXRoaXMub3BlbkRpYWxvZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmlhSGlkZGVuRWxlbWVudHMuZm9yRWFjaCgocHJldmlvdXNWYWx1ZSwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgcHJldmlvdXNWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hcmlhSGlkZGVuRWxlbWVudHMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlckFsbENsb3NlZC5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyBhbGwgb2YgdGhlIGNvbnRlbnQgdGhhdCBpc24ndCBhbiBvdmVybGF5IGZyb20gYXNzaXN0aXZlIHRlY2hub2xvZ3kuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWRlTm9uRGlhbG9nQ29udGVudEZyb21Bc3Npc3RpdmVUZWNobm9sb2d5KCkge1xuICAgICAgICBjb25zdCBvdmVybGF5Q29udGFpbmVyID0gdGhpcy5vdmVybGF5Q29udGFpbmVyLmdldENvbnRhaW5lckVsZW1lbnQoKTtcblxuICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgb3ZlcmxheSBjb250YWluZXIgaXMgYXR0YWNoZWQgdG8gdGhlIERPTS5cbiAgICAgICAgaWYgKG92ZXJsYXlDb250YWluZXIucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3Qgc2libGluZ3MgPSBvdmVybGF5Q29udGFpbmVyLnBhcmVudEVsZW1lbnQuY2hpbGRyZW47XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzaWJsaW5ncy5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmcgPSBzaWJsaW5nc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgc2libGluZyAhPT0gb3ZlcmxheUNvbnRhaW5lciAmJlxuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLm5vZGVOYW1lICE9PSAnU0NSSVBUJyAmJlxuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLm5vZGVOYW1lICE9PSAnU1RZTEUnICYmXG4gICAgICAgICAgICAgICAgICAgICFzaWJsaW5nLmhhc0F0dHJpYnV0ZSgnYXJpYS1saXZlJylcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcmlhSGlkZGVuRWxlbWVudHMuc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmcuZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHNpYmxpbmcuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEFwcGxpZXMgZGVmYXVsdCBvcHRpb25zIHRvIHRoZSBkaWFsb2cgY29uZmlnLlxuICogQHBhcmFtIGNvbmZpZyBDb25maWcgdG8gYmUgbW9kaWZpZWQuXG4gKiBAcGFyYW0gZGVmYXVsdE9wdGlvbnMgRGVmYXVsdCBjb25maWcgc2V0dGluZ1xuICogQHJldHVybnMgVGhlIG5ldyBjb25maWd1cmF0aW9uIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYXBwbHlDb25maWdEZWZhdWx0cyhcbiAgICBjb25maWc/OiBPd2xEaWFsb2dDb25maWcsXG4gICAgZGVmYXVsdE9wdGlvbnM/OiBPd2xEaWFsb2dDb25maWdcbik6IE93bERpYWxvZ0NvbmZpZyB7XG4gICAgcmV0dXJuIGV4dGVuZE9iamVjdChuZXcgT3dsRGlhbG9nQ29uZmlnKCksIGNvbmZpZywgZGVmYXVsdE9wdGlvbnMpO1xufVxuIl19