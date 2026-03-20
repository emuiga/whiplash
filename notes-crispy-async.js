/**
 * NOTES: Crispy Async — Project Reference
 * A vanilla JS dashboard demonstrating async concepts with real HTTP requests.
 * Repo: github.com/emuiga/crispy-async
 */

// ============================================================
// WHAT IT DOES
// ============================================================
// Fetches a user + their posts from JSONPlaceholder (free fake API)
// Displays them in cards with a loading spinner and error state
// Has a light/dark theme toggle
// Buttons: Load User 1 / 2 / 5, Trigger Error

// ============================================================
// CONCEPT 1: fetch() — real Promises, not simulated setTimeout
// ============================================================

// fetch() is the browser's built-in HTTP API. Returns a Promise.
// Unlike our setTimeout exercises, this is a real network request.

async function fetchUser(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  if (!response.ok) throw new Error(`User not found: ${response.status}`)
  return await response.json()
}

// TWO awaits — because fetch() resolves in two steps:
//   await fetch()          → resolves when HEADERS arrive (status, content-type)
//   await response.json()  → resolves when BODY is parsed
// Think: truck arrives at door → then you open and unpack the box

// ============================================================
// CONCEPT 2: response.ok — fetch() doesn't throw on 404/500
// ============================================================

// fetch() only rejects on network failure (no internet, DNS error).
// A 404 or 500 from the server is still a "successful" fetch.
// You MUST check response.ok yourself and throw manually.
// response.ok = true for status codes 200–299.

// ============================================================
// CONCEPT 3: Promise.all — parallel fetching
// ============================================================

// User and posts both need userId but don't depend on each other.
// Run them simultaneously → total time = slowest of the two (~300ms)
// Sequential would be ~600ms — unnecessary waste.

const [user, posts] = await Promise.all([
  fetchUser(userId),
  fetchPosts(userId)
])

// ============================================================
// CONCEPT 4: try/catch/finally — real error handling
// ============================================================

async function loadDashboard(userId) {
  clearUI()
  showLoading()
  try {
    const [user, posts] = await Promise.all([fetchUser(userId), fetchPosts(userId)])
    renderUser(user)
    renderPosts(posts)
  } catch (error) {
    showError(error.message)    // any failure — network, bad status, render bug
  } finally {
    hideLoading()               // ALWAYS runs — success or failure
  }
}

// Without finally → spinner never hides on error
// finally = guaranteed cleanup, no matter what happened

// ============================================================
// CONCEPT 5: DOM Manipulation — how JS talks to HTML
// ============================================================

// Find elements (done once at top of file, stored in variables):
// const userCard = document.getElementById('user-card')

// Show/hide with classList:
// element.classList.add('hidden')     → hides element
// element.classList.remove('hidden')  → shows element

// Inject content:
// element.innerHTML = `<h2>${user.name}</h2>`  → injects HTML string
// element.textContent = message                 → sets plain text (safer for user data)

// Build lists with .map().join(''):
// postsList.innerHTML = posts.map(post => `<div>${post.title}</div>`).join('')

// ============================================================
// CONCEPT 6: CSS Variables for theming
// ============================================================

// :root defines variables for the whole page
// [data-theme="dark"] overrides them for dark mode
// JS just sets one attribute on <html> — CSS does all the work

// document.documentElement = the <html> tag
// document.documentElement.setAttribute('data-theme', 'dark')
// → every element using var(--bg-primary) instantly recolours

// ============================================================
// CONCEPT 7: The loading spinner = the async gap made visible
// ============================================================

// showLoading() → fetch starts → async gap → fetch resolves → hideLoading()
// The spinner is literally the time between request and response.
// This is the event loop in action on screen.

// ============================================================
// THE LOADING SPINNER BUG — CSS cascade lesson
// ============================================================

// Bug: .loading-container { display: flex } was overriding .hidden { display: none }
// Because .loading-container came AFTER .hidden in the CSS file.
// Equal specificity → later declaration wins.
// Fix: .hidden { display: none !important } — forces it to always win.
// !important is valid here — .hidden is a utility class that must always override.

// ============================================================
// API USED — JSONPlaceholder
// ============================================================

// https://jsonplaceholder.typicode.com — free fake REST API, no auth
// GET /users/:id        → single user object
// GET /users/:id/posts  → array of posts for that user
// Users 1–10 exist. User 9999 → 404 (used for triggerError)

// User shape:  { id, name, email, phone, company: { name } }
// Post shape:  { id, userId, title, body }
