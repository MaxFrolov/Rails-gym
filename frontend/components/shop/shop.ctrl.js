angular.module('app').controller('ShopCtrl', function($scope, Restangular, $stateParams) {

  $scope.products = Restangular.all('products').getList({ page: $stateParams.page, per: 6 }).$object;
  $scope.recommendedProducts = Restangular.all('products').all('recommended_products').getList({count: 3}).$object;

  $scope.sortOptions = [
    {name: 'Новее', key: 'created_at desc'},
    {name: 'Старее', key: 'created_at asc'},
    {name: 'Цена по возрастанию', key: 'price asc'},
    {name: 'Цена по убыванию', key: 'price desc'}
  ];

  $scope.cart = localStorage['cart'] ? JSON.parse(localStorage['cart']) : {};
  $scope.priceTotal = localStorage['totalPrice'] ? localStorage['totalPrice'] : 0;
  $scope.addItem = addItem;
  $scope.setToStorage = setToStorage;
  $scope.removeItem = removeItem;
  $scope.countCartItem = countCartItem;

  function removeItem(item) {
    $scope.cart[item.product.id].count > 1 ? $scope.cart[item.product.id].count-- : delete $scope.cart[item.product.id];
    $scope.priceTotal -= item.product.price;
  }

  function setToStorage() {
    localStorage['cart'] = JSON.stringify($scope.cart);
    localStorage['totalPrice'] = $scope.priceTotal;
  }

  function countCartItem() {
    var priceTotal = 0;
    for (var i in $scope.cart) {
      if ($scope.cart[i].count < 1) {
        $scope.cart[i].count = 1;
      }
      priceTotal += $scope.cart[i].count*$scope.cart[i].product.price;
    }
    $scope.priceTotal = priceTotal;
  }

  function addItem(item, count) {
    var itemCount = count ? count : 1;
    $scope.cart[item.id] ? $scope.cart[item.id].count += itemCount : $scope.cart[item.id] = { count: itemCount, product: item };
    $scope.priceTotal += count ? count*item.price : item.price;
    $scope.addingSuccess = true;
  }
});
