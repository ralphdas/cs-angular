'use strict';

describe('Directive: distanceDisplay', function () {

  // load the directive's module
  beforeEach(module('coffeeshotsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<distance-display></distance-display>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the distanceDisplay directive');
  }));
});
