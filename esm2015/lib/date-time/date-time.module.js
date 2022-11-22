/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time.module
 */
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
import { OwlHourInputComponent } from './hour-input.component';
export class OwlDateTimeModule {
}
OwlDateTimeModule.decorators = [
    { type: NgModule, args: [{
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
                    OwlTimerBoxComponent,
                    OwlHourInputComponent
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
                    OwlHourInputComponent,
                    OwlCalendarComponent,
                    OwlCalendarBodyComponent,
                    NumberFixedLenPipe,
                    OwlDateTimeInlineComponent
                ],
                providers: [OwlDateTimeIntl, OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER],
                entryComponents: [OwlDateTimeContainerComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25GLE9BQU8sRUFDSCxxQ0FBcUMsRUFDckMsb0JBQW9CLEVBQ3ZCLE1BQU0sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQW9DL0QsTUFBTSxPQUFPLGlCQUFpQjs7O1lBbEM3QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDO2dCQUNuRSxPQUFPLEVBQUU7b0JBQ0wsb0JBQW9CO29CQUNwQixpQkFBaUI7b0JBQ2pCLDJCQUEyQjtvQkFDM0IseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLDBCQUEwQjtvQkFDMUIseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixxQkFBcUI7aUJBQ3hCO2dCQUNELFlBQVksRUFBRTtvQkFDViwyQkFBMkI7b0JBQzNCLHlCQUF5QjtvQkFDekIsb0JBQW9CO29CQUNwQiw2QkFBNkI7b0JBQzdCLHlCQUF5QjtvQkFDekIsb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLGlCQUFpQjtvQkFDakIsb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLG9CQUFvQjtvQkFDcEIsd0JBQXdCO29CQUN4QixrQkFBa0I7b0JBQ2xCLDBCQUEwQjtpQkFDN0I7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsZUFBZSxFQUFFLHFDQUFxQyxDQUFDO2dCQUNuRSxlQUFlLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQzthQUNuRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLm1vZHVsZVxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZVRyaWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItdHJpZ2dlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHtcbiAgICBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSLFxuICAgIE93bERhdGVUaW1lQ29tcG9uZW50XG59IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWlucHV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcbmltcG9ydCB7IE93bE1vbnRoVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xZZWFyVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xNdWx0aVllYXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE93bFRpbWVyQm94Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lci1ib3guY29tcG9uZW50JztcbmltcG9ydCB7IE93bFRpbWVyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnVtYmVyRml4ZWRMZW5QaXBlIH0gZnJvbSAnLi9udW1iZXJlZEZpeExlbi5waXBlJztcbmltcG9ydCB7IE93bENhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1pbmxpbmUuY29tcG9uZW50JztcbmltcG9ydCB7IE93bERpYWxvZ01vZHVsZSB9IGZyb20gJy4uL2RpYWxvZy9kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IE93bEhvdXJJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vaG91ci1pbnB1dC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE93bERpYWxvZ01vZHVsZSwgQTExeU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBPd2xDYWxlbmRhckNvbXBvbmVudCxcbiAgICAgICAgT3dsVGltZXJDb21wb25lbnQsXG4gICAgICAgIE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVDb21wb25lbnQsXG4gICAgICAgIE93bERhdGVUaW1lSW5saW5lQ29tcG9uZW50LFxuICAgICAgICBPd2xNdWx0aVllYXJWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xZZWFyVmlld0NvbXBvbmVudCxcbiAgICAgICAgT3dsTW9udGhWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xUaW1lckJveENvbXBvbmVudCxcbiAgICAgICAgT3dsSG91cklucHV0Q29tcG9uZW50XG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgT3dsRGF0ZVRpbWVUcmlnZ2VyRGlyZWN0aXZlLFxuICAgICAgICBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlLFxuICAgICAgICBPd2xEYXRlVGltZUNvbXBvbmVudCxcbiAgICAgICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIE93bE11bHRpWWVhclZpZXdDb21wb25lbnQsXG4gICAgICAgIE93bFllYXJWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xNb250aFZpZXdDb21wb25lbnQsXG4gICAgICAgIE93bFRpbWVyQ29tcG9uZW50LFxuICAgICAgICBPd2xUaW1lckJveENvbXBvbmVudCxcbiAgICAgICAgT3dsSG91cklucHV0Q29tcG9uZW50LFxuICAgICAgICBPd2xDYWxlbmRhckNvbXBvbmVudCxcbiAgICAgICAgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50LFxuICAgICAgICBOdW1iZXJGaXhlZExlblBpcGUsXG4gICAgICAgIE93bERhdGVUaW1lSW5saW5lQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtPd2xEYXRlVGltZUludGwsIE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW093bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZU1vZHVsZSB7fVxuIl19