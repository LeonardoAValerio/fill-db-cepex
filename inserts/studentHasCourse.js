const { faker } = require('@faker-js/faker');

exports.insertStudentHasCourse = async function insertStudentHasCourse(connection) {
    const [students] = await connection.query('SELECT id FROM student');
    const [courses] = await connection.query('SELECT id FROM course');

    const [existing] = await connection.query('SELECT student_id, course_id FROM student_has_course');

    const uniquePairs = new Set(existing.map(row => `${row.student_id}-${row.course_id}`));
    const values = [];

    while (values.length < 500) {
        const studentId = faker.helpers.arrayElement(students).id;
        const courseId = faker.helpers.arrayElement(courses).id;
        const key = `${studentId}-${courseId}`;

        if (!uniquePairs.has(key)) {
            uniquePairs.add(key);
            values.push([studentId, courseId]);
        }
    }

    const sql = `INSERT INTO student_has_course (student_id, course_id) VALUES ?`;
    await connection.query(sql, [values]);
}
