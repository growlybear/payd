payd.controller('MainCtrl', function ($scope, $http) {

  $http.get('js/data/categories.json')
    .then(function (response) {
      $scope.rowCollection = response.data;
    }, function (err) {
      throw err;
    });


  // Search terms init
  $scope.searchTerms = '';


  // Dummy Serach Results
  $scope.searchResults = [
    {
      "id": 0.35290041542612016,
      "date": "4 Aug",
      "description": "Rerum quis sed reprehenderit et quia doloremque.",
      "category": "Car Loan",
      "tags": [
        "leisure"
      ],
      "amount": 580,
      "fromUser": "Michael Allan",
      "toUser": "Miss Wilburn Armstrong",
      "merchant": 8045
    },
    {
      "id": 0.5906417586375028,
      "date": "4 Feb",
      "description": "Culpa tempore incidunt error vero vel esse autem possimus.",
      "category": "Memberships",
      "tags": [
        "fitness"
      ],
      "amount": 11,
      "fromUser": "Michael Allan",
      "toUser": "Mrs. Maynard Green",
      "merchant": 747
    },
  ];

  $scope.search = function () {
    console.log(this.searchTerms);
  };

});
