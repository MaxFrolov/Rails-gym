angular.module('app').controller('Main', function($scope) {
  $scope.eventId = 0;
  $scope.changeState = changeState;


  $scope.fields = [
    {
      name: 'Чемпионат Европы имени В.Кравцова',
      date: '15 Июля, 2016 | 11:00 - 17:00',
      id: 0,
      activeState: true,
      trueDate: '2016-06-15T08:00:00.000Z'
    },
    {
      name: 'WRPF Чемпионат Мира',
      date: '23 Мая, 2016 | 10:00 - 18:00',
      id: 1,
      trueDate: '2016-05-23T07:00:00.000Z'
    },
    {
      name: 'Чемпионат Украины',
      date: '12 Августа, 2016 | 13:00 - 16:00',
      id: 2,
      trueDate: '2016-08-12T10:00:00.000Z'
    }
  ];

  $scope.eventDate = $scope.fields[0].trueDate;

  function changeState(id, trueDate) {
    $scope.eventDate = trueDate;
    $scope.eventId = id;
    _.each($scope.fields, function(item) {
      item.activeState = (item.id === id)
    });
  }
});
