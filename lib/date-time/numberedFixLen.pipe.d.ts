import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NumberFixedLenPipe implements PipeTransform {
    transform(num: number, len: number): string | number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumberFixedLenPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NumberFixedLenPipe, "numberFixedLen", false>;
}
