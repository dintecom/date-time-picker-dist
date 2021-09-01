(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/cdk/a11y'), require('@angular/cdk/overlay'), require('rxjs'), require('@angular/cdk/portal'), require('@angular/cdk/keycodes'), require('@angular/cdk/coercion'), require('rxjs/operators'), require('@angular/animations'), require('@angular/forms'), require('@angular/cdk/platform'), require('moment')) :
    typeof define === 'function' && define.amd ? define('ng-pick-datetime', ['exports', '@angular/core', '@angular/common', '@angular/cdk/a11y', '@angular/cdk/overlay', 'rxjs', '@angular/cdk/portal', '@angular/cdk/keycodes', '@angular/cdk/coercion', 'rxjs/operators', '@angular/animations', '@angular/forms', '@angular/cdk/platform', 'moment'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ng-pick-datetime'] = {}, global.ng.core, global.ng.common, global.ng.cdk.a11y, global.ng.cdk.overlay, global.rxjs, global.ng.cdk.portal, global.ng.cdk.keycodes, global.ng.cdk.coercion, global.rxjs.operators, global.ng.animations, global.ng.forms, global.ng.cdk.platform, global.moment));
}(this, (function (exports, i0, i1, i1$1, i1$2, rxjs, i2, keycodes, coercion, operators, animations, forms, i1$3, importMoment) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1$2);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace$3 = /*#__PURE__*/_interopNamespace(i1$3);
    var importMoment__namespace = /*#__PURE__*/_interopNamespace(importMoment);

    /**
     * date-time-picker-trigger.directive
     */
    var OwlDateTimeTriggerDirective = /** @class */ (function () {
        function OwlDateTimeTriggerDirective(changeDetector) {
            this.changeDetector = changeDetector;
            this.stateChanges = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "disabled", {
            get: function () {
                return this._disabled === undefined
                    ? this.dtPicker.disabled
                    : !!this._disabled;
            },
            set: function (value) {
                this._disabled = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "owlDTTriggerDisabledClass", {
            get: function () {
                return this.disabled;
            },
            enumerable: false,
            configurable: true
        });
        OwlDateTimeTriggerDirective.prototype.ngOnInit = function () { };
        OwlDateTimeTriggerDirective.prototype.ngOnChanges = function (changes) {
            if (changes.datepicker) {
                this.watchStateChanges();
            }
        };
        OwlDateTimeTriggerDirective.prototype.ngAfterContentInit = function () {
            this.watchStateChanges();
        };
        OwlDateTimeTriggerDirective.prototype.ngOnDestroy = function () {
            this.stateChanges.unsubscribe();
        };
        OwlDateTimeTriggerDirective.prototype.handleClickOnHost = function (event) {
            if (this.dtPicker) {
                this.dtPicker.open();
                event.stopPropagation();
            }
        };
        OwlDateTimeTriggerDirective.prototype.watchStateChanges = function () {
            var _this = this;
            this.stateChanges.unsubscribe();
            var inputDisabled = this.dtPicker && this.dtPicker.dtInput
                ? this.dtPicker.dtInput.disabledChange
                : new rxjs.Subject();
            var pickerDisabled = this.dtPicker
                ? this.dtPicker.disabledChange
                : new rxjs.Subject();
            this.stateChanges = rxjs.merge(pickerDisabled, inputDisabled).subscribe(function () {
                _this.changeDetector.markForCheck();
            });
        };
        return OwlDateTimeTriggerDirective;
    }());
    OwlDateTimeTriggerDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeTriggerDirective, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    OwlDateTimeTriggerDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.3", type: OwlDateTimeTriggerDirective, selector: "[owlDateTimeTrigger]", inputs: { dtPicker: ["owlDateTimeTrigger", "dtPicker"], disabled: "disabled" }, host: { listeners: { "click": "handleClickOnHost($event)" }, properties: { "class.owl-dt-trigger-disabled": "owlDTTriggerDisabledClass" } }, usesOnChanges: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeTriggerDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[owlDateTimeTrigger]',
                        host: {
                            '(click)': 'handleClickOnHost($event)',
                            '[class.owl-dt-trigger-disabled]': 'owlDTTriggerDisabledClass'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { dtPicker: [{
                    type: i0.Input,
                    args: ['owlDateTimeTrigger']
                }], disabled: [{
                    type: i0.Input
                }] } });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    /**
     * date-time-format.class
     */
    /** InjectionToken for date time picker that can be used to override default format. */
    var OWL_DATE_TIME_FORMATS = new i0.InjectionToken('OWL_DATE_TIME_FORMATS');

    /**
     * date-time-picker-intl.service
     */
    var OwlDateTimeIntl = /** @class */ (function () {
        function OwlDateTimeIntl() {
            /**
             * Stream that emits whenever the labels here are changed. Use this to notify
             * components if the labels have changed after initialization.
             */
            this.changes = new rxjs.Subject();
            /** A label for the up second button (used by screen readers).  */
            this.upSecondLabel = 'Add a second';
            /** A label for the down second button (used by screen readers).  */
            this.downSecondLabel = 'Minus a second';
            /** A label for the up minute button (used by screen readers).  */
            this.upMinuteLabel = 'Add a minute';
            /** A label for the down minute button (used by screen readers).  */
            this.downMinuteLabel = 'Minus a minute';
            /** A label for the up hour button (used by screen readers).  */
            this.upHourLabel = 'Add a hour';
            /** A label for the down hour button (used by screen readers).  */
            this.downHourLabel = 'Minus a hour';
            /** A label for the previous month button (used by screen readers). */
            this.prevMonthLabel = 'Previous month';
            /** A label for the next month button (used by screen readers). */
            this.nextMonthLabel = 'Next month';
            /** A label for the previous year button (used by screen readers). */
            this.prevYearLabel = 'Previous year';
            /** A label for the next year button (used by screen readers). */
            this.nextYearLabel = 'Next year';
            /** A label for the previous multi-year button (used by screen readers). */
            this.prevMultiYearLabel = 'Previous 21 years';
            /** A label for the next multi-year button (used by screen readers). */
            this.nextMultiYearLabel = 'Next 21 years';
            /** A label for the 'switch to month view' button (used by screen readers). */
            this.switchToMonthViewLabel = 'Change to month view';
            /** A label for the 'switch to year view' button (used by screen readers). */
            this.switchToMultiYearViewLabel = 'Choose month and year';
            /** A label for the cancel button */
            this.cancelBtnLabel = 'Cancel';
            /** A label for the set button */
            this.setBtnLabel = 'Set';
            /** A label for the range 'from' in picker info */
            this.rangeFromLabel = 'From';
            /** A label for the range 'to' in picker info */
            this.rangeToLabel = 'To';
            /** A label for the hour12 button (AM) */
            this.hour12AMLabel = 'AM';
            /** A label for the hour12 button (PM) */
            this.hour12PMLabel = 'PM';
        }
        return OwlDateTimeIntl;
    }());
    OwlDateTimeIntl.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeIntl, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    OwlDateTimeIntl.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeIntl, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeIntl, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }] });

    /**
     * date-time-adapter.class
     */
    /** InjectionToken for date time picker that can be used to override default locale code. */
    var OWL_DATE_TIME_LOCALE = new i0.InjectionToken('OWL_DATE_TIME_LOCALE', {
        providedIn: 'root',
        factory: OWL_DATE_TIME_LOCALE_FACTORY
    });
    /** @docs-private */
    function OWL_DATE_TIME_LOCALE_FACTORY() {
        return i0.inject(i0.LOCALE_ID);
    }
    /** Provider for OWL_DATE_TIME_LOCALE injection token. */
    var OWL_DATE_TIME_LOCALE_PROVIDER = {
        provide: OWL_DATE_TIME_LOCALE,
        useExisting: i0.LOCALE_ID
    };
    var DateTimeAdapter = /** @class */ (function () {
        function DateTimeAdapter() {
            /** A stream that emits when the locale changes. */
            this._localeChanges = new rxjs.Subject();
            /** total milliseconds in a day. */
            this.millisecondsInDay = 86400000;
            /** total milliseconds in a minute. */
            this.milliseondsInMinute = 60000;
        }
        Object.defineProperty(DateTimeAdapter.prototype, "localeChanges", {
            get: function () {
                return this._localeChanges;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Compare two given dates
         * 1 if the first date is after the second,
         * -1 if the first date is before the second
         * 0 if dates are equal.
         */
        DateTimeAdapter.prototype.compare = function (first, second) {
            if (!this.isValid(first) || !this.isValid(second)) {
                throw Error('JSNativeDate: Cannot compare invalid dates.');
            }
            var dateFirst = this.clone(first);
            var dateSecond = this.clone(second);
            var diff = this.getTime(dateFirst) - this.getTime(dateSecond);
            if (diff < 0) {
                return -1;
            }
            else if (diff > 0) {
                return 1;
            }
            else {
                // Return 0 if diff is 0; return NaN if diff is NaN
                return diff;
            }
        };
        /**
         * Check if two given dates are in the same year
         * 1 if the first date's year is after the second,
         * -1 if the first date's year is before the second
         * 0 if two given dates are in the same year
         */
        DateTimeAdapter.prototype.compareYear = function (first, second) {
            if (!this.isValid(first) || !this.isValid(second)) {
                throw Error('JSNativeDate: Cannot compare invalid dates.');
            }
            var yearLeft = this.getYear(first);
            var yearRight = this.getYear(second);
            var diff = yearLeft - yearRight;
            if (diff < 0) {
                return -1;
            }
            else if (diff > 0) {
                return 1;
            }
            else {
                return 0;
            }
        };
        /**
         * Attempts to deserialize a value to a valid date object. This is different from parsing in that
         * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
         * string). The default implementation does not allow any deserialization, it simply checks that
         * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
         * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
         * support passing values from your backend directly to these properties by overriding this method
         * to also deserialize the format used by your backend.
         */
        DateTimeAdapter.prototype.deserialize = function (value) {
            if (value == null ||
                (this.isDateInstance(value) && this.isValid(value))) {
                return value;
            }
            return this.invalid();
        };
        /**
         * Get the locale used for all dates.
         */
        DateTimeAdapter.prototype.getLocale = function () {
            return this.locale;
        };
        /**
         * Sets the locale used for all dates.
         */
        DateTimeAdapter.prototype.setLocale = function (locale) {
            this.locale = locale;
            this._localeChanges.next(locale);
        };
        /**
         * Clamp the given date between min and max dates.
         */
        DateTimeAdapter.prototype.clampDate = function (date, min, max) {
            if (min && this.compare(date, min) < 0) {
                return min;
            }
            if (max && this.compare(date, max) > 0) {
                return max;
            }
            return date;
        };
        return DateTimeAdapter;
    }());

    /**
     * calendar-body.component
     */
    var CalendarCell = /** @class */ (function () {
        function CalendarCell(value, displayValue, ariaLabel, enabled, out, cellClass) {
            if (out === void 0) { out = false; }
            if (cellClass === void 0) { cellClass = ''; }
            this.value = value;
            this.displayValue = displayValue;
            this.ariaLabel = ariaLabel;
            this.enabled = enabled;
            this.out = out;
            this.cellClass = cellClass;
        }
        return CalendarCell;
    }());
    var OwlCalendarBodyComponent = /** @class */ (function () {
        function OwlCalendarBodyComponent(elmRef, ngZone) {
            this.elmRef = elmRef;
            this.ngZone = ngZone;
            /**
             * The cell number of the active cell in the table.
             */
            this.activeCell = 0;
            /**
             * The number of columns in the table.
             */
            this.numCols = 7;
            /**
             * The ratio (width / height) to use for the cells in the table.
             */
            this.cellRatio = 1;
            /**
             * Emit when a calendar cell is selected
             */
            this.select = new i0.EventEmitter();
        }
        Object.defineProperty(OwlCalendarBodyComponent.prototype, "owlDTCalendarBodyClass", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarBodyComponent.prototype, "isInSingleMode", {
            get: function () {
                return this.selectMode === 'single';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarBodyComponent.prototype, "isInRangeMode", {
            get: function () {
                return (this.selectMode === 'range' ||
                    this.selectMode === 'rangeFrom' ||
                    this.selectMode === 'rangeTo');
            },
            enumerable: false,
            configurable: true
        });
        OwlCalendarBodyComponent.prototype.ngOnInit = function () { };
        OwlCalendarBodyComponent.prototype.selectCell = function (cell) {
            this.select.emit(cell);
        };
        OwlCalendarBodyComponent.prototype.isActiveCell = function (rowIndex, colIndex) {
            var cellNumber = rowIndex * this.numCols + colIndex;
            return cellNumber === this.activeCell;
        };
        /**
         * Check if the cell is selected
         */
        OwlCalendarBodyComponent.prototype.isSelected = function (value) {
            if (!this.selectedValues || this.selectedValues.length === 0) {
                return false;
            }
            if (this.isInSingleMode) {
                return value === this.selectedValues[0];
            }
            if (this.isInRangeMode) {
                var fromValue = this.selectedValues[0];
                var toValue = this.selectedValues[1];
                return value === fromValue || value === toValue;
            }
            return false;
        };
        /**
         * Check if the cell in the range
         */
        OwlCalendarBodyComponent.prototype.isInRange = function (value) {
            if (this.isInRangeMode) {
                var fromValue = this.selectedValues[0];
                var toValue = this.selectedValues[1];
                if (fromValue !== null && toValue !== null) {
                    return value >= fromValue && value <= toValue;
                }
                else {
                    return value === fromValue || value === toValue;
                }
            }
            return false;
        };
        /**
         * Check if the cell is the range from
         */
        OwlCalendarBodyComponent.prototype.isRangeFrom = function (value) {
            if (this.isInRangeMode) {
                var fromValue = this.selectedValues[0];
                return fromValue !== null && value === fromValue;
            }
            return false;
        };
        /**
         * Check if the cell is the range to
         */
        OwlCalendarBodyComponent.prototype.isRangeTo = function (value) {
            if (this.isInRangeMode) {
                var toValue = this.selectedValues[1];
                return toValue !== null && value === toValue;
            }
            return false;
        };
        /**
         * Focus to a active cell
         */
        OwlCalendarBodyComponent.prototype.focusActiveCell = function () {
            var _this = this;
            this.ngZone.runOutsideAngular(function () {
                _this.ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1))
                    .subscribe(function () {
                    _this.elmRef.nativeElement
                        .querySelector('.owl-dt-calendar-cell-active')
                        .focus();
                });
            });
        };
        return OwlCalendarBodyComponent;
    }());
    OwlCalendarBodyComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlCalendarBodyComponent, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Component });
    OwlCalendarBodyComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: OwlCalendarBodyComponent, selector: "[owl-date-time-calendar-body]", inputs: { activeCell: "activeCell", rows: "rows", numCols: "numCols", cellRatio: "cellRatio", todayValue: "todayValue", selectedValues: "selectedValues", selectMode: "selectMode" }, outputs: { select: "select" }, host: { properties: { "class.owl-dt-calendar-body": "owlDTCalendarBodyClass" } }, exportAs: ["owlDateTimeCalendarBody"], ngImport: i0__namespace, template: "<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n    <td\n        *ngFor=\"let item of row; let colIndex = index\"\n        class=\"owl-dt-calendar-cell {{ item.cellClass }}\"\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n        [class.owl-dt-calendar-cell-active]=\"isActiveCell(rowIndex, colIndex)\"\n        [class.owl-dt-calendar-cell-disabled]=\"!item.enabled\"\n        [class.owl-dt-calendar-cell-in-range]=\"isInRange(item.value)\"\n        [class.owl-dt-calendar-cell-range-from]=\"isRangeFrom(item.value)\"\n        [class.owl-dt-calendar-cell-range-to]=\"isRangeTo(item.value)\"\n        [attr.aria-label]=\"item.ariaLabel\"\n        [attr.aria-disabled]=\"!item.enabled || null\"\n        [style.width.%]=\"100 / numCols\"\n        [style.paddingTop.%]=\"(50 * cellRatio) / numCols\"\n        [style.paddingBottom.%]=\"(50 * cellRatio) / numCols\"\n        (click)=\"selectCell(item)\"\n    >\n        <span\n            class=\"owl-dt-calendar-cell-content\"\n            [ngClass]=\"{\n                'owl-dt-calendar-cell-out': item.out,\n                'owl-dt-calendar-cell-today': item.value === todayValue,\n                'owl-dt-calendar-cell-selected': isSelected(item.value)\n            }\"\n        >\n            {{ item.displayValue }}\n        </span>\n    </td>\n</tr>\n", directives: [{ type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlCalendarBodyComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: '[owl-date-time-calendar-body]',
                        exportAs: 'owlDateTimeCalendarBody',
                        templateUrl: './calendar-body.component.html',
                        host: {
                            '[class.owl-dt-calendar-body]': 'owlDTCalendarBodyClass'
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }]; }, propDecorators: { activeCell: [{
                    type: i0.Input
                }], rows: [{
                    type: i0.Input
                }], numCols: [{
                    type: i0.Input
                }], cellRatio: [{
                    type: i0.Input
                }], todayValue: [{
                    type: i0.Input
                }], selectedValues: [{
                    type: i0.Input
                }], selectMode: [{
                    type: i0.Input
                }], select: [{
                    type: i0.Output
                }] } });

    /**
     * calendar-month-view.component
     */
    var DAYS_PER_WEEK = 7;
    var WEEKS_PER_VIEW = 6;
    var OwlMonthViewComponent = /** @class */ (function () {
        function OwlMonthViewComponent(cdRef, dateTimeAdapter, dateTimeFormats) {
            this.cdRef = cdRef;
            this.dateTimeAdapter = dateTimeAdapter;
            this.dateTimeFormats = dateTimeFormats;
            /**
             * Whether to hide dates in other months at the start or end of the current month.
             */
            this.hideOtherMonths = false;
            /**
             * Define the first day of a week
             * Sunday: 0 - Saturday: 6
             */
            this._firstDayOfWeek = i1.getLocaleFirstDayOfWeek(this.dateTimeAdapter.getLocale());
            /**
             * The select mode of the picker;
             */
            this._selectMode = 'single';
            this._selecteds = [];
            this.isDefaultFirstDayOfWeek = true;
            this.localeSub = rxjs.Subscription.EMPTY;
            this.initiated = false;
            /**
             * An array to hold all selectedDates' value
             * the value is the day number in current month
             */
            this.selectedDates = [];
            /**
             * Callback to invoke when a new date is selected
             */
            this.selectedChange = new i0.EventEmitter();
            /**
             * Callback to invoke when any date is selected.
             */
            this.userSelection = new i0.EventEmitter();
            /** Emits when any date is activated. */
            this.pickerMomentChange = new i0.EventEmitter();
        }
        Object.defineProperty(OwlMonthViewComponent.prototype, "firstDayOfWeek", {
            get: function () {
                return this._firstDayOfWeek;
            },
            set: function (value) {
                if (value >= 0 && value <= 6 && value !== this._firstDayOfWeek) {
                    this._firstDayOfWeek = value;
                    this.isDefaultFirstDayOfWeek = false;
                    if (this.initiated) {
                        this.generateWeekDays();
                        this.generateCalendar();
                        this.cdRef.markForCheck();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "selectMode", {
            get: function () {
                return this._selectMode;
            },
            set: function (val) {
                this._selectMode = val;
                if (this.initiated) {
                    this.generateCalendar();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                var oldSelected = this._selected;
                value = this.dateTimeAdapter.deserialize(value);
                this._selected = this.getValidDate(value);
                if (!this.dateTimeAdapter.isSameDay(oldSelected, this._selected)) {
                    this.setSelectedDates();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "selecteds", {
            get: function () {
                return this._selecteds;
            },
            set: function (values) {
                var _this = this;
                this._selecteds = values.map(function (v) {
                    v = _this.dateTimeAdapter.deserialize(v);
                    return _this.getValidDate(v);
                });
                this.setSelectedDates();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "pickerMoment", {
            get: function () {
                return this._pickerMoment;
            },
            set: function (value) {
                var oldMoment = this._pickerMoment;
                value = this.dateTimeAdapter.deserialize(value);
                this._pickerMoment =
                    this.getValidDate(value) || this.dateTimeAdapter.now();
                this.firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this._pickerMoment), this.dateTimeAdapter.getMonth(this._pickerMoment), 1);
                if (!this.isSameMonth(oldMoment, this._pickerMoment) &&
                    this.initiated) {
                    this.generateCalendar();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "dateFilter", {
            get: function () {
                return this._dateFilter;
            },
            set: function (filter) {
                this._dateFilter = filter;
                if (this.initiated) {
                    this.generateCalendar();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "minDate", {
            get: function () {
                return this._minDate;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._minDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateCalendar();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "maxDate", {
            get: function () {
                return this._maxDate;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._maxDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateCalendar();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "weekdays", {
            get: function () {
                return this._weekdays;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "days", {
            get: function () {
                return this._days;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "activeCell", {
            get: function () {
                if (this.pickerMoment) {
                    return (this.dateTimeAdapter.getDate(this.pickerMoment) +
                        this.firstRowOffset -
                        1);
                }
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "isInSingleMode", {
            get: function () {
                return this.selectMode === 'single';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "isInRangeMode", {
            get: function () {
                return (this.selectMode === 'range' ||
                    this.selectMode === 'rangeFrom' ||
                    this.selectMode === 'rangeTo');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "owlDTCalendarView", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        OwlMonthViewComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.generateWeekDays();
            this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(function (locale) {
                _this.generateWeekDays();
                _this.generateCalendar();
                _this.firstDayOfWeek = _this.isDefaultFirstDayOfWeek
                    ? i1.getLocaleFirstDayOfWeek(locale)
                    : _this.firstDayOfWeek;
                _this.cdRef.markForCheck();
            });
        };
        OwlMonthViewComponent.prototype.ngAfterContentInit = function () {
            this.generateCalendar();
            this.initiated = true;
        };
        OwlMonthViewComponent.prototype.ngOnDestroy = function () {
            this.localeSub.unsubscribe();
        };
        /**
         * Handle a calendarCell selected
         */
        OwlMonthViewComponent.prototype.selectCalendarCell = function (cell) {
            // Cases in which the date would not be selected
            // 1, the calendar cell is NOT enabled (is NOT valid)
            // 2, the selected date is NOT in current picker's month and the hideOtherMonths is enabled
            if (!cell.enabled || (this.hideOtherMonths && cell.out)) {
                return;
            }
            this.selectDate(cell.value);
        };
        /**
         * Handle a new date selected
         */
        OwlMonthViewComponent.prototype.selectDate = function (date) {
            var daysDiff = date - 1;
            var selected = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
            this.selectedChange.emit(selected);
            this.userSelection.emit();
        };
        /**
         * Handle keydown event on calendar body
         */
        OwlMonthViewComponent.prototype.handleCalendarKeydown = function (event) {
            var moment;
            switch (event.keyCode) {
                // minus 1 day
                case keycodes.LEFT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 day
                case keycodes.RIGHT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 1 week
                case keycodes.UP_ARROW:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -7);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 week
                case keycodes.DOWN_ARROW:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 7);
                    this.pickerMomentChange.emit(moment);
                    break;
                // move to first day of current month
                case keycodes.HOME:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1 - this.dateTimeAdapter.getDate(this.pickerMoment));
                    this.pickerMomentChange.emit(moment);
                    break;
                // move to last day of current month
                case keycodes.END:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment) -
                        this.dateTimeAdapter.getDate(this.pickerMoment));
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 1 month (or 1 year)
                case keycodes.PAGE_UP:
                    moment = event.altKey
                        ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1)
                        : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 month (or 1 year)
                case keycodes.PAGE_DOWN:
                    moment = event.altKey
                        ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1)
                        : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // select the pickerMoment
                case keycodes.ENTER:
                    if (!this.dateFilter || this.dateFilter(this.pickerMoment)) {
                        this.selectDate(this.dateTimeAdapter.getDate(this.pickerMoment));
                    }
                    break;
                default:
                    return;
            }
            this.focusActiveCell();
            event.preventDefault();
        };
        /**
         * Generate the calendar weekdays array
         */
        OwlMonthViewComponent.prototype.generateWeekDays = function () {
            var longWeekdays = this.dateTimeAdapter.getDayOfWeekNames('long');
            var shortWeekdays = this.dateTimeAdapter.getDayOfWeekNames('short');
            var narrowWeekdays = this.dateTimeAdapter.getDayOfWeekNames('narrow');
            var firstDayOfWeek = this.firstDayOfWeek;
            var weekdays = longWeekdays.map(function (long, i) {
                return { long: long, short: shortWeekdays[i], narrow: narrowWeekdays[i] };
            });
            this._weekdays = weekdays
                .slice(firstDayOfWeek)
                .concat(weekdays.slice(0, firstDayOfWeek));
            this.dateNames = this.dateTimeAdapter.getDateNames();
            return;
        };
        /**
         * Generate the calendar days array
         */
        OwlMonthViewComponent.prototype.generateCalendar = function () {
            if (!this.pickerMoment) {
                return;
            }
            this.todayDate = null;
            // the first weekday of the month
            var startWeekdayOfMonth = this.dateTimeAdapter.getDay(this.firstDateOfMonth);
            var firstDayOfWeek = this.firstDayOfWeek;
            // the amount of days from the first date of the month
            // if it is < 0, it means the date is in previous month
            var daysDiff = 0 -
                ((startWeekdayOfMonth + (DAYS_PER_WEEK - firstDayOfWeek)) %
                    DAYS_PER_WEEK);
            // the index of cell that contains the first date of the month
            this.firstRowOffset = Math.abs(daysDiff);
            this._days = [];
            for (var i = 0; i < WEEKS_PER_VIEW; i++) {
                var week = [];
                for (var j = 0; j < DAYS_PER_WEEK; j++) {
                    var date = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
                    var dateCell = this.createDateCell(date, daysDiff);
                    // check if the date is today
                    if (this.dateTimeAdapter.isSameDay(this.dateTimeAdapter.now(), date)) {
                        this.todayDate = daysDiff + 1;
                    }
                    week.push(dateCell);
                    daysDiff += 1;
                }
                this._days.push(week);
            }
            this.setSelectedDates();
        };
        /**
         * Creates CalendarCell for days.
         */
        OwlMonthViewComponent.prototype.createDateCell = function (date, daysDiff) {
            // total days of the month
            var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment);
            var dateNum = this.dateTimeAdapter.getDate(date);
            // const dateName = this.dateNames[dateNum - 1];
            var dateName = dateNum.toString();
            var ariaLabel = this.dateTimeAdapter.format(date, this.dateTimeFormats.dateA11yLabel);
            // check if the date if selectable
            var enabled = this.isDateEnabled(date);
            // check if date is not in current month
            var dayValue = daysDiff + 1;
            var out = dayValue < 1 || dayValue > daysInMonth;
            var cellClass = 'owl-dt-day-' + this.dateTimeAdapter.getDay(date);
            return new CalendarCell(dayValue, dateName, ariaLabel, enabled, out, cellClass);
        };
        /**
         * Check if the date is valid
         */
        OwlMonthViewComponent.prototype.isDateEnabled = function (date) {
            return (!!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate ||
                    this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
                (!this.maxDate ||
                    this.dateTimeAdapter.compare(date, this.maxDate) <= 0));
        };
        /**
         * Get a valid date object
         */
        OwlMonthViewComponent.prototype.getValidDate = function (obj) {
            return this.dateTimeAdapter.isDateInstance(obj) &&
                this.dateTimeAdapter.isValid(obj)
                ? obj
                : null;
        };
        /**
         * Check if the give dates are none-null and in the same month
         */
        OwlMonthViewComponent.prototype.isSameMonth = function (dateLeft, dateRight) {
            return !!(dateLeft &&
                dateRight &&
                this.dateTimeAdapter.isValid(dateLeft) &&
                this.dateTimeAdapter.isValid(dateRight) &&
                this.dateTimeAdapter.getYear(dateLeft) ===
                    this.dateTimeAdapter.getYear(dateRight) &&
                this.dateTimeAdapter.getMonth(dateLeft) ===
                    this.dateTimeAdapter.getMonth(dateRight));
        };
        /**
         * Set the selectedDates value.
         * In single mode, it has only one value which represent the selected date
         * In range mode, it would has two values, one for the fromValue and the other for the toValue
         */
        OwlMonthViewComponent.prototype.setSelectedDates = function () {
            var _this = this;
            this.selectedDates = [];
            if (!this.firstDateOfMonth) {
                return;
            }
            if (this.isInSingleMode && this.selected) {
                var dayDiff = this.dateTimeAdapter.differenceInCalendarDays(this.selected, this.firstDateOfMonth);
                this.selectedDates[0] = dayDiff + 1;
                return;
            }
            if (this.isInRangeMode && this.selecteds) {
                this.selectedDates = this.selecteds.map(function (selected) {
                    if (_this.dateTimeAdapter.isValid(selected)) {
                        var dayDiff = _this.dateTimeAdapter.differenceInCalendarDays(selected, _this.firstDateOfMonth);
                        return dayDiff + 1;
                    }
                    else {
                        return null;
                    }
                });
            }
        };
        OwlMonthViewComponent.prototype.focusActiveCell = function () {
            this.calendarBodyElm.focusActiveCell();
        };
        return OwlMonthViewComponent;
    }());
    OwlMonthViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlMonthViewComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    OwlMonthViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: OwlMonthViewComponent, selector: "owl-date-time-month-view", inputs: { hideOtherMonths: "hideOtherMonths", firstDayOfWeek: "firstDayOfWeek", selectMode: "selectMode", selected: "selected", selecteds: "selecteds", pickerMoment: "pickerMoment", dateFilter: "dateFilter", minDate: "minDate", maxDate: "maxDate" }, outputs: { selectedChange: "selectedChange", userSelection: "userSelection", pickerMomentChange: "pickerMomentChange" }, host: { properties: { "class.owl-dt-calendar-view": "owlDTCalendarView" } }, viewQueries: [{ propertyName: "calendarBodyElm", first: true, predicate: OwlCalendarBodyComponent, descendants: true, static: true }], exportAs: ["owlYearView"], ngImport: i0__namespace, template: "<table\n    class=\"owl-dt-calendar-table owl-dt-calendar-month-table\"\n    [class.owl-dt-calendar-only-current-month]=\"hideOtherMonths\"\n>\n    <thead class=\"owl-dt-calendar-header\">\n        <tr class=\"owl-dt-weekdays\">\n            <th\n                *ngFor=\"let weekday of weekdays\"\n                [attr.aria-label]=\"weekday.long\"\n                class=\"owl-dt-weekday\"\n                scope=\"col\"\n            >\n                <span>{{ weekday.short }}</span>\n            </th>\n        </tr>\n        <tr>\n            <th\n                class=\"owl-dt-calendar-table-divider\"\n                aria-hidden=\"true\"\n                colspan=\"7\"\n            ></th>\n        </tr>\n    </thead>\n    <tbody\n        owl-date-time-calendar-body\n        role=\"grid\"\n        [rows]=\"days\"\n        [todayValue]=\"todayDate\"\n        [selectedValues]=\"selectedDates\"\n        [selectMode]=\"selectMode\"\n        [activeCell]=\"activeCell\"\n        (keydown)=\"handleCalendarKeydown($event)\"\n        (select)=\"selectCalendarCell($event)\"\n    ></tbody>\n</table>\n", components: [{ type: OwlCalendarBodyComponent, selector: "[owl-date-time-calendar-body]", inputs: ["activeCell", "rows", "numCols", "cellRatio", "todayValue", "selectedValues", "selectMode"], outputs: ["select"], exportAs: ["owlDateTimeCalendarBody"] }], directives: [{ type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlMonthViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'owl-date-time-month-view',
                        exportAs: 'owlYearView',
                        templateUrl: './calendar-month-view.component.html',
                        host: {
                            '[class.owl-dt-calendar-view]': 'owlDTCalendarView'
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ChangeDetectorRef }, { type: DateTimeAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [OWL_DATE_TIME_FORMATS]
                        }] }];
        }, propDecorators: { hideOtherMonths: [{
                    type: i0.Input
                }], firstDayOfWeek: [{
                    type: i0.Input
                }], selectMode: [{
                    type: i0.Input
                }], selected: [{
                    type: i0.Input
                }], selecteds: [{
                    type: i0.Input
                }], pickerMoment: [{
                    type: i0.Input
                }], dateFilter: [{
                    type: i0.Input
                }], minDate: [{
                    type: i0.Input
                }], maxDate: [{
                    type: i0.Input
                }], selectedChange: [{
                    type: i0.Output
                }], userSelection: [{
                    type: i0.Output
                }], pickerMomentChange: [{
                    type: i0.Output
                }], calendarBodyElm: [{
                    type: i0.ViewChild,
                    args: [OwlCalendarBodyComponent, { static: true }]
                }] } });

    /**
     * calendar-year-view.component
     */
    var MONTHS_PER_YEAR = 12;
    var MONTHS_PER_ROW = 3;
    var OwlYearViewComponent = /** @class */ (function () {
        function OwlYearViewComponent(cdRef, dateTimeAdapter, dateTimeFormats) {
            this.cdRef = cdRef;
            this.dateTimeAdapter = dateTimeAdapter;
            this.dateTimeFormats = dateTimeFormats;
            /**
             * The select mode of the picker;
             */
            this._selectMode = 'single';
            this._selecteds = [];
            this.localeSub = rxjs.Subscription.EMPTY;
            this.initiated = false;
            /**
             * An array to hold all selectedDates' month value
             * the value is the month number in current year
             */
            this.selectedMonths = [];
            /**
             * Callback to invoke when a new month is selected
             */
            this.change = new i0.EventEmitter();
            /**
             * Emits the selected year. This doesn't imply a change on the selected date
             */
            this.monthSelected = new i0.EventEmitter();
            /** Emits when any date is activated. */
            this.pickerMomentChange = new i0.EventEmitter();
            /** Emits when use keyboard enter to select a calendar cell */
            this.keyboardEnter = new i0.EventEmitter();
            this.monthNames = this.dateTimeAdapter.getMonthNames('short');
        }
        Object.defineProperty(OwlYearViewComponent.prototype, "selectMode", {
            get: function () {
                return this._selectMode;
            },
            set: function (val) {
                this._selectMode = val;
                if (this.initiated) {
                    this.generateMonthList();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._selected = this.getValidDate(value);
                this.setSelectedMonths();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "selecteds", {
            get: function () {
                return this._selecteds;
            },
            set: function (values) {
                this._selecteds = [];
                for (var i = 0; i < values.length; i++) {
                    var value = this.dateTimeAdapter.deserialize(values[i]);
                    this._selecteds.push(this.getValidDate(value));
                }
                this.setSelectedMonths();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "pickerMoment", {
            get: function () {
                return this._pickerMoment;
            },
            set: function (value) {
                var oldMoment = this._pickerMoment;
                value = this.dateTimeAdapter.deserialize(value);
                this._pickerMoment =
                    this.getValidDate(value) || this.dateTimeAdapter.now();
                if (!this.hasSameYear(oldMoment, this._pickerMoment) &&
                    this.initiated) {
                    this.generateMonthList();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "dateFilter", {
            get: function () {
                return this._dateFilter;
            },
            set: function (filter) {
                this._dateFilter = filter;
                if (this.initiated) {
                    this.generateMonthList();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "minDate", {
            get: function () {
                return this._minDate;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._minDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateMonthList();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "maxDate", {
            get: function () {
                return this._maxDate;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._maxDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateMonthList();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "months", {
            get: function () {
                return this._months;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "activeCell", {
            get: function () {
                if (this._pickerMoment) {
                    return this.dateTimeAdapter.getMonth(this._pickerMoment);
                }
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "isInSingleMode", {
            get: function () {
                return this.selectMode === 'single';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "isInRangeMode", {
            get: function () {
                return (this.selectMode === 'range' ||
                    this.selectMode === 'rangeFrom' ||
                    this.selectMode === 'rangeTo');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "owlDTCalendarView", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        OwlYearViewComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(function () {
                _this.generateMonthList();
                _this.cdRef.markForCheck();
            });
        };
        OwlYearViewComponent.prototype.ngAfterContentInit = function () {
            this.generateMonthList();
            this.initiated = true;
        };
        OwlYearViewComponent.prototype.ngOnDestroy = function () {
            this.localeSub.unsubscribe();
        };
        /**
         * Handle a calendarCell selected
         */
        OwlYearViewComponent.prototype.selectCalendarCell = function (cell) {
            this.selectMonth(cell.value);
        };
        /**
         * Handle a new month selected
         */
        OwlYearViewComponent.prototype.selectMonth = function (month) {
            var firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
            this.monthSelected.emit(firstDateOfMonth);
            var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
            var result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
            this.change.emit(result);
        };
        /**
         * Handle keydown event on calendar body
         */
        OwlYearViewComponent.prototype.handleCalendarKeydown = function (event) {
            var moment;
            switch (event.keyCode) {
                // minus 1 month
                case keycodes.LEFT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 month
                case keycodes.RIGHT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 3 months
                case keycodes.UP_ARROW:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -3);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 3 months
                case keycodes.DOWN_ARROW:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 3);
                    this.pickerMomentChange.emit(moment);
                    break;
                // move to first month of current year
                case keycodes.HOME:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -this.dateTimeAdapter.getMonth(this.pickerMoment));
                    this.pickerMomentChange.emit(moment);
                    break;
                // move to last month of current year
                case keycodes.END:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 11 - this.dateTimeAdapter.getMonth(this.pickerMoment));
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 1 year (or 10 year)
                case keycodes.PAGE_UP:
                    moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? -10 : -1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 year (or 10 year)
                case keycodes.PAGE_DOWN:
                    moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? 10 : 1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // Select current month
                case keycodes.ENTER:
                    this.selectMonth(this.dateTimeAdapter.getMonth(this.pickerMoment));
                    this.keyboardEnter.emit();
                    break;
                default:
                    return;
            }
            this.focusActiveCell();
            event.preventDefault();
        };
        /**
         * Generate the calendar month list
         */
        OwlYearViewComponent.prototype.generateMonthList = function () {
            if (!this.pickerMoment) {
                return;
            }
            this.setSelectedMonths();
            this.todayMonth = this.getMonthInCurrentYear(this.dateTimeAdapter.now());
            this._months = [];
            for (var i = 0; i < MONTHS_PER_YEAR / MONTHS_PER_ROW; i++) {
                var row = [];
                for (var j = 0; j < MONTHS_PER_ROW; j++) {
                    var month = j + i * MONTHS_PER_ROW;
                    var monthCell = this.createMonthCell(month);
                    row.push(monthCell);
                }
                this._months.push(row);
            }
            return;
        };
        /**
         * Creates an CalendarCell for the given month.
         */
        OwlYearViewComponent.prototype.createMonthCell = function (month) {
            var startDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
            var ariaLabel = this.dateTimeAdapter.format(startDateOfMonth, this.dateTimeFormats.monthYearA11yLabel);
            var cellClass = 'owl-dt-month-' + month;
            return new CalendarCell(month, this.monthNames[month], ariaLabel, this.isMonthEnabled(month), false, cellClass);
        };
        /**
         * Check if the given month is enable
         */
        OwlYearViewComponent.prototype.isMonthEnabled = function (month) {
            var firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
            // If any date in the month is selectable,
            // we count the month as enable
            for (var date = firstDateOfMonth; this.dateTimeAdapter.getMonth(date) === month; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
                if (!!date &&
                    (!this.dateFilter || this.dateFilter(date)) &&
                    (!this.minDate ||
                        this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
                    (!this.maxDate ||
                        this.dateTimeAdapter.compare(date, this.maxDate) <= 0)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Gets the month in this year that the given Date falls on.
         * Returns null if the given Date is in another year.
         */
        OwlYearViewComponent.prototype.getMonthInCurrentYear = function (date) {
            if (this.getValidDate(date) && this.getValidDate(this._pickerMoment)) {
                var result = this.dateTimeAdapter.compareYear(date, this._pickerMoment);
                // < 0 : the given date's year is before pickerMoment's year, we return -1 as selected month value.
                // > 0 : the given date's year is after pickerMoment's year, we return 12 as selected month value.
                // 0 : the give date's year is same as the pickerMoment's year, we return the actual month value.
                if (result < 0) {
                    return -1;
                }
                else if (result > 0) {
                    return 12;
                }
                else {
                    return this.dateTimeAdapter.getMonth(date);
                }
            }
            else {
                return null;
            }
        };
        /**
         * Set the selectedMonths value
         * In single mode, it has only one value which represent the month the selected date in
         * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
         */
        OwlYearViewComponent.prototype.setSelectedMonths = function () {
            this.selectedMonths = [];
            if (this.isInSingleMode && this.selected) {
                this.selectedMonths[0] = this.getMonthInCurrentYear(this.selected);
            }
            if (this.isInRangeMode && this.selecteds) {
                this.selectedMonths[0] = this.getMonthInCurrentYear(this.selecteds[0]);
                this.selectedMonths[1] = this.getMonthInCurrentYear(this.selecteds[1]);
            }
        };
        /**
         * Check the given dates are in the same year
         */
        OwlYearViewComponent.prototype.hasSameYear = function (dateLeft, dateRight) {
            return !!(dateLeft &&
                dateRight &&
                this.dateTimeAdapter.getYear(dateLeft) ===
                    this.dateTimeAdapter.getYear(dateRight));
        };
        /**
         * Get a valid date object
         */
        OwlYearViewComponent.prototype.getValidDate = function (obj) {
            return this.dateTimeAdapter.isDateInstance(obj) &&
                this.dateTimeAdapter.isValid(obj)
                ? obj
                : null;
        };
        OwlYearViewComponent.prototype.focusActiveCell = function () {
            this.calendarBodyElm.focusActiveCell();
        };
        return OwlYearViewComponent;
    }());
    OwlYearViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlYearViewComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    OwlYearViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: OwlYearViewComponent, selector: "owl-date-time-year-view", inputs: { selectMode: "selectMode", selected: "selected", selecteds: "selecteds", pickerMoment: "pickerMoment", dateFilter: "dateFilter", minDate: "minDate", maxDate: "maxDate" }, outputs: { change: "change", monthSelected: "monthSelected", pickerMomentChange: "pickerMomentChange", keyboardEnter: "keyboardEnter" }, host: { properties: { "class.owl-dt-calendar-view": "owlDTCalendarView" } }, viewQueries: [{ propertyName: "calendarBodyElm", first: true, predicate: OwlCalendarBodyComponent, descendants: true, static: true }], exportAs: ["owlMonthView"], ngImport: i0__namespace, template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-year-table\">\n    <thead class=\"owl-dt-calendar-header\">\n        <tr>\n            <th\n                class=\"owl-dt-calendar-table-divider\"\n                aria-hidden=\"true\"\n                colspan=\"3\"\n            ></th>\n        </tr>\n    </thead>\n    <tbody\n        owl-date-time-calendar-body\n        role=\"grid\"\n        [rows]=\"months\"\n        [numCols]=\"3\"\n        [cellRatio]=\"3 / 7\"\n        [activeCell]=\"activeCell\"\n        [todayValue]=\"todayMonth\"\n        [selectedValues]=\"selectedMonths\"\n        [selectMode]=\"selectMode\"\n        (keydown)=\"handleCalendarKeydown($event)\"\n        (select)=\"selectCalendarCell($event)\"\n    ></tbody>\n</table>\n", components: [{ type: OwlCalendarBodyComponent, selector: "[owl-date-time-calendar-body]", inputs: ["activeCell", "rows", "numCols", "cellRatio", "todayValue", "selectedValues", "selectMode"], outputs: ["select"], exportAs: ["owlDateTimeCalendarBody"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlYearViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'owl-date-time-year-view',
                        exportAs: 'owlMonthView',
                        templateUrl: './calendar-year-view.component.html',
                        host: {
                            '[class.owl-dt-calendar-view]': 'owlDTCalendarView'
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ChangeDetectorRef }, { type: DateTimeAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [OWL_DATE_TIME_FORMATS]
                        }] }];
        }, propDecorators: { selectMode: [{
                    type: i0.Input
                }], selected: [{
                    type: i0.Input
                }], selecteds: [{
                    type: i0.Input
                }], pickerMoment: [{
                    type: i0.Input
                }], dateFilter: [{
                    type: i0.Input
                }], minDate: [{
                    type: i0.Input
                }], maxDate: [{
                    type: i0.Input
                }], change: [{
                    type: i0.Output
                }], monthSelected: [{
                    type: i0.Output
                }], pickerMomentChange: [{
                    type: i0.Output
                }], keyboardEnter: [{
                    type: i0.Output
                }], calendarBodyElm: [{
                    type: i0.ViewChild,
                    args: [OwlCalendarBodyComponent, { static: true }]
                }] } });

    /**
     * calendar-multi-year-view.component
     */
    var YEARS_PER_ROW = 3;
    var YEAR_ROWS = 7;
    var OwlMultiYearViewComponent = /** @class */ (function () {
        function OwlMultiYearViewComponent(cdRef, pickerIntl, dateTimeAdapter) {
            this.cdRef = cdRef;
            this.pickerIntl = pickerIntl;
            this.dateTimeAdapter = dateTimeAdapter;
            /**
             * The select mode of the picker;
             */
            this._selectMode = 'single';
            this._selecteds = [];
            this.initiated = false;
            /**
             * Callback to invoke when a new month is selected
             */
            this.change = new i0.EventEmitter();
            /**
             * Emits the selected year. This doesn't imply a change on the selected date
             */
            this.yearSelected = new i0.EventEmitter();
            /** Emits when any date is activated. */
            this.pickerMomentChange = new i0.EventEmitter();
            /** Emits when use keyboard enter to select a calendar cell */
            this.keyboardEnter = new i0.EventEmitter();
        }
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "selectMode", {
            get: function () {
                return this._selectMode;
            },
            set: function (val) {
                this._selectMode = val;
                if (this.initiated) {
                    this.setSelectedYears();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                var oldSelected = this._selected;
                value = this.dateTimeAdapter.deserialize(value);
                this._selected = this.getValidDate(value);
                if (!this.dateTimeAdapter.isSameDay(oldSelected, this._selected)) {
                    this.setSelectedYears();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "selecteds", {
            get: function () {
                return this._selecteds;
            },
            set: function (values) {
                var _this = this;
                this._selecteds = values.map(function (v) {
                    v = _this.dateTimeAdapter.deserialize(v);
                    return _this.getValidDate(v);
                });
                this.setSelectedYears();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "pickerMoment", {
            get: function () {
                return this._pickerMoment;
            },
            set: function (value) {
                var oldMoment = this._pickerMoment;
                value = this.dateTimeAdapter.deserialize(value);
                this._pickerMoment =
                    this.getValidDate(value) || this.dateTimeAdapter.now();
                if (oldMoment &&
                    this._pickerMoment &&
                    !this.isSameYearList(oldMoment, this._pickerMoment)) {
                    this.generateYearList();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "dateFilter", {
            get: function () {
                return this._dateFilter;
            },
            set: function (filter) {
                this._dateFilter = filter;
                if (this.initiated) {
                    this.generateYearList();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "minDate", {
            get: function () {
                return this._minDate;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._minDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateYearList();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "maxDate", {
            get: function () {
                return this._maxDate;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._maxDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateYearList();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "todayYear", {
            get: function () {
                return this._todayYear;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "years", {
            get: function () {
                return this._years;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "selectedYears", {
            get: function () {
                return this._selectedYears;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "isInSingleMode", {
            get: function () {
                return this.selectMode === 'single';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "isInRangeMode", {
            get: function () {
                return (this.selectMode === 'range' ||
                    this.selectMode === 'rangeFrom' ||
                    this.selectMode === 'rangeTo');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "activeCell", {
            get: function () {
                if (this._pickerMoment) {
                    return (this.dateTimeAdapter.getYear(this._pickerMoment) %
                        (YEARS_PER_ROW * YEAR_ROWS));
                }
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "tableHeader", {
            get: function () {
                if (this._years && this._years.length > 0) {
                    return this._years[0][0].displayValue + " - " + this._years[YEAR_ROWS - 1][YEARS_PER_ROW - 1].displayValue;
                }
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "prevButtonLabel", {
            get: function () {
                return this.pickerIntl.prevMultiYearLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "nextButtonLabel", {
            get: function () {
                return this.pickerIntl.nextMultiYearLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "owlDTCalendarView", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "owlDTCalendarMultiYearView", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        OwlMultiYearViewComponent.prototype.ngOnInit = function () { };
        OwlMultiYearViewComponent.prototype.ngAfterContentInit = function () {
            this._todayYear = this.dateTimeAdapter.getYear(this.dateTimeAdapter.now());
            this.generateYearList();
            this.initiated = true;
        };
        /**
         * Handle a calendarCell selected
         */
        OwlMultiYearViewComponent.prototype.selectCalendarCell = function (cell) {
            this.selectYear(cell.value);
        };
        OwlMultiYearViewComponent.prototype.selectYear = function (year) {
            this.yearSelected.emit(this.dateTimeAdapter.createDate(year, 0, 1));
            var firstDateOfMonth = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), 1);
            var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
            var selected = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
            this.change.emit(selected);
        };
        /**
         * Generate the previous year list
         */
        OwlMultiYearViewComponent.prototype.prevYearList = function (event) {
            this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1 * YEAR_ROWS * YEARS_PER_ROW);
            this.generateYearList();
            event.preventDefault();
        };
        /**
         * Generate the next year list
         */
        OwlMultiYearViewComponent.prototype.nextYearList = function (event) {
            this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, YEAR_ROWS * YEARS_PER_ROW);
            this.generateYearList();
            event.preventDefault();
        };
        OwlMultiYearViewComponent.prototype.generateYearList = function () {
            this._years = [];
            var pickerMomentYear = this.dateTimeAdapter.getYear(this._pickerMoment);
            var offset = pickerMomentYear % (YEARS_PER_ROW * YEAR_ROWS);
            for (var i = 0; i < YEAR_ROWS; i++) {
                var row = [];
                for (var j = 0; j < YEARS_PER_ROW; j++) {
                    var year = pickerMomentYear - offset + (j + i * YEARS_PER_ROW);
                    var yearCell = this.createYearCell(year);
                    row.push(yearCell);
                }
                this._years.push(row);
            }
            return;
        };
        /** Whether the previous period button is enabled. */
        OwlMultiYearViewComponent.prototype.previousEnabled = function () {
            if (!this.minDate) {
                return true;
            }
            return (!this.minDate ||
                !this.isSameYearList(this._pickerMoment, this.minDate));
        };
        /** Whether the next period button is enabled. */
        OwlMultiYearViewComponent.prototype.nextEnabled = function () {
            return (!this.maxDate ||
                !this.isSameYearList(this._pickerMoment, this.maxDate));
        };
        OwlMultiYearViewComponent.prototype.handleCalendarKeydown = function (event) {
            var moment;
            switch (event.keyCode) {
                // minus 1 year
                case keycodes.LEFT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 year
                case keycodes.RIGHT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, 1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 3 years
                case keycodes.UP_ARROW:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -1 * YEARS_PER_ROW);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 3 years
                case keycodes.DOWN_ARROW:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, YEARS_PER_ROW);
                    this.pickerMomentChange.emit(moment);
                    break;
                // go to the first year of the year page
                case keycodes.HOME:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -this.dateTimeAdapter.getYear(this._pickerMoment) %
                        (YEARS_PER_ROW * YEAR_ROWS));
                    this.pickerMomentChange.emit(moment);
                    break;
                // go to the last year of the year page
                case keycodes.END:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, YEARS_PER_ROW * YEAR_ROWS -
                        (this.dateTimeAdapter.getYear(this._pickerMoment) %
                            (YEARS_PER_ROW * YEAR_ROWS)) -
                        1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 1 year page (or 10 year pages)
                case keycodes.PAGE_UP:
                    moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey
                        ? -10 * (YEARS_PER_ROW * YEAR_ROWS)
                        : -1 * (YEARS_PER_ROW * YEAR_ROWS));
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 year page (or 10 year pages)
                case keycodes.PAGE_DOWN:
                    moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey
                        ? 10 * (YEARS_PER_ROW * YEAR_ROWS)
                        : YEARS_PER_ROW * YEAR_ROWS);
                    this.pickerMomentChange.emit(moment);
                    break;
                case keycodes.ENTER:
                    this.selectYear(this.dateTimeAdapter.getYear(this._pickerMoment));
                    this.keyboardEnter.emit();
                    break;
                default:
                    return;
            }
            this.focusActiveCell();
            event.preventDefault();
        };
        /**
         * Creates an CalendarCell for the given year.
         */
        OwlMultiYearViewComponent.prototype.createYearCell = function (year) {
            var startDateOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
            var ariaLabel = this.dateTimeAdapter.getYearName(startDateOfYear);
            var cellClass = 'owl-dt-year-' + year;
            return new CalendarCell(year, year.toString(), ariaLabel, this.isYearEnabled(year), false, cellClass);
        };
        OwlMultiYearViewComponent.prototype.setSelectedYears = function () {
            var _this = this;
            this._selectedYears = [];
            if (this.isInSingleMode && this.selected) {
                this._selectedYears[0] = this.dateTimeAdapter.getYear(this.selected);
            }
            if (this.isInRangeMode && this.selecteds) {
                this._selectedYears = this.selecteds.map(function (selected) {
                    if (_this.dateTimeAdapter.isValid(selected)) {
                        return _this.dateTimeAdapter.getYear(selected);
                    }
                    else {
                        return null;
                    }
                });
            }
        };
        /** Whether the given year is enabled. */
        OwlMultiYearViewComponent.prototype.isYearEnabled = function (year) {
            // disable if the year is greater than maxDate lower than minDate
            if (year === undefined ||
                year === null ||
                (this.maxDate &&
                    year > this.dateTimeAdapter.getYear(this.maxDate)) ||
                (this.minDate && year < this.dateTimeAdapter.getYear(this.minDate))) {
                return false;
            }
            // enable if it reaches here and there's no filter defined
            if (!this.dateFilter) {
                return true;
            }
            var firstOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
            // If any date in the year is enabled count the year as enabled.
            for (var date = firstOfYear; this.dateTimeAdapter.getYear(date) === year; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
                if (this.dateFilter(date)) {
                    return true;
                }
            }
            return false;
        };
        OwlMultiYearViewComponent.prototype.isSameYearList = function (date1, date2) {
            return (Math.floor(this.dateTimeAdapter.getYear(date1) /
                (YEARS_PER_ROW * YEAR_ROWS)) ===
                Math.floor(this.dateTimeAdapter.getYear(date2) /
                    (YEARS_PER_ROW * YEAR_ROWS)));
        };
        /**
         * Get a valid date object
         */
        OwlMultiYearViewComponent.prototype.getValidDate = function (obj) {
            return this.dateTimeAdapter.isDateInstance(obj) &&
                this.dateTimeAdapter.isValid(obj)
                ? obj
                : null;
        };
        OwlMultiYearViewComponent.prototype.focusActiveCell = function () {
            this.calendarBodyElm.focusActiveCell();
        };
        return OwlMultiYearViewComponent;
    }());
    OwlMultiYearViewComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlMultiYearViewComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: OwlDateTimeIntl }, { token: DateTimeAdapter, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    OwlMultiYearViewComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: OwlMultiYearViewComponent, selector: "owl-date-time-multi-year-view", inputs: { selectMode: "selectMode", selected: "selected", selecteds: "selecteds", pickerMoment: "pickerMoment", dateFilter: "dateFilter", minDate: "minDate", maxDate: "maxDate" }, outputs: { change: "change", yearSelected: "yearSelected", pickerMomentChange: "pickerMomentChange", keyboardEnter: "keyboardEnter" }, host: { properties: { "class.owl-dt-calendar-view": "owlDTCalendarView", "class.owl-dt-calendar-multi-year-view": "owlDTCalendarMultiYearView" } }, viewQueries: [{ propertyName: "calendarBodyElm", first: true, predicate: OwlCalendarBodyComponent, descendants: true, static: true }], ngImport: i0__namespace, template: "<button\n    class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n    [disabled]=\"!previousEnabled()\"\n    [attr.aria-label]=\"prevButtonLabel\"\n    type=\"button\"\n    tabindex=\"0\"\n    (click)=\"prevYearList($event)\"\n>\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\n        <svg\n            xmlns=\"http://www.w3.org/2000/svg\"\n            xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n            version=\"1.1\"\n            x=\"0px\"\n            y=\"0px\"\n            viewBox=\"0 0 250.738 250.738\"\n            style=\"enable-background:new 0 0 250.738 250.738;\"\n            xml:space=\"preserve\"\n            width=\"100%\"\n            height=\"100%\"\n        >\n            <path\n                style=\"fill-rule: evenodd; clip-rule: evenodd;\"\n                d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"\n            />\n        </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n<table class=\"owl-dt-calendar-table owl-dt-calendar-multi-year-table\">\n    <thead class=\"owl-dt-calendar-header\">\n        <tr>\n            <th colspan=\"3\">{{ tableHeader }}</th>\n        </tr>\n    </thead>\n    <tbody\n        owl-date-time-calendar-body\n        role=\"grid\"\n        [rows]=\"years\"\n        [numCols]=\"3\"\n        [cellRatio]=\"3 / 7\"\n        [activeCell]=\"activeCell\"\n        [todayValue]=\"todayYear\"\n        [selectedValues]=\"selectedYears\"\n        [selectMode]=\"selectMode\"\n        (keydown)=\"handleCalendarKeydown($event)\"\n        (select)=\"selectCalendarCell($event)\"\n    ></tbody>\n</table>\n<button\n    class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n    [disabled]=\"!nextEnabled()\"\n    [attr.aria-label]=\"nextButtonLabel\"\n    type=\"button\"\n    tabindex=\"0\"\n    (click)=\"nextYearList($event)\"\n>\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\n        <svg\n            version=\"1.1\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n            xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n            x=\"0px\"\n            y=\"0px\"\n            viewBox=\"0 0 250.738 250.738\"\n            style=\"enable-background:new 0 0 250.738 250.738;\"\n            xml:space=\"preserve\"\n        >\n            <path\n                style=\"fill-rule:evenodd;clip-rule:evenodd;\"\n                d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                C197.237,120.447,195.534,115.448,191.75,111.689z\"\n            />\n        </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n", components: [{ type: OwlCalendarBodyComponent, selector: "[owl-date-time-calendar-body]", inputs: ["activeCell", "rows", "numCols", "cellRatio", "todayValue", "selectedValues", "selectMode"], outputs: ["select"], exportAs: ["owlDateTimeCalendarBody"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlMultiYearViewComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'owl-date-time-multi-year-view',
                        templateUrl: './calendar-multi-year-view.component.html',
                        host: {
                            '[class.owl-dt-calendar-view]': 'owlDTCalendarView',
                            '[class.owl-dt-calendar-multi-year-view]': 'owlDTCalendarMultiYearView'
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ChangeDetectorRef }, { type: OwlDateTimeIntl }, { type: DateTimeAdapter, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { selectMode: [{
                    type: i0.Input
                }], selected: [{
                    type: i0.Input
                }], selecteds: [{
                    type: i0.Input
                }], pickerMoment: [{
                    type: i0.Input
                }], dateFilter: [{
                    type: i0.Input
                }], minDate: [{
                    type: i0.Input
                }], maxDate: [{
                    type: i0.Input
                }], change: [{
                    type: i0.Output
                }], yearSelected: [{
                    type: i0.Output
                }], pickerMomentChange: [{
                    type: i0.Output
                }], keyboardEnter: [{
                    type: i0.Output
                }], calendarBodyElm: [{
                    type: i0.ViewChild,
                    args: [OwlCalendarBodyComponent, { static: true }]
                }] } });

    /**
     * calendar.component
     */
    var OwlCalendarComponent = /** @class */ (function () {
        function OwlCalendarComponent(elmRef, pickerIntl, ngZone, cdRef, dateTimeAdapter, dateTimeFormats) {
            var _this = this;
            this.elmRef = elmRef;
            this.pickerIntl = pickerIntl;
            this.ngZone = ngZone;
            this.cdRef = cdRef;
            this.dateTimeAdapter = dateTimeAdapter;
            this.dateTimeFormats = dateTimeFormats;
            this._selecteds = [];
            /**
             * The view that the calendar should start in.
             */
            this.startView = 'month';
            /** Emits when the currently picker moment changes. */
            this.pickerMomentChange = new i0.EventEmitter();
            /** Emits when the currently selected date changes. */
            this.selectedChange = new i0.EventEmitter();
            /** Emits when any date is selected. */
            this.userSelection = new i0.EventEmitter();
            /**
             * Emits the selected year. This doesn't imply a change on the selected date
             */
            this.yearSelected = new i0.EventEmitter();
            /**
             * Emits the selected month. This doesn't imply a change on the selected date
             */
            this.monthSelected = new i0.EventEmitter();
            /**
             * Date filter for the month and year view
             */
            this.dateFilterForViews = function (date) {
                return (!!date &&
                    (!_this.dateFilter || _this.dateFilter(date)) &&
                    (!_this.minDate ||
                        _this.dateTimeAdapter.compare(date, _this.minDate) >= 0) &&
                    (!_this.maxDate ||
                        _this.dateTimeAdapter.compare(date, _this.maxDate) <= 0));
            };
            this.intlChangesSub = rxjs.Subscription.EMPTY;
            /**
             * Used for scheduling that focus should be moved to the active cell on the next tick.
             * We need to schedule it, rather than do it immediately, because we have to wait
             * for Angular to re-evaluate the view children.
             */
            this.moveFocusOnNextTick = false;
            this.intlChangesSub = this.pickerIntl.changes.subscribe(function () {
                _this.cdRef.markForCheck();
            });
        }
        Object.defineProperty(OwlCalendarComponent.prototype, "minDate", {
            get: function () {
                return this._minDate;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                value = this.getValidDate(value);
                this._minDate = value
                    ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(value), this.dateTimeAdapter.getMonth(value), this.dateTimeAdapter.getDate(value))
                    : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "maxDate", {
            get: function () {
                return this._maxDate;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                value = this.getValidDate(value);
                this._maxDate = value
                    ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(value), this.dateTimeAdapter.getMonth(value), this.dateTimeAdapter.getDate(value))
                    : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "pickerMoment", {
            get: function () {
                return this._pickerMoment;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._pickerMoment =
                    this.getValidDate(value) || this.dateTimeAdapter.now();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._selected = this.getValidDate(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "selecteds", {
            get: function () {
                return this._selecteds;
            },
            set: function (values) {
                var _this = this;
                this._selecteds = values.map(function (v) {
                    v = _this.dateTimeAdapter.deserialize(v);
                    return _this.getValidDate(v);
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "periodButtonText", {
            get: function () {
                return this.isMonthView
                    ? this.dateTimeAdapter.format(this.pickerMoment, this.dateTimeFormats.monthYearLabel)
                    : this.dateTimeAdapter.getYearName(this.pickerMoment);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "periodButtonLabel", {
            get: function () {
                return this.isMonthView
                    ? this.pickerIntl.switchToMultiYearViewLabel
                    : this.pickerIntl.switchToMonthViewLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "prevButtonLabel", {
            get: function () {
                if (this._currentView === 'month') {
                    return this.pickerIntl.prevMonthLabel;
                }
                else if (this._currentView === 'year') {
                    return this.pickerIntl.prevYearLabel;
                }
                else {
                    return null;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "nextButtonLabel", {
            get: function () {
                if (this._currentView === 'month') {
                    return this.pickerIntl.nextMonthLabel;
                }
                else if (this._currentView === 'year') {
                    return this.pickerIntl.nextYearLabel;
                }
                else {
                    return null;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "currentView", {
            get: function () {
                return this._currentView;
            },
            set: function (view) {
                this._currentView = view;
                this.moveFocusOnNextTick = true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "isInSingleMode", {
            get: function () {
                return this.selectMode === 'single';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "isInRangeMode", {
            get: function () {
                return (this.selectMode === 'range' ||
                    this.selectMode === 'rangeFrom' ||
                    this.selectMode === 'rangeTo');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "showControlArrows", {
            get: function () {
                return this._currentView !== 'multi-years';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "isMonthView", {
            get: function () {
                return this._currentView === 'month';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlCalendarComponent.prototype, "owlDTCalendarClass", {
            /**
             * Bind class 'owl-dt-calendar' to host
             */
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        OwlCalendarComponent.prototype.ngOnInit = function () { };
        OwlCalendarComponent.prototype.ngAfterContentInit = function () {
            this._currentView = this.startView;
        };
        OwlCalendarComponent.prototype.ngAfterViewChecked = function () {
            if (this.moveFocusOnNextTick) {
                this.moveFocusOnNextTick = false;
                this.focusActiveCell();
            }
        };
        OwlCalendarComponent.prototype.ngOnDestroy = function () {
            this.intlChangesSub.unsubscribe();
        };
        /**
         * Toggle between month view and year view
         */
        OwlCalendarComponent.prototype.toggleViews = function () {
            this.currentView =
                this._currentView === 'month' ? 'multi-years' : 'month';
        };
        /**
         * Handles user clicks on the previous button.
         */
        OwlCalendarComponent.prototype.previousClicked = function () {
            this.pickerMoment = this.isMonthView
                ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1)
                : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1);
            this.pickerMomentChange.emit(this.pickerMoment);
        };
        /**
         * Handles user clicks on the next button.
         */
        OwlCalendarComponent.prototype.nextClicked = function () {
            this.pickerMoment = this.isMonthView
                ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1)
                : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1);
            this.pickerMomentChange.emit(this.pickerMoment);
        };
        OwlCalendarComponent.prototype.dateSelected = function (date) {
            if (!this.dateFilterForViews(date)) {
                return;
            }
            this.selectedChange.emit(date);
            /*if ((this.isInSingleMode && !this.dateTimeAdapter.isSameDay(date, this.selected)) ||
                this.isInRangeMode) {
                this.selectedChange.emit(date);
            }*/
        };
        /**
         * Change the pickerMoment value and switch to a specific view
         */
        OwlCalendarComponent.prototype.goToDateInView = function (date, view) {
            this.handlePickerMomentChange(date);
            this.currentView = view;
            return;
        };
        /**
         * Change the pickerMoment value
         */
        OwlCalendarComponent.prototype.handlePickerMomentChange = function (date) {
            this.pickerMoment = this.dateTimeAdapter.clampDate(date, this.minDate, this.maxDate);
            this.pickerMomentChange.emit(this.pickerMoment);
            return;
        };
        OwlCalendarComponent.prototype.userSelected = function () {
            this.userSelection.emit();
        };
        /**
         * Whether the previous period button is enabled.
         */
        OwlCalendarComponent.prototype.prevButtonEnabled = function () {
            return (!this.minDate || !this.isSameView(this.pickerMoment, this.minDate));
        };
        /**
         * Whether the next period button is enabled.
         */
        OwlCalendarComponent.prototype.nextButtonEnabled = function () {
            return (!this.maxDate || !this.isSameView(this.pickerMoment, this.maxDate));
        };
        /**
         * Focus to the host element
         */
        OwlCalendarComponent.prototype.focusActiveCell = function () {
            var _this = this;
            this.ngZone.runOutsideAngular(function () {
                _this.ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1))
                    .subscribe(function () {
                    _this.elmRef.nativeElement
                        .querySelector('.owl-dt-calendar-cell-active')
                        .focus();
                });
            });
        };
        OwlCalendarComponent.prototype.selectYearInMultiYearView = function (normalizedYear) {
            this.yearSelected.emit(normalizedYear);
        };
        OwlCalendarComponent.prototype.selectMonthInYearView = function (normalizedMonth) {
            this.monthSelected.emit(normalizedMonth);
        };
        /**
         * Whether the two dates represent the same view in the current view mode (month or year).
         */
        OwlCalendarComponent.prototype.isSameView = function (date1, date2) {
            if (this._currentView === 'month') {
                return !!(date1 &&
                    date2 &&
                    this.dateTimeAdapter.getYear(date1) ===
                        this.dateTimeAdapter.getYear(date2) &&
                    this.dateTimeAdapter.getMonth(date1) ===
                        this.dateTimeAdapter.getMonth(date2));
            }
            else if (this._currentView === 'year') {
                return !!(date1 &&
                    date2 &&
                    this.dateTimeAdapter.getYear(date1) ===
                        this.dateTimeAdapter.getYear(date2));
            }
            else {
                return false;
            }
        };
        /**
         * Get a valid date object
         */
        OwlCalendarComponent.prototype.getValidDate = function (obj) {
            return this.dateTimeAdapter.isDateInstance(obj) &&
                this.dateTimeAdapter.isValid(obj)
                ? obj
                : null;
        };
        return OwlCalendarComponent;
    }());
    OwlCalendarComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlCalendarComponent, deps: [{ token: i0__namespace.ElementRef }, { token: OwlDateTimeIntl }, { token: i0__namespace.NgZone }, { token: i0__namespace.ChangeDetectorRef }, { token: DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    OwlCalendarComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: OwlCalendarComponent, selector: "owl-date-time-calendar", inputs: { dateFilter: "dateFilter", firstDayOfWeek: "firstDayOfWeek", minDate: "minDate", maxDate: "maxDate", pickerMoment: "pickerMoment", selectMode: "selectMode", selected: "selected", selecteds: "selecteds", startView: "startView", hideOtherMonths: "hideOtherMonths" }, outputs: { pickerMomentChange: "pickerMomentChange", selectedChange: "selectedChange", userSelection: "userSelection", yearSelected: "yearSelected", monthSelected: "monthSelected" }, host: { properties: { "class.owl-dt-calendar": "owlDTCalendarClass" } }, exportAs: ["owlDateTimeCalendar"], ngImport: i0__namespace, template: "<div class=\"owl-dt-calendar-control\">\n    <!-- focus when keyboard tab (http://kizu.ru/en/blog/keyboard-only-focus/#x) -->\n    <button\n        class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\"\n        tabindex=\"0\"\n        [style.visibility]=\"showControlArrows ? 'visible' : 'hidden'\"\n        [disabled]=\"!prevButtonEnabled()\"\n        [attr.aria-label]=\"prevButtonLabel\"\n        (click)=\"previousClicked()\"\n    >\n        <span\n            class=\"owl-dt-control-content owl-dt-control-button-content\"\n            tabindex=\"-1\"\n        >\n            <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\n            <svg\n                xmlns=\"http://www.w3.org/2000/svg\"\n                xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                version=\"1.1\"\n                x=\"0px\"\n                y=\"0px\"\n                viewBox=\"0 0 250.738 250.738\"\n                style=\"enable-background:new 0 0 250.738 250.738;\"\n                xml:space=\"preserve\"\n                width=\"100%\"\n                height=\"100%\"\n            >\n                <path\n                    style=\"fill-rule: evenodd; clip-rule: evenodd;\"\n                    d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"\n                />\n            </svg>\n            <!-- </editor-fold> -->\n        </span>\n    </button>\n    <div class=\"owl-dt-calendar-control-content\">\n        <button\n            class=\"owl-dt-control owl-dt-control-button owl-dt-control-period-button\"\n            type=\"button\"\n            tabindex=\"0\"\n            [attr.aria-label]=\"periodButtonLabel\"\n            (click)=\"toggleViews()\"\n        >\n            <span\n                class=\"owl-dt-control-content owl-dt-control-button-content\"\n                tabindex=\"-1\"\n            >\n                {{ periodButtonText }}\n\n                <span\n                    class=\"owl-dt-control-button-arrow\"\n                    [style.transform]=\"\n                        'rotate(' + (isMonthView ? 0 : 180) + 'deg)'\n                    \"\n                >\n                    <!-- <editor-fold desc=\"SVG Arrow\"> -->\n                    <svg\n                        version=\"1.1\"\n                        xmlns=\"http://www.w3.org/2000/svg\"\n                        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                        x=\"0px\"\n                        y=\"0px\"\n                        width=\"50%\"\n                        height=\"50%\"\n                        viewBox=\"0 0 292.362 292.362\"\n                        style=\"enable-background:new 0 0 292.362 292.362;\"\n                        xml:space=\"preserve\"\n                    >\n                        <g>\n                            <path\n                                d=\"M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424\n                                C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428\n                                s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z\"\n                            />\n                        </g>\n                    </svg>\n                    <!-- </editor-fold> -->\n                </span>\n            </span>\n        </button>\n    </div>\n    <button\n        class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\"\n        tabindex=\"0\"\n        [style.visibility]=\"showControlArrows ? 'visible' : 'hidden'\"\n        [disabled]=\"!nextButtonEnabled()\"\n        [attr.aria-label]=\"nextButtonLabel\"\n        (click)=\"nextClicked()\"\n    >\n        <span\n            class=\"owl-dt-control-content owl-dt-control-button-content\"\n            tabindex=\"-1\"\n        >\n            <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\n            <svg\n                version=\"1.1\"\n                xmlns=\"http://www.w3.org/2000/svg\"\n                xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                x=\"0px\"\n                y=\"0px\"\n                viewBox=\"0 0 250.738 250.738\"\n                style=\"enable-background:new 0 0 250.738 250.738;\"\n                xml:space=\"preserve\"\n            >\n                <path\n                    style=\"fill-rule:evenodd;clip-rule:evenodd;\"\n                    d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                    c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                    c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                    C197.237,120.447,195.534,115.448,191.75,111.689z\"\n                />\n            </svg>\n            <!-- </editor-fold> -->\n        </span>\n    </button>\n</div>\n<div\n    class=\"owl-dt-calendar-main\"\n    cdkMonitorSubtreeFocus\n    [ngSwitch]=\"currentView\"\n    tabindex=\"-1\"\n>\n    <owl-date-time-month-view\n        *ngSwitchCase=\"'month'\"\n        [pickerMoment]=\"pickerMoment\"\n        [firstDayOfWeek]=\"firstDayOfWeek\"\n        [selected]=\"selected\"\n        [selecteds]=\"selecteds\"\n        [selectMode]=\"selectMode\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        [dateFilter]=\"dateFilter\"\n        [hideOtherMonths]=\"hideOtherMonths\"\n        (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n        (selectedChange)=\"dateSelected($event)\"\n        (userSelection)=\"userSelected()\"\n    ></owl-date-time-month-view>\n\n    <owl-date-time-year-view\n        *ngSwitchCase=\"'year'\"\n        [pickerMoment]=\"pickerMoment\"\n        [selected]=\"selected\"\n        [selecteds]=\"selecteds\"\n        [selectMode]=\"selectMode\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        [dateFilter]=\"dateFilter\"\n        (keyboardEnter)=\"focusActiveCell()\"\n        (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n        (monthSelected)=\"selectMonthInYearView($event)\"\n        (change)=\"goToDateInView($event, 'month')\"\n    ></owl-date-time-year-view>\n\n    <owl-date-time-multi-year-view\n        *ngSwitchCase=\"'multi-years'\"\n        [pickerMoment]=\"pickerMoment\"\n        [selected]=\"selected\"\n        [selecteds]=\"selecteds\"\n        [selectMode]=\"selectMode\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        [dateFilter]=\"dateFilter\"\n        (keyboardEnter)=\"focusActiveCell()\"\n        (pickerMomentChange)=\"handlePickerMomentChange($event)\"\n        (yearSelected)=\"selectYearInMultiYearView($event)\"\n        (change)=\"goToDateInView($event, 'year')\"\n    ></owl-date-time-multi-year-view>\n</div>\n", components: [{ type: OwlMonthViewComponent, selector: "owl-date-time-month-view", inputs: ["hideOtherMonths", "firstDayOfWeek", "selectMode", "selected", "selecteds", "pickerMoment", "dateFilter", "minDate", "maxDate"], outputs: ["selectedChange", "userSelection", "pickerMomentChange"], exportAs: ["owlYearView"] }, { type: OwlYearViewComponent, selector: "owl-date-time-year-view", inputs: ["selectMode", "selected", "selecteds", "pickerMoment", "dateFilter", "minDate", "maxDate"], outputs: ["change", "monthSelected", "pickerMomentChange", "keyboardEnter"], exportAs: ["owlMonthView"] }, { type: OwlMultiYearViewComponent, selector: "owl-date-time-multi-year-view", inputs: ["selectMode", "selected", "selecteds", "pickerMoment", "dateFilter", "minDate", "maxDate"], outputs: ["change", "yearSelected", "pickerMomentChange", "keyboardEnter"] }], directives: [{ type: i1__namespace$1.CdkMonitorFocus, selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]", outputs: ["cdkFocusChange"] }, { type: i1__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlCalendarComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'owl-date-time-calendar',
                        exportAs: 'owlDateTimeCalendar',
                        templateUrl: './calendar.component.html',
                        host: {
                            '[class.owl-dt-calendar]': 'owlDTCalendarClass'
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: OwlDateTimeIntl }, { type: i0__namespace.NgZone }, { type: i0__namespace.ChangeDetectorRef }, { type: DateTimeAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [OWL_DATE_TIME_FORMATS]
                        }] }];
        }, propDecorators: { dateFilter: [{
                    type: i0.Input
                }], firstDayOfWeek: [{
                    type: i0.Input
                }], minDate: [{
                    type: i0.Input
                }], maxDate: [{
                    type: i0.Input
                }], pickerMoment: [{
                    type: i0.Input
                }], selectMode: [{
                    type: i0.Input
                }], selected: [{
                    type: i0.Input
                }], selecteds: [{
                    type: i0.Input
                }], startView: [{
                    type: i0.Input
                }], hideOtherMonths: [{
                    type: i0.Input
                }], pickerMomentChange: [{
                    type: i0.Output
                }], selectedChange: [{
                    type: i0.Output
                }], userSelection: [{
                    type: i0.Output
                }], yearSelected: [{
                    type: i0.Output
                }], monthSelected: [{
                    type: i0.Output
                }] } });

    /**
     * numberFixedLen.pipe
     */
    var NumberFixedLenPipe = /** @class */ (function () {
        function NumberFixedLenPipe() {
        }
        NumberFixedLenPipe.prototype.transform = function (num, len) {
            var number = Math.floor(num);
            var length = Math.floor(len);
            if (num === null || isNaN(number) || isNaN(length)) {
                return num;
            }
            var numString = number.toString();
            while (numString.length < length) {
                numString = '0' + numString;
            }
            return numString;
        };
        return NumberFixedLenPipe;
    }());
    NumberFixedLenPipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: NumberFixedLenPipe, deps: [], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    NumberFixedLenPipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: NumberFixedLenPipe, name: "numberFixedLen" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: NumberFixedLenPipe, decorators: [{
                type: i0.Pipe,
                args: [{
                        name: 'numberFixedLen'
                    }]
            }] });

    /**
     * timer-box.component
     */
    var OwlTimerBoxComponent = /** @class */ (function () {
        function OwlTimerBoxComponent() {
            this.showDivider = false;
            this.step = 1;
            this.valueChange = new i0.EventEmitter();
            this.inputChange = new i0.EventEmitter();
            this.inputStream = new rxjs.Subject();
            this.inputStreamSub = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(OwlTimerBoxComponent.prototype, "displayValue", {
            get: function () {
                return this.boxValue || this.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerBoxComponent.prototype, "owlDTTimerBoxClass", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        OwlTimerBoxComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.inputStreamSub = this.inputStream
                .pipe(operators.debounceTime(500), operators.distinctUntilChanged())
                .subscribe(function (val) {
                if (val) {
                    var inputValue = coercion.coerceNumberProperty(val, 0);
                    _this.updateValueViaInput(inputValue);
                }
            });
        };
        OwlTimerBoxComponent.prototype.ngOnDestroy = function () {
            this.inputStreamSub.unsubscribe();
        };
        OwlTimerBoxComponent.prototype.upBtnClicked = function () {
            this.updateValue(this.value + this.step);
        };
        OwlTimerBoxComponent.prototype.downBtnClicked = function () {
            this.updateValue(this.value - this.step);
        };
        OwlTimerBoxComponent.prototype.handleInputChange = function (value) {
            this.inputStream.next(value);
        };
        OwlTimerBoxComponent.prototype.handleWheelChange = function (event) {
            var deltaY = event.deltaY;
            if (deltaY > 0 && !this.upBtnDisabled) {
                this.upBtnClicked();
            }
            else if (deltaY < 0 && !this.downBtnDisabled) {
                this.downBtnClicked();
            }
        };
        OwlTimerBoxComponent.prototype.updateValue = function (value) {
            this.valueChange.emit(value);
        };
        OwlTimerBoxComponent.prototype.updateValueViaInput = function (value) {
            if (value > this.max || value < this.min) {
                return;
            }
            this.inputChange.emit(value);
        };
        return OwlTimerBoxComponent;
    }());
    OwlTimerBoxComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlTimerBoxComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    OwlTimerBoxComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: OwlTimerBoxComponent, selector: "owl-date-time-timer-box", inputs: { showDivider: "showDivider", upBtnAriaLabel: "upBtnAriaLabel", upBtnDisabled: "upBtnDisabled", downBtnAriaLabel: "downBtnAriaLabel", downBtnDisabled: "downBtnDisabled", boxValue: "boxValue", value: "value", min: "min", max: "max", step: "step", inputLabel: "inputLabel" }, outputs: { valueChange: "valueChange", inputChange: "inputChange" }, host: { properties: { "class.owl-dt-timer-box": "owlDTTimerBoxClass" } }, exportAs: ["owlDateTimeTimerBox"], ngImport: i0__namespace, template: "<div *ngIf=\"showDivider\" class=\"owl-dt-timer-divider\" aria-hidden=\"true\"></div>\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\" tabindex=\"-1\"\n        [disabled]=\"upBtnDisabled\"\n        [attr.aria-label]=\"upBtnAriaLabel\"\n        (click)=\"upBtnClicked()\">\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Up\"> -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\n                 width=\"100%\" height=\"100%\">\n                    <path d=\"M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0\n                        L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4\n                        c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z\"/>\n                </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n<label class=\"owl-dt-timer-content\">\n    <input class=\"owl-dt-timer-input\" maxlength=\"2\"\n           [value]=\"displayValue | numberFixedLen : 2\"\n           (wheel)=\"handleWheelChange($event)\"\n           (keydown.arrowUp)=\"!upBtnDisabled  && upBtnClicked()\"\n           (keydown.arrowDown)=\"!downBtnAriaLabel && downBtnClicked()\"\n           (input)=\"handleInputChange(valueInput.value)\" #valueInput>\n    <span class=\"owl-hidden-accessible\">{{inputLabel}}</span>\n</label>\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\" tabindex=\"-1\"\n        [disabled]=\"downBtnDisabled\"\n        [attr.aria-label]=\"downBtnAriaLabel\"\n        (click)=\"downBtnClicked()\">\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Down\"> -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\n                 width=\"100%\" height=\"100%\">\n                    <path d=\"M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751\n                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0\n                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z\"/>\n                </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n", directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "numberFixedLen": NumberFixedLenPipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlTimerBoxComponent, decorators: [{
                type: i0.Component,
                args: [{
                        exportAs: 'owlDateTimeTimerBox',
                        selector: 'owl-date-time-timer-box',
                        templateUrl: './timer-box.component.html',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        host: {
                            '[class.owl-dt-timer-box]': 'owlDTTimerBoxClass'
                        }
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { showDivider: [{
                    type: i0.Input
                }], upBtnAriaLabel: [{
                    type: i0.Input
                }], upBtnDisabled: [{
                    type: i0.Input
                }], downBtnAriaLabel: [{
                    type: i0.Input
                }], downBtnDisabled: [{
                    type: i0.Input
                }], boxValue: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], min: [{
                    type: i0.Input
                }], max: [{
                    type: i0.Input
                }], step: [{
                    type: i0.Input
                }], inputLabel: [{
                    type: i0.Input
                }], valueChange: [{
                    type: i0.Output
                }], inputChange: [{
                    type: i0.Output
                }] } });

    /**
     * timer.component
     */
    var OwlTimerComponent = /** @class */ (function () {
        function OwlTimerComponent(ngZone, elmRef, pickerIntl, cdRef, dateTimeAdapter) {
            this.ngZone = ngZone;
            this.elmRef = elmRef;
            this.pickerIntl = pickerIntl;
            this.cdRef = cdRef;
            this.dateTimeAdapter = dateTimeAdapter;
            this.isPM = false; // a flag indicates the current timer moment is in PM or AM
            /**
             * Hours to change per step
             */
            this.stepHour = 1;
            /**
             * Minutes to change per step
             */
            this.stepMinute = 1;
            /**
             * Seconds to change per step
             */
            this.stepSecond = 1;
            this.selectedChange = new i0.EventEmitter();
        }
        Object.defineProperty(OwlTimerComponent.prototype, "pickerMoment", {
            get: function () {
                return this._pickerMoment;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._pickerMoment =
                    this.getValidDate(value) || this.dateTimeAdapter.now();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "minDateTime", {
            get: function () {
                return this._minDateTime;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._minDateTime = this.getValidDate(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "maxDateTime", {
            get: function () {
                return this._maxDateTime;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._maxDateTime = this.getValidDate(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "hourValue", {
            get: function () {
                return this.dateTimeAdapter.getHours(this.pickerMoment);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "hourBoxValue", {
            /**
             * The value would be displayed in hourBox.
             * We need this because the value displayed in hourBox it not
             * the same as the hourValue when the timer is in hour12Timer mode.
             */
            get: function () {
                var hours = this.hourValue;
                if (!this.hour12Timer) {
                    return hours;
                }
                else {
                    if (hours === 0) {
                        hours = 12;
                        this.isPM = false;
                    }
                    else if (hours > 0 && hours < 12) {
                        this.isPM = false;
                    }
                    else if (hours === 12) {
                        this.isPM = true;
                    }
                    else if (hours > 12 && hours < 24) {
                        hours = hours - 12;
                        this.isPM = true;
                    }
                    return hours;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "minuteValue", {
            get: function () {
                return this.dateTimeAdapter.getMinutes(this.pickerMoment);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "secondValue", {
            get: function () {
                return this.dateTimeAdapter.getSeconds(this.pickerMoment);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "upHourButtonLabel", {
            get: function () {
                return this.pickerIntl.upHourLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "downHourButtonLabel", {
            get: function () {
                return this.pickerIntl.downHourLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "upMinuteButtonLabel", {
            get: function () {
                return this.pickerIntl.upMinuteLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "downMinuteButtonLabel", {
            get: function () {
                return this.pickerIntl.downMinuteLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "upSecondButtonLabel", {
            get: function () {
                return this.pickerIntl.upSecondLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "downSecondButtonLabel", {
            get: function () {
                return this.pickerIntl.downSecondLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "hour12ButtonLabel", {
            get: function () {
                return this.isPM
                    ? this.pickerIntl.hour12PMLabel
                    : this.pickerIntl.hour12AMLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimerClass", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimeTabIndex", {
            get: function () {
                return -1;
            },
            enumerable: false,
            configurable: true
        });
        OwlTimerComponent.prototype.ngOnInit = function () { };
        /**
         * Focus to the host element
         */
        OwlTimerComponent.prototype.focus = function () {
            var _this = this;
            this.ngZone.runOutsideAngular(function () {
                _this.ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1))
                    .subscribe(function () {
                    _this.elmRef.nativeElement.focus();
                });
            });
        };
        /**
         * Set the hour value via typing into timer box input
         * We need this to handle the hour value when the timer is in hour12 mode
         */
        OwlTimerComponent.prototype.setHourValueViaInput = function (hours) {
            if (this.hour12Timer && this.isPM && hours >= 1 && hours <= 11) {
                hours = hours + 12;
            }
            else if (this.hour12Timer && !this.isPM && hours === 12) {
                hours = 0;
            }
            this.setHourValue(hours);
        };
        OwlTimerComponent.prototype.setHourValue = function (hours) {
            var m = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
            this.selectedChange.emit(m);
            this.cdRef.markForCheck();
        };
        OwlTimerComponent.prototype.setMinuteValue = function (minutes) {
            var m = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
            this.selectedChange.emit(m);
            this.cdRef.markForCheck();
        };
        OwlTimerComponent.prototype.setSecondValue = function (seconds) {
            var m = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
            this.selectedChange.emit(m);
            this.cdRef.markForCheck();
        };
        OwlTimerComponent.prototype.setMeridian = function (event) {
            this.isPM = !this.isPM;
            var hours = this.hourValue;
            if (this.isPM) {
                hours = hours + 12;
            }
            else {
                hours = hours - 12;
            }
            if (hours >= 0 && hours <= 23) {
                this.setHourValue(hours);
            }
            this.cdRef.markForCheck();
            event.preventDefault();
        };
        /**
         * Check if the up hour button is enabled
         */
        OwlTimerComponent.prototype.upHourEnabled = function () {
            return (!this.maxDateTime ||
                this.compareHours(this.stepHour, this.maxDateTime) < 1);
        };
        /**
         * Check if the down hour button is enabled
         */
        OwlTimerComponent.prototype.downHourEnabled = function () {
            return (!this.minDateTime ||
                this.compareHours(-this.stepHour, this.minDateTime) > -1);
        };
        /**
         * Check if the up minute button is enabled
         */
        OwlTimerComponent.prototype.upMinuteEnabled = function () {
            return (!this.maxDateTime ||
                this.compareMinutes(this.stepMinute, this.maxDateTime) < 1);
        };
        /**
         * Check if the down minute button is enabled
         */
        OwlTimerComponent.prototype.downMinuteEnabled = function () {
            return (!this.minDateTime ||
                this.compareMinutes(-this.stepMinute, this.minDateTime) > -1);
        };
        /**
         * Check if the up second button is enabled
         */
        OwlTimerComponent.prototype.upSecondEnabled = function () {
            return (!this.maxDateTime ||
                this.compareSeconds(this.stepSecond, this.maxDateTime) < 1);
        };
        /**
         * Check if the down second button is enabled
         */
        OwlTimerComponent.prototype.downSecondEnabled = function () {
            return (!this.minDateTime ||
                this.compareSeconds(-this.stepSecond, this.minDateTime) > -1);
        };
        /**
         * PickerMoment's hour value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         */
        OwlTimerComponent.prototype.compareHours = function (amount, comparedDate) {
            var hours = this.dateTimeAdapter.getHours(this.pickerMoment) + amount;
            var result = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
            return this.dateTimeAdapter.compare(result, comparedDate);
        };
        /**
         * PickerMoment's minute value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         */
        OwlTimerComponent.prototype.compareMinutes = function (amount, comparedDate) {
            var minutes = this.dateTimeAdapter.getMinutes(this.pickerMoment) + amount;
            var result = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
            return this.dateTimeAdapter.compare(result, comparedDate);
        };
        /**
         * PickerMoment's second value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         */
        OwlTimerComponent.prototype.compareSeconds = function (amount, comparedDate) {
            var seconds = this.dateTimeAdapter.getSeconds(this.pickerMoment) + amount;
            var result = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
            return this.dateTimeAdapter.compare(result, comparedDate);
        };
        /**
         * Get a valid date object
         */
        OwlTimerComponent.prototype.getValidDate = function (obj) {
            return this.dateTimeAdapter.isDateInstance(obj) &&
                this.dateTimeAdapter.isValid(obj)
                ? obj
                : null;
        };
        return OwlTimerComponent;
    }());
    OwlTimerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlTimerComponent, deps: [{ token: i0__namespace.NgZone }, { token: i0__namespace.ElementRef }, { token: OwlDateTimeIntl }, { token: i0__namespace.ChangeDetectorRef }, { token: DateTimeAdapter, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    OwlTimerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: OwlTimerComponent, selector: "owl-date-time-timer", inputs: { pickerMoment: "pickerMoment", minDateTime: "minDateTime", maxDateTime: "maxDateTime", showSecondsTimer: "showSecondsTimer", hour12Timer: "hour12Timer", stepHour: "stepHour", stepMinute: "stepMinute", stepSecond: "stepSecond" }, outputs: { selectedChange: "selectedChange" }, host: { properties: { "class.owl-dt-timer": "owlDTTimerClass", "attr.tabindex": "owlDTTimeTabIndex" } }, exportAs: ["owlDateTimeTimer"], ngImport: i0__namespace, template: "<owl-date-time-timer-box\n    [upBtnAriaLabel]=\"upHourButtonLabel\"\n    [downBtnAriaLabel]=\"downHourButtonLabel\"\n    [upBtnDisabled]=\"!upHourEnabled()\"\n    [downBtnDisabled]=\"!downHourEnabled()\"\n    [boxValue]=\"hourBoxValue\"\n    [value]=\"hourValue\"\n    [min]=\"0\"\n    [max]=\"23\"\n    [step]=\"stepHour\"\n    [inputLabel]=\"'Hour'\"\n    (inputChange)=\"setHourValueViaInput($event)\"\n    (valueChange)=\"setHourValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n    [showDivider]=\"true\"\n    [upBtnAriaLabel]=\"upMinuteButtonLabel\"\n    [downBtnAriaLabel]=\"downMinuteButtonLabel\"\n    [upBtnDisabled]=\"!upMinuteEnabled()\"\n    [downBtnDisabled]=\"!downMinuteEnabled()\"\n    [value]=\"minuteValue\"\n    [min]=\"0\"\n    [max]=\"59\"\n    [step]=\"stepMinute\"\n    [inputLabel]=\"'Minute'\"\n    (inputChange)=\"setMinuteValue($event)\"\n    (valueChange)=\"setMinuteValue($event)\"\n></owl-date-time-timer-box>\n<owl-date-time-timer-box\n    *ngIf=\"showSecondsTimer\"\n    [showDivider]=\"true\"\n    [upBtnAriaLabel]=\"upSecondButtonLabel\"\n    [downBtnAriaLabel]=\"downSecondButtonLabel\"\n    [upBtnDisabled]=\"!upSecondEnabled()\"\n    [downBtnDisabled]=\"!downSecondEnabled()\"\n    [value]=\"secondValue\"\n    [min]=\"0\"\n    [max]=\"59\"\n    [step]=\"stepSecond\"\n    [inputLabel]=\"'Second'\"\n    (inputChange)=\"setSecondValue($event)\"\n    (valueChange)=\"setSecondValue($event)\"\n></owl-date-time-timer-box>\n\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\n    <button\n        class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\n        type=\"button\"\n        tabindex=\"0\"\n        (click)=\"setMeridian($event)\"\n    >\n        <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n            {{ hour12ButtonLabel }}\n        </span>\n    </button>\n</div>\n", components: [{ type: OwlTimerBoxComponent, selector: "owl-date-time-timer-box", inputs: ["showDivider", "upBtnAriaLabel", "upBtnDisabled", "downBtnAriaLabel", "downBtnDisabled", "boxValue", "value", "min", "max", "step", "inputLabel"], outputs: ["valueChange", "inputChange"], exportAs: ["owlDateTimeTimerBox"] }], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlTimerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        exportAs: 'owlDateTimeTimer',
                        selector: 'owl-date-time-timer',
                        templateUrl: './timer.component.html',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        host: {
                            '[class.owl-dt-timer]': 'owlDTTimerClass',
                            '[attr.tabindex]': 'owlDTTimeTabIndex'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.NgZone }, { type: i0__namespace.ElementRef }, { type: OwlDateTimeIntl }, { type: i0__namespace.ChangeDetectorRef }, { type: DateTimeAdapter, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { pickerMoment: [{
                    type: i0.Input
                }], minDateTime: [{
                    type: i0.Input
                }], maxDateTime: [{
                    type: i0.Input
                }], showSecondsTimer: [{
                    type: i0.Input
                }], hour12Timer: [{
                    type: i0.Input
                }], stepHour: [{
                    type: i0.Input
                }], stepMinute: [{
                    type: i0.Input
                }], stepSecond: [{
                    type: i0.Input
                }], selectedChange: [{
                    type: i0.Output
                }] } });

    /**
     * date-time-picker.animations
     */
    var owlDateTimePickerAnimations = {
        transformPicker: animations.trigger('transformPicker', [
            animations.state('void', animations.style({ opacity: 0, transform: 'scale(1, 0)' })),
            animations.state('enter', animations.style({ opacity: 1, transform: 'scale(1, 1)' })),
            animations.transition('void => enter', animations.group([
                animations.query('@fadeInPicker', animations.animateChild(), { optional: true }),
                animations.animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
            ])),
            animations.transition('enter => void', animations.animate('100ms linear', animations.style({ opacity: 0 })))
        ]),
        fadeInPicker: animations.trigger('fadeInPicker', [
            animations.state('enter', animations.style({ opacity: 1 })),
            animations.state('void', animations.style({ opacity: 0 })),
            animations.transition('void => enter', animations.animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
        ])
    };

    var OwlDateTimeContainerComponent = /** @class */ (function () {
        function OwlDateTimeContainerComponent(cdRef, elmRef, pickerIntl, dateTimeAdapter) {
            this.cdRef = cdRef;
            this.elmRef = elmRef;
            this.pickerIntl = pickerIntl;
            this.dateTimeAdapter = dateTimeAdapter;
            this.activeSelectedIndex = 0; // The current active SelectedIndex in range select mode (0: 'from', 1: 'to')
            /**
             * Stream emits when try to hide picker
             */
            this.hidePicker$ = new rxjs.Subject();
            /**
             * Stream emits when try to confirm the selected value
             */
            this.confirmSelected$ = new rxjs.Subject();
            this.pickerOpened$ = new rxjs.Subject();
        }
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "hidePickerStream", {
            get: function () {
                return this.hidePicker$.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "confirmSelectedStream", {
            get: function () {
                return this.confirmSelected$.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerOpenedStream", {
            get: function () {
                return this.pickerOpened$.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerMoment", {
            get: function () {
                return this._clamPickerMoment;
            },
            set: function (value) {
                if (value) {
                    this._clamPickerMoment = this.dateTimeAdapter.clampDate(value, this.picker.minDateTime, this.picker.maxDateTime);
                }
                this.cdRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerType", {
            get: function () {
                return this.picker.pickerType;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "cancelLabel", {
            get: function () {
                return this.pickerIntl.cancelBtnLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "setLabel", {
            get: function () {
                return this.pickerIntl.setBtnLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "fromLabel", {
            /**
             * The range 'from' label
             */
            get: function () {
                return this.pickerIntl.rangeFromLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "toLabel", {
            /**
             * The range 'to' label
             */
            get: function () {
                return this.pickerIntl.rangeToLabel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "fromFormattedValue", {
            /**
             * The range 'from' formatted value
             */
            get: function () {
                var value = this.picker.selecteds[0];
                return value
                    ? this.dateTimeAdapter.format(value, this.picker.formatString)
                    : '';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "toFormattedValue", {
            /**
             * The range 'to' formatted value
             */
            get: function () {
                var value = this.picker.selecteds[1];
                return value
                    ? this.dateTimeAdapter.format(value, this.picker.formatString)
                    : '';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "showControlButtons", {
            /**
             * Cases in which the control buttons show in the picker
             * 1) picker mode is 'dialog'
             * 2) picker type is NOT 'calendar' and the picker mode is NOT 'inline'
             */
            get: function () {
                return (this.picker.pickerMode === 'dialog' ||
                    (this.picker.pickerType !== 'calendar' &&
                        this.picker.pickerMode !== 'inline'));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "containerElm", {
            get: function () {
                return this.elmRef.nativeElement;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerClass", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTPopupContainerClass", {
            get: function () {
                return this.picker.pickerMode === 'popup';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTDialogContainerClass", {
            get: function () {
                return this.picker.pickerMode === 'dialog';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTInlineContainerClass", {
            get: function () {
                return this.picker.pickerMode === 'inline';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerDisabledClass", {
            get: function () {
                return this.picker.disabled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerId", {
            get: function () {
                return this.picker.id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerAnimation", {
            get: function () {
                return this.picker.pickerMode === 'inline' ? '' : 'enter';
            },
            enumerable: false,
            configurable: true
        });
        OwlDateTimeContainerComponent.prototype.ngOnInit = function () { };
        OwlDateTimeContainerComponent.prototype.ngAfterContentInit = function () {
            this.initPicker();
        };
        OwlDateTimeContainerComponent.prototype.ngAfterViewInit = function () {
            this.focusPicker();
        };
        OwlDateTimeContainerComponent.prototype.handleContainerAnimationDone = function (event) {
            var toState = event.toState;
            if (toState === 'enter') {
                this.pickerOpened$.next();
            }
        };
        OwlDateTimeContainerComponent.prototype.dateSelected = function (date) {
            var result;
            if (this.picker.isInSingleMode) {
                result = this.dateSelectedInSingleMode(date);
                if (result) {
                    this.pickerMoment = result;
                    this.picker.select(result);
                }
                else {
                    // we close the picker when result is null and pickerType is calendar.
                    if (this.pickerType === 'calendar') {
                        this.hidePicker$.next(null);
                    }
                }
                return;
            }
            if (this.picker.isInRangeMode) {
                result = this.dateSelectedInRangeMode(date);
                if (result) {
                    this.pickerMoment = result[this.activeSelectedIndex];
                    this.picker.select(result);
                }
            }
        };
        OwlDateTimeContainerComponent.prototype.timeSelected = function (time) {
            this.pickerMoment = this.dateTimeAdapter.clone(time);
            if (!this.picker.dateTimeChecker(this.pickerMoment)) {
                return;
            }
            if (this.picker.isInSingleMode) {
                this.picker.select(this.pickerMoment);
                return;
            }
            if (this.picker.isInRangeMode) {
                var selecteds = __spreadArray([], __read(this.picker.selecteds));
                // check if the 'from' is after 'to' or 'to'is before 'from'
                // In this case, we set both the 'from' and 'to' the same value
                if ((this.activeSelectedIndex === 0 &&
                    selecteds[1] &&
                    this.dateTimeAdapter.compare(this.pickerMoment, selecteds[1]) === 1) ||
                    (this.activeSelectedIndex === 1 &&
                        selecteds[0] &&
                        this.dateTimeAdapter.compare(this.pickerMoment, selecteds[0]) === -1)) {
                    selecteds[0] = this.pickerMoment;
                    selecteds[1] = this.pickerMoment;
                }
                else {
                    selecteds[this.activeSelectedIndex] = this.pickerMoment;
                }
                this.picker.select(selecteds);
            }
        };
        /**
         * Handle click on cancel button
         */
        OwlDateTimeContainerComponent.prototype.onCancelClicked = function (event) {
            this.hidePicker$.next(null);
            event.preventDefault();
            return;
        };
        /**
         * Handle click on set button
         */
        OwlDateTimeContainerComponent.prototype.onSetClicked = function (event) {
            if (!this.picker.dateTimeChecker(this.pickerMoment)) {
                this.hidePicker$.next(null);
                event.preventDefault();
                return;
            }
            this.confirmSelected$.next(event);
            event.preventDefault();
            return;
        };
        /**
         * Handle click on inform radio group
         */
        OwlDateTimeContainerComponent.prototype.handleClickOnInfoGroup = function (event, index) {
            this.setActiveSelectedIndex(index);
            event.preventDefault();
            event.stopPropagation();
        };
        /**
         * Handle click on inform radio group
         */
        OwlDateTimeContainerComponent.prototype.handleKeydownOnInfoGroup = function (event, next, index) {
            switch (event.keyCode) {
                case keycodes.DOWN_ARROW:
                case keycodes.RIGHT_ARROW:
                case keycodes.UP_ARROW:
                case keycodes.LEFT_ARROW:
                    next.focus();
                    this.setActiveSelectedIndex(index === 0 ? 1 : 0);
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                case keycodes.SPACE:
                    this.setActiveSelectedIndex(index);
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                default:
                    return;
            }
        };
        /**
         * Set the value of activeSelectedIndex
         */
        OwlDateTimeContainerComponent.prototype.setActiveSelectedIndex = function (index) {
            if (this.picker.selectMode === 'range' &&
                this.activeSelectedIndex !== index) {
                this.activeSelectedIndex = index;
                var selected = this.picker.selecteds[this.activeSelectedIndex];
                if (this.picker.selecteds && selected) {
                    this.pickerMoment = this.dateTimeAdapter.clone(selected);
                }
            }
            return;
        };
        OwlDateTimeContainerComponent.prototype.initPicker = function () {
            this.pickerMoment = this.picker.startAt || this.dateTimeAdapter.now();
            this.activeSelectedIndex = this.picker.selectMode === 'rangeTo' ? 1 : 0;
        };
        /**
         * Select calendar date in single mode,
         * it returns null when date is not selected.
         */
        OwlDateTimeContainerComponent.prototype.dateSelectedInSingleMode = function (date) {
            if (this.dateTimeAdapter.isSameDay(date, this.picker.selected)) {
                return null;
            }
            return this.updateAndCheckCalendarDate(date);
        };
        /**
         * Select dates in range Mode
         */
        OwlDateTimeContainerComponent.prototype.dateSelectedInRangeMode = function (date) {
            var from = this.picker.selecteds[0];
            var to = this.picker.selecteds[1];
            var result = this.updateAndCheckCalendarDate(date);
            if (!result) {
                return null;
            }
            // if the given calendar day is after or equal to 'from',
            // set ths given date as 'to'
            // otherwise, set it as 'from' and set 'to' to null
            if (this.picker.selectMode === 'range') {
                if (this.picker.selecteds &&
                    this.picker.selecteds.length &&
                    !to &&
                    from &&
                    this.dateTimeAdapter.differenceInCalendarDays(result, from) >= 0) {
                    to = result;
                    this.activeSelectedIndex = 1;
                }
                else {
                    from = result;
                    to = null;
                    this.activeSelectedIndex = 0;
                }
            }
            else if (this.picker.selectMode === 'rangeFrom') {
                from = result;
                // if the from value is after the to value, set the to value as null
                if (to && this.dateTimeAdapter.compare(from, to) > 0) {
                    to = null;
                }
            }
            else if (this.picker.selectMode === 'rangeTo') {
                to = result;
                // if the from value is after the to value, set the from value as null
                if (from && this.dateTimeAdapter.compare(from, to) > 0) {
                    from = null;
                }
            }
            return [from, to];
        };
        /**
         * Update the given calendar date's time and check if it is valid
         * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
         * we need to update the given calendar date's time before selecting it.
         * if it is valid, return the updated dateTime
         * if it is not valid, return null
         */
        OwlDateTimeContainerComponent.prototype.updateAndCheckCalendarDate = function (date) {
            var result;
            // if the picker is 'both', update the calendar date's time value
            if (this.picker.pickerType === 'both') {
                result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(date), this.dateTimeAdapter.getMonth(date), this.dateTimeAdapter.getDate(date), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
                result = this.dateTimeAdapter.clampDate(result, this.picker.minDateTime, this.picker.maxDateTime);
            }
            else {
                result = this.dateTimeAdapter.clone(date);
            }
            // check the updated dateTime
            return this.picker.dateTimeChecker(result) ? result : null;
        };
        /**
         * Focus to the picker
         */
        OwlDateTimeContainerComponent.prototype.focusPicker = function () {
            if (this.picker.pickerMode === 'inline') {
                return;
            }
            if (this.calendar) {
                this.calendar.focusActiveCell();
            }
            else if (this.timer) {
                this.timer.focus();
            }
        };
        return OwlDateTimeContainerComponent;
    }());
    OwlDateTimeContainerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeContainerComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.ElementRef }, { token: OwlDateTimeIntl }, { token: DateTimeAdapter, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    OwlDateTimeContainerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: OwlDateTimeContainerComponent, selector: "owl-date-time-container", host: { listeners: { "@transformPicker.done": "handleContainerAnimationDone($event)" }, properties: { "class.owl-dt-container": "owlDTContainerClass", "class.owl-dt-popup-container": "owlDTPopupContainerClass", "class.owl-dt-dialog-container": "owlDTDialogContainerClass", "class.owl-dt-inline-container": "owlDTInlineContainerClass", "class.owl-dt-container-disabled": "owlDTContainerDisabledClass", "attr.id": "owlDTContainerId", "@transformPicker": "owlDTContainerAnimation" } }, viewQueries: [{ propertyName: "calendar", first: true, predicate: OwlCalendarComponent, descendants: true }, { propertyName: "timer", first: true, predicate: OwlTimerComponent, descendants: true }], exportAs: ["owlDateTimeContainer"], ngImport: i0__namespace, template: "<div [cdkTrapFocus]=\"picker.pickerMode !== 'inline'\"\n     [@fadeInPicker]=\"picker.pickerMode === 'inline'? '' : 'enter'\"\n     class=\"owl-dt-container-inner\">\n\n    <owl-date-time-calendar\n            *ngIf=\"pickerType === 'both' || pickerType === 'calendar'\"\n            class=\"owl-dt-container-row\"\n            [firstDayOfWeek]=\"picker.firstDayOfWeek\"\n            [(pickerMoment)]=\"pickerMoment\"\n            [selected]=\"picker.selected\"\n            [selecteds]=\"picker.selecteds\"\n            [selectMode]=\"picker.selectMode\"\n            [minDate]=\"picker.minDateTime\"\n            [maxDate]=\"picker.maxDateTime\"\n            [dateFilter]=\"picker.dateTimeFilter\"\n            [startView]=\"picker.startView\"\n            [hideOtherMonths]=\"picker.hideOtherMonths\"\n            (yearSelected)=\"picker.selectYear($event)\"\n            (monthSelected)=\"picker.selectMonth($event)\"\n            (selectedChange)=\"dateSelected($event)\"></owl-date-time-calendar>\n\n    <owl-date-time-timer\n            *ngIf=\"pickerType === 'both' || pickerType === 'timer'\"\n            class=\"owl-dt-container-row\"\n            [pickerMoment]=\"pickerMoment\"\n            [minDateTime]=\"picker.minDateTime\"\n            [maxDateTime]=\"picker.maxDateTime\"\n            [showSecondsTimer]=\"picker.showSecondsTimer\"\n            [hour12Timer]=\"picker.hour12Timer\"\n            [stepHour]=\"picker.stepHour\"\n            [stepMinute]=\"picker.stepMinute\"\n            [stepSecond]=\"picker.stepSecond\"\n            (selectedChange)=\"timeSelected($event)\"></owl-date-time-timer>\n\n    <div *ngIf=\"picker.isInRangeMode\"\n         role=\"radiogroup\"\n         class=\"owl-dt-container-info owl-dt-container-row\">\n        <div role=\"radio\" [tabindex]=\"activeSelectedIndex === 0 ? 0 : -1\"\n             [attr.aria-checked]=\"activeSelectedIndex === 0\"\n             class=\"owl-dt-control owl-dt-container-range owl-dt-container-from\"\n             [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 0}\"\n             (click)=\"handleClickOnInfoGroup($event, 0)\"\n             (keydown)=\"handleKeydownOnInfoGroup($event, to, 0)\" #from>\n            <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\n                <span class=\"owl-dt-container-info-label\">{{fromLabel}}:</span>\n                <span class=\"owl-dt-container-info-value\">{{fromFormattedValue}}</span>\n            </span>\n        </div>\n        <div role=\"radio\" [tabindex]=\"activeSelectedIndex === 1 ? 0 : -1\"\n             [attr.aria-checked]=\"activeSelectedIndex === 1\"\n             class=\"owl-dt-control owl-dt-container-range owl-dt-container-to\"\n             [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 1}\"\n             (click)=\"handleClickOnInfoGroup($event, 1)\"\n             (keydown)=\"handleKeydownOnInfoGroup($event, from, 1)\" #to>\n            <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\n                <span class=\"owl-dt-container-info-label\">{{toLabel}}:</span>\n                <span class=\"owl-dt-container-info-value\">{{toFormattedValue}}</span>\n            </span>\n        </div>\n    </div>\n\n    <div *ngIf=\"showControlButtons\" class=\"owl-dt-container-buttons owl-dt-container-row\">\n        <button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\n                type=\"button\" tabindex=\"0\"\n                (click)=\"onCancelClicked($event)\">\n            <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n                {{cancelLabel}}\n            </span>\n        </button>\n        <button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\n                type=\"button\" tabindex=\"0\"\n                (click)=\"onSetClicked($event)\">\n            <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n                {{setLabel}}\n            </span>\n        </button>\n    </div>\n</div>\n", components: [{ type: OwlCalendarComponent, selector: "owl-date-time-calendar", inputs: ["dateFilter", "firstDayOfWeek", "minDate", "maxDate", "pickerMoment", "selectMode", "selected", "selecteds", "startView", "hideOtherMonths"], outputs: ["pickerMomentChange", "selectedChange", "userSelection", "yearSelected", "monthSelected"], exportAs: ["owlDateTimeCalendar"] }, { type: OwlTimerComponent, selector: "owl-date-time-timer", inputs: ["pickerMoment", "minDateTime", "maxDateTime", "showSecondsTimer", "hour12Timer", "stepHour", "stepMinute", "stepSecond"], outputs: ["selectedChange"], exportAs: ["owlDateTimeTimer"] }], directives: [{ type: i1__namespace$1.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], animations: [
            owlDateTimePickerAnimations.transformPicker,
            owlDateTimePickerAnimations.fadeInPicker
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeContainerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        exportAs: 'owlDateTimeContainer',
                        selector: 'owl-date-time-container',
                        templateUrl: './date-time-picker-container.component.html',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        animations: [
                            owlDateTimePickerAnimations.transformPicker,
                            owlDateTimePickerAnimations.fadeInPicker
                        ],
                        host: {
                            '(@transformPicker.done)': 'handleContainerAnimationDone($event)',
                            '[class.owl-dt-container]': 'owlDTContainerClass',
                            '[class.owl-dt-popup-container]': 'owlDTPopupContainerClass',
                            '[class.owl-dt-dialog-container]': 'owlDTDialogContainerClass',
                            '[class.owl-dt-inline-container]': 'owlDTInlineContainerClass',
                            '[class.owl-dt-container-disabled]': 'owlDTContainerDisabledClass',
                            '[attr.id]': 'owlDTContainerId',
                            '[@transformPicker]': 'owlDTContainerAnimation'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.ElementRef }, { type: OwlDateTimeIntl }, { type: DateTimeAdapter, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { calendar: [{
                    type: i0.ViewChild,
                    args: [OwlCalendarComponent]
                }], timer: [{
                    type: i0.ViewChild,
                    args: [OwlTimerComponent]
                }] } });

    /**
     * date-time.class
     */
    var nextUniqueId = 0;
    var OwlDateTime = /** @class */ (function () {
        function OwlDateTime(dateTimeAdapter, dateTimeFormats) {
            var _this = this;
            this.dateTimeAdapter = dateTimeAdapter;
            this.dateTimeFormats = dateTimeFormats;
            /**
             * Whether to show the second's timer
             */
            this._showSecondsTimer = false;
            /**
             * Whether the timer is in hour12 format
             */
            this._hour12Timer = false;
            /**
             * The view that the calendar should start in.
             */
            this.startView = 'month';
            /**
             * Hours to change per step
             */
            this._stepHour = 1;
            /**
             * Minutes to change per step
             */
            this._stepMinute = 1;
            /**
             * Seconds to change per step
             */
            this._stepSecond = 1;
            /**
             * Whether to hide dates in other months at the start or end of the current month.
             */
            this._hideOtherMonths = false;
            /**
             * Date Time Checker to check if the give dateTime is selectable
             */
            this.dateTimeChecker = function (dateTime) {
                return (!!dateTime &&
                    (!_this.dateTimeFilter || _this.dateTimeFilter(dateTime)) &&
                    (!_this.minDateTime ||
                        _this.dateTimeAdapter.compare(dateTime, _this.minDateTime) >=
                            0) &&
                    (!_this.maxDateTime ||
                        _this.dateTimeAdapter.compare(dateTime, _this.maxDateTime) <= 0));
            };
            if (!this.dateTimeAdapter) {
                throw Error("OwlDateTimePicker: No provider found for DateTimeAdapter. You must import one of the following " +
                    "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                    "custom implementation.");
            }
            if (!this.dateTimeFormats) {
                throw Error("OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following " +
                    "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                    "custom implementation.");
            }
            this._id = "owl-dt-picker-" + nextUniqueId++;
        }
        Object.defineProperty(OwlDateTime.prototype, "showSecondsTimer", {
            get: function () {
                return this._showSecondsTimer;
            },
            set: function (val) {
                this._showSecondsTimer = coercion.coerceBooleanProperty(val);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "hour12Timer", {
            get: function () {
                return this._hour12Timer;
            },
            set: function (val) {
                this._hour12Timer = coercion.coerceBooleanProperty(val);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "stepHour", {
            get: function () {
                return this._stepHour;
            },
            set: function (val) {
                this._stepHour = coercion.coerceNumberProperty(val, 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "stepMinute", {
            get: function () {
                return this._stepMinute;
            },
            set: function (val) {
                this._stepMinute = coercion.coerceNumberProperty(val, 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "stepSecond", {
            get: function () {
                return this._stepSecond;
            },
            set: function (val) {
                this._stepSecond = coercion.coerceNumberProperty(val, 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "firstDayOfWeek", {
            get: function () {
                return this._firstDayOfWeek;
            },
            set: function (value) {
                value = coercion.coerceNumberProperty(value);
                if (value > 6 || value < 0) {
                    this._firstDayOfWeek = undefined;
                }
                else {
                    this._firstDayOfWeek = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "hideOtherMonths", {
            get: function () {
                return this._hideOtherMonths;
            },
            set: function (val) {
                this._hideOtherMonths = coercion.coerceBooleanProperty(val);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "formatString", {
            get: function () {
                return this.pickerType === 'both'
                    ? this.dateTimeFormats.fullPickerInput
                    : this.pickerType === 'calendar'
                        ? this.dateTimeFormats.datePickerInput
                        : this.dateTimeFormats.timePickerInput;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "disabled", {
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        OwlDateTime.prototype.getValidDate = function (obj) {
            return this.dateTimeAdapter.isDateInstance(obj) &&
                this.dateTimeAdapter.isValid(obj)
                ? obj
                : null;
        };
        return OwlDateTime;
    }());
    OwlDateTime.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTime, deps: [{ token: DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    OwlDateTime.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTime });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTime, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () {
            return [{ type: DateTimeAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [OWL_DATE_TIME_FORMATS]
                        }] }];
        }, propDecorators: { showSecondsTimer: [{
                    type: i0.Input
                }], hour12Timer: [{
                    type: i0.Input
                }], startView: [{
                    type: i0.Input
                }], stepHour: [{
                    type: i0.Input
                }], stepMinute: [{
                    type: i0.Input
                }], stepSecond: [{
                    type: i0.Input
                }], firstDayOfWeek: [{
                    type: i0.Input
                }], hideOtherMonths: [{
                    type: i0.Input
                }] } });

    var uniqueId = 0;
    var OwlDialogConfig = /** @class */ (function () {
        function OwlDialogConfig() {
            /**
             * ID of the element that describes the dialog.
             */
            this.ariaDescribedBy = null;
            /**
             * Whether to focus the dialog when the dialog is opened
             */
            this.autoFocus = true;
            /** Whether the dialog has a backdrop. */
            this.hasBackdrop = true;
            /** Data being injected into the child component. */
            this.data = null;
            /** Whether the user can use escape or clicking outside to close a modal. */
            this.disableClose = false;
            /**
             * The ARIA role of the dialog element.
             */
            this.role = 'dialog';
            /**
             * Custom class for the pane
             */
            this.paneClass = '';
            /**
             * Mouse Event
             */
            this.event = null;
            /**
             * Custom class for the backdrop
             */
            this.backdropClass = '';
            /**
             * Whether the dialog should close when the user goes backwards/forwards in history.
             */
            this.closeOnNavigation = true;
            /** Width of the dialog. */
            this.width = '';
            /** Height of the dialog. */
            this.height = '';
            /**
             * The max-width of the overlay panel.
             * If a number is provided, pixel units are assumed.
             */
            this.maxWidth = '85vw';
            /**
             * The scroll strategy when the dialog is open
             * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
             */
            this.scrollStrategy = new i1$2.NoopScrollStrategy();
            this.id = "owl-dialog-" + uniqueId++;
        }
        return OwlDialogConfig;
    }());

    var OwlDialogRef = /** @class */ (function () {
        function OwlDialogRef(overlayRef, container, id, location) {
            var _this = this;
            this.overlayRef = overlayRef;
            this.container = container;
            this.id = id;
            this._beforeClose$ = new rxjs.Subject();
            this._afterOpen$ = new rxjs.Subject();
            this._afterClosed$ = new rxjs.Subject();
            /** Subscription to changes in the user's location. */
            this.locationChanged = rxjs.Subscription.EMPTY;
            /** Whether the user is allowed to close the dialog. */
            this.disableClose = this.container.config.disableClose;
            this.container.animationStateChanged
                .pipe(operators.filter(function (event) { return event.phaseName === 'done' && event.toState === 'enter'; }), operators.take(1))
                .subscribe(function () {
                _this._afterOpen$.next();
                _this._afterOpen$.complete();
            });
            this.container.animationStateChanged
                .pipe(operators.filter(function (event) { return event.phaseName === 'done' && event.toState === 'exit'; }), operators.take(1))
                .subscribe(function () {
                _this.overlayRef.dispose();
                _this.locationChanged.unsubscribe();
                _this._afterClosed$.next(_this.result);
                _this._afterClosed$.complete();
                _this.componentInstance = undefined;
            });
            this.overlayRef
                .keydownEvents()
                .pipe(operators.filter(function (event) { return event.keyCode === keycodes.ESCAPE && !_this.disableClose; }))
                .subscribe(function () { return _this.close(); });
            if (location) {
                this.locationChanged = location.subscribe(function () {
                    if (_this.container.config.closeOnNavigation) {
                        _this.close();
                    }
                });
            }
        }
        OwlDialogRef.prototype.close = function (dialogResult) {
            var _this = this;
            this.result = dialogResult;
            this.container.animationStateChanged
                .pipe(operators.filter(function (event) { return event.phaseName === 'start'; }), operators.take(1))
                .subscribe(function () {
                _this._beforeClose$.next(dialogResult);
                _this._beforeClose$.complete();
                _this.overlayRef.detachBackdrop();
            });
            this.container.startExitAnimation();
        };
        /**
         * Gets an observable that emits when the overlay's backdrop has been clicked.
         */
        OwlDialogRef.prototype.backdropClick = function () {
            return this.overlayRef.backdropClick();
        };
        /**
         * Gets an observable that emits when keydown events are targeted on the overlay.
         */
        OwlDialogRef.prototype.keydownEvents = function () {
            return this.overlayRef.keydownEvents();
        };
        /**
         * Updates the dialog's position.
         * @param position New dialog position.
         */
        OwlDialogRef.prototype.updatePosition = function (position) {
            var strategy = this.getPositionStrategy();
            if (position && (position.left || position.right)) {
                position.left
                    ? strategy.left(position.left)
                    : strategy.right(position.right);
            }
            else {
                strategy.centerHorizontally();
            }
            if (position && (position.top || position.bottom)) {
                position.top
                    ? strategy.top(position.top)
                    : strategy.bottom(position.bottom);
            }
            else {
                strategy.centerVertically();
            }
            this.overlayRef.updatePosition();
            return this;
        };
        /**
         * Updates the dialog's width and height.
         * @param width New width of the dialog.
         * @param height New height of the dialog.
         */
        OwlDialogRef.prototype.updateSize = function (width, height) {
            if (width === void 0) { width = 'auto'; }
            if (height === void 0) { height = 'auto'; }
            this.getPositionStrategy()
                .width(width)
                .height(height);
            this.overlayRef.updatePosition();
            return this;
        };
        OwlDialogRef.prototype.isAnimating = function () {
            return this.container.isAnimating;
        };
        OwlDialogRef.prototype.afterOpen = function () {
            return this._afterOpen$.asObservable();
        };
        OwlDialogRef.prototype.beforeClose = function () {
            return this._beforeClose$.asObservable();
        };
        OwlDialogRef.prototype.afterClosed = function () {
            return this._afterClosed$.asObservable();
        };
        /** Fetches the position strategy object from the overlay ref. */
        OwlDialogRef.prototype.getPositionStrategy = function () {
            return this.overlayRef.getConfig()
                .positionStrategy;
        };
        return OwlDialogRef;
    }());

    var zoomFadeIn = {
        opacity: 0,
        transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})'
    };
    var zoomFadeInFrom = {
        opacity: 0,
        transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})',
        transformOrigin: '{{ ox }} {{ oy }}'
    };
    var OwlDialogContainerComponent = /** @class */ (function (_super) {
        __extends(OwlDialogContainerComponent, _super);
        function OwlDialogContainerComponent(changeDetector, elementRef, focusTrapFactory, document) {
            var _this = _super.call(this) || this;
            _this.changeDetector = changeDetector;
            _this.elementRef = elementRef;
            _this.focusTrapFactory = focusTrapFactory;
            _this.document = document;
            /** ID of the element that should be considered as the dialog's label. */
            _this.ariaLabelledBy = null;
            /** Emits when an animation state changes. */
            _this.animationStateChanged = new i0.EventEmitter();
            _this.isAnimating = false;
            _this.state = 'enter';
            // for animation purpose
            _this.params = {
                x: '0px',
                y: '0px',
                ox: '50%',
                oy: '50%',
                scale: 0
            };
            // A variable to hold the focused element before the dialog was open.
            // This would help us to refocus back to element when the dialog was closed.
            _this.elementFocusedBeforeDialogWasOpened = null;
            return _this;
        }
        Object.defineProperty(OwlDialogContainerComponent.prototype, "config", {
            get: function () {
                return this._config;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerClass", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerTabIndex", {
            get: function () {
                return -1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerId", {
            get: function () {
                return this._config.id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerRole", {
            get: function () {
                return this._config.role || null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAriaLabelledby", {
            get: function () {
                return this.ariaLabelledBy;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAriaDescribedby", {
            get: function () {
                return this._config.ariaDescribedBy || null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAnimation", {
            get: function () {
                return { value: this.state, params: this.params };
            },
            enumerable: false,
            configurable: true
        });
        OwlDialogContainerComponent.prototype.ngOnInit = function () { };
        /**
         * Attach a ComponentPortal as content to this dialog container.
         */
        OwlDialogContainerComponent.prototype.attachComponentPortal = function (portal) {
            if (this.portalOutlet.hasAttached()) {
                throw Error('Attempting to attach dialog content after content is already attached');
            }
            this.savePreviouslyFocusedElement();
            return this.portalOutlet.attachComponentPortal(portal);
        };
        OwlDialogContainerComponent.prototype.attachTemplatePortal = function (portal) {
            throw new Error('Method not implemented.');
        };
        OwlDialogContainerComponent.prototype.setConfig = function (config) {
            this._config = config;
            if (config.event) {
                this.calculateZoomOrigin(event);
            }
        };
        OwlDialogContainerComponent.prototype.onAnimationStart = function (event) {
            this.isAnimating = true;
            this.animationStateChanged.emit(event);
        };
        OwlDialogContainerComponent.prototype.onAnimationDone = function (event) {
            if (event.toState === 'enter') {
                this.trapFocus();
            }
            else if (event.toState === 'exit') {
                this.restoreFocus();
            }
            this.animationStateChanged.emit(event);
            this.isAnimating = false;
        };
        OwlDialogContainerComponent.prototype.startExitAnimation = function () {
            this.state = 'exit';
            this.changeDetector.markForCheck();
        };
        /**
         * Calculate origin used in the `zoomFadeInFrom()`
         * for animation purpose
         */
        OwlDialogContainerComponent.prototype.calculateZoomOrigin = function (event) {
            if (!event) {
                return;
            }
            var clientX = event.clientX;
            var clientY = event.clientY;
            var wh = window.innerWidth / 2;
            var hh = window.innerHeight / 2;
            var x = clientX - wh;
            var y = clientY - hh;
            var ox = clientX / window.innerWidth;
            var oy = clientY / window.innerHeight;
            this.params.x = x + "px";
            this.params.y = y + "px";
            this.params.ox = ox * 100 + "%";
            this.params.oy = oy * 100 + "%";
            this.params.scale = 0;
            return;
        };
        /**
         * Save the focused element before dialog was open
         */
        OwlDialogContainerComponent.prototype.savePreviouslyFocusedElement = function () {
            var _this = this;
            if (this.document) {
                this.elementFocusedBeforeDialogWasOpened = this.document
                    .activeElement;
                Promise.resolve().then(function () { return _this.elementRef.nativeElement.focus(); });
            }
        };
        OwlDialogContainerComponent.prototype.trapFocus = function () {
            if (!this.focusTrap) {
                this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
            }
            if (this._config.autoFocus) {
                this.focusTrap.focusInitialElementWhenReady();
            }
        };
        OwlDialogContainerComponent.prototype.restoreFocus = function () {
            var toFocus = this.elementFocusedBeforeDialogWasOpened;
            // We need the extra check, because IE can set the `activeElement` to null in some cases.
            if (toFocus && typeof toFocus.focus === 'function') {
                toFocus.focus();
            }
            if (this.focusTrap) {
                this.focusTrap.destroy();
            }
        };
        return OwlDialogContainerComponent;
    }(i2.BasePortalOutlet));
    OwlDialogContainerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDialogContainerComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.ElementRef }, { token: i1__namespace$1.FocusTrapFactory }, { token: i1.DOCUMENT, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    OwlDialogContainerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: OwlDialogContainerComponent, selector: "owl-dialog-container", host: { listeners: { "@slideModal.start": "onAnimationStart($event)", "@slideModal.done": "onAnimationDone($event)" }, properties: { "class.owl-dialog-container": "owlDialogContainerClass", "attr.tabindex": "owlDialogContainerTabIndex", "attr.id": "owlDialogContainerId", "attr.role": "owlDialogContainerRole", "attr.aria-labelledby": "owlDialogContainerAriaLabelledby", "attr.aria-describedby": "owlDialogContainerAriaDescribedby", "@slideModal": "owlDialogContainerAnimation" } }, viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: i2.CdkPortalOutlet, descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<ng-template cdkPortalOutlet></ng-template>\n", directives: [{ type: i2__namespace.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [
            animations.trigger('slideModal', [
                animations.transition('void => enter', [
                    animations.style(zoomFadeInFrom),
                    animations.animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', animations.style('*')),
                    animations.animate('150ms', animations.keyframes([
                        animations.style({ transform: 'scale(1)', offset: 0 }),
                        animations.style({ transform: 'scale(1.05)', offset: 0.3 }),
                        animations.style({ transform: 'scale(.95)', offset: 0.8 }),
                        animations.style({ transform: 'scale(1)', offset: 1.0 })
                    ])),
                    animations.animateChild()
                ], {
                    params: {
                        x: '0px',
                        y: '0px',
                        ox: '50%',
                        oy: '50%',
                        scale: 1
                    }
                }),
                animations.transition('enter => exit', [animations.animateChild(), animations.animate(200, animations.style(zoomFadeIn))], { params: { x: '0px', y: '0px', ox: '50%', oy: '50%' } })
            ])
        ] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDialogContainerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'owl-dialog-container',
                        templateUrl: './dialog-container.component.html',
                        animations: [
                            animations.trigger('slideModal', [
                                animations.transition('void => enter', [
                                    animations.style(zoomFadeInFrom),
                                    animations.animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', animations.style('*')),
                                    animations.animate('150ms', animations.keyframes([
                                        animations.style({ transform: 'scale(1)', offset: 0 }),
                                        animations.style({ transform: 'scale(1.05)', offset: 0.3 }),
                                        animations.style({ transform: 'scale(.95)', offset: 0.8 }),
                                        animations.style({ transform: 'scale(1)', offset: 1.0 })
                                    ])),
                                    animations.animateChild()
                                ], {
                                    params: {
                                        x: '0px',
                                        y: '0px',
                                        ox: '50%',
                                        oy: '50%',
                                        scale: 1
                                    }
                                }),
                                animations.transition('enter => exit', [animations.animateChild(), animations.animate(200, animations.style(zoomFadeIn))], { params: { x: '0px', y: '0px', ox: '50%', oy: '50%' } })
                            ])
                        ],
                        host: {
                            '(@slideModal.start)': 'onAnimationStart($event)',
                            '(@slideModal.done)': 'onAnimationDone($event)',
                            '[class.owl-dialog-container]': 'owlDialogContainerClass',
                            '[attr.tabindex]': 'owlDialogContainerTabIndex',
                            '[attr.id]': 'owlDialogContainerId',
                            '[attr.role]': 'owlDialogContainerRole',
                            '[attr.aria-labelledby]': 'owlDialogContainerAriaLabelledby',
                            '[attr.aria-describedby]': 'owlDialogContainerAriaDescribedby',
                            '[@slideModal]': 'owlDialogContainerAnimation'
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.ElementRef }, { type: i1__namespace$1.FocusTrapFactory }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i1.DOCUMENT]
                        }] }];
        }, propDecorators: { portalOutlet: [{
                    type: i0.ViewChild,
                    args: [i2.CdkPortalOutlet, { static: true }]
                }] } });

    /**
     * object.utils
     */
    /**
     * Extends an object with the *enumerable* and *own* properties of one or more source objects,
     * similar to Object.assign.
     *
     * @param dest The object which will have properties copied to it.
     * @param sources The source objects from which properties will be copied.
     */
    function extendObject(dest) {
        var e_1, _a;
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        if (dest == null) {
            throw TypeError('Cannot convert undefined or null to object');
        }
        try {
            for (var sources_1 = __values(sources), sources_1_1 = sources_1.next(); !sources_1_1.done; sources_1_1 = sources_1.next()) {
                var source = sources_1_1.value;
                if (source != null) {
                    for (var key in source) {
                        if (source.hasOwnProperty(key)) {
                            dest[key] = source[key];
                        }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (sources_1_1 && !sources_1_1.done && (_a = sources_1.return)) _a.call(sources_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return dest;
    }

    /**
     * index
     */

    /**
     * dialog.service
     */
    var OWL_DIALOG_DATA = new i0.InjectionToken('OwlDialogData');
    /**
     * Injection token that determines the scroll handling while the dialog is open.
     */
    var OWL_DIALOG_SCROLL_STRATEGY = new i0.InjectionToken('owl-dialog-scroll-strategy');
    function OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
        return function () { return overlay.scrollStrategies.block(); };
    }
    /** @docs-private */
    var OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = {
        provide: OWL_DIALOG_SCROLL_STRATEGY,
        deps: [i1$2.Overlay],
        useFactory: OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY
    };
    /**
     * Injection token that can be used to specify default dialog options.
     */
    var OWL_DIALOG_DEFAULT_OPTIONS = new i0.InjectionToken('owl-dialog-default-options');
    var OwlDialogService = /** @class */ (function () {
        function OwlDialogService(overlay, injector, location, scrollStrategy, defaultOptions, parentDialog, overlayContainer) {
            var _this = this;
            this.overlay = overlay;
            this.injector = injector;
            this.location = location;
            this.defaultOptions = defaultOptions;
            this.parentDialog = parentDialog;
            this.overlayContainer = overlayContainer;
            this.ariaHiddenElements = new Map();
            this._openDialogsAtThisLevel = [];
            this._afterOpenAtThisLevel = new rxjs.Subject();
            this._afterAllClosedAtThisLevel = new rxjs.Subject();
            /**
             * Stream that emits when all open dialog have finished closing.
             * Will emit on subscribe if there are no open dialogs to begin with.
             */
            this.afterAllClosed = rxjs.defer(function () { return _this._openDialogsAtThisLevel.length
                ? _this._afterAllClosed
                : _this._afterAllClosed.pipe(operators.startWith(undefined)); });
            this.scrollStrategy = scrollStrategy;
            if (!parentDialog && location) {
                location.subscribe(function () { return _this.closeAll(); });
            }
        }
        Object.defineProperty(OwlDialogService.prototype, "openDialogs", {
            /** Keeps track of the currently-open dialogs. */
            get: function () {
                return this.parentDialog
                    ? this.parentDialog.openDialogs
                    : this._openDialogsAtThisLevel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDialogService.prototype, "afterOpen", {
            /** Stream that emits when a dialog has been opened. */
            get: function () {
                return this.parentDialog
                    ? this.parentDialog.afterOpen
                    : this._afterOpenAtThisLevel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDialogService.prototype, "_afterAllClosed", {
            get: function () {
                var parent = this.parentDialog;
                return parent
                    ? parent._afterAllClosed
                    : this._afterAllClosedAtThisLevel;
            },
            enumerable: false,
            configurable: true
        });
        OwlDialogService.prototype.open = function (componentOrTemplateRef, config) {
            var _this = this;
            config = applyConfigDefaults(config, this.defaultOptions);
            if (config.id && this.getDialogById(config.id)) {
                throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
            }
            var overlayRef = this.createOverlay(config);
            var dialogContainer = this.attachDialogContainer(overlayRef, config);
            var dialogRef = this.attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
            if (!this.openDialogs.length) {
                this.hideNonDialogContentFromAssistiveTechnology();
            }
            this.openDialogs.push(dialogRef);
            dialogRef
                .afterClosed()
                .subscribe(function () { return _this.removeOpenDialog(dialogRef); });
            this.afterOpen.next(dialogRef);
            return dialogRef;
        };
        /**
         * Closes all of the currently-open dialogs.
         */
        OwlDialogService.prototype.closeAll = function () {
            var i = this.openDialogs.length;
            while (i--) {
                this.openDialogs[i].close();
            }
        };
        /**
         * Finds an open dialog by its id.
         * @param id ID to use when looking up the dialog.
         */
        OwlDialogService.prototype.getDialogById = function (id) {
            return this.openDialogs.find(function (dialog) { return dialog.id === id; });
        };
        OwlDialogService.prototype.attachDialogContent = function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
            var dialogRef = new OwlDialogRef(overlayRef, dialogContainer, config.id, this.location);
            if (config.hasBackdrop) {
                overlayRef.backdropClick().subscribe(function () {
                    if (!dialogRef.disableClose) {
                        dialogRef.close();
                    }
                });
            }
            if (componentOrTemplateRef instanceof i0.TemplateRef) {
            }
            else {
                var injector = this.createInjector(config, dialogRef, dialogContainer);
                var contentRef = dialogContainer.attachComponentPortal(new i2.ComponentPortal(componentOrTemplateRef, undefined, injector));
                dialogRef.componentInstance = contentRef.instance;
            }
            dialogRef
                .updateSize(config.width, config.height)
                .updatePosition(config.position);
            return dialogRef;
        };
        OwlDialogService.prototype.createInjector = function (config, dialogRef, dialogContainer) {
            var userInjector = config &&
                config.viewContainerRef &&
                config.viewContainerRef.injector;
            var injectionTokens = new WeakMap();
            injectionTokens.set(OwlDialogRef, dialogRef);
            injectionTokens.set(OwlDialogContainerComponent, dialogContainer);
            injectionTokens.set(OWL_DIALOG_DATA, config.data);
            return new i2.PortalInjector(userInjector || this.injector, injectionTokens);
        };
        OwlDialogService.prototype.createOverlay = function (config) {
            var overlayConfig = this.getOverlayConfig(config);
            return this.overlay.create(overlayConfig);
        };
        OwlDialogService.prototype.attachDialogContainer = function (overlayRef, config) {
            var containerPortal = new i2.ComponentPortal(OwlDialogContainerComponent, config.viewContainerRef);
            var containerRef = overlayRef.attach(containerPortal);
            containerRef.instance.setConfig(config);
            return containerRef.instance;
        };
        OwlDialogService.prototype.getOverlayConfig = function (dialogConfig) {
            var state = new i1$2.OverlayConfig({
                positionStrategy: this.overlay.position().global(),
                scrollStrategy: dialogConfig.scrollStrategy || this.scrollStrategy(),
                panelClass: dialogConfig.paneClass,
                hasBackdrop: dialogConfig.hasBackdrop,
                minWidth: dialogConfig.minWidth,
                minHeight: dialogConfig.minHeight,
                maxWidth: dialogConfig.maxWidth,
                maxHeight: dialogConfig.maxHeight
            });
            if (dialogConfig.backdropClass) {
                state.backdropClass = dialogConfig.backdropClass;
            }
            return state;
        };
        OwlDialogService.prototype.removeOpenDialog = function (dialogRef) {
            var index = this._openDialogsAtThisLevel.indexOf(dialogRef);
            if (index > -1) {
                this.openDialogs.splice(index, 1);
                // If all the dialogs were closed, remove/restore the `aria-hidden`
                // to a the siblings and emit to the `afterAllClosed` stream.
                if (!this.openDialogs.length) {
                    this.ariaHiddenElements.forEach(function (previousValue, element) {
                        if (previousValue) {
                            element.setAttribute('aria-hidden', previousValue);
                        }
                        else {
                            element.removeAttribute('aria-hidden');
                        }
                    });
                    this.ariaHiddenElements.clear();
                    this._afterAllClosed.next();
                }
            }
        };
        /**
         * Hides all of the content that isn't an overlay from assistive technology.
         */
        OwlDialogService.prototype.hideNonDialogContentFromAssistiveTechnology = function () {
            var overlayContainer = this.overlayContainer.getContainerElement();
            // Ensure that the overlay container is attached to the DOM.
            if (overlayContainer.parentElement) {
                var siblings = overlayContainer.parentElement.children;
                for (var i = siblings.length - 1; i > -1; i--) {
                    var sibling = siblings[i];
                    if (sibling !== overlayContainer &&
                        sibling.nodeName !== 'SCRIPT' &&
                        sibling.nodeName !== 'STYLE' &&
                        !sibling.hasAttribute('aria-live')) {
                        this.ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
                        sibling.setAttribute('aria-hidden', 'true');
                    }
                }
            }
        };
        return OwlDialogService;
    }());
    OwlDialogService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDialogService, deps: [{ token: i1__namespace$2.Overlay }, { token: i0__namespace.Injector }, { token: i1__namespace.Location, optional: true }, { token: OWL_DIALOG_SCROLL_STRATEGY }, { token: OWL_DIALOG_DEFAULT_OPTIONS, optional: true }, { token: OwlDialogService, optional: true, skipSelf: true }, { token: i1__namespace$2.OverlayContainer }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    OwlDialogService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDialogService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDialogService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () {
            return [{ type: i1__namespace$2.Overlay }, { type: i0__namespace.Injector }, { type: i1__namespace.Location, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [OWL_DIALOG_SCROLL_STRATEGY]
                        }] }, { type: OwlDialogConfig, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [OWL_DIALOG_DEFAULT_OPTIONS]
                        }] }, { type: OwlDialogService, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.SkipSelf
                        }] }, { type: i1__namespace$2.OverlayContainer }];
        } });
    /**
     * Applies default options to the dialog config.
     * @param config Config to be modified.
     * @param defaultOptions Default config setting
     * @returns The new configuration object.
     */
    function applyConfigDefaults(config, defaultOptions) {
        return extendObject(new OwlDialogConfig(), config, defaultOptions);
    }

    /** Injection token that determines the scroll handling while the dtPicker is open. */
    var OWL_DTPICKER_SCROLL_STRATEGY = new i0.InjectionToken('owl-dtpicker-scroll-strategy');
    /** @docs-private */
    function OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
        return function () { return overlay.scrollStrategies.block(); };
    }
    /** @docs-private */
    var OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = {
        provide: OWL_DTPICKER_SCROLL_STRATEGY,
        deps: [i1$2.Overlay],
        useFactory: OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY
    };
    var OwlDateTimeComponent = /** @class */ (function (_super) {
        __extends(OwlDateTimeComponent, _super);
        function OwlDateTimeComponent(overlay, viewContainerRef, dialogService, ngZone, changeDetector, dateTimeAdapter, defaultScrollStrategy, dateTimeFormats, document) {
            var _this = _super.call(this, dateTimeAdapter, dateTimeFormats) || this;
            _this.overlay = overlay;
            _this.viewContainerRef = viewContainerRef;
            _this.dialogService = dialogService;
            _this.ngZone = ngZone;
            _this.changeDetector = changeDetector;
            _this.dateTimeAdapter = dateTimeAdapter;
            _this.dateTimeFormats = dateTimeFormats;
            _this.document = document;
            /** Custom class for the picker backdrop. */
            _this.backdropClass = [];
            /** Custom class for the picker overlay pane. */
            _this.panelClass = [];
            /**
             * Set the type of the dateTime picker
             *      'both' -- show both calendar and timer
             *      'calendar' -- show only calendar
             *      'timer' -- show only timer
             */
            _this._pickerType = 'both';
            /**
             * Whether the picker open as a dialog
             */
            _this._pickerMode = 'popup';
            /** Whether the calendar is open. */
            _this._opened = false;
            /**
             * Callback when the picker is closed
             */
            _this.afterPickerClosed = new i0.EventEmitter();
            /**
             * Callback when the picker is open
             */
            _this.afterPickerOpen = new i0.EventEmitter();
            /**
             * Emits selected year in multi-year view
             * This doesn't imply a change on the selected date.
             */
            _this.yearSelected = new i0.EventEmitter();
            /**
             * Emits selected month in year view
             * This doesn't imply a change on the selected date.
             */
            _this.monthSelected = new i0.EventEmitter();
            /**
             * Emit when the selected value has been confirmed
             */
            _this.confirmSelectedChange = new i0.EventEmitter();
            /**
             * Emits when the date time picker is disabled.
             */
            _this.disabledChange = new i0.EventEmitter();
            _this.dtInputSub = rxjs.Subscription.EMPTY;
            _this.hidePickerStreamSub = rxjs.Subscription.EMPTY;
            _this.confirmSelectedStreamSub = rxjs.Subscription.EMPTY;
            _this.pickerOpenedStreamSub = rxjs.Subscription.EMPTY;
            /** The element that was focused before the date time picker was opened. */
            _this.focusedElementBeforeOpen = null;
            _this._selecteds = [];
            _this.defaultScrollStrategy = defaultScrollStrategy;
            return _this;
        }
        Object.defineProperty(OwlDateTimeComponent.prototype, "startAt", {
            get: function () {
                // If an explicit startAt is set we start there, otherwise we start at whatever the currently
                // selected value is.
                if (this._startAt) {
                    return this._startAt;
                }
                if (this._dtInput) {
                    if (this._dtInput.selectMode === 'single') {
                        return this._dtInput.value || null;
                    }
                    else if (this._dtInput.selectMode === 'range' ||
                        this._dtInput.selectMode === 'rangeFrom') {
                        return this._dtInput.values[0] || null;
                    }
                    else if (this._dtInput.selectMode === 'rangeTo') {
                        return this._dtInput.values[1] || null;
                    }
                }
                return null;
            },
            set: function (date) {
                this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(date));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "pickerType", {
            get: function () {
                return this._pickerType;
            },
            set: function (val) {
                if (val !== this._pickerType) {
                    this._pickerType = val;
                    if (this._dtInput) {
                        this._dtInput.formatNativeInputValue();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "pickerMode", {
            get: function () {
                return this._pickerMode;
            },
            set: function (mode) {
                if (mode === 'popup') {
                    this._pickerMode = mode;
                }
                else {
                    this._pickerMode = 'dialog';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "disabled", {
            get: function () {
                return this._disabled === undefined && this._dtInput
                    ? this._dtInput.disabled
                    : !!this._disabled;
            },
            set: function (value) {
                value = coercion.coerceBooleanProperty(value);
                if (value !== this._disabled) {
                    this._disabled = value;
                    this.disabledChange.next(value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "opened", {
            get: function () {
                return this._opened;
            },
            set: function (val) {
                val ? this.open() : this.close();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "dtInput", {
            get: function () {
                return this._dtInput;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                this._selected = value;
                this.changeDetector.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "selecteds", {
            get: function () {
                return this._selecteds;
            },
            set: function (values) {
                this._selecteds = values;
                this.changeDetector.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "minDateTime", {
            /** The minimum selectable date. */
            get: function () {
                return this._dtInput && this._dtInput.min;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "maxDateTime", {
            /** The maximum selectable date. */
            get: function () {
                return this._dtInput && this._dtInput.max;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "dateTimeFilter", {
            get: function () {
                return this._dtInput && this._dtInput.dateTimeFilter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "selectMode", {
            get: function () {
                return this._dtInput.selectMode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "isInSingleMode", {
            get: function () {
                return this._dtInput.isInSingleMode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeComponent.prototype, "isInRangeMode", {
            get: function () {
                return this._dtInput.isInRangeMode;
            },
            enumerable: false,
            configurable: true
        });
        OwlDateTimeComponent.prototype.ngOnInit = function () { };
        OwlDateTimeComponent.prototype.ngOnDestroy = function () {
            this.close();
            this.dtInputSub.unsubscribe();
            this.disabledChange.complete();
            if (this.popupRef) {
                this.popupRef.dispose();
            }
        };
        OwlDateTimeComponent.prototype.registerInput = function (input) {
            var _this = this;
            if (this._dtInput) {
                throw Error('A Owl DateTimePicker can only be associated with a single input.');
            }
            this._dtInput = input;
            this.dtInputSub = this._dtInput.valueChange.subscribe(function (value) {
                if (Array.isArray(value)) {
                    _this.selecteds = value;
                }
                else {
                    _this.selected = value;
                }
            });
        };
        OwlDateTimeComponent.prototype.open = function () {
            var _this = this;
            if (this._opened || this.disabled) {
                return;
            }
            if (!this._dtInput) {
                throw Error('Attempted to open an DateTimePicker with no associated input.');
            }
            if (this.document) {
                this.focusedElementBeforeOpen = this.document.activeElement;
            }
            // reset the picker selected value
            if (this.isInSingleMode) {
                this.selected = this._dtInput.value;
            }
            else if (this.isInRangeMode) {
                this.selecteds = this._dtInput.values;
            }
            // when the picker is open , we make sure the picker's current selected time value
            // is the same as the _startAt time value.
            if (this.selected && this.pickerType !== 'calendar' && this._startAt) {
                this.selected = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.selected), this.dateTimeAdapter.getMonth(this.selected), this.dateTimeAdapter.getDate(this.selected), this.dateTimeAdapter.getHours(this._startAt), this.dateTimeAdapter.getMinutes(this._startAt), this.dateTimeAdapter.getSeconds(this._startAt));
            }
            this.pickerMode === 'dialog' ? this.openAsDialog() : this.openAsPopup();
            this.pickerContainer.picker = this;
            // Listen to picker container's hidePickerStream
            this.hidePickerStreamSub = this.pickerContainer.hidePickerStream.subscribe(function () {
                _this.close();
            });
            // Listen to picker container's confirmSelectedStream
            this.confirmSelectedStreamSub = this.pickerContainer.confirmSelectedStream.subscribe(function (event) {
                _this.confirmSelect(event);
            });
        };
        /**
         * Selects the given date
         */
        OwlDateTimeComponent.prototype.select = function (date) {
            if (Array.isArray(date)) {
                this.selecteds = __spreadArray([], __read(date));
            }
            else {
                this.selected = date;
            }
            /**
             * Cases in which automatically confirm the select when date or dates are selected:
             * 1) picker mode is NOT 'dialog'
             * 2) picker type is 'calendar' and selectMode is 'single'.
             * 3) picker type is 'calendar' and selectMode is 'range' and
             *    the 'selecteds' has 'from'(selecteds[0]) and 'to'(selecteds[1]) values.
             * 4) selectMode is 'rangeFrom' and selecteds[0] has value.
             * 5) selectMode is 'rangeTo' and selecteds[1] has value.
             */
            if (this.pickerMode !== 'dialog' &&
                this.pickerType === 'calendar' &&
                ((this.selectMode === 'single' && this.selected) ||
                    (this.selectMode === 'rangeFrom' && this.selecteds[0]) ||
                    (this.selectMode === 'rangeTo' && this.selecteds[1]) ||
                    (this.selectMode === 'range' &&
                        this.selecteds[0] &&
                        this.selecteds[1]))) {
                this.confirmSelect();
            }
        };
        /**
         * Emits the selected year in multi-year view
         */
        OwlDateTimeComponent.prototype.selectYear = function (normalizedYear) {
            this.yearSelected.emit(normalizedYear);
        };
        /**
         * Emits selected month in year view
         */
        OwlDateTimeComponent.prototype.selectMonth = function (normalizedMonth) {
            this.monthSelected.emit(normalizedMonth);
        };
        /**
         * Hide the picker
         */
        OwlDateTimeComponent.prototype.close = function () {
            var _this = this;
            if (!this._opened) {
                return;
            }
            if (this.popupRef && this.popupRef.hasAttached()) {
                this.popupRef.detach();
            }
            if (this.pickerContainerPortal &&
                this.pickerContainerPortal.isAttached) {
                this.pickerContainerPortal.detach();
            }
            if (this.hidePickerStreamSub) {
                this.hidePickerStreamSub.unsubscribe();
                this.hidePickerStreamSub = null;
            }
            if (this.confirmSelectedStreamSub) {
                this.confirmSelectedStreamSub.unsubscribe();
                this.confirmSelectedStreamSub = null;
            }
            if (this.pickerOpenedStreamSub) {
                this.pickerOpenedStreamSub.unsubscribe();
                this.pickerOpenedStreamSub = null;
            }
            if (this.dialogRef) {
                this.dialogRef.close();
                this.dialogRef = null;
            }
            var completeClose = function () {
                if (_this._opened) {
                    _this._opened = false;
                    _this.afterPickerClosed.emit(null);
                    _this.focusedElementBeforeOpen = null;
                }
            };
            if (this.focusedElementBeforeOpen &&
                typeof this.focusedElementBeforeOpen.focus === 'function') {
                // Because IE moves focus asynchronously, we can't count on it being restored before we've
                // marked the datepicker as closed. If the event fires out of sequence and the element that
                // we're refocusing opens the datepicker on focus, the user could be stuck with not being
                // able to close the calendar at all. We work around it by making the logic, that marks
                // the datepicker as closed, async as well.
                this.focusedElementBeforeOpen.focus();
                setTimeout(completeClose);
            }
            else {
                completeClose();
            }
        };
        /**
         * Confirm the selected value
         */
        OwlDateTimeComponent.prototype.confirmSelect = function (event) {
            if (this.isInSingleMode) {
                var selected = this.selected || this.startAt || this.dateTimeAdapter.now();
                this.confirmSelectedChange.emit(selected);
            }
            else if (this.isInRangeMode) {
                this.confirmSelectedChange.emit(this.selecteds);
            }
            this.close();
            return;
        };
        /**
         * Open the picker as a dialog
         */
        OwlDateTimeComponent.prototype.openAsDialog = function () {
            var _this = this;
            this.dialogRef = this.dialogService.open(OwlDateTimeContainerComponent, {
                autoFocus: false,
                backdropClass: __spreadArray([
                    'cdk-overlay-dark-backdrop'
                ], __read(coercion.coerceArray(this.backdropClass))),
                paneClass: __spreadArray(['owl-dt-dialog'], __read(coercion.coerceArray(this.panelClass))),
                viewContainerRef: this.viewContainerRef,
                scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy()
            });
            this.pickerContainer = this.dialogRef.componentInstance;
            this.dialogRef.afterOpen().subscribe(function () {
                _this.afterPickerOpen.emit(null);
                _this._opened = true;
            });
            this.dialogRef.afterClosed().subscribe(function () { return _this.close(); });
        };
        /**
         * Open the picker as popup
         */
        OwlDateTimeComponent.prototype.openAsPopup = function () {
            var _this = this;
            if (!this.pickerContainerPortal) {
                this.pickerContainerPortal = new i2.ComponentPortal(OwlDateTimeContainerComponent, this.viewContainerRef);
            }
            if (!this.popupRef) {
                this.createPopup();
            }
            if (!this.popupRef.hasAttached()) {
                var componentRef = this.popupRef.attach(this.pickerContainerPortal);
                this.pickerContainer = componentRef.instance;
                // Update the position once the calendar has rendered.
                this.ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1))
                    .subscribe(function () {
                    _this.popupRef.updatePosition();
                });
                // emit open stream
                this.pickerOpenedStreamSub = this.pickerContainer.pickerOpenedStream
                    .pipe(operators.take(1))
                    .subscribe(function () {
                    _this.afterPickerOpen.emit(null);
                    _this._opened = true;
                });
            }
        };
        OwlDateTimeComponent.prototype.createPopup = function () {
            var _this = this;
            var overlayConfig = new i1$2.OverlayConfig({
                positionStrategy: this.createPopupPositionStrategy(),
                hasBackdrop: true,
                backdropClass: __spreadArray([
                    'cdk-overlay-transparent-backdrop'
                ], __read(coercion.coerceArray(this.backdropClass))),
                scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
                panelClass: __spreadArray(['owl-dt-popup'], __read(coercion.coerceArray(this.panelClass)))
            });
            this.popupRef = this.overlay.create(overlayConfig);
            rxjs.merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef
                .keydownEvents()
                .pipe(operators.filter(function (event) { return event.keyCode === keycodes.ESCAPE ||
                (_this._dtInput &&
                    event.altKey &&
                    event.keyCode === keycodes.UP_ARROW); }))).subscribe(function () { return _this.close(); });
        };
        /**
         * Create the popup PositionStrategy.
         */
        OwlDateTimeComponent.prototype.createPopupPositionStrategy = function () {
            return this.overlay
                .position()
                .flexibleConnectedTo(this._dtInput.elementRef)
                .withTransformOriginOn('.owl-dt-container')
                .withFlexibleDimensions(false)
                .withPush(false)
                .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom'
                },
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top'
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom'
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetY: -176
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetY: -352
                }
            ]);
        };
        return OwlDateTimeComponent;
    }(OwlDateTime));
    OwlDateTimeComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeComponent, deps: [{ token: i1__namespace$2.Overlay }, { token: i0__namespace.ViewContainerRef }, { token: OwlDialogService }, { token: i0__namespace.NgZone }, { token: i0__namespace.ChangeDetectorRef }, { token: DateTimeAdapter, optional: true }, { token: OWL_DTPICKER_SCROLL_STRATEGY }, { token: OWL_DATE_TIME_FORMATS, optional: true }, { token: i1.DOCUMENT, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    OwlDateTimeComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: OwlDateTimeComponent, selector: "owl-date-time", inputs: { backdropClass: "backdropClass", panelClass: "panelClass", startAt: "startAt", pickerType: "pickerType", pickerMode: "pickerMode", disabled: "disabled", opened: "opened", scrollStrategy: "scrollStrategy" }, outputs: { afterPickerClosed: "afterPickerClosed", afterPickerOpen: "afterPickerOpen", yearSelected: "yearSelected", monthSelected: "monthSelected" }, exportAs: ["owlDateTime"], usesInheritance: true, ngImport: i0__namespace, template: "", changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'owl-date-time',
                        exportAs: 'owlDateTime',
                        templateUrl: './date-time-picker.component.html',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    }]
            }], ctorParameters: function () {
            return [{ type: i1__namespace$2.Overlay }, { type: i0__namespace.ViewContainerRef }, { type: OwlDialogService }, { type: i0__namespace.NgZone }, { type: i0__namespace.ChangeDetectorRef }, { type: DateTimeAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [OWL_DTPICKER_SCROLL_STRATEGY]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [OWL_DATE_TIME_FORMATS]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i1.DOCUMENT]
                        }] }];
        }, propDecorators: { backdropClass: [{
                    type: i0.Input
                }], panelClass: [{
                    type: i0.Input
                }], startAt: [{
                    type: i0.Input
                }], pickerType: [{
                    type: i0.Input
                }], pickerMode: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], opened: [{
                    type: i0.Input
                }], scrollStrategy: [{
                    type: i0.Input
                }], afterPickerClosed: [{
                    type: i0.Output
                }], afterPickerOpen: [{
                    type: i0.Output
                }], yearSelected: [{
                    type: i0.Output
                }], monthSelected: [{
                    type: i0.Output
                }] } });

    /**
     * date-time-picker-input.directive
     */
    var OWL_DATETIME_VALUE_ACCESSOR$1 = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return OwlDateTimeInputDirective; }),
        multi: true
    };
    var OWL_DATETIME_VALIDATORS = {
        provide: forms.NG_VALIDATORS,
        useExisting: i0.forwardRef(function () { return OwlDateTimeInputDirective; }),
        multi: true
    };
    var OwlDateTimeInputDirective = /** @class */ (function () {
        function OwlDateTimeInputDirective(elmRef, renderer, dateTimeAdapter, dateTimeFormats) {
            var _this = this;
            var _a, _b;
            this.elmRef = elmRef;
            this.renderer = renderer;
            this.dateTimeAdapter = dateTimeAdapter;
            this.dateTimeFormats = dateTimeFormats;
            /** The minimum valid date. */
            this._min = (_a = this.dateTimeAdapter) === null || _a === void 0 ? void 0 : _a.createDate(1, 0, 1, 0, 0, 0);
            /** The maximum valid date. */
            this._max = (_b = this.dateTimeAdapter) === null || _b === void 0 ? void 0 : _b.createDate(3000, 11, 31, 23, 59, 59);
            /**
             * The picker's select mode
             */
            this._selectMode = 'single';
            /**
             * The character to separate the 'from' and 'to' in input value
             */
            this.rangeSeparator = '-';
            this._values = [];
            /**
             * Callback to invoke when `change` event is fired on this `<input>`
             */
            this.dateTimeChange = new i0.EventEmitter();
            /**
             * Callback to invoke when an `input` event is fired on this `<input>`.
             */
            this.dateTimeInput = new i0.EventEmitter();
            this.dtPickerSub = rxjs.Subscription.EMPTY;
            this.localeSub = rxjs.Subscription.EMPTY;
            this.lastValueValid = true;
            this.onModelChange = function (date) { };
            this.onModelTouched = function () { };
            this.validatorOnChange = function () { };
            /** The form control validator for whether the input parses. */
            this.parseValidator = function () {
                var value = _this.elmRef.nativeElement.value;
                if (!value)
                    return null;
                return _this.lastValueValid
                    ? null
                    : { owlDateTimeParse: { text: value } };
            };
            /** The form control validator for the min date. */
            this.minValidator = function (control) {
                if (_this.isInSingleMode) {
                    var controlValue = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value));
                    return !_this.min ||
                        !controlValue ||
                        _this.dateTimeAdapter.compare(_this.min, controlValue) <= 0
                        ? null
                        : { owlDateTimeMin: { min: _this.min, actual: controlValue } };
                }
                else if (_this.isInRangeMode && control.value) {
                    var controlValueFrom = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[0]));
                    var controlValueTo = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[1]));
                    return !_this.min ||
                        !controlValueFrom ||
                        !controlValueTo ||
                        _this.dateTimeAdapter.compare(_this.min, controlValueFrom) <= 0
                        ? null
                        : {
                            owlDateTimeMin: {
                                min: _this.min,
                                actual: [controlValueFrom, controlValueTo]
                            }
                        };
                }
                return null;
            };
            /** The form control validator for the max date. */
            this.maxValidator = function (control) {
                if (_this.isInSingleMode) {
                    var controlValue = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value));
                    return !_this.max ||
                        !controlValue ||
                        _this.dateTimeAdapter.compare(_this.max, controlValue) >= 0
                        ? null
                        : { owlDateTimeMax: { max: _this.max, actual: controlValue } };
                }
                else if (_this.isInRangeMode && control.value) {
                    var controlValueFrom = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[0]));
                    var controlValueTo = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[1]));
                    return !_this.max ||
                        !controlValueFrom ||
                        !controlValueTo ||
                        _this.dateTimeAdapter.compare(_this.max, controlValueTo) >= 0
                        ? null
                        : {
                            owlDateTimeMax: {
                                max: _this.max,
                                actual: [controlValueFrom, controlValueTo]
                            }
                        };
                }
                return null;
            };
            /** The form control validator for the date filter. */
            this.filterValidator = function (control) {
                var controlValue = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value));
                return !_this._dateTimeFilter ||
                    !controlValue ||
                    _this._dateTimeFilter(controlValue)
                    ? null
                    : { owlDateTimeFilter: true };
            };
            /**
             * The form control validator for the range.
             * Check whether the 'before' value is before the 'to' value
             */
            this.rangeValidator = function (control) {
                if (_this.isInSingleMode || !control.value) {
                    return null;
                }
                var controlValueFrom = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[0]));
                var controlValueTo = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[1]));
                return !controlValueFrom ||
                    !controlValueTo ||
                    _this.dateTimeAdapter.compare(controlValueFrom, controlValueTo) <= 0
                    ? null
                    : { owlDateTimeRange: true };
            };
            /** The combined form control validator for this input. */
            this.validator = forms.Validators.compose([
                this.parseValidator,
                this.minValidator,
                this.maxValidator,
                this.filterValidator,
                this.rangeValidator
            ]);
            /** Emits when the value changes (either due to user input or programmatic change). */
            this.valueChange = new i0.EventEmitter();
            /** Emits when the disabled state has changed */
            this.disabledChange = new i0.EventEmitter();
            if (!this.dateTimeAdapter) {
                throw Error("OwlDateTimePicker: No provider found for DateTimePicker. You must import one of the following " +
                    "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                    "custom implementation.");
            }
            if (!this.dateTimeFormats) {
                throw Error("OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following " +
                    "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                    "custom implementation.");
            }
            this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(function () {
                _this.value = _this.value;
            });
        }
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTime", {
            /**
             * The date time picker that this input is associated with.
             */
            set: function (value) {
                this.registerDateTimePicker(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeFilter", {
            /**
             * A function to filter date time
             */
            set: function (filter) {
                this._dateTimeFilter = filter;
                this.validatorOnChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "dateTimeFilter", {
            get: function () {
                return this._dateTimeFilter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "disabled", {
            get: function () {
                return !!this._disabled;
            },
            set: function (value) {
                var newValue = coercion.coerceBooleanProperty(value);
                var element = this.elmRef.nativeElement;
                if (this._disabled !== newValue) {
                    this._disabled = newValue;
                    this.disabledChange.emit(newValue);
                }
                // We need to null check the `blur` method, because it's undefined during SSR.
                if (newValue && element.blur) {
                    // Normally, native input elements automatically blur if they turn disabled. This behavior
                    // is problematic, because it would mean that it triggers another change detection cycle,
                    // which then causes a changed after checked error if the input element was focused before.
                    element.blur();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "min", {
            get: function () {
                return this._min;
            },
            set: function (value) {
                this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
                this.validatorOnChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "max", {
            get: function () {
                return this._max;
            },
            set: function (value) {
                this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
                this.validatorOnChange();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "selectMode", {
            get: function () {
                return this._selectMode;
            },
            set: function (mode) {
                if (mode !== 'single' &&
                    mode !== 'range' &&
                    mode !== 'rangeFrom' &&
                    mode !== 'rangeTo') {
                    throw Error('OwlDateTime Error: invalid selectMode value!');
                }
                this._selectMode = mode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this.lastValueValid = !value || this.dateTimeAdapter.isValid(value);
                value = this.getValidDate(value);
                var oldDate = this._value;
                this._value = value;
                // set the input property 'value'
                this.formatNativeInputValue();
                // check if the input value changed
                if (!this.dateTimeAdapter.isEqual(oldDate, value)) {
                    this.valueChange.emit(value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "values", {
            get: function () {
                return this._values;
            },
            set: function (values) {
                var _this = this;
                if (values && values.length > 0) {
                    this._values = values.map(function (v) {
                        v = _this.dateTimeAdapter.deserialize(v);
                        return _this.getValidDate(v);
                    });
                    this.lastValueValid =
                        (!this._values[0] ||
                            this.dateTimeAdapter.isValid(this._values[0])) &&
                            (!this._values[1] ||
                                this.dateTimeAdapter.isValid(this._values[1]));
                }
                else {
                    this._values = [];
                    this.lastValueValid = true;
                }
                // set the input property 'value'
                this.formatNativeInputValue();
                this.valueChange.emit(this._values);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "elementRef", {
            get: function () {
                return this.elmRef;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "isInSingleMode", {
            get: function () {
                return this._selectMode === 'single';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "isInRangeMode", {
            get: function () {
                return (this._selectMode === 'range' ||
                    this._selectMode === 'rangeFrom' ||
                    this._selectMode === 'rangeTo');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeInputAriaHaspopup", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeInputAriaOwns", {
            get: function () {
                return (this.dtPicker.opened && this.dtPicker.id) || null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "minIso8601", {
            get: function () {
                return this.min ? this.dateTimeAdapter.toIso8601(this.min) : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "maxIso8601", {
            get: function () {
                return this.max ? this.dateTimeAdapter.toIso8601(this.max) : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeInputDisabled", {
            get: function () {
                return this.disabled;
            },
            enumerable: false,
            configurable: true
        });
        OwlDateTimeInputDirective.prototype.ngOnInit = function () {
            if (!this.dtPicker) {
                throw Error("OwlDateTimePicker: the picker input doesn't have any associated owl-date-time component");
            }
        };
        OwlDateTimeInputDirective.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.dtPickerSub = this.dtPicker.confirmSelectedChange.subscribe(function (selecteds) {
                if (Array.isArray(selecteds)) {
                    _this.values = selecteds;
                }
                else {
                    _this.value = selecteds;
                }
                _this.onModelChange(selecteds);
                _this.onModelTouched();
                _this.dateTimeChange.emit({
                    source: _this,
                    value: selecteds,
                    input: _this.elmRef.nativeElement
                });
                _this.dateTimeInput.emit({
                    source: _this,
                    value: selecteds,
                    input: _this.elmRef.nativeElement
                });
            });
        };
        OwlDateTimeInputDirective.prototype.ngOnDestroy = function () {
            this.dtPickerSub.unsubscribe();
            this.localeSub.unsubscribe();
            this.valueChange.complete();
            this.disabledChange.complete();
        };
        OwlDateTimeInputDirective.prototype.writeValue = function (value) {
            if (this.isInSingleMode) {
                this.value = value;
            }
            else {
                this.values = value;
            }
        };
        OwlDateTimeInputDirective.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        OwlDateTimeInputDirective.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        OwlDateTimeInputDirective.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        OwlDateTimeInputDirective.prototype.validate = function (c) {
            return this.validator ? this.validator(c) : null;
        };
        OwlDateTimeInputDirective.prototype.registerOnValidatorChange = function (fn) {
            this.validatorOnChange = fn;
        };
        /**
         * Open the picker when user hold alt + DOWN_ARROW
         */
        OwlDateTimeInputDirective.prototype.handleKeydownOnHost = function (event) {
            if (event.altKey && event.keyCode === keycodes.DOWN_ARROW) {
                this.dtPicker.open();
                event.preventDefault();
            }
        };
        OwlDateTimeInputDirective.prototype.handleBlurOnHost = function (event) {
            this.onModelTouched();
        };
        OwlDateTimeInputDirective.prototype.handleInputOnHost = function (event) {
            var value = event.target.value;
            if (this._selectMode === 'single') {
                this.changeInputInSingleMode(value);
            }
            else if (this._selectMode === 'range') {
                this.changeInputInRangeMode(value);
            }
            else {
                this.changeInputInRangeFromToMode(value);
            }
            this.validatorOnChange();
        };
        OwlDateTimeInputDirective.prototype.handleChangeOnHost = function (event) {
            var v;
            if (this.isInSingleMode) {
                v = this.value;
            }
            else if (this.isInRangeMode) {
                v = this.values;
            }
            this.dateTimeChange.emit({
                source: this,
                value: v,
                input: this.elmRef.nativeElement
            });
        };
        /**
         * Set the native input property 'value'
         */
        OwlDateTimeInputDirective.prototype.formatNativeInputValue = function () {
            if (this.isInSingleMode) {
                this.renderer.setProperty(this.elmRef.nativeElement, 'value', this._value
                    ? this.dateTimeAdapter.format(this._value, this.dtPicker.formatString)
                    : '');
            }
            else if (this.isInRangeMode) {
                if (this._values && this.values.length > 0) {
                    var from = this._values[0];
                    var to = this._values[1];
                    var fromFormatted = from
                        ? this.dateTimeAdapter.format(from, this.dtPicker.formatString)
                        : '';
                    var toFormatted = to
                        ? this.dateTimeAdapter.format(to, this.dtPicker.formatString)
                        : '';
                    if (!fromFormatted && !toFormatted) {
                        this.renderer.setProperty(this.elmRef.nativeElement, 'value', null);
                    }
                    else {
                        if (this._selectMode === 'range') {
                            this.renderer.setProperty(this.elmRef.nativeElement, 'value', fromFormatted + " " + this.rangeSeparator + " " + toFormatted);
                        }
                        else if (this._selectMode === 'rangeFrom') {
                            this.renderer.setProperty(this.elmRef.nativeElement, 'value', fromFormatted);
                        }
                        else if (this._selectMode === 'rangeTo') {
                            this.renderer.setProperty(this.elmRef.nativeElement, 'value', toFormatted);
                        }
                    }
                }
                else {
                    this.renderer.setProperty(this.elmRef.nativeElement, 'value', '');
                }
            }
            return;
        };
        /**
         * Register the relationship between this input and its picker component
         */
        OwlDateTimeInputDirective.prototype.registerDateTimePicker = function (picker) {
            if (picker) {
                this.dtPicker = picker;
                this.dtPicker.registerInput(this);
            }
        };
        /**
         * Convert a given obj to a valid date object
         */
        OwlDateTimeInputDirective.prototype.getValidDate = function (obj) {
            return this.dateTimeAdapter.isDateInstance(obj) &&
                this.dateTimeAdapter.isValid(obj)
                ? obj
                : null;
        };
        /**
         * Convert a time string to a date-time string
         * When pickerType is 'timer', the value in the picker's input is a time string.
         * The dateTimeAdapter parse fn could not parse a time string to a Date Object.
         * Therefore we need this fn to convert a time string to a date-time string.
         */
        OwlDateTimeInputDirective.prototype.convertTimeStringToDateTimeString = function (timeString, dateTime) {
            if (timeString) {
                var v = dateTime || this.dateTimeAdapter.now();
                var dateString = this.dateTimeAdapter.format(v, this.dateTimeFormats.datePickerInput);
                return dateString + ' ' + timeString;
            }
            else {
                return null;
            }
        };
        /**
         * Handle input change in single mode
         */
        OwlDateTimeInputDirective.prototype.changeInputInSingleMode = function (inputValue) {
            inputValue = (inputValue || '').trim();
            this.lastValueValid = this.dateTimeAdapter.isValidFormat(inputValue, this.dtPicker.formatString);
            var value = inputValue;
            if (this.dtPicker.pickerType === 'timer') {
                value = this.convertTimeStringToDateTimeString(value, this.value);
            }
            var result = this.dateTimeAdapter.parse(value, this.dateTimeFormats.parseInput);
            result = this.getValidDate(result);
            // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
            // result equals to null means there is input event, but the input value is invalid
            if (!this.isSameValue(result, this._value) || result === null) {
                this._value = result;
                this.valueChange.emit(result);
                this.onModelChange(result);
                this.dateTimeInput.emit({
                    source: this,
                    value: result,
                    input: this.elmRef.nativeElement
                });
            }
        };
        /**
         * Handle input change in rangeFrom or rangeTo mode
         */
        OwlDateTimeInputDirective.prototype.changeInputInRangeFromToMode = function (inputValue) {
            inputValue = (inputValue || '').trim();
            this.lastValueValid = this.dateTimeAdapter.isValidFormat(inputValue, this.dtPicker.formatString);
            var originalValue = this._selectMode === 'rangeFrom'
                ? this._values[0]
                : this._values[1];
            if (this.dtPicker.pickerType === 'timer') {
                inputValue = this.convertTimeStringToDateTimeString(inputValue, originalValue);
            }
            var result = this.dateTimeAdapter.parse(inputValue, this.dateTimeFormats.parseInput);
            result = this.getValidDate(result);
            // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
            if ((this._selectMode === 'rangeFrom' &&
                this.isSameValue(result, this._values[0]) &&
                result) ||
                (this._selectMode === 'rangeTo' &&
                    this.isSameValue(result, this._values[1]) &&
                    result)) {
                return;
            }
            this._values =
                this._selectMode === 'rangeFrom'
                    ? [result, this._values[1]]
                    : [this._values[0], result];
            this.valueChange.emit(this._values);
            this.onModelChange(this._values);
            this.dateTimeInput.emit({
                source: this,
                value: this._values,
                input: this.elmRef.nativeElement
            });
        };
        /**
         * Handle input change in range mode
         */
        OwlDateTimeInputDirective.prototype.changeInputInRangeMode = function (inputValue) {
            inputValue = (inputValue || '').trim();
            var selecteds = inputValue.split(this.rangeSeparator);
            var fromString = (selecteds[0] || '').trim();
            var toString = (selecteds[1] || '').trim();
            this.lastValueValid =
                this.dateTimeAdapter.isValidFormat(fromString, this.dtPicker.formatString) &&
                    this.dateTimeAdapter.isValidFormat(toString, this.dtPicker.formatString);
            if (this.dtPicker.pickerType === 'timer') {
                fromString = this.convertTimeStringToDateTimeString(fromString, this.values[0]);
                toString = this.convertTimeStringToDateTimeString(toString, this.values[1]);
            }
            var from = this.dateTimeAdapter.parse(fromString, this.dateTimeFormats.parseInput);
            var to = this.dateTimeAdapter.parse(toString, this.dateTimeFormats.parseInput);
            from = this.getValidDate(from);
            to = this.getValidDate(to);
            // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
            if (!this.isSameValue(from, this._values[0]) ||
                !this.isSameValue(to, this._values[1]) ||
                (from === null && to === null)) {
                this._values = [from, to];
                this.valueChange.emit(this._values);
                this.onModelChange(this._values);
                this.dateTimeInput.emit({
                    source: this,
                    value: this._values,
                    input: this.elmRef.nativeElement
                });
            }
        };
        /**
         * Check if the two value is the same
         */
        OwlDateTimeInputDirective.prototype.isSameValue = function (first, second) {
            if (first && second) {
                return this.dateTimeAdapter.compare(first, second) === 0;
            }
            return first === second;
        };
        return OwlDateTimeInputDirective;
    }());
    OwlDateTimeInputDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeInputDirective, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    OwlDateTimeInputDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.3", type: OwlDateTimeInputDirective, selector: "input[owlDateTime]", inputs: { owlDateTime: "owlDateTime", owlDateTimeFilter: "owlDateTimeFilter", _disabled: "_disabled", min: "min", max: "max", selectMode: "selectMode", rangeSeparator: "rangeSeparator", value: "value", values: "values" }, outputs: { dateTimeChange: "dateTimeChange", dateTimeInput: "dateTimeInput" }, host: { listeners: { "keydown": "handleKeydownOnHost($event)", "blur": "handleBlurOnHost($event)", "input": "handleInputOnHost($event)", "change": "handleChangeOnHost($event)" }, properties: { "attr.aria-haspopup": "owlDateTimeInputAriaHaspopup", "attr.aria-owns": "owlDateTimeInputAriaOwns", "attr.min": "minIso8601", "attr.max": "maxIso8601", "disabled": "owlDateTimeInputDisabled" } }, providers: [OWL_DATETIME_VALUE_ACCESSOR$1, OWL_DATETIME_VALIDATORS], exportAs: ["owlDateTimeInput"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeInputDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'input[owlDateTime]',
                        exportAs: 'owlDateTimeInput',
                        host: {
                            '(keydown)': 'handleKeydownOnHost($event)',
                            '(blur)': 'handleBlurOnHost($event)',
                            '(input)': 'handleInputOnHost($event)',
                            '(change)': 'handleChangeOnHost($event)',
                            '[attr.aria-haspopup]': 'owlDateTimeInputAriaHaspopup',
                            '[attr.aria-owns]': 'owlDateTimeInputAriaOwns',
                            '[attr.min]': 'minIso8601',
                            '[attr.max]': 'maxIso8601',
                            '[disabled]': 'owlDateTimeInputDisabled'
                        },
                        providers: [OWL_DATETIME_VALUE_ACCESSOR$1, OWL_DATETIME_VALIDATORS]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: DateTimeAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [OWL_DATE_TIME_FORMATS]
                        }] }];
        }, propDecorators: { owlDateTime: [{
                    type: i0.Input
                }], owlDateTimeFilter: [{
                    type: i0.Input
                }], _disabled: [{
                    type: i0.Input
                }], min: [{
                    type: i0.Input
                }], max: [{
                    type: i0.Input
                }], selectMode: [{
                    type: i0.Input
                }], rangeSeparator: [{
                    type: i0.Input
                }], value: [{
                    type: i0.Input
                }], values: [{
                    type: i0.Input
                }], dateTimeChange: [{
                    type: i0.Output
                }], dateTimeInput: [{
                    type: i0.Output
                }] } });

    var OWL_DATETIME_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return OwlDateTimeInlineComponent; }),
        multi: true
    };
    var OwlDateTimeInlineComponent = /** @class */ (function (_super) {
        __extends(OwlDateTimeInlineComponent, _super);
        function OwlDateTimeInlineComponent(changeDetector, dateTimeAdapter, dateTimeFormats) {
            var _this = _super.call(this, dateTimeAdapter, dateTimeFormats) || this;
            _this.changeDetector = changeDetector;
            _this.dateTimeAdapter = dateTimeAdapter;
            _this.dateTimeFormats = dateTimeFormats;
            /**
             * Set the type of the dateTime picker
             *      'both' -- show both calendar and timer
             *      'calendar' -- show only calendar
             *      'timer' -- show only timer
             */
            _this._pickerType = 'both';
            _this._disabled = false;
            _this._selectMode = 'single';
            _this._values = [];
            /**
             * Emits selected year in multi-year view
             * This doesn't imply a change on the selected date.
             */
            _this.yearSelected = new i0.EventEmitter();
            /**
             * Emits selected month in year view
             * This doesn't imply a change on the selected date.
             */
            _this.monthSelected = new i0.EventEmitter();
            _this._selecteds = [];
            _this.onModelChange = function (date) { };
            _this.onModelTouched = function () { };
            return _this;
        }
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "pickerType", {
            get: function () {
                return this._pickerType;
            },
            set: function (val) {
                if (val !== this._pickerType) {
                    this._pickerType = val;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "disabled", {
            get: function () {
                return !!this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selectMode", {
            get: function () {
                return this._selectMode;
            },
            set: function (mode) {
                if (mode !== 'single' &&
                    mode !== 'range' &&
                    mode !== 'rangeFrom' &&
                    mode !== 'rangeTo') {
                    throw Error('OwlDateTime Error: invalid selectMode value!');
                }
                this._selectMode = mode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "startAt", {
            get: function () {
                if (this._startAt) {
                    return this._startAt;
                }
                if (this.selectMode === 'single') {
                    return this.value || null;
                }
                else if (this.selectMode === 'range' ||
                    this.selectMode === 'rangeFrom') {
                    return this.values[0] || null;
                }
                else if (this.selectMode === 'rangeTo') {
                    return this.values[1] || null;
                }
                else {
                    return null;
                }
            },
            set: function (date) {
                this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(date));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "dateTimeFilter", {
            get: function () {
                return this._dateTimeFilter;
            },
            set: function (filter) {
                this._dateTimeFilter = filter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "minDateTime", {
            get: function () {
                return this._min || null;
            },
            set: function (value) {
                this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
                this.changeDetector.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "maxDateTime", {
            get: function () {
                return this._max || null;
            },
            set: function (value) {
                this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
                this.changeDetector.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                value = this.getValidDate(value);
                this._value = value;
                this.selected = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "values", {
            get: function () {
                return this._values;
            },
            set: function (values) {
                var _this = this;
                if (values && values.length > 0) {
                    values = values.map(function (v) {
                        v = _this.dateTimeAdapter.deserialize(v);
                        v = _this.getValidDate(v);
                        return v ? _this.dateTimeAdapter.clone(v) : null;
                    });
                    this._values = __spreadArray([], __read(values));
                    this.selecteds = __spreadArray([], __read(values));
                }
                else {
                    this._values = [];
                    this.selecteds = [];
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                this._selected = value;
                this.changeDetector.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selecteds", {
            get: function () {
                return this._selecteds;
            },
            set: function (values) {
                this._selecteds = values;
                this.changeDetector.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "opened", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "pickerMode", {
            get: function () {
                return 'inline';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "isInSingleMode", {
            get: function () {
                return this._selectMode === 'single';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "isInRangeMode", {
            get: function () {
                return (this._selectMode === 'range' ||
                    this._selectMode === 'rangeFrom' ||
                    this._selectMode === 'rangeTo');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "owlDTInlineClass", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        OwlDateTimeInlineComponent.prototype.ngOnInit = function () {
            this.container.picker = this;
        };
        OwlDateTimeInlineComponent.prototype.writeValue = function (value) {
            if (this.isInSingleMode) {
                this.value = value;
                this.container.pickerMoment = value;
            }
            else {
                this.values = value;
                this.container.pickerMoment = this._values[this.container.activeSelectedIndex];
            }
        };
        OwlDateTimeInlineComponent.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        OwlDateTimeInlineComponent.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        OwlDateTimeInlineComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
        };
        OwlDateTimeInlineComponent.prototype.select = function (date) {
            if (this.disabled) {
                return;
            }
            if (Array.isArray(date)) {
                this.values = __spreadArray([], __read(date));
            }
            else {
                this.value = date;
            }
            this.onModelChange(date);
            this.onModelTouched();
        };
        /**
         * Emits the selected year in multi-year view
         */
        OwlDateTimeInlineComponent.prototype.selectYear = function (normalizedYear) {
            this.yearSelected.emit(normalizedYear);
        };
        /**
         * Emits selected month in year view
         */
        OwlDateTimeInlineComponent.prototype.selectMonth = function (normalizedMonth) {
            this.monthSelected.emit(normalizedMonth);
        };
        return OwlDateTimeInlineComponent;
    }(OwlDateTime));
    OwlDateTimeInlineComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeInlineComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: DateTimeAdapter, optional: true }, { token: OWL_DATE_TIME_FORMATS, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    OwlDateTimeInlineComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.3", type: OwlDateTimeInlineComponent, selector: "owl-date-time-inline", inputs: { pickerType: "pickerType", disabled: "disabled", selectMode: "selectMode", startAt: "startAt", dateTimeFilter: ["owlDateTimeFilter", "dateTimeFilter"], minDateTime: ["min", "minDateTime"], maxDateTime: ["max", "maxDateTime"], value: "value", values: "values" }, outputs: { yearSelected: "yearSelected", monthSelected: "monthSelected" }, host: { properties: { "class.owl-dt-inline": "owlDTInlineClass" } }, providers: [OWL_DATETIME_VALUE_ACCESSOR], viewQueries: [{ propertyName: "container", first: true, predicate: OwlDateTimeContainerComponent, descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<owl-date-time-container></owl-date-time-container>\n", components: [{ type: OwlDateTimeContainerComponent, selector: "owl-date-time-container", exportAs: ["owlDateTimeContainer"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeInlineComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'owl-date-time-inline',
                        templateUrl: './date-time-inline.component.html',
                        host: {
                            '[class.owl-dt-inline]': 'owlDTInlineClass'
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [OWL_DATETIME_VALUE_ACCESSOR]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ChangeDetectorRef }, { type: DateTimeAdapter, decorators: [{
                            type: i0.Optional
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [OWL_DATE_TIME_FORMATS]
                        }] }];
        }, propDecorators: { container: [{
                    type: i0.ViewChild,
                    args: [OwlDateTimeContainerComponent, { static: true }]
                }], pickerType: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], selectMode: [{
                    type: i0.Input
                }], startAt: [{
                    type: i0.Input
                }], dateTimeFilter: [{
                    type: i0.Input,
                    args: ['owlDateTimeFilter']
                }], minDateTime: [{
                    type: i0.Input,
                    args: ['min']
                }], maxDateTime: [{
                    type: i0.Input,
                    args: ['max']
                }], value: [{
                    type: i0.Input
                }], values: [{
                    type: i0.Input
                }], yearSelected: [{
                    type: i0.Output
                }], monthSelected: [{
                    type: i0.Output
                }] } });

    /**
     * dialog.module
     */
    var OwlDialogModule = /** @class */ (function () {
        function OwlDialogModule() {
        }
        return OwlDialogModule;
    }());
    OwlDialogModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDialogModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    OwlDialogModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDialogModule, declarations: [OwlDialogContainerComponent], imports: [i1.CommonModule, i1$1.A11yModule, i1$2.OverlayModule, i2.PortalModule] });
    OwlDialogModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDialogModule, providers: [OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, OwlDialogService], imports: [[i1.CommonModule, i1$1.A11yModule, i1$2.OverlayModule, i2.PortalModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDialogModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i1$1.A11yModule, i1$2.OverlayModule, i2.PortalModule],
                        exports: [],
                        declarations: [OwlDialogContainerComponent],
                        providers: [OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, OwlDialogService],
                    }]
            }] });

    /**
     * date-time.module
     */
    var OwlDateTimeModule = /** @class */ (function () {
        function OwlDateTimeModule() {
        }
        return OwlDateTimeModule;
    }());
    OwlDateTimeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    OwlDateTimeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeModule, declarations: [OwlDateTimeTriggerDirective,
            OwlDateTimeInputDirective,
            OwlDateTimeComponent,
            OwlDateTimeContainerComponent,
            OwlMultiYearViewComponent,
            OwlYearViewComponent,
            OwlMonthViewComponent,
            OwlTimerComponent,
            OwlTimerBoxComponent,
            OwlCalendarComponent,
            OwlCalendarBodyComponent,
            NumberFixedLenPipe,
            OwlDateTimeInlineComponent], imports: [i1.CommonModule, i1$2.OverlayModule, OwlDialogModule, i1$1.A11yModule], exports: [OwlCalendarComponent,
            OwlTimerComponent,
            OwlDateTimeTriggerDirective,
            OwlDateTimeInputDirective,
            OwlDateTimeComponent,
            OwlDateTimeInlineComponent,
            OwlMultiYearViewComponent,
            OwlYearViewComponent,
            OwlMonthViewComponent] });
    OwlDateTimeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeModule, providers: [OwlDateTimeIntl, OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER], imports: [[i1.CommonModule, i1$2.OverlayModule, OwlDialogModule, i1$1.A11yModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlDateTimeModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i1$2.OverlayModule, OwlDialogModule, i1$1.A11yModule],
                        exports: [
                            OwlCalendarComponent,
                            OwlTimerComponent,
                            OwlDateTimeTriggerDirective,
                            OwlDateTimeInputDirective,
                            OwlDateTimeComponent,
                            OwlDateTimeInlineComponent,
                            OwlMultiYearViewComponent,
                            OwlYearViewComponent,
                            OwlMonthViewComponent
                        ],
                        declarations: [
                            OwlDateTimeTriggerDirective,
                            OwlDateTimeInputDirective,
                            OwlDateTimeComponent,
                            OwlDateTimeContainerComponent,
                            OwlMultiYearViewComponent,
                            OwlYearViewComponent,
                            OwlMonthViewComponent,
                            OwlTimerComponent,
                            OwlTimerBoxComponent,
                            OwlCalendarComponent,
                            OwlCalendarBodyComponent,
                            NumberFixedLenPipe,
                            OwlDateTimeInlineComponent
                        ],
                        providers: [OwlDateTimeIntl, OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER]
                    }]
            }] });

    /** The default month names to use if Intl API is not available. */
    var DEFAULT_MONTH_NAMES = {
        long: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        short: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
    };
    /** The default day of the week names to use if Intl API is not available. */
    var DEFAULT_DAY_OF_WEEK_NAMES = {
        long: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    };
    /** The default date names to use if Intl API is not available. */
    var DEFAULT_DATE_NAMES = range$1(31, function (i) { return String(i + 1); });
    /** Whether the browser supports the Intl API. */
    var SUPPORTS_INTL_API = typeof Intl !== 'undefined';
    /**
     * Matches strings that have the form of a valid RFC 3339 string
     * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
     * because the regex will match strings an with out of bounds month, date, etc.
     */
    var ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:[+\-]\d{2}:\d{2}))?)?$/;
    /** Creates an array and fills it with values. */
    function range$1(length, valueFunction) {
        var valuesArray = Array(length);
        for (var i = 0; i < length; i++) {
            valuesArray[i] = valueFunction(i);
        }
        return valuesArray;
    }
    var NativeDateTimeAdapter = /** @class */ (function (_super) {
        __extends(NativeDateTimeAdapter, _super);
        function NativeDateTimeAdapter(owlDateTimeLocale, platform) {
            var _this = _super.call(this) || this;
            _this.owlDateTimeLocale = owlDateTimeLocale;
            _super.prototype.setLocale.call(_this, owlDateTimeLocale);
            // IE does its own time zone correction, so we disable this on IE.
            _this.useUtcForDisplay = !platform.TRIDENT;
            _this._clampDate = platform.TRIDENT || platform.EDGE;
            return _this;
        }
        NativeDateTimeAdapter.prototype.getYear = function (date) {
            return date.getFullYear();
        };
        NativeDateTimeAdapter.prototype.getMonth = function (date) {
            return date.getMonth();
        };
        NativeDateTimeAdapter.prototype.getDay = function (date) {
            return date.getDay();
        };
        NativeDateTimeAdapter.prototype.getDate = function (date) {
            return date.getDate();
        };
        NativeDateTimeAdapter.prototype.getHours = function (date) {
            return date.getHours();
        };
        NativeDateTimeAdapter.prototype.getMinutes = function (date) {
            return date.getMinutes();
        };
        NativeDateTimeAdapter.prototype.getSeconds = function (date) {
            return date.getSeconds();
        };
        NativeDateTimeAdapter.prototype.getTime = function (date) {
            return date.getTime();
        };
        NativeDateTimeAdapter.prototype.getNumDaysInMonth = function (date) {
            var lastDateOfMonth = this.createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0);
            return this.getDate(lastDateOfMonth);
        };
        NativeDateTimeAdapter.prototype.differenceInCalendarDays = function (dateLeft, dateRight) {
            if (this.isValid(dateLeft) && this.isValid(dateRight)) {
                var dateLeftStartOfDay = this.createDate(this.getYear(dateLeft), this.getMonth(dateLeft), this.getDate(dateLeft));
                var dateRightStartOfDay = this.createDate(this.getYear(dateRight), this.getMonth(dateRight), this.getDate(dateRight));
                var timeStampLeft = this.getTime(dateLeftStartOfDay) -
                    dateLeftStartOfDay.getTimezoneOffset() *
                        this.milliseondsInMinute;
                var timeStampRight = this.getTime(dateRightStartOfDay) -
                    dateRightStartOfDay.getTimezoneOffset() *
                        this.milliseondsInMinute;
                return Math.round((timeStampLeft - timeStampRight) / this.millisecondsInDay);
            }
            else {
                return null;
            }
        };
        NativeDateTimeAdapter.prototype.getYearName = function (date) {
            if (SUPPORTS_INTL_API) {
                var dtf = new Intl.DateTimeFormat(this.getLocale(), {
                    year: 'numeric',
                    timeZone: 'utc'
                });
                return this.stripDirectionalityCharacters(this._format(dtf, date));
            }
            return String(this.getYear(date));
        };
        NativeDateTimeAdapter.prototype.getMonthNames = function (style) {
            var _this = this;
            if (SUPPORTS_INTL_API) {
                var dtf_1 = new Intl.DateTimeFormat(this.getLocale(), {
                    month: style,
                    timeZone: 'utc'
                });
                return range$1(12, function (i) { return _this.stripDirectionalityCharacters(_this._format(dtf_1, new Date(2017, i, 1))); });
            }
            return DEFAULT_MONTH_NAMES[style];
        };
        NativeDateTimeAdapter.prototype.getDayOfWeekNames = function (style) {
            var _this = this;
            if (SUPPORTS_INTL_API) {
                var dtf_2 = new Intl.DateTimeFormat(this.getLocale(), {
                    weekday: style,
                    timeZone: 'utc'
                });
                return range$1(7, function (i) { return _this.stripDirectionalityCharacters(_this._format(dtf_2, new Date(2017, 0, i + 1))); });
            }
            return DEFAULT_DAY_OF_WEEK_NAMES[style];
        };
        NativeDateTimeAdapter.prototype.getDateNames = function () {
            var _this = this;
            if (SUPPORTS_INTL_API) {
                var dtf_3 = new Intl.DateTimeFormat(this.getLocale(), {
                    day: 'numeric',
                    timeZone: 'utc'
                });
                return range$1(31, function (i) { return _this.stripDirectionalityCharacters(_this._format(dtf_3, new Date(2017, 0, i + 1))); });
            }
            return DEFAULT_DATE_NAMES;
        };
        NativeDateTimeAdapter.prototype.toIso8601 = function (date) {
            return date.toISOString();
        };
        NativeDateTimeAdapter.prototype.isEqual = function (dateLeft, dateRight) {
            if (this.isValid(dateLeft) && this.isValid(dateRight)) {
                return dateLeft.getTime() === dateRight.getTime();
            }
            else {
                return false;
            }
        };
        NativeDateTimeAdapter.prototype.isSameDay = function (dateLeft, dateRight) {
            if (this.isValid(dateLeft) && this.isValid(dateRight)) {
                var dateLeftStartOfDay = this.clone(dateLeft);
                var dateRightStartOfDay = this.clone(dateRight);
                dateLeftStartOfDay.setHours(0, 0, 0, 0);
                dateRightStartOfDay.setHours(0, 0, 0, 0);
                return (dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime());
            }
            else {
                return false;
            }
        };
        NativeDateTimeAdapter.prototype.isValid = function (date) {
            return date && !isNaN(date.getTime());
        };
        NativeDateTimeAdapter.prototype.isValidFormat = function (value, parseFormat) {
            var e_1, _a;
            if (SUPPORTS_INTL_API) {
                parseFormat = Object.assign(Object.assign({}, parseFormat), { timeZone: 'utc' });
                var dtf = new Intl.DateTimeFormat(this.getLocale(), parseFormat);
                var parts = dtf.formatToParts();
                var regex = '^';
                try {
                    for (var parts_1 = __values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
                        var part = parts_1_1.value;
                        switch (part.type) {
                            case 'day':
                                regex += '([1-9]{1}|[0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})';
                                break;
                            case 'month':
                                regex += '([1-9]|0[1-9]|1[0-2])';
                                break;
                            case 'year':
                                regex += '([0-9]{1,4})';
                                break;
                            case 'hour':
                                if (dtf.resolvedOptions().hour12) {
                                    regex += '(0?[1-9]|1[012])';
                                }
                                else {
                                    regex += '([01]?[0-9]|2[0-3])';
                                }
                                break;
                            case 'second':
                            case 'minute':
                                regex += '([0-9]{1}|[0-5][0-9])';
                                break;
                            case 'dayPeriod':
                                regex += '((a|A)(m|M)?|(p|P)(m|M)?)';
                                break;
                            case 'literal':
                                regex += part.value.replace('/', '\\/').replace('.', '\\.');
                                break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (parts_1_1 && !parts_1_1.done && (_a = parts_1.return)) _a.call(parts_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                regex += '$';
                return (new RegExp(regex)).test(value);
            }
            else {
                var date = new Date(value);
                return date.getTime() === date.getTime();
            }
        };
        NativeDateTimeAdapter.prototype.invalid = function () {
            return new Date(NaN);
        };
        NativeDateTimeAdapter.prototype.isDateInstance = function (obj) {
            return obj instanceof Date;
        };
        NativeDateTimeAdapter.prototype.addCalendarYears = function (date, amount) {
            return this.addCalendarMonths(date, amount * 12);
        };
        NativeDateTimeAdapter.prototype.addCalendarMonths = function (date, amount) {
            var result = this.clone(date);
            amount = Number(amount);
            var desiredMonth = result.getMonth() + amount;
            var dateWithDesiredMonth = new Date(0);
            dateWithDesiredMonth.setFullYear(result.getFullYear(), desiredMonth, 1);
            dateWithDesiredMonth.setHours(0, 0, 0, 0);
            var daysInMonth = this.getNumDaysInMonth(dateWithDesiredMonth);
            // Set the last day of the new month
            // if the original date was the last day of the longer month
            result.setMonth(desiredMonth, Math.min(daysInMonth, result.getDate()));
            return result;
        };
        NativeDateTimeAdapter.prototype.addCalendarDays = function (date, amount) {
            var result = this.clone(date);
            amount = Number(amount);
            result.setDate(result.getDate() + amount);
            return result;
        };
        NativeDateTimeAdapter.prototype.setHours = function (date, amount) {
            var result = this.clone(date);
            result.setHours(amount);
            return result;
        };
        NativeDateTimeAdapter.prototype.setMinutes = function (date, amount) {
            var result = this.clone(date);
            result.setMinutes(amount);
            return result;
        };
        NativeDateTimeAdapter.prototype.setSeconds = function (date, amount) {
            var result = this.clone(date);
            result.setSeconds(amount);
            return result;
        };
        NativeDateTimeAdapter.prototype.createDate = function (year, month, date, hours, minutes, seconds) {
            if (hours === void 0) { hours = 0; }
            if (minutes === void 0) { minutes = 0; }
            if (seconds === void 0) { seconds = 0; }
            if (month < 0 || month > 11) {
                throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
            }
            if (date < 1) {
                throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
            }
            if (hours < 0 || hours > 23) {
                throw Error("Invalid hours \"" + hours + "\". Hours has to be between 0 and 23.");
            }
            if (minutes < 0 || minutes > 59) {
                throw Error("Invalid minutes \"" + minutes + "\". Minutes has to between 0 and 59.");
            }
            if (seconds < 0 || seconds > 59) {
                throw Error("Invalid seconds \"" + seconds + "\". Seconds has to be between 0 and 59.");
            }
            var result = this.createDateWithOverflow(year, month, date, hours, minutes, seconds);
            // Check that the date wasn't above the upper bound for the month, causing the month to overflow
            // For example, createDate(2017, 1, 31) would try to create a date 2017/02/31 which is invalid
            if (result.getMonth() !== month) {
                throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
            }
            return result;
        };
        NativeDateTimeAdapter.prototype.clone = function (date) {
            return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
        };
        NativeDateTimeAdapter.prototype.now = function () {
            return new Date();
        };
        NativeDateTimeAdapter.prototype.format = function (date, displayFormat) {
            if (!this.isValid(date)) {
                throw Error('JSNativeDate: Cannot format invalid date.');
            }
            if (SUPPORTS_INTL_API) {
                if (this._clampDate &&
                    (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
                    date = this.clone(date);
                    date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
                }
                displayFormat = Object.assign(Object.assign({}, displayFormat), { timeZone: 'utc' });
                var dtf = new Intl.DateTimeFormat(this.getLocale(), displayFormat);
                return this.stripDirectionalityCharacters(this._format(dtf, date));
            }
            return this.stripDirectionalityCharacters(date.toDateString());
        };
        NativeDateTimeAdapter.prototype.parse = function (value, parseFormat) {
            // There is no way using the native JS Date to set the parse format or locale
            if (typeof value === 'number') {
                return new Date(value);
            }
            return value ? new Date(Date.parse(value)) : null;
        };
        /**
         * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
         * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
         * invalid date for all other values.
         */
        NativeDateTimeAdapter.prototype.deserialize = function (value) {
            if (typeof value === 'string') {
                if (!value) {
                    return null;
                }
                // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
                // string is the right format first.
                if (ISO_8601_REGEX.test(value)) {
                    var date = new Date(value);
                    if (this.isValid(date)) {
                        return date;
                    }
                }
            }
            return _super.prototype.deserialize.call(this, value);
        };
        /**
         * Creates a date but allows the month and date to overflow.
         */
        NativeDateTimeAdapter.prototype.createDateWithOverflow = function (year, month, date, hours, minutes, seconds) {
            if (hours === void 0) { hours = 0; }
            if (minutes === void 0) { minutes = 0; }
            if (seconds === void 0) { seconds = 0; }
            var result = new Date(year, month, date, hours, minutes, seconds);
            if (year >= 0 && year < 100) {
                result.setFullYear(this.getYear(result) - 1900);
            }
            return result;
        };
        /**
         * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
         * other browsers do not. We remove them to make output consistent and because they interfere with
         * date parsing.
         */
        NativeDateTimeAdapter.prototype.stripDirectionalityCharacters = function (str) {
            return str.replace(/[\u200e\u200f]/g, '');
        };
        /**
         * When converting Date object to string, javascript built-in functions may return wrong
         * results because it applies its internal DST rules. The DST rules around the world change
         * very frequently, and the current valid rule is not always valid in previous years though.
         * We work around this problem building a new Date object which has its internal UTC
         * representation with the local date and time.
         */
        NativeDateTimeAdapter.prototype._format = function (dtf, date) {
            var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
            return dtf.format(d);
        };
        return NativeDateTimeAdapter;
    }(DateTimeAdapter));
    NativeDateTimeAdapter.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: NativeDateTimeAdapter, deps: [{ token: OWL_DATE_TIME_LOCALE, optional: true }, { token: i1__namespace$3.Platform }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    NativeDateTimeAdapter.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: NativeDateTimeAdapter });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: NativeDateTimeAdapter, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [OWL_DATE_TIME_LOCALE]
                        }] }, { type: i1__namespace$3.Platform }];
        } });

    var OWL_NATIVE_DATE_TIME_FORMATS = {
        parseInput: null,
        fullPickerInput: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        },
        datePickerInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        timePickerInput: { hour: 'numeric', minute: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' }
    };

    /**
     * native-date-time.module
     */
    var NativeDateTimeModule = /** @class */ (function () {
        function NativeDateTimeModule() {
        }
        return NativeDateTimeModule;
    }());
    NativeDateTimeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: NativeDateTimeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    NativeDateTimeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: NativeDateTimeModule, imports: [i1$3.PlatformModule] });
    NativeDateTimeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: NativeDateTimeModule, providers: [{ provide: DateTimeAdapter, useClass: NativeDateTimeAdapter }], imports: [[i1$3.PlatformModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: NativeDateTimeModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1$3.PlatformModule],
                        providers: [{ provide: DateTimeAdapter, useClass: NativeDateTimeAdapter }]
                    }]
            }] });
    var OwlNativeDateTimeModule = /** @class */ (function () {
        function OwlNativeDateTimeModule() {
        }
        return OwlNativeDateTimeModule;
    }());
    OwlNativeDateTimeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlNativeDateTimeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    OwlNativeDateTimeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlNativeDateTimeModule, imports: [NativeDateTimeModule] });
    OwlNativeDateTimeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlNativeDateTimeModule, providers: [
            {
                provide: OWL_DATE_TIME_FORMATS,
                useValue: OWL_NATIVE_DATE_TIME_FORMATS
            }
        ], imports: [[NativeDateTimeModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlNativeDateTimeModule, decorators: [{
                type: i0.NgModule,
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

    var moment = importMoment__namespace;
    /** InjectionToken for moment date adapter to configure options. */
    var OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS = new i0.InjectionToken('OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS', {
        providedIn: 'root',
        factory: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS_FACTORY
    });
    /** @docs-private */
    function OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS_FACTORY() {
        return {
            useUtc: false
        };
    }
    /** Creates an array and fills it with values. */
    function range(length, valueFunction) {
        var valuesArray = Array(length);
        for (var i = 0; i < length; i++) {
            valuesArray[i] = valueFunction(i);
        }
        return valuesArray;
    }
    var MomentDateTimeAdapter = /** @class */ (function (_super) {
        __extends(MomentDateTimeAdapter, _super);
        function MomentDateTimeAdapter(owlDateTimeLocale, options) {
            var _this = _super.call(this) || this;
            _this.owlDateTimeLocale = owlDateTimeLocale;
            _this.options = options;
            _this.setLocale(owlDateTimeLocale || moment.locale());
            return _this;
        }
        MomentDateTimeAdapter.prototype.setLocale = function (locale) {
            var _this = this;
            _super.prototype.setLocale.call(this, locale);
            var momentLocaleData = moment.localeData(locale);
            this._localeData = {
                longMonths: momentLocaleData.months(),
                shortMonths: momentLocaleData.monthsShort(),
                longDaysOfWeek: momentLocaleData.weekdays(),
                shortDaysOfWeek: momentLocaleData.weekdaysShort(),
                narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
                dates: range(31, function (i) { return _this.createDate(2017, 0, i + 1).format('D'); })
            };
        };
        MomentDateTimeAdapter.prototype.getYear = function (date) {
            return this.clone(date).year();
        };
        MomentDateTimeAdapter.prototype.getMonth = function (date) {
            return this.clone(date).month();
        };
        MomentDateTimeAdapter.prototype.getDay = function (date) {
            return this.clone(date).day();
        };
        MomentDateTimeAdapter.prototype.getDate = function (date) {
            return this.clone(date).date();
        };
        MomentDateTimeAdapter.prototype.getHours = function (date) {
            return this.clone(date).hours();
        };
        MomentDateTimeAdapter.prototype.getMinutes = function (date) {
            return this.clone(date).minutes();
        };
        MomentDateTimeAdapter.prototype.getSeconds = function (date) {
            return this.clone(date).seconds();
        };
        MomentDateTimeAdapter.prototype.getTime = function (date) {
            return this.clone(date).valueOf();
        };
        MomentDateTimeAdapter.prototype.getNumDaysInMonth = function (date) {
            return this.clone(date).daysInMonth();
        };
        MomentDateTimeAdapter.prototype.differenceInCalendarDays = function (dateLeft, dateRight) {
            return this.clone(dateLeft).diff(dateRight, 'days');
        };
        MomentDateTimeAdapter.prototype.getYearName = function (date) {
            return this.clone(date).format('YYYY');
        };
        MomentDateTimeAdapter.prototype.getMonthNames = function (style) {
            return style === 'long'
                ? this._localeData.longMonths
                : this._localeData.shortMonths;
        };
        MomentDateTimeAdapter.prototype.getDayOfWeekNames = function (style) {
            if (style === 'long') {
                return this._localeData.longDaysOfWeek;
            }
            if (style === 'short') {
                return this._localeData.shortDaysOfWeek;
            }
            return this._localeData.narrowDaysOfWeek;
        };
        MomentDateTimeAdapter.prototype.getDateNames = function () {
            return this._localeData.dates;
        };
        MomentDateTimeAdapter.prototype.toIso8601 = function (date) {
            return this.clone(date).format();
        };
        MomentDateTimeAdapter.prototype.isEqual = function (dateLeft, dateRight) {
            if (dateLeft && dateRight) {
                return this.clone(dateLeft).isSame(this.clone(dateRight));
            }
            return dateLeft === dateRight;
        };
        MomentDateTimeAdapter.prototype.isSameDay = function (dateLeft, dateRight) {
            if (dateLeft && dateRight) {
                return this.clone(dateLeft).isSame(this.clone(dateRight), 'day');
            }
            return dateLeft === dateRight;
        };
        MomentDateTimeAdapter.prototype.isValid = function (date) {
            return this.clone(date).isValid();
        };
        MomentDateTimeAdapter.prototype.isValidFormat = function (value, parseFormat) {
            return moment(value, parseFormat, true).isValid();
        };
        MomentDateTimeAdapter.prototype.invalid = function () {
            return moment.invalid();
        };
        MomentDateTimeAdapter.prototype.isDateInstance = function (obj) {
            return moment.isMoment(obj);
        };
        MomentDateTimeAdapter.prototype.addCalendarYears = function (date, amount) {
            return this.clone(date).add({ years: amount });
        };
        MomentDateTimeAdapter.prototype.addCalendarMonths = function (date, amount) {
            return this.clone(date).add({ months: amount });
        };
        MomentDateTimeAdapter.prototype.addCalendarDays = function (date, amount) {
            return this.clone(date).add({ days: amount });
        };
        MomentDateTimeAdapter.prototype.setHours = function (date, amount) {
            return this.clone(date).hours(amount);
        };
        MomentDateTimeAdapter.prototype.setMinutes = function (date, amount) {
            return this.clone(date).minutes(amount);
        };
        MomentDateTimeAdapter.prototype.setSeconds = function (date, amount) {
            return this.clone(date).seconds(amount);
        };
        MomentDateTimeAdapter.prototype.createDate = function (year, month, date, hours, minutes, seconds) {
            if (hours === void 0) { hours = 0; }
            if (minutes === void 0) { minutes = 0; }
            if (seconds === void 0) { seconds = 0; }
            if (month < 0 || month > 11) {
                throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
            }
            if (date < 1) {
                throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
            }
            if (hours < 0 || hours > 23) {
                throw Error("Invalid hours \"" + hours + "\". Hours has to be between 0 and 23.");
            }
            if (minutes < 0 || minutes > 59) {
                throw Error("Invalid minutes \"" + minutes + "\". Minutes has to between 0 and 59.");
            }
            if (seconds < 0 || seconds > 59) {
                throw Error("Invalid seconds \"" + seconds + "\". Seconds has to be between 0 and 59.");
            }
            var result = this.createMoment({
                year: year,
                month: month,
                date: date,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            }).locale(this.getLocale());
            // If the result isn't valid, the date must have been out of bounds for this month.
            if (!result.isValid()) {
                throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
            }
            return result;
        };
        MomentDateTimeAdapter.prototype.clone = function (date) {
            return this.createMoment(date)
                .clone()
                .locale(this.getLocale());
        };
        MomentDateTimeAdapter.prototype.now = function () {
            return this.createMoment().locale(this.getLocale());
        };
        MomentDateTimeAdapter.prototype.format = function (date, displayFormat) {
            date = this.clone(date);
            if (!this.isValid(date)) {
                throw Error('MomentDateTimeAdapter: Cannot format invalid date.');
            }
            return date.format(displayFormat);
        };
        MomentDateTimeAdapter.prototype.parse = function (value, parseFormat) {
            if (value && typeof value === 'string') {
                return this.createMoment(value, parseFormat, this.getLocale());
            }
            return value ? this.createMoment(value).locale(this.getLocale()) : null;
        };
        /**
         * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
         * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
         * string into null. Returns an invalid date for all other values.
         */
        MomentDateTimeAdapter.prototype.deserialize = function (value) {
            var date;
            if (value instanceof Date) {
                date = this.createMoment(value);
            }
            if (typeof value === 'string') {
                if (!value) {
                    return null;
                }
                date = this.createMoment(value, moment.ISO_8601).locale(this.getLocale());
            }
            if (date && this.isValid(date)) {
                return date;
            }
            return _super.prototype.deserialize.call(this, value);
        };
        /** Creates a Moment instance while respecting the current UTC settings. */
        MomentDateTimeAdapter.prototype.createMoment = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.options && this.options.useUtc
                ? moment.utc.apply(moment, __spreadArray([], __read(args))) : moment.apply(void 0, __spreadArray([], __read(args)));
        };
        return MomentDateTimeAdapter;
    }(DateTimeAdapter));
    MomentDateTimeAdapter.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: MomentDateTimeAdapter, deps: [{ token: OWL_DATE_TIME_LOCALE, optional: true }, { token: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    MomentDateTimeAdapter.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: MomentDateTimeAdapter });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: MomentDateTimeAdapter, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [OWL_DATE_TIME_LOCALE]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS]
                        }] }];
        } });

    var OWL_MOMENT_DATE_TIME_FORMATS = {
        parseInput: 'l LT',
        fullPickerInput: 'l LT',
        datePickerInput: 'l',
        timePickerInput: 'LT',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    };

    /**
     * moment-date-time.module
     */
    var MomentDateTimeModule = /** @class */ (function () {
        function MomentDateTimeModule() {
        }
        return MomentDateTimeModule;
    }());
    MomentDateTimeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: MomentDateTimeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    MomentDateTimeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: MomentDateTimeModule });
    MomentDateTimeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: MomentDateTimeModule, providers: [
            {
                provide: DateTimeAdapter,
                useClass: MomentDateTimeAdapter,
                deps: [OWL_DATE_TIME_LOCALE, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS]
            }
        ] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: MomentDateTimeModule, decorators: [{
                type: i0.NgModule,
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
    var OwlMomentDateTimeModule = /** @class */ (function () {
        function OwlMomentDateTimeModule() {
        }
        return OwlMomentDateTimeModule;
    }());
    OwlMomentDateTimeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlMomentDateTimeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    OwlMomentDateTimeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlMomentDateTimeModule, imports: [MomentDateTimeModule] });
    OwlMomentDateTimeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlMomentDateTimeModule, providers: [
            {
                provide: OWL_DATE_TIME_FORMATS,
                useValue: OWL_MOMENT_DATE_TIME_FORMATS
            }
        ], imports: [[MomentDateTimeModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.3", ngImport: i0__namespace, type: OwlMomentDateTimeModule, decorators: [{
                type: i0.NgModule,
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

    /**
     * picker
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DateTimeAdapter = DateTimeAdapter;
    exports.OWL_DATE_TIME_FORMATS = OWL_DATE_TIME_FORMATS;
    exports.OWL_DATE_TIME_LOCALE = OWL_DATE_TIME_LOCALE;
    exports.OWL_DATE_TIME_LOCALE_PROVIDER = OWL_DATE_TIME_LOCALE_PROVIDER;
    exports.OwlCalendarComponent = OwlCalendarComponent;
    exports.OwlDateTimeComponent = OwlDateTimeComponent;
    exports.OwlDateTimeInlineComponent = OwlDateTimeInlineComponent;
    exports.OwlDateTimeInputDirective = OwlDateTimeInputDirective;
    exports.OwlDateTimeIntl = OwlDateTimeIntl;
    exports.OwlDateTimeModule = OwlDateTimeModule;
    exports.OwlDateTimeTriggerDirective = OwlDateTimeTriggerDirective;
    exports.OwlMomentDateTimeModule = OwlMomentDateTimeModule;
    exports.OwlMonthViewComponent = OwlMonthViewComponent;
    exports.OwlMultiYearViewComponent = OwlMultiYearViewComponent;
    exports.OwlNativeDateTimeModule = OwlNativeDateTimeModule;
    exports.OwlTimerComponent = OwlTimerComponent;
    exports.OwlYearViewComponent = OwlYearViewComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-pick-datetime.umd.js.map
