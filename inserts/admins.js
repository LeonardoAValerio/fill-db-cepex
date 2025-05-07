const { faker } = require('@faker-js/faker');

exports.insertAdmins = async function insertAdmins(connection) {
  const sql = `INSERT INTO admin (name, password, email) VALUES ?`;
  const values = Array.from({ length: 50 }).map(() => [
    faker.person.firstName(),
    faker.internet.password(),
    faker.internet.email(),
  ]);
  await connection.query(sql, [values]);
}