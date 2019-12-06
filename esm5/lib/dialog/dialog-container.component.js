/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * dialog-container.component
 */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Optional, ViewChild } from '@angular/core';
import { animate, animateChild, keyframes, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
/** @type {?} */
var zoomFadeIn = {
    opacity: 0,
    transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})'
};
/** @type {?} */
var zoomFadeInFrom = {
    opacity: 0,
    transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})',
    transformOrigin: '{{ ox }} {{ oy }}'
};
var OwlDialogContainerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OwlDialogContainerComponent, _super);
    function OwlDialogContainerComponent(changeDetector, elementRef, focusTrapFactory, document) {
        var _this = _super.call(this) || this;
        _this.changeDetector = changeDetector;
        _this.elementRef = elementRef;
        _this.focusTrapFactory = focusTrapFactory;
        _this.document = document;
        /**
         * ID of the element that should be considered as the dialog's label.
         */
        _this.ariaLabelledBy = null;
        /**
         * Emits when an animation state changes.
         */
        _this.animationStateChanged = new EventEmitter();
        _this.isAnimating = false;
        _this.state = 'enter';
        // for animation purpose
        _this.params = {
            x: '0px',
            y: '0px',
            ox: '50%',
            oy: '50%',
            scale: 0
        };
        // A variable to hold the focused element before the dialog was open.
        // This would help us to refocus back to element when the dialog was closed.
        _this.elementFocusedBeforeDialogWasOpened = null;
        return _this;
    }
    Object.defineProperty(OwlDialogContainerComponent.prototype, "config", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerTabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerRole", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config.role || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAriaLabelledby", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ariaLabelledBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAriaDescribedby", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config.ariaDescribedBy || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAnimation", {
        get: /**
         * @return {?}
         */
        function () {
            return { value: this.state, params: this.params };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDialogContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * Attach a ComponentPortal as content to this dialog container.
     */
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    OwlDialogContainerComponent.prototype.attachComponentPortal = /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach dialog content after content is already attached');
        }
        this.savePreviouslyFocusedElement();
        return this.portalOutlet.attachComponentPortal(portal);
    };
    /**
     * @template C
     * @param {?} portal
     * @return {?}
     */
    OwlDialogContainerComponent.prototype.attachTemplatePortal = /**
     * @template C
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        throw new Error('Method not implemented.');
    };
    /**
     * @param {?} config
     * @return {?}
     */
    OwlDialogContainerComponent.prototype.setConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this._config = config;
        if (config.event) {
            this.calculateZoomOrigin(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDialogContainerComponent.prototype.onAnimationStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.isAnimating = true;
        this.animationStateChanged.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDialogContainerComponent.prototype.onAnimationDone = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.toState === 'enter') {
            this.trapFocus();
        }
        else if (event.toState === 'exit') {
            this.restoreFocus();
        }
        this.animationStateChanged.emit(event);
        this.isAnimating = false;
    };
    /**
     * @return {?}
     */
    OwlDialogContainerComponent.prototype.startExitAnimation = /**
     * @return {?}
     */
    function () {
        this.state = 'exit';
        this.changeDetector.markForCheck();
    };
    /**
     * Calculate origin used in the `zoomFadeInFrom()`
     * for animation purpose
     */
    /**
     * Calculate origin used in the `zoomFadeInFrom()`
     * for animation purpose
     * @private
     * @param {?} event
     * @return {?}
     */
    OwlDialogContainerComponent.prototype.calculateZoomOrigin = /**
     * Calculate origin used in the `zoomFadeInFrom()`
     * for animation purpose
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!event) {
            return;
        }
        /** @type {?} */
        var clientX = event.clientX;
        /** @type {?} */
        var clientY = event.clientY;
        /** @type {?} */
        var wh = window.innerWidth / 2;
        /** @type {?} */
        var hh = window.innerHeight / 2;
        /** @type {?} */
        var x = clientX - wh;
        /** @type {?} */
        var y = clientY - hh;
        /** @type {?} */
        var ox = clientX / window.innerWidth;
        /** @type {?} */
        var oy = clientY / window.innerHeight;
        this.params.x = x + "px";
        this.params.y = y + "px";
        this.params.ox = ox * 100 + "%";
        this.params.oy = oy * 100 + "%";
        this.params.scale = 0;
        return;
    };
    /**
     * Save the focused element before dialog was open
     */
    /**
     * Save the focused element before dialog was open
     * @private
     * @return {?}
     */
    OwlDialogContainerComponent.prototype.savePreviouslyFocusedElement = /**
     * Save the focused element before dialog was open
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.document) {
            this.elementFocusedBeforeDialogWasOpened = (/** @type {?} */ (this.document
                .activeElement));
            Promise.resolve().then((/**
             * @return {?}
             */
            function () { return _this.elementRef.nativeElement.focus(); }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    OwlDialogContainerComponent.prototype.trapFocus = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.focusTrap) {
            this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
        }
        if (this._config.autoFocus) {
            this.focusTrap.focusInitialElementWhenReady();
        }
    };
    /**
     * @private
     * @return {?}
     */
    OwlDialogContainerComponent.prototype.restoreFocus = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var toFocus = this.elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    };
    OwlDialogContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-dialog-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>\n",
                    animations: [
                        trigger('slideModal', [
                            transition('void => enter', [
                                style(zoomFadeInFrom),
                                animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style('*')),
                                animate('150ms', keyframes([
                                    style({ transform: 'scale(1)', offset: 0 }),
                                    style({ transform: 'scale(1.05)', offset: 0.3 }),
                                    style({ transform: 'scale(.95)', offset: 0.8 }),
                                    style({ transform: 'scale(1)', offset: 1.0 })
                                ])),
                                animateChild()
                            ], {
                                params: {
                                    x: '0px',
                                    y: '0px',
                                    ox: '50%',
                                    oy: '50%',
                                    scale: 1
                                }
                            }),
                            transition('enter => exit', [animateChild(), animate(200, style(zoomFadeIn))], { params: { x: '0px', y: '0px', ox: '50%', oy: '50%' } })
                        ])
                    ],
                    host: {
                        '(@slideModal.start)': 'onAnimationStart($event)',
                        '(@slideModal.done)': 'onAnimationDone($event)',
                        '[class.owl-dialog-container]': 'owlDialogContainerClass',
                        '[attr.tabindex]': 'owlDialogContainerTabIndex',
                        '[attr.id]': 'owlDialogContainerId',
                        '[attr.role]': 'owlDialogContainerRole',
                        '[attr.aria-labelledby]': 'owlDialogContainerAriaLabelledby',
                        '[attr.aria-describedby]': 'owlDialogContainerAriaDescribedby',
                        '[@slideModal]': 'owlDialogContainerAnimation'
                    }
                }] }
    ];
    /** @nocollapse */
    OwlDialogContainerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: FocusTrapFactory },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    OwlDialogContainerComponent.propDecorators = {
        portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }]
    };
    return OwlDialogContainerComponent;
}(BasePortalOutlet));
export { OwlDialogContainerComponent };
if (false) {
    /** @type {?} */
    OwlDialogContainerComponent.prototype.portalOutlet;
    /**
     * The class that traps and manages focus within the dialog.
     * @type {?}
     * @private
     */
    OwlDialogContainerComponent.prototype.focusTrap;
    /**
     * ID of the element that should be considered as the dialog's label.
     * @type {?}
     */
    OwlDialogContainerComponent.prototype.ariaLabelledBy;
    /**
     * Emits when an animation state changes.
     * @type {?}
     */
    OwlDialogContainerComponent.prototype.animationStateChanged;
    /** @type {?} */
    OwlDialogContainerComponent.prototype.isAnimating;
    /**
     * @type {?}
     * @private
     */
    OwlDialogContainerComponent.prototype._config;
    /**
     * @type {?}
     * @private
     */
    OwlDialogContainerComponent.prototype.state;
    /**
     * @type {?}
     * @private
     */
    OwlDialogContainerComponent.prototype.params;
    /**
     * @type {?}
     * @private
     */
    OwlDialogContainerComponent.prototype.elementFocusedBeforeDialogWasOpened;
    /**
     * @type {?}
     * @private
     */
    OwlDialogContainerComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @private
     */
    OwlDialogContainerComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    OwlDialogContainerComponent.prototype.focusTrapFactory;
    /**
     * @type {?}
     * @private
     */
    OwlDialogContainerComponent.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kaWFsb2cvZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxPQUFPLEVBQ0gsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxVQUFVLEVBRVYsWUFBWSxFQUNaLE1BQU0sRUFFTixRQUFRLEVBQ1IsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxPQUFPLEVBQ1AsWUFBWSxFQUVaLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDVixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQWEsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQ0gsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFHbEIsTUFBTSxxQkFBcUIsQ0FBQzs7SUFHdkIsVUFBVSxHQUFHO0lBQ2YsT0FBTyxFQUFFLENBQUM7SUFDVixTQUFTLEVBQUUsMERBQTBEO0NBQ3hFOztJQUNLLGNBQWMsR0FBRztJQUNuQixPQUFPLEVBQUUsQ0FBQztJQUNWLFNBQVMsRUFBRSwwREFBMEQ7SUFDckUsZUFBZSxFQUFFLG1CQUFtQjtDQUN2QztBQUVEO0lBa0RpRCx1REFBZ0I7SUFnRTdELHFDQUNZLGNBQWlDLEVBQ2pDLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUdsQyxRQUFhO1FBTnpCLFlBUUksaUJBQU8sU0FDVjtRQVJXLG9CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNqQyxnQkFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBR2xDLGNBQVEsR0FBUixRQUFRLENBQUs7Ozs7UUE3RGxCLG9CQUFj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QUE4QixFQUFFLHlCQUF5Qjt3QkFDekQsaUJBQWlCLEVBQUUsNEJBQTRCO3dCQUMvQyxXQUFXLEVBQUUsc0JBQXNCO3dCQUNuQyxhQUFhLEVBQUUsd0JBQXdCO3dCQUN2Qyx3QkFBd0IsRUFBRSxrQ0FBa0M7d0JBQzVELHlCQUF5QixFQUFFLG1DQUFtQzt3QkFDOUQsZUFBZSxFQUFFLDZCQUE2QjtxQkFDakQ7aUJBQ0o7Ozs7Z0JBekZHLGlCQUFpQjtnQkFHakIsVUFBVTtnQkFrQk0sZ0JBQWdCO2dEQXlJM0IsUUFBUSxZQUNSLE1BQU0sU0FBQyxRQUFROzs7K0JBbkVuQixTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUE4TGhELGtDQUFDO0NBQUEsQUFsUEQsQ0FrRGlELGdCQUFnQixHQWdNaEU7U0FoTVksMkJBQTJCOzs7SUFFcEMsbURBQzhCOzs7Ozs7SUFHOUIsZ0RBQTZCOzs7OztJQUc3QixxREFBNEM7Ozs7O0lBRzVDLDREQUFrRTs7SUFFbEUsa0RBQTJCOzs7OztJQUUzQiw4Q0FBaUM7Ozs7O0lBS2pDLDRDQUFtRDs7Ozs7SUFHbkQsNkNBTUU7Ozs7O0lBSUYsMEVBQXVFOzs7OztJQStCbkUscURBQXlDOzs7OztJQUN6QyxpREFBOEI7Ozs7O0lBQzlCLHVEQUEwQzs7Ozs7SUFDMUMsK0NBRXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIGFuaW1hdGUsXG4gICAgYW5pbWF0ZUNoaWxkLFxuICAgIEFuaW1hdGlvbkV2ZW50LFxuICAgIGtleWZyYW1lcyxcbiAgICBzdHlsZSxcbiAgICB0cmFuc2l0aW9uLFxuICAgIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb2N1c1RyYXAsIEZvY3VzVHJhcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICAgIEJhc2VQb3J0YWxPdXRsZXQsXG4gICAgQ2RrUG9ydGFsT3V0bGV0LFxuICAgIENvbXBvbmVudFBvcnRhbCxcbiAgICBUZW1wbGF0ZVBvcnRhbFxufSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IE93bERpYWxvZ0NvbmZpZyB9IGZyb20gJy4vZGlhbG9nLWNvbmZpZy5jbGFzcyc7XG5cbmNvbnN0IHpvb21GYWRlSW4gPSB7XG4gICAgb3BhY2l0eTogMCxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKHt7IHggfX0pIHRyYW5zbGF0ZVkoe3sgeSB9fSkgc2NhbGUoe3tzY2FsZX19KSdcbn07XG5jb25zdCB6b29tRmFkZUluRnJvbSA9IHtcbiAgICBvcGFjaXR5OiAwLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoe3sgeCB9fSkgdHJhbnNsYXRlWSh7eyB5IH19KSBzY2FsZSh7e3NjYWxlfX0pJyxcbiAgICB0cmFuc2Zvcm1PcmlnaW46ICd7eyBveCB9fSB7eyBveSB9fSdcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnb3dsLWRpYWxvZy1jb250YWluZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3NsaWRlTW9kYWwnLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICd2b2lkID0+IGVudGVyJyxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHpvb21GYWRlSW5Gcm9tKSxcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZSgnMzAwbXMgY3ViaWMtYmV6aWVyKDAuMzUsIDAsIDAuMjUsIDEpJywgc3R5bGUoJyonKSksXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAnMTUwbXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDEpJywgb2Zmc2V0OiAwIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMS4wNSknLCBvZmZzZXQ6IDAuMyB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKC45NSknLCBvZmZzZXQ6IDAuOCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDEpJywgb2Zmc2V0OiAxLjAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVDaGlsZCgpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG94OiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG95OiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhbnNpdGlvbihcbiAgICAgICAgICAgICAgICAnZW50ZXIgPT4gZXhpdCcsXG4gICAgICAgICAgICAgICAgW2FuaW1hdGVDaGlsZCgpLCBhbmltYXRlKDIwMCwgc3R5bGUoem9vbUZhZGVJbikpXSxcbiAgICAgICAgICAgICAgICB7IHBhcmFtczogeyB4OiAnMHB4JywgeTogJzBweCcsIG94OiAnNTAlJywgb3k6ICc1MCUnIH0gfVxuICAgICAgICAgICAgKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICAnKEBzbGlkZU1vZGFsLnN0YXJ0KSc6ICdvbkFuaW1hdGlvblN0YXJ0KCRldmVudCknLFxuICAgICAgICAnKEBzbGlkZU1vZGFsLmRvbmUpJzogJ29uQW5pbWF0aW9uRG9uZSgkZXZlbnQpJyxcbiAgICAgICAgJ1tjbGFzcy5vd2wtZGlhbG9nLWNvbnRhaW5lcl0nOiAnb3dsRGlhbG9nQ29udGFpbmVyQ2xhc3MnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ293bERpYWxvZ0NvbnRhaW5lclRhYkluZGV4JyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdvd2xEaWFsb2dDb250YWluZXJJZCcsXG4gICAgICAgICdbYXR0ci5yb2xlXSc6ICdvd2xEaWFsb2dDb250YWluZXJSb2xlJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnb3dsRGlhbG9nQ29udGFpbmVyQXJpYUxhYmVsbGVkYnknLFxuICAgICAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnb3dsRGlhbG9nQ29udGFpbmVyQXJpYURlc2NyaWJlZGJ5JyxcbiAgICAgICAgJ1tAc2xpZGVNb2RhbF0nOiAnb3dsRGlhbG9nQ29udGFpbmVyQW5pbWF0aW9uJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZVBvcnRhbE91dGxldFxuICAgIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBwb3J0YWxPdXRsZXQ6IENka1BvcnRhbE91dGxldDtcblxuICAgIC8qKiBUaGUgY2xhc3MgdGhhdCB0cmFwcyBhbmQgbWFuYWdlcyBmb2N1cyB3aXRoaW4gdGhlIGRpYWxvZy4gKi9cbiAgICBwcml2YXRlIGZvY3VzVHJhcDogRm9jdXNUcmFwO1xuXG4gICAgLyoqIElEIG9mIHRoZSBlbGVtZW50IHRoYXQgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYXMgdGhlIGRpYWxvZydzIGxhYmVsLiAqL1xuICAgIHB1YmxpYyBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhbiBhbmltYXRpb24gc3RhdGUgY2hhbmdlcy4gKi9cbiAgICBwdWJsaWMgYW5pbWF0aW9uU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4oKTtcblxuICAgIHB1YmxpYyBpc0FuaW1hdGluZyA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBPd2xEaWFsb2dDb25maWc7XG4gICAgZ2V0IGNvbmZpZygpOiBPd2xEaWFsb2dDb25maWcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGU6ICd2b2lkJyB8ICdlbnRlcicgfCAnZXhpdCcgPSAnZW50ZXInO1xuXG4gICAgLy8gZm9yIGFuaW1hdGlvbiBwdXJwb3NlXG4gICAgcHJpdmF0ZSBwYXJhbXM6IGFueSA9IHtcbiAgICAgICAgeDogJzBweCcsXG4gICAgICAgIHk6ICcwcHgnLFxuICAgICAgICBveDogJzUwJScsXG4gICAgICAgIG95OiAnNTAlJyxcbiAgICAgICAgc2NhbGU6IDBcbiAgICB9O1xuXG4gICAgLy8gQSB2YXJpYWJsZSB0byBob2xkIHRoZSBmb2N1c2VkIGVsZW1lbnQgYmVmb3JlIHRoZSBkaWFsb2cgd2FzIG9wZW4uXG4gICAgLy8gVGhpcyB3b3VsZCBoZWxwIHVzIHRvIHJlZm9jdXMgYmFjayB0byBlbGVtZW50IHdoZW4gdGhlIGRpYWxvZyB3YXMgY2xvc2VkLlxuICAgIHByaXZhdGUgZWxlbWVudEZvY3VzZWRCZWZvcmVEaWFsb2dXYXNPcGVuZWQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgICBnZXQgb3dsRGlhbG9nQ29udGFpbmVyQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldCBvd2xEaWFsb2dDb250YWluZXJUYWJJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgZ2V0IG93bERpYWxvZ0NvbnRhaW5lcklkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaWQ7XG4gICAgfVxuXG4gICAgZ2V0IG93bERpYWxvZ0NvbnRhaW5lclJvbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yb2xlIHx8IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IG93bERpYWxvZ0NvbnRhaW5lckFyaWFMYWJlbGxlZGJ5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyaWFMYWJlbGxlZEJ5O1xuICAgIH1cblxuICAgIGdldCBvd2xEaWFsb2dDb250YWluZXJBcmlhRGVzY3JpYmVkYnkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5hcmlhRGVzY3JpYmVkQnkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgb3dsRGlhbG9nQ29udGFpbmVyQW5pbWF0aW9uKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiB0aGlzLnN0YXRlLCBwYXJhbXM6IHRoaXMucGFyYW1zIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgZm9jdXNUcmFwRmFjdG9yeTogRm9jdXNUcmFwRmFjdG9yeSxcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChET0NVTUVOVClcbiAgICAgICAgcHJpdmF0ZSBkb2N1bWVudDogYW55XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhIENvbXBvbmVudFBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgZGlhbG9nIGNvbnRhaW5lci5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KFxuICAgICAgICBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxUPlxuICAgICk6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgICAgIGlmICh0aGlzLnBvcnRhbE91dGxldC5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICAnQXR0ZW1wdGluZyB0byBhdHRhY2ggZGlhbG9nIGNvbnRlbnQgYWZ0ZXIgY29udGVudCBpcyBhbHJlYWR5IGF0dGFjaGVkJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2F2ZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5wb3J0YWxPdXRsZXQuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG4gICAgfVxuXG4gICAgcHVibGljIGF0dGFjaFRlbXBsYXRlUG9ydGFsPEM+KFxuICAgICAgICBwb3J0YWw6IFRlbXBsYXRlUG9ydGFsPEM+XG4gICAgKTogRW1iZWRkZWRWaWV3UmVmPEM+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDb25maWcoY29uZmlnOiBPd2xEaWFsb2dDb25maWcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuXG4gICAgICAgIGlmIChjb25maWcuZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlWm9vbU9yaWdpbihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAnZW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLnRyYXBGb2N1cygpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdleGl0Jykge1xuICAgICAgICAgICAgdGhpcy5yZXN0b3JlRm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0RXhpdEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdleGl0JztcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgb3JpZ2luIHVzZWQgaW4gdGhlIGB6b29tRmFkZUluRnJvbSgpYFxuICAgICAqIGZvciBhbmltYXRpb24gcHVycG9zZVxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlWm9vbU9yaWdpbihldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNsaWVudFggPSBldmVudC5jbGllbnRYO1xuICAgICAgICBjb25zdCBjbGllbnRZID0gZXZlbnQuY2xpZW50WTtcblxuICAgICAgICBjb25zdCB3aCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgaGggPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xuICAgICAgICBjb25zdCB4ID0gY2xpZW50WCAtIHdoO1xuICAgICAgICBjb25zdCB5ID0gY2xpZW50WSAtIGhoO1xuICAgICAgICBjb25zdCBveCA9IGNsaWVudFggLyB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY29uc3Qgb3kgPSBjbGllbnRZIC8gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIHRoaXMucGFyYW1zLnggPSBgJHt4fXB4YDtcbiAgICAgICAgdGhpcy5wYXJhbXMueSA9IGAke3l9cHhgO1xuICAgICAgICB0aGlzLnBhcmFtcy5veCA9IGAke294ICogMTAwfSVgO1xuICAgICAgICB0aGlzLnBhcmFtcy5veSA9IGAke295ICogMTAwfSVgO1xuICAgICAgICB0aGlzLnBhcmFtcy5zY2FsZSA9IDA7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmUgdGhlIGZvY3VzZWQgZWxlbWVudCBiZWZvcmUgZGlhbG9nIHdhcyBvcGVuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzYXZlUHJldmlvdXNseUZvY3VzZWRFbGVtZW50KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Rm9jdXNlZEJlZm9yZURpYWxvZ1dhc09wZW5lZCA9IHRoaXMuZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdHJhcEZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZm9jdXNUcmFwKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVHJhcCA9IHRoaXMuZm9jdXNUcmFwRmFjdG9yeS5jcmVhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmF1dG9Gb2N1cykge1xuICAgICAgICAgICAgdGhpcy5mb2N1c1RyYXAuZm9jdXNJbml0aWFsRWxlbWVudFdoZW5SZWFkeSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXN0b3JlRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRvRm9jdXMgPSB0aGlzLmVsZW1lbnRGb2N1c2VkQmVmb3JlRGlhbG9nV2FzT3BlbmVkO1xuXG4gICAgICAgIC8vIFdlIG5lZWQgdGhlIGV4dHJhIGNoZWNrLCBiZWNhdXNlIElFIGNhbiBzZXQgdGhlIGBhY3RpdmVFbGVtZW50YCB0byBudWxsIGluIHNvbWUgY2FzZXMuXG4gICAgICAgIGlmICh0b0ZvY3VzICYmIHR5cGVvZiB0b0ZvY3VzLmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0b0ZvY3VzLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mb2N1c1RyYXApIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUcmFwLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==