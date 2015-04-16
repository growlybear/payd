payd.controller('BarChartCtrl', function ($scope, $http) {

  $scope.options = {
    chart: {
      type: 'multiBarHorizontalChart',
      height: 450,
      x: function (d) { return d.label; },
      y: function (d) { return d.value; },
      showControls: true,
      showValues: true,
      transitionDuration: 500,
      xAxis: {
        showMaxMin: false
      },
      yAxis: {
        axisLabel: 'Values',
        tickFormat: function (d) {
          return d3.format(',.2f')(d);
        }
      }
    }
  };

  // fetch aggregated data
  $http.get('js/data/spending.bar.json')
    .then(function (response) {
      $scope.data = response.data;
    }, function (err) {
      throw err;
    });

});
