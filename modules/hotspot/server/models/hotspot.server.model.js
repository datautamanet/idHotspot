'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Node Schema
 */
var HotspotSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  node: {
    type: Schema.ObjectId,
    ref: 'Node'
  },
  session_time: {
    type: Number,
    default: ''
  },
  online: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Hotspot', HotspotSchema);
