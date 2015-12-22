angular.module('app').controller('CropCtrl', function($scope, $uibModalInstance, img) {
  $scope.realsize = img;
  $scope.cropped = '';

  $scope.modalOptions = {
    title: 'выберите изображение',
    buttons: ['ok', 'cancel']
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.cropped);
  };
});
