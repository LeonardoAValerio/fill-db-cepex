const { faker } = require('@faker-js/faker');

exports.insertMonitoring = async function insertMonitoring(connection) {
    const [admin] = await connection.query('SELECT id FROM admin');
    const [courses] = await connection.query('SELECT id FROM course');

    const values = Array.from({ length: 500 }).map(() => [
        faker.date.past().toISOString().split('T')[0],
        faker.date.future().toISOString().split('T')[0],
        faker.lorem.sentence(2),
        faker.number.int({min: 20, max: 60, multipleOf: 20}),
        faker.lorem.sentence(4),
        faker.helpers.arrayElement(admin).id,
        faker.helpers.arrayElement(courses).id,
    ]);

    const sql = `INSERT INTO monitoring (start_date, end_date, subject, workload, description, admin_id, course_id) VALUES ?`;
    await connection.query(sql, [values]);
}