/**
 * Convert getUserData from file 2 into a Promise-based function. Use .then() chaining.
 * Add error handling with .catch(). Also write a version that rejects (pass a negative
 * userId) and confirm the error is caught.
 */

// ============================================================
// PART 1: THE PROMISE FUNCTION
// ============================================================

function getUserData(userId) {
  return new Promise((resolve, reject) => {
    // ↑ Always use curly braces {} in the executor body. Your original was:
    // new Promise((resolve, reject) => setTimeout(...))
    // That works accidentally (implicit return), but it's wrong style
    // and breaks if you ever add a second line. Always use {}.

    setTimeout(() => {

      // ❌ YOUR ORIGINAL: always called resolve(), even for negative IDs.
      // That means getUserData(-1) would succeed — reject was never called.
      // You have to write the condition yourself. Promises don't auto-reject.

      if (userId < 0) {
        reject(new Error('Invalid userId: must be positive'));
        return; // stop here — don't call resolve after reject
      }

      resolve({ id: userId, name: 'Steve' });

    }, 1000);
  });
}

// ============================================================
// PART 2: CONSUMING THE PROMISE — USE .catch(), NOT try/catch
// ============================================================

// ❌ WHAT YOU DID — wrapping the whole call in try/catch:
//
//   try {
//     getUserData(1).then(user => console.log(user));
//   } catch(error) {
//     console.log('error');
//   }
//
// This does NOT catch Promise rejections.
// Here's why: try/catch only catches SYNCHRONOUS errors.
// By the time the Promise rejects (1 second later), the try/catch
// block has already finished executing and is gone.
// The rejection happens in the future — try/catch isn't watching anymore.
//
// ✅ For Promises, use .catch() on the chain instead:

// Success case:
getUserData(1)
  .then(user => {
    console.log('Got user:', user);
  })
  .catch(error => {
    console.log('Error:', error.message); // handles rejection
  });

// Rejection case — negative userId:
getUserData(-1)
  .then(user => {
    console.log('Got user:', user);       // won't run
  })
  .catch(error => {
    console.log('Error caught:', error.message); // ← this runs
  });

// ============================================================
// PART 3: WHY YOUR try/catch PRINTED "fuck you" FIRST
// ============================================================

// Your third call was getUserData(j) — j was never defined.
// That causes a ReferenceError SYNCHRONOUSLY (before even entering the function).
// try/catch CAN catch synchronous errors — and it did.
// That's why "fuck you" printed first, before the async results came back.
//
// So your output made sense:
//   "fuck you"                    ← sync ReferenceError, caught by try/catch
//   "Our user is: { id: 1 }"     ← 1 second later
//   "Our user is: { id: -1 }"    ← 1 second later (but reject wasn't wired up)
//
// You accidentally demonstrated the difference between sync and async errors.

// ============================================================
// PART 4: CHAINING — this is where Promises shine over callbacks
// ============================================================

function getUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId < 0) {
        reject(new Error('Invalid userId'));
        return;
      }
      resolve([
        { id: 101, title: 'First post' },
        { id: 102, title: 'Second post' }
      ]);
    }, 1000);
  });
}

// Compare this to the nested callbacks in 02-callbacks.js.
// Instead of nesting, we chain. Each .then() receives what the previous returned.

getUserData(3)
  .then(user => {
    console.log('Got user:', user);
    return getUserPosts(user.id);  // return a new Promise — passes it down the chain
  })
  .then(posts => {
    console.log('Got posts:', posts); // receives the resolved value from getUserPosts
  })
  .catch(error => {
    console.log('Something failed:', error.message); // catches errors from ANYWHERE in the chain
  });

// Flat. Readable. One .catch() covers all errors.
// This is the problem callbacks couldn't solve.
