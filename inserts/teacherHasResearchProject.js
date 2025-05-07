const { faker } = require('@faker-js/faker');

exports.insertTeacherHasResearchProject = async function insertTeacherHasResearchProject(connection) {
    const [teachers] = await connection.query('SELECT id FROM teacher');
    const [research_projects] = await connection.query('SELECT id FROM research_project');

    const [existing] = await connection.query('SELECT teacher_id, research_project_id FROM teacher_has_research_project');

    const uniquePairs = new Set(existing.map(row => `${row.teacher_id}-${row.research_project_id}`));
    const values = [];

    while (values.length < 500) {
        const teacherId = faker.helpers.arrayElement(teachers).id;
        const researchProjectId = faker.helpers.arrayElement(research_projects).id;
        const key = `${teacherId}-${researchProjectId}`;

        if (!uniquePairs.has(key)) {
            uniquePairs.add(key);
            values.push([teacherId, researchProjectId]);
        }
    }
  
    const sql = `INSERT INTO teacher_has_research_project (teacher_id, research_project_id) VALUES ?`;
    await connection.query(sql, [values]);
  }
