INSERT INTO department (name)
VALUES ("management");

INSERT INTO department (name)
VALUES ("IT");

INSERT INTO department (name)
VALUES ("kitchen");

INSERT INTO department (name)
VALUES ("admin");



INSERT INTO role (title, salary, department_id)
VALUES ("manager", 21.50, 30000);

INSERT INTO role (title, salary, department_id)
VALUES ("programer", 20.50, 30001);

INSERT INTO role (title, salary, department_id)
VALUES ("cook", 25.50, 30002);

INSERT INTO role (title, salary, department_id)
VALUES ("admin", 15.50, 30003);




INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Stan", "Jones", 20000);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("Patty", "Smith", 1, 20001 );

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("Annie", "Jonhson", 1, 20003);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("Mel", "Franken", 1, 20001);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("Eddie", "Gregson", 1, 20002);

