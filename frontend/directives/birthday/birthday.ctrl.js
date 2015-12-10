'use strict';

angular.module('app').directive('birthday', function() {

  function link (scope) {
    scope.dayChoices = dayChoices();
    scope.yearChoices = yearChoices();
    scope.formattingDate = formattingDate;
    scope.dateModel = {};

    function dayChoices() {
      scope.days = [];

      for (var i = 1; i <= 31; i++) {
        scope.days.push({label: i < 10 ? '0' + i : i, value: i, name: 'day'});
      }
    }

    scope.months = [
      {label: 'Январь', value: 0},
      {label: 'Февраль', value: 1},
      {label: 'Март', value: 2},
      {label: 'Апрель', value: 3},
      {label: 'Май', value: 4},
      {label: 'Июнь', value: 5},
      {label: 'Июль', value: 6},
      {label: 'Август', value: 7},
      {label: 'Сентябрь', value: 8},
      {label: 'Октябрь', value: 9},
      {label: 'Ноябрь', value: 10},
      {label: 'Декабрь', value: 11}
    ];

    function yearChoices() {
      scope.years = [];
      var thisYear = new Date().getFullYear(),
        yearsLength = thisYear - 1905;
      for (var i = 0; i <= yearsLength; i++) {
        scope.years.push({label: thisYear - i, value: thisYear - i, name: 'year'})
      }
    }

    function formattingDate($item, $model) {
        if (scope.dateModel.day && _.isNumber(scope.dateModel.month) && scope.dateModel.year) {
          scope.date = moment(scope.date).set({
            'date': scope.dateModel.day,
            'month': scope.dateModel.month,
            'year': scope.dateModel.year
          });
        }
    }

    if (scope.date !== undefined) {
      scope.date = new Date(scope.date);
      scope.dateModel.day = scope.date.getDate();
      scope.dateModel.month = scope.date.getMonth();
      scope.dateModel.year = scope.date.getFullYear();
    }
  }

  return {
    restrict: 'E',
    templateUrl: 'directives/birthday/birthday.html',
    link: link,
    require: 'ngModel',
    scope: {
      date: '=ngModel',
      field: '='
    }
  }
});
