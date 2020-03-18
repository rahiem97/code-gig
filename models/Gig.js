const sequelize = require('sequelize');
const database = require('../config/database');

//Define what a Gig consists of 
const Gig = database.define('jobs',{
    title: {
        type: sequelize.STRING
    },
    technologies: {
        type: sequelize.STRING
    },
    descrip: {
        type: sequelize.STRING
    },
    budget: {
        type: sequelize.STRING
    },
    contact_email: {
        type: sequelize.STRING
    },
})

module.exports = Gig;