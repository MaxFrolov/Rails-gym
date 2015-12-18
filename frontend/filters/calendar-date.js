angular.module('app').filter('calendarDate', function() {
  return function (date) {
    return moment(date).subtract(10, 'days').calendar();
  }
});
