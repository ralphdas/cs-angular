'use strict';

describe('Directive: shooterList', function () {

  // load the directive's module
  beforeEach(module('coffeeshotsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<shooter-list></shooter-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the shooterList directive');
  }));
});
