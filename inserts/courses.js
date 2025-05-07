const { faker } = require('@faker-js/faker');

exports.insertCourses = async function insertCourses(connection) {
    const sql = `INSERT INTO course (name) VALUES ?`;
    const values = Array.from({ length: 100 }).map(() => [
        faker.company.buzzNoun() + ' Course',
    ]);
    await connection.query(sql, [values]);
}