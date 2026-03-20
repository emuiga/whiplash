/**
 * TASK: Demonstrate the difference between sync (blocking) and async (non-blocking).
 * Run with: node 01-sync-vs-async.js
 */

// ============================================================
// PART 1: SYNCHRONOUS — BLOCKING
// The call stack is stuck until this finishes. Nothing else runs.
// ============================================================

console.log('--- SYNC EXAMPLE ---');

function syncGreet(name) {
    // This runs and STAYS on the call stack until it returns.
    // Nothing below it can run while this is executing.
    const message = 'Hello, ' + name;
    return message;
}
  
console.log('Before syncGreet');          // 1. runs
const result = syncGreet('Mary');         // 2. call stack: [syncGreet] → returns → popped
console.log(result);                      // 3. runs immediately after
console.log('After syncGreet');           // 4. runs

// OUTPUT ORDER: Before → Hello Mary → After
// Predictable. Sequential. But if syncGreet took 3 seconds, EVERYTHING waits.

// ============================================================
// PART 2: ASYNCHRONOUS — NON-BLOCKING
// The call stack hands off slow work and moves on immediately.
// ============================================================

console.log('\n--- ASYNC EXAMPLE ---');

// ✅ Good start — small corrections below in comments
function sendMessage(data, callback) {
    // When sendMessage is called, it goes on the call stack.
    // setTimeout is called → handed off to Node.js (not "browser" — in Node.js
    // it's handed to libuv, Node's internal async library. Same idea though).
    // setTimeout IMMEDIATELY returns (nothing to return, it just registers the timer).
    // sendMessage then returns and is POPPED from the stack.
    // The callback is NOT called yet — it's stored and will be called later.
    setTimeout(() => {
        const girlfriend = data + ', I miss you!';
        callback(girlfriend);           // called 2 seconds later
    }, 2000);
}

console.log('Before sendMessage');        // 1. runs

sendMessage('Mary', function(girlfriend) {
    // This anonymous function is your callback.
    // It is NOT called here when you pass it in.
    // It's called 2 seconds later, from inside setTimeout, with the result.
    // By the time this runs, sendMessage has already returned and left the stack.
    console.log(girlfriend);             // 3. runs 2 seconds later
});

// sendMessage('Mary', callback) is called → goes on stack
// Inside: setTimeout hands off its work → sendMessage returns → POPPED
// Call stack is now empty and FREE.

console.log('After sendMessage');         // 2. runs IMMEDIATELY — does not wait for setTimeout

// OUTPUT ORDER: Before → After → (2 seconds later) → Mary, I miss you!
// This is non-blocking. The code below sendMessage() ran before the callback fired.

// ============================================================
// THE KEY DIFFERENCE — read this before moving on:
//
// SYNC:  Before → result → After       (sequential, stack locked)
// ASYNC: Before → After → callback     (non-blocking, stack free)
//
// Your comment on line 6 said "async blocking" — async is NON-blocking.
// That's the whole point of it. Blocking = stack locked. Non-blocking = stack free.
// ============================================================
