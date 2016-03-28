angular.module('app')
    .directive('spinner', function() {
        return {
            restrict: 'AE',
            scope: {
                text: '@',
                length: '=',
                loading: '='
            },
            controller: function($scope) {
                $scope.text = $scope.text || 'Нет элементов...';
            },
            templateUrl: 'directives/spinner/spinner.html'
        };
    });
