const mysql = require('mysql2/promise');

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    multipleStatements: true,
  };

const connectionConfigCepex = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cepex',
    multipleStatements: true,
  };

const queryStart = `
  	DROP DATABASE IF EXISTS cepex;
	CREATE DATABASE cepex;
`

const schemaCepex = `
    CREATE TABLE teacher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60),
    email VARCHAR(200),
    password VARCHAR(60),
    cpf VARCHAR(11),
    phone_number VARCHAR(11),
    birth_date DATE
	);

	CREATE TABLE admin (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(60),
	password VARCHAR(60),
	email VARCHAR(200)
	);

	CREATE TABLE student (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(60),
		email VARCHAR(200),
		RA VARCHAR(8),
		cpf VARCHAR(11),
		birth_date DATE,
		password VARCHAR(60),
		phone_number VARCHAR(11)
	);

	CREATE TABLE course (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(60)
	);

	CREATE TABLE teacher_has_course (
		teacher_id INT,
		course_id INT,
		PRIMARY KEY (teacher_id, course_id),
		FOREIGN KEY (teacher_id) REFERENCES teacher(id),
		FOREIGN KEY (course_id) REFERENCES course(id)
	);

	CREATE TABLE student_has_course (
		student_id INT,
		course_id INT,
		PRIMARY KEY (student_id, course_id),
		FOREIGN KEY (student_id) REFERENCES student(id),
		FOREIGN KEY (course_id) REFERENCES course(id)
	);

	CREATE TABLE research_project (
		id INT AUTO_INCREMENT PRIMARY KEY,
		start_date DATE,
		end_date DATE,
		title VARCHAR(60),
		general_objective VARCHAR(300),
		problem VARCHAR(300),
		justification VARCHAR(300),
		hypothesis VARCHAR(300),
		course_id INT,
		createdAt DATETIME,
		teacher_id INT,
		FOREIGN KEY (course_id) REFERENCES course(id),
		FOREIGN KEY (teacher_id) REFERENCES teacher(id)
	);

	CREATE TABLE teacher_has_research_project (
		teacher_id INT,
		research_project_id INT,
		PRIMARY KEY (teacher_id, research_project_id),
		FOREIGN KEY (teacher_id) REFERENCES teacher(id),
		FOREIGN KEY (research_project_id) REFERENCES research_project(id)
	);

	CREATE TABLE research_project_has_student (
		research_project_id INT,
		student_id INT,
		status ENUM('pending', 'approved', 'rejected'),
		PRIMARY KEY (research_project_id, student_id),
		FOREIGN KEY (research_project_id) REFERENCES research_project(id),
		FOREIGN KEY (student_id) REFERENCES student(id)
	);

	CREATE TABLE approved_research_project (
		research_project_id INT,
		admin_id INT,
		PRIMARY KEY (research_project_id, admin_id),
		FOREIGN KEY (research_project_id) REFERENCES research_project(id),
		FOREIGN KEY (admin_id) REFERENCES admin(id)
	);

	CREATE TABLE monitoring (
		id INT AUTO_INCREMENT PRIMARY KEY,
		start_date DATE,
		end_date DATE,
		course_id INT,
		subject VARCHAR(60),
		admin_id INT,
		workload INT,
		description VARCHAR(100),
		FOREIGN KEY (course_id) REFERENCES course(id),
		FOREIGN KEY (admin_id) REFERENCES admin(id)
	);

	CREATE TABLE monitoring_has_student (
		monitoring_id INT,
		student_id INT,
		status ENUM('pending', 'approved', 'rejected'),
		PRIMARY KEY (monitoring_id, student_id),
		FOREIGN KEY (monitoring_id) REFERENCES monitoring(id),
		FOREIGN KEY (student_id) REFERENCES student(id)
	);
	`;

exports.initDatabase = async function initDatabase() {
	const initConnection = await mysql.createConnection(connectionConfig);
	initConnection.query(queryStart);
	initConnection.end();

    const connection = await mysql.createConnection(connectionConfigCepex);
    
    connection.query(schemaCepex);

    return connection;
}