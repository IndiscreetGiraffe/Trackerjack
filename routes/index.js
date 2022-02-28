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

