const { faker } = require('@faker-js/faker');

exports.insertResearchProjects = async function insertResearchProjects(connection) {
    const [courses] = await connection.query('SELECT id FROM course');
    const [teachers] = await connection.query('SELECT id FROM teacher');
    const sql = `
      INSERT INTO research_project 
      (start_date, end_date, title, general_objective, problem, justification, hypothesis, course_id, teacher_id, createdAt)
      VALUES ?`;
    const values = Array.from({ length: 500 }).map(() => [
      faker.date.past().toISOString().split('T')[0],
      faker.date.future().toISOString().split('T')[0],
      faker.lorem.sentence(3),
      faker.lorem.paragraphs(1),
      faker.lorem.paragraphs(1),
      faker.lorem.paragraphs(1),
      faker.lorem.paragraphs(1),
      faker.helpers.arrayElement(courses).id,
      faker.helpers.arrayElement(teachers).id,
      new Date(),
    ]);
    await connection.query(sql, [values]);
  }