/**
 * Write a function getUserData(userId, callback) that simulates fetching a user (use setTimeout for 1 second delay). Call it and
   log the result. Then write a second function that nests TWO callbacks — get the user, then get their posts. Feel the pain of
  callback hell.
 */

// ============================================================
// PART 1: single callback — get a user
// ✅ This part was correct. Left as-is.
// ============================================================

function getUserData(userId, callback) {
  setTimeout(() => {
    const user = { id: userId, name: 'Steve' };
    callback(user);
  }, 1000);
}

getUserData(1, function(user) {
  console.log('User:', user);
});

// ============================================================
// PART 2: nested callbacks — get user, then get their posts
// ============================================================

// You need a second async function to simulate fetching posts.
// You already have getUserData above — don't rewrite it, reuse it.

function getUserPosts(userId, callback) {
  setTimeout(() => {
    const posts = [
      { id: 101, userId: userId, title: 'My first post' },
      { id: 102, userId: userId, title: 'My second post' }
    ];
    callback(posts);
  }, 1000);
}

// The nesting: call getUserData, and INSIDE its callback, call getUserPosts.
// This gives you access to user.id when making the second call.

getUserData(3, function(user) {
  console.log('Got user:', user);            // runs after ~1s

  getUserPosts(user.id, function(posts) {    // starts AFTER user arrives
    console.log('Got posts:', posts);        // runs after ~2s total
  });

  // getUserPosts is inside getUserData's callback.
  // That's the nest. user.id is available here because it's in the same scope.
});

// Total time: ~2 seconds (1s + 1s, sequential — one waits for the other)
// Add 3 more levels of this and you have the Pyramid of Doom.

// ============================================================
// YOUR ISSUES IN THE ORIGINAL:
//
// 1. setTimeout(()={ — missing the > in the arrow. Should be: () => {
// 2. You redeclared getUserData — can't have two functions with the same name.
//    For part 2 you needed a NEW function (getUserPosts), not a rewrite.
// 3. const user = {} — you started the object but never filled it or called callback.
// ============================================================
