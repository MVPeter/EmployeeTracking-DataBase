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

// viewEmployee fucntion.
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
      } else {
        start();
      }
    })
};

const nameIdPrompt = () => {
  inquirer.prompt({
    name: "nameORid",
    type: "list",
    message: "Search by Name or ID?",
    choices: ["Name", "ID", "Return to Main"],
  }
  )
    .then((answer) => {
      if (answer.nameORid === "Name") {
        searchDBName();
      } else if (answer.nameORid === "ID") {
        searchDBID();
      } else {
        start();
      }
    })
};

// query Mysql for Employee by department
const viewEmpDepartment = () => {
  // nameIdPrompt funciton

}

// query MySql for Employee by Role
// query MySql for ALL Employee sory alphabetical.
// return to main menu

// addEmpployee fucntion.
// add Mysql Employee
// add MySql Role
// add MySql Department
// return to main menu

// updateEmpRoles fucntion.
// query Mysql for Employee
// display Employee
// update MySql for Employee Role
//return to main menu

// deleteEmployee function.
// prompt choice to search by employee name or ID
// query Mysql by Name
// query MySql by ID
// display Name and ID
// prompt to confirmat the ID to delete
// Delete MySql employee by ID typed.