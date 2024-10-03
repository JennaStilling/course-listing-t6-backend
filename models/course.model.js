module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", { 
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        department: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        courseNumber:{
            type: Sequelize.STRING,
            allowNull: false,
        },

        level: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        hours: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        description: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    }); 

    return Course;
};