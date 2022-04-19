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
NumberFixedLenPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NumberFixedLenPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NumberFixedLenPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NumberFixedLenPipe, name: "numberFixedLen" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.2", ngImport: i0, type: NumberFixedLenPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'numberFixedLen'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyZWRGaXhMZW4ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9udW1iZXJlZEZpeExlbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFNBQVMsQ0FBQyxHQUFXLEVBQUUsR0FBVztRQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFL0IsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEQsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVsQyxPQUFPLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1lBQ2hDLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDO1NBQzdCO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7K0dBaEJVLGtCQUFrQjs2R0FBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBSDlCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLGdCQUFnQjtpQkFDdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ251bWJlckZpeGVkTGVuJ1xufSlcbmV4cG9ydCBjbGFzcyBOdW1iZXJGaXhlZExlblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKG51bTogbnVtYmVyLCBsZW46IG51bWJlcik6IHN0cmluZyB8IG51bWJlciB7XG4gICAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihudW0pO1xuICAgIGNvbnN0IGxlbmd0aCA9IE1hdGguZmxvb3IobGVuKTtcblxuICAgIGlmIChudW0gPT09IG51bGwgfHwgaXNOYU4obnVtYmVyKSB8fCBpc05hTihsZW5ndGgpKSB7XG4gICAgICByZXR1cm4gbnVtO1xuICAgIH1cblxuICAgIGxldCBudW1TdHJpbmcgPSBudW1iZXIudG9TdHJpbmcoKTtcblxuICAgIHdoaWxlIChudW1TdHJpbmcubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICBudW1TdHJpbmcgPSAnMCcgKyBudW1TdHJpbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bVN0cmluZztcbiAgfVxufVxuIl19