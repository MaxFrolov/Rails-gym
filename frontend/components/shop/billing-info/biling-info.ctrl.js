angular.module('app').controller('BillingInfoCtrl', function($scope, Restangular, $auth, CurrentUser) {
  $scope.errors = {};
  $scope.billingInfo = {};
  $scope.loginObj = {};
  $scope.loginProcessing = loginProcessing;
  $scope.oderProcessing = oderProcessing;

  $scope.loginFields = [
    {
      name: 'email',
      label: 'Email',
      inline: true
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      inline: true
    }
  ];

  $scope.fields = [
    {
      name: 'first_name',
      label: 'Имя',
      inline: true
    },
    {
      name: 'last_name',
      label: 'Фамилия',
      inline: true
    },
    {
      name: 'company_name',
      label: 'Название компании',
      optional: true,
      clear: true
    },
    {
      name: 'email',
      label: 'Email',
      inline: true
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'phone',
      inline: true
    },
    {
      name: 'city',
      label: 'Город',
      clear: true
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

  function loginProcessing() {

    $auth.login({ user: $scope.loginFields })
      .then(loginSuccessCallback)
      .catch(loginErrorCallback);


    function loginSuccessCallback() {
      $scope.errors = {};
      CurrentUser.reload().then(function () {
        Notification.success('Вход выполнен успешно.');
      });
    }

    function loginErrorCallback(response) {
      _.each(response.data.errors, function(message) {
        Notification.error(message)
      });
    }
  }

  $scope.productObj = {};
  $scope.orderItems = { items:[] };

  function oderProcessing() {
    for (var i in $scope.cart) {
      var items = $scope.cart;
      $scope.orderItems.items.push({
        product_id: items[i].product.id,
        quantity: items[i].count,
        unit_price: items[i].product.price
      });
    }
    Restangular.all('order_items').customPOST($scope.orderItems).then(function(responce) {
        console.log(responce);
      });

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
