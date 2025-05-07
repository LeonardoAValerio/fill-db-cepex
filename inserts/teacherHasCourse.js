const { faker } = require('@faker-js/faker');

exports.insertTeacherHasCourse = async function insertTeacherHasCourse(connection) {
    const [teachers] = await connection.query('SELECT id FROM teacher');
    const [courses] = await connection.query('SELECT id FROM course');

    const [existing] = await connection.query('SELECT teacher_id, course_id FROM teacher_has_course');

    const uniquePairs = new Set(existing.map(row => `${row.teacher_id}-${row.course_id}`));
    const values = [];

    while (values.length < 500) {
        const teacherId = faker.helpers.arrayElement(teachers).id;
        const courseId = faker.helpers.arrayElement(courses).id;
        const key = `${teacherId}-${courseId}`;

        if (!uniquePairs.has(key)) {
            uniquePairs.add(key);
            values.push([teacherId, courseId]);
        }
    }

    const sql = `INSERT INTO teacher_has_course (teacher_id, course_id) VALUES ?`;
    await connection.query(sql, [values]);
}
