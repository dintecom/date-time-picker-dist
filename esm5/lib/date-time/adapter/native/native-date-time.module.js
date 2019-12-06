/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * native-date-time.module
 */
import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { DateTimeAdapter } from '../date-time-adapter.class';
import { NativeDateTimeAdapter } from './native-date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from '../date-time-format.class';
import { OWL_NATIVE_DATE_TIME_FORMATS } from './native-date-time-format.class';
var NativeDateTimeModule = /** @class */ (function () {
    function NativeDateTimeModule() {
    }
    NativeDateTimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PlatformModule],
                    providers: [{ provide: DateTimeAdapter, useClass: NativeDateTimeAdapter }]
                },] }
    ];
    return NativeDateTimeModule;
}());
export { NativeDateTimeModule };
var ɵ0 = OWL_NATIVE_DATE_TIME_FORMATS;
var OwlNativeDateTimeModule = /** @class */ (function () {
    function OwlNativeDateTimeModule() {
    }
    OwlNativeDateTimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [NativeDateTimeModule],
                    providers: [
                        {
                            provide: OWL_DATE_TIME_FORMATS,
                            useValue: ɵ0
                        }
                    ]
                },] }
    ];
    return OwlNativeDateTimeModule;
}());
export { OwlNativeDateTimeModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1kYXRlLWFuZC10aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvYWRhcHRlci9uYXRpdmUvbmF0aXZlLWRhdGUtdGltZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUUvRTtJQUFBO0lBSW1DLENBQUM7O2dCQUpuQyxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUN6QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFLENBQUM7aUJBQzdFOztJQUNrQywyQkFBQztDQUFBLEFBSnBDLElBSW9DO1NBQXZCLG9CQUFvQjtTQU9YLDRCQUE0QjtBQUxsRDtJQUFBO0lBU3NDLENBQUM7O2dCQVR0QyxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQy9CLFNBQVMsRUFBRTt3QkFDUDs0QkFDSSxPQUFPLEVBQUUscUJBQXFCOzRCQUM5QixRQUFRLElBQThCO3lCQUN6QztxQkFDSjtpQkFDSjs7SUFDcUMsOEJBQUM7Q0FBQSxBQVR2QyxJQVN1QztTQUExQix1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG5hdGl2ZS1kYXRlLXRpbWUubW9kdWxlXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4uL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IE5hdGl2ZURhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vbmF0aXZlLWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IE9XTF9EQVRFX1RJTUVfRk9STUFUUyB9IGZyb20gJy4uL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuaW1wb3J0IHsgT1dMX05BVElWRV9EQVRFX1RJTUVfRk9STUFUUyB9IGZyb20gJy4vbmF0aXZlLWRhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtQbGF0Zm9ybU1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBEYXRlVGltZUFkYXB0ZXIsIHVzZUNsYXNzOiBOYXRpdmVEYXRlVGltZUFkYXB0ZXIgfV1cbn0pXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZVRpbWVNb2R1bGUge31cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTmF0aXZlRGF0ZVRpbWVNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBPV0xfREFURV9USU1FX0ZPUk1BVFMsXG4gICAgICAgICAgICB1c2VWYWx1ZTogT1dMX05BVElWRV9EQVRFX1RJTUVfRk9STUFUU1xuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBPd2xOYXRpdmVEYXRlVGltZU1vZHVsZSB7fVxuIl19