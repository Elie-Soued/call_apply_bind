/**Call
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 * The call() method calls the function with a given this value and arguments provided individually.
 */

let obj = { num: 2 };

let addThisToFunction = function (val) {
  return this.num + val;
};

console.assert(addThisToFunction.call(obj, 3) === 5); // functionName.call(obj, argument)

// In case we want to call a function that takes more than 1 argument

let addThisToFunction2 = function (val1, val2, val3) {
  return this.num + val1 + val2 + val3;
};

console.assert(addThisToFunction2.call(obj, 1, 2, 3) === 8);

/**Apply
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
 * The apply() method calls the specified function with a given this value, and arguments provided
 * as an array (or an array-like object).
 */

let arr = [1, 2, 3];

console.assert(addThisToFunction2.apply(obj, arr) === 8);

/**Bind
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
 * The bind() method creates a new function that, when called, has its this keyword set
 * to the provided value, with a given sequence of arguments preceding any provided when
 * the new function is called.
 */

let addThisToFunction3 = addThisToFunction2.bind(obj);
console.assert(addThisToFunction3(1, 2, 3) === 8);
