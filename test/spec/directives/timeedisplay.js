'use strict';

describe('Directive: timeeDisplay', function () {

  // load the directive's module
  beforeEach(module('coffeeshotsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<timee-display></timee-display>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the timeeDisplay directive');
  }));
});
