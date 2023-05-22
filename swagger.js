/******************************************************************************
 *  @Execution      : default node : cmd> nodemon swagger.js
 *  @description    : Create Swagger for all the API endpoints
 * 
 *  @file           : BidMentor Backend Application
 *  @overview       : BidMentor is an innovative and interactive learning platform designed to revolutionize the way individuals acquire knowledge
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 22-may-2023
 ******************************************************************************/
/*
required files
*/
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '1.0.0',
        info: {
            title: 'BidMentor Application Backend API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Replace with your server URL
            },
        ],
    },
    apis: ['./app/routes/*.js'], // Replace with the path to your API routes files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
