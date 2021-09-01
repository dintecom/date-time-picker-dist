/**
 * numberFixedLen.pipe
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class NumberFixedLenPipe {
    transform(num, len) {
        const number = Math.floor(num);
        const length = Math.floor(len);
        if (num === null || isNaN(number) || isNaN(length)) {
            return num;
        }
        let numString = number.toString();
        while (numString.length < length) {
            numString = '0' + numString;
        }
        return numString;
    }
}
NumberFixedLenPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: NumberFixedLenPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NumberFixedLenPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: NumberFixedLenPipe, name: "numberFixedLen" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0, type: NumberFixedLenPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'numberFixedLen'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyZWRGaXhMZW4ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9udW1iZXJlZEZpeExlbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBRUgsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBS3BELE1BQU0sT0FBTyxrQkFBa0I7SUFDM0IsU0FBUyxDQUFDLEdBQVcsRUFBRSxHQUFXO1FBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUvQixJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoRCxPQUFPLEdBQUcsQ0FBQztTQUNkO1FBRUQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWxDLE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDOUIsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7U0FDL0I7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDOzsrR0FoQlEsa0JBQWtCOzZHQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFIOUIsSUFBSTttQkFBQztvQkFDRixJQUFJLEVBQUUsZ0JBQWdCO2lCQUN6QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbnVtYmVyRml4ZWRMZW4ucGlwZVxuICovXG5cbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdudW1iZXJGaXhlZExlbidcbn0pXG5leHBvcnQgY2xhc3MgTnVtYmVyRml4ZWRMZW5QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKG51bTogbnVtYmVyLCBsZW46IG51bWJlcik6IHN0cmluZyB8IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IobnVtKTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gTWF0aC5mbG9vcihsZW4pO1xuXG4gICAgICAgIGlmIChudW0gPT09IG51bGwgfHwgaXNOYU4obnVtYmVyKSB8fCBpc05hTihsZW5ndGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG51bVN0cmluZyA9IG51bWJlci50b1N0cmluZygpO1xuXG4gICAgICAgIHdoaWxlIChudW1TdHJpbmcubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBudW1TdHJpbmcgPSAnMCcgKyBudW1TdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVtU3RyaW5nO1xuICAgIH1cbn1cbiJdfQ==