const { faker } = require('@faker-js/faker');
const { randomEnum } = require ("../utils/randomEnum");

exports.insertResearchProjectHasStudent = async function insertResearchProjectHasStudent(connection) {
    const [students] = await connection.query('SELECT id FROM student');
    const [projects] = await connection.query('SELECT id FROM research_project');

    const [existing] = await connection.query('SELECT student_id, research_project_id FROM research_project_has_student');

    const uniquePairs = new Set(existing.map(row => `${row.student_id}-${row.research_project_id}`));
    const values = [];

    while (values.length < 500) {
      const studentId = faker.helpers.arrayElement(students).id;
      const researchProjectId = faker.helpers.arrayElement(projects).id;
      const status = randomEnum();
      const key = `${studentId}-${researchProjectId}`;

      if (!uniquePairs.has(key)) {
          uniquePairs.add(key);
          values.push([researchProjectId, studentId, status]);
      }
    }

    const sql = `INSERT INTO research_project_has_student (research_project_id, student_id, status) VALUES ?`;
    await connection.query(sql, [values]);
}