angular.module('app').controller('ProfileCtrl', function($scope) {
  $scope.sidebarXs = false
  $scope.sidebarMobile = false
  $scope.navbarMobile = false
  $scope.toggleSidebar = toggleSidebar
  $scope.toggleMobileSidebar = toggleMobileSidebar
  $scope.toggleMobileNavbar = toggleMobileNavbar

  $scope.$on('create', function (event, chart) {
    if (chart.id === 'chart-0') $scope.lineChartInstance = chart
    if (chart.id === 'chart-1') $scope.PieChartInstance = chart
  });

  function toggleMobileNavbar() {
    $scope.navbarMobile = !$scope.navbarMobile
  }

  function toggleMobileSidebar() {
    $scope.sidebarMobile = !$scope.sidebarMobile
  }

  function toggleSidebar() {
    var charts = ['lineChartInstance', 'PieChartInstance']
    $scope.sidebarXs = !$scope.sidebarXs
    setTimeout(function() {
      charts.map(function (chart) {
        $scope[chart].resize()
        $scope[chart].reflow()
        $scope[chart].render()
      })
    }, 100)
  }

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

  $scope.series = ['Жим лежа'];
  $scope.isopen = false;

});
