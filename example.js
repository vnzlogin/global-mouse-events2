const mouseEvents = require("./index");

mouseEvents.on("mouseup", data => {
  console.log(data);
});

mouseEvents.on("mousemove", data => {
  console.log(data);
});

mouseEvents.on("mousedown", data => {
  console.log(data);
});

mouseEvents.on("mousewheel", data => {
  console.log(data);
});

setInterval(() => {
  if (!mouseEvents.getPaused()) {
    console.error("Still listening...");
  }
}, 5000);

process.on("SIGBREAK", () => {
  if (mouseEvents.getPaused()) {
    console.error("resuming mouse events");
    mouseEvents.resumeMouseEvents();
  } else {
    console.error("pausing mouse events");
    mouseEvents.pauseMouseEvents();
  }
});

console.error("Press Ctrl+Break to toggle listening");
