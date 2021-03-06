'use strict';

describe('Directive: reviews', function () {

  // load the directive's module
  beforeEach(module('coffeeshotsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reviews></reviews>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the reviews directive');
  }));
});
