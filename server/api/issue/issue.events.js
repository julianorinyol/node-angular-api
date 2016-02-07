/**
 * Issue model events
 */

'use strict';

import {EventEmitter} from 'events';
var Issue = require('./issue.model');
var IssueEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
IssueEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Issue.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    IssueEvents.emit(event + ':' + doc._id, doc);
    IssueEvents.emit(event, doc);
  }
}

export default IssueEvents;
