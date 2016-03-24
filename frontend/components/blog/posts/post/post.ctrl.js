angular.module('app').controller('PostCtrl', function($scope, Restangular, Notification, $stateParams) {
  Restangular.one('posts', $stateParams.id).get().then(function(responce) {
    $scope.currentPost = responce;
    var currentPost = $scope.currentPost;

    if (currentPost.type === 'Video') {
      var videoTypes = {
        youtube: 'https://www.youtube.com/embed/' + currentPost.video_id + '?autoplay=1',
        vimeo: 'https://player.vimeo.com/video/' + currentPost.video_id + '?autoplay=1'
      };

      $scope.link = videoTypes[currentPost.service]
    }
  });
});

