angular.module('app').controller('PlanCtrl', function($scope, Restangular, Notification, plan) {
    $scope.ok = ok;
    $scope.user = {};
    $scope.errors = {};
    $scope.modalOptions = {
        title: 'Для записи заполните поля ниже',
        buttons: ['ok', 'cancel']
    };

    $scope.fields = [
        {
            name: 'first_name',
            label: 'Имя'
        },
        {
            name: 'last_name',
            label: 'Фамилия'
        },
        {
            name: 'email',
            label: 'Email'
        },
        {
            name: 'phone',
            label: 'Телефон',
            type: 'phone'
        }
    ];

    function ok() {
        $scope.user.plan = plan;
        Restangular.all('plans').customPOST($scope.user).then(function() {
            Notification.success('Спасибо, с вами свяжуться в ближайщее время');
            $scope.$dismiss('cancel');
        }).catch(function(responce) {
            $scope.errors = responce.data.errors;
        });
    }
});
