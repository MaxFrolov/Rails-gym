'use strict';

/**
 * Config for the chart.js
 */
angular.module('app')
    .config(function(ChartJsProvider) {
        ChartJsProvider.setOptions({
            colours: ["#2C8F7B", "#DCDCDC", "#F7464A", "#97BBCD", "#FDB45C", "#949FB1", "#4D5360"],
            responsive: true
        });
    });
