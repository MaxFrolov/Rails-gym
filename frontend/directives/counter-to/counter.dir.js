angular.module('app').directive('counterTo', function($timeout) {
  function link(scope) {
    var times = scope.times;

    scope.counters = counters(times);

    function counters(times) {
      scope.counts = 0;
      for (var i = 0; i <= times; i++) {
        $timeout(function(){
          scope.counts += 1
        }, 3000);
      }
    }
  }

  return {
    restrict: 'E',
    templateUrl: 'directives/counter-to/counter.html',
    scope: {
      times: '='
    },
    link: link
  }
});
