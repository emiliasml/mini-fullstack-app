# mini-fullstack-app

Small fullstack app for CRUD functionalities.
    - on both frontend and backend, install node-modules using 'npm install' 
    - start the backend using the command 'npm start'
    - start the frontendAngular using the comand 'ng serve --open'
http://localhost:3000/users

    Challenge:

Create a simple MVC system. The system should be connected to a mysql database.
In the mvc system you created, add functionalities for CRUD user.
Create a new database in mysql with the following data:
    { id: 1, firstName: "Frank", lastName: "Castle", age: 30 },
    { id: 2, firstName: "Peter", lastName: "Parker", age: 20 },
    { id: 3, firstName: "John", lastName: "Smith", age: 25 },
    { id: 4, firstName: "Jack", lastName: "The reaper", age: 100 },
    { id: 5, firstName: "Jackson", lastName: "Smith", age: 28 },
    { id: 6, firstName: "Tyson", lastName: "Fury", age: 30 },
    { id: 7, firstName: "Tony", lastName: "Stark", age: 38 },
    { id: 8, firstName: "Steve", lastName: "Rogers", age: 120 },
    { id: 9, firstName: "Steven", lastName: "Seagal", age: 60 },
    { id: 10, firstName: "Johnny", lastName: "Depp", age: 60 },

    Please note that:

- ideally, the user would introduce the birthdate and not a number for his age and, in the database we would keep the date in Date format. For this example, though, I decided to leave it like this because this is not the main focus of the project.
- the function getData from base.data.service.ts could have been done without the dataChange$ and without the subscribe call
- I'm not sure that I used the best approach for the response that comes from the backend

For the next version maybe?:

- there are needed more validations on the backend side - I made the frontend very restrictive so the user cannot give wrong values as input (maybe I missed some cases, but the obvious ones are taken care of), but the values should be validated on the backend side as well.
- the notifications should be changed with toastr or something similar
