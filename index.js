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

function viewEmpAll() {
  connection.query(`SELECT * FROM employee ORDER BY id`, (err, results) => {
    console.table(results)
    startMenu()
  });
};

function viewEmpDepartment() {
  connection.query(`SELECT * FROM department ORDER BY id`, (err, results) => {
    console.table(results)
    startMenu()
  });
};

function viewEmpRoles() {
  connection.query(`SELECT * FROM role ORDER BY id`, (err, results) => {
    console.table(results)
    startMenu()
  });
};

const startMenu = () => {
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
        startMenu();
      }
    })
};

// function to prompt for Name or ID search of the Database
const nameIdPrompt = () => {
  inquirer.prompt(
    {
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
        startMenu();
      }
    })
};

// funciton to search by name
const searchNamePrompt = () => {
  // query MYSql for employees ORDER by last name
  // connection.query('SELECT * FROM employee ORDER BY last_name', (err, results) => {
  //   if (err) throw err;
  inquirer.prompt(
    {
      name: "searchName",
      type: "input",
      message: "Type in the Last name of the employee you are searching for",
    }
  )
    .then((answer) => {
      let str = answer.toLowerCase();
      let Lastname = str.carAt(0).toUpperCase() + str.slice(1);

      connection.query(`SELECT * FROM employee WHERE last_name = ${Lastname} ORDER BY last_name`, (err, results) => {
        console.table(results)

      })
    });
};

//function to return MySql lookup by ID

function lookupemployeeByID(id) {
  connection.query(`SELECT * FROM employee WHERE id = ${id}`, (err, res) => {
    if (err) throw err;
    console.table(res);
    // return res;
  })
}

function returnDepartment(id) {

}

// query Mysql for Employee by department
// const viewEmpDepartment = () => {
//   // nameIdPrompt funciton

// }

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