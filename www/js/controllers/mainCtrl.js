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
    { firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com' },
    { firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com' },
    { firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com' }
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
