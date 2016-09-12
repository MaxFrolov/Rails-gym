'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('app', {
        abstract: true,
        controller: 'AppCtrl',
        templateUrl: 'components/app/app.html',
        resolve: {
          currentUser: function($auth, CurrentUser) {
            return CurrentUser.get();
          }
        }
      })
      .state('app.main', {
        url: '/',
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl'
      })
      .state('app.inner-layout', {
        abstract: true,
        templateUrl: 'components/inner-layout/inner-layout.html'
      })
      .state('app.inner-layout.signUpMethod', {
        url: '/sign-up-method',
        templateUrl: 'components/auth/sign-up/method/method.html'
      })
      .state('app.inner-layout.signUp', {
        url: '/sign-up',
        templateUrl: 'components/auth/sign-up/signUp.html',
        controller: 'SignUpCtrl'
      })
      .state('app.inner-layout.login', {
        url: '/login',
        templateUrl: 'components/auth/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('app.inner-layout.blog', {
        abstract: true,
        url: '/blog',
        templateUrl: 'components/blog/blog.html',
        controller: 'BlogCtrl'
      })
      .state('app.inner-layout.blog.posts', {
        url: '/posts?category_id&page&per',
        templateUrl: 'components/blog/posts/posts.html',
        controller: 'PostsCtrl'
      })
      .state('app.inner-layout.blog.post', {
        url: '/post?id',
        templateUrl: 'components/blog/posts/post/post.html',
        controller: 'PostCtrl'
      })
      .state('app.inner-layout.nutrition', {
        url: '/nutrition?category_id&per&page',
        templateUrl: 'components/nutrition/nutrition.html',
        controller: 'NutritionCtrl'
      })
      .state('app.inner-layout.food', {
        url: '/nutrition/food?id',
        templateUrl: 'components/nutrition/food/food.html',
        controller: 'FoodCtrl'
      })
      .state('app.inner-layout.shop', {
        abstract: true,
        url: '/shop',
        templateUrl: 'components/shop/shop.html',
        controller: 'ShopCtrl'
      })
      .state('app.inner-layout.shop.products', {
        url: '/products?page',
        templateUrl: 'components/shop/products/products.html',
        controller: 'ProductsCtrl'
      })
      .state('app.inner-layout.shop.product', {
        url: '/product?id',
        templateUrl: 'components/shop/products/product/product.html',
        controller: 'ProductCtrl'
      })
      .state('app.inner-layout.shop.cart', {
        url: '/cart',
        templateUrl: 'components/shop/cart/cart.html',
        controller: 'CartCtrl'
      })
      .state('app.inner-layout.shop.order', {
        url: '/order',
        templateUrl: 'components/shop/billing-info/billing-info.html',
        controller: 'BillingInfoCtrl'
      })
      .state('app.inner-layout.shop.order-review', {
        url: '/order-review?id',
        templateUrl: 'components/shop/order-review/order-review.html',
        controller: 'OrderReviewCtrl'
      })
      .state('app.inner-layout.gallery', {
        url: '/gallery',
        templateUrl: 'components/galleries/galleries.html',
        controller: 'GalleryCtrl'
      })
      .state('app.inner-layout.workouts', {
        url: '/workouts?category_id&level&per&page',
        templateUrl: 'components/workouts/workouts.html',
        controller: 'WorkoutsCtrl'
      })
      .state('app.inner-layout.exercises', {
        url: '/workouts/exercises?id',
        templateUrl: 'components/workouts/exercises/exercises.html',
        controller: 'ExercisesCtrl'
      })
      .state('app.inner-layout.exercise', {
        url: '/workouts/exercises/exercise?id',
        templateUrl: 'components/workouts/exercise/exercise.html',
        controller: 'ExerciseCtrl'
      })
      .state('app.profile', {
        abstract: true,
        url: '/profile',
        templateUrl: 'components/profile/profile.html',
        controller: 'ProfileCtrl',
        data: {
          permissions: {
            only: ['member', 'admin'],
            redirectTo: 'app.main'
          }
        }
      })
      .state('app.profile.home', {
        url: '/home',
        templateUrl: 'components/profile/home/home.html',
        controller: 'ProfileHomeCtrl'
      })
      .state('app.profile.account-settings', {
        url: '/account-settings',
        templateUrl: 'components/profile/account-settings/account-settings.html',
        controller: 'ProfileSettingsCtrl'
      })
      .state('app.profile.training-process', {
        url: '/training-process',
        templateUrl: 'components/profile/training-process/training-process.html',
        controller: 'ProfileTrainingCtrl'
      })
      .state('app.profile.diary', {
        url: '/diary',
        templateUrl: 'components/profile/diary/diary.html',
        controller: 'DiaryCtrl'
      })

      .state('confirmEmail', {
        url: '/users/confirm/:token',
        onEnter: function ($stateParams, $http, $state, $auth, CurrentUser) {
          $http.get('/api/confirmation', {params: {confirmation_token: $stateParams.token}})
            .then(function (response) {
              $auth.setToken(response.data.auth_token);
              CurrentUser.reload().then(function () {
               // Notification.success('Your email has been confirmed');
                $state.go('main');
              });
            })
            .catch(function () {
              CurrentUser.reload().then(function () {
                //Notification.error(response.data.errors);
                $state.go('main');
              });
            });
        }
      });

    $urlRouterProvider.otherwise('/');
  });
