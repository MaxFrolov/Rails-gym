angular.module('app').controller('BlogCtrl',function($scope, Restangular, $stateParams) {
 $scope.formatDate = formatDate;

 function formatDate(date) {
  return moment(date).subtract(10, 'days').calendar()
 }

 $scope.posts = Restangular.all('posts').getList({page: $stateParams.page, per: 5}).$object;
});
