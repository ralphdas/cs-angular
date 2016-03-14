'use strict';

describe('Controller: DialogsCtrl', function () {

  // load the controller's module
  beforeEach(module('coffeeshotsApp'));

  var DialogsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DialogsCtrl = $controller('DialogsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DialogsCtrl.awesomeThings.length).toBe(3);
  });
});
