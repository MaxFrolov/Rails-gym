angular.module('app').controller('BlogCtrl',function($scope, Restangular) {

 $scope.blog = {}

 Restangular.all('blogs').getList().then(function(responce) {
  console.log(responce);
 })
});