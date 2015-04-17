var fs = require('fs');

var casual = require('casual');
var moment = require('moment');
var jsonFormat = require('json-format');

var dateGenerator= function (format, start, end) {
  format = format || 'YYYY-MM-DD';
  return moment("2011-04-15", format);
};

var categories = [
  'Mortgage',
  'Utilities',
  'Super',
  'Car Loan',
  'Memberships',
  'Medical',
  'Entertainment'
];

var allTags = {
  'Mortgage': 'house',
  'Utilities': 'coles',
  'Super': 'retirement',
  'Car Loan': 'leisure',
  'Memberships': 'fitness',
  'Medical': 'health',
  'Entertainment': 'kids'
};

var toUsers = [] ;

for (var k = 0; k <= 10; k++) {
  if (toUsers.length < 800) {
    for (var i = 1000 - 1; i >= 0; i--) {
      var user = casual.name;
      if (toUsers.indexOf(user) === -1 ) {
        toUsers.push(user);
      }
      if (toUsers.length >= 1000) {
        break ;
      }
    }
  }
}

casual.define('payment', function () {

    var cat = casual.random_element(categories) ;
    var userIndex = casual.integer(from = 0, to = toUsers.length-1) ;

    return {
      id: casual.random,
      date: moment(casual.double(new Date(2014, 4, 1).getTime(), new Date().getTime())).format('D MMM'),
      description: casual.short_description,
      category: cat,
      tags: [allTags[cat]],
      amount:casual.integer(from= 10, to= casual.integer(from= 100, to= casual.integer(from= 600, to= 1800 ))),
      fromUser: 'Michael Allan',
      toUser: toUsers[userIndex],
      merchant: casual.integer(from = (10*userIndex), to = ((10*userIndex)+10))
    };
});

var ret = [];

for (var i = 100; i >= 0; i--) {
  ret.push(casual.payment);
};

// Persist raw data to disk
fs.writeFile('sample.abhi.json', jsonFormat(ret), function (err) {
  if (err) throw err;
  console.log('Seeded data');
});
