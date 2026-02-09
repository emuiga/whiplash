const greet = function(name) {
  return `Hello, ${name}!`;
};

console.log(greet('Bob')); // "Hello, Bob!"

// Characteristics:

// 1. NOT hoisted - must be defined before you call it
console.log(multiply(2, 3)); // ❌ Error: Cannot access 'multiply' before initialization

const multiply = function(a, b) {
  return a * b;
};
// 2. The variable is hoisted, but its value (the function) is not
// 3. Has its own this binding
// 4. Can be anonymous or named
//named- for better debugging:
const divide = function divideNumbers(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
};

// Stack trace will show "divideNumbers" instead of "anonymous"