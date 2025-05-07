const { faker } = require('@faker-js/faker');
const { randomEnum } = require ("../utils/randomEnum");

exports.insertMonitoringHasStudent = async function insertMonitoringHasStudent(connection) {
    const [monitorings] = await connection.query('SELECT id FROM monitoring');
    const [students] = await connection.query('SELECT id FROM student');

    const [existing] = await connection.query('SELECT student_id, monitoring_id FROM monitoring_has_student');

    const uniquePairs = new Set(existing.map(row => `${row.student_id}-${row.monitoring_id}`));
    const values = [];

    while (values.length < 500) {
      const studentId = faker.helpers.arrayElement(students).id;
      const monitoringId = faker.helpers.arrayElement(monitorings).id;
      const status = randomEnum();
      const key = `${studentId}-${monitoringId}`;

      if (!uniquePairs.has(key)) {
          uniquePairs.add(key);
          values.push([monitoringId, studentId, status]);
      }
    }

    const sql = `INSERT INTO monitoring_has_student (monitoring_id, student_id, status) VALUES ?`;
    await connection.query(sql, [values]);
}