In order to test/run the backend, you will have to do some setup.

First, because we installed MySQL workbench, the port that runs workbench is the same port needed by the database in the backend.

To free up this port, go to Task Manager, open up the Services Tab, and scroll down until you reach the MySQL90 process. Right-click the process and select stop. 

REMEMBER: after you finish running/testing the backend, you need to start this process again if you want to use MySQL workbench.

The second step is to create a .env file. The .env file is used so the backend can automatically access your phpmyadmin and create the table. 

The .env file should be in the root directory of the Course-Listing-T6-Backend repo. In it you should have 4 properties:

DB_USER=
DB_PW=
DB_NAME=courses
DB_HOST=localhost

Make sure you use these names specifically because that is what db.config.js uses. DB_NAME should be equal to 'courses' and DB_HOST should be equal to 'localhost'. DB_USER and DB_PW are your username and passwords to phpmyadmin.

Once you have done those two steps, you can open XAMPP and run apache and MySQL, then in the terminal inside the Course-Listing-T6-Backend directory, run the backend with the command, npm run install.

To test that the backend is working you will need to check that all of the REST API's give a 200 response.

The REST API's I made are:
POST:   /course/courses/
GET ALL:    /course/courses/
GET By ID:  /course/courses/:id
GET By COURSE NUMBER:   /course/courses/courseNumber/:courseNumber
GET By COURSE NAME:     /course/courses/name/:name
GET By DEPARTMENT:      /course/courses/department/:department
PUT (Update):   /course/courses/:id
DELETE:     /course/courses/:id
DELETE ALL:     /course/courses/

To test, use Postman, the base route you will use is:
localhost:3000/course/courses/

Depending on which request, you will add the other half of the directory and the required value that comes after the ":" (Without including the colon).

Posts and updates require adding the JSON in the body if you use postman. Choose the Body tab and select the 'raw' radio button