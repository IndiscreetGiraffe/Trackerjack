const { express } = require('express');
const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');

let departments = [];
let roles = [];
let employees = [];
let updatedRole = [];

console.log("------------------Tracker Jack---------------------");

async function startQuestions() {
    const question = await inquirer.prompt([
        {
            type: 'list',
            name: 'trackerAction',
            message: "What would you like to do?",
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a role', 'Add an employee', 'Add a department', 'Update employee role', 'Quit']
        }
    ])

    if (question.trackerAction === 'View all departments') {
        viewDepartments();
       

    }
 
    if (question.trackerAction === "View all roles") {
        viewRoles();
        
    }

    if (question.trackerAction === "View all employees") {
        viewEmployees();
       
    }

    let newRole
    if (question.trackerAction === "Add a role") {
        newRole = await inquirer.prompt([
            {
                type: 'input',
                name: 'newRoleTitle',
                message: "What is the title of the new role? (Required)",
                validate: newRoleTitle => {
                    if (newRoleTitle) {
                        return true;
                    } else {
                        console.log("Please enter a role title")
                    }
                }
            },
            {
                type: 'input',
                name: 'newRoleSalary',
                message: "What is the salary? (Required)",
                validate: newRoleSalary => {
                    if (newRoleSalary) {
                        return true;
                    } else {
                        console.log("Please enter the role's salary")
                    }
                }
            },
            {
                type: 'list',
                name: 'departmentID',
                message: "What department does the new role belong to?",
                choices: ['1', '2', '3', '4']
            }

        ])
        if (newRole) {

            roles.push(newRole)
            
        }

        addRole();
        
    }

    if (question.trackerAction === "Add an employee") {
        
        newEmployee = await inquirer.prompt([
            {
                type: 'input',
                name: 'newEmployeeFirstName',
                message: "What is the employee's first name? (Required)",
                validate: newEmployeeFirstName => {
                    if (newEmployeeFirstName) {
                        return true;
                    } else {
                        console.log("Please enter their first name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'newEmployeeLastName',
                message: "What is the employee's last name? (Required)",
                validate: newEmployeeLastName => {
                    if (newEmployeeLastName) {
                        return true;
                    } else {
                        console.log("Please enter their last name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'roleID',
                message: "What is the employee's role id? (Required)",
                validate: roleID => {
                    if (roleID) {
                        return true;
                    } else {
                        console.log("Please enter the ID!")
                    }
                }
            },
            {
                type: 'input',
                name: 'managerName',
                message: "What is their manager's name? (Required)",
                validate: managerName => {
                    if (managerName) {
                        return true;
                    } else {
                        console.log("Please enter the manager's name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'departmentID',
                message: "What is the  new employee's department id? (Required)",
                validate: departmentID => {
                    if (departmentID) {
                        return true;
                    } else {
                        console.log("Please enter the department ID!")
                    }
                }
            }

        ])
        if (newEmployee) {

            employees.push(newEmployee);
            
        }

        addEmployee();

    }
 
if (question.trackerAction === 'Add a department') {
    newDepartment = await inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: "What is the new Department name? (Required)",
            validate: newDepartment => {
                if (newDepartment) {
                    return true;
                } else {
                    console.log("Please enter a name!")
                }
            }
        }
    ])
    if (newDepartment) {

        departments.push(newDepartment);
        
    }
    addDepartment();
   
}
if (question.trackerAction === "Update employee role") {
        
    updatedEmployeeRole = await inquirer.prompt([ 
        {
            type: 'input',
            name: 'employeeFirstName',
            message: "What's the first name of the employee you want to update? (Required)",
            validate: employeeFirstName => {
                if (employeeFirstName) {
                    return true;
                } else {
                    console.log("Please enter their first name!")
                }
            }
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: "What's the last name of the employee you want to update? (Required)",
            validate: employeeLastName => {
                if (employeeLastName) {
                    return true;
                } else {
                    console.log("Please enter their last name!")
                }
            }
        },
        {
            type: 'input',
            name: 'newRoleID',
            message: "What's the new role ID you want to assign to the employee? (Required)",
            validate: newRoleID => {
                if (newRoleID) {
                    return true;
                } else {
                    console.log("Please enter the new role ID!")
                }
            }
        }
    ])

    if (updatedEmployeeRole) {
        updatedRole.push(updatedEmployeeRole);
        
    }
    
    updateEmployeeRole();
   
}

if (question.trackerAction === 'Quit') {
    console.log("Leaving already? Good afternoon, Good evening, and Goodnight! Press CTRL C to exit");
    return;
}
startQuestions();
};

const viewDepartments = () => {

    departments = [];

    db.query(`SELECT * FROM department`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < row.length; i++) {
            departments.push(row[i]);
        }
        console.table('', departments);
        console.log('Press the down arrow to perform another action');
    })

};

const viewRoles = () => {

    roles = [];

    db.query(`SELECT * FROM employeerole`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let j = 0; j < row.length; j++) {
            roles.push(row[j]);
        }
        console.table('', roles);
        console.log('Press the down arrow to perform another action');
    })

};

const viewEmployees = () => {
    employees = [];

    db.query(`SELECT employee.*, department.department_name AS department, employeerole.title AS role
    from employee
    LEFT JOIN department
    ON employee.department_id = department.id
    LEFT JOIN employeerole
    ON employee.role_id = employeerole.id`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let k = 0; k < row.length; k++) {
            employees.push(row[k]);
        }
        
        console.table('', employees);
        console.log('Press the down arrow to perform another action');
    })
};

const addRole = () => {


    const params = [roles[roles.length-1].newRoleTitle, roles[roles.length-1].newRoleSalary, roles[roles.length-1].departmentID];

    db.query(`INSERT INTO employeerole (title, salary, department_id)
    VALUES (?, ?, ?)`, params, (err, res) => {
        if (err) {

            return;
        }

    });

    console.log('The role has been added! Congrats!')
    console.log('Use the down to perform another action');

};

const addEmployee = () => {

    const params = [employees[employees.length-1].newEmployeeFirstName, employees[employees.length-1].newEmployeeLastName, employees[employees.length-1].roleID, employees[employees.length-1].managerName, employees[employees.length-1].departmentID];
    
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_name, department_id)
    VALUES (?, ?, ?, ?, ?)`, params, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }


        console.log('', "The employee has been added, yay!")
        console.log("Use the down arrow to perform another action");

    });

};

const addDepartment = () => {
    const params = [departments[departments.length-1].newDepartment];
    
    db.query(`INSERT INTO department (department_name)
    VALUES (?)`, params, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("This department has now been added!")
        console.log("Use the down arrow to perform another action");
    });
};

startQuestions();
