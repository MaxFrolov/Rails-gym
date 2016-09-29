angular.module('app').controller('MainCtrl', function($scope, currentUser, $auth, CurrentUser, $uibModal, $state, $window, Restangular, parallaxHelper) {
  $scope.currentUser = currentUser;
  $scope.eventId = 0;
  $scope.changeState = changeState;
  $scope.cycle = cycle;
  $scope.popularTypes = cycle(6);
  $scope.logout = logout;
  $scope.visible = $window.scrollY > 100;
  $scope.loaded = false;
  $scope.background = parallaxHelper.createAnimator(-0.3);

  $scope.recommendedPosts = Restangular.all('posts').all('recommended_posts').getList({count: 3}).$object;

  $scope.fields = [
    {
      name: 'Консультации по питанию',
      id: 0,
      activeState: true,
      trueDate: '2016-06-15T08:00:00.000Z'
    },
    {
      name: 'Личные программы',
      id: 1,
      trueDate: '2016-05-23T07:00:00.000Z'
    },
    {
      name: 'Советы и рекоммендации по тренировакам',
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

  var proposalMessages = [
    'Вы можете полуить консультацию по питанию свзявшись со мной, мы обговорим все детали и в результате вы получите письмо' +
    ' с программой по питанию на оговоренные сроки', 'Вы можете получить программу тренеровок свзявшись со мной,' +
    'мы обговорим все детали и в результате вы получите письмо с программой по тренировке на оговоренные сроки',
    'Вы можете получить консультацию по вашим тренировкам свзявшись со мной, мы обговорим все детали и в результате вы получите письмо' +
    ' с программой по питанию на оговоренные сроки'
  ];

  $scope.eventDate = $scope.fields[0].trueDate;
  $scope.proposalMessage = proposalMessages[0];

  function changeState(id) {
    $scope.proposalMessage = proposalMessages[id];
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

  function logout() {
    $auth.logout();
    CurrentUser.reload();
    Notification.success('Выход выполнен успешно');
    $state.go('app.main');
  }

  $scope.recordModal = recordModal;

  function recordModal(plan) {
    $uibModal.open({
      animation: true,
      templateUrl: 'components/main/plan-modals/plan-modal.html',
      controller: 'PlanCtrl',
      size: 'md',
      resolve: {
        plan: function() {
          return plan
        }
      }
    });
  }

  $window.onscroll = function() {
    $scope.visible = $window.scrollY > 100;
    $scope.$apply();
  };

  angular.element(document).ready(function () {
    $scope.loaded = true;
  });
});
