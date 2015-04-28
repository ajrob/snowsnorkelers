angular.module('MainApp')
  .directive('scrollToPinned', function () {
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function (scope, iElm, iAttrs) {
        console.log("loading directive");
        iElm.bind('scroll', function () {
          console.log("scrollTop: " + this.scrollTop);
          if (this.scrollTop > 90) {
            iElm.addClass('fix-event');
          } else {
            iElm.removeClass('fix-event');
          }
        });
      }
    };
  });