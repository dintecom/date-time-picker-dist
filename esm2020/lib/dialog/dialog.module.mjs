import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OwlDialogContainerComponent } from './dialog-container.component';
import { OwlDialogService, OWL_DIALOG_SCROLL_STRATEGY_PROVIDER } from './dialog.service';
import * as i0 from "@angular/core";
export class OwlDialogModule {
}
OwlDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OwlDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: OwlDialogModule, declarations: [OwlDialogContainerComponent], imports: [CommonModule, A11yModule, OverlayModule, PortalModule] });
OwlDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDialogModule, providers: [OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, OwlDialogService], imports: [CommonModule, A11yModule, OverlayModule, PortalModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, A11yModule, OverlayModule, PortalModule],
                    exports: [],
                    declarations: [OwlDialogContainerComponent],
                    providers: [OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, OwlDialogService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RpYWxvZy9kaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQVF6RixNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQUhYLDJCQUEyQixhQUZoQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxZQUFZOzZHQUtwRCxlQUFlLGFBRmYsQ0FBQyxtQ0FBbUMsRUFBRSxnQkFBZ0IsQ0FBQyxZQUh4RCxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxZQUFZOzJGQUtwRCxlQUFlO2tCQU4zQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDaEUsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsWUFBWSxFQUFFLENBQUMsMkJBQTJCLENBQUM7b0JBQzNDLFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxFQUFFLGdCQUFnQixDQUFDO2lCQUNuRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGlhbG9nU2VydmljZSwgT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIgfSBmcm9tICcuL2RpYWxvZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQTExeU1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgUG9ydGFsTW9kdWxlXSxcbiAgZXhwb3J0czogW10sXG4gIGRlY2xhcmF0aW9uczogW093bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW09XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSLCBPd2xEaWFsb2dTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgT3dsRGlhbG9nTW9kdWxlIHt9XG4iXX0=