import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OwlDialogModule } from '../dialog/dialog.module';
import { OwlCalendarBodyComponent } from './calendar-body.component';
import { OwlMonthViewComponent } from './calendar-month-view.component';
import { OwlMultiYearViewComponent } from './calendar-multi-year-view.component';
import { OwlYearViewComponent } from './calendar-year-view.component';
import { OwlCalendarComponent } from './calendar.component';
import { OwlDateTimeInlineComponent } from './date-time-inline.component';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { OwlDateTimeInputDirective } from './date-time-picker-input.directive';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { OwlDateTimeTriggerDirective } from './date-time-picker-trigger.directive';
import { OwlDateTimeComponent, OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER, } from './date-time-picker.component';
import { NumberFixedLenPipe } from './numberedFixLen.pipe';
import { OwlTimerBoxComponent } from './timer-box.component';
import { OwlTimerComponent } from './timer.component';
import * as i0 from "@angular/core";
export class OwlDateTimeModule {
}
OwlDateTimeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OwlDateTimeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeModule, declarations: [OwlDateTimeTriggerDirective,
        OwlDateTimeInputDirective,
        OwlDateTimeComponent,
        OwlDateTimeContainerComponent,
        OwlMultiYearViewComponent,
        OwlYearViewComponent,
        OwlMonthViewComponent,
        OwlTimerComponent,
        OwlTimerBoxComponent,
        OwlCalendarComponent,
        OwlCalendarBodyComponent,
        NumberFixedLenPipe,
        OwlDateTimeInlineComponent], imports: [CommonModule, OverlayModule, OwlDialogModule, A11yModule], exports: [OwlCalendarComponent,
        OwlTimerComponent,
        OwlDateTimeTriggerDirective,
        OwlDateTimeInputDirective,
        OwlDateTimeComponent,
        OwlDateTimeInlineComponent,
        OwlMultiYearViewComponent,
        OwlYearViewComponent,
        OwlMonthViewComponent] });
OwlDateTimeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeModule, providers: [OwlDateTimeIntl, OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER], imports: [CommonModule, OverlayModule, OwlDialogModule, A11yModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlDateTimeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, OwlDialogModule, A11yModule],
                    exports: [
                        OwlCalendarComponent,
                        OwlTimerComponent,
                        OwlDateTimeTriggerDirective,
                        OwlDateTimeInputDirective,
                        OwlDateTimeComponent,
                        OwlDateTimeInlineComponent,
                        OwlMultiYearViewComponent,
                        OwlYearViewComponent,
                        OwlMonthViewComponent,
                    ],
                    declarations: [
                        OwlDateTimeTriggerDirective,
                        OwlDateTimeInputDirective,
                        OwlDateTimeComponent,
                        OwlDateTimeContainerComponent,
                        OwlMultiYearViewComponent,
                        OwlYearViewComponent,
                        OwlMonthViewComponent,
                        OwlTimerComponent,
                        OwlTimerBoxComponent,
                        OwlCalendarComponent,
                        OwlCalendarBodyComponent,
                        NumberFixedLenPipe,
                        OwlDateTimeInlineComponent,
                    ],
                    providers: [OwlDateTimeIntl, OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9kYXRlLXRpbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNuRixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHFDQUFxQyxHQUN0QyxNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQWdDdEQsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQWhCMUIsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIsNkJBQTZCO1FBQzdCLHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHdCQUF3QjtRQUN4QixrQkFBa0I7UUFDbEIsMEJBQTBCLGFBekJsQixZQUFZLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxVQUFVLGFBRWhFLG9CQUFvQjtRQUNwQixpQkFBaUI7UUFDakIsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIscUJBQXFCOytHQW1CWixpQkFBaUIsYUFGakIsQ0FBQyxlQUFlLEVBQUUscUNBQXFDLENBQUMsWUEzQnpELFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLFVBQVU7MkZBNkJ2RCxpQkFBaUI7a0JBOUI3QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLFVBQVUsQ0FBQztvQkFDbkUsT0FBTyxFQUFFO3dCQUNQLG9CQUFvQjt3QkFDcEIsaUJBQWlCO3dCQUNqQiwyQkFBMkI7d0JBQzNCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQiwwQkFBMEI7d0JBQzFCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQixxQkFBcUI7cUJBQ3RCO29CQUNELFlBQVksRUFBRTt3QkFDWiwyQkFBMkI7d0JBQzNCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQiw2QkFBNkI7d0JBQzdCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLHdCQUF3Qjt3QkFDeEIsa0JBQWtCO3dCQUNsQiwwQkFBMEI7cUJBQzNCO29CQUNELFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSxxQ0FBcUMsQ0FBQztpQkFDcEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3dsRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi4vZGlhbG9nL2RpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xNb250aFZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE93bE11bHRpWWVhclZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW11bHRpLXllYXItdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsWWVhclZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsQ2FsZW5kYXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUlubGluZUNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLWlubGluZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWlucHV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcbmltcG9ydCB7IE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci10cmlnZ2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQge1xuICBPd2xEYXRlVGltZUNvbXBvbmVudCxcbiAgT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUixcbn0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOdW1iZXJGaXhlZExlblBpcGUgfSBmcm9tICcuL251bWJlcmVkRml4TGVuLnBpcGUnO1xuaW1wb3J0IHsgT3dsVGltZXJCb3hDb21wb25lbnQgfSBmcm9tICcuL3RpbWVyLWJveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsVGltZXJDb21wb25lbnQgfSBmcm9tICcuL3RpbWVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE93bERpYWxvZ01vZHVsZSwgQTExeU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBPd2xDYWxlbmRhckNvbXBvbmVudCxcbiAgICBPd2xUaW1lckNvbXBvbmVudCxcbiAgICBPd2xEYXRlVGltZVRyaWdnZXJEaXJlY3RpdmUsXG4gICAgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSxcbiAgICBPd2xEYXRlVGltZUNvbXBvbmVudCxcbiAgICBPd2xEYXRlVGltZUlubGluZUNvbXBvbmVudCxcbiAgICBPd2xNdWx0aVllYXJWaWV3Q29tcG9uZW50LFxuICAgIE93bFllYXJWaWV3Q29tcG9uZW50LFxuICAgIE93bE1vbnRoVmlld0NvbXBvbmVudCxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgT3dsRGF0ZVRpbWVUcmlnZ2VyRGlyZWN0aXZlLFxuICAgIE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmUsXG4gICAgT3dsRGF0ZVRpbWVDb21wb25lbnQsXG4gICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQsXG4gICAgT3dsTXVsdGlZZWFyVmlld0NvbXBvbmVudCxcbiAgICBPd2xZZWFyVmlld0NvbXBvbmVudCxcbiAgICBPd2xNb250aFZpZXdDb21wb25lbnQsXG4gICAgT3dsVGltZXJDb21wb25lbnQsXG4gICAgT3dsVGltZXJCb3hDb21wb25lbnQsXG4gICAgT3dsQ2FsZW5kYXJDb21wb25lbnQsXG4gICAgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50LFxuICAgIE51bWJlckZpeGVkTGVuUGlwZSxcbiAgICBPd2xEYXRlVGltZUlubGluZUNvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbT3dsRGF0ZVRpbWVJbnRsLCBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVNb2R1bGUge31cbiJdfQ==