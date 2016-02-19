angular.module('app').controller('OrderReviewCtrl', function($scope, Restangular, $stateParams) {
    Restangular.one('orders', $stateParams.id).get().then(function(responce) {
        $scope.order = responce;
    })
});
