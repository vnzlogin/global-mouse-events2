import EventEmitter from 'events';

export default new (class MouseEvents extends EventEmitter {
    constructor();
    getPaused(): boolean;
    pauseMouseEvents(): boolean;
    resumeMouseEvents(): boolean;
})()