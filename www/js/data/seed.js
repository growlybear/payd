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
      'Rent / Mortgage',
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

var ret = [];
for (var i = 0; i < 100; i++) {
  ret.push(casual.transaction);
}

var options = {
  noColor: true
};

fs.writeFile('sample.json', jsonFormat(ret), function (err) {
  if (err) throw err;

  console.log('Seeded data');
});
