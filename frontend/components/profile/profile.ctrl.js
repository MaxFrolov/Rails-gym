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
    $scope.currentUser.avatar.avatar.url = responce;
    var entity = $scope.currentUser;
    entity.fromServer = true;
    entity.save().then(function(responce) {
      entity.avatar.avatar.url = responce.avatar.avatar.url;
    });
    return entity;
  }
});
