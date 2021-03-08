const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: '',
  database: 'company_employeesDB',
});

connection.connect((err) => {
  if (err) throw err;
  startMenu();
});

const start = () => {
  inquirer.prompt(
    {
      name: "menu",
      type: "list",
      message: "Would you like to View, Add, or Update employee information?",
      choices: ["View", "Add", "Update", "EXIT"],

    })
    .then((answer) => {
      if (answer.menu === "View") {
        viewEmployee();
      } else if (answer.menu === "Add") {
        addEmployee();
      } else if (answer.menu === "Update") {
        updateEmployee();
      } else {
        console.log("Exiting");
        connection.end();
      }
    });
};

const viewEmployee = () => {
  inquirer.prompt(
    {
      name: "viewEmployeeOptions",
      type: "list",
      message: "Select: Department, Roles, or Employees",
      choices: ["Department", "Roles", "Employees", "Return to Main"],
    }
  )
    .then((answer) => {
      if (answer.viewEmployeeOptions === "Department") {
        viewEmpDepartment();
      } else if (answer.viewEmployeeOptions === "Roles") {
        viewEmpRoles();
      } else if (answer.viewEmployeeOptions === "Employees") {
        viewEmpAll();
      }
    })
}
