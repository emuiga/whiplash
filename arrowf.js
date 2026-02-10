// const greet = (name) => {
//   return `Hello, ${name}!`;
// };

// console.log(greet('Dave'))



//shorthand

const greet = name => `Hello, ${name}`;
console.log(greet('Dwayne'))


const valentines = name => `Be my valentines, ${name}`
console.log(valentines('Sharon'))


// No parameters
const sayHi = () => 'Hi!';

// One parameter (parentheses optional)
const double = x => x * 2;
const doubleExplicit = (x) => x * 2; // Same thing

// Multiple parameters (parentheses required)
const add = (a, b) => a + b;

// Returning an object (wrap in parentheses)
const makePerson = (name, age) => ({ name, age });