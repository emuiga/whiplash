/**
 * NOTES: Functions
 * Covers: declarations, expressions, arrow functions, higher-order, pure vs impure, hoisting
 */

// ============================================================
// 1. FUNCTION DECLARATION
// ============================================================

// Hoisted — can be called BEFORE it's defined in the file
console.log(greet('Stan')); // works fine — hoisting

function greet(name) {
  return `Hello, ${name}`;
}

// Hoisting means JS moves function declarations to the top of their scope
// before executing. Only declarations are hoisted, not expressions.

// ============================================================
// 2. FUNCTION EXPRESSION
// ============================================================

// NOT hoisted — must be defined before use
const square = function(x) {
  return x * x;
};

// console.log(square(4)); // → 16
// If you tried calling square() before this line → TypeError: square is not a function

// ============================================================
// 3. ARROW FUNCTIONS
// ============================================================

// Standard
const add = (a, b) => {
  return a + b;
};

// Shorthand (implicit return — one expression, no curly braces)
const addShort = (a, b) => a + b;

// One parameter — parentheses optional
const double = x => x * 2;

// No parameters — parentheses required
const sayHi = () => 'Hi!';

// Returning an object — wrap in parentheses (otherwise {} is read as a block)
const makePerson = (name, age) => ({ name, age });

// Arrow functions vs regular functions — THE KEY DIFFERENCE:
// Arrow functions do NOT have their own `this`.
// They inherit `this` from the surrounding scope.
// This is why arrow functions are used inside setTimeout and class methods.

// ============================================================
// 4. HIGHER-ORDER FUNCTIONS
// ============================================================

// A function that takes another function as a parameter OR returns a function.
// This is possible because functions are "first-class" in JS — they're just values.

function map(fn, arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i]));
  }
  return result;
}

const upper = map(name => name.toUpperCase(), ['alice', 'bob', 'charlie']);
// → ['ALICE', 'BOB', 'CHARLIE']

// Built-in higher-order functions you'll use constantly in React:
// .map(), .filter(), .reduce(), .find(), .forEach()

// ============================================================
// 5. PURE vs IMPURE FUNCTIONS
// ============================================================

// PURE: same input always gives same output. No side effects.
function pureAdd(a, b) {
  return a + b; // no outside world touched
}

// IMPURE: depends on or modifies external state
let total = 0;
function impureAdd(a) {
  total += a; // modifies external variable — side effect
  return total;
}

// React components should be pure. Same props → same output.
// Side effects (fetch, timers, DOM changes) go in useEffect.

// ============================================================
// 6. WHEN TO USE WHICH
// ============================================================

// Function Declaration  → hoisting matters, top-level named functions
// Function Expression   → assigning functions to variables, conditional functions
// Arrow Function        → callbacks, array methods, anything in React
// Higher-Order Function → .map(), .filter(), custom utilities

// ============================================================
// Q&A FROM SESSION
// ============================================================

// Q: Why does calling a function before its declaration work?
// A: Function declarations are hoisted — JS moves them to the top of their
//    scope before execution. Expressions (const fn = function...) are NOT hoisted.
