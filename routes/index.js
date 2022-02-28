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
