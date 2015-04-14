payd.controller('MainCtrl', function ($scope, $http, $timeout) {

  $scope.chart = [8, 4, 2];

  $timeout(function () {
    $http.get('js/data/data.json')
      .then(function (response) {
        $scope.chart = response.data;
      }, function (err) {
        throw err;
      });
  }, 2000);

});
