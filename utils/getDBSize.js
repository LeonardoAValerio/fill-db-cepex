exports.getDBSize = async function getDBSize(connection) {
    await connection.query(`ANALYZE TABLE cepex.teacher;
		ANALYZE TABLE cepex.teacher_has_course;
		ANALYZE TABLE cepex.student_has_course;
		ANALYZE TABLE cepex.student;
		ANALYZE TABLE cepex.course;
		ANALYZE TABLE cepex.research_project_has_student;
		ANALYZE TABLE cepex.teacher_has_research_project;
		ANALYZE TABLE cepex.research_project;
		ANALYZE TABLE cepex.approved_research_project;
		ANALYZE TABLE cepex.administrator;
		ANALYZE TABLE cepex.monitoring;
		ANALYZE TABLE cepex.monitoring_has_student`);
      
    
    const [rows] = await connection.query(`
    SELECT SUM(data_length + index_length) AS total
    FROM information_schema.tables 
    WHERE table_schema = DATABASE()
  `);
  return rows[0].total || 0;
}