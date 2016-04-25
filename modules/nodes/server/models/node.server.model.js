'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Node Schema
 */
var NodeSchema = new Schema({
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
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  ip_address: {
    type: String,
    default: '',
    trim: true,
    required: 'IP Address cannot be blank'
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  secret: {
    type: String,
    default: '',
    trim: true,
    required: 'Secret key cannot be blank'
  }
});

mongoose.model('Node', NodeSchema);
