//global scope

//module scope

//function scope

//block scope - let and const; scope created with a pair of curly braces.
//1. 
if (Math.random() > 0.5) {
  const y = 5;
}
console.log(y); // ReferenceError: y is not defined
//2.
if (Math.random() > 0.5) {
  let y = 5;
}
console.log(y); // ReferenceError: y is not defined
//3.
if (Math.random() > 0.5) {
  var y = 5;
}
console.log(y); // 5

//When you declare a variable outside of any function, 
// it is called a global variable, because it is available
//  to any other code in the current document. 
// When you declare a variable within a function, 
// it is called a local variable, because it is available only within that function.