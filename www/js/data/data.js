var casual = require('casual');

casual.define('transaction', function () {
  return {
    date: casual.date(format='YYYY-MM-DD'),
    description: casual.email,
    firstname: casual.first_name,
    lastname: casual.last_name,
    password: casual.password
  };
});

var transaction =

console.log(transaction);
