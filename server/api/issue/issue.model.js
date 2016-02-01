'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var IssueSchema = new mongoose.Schema({
  _region: {type: Number, ref: 'Region'},
  // _creator: {type: Number, ref: 'User'},
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Issue', IssueSchema);
