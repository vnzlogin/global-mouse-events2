# global-mouse-events 2

Global mouse events listener for Node.js (Windows only). Based off of [sentialx/mouse-hooks](https://github.com/sentialx/mouse-hooks) and [coldKey1/mouse-hooks](https://github.com/coldKey1/mouse-hooks).

## Installation

```cmd
npm i global-mouse-events2
```

## Usage
Import the module and register for the mouse events you'd like to listen to.

### Available event listeners

**`mouseup`** / **`mousedown`** — *Fires when a mouse button is pressed / released.*\
Returns:
- **x:** The X position of the mouse, relative to the top left of the primary display.
- **y:** The Y position of the mouse, relative to the top left of the primary display.
- **button:** Which button was pressed. 1 is left-click. 2 is right-click. 3 is middle-click. 4 and 5 are side buttons ("XBUTTON1" and "XBUTTON2").

**`mousemove`** — *Fires when the mouse cursor is moved.*\
Returns:
- **x:** The X position of the mouse, relative to the top left of the primary display.
- **y:** The Y position of the mouse, relative to the top left of the primary display.

**`mousewheel`** — *Fires when the mouse wheel is scrolled. Some trackpads may not fire this event unless "Scroll inactive windows when I hover over them" is disabled in the Windows settings.*\
Returns:
- **x:** The X position of the mouse, relative to the top left of the primary display.
- **y:** The Y position of the mouse, relative to the top left of the primary display.
- **delta:** How much the mouse wheel was scrolled. Positive numbers are considered "up" and negative numbers are "down".
- **axis:** Whether the scroll was vertical or horizontal. 0 is vertical. 1 is horizontal.

### Example

```js
const mouseEvents = require("global-mouse-events2");

mouseEvents.on("mouseup", event => {
  console.log(event); // { x: 2962, y: 483, button: 1 }
});

mouseEvents.on("mousedown", event => {
  console.log(event); // { x: 2962, y: 483, button: 1 }
});

mouseEvents.on("mousemove", event => {
  console.log(event); // { x: 2962, y: 482 }
});

mouseEvents.on("mousewheel", event => {
  console.log(event); // { x: 2962, y: 483, delta: -1, axis: 0 }
});
```

### Available functions

- **`pauseMouseEvents`** — *Pauses all mouse events.*
- **`resumeMouseEvents`** — *Resumes all mouse events.*
- **`getPaused`** — *Returns the paused state as a boolean.*
