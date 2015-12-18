angular.module('app').controller('Main', function($scope, currentUser) {
  $scope.currentUser = currentUser;
  $scope.eventId = 0;
  $scope.changeState = changeState;
  $scope.cycle = cycle;
  $scope.popularTypes = cycle(6);

  $scope.carouselInterval = 5000;

  $scope.slides = [
    {image: '/assets/assets/first-page-images/man.png',
      text: 'Не знаю як тренажерка, а заняття з аеробіки мені дуже подобаються. Ходила в різні заклади,' +
      ' але врешті-решт зупинилась саме на цьому. Зараз вже півроку як переїхали, але все-одно ходжу "Раструсись".' +
      ' Тренер Алеся просто супер.'},
    {image: '/assets/assets/first-page-images/types/5.jpg', text: 'Хороший клуб, тренеры внимательны и профессиональны,' +
    ' но самый лучший тренер - Алеся!'}
  ];

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

  $scope.fieldCounts = [
    { counts: 255, text: 'Отзывов' },
    { counts: 130, text: 'Клиентов' },
    { counts: 100, text: 'Тренажеров' },
    { counts: 10, text: 'Тренеров' }
  ];

  $scope.eventDate = $scope.fields[0].trueDate;

  function changeState(id, trueDate) {
    $scope.eventDate = trueDate;
    $scope.eventId = id;
    _.each($scope.fields, function(item) {
      item.activeState = (item.id === id)
    });
  }

  function cycle(n) {
    $scope.varible = [];

    for (var i = 1; i <= n; i++) {
      $scope.varible.push(i);
    }
    return $scope.varible
  }

});
