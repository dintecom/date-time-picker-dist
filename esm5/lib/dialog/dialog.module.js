/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * dialog.module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, OwlDialogService } from './dialog.service';
import { OwlDialogContainerComponent } from './dialog-container.component';
var OwlDialogModule = /** @class */ (function () {
    function OwlDialogModule() {
    }
    OwlDialogModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, A11yModule, OverlayModule, PortalModule],
                    exports: [],
                    declarations: [OwlDialogContainerComponent],
                    providers: [OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, OwlDialogService],
                    entryComponents: [OwlDialogContainerComponent]
                },] }
    ];
    return OwlDialogModule;
}());
export { OwlDialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RpYWxvZy9kaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0gsbUNBQW1DLEVBQ25DLGdCQUFnQixFQUNuQixNQUFNLGtCQUFrQixDQUFDO0FBQzFCLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTNFO0lBQUE7SUFPOEIsQ0FBQzs7Z0JBUDlCLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUM7b0JBQ2hFLE9BQU8sRUFBRSxFQUFFO29CQUNYLFlBQVksRUFBRSxDQUFDLDJCQUEyQixDQUFDO29CQUMzQyxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDbEUsZUFBZSxFQUFFLENBQUMsMkJBQTJCLENBQUM7aUJBQ2pEOztJQUM2QixzQkFBQztDQUFBLEFBUC9CLElBTytCO1NBQWxCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRpYWxvZy5tb2R1bGVcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICAgIE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSLFxuICAgIE93bERpYWxvZ1NlcnZpY2Vcbn0gZnJvbSAnLi9kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RpYWxvZy1jb250YWluZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBMTF5TW9kdWxlLCBPdmVybGF5TW9kdWxlLCBQb3J0YWxNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtdLFxuICAgIGRlY2xhcmF0aW9uczogW093bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIsIE93bERpYWxvZ1NlcnZpY2VdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW093bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgT3dsRGlhbG9nTW9kdWxlIHt9XG4iXX0=