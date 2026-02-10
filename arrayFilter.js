// Task 2: Array Filter
// Create a function getAdults that takes an array of user objects and returns only users 18 or older.

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 },
  { name: 'Diana', age: 16 }
];


const getAdults = users.filter(function(user){
    if (user.age>=18){
        return user.name
    }
})

console.log(getAdults)