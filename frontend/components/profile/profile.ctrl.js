angular.module('app').controller('ProfileCtrl', function($scope, Restangular) {
  $scope.planFields = [
    {
      day: 'Понедельник',
      body: 'Спина, Трапеция и Бицепс'
    },
    {
      day: 'Вторник',
      body: 'Плечи, Грудь и Трицепс'
    },
    {
      day: 'Среда',
      body: 'Отдых'
    },
    {
      day: 'Четверг',
      body: 'Бицепс, Пресс и спина'
    },
    {
      day: 'Пятница',
      body: 'Плечи, Ноги и Пресс'
    },
    {
      day: 'Суббота',
      body: 'Кардио'
    },
    {
      day: 'Воскресенье',
      body: 'Отдых'
    }
  ];

  $scope.successfulAvatarCropHandler = successfulAvatarCropHandler;

  function successfulAvatarCropHandler(responce) {
    var currentUser = $scope.currentUser;
    currentUser.customPUT(_.extend(currentUser, {avatar_data_uri: responce})).then(function(responce) {
      currentUser.avatar_url = responce.avatar_url
    });

    return currentUser;
  }
});
