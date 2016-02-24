angular.module('app').directive('likes', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/likes/likes.html',
        scope: {
            targetId: '=',
            targetType: '@',
            currentUser: '=',
            resource: '='
        },
        controller: function($scope, Restangular) {
            $scope.clicked = clicked;

            function clicked() {
                $scope.data = {
                    target_id: $scope.targetId,
                    target_type: $scope.targetType
                };

                Restangular.one('users', $scope.currentUser.id).all('likes').customPOST($scope.data).then(function() {

                })
            }
        }
    }
});