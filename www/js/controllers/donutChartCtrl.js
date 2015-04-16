payd.controller('DonutChartCtrl', function ($scope, $http) {

  $scope.options = {
    chart: {
      type: 'pieChart',
      height: 450,
      donut: true,
      x: function (d) { return d.key; },
      y: function (d) { return d.y; },
      showLabels: true,
      pie: {
        startAngle: function (d) { return d.startAngle - Math.PI / 2 },
        endAngle: function (d) { return d.endAngle - Math.PI / 2 }
      },
      transitionDuration: 500,
      legend: {
        margin: {
          top: 5,
          right: 140,
          bottom: 5,
          left: 0
        }
      }
    }
  };

  // fetch aggregated data
  $http.get('js/data/spendingByCategoryDonut.json')
    .then(function (response) {
      $scope.data = response.data;
    }, function (err) {
      throw err;
    });
});
