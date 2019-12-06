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
export var OWL_DIALOG_DATA = new InjectionToken('OwlDialogData');
/**
 * Injection token that determines the scroll handling while the dialog is open.
 * @type {?}
 */
export var OWL_DIALOG_SCROLL_STRATEGY = new InjectionToken('owl-dialog-scroll-strategy');
/**
 * @param {?} overlay
 * @return {?}
 */
export function OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.block(); });
}
/**
 * \@docs-private
 * @type {?}
 */
export var OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/**
 * Injection token that can be used to specify default dialog options.
 * @type {?}
 */
export var OWL_DIALOG_DEFAULT_OPTIONS = new InjectionToken('owl-dialog-default-options');
var OwlDialogService = /** @class */ (function () {
    function OwlDialogService(overlay, injector, location, scrollStrategy, defaultOptions, parentDialog, overlayContainer) {
        var _this = this;
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
        function () {
            return _this._openDialogsAtThisLevel.length
                ? _this._afterAllClosed
                : _this._afterAllClosed.pipe(startWith(undefined));
        }));
        this.scrollStrategy = scrollStrategy;
        if (!parentDialog && location) {
            location.subscribe((/**
             * @return {?}
             */
            function () { return _this.closeAll(); }));
        }
    }
    Object.defineProperty(OwlDialogService.prototype, "openDialogs", {
        /** Keeps track of the currently-open dialogs. */
        get: /**
         * Keeps track of the currently-open dialogs.
         * @return {?}
         */
        function () {
            return this.parentDialog
                ? this.parentDialog.openDialogs
                : this._openDialogsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDialogService.prototype, "afterOpen", {
        /** Stream that emits when a dialog has been opened. */
        get: /**
         * Stream that emits when a dialog has been opened.
         * @return {?}
         */
        function () {
            return this.parentDialog
                ? this.parentDialog.afterOpen
                : this._afterOpenAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDialogService.prototype, "_afterAllClosed", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var parent = this.parentDialog;
            return parent
                ? parent._afterAllClosed
                : this._afterAllClosedAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    OwlDialogService.prototype.open = /**
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    function (componentOrTemplateRef, config) {
        var _this = this;
        config = applyConfigDefaults(config, this.defaultOptions);
        if (config.id && this.getDialogById(config.id)) {
            throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
        }
        /** @type {?} */
        var overlayRef = this.createOverlay(config);
        /** @type {?} */
        var dialogContainer = this.attachDialogContainer(overlayRef, config);
        /** @type {?} */
        var dialogRef = this.attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
        if (!this.openDialogs.length) {
            this.hideNonDialogContentFromAssistiveTechnology();
        }
        this.openDialogs.push(dialogRef);
        dialogRef
            .afterClosed()
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.removeOpenDialog(dialogRef); }));
        this.afterOpen.next(dialogRef);
        return dialogRef;
    };
    /**
     * Closes all of the currently-open dialogs.
     */
    /**
     * Closes all of the currently-open dialogs.
     * @return {?}
     */
    OwlDialogService.prototype.closeAll = /**
     * Closes all of the currently-open dialogs.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i = this.openDialogs.length;
        while (i--) {
            this.openDialogs[i].close();
        }
    };
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     */
    /**
     * Finds an open dialog by its id.
     * @param {?} id ID to use when looking up the dialog.
     * @return {?}
     */
    OwlDialogService.prototype.getDialogById = /**
     * Finds an open dialog by its id.
     * @param {?} id ID to use when looking up the dialog.
     * @return {?}
     */
    function (id) {
        return this.openDialogs.find((/**
         * @param {?} dialog
         * @return {?}
         */
        function (dialog) { return dialog.id === id; }));
    };
    /**
     * @private
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?} dialogContainer
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    OwlDialogService.prototype.attachDialogContent = /**
     * @private
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?} dialogContainer
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
        /** @type {?} */
        var dialogRef = new OwlDialogRef(overlayRef, dialogContainer, config.id, this.location);
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe((/**
             * @return {?}
             */
            function () {
                if (!dialogRef.disableClose) {
                    dialogRef.close();
                }
            }));
        }
        if (componentOrTemplateRef instanceof TemplateRef) {
        }
        else {
            /** @type {?} */
            var injector = this.createInjector(config, dialogRef, dialogContainer);
            /** @type {?} */
            var contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
            dialogRef.componentInstance = contentRef.instance;
        }
        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);
        return dialogRef;
    };
    /**
     * @private
     * @template T
     * @param {?} config
     * @param {?} dialogRef
     * @param {?} dialogContainer
     * @return {?}
     */
    OwlDialogService.prototype.createInjector = /**
     * @private
     * @template T
     * @param {?} config
     * @param {?} dialogRef
     * @param {?} dialogContainer
     * @return {?}
     */
    function (config, dialogRef, dialogContainer) {
        /** @type {?} */
        var userInjector = config &&
            config.viewContainerRef &&
            config.viewContainerRef.injector;
        /** @type {?} */
        var injectionTokens = new WeakMap();
        injectionTokens.set(OwlDialogRef, dialogRef);
        injectionTokens.set(OwlDialogContainerComponent, dialogContainer);
        injectionTokens.set(OWL_DIALOG_DATA, config.data);
        return new PortalInjector(userInjector || this.injector, injectionTokens);
    };
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    OwlDialogService.prototype.createOverlay = /**
     * @private
     * @param {?} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    };
    /**
     * @private
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    OwlDialogService.prototype.attachDialogContainer = /**
     * @private
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    function (overlayRef, config) {
        /** @type {?} */
        var containerPortal = new ComponentPortal(OwlDialogContainerComponent, config.viewContainerRef);
        /** @type {?} */
        var containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.setConfig(config);
        return containerRef.instance;
    };
    /**
     * @private
     * @param {?} dialogConfig
     * @return {?}
     */
    OwlDialogService.prototype.getOverlayConfig = /**
     * @private
     * @param {?} dialogConfig
     * @return {?}
     */
    function (dialogConfig) {
        /** @type {?} */
        var state = new OverlayConfig({
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
    };
    /**
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    OwlDialogService.prototype.removeOpenDialog = /**
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    function (dialogRef) {
        /** @type {?} */
        var index = this._openDialogsAtThisLevel.indexOf(dialogRef);
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
                function (previousValue, element) {
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
    };
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     */
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     * @private
     * @return {?}
     */
    OwlDialogService.prototype.hideNonDialogContentFromAssistiveTechnology = /**
     * Hides all of the content that isn't an overlay from assistive technology.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var overlayContainer = this.overlayContainer.getContainerElement();
        // Ensure that the overlay container is attached to the DOM.
        if (overlayContainer.parentElement) {
            /** @type {?} */
            var siblings = overlayContainer.parentElement.children;
            for (var i = siblings.length - 1; i > -1; i--) {
                /** @type {?} */
                var sibling = siblings[i];
                if (sibling !== overlayContainer &&
                    sibling.nodeName !== 'SCRIPT' &&
                    sibling.nodeName !== 'STYLE' &&
                    !sibling.hasAttribute('aria-live')) {
                    this.ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }
        }
    };
    OwlDialogService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OwlDialogService.ctorParameters = function () { return [
        { type: Overlay },
        { type: Injector },
        { type: Location, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Inject, args: [OWL_DIALOG_SCROLL_STRATEGY,] }] },
        { type: OwlDialogConfig, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DIALOG_DEFAULT_OPTIONS,] }] },
        { type: OwlDialogService, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: OverlayContainer }
    ]; };
    return OwlDialogService;
}());
export { OwlDialogService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kaWFsb2cvZGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFFSCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUNILE9BQU8sRUFDUCxhQUFhLEVBQ2IsZ0JBQWdCLEVBR25CLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNILGVBQWUsRUFFZixjQUFjLEVBQ2pCLE1BQU0scUJBQXFCLENBQUM7O0FBRTdCLE1BQU0sS0FBTyxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQU0sZUFBZSxDQUFDOzs7OztBQUt2RSxNQUFNLEtBQU8sMEJBQTBCLEdBQUcsSUFBSSxjQUFjLENBRTFELDRCQUE0QixDQUFDOzs7OztBQUUvQixNQUFNLFVBQVUsMkNBQTJDLENBQ3ZELE9BQWdCO0lBRWhCOzs7SUFBTyxjQUFNLE9BQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUFoQyxD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LHdDQUVzQzs7Ozs7SUFDdEMsNENBQTBDOzs7Ozs7OztBQTZObEQsU0FBUyxtQkFBbUIsQ0FDeEIsTUFBd0IsRUFDeEIsY0FBZ0M7SUFFaEMsT0FBTyxZQUFZLENBQUMsSUFBSSxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDdkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGlhbG9nLnNlcnZpY2VcbiAqL1xuXG5pbXBvcnQge1xuICAgIENvbXBvbmVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0YWJsZSxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbmplY3RvcixcbiAgICBPcHRpb25hbCxcbiAgICBTa2lwU2VsZixcbiAgICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE93bERpYWxvZ0NvbmZpZyB9IGZyb20gJy4vZGlhbG9nLWNvbmZpZy5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEaWFsb2dSZWYgfSBmcm9tICcuL2RpYWxvZy1yZWYuY2xhc3MnO1xuaW1wb3J0IHsgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBleHRlbmRPYmplY3QgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBkZWZlciwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgICBPdmVybGF5LFxuICAgIE92ZXJsYXlDb25maWcsXG4gICAgT3ZlcmxheUNvbnRhaW5lcixcbiAgICBPdmVybGF5UmVmLFxuICAgIFNjcm9sbFN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gICAgQ29tcG9uZW50UG9ydGFsLFxuICAgIENvbXBvbmVudFR5cGUsXG4gICAgUG9ydGFsSW5qZWN0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5cbmV4cG9ydCBjb25zdCBPV0xfRElBTE9HX0RBVEEgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignT3dsRGlhbG9nRGF0YScpO1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0aGF0IGRldGVybWluZXMgdGhlIHNjcm9sbCBoYW5kbGluZyB3aGlsZSB0aGUgZGlhbG9nIGlzIG9wZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxcbiAgICAoKSA9PiBTY3JvbGxTdHJhdGVneVxuPignb3dsLWRpYWxvZy1zY3JvbGwtc3RyYXRlZ3knKTtcblxuZXhwb3J0IGZ1bmN0aW9uIE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUlkoXG4gICAgb3ZlcmxheTogT3ZlcmxheVxuKTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWSxcbiAgICBkZXBzOiBbT3ZlcmxheV0sXG4gICAgdXNlRmFjdG9yeTogT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWVxufTtcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IGRlZmF1bHQgZGlhbG9nIG9wdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCBPV0xfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxPd2xEaWFsb2dDb25maWc+KFxuICAgICdvd2wtZGlhbG9nLWRlZmF1bHQtb3B0aW9ucydcbik7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPd2xEaWFsb2dTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGFyaWFIaWRkZW5FbGVtZW50cyA9IG5ldyBNYXA8RWxlbWVudCwgc3RyaW5nIHwgbnVsbD4oKTtcblxuICAgIHByaXZhdGUgX29wZW5EaWFsb2dzQXRUaGlzTGV2ZWw6IE93bERpYWxvZ1JlZjxhbnk+W10gPSBbXTtcbiAgICBwcml2YXRlIF9hZnRlck9wZW5BdFRoaXNMZXZlbCA9IG5ldyBTdWJqZWN0PE93bERpYWxvZ1JlZjxhbnk+PigpO1xuICAgIHByaXZhdGUgX2FmdGVyQWxsQ2xvc2VkQXRUaGlzTGV2ZWwgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50bHktb3BlbiBkaWFsb2dzLiAqL1xuICAgIGdldCBvcGVuRGlhbG9ncygpOiBPd2xEaWFsb2dSZWY8YW55PltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50RGlhbG9nXG4gICAgICAgICAgICA/IHRoaXMucGFyZW50RGlhbG9nLm9wZW5EaWFsb2dzXG4gICAgICAgICAgICA6IHRoaXMuX29wZW5EaWFsb2dzQXRUaGlzTGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gYSBkaWFsb2cgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICAgIGdldCBhZnRlck9wZW4oKTogU3ViamVjdDxPd2xEaWFsb2dSZWY8YW55Pj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnREaWFsb2dcbiAgICAgICAgICAgID8gdGhpcy5wYXJlbnREaWFsb2cuYWZ0ZXJPcGVuXG4gICAgICAgICAgICA6IHRoaXMuX2FmdGVyT3BlbkF0VGhpc0xldmVsO1xuICAgIH1cblxuICAgIGdldCBfYWZ0ZXJBbGxDbG9zZWQoKTogYW55IHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnREaWFsb2c7XG4gICAgICAgIHJldHVybiBwYXJlbnRcbiAgICAgICAgICAgID8gcGFyZW50Ll9hZnRlckFsbENsb3NlZFxuICAgICAgICAgICAgOiB0aGlzLl9hZnRlckFsbENsb3NlZEF0VGhpc0xldmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gYWxsIG9wZW4gZGlhbG9nIGhhdmUgZmluaXNoZWQgY2xvc2luZy5cbiAgICAgKiBXaWxsIGVtaXQgb24gc3Vic2NyaWJlIGlmIHRoZXJlIGFyZSBubyBvcGVuIGRpYWxvZ3MgdG8gYmVnaW4gd2l0aC5cbiAgICAgKi9cblxuICAgIGFmdGVyQWxsQ2xvc2VkOiBPYnNlcnZhYmxlPHt9PiA9IGRlZmVyKCgpID0+XG4gICAgICAgIHRoaXMuX29wZW5EaWFsb2dzQXRUaGlzTGV2ZWwubGVuZ3RoXG4gICAgICAgICAgICA/IHRoaXMuX2FmdGVyQWxsQ2xvc2VkXG4gICAgICAgICAgICA6IHRoaXMuX2FmdGVyQWxsQ2xvc2VkLnBpcGUoc3RhcnRXaXRoKHVuZGVmaW5lZCkpXG4gICAgKTtcblxuICAgIHByaXZhdGUgc2Nyb2xsU3RyYXRlZ3k6ICgpID0+IFNjcm9sbFN0cmF0ZWd5O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgICAgICBASW5qZWN0KE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZKSBzY3JvbGxTdHJhdGVneTogYW55LFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBASW5qZWN0KE9XTF9ESUFMT0dfREVGQVVMVF9PUFRJT05TKVxuICAgICAgICBwcml2YXRlIGRlZmF1bHRPcHRpb25zOiBPd2xEaWFsb2dDb25maWcsXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBTa2lwU2VsZigpXG4gICAgICAgIHByaXZhdGUgcGFyZW50RGlhbG9nOiBPd2xEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG92ZXJsYXlDb250YWluZXI6IE92ZXJsYXlDb250YWluZXJcbiAgICApIHtcbiAgICAgICAgdGhpcy5zY3JvbGxTdHJhdGVneSA9IHNjcm9sbFN0cmF0ZWd5O1xuICAgICAgICBpZiAoIXBhcmVudERpYWxvZyAmJiBsb2NhdGlvbikge1xuICAgICAgICAgICAgbG9jYXRpb24uc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2VBbGwoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbjxUPihcbiAgICAgICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxuICAgICAgICBjb25maWc/OiBPd2xEaWFsb2dDb25maWdcbiAgICApOiBPd2xEaWFsb2dSZWY8YW55PiB7XG4gICAgICAgIGNvbmZpZyA9IGFwcGx5Q29uZmlnRGVmYXVsdHMoY29uZmlnLCB0aGlzLmRlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICBpZiAoY29uZmlnLmlkICYmIHRoaXMuZ2V0RGlhbG9nQnlJZChjb25maWcuaWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgRGlhbG9nIHdpdGggaWQgXCIke2NvbmZpZy5pZH1cIiBleGlzdHMgYWxyZWFkeS4gVGhlIGRpYWxvZyBpZCBtdXN0IGJlIHVuaXF1ZS5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheShjb25maWcpO1xuICAgICAgICBjb25zdCBkaWFsb2dDb250YWluZXIgPSB0aGlzLmF0dGFjaERpYWxvZ0NvbnRhaW5lcihvdmVybGF5UmVmLCBjb25maWcpO1xuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmF0dGFjaERpYWxvZ0NvbnRlbnQ8VD4oXG4gICAgICAgICAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmLFxuICAgICAgICAgICAgZGlhbG9nQ29udGFpbmVyLFxuICAgICAgICAgICAgb3ZlcmxheVJlZixcbiAgICAgICAgICAgIGNvbmZpZ1xuICAgICAgICApO1xuXG4gICAgICAgIGlmICghdGhpcy5vcGVuRGlhbG9ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU5vbkRpYWxvZ0NvbnRlbnRGcm9tQXNzaXN0aXZlVGVjaG5vbG9neSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcGVuRGlhbG9ncy5wdXNoKGRpYWxvZ1JlZik7XG4gICAgICAgIGRpYWxvZ1JlZlxuICAgICAgICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW1vdmVPcGVuRGlhbG9nKGRpYWxvZ1JlZikpO1xuICAgICAgICB0aGlzLmFmdGVyT3Blbi5uZXh0KGRpYWxvZ1JlZik7XG4gICAgICAgIHJldHVybiBkaWFsb2dSZWY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIGFsbCBvZiB0aGUgY3VycmVudGx5LW9wZW4gZGlhbG9ncy5cbiAgICAgKi9cbiAgICBwdWJsaWMgY2xvc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIGxldCBpID0gdGhpcy5vcGVuRGlhbG9ncy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuRGlhbG9nc1tpXS5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgYW4gb3BlbiBkaWFsb2cgYnkgaXRzIGlkLlxuICAgICAqIEBwYXJhbSBpZCBJRCB0byB1c2Ugd2hlbiBsb29raW5nIHVwIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgcHVibGljIGdldERpYWxvZ0J5SWQoaWQ6IHN0cmluZyk6IE93bERpYWxvZ1JlZjxhbnk+IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbkRpYWxvZ3MuZmluZChkaWFsb2cgPT4gZGlhbG9nLmlkID09PSBpZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdHRhY2hEaWFsb2dDb250ZW50PFQ+KFxuICAgICAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sXG4gICAgICAgIGRpYWxvZ0NvbnRhaW5lcjogT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmLFxuICAgICAgICBjb25maWc6IE93bERpYWxvZ0NvbmZpZ1xuICAgICkge1xuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSBuZXcgT3dsRGlhbG9nUmVmPFQ+KFxuICAgICAgICAgICAgb3ZlcmxheVJlZixcbiAgICAgICAgICAgIGRpYWxvZ0NvbnRhaW5lcixcbiAgICAgICAgICAgIGNvbmZpZy5pZCxcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoY29uZmlnLmhhc0JhY2tkcm9wKSB7XG4gICAgICAgICAgICBvdmVybGF5UmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZGlhbG9nUmVmLmRpc2FibGVDbG9zZSkge1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dSZWYuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21wb25lbnRPclRlbXBsYXRlUmVmIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGluamVjdG9yID0gdGhpcy5jcmVhdGVJbmplY3RvcjxUPihcbiAgICAgICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICAgICAgZGlhbG9nUmVmLFxuICAgICAgICAgICAgICAgIGRpYWxvZ0NvbnRhaW5lclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBkaWFsb2dDb250YWluZXIuYXR0YWNoQ29tcG9uZW50UG9ydGFsKFxuICAgICAgICAgICAgICAgIG5ldyBDb21wb25lbnRQb3J0YWwoY29tcG9uZW50T3JUZW1wbGF0ZVJlZiwgdW5kZWZpbmVkLCBpbmplY3RvcilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UgPSBjb250ZW50UmVmLmluc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlhbG9nUmVmXG4gICAgICAgICAgICAudXBkYXRlU2l6ZShjb25maWcud2lkdGgsIGNvbmZpZy5oZWlnaHQpXG4gICAgICAgICAgICAudXBkYXRlUG9zaXRpb24oY29uZmlnLnBvc2l0aW9uKTtcblxuICAgICAgICByZXR1cm4gZGlhbG9nUmVmO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlSW5qZWN0b3I8VD4oXG4gICAgICAgIGNvbmZpZzogT3dsRGlhbG9nQ29uZmlnLFxuICAgICAgICBkaWFsb2dSZWY6IE93bERpYWxvZ1JlZjxUPixcbiAgICAgICAgZGlhbG9nQ29udGFpbmVyOiBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnRcbiAgICApIHtcbiAgICAgICAgY29uc3QgdXNlckluamVjdG9yID1cbiAgICAgICAgICAgIGNvbmZpZyAmJlxuICAgICAgICAgICAgY29uZmlnLnZpZXdDb250YWluZXJSZWYgJiZcbiAgICAgICAgICAgIGNvbmZpZy52aWV3Q29udGFpbmVyUmVmLmluamVjdG9yO1xuICAgICAgICBjb25zdCBpbmplY3Rpb25Ub2tlbnMgPSBuZXcgV2Vha01hcCgpO1xuXG4gICAgICAgIGluamVjdGlvblRva2Vucy5zZXQoT3dsRGlhbG9nUmVmLCBkaWFsb2dSZWYpO1xuICAgICAgICBpbmplY3Rpb25Ub2tlbnMuc2V0KE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCwgZGlhbG9nQ29udGFpbmVyKTtcbiAgICAgICAgaW5qZWN0aW9uVG9rZW5zLnNldChPV0xfRElBTE9HX0RBVEEsIGNvbmZpZy5kYXRhKTtcblxuICAgICAgICByZXR1cm4gbmV3IFBvcnRhbEluamVjdG9yKFxuICAgICAgICAgICAgdXNlckluamVjdG9yIHx8IHRoaXMuaW5qZWN0b3IsXG4gICAgICAgICAgICBpbmplY3Rpb25Ub2tlbnNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU92ZXJsYXkoY29uZmlnOiBPd2xEaWFsb2dDb25maWcpOiBPdmVybGF5UmVmIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IHRoaXMuZ2V0T3ZlcmxheUNvbmZpZyhjb25maWcpO1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaERpYWxvZ0NvbnRhaW5lcihcbiAgICAgICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICAgICAgY29uZmlnOiBPd2xEaWFsb2dDb25maWdcbiAgICApOiBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQge1xuICAgICAgICBjb25zdCBjb250YWluZXJQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKFxuICAgICAgICAgICAgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICAgICAgY29uZmlnLnZpZXdDb250YWluZXJSZWZcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVmOiBDb21wb25lbnRSZWY8T3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50PiA9IG92ZXJsYXlSZWYuYXR0YWNoKFxuICAgICAgICAgICAgY29udGFpbmVyUG9ydGFsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnRhaW5lclJlZi5pbnN0YW5jZS5zZXRDb25maWcoY29uZmlnKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyUmVmLmluc3RhbmNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3ZlcmxheUNvbmZpZyhkaWFsb2dDb25maWc6IE93bERpYWxvZ0NvbmZpZyk6IE92ZXJsYXlDb25maWcge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6XG4gICAgICAgICAgICAgICAgZGlhbG9nQ29uZmlnLnNjcm9sbFN0cmF0ZWd5IHx8IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6IGRpYWxvZ0NvbmZpZy5wYW5lQ2xhc3MsXG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogZGlhbG9nQ29uZmlnLmhhc0JhY2tkcm9wLFxuICAgICAgICAgICAgbWluV2lkdGg6IGRpYWxvZ0NvbmZpZy5taW5XaWR0aCxcbiAgICAgICAgICAgIG1pbkhlaWdodDogZGlhbG9nQ29uZmlnLm1pbkhlaWdodCxcbiAgICAgICAgICAgIG1heFdpZHRoOiBkaWFsb2dDb25maWcubWF4V2lkdGgsXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IGRpYWxvZ0NvbmZpZy5tYXhIZWlnaHRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRpYWxvZ0NvbmZpZy5iYWNrZHJvcENsYXNzKSB7XG4gICAgICAgICAgICBzdGF0ZS5iYWNrZHJvcENsYXNzID0gZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3M7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVPcGVuRGlhbG9nKGRpYWxvZ1JlZjogT3dsRGlhbG9nUmVmPGFueT4pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9vcGVuRGlhbG9nc0F0VGhpc0xldmVsLmluZGV4T2YoZGlhbG9nUmVmKTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuRGlhbG9ncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgLy8gSWYgYWxsIHRoZSBkaWFsb2dzIHdlcmUgY2xvc2VkLCByZW1vdmUvcmVzdG9yZSB0aGUgYGFyaWEtaGlkZGVuYFxuICAgICAgICAgICAgLy8gdG8gYSB0aGUgc2libGluZ3MgYW5kIGVtaXQgdG8gdGhlIGBhZnRlckFsbENsb3NlZGAgc3RyZWFtLlxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wZW5EaWFsb2dzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJpYUhpZGRlbkVsZW1lbnRzLmZvckVhY2goKHByZXZpb3VzVmFsdWUsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHByZXZpb3VzVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYXJpYUhpZGRlbkVsZW1lbnRzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJBbGxDbG9zZWQubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZXMgYWxsIG9mIHRoZSBjb250ZW50IHRoYXQgaXNuJ3QgYW4gb3ZlcmxheSBmcm9tIGFzc2lzdGl2ZSB0ZWNobm9sb2d5LlxuICAgICAqL1xuICAgIHByaXZhdGUgaGlkZU5vbkRpYWxvZ0NvbnRlbnRGcm9tQXNzaXN0aXZlVGVjaG5vbG9neSgpIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUNvbnRhaW5lciA9IHRoaXMub3ZlcmxheUNvbnRhaW5lci5nZXRDb250YWluZXJFbGVtZW50KCk7XG5cbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIG92ZXJsYXkgY29udGFpbmVyIGlzIGF0dGFjaGVkIHRvIHRoZSBET00uXG4gICAgICAgIGlmIChvdmVybGF5Q29udGFpbmVyLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdzID0gb3ZlcmxheUNvbnRhaW5lci5wYXJlbnRFbGVtZW50LmNoaWxkcmVuO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc2libGluZ3MubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaWJsaW5nID0gc2libGluZ3NbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHNpYmxpbmcgIT09IG92ZXJsYXlDb250YWluZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgc2libGluZy5ub2RlTmFtZSAhPT0gJ1NDUklQVCcgJiZcbiAgICAgICAgICAgICAgICAgICAgc2libGluZy5ub2RlTmFtZSAhPT0gJ1NUWUxFJyAmJlxuICAgICAgICAgICAgICAgICAgICAhc2libGluZy5oYXNBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJpYUhpZGRlbkVsZW1lbnRzLnNldChcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLmdldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBcHBsaWVzIGRlZmF1bHQgb3B0aW9ucyB0byB0aGUgZGlhbG9nIGNvbmZpZy5cbiAqIEBwYXJhbSBjb25maWcgQ29uZmlnIHRvIGJlIG1vZGlmaWVkLlxuICogQHBhcmFtIGRlZmF1bHRPcHRpb25zIERlZmF1bHQgY29uZmlnIHNldHRpbmdcbiAqIEByZXR1cm5zIFRoZSBuZXcgY29uZmlndXJhdGlvbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5Q29uZmlnRGVmYXVsdHMoXG4gICAgY29uZmlnPzogT3dsRGlhbG9nQ29uZmlnLFxuICAgIGRlZmF1bHRPcHRpb25zPzogT3dsRGlhbG9nQ29uZmlnXG4pOiBPd2xEaWFsb2dDb25maWcge1xuICAgIHJldHVybiBleHRlbmRPYmplY3QobmV3IE93bERpYWxvZ0NvbmZpZygpLCBjb25maWcsIGRlZmF1bHRPcHRpb25zKTtcbn1cbiJdfQ==