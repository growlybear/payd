payd.controller('CategoryAccordionCtrl', function ($scope, $sce) {
  $scope.oneAtATime = true;

  $scope.categories = [
    {
      title: 'Rent / Mortgage',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Super',
      content: {
        transactions: [{
          name: 'Thing',
          amount: '123'
        }]
      }
    },
    {
      title: 'Utilities',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Car Loan',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Membership',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Entertainment',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Medical',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Misc',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Dots',
      content: 'Dynamic Group Body - 2'
    }
  ];

  // Sadly, no go :-(
  $scope.trust = function (i) {
    return $sce.trustAsHtml($scope.categories[i].iconHtml);
  };

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: false,
    isFirstDisabled: false
  };
});
