angular.module('app').controller('NutritionCtrl', function($scope, Restangular, $stateParams) {
    $scope.loading = true;
    $scope.food_categories = {
        set_weight: 'Набор массы',
        weight_loss: 'Потеря веса',
        diet: 'Диета',
        healthy_eating: 'Здоровое питание'
    };

    Restangular.all('foods').getList({page: $stateParams.page, per: 6}).then(function(nutrition){
        $scope.nutritions = nutrition;
    }).finally(function() { $scope.loading = false; });
});
