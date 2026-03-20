/**
 * NOTES: Scope & Closures
 * Covers: var/let/const, block/function/global scope, closures, practical uses
 */

// ============================================================
// 1. var vs let vs const
// ============================================================

// var   → function-scoped, hoisted, can be re-declared. AVOID IT.
// let   → block-scoped, not hoisted, can be reassigned
// const → block-scoped, not hoisted, cannot be reassigned

// The danger of var:
if (true) {
  var leaky = 'I escape the block';
}
console.log(leaky); // → 'I escape the block' (var ignores block scope)

if (true) {
  let safe = 'I stay in the block';
  const alsoSafe = 'Me too';
}
// console.log(safe);     // ReferenceError
// console.log(alsoSafe); // ReferenceError

// Rule: always use const by default. Use let only if you need to reassign.
// Never use var.

// ============================================================
// 2. SCOPE TYPES
// ============================================================

// GLOBAL SCOPE — available everywhere
const globalName = 'Steve';

// FUNCTION SCOPE — only inside the function
function showName() {
  const localName = 'Batman'; // only exists here
  console.log(localName);
}
// console.log(localName); // ReferenceError

// BLOCK SCOPE — only inside the curly braces {}
{
  const blockVar = 'only here';
  let anotherBlock = 'also only here';
}
// blockVar → ReferenceError outside

// SCOPE CHAIN: inner functions can access outer variables, not the other way
function outer() {
  const x = 10;
  function inner() {
    console.log(x); // inner can see x from outer — scope chain
  }
  inner();
}

// ============================================================
// 3. CLOSURES
// ============================================================

// A closure is when a function "remembers" the variables from its outer scope
// even after that outer function has finished executing.

function createGreeter(greeting) {
  // greeting is in createGreeter's scope
  return function(name) {
    return `${greeting}, ${name}`; // inner function remembers greeting
  };
}

const sayHello = createGreeter('Hello'); // createGreeter is done, but...
const sayHi = createGreeter('Hi');

console.log(sayHello('Alice')); // → Hello, Alice (greeting is still remembered)
console.log(sayHi('Bob'));      // → Hi, Bob (separate closure, separate memory)

// Each call to createGreeter creates a NEW closure with its OWN copy of greeting.

// ============================================================
// 4. CLOSURES IN PRACTICE — the makeAdder pattern
// ============================================================

function makeAdder(x) {
  return function(y) {
    return x + y; // x is closed over
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2));  // → 7
console.log(add10(2)); // → 12
// add5 and add10 share the same function body but have different closures

// ============================================================
// 5. WHY CLOSURES MATTER IN REACT
// ============================================================

// React hooks are powered by closures.
// useState, useCallback, useEffect — they all close over component variables.

// Example (concept — not runnable without React):
// function Counter() {
//   const [count, setCount] = useState(0);
//
//   function handleClick() {
//     setCount(count + 1); // handleClick closes over count
//   }
//
//   return <button onClick={handleClick}>{count}</button>;
// }
//
// handleClick "remembers" count from the component's scope — that's a closure.

// ============================================================
// 6. HOISTING SUMMARY
// ============================================================

// Function declarations → fully hoisted (can call before definition)
// var variables         → hoisted but undefined until assigned
// let/const             → hoisted but in "temporal dead zone" — ReferenceError if accessed early

console.log(hoistedFn()); // ✅ works — function declaration
// console.log(hoistedVar); // → undefined (hoisted but not yet assigned)
// console.log(hoistedLet); // ❌ ReferenceError — temporal dead zone

function hoistedFn() { return 'I am hoisted'; }
var hoistedVar = 'assigned now';
let hoistedLet = 'also assigned now';

// ============================================================
// Q&A FROM SESSION
// ============================================================

// Q: Why can inner functions access outer variables but not vice versa?
// A: Scope chain goes inward → out, never outward → in.
//    Inner functions look up the chain for variables they don't have locally.
//    Outer functions have no way to see inside inner functions.
