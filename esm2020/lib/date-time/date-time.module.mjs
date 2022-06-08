import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { OwlDateTimeTriggerDirective } from './date-time-picker-trigger.directive';
import { OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER, OwlDateTimeComponent } from './date-time-picker.component';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { OwlDateTimeInputDirective } from './date-time-picker-input.directive';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { OwlMonthViewComponent } from './calendar-month-view.component';
import { OwlCalendarBodyComponent } from './calendar-body.component';
import { OwlYearViewComponent } from './calendar-year-view.component';
import { OwlMultiYearViewComponent } from './calendar-multi-year-view.component';
import { OwlTimerBoxComponent } from './timer-box.component';
import { OwlTimerComponent } from './timer.component';
import { NumberFixedLenPipe } from './numberedFixLen.pipe';
import { OwlCalendarComponent } from './calendar.component';
import { OwlDateTimeInlineComponent } from './date-time-inline.component';
import { OwlDialogModule } from '../dialog/dialog.module';
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
                        OwlMonthViewComponent
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
                        OwlDateTimeInlineComponent
                    ],
                    providers: [OwlDateTimeIntl, OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9kYXRlLXRpbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDbkYsT0FBTyxFQUNMLHFDQUFxQyxFQUNyQyxvQkFBb0IsRUFDckIsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN2RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDakYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQWdDMUQsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQWhCMUIsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIsNkJBQTZCO1FBQzdCLHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHdCQUF3QjtRQUN4QixrQkFBa0I7UUFDbEIsMEJBQTBCLGFBekJsQixZQUFZLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxVQUFVLGFBRWhFLG9CQUFvQjtRQUNwQixpQkFBaUI7UUFDakIsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIscUJBQXFCOytHQW1CWixpQkFBaUIsYUFGakIsQ0FBQyxlQUFlLEVBQUUscUNBQXFDLENBQUMsWUEzQnpELFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLFVBQVU7MkZBNkJ2RCxpQkFBaUI7a0JBOUI3QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLFVBQVUsQ0FBQztvQkFDbkUsT0FBTyxFQUFFO3dCQUNQLG9CQUFvQjt3QkFDcEIsaUJBQWlCO3dCQUNqQiwyQkFBMkI7d0JBQzNCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQiwwQkFBMEI7d0JBQzFCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQixxQkFBcUI7cUJBQ3RCO29CQUNELFlBQVksRUFBRTt3QkFDWiwyQkFBMkI7d0JBQzNCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQiw2QkFBNkI7d0JBQzdCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLHdCQUF3Qjt3QkFDeEIsa0JBQWtCO3dCQUNsQiwwQkFBMEI7cUJBQzNCO29CQUNELFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSxxQ0FBcUMsQ0FBQztpQkFDcEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVUcmlnZ2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLXRyaWdnZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7XG4gIE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIsXG4gIE93bERhdGVUaW1lQ29tcG9uZW50XG59IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWlucHV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcbmltcG9ydCB7IE93bE1vbnRoVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xZZWFyVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xNdWx0aVllYXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE93bFRpbWVyQm94Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lci1ib3guY29tcG9uZW50JztcbmltcG9ydCB7IE93bFRpbWVyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnVtYmVyRml4ZWRMZW5QaXBlIH0gZnJvbSAnLi9udW1iZXJlZEZpeExlbi5waXBlJztcbmltcG9ydCB7IE93bENhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1pbmxpbmUuY29tcG9uZW50JztcbmltcG9ydCB7IE93bERpYWxvZ01vZHVsZSB9IGZyb20gJy4uL2RpYWxvZy9kaWFsb2cubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgT3dsRGlhbG9nTW9kdWxlLCBBMTF5TW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE93bENhbGVuZGFyQ29tcG9uZW50LFxuICAgIE93bFRpbWVyQ29tcG9uZW50LFxuICAgIE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZSxcbiAgICBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlLFxuICAgIE93bERhdGVUaW1lQ29tcG9uZW50LFxuICAgIE93bERhdGVUaW1lSW5saW5lQ29tcG9uZW50LFxuICAgIE93bE11bHRpWWVhclZpZXdDb21wb25lbnQsXG4gICAgT3dsWWVhclZpZXdDb21wb25lbnQsXG4gICAgT3dsTW9udGhWaWV3Q29tcG9uZW50XG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZSxcbiAgICBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlLFxuICAgIE93bERhdGVUaW1lQ29tcG9uZW50LFxuICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIE93bE11bHRpWWVhclZpZXdDb21wb25lbnQsXG4gICAgT3dsWWVhclZpZXdDb21wb25lbnQsXG4gICAgT3dsTW9udGhWaWV3Q29tcG9uZW50LFxuICAgIE93bFRpbWVyQ29tcG9uZW50LFxuICAgIE93bFRpbWVyQm94Q29tcG9uZW50LFxuICAgIE93bENhbGVuZGFyQ29tcG9uZW50LFxuICAgIE93bENhbGVuZGFyQm9keUNvbXBvbmVudCxcbiAgICBOdW1iZXJGaXhlZExlblBpcGUsXG4gICAgT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbT3dsRGF0ZVRpbWVJbnRsLCBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSXVxufSlcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZU1vZHVsZSB7fVxuIl19