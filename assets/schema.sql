DROP DATABASE IF EXISTS company_employeesDB;

CREATE DATABASE company_employeesDB;

USE company_employeesDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title varchar(30),
    salary decimal,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

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
