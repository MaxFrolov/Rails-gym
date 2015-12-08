angular.module('app').directive('carouselWrapper', function() {

  return {
    restrict: 'E',
    templateUrl: 'directives/carousel/carousel-wrapper.html',
    slides: '=',
    carouselInterval: '='
  }
});
