payd.controller('MainCtrl', function ($scope, $http) {

  $http.get('js/data/categories.json')
    .then(function (response) {
      $scope.rowCollection = response.data;
    }, function (err) {
      throw err;
    });


  $scope.search = function () {
    console.log('Search');
  };

});
