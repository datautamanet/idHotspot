'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Inetlog Schema
 */
var InetLogSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  node: {
    type: Schema.ObjectId,
    ref: 'Node'
  }
});

mongoose.model('InetLog', InetLogSchema);
