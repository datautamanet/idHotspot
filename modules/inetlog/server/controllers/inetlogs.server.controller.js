'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  InetLog = mongoose.model('InetLog'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an inetlog
 */
exports.create = function (req, res) {
  var inetlog = new InetLog(req.body);
  inetlog.user = req.user;

  inetlog.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inetlog);
    }
  });
};

/**
 * Show the current inetlog
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var inetlog = req.inetlog ? req.inetlog.toJSON() : {};

  // Add a custom field to the InetLog, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the InetLog model.
  inetlog.isCurrentUserOwner = !!(req.user && inetlog.user && inetlog.user._id.toString() === req.user._id.toString());

  res.json(inetlog);
};

/**
 * Update an inetlog
 */
exports.update = function (req, res) {
  var inetlog = req.inetlog;

  inetlog.node = req.body.node;
  inetlog.action = req.body.action;
  inetlog.updated = Date.now();

  inetlog.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inetlog);
    }
  });
};

/**
 * Delete an inetlog
 */
exports.delete = function (req, res) {
  var inetlog = req.inetlog;

  inetlog.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inetlog);
    }
  });
};

/**
 * List of InetLogs
 */
exports.list = function (req, res) {
  InetLog.find().sort('-created').populate('user', 'displayName').populate('node', 'name').exec(function (err, inetlogs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inetlogs);
    }
  });
};

/**
 * InetLogs middleware
 */
exports.inetlogByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'InetLog is invalid'
    });
  }

  InetLog.findById(id).populate('user', 'displayName').populate('node', 'name').exec(function (err, inetlog) {
    if (err) {
      return next(err);
    } else if (!inetlog) {
      return res.status(404).send({
        message: 'No inetlog with that identifier has been found'
      });
    }
    req.inetlog = inetlog;
    next();
  });
};
