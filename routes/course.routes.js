module.exports = (app) => {
    const course = require("../controllers/course.controller.js");
    var router = require("express").Router();

    // Create new Course
    router.post("/", course.create);

    // Retrieve all Courses
    router.get("/", course.findAll);

    // Retreive a single Course with id
    router.get("/:id", course.findOne);

    // Retrive Course with Course Number
    router.get("/CourseNumber/:courseNumber", course.findByCourseNumber);

    // Retreive Course(s) with Course name
    router.get("/name/:name", course.findByName);

    // Retreive Course(s) with Department
    router.get("/department/:department", course.findByDepartment);

    // Update a Course with id
    router.put("/:id", course.update);

    // Delete a course with id
    router.delete("/:id", course.delete);

    // Delete all Courses
    router.delete("/", course.deleteAll);

    app.use("course-t6/courses", router);
};