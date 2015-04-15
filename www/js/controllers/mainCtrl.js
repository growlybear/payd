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
    {
      "id": 0.8558528271969408,
      "date": "25 Nov",
      "description": "Modi hic magnam error illo nihil optio.",
      "category": "Super",
      "tags": [
        "retirement"
      ],
      "amount": 221,
      "fromUser": "Michael Allan",
      "toUser": "Ms. Dena Feeney",
      "merchant": 5451
    },
    {
      "id": 0.6925650325138122,
      "date": "3 Jun",
      "description": "Voluptate quasi corporis sunt.",
      "category": "Memberships",
      "tags": [
        "fitness"
      ],
      "amount": 407,
      "fromUser": "Michael Allan",
      "toUser": "Miss Israel Bradtke",
      "merchant": 984
    },
    {
      "id": 0.17666256823576987,
      "date": "10 Jun",
      "description": "Molestias nesciunt iste.",
      "category": "Utilities",
      "tags": [
        "coles"
      ],
      "amount": 433,
      "fromUser": "Michael Allan",
      "toUser": "Mr. Tamara Jakubowski",
      "merchant": 1440
    },
    {
      "id": 0.11596069252118468,
      "date": "27 Aug",
      "description": "Quas fuga illo et ullam ex quos voluptatibus fugiat.",
      "category": "Utilities",
      "tags": [
        "coles"
      ],
      "amount": 260,
      "fromUser": "Michael Allan",
      "toUser": "Dr. Jakob Spencer",
      "merchant": 9415
    },
    {
      "id": 0.994131512241438,
      "date": "11 Aug",
      "description": "Consequatur id aut voluptate ut et repudiandae dolorem.",
      "category": "Medical",
      "tags": [
        "health"
      ],
      "amount": 609,
      "fromUser": "Michael Allan",
      "toUser": "Dr. Major Hyatt",
      "merchant": 20
    },
    {
      "id": 0.3747189955320209,
      "date": "23 Oct",
      "description": "Rerum ea provident dolore quia deserunt dolore sint a.",
      "category": "Memberships",
      "tags": [
        "fitness"
      ],
      "amount": 257,
      "fromUser": "Michael Allan",
      "toUser": "Ms. Dallin Gaylord",
      "merchant": 6568
    },
    {
      "id": 0.9447709412779659,
      "date": "17 Jun",
      "description": "Sed iste dolorem.",
      "category": "Utilities",
      "tags": [
        "coles"
      ],
      "amount": 742,
      "fromUser": "Michael Allan",
      "toUser": "Dr. Clement Ziemann",
      "merchant": 2870
    },
    {
      "id": 0.30469824420288205,
      "date": "31 Jan",
      "description": "Repellendus minus eos et nam dolores et beatae repudiandae.",
      "category": "Memberships",
      "tags": [
        "fitness"
      ],
      "amount": 227,
      "fromUser": "Michael Allan",
      "toUser": "Miss Roy Langosh",
      "merchant": 5705
    },
    {
      "id": 0.4945069358218461,
      "date": "4 Jul",
      "description": "Et assumenda dolorem aperiam tempora qui exercitationem.",
      "category": "Medical",
      "tags": [
        "health"
      ],
      "amount": 133,
      "fromUser": "Michael Allan",
      "toUser": "Mrs. Tressa Stoltenberg",
      "merchant": 5296
    },
    {
      "id": 0.5230055437423289,
      "date": "17 Jan",
      "description": "Assumenda et et in excepturi.",
      "category": "Car Loan",
      "tags": [
        "leisure"
      ],
      "amount": 59,
      "fromUser": "Michael Allan",
      "toUser": "Miss Tito Cummerata",
      "merchant": 2062
    },
    {
      "id": 0.886701496085152,
      "date": "14 Jul",
      "description": "Modi reiciendis maxime quis facilis nulla iure et id.",
      "category": "Car Loan",
      "tags": [
        "leisure"
      ],
      "amount": 99,
      "fromUser": "Michael Allan",
      "toUser": "Mrs. Santino Breitenberg",
      "merchant": 2822
    },
    {
      "id": 0.5072611817158759,
      "date": "21 Dec",
      "description": "Magnam cumque est nihil assumenda consectetur.",
      "category": "Utilities",
      "tags": [
        "coles"
      ],
      "amount": 372,
      "fromUser": "Michael Allan",
      "toUser": "Mr. Herminia Parisian",
      "merchant": 9899
    },
    {
      "id": 0.6261881471145898,
      "date": "19 Jan",
      "description": "Aliquam cum nulla aut eum id ab et amet est.",
      "category": "Memberships",
      "tags": [
        "fitness"
      ],
      "amount": 124,
      "fromUser": "Michael Allan",
      "toUser": "Ms. Chesley Koch",
      "merchant": 7943
    },
    {
      "id": 0.3078517960384488,
      "date": "1 Nov",
      "description": "Quasi vero itaque amet sequi quod occaecati minima.",
      "category": "Utilities",
      "tags": [
        "coles"
      ],
      "amount": 303,
      "fromUser": "Michael Allan",
      "toUser": "Miss Rick Lindgren",
      "merchant": 4362
    },
    {
      "id": 0.05794117599725723,
      "date": "9 Jan",
      "description": "Eum quis odio.",
      "category": "Medical",
      "tags": [
        "health"
      ],
      "amount": 988,
      "fromUser": "Michael Allan",
      "toUser": "Miss Warren Schowalter",
      "merchant": 7279
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
