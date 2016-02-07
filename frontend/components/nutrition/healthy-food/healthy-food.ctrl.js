angular.module('app').controller('HealthyFoodCtrl', function($scope, Restangular, $stateParams) {
 $scope.food_categories = {
     set_weight: 'Набор массы',
     weight_loss: 'Потеря веса',
     diet: 'Диета',
     healthy_eating: 'Здоровое питание'
 }
});
