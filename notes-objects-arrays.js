/**
 * NOTES: Objects & Arrays Mastery
 * Covers: objects, destructuring, spread, map/filter/reduce/find, immutability
 */

// ============================================================
// 1. OBJECTS
// ============================================================

// An object is a collection of key-value pairs.
const user = {
  id: 1,
  name: 'Steve',
  email: 'steve@example.com',
  address: {
    city: 'Nairobi',
    country: 'Kenya'
  }
};

// Reading values:
// user.name           → dot notation (use when you know the key)
// user['name']        → bracket notation (use when key is dynamic)
// user.address.city   → nested — chain the dots


// ============================================================
// 2. DESTRUCTURING
// ============================================================

// A cleaner way to pull values out and assign to variables.

// Without destructuring:
// const name  = user.name;
// const email = user.email;

// With destructuring:
const { name, email } = user;

// Nested destructuring:
const { address: { city } } = user;

// Rename while destructuring:
const { name: userName } = user;  // variable is userName, not name

// Default values:
const { name: name2, role = 'viewer' } = user;  // role defaults to 'viewer' if missing

// ARRAY destructuring — by position, not by key:
const colours = ['red', 'green', 'blue'];
const [first, second] = colours;          // first = 'red', second = 'green'
const [,, third] = colours;               // skip items with commas → third = 'blue'

// You already used this with Promise.all:
// const [user, posts] = await Promise.all([fetchUser(), fetchPosts()])
// Position 0 → user, position 1 → posts


// ============================================================
// 3. SPREAD OPERATOR (...)
// ============================================================

// Takes everything inside an object or array and "spreads" it out.

// Copy an array:
const original = [1, 2, 3];
const copy = [...original];

// Merge arrays:
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b]; // [1, 2, 3, 4]

// Copy an object:
const userCopy = { ...user };

// Update an object — the most important React pattern:
const updatedUser = { ...user, name: 'Mary' };
// copies everything from user, overrides just name
// last key wins when there's a conflict

// Add a new field:
const withRole = { ...user, role: 'admin' };


// ============================================================
// 4. ARRAY METHODS
// ============================================================

const orders = [
  { id: 1, item: 'Keyboard', price: 85,  shipped: true  },
  { id: 2, item: 'Mouse',    price: 45,  shipped: false },
  { id: 3, item: 'Monitor',  price: 320, shipped: true  },
  { id: 4, item: 'Webcam',   price: 65,  shipped: false },
];

// .map() — transform every item, return a NEW array (same length)
const itemNames = orders.map(order => order.item);
// ['Keyboard', 'Mouse', 'Monitor', 'Webcam']

const withTax = orders.map(order => ({
  ...order,
  priceWithTax: order.price * 1.16
}));
// new array with all original fields + priceWithTax added

// In React: .map() is how you render lists
// orders.map(order => <OrderCard key={order.id} order={order} />)

// .filter() — keep items that pass a test, return a NEW array (shorter or same length)
const shippedOrders = orders.filter(order => order.shipped === true);
// only the shipped ones

// In React: deleting an item from state
// setOrders(orders.filter(order => order.id !== deletedId))

// .find() — return the FIRST item that passes a test (not an array — the item itself)
const monitor = orders.find(order => order.id === 3);
// { id: 3, item: 'Monitor', price: 320, shipped: true }
// Returns undefined if nothing matches

// .reduce() — collapse an array into a single value
// Two arguments: callback(accumulator, currentItem) and initial value
const total = orders.reduce((sum, order) => sum + order.price, 0);
// 85 + 45 + 320 + 65 = 515

// How reduce works step by step:
// start:   sum = 0
// step 1:  sum = 0   + 85  = 85
// step 2:  sum = 85  + 45  = 130
// step 3:  sum = 130 + 320 = 450
// step 4:  sum = 450 + 65  = 515  ← final result

// Chaining methods — filter then map:
const shippedNames = orders
  .filter(order => order.shipped)
  .map(order => order.item);
// ['Keyboard', 'Monitor']


// ============================================================
// 5. IMMUTABILITY — NEVER MUTATE
// ============================================================

// Rule: never modify an existing object or array.
// Always create a new one.

// ❌ MUTATION:
// user.age = 31           // modifying original object
// users.push('John')      // modifying original array
// orders[0].price = 99   // modifying item inside array

// ✅ IMMUTABLE UPDATES:
// const updatedUser  = { ...user, age: 31 }
// const newUsers     = [...users, 'John']
// const updatedOrders = orders.map(o => o.id === 1 ? { ...o, price: 99 } : o)

// WHY React cares about this:
// React compares old state to new state with a SHALLOW comparison.
// It checks if the REFERENCE changed — not if the values inside changed.
//
// If you mutate the original:
//   reference is the same → React thinks nothing changed → no re-render → UI stuck
//
// If you create a new object/array:
//   reference is different → React knows something changed → re-renders correctly
//
// This is why spread exists in almost every React state update:
// setState({ ...currentState, updatedField: newValue })


// ============================================================
// Q&A FROM SESSION
// ============================================================

// Q: When do I use dot notation vs bracket notation?
// A: Dot notation (user.name) when you know the key at write time.
//    Bracket notation (user[key]) when the key comes from a variable.
//    e.g: const field = 'name'; user[field] → works. user.field → looks for key "field", not "name".

// Q: What's the difference between .map() and .forEach()?
// A: .map() returns a NEW array — use it when you want to transform data.
//    .forEach() returns nothing — use it only for side effects (logging, etc).
//    In React you almost always want .map().

// Q: What if .find() finds nothing?
// A: Returns undefined. Always guard against it:
//    const item = orders.find(o => o.id === 99);
//    if (item) { ... }  // safe

// Q: Why does the last key win in spread?
// A: { ...user, name: 'Mary' } — JS processes left to right.
//    user's name gets written first, then 'Mary' overwrites it.
//    Order matters: { name: 'Mary', ...user } would keep user's original name.
