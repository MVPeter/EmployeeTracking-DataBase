const mysql = require('mysql');
const inquirer = require('inquirer');
const Font = require('ascii-art-font')
const dotenv = require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: process.env.PASSWORD,
  database: 'employeesDB',
});



connection.connect((err) => {
  if (err) throw err;
  // Font.create("Employee Tracker", style[,close]);
  startMenu();
});

function viewEmpAll() {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name
  FROM employeesdb.employee
  ORDER BY employee.last_name`, (err, results) => {
    console.table(results);
    viewEmployee();
  });
};

function viewDepartmentAll() {
  connection.query(
    `SELECT department.id, department.name 
    FROM employeesdb.department
    ORDER BY department.id`, (err, results) => {
    console.table(results);
    viewEmployee();
  });
};

function viewDepartments() {
  connection.query(
    `SELECT department.id, department.name 
    FROM employeesdb.department
    ORDER BY department.id`, (err, results) => {
    console.table(results);
  });
};

function departmentEmp(name) {
  connection.query(
    `SELECT department.name, employee.id, employee.first_name, employee.last_name
    FROM employeesdb.employee
    LEFT JOIN employeesdb.role
    on employee.role_id = role.id
    JOIN employeesdb.department
    on role.department_id = department.id
    WHERE department.name = "${name}"`, (err, results) => {
    console.table(results)
    viewEmployee();


  });
};

function viewEmpRoles() {
  connection.query(
    `SELECT  role.id, role.title
    FROM employeesdb.role
    ORDER BY role.id`, (err, results) => {
    console.table(results)
    viewEmployee()
  });
};

// function to deleteEmployee
function deleteEmployee(id) {
  connection.query(
    `SELECT * FROM employeesdb.employeesdb WHERE id = ${id}`, (err, results) => {
      console.table(results)
      // startMenu()
    });
};

//MAIN MENUE 
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
        addMenu();
      } else if (answer.menu === "Update") {
        updateMenu();
      } else if (answer.menu === "Delete") {
        deleteEmployeeMenu();
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
      message: "View: Department, Role, All Employees, Department's Employees",
      choices: ["Department", "Roles", "All Employees", "Department's Employees", "Return to Main"],
    }
  )
    .then((answer) => {
      if (answer.viewEmployeeOptions === "Department's Employees") {
        viewDepartmentEmployee();

      } else if (answer.viewEmployeeOptions === "Roles") {
        viewEmpRoles();

      } else if (answer.viewEmployeeOptions === "All Employees") {
        viewEmpAll();

      } else if (answer.viewEmployeeOptions === "Department") {
        viewDepartmentAll();

      } else {
        startMenu();
      }
    })
};

// viewDepartments employees fucntion.
const viewDepartmentEmployee = () => {
  connection.query(
    `SELECT department.id, department.name 
    FROM employeesdb.department
    ORDER BY department.id`, (err, response) => {
    inquirer.prompt(
      [
        {
          name: "chooseDept",
          type: "list",
          message: "Select a Department to view its employees: ",
          choices() {
            const rolesArray = [];
            response.forEach(({ name }) => {
              rolesArray.push(name);
            });
            return rolesArray;
          },
        }
      ],
    )
      .then((answer) => {
        departmentEmp(answer.chooseDept);

      });
  })
}

// function to prompt for Name or ID search of the Database
// const nameIdPrompt = () => {
//   inquirer.prompt(
//     {
//       name: "nameORid",
//       type: "list",
//       message: "Search by Name or ID?",
//       choices: ["Name", "ID", "Return to Main"],
//     }
//   )
//     .then((answer) => {
//       if (answer.nameORid === "Name") {
//         searchDBName();
//       } else if (answer.nameORid === "ID") {
//         searchDBID();
//       } else {
//         startMenu();
//       }
//     })
// };

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
        updatebyLastName()

      })
    });
};

//DISPLAY roles
function displayRoles() {
  connection.query('SELECT id, title, salary FROM employeesdb.role ORDER BY role.id', (err, results) => {
    if (err) throw err;
    console.table(results)
  })
}

// addMenue function
const addMenu = () => {
  inquirer.prompt([
    {
      name: "addmenuchoice",
      type: "list",
      message: "Choose which item you would like to add:",
      choices: ["Department", "Role", "Employee", "Return to Main"],
    }
  ])
    .then((answer) => {
      if (answer.addmenuchoice === "Employee") {
        addEmployee();
      } else if (answer.addmenuchoice === "Department") {
        addDepartment();
      } else if (answer.addmenuchoice === "Role") {
        addRole();
      } else {
        startMenu();
      }
    })
}

// updateMenue function
const updateMenu = () => {
  inquirer.prompt([
    {
      name: "updatemenuchoice",
      type: "list",
      message: "Choose which item you would like to Update:",
      choices: ["Department", "Role", "Employee", "Return to Main"],
    }
  ])
    .then((answer) => {
      if (answer.updatemenuchoice === "Employee") {
        updateEmployee();
      } else if (answer.updatemenuchoice === "Role") {
        updateRole();
      } else {
        startMenu();
      }
    })
}

// addEmpployee function.
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
          results.forEach(({ title, id }) => {
            rolesArray.push(id + " Role: " + title);
          });
          return rolesArray;
        },
        filter: function (val) {
          return val.substring(0, 5);
        }
      },

    ])
      .then((answer) => {
        console.table(answer);

        addEmployeeDB(answer.firstName, answer.lastName, answer.chooseRole);
        addMenu();

      })
  })
};

// addDepartment function.
const addDepartment = () => {
  inquirer.prompt([
    {
      name: "departmentName",
      type: "input",
      message: "Please type a new Department Name:  ",
    }

  ])
    .then((answer) => {
      console.table(answer);

      addDepartmentDB(answer.departmentName);
      addMenu();
    })
};

// addRole function.
const addRole = () => {
  connection.query('SELECT * FROM department ORDER BY department.id', (err, results) => {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "Please type a new role title:  ",
      },
      {
        name: "roleSalary",
        type: "input",
        message: "Please type a new salary:  ",
      },
      {
        name: "chooseDept",
        type: "list",
        message: "Select the Department: ",
        choices() {
          const deptArray = [];
          results.forEach(({ name, id }) => {
            deptArray.push(id + " Department: " + name);
          });
          return deptArray;
        },
        filter: function (val) {
          return val.substring(0, 5);
        }
      },

    ])
      .then((answer) => {
        console.table(answer);

        addRoleDB(answer.roleTitle, answer.roleSalary, answer.chooseDept);
        addMenu();
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
function addRoleDB(title, salary, department_id) {
  connection.query(`INSERT INTO role (title, salary, department_id)
  VALUES ("${title}", "${salary}", "${department_id}")`, (err, res) => {
    if (err) throw err;
    // console.table(res);
  })
}


// add MySql Department
function addDepartmentDB(name) {
  connection.query(`INSERT INTO department (name)
  VALUES ("${name}")`, (err, res) => {
    if (err) throw err;
    // console.table(res);
  })
}

// updateEmpRoles fucntion.
const updateRole = () => {
  displayRoles()

  connection.query('SELECT id, name FROM department ORDER by id', (err, results) => {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "roleId",
        type: "input",
        message: "Type the ID of the Role you would like to update: "
      },
      {
        name: "roleSalary",
        type: "input",
        message: "Please type a new salary:  ",
      },
      {
        name: "chooseDept",
        type: "list",
        message: "Select the Department: ",
        choices() {
          const deptArray = [];
          results.forEach(({ name, id }) => {
            deptArray.push(id + " Department: " + name);
          });
          return deptArray;
        },
        filter: function (val) {
          return val.substring(0, 5);
        }
      }
    ])
      .then((answer) => {
        // console.table(answer);
        updateRoleDB(answer.roleId, answer.roleSalary, answer.chooseDept);
        updateMenu();
      })
  })
};

//UPDATE mySQL role db
function updateRoleDB(id, salary, department_id) {
  connection.query(`UPDATE role 
  SET salary = "${salary}", department_id = "${department_id}"
  WHERE id = "${id}"`, (err, res) => {
    if (err) throw err;
    // console.table(res);
  })
}

// updateDepartment fucntion.
const updateEmployee = () => {
  // viewDepartments()

  connection.query('SELECT id, title FROM role ORDER by id', (err, results) => {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "searchBy",
        type: "list",
        message: "Select ID to search for an Employee ",
        choices: ["ID", "Return to Update Menu"]
      }
    ])
      .then((answer) => {
        if (answer.searchBy === "ID") {
          updateById()
        } else if (answer.searchBy === "Last Name") {
          searchNamePrompt()

        } else (updateMenu())
      })
  })
};

//search by ID update employee
const updateById = () => {
  // viewDepartments()

  connection.query('SELECT employee.id, first_name, Last_name, role_id, title FROM employee left Join role ON role_id = role.id ORDER by employee.id', (err, results) => {
    if (err) throw err;
    console.table(results);

    inquirer.prompt([
      {
        name: "empID",
        type: "input",
        message: "Type the ID of the employee you want to update: "
      },
      {
        name: "empFirstName",
        type: "input",
        message: "First Name: "
      },
      {
        name: "empLastName",
        type: "input",
        message: "Last Name: "
      },
      {
        name: "chooseRole",
        type: "list",
        message: "Select the role you want update: ",
        choices() {
          const deptArray = [];
          results.forEach(({ role_id, title }) => {
            deptArray.push(role_id + "   Role: " + title);
          });
          return deptArray;
        },
        filter: function (val) {
          return val.substring(0, 5);
        }
      }
    ])
      .then((answer) => {
        updateemployeeDB(answer.empID, answer.empFirstName, answer.empLastName, answer.chooseRole);

      })
  })
};

// UPDATE MySql emploee db
function updateemployeeDB(id, first, last, roleid) {
  connection.query(`UPDATE employee SET first_name = "${first}", last_name = "${last}", role_id = "${roleid}" WHERE id = "${id}"`, (err, res) => {
    if (err) throw err;
    // console.table(res);
  });
  connection.query(`SELECT * FROM employee WHERE id = "${id}"`, (err, res) => {
    if (err) throw err;
    console.table(res);
    updateMenu();
  })
}

//search by Last Name update employee ---------Work in progress
const updatebyLastName = () => {
  // viewDepartments()

  connection.query('SELECT employee.id, first_name, Last_name, role_id, title FROM employee left Join role ON role_id = role.id ORDER by employee.id', (err, results) => {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "empID",
        type: "input",
        message: "Type the ID of the employee you want to update: "
      },
      {
        name: "empFirstName",
        type: "input",
        message: "First Name: "
      },
      {
        name: "empLastName",
        type: "input",
        message: "Last Name: "
      },
      {
        name: "chooseRole",
        type: "list",
        message: "Select the role you want update: ",
        choices() {
          const deptArray = [];
          results.forEach(({ role_id, title }) => {
            deptArray.push(role_id + "   Role: " + title);
          });
          return deptArray;
        },
        filter: function (val) {
          return val.substring(0, 5);
        }
      }
    ])
      .then((answer) => {
        updateemployeeDB(answer.empID, answer.empFirstName, answer.empLastName, answer.chooseRole);
        updateMenu();
      })
  })
};

//search by ID delete employee
const deleteEmployeeMenu = () => {
  // viewDepartments()

  connection.query('SELECT employee.id, first_name, Last_name, role_id, title FROM employee left Join role ON role_id = role.id ORDER by employee.id', (err, results) => {
    if (err) throw err;
    console.table(results);

    inquirer.prompt([
      {
        name: "empID",
        type: "input",
        message: "Type the ID of the employee you want to DELETE: "
      },
      {
        name: "empFirstName",
        type: "input",
        message: "Confirm the delete by typing the FIRST Name: "
      }
    ])
      .then((answer) => {
        deleteEmployeeDB(answer.empID, answer.empFirstName);

      })
  })
};

// DELETE MySql emploee db
function deleteEmployeeDB(id) {
  connection.query(`DELETE FROM employee WHERE id = "${id}" LIMIT 1`, (err, res) => {
    if (err) throw err;
    startMenu();
  });
}