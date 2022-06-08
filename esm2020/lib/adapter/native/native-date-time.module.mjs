import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { DateTimeAdapter } from '../date-time-adapter.class';
import { NativeDateTimeAdapter } from './native-date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from '../date-time-format.class';
import { OWL_NATIVE_DATE_TIME_FORMATS } from './native-date-time-format.class';
import * as i0 from "@angular/core";
export class NativeDateTimeModule {
}
NativeDateTimeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: NativeDateTimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NativeDateTimeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: NativeDateTimeModule, imports: [PlatformModule] });
NativeDateTimeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: NativeDateTimeModule, providers: [{ provide: DateTimeAdapter, useClass: NativeDateTimeAdapter }], imports: [PlatformModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: NativeDateTimeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [PlatformModule],
                    providers: [{ provide: DateTimeAdapter, useClass: NativeDateTimeAdapter }]
                }]
        }] });
export class OwlNativeDateTimeModule {
}
OwlNativeDateTimeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlNativeDateTimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OwlNativeDateTimeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: OwlNativeDateTimeModule, imports: [NativeDateTimeModule] });
OwlNativeDateTimeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlNativeDateTimeModule, providers: [
        {
            provide: OWL_DATE_TIME_FORMATS,
            useValue: OWL_NATIVE_DATE_TIME_FORMATS
        }
    ], imports: [NativeDateTimeModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: OwlNativeDateTimeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NativeDateTimeModule],
                    providers: [
                        {
                            provide: OWL_DATE_TIME_FORMATS,
                            useValue: OWL_NATIVE_DATE_TIME_FORMATS
                        }
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNrZXIvc3JjL2xpYi9hZGFwdGVyL25hdGl2ZS9uYXRpdmUtZGF0ZS10aW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBTS9FLE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixZQUhyQixjQUFjO2tIQUdiLG9CQUFvQixhQUZwQixDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxZQURoRSxjQUFjOzJGQUdiLG9CQUFvQjtrQkFKaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7b0JBQ3pCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUUsQ0FBQztpQkFDM0U7O0FBWUQsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCLFlBWHZCLG9CQUFvQjtxSEFXcEIsdUJBQXVCLGFBUHZCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUscUJBQXFCO1lBQzlCLFFBQVEsRUFBRSw0QkFBNEI7U0FDdkM7S0FDRixZQU5TLG9CQUFvQjsyRkFRbkIsdUJBQXVCO2tCQVRuQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO29CQUMvQixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLHFCQUFxQjs0QkFDOUIsUUFBUSxFQUFFLDRCQUE0Qjt5QkFDdkM7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgTmF0aXZlRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9uYXRpdmUtZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHsgT1dMX0RBVEVfVElNRV9GT1JNQVRTIH0gZnJvbSAnLi4vZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQgeyBPV0xfTkFUSVZFX0RBVEVfVElNRV9GT1JNQVRTIH0gZnJvbSAnLi9uYXRpdmUtZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtQbGF0Zm9ybU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogRGF0ZVRpbWVBZGFwdGVyLCB1c2VDbGFzczogTmF0aXZlRGF0ZVRpbWVBZGFwdGVyIH1dXG59KVxuZXhwb3J0IGNsYXNzIE5hdGl2ZURhdGVUaW1lTW9kdWxlIHt9XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtOYXRpdmVEYXRlVGltZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE9XTF9EQVRFX1RJTUVfRk9STUFUUyxcbiAgICAgIHVzZVZhbHVlOiBPV0xfTkFUSVZFX0RBVEVfVElNRV9GT1JNQVRTXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE93bE5hdGl2ZURhdGVUaW1lTW9kdWxlIHt9XG4iXX0=