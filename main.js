const { insertStudents } = require ('./inserts/students');
const { insertTeachers } = require ('./inserts/teachers');
const { insertAdmins } = require ('./inserts/admins');
const { insertCourses } = require( './inserts/courses');
const { insertResearchProjects } = require ('./inserts/researchProjects');
const { insertTeacherHasCourse } = require( './inserts/teacherHasCourse');
const { insertTeacherHasResearchProject } = require ('./inserts/teacherHasResearchProject');
const { insertStudentHasCourse } = require ('./inserts/studentHasCourse');
const { insertResearchProjectHasStudent } = require ('./inserts/researchProjectHasStudent');
const { insertApprovedResearchProject } = require ('./inserts/approvedResearchProject');
const { insertMonitoring } = require ('./inserts/monitoring');
const { insertMonitoringHasStudent } = require ('./inserts/monitoringHasStudent');
const { getDBSize } = require ('./utils/getDBSize');
const { faker } = require('@faker-js/faker');
const { initDatabase } = require('./database');

const BATCH_SIZE = 500;
exports.BATCH_SIZE = BATCH_SIZE;
const TARGET_SIZE = 3 * 1024 * 1024 * 1024; // 3GB

async function run() {
  const connection = await initDatabase();
  let size = await getDBSize(connection);

  console.log('⏳ Inserindo dados no banco até atingir 3GB...');

  while (size < TARGET_SIZE) {
    await insertStudents(connection);
    await insertTeachers(connection);
    await insertCourses(connection);
    await insertAdmins(connection);
    await insertResearchProjects(connection);
    await insertTeacherHasCourse(connection);
    await insertTeacherHasResearchProject(connection);
    await insertStudentHasCourse(connection);
    await insertResearchProjectHasStudent(connection);
    await insertApprovedResearchProject(connection);
    await insertMonitoring(connection);
    await insertMonitoringHasStudent(connection);

    size = await getDBSize(connection);
    console.log(`Progresso: ${(size / 1024 / 1024).toFixed(2)} MB`);
  }

  console.log('✅ Banco populado com aproximadamente 3GB!');
  await connection.end();
}

run().catch(console.error);