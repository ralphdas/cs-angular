'use strict';

describe('Filter: timeRemaining', function () {

  // load the filter's module
  beforeEach(module('coffeeshotsApp'));

  // initialize a new instance of the filter before each test
  var timeRemaining;
  beforeEach(inject(function ($filter) {
    timeRemaining = $filter('timeRemaining');
  }));

  it('should return the input prefixed with "timeRemaining filter:"', function () {
    var text = 'angularjs';
    expect(timeRemaining(text)).toBe('timeRemaining filter: ' + text);
  });

});
