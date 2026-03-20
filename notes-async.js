/**
 * NOTES: Async JavaScript
 * Covers: single-threaded, call stack, event loop, callbacks, promises, async/await
 */

// ============================================================
// 1. JAVASCRIPT IS SINGLE-THREADED
// ============================================================

// One thread. One call stack. One thing at a time.
// Blocking the call stack = tab freezes, clicks ignored, nothing works.

// SYNC (blocking) — stack is locked:
// console.log('Start');
// for (let i = 0; i < 3_000_000_000; i++) {} // 3 seconds, nothing else can run
// console.log('End');

// ASYNC (non-blocking) — stack stays free:
// console.log('Start');
// setTimeout(() => console.log('Later'), 2000); // handed off, stack free immediately
// console.log('End');
// Output: Start → End → (2s later) → Later

// ============================================================
// 2. THE CALL STACK
// ============================================================

// LIFO — last in, first out. Functions pushed when called, popped when done.
// function add(a, b) { return a + b; }
// function calculate() { const r = add(2,3); console.log(r); }
// calculate();
//
// Stack: [calculate] → [calculate, add] → [calculate] → [calculate, console.log] → []

// ============================================================
// 3. THE EVENT LOOP
// ============================================================

//  CALL STACK          ← JS executes here
//       ↓ (when empty, checks:)
//  MICROTASK QUEUE     ← Promise .then() callbacks — checked FIRST, always
//       ↓ (when microtasks empty:)
//  MACROTASK QUEUE     ← setTimeout, setInterval callbacks — one per loop tick
//
//  BROWSER / NODE APIs ← slow work (timers, fetch) handled OUTSIDE JS thread
//                        when done → pushes callback into the appropriate queue

// Microtasks (Promises) always run before macrotasks (setTimeout).
// console.log('1');
// setTimeout(() => console.log('2'), 0);
// Promise.resolve().then(() => console.log('3'));
// console.log('4');
// Output: 1 → 4 → 3 → 2

// ============================================================
// 4. CALLBACKS — Generation 1
// ============================================================

// A function you pass to another function, to be called later when async work is done.

function fetchUser(userId, callback) {
  setTimeout(() => {
    const user = { id: userId, name: 'Steve' };
    callback(user); // "I'm done, here's your data"
  }, 1000);
}

fetchUser(1, function(user) {
  console.log('Got user:', user);
});

// ERROR-FIRST CALLBACKS (Node.js convention):
// The first argument is always the error (null if no error), second is data.
// fetchUser(1, function(error, user) {
//   if (error) return console.log('Failed:', error.message);
//   console.log('Got user:', user);
// });

// CALLBACK HELL — what happens when you need sequential async operations:
// getUser(1, function(user) {
//   getPosts(user.id, function(posts) {
//     getComments(posts[0].id, function(comments) {
//       // 😱 Pyramid of Doom — gets worse with every step
//     });
//   });
// });
// Problems: deeply nested, hard to read, one catch per level, no parallelism

// ============================================================
// 5. PROMISES — Generation 2
// ============================================================

// A Promise is an object representing a future value.
// States: PENDING → FULFILLED (resolve) or REJECTED (reject)
// Once settled, never changes state.

function fetchUserP(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId < 0) {
        reject(new Error('Invalid userId'));
        return;
      }
      resolve({ id: userId, name: 'Steve' });
    }, 1000);
  });
}

// Consuming with .then() chaining — flat, not nested:
// fetchUserP(1)
//   .then(user => {
//     console.log('Got user:', user);
//     return getUserPosts(user.id); // return a Promise → passed to next .then()
//   })
//   .then(posts => console.log('Got posts:', posts))
//   .catch(error => console.log('Error:', error.message))  // catches ALL errors in chain
//   .finally(() => console.log('Done'));                   // always runs

// KEY: .catch() on Promises is NOT the same as try/catch.
// try/catch is synchronous. Promises reject asynchronously.
// try/catch AROUND a .then() call does NOT catch the rejection.
// Use .catch() on the chain, or use try/catch inside an async function.

// ============================================================
// 6. async/await — Generation 3
// ============================================================

// Syntactic sugar over Promises. Same engine, better syntax.
// async function always returns a Promise.
// await pauses THAT function (not the main thread) until Promise resolves.
// Must be inside an async function (or ES module top level).

async function loadUser(userId) {
  try {
    const user = await fetchUserP(userId);        // pauses here
    console.log('Got user:', user);
    // const posts = await getUserPosts(user.id); // pauses again
    return user;
  } catch (error) {
    // any rejected await lands here
    console.log('Error:', error.message);
  } finally {
    console.log('Always runs');
  }
}

