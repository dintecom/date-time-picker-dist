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
NumberFixedLenPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: NumberFixedLenPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
NumberFixedLenPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.0.0", ngImport: i0, type: NumberFixedLenPipe, name: "numberFixedLen" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0", ngImport: i0, type: NumberFixedLenPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'numberFixedLen',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyZWRGaXhMZW4ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY2tlci9zcmMvbGliL2RhdGUtdGltZS9udW1iZXJlZEZpeExlbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFNBQVMsQ0FBQyxHQUFXLEVBQUUsR0FBVztRQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFL0IsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEQsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVsQyxPQUFPLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1lBQ2hDLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDO1NBQzdCO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7K0dBaEJVLGtCQUFrQjs2R0FBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBSDlCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLGdCQUFnQjtpQkFDdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ251bWJlckZpeGVkTGVuJyxcbn0pXG5leHBvcnQgY2xhc3MgTnVtYmVyRml4ZWRMZW5QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShudW06IG51bWJlciwgbGVuOiBudW1iZXIpOiBzdHJpbmcgfCBudW1iZXIge1xuICAgIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IobnVtKTtcbiAgICBjb25zdCBsZW5ndGggPSBNYXRoLmZsb29yKGxlbik7XG5cbiAgICBpZiAobnVtID09PSBudWxsIHx8IGlzTmFOKG51bWJlcikgfHwgaXNOYU4obGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG5cbiAgICBsZXQgbnVtU3RyaW5nID0gbnVtYmVyLnRvU3RyaW5nKCk7XG5cbiAgICB3aGlsZSAobnVtU3RyaW5nLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgbnVtU3RyaW5nID0gJzAnICsgbnVtU3RyaW5nO1xuICAgIH1cblxuICAgIHJldHVybiBudW1TdHJpbmc7XG4gIH1cbn1cbiJdfQ==