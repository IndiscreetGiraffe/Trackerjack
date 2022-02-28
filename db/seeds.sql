INSERT INTO employeerole (title, salary, department_id)
VALUES 
('Human Resources', '70000', 1),
('Lead Engineer', '150000', 2),
('Engineer', '120000', 2),
('Finance', '160000', 3),
('Accountant', '125000', 3),
('Legal Team Lead', '250000', 4),
('Lawyer', '190000', 4);



INSERT INTO department (department_name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO employee (first_name, last_name, role_id, manager_name, department_id)
VALUES
('Marlene', 'Parker', 1, 'Mitsy Bones', 1),
('Ash', 'Ketchem', 2, '', 2),
('Lily', 'Potter', 3, 'Ash Ketchem', 2),
('Pepper', 'Pots', 4, '', 3),
('Kayla', 'Howard', 5, 'Pepper Pots', 3),
('Cindy', 'Lohou', 6, '', 4),
('Morgan', 'Allen', 7, 'Cindy Lohou', 4);