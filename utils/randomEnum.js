const { faker } = require('@faker-js/faker');

exports.randomEnum = function randomEnum() {
  return faker.helpers.arrayElement(['pending','approved','rejected']);
}
