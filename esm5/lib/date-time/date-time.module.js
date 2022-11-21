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
                        OwlMonthViewComponent,
                        OwlTimerBoxComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25GLE9BQU8sRUFDSCxxQ0FBcUMsRUFDckMsb0JBQW9CLEVBQ3ZCLE1BQU0sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUxRDtJQUFBO0lBZ0NnQyxDQUFDOztnQkFoQ2hDLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUM7b0JBQ25FLE9BQU8sRUFBRTt3QkFDTCxvQkFBb0I7d0JBQ3BCLGlCQUFpQjt3QkFDakIsMkJBQTJCO3dCQUMzQix5QkFBeUI7d0JBQ3pCLG9CQUFvQjt3QkFDcEIsMEJBQTBCO3dCQUMxQix5QkFBeUI7d0JBQ3pCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3dCQUNyQixvQkFBb0I7cUJBQ3ZCO29CQUNELFlBQVksRUFBRTt3QkFDViwyQkFBMkI7d0JBQzNCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQiw2QkFBNkI7d0JBQzdCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLHdCQUF3Qjt3QkFDeEIsa0JBQWtCO3dCQUNsQiwwQkFBMEI7cUJBQzdCO29CQUNELFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSxxQ0FBcUMsQ0FBQztvQkFDbkUsZUFBZSxFQUFFLENBQUMsNkJBQTZCLENBQUM7aUJBQ25EOztJQUMrQix3QkFBQztDQUFBLEFBaENqQyxJQWdDaUM7U0FBcEIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXRpbWUubW9kdWxlXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci10cmlnZ2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQge1xuICAgIE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIsXG4gICAgT3dsRGF0ZVRpbWVDb21wb25lbnRcbn0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW5wdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE93bERhdGVUaW1lSW50bCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3dsTW9udGhWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IE93bFllYXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE93bE11bHRpWWVhclZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW11bHRpLXllYXItdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsVGltZXJCb3hDb21wb25lbnQgfSBmcm9tICcuL3RpbWVyLWJveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsVGltZXJDb21wb25lbnQgfSBmcm9tICcuL3RpbWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOdW1iZXJGaXhlZExlblBpcGUgfSBmcm9tICcuL251bWJlcmVkRml4TGVuLnBpcGUnO1xuaW1wb3J0IHsgT3dsQ2FsZW5kYXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUlubGluZUNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLWlubGluZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi4vZGlhbG9nL2RpYWxvZy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE93bERpYWxvZ01vZHVsZSwgQTExeU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBPd2xDYWxlbmRhckNvbXBvbmVudCxcbiAgICAgICAgT3dsVGltZXJDb21wb25lbnQsXG4gICAgICAgIE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVDb21wb25lbnQsXG4gICAgICAgIE93bERhdGVUaW1lSW5saW5lQ29tcG9uZW50LFxuICAgICAgICBPd2xNdWx0aVllYXJWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xZZWFyVmlld0NvbXBvbmVudCxcbiAgICAgICAgT3dsTW9udGhWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xUaW1lckJveENvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVDb21wb25lbnQsXG4gICAgICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBPd2xNdWx0aVllYXJWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xZZWFyVmlld0NvbXBvbmVudCxcbiAgICAgICAgT3dsTW9udGhWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xUaW1lckNvbXBvbmVudCxcbiAgICAgICAgT3dsVGltZXJCb3hDb21wb25lbnQsXG4gICAgICAgIE93bENhbGVuZGFyQ29tcG9uZW50LFxuICAgICAgICBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQsXG4gICAgICAgIE51bWJlckZpeGVkTGVuUGlwZSxcbiAgICAgICAgT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW093bERhdGVUaW1lSW50bCwgT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lTW9kdWxlIHt9XG4iXX0=