// loadUser(1);   // success
// loadUser(-1);  // triggers rejection → caught by catch

// ============================================================
// 7. SEQUENTIAL vs PARALLEL
// ============================================================

// SEQUENTIAL — each waits for the previous (slow if they don't depend on each other)
// async function slow() {
//   const a = await fetchA(); // 1s
//   const b = await fetchB(); // 1s after a
//   const c = await fetchC(); // 1s after b — total: 3s
// }

// PARALLEL — all start at the same time (Promise.all)
// async function fast() {
//   const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);
//   // total: ~1s (the slowest of the three)
// }

// Promise.all   → waits for ALL, fails if ANY rejects
// Promise.allSettled → waits for ALL, gives you each result + status
// Promise.race  → resolves/rejects as soon as the FIRST settles
// Promise.any   → resolves as soon as the FIRST fulfills

// ============================================================
// 8. COMMON MISTAKES
// ============================================================

// 1. Forgetting await — no error, silently wrong
// async function save(data) {
//   db.save(data);       // ❌ returns a Promise nobody waits for
//   console.log('Done'); // runs before save completes
// }

// 2. await inside .forEach — doesn't work, forEach ignores async
// ids.forEach(async (id) => { await fetch(id); }); // ❌
// Use for...of for sequential, Promise.all(.map()) for parallel ✅

// 3. Unhandled rejection — always add .catch() or try/catch

// 4. async in useEffect (React) — useEffect cannot be async directly
// useEffect(async () => { ... }, []); // ❌
// useEffect(() => { async function load() { ... } load(); }, []); // ✅

// ============================================================
// Q&A FROM SESSION
// ============================================================

// Q: Why use user.id inside .then() instead of userId?
// A: userId is a parameter INSIDE the getUserData function — it's scoped there.
//    Once getUserData returns, userId is gone from that scope.
//    Inside .then(), you're outside getUserData. userId doesn't exist there.
//    What you DO have is user — the object that resolve() handed back.
//    user.id is how you access that value from outside.

// Q: Why did try/catch not catch my Promise rejection?
// A: try/catch catches SYNCHRONOUS errors only.
//    By the time a Promise rejects (1 second later), the try/catch block
//    has already finished executing — it's no longer watching.
//    Use .catch() on the Promise chain, or try/catch inside an async function.

// Q: Why was "fuck you" printed first when passing an undefined variable?
// A: Passing an undefined variable (like j) causes a ReferenceError SYNCHRONOUSLY
//    before the function even runs. try/catch CAN catch sync errors — it did.
//    The async results from the other calls came back 1 second later.
//    You accidentally demonstrated the difference between sync and async errors.

// Q: Can I use async on a function that already returns new Promise()?
// A: Technically yes, but it's redundant — and confusing.
//    async belongs on the CONSUMER (the function using await).
//    The function building the Promise with new Promise() doesn't need async.

// Q: Why does getUserSettings have no reject?
// A: reject is not mandatory — only include it when there's a meaningful failure
//    condition. getUserSettings assumes every user has settings, so nothing
//    to validate, nothing to reject. In production it would hit a network and
//    you'd reject on network failure — but not on the data logic itself.
//    Rule: add reject when the data can be invalid or the operation has a known
//    failure mode. Don't add it just because it's a Promise.

// Q: What if settings have different themes, languages per user?
// A: In a real app, settings come from a database per user. Simulate it like this:
//
// function getUserSettings(userId) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const settingsDB = {
//         1: { theme: 'dark',  language: 'en', userId: 1 },
//         2: { theme: 'light', language: 'sw', userId: 2 },
//         3: { theme: 'dark',  language: 'fr', userId: 3 },
//       };
//       const settings = settingsDB[userId] || { theme: 'light', language: 'en', userId };
//       resolve(settings);
//     }, 1000);
//   });
// }
//
// The caller doesn't care how settings are determined — it just awaits and uses them.




//deeper rabbit holes (AbortController, async iterators, Web Workers)
/**
 * articles:
 * Part 1 — "JavaScript's Hidden Engine: The Event Loop"
    → single-threaded, call stack, sync vs async, why it matters

  Part 2 — "From Callback Hell to Promises"
    → the evolution, why each exists, what problem it solved

  Part 3 — "async/await: Async Code That Reads Like English"
    → the modern way, try/catch, Promise.all, common mistakes

 */