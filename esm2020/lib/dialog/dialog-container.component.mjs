import { Component, EventEmitter, Inject, Optional, ViewChild } from '@angular/core';
import { animate, animateChild, keyframes, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/cdk/portal";
const zoomFadeIn = {
    opacity: 0,
    transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})'
};
const zoomFadeInFrom = {
    opacity: 0,
    transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})',
    transformOrigin: '{{ ox }} {{ oy }}'
};
export class OwlDialogContainerComponent extends BasePortalOutlet {
    constructor(changeDetector, elementRef, focusTrapFactory, document) {
        super();
        this.changeDetector = changeDetector;
        this.elementRef = elementRef;
        this.focusTrapFactory = focusTrapFactory;
        this.document = document;
        /** ID of the element that should be considered as the dialog's label. */
        this.ariaLabelledBy = null;
        /** Emits when an animation state changes. */
        this.animationStateChanged = new EventEmitter();
        this.isAnimating = false;
        this.state = 'enter';
        // for animation purpose
        this.params = {
            x: '0px',
            y: '0px',
            ox: '50%',
            oy: '50%',
            scale: 0
        };
        // A variable to hold the focused element before the dialog was open.
        // This would help us to refocus back to element when the dialog was closed.
        this.elementFocusedBeforeDialogWasOpened = null;
    }
    get config() {
        return this._config;
    }
    get owlDialogContainerClass() {
        return true;
    }
    get owlDialogContainerTabIndex() {
        return -1;
    }
    get owlDialogContainerId() {
        return this._config.id;
    }
    get owlDialogContainerRole() {
        return this._config.role || null;
    }
    get owlDialogContainerAriaLabelledby() {
        return this.ariaLabelledBy;
    }
    get owlDialogContainerAriaDescribedby() {
        return this._config.ariaDescribedBy || null;
    }
    get owlDialogContainerAnimation() {
        return { value: this.state, params: this.params };
    }
    ngOnInit() { }
    /**
     * Attach a ComponentPortal as content to this dialog container.
     */
    attachComponentPortal(portal) {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach dialog content after content is already attached');
        }
        this.savePreviouslyFocusedElement();
        return this.portalOutlet.attachComponentPortal(portal);
    }
    attachTemplatePortal(portal) {
        throw new Error('Method not implemented.');
    }
    setConfig(config) {
        this._config = config;
        if (config.event) {
            this.calculateZoomOrigin(event);
        }
    }
    onAnimationStart(event) {
        this.isAnimating = true;
        this.animationStateChanged.emit(event);
    }
    onAnimationDone(event) {
        if (event.toState === 'enter') {
            this.trapFocus();
        }
        else if (event.toState === 'exit') {
            this.restoreFocus();
        }
        this.animationStateChanged.emit(event);
        this.isAnimating = false;
    }
    startExitAnimation() {
        this.state = 'exit';
        this.changeDetector.markForCheck();
    }
    /**
     * Calculate origin used in the `zoomFadeInFrom()`
     * for animation purpose
     */
    calculateZoomOrigin(event) {
        if (!event) {
            return;
        }
        const clientX = event.clientX;
        const clientY = event.clientY;
        const wh = window.innerWidth / 2;
        const hh = window.innerHeight / 2;
        const x = clientX - wh;
        const y = clientY - hh;
        const ox = clientX / window.innerWidth;
        const oy = clientY / window.innerHeight;
        this.params.x = `${x}px`;
        this.params.y = `${y}px`;
        this.params.ox = `${ox * 100}%`;
        this.params.oy = `${oy * 100}%`;
        this.params.scale = 0;
        return;
    }
    /**
     * Save the focused element before dialog was open
     */
    savePreviouslyFocusedElement() {
        if (this.document) {
            this.elementFocusedBeforeDialogWasOpened = this.document.activeElement;
            Promise.resolve().then(() => this.elementRef.nativeElement.focus());
        }
    }
    trapFocus() {
        if (!this.focusTrap) {
            this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
        }
        if (this._config.autoFocus) {
            this.focusTrap.focusInitialElementWhenReady();
        }
    }
    restoreFocus() {
        const toFocus = this.elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    }
}
OwlDialogContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDialogContainerComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1.FocusTrapFactory }, { token: DOCUMENT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OwlDialogContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.0", type: OwlDialogContainerComponent, selector: "owl-dialog-container", host: { listeners: { "@slideModal.start": "onAnimationStart($event)", "@slideModal.done": "onAnimationDone($event)" }, properties: { "class.owl-dialog-container": "owlDialogContainerClass", "attr.tabindex": "owlDialogContainerTabIndex", "attr.id": "owlDialogContainerId", "attr.role": "owlDialogContainerRole", "attr.aria-labelledby": "owlDialogContainerAriaLabelledby", "attr.aria-describedby": "owlDialogContainerAriaDescribedby", "@slideModal": "owlDialogContainerAnimation" } }, viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<ng-template cdkPortalOutlet></ng-template>\n", dependencies: [{ kind: "directive", type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [
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
            transition('enter => exit', [animateChild(), animate(200, style(zoomFadeIn))], {
                params: { x: '0px', y: '0px', ox: '50%', oy: '50%' }
            })
        ])
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDialogContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'owl-dialog-container', animations: [
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
                            transition('enter => exit', [animateChild(), animate(200, style(zoomFadeIn))], {
                                params: { x: '0px', y: '0px', ox: '50%', oy: '50%' }
                            })
                        ])
                    ], host: {
                        '(@slideModal.start)': 'onAnimationStart($event)',
                        '(@slideModal.done)': 'onAnimationDone($event)',
                        '[class.owl-dialog-container]': 'owlDialogContainerClass',
                        '[attr.tabindex]': 'owlDialogContainerTabIndex',
                        '[attr.id]': 'owlDialogContainerId',
                        '[attr.role]': 'owlDialogContainerRole',
                        '[attr.aria-labelledby]': 'owlDialogContainerAriaLabelledby',
                        '[attr.aria-describedby]': 'owlDialogContainerAriaDescribedby',
                        '[@slideModal]': 'owlDialogContainerAnimation'
                    }, template: "<ng-template cdkPortalOutlet></ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1.FocusTrapFactory }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kaWFsb2cvZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kaWFsb2cvZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUlULFlBQVksRUFDWixNQUFNLEVBRU4sUUFBUSxFQUNSLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsT0FBTyxFQUNQLFlBQVksRUFFWixTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixlQUFlLEVBR2hCLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFHN0IsTUFBTSxVQUFVLEdBQUc7SUFDakIsT0FBTyxFQUFFLENBQUM7SUFDVixTQUFTLEVBQUUsMERBQTBEO0NBQ3RFLENBQUM7QUFDRixNQUFNLGNBQWMsR0FBRztJQUNyQixPQUFPLEVBQUUsQ0FBQztJQUNWLFNBQVMsRUFBRSwwREFBMEQ7SUFDckUsZUFBZSxFQUFFLG1CQUFtQjtDQUNyQyxDQUFDO0FBa0RGLE1BQU0sT0FBTywyQkFBNEIsU0FBUSxnQkFBZ0I7SUErRC9ELFlBQ1UsY0FBaUMsRUFDakMsVUFBc0IsRUFDdEIsZ0JBQWtDLEVBR2xDLFFBQWE7UUFFckIsS0FBSyxFQUFFLENBQUM7UUFQQSxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENB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Q0FBbUM7d0JBQzlELGVBQWUsRUFBRSw2QkFBNkI7cUJBQy9DOzswQkFxRUUsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyxRQUFROzRDQWxFbEIsWUFBWTtzQkFEWCxTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIGFuaW1hdGVDaGlsZCxcbiAgQW5pbWF0aW9uRXZlbnQsXG4gIGtleWZyYW1lcyxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb2N1c1RyYXAsIEZvY3VzVHJhcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICBCYXNlUG9ydGFsT3V0bGV0LFxuICBDZGtQb3J0YWxPdXRsZXQsXG4gIENvbXBvbmVudFBvcnRhbCxcbiAgVGVtcGxhdGVQb3J0YWxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBPd2xEaWFsb2dDb25maWcgfSBmcm9tICcuL2RpYWxvZy1jb25maWcuY2xhc3MnO1xuXG5jb25zdCB6b29tRmFkZUluID0ge1xuICBvcGFjaXR5OiAwLFxuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKHt7IHggfX0pIHRyYW5zbGF0ZVkoe3sgeSB9fSkgc2NhbGUoe3tzY2FsZX19KSdcbn07XG5jb25zdCB6b29tRmFkZUluRnJvbSA9IHtcbiAgb3BhY2l0eTogMCxcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCh7eyB4IH19KSB0cmFuc2xhdGVZKHt7IHkgfX0pIHNjYWxlKHt7c2NhbGV9fSknLFxuICB0cmFuc2Zvcm1PcmlnaW46ICd7eyBveCB9fSB7eyBveSB9fSdcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ293bC1kaWFsb2ctY29udGFpbmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RpYWxvZy1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc2xpZGVNb2RhbCcsIFtcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICd2b2lkID0+IGVudGVyJyxcbiAgICAgICAgW1xuICAgICAgICAgIHN0eWxlKHpvb21GYWRlSW5Gcm9tKSxcbiAgICAgICAgICBhbmltYXRlKCczMDBtcyBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSknLCBzdHlsZSgnKicpKSxcbiAgICAgICAgICBhbmltYXRlKFxuICAgICAgICAgICAgJzE1MG1zJyxcbiAgICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMSknLCBvZmZzZXQ6IDAgfSksXG4gICAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMS4wNSknLCBvZmZzZXQ6IDAuMyB9KSxcbiAgICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSguOTUpJywgb2Zmc2V0OiAwLjggfSksXG4gICAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMSknLCBvZmZzZXQ6IDEuMCB9KVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApLFxuICAgICAgICAgIGFuaW1hdGVDaGlsZCgpXG4gICAgICAgIF0sXG4gICAgICAgIHtcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIHg6ICcwcHgnLFxuICAgICAgICAgICAgeTogJzBweCcsXG4gICAgICAgICAgICBveDogJzUwJScsXG4gICAgICAgICAgICBveTogJzUwJScsXG4gICAgICAgICAgICBzY2FsZTogMVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ2VudGVyID0+IGV4aXQnLCBbYW5pbWF0ZUNoaWxkKCksIGFuaW1hdGUoMjAwLCBzdHlsZSh6b29tRmFkZUluKSldLCB7XG4gICAgICAgIHBhcmFtczogeyB4OiAnMHB4JywgeTogJzBweCcsIG94OiAnNTAlJywgb3k6ICc1MCUnIH1cbiAgICAgIH0pXG4gICAgXSlcbiAgXSxcbiAgaG9zdDoge1xuICAgICcoQHNsaWRlTW9kYWwuc3RhcnQpJzogJ29uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KScsXG4gICAgJyhAc2xpZGVNb2RhbC5kb25lKSc6ICdvbkFuaW1hdGlvbkRvbmUoJGV2ZW50KScsXG4gICAgJ1tjbGFzcy5vd2wtZGlhbG9nLWNvbnRhaW5lcl0nOiAnb3dsRGlhbG9nQ29udGFpbmVyQ2xhc3MnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnb3dsRGlhbG9nQ29udGFpbmVyVGFiSW5kZXgnLFxuICAgICdbYXR0ci5pZF0nOiAnb3dsRGlhbG9nQ29udGFpbmVySWQnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdvd2xEaWFsb2dDb250YWluZXJSb2xlJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdvd2xEaWFsb2dDb250YWluZXJBcmlhTGFiZWxsZWRieScsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ293bERpYWxvZ0NvbnRhaW5lckFyaWFEZXNjcmliZWRieScsXG4gICAgJ1tAc2xpZGVNb2RhbF0nOiAnb3dsRGlhbG9nQ29udGFpbmVyQW5pbWF0aW9uJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCBleHRlbmRzIEJhc2VQb3J0YWxPdXRsZXQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgcG9ydGFsT3V0bGV0OiBDZGtQb3J0YWxPdXRsZXQ7XG5cbiAgLyoqIFRoZSBjbGFzcyB0aGF0IHRyYXBzIGFuZCBtYW5hZ2VzIGZvY3VzIHdpdGhpbiB0aGUgZGlhbG9nLiAqL1xuICBwcml2YXRlIGZvY3VzVHJhcDogRm9jdXNUcmFwO1xuXG4gIC8qKiBJRCBvZiB0aGUgZWxlbWVudCB0aGF0IHNob3VsZCBiZSBjb25zaWRlcmVkIGFzIHRoZSBkaWFsb2cncyBsYWJlbC4gKi9cbiAgcHVibGljIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvKiogRW1pdHMgd2hlbiBhbiBhbmltYXRpb24gc3RhdGUgY2hhbmdlcy4gKi9cbiAgcHVibGljIGFuaW1hdGlvblN0YXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgcHVibGljIGlzQW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfY29uZmlnOiBPd2xEaWFsb2dDb25maWc7XG4gIGdldCBjb25maWcoKTogT3dsRGlhbG9nQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0ZTogJ3ZvaWQnIHwgJ2VudGVyJyB8ICdleGl0JyA9ICdlbnRlcic7XG5cbiAgLy8gZm9yIGFuaW1hdGlvbiBwdXJwb3NlXG4gIHByaXZhdGUgcGFyYW1zOiBhbnkgPSB7XG4gICAgeDogJzBweCcsXG4gICAgeTogJzBweCcsXG4gICAgb3g6ICc1MCUnLFxuICAgIG95OiAnNTAlJyxcbiAgICBzY2FsZTogMFxuICB9O1xuXG4gIC8vIEEgdmFyaWFibGUgdG8gaG9sZCB0aGUgZm9jdXNlZCBlbGVtZW50IGJlZm9yZSB0aGUgZGlhbG9nIHdhcyBvcGVuLlxuICAvLyBUaGlzIHdvdWxkIGhlbHAgdXMgdG8gcmVmb2N1cyBiYWNrIHRvIGVsZW1lbnQgd2hlbiB0aGUgZGlhbG9nIHdhcyBjbG9zZWQuXG4gIHByaXZhdGUgZWxlbWVudEZvY3VzZWRCZWZvcmVEaWFsb2dXYXNPcGVuZWQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgZ2V0IG93bERpYWxvZ0NvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0IG93bERpYWxvZ0NvbnRhaW5lclRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgZ2V0IG93bERpYWxvZ0NvbnRhaW5lcklkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5pZDtcbiAgfVxuXG4gIGdldCBvd2xEaWFsb2dDb250YWluZXJSb2xlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5yb2xlIHx8IG51bGw7XG4gIH1cblxuICBnZXQgb3dsRGlhbG9nQ29udGFpbmVyQXJpYUxhYmVsbGVkYnkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hcmlhTGFiZWxsZWRCeTtcbiAgfVxuXG4gIGdldCBvd2xEaWFsb2dDb250YWluZXJBcmlhRGVzY3JpYmVkYnkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLmFyaWFEZXNjcmliZWRCeSB8fCBudWxsO1xuICB9XG5cbiAgZ2V0IG93bERpYWxvZ0NvbnRhaW5lckFuaW1hdGlvbigpOiBhbnkge1xuICAgIHJldHVybiB7IHZhbHVlOiB0aGlzLnN0YXRlLCBwYXJhbXM6IHRoaXMucGFyYW1zIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBmb2N1c1RyYXBGYWN0b3J5OiBGb2N1c1RyYXBGYWN0b3J5LFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChET0NVTUVOVClcbiAgICBwcml2YXRlIGRvY3VtZW50OiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIENvbXBvbmVudFBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgZGlhbG9nIGNvbnRhaW5lci5cbiAgICovXG4gIHB1YmxpYyBhdHRhY2hDb21wb25lbnRQb3J0YWw8VD4ocG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD4pOiBDb21wb25lbnRSZWY8VD4ge1xuICAgIGlmICh0aGlzLnBvcnRhbE91dGxldC5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aHJvdyBFcnJvcignQXR0ZW1wdGluZyB0byBhdHRhY2ggZGlhbG9nIGNvbnRlbnQgYWZ0ZXIgY29udGVudCBpcyBhbHJlYWR5IGF0dGFjaGVkJyk7XG4gICAgfVxuXG4gICAgdGhpcy5zYXZlUHJldmlvdXNseUZvY3VzZWRFbGVtZW50KCk7XG4gICAgcmV0dXJuIHRoaXMucG9ydGFsT3V0bGV0LmF0dGFjaENvbXBvbmVudFBvcnRhbChwb3J0YWwpO1xuICB9XG5cbiAgcHVibGljIGF0dGFjaFRlbXBsYXRlUG9ydGFsPEM+KHBvcnRhbDogVGVtcGxhdGVQb3J0YWw8Qz4pOiBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDb25maWcoY29uZmlnOiBPd2xEaWFsb2dDb25maWcpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG5cbiAgICBpZiAoY29uZmlnLmV2ZW50KSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZVpvb21PcmlnaW4oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIG9uQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2VudGVyJykge1xuICAgICAgdGhpcy50cmFwRm9jdXMoKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdleGl0Jykge1xuICAgICAgdGhpcy5yZXN0b3JlRm9jdXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLmFuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KGV2ZW50KTtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc3RhcnRFeGl0QW5pbWF0aW9uKCkge1xuICAgIHRoaXMuc3RhdGUgPSAnZXhpdCc7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgb3JpZ2luIHVzZWQgaW4gdGhlIGB6b29tRmFkZUluRnJvbSgpYFxuICAgKiBmb3IgYW5pbWF0aW9uIHB1cnBvc2VcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlWm9vbU9yaWdpbihldmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKCFldmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNsaWVudFggPSBldmVudC5jbGllbnRYO1xuICAgIGNvbnN0IGNsaWVudFkgPSBldmVudC5jbGllbnRZO1xuXG4gICAgY29uc3Qgd2ggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XG4gICAgY29uc3QgaGggPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xuICAgIGNvbnN0IHggPSBjbGllbnRYIC0gd2g7XG4gICAgY29uc3QgeSA9IGNsaWVudFkgLSBoaDtcbiAgICBjb25zdCBveCA9IGNsaWVudFggLyB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCBveSA9IGNsaWVudFkgLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICB0aGlzLnBhcmFtcy54ID0gYCR7eH1weGA7XG4gICAgdGhpcy5wYXJhbXMueSA9IGAke3l9cHhgO1xuICAgIHRoaXMucGFyYW1zLm94ID0gYCR7b3ggKiAxMDB9JWA7XG4gICAgdGhpcy5wYXJhbXMub3kgPSBgJHtveSAqIDEwMH0lYDtcbiAgICB0aGlzLnBhcmFtcy5zY2FsZSA9IDA7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB0aGUgZm9jdXNlZCBlbGVtZW50IGJlZm9yZSBkaWFsb2cgd2FzIG9wZW5cbiAgICovXG4gIHByaXZhdGUgc2F2ZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kb2N1bWVudCkge1xuICAgICAgdGhpcy5lbGVtZW50Rm9jdXNlZEJlZm9yZURpYWxvZ1dhc09wZW5lZCA9IHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyYXBGb2N1cygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZm9jdXNUcmFwKSB7XG4gICAgICB0aGlzLmZvY3VzVHJhcCA9IHRoaXMuZm9jdXNUcmFwRmFjdG9yeS5jcmVhdGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jb25maWcuYXV0b0ZvY3VzKSB7XG4gICAgICB0aGlzLmZvY3VzVHJhcC5mb2N1c0luaXRpYWxFbGVtZW50V2hlblJlYWR5KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXN0b3JlRm9jdXMoKTogdm9pZCB7XG4gICAgY29uc3QgdG9Gb2N1cyA9IHRoaXMuZWxlbWVudEZvY3VzZWRCZWZvcmVEaWFsb2dXYXNPcGVuZWQ7XG5cbiAgICAvLyBXZSBuZWVkIHRoZSBleHRyYSBjaGVjaywgYmVjYXVzZSBJRSBjYW4gc2V0IHRoZSBgYWN0aXZlRWxlbWVudGAgdG8gbnVsbCBpbiBzb21lIGNhc2VzLlxuICAgIGlmICh0b0ZvY3VzICYmIHR5cGVvZiB0b0ZvY3VzLmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0b0ZvY3VzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9jdXNUcmFwKSB7XG4gICAgICB0aGlzLmZvY3VzVHJhcC5kZXN0cm95KCk7XG4gICAgfVxuICB9XG59XG4iLCI8bmctdGVtcGxhdGUgY2RrUG9ydGFsT3V0bGV0PjwvbmctdGVtcGxhdGU+XG4iXX0=