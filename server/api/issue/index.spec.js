'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var issueCtrlStub = {
  index: 'issueCtrl.index',
  show: 'issueCtrl.show',
  create: 'issueCtrl.create',
  update: 'issueCtrl.update',
  destroy: 'issueCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var issueIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './issue.controller': issueCtrlStub
});

describe('Issue API Router:', function() {

  it('should return an express router instance', function() {
    issueIndex.should.equal(routerStub);
  });

  describe('GET /api/regions/:id/issues', function() {

    it('should route to issue.controller.index', function() {
      routerStub.get
        .withArgs('/', 'issueCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/regions/:id/issues/:id', function() {

    it('should route to issue.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'issueCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/regions/:id/issues', function() {

    it('should route to issue.controller.create', function() {
      routerStub.post
        .withArgs('/', 'issueCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/regions/:id/issues/:id', function() {

    it('should route to issue.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'issueCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/regions/:id/issues/:id', function() {

    it('should route to issue.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'issueCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/regions/:id/issues/:id', function() {

    it('should route to issue.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'issueCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
