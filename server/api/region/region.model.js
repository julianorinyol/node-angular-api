'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var RegionSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String
});

export default mongoose.model('Region', RegionSchema);
