import { InjectionToken } from '@angular/core';
export interface OwlDateTimeFormats {
    parse: {
        dateTimeInput: any;
    };
    display: {
        fullInput: any;
        dateInput: any;
        timeInput: any;
        monthYearLabel: any;
        dateA11yLabel: any;
        monthYearA11yLabel: any;
    };
}
/** InjectionToken for date time picker that can be used to override default format. */
export declare const OWL_DATE_TIME_FORMATS: InjectionToken<OwlDateTimeFormats>;
