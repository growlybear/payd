var fs = require('fs');
var casual = require('casual');
var jsonFormat = require('json-format');

// Define custom generator
casual.define('transaction', function () {
  return {
    id: casual.numerify('_#######################'),
    date: casual.date(format = 'YYYY-MM-DD'),
    description: casual.short_description,
    category: casual.random_element([
      'Rent/Mortgage',
      'Utilities',
      'Super',
      'Car Loan',
      'Memberships',
      'Medical',
      'Entertainment'
    ]),
    tags: casual.random_element([
      'Rent / Mortgage',
      'Utilities',
      'Super',
      'Car Loan',
      'Memberships',
      'Medical',
      'Entertainment'
    ]),
    amount: casual.double(),
    fromAccount: casual.company_name,
    toAccount: "Savings account",
    merchantId: casual.word
  };
});

// Load up some transactions
var ret = [];
for (var i = 0; i < 100; i++) {
  ret.push(casual.transaction);
}

// Aggregage and transform for nvd3 donut chart
// FIXME nasty imperative code that need refactoring ... sorry :-(
function aggregate(arr) {
  var totals = {};
  var ret = [];

  arr.map(function (item) {
    if (!totals[item.category]) {
      totals[item.category] = 0;
    }
    totals[item.category] += item.amount;
  });

  for (var key in totals) {
    var obj = {};
    obj.key = key;
    obj.y = Math.abs(totals[key]);
    ret.push(obj);
  }

  return ret;
}


// Persist aggregated data to disk
fs.writeFile('spendingByCategory.json', jsonFormat(aggregate(ret)), function (err) {
  if (err) throw err;

  console.log('Seeded data');
});

// Persist raw data to disk
// fs.writeFile('sample.json', jsonFormat(ret), function (err) {
//   if (err) throw err;

//   console.log('Seeded data');
// });
