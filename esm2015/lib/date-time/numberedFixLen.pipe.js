/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * numberFixedLen.pipe
 */
import { Pipe } from '@angular/core';
export class NumberFixedLenPipe {
    /**
     * @param {?} num
     * @param {?} len
     * @return {?}
     */
    transform(num, len) {
        /** @type {?} */
        const number = Math.floor(num);
        /** @type {?} */
        const length = Math.floor(len);
        if (num === null || isNaN(number) || isNaN(length)) {
            return num;
        }
        /** @type {?} */
        let numString = number.toString();
        while (numString.length < length) {
            numString = '0' + numString;
        }
        return numString;
    }
}
NumberFixedLenPipe.decorators = [
    { type: Pipe, args: [{
                name: 'numberFixedLen'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyZWRGaXhMZW4ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9udW1iZXJlZEZpeExlbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7SUFDM0IsU0FBUyxDQUFDLEdBQVcsRUFBRSxHQUFXOztjQUN4QixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O2NBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUU5QixJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoRCxPQUFPLEdBQUcsQ0FBQztTQUNkOztZQUVHLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBRWpDLE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDOUIsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7U0FDL0I7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDOzs7WUFuQkosSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSxnQkFBZ0I7YUFDekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG51bWJlckZpeGVkTGVuLnBpcGVcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnbnVtYmVyRml4ZWRMZW4nXG59KVxuZXhwb3J0IGNsYXNzIE51bWJlckZpeGVkTGVuUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybShudW06IG51bWJlciwgbGVuOiBudW1iZXIpOiBzdHJpbmcgfCBudW1iZXIge1xuICAgICAgICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKG51bSk7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IE1hdGguZmxvb3IobGVuKTtcblxuICAgICAgICBpZiAobnVtID09PSBudWxsIHx8IGlzTmFOKG51bWJlcikgfHwgaXNOYU4obGVuZ3RoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBudW1TdHJpbmcgPSBudW1iZXIudG9TdHJpbmcoKTtcblxuICAgICAgICB3aGlsZSAobnVtU3RyaW5nLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgbnVtU3RyaW5nID0gJzAnICsgbnVtU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bVN0cmluZztcbiAgICB9XG59XG4iXX0=