/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * moment-date-time.module
 */
import { NgModule } from '@angular/core';
import { MomentDateTimeAdapter, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS } from './moment-date-time-adapter.class';
import { OWL_MOMENT_DATE_TIME_FORMATS } from './moment-date-time-format.class';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE } from '../date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from '../date-time-format.class';
export class MomentDateTimeModule {
}
MomentDateTimeModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    {
                        provide: DateTimeAdapter,
                        useClass: MomentDateTimeAdapter,
                        deps: [OWL_DATE_TIME_LOCALE, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS]
                    }
                ]
            },] }
];
const ɵ0 = OWL_MOMENT_DATE_TIME_FORMATS;
export class OwlMomentDateTimeModule {
}
OwlMomentDateTimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [MomentDateTimeModule],
                providers: [
                    {
                        provide: OWL_DATE_TIME_FORMATS,
                        useValue: ɵ0
                    }
                ]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtdGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvYWRhcHRlci9tb21lbnQvbW9tZW50LWRhdGUtdGltZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILHFCQUFxQixFQUNyQixvQ0FBb0MsRUFDdkMsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRSxPQUFPLEVBQ0gsZUFBZSxFQUNmLG9CQUFvQixFQUN2QixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBV2xFLE1BQU0sT0FBTyxvQkFBb0I7OztZQVRoQyxRQUFRLFNBQUM7Z0JBQ04sU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxlQUFlO3dCQUN4QixRQUFRLEVBQUUscUJBQXFCO3dCQUMvQixJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxvQ0FBb0MsQ0FBQztxQkFDckU7aUJBQ0o7YUFDSjs7V0FRcUIsNEJBQTRCO0FBSWxELE1BQU0sT0FBTyx1QkFBdUI7OztZQVRuQyxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7Z0JBQy9CLFNBQVMsRUFBRTtvQkFDUDt3QkFDSSxPQUFPLEVBQUUscUJBQXFCO3dCQUM5QixRQUFRLElBQThCO3FCQUN6QztpQkFDSjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtb21lbnQtZGF0ZS10aW1lLm1vZHVsZVxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIE1vbWVudERhdGVUaW1lQWRhcHRlcixcbiAgICBPV0xfTU9NRU5UX0RBVEVfVElNRV9BREFQVEVSX09QVElPTlNcbn0gZnJvbSAnLi9tb21lbnQtZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgT1dMX01PTUVOVF9EQVRFX1RJTUVfRk9STUFUUyB9IGZyb20gJy4vbW9tZW50LWRhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBEYXRlVGltZUFkYXB0ZXIsXG4gICAgT1dMX0RBVEVfVElNRV9MT0NBTEVcbn0gZnJvbSAnLi4vZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgT1dMX0RBVEVfVElNRV9GT1JNQVRTIH0gZnJvbSAnLi4vZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IERhdGVUaW1lQWRhcHRlcixcbiAgICAgICAgICAgIHVzZUNsYXNzOiBNb21lbnREYXRlVGltZUFkYXB0ZXIsXG4gICAgICAgICAgICBkZXBzOiBbT1dMX0RBVEVfVElNRV9MT0NBTEUsIE9XTF9NT01FTlRfREFURV9USU1FX0FEQVBURVJfT1BUSU9OU11cbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZVRpbWVNb2R1bGUge31cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTW9tZW50RGF0ZVRpbWVNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBPV0xfREFURV9USU1FX0ZPUk1BVFMsXG4gICAgICAgICAgICB1c2VWYWx1ZTogT1dMX01PTUVOVF9EQVRFX1RJTUVfRk9STUFUU1xuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBPd2xNb21lbnREYXRlVGltZU1vZHVsZSB7fVxuIl19