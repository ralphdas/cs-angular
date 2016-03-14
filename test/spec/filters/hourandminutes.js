'use strict';

describe('Filter: hourAndMinutes', function () {

  // load the filter's module
  beforeEach(module('coffeeshotsApp'));

  // initialize a new instance of the filter before each test
  var hourAndMinutes;
  beforeEach(inject(function ($filter) {
    hourAndMinutes = $filter('hourAndMinutes');
  }));

  it('should return the input prefixed with "hourAndMinutes filter:"', function () {
    var text = 'angularjs';
    expect(hourAndMinutes(text)).toBe('hourAndMinutes filter: ' + text);
  });

});
