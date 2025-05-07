const { faker } = require('@faker-js/faker');

exports.insertStudents = async function insertStudents(connection) {
    const sql = `INSERT INTO student (name, RA, cpf, email, password, birth_date, phone_number) VALUES ?`;
    const values = Array.from({ length: 500 }).map(() => [
      faker.person.firstName(),
      faker.string.alphanumeric(8),
      faker.number.int({ min: 10000000000, max: 99999999999 }),
      faker.internet.email(),
      faker.internet.password(),
      faker.date.past(20, '2005-01-01').toISOString().split('T')[0],
      faker.phone.number({ style: 'international' }).replace("+", ""),
    ]);
    await connection.query(sql, [values]);
  }
  