angular.module('app').controller('PostCtrl', function($scope, Restangular, Notification, $stateParams, $sce) {
  Restangular.one('posts', $stateParams.id).get().then(function(response) {
    $scope.currentPost = response;
    $scope.userLiked = _.some(response.likes, {user_id: $scope.currentUser.id});
    var currentPost = $scope.currentPost;

    if (currentPost.type === 'Video') {
      var videoTypes = {
        youtube: 'https://www.youtube.com/embed/' + currentPost.video_id + '?autoplay=1',
        vimeo: 'https://player.vimeo.com/video/' + currentPost.video_id + '?autoplay=1'
      };

      $scope.link = videoTypes[currentPost.service]
    }
  });

  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };
});

