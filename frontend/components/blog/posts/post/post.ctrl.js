angular.module('app').controller('PostCtrl', function($scope, Restangular, Notification, $stateParams) {
  Restangular.one('posts', $stateParams.id).get().then(function(responce) {
    $scope.currentPost = responce;
  });
});

