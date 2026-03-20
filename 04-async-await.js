/**
 * Convert the Promise version to async/await with try/catch. Then add a second
 * operation that depends on the first. Then add a third that does NOT depend on
 * the others — make those two run in parallel with Promise.all.
 */

// ============================================================
// YOUR ISSUES — read before looking at the fix
// ============================================================

// ISSUE 1: async on getUserData/getUserPosts is unnecessary.
// Those functions manually build and return a new Promise.
// async is not needed on a function that already returns a Promise.
// async is for the CONSUMER — the function that calls await.

// ISSUE 2: await getUserData(1) at the top level.
// Top-level await only works in ES Modules (.mjs files or type:"module").
// In a regular .js file (CommonJS), await must be inside an async function.
// That's why you were lost — the code would throw a SyntaxError.

// ISSUE 3: Mixing await with .then() chaining.
// await getUserData(1).then(...) is mixing two patterns.
// Pick one. For this exercise: use async/await + try/catch. No .then().

// ============================================================
// THE FUNCTIONS — these stay the same, just drop the async keyword
// ============================================================

function getUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId < 0) {
        reject(new Error('Invalid Id'));
        return;
      }
      resolve({ id: userId, name: 'Batman' });
    }, 1000);
  });
}

function getUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId < 0) {
        reject(new Error('Invalid userId'));
        return;
      }
      resolve([
        { id: 100, title: 'Wewe' },
        { id: 101, title: 'Mimi' }
      ]);
    }, 1000);
  });
}

// Third function — for the parallel part. Doesn't depend on posts.
function getUserSettings(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ theme: 'dark', language: 'en', userId });
    }, 1000);
  });
}

// ============================================================
// PART 1: async/await + try/catch (sequential — each depends on previous)
// ============================================================

async function loadUser(userId) {
  try {
    const user = await getUserData(userId);      // pause, wait for user
    console.log('Got user:', user);

    const posts = await getUserPosts(user.id);   // depends on user.id from above
    console.log('Got posts:', posts);

  } catch (error) {
    // ANY failed await in this block lands here
    console.log('Error:', error.message);
  }
}

loadUser(1);   // success
loadUser(-1);  // triggers reject → caught by catch

// ============================================================
// PART 2: Promise.all — parallel for things that don't depend on each other
// ============================================================

async function loadDashboard(userId) {
  try {
    const user = await getUserData(userId);       // must come first — we need user.id

    // posts and settings both need user.id but don't depend on EACH OTHER
    // running them sequentially would waste 1 second
    // Promise.all runs them at the same time
    const [posts, settings] = await Promise.all([
      getUserPosts(user.id),
      getUserSettings(user.id)
    ]);

    console.log('\n--- Dashboard ---');
    console.log('User:', user);
    console.log('Posts:', posts);
    console.log('Settings:', settings);

  } catch (error) {
    console.log('Dashboard error:', error.message);
  }
}

loadDashboard(2);

// ============================================================
// THE KEY MENTAL MODEL:
//
// async  → marks a function so you can use await inside it
// await  → pauses THAT function until the Promise resolves
//          does NOT block the main thread — other code keeps running
//
// try    → wrap your awaits here
// catch  → any rejected Promise from any await lands here
//
// Promise.all → starts multiple Promises simultaneously
//               waits for ALL to finish
//               if ANY rejects, the whole thing rejects
// ============================================================
