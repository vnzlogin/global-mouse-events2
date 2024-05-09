"use strict";
const { EventEmitter } = require("events");
const addon = require("bindings")("global_mouse_events");
let paused = true;

class MouseEvents extends EventEmitter {
    constructor() {
        super();

        if (require("os").platform() !== "win32")
            return;

        let createdListener = false;
        let registeredEvents = [];

        this.on("newListener", event => {
            if (registeredEvents.indexOf(event) !== -1)
                return;

            // Enable WM_MOUSEMOVE capture if requested
            if(event === "mousemove") {
                addon.enableMouseMove();
            }

            if ((event === "mouseup" || event === "mousedown" || event === "mousemove" || event === "mousewheel") && !createdListener) {
                // Careful: this currently "leaks" a thread every time it's called.
                // We should probably get around to fixing that.
                createdListener = addon.createMouseHook((event, x, y, button, delta) => {
                    const payload = { x, y };
                    if (event === "mousewheel") {
                        payload.delta = FromInt32(delta) / 120;
                        payload.axis = button;
                    } else if(event === "mousedown" || event === "mouseup") {
                        payload.button = button;
                        const mouseData = FromInt32(delta);
                        if(mouseData) payload.button = 3 + mouseData;
                    }
                    this.emit(event, payload);
                });
                if (createdListener) {
                    this.resumeMouseEvents();
                }
            } else {
                return;
            }

            registeredEvents.push(event);
        });

        this.on("removeListener", event => {
            if (this.listenerCount(event) > 0)
                return;

            registeredEvents = registeredEvents.filter(x => x !== event);
            if (event === "mousemove") {
                addon.disableMouseMove();
            }
        });
    }

    getPaused() {
        return paused;
    }

    pauseMouseEvents() {
        if(paused) return false;
        paused = true;
        return addon.pauseMouseEvents();
    }

    resumeMouseEvents() {
        if(!paused) return false;
        paused = false;
        return addon.resumeMouseEvents();
    }
}

function FromInt32(x) {
    var uint32 = x - Math.floor(x / 4294967296) * 4294967296;
    if (uint32 >= 2147483648) {
        return (uint32 - 4294967296) / 65536
    } else {
        return uint32 / 65536;
    }
}

module.exports = new MouseEvents();