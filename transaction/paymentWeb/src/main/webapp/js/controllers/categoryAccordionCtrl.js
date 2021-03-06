payd.controller('CategoryAccordionCtrl', function ($scope, $sce, $http) {
  $scope.oneAtATime = true;

  var transactions = [
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

  $scope.categories = [
    {
      title: 'Mortgage',
      totalAmount: 1223.00,
      content: {
        transactions: transactions
      }
    },
    {
      title: 'Super',
      content: {
        transactions: transactions
      }
    },
    {
      title: 'Utilities',
      content: {
        transactions: transactions
      }
    },
    {
      title: 'Car Loan',
      content: {
        transactions: transactions
      }
    },
    {
      title: 'Membership',
      content: {
        transactions: transactions
      }
    },
    {
      title: 'Entertainment',
      content: {
        transactions: transactions
      }
    },
    {
      title: 'Medical',
      content: {
        transactions: transactions
      }
    },
    {
      title: 'Misc',
      content: {
        transactions: transactions
      }
    },
    {
      title: 'Dots',
      content: {
        transactions: transactions
      }
    }
  ];


  for(var index in $scope.categories){
	  var cato = $scope.categories[index] ;

	  $http.get('/transanctionSearch/transactionHistory/search/category:' + cato.title + '')
	    .then(function (response) {
	      cato.content.transactions = response;
	    }, function (err) {
	      throw err;
	    });

  }

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
