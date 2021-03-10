const mysql = require('mysql');
const inquirer = require('inquirer');
const Font = require('ascii-art-font')

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: '',
  database: 'employeesDB',
});



connection.connect((err) => {
  if (err) throw err;
  // Font.create("Employee Tracker", style[,close]);
  startMenu();
});

function viewEmpAll() {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name
  FROM employeesdb.employee
  LEFT JOIN employeesdb.role
  on employee.role_id = role.id
  JOIN employeesdb.department
  on role.department_id = department.id`, (err, results) => {
    console.table(results)
    startMenu()
  });
};

function viewEmpDepartment() {
  connection.query(
    `SELECT department.name, employee.id, employee.first_name, employee.last_name
    FROM employeesdb.employee
    LEFT JOIN employeesdb.role
    on employee.role_id = role.id
    JOIN employeesdb.department
    on role.department_id = department.id
    ORDER BY department.name`, (err, results) => {
    console.table(results)
    startMenu()
  });
};

function viewEmpRoles() {
  connection.query(
    `SELECT  role.title, employee.id, employee.first_name, employee.last_name
    FROM employeesdb.employee
    LEFT JOIN employeesdb.role
    on employee.role_id = role.id
    JOIN employeesdb.department
    on role.department_id = department.id
    ORDER BY role.title`, (err, results) => {
    console.table(results)
    startMenu()
  });
};

// function to deleteEmployee
function deleteEmployee(id) {
  connection.query(
    `SELECT * FROM employeesdb.employeesdb WHERE id = ${id}`, (err, results) => {
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
      choices: ["View", "Add", "Update", "Delete", "EXIT"],

    })
    .then((answer) => {
      if (answer.menu === "View") {
        viewEmployee();
      } else if (answer.menu === "Add") {
        addEmployee();
      } else if (answer.menu === "Update") {
        updateEmployee();
      } else if (answer.menu === "Delete") {
        deleteEmployee();
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
const addEmployee = () => {
  connection.query('SELECT role.id, role.title FROM employeesdb.role ORDER BY role.id', (err, results) => {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "Please type the first name:  ",
      },
      {
        name: "lastName",
        type: "input",
        message: "Please type the last name:  ",
      },
      {
        name: "chooseRole",
        type: "list",
        message: "Select a role: ",
        choices() {
          const rolesArray = [];
           results.forEach(({title, id}) => {
            rolesArray.push(id + " Role: " + title);
          });
          return rolesArray;
        },
        filter: function (val) {
          return val.substring(0,5);
        }
      },
      
    ])
      .then((answer) => {
        console.table(answer);
        
        addEmployeeDB(answer.firstName, answer.lastName, answer.chooseRole);
        startMenu();

      })
  })
};

// add Mysql Employee
function addEmployeeDB(first, last, role) {
  connection.query(`INSERT INTO employee (first_name, last_name, role_id)
  VALUES ("${first}", "${last}", "${role}")`, (err, res) => {
    if (err) throw err;
    // console.table(res);
  })
}

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
// deleteEmployee() {
//   SELECT * FROM employeesdb.employeesdb WHERE id = 
// }