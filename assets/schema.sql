-- Drops the day_planner_db if it already exists --
DROP DATABASE IF EXISTS employeesDB;

-- Create the database employeesDB and specified it for use.
CREATE DATABASE employeesDB;

USE employeesDB;

-- Create the department Table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(30),
    PRIMARY KEY (id)
);
ALTER TABLE department AUTO_INCREMENT=30000;

-- Create the role Table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title varchar(30),
    salary decimal(13,2),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);
ALTER TABLE role AUTO_INCREMENT=20000;

--  Create the employee Table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name varchar(30),
    last_name varchar(30),
    manager_id INT,
    role_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);


SELECT * FROM employee;

SELECT * FROM role;

SELECT * FROM department;
