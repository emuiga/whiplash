/**
 * Module 1 — Topic 3: Objects & Arrays Mastery
 *
 * What we're covering:
 *   1. Objects — creating, reading, updating
 *   2. Destructuring — objects and arrays
 *   3. Spread operator (...) — copying and merging
 *   4. Array methods — .map(), .filter(), .reduce(), .find()
 *   5. Immutability — why you never mutate in React
 *
 * Reference: notes-objects-arrays.js
 */


// ============================================================
// EXERCISE 1 — Destructuring
// ============================================================

const car = {
  make: 'Toyota',
  model: 'Corolla',
  year: 2021,
  location: {
    city: 'Nairobi',
    country: 'Kenya'
  }
};

// Task 1a: Destructure `make`, `model`, and `year` from car in one line.

const { make, model, year } = car;

// Task 1b: Destructure `city` from the nested location object.

const { location : { city } } = car;

// Task 1c: Destructure `make` but rename the variable to `brand`.

const { make: brand } = car;

// Task 1d: Destructure a field called `color` that doesn't exist on car.
//          Give it a default value of 'white'.

const { color= 'white'} = car

// Log all your variables to confirm.

// const car = {
//   make: 'Toyota',
//   model: 'Corolla',
//   year: 2021,
//   location: {
//     city: 'Nairobi',
//     country: 'Kenya'
//   }
// };
// const newCar = {...car, color: 'white'};


// ============================================================
// EXERCISE 2 — Spread operator
// ============================================================

const vehicle = {
  id: 101,
  make: 'Nissan',
  model: 'X-Trail',
  available: true,
  pricePerDay: 4500
};

// Task 2a: Create a new object `updatedVehicle` that is a copy of vehicle
//          but with pricePerDay changed to 5000.
//          Do NOT modify the original vehicle object.

const updatedVehicle = {...vehicle, pricePerDay: 5000};

// Task 2b: Create another object `featuredVehicle` based on updatedVehicle
//          but with a new field `featured: true` added.

const featuredVehicle = {...updatedVehicle, featured: true};

// Log both vehicle (original, unchanged) and featuredVehicle to confirm.

// const vehicle = {
//   id: 101,
//   make: 'Nissan',
//   model: 'X-Trail',
//   available: true,
//   pricePerDay: 4500
// };

// const updatedVehicle = {...vehicle, pricePerDay: 5000}

// const featuredVehicle = {...updatedVehicle, featured: true}

// console.log(updatedVehicle)
// console.log(featuredVehicle)  

// ============================================================
// EXERCISE 3 — Array methods
// ============================================================

const bookings = [
  { id: 1, customer: 'Alice',   vehicle: 'Toyota Corolla', days: 3, amount: 12000, status: 'confirmed' },
  { id: 2, customer: 'Brian',   vehicle: 'Nissan X-Trail', days: 5, amount: 22500, status: 'pending'   },
  { id: 3, customer: 'Cynthia', vehicle: 'Toyota Corolla', days: 2, amount: 8000,  status: 'confirmed' },
  { id: 4, customer: 'David',   vehicle: 'Subaru Outback', days: 7, amount: 35000, status: 'cancelled' },
  { id: 5, customer: 'Eve',     vehicle: 'Nissan X-Trail', days: 4, amount: 18000, status: 'confirmed' },
];

// Task 3a: Use .filter() to get only confirmed bookings.
//          Store the result in `confirmedBookings` and log it.

const confirmedBookings = bookings.filter(b => b.status === 'confirmed');

// Task 3b: Use .map() on the original bookings array to return an array
//          of just the customer names. Store in `customerNames` and log it.

const customerNames = bookings.map(b => b.customer);
console.log(customerNames);

// Task 3c: Use .find() to get the single booking where customer is 'Brian'.
//          Store in `briansBooking` and log it.

const briansBooking = bookings.find(b => b.customer === 'Brian');
if (briansBooking) {
console.log(briansBooking);
} else {
  console.log('No Brian in the system.')
}
// ============================================================
// EXERCISE 4 — Chaining + reduce
// ============================================================

// Task 4: Calculate the total revenue from confirmed bookings only.
//         Steps: filter confirmed → reduce to sum the amounts.
//         Store the result in `totalRevenue` and log it.
//         Expected answer: 12000 + 8000 + 18000 = 38000

const totalRevenue = bookings
.filter(b => b.status === 'confirmed')
.reduce((sum, b) => sum + b.amount, 0)

console.log(totalRevenue);
// Hint: you can chain .filter(...).reduce(...)
