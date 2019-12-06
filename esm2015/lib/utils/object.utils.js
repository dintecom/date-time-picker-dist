/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * object.utils
 */
/**
 * Extends an object with the *enumerable* and *own* properties of one or more source objects,
 * similar to Object.assign.
 *
 * @param {?} dest The object which will have properties copied to it.
 * @param {...?} sources The source objects from which properties will be copied.
 * @return {?}
 */
export function extendObject(dest, ...sources) {
    if (dest == null) {
        throw TypeError('Cannot convert undefined or null to object');
    }
    for (const source of sources) {
        if (source != null) {
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    dest[key] = source[key];
                }
            }
        }
    }
    return dest;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZGF0ZS1hbmQtdGltZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvdXRpbHMvb2JqZWN0LnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQVdBLE1BQU0sVUFBVSxZQUFZLENBQUMsSUFBUyxFQUFFLEdBQUcsT0FBYztJQUNyRCxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDZCxNQUFNLFNBQVMsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO0tBQ2pFO0lBRUQsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDMUIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2hCLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO2dCQUN0QixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzNCO2FBQ0o7U0FDSjtLQUNKO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogb2JqZWN0LnV0aWxzXG4gKi9cblxuLyoqXG4gKiBFeHRlbmRzIGFuIG9iamVjdCB3aXRoIHRoZSAqZW51bWVyYWJsZSogYW5kICpvd24qIHByb3BlcnRpZXMgb2Ygb25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMsXG4gKiBzaW1pbGFyIHRvIE9iamVjdC5hc3NpZ24uXG4gKlxuICogQHBhcmFtIGRlc3QgVGhlIG9iamVjdCB3aGljaCB3aWxsIGhhdmUgcHJvcGVydGllcyBjb3BpZWQgdG8gaXQuXG4gKiBAcGFyYW0gc291cmNlcyBUaGUgc291cmNlIG9iamVjdHMgZnJvbSB3aGljaCBwcm9wZXJ0aWVzIHdpbGwgYmUgY29waWVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGRlc3Q6IGFueSwgLi4uc291cmNlczogYW55W10pOiBhbnkge1xuICAgIGlmIChkZXN0ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XG4gICAgICAgIGlmIChzb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZXN0O1xufVxuIl19