const EventEmitter = require("events");

class Task {
  constructor(runnable) {
    this.runnable = runnable;
  }

  run() {
    return this.runnable();
  }
}

class TaskExecutor extends EventEmitter {
  constructor(options) {
    super();
    this.queue = [];
    this.concurrent = 0;
    this.maxConcurrent = options.maxConcurrent || 5;

    this.on("release", this._release);
  }

  _release() {
    this.concurrent = this.concurrent - 1;
    const task = this.queue.shift();
    if (task) {
      this._executeTask(task);
    }
  }

  _executeTask(task) {
    task
      .run()
      .then(() => {
        this.emit("release");
      })
      .catch(() => {
        this.emit("release");
      });
  }

  submit(runnable) {
    if (this.concurrent < this.maxConcurrent) {
      this.concurrent = this.concurrent + 1;
      this._executeTask(new Task(runnable));
    } else {
      this.queue.push(new Task(runnable));
    }
  }
}

module.exports = TaskExecutor;
