/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/v1/regions              ->  index
 * POST    /api/v1/regions              ->  create
 * GET     /api/v1/regions/:id          ->  show
 * PUT     /api/v1/regions/:id          ->  update
 * DELETE  /api/v1/regions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Region = require('./region.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Regions
export function index(req, res) {
  Region.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Region from the DB
export function show(req, res) {
  Region.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Region in the DB
export function create(req, res) {
  Region.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Region in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Region.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Region from the DB
export function destroy(req, res) {
  Region.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
