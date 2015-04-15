payd.controller('MainCtrl', function ($scope, $http) {

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

  $scope.rowCollection = [
    {
      "id": 0.7134309548418969,
      "date": "19-06-2014 16:12:00",
      "description": "Nihil in ipsa voluptas et.",
      "category": "Memberships",
      "tags": [
        "fitness"
      ],
      "amount": 1043,
      "fromUser": "Michael Allan",
      "toUser": "Ms. Sylvester Muller",
      "merchant": 9468
    },
    {
      "id": 0.87143271160312,
      "date": "06-06-2014 12:52:07",
      "description": "Eos consequatur omnis ut quo asperiores.",
      "category": "Car Loan",
      "tags": [
        "leisure"
      ],
      "amount": 110,
      "fromUser": "Michael Allan",
      "toUser": "Mrs. Fatima Reynolds",
      "merchant": 9574
    },
    {
      "id": 0.8941083771642298,
      "date": "17-07-2014 20:51:59",
      "description": "Harum nihil et modi omnis ea voluptas.",
      "category": "Mortgage",
      "tags": [
        "house"
      ],
      "amount": 369,
      "fromUser": "Michael Allan",
      "toUser": "Mr. Alan Farrell",
      "merchant": 1215
    },
    {
      "id": 0.5599625192116946,
      "date": "02-01-2015 20:58:32",
      "description": "Assumenda natus est repellendus accusamus maxime.",
      "category": "Utilities",
      "tags": [
        "coles"
      ],
      "amount": 343,
      "fromUser": "Michael Allan",
      "toUser": "Ms. Ethyl Schroeder",
      "merchant": 783
    },
    {
      "id": 0.3339457637630403,
      "date": "06-02-2015 06:20:08",
      "description": "Explicabo quae nihil distinctio nostrum consequatur ex aspernatur eum.",
      "category": "Utilities",
      "tags": [
        "coles"
      ],
      "amount": 15,
      "fromUser": "Michael Allan",
      "toUser": "Miss Dwight Stehr",
      "merchant": 3520
    },
    {
      "id": 0.5119310657028109,
      "date": "08-02-2015 20:45:29",
      "description": "Perspiciatis id omnis aspernatur et consequuntur sint ea voluptatem.",
      "category": "Super",
      "tags": [
        "retirement"
      ],
      "amount": 410,
      "fromUser": "Michael Allan",
      "toUser": "Dr. Herman Halvorson",
      "merchant": 5590
    },
    {
      "id": 0.4999146503396332,
      "date": "06-05-2014 20:35:01",
      "description": "Dolorem occaecati aut.",
      "category": "Utilities",
      "tags": [
        "coles"
      ],
      "amount": 129,
      "fromUser": "Michael Allan",
      "toUser": "Miss Joy Beahan",
      "merchant": 2742
    }
  ];

  $scope.data = [];

  // fetch aggregated data
  $http.get('js/data/spendingByCategory.json')
    .then(function (response) {
      $scope.data = response.data;
    }, function (err) {
      throw err;
    });

});
