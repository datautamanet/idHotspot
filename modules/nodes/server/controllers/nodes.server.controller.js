'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Node = mongoose.model('Node'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an node
 */
exports.create = function (req, res) {
  var node = new Node(req.body);
  node.user = req.user;

  node.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(node);
    }
  });
};

/**
 * Show the current node
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var node = req.node ? req.node.toJSON() : {};

  // Add a custom field to the Node, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Node model.
  node.isCurrentUserOwner = !!(req.user && node.user && node.user._id.toString() === req.user._id.toString());

  res.json(node);
};

/**
 * Update an node
 */
exports.update = function (req, res) {
  var node = req.node;

  node.title = req.body.title;
  node.content = req.body.content;

  node.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(node);
    }
  });
};

/**
 * Delete an node
 */
exports.delete = function (req, res) {
  var node = req.node;

  node.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(node);
    }
  });
};

/**
 * List of Nodes
 */
exports.list = function (req, res) {
  Node.find().sort('-created').populate('user', 'displayName').populate('owner', 'displayName').exec(function (err, nodes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(nodes);
    }
  });
};

/**
 * Node middleware
 */
exports.nodeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Node is invalid'
    });
  }

  Node.findById(id).populate('user', 'displayName').populate('owner', 'displayName').exec(function (err, node) {
    if (err) {
      return next(err);
    } else if (!node) {
      return res.status(404).send({
        message: 'No node with that identifier has been found'
      });
    }
    req.node = node;
    next();
  });
};
