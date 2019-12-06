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
var OwlDateTimeModule = /** @class */ (function () {
    function OwlDateTimeModule() {
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
                    providers: [OwlDateTimeIntl, OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER],
                    entryComponents: [OwlDateTimeContainerComponent]
                },] }
    ];
    return OwlDateTimeModule;
}());
export { OwlDateTimeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25GLE9BQU8sRUFDSCxxQ0FBcUMsRUFDckMsb0JBQW9CLEVBQ3ZCLE1BQU0sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUxRDtJQUFBO0lBK0JnQyxDQUFDOztnQkEvQmhDLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7b0JBQ25FLE9BQU8sRUFBRTt3QkFDTCxvQkFBb0I7d0JBQ3BCLGlCQUFpQjt3QkFDakIsMkJBQTJCO3dCQUMzQix5QkFBeUI7d0JBQ3pCLG9CQUFvQjt3QkFDcEIsMEJBQTBCO3dCQUMxQix5QkFBeUI7d0JBQ3pCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3FCQUN4QjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsMkJBQTJCO3dCQUMzQix5QkFBeUI7d0JBQ3pCLG9CQUFvQjt3QkFDcEIsNkJBQTZCO3dCQUM3Qix5QkFBeUI7d0JBQ3pCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3dCQUNyQixpQkFBaUI7d0JBQ2pCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQix3QkFBd0I7d0JBQ3hCLGtCQUFrQjt3QkFDbEIsMEJBQTBCO3FCQUM3QjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUscUNBQXFDLENBQUM7b0JBQ25FLGVBQWUsRUFBRSxDQUFDLDZCQUE2QixDQUFDO2lCQUNuRDs7SUFDK0Isd0JBQUM7Q0FBQSxBQS9CakMsSUErQmlDO1NBQXBCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLm1vZHVsZVxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZVRyaWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItdHJpZ2dlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHtcbiAgICBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSLFxuICAgIE93bERhdGVUaW1lQ29tcG9uZW50XG59IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWlucHV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcbmltcG9ydCB7IE93bE1vbnRoVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xZZWFyVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xNdWx0aVllYXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE93bFRpbWVyQm94Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lci1ib3guY29tcG9uZW50JztcbmltcG9ydCB7IE93bFRpbWVyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnVtYmVyRml4ZWRMZW5QaXBlIH0gZnJvbSAnLi9udW1iZXJlZEZpeExlbi5waXBlJztcbmltcG9ydCB7IE93bENhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1pbmxpbmUuY29tcG9uZW50JztcbmltcG9ydCB7IE93bERpYWxvZ01vZHVsZSB9IGZyb20gJy4uL2RpYWxvZy9kaWFsb2cubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBPd2xEaWFsb2dNb2R1bGUsIEExMXlNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgT3dsQ2FsZW5kYXJDb21wb25lbnQsXG4gICAgICAgIE93bFRpbWVyQ29tcG9uZW50LFxuICAgICAgICBPd2xEYXRlVGltZVRyaWdnZXJEaXJlY3RpdmUsXG4gICAgICAgIE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmUsXG4gICAgICAgIE93bERhdGVUaW1lQ29tcG9uZW50LFxuICAgICAgICBPd2xEYXRlVGltZUlubGluZUNvbXBvbmVudCxcbiAgICAgICAgT3dsTXVsdGlZZWFyVmlld0NvbXBvbmVudCxcbiAgICAgICAgT3dsWWVhclZpZXdDb21wb25lbnQsXG4gICAgICAgIE93bE1vbnRoVmlld0NvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVDb21wb25lbnQsXG4gICAgICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBPd2xNdWx0aVllYXJWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xZZWFyVmlld0NvbXBvbmVudCxcbiAgICAgICAgT3dsTW9udGhWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xUaW1lckNvbXBvbmVudCxcbiAgICAgICAgT3dsVGltZXJCb3hDb21wb25lbnQsXG4gICAgICAgIE93bENhbGVuZGFyQ29tcG9uZW50LFxuICAgICAgICBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQsXG4gICAgICAgIE51bWJlckZpeGVkTGVuUGlwZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW093bERhdGVUaW1lSW50bCwgT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lTW9kdWxlIHt9XG4iXX0=