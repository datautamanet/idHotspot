'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Hotspot = mongoose.model('Hotspot'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a hotspot session
 */
exports.create = function (req, res) {
  var hotspot = new Hotspot(req.body);
  hotspot.user = req.user;

  hotspot.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(hotspot);
    }
  });
};

/**
 * Show the current hotspot session
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var hotspot = req.hotspot ? req.hotspot.toJSON() : {};

  // Add a custom field to the Hotspot, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Hotspot model.
  hotspot.isCurrentUserOwner = !!(req.user && hotspot.user && hotspot.user._id.toString() === req.user._id.toString());

  res.json(hotspot);
};

/**
 * Update a hotspot session
 */
exports.update = function (req, res) {
  var hotspot = req.hotspot;

  hotspot.online = req.body.online;

  hotspot.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(hotspot);
    }
  });
};

/**
 * Delete a hotspot session
 */
exports.delete = function (req, res) {
  var hotspot = req.hotspot;

  hotspot.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(hotspot);
    }
  });
};

/**
 * List of Hotspot Sessions
 */
exports.list = function (req, res) {
  Hotspot.find().sort('-created').populate('user', 'displayName').populate('node', 'name').exec(function (err, hotspots) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(hotspots);
    }
  });
};

/**
 * Hotspot session middleware
 */
exports.hotspotByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  Hotspot.findById(id).populate('user', 'displayName').populate('node', 'name').exec(function (err, hotspot) {
    if (err) {
      return next(err);
    } else if (!hotspot) {
      return res.status(404).send({
        message: 'No hotspot session with that identifier has been found'
      });
    }
    req.hotspot = hotspot;
    next();
  });
};

exports.hotspotByUserID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Hotspot Session is invalid'
    });
  }

  Hotspot.find({ user: id })
      .populate('user', 'displayName')
      .populate('node', 'name')
      .exec(function (err, hotspots) {
        if (err) {
          return next(err);
        } else if (!hotspots) {
          return res.status(404).send({
            message: 'No hotspot session record with that identifier has been found'
          });
        }
        req.hotspots = hotspots;
        next();
      });
};

exports.listByUser = function (req, res) {
  res.json(req.hotspots);
};
