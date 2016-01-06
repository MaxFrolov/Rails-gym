angular.module('app').controller('BillingInfoCtrl', function($scope, Restangular) {
  $scope.errors = {};
  $scope.billingInfo = {};
  $scope.oderProcessing = oderProcessing;

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
      name: 'company_name',
      label: 'Название компании',
      optional: true
    },
    {
      name: 'email',
      label: 'Email'
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'phone'
    },
    {
      name: 'city',
      label: 'Город'
    },
    {
      name: 'country',
      label: 'Область'
    },
    {
      name: 'address',
      label: 'Адресс'
    },
    {
      name: 'password',
      label: 'Введите пароль',
      type: 'password'
    },
    {
      name: 'password_confirmation',
      label: 'Подтвердите пароль',
      type: 'password'
    },
    {
      name: 'order_notes',
      label: 'Примечания',
      type: 'textarea',
      optional: true
    }
  ];
  $scope.productObj = {};
  function oderProcessing() {
  //  Restangular.all('order_items').customPOST({ items: [{product_id: 2, quantity: 3, unit_price: 35.5},
  //    {product_id: 3, quantity: 2, unit_price: 35.5}] }).then(function(responce) {
  //      console.log(responce);
  //    });
  //  var itemsArr = $scope.cart.map(function(elem){
  //    return {product_id: elem.product.id, quantity: elem.count, unit_price: elem.product.price}
  //  });
    for (var i in $scope.cart) {

    }
    console.log($scope.cart);
    //$http.post('/api/registration', {user: $scope.user}).then(function(responce) {
    //  $auth.setToken(responce.data.auth_token);
    //  CurrentUser.reload().then(function() {
    //    $state.go('app.blog.posts');
    //  }).catch(function(response) {
    //    $scope.errors = response.errors;
    //  });
    //});
  }
});
