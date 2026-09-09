# To-Do List

A browser-based to-do list built with vanilla HTML, CSS, and JavaScript (no frameworks or libraries) — practicing dynamic DOM creation, an in-memory data array as the source of truth, and `localStorage` persistence.

## How to Use

1. Type a task into the input field and click **Add** (or the empty-input check will alert you if you forget).
2. Click a task to toggle it as completed (strikethrough style).
3. Click the 🗑️ button on a task to delete it.
4. Tasks persist across page reloads — closing and reopening the page restores the full list, including completed status.

## Features

- Dynamically creates `<li>` elements and delete buttons entirely from JavaScript — nothing is hardcoded in the HTML except the empty `<ul>` container
- Maintains a `tasks` array (`{ text, completed }` objects) as the single source of truth, separate from the DOM
- Saves to `localStorage` after every change (add, toggle, delete) via `JSON.stringify`
- Restores the full list on page load via `JSON.parse`, looping through the array with `forEach` to re-render each task
- Input validation rejects empty task submissions

## Project Structure

```
├── index.html      # Page structure: input, Add button, empty <ul> container
├── index.js        # Task data management, dynamic rendering, localStorage sync
└── style.css       # Styling: layout, task list, completed state, delete button
```

## Core Logic Overview

- **`tasks`** — an array of `{ text, completed }` objects, initialized by reading and parsing `localStorage` (`JSON.parse(localStorage.getItem('tasks')) || []`, with `|| []` guarding against `null` on first use).
- **`renderTask(taskObject)`** — a reusable function that builds one task's DOM: creates the `<li>`, sets its text, appends it to the list, attaches a click listener to toggle completion, creates and appends a delete button, and attaches its own click listener to delete the task. Called from two places: once per saved task on page load (via `forEach`), and once per new task when Add is clicked — the function itself doesn't know or care which caller invoked it.
- **Adding a task** — validates the input, builds a `{ text, completed: false }` object, pushes it into `tasks`, saves to `localStorage`, then calls `renderTask` to display it.
- **Toggling completion** — because the click listener is defined *inside* `renderTask`, it retains access to that call's `taskObject` and `newLi` via closure. It toggles both the DOM class (`classList.toggle('completed')`) and the underlying data (`taskObject.completed = !taskObject.completed`), then re-saves `tasks` to `localStorage`.
- **Deleting a task** — removes the `<li>` from the DOM (`newLi.remove()`), then rebuilds `tasks` with `Array.prototype.filter`, keeping every task except the one being deleted (`tasks = tasks.filter(mission => mission !== taskObject)`), then re-saves to `localStorage`.

## What This Project Practices

- `document.createElement` + `appendChild` for building DOM structure entirely in JS, as an alternative to `innerHTML` (which would destroy previously attached listeners on re-render)
- Treating an array as the source of truth, with the DOM as a rendering of that data — the same mental model used by frameworks like React
- Closures: an event listener defined inside a function keeps access to that function's parameters and local variables even after the outer function has finished running
- `JSON.stringify` / `JSON.parse` for converting between JS data structures and the string format `localStorage` requires
- `Array.prototype.forEach` for iterating without manual index tracking
- `Array.prototype.filter` for removing an item by returning a new array, and the need to reassign the result back to the original variable (`tasks = tasks.filter(...)`), unlike `push`, which mutates in place

## Possible Improvements

- Add an "edit task" feature (double-click to rename)
- Add task counters (e.g. "3 of 5 completed")
- Add filter buttons (All / Active / Completed)
- Refactor further using `Array.prototype.map` when rendering, as a step toward React's rendering model
