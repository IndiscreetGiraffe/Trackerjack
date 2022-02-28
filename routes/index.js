const { express } = require('express');
const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');

let departments = [];
let roles = [];
let employees = [];
let updatedRole = [];

console.log("------------------Tracker Jack---------------------");
// function that starts the questions
async function startQuestions() {
    const question = await inquirer.prompt([
        {
            type: 'list',
            name: 'trackerAction',
            message: "What would you like to do?",
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a role', 'Add an employee', 'Add a department', 'Update employee role', 'Quit']
        }
    ])

    // if the user decides to view all departments show all departments 
    if (question.trackerAction === 'View all departments') {
        viewDepartments();
       

    }



    // if the user decides to view all roles show all roles 
    if (question.trackerAction === "View all roles") {
        viewRoles();
        
    }