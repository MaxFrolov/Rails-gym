'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'components/main/main.html',
        controller: 'Main',
        resolve: {
          currentUser: function($auth, CurrentUser) {
            return CurrentUser.get();
          }
        }
      })
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
      .state('app.signUpMethod', {
        url: '/sign-up-method',
        templateUrl: 'components/auth/sign-up/method/method.html'
      })
      .state('app.signUp', {
        url:'/sign-up',
        templateUrl: 'components/auth/sign-up/signUp.html',
        controller: 'SignUpCtrl'
      })
      .state('app.login', {
        url: '/login',
        templateUrl: 'components/auth/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('app.blog', {
        abstract: true,
        url:'/blog',
        templateUrl: 'components/blog/blog.html',
        controller: 'BlogCtrl'
      })
      .state('app.blog.posts', {
        url:'/posts?sort&page',
        templateUrl: 'components/blog/posts/posts.html',
        controller: 'PostsCtrl'
      })
      .state('app.blog.post', {
        url: '/post?id',
        templateUrl: 'components/blog/posts/post/post.html',
        controller: 'PostCtrl'
      })
      .state('app.profile', {
        url: '/profile',
        templateUrl: 'components/profile/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('app.nutrition', {
        abstract: true,
        url: '/nutrition',
        templateUrl: 'components/nutrition/nutrition.html'
      })
      .state('app.nutrition.healthy-food', {
        url: '/healthy-food?page',
        templateUrl: 'components/nutrition/healthy-food/healthy-food.html',
        controller: 'HealthyFoodCtrl'
      })
      .state('app.nutrition.food', {
        url: '/food?id',
        templateUrl: 'components/nutrition/healthy-food/food/food.html',
        controller: 'FoodCtrl'
      })
      .state('confirmEmail', {
        url: '/users/confirm/:token',
        onEnter: function($stateParams, $http, $state, $auth, CurrentUser) {
          $http.get('/api/confirmation', {params: {confirmation_token: $stateParams.token}})
            .then(function(response) {
              $auth.setToken(response.data.auth_token);
              CurrentUser.reload().then(function() {
               // Notification.success('Your email has been confirmed');
                $state.go('main');
              });
            })
            .catch(function(response) {
              CurrentUser.reload().then(function() {
                //Notification.error(response.data.errors);
                $state.go('main');
              })
            });
        }
      });
    $urlRouterProvider.otherwise('/');

  });
