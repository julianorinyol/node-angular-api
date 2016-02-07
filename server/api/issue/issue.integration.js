'use strict';

var app = require('../..');
import request from 'supertest';

var newIssue;

describe('Issue API:', function() {

  describe('GET /api/regions/:id/issues', function() {
    var issues;

    beforeEach(function(done) {
      request(app)
        .get('/api/regions/:id/issues')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          issues = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      issues.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/regions/:id/issues', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/regions/:id/issues')
        .send({
          name: 'New Issue',
          info: 'This is the brand new issue!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newIssue = res.body;
          done();
        });
    });

    it('should respond with the newly created issue', function() {
      newIssue.name.should.equal('New Issue');
      newIssue.info.should.equal('This is the brand new issue!!!');
    });

  });

  describe('GET /api/regions/:id/issues/:id', function() {
    var issue;

    beforeEach(function(done) {
      request(app)
        .get('/api/regions/:id/issues/' + newIssue._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          issue = res.body;
          done();
        });
    });

    afterEach(function() {
      issue = {};
    });

    it('should respond with the requested issue', function() {
      issue.name.should.equal('New Issue');
      issue.info.should.equal('This is the brand new issue!!!');
    });

  });

  describe('PUT /api/regions/:id/issues/:id', function() {
    var updatedIssue;

    beforeEach(function(done) {
      request(app)
        .put('/api/regions/:id/issues/' + newIssue._id)
        .send({
          name: 'Updated Issue',
          info: 'This is the updated issue!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedIssue = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIssue = {};
    });

    it('should respond with the updated issue', function() {
      updatedIssue.name.should.equal('Updated Issue');
      updatedIssue.info.should.equal('This is the updated issue!!!');
    });

  });

  describe('DELETE /api/regions/:id/issues/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/regions/:id/issues/' + newIssue._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when issue does not exist', function(done) {
      request(app)
        .delete('/api/regions/:id/issues/' + newIssue._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
