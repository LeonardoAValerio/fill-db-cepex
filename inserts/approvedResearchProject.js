const { faker } = require('@faker-js/faker');

exports.insertApprovedResearchProject = async function insertApprovedResearchProject(connection) {
    const [projects] = await connection.query('SELECT id FROM research_project');
    const [admin] = await connection.query('SELECT id FROM admin');

    const [existing] = await connection.query('SELECT admin_id, research_project_id FROM approved_research_project');

    const uniquePairs = new Set(existing.map(row => `${row.admin_id}-${row.research_project_id}`));
    const values = [];

    while (values.length < 500) {
      const adminId = faker.helpers.arrayElement(admin).id;
      const research_projectId = faker.helpers.arrayElement(projects).id;
      const key = `${adminId}-${research_projectId}`;

      if (!uniquePairs.has(key)) {
          uniquePairs.add(key);
          values.push([adminId, research_projectId]);
      }
    }

    const sql = `INSERT INTO approved_research_project (admin_id, research_project_id) VALUES ?`;
    await connection.query(sql, [values]);
}
