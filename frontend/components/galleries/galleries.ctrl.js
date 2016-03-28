angular.module('app').controller('GalleryCtrl', function($scope, Restangular, currentUser) {
    $scope.openPhoto = openPhoto;
    $scope.closeModal = closeModal;
    $scope.submitComment = submitComment;
    $scope.submitLike = submitLike;
    $scope.loading = true;
    $scope.currentUser = currentUser;
    $scope.comment = {};

    Restangular.all('galleries').getList().then(function(responce) {
        $scope.gallery = responce;
    }).finally(function() { $scope.loading = false; });

    function openPhoto(id) {
        Restangular.one('galleries', id).get().then(function(responce) {
            $scope.openedPhoto = responce;
            $scope.openModal = true;
            $scope.userLiked = _.some(responce.likes, {user_id: $scope.currentUser.id});
        });
    }

    function closeModal() {
        $scope.openModal = false;
        $scope.openedPhoto = {};
    }

    function submitComment() {
        $scope.comment.name = $scope.currentUser.first_name + ' ' + $scope.currentUser.last_name;
        $scope.comment.email = $scope.currentUser.email;

        Restangular.one('gallery',  $scope.openedPhoto .id).one('users', $scope.currentUser.id)
            .all('comments')
            .customPOST($scope.comment)
            .then(function(comment) {
                $scope.comment.message = undefined;
                $scope.openedPhoto.comments.push(comment);
            })
    }

    function submitLike() {
        var likes = $scope.openedPhoto.likes;

        if (!$scope.userLiked) {
            $scope.data = {
                target_id: $scope.openedPhoto.id,
                target_type: 'gallery'
            };
            Restangular.one('users', $scope.currentUser.id).all('likes').customPOST($scope.data).then(function (like) {
                $scope.userLiked = true;
                likes.push(like);
            });
        } else {
            var userLike = _.find(likes, {user_id: $scope.currentUser.id});
            $scope.removeLike = Restangular.one('users', $scope.currentUser.id).one('likes', userLike.id).remove()
                .then(function () {
                $scope.userLiked = false;
                likes.splice(likes.length - 1, 1);
            })
        }
    }
});
