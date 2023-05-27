/******************************************************************************
 *  @Execution      : default node : cmd> nodemon swagger.js
 *  @description    : Create Swagger for all the API endpoints
 * 
 *  @file           : BidMentor Backend Application
 *  @overview       : BidMentor is an innovative and interactive learning platform designed to revolutionize the way individuals acquire knowledge
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.1
 *  @since          : 22-may-2023
 ******************************************************************************/

/*
required files
*/
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const endpoints = require('../../swaggerSchema')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BidMentor Nodejs Application',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Replace with your server URL
            },
        ],
        paths: Object.entries(endpoints).reduce((paths, [key, value]) => {
            paths[value.path] = {
                [value.method]: {
                    requestBody: value.requestBody,
                    summary: value.summary,
                    description: value.description,
                    responses: value.responses,
                    path: value.path,
                    method:value.method
                }
            };
            return paths;
        }, {}),
    },
    apis: ['app/routes/userRoute.js'], // Update the path to your route files
}

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    // Serve the Swagger UI at /api-docs
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(specs));
};
