payd.controller('CategoryAccordionCtrl', function ($scope, $sce) {
  $scope.oneAtATime = true;

  $scope.categories = [
    {
      title: 'Rent / Mortgage',
      iconHtml: '<i class="fa fa-home"></i>',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Utilities',
      iconHtml: '<i class="fa fa-lightbulb-o"></i>',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Super',
      iconHtml: '<i class="fa fa-glove"></i>',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Car Loan',
      iconHtml: '<i class="fa fa-car"></i>',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Memberships',
      iconHtml: '<i class="fa fa-users"></i>',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Medical',
      iconHtml: '<i class="fa fa-medkit"></i>',
      content: 'Dynamic Group Body - 2'
    },
    {
      title: 'Entertainment',
      iconHtml: '<i class="fa fa-ticket"></i>',
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
