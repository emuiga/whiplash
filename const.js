//const only prevents reassignments but not mutations. 
//The properties of objects assigned to constants are not protected.
const MY_OBJECT = {key: "value"}
MY_OBJECT.key = "otherValue";

//Contents of an array are also not protected.
const MY_ARRAY = ["CSS", "JS"]
MY_ARRAY.push("TS")
console.log(MY_ARRAY)   // [CSS, JS, TS]