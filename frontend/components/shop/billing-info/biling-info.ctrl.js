angular.module('app').controller('BillingInfoCtrl', function($scope, Restangular, $auth, Notification, CurrentUser) {
  $scope.errors = {};

  $scope.loginObj = {};
  $scope.loginProcessing = loginProcessing;
  $scope.oderProcessing = oderProcessing;
  $scope.condition = false;

  var user = $scope.currentUser;

  $scope.billingInfo = user.exists() ?
  {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    birthday: user.birthday,
    phone: user.phone
  } : {};

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

  var password = {
        name: 'password',
        label: 'Введите пароль',
        type: 'password',
        condition: function() {
          return $scope.condition
        }
      },
      passwordConfirm = {
        name: 'password_confirmation',
        label: 'Подтвердите пароль',
        type: 'password',
        condition: function() {
          return $scope.condition
        }
      };

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
      name: 'register',
      label: 'Хотите создать аккаунт?',
      type: 'checkbox',
      onChange: function() {
        $scope.condition = !$scope.condition;
      },
      optional: true,
      condition: function() {
        return !user.exists()
      }
    },
    password,
    passwordConfirm,
    {
      name: 'order_notes',
      label: 'Примечания',
      type: 'textarea',
      optional: true
    }
  ];

  function loginProcessing() {

    $auth.login({ user: $scope.loginObj })
      .then(loginSuccessCallback)
      .catch(loginErrorCallback);


    function loginSuccessCallback() {
      $scope.errors = {};
      CurrentUser.reload().then(function () {
        Notification.success('Вход выполнен успешно.');
        $scope.loginObj.name = '';
        $scope.loginObj.email = '';
      });
    }

    function loginErrorCallback(response) {
      _.each(response.data.errors, function(message) {
        Notification.error(message)
      });
    }
  }

  $scope.orderItems = [];

  function oderProcessing() {
    for (var i in $scope.cart) {
      var items = $scope.cart;
      $scope.orderItems.push({
        product_id: items[i].product.id,
        quantity: items[i].count,
        unit_price: items[i].product.price
      });
    }
    $scope.order = {
      total: Math.round($scope.priceTotal * 100) / 100,
      payment_type: $scope.billingInfo.payment
    };
    $scope.order.ordered_user_attributes = _.pick($scope.billingInfo, 'first_name', 'last_name', 'company_name', 'email',
        'phone', 'city', 'country', 'address', 'order_notes');
    $scope.order.order_items_attributes = $scope.orderItems;

    if ($scope.billingInfo.register) {
      $http.post('/api/registration', {user: $scope.user}).then(function(responce) {
        $auth.setToken(responce.data.auth_token);
        CurrentUser.reload().then(function(user) {
          $scope.order.ordered_user_attributes.user_id = user.id;
          Restangular.all('orders').customPOST($scope.order).then(function() {
            Notification.success('Ваш заказ успешно оформлен.')
          });
        }).catch(function(response) {
          $scope.errors = response.errors;
        });
      });
    } else {
      Restangular.all('orders').customPOST($scope.order).then(function() {
        Notification.success('Ваш заказ успешно оформлен.')
      });
    }
  }
});
