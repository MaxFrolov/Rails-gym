'use strict';

angular.module('app')
  .directive('uploadButton', function($uibModal, Notification) {
    return {
      restrict: 'E',
      scope: {
        onSuccess: '&'
      },
      templateUrl: 'directives/upload-button/upload-button.html',
      controller: function ($scope) {

        $scope.handleFileSelect = handleFileSelect;

        function openPopup (img) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'directives/upload-button/modal/crop.html',
            controller: 'CropCtrl',
            size: 'lg',
            resolve: {
              img: function () {
                return img;
              }
            }
          });

          modalInstance.result.then(function (img) {
            $scope.onSuccess({responce: img})
          });
        }

        function handleFileSelect (evt) {
          var file = evt.currentTarget.files[0];
          var reader = new FileReader();
          var input = this;

          // Only process image files.
          if (!file.type.match('image.*')) {
            Notification.error('You have chosen to upload a file that is probably not an image.');
          } else {
            reader.readAsDataURL(file);
            reader.onload = function (evt) {
              // empty input value to allow selecting the same file again
              input.value = '';
              openPopup(evt.target.result);
            };
          }
        }
      },
      link: function (scope, element) {
        var fileInput = angular.element(element[0].querySelector('.hidden-uploader'));
        fileInput.on('change', scope.handleFileSelect);
      }
    }
  });

