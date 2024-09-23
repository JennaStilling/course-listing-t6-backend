// const db = require("../models/course.models.js");
const db = require("../models");
const Course = db.course;
const Op = db.Sequelize.Op;

// Create/save new Courses
exports.create = (req, res) => {
    if (!req.body.department) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create Course
    const course = {
        //id: req.body.id,
        department: req.body.department,
        courseNumber: req.body.courseNumber,
        level: req.body.level,
        hours: req.body.hours,
        name: req.body.name,
        description: req.body.description,
    };

    // Save Course into the database
    Course.create(course)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Course.",
            });
        });
};

// Retrieve All Courses from the database
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Course.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Courses.",
            });
        });
};

// Find a single Course with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Course.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Course with id-${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retreiving Course with id=" + id,
            });
        });
};

// Find a Course with course number
exports.findByCourseNumber = (req, res) => {
    const courseNumber = req.params.courseNumber;

    Course.findOne({
        where: {
            courseNumber: courseNumber,
        },
    })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({ courseNumber: "not found"});
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retreiving Course with number " + courseNumber,
            });
        });
};

// Find Course(s) by name
exports.findByName = (req, res) => {
    const name = req.params.name; // Look into this if this function does not work

    Course.findAll({ where: {name: name} })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Courses.",
            });
        });
}

// Find Course(s) by Department
exports.findByDepartment = (req, res) => {
    const department = req.params.department; // Look into this if this function does not work

    Course.findAll({ where: {department: department} })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Courses.",
            });
        });
}

// Update the Course by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Course.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Course with id=" + id,
            });
        });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Course.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Course with id=${id}. Maybe Course was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
              message: "Could not delete User with id=" + id,
            });
        });
};

// Delete all Courses from the database
exports.deleteAll = (req, res) => {
    Course.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Courses were deleted successfully!`});
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all courses.",
            });
        });
};
