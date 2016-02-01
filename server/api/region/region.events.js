/**
 * Region model events
 */

'use strict';

import {EventEmitter} from 'events';
var Region = require('./region.model');
var RegionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RegionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Region.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RegionEvents.emit(event + ':' + doc._id, doc);
    RegionEvents.emit(event, doc);
  }
}

export default RegionEvents;
