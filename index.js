var Emitter = require('component-emitter');

var SCEmitter = function () {
  Emitter.call(this);
};

SCEmitter.prototype = Object.create(Emitter.prototype);

SCEmitter.prototype.emit = function (event) {
  if (event == 'error' && this.domain) {
     // Emit the error on the domain if it has one.
    // See https://github.com/joyent/node/blob/ef4344311e19a4f73c031508252b21712b22fe8a/lib/events.js#L78-85
    
    var err = arguments[1];
    
    if (!err) {
      err = new Error('Uncaught, unspecified "error" event.');
    }
    err.domainEmitter = this;
    err.domain = this.domain;
    err.domainThrown = false;
    this.domain.emit('error', err);
  }
  Emitter.prototype.emit.apply(this, arguments);
};

module.exports.SCEmitter = SCEmitter;
