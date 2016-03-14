'use strict';

describe('Service: IPtoGeo', function () {

  // load the service's module
  beforeEach(module('coffeeshotsApp'));

  // instantiate service
  var IPtoGeo;
  beforeEach(inject(function (_IPtoGeo_) {
    IPtoGeo = _IPtoGeo_;
  }));

  it('should do something', function () {
    expect(!!IPtoGeo).toBe(true);
  });

});
