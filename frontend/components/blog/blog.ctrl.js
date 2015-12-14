angular.module('app').controller('BlogCtrl',function($scope, Restangular, $stateParams) {

 $scope.posts = Restangular.all('blogs').getList({page: $stateParams.page, per: 5}).$object;
});
