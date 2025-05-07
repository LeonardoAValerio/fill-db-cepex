const { faker } = require('@faker-js/faker');

exports.insertTeachers = async function insertTeachers(connection) {
    const sql = `INSERT INTO teacher (name, email, password, cpf, phone_number, birth_date) VALUES ?`;
    const values = Array.from({ length: 500 }).map(() => [
      faker.person.firstName(),
      faker.internet.email(),
      faker.internet.password(),
      faker.number.int({ min: 10000000000, max: 99999999999 }),
      faker.phone.number({ style: 'international' }).replace("+", ""),
      faker.date.past(30, '1990-01-01').toISOString().split('T')[0],
    ]);
    await connection.query(sql, [values]);
  }
  