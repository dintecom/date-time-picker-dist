/**
 * moment-date-time.module
 */
import { NgModule } from '@angular/core';
import { MomentDateTimeAdapter, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS } from './moment-date-time-adapter.class';
import { OWL_MOMENT_DATE_TIME_FORMATS } from './moment-date-time-format.class';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE } from '../date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from '../date-time-format.class';
import * as i0 from "@angular/core";
export class MomentDateTimeModule {
}
MomentDateTimeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: MomentDateTimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MomentDateTimeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: MomentDateTimeModule });
MomentDateTimeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: MomentDateTimeModule, providers: [
        {
            provide: DateTimeAdapter,
            useClass: MomentDateTimeAdapter,
            deps: [OWL_DATE_TIME_LOCALE, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS]
        }
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: MomentDateTimeModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: DateTimeAdapter,
                            useClass: MomentDateTimeAdapter,
                            deps: [OWL_DATE_TIME_LOCALE, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS]
                        }
                    ]
                }]
        }] });
export class OwlMomentDateTimeModule {
}
OwlMomentDateTimeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: OwlMomentDateTimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OwlMomentDateTimeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: OwlMomentDateTimeModule, imports: [MomentDateTimeModule] });
OwlMomentDateTimeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: OwlMomentDateTimeModule, providers: [
        {
            provide: OWL_DATE_TIME_FORMATS,
            useValue: OWL_MOMENT_DATE_TIME_FORMATS
        }
    ], imports: [[MomentDateTimeModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: OwlMomentDateTimeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MomentDateTimeModule],
                    providers: [
                        {
                            provide: OWL_DATE_TIME_FORMATS,
                            useValue: OWL_MOMENT_DATE_TIME_FORMATS
                        }
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtdGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9kYXRlLXRpbWUvYWRhcHRlci9tb21lbnQvbW9tZW50LWRhdGUtdGltZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDSCxxQkFBcUIsRUFDckIsb0NBQW9DLEVBQ3ZDLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0UsT0FBTyxFQUNILGVBQWUsRUFDZixvQkFBb0IsRUFDdkIsTUFBTSw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFXbEUsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IsYUFSbEI7UUFDUDtZQUNJLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsSUFBSSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsb0NBQW9DLENBQUM7U0FDckU7S0FDSjsyRkFFUSxvQkFBb0I7a0JBVGhDLFFBQVE7bUJBQUM7b0JBQ04sU0FBUyxFQUFFO3dCQUNQOzRCQUNJLE9BQU8sRUFBRSxlQUFlOzRCQUN4QixRQUFRLEVBQUUscUJBQXFCOzRCQUMvQixJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxvQ0FBb0MsQ0FBQzt5QkFDckU7cUJBQ0o7aUJBQ0o7O0FBWUQsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCLFlBWHZCLG9CQUFvQjtxSEFXcEIsdUJBQXVCLGFBUHJCO1FBQ1A7WUFDSSxPQUFPLEVBQUUscUJBQXFCO1lBQzlCLFFBQVEsRUFBRSw0QkFBNEI7U0FDekM7S0FDSixZQU5RLENBQUMsb0JBQW9CLENBQUM7MkZBUXRCLHVCQUF1QjtrQkFUbkMsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDL0IsU0FBUyxFQUFFO3dCQUNQOzRCQUNJLE9BQU8sRUFBRSxxQkFBcUI7NEJBQzlCLFFBQVEsRUFBRSw0QkFBNEI7eUJBQ3pDO3FCQUNKO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtb21lbnQtZGF0ZS10aW1lLm1vZHVsZVxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIE1vbWVudERhdGVUaW1lQWRhcHRlcixcbiAgICBPV0xfTU9NRU5UX0RBVEVfVElNRV9BREFQVEVSX09QVElPTlNcbn0gZnJvbSAnLi9tb21lbnQtZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgT1dMX01PTUVOVF9EQVRFX1RJTUVfRk9STUFUUyB9IGZyb20gJy4vbW9tZW50LWRhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBEYXRlVGltZUFkYXB0ZXIsXG4gICAgT1dMX0RBVEVfVElNRV9MT0NBTEVcbn0gZnJvbSAnLi4vZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgT1dMX0RBVEVfVElNRV9GT1JNQVRTIH0gZnJvbSAnLi4vZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IERhdGVUaW1lQWRhcHRlcixcbiAgICAgICAgICAgIHVzZUNsYXNzOiBNb21lbnREYXRlVGltZUFkYXB0ZXIsXG4gICAgICAgICAgICBkZXBzOiBbT1dMX0RBVEVfVElNRV9MT0NBTEUsIE9XTF9NT01FTlRfREFURV9USU1FX0FEQVBURVJfT1BUSU9OU11cbiAgICAgICAgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZVRpbWVNb2R1bGUge31cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTW9tZW50RGF0ZVRpbWVNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBPV0xfREFURV9USU1FX0ZPUk1BVFMsXG4gICAgICAgICAgICB1c2VWYWx1ZTogT1dMX01PTUVOVF9EQVRFX1RJTUVfRk9STUFUU1xuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBPd2xNb21lbnREYXRlVGltZU1vZHVsZSB7fVxuIl19