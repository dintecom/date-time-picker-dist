/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * numberFixedLen.pipe
 */
import { Pipe } from '@angular/core';
var NumberFixedLenPipe = /** @class */ (function () {
    function NumberFixedLenPipe() {
    }
    /**
     * @param {?} num
     * @param {?} len
     * @return {?}
     */
    NumberFixedLenPipe.prototype.transform = /**
     * @param {?} num
     * @param {?} len
     * @return {?}
     */
    function (num, len) {
        /** @type {?} */
        var number = Math.floor(num);
        /** @type {?} */
        var length = Math.floor(len);
        if (num === null || isNaN(number) || isNaN(length)) {
            return num;
        }
        /** @type {?} */
        var numString = number.toString();
        while (numString.length < length) {
            numString = '0' + numString;
        }
        return numString;
    };
    NumberFixedLenPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'numberFixedLen'
                },] }
    ];
    return NumberFixedLenPipe;
}());
export { NumberFixedLenPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyZWRGaXhMZW4ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWRhdGUtYW5kLXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9udW1iZXJlZEZpeExlbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRDtJQUFBO0lBb0JBLENBQUM7Ozs7OztJQWhCRyxzQ0FBUzs7Ozs7SUFBVCxVQUFVLEdBQVcsRUFBRSxHQUFXOztZQUN4QixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O1lBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUU5QixJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoRCxPQUFPLEdBQUcsQ0FBQztTQUNkOztZQUVHLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBRWpDLE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDOUIsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7U0FDL0I7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDOztnQkFuQkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxnQkFBZ0I7aUJBQ3pCOztJQWtCRCx5QkFBQztDQUFBLEFBcEJELElBb0JDO1NBakJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbnVtYmVyRml4ZWRMZW4ucGlwZVxuICovXG5cbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdudW1iZXJGaXhlZExlbidcbn0pXG5leHBvcnQgY2xhc3MgTnVtYmVyRml4ZWRMZW5QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKG51bTogbnVtYmVyLCBsZW46IG51bWJlcik6IHN0cmluZyB8IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IobnVtKTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gTWF0aC5mbG9vcihsZW4pO1xuXG4gICAgICAgIGlmIChudW0gPT09IG51bGwgfHwgaXNOYU4obnVtYmVyKSB8fCBpc05hTihsZW5ndGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG51bVN0cmluZyA9IG51bWJlci50b1N0cmluZygpO1xuXG4gICAgICAgIHdoaWxlIChudW1TdHJpbmcubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBudW1TdHJpbmcgPSAnMCcgKyBudW1TdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVtU3RyaW5nO1xuICAgIH1cbn1cbiJdfQ==