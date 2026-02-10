// Task 1: Temperature Converter
// Write three versions of a function that converts Celsius to Fahrenheit:

// Function declaration
// Function expression
// Arrow function

// Formula: (celsius * 9/5) + 32
// Test with: 0°C (should be 32°F) and 100°C (should be 212°F)


//version 1: function declaration

function celsiusToFahrenheit(celsius){
    return (celsius * 9/5) + 32;
}

console.log(celsiusToFahrenheit(0))
console.log(celsiusToFahrenheit(100))


//version 2: function expression

const celsiusToFahrenheitfe = function(celsius){
    return (celsius * 9/5) + 32;
} 

console.log(celsiusToFahrenheitfe(0))
console.log(celsiusToFahrenheitfe(100))

//version 3: arrow

const celsiusToFahrenheitar = (celsius) => (celsius * 9/5) + 32;

console.log(celsiusToFahrenheitar(0))
console.log(celsiusToFahrenheitar(100